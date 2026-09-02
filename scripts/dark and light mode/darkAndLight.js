const site = document.querySelector('#site');
const themeButton = document.querySelector('#theme-button');
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
  const isDark = theme === 'dark';

  site.classList.toggle('dark-mode', isDark);
  document.body.classList.toggle('dark-mode', isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.setAttribute('aria-label', `Use ${isDark ? 'light' : 'dark'} mode`);
  themeButton.title = `Use ${isDark ? 'light' : 'dark'} mode`;
  themeButton.innerHTML = isDark
    ? '<i data-lucide="sun" aria-hidden="true"></i>'
    : '<i data-lucide="moon" aria-hidden="true"></i>';

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

setTheme(savedTheme ?? (systemPrefersDark ? 'dark' : 'light'));

themeButton.addEventListener('click', () => {
  const nextTheme = site.classList.contains('dark-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', nextTheme);
  setTheme(nextTheme);
});
