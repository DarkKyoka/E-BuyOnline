const THEME_STORAGE_KEY = 'theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

const site = document.querySelector('#site');
const themeButton = document.querySelector('#theme-button');

function readSavedTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The selected theme still works until the page is reloaded.
  }
}

function getStartingTheme() {
  const savedTheme = readSavedTheme();

  if (savedTheme === DARK_THEME || savedTheme === LIGHT_THEME) {
    return savedTheme;
  }

  const systemUsesDarkTheme = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;

  return systemUsesDarkTheme ? DARK_THEME : LIGHT_THEME;
}

function applyTheme(theme) {
  const isDark = theme === DARK_THEME;
  const nextThemeName = isDark ? LIGHT_THEME : DARK_THEME;

  site.classList.toggle('dark-mode', isDark);
  document.body.classList.toggle('dark-mode', isDark);
  document.documentElement.style.colorScheme = theme;

  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.setAttribute('aria-label', `Use ${nextThemeName} mode`);
  themeButton.title = `Use ${nextThemeName} mode`;
  themeButton.innerHTML = isDark
    ? '<i data-lucide="sun" aria-hidden="true"></i>'
    : '<i data-lucide="moon" aria-hidden="true"></i>';

  window.lucide?.createIcons();
}

function toggleTheme() {
  const currentTheme = site.classList.contains('dark-mode')
    ? DARK_THEME
    : LIGHT_THEME;
  const nextTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

  saveTheme(nextTheme);
  applyTheme(nextTheme);
}

// Both pages that load this script contain these two required elements.
if (site && themeButton) {
  applyTheme(getStartingTheme());
  themeButton.addEventListener('click', toggleTheme);
}
