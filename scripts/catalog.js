import { setupPageTransitions } from './navigation/pageTransitions.js';

import { categories, products } from './data/catalogData.js';

const money = (value) => `$${value.toFixed(2)}`;

// Maps make repeated product and category lookups fast, even as the catalog grows.
const productById = new Map(products.map((product) => [product.id, product]));
const productCountByCategory = new Map();

products.forEach((product) => {
  const currentCount = productCountByCategory.get(product.category) ?? 0;
  productCountByCategory.set(product.category, currentCount + 1);
});

// Reuse one formatter instead of creating a new one for every product card.
const uploadDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

// These values are saved in localStorage and used to sort product cards.
const sortOptions = [
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'date-asc', label: 'Date: Oldest First' },
  { value: 'date-desc', label: 'Date: Newest First' },
];

function getSelectedSorts() {
  let savedValue;

  try {
    savedValue = localStorage.getItem('ebuy-sort');
  } catch {
    return ['name-asc'];
  }

  // Support the old single string value already saved in some browsers.
  if (sortOptions.some((option) => option.value === savedValue)) {
    return [savedValue];
  }

  try {
    const savedArray = JSON.parse(savedValue);

    if (Array.isArray(savedArray)) {
      return savedArray.filter((savedOption) =>
        sortOptions.some((option) => option.value === savedOption),
      );
    }
  } catch {
    // An invalid saved value falls back to the default below.
  }

  return ['name-asc'];
}

function saveSelectedSorts(selectedSorts) {
  try {
    localStorage.setItem('ebuy-sort', JSON.stringify(selectedSorts));
  } catch {
    // Ignore storage errors from restricted browser modes.
  }
}

function getSelectedSortLabel() {
  const selectedSorts = getSelectedSorts();

  if (selectedSorts.length === 0) return 'No sorting';
  if (selectedSorts.length > 1) return `${selectedSorts.length} sorting rules`;

  const selectedOption = sortOptions.find(
    (option) => option.value === selectedSorts[0],
  );

  return selectedOption?.label ?? 'Name: A to Z';
}

function compareProducts(a, b, sortRule) {
  switch (sortRule) {
    case 'name-asc':
      return a.name.localeCompare(b.name);
    case 'name-desc':
      return b.name.localeCompare(a.name);
    case 'price-asc':
      return a.price - b.price;
    case 'price-desc':
      return b.price - a.price;
    case 'date-asc':
      return a.dateOfUpload.localeCompare(b.dateOfUpload);
    case 'date-desc':
      return b.dateOfUpload.localeCompare(a.dateOfUpload);
    default:
      return 0;
  }
}

function sortProducts(productList) {
  const selectedSorts = getSelectedSorts();

  return [...productList].sort((a, b) => {
    // Rule 1 has the highest priority. Other rules break matching values.
    for (const sortRule of selectedSorts) {
      const comparison = compareProducts(a, b, sortRule);
      if (comparison !== 0) return comparison;
    }

    // Keep the result predictable when every selected value is equal.
    return a.id - b.id;
  });
}

function createSortMenuHtml() {
  const optionButtons = sortOptions
    .map(
      (option) => `
        <button type="button" data-sort-value="${option.value}">
          <span class="sort-option-dot" aria-hidden="true"></span>
          <span>${option.label}</span>
          <span class="sort-priority" aria-hidden="true"></span>
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
      <div class="sort-options">
        <small>Select up to one rule for name, price, and date. The newest rule becomes priority 1.</small>
        ${optionButtons}
      </div>
    </details>`;
}

function getMaxProductGridColumns() {
  if (window.innerWidth <= 760) return 2;
  if (window.innerWidth <= 1100) return 3;
  if (window.innerWidth <= 1500) return 4;
  if (window.innerWidth <= 1800) return 5;
  return 6;
}

function getPreferredProductGridColumns() {
  try {
    const savedColumns = Number(localStorage.getItem('ebuy-grid-columns'));
    return Number.isInteger(savedColumns) && savedColumns >= 1
      ? Math.min(savedColumns, 6)
      : getMaxProductGridColumns();
  } catch {
    return getMaxProductGridColumns();
  }
}

function createGridControlHtml() {
  const maxColumns = getMaxProductGridColumns();
  const columns = Math.min(getPreferredProductGridColumns(), maxColumns);
  const columnLabel = `${columns} ${columns === 1 ? 'column' : 'columns'}`;

  return `
    <label class="grid-density-control" for="grid-column-slider" title="Products per row">
      <i data-lucide="layout-grid" aria-hidden="true"></i>
      <span class="sr-only">Products per row</span>
      <input
        id="grid-column-slider"
        type="range"
        min="1"
        max="${maxColumns}"
        step="1"
        value="${columns}"
        aria-label="Products per row"
      />
      <output id="grid-column-value" for="grid-column-slider">${columnLabel}</output>
    </label>`;
}

function updateSortMenu() {
  const selectedSorts = getSelectedSorts();
  const label = document.querySelector('#selected-sort-label');
  const buttons = document.querySelectorAll('[data-sort-value]');
  const menu = document.querySelector('.sort-menu');

  if (label) label.textContent = getSelectedSortLabel();
  menu?.classList.toggle('has-active-sorts', selectedSorts.length > 0);

  buttons.forEach((button) => {
    const isSelected = selectedSorts.includes(button.dataset.sortValue);
    const priority = selectedSorts.indexOf(button.dataset.sortValue) + 1;
    const priorityLabel = button.querySelector('.sort-priority');

    button.classList.toggle('is-selected', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));

    if (priorityLabel) {
      priorityLabel.textContent = isSelected ? `Priority ${priority}` : '';
    }
  });
}

