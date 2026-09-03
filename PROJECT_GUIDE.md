# E-Buy Online — Project Study Guide

This guide explains what the project contains, how its main features work, and how to safely extend it.

## 1. What we built

E-Buy Online is a small front-end shop made with HTML, CSS, and JavaScript. It includes:

- a shared header and contact footer;
- Home, Categories, and Products views;
- hash-based navigation without full page reloads;
- 55 sample products across eight categories;
- sorting by name, price, and upload date;
- multiple sorting rules with priorities;
- a favorites list;
- a shopping cart and cart-details dialog;
- light and dark themes;
- responsive layouts for desktop, tablet, and phone;
- page and hero-button animations;
- local browser storage for user choices.

There is no server or database yet. All product data lives in JavaScript, and user choices are saved in the browser.

## 2. Files you should study

```text
eBuyOnline/
|-- pages/
|   |-- index.html              Main HTML shell
|   |-- product.html            Individual product view
|   |-- categories.html         Legacy redirect
|   |-- products.html           Legacy redirect
|   `-- css/
|       |-- styles.css          Main application styles
|       |-- product.css         Individual product-page styles
|       |-- animations.css      Keyframe animations
|       `-- webstorm-starter.css
|-- scripts/
|   |-- catalog.js              Sorting, cart, favorites, and routing
|   |-- productDetails.js       Individual product-page behavior
|   |-- data/catalogData.js     Shared categories and products
|   `-- dark and light mode/
|       `-- darkAndLight.js     Theme switching
|-- public/                     Static images and fonts
|-- vite.config.js              Vite project configuration
|-- package.json                Commands and development dependencies
`-- PROJECT_GUIDE.md            This guide
```

These old WebStorm starter files are not used by the shop:

```text
src/main.js
pages/css/webstorm-starter.css
public/background.svg
public/javascript.svg
public/technologies.svg
```

You do not need to study `pages/css/webstorm-starter.css` to understand the current shop design. The active shop stylesheets are grouped under `pages/css/`.

## 3. Running the project

Install dependencies once:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create an optimized production build:

```bash
npm run build
```

Vite uses `pages/index.html` as the main source page. The production result is written to `dist/`.

## 4. The shared HTML shell

The real interface structure is in `pages/index.html`.

The header, contact footer, and cart dialog are created once and remain on the page. JavaScript replaces only this element:

```html
<div id="page-content"></div>
```

This prevents us from copying the same header and footer into every page.

The structure is approximately:

```text
site
├── shared header
├── page-content       JavaScript changes this part
├── shared footer
└── cart dialog
```

The short `categories.html` and `products.html` files only redirect old URLs into the shared application. They do not contain separate copies of the interface.

## 5. Navigation and views

The application uses the URL hash—the part after `#`—to decide which middle view to display.

```text
#home
#categories
#products?category=electronics
#about
```

For example:

```html
<a href="#categories">Products</a>
```

When the hash changes, this listener runs:

```js
window.addEventListener('hashchange', animateToCurrentView);
```

`animateToCurrentView()` handles the transition. It then calls `renderCurrentView()`, which reads the hash and creates the correct HTML inside `#page-content`.

This pattern is a small version of a Single-Page Application, often shortened to SPA.

## 6. Categories

Categories are defined near the top of `scripts/catalog.js`:

```js
const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '🎧',
    color: '#dbeafe',
  },
];
```

Each property has a job:

- `id` connects the category to its products and URL;
- `name` is the text shown to the user;
- `icon` is shown inside the category card;
- `color` becomes the card's light background accent.

`renderCategories()` converts this array into category-card links. A link looks like:

```text
#products?category=electronics
```

The displayed product count comes from `productCountByCategory`, which is calculated once when the script loads.

## 7. Product data

Products are objects inside the `products` array:

```js
{
  id: 53,
  category: 'books',
  name: '1984',
  author: 'George Orwell',
  price: 15,
  dateOfUpload: '2025-06-25',
  icon: '📕',
  description: 'A dystopian novel about truth, power, and surveillance.',
}
```

Important rules:

1. Every `id` must be unique.
2. `category` must equal an existing category ID.
3. `price` must be a number, not a string such as `"$15"`.
4. `dateOfUpload` should use `YYYY-MM-DD` format.
5. `author` is optional and is mainly used by book products.

### Adding a product

Copy an existing object and change its values:

```js
{
  id: 56,
  category: 'books',
  name: 'Animal Farm',
  author: 'George Orwell',
  price: 14,
  dateOfUpload: '2026-09-02',
  icon: '📗',
  description: 'A political allegory told through a farm rebellion.',
}
```

