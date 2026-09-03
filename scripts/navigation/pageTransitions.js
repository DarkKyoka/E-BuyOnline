const LEAVE_DURATION = 260;
const ENTER_DURATION = 420;

/**
 * Runs the shared view renderer between the leave and enter animations.
 * The page shell stays mounted while only #page-content is replaced.
 */
export function setupPageTransitions(renderView) {
  const pageContent = document.querySelector('#page-content');
  const reducedMotionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  );

  if (!pageContent || typeof renderView !== 'function') return;

  let activeAnimation;
  let transitionId = 0;

  const runAnimation = (keyframes, options) => {
    activeAnimation?.cancel();
    activeAnimation = pageContent.animate(keyframes, options);
    return activeAnimation.finished.catch(() => undefined);
  };

  const playEnterAnimation = () =>
    runAnimation(
      [
        { opacity: 0, transform: 'translateX(2.5rem) scale(0.985)' },
        { opacity: 1, transform: 'translateX(0) scale(1)' },
      ],
      {
        duration: ENTER_DURATION,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    );

  const renderWithTransition = async () => {
    const currentTransitionId = ++transitionId;

    if (reducedMotionQuery.matches || !pageContent.animate) {
      activeAnimation?.cancel();
      renderView();
      return;
    }

    await runAnimation(
      [
        { opacity: 1, transform: 'translateX(0) scale(1)' },
        { opacity: 0, transform: 'translateX(-2rem) scale(0.985)' },
      ],
      {
        duration: LEAVE_DURATION,
        easing: 'cubic-bezier(0.4, 0, 1, 1)',
        fill: 'forwards',
      },
    );

    // A newer hash change owns the renderer if users navigate very quickly.
    if (currentTransitionId !== transitionId) return;

    activeAnimation?.cancel();
    renderView();
    await playEnterAnimation();

    if (currentTransitionId === transitionId) activeAnimation = undefined;
  };

  const resetAfterHistoryRestore = (event) => {
    if (!event.persisted) return;
    transitionId += 1;
    activeAnimation?.cancel();
    activeAnimation = undefined;
  };

  window.addEventListener('hashchange', renderWithTransition);
  window.addEventListener('pageshow', resetAfterHistoryRestore);

  if (!reducedMotionQuery.matches && pageContent.animate) playEnterAnimation();
}