function setupSortMenu() {
  const menu = document.querySelector('.sort-menu');
  if (!menu) return;

  menu.addEventListener('click', (event) => {
    const optionButton = event.target.closest('[data-sort-value]');
    if (!optionButton) return;

    const selectedValue = optionButton.dataset.sortValue;
    const selectedField = selectedValue.split('-')[0];
    const currentSorts = getSelectedSorts();
    const isAlreadySelected = currentSorts.includes(selectedValue);

    // Only one direction can be active for each field.
    const nextSorts = currentSorts.filter(
      (sortRule) => !sortRule.startsWith(`${selectedField}-`),
    );

    if (!isAlreadySelected) {
      // Put the newest rule first so every new selection visibly re-sorts.
      nextSorts.unshift(selectedValue);
    }

    saveSelectedSorts(nextSorts);
    updateSortMenu();
    renderProducts();
    menu.open = false;
  });

  updateSortMenu();
}

let gridResizeHandler;

function setupGridControl() {
  const slider = document.querySelector('#grid-column-slider');
  const output = document.querySelector('#grid-column-value');
  const grid = document.querySelector('#product-grid');
  if (!slider || !output || !grid) return;

  let preferredColumns = getPreferredProductGridColumns();

  const updateGrid = () => {
    const maxColumns = getMaxProductGridColumns();
    const columns = Math.min(preferredColumns, maxColumns);

    slider.max = String(maxColumns);
    slider.value = String(columns);
    slider.setAttribute('aria-valuetext', `${columns} per row`);
    grid.style.setProperty('--product-columns', columns);
    output.textContent = `${columns} ${columns === 1 ? 'column' : 'columns'}`;
  };

  slider.addEventListener('input', () => {
    preferredColumns = Number(slider.value);

    try {
      localStorage.setItem('ebuy-grid-columns', String(preferredColumns));
    } catch {
      // The layout still works for this visit if storage is unavailable.
    }

    updateGrid();
  });

  if (gridResizeHandler)
    window.removeEventListener('resize', gridResizeHandler);
  gridResizeHandler = updateGrid;
  window.addEventListener('resize', gridResizeHandler);
  updateGrid();
}

// Keep the dropdown easy to dismiss without creating new document listeners
// whenever the products view is rendered again.
document.addEventListener('click', (event) => {
  const openMenu = document.querySelector('.sort-menu[open]');
  if (openMenu && !openMenu.contains(event.target)) openMenu.open = false;
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;

  const openMenu = document.querySelector('.sort-menu[open]');
  if (!openMenu) return;

  openMenu.open = false;
  openMenu.querySelector('summary')?.focus();
});

function formatUploadDate(dateOfUpload) {
  const date = new Date(`${dateOfUpload}T00:00:00`);
  return uploadDateFormatter.format(date);
}

function renderCategories() {
  const grid = document.querySelector('#category-grid');
  if (!grid) return;

  grid.innerHTML = categories
    .map((category) => {
      const count = productCountByCategory.get(category.id) ?? 0;
      return `
      <a class="category-card" href="#products?category=${category.id}" style="--category-color: ${category.color}">
        <div class="category-image" aria-hidden="true">${category.icon}</div>
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
      <a
        class="product-card-details-link"
        href="product.html?id=${product.id}"
        aria-label="View details for ${product.name}"
      ></a>
      <div class="product-image" aria-hidden="true"><span>${product.icon}</span></div>
      <div class="product-info">
        <div class="product-title-row">
          <h3>${product.name}</h3>
          <strong>${money(product.price)}</strong>
        </div>
        ${product.author ? `<p class="product-author">by ${product.author}</p>` : ''}
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

  try {
    localStorage.setItem('ebuy-favorites', JSON.stringify(favorites));
  } catch {
    // Favorites still work for this visit if browser storage is unavailable.
  }
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

    const product = productById.get(productId);
    if (!product) return;
    const action = isFavorite ? 'Remove' : 'Add';
    button.setAttribute(
      'aria-label',
      `${action} ${product.name} ${isFavorite ? 'from' : 'to'} favorites`,
    );
  });
}

function renderFavorites() {
  const favoriteProducts = favorites
    .map((productId) => productById.get(productId))
    .filter(Boolean);
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

  // Stop safely if the shared header markup is unavailable.
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

  try {
    localStorage.setItem('ebuy-cart', JSON.stringify(cart));
  } catch {
    // The cart still works for this visit if browser storage is unavailable.
  }

  renderCart();
}

function cartEntries() {
  return Object.entries(cart)
    .map(([id, quantity]) => ({
      product: productById.get(Number(id)),
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
          <div class="product-view-controls">
            ${createSortMenuHtml()}
            ${createGridControlHtml()}
          </div>
        </div>
        <div class="product-grid" id="product-grid"></div>
      </section>`;

    renderProducts();
    setupSortMenu();
    setupGridControl();
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

renderCurrentView();
setupPageTransitions(renderCurrentView);
setupFavorites();
renderFavorites();
setupCart();
renderCart();
