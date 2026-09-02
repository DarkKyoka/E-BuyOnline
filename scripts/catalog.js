const categories = [
  { id: 'electronics', name: 'Electronics', icon: '🎧', color: '#dbeafe' },
  { id: 'fashion', name: 'Fashion', icon: '👟', color: '#fce7f3' },
  { id: 'home', name: 'Home & Living', icon: '🛋️', color: '#dcfce7' },
  { id: 'beauty', name: 'Beauty', icon: '✨', color: '#f3e8ff' },
  { id: 'sports', name: 'Sports', icon: '🏀', color: '#ffedd5' },
  { id: 'books', name: 'Books', icon: '📚', color: '#fef3c7' },
  { id: 'toys', name: 'Toys', icon: '🧸', color: '#cffafe' },
  { id: 'pets', name: 'Pet Supplies', icon: '🐾', color: '#e0e7ff' },
];

const products = [
  {
    id: 1,
    category: 'electronics',
    name: 'Wireless Headphones',
    price: 79,
    dateOfUpload: '2026-01-08',
    icon: '🎧',
    description: 'Clear sound with all-day battery life.',
  },
  {
    id: 2,
    category: 'electronics',
    name: 'Smart Watch',
    price: 119,
    dateOfUpload: '2026-02-14',
    icon: '⌚',
    description: 'Fitness tracking and phone notifications.',
  },
  {
    id: 17,
    category: 'electronics',
    name: 'Bluetooth Speaker',
    price: 49,
    dateOfUpload: '2026-07-21',
    icon: '🔊',
    description: 'Portable sound with a waterproof design.',
  },
  {
    id: 25,
    category: 'electronics',
    name: 'Compact Tablet',
    price: 189,
    dateOfUpload: '2026-04-18',
    icon: '📱',
    description: 'A lightweight tablet for work and entertainment.',
  },
  {
    id: 26,
    category: 'electronics',
    name: 'Mechanical Keyboard',
    price: 86,
    dateOfUpload: '2026-06-05',
    icon: '⌨️',
    description: 'Responsive keys with adjustable backlighting.',
  },
  {
    id: 27,
    category: 'electronics',
    name: 'Portable Charger',
    price: 39,
    dateOfUpload: '2026-08-31',
    icon: '🔋',
    description: 'Fast charging power for devices on the go.',
  },

  {
    id: 3,
    category: 'fashion',
    name: 'Everyday Sneakers',
    price: 64,
    dateOfUpload: '2025-11-20',
    icon: '👟',
    description: 'Lightweight comfort for every day.',
  },
  {
    id: 4,
    category: 'fashion',
    name: 'Classic Backpack',
    price: 48,
    dateOfUpload: '2026-03-03',
    icon: '🎒',
    description: 'A practical carry-all with padded straps.',
  },
  {
    id: 18,
    category: 'fashion',
    name: 'Cotton Hoodie',
    price: 55,
    dateOfUpload: '2026-08-02',
    icon: '👕',
    description: 'A soft hoodie for cool and casual days.',
  },

  {
    id: 5,
    category: 'home',
    name: 'Table Lamp',
    price: 35,
    dateOfUpload: '2025-12-11',
    icon: '💡',
    description: 'Warm, adjustable light for any room.',
  },
  {
    id: 6,
    category: 'home',
    name: 'Soft Cushion',
    price: 22,
    dateOfUpload: '2026-01-26',
    icon: '🛋️',
    description: 'A soft accent cushion with a washable cover.',
  },
  {
    id: 19,
    category: 'home',
    name: 'Ceramic Plant Pot',
    price: 29,
    dateOfUpload: '2026-06-18',
    icon: '🪴',
    description: 'A modern ceramic pot for indoor plants.',
  },

  {
    id: 7,
    category: 'beauty',
    name: 'Skin Care Set',
    price: 42,
    dateOfUpload: '2026-02-01',
    icon: '🧴',
    description: 'A simple three-step daily skin routine.',
  },
  {
    id: 8,
    category: 'beauty',
    name: 'Floral Perfume',
    price: 58,
    dateOfUpload: '2026-04-09',
    icon: '🌸',
    description: 'A light, fresh fragrance for daytime.',
  },
  {
    id: 20,
    category: 'beauty',
    name: 'Makeup Brush Set',
    price: 36,
    dateOfUpload: '2026-07-09',
    icon: '🖌️',
    description: 'Soft brushes for everyday makeup.',
  },

  {
    id: 9,
    category: 'sports',
    name: 'Training Ball',
    price: 28,
    dateOfUpload: '2025-10-15',
    icon: '🏀',
    description: 'Durable grip for indoor and outdoor play.',
  },
  {
    id: 10,
    category: 'sports',
    name: 'Yoga Mat',
    price: 31,
    dateOfUpload: '2026-03-22',
    icon: '🧘',
    description: 'Comfortable, non-slip exercise support.',
  },
  {
    id: 21,
    category: 'sports',
    name: 'Adjustable Dumbbell',
    price: 72,
    dateOfUpload: '2026-08-14',
    icon: '🏋️',
    description: 'Space-saving weight for home workouts.',
  },

  {
    id: 11,
    category: 'books',
    name: 'Creative Thinking',
    price: 18,
    dateOfUpload: '2025-09-28',
    icon: '📘',
    description: 'Practical ideas for better problem solving.',
  },
  {
    id: 12,
    category: 'books',
    name: 'World Atlas',
    price: 27,
    dateOfUpload: '2026-02-27',
    icon: '🌍',
    description: 'Explore countries, cultures, and landscapes.',
  },
  {
    id: 22,
    category: 'books',
    name: 'Modern Cooking',
    price: 25,
    dateOfUpload: '2026-05-30',
    icon: '📕',
    description: 'Simple recipes for creative home cooking.',
  },

  {
    id: 13,
    category: 'toys',
    name: 'Building Blocks',
    price: 33,
    dateOfUpload: '2026-01-17',
    icon: '🧱',
    description: 'A colorful creative building set.',
  },
  {
    id: 14,
    category: 'toys',
    name: 'Plush Bear',
    price: 24,
    dateOfUpload: '2026-04-25',
    icon: '🧸',
    description: 'A super-soft companion for little ones.',
  },
  {
    id: 23,
    category: 'toys',
    name: 'Remote Control Car',
    price: 44,
    dateOfUpload: '2026-07-30',
    icon: '🏎️',
    description: 'A fast rechargeable car with easy controls.',
  },

  {
    id: 15,
    category: 'pets',
    name: 'Pet Bed',
    price: 46,
    dateOfUpload: '2025-12-03',
    icon: '🐕',
    description: 'A cozy, washable bed for cats and dogs.',
  },
  {
    id: 16,
    category: 'pets',
    name: 'Treat Box',
    price: 19,
    dateOfUpload: '2026-03-12',
    icon: '🦴',
    description: 'A mixed selection of reward treats.',
  },
  {
    id: 24,
    category: 'pets',
    name: 'Interactive Cat Toy',
    price: 26,
    dateOfUpload: '2026-08-25',
    icon: '🐈',
    description: 'An engaging toy that keeps cats active.',
  },

  // Extra products with varied names, prices, and dates for testing sorting.
  {
    id: 28,
    category: 'electronics',
    name: '4K Action Camera',
    price: 145,
    dateOfUpload: '2024-06-12',
    icon: '📷',
    description: 'A compact camera for trips and outdoor adventures.',
  },
  {
    id: 29,
    category: 'electronics',
    name: 'USB-C Hub',
    price: 34,
    dateOfUpload: '2025-08-19',
    icon: '🔌',
    description: 'Connect displays, storage, and accessories with one hub.',
  },
  {
    id: 30,
    category: 'fashion',
    name: 'Denim Jacket',
    price: 74,
    dateOfUpload: '2024-09-03',
    icon: '🧥',
    description: 'A classic denim layer with a relaxed fit.',
  },
  {
    id: 31,
    category: 'fashion',
    name: 'Summer Sunglasses',
    price: 29,
    dateOfUpload: '2026-05-16',
    icon: '🕶️',
    description: 'Lightweight sunglasses with UV protection.',
  },
  {
    id: 32,
    category: 'home',
    name: 'Kitchen Storage Set',
    price: 41,
    dateOfUpload: '2024-11-24',
    icon: '🫙',
    description: 'Clear containers that keep dry ingredients organized.',
  },
  {
    id: 33,
    category: 'home',
    name: 'Woven Throw Blanket',
    price: 52,
    dateOfUpload: '2026-07-04',
    icon: '🧶',
    description: 'A warm decorative blanket for sofas and beds.',
  },
  {
    id: 34,
    category: 'beauty',
    name: 'Aloe Face Cream',
    price: 21,
    dateOfUpload: '2025-01-13',
    icon: '🌿',
    description: 'A gentle daily moisturizer with soothing aloe.',
  },
  {
    id: 35,
    category: 'beauty',
    name: 'Velvet Lip Color',
    price: 17,
    dateOfUpload: '2026-06-23',
    icon: '💄',
    description: 'Long-lasting color with a smooth matte finish.',
  },
  {
    id: 36,
    category: 'sports',
    name: 'Cycling Water Bottle',
    price: 14,
    dateOfUpload: '2024-07-29',
    icon: '🚴',
    description: 'An easy-grip bottle made for active training.',
  },
  {
    id: 37,
    category: 'sports',
    name: 'Resistance Band Kit',
    price: 38,
    dateOfUpload: '2026-04-02',
    icon: '💪',
    description: 'Five resistance levels for flexible home workouts.',
  },
  {
    id: 38,
    category: 'books',
    name: 'Beginner JavaScript',
    price: 32,
    dateOfUpload: '2024-05-08',
    icon: '📙',
    description: 'A friendly introduction to modern JavaScript.',
  },
  {
    id: 39,
    category: 'books',
    name: 'The Night Garden',
    price: 16,
    dateOfUpload: '2026-08-11',
    icon: '📗',
    description: 'A relaxing illustrated story for evening reading.',
  },
  {
    id: 40,
    category: 'toys',
    name: 'Alphabet Puzzle',
    price: 20,
    dateOfUpload: '2025-02-06',
    icon: '🧩',
    description: 'A colorful wooden puzzle for early learning.',
  },
  {
    id: 41,
    category: 'toys',
    name: 'Wooden Train Set',
    price: 57,
    dateOfUpload: '2026-05-28',
    icon: '🚂',
    description: 'A complete track set for imaginative play.',
  },
  {
    id: 42,
    category: 'pets',
    name: 'Adjustable Pet Harness',
    price: 23,
    dateOfUpload: '2024-08-17',
    icon: '🐕‍🦺',
    description: 'A secure and comfortable harness for daily walks.',
  },
  {
    id: 43,
    category: 'pets',
    name: 'Water Fountain',
    price: 43,
    dateOfUpload: '2026-07-17',
    icon: '⛲',
    description: 'Quiet filtered water for cats and small dogs.',
  },
];

