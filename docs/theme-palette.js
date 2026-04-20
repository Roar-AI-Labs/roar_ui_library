/**
 * Accent palette switcher — neutral surfaces stay in CSS; brand tokens swap via data-palette.
 */
(function (global) {
  const STORAGE_KEY = 'rs-palette';
  const IDS = ['neutral', 'slate', 'teal', 'violet', 'amber', 'rose'];

  function applyPalette(id) {
    const p = IDS.includes(id) ? id : 'neutral';
    document.documentElement.setAttribute('data-palette', p);
    try {
      localStorage.setItem(STORAGE_KEY, p);
    } catch (e) {
      console.warn('Palette preference could not be saved.', e);
    }
    global.dispatchEvent(new CustomEvent('rs-palette-change', { detail: { palette: p } }));
  }

  function syncButtons(root) {
    const scope = root || document;
    const current = document.documentElement.getAttribute('data-palette') || 'neutral';
    scope.querySelectorAll('[data-set-palette]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.setPalette === current));
    });
  }

  global.rsPalette = {
    apply: applyPalette,
    syncButtons: syncButtons,
    ids: IDS,
  };
})(typeof window !== 'undefined' ? window : this);
