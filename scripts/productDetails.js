import { categories, products } from './data/catalogData.js';

const productId = Number(new URLSearchParams(window.location.search).get('id'));
const product = products.find((item) => item.id === productId);
const productDetail = document.querySelector('#product-detail');
const notFound = document.querySelector('#product-not-found');

function readStoredJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStoredJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The controls remain usable for this visit if storage is unavailable.
  }
}

let favorites = readStoredJson('ebuy-favorites', []);
if (!Array.isArray(favorites)) favorites = [];

let cart = readStoredJson('ebuy-cart', {});
if (!cart || Array.isArray(cart) || typeof cart !== 'object') cart = {};

function renderHeaderMenus() {
  const favoriteProducts = favorites
    .map((id) => products.find((item) => item.id === Number(id)))
    .filter(Boolean);
  const cartEntries = Object.entries(cart)
    .map(([id, quantity]) => ({
      product: products.find((item) => item.id === Number(id)),
      quantity: Number(quantity),
    }))
    .filter(({ product: item, quantity }) => item && quantity > 0);

  document.querySelector('#favorites-count').textContent =
    favoriteProducts.length;
  document.querySelector('#favorites-list').innerHTML = favoriteProducts.length
    ? favoriteProducts
        .map(
          (item) => `
            <div class="favorite-item">
              <div class="item-image" aria-hidden="true">${item.icon}</div>
              <div><strong>${item.name}</strong><small>$${item.price.toFixed(2)}</small></div>
              <button type="button" data-header-remove-favorite="${item.id}">Remove</button>
            </div>`,
        )
        .join('')
    : '<p>Your favorites list is empty.</p>';

  const itemCount = cartEntries.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotal = cartEntries.reduce(
    (sum, entry) => sum + entry.product.price * entry.quantity,
    0,
  );
  document.querySelector('#cart-count').textContent = itemCount;
  document.querySelector('#mini-total').textContent = subtotal.toFixed(2);
  document.querySelector('#mini-cart-list').innerHTML = cartEntries.length
    ? cartEntries
        .map(
          ({ product: item, quantity }) => `
            <div class="mini-cart-item">
              <div class="item-image" aria-hidden="true">${item.icon}</div>
              <div><strong>${item.name}<span>$${(item.price * quantity).toFixed(2)}</span></strong><small>Quantity: ${quantity}</small></div>
            </div>`,
        )
        .join('')
    : '<p>Your cart is empty.</p>';
}

function setupHeaderMenus() {
  const favoritesButton = document.querySelector('#favorites-button');
  const favoritesPopover = document.querySelector('#favorites-popover');
  const cartButton = document.querySelector('#cart-button');
  const cartPopover = document.querySelector('#cart-popover');

  const closePopover = (button, popover) => {
    popover.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  };

  favoritesButton.addEventListener('click', () => {
    closePopover(cartButton, cartPopover);
    favoritesPopover.hidden = !favoritesPopover.hidden;
    favoritesButton.setAttribute(
      'aria-expanded',
      String(!favoritesPopover.hidden),
    );
  });

  cartButton.addEventListener('click', () => {
    closePopover(favoritesButton, favoritesPopover);
    cartPopover.hidden = !cartPopover.hidden;
    cartButton.setAttribute('aria-expanded', String(!cartPopover.hidden));
  });

  document
    .querySelector('#favorites-list')
    .addEventListener('click', (event) => {
      const removeButton = event.target.closest(
        '[data-header-remove-favorite]',
      );
      if (!removeButton) return;

      favorites = favorites.filter(
        (id) =>
          Number(id) !== Number(removeButton.dataset.headerRemoveFavorite),
      );
      writeStoredJson('ebuy-favorites', favorites);
      renderHeaderMenus();
      if (product) updateFavoriteButton(favorites);
    });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.favorites-wrap')) {
      closePopover(favoritesButton, favoritesPopover);
    }
    if (!event.target.closest('.cart-wrap')) {
      closePopover(cartButton, cartPopover);
    }
  });
}

function updateFavoriteButton(favorites) {
  const button = document.querySelector('#detail-toggle-favorite');
  const label = document.querySelector('#favorite-label');
  const isFavorite = favorites.includes(product.id);

  button.classList.toggle('is-favorite', isFavorite);
  button.setAttribute('aria-pressed', String(isFavorite));
  button.querySelector('[aria-hidden]').textContent = isFavorite ? '♥' : '♡';
  label.textContent = isFavorite ? 'Remove favorite' : 'Add to favorites';
  button.setAttribute(
    'aria-label',
    `${isFavorite ? 'Remove' : 'Add'} ${product.name} ${isFavorite ? 'from' : 'to'} favorites`,
  );
}

if (!product || !Number.isInteger(productId)) {
  productDetail.hidden = true;
  notFound.hidden = false;
  document.title = 'Product not found | E-Buy Online!';
} else {
  const category = categories.find((item) => item.id === product.category);
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${product.dateOfUpload}T00:00:00`));

  document.title = `${product.name} | E-Buy Online!`;
  document.querySelector('#product-icon').textContent = product.icon;
  document.querySelector('#product-name').textContent = product.name;
  document.querySelector('#product-description').textContent =
    product.description;
  document.querySelector('#product-price').textContent =
    `$${product.price.toFixed(2)}`;

  const date = document.querySelector('#product-date');
  date.dateTime = product.dateOfUpload;
  date.textContent = formattedDate;

  const categoryLink = document.querySelector('#product-category');
  categoryLink.textContent = category?.name ?? 'All products';
  categoryLink.href = category
    ? `index.html#products?category=${encodeURIComponent(category.id)}`
    : 'index.html#products';

  if (product.author) {
    const author = document.querySelector('#product-author');
    author.textContent = `by ${product.author}`;
    author.hidden = false;
  }

  document
    .querySelector('#detail-add-cart')
    .addEventListener('click', (event) => {
      cart[product.id] = (Number(cart[product.id]) || 0) + 1;
      writeStoredJson('ebuy-cart', cart);
      renderHeaderMenus();

      event.currentTarget.textContent = 'Added to cart!';
      window.setTimeout(() => {
        event.currentTarget.textContent = 'Add to cart';
      }, 1000);
    });

  updateFavoriteButton(favorites);

  document
    .querySelector('#detail-toggle-favorite')
    .addEventListener('click', () => {
      favorites = favorites.includes(product.id)
        ? favorites.filter((id) => id !== product.id)
        : [...favorites, product.id];
      writeStoredJson('ebuy-favorites', favorites);
      updateFavoriteButton(favorites);
      renderHeaderMenus();
    });
}

setupHeaderMenus();
renderHeaderMenus();