The category count and product screen update automatically.

## 8. Rendering product cards

`renderProducts()` performs these steps:

1. Reads the category from the URL hash.
2. Filters the complete product array.
3. Passes the filtered products to `sortProducts()`.
4. Converts each product object into card HTML.
5. Inserts the cards into `#product-grid`.
6. connects cart and favorite button clicks.

The original product array is not changed during sorting. This copy protects it:

```js
const sortedProducts = [...productList];
```

The project uses one click handler on the product grid instead of adding a separate handler to every card. This technique is called event delegation.

```js
grid.onclick = (event) => {
  const addButton = event.target.closest('[data-product-id]');
};
```

The `data-product-id` attribute connects a rendered button back to its product object.

## 9. Multi-rule sorting

The available sorting choices are stored in `sortOptions`:

```js
const sortOptions = [
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'date-desc', label: 'Date: Newest First' },
];
```

The full array contains ascending and descending choices for all three fields.

Only one direction per field can be active. For example, selecting `price-desc` replaces `price-asc`.

The newest selection becomes Priority 1. Other active rules resolve matching values.

Example priorities:

```text
Priority 1: Price — Low to High
Priority 2: Date — Newest First
Priority 3: Name — A to Z
```

The comparison works like this:

```js
for (const sortRule of selectedSorts) {
  const comparison = compareProducts(a, b, sortRule);

  if (comparison !== 0) {
    return comparison;
  }
}
```

If two prices match, JavaScript checks the date. If those dates also match, it checks the name.

### Why ISO dates help

A date such as `2026-08-31` places the largest unit first: year, month, then day. Therefore string comparison also produces chronological order:

```js
a.dateOfUpload.localeCompare(b.dateOfUpload);
```

## 10. Local storage

`localStorage` saves small strings in the user's browser. Its data remains after a refresh.

The project uses four keys:

| Key              | Stored value                 | Example                     |
| ---------------- | ---------------------------- | --------------------------- |
| `ebuy-sort`      | array of sorting rules       | `["price-asc", "name-asc"]` |
| `ebuy-favorites` | array of product IDs         | `[1, 53, 54]`               |
| `ebuy-cart`      | object of IDs and quantities | `{"1": 2, "53": 1}`         |
| `theme`          | selected theme string        | `"dark"`                    |

Objects and arrays must be converted to strings before storage:

```js
localStorage.setItem('ebuy-favorites', JSON.stringify(favorites));
```

They are converted back when read:

```js
const favorites = JSON.parse(localStorage.getItem('ebuy-favorites'));
```

The project wraps storage access in `try...catch` because privacy settings can sometimes block storage.

Local storage belongs to one browser and one device. A real account system would save this data on a server instead.

## 11. Favorites

Favorites are represented by an array of product IDs:

```js
[1, 53, 54];
```

`toggleFavorite(productId)` checks whether an ID is already present:

- if present, it removes the ID;
- if absent, it adds the ID;
- then it saves and rerenders the favorites.

`updateProductFavoriteButtons()` synchronizes every visible heart button with the saved array.

The `productById` map provides fast product lookup:

```js
const productById = new Map(products.map((product) => [product.id, product]));
```

Instead of searching through all 55 products repeatedly, the code can use:

```js
productById.get(productId);
```

## 12. Shopping cart

The cart is an object in which each key is a product ID and each value is a quantity:

```js
{
  1: 2,
  53: 1,
}
```

`addToCart(productId)` increases the quantity:

```js
cart[productId] = (cart[productId] ?? 0) + 1;
```

The `?? 0` means “use zero when this product has no quantity yet.”

`renderCart()` calculates:

- total item quantity;
- subtotal;
- tax and delivery charges;
- final total;
- mini-cart rows;
- detailed cart rows.

The native HTML `<dialog>` element is used for the full cart view.

## 13. Light and dark mode

Theme logic lives in `scripts/dark and light mode/darkAndLight.js`.

`setTheme(theme)` adds or removes the `dark-mode` class:

```js
site.classList.toggle('dark-mode', isDark);
document.body.classList.toggle('dark-mode', isDark);
```

CSS then changes custom properties:

```css
.site.dark-mode {
  --page-bg: #102c29;
  --green: #8affaa;
  --surface: #202a29;
  --text: #f6fffc;
}
```

Using variables avoids rewriting the color on every element.

The theme is saved under the `theme` local-storage key. When there is no saved theme, the code checks the operating system's preference.

