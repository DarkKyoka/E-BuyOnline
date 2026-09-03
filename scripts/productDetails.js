import { categories, products } from './data/catalogData.js';
import { readJsonFromStorage, writeJsonToStorage } from './utils/storage.js';

// ---------- Page data ----------

const productById = new Map(products.map((item) => [item.id, item]));
const requestedProductId = Number(
  new URLSearchParams(window.location.search).get('id'),
);
const currentProduct = productById.get(requestedProductId);

const STORAGE_KEYS = {
  cart: 'ebuy-cart',
  favorites: 'ebuy-favorites',
};

// ---------- Page elements ----------

const productDetail = document.querySelector('#product-detail');
const notFoundMessage = document.querySelector('#product-not-found');
const addToCartButton = document.querySelector('#detail-add-cart');
const favoriteButton = document.querySelector('#detail-toggle-favorite');
const favoriteLabel = document.querySelector('#favorite-label');

const favoritesMenuButton = document.querySelector('#favorites-button');
const favoritesPopover = document.querySelector('#favorites-popover');
const favoritesList = document.querySelector('#favorites-list');
const favoritesCount = document.querySelector('#favorites-count');

const cartMenuButton = document.querySelector('#cart-button');
const cartPopover = document.querySelector('#cart-popover');
const cartList = document.querySelector('#mini-cart-list');
const cartCount = document.querySelector('#cart-count');
const cartTotal = document.querySelector('#mini-total');

// ---------- Saved shop state ----------

const savedFavorites = readJsonFromStorage(STORAGE_KEYS.favorites, []);
let favoriteIds = Array.isArray(savedFavorites)
  ? savedFavorites.map(Number).filter(Number.isInteger)
  : [];

const savedCart = readJsonFromStorage(STORAGE_KEYS.cart, {});
let cartQuantities =
  savedCart && !Array.isArray(savedCart) && typeof savedCart === 'object'
    ? savedCart
    : {};

// ---------- Header favorites and cart ----------

function getFavoriteProducts() {
  return favoriteIds.map((id) => productById.get(id)).filter(Boolean);
}

function getCartEntries() {
  return Object.entries(cartQuantities)
    .map(([id, quantity]) => ({
      product: productById.get(Number(id)),
      quantity: Number(quantity),
    }))
    .filter((entry) => entry.product && entry.quantity > 0);
}

function renderFavoritesMenu() {
  const favoriteProducts = getFavoriteProducts();

  favoritesCount.textContent = favoriteProducts.length;
  favoritesList.innerHTML = favoriteProducts.length
    ? favoriteProducts
        .map(
          (product) => `
            <div class="favorite-item">
              <div class="item-image" aria-hidden="true">${product.icon}</div>
              <div>
                <strong>${product.name}</strong>
                <small>$${product.price.toFixed(2)}</small>
              </div>
              <button
                type="button"
                data-remove-favorite-id="${product.id}"
                aria-label="Remove ${product.name} from favorites"
              >
                Remove
              </button>
            </div>`,
        )
        .join('')
    : '<p>Your favorites list is empty.</p>';
}

function renderCartMenu() {
  const entries = getCartEntries();
  const totalItems = entries.reduce(
    (total, entry) => total + entry.quantity,
    0,
  );
  const subtotal = entries.reduce(
    (total, entry) => total + entry.product.price * entry.quantity,
    0,
  );

  cartCount.textContent = totalItems;
  cartTotal.textContent = subtotal.toFixed(2);
  cartList.innerHTML = entries.length
    ? entries
        .map(
          ({ product, quantity }) => `
            <div class="mini-cart-item">
              <div class="item-image" aria-hidden="true">${product.icon}</div>
              <div>
                <strong>
                  ${product.name}
                  <span>$${(product.price * quantity).toFixed(2)}</span>
                </strong>
                <small>Quantity: ${quantity}</small>
              </div>
            </div>`,
        )
        .join('')
    : '<p>Your cart is empty.</p>';
}

function renderHeaderMenus() {
  renderFavoritesMenu();
  renderCartMenu();
}

function setPopoverOpen(button, popover, shouldOpen) {
  popover.hidden = !shouldOpen;
  button.setAttribute('aria-expanded', String(shouldOpen));
}