const money = (value) => `$${value.toFixed(2)}`;

// These values are saved in localStorage and used to sort product cards.
const sortOptions = [
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'date-asc', label: 'Date: Oldest First' },
  { value: 'date-desc', label: 'Date: Newest First' },
];

function getSelectedSort() {
  return localStorage.getItem('ebuy-sort') ?? 'name-asc';
}

function getSelectedSortLabel() {
  const selectedValue = getSelectedSort();
  const selectedOption = sortOptions.find(
    (option) => option.value === selectedValue,
  );

  return selectedOption?.label ?? 'Name: A to Z';
}

function sortProducts(productList) {
  const sortedProducts = [...productList];

  switch (getSelectedSort()) {
    case 'name-desc':
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'date-asc':
      return sortedProducts.sort((a, b) =>
        a.dateOfUpload.localeCompare(b.dateOfUpload),
      );
    case 'date-desc':
      return sortedProducts.sort((a, b) =>
        b.dateOfUpload.localeCompare(a.dateOfUpload),
      );
    default:
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }
}

function createSortMenuHtml() {
  const optionButtons = sortOptions
    .map(
      (option) => `
        <button type="button" data-sort-value="${option.value}">
          <span class="sort-option-dot" aria-hidden="true"></span>
          ${option.label}
        </button>`,
    )
    .join('');

  return `
    <details class="sort-menu">
      <summary>
        <span class="sort-option-dot" aria-hidden="true"></span>
        <span id="selected-sort-label">${getSelectedSortLabel()}</span>
        <i data-lucide="chevron-down" aria-hidden="true"></i>
      </summary>
      <div class="sort-options">${optionButtons}</div>
    </details>`;
}

