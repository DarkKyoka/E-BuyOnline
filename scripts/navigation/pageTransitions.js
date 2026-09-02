const transitionLinks = document.querySelectorAll('.page-transition-link');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const transitionDuration = prefersReducedMotion ? 0 : 320;

transitionLinks.forEach(link => {
  link.addEventListener('click', event => {
    const isModifiedClick = event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;

    if (isModifiedClick || link.target === '_blank') {
      return;
    }

    event.preventDefault();
    document.body.classList.add('page-is-leaving');

    window.setTimeout(() => {
      window.location.href = link.href;
    }, transitionDuration);
  });
});

window.addEventListener('pageshow', () => {
  document.body.classList.remove('page-is-leaving');
});
