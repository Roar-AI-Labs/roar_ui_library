/**
 * Chart.js gallery for Roar design system — destroys/recreates on theme change.
 * Requires: chart-theme.js, Chart.js 4.x (UMD).
 */
(function (global) {
  const instances = [];

  function destroyAll() {
    while (instances.length) {
      const c = instances.pop();
      try {
        c.destroy();
      } catch (e) {
        /* ignore */
      }
    }
  }

  function addChart(canvasId, config) {
    if (typeof Chart === 'undefined') return;
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const chart = new Chart(canvas.getContext('2d'), config);
    instances.push(chart);
  }

  function withStack(baseOpts) {
    return {
      ...baseOpts,
      scales: {
        ...baseOpts.scales,
        x: { ...baseOpts.scales.x, stacked: true },
        y: { ...baseOpts.scales.y, stacked: true },
      },
    };
  }

  global.rsChartsDestroy = destroyAll;

  global.rsChartsInit = function rsChartsInit() {
    if (typeof Chart === 'undefined' || !global.rsChartTokens) return;
    destroyAll();

    const t = global.rsChartTokens();
    const H = global.rsChartHelpers || {};
    const hoverLine = H.lineHoverOnly ? H.lineHoverOnly(t) : {};
    const areaGrad = (color, stops) =>
      H.areaGradient ? H.areaGradient(color, stops) : color;
    const barSheen = (color, a, b) =>
      H.barSheen ? H.barSheen(color, a, b) : color;

    const full = () => global.rsChartCartesianOptions(t, 'full');
    const panel = () => global.rsChartCartesianOptions(t, 'panel');
    const radFull = () => global.rsChartRadialOptions(t, 'full');
    const radPanel = () => global.rsChartRadialOptions(t, 'panel');

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'];
    const regions = ['EMEA', 'Americas', 'APAC', 'LATAM'];

    const revenue = [42, 55, 48, 72, 68, 91];
    const costs = [28, 30, 34, 38, 36, 40];
    const units = [1200, 1450, 1320, 1680, 1590, 1820];
    const marginPct = [2.1, 2.4, 2.8, 3.2, 3.0, 3.5];

    const stackA = [18, 22, 20, 28, 26, 30];
    const stackB = [14, 16, 15, 20, 22, 24];
    const stackC = [10, 12, 11, 16, 14, 18];

    const rankVals = [92, 78, 65, 54];

    const histBins = [2, 8, 14, 22, 18, 11, 6, 3, 1, 0, 0, 0];

    // —— Full: multi-series line (gradient under primary; points on hover only) ——
    addChart('rs-chart-line-full', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Revenue ($k)',
            data: revenue,
            borderColor: t.primary,
            backgroundColor: areaGrad(t.primary, { bottom: 0, mid: 0.11, top: 0.34 }),
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            ...hoverLine,
          },
          {
            label: 'Costs ($k)',
            data: costs,
            borderColor: t.cat3,
            backgroundColor: 'transparent',
            tension: 0.4,
            fill: false,
            borderWidth: 2,
            ...hoverLine,
          },
        ],
      },
      options: full(),
    });

    // —— Full: area ——
    addChart('rs-chart-area-full', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Net new ($k)',
            data: [12, 19, 15, 28, 24, 36],
            borderColor: t.primary,
            backgroundColor: areaGrad(t.primary, { bottom: 0, mid: 0.16, top: 0.4 }),
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            ...hoverLine,
          },
        ],
      },
      options: full(),
    });

    // —— Full: stepped line ——
    addChart('rs-chart-step-full', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Seats billed',
            data: [120, 120, 180, 180, 180, 240],
            borderColor: t.primaryPressed,
            backgroundColor: areaGrad(t.primaryPressed, { bottom: 0, mid: 0.09, top: 0.22 }),
            stepped: true,
            fill: true,
            borderWidth: 2,
            ...hoverLine,
          },
        ],
      },
      options: full(),
    });

    // —— Full: vertical bar ——
    addChart('rs-chart-bar-full', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Orders',
            data: units,
            backgroundColor: barSheen(t.primary, 0.4, 0.12),
            borderColor: t.primary,
            borderWidth: 1,
            borderRadius: 6,
          },
        ],
      },
      options: full(),
    });

    // —— Full: stacked bar ——
    addChart('rs-chart-stacked-full', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          { label: 'Direct', data: stackA, backgroundColor: t.primary, borderRadius: 4 },
          { label: 'Partner', data: stackB, backgroundColor: t.primaryPressed, borderRadius: 4 },
          { label: 'Self-serve', data: stackC, backgroundColor: t.cat3, borderRadius: 4 },
        ],
      },
      options: withStack(full()),
    });

    // —— Full: horizontal bar ——
    addChart('rs-chart-hbar-full', {
      type: 'bar',
      data: {
        labels: regions,
        datasets: [
          {
            label: 'Pipeline ($M)',
            data: rankVals,
            backgroundColor: [t.primary, t.primaryPressed, t.primarySubdued, t.cat3],
            borderRadius: 6,
          },
        ],
      },
      options: {
        ...full(),
        indexAxis: 'y',
      },
    });

    // —— Full: histogram-style (dense bars) ——
    addChart('rs-chart-hist-full', {
      type: 'bar',
      data: {
        labels: weeks,
        datasets: [
          {
            label: 'Signups / week',
            data: histBins,
            backgroundColor: barSheen(t.primary, 0.36, 0.1),
            borderColor: t.primary,
            borderWidth: 1,
            borderRadius: 3,
          },
        ],
      },
      options: full(),
    });

    // —— Full: mixed bar + line ——
    const baseFull = full();
    addChart('rs-chart-mixed-full', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            type: 'bar',
            label: 'Units sold',
            data: [820, 910, 880, 1020, 980, 1100],
            backgroundColor: t.primarySubdued,
            borderColor: t.primary,
            borderWidth: 1,
            borderRadius: 6,
            yAxisID: 'y',
          },
          {
            type: 'line',
            label: 'Margin %',
            data: marginPct,
            borderColor: t.success,
            backgroundColor: areaGrad(t.success, { bottom: 0, mid: 0.05, top: 0.14 }),
            borderWidth: 2,
            tension: 0.35,
            fill: true,
            yAxisID: 'y1',
            ...hoverLine,
          },
        ],
      },
      options: {
        ...baseFull,
        scales: {
          ...baseFull.scales,
          y: {
            ...baseFull.scales.y,
            position: 'left',
            title: { display: true, text: 'Units', color: t.contentSecondary, font: { size: 11 } },
          },
          y1: {
            type: 'linear',
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: { color: t.success, font: baseFull.scales.y.ticks.font },
            title: { display: true, text: 'Margin %', color: t.success, font: { size: 11 } },
            suggestedMin: 0,
          },
        },
      },
    });

    // —— Full: doughnut ——
    addChart('rs-chart-doughnut-full', {
      type: 'doughnut',
      data: {
        labels: ['Product', 'Services', 'Other'],
        datasets: [
          {
            data: [58, 28, 14],
            backgroundColor: [t.primary, t.primaryPressed, t.cat3],
            borderColor: t.surface,
            borderWidth: 2,
            hoverOffset: 8,
          },
        ],
      },
      options: radFull(),
    });

    // —— Full: radar ——
    addChart('rs-chart-radar-full', {
      type: 'radar',
      data: {
        labels: ['Speed', 'Reliability', 'UX', 'Price', 'Support'],
        datasets: [
          {
            label: 'This quarter',
            data: [82, 74, 88, 65, 79],
            borderColor: t.primary,
            backgroundColor: areaGrad(t.primary, { bottom: 0, mid: 0.08, top: 0.2 }),
            borderWidth: 2,
            fill: true,
            ...hoverLine,
          },
          {
            label: 'Last quarter',
            data: [76, 80, 72, 70, 74],
            borderColor: t.cat3,
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [4, 4],
            fill: false,
            ...hoverLine,
          },
        ],
      },
      options: {
        ...radFull(),
        scales: {
          r: {
            angleLines: { color: t.border },
            grid: { color: t.border },
            pointLabels: { color: t.contentSecondary, font: { size: 11, family: t.font } },
            ticks: { backdropColor: 'transparent', color: t.contentSecondary },
          },
        },
      },
    });

    // —— Full: polar area ——
    addChart('rs-chart-polar-full', {
      type: 'polarArea',
      data: {
        labels: ['Alpha', 'Beta', 'Gamma', 'Delta'],
        datasets: [
          {
            data: [42, 28, 18, 12],
            backgroundColor: [t.primary, t.primaryPressed, t.cat3, t.primarySubdued],
            borderColor: t.surface,
            borderWidth: 2,
          },
        ],
      },
      options: {
        ...radFull(),
        scales: {
          r: {
            grid: { color: t.border },
            ticks: { backdropColor: 'transparent', color: t.contentSecondary },
          },
        },
      },
    });

    // —— Full: bubble ——
    addChart('rs-chart-bubble-full', {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'Accounts',
            data: [
              { x: 8, y: 14, r: 12 },
              { x: 12, y: 22, r: 18 },
              { x: 18, y: 18, r: 14 },
              { x: 22, y: 28, r: 22 },
              { x: 28, y: 20, r: 16 },
              { x: 15, y: 32, r: 10 },
            ],
            backgroundColor: t.primarySubdued,
            borderColor: t.primary,
          },
        ],
      },
      options: {
        ...full(),
        scales: {
          x: {
            ...full().scales.x,
            title: { display: true, text: 'Tenure (mo)', color: t.contentSecondary, font: { size: 11 } },
          },
          y: {
            ...full().scales.y,
            title: { display: true, text: 'Adoption score', color: t.contentSecondary, font: { size: 11 } },
          },
        },
        plugins: {
          ...full().plugins,
          tooltip: {
            ...full().plugins.tooltip,
            callbacks: {
              label(ctx) {
                const { raw } = ctx;
                if (raw && typeof raw === 'object') {
                  return `Tenure ${raw.x} mo · Score ${raw.y} · ARR tier ${raw.r}`;
                }
                return ctx.formattedValue;
              },
            },
          },
        },
      },
    });

    // —— Panel: same interactions, tighter layout ——
    addChart('rs-chart-line-panel', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Revenue ($k)',
            data: revenue,
            borderColor: t.primary,
            backgroundColor: areaGrad(t.primary, { bottom: 0, mid: 0.1, top: 0.32 }),
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            ...hoverLine,
          },
          {
            label: 'Costs ($k)',
            data: costs,
            borderColor: t.cat3,
            backgroundColor: 'transparent',
            tension: 0.4,
            fill: false,
            borderWidth: 2,
            ...hoverLine,
          },
        ],
      },
      options: panel(),
    });

    addChart('rs-chart-area-panel', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Net new ($k)',
            data: [12, 19, 15, 28, 24, 36],
            borderColor: t.primary,
            backgroundColor: areaGrad(t.primary, { bottom: 0, mid: 0.15, top: 0.38 }),
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            ...hoverLine,
          },
        ],
      },
      options: panel(),
    });

    addChart('rs-chart-bar-panel', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Orders',
            data: units,
            backgroundColor: barSheen(t.primary, 0.38, 0.11),
            borderColor: t.primary,
            borderWidth: 1,
            borderRadius: 5,
          },
        ],
      },
      options: panel(),
    });

    addChart('rs-chart-stacked-panel', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          { label: 'Direct', data: stackA, backgroundColor: t.primary, borderRadius: 3 },
          { label: 'Partner', data: stackB, backgroundColor: t.primaryPressed, borderRadius: 3 },
          { label: 'Self-serve', data: stackC, backgroundColor: t.cat3, borderRadius: 3 },
        ],
      },
      options: withStack(panel()),
    });

    const basePanel = panel();
    addChart('rs-chart-mixed-panel', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            type: 'bar',
            label: 'Units sold',
            data: [820, 910, 880, 1020, 980, 1100],
            backgroundColor: t.primarySubdued,
            borderColor: t.primary,
            borderWidth: 1,
            borderRadius: 5,
            yAxisID: 'y',
          },
          {
            type: 'line',
            label: 'Margin %',
            data: marginPct,
            borderColor: t.success,
            backgroundColor: areaGrad(t.success, { bottom: 0, mid: 0.05, top: 0.13 }),
            borderWidth: 2,
            tension: 0.35,
            fill: true,
            yAxisID: 'y1',
            ...hoverLine,
          },
        ],
      },
      options: {
        ...basePanel,
        scales: {
          ...basePanel.scales,
          y: { ...basePanel.scales.y, position: 'left' },
          y1: {
            type: 'linear',
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: { color: t.success, font: basePanel.scales.y.ticks.font },
            suggestedMin: 0,
          },
        },
      },
    });

    addChart('rs-chart-doughnut-panel', {
      type: 'doughnut',
      data: {
        labels: ['Product', 'Services', 'Other'],
        datasets: [
          {
            data: [58, 28, 14],
            backgroundColor: [t.primary, t.primaryPressed, t.cat3],
            borderColor: t.surface,
            borderWidth: 2,
            hoverOffset: 6,
          },
        ],
      },
      options: radPanel(),
    });
  };

  /* ---- Dashboard prototype (index components + Chart.js) ---- */
  const dashInstances = [];

  function destroyDashboardCharts() {
    while (dashInstances.length) {
      const c = dashInstances.pop();
      try {
        c.destroy();
      } catch (e) {
        /* ignore */
      }
    }
  }

  function addDashboardChart(canvasId, config) {
    if (typeof Chart === 'undefined') return;
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const chart = new Chart(canvas.getContext('2d'), config);
    dashInstances.push(chart);
  }

  global.rsChartsDestroyDashboard = destroyDashboardCharts;

  global.rsChartsInitDashboard = function rsChartsInitDashboard() {
    if (typeof Chart === 'undefined' || !global.rsChartTokens) return;
    destroyDashboardCharts();

    const t = global.rsChartTokens();
    const H = global.rsChartHelpers || {};
    const hoverLine = H.lineHoverOnly ? H.lineHoverOnly(t) : {};
    const areaGrad = (color, stops) =>
      H.areaGradient ? H.areaGradient(color, stops) : color;
    const barSheen = (color, a, b) =>
      H.barSheen ? H.barSheen(color, a, b) : color;

    const full = () => global.rsChartCartesianOptions(t, 'full');
    const panel = () => global.rsChartCartesianOptions(t, 'panel');
    const radPanel = () => global.rsChartRadialOptions(t, 'panel');

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const revenue = [42, 55, 48, 72, 68, 91];
    const costs = [28, 30, 34, 38, 36, 40];
    const units = [1200, 1450, 1320, 1680, 1590, 1820];

    addDashboardChart('dash-chart-revenue', {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Revenue ($k)',
            data: revenue,
            borderColor: t.primary,
            backgroundColor: areaGrad(t.primary, { bottom: 0, mid: 0.11, top: 0.34 }),
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            ...hoverLine,
          },
          {
            label: 'Costs ($k)',
            data: costs,
            borderColor: t.cat3,
            backgroundColor: 'transparent',
            tension: 0.4,
            fill: false,
            borderWidth: 2,
            ...hoverLine,
          },
        ],
      },
      options: full(),
    });

    addDashboardChart('dash-chart-orders', {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Orders',
            data: units,
            backgroundColor: barSheen(t.primary, 0.38, 0.11),
            borderColor: t.primary,
            borderWidth: 1,
            borderRadius: 5,
          },
        ],
      },
      options: panel(),
    });

    addDashboardChart('dash-chart-mix', {
      type: 'doughnut',
      data: {
        labels: ['Direct', 'Partner', 'Self-serve'],
        datasets: [
          {
            data: [52, 31, 17],
            backgroundColor: [t.primary, t.primaryPressed, t.cat3],
            borderColor: t.surface,
            borderWidth: 2,
            hoverOffset: 6,
          },
        ],
      },
      options: radPanel(),
    });
  };
})(typeof window !== 'undefined' ? window : this);
