const categories = [
  { id: 'electronics', name: 'Electronics', icon: '🎧', color: '#dbeafe' },
  { id: 'fashion', name: 'Fashion', icon: '👟', color: '#fce7f3' },
  { id: 'home', name: 'Home & Living', icon: '🛋️', color: '#dcfce7' },
  { id: 'beauty', name: 'Beauty', icon: '✨', color: '#f3e8ff' },
  { id: 'sports', name: 'Sports', icon: '🏀', color: '#ffedd5' },
  { id: 'books', name: 'Books', icon: '📚', color: '#fef3c7' },
  { id: 'toys', name: 'Toys', icon: '🧸', color: '#cffafe' },
  { id: 'pets', name: 'Pet Supplies', icon: '🐾', color: '#e0e7ff' }
];

const products = [
  { id: 1, category: 'electronics', name: 'Wireless Headphones', price: 79, icon: '🎧', description: 'Clear sound with all-day battery life.' },
  { id: 2, category: 'electronics', name: 'Smart Watch', price: 119, icon: '⌚', description: 'Fitness tracking and phone notifications.' },
  { id: 3, category: 'fashion', name: 'Everyday Sneakers', price: 64, icon: '👟', description: 'Lightweight comfort for every day.' },
  { id: 4, category: 'fashion', name: 'Classic Backpack', price: 48, icon: '🎒', description: 'A practical carry-all with padded straps.' },
  { id: 5, category: 'home', name: 'Table Lamp', price: 35, icon: '💡', description: 'Warm, adjustable light for any room.' },
  { id: 6, category: 'home', name: 'Soft Cushion', price: 22, icon: '🛋️', description: 'A soft accent cushion with a washable cover.' },
  { id: 7, category: 'beauty', name: 'Skin Care Set', price: 42, icon: '🧴', description: 'A simple three-step daily skin routine.' },
  { id: 8, category: 'beauty', name: 'Floral Perfume', price: 58, icon: '🌸', description: 'A light, fresh fragrance for daytime.' },
  { id: 9, category: 'sports', name: 'Training Ball', price: 28, icon: '🏀', description: 'Durable grip for indoor and outdoor play.' },
  { id: 10, category: 'sports', name: 'Yoga Mat', price: 31, icon: '🧘', description: 'Comfortable, non-slip exercise support.' },
  { id: 11, category: 'books', name: 'Creative Thinking', price: 18, icon: '📘', description: 'Practical ideas for better problem solving.' },
  { id: 12, category: 'books', name: 'World Atlas', price: 27, icon: '🌍', description: 'Explore countries, cultures, and landscapes.' },
  { id: 13, category: 'toys', name: 'Building Blocks', price: 33, icon: '🧱', description: 'A colorful creative building set.' },
  { id: 14, category: 'toys', name: 'Plush Bear', price: 24, icon: '🧸', description: 'A super-soft companion for little ones.' },
  { id: 15, category: 'pets', name: 'Pet Bed', price: 46, icon: '🐕', description: 'A cozy, washable bed for cats and dogs.' },
  { id: 16, category: 'pets', name: 'Treat Box', price: 19, icon: '🦴', description: 'A mixed selection of reward treats.' }
];

const money = value => `$${value.toFixed(2)}`;

function renderCategories() {
  const grid = document.querySelector('#category-grid');
  if (!grid) return;

  grid.innerHTML = categories.map(category => {
    const count = products.filter(product => product.category === category.id).length;
    return `
      <a class="category-card" href="#products?category=${category.id}" style="--category-color: ${category.color}">
        <span class="category-icon" aria-hidden="true">${category.icon}</span>
        <strong>${category.name}</strong>
        <small>${count} products</small>
      </a>`;
  }).join('');
}

