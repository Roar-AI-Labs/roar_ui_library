/**
 * Subtle scroll / view reveal for design-system pages. Adds .rs-motion to targets,
 * toggles .rs-motion--visible when elements intersect the viewport.
 */
(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function markVisible(el) {
    el.classList.add('rs-motion--visible');
  }

  function addClass(root, selector) {
    root.querySelectorAll(selector).forEach((el) => {
      el.classList.add('rs-motion');
    });
  }

  function collectTargets(doc) {
    const main = doc.querySelector('.ds-main');
    if (main) {
      addClass(doc, '.ds-main .ds-page-intro');
      addClass(doc, '.ds-main > .ds-demo');
      doc.querySelectorAll('.ds-main .ds-section').forEach((section) => {
        const gallery = section.querySelector(':scope > .rs-chart-gallery');
        if (gallery) {
          gallery.querySelectorAll(':scope > *').forEach((el) => el.classList.add('rs-motion'));
        } else {
          section.classList.add('rs-motion');
        }
      });
      addClass(doc, '.ds-chart-page__toolbar');
    }

    if (doc.querySelector('.dashboard-main')) {
      addClass(doc, '.dashboard-main > .dashboard-topbar');
      doc.querySelectorAll('.dashboard-view-pane > section').forEach((el) => el.classList.add('rs-motion'));
      addClass(doc, '.dashboard-sidebar .dashboard-upgrade');
    }
  }

  function runObserver() {
    if (reducedMotion.matches) {
      document.querySelectorAll('.rs-motion').forEach(markVisible);
      return;
    }

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          markVisible(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: '0px 0px -5% 0px', threshold: 0.04 }
    );

    document.querySelectorAll('.rs-motion:not(.rs-motion--visible)').forEach((el) => {
      if (el.closest('.dashboard-view-pane[hidden]')) return;
      io.observe(el);
    });
  }

  function init() {
    collectTargets(document);
    runObserver();
  }

  window.rsMotionRefresh = function rsMotionRefresh() {
    if (reducedMotion.matches) {
      document.querySelectorAll('.rs-motion').forEach(markVisible);
      return;
    }
    document.querySelectorAll('.dashboard-view-pane[hidden] .rs-motion').forEach((el) => {
      el.classList.remove('rs-motion--visible');
    });
    runObserver();
  };

  const onReducedMotionChange = () => {
    if (reducedMotion.matches) document.querySelectorAll('.rs-motion').forEach(markVisible);
    else {
      document.querySelectorAll('.rs-motion').forEach((el) => el.classList.remove('rs-motion--visible'));
      runObserver();
    }
  };
  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', onReducedMotionChange);
  } else if (typeof reducedMotion.addListener === 'function') {
    reducedMotion.addListener(onReducedMotionChange);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