## 14. CSS organization

The active `pages/css/styles.css` file is divided into labeled sections:

```text
Colors
Basic page styles
Shared page layout
Top navigation
Favorites and cart popovers
Home view
Categories view
Products view
Contact footer
Cart details dialog
Responsive layouts
```

The variables at the top contain reusable colors:

```css
:root {
  --mint: #71ffde;
  --green: #008c1e;
  --purple: #8911bd;
  --pink: #fc4884;
}
```

Change a variable when you want to update the color everywhere it is used.

## 15. Responsive layout

Category and product grids use `auto-fit`:

```css
grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
```

In plain language:

1. Create as many columns as fit.
2. Keep each column around 16rem or wider.
3. Never make a column wider than a small screen.
4. Share remaining space evenly.

Additional media queries adjust the layout at:

- `1100px` for tablets;
- `760px` for phones;
- `560px` for small phones.

The cards use a vertical flex layout. `margin-top: auto` keeps action buttons aligned at the bottom even when titles have different lengths.

## 16. Animations

Keyframe animations are kept in `pages/css/animations.css` so the main stylesheet stays focused on appearance and layout.

It contains:

- the initial page entrance;
- middle-view entrance and exit animations;
- the repeating hero-button icon bounce.

The hero bounce uses `translateY`:

```css
@keyframes hero-icon-bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-0.45rem);
  }
}
```

Animations are disabled when a user prefers reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .hero-cta svg {
    animation: none;
  }
}
```

## 17. Performance choices

Several small optimizations help the app remain responsive:

- `productById` replaces repeated full-array searches;
- category counts are calculated once;
- one `Intl.DateTimeFormat` instance formats every date;
- event delegation avoids dozens of click listeners;
- unfinished navigation timers are cancelled during rapid clicks;
- the off-screen footer uses `content-visibility: auto`;
- Vite minifies and bundles production files;
- a preconnect hint starts the Lucide CDN connection early.

The project is still small, so readable code is more important than advanced micro-optimizations.

## 18. Useful JavaScript ideas in this project

### `map`

Transforms every item and returns a new array:

```js
products.map((product) => product.name);
```

### `filter`

Keeps items that pass a condition:

```js
products.filter((product) => product.category === 'books');
```

### `find`

Returns the first matching item:

```js
categories.find((category) => category.id === categoryId);
```

### `reduce`

Combines several values into one value:

```js
entries.reduce((total, entry) => total + entry.quantity, 0);
```

### Spread syntax

Creates a shallow array copy:

```js
const copiedProducts = [...products];
```

### Template literals

Insert variables into strings:

```js
const message = `Uploaded: ${product.dateOfUpload}`;
```

## 19. Common mistakes to avoid

### Duplicate product IDs

Cart and favorite logic use the ID to identify products. Duplicate IDs will connect the wrong product.

### Incorrect category IDs

`category: 'book'` will not match the existing `books` category.

### Prices stored as text

Use `price: 25`, not `price: '$25'`. Numeric sorting and total calculation require numbers.

### Dates in different formats

Keep `YYYY-MM-DD`. Mixing `02/09/2026` and `2026-09-02` breaks reliable sorting.

### Editing the unused stylesheet

Use `pages/css/styles.css` for the shop and `pages/css/product.css` for the individual product page. `pages/css/webstorm-starter.css` belongs to the original starter project.

### Opening HTML directly

Use `npm run dev` instead of opening the HTML with a `file://` URL. JavaScript modules and Vite paths work correctly through the development server.

## 20. Suggested study exercises

Try these in order:

1. Change one root color variable and find every affected component.
2. Add one new product with a unique ID.
3. Add a completely new category and connect two products to it.
4. Add a remove button to each cart row.
5. Add increase and decrease quantity buttons.
6. Add a text search before sorting.
7. Show an empty-state message when a category has no products.
8. Move product data into a separate `products.js` module.
9. Replace emoji placeholders with optimized local images.
10. Connect the catalog to an API or database.

## 21. Feature flow summary

```text
User chooses a category
        ↓
URL hash changes
        ↓
renderCurrentView() creates the Products view
        ↓
renderProducts() filters and sorts product data
        ↓
Product cards are inserted into the grid
        ↓
Cart/favorite clicks update state and localStorage
        ↓
The affected interface is rendered again
```

When studying the project, begin with `pages/index.html`, continue with `renderCurrentView()` in `scripts/catalog.js`, and then follow each render or setup function one at a time.