function updateSortMenu() {
  const selectedValue = getSelectedSort();
  const label = document.querySelector('#selected-sort-label');
  const buttons = document.querySelectorAll('[data-sort-value]');

  if (label) label.textContent = getSelectedSortLabel();

  buttons.forEach((button) => {
    const isSelected = button.dataset.sortValue === selectedValue;
    button.classList.toggle('is-selected', isSelected);
  });
}

function setupSortMenu() {
  const menu = document.querySelector('.sort-menu');
  if (!menu) return;

  menu.addEventListener('click', (event) => {
    const optionButton = event.target.closest('[data-sort-value]');
    if (!optionButton) return;

    localStorage.setItem('ebuy-sort', optionButton.dataset.sortValue);
    updateSortMenu();
    renderProducts();
    menu.open = false;
  });

  updateSortMenu();
}

function formatUploadDate(dateOfUpload) {
  const date = new Date(`${dateOfUpload}T00:00:00`);

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function renderCategories() {
  const grid = document.querySelector('#category-grid');
  if (!grid) return;

  grid.innerHTML = categories
    .map((category) => {
      const count = products.filter(
        (product) => product.category === category.id,
      ).length;
      return `
      <a class="category-card" href="#products?category=${category.id}" style="--category-color: ${category.color}">
        <span class="category-icon" aria-hidden="true">${category.icon}</span>
        <strong>${category.name}</strong>
        <small>${count} products</small>
      </a>`;
    })
    .join('');
}

function renderProducts() {
  const grid = document.querySelector('#product-grid');
  if (!grid) return;

  const hashQuery = window.location.hash.split('?')[1] ?? '';
  const categoryId = new URLSearchParams(hashQuery).get('category');
  const activeCategory = categories.find(
    (category) => category.id === categoryId,
  );
  const categoryProducts = activeCategory
    ? products.filter((product) => product.category === activeCategory.id)
    : products;
  const visibleProducts = sortProducts(categoryProducts);

  const heading = document.querySelector('#selected-category');
  if (heading) heading.textContent = activeCategory?.name ?? 'All products';

  grid.innerHTML = visibleProducts
    .map(
      (product) => `
    <article class="product-card">
      <div class="product-image" aria-hidden="true"><span>${product.icon}</span></div>
      <div class="product-info">
        <div class="product-title-row">
          <h3>${product.name}</h3>
          <strong>${money(product.price)}</strong>
        </div>
        <p>${product.description}</p>
        <time class="product-upload-date" datetime="${product.dateOfUpload}">
          Uploaded: ${formatUploadDate(product.dateOfUpload)}
        </time>
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
    </article>`,
    )
    .join('');

  // Replacing onclick prevents duplicate listeners when products are re-sorted.
  grid.onclick = (event) => {
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
  };

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
    favorites = favorites.filter((id) => id !== productId);
  } else {
    favorites.push(productId);
  }

  localStorage.setItem('ebuy-favorites', JSON.stringify(favorites));
  renderFavorites();
  updateProductFavoriteButtons();
}

