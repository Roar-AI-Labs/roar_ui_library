/**
 * Reads Roar design tokens from CSS custom properties for Chart.js.
 */
(function (global) {
  function pick(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function fontStack() {
    const f = pick('--rs-font-family', 'Inter');
    return f.includes(',') ? f : `${f}, system-ui, sans-serif`;
  }

  function tokens() {
    return {
      primary: pick('--rs-color-primary', '#3d4149'),
      primaryPressed: pick('--rs-color-primary-pressed', '#25282e'),
      primarySubdued: pick('--rs-color-primary-subdued', 'rgba(28, 29, 34, 0.12)'),
      cat3: pick('--rs-color-cat-3', '#656874'),
      border: pick('--rs-color-border', '#e8e6e1'),
      content: pick('--rs-color-content', '#1c1d22'),
      contentSecondary: pick('--rs-color-content-secondary', '#656874'),
      success: pick('--rs-color-success', '#0d7a5c'),
      error: pick('--rs-color-error', '#c41c1c'),
      warning: pick('--rs-color-warning', '#b45309'),
      surface: pick('--rs-color-surface-raised', '#ffffff'),
      font: fontStack(),
    };
  }

  /** @param {'full' | 'panel'} density */
  function cartesianOptions(t, density) {
    const panel = density === 'panel';
    const tickFont = { size: panel ? 10 : 11, family: t.font };
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 720,
        easing: 'easeOutCubic',
      },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: panel ? 10 : 12,
            padding: panel ? 8 : 12,
            color: t.contentSecondary,
            font: { size: panel ? 10 : 11, family: t.font },
          },
        },
        tooltip: {
          backgroundColor: t.surface,
          titleColor: t.content,
          bodyColor: t.contentSecondary,
          borderColor: t.border,
          borderWidth: 1,
          padding: panel ? 8 : 12,
          cornerRadius: 8,
          titleFont: { size: panel ? 11 : 12, weight: '600', family: t.font },
          bodyFont: { size: panel ? 10 : 11, family: t.font },
          displayColors: true,
          boxPadding: 4,
        },
      },
      scales: {
        x: {
          grid: { color: t.border, drawBorder: false },
          ticks: { color: t.contentSecondary, font: tickFont },
        },
        y: {
          grid: { color: t.border, drawBorder: false },
          ticks: { color: t.contentSecondary, font: tickFont },
          beginAtZero: true,
        },
      },
    };
  }

  /**
   * Convert CSS hex / rgb / rgba to rgba(...) with a new alpha.
   */
  function cssColorToRgba(css, alpha) {
    if (css == null || css === '') return `rgba(0,0,0,${alpha})`;
    const s = String(css).trim();
    const rgbaMatch = s.match(/^rgba?\(\s*([^)]+)\)/i);
    if (rgbaMatch) {
      const parts = rgbaMatch[1].split(',').map((x) => x.trim());
      if (parts.length >= 3) {
        return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
      }
    }
    let h = s.replace('#', '');
    if (h.length === 3) h = h.split('').map((ch) => ch + ch).join('');
    if (h.length === 6) {
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }
    return s;
  }

  /**
   * Vertical gradient under line / area charts (stronger toward the line at top).
   * @param {{ bottom?: number, mid?: number, top?: number }} stopAlphas
   */
  function verticalAreaGradient(context, color, stopAlphas) {
    const { bottom = 0, mid = 0.12, top = 0.3 } = stopAlphas || {};
    const chart = context.chart;
    const { ctx, chartArea } = chart;
    if (!chartArea) return cssColorToRgba(color, top);
    const g = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    g.addColorStop(0, cssColorToRgba(color, bottom));
    g.addColorStop(0.55, cssColorToRgba(color, mid));
    g.addColorStop(1, cssColorToRgba(color, top));
    return g;
  }

  /** Subtle vertical sheen for bar columns (darker near baseline). */
  function barSheenGradient(context, color, strongAlpha, weakAlpha) {
    const chart = context.chart;
    const { ctx, chartArea } = chart;
    if (!chartArea) return cssColorToRgba(color, strongAlpha);
    const g = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    g.addColorStop(0, cssColorToRgba(color, strongAlpha));
    g.addColorStop(1, cssColorToRgba(color, weakAlpha));
    return g;
  }

  /**
   * Line points hidden until hover — tooltip still shows values on the spine.
   * @param {{ surface: string }} t token bag from tokens()
   */
  function lineHoverOnly(t) {
    const rim = t.surface || pick('--rs-color-surface-raised', '#ffffff');
    return {
      pointRadius: 0,
      pointHoverRadius: 6,
      hitRadius: 20,
      pointBorderWidth: 0,
      pointHoverBorderWidth: 2,
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: (ctx) => ctx.dataset.borderColor,
      pointHoverBorderColor: rim,
    };
  }

  /** @param {'full' | 'panel'} density */
  function radialOptions(t, density) {
    const panel = density === 'panel';
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 720,
        easing: 'easeOutCubic',
      },
      interaction: { intersect: true, mode: 'point' },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: panel ? 10 : 12,
            padding: panel ? 8 : 12,
            color: t.contentSecondary,
            font: { size: panel ? 10 : 11, family: t.font },
          },
        },
        tooltip: {
          backgroundColor: t.surface,
          titleColor: t.content,
          bodyColor: t.contentSecondary,
          borderColor: t.border,
          borderWidth: 1,
          padding: panel ? 8 : 12,
          cornerRadius: 8,
        },
      },
    };
  }

  global.rsChartTokens = tokens;
  global.rsChartCartesianOptions = cartesianOptions;
  global.rsChartRadialOptions = radialOptions;
  global.rsChartHelpers = {
    cssColorToRgba,
    areaGradient: (color, stopAlphas) => (context) => verticalAreaGradient(context, color, stopAlphas),
    barSheen: (color, strongAlpha = 0.38, weakAlpha = 0.1) => (context) =>
      barSheenGradient(context, color, strongAlpha, weakAlpha),
    lineHoverOnly,
  };
})(typeof window !== 'undefined' ? window : this);