function renderProducts() {
  const grid = document.querySelector('#product-grid');
  if (!grid) return;

  const hashQuery = window.location.hash.split('?')[1] ?? '';
  const categoryId = new URLSearchParams(hashQuery).get('category');
  const activeCategory = categories.find(category => category.id === categoryId);
  const visibleProducts = activeCategory
    ? products.filter(product => product.category === activeCategory.id)
    : products;

  const heading = document.querySelector('#selected-category');
  if (heading) heading.textContent = activeCategory?.name ?? 'All products';

  grid.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <div class="product-image" aria-hidden="true"><span>${product.icon}</span></div>
      <div class="product-info">
        <div class="product-title-row">
          <h3>${product.name}</h3>
          <strong>${money(product.price)}</strong>
        </div>
        <p>${product.description}</p>
        <div class="product-actions">
          <button class="add-button" type="button" data-product-id="${product.id}">Add to cart</button>
          <button
            class="favorite-action-button"
            type="button"
            data-favorite-id="${product.id}"
            aria-label="Add ${product.name} to favorites"
            aria-pressed="false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
            </svg>
          </button>
        </div>
      </div>
    </article>`).join('');

  grid.addEventListener('click', event => {
    const addToCartButton = event.target.closest('[data-product-id]');
    const favoriteButton = event.target.closest('[data-favorite-id]');

    if (addToCartButton) {
      addToCart(Number(addToCartButton.dataset.productId));
      addToCartButton.textContent = 'Added!';

      window.setTimeout(() => {
        addToCartButton.textContent = 'Add to cart';
      }, 900);
    }

    if (favoriteButton) {
      toggleFavorite(Number(favoriteButton.dataset.favoriteId));
    }
  });

  updateProductFavoriteButtons();
}

// Favorites are stored as an array of product IDs, for example: [1, 4, 8].
function readFavorites() {
  try {
    const savedFavorites = JSON.parse(localStorage.getItem('ebuy-favorites'));
    return Array.isArray(savedFavorites) ? savedFavorites : [];
  } catch {
    return [];
  }
}

let favorites = readFavorites();

function toggleFavorite(productId) {
  const isAlreadyFavorite = favorites.includes(productId);

  if (isAlreadyFavorite) {
    favorites = favorites.filter(id => id !== productId);
  } else {
    favorites.push(productId);
  }

  localStorage.setItem('ebuy-favorites', JSON.stringify(favorites));
  renderFavorites();
  updateProductFavoriteButtons();
}

function updateProductFavoriteButtons() {
  const favoriteButtons = document.querySelectorAll('[data-favorite-id]');

  favoriteButtons.forEach(button => {
    const productId = Number(button.dataset.favoriteId);
    const isFavorite = favorites.includes(productId);

    button.classList.toggle('is-favorite', isFavorite);
    button.setAttribute('aria-pressed', String(isFavorite));

    const product = products.find(item => item.id === productId);
    const action = isFavorite ? 'Remove' : 'Add';
    button.setAttribute('aria-label', `${action} ${product.name} ${isFavorite ? 'from' : 'to'} favorites`);
  });
}

function renderFavorites() {
  const favoriteProducts = products.filter(product => favorites.includes(product.id));
  const count = document.querySelector('#favorites-count');
  const list = document.querySelector('#favorites-list');

  if (count) {
    count.textContent = favoriteProducts.length;
  }

  if (!list) return;

  if (favoriteProducts.length === 0) {
    list.innerHTML = '<p>You have no favorite products yet.</p>';
    return;
  }

  list.innerHTML = favoriteProducts.map(product => `
    <div class="favorite-list-item">
      <span class="favorite-list-icon" aria-hidden="true">${product.icon}</span>
      <div>
        <strong>${product.name}</strong>
        <small>${money(product.price)}</small>
      </div>
      <button type="button" data-remove-favorite-id="${product.id}" aria-label="Remove ${product.name} from favorites">Remove</button>
    </div>
  `).join('');
}

function setupFavorites() {
  const button = document.querySelector('#favorites-button');
  const popover = document.querySelector('#favorites-popover');
  const list = document.querySelector('#favorites-list');

  // categories.html does not have the favorites menu, so stop there safely.
  if (!button || !popover || !list) return;

  button.addEventListener('click', () => {
    const cartPopover = document.querySelector('#cart-popover');
    const cartButton = document.querySelector('#cart-button');

    if (cartPopover && cartButton) {
      cartPopover.hidden = true;
      cartButton.setAttribute('aria-expanded', 'false');
    }

    popover.hidden = !popover.hidden;
    button.setAttribute('aria-expanded', String(!popover.hidden));
  });

  list.addEventListener('click', event => {
    const removeButton = event.target.closest('[data-remove-favorite-id]');
    if (!removeButton) return;

    toggleFavorite(Number(removeButton.dataset.removeFavoriteId));
  });
}

function readCart() {
  try {
    return JSON.parse(localStorage.getItem('ebuy-cart')) ?? {};
  } catch {
    return {};
  }
}

let cart = readCart();

function addToCart(productId) {
  cart[productId] = (cart[productId] ?? 0) + 1;
  localStorage.setItem('ebuy-cart', JSON.stringify(cart));
  renderCart();
}

function cartEntries() {
  return Object.entries(cart).map(([id, quantity]) => ({
    product: products.find(product => product.id === Number(id)),
    quantity
  })).filter(entry => entry.product && entry.quantity > 0);
}

function renderCart() {
  const entries = cartEntries();
  const count = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotal = entries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
  const countElement = document.querySelector('#cart-count');
  if (countElement) countElement.textContent = count;

  const miniList = document.querySelector('#mini-cart-list');
  if (miniList) {
    miniList.innerHTML = entries.length ? entries.map(({ product, quantity }) => `
      <div class="mini-cart-item">
        <div class="item-image" aria-hidden="true">${product.icon}</div>
        <div><strong>${product.name}<span>${money(product.price * quantity)}</span></strong><small>Quantity: ${quantity}</small></div>
      </div>`).join('') : '<p>Your cart is empty.</p>';
  }

  const miniTotal = document.querySelector('#mini-total');
  if (miniTotal) miniTotal.textContent = subtotal.toFixed(2);
  const summarySubtotal = document.querySelector('#summary-subtotal');
  if (summarySubtotal) summarySubtotal.textContent = subtotal.toFixed(2);
  const summaryTotal = document.querySelector('#summary-total');
  if (summaryTotal) summaryTotal.textContent = (subtotal + 8).toFixed(2);

  const detailList = document.querySelector('#cart-detail-items');
  if (detailList) {
    detailList.innerHTML = entries.length ? entries.map(({ product, quantity }) => `
      <div class="cart-detail-item">
        <div class="item-image" aria-hidden="true">${product.icon}</div>
        <div><strong>${product.name}</strong><span>${money(product.price)} × ${quantity}</span></div>
        <b>${money(product.price * quantity)}</b>
      </div>`).join('') : '<p>Your cart is empty.</p>';
  }
}

function setupCart() {
  const button = document.querySelector('#cart-button');
  const popover = document.querySelector('#cart-popover');
  const dialog = document.querySelector('#cart-dialog');
  if (!button || !popover || !dialog) return;

  button.addEventListener('click', () => {
    const favoritesPopover = document.querySelector('#favorites-popover');
    const favoritesButton = document.querySelector('#favorites-button');

    if (favoritesPopover && favoritesButton) {
      favoritesPopover.hidden = true;
      favoritesButton.setAttribute('aria-expanded', 'false');
    }

    popover.hidden = !popover.hidden;
    button.setAttribute('aria-expanded', String(!popover.hidden));
  });
  document.querySelector('#open-cart-details')?.addEventListener('click', () => {
    popover.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    dialog.showModal();
  });
  document.querySelector('#close-cart-details')?.addEventListener('click', () => dialog.close());
}

function renderCurrentView() {
  const pageContent = document.querySelector('#page-content');
  if (!pageContent) return;

  const route = window.location.hash.slice(1).split('?')[0] || 'home';

  if (route === 'categories') {
    pageContent.innerHTML = `
      <section class="categories-section" id="categories">
        <a class="back-button" href="#home" aria-label="Back to home">
          <i data-lucide="chevron-left" aria-hidden="true"></i>
        </a>
        <h1>Choose your category</h1>
        <div class="category-grid" id="category-grid"></div>
      </section>`;

    renderCategories();
  } else if (route === 'products') {
    pageContent.innerHTML = `
      <section class="products-section" id="products">
        <div class="section-heading-row">
          <a class="back-button" href="#categories" aria-label="Back to categories">
            <i data-lucide="arrow-left" aria-hidden="true"></i>
          </a>
          <h1>Products — <span id="selected-category">All products</span></h1>
        </div>
        <div class="product-grid" id="product-grid"></div>
      </section>`;

    renderProducts();
  } else {
    pageContent.innerHTML = `
      <section class="hero home-view" id="home">
        <div class="hero-copy">
          <h1>Everything you’ll ever<br />need is here!</h1>
          <a class="hero-cta" href="#categories">
            <span>Take a look!</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/>
            </svg>
          </a>
        </div>
      </section>`;
  }

  window.lucide?.createIcons();

  if (route === 'about') {
    document.querySelector('#about')?.scrollIntoView();
  } else {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}

function animateToCurrentView() {
  const pageContent = document.querySelector('#page-content');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!pageContent || prefersReducedMotion) {
    renderCurrentView();
    return;
  }

  // First animate the current middle section out.
  pageContent.classList.remove('view-is-entering');
  pageContent.classList.add('view-is-leaving');

  window.setTimeout(() => {
    // Replace the middle section, then animate the new section in.
    pageContent.classList.remove('view-is-leaving');
    renderCurrentView();
    pageContent.classList.add('view-is-entering');

    window.setTimeout(() => {
      pageContent.classList.remove('view-is-entering');
    }, 320);
  }, 180);
}

renderCurrentView();
document.querySelector('#page-content')?.classList.add('view-is-entering');
setupFavorites();
renderFavorites();
setupCart();
renderCart();

window.addEventListener('hashchange', animateToCurrentView);