function updateProductFavoriteButtons() {
  const favoriteButtons = document.querySelectorAll('[data-favorite-id]');

  favoriteButtons.forEach((button) => {
    const productId = Number(button.dataset.favoriteId);
    const isFavorite = favorites.includes(productId);

    button.classList.toggle('is-favorite', isFavorite);
    button.setAttribute('aria-pressed', String(isFavorite));

    const product = products.find((item) => item.id === productId);
    const action = isFavorite ? 'Remove' : 'Add';
    button.setAttribute(
      'aria-label',
      `${action} ${product.name} ${isFavorite ? 'from' : 'to'} favorites`,
    );
  });
}

function renderFavorites() {
  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id),
  );
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

  list.innerHTML = favoriteProducts
    .map(
      (product) => `
    <div class="favorite-list-item">
      <span class="favorite-list-icon" aria-hidden="true">${product.icon}</span>
      <div>
        <strong>${product.name}</strong>
        <small>${money(product.price)}</small>
      </div>
      <button type="button" data-remove-favorite-id="${product.id}" aria-label="Remove ${product.name} from favorites">Remove</button>
    </div>
  `,
    )
    .join('');
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

  list.addEventListener('click', (event) => {
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
  return Object.entries(cart)
    .map(([id, quantity]) => ({
      product: products.find((product) => product.id === Number(id)),
      quantity,
    }))
    .filter((entry) => entry.product && entry.quantity > 0);
}

function renderCart() {
  const entries = cartEntries();
  const count = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotal = entries.reduce(
    (sum, entry) => sum + entry.product.price * entry.quantity,
    0,
  );
  const countElement = document.querySelector('#cart-count');
  if (countElement) countElement.textContent = count;

  const miniList = document.querySelector('#mini-cart-list');
  if (miniList) {
    miniList.innerHTML = entries.length
      ? entries
          .map(
            ({ product, quantity }) => `
      <div class="mini-cart-item">
        <div class="item-image" aria-hidden="true">${product.icon}</div>
        <div><strong>${product.name}<span>${money(product.price * quantity)}</span></strong><small>Quantity: ${quantity}</small></div>
      </div>`,
          )
          .join('')
      : '<p>Your cart is empty.</p>';
  }

  const miniTotal = document.querySelector('#mini-total');
  if (miniTotal) miniTotal.textContent = subtotal.toFixed(2);
  const summarySubtotal = document.querySelector('#summary-subtotal');
  if (summarySubtotal) summarySubtotal.textContent = subtotal.toFixed(2);
  const summaryTotal = document.querySelector('#summary-total');
  if (summaryTotal) summaryTotal.textContent = (subtotal + 8).toFixed(2);

  const detailList = document.querySelector('#cart-detail-items');
  if (detailList) {
    detailList.innerHTML = entries.length
      ? entries
          .map(
            ({ product, quantity }) => `
      <div class="cart-detail-item">
        <div class="item-image" aria-hidden="true">${product.icon}</div>
        <div><strong>${product.name}</strong><span>${money(product.price)} × ${quantity}</span></div>
        <b>${money(product.price * quantity)}</b>
      </div>`,
          )
          .join('')
      : '<p>Your cart is empty.</p>';
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
  document
    .querySelector('#open-cart-details')
    ?.addEventListener('click', () => {
      popover.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      dialog.showModal();
    });
  document
    .querySelector('#close-cart-details')
    ?.addEventListener('click', () => dialog.close());
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
          ${createSortMenuHtml()}
        </div>
        <div class="product-grid" id="product-grid"></div>
      </section>`;

    renderProducts();
    setupSortMenu();
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
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

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