function setupHeaderMenus() {
  favoritesMenuButton.addEventListener('click', () => {
    setPopoverOpen(cartMenuButton, cartPopover, false);
    setPopoverOpen(
      favoritesMenuButton,
      favoritesPopover,
      favoritesPopover.hidden,
    );
  });

  cartMenuButton.addEventListener('click', () => {
    setPopoverOpen(favoritesMenuButton, favoritesPopover, false);
    setPopoverOpen(cartMenuButton, cartPopover, cartPopover.hidden);
  });

  favoritesList.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-remove-favorite-id]');
    if (!removeButton) return;

    const idToRemove = Number(removeButton.dataset.removeFavoriteId);
    favoriteIds = favoriteIds.filter((id) => id !== idToRemove);
    writeJsonToStorage(STORAGE_KEYS.favorites, favoriteIds);
    renderFavoritesMenu();
    updateFavoriteButton();
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.favorites-wrap')) {
      setPopoverOpen(favoritesMenuButton, favoritesPopover, false);
    }

    if (!event.target.closest('.cart-wrap')) {
      setPopoverOpen(cartMenuButton, cartPopover, false);
    }
  });
}

// ---------- Product details ----------

function showNotFoundMessage() {
  productDetail.hidden = true;
  notFoundMessage.hidden = false;
  document.title = 'Product not found | E-Buy Online!';
}

function renderProductDetails() {
  const category = categories.find(
    (item) => item.id === currentProduct.category,
  );
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${currentProduct.dateOfUpload}T00:00:00`));

  document.title = `${currentProduct.name} | E-Buy Online!`;
  document.querySelector('#product-icon').textContent = currentProduct.icon;
  document.querySelector('#product-name').textContent = currentProduct.name;
  document.querySelector('#product-description').textContent =
    currentProduct.description;
  document.querySelector('#product-price').textContent =
    `$${currentProduct.price.toFixed(2)}`;

  const uploadDate = document.querySelector('#product-date');
  uploadDate.dateTime = currentProduct.dateOfUpload;
  uploadDate.textContent = formattedDate;

  const categoryLink = document.querySelector('#product-category');
  categoryLink.textContent = category?.name ?? 'All products';
  categoryLink.href = category
    ? `index.html#products?category=${encodeURIComponent(category.id)}`
    : 'index.html#products';

  if (currentProduct.author) {
    const author = document.querySelector('#product-author');
    author.textContent = `by ${currentProduct.author}`;
    author.hidden = false;
  }
}

function updateFavoriteButton() {
  if (!currentProduct) return;

  const isFavorite = favoriteIds.includes(currentProduct.id);
  const action = isFavorite ? 'Remove' : 'Add';
  const direction = isFavorite ? 'from' : 'to';

  favoriteButton.classList.toggle('is-favorite', isFavorite);
  favoriteButton.setAttribute('aria-pressed', String(isFavorite));
  favoriteButton.setAttribute(
    'aria-label',
    `${action} ${currentProduct.name} ${direction} favorites`,
  );
  favoriteLabel.textContent = isFavorite
    ? 'Remove favorite'
    : 'Add to favorites';
}

function addCurrentProductToCart() {
  const currentQuantity = Number(cartQuantities[currentProduct.id]) || 0;
  cartQuantities[currentProduct.id] = currentQuantity + 1;

  writeJsonToStorage(STORAGE_KEYS.cart, cartQuantities);
  renderCartMenu();

  addToCartButton.textContent = 'Added to cart!';
  window.setTimeout(() => {
    addToCartButton.textContent = 'Add to cart';
  }, 1000);
}

function toggleCurrentProductFavorite() {
  const isFavorite = favoriteIds.includes(currentProduct.id);

  favoriteIds = isFavorite
    ? favoriteIds.filter((id) => id !== currentProduct.id)
    : [...favoriteIds, currentProduct.id];

  writeJsonToStorage(STORAGE_KEYS.favorites, favoriteIds);
  updateFavoriteButton();
  renderFavoritesMenu();
}

function setupProductButtons() {
  addToCartButton.addEventListener('click', addCurrentProductToCart);
  favoriteButton.addEventListener('click', toggleCurrentProductFavorite);
}

// ---------- Start the page ----------

setupHeaderMenus();
renderHeaderMenus();

if (!currentProduct) {
  showNotFoundMessage();
} else {
  renderProductDetails();
  updateFavoriteButton();
  setupProductButtons();
}
