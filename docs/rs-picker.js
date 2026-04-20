/**
 * Lightweight date / time popover pickers for the design-system demo.
 * No dependencies; styled via .rs-picker* classes in design-system.css
 */
(function () {
  const pad2 = (n) => String(Math.max(0, Math.min(99, n))).padStart(2, '0');

  const parseYmd = (s) => {
    if (!s || typeof s !== 'string') return null;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
    if (!m) return null;
    const y = Number(m[1]);
    const mo = Number(m[2]);
    const d = Number(m[3]);
    return { y, m: mo, d };
  };

  const ymdToISO = (y, m, d) => `${y}-${pad2(m)}-${pad2(d)}`;

  const formatDateLong = (y, m, d) => {
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDateDots = (y, m, d) => `${pad2(d)}.${pad2(m)}.${y}`;

  const clampMinsToDay = (mins) => Math.max(0, Math.min(1439, mins));

  const roundMinsToStep = (mins, step) => clampMinsToDay(Math.round(mins / step) * step);

  const minsToHm = (total) => ({ h: Math.floor(total / 60) % 24, m: total % 60 });

  const hmToMins = (h, m) => clampMinsToDay(h * 60 + m);

  const adjustMeridian = (mins, wantPM) => {
    const inPM = mins >= 720;
    if (wantPM && !inPM) return clampMinsToDay(mins + 720);
    if (!wantPM && inPM) return clampMinsToDay(mins - 720);
    return mins;
  };

  const isPMFromMins = (mins) => mins >= 720;

  const formatSlotLabel = (totalMins) => {
    const { h: h24, m: mi } = minsToHm(totalMins);
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;
    return `${h12}:${pad2(mi)}`;
  };

  const syncMeridianUi = (amBtn, pmBtn, isPM) => {
    if (!amBtn || !pmBtn) return;
    amBtn.classList.toggle('is-active', !isPM);
    pmBtn.classList.toggle('is-active', isPM);
    amBtn.setAttribute('aria-pressed', String(!isPM));
    pmBtn.setAttribute('aria-pressed', String(isPM));
  };

  const renderTimeSlots = (container, step, selectedMins, isPM, onPick) => {
    const start = isPM ? 720 : 0;
    const end = isPM ? 1440 : 720;
    container.innerHTML = '';
    for (let m = start; m < end; m += step) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'rs-time-panel__slot';
      b.textContent = formatSlotLabel(m);
      if (m === selectedMins) b.classList.add('rs-time-panel__slot--active');
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        onPick(m);
      });
      container.appendChild(b);
    }
  };

  const formatTime12FromParts = (h24, mi) => {
    const am = h24 < 12;
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;
    return `${h12}:${pad2(mi)} ${am ? 'AM' : 'PM'}`;
  };

  const parseTime = (s) => {
    if (!s || typeof s !== 'string') return { h: 0, m: 0 };
    const m = /^(\d{1,2}):(\d{2})$/.exec(s.trim());
    if (!m) return { h: 0, m: 0 };
    return { h: Number(m[1]), m: Number(m[2]) };
  };

  const parseLocalDatetime = (s) => {
    if (!s || typeof s !== 'string') return null;
    const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(s.trim());
    if (!m) return null;
    return {
      y: Number(m[1]),
      mo: Number(m[2]),
      d: Number(m[3]),
      h: Number(m[4]),
      mi: Number(m[5]),
    };
  };

  const toDatetimeValue = (y, mo, d, h, mi) =>
    `${ymdToISO(y, mo, d)}T${pad2(h)}:${pad2(mi)}`;

  const closeAllPickers = () => {
    document.querySelectorAll('.rs-picker__panel').forEach((p) => {
      p.hidden = true;
    });
    document.querySelectorAll('.rs-picker__trigger[aria-expanded="true"]').forEach((t) => {
      t.setAttribute('aria-expanded', 'false');
    });
  };

  const openPicker = (panel, trigger) => {
    closeAllPickers();
    panel.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  const isSameYmd = (a, y, m, d) => a && a.y === y && a.m === m && a.d === d;

  const todayYmd = () => {
    const t = new Date();
    return { y: t.getFullYear(), m: t.getMonth() + 1, d: t.getDate() };
  };

  function mountDateOnly(cfg) {
    const hidden = document.getElementById(cfg.hiddenId);
    const trigger = document.getElementById(cfg.triggerId);
    const panel = document.getElementById(cfg.panelId);
    const titleEl = document.getElementById(cfg.titleId);
    const gridEl = document.getElementById(cfg.gridId);
    const weekdaysEl = document.getElementById(cfg.weekdaysId);
    const display = document.getElementById(cfg.displayId);
    if (!hidden || !trigger || !panel || !gridEl || !display) return;

    const weekdayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    weekdaysEl.innerHTML = weekdayLabels
      .map((w) => `<div class="rs-date-panel__weekday">${w}</div>`)
      .join('');

    let viewY;
    let viewM;
    /** @type {{ y: number; m: number; d: number } | null} */
    let pending = null;

    const syncDisplay = () => {
      const s = parseYmd(hidden.value);
      if (s) {
        display.textContent = formatDateDots(s.y, s.m, s.d);
        display.classList.remove('rs-picker__trigger-value--placeholder');
      } else {
        display.textContent = '—';
        display.classList.add('rs-picker__trigger-value--placeholder');
      }
    };

    const renderTitle = () => {
      const dt = new Date(viewY, viewM - 1, 1);
      titleEl.textContent = dt.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    };

    const renderGrid = () => {
      const first = new Date(viewY, viewM - 1, 1);
      const pad = (first.getDay() + 6) % 7;
      gridEl.innerHTML = '';
      const t = todayYmd();
      let prevOfPending = null;
      if (pending) {
        const pd = new Date(pending.y, pending.m - 1, pending.d - 1);
        prevOfPending = { y: pd.getFullYear(), m: pd.getMonth() + 1, d: pd.getDate() };
      }

      for (let i = 0; i < 42; i += 1) {
        const cell = new Date(viewY, viewM - 1, 1 - pad + i);
        const cy = cell.getFullYear();
        const cm = cell.getMonth() + 1;
        const cd = cell.getDate();
        const muted = cm !== viewM;
        const isToday = cy === t.y && cm === t.m && cd === t.d;
        const isSel = pending && isSameYmd(pending, cy, cm, cd);
        const isPrevSel =
          prevOfPending &&
          cy === prevOfPending.y &&
          cm === prevOfPending.m &&
          cd === prevOfPending.d;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'rs-date-panel__day';
        btn.textContent = String(cd);
        if (muted) btn.classList.add('rs-date-panel__day--muted');
        if (isToday) btn.classList.add('rs-date-panel__day--today');
        if (isSel) btn.classList.add('rs-date-panel__day--selected');
        if (isPrevSel && !isSel) btn.classList.add('rs-date-panel__day--adjacent');
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          pending = { y: cy, m: cm, d: cd };
          renderGrid();
        });
        gridEl.appendChild(btn);
      }
    };

    const goMonth = (delta) => {
      const d = new Date(viewY, viewM - 1 + delta, 1);
      viewY = d.getFullYear();
      viewM = d.getMonth() + 1;
      renderTitle();
      renderGrid();
    };

    const initViewFromValue = () => {
      const s = parseYmd(hidden.value) || todayYmd();
      viewY = s.y;
      viewM = s.m;
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!panel.hidden) {
        closeAllPickers();
        return;
      }
      pending = parseYmd(hidden.value);
      initViewFromValue();
      renderTitle();
      renderGrid();
      openPicker(panel, trigger);
    });

    document.getElementById(cfg.prevId)?.addEventListener('click', (e) => {
      e.stopPropagation();
      goMonth(-1);
    });
    document.getElementById(cfg.nextId)?.addEventListener('click', (e) => {
      e.stopPropagation();
      goMonth(1);
    });
    document.getElementById(cfg.removeId)?.addEventListener('click', (e) => {
      e.stopPropagation();
      hidden.value = '';
      pending = null;
      syncDisplay();
      closeAllPickers();
    });
    document.getElementById(cfg.doneId)?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (pending) hidden.value = ymdToISO(pending.y, pending.m, pending.d);
      syncDisplay();
      closeAllPickers();
    });

    initViewFromValue();
    syncDisplay();
  }

  function mountTimeOnly(cfg) {
    const hidden = document.getElementById(cfg.hiddenId);
    const trigger = document.getElementById(cfg.triggerId);
    const panel = document.getElementById(cfg.panelId);
    const slotsEl = document.getElementById(cfg.slotsId);
    const amBtn = document.getElementById(cfg.amId);
    const pmBtn = document.getElementById(cfg.pmId);
    const display = document.getElementById(cfg.displayId);
    if (!hidden || !trigger || !panel || !slotsEl || !display) return;

    const step = cfg.stepMinutes || 30;
    let panelMins = 0;

    const syncDisplayFromHidden = () => {
      const p = parseTime(hidden.value);
      panelMins = roundMinsToStep(hmToMins(p.h, p.m), step);
      const { h, m } = minsToHm(panelMins);
      display.textContent = formatTime12FromParts(h, m);
      display.classList.remove('rs-picker__trigger-value--placeholder');
    };

    const renderSlots = () => {
      const isPM = isPMFromMins(panelMins);
      syncMeridianUi(amBtn, pmBtn, isPM);
      renderTimeSlots(slotsEl, step, panelMins, isPM, (m) => {
        panelMins = m;
        renderSlots();
      });
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!panel.hidden) {
        closeAllPickers();
        return;
      }
      syncDisplayFromHidden();
      renderSlots();
      openPicker(panel, trigger);
    });

    amBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      panelMins = adjustMeridian(panelMins, false);
      renderSlots();
    });
    pmBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      panelMins = adjustMeridian(panelMins, true);
      renderSlots();
    });

    document.getElementById(cfg.removeId)?.addEventListener('click', (e) => {
      e.stopPropagation();
      hidden.value = '00:00';
      syncDisplayFromHidden();
      closeAllPickers();
    });
    document.getElementById(cfg.doneId)?.addEventListener('click', (e) => {
      e.stopPropagation();
      const { h, m } = minsToHm(panelMins);
      hidden.value = `${pad2(h)}:${pad2(m)}`;
      syncDisplayFromHidden();
      closeAllPickers();
    });

    syncDisplayFromHidden();
  }

  function mountDatetime(cfg) {
    const hidden = document.getElementById(cfg.hiddenId);
    const trigger = document.getElementById(cfg.triggerId);
    const panel = document.getElementById(cfg.panelId);
    const titleEl = document.getElementById(cfg.titleId);
    const gridEl = document.getElementById(cfg.gridId);
    const weekdaysEl = document.getElementById(cfg.weekdaysId);
    const slotsEl = document.getElementById(cfg.slotsId);
    const amBtn = document.getElementById(cfg.amId);
    const pmBtn = document.getElementById(cfg.pmId);
    const display = document.getElementById(cfg.displayId);
    if (!hidden || !trigger || !panel || !gridEl || !display || !slotsEl) return;

    const step = cfg.stepMinutes || 30;
    const weekdayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    weekdaysEl.innerHTML = weekdayLabels
      .map((w) => `<div class="rs-date-panel__weekday">${w}</div>`)
      .join('');

    let viewY;
    let viewM;
    /** @type {{ y: number; m: number; d: number } | null} */
    let pendingDate = null;
    let panelMins = 0;

    const syncDisplayFromHidden = () => {
      const p = parseLocalDatetime(hidden.value);
      if (p) {
        const { h, m } = minsToHm(roundMinsToStep(hmToMins(p.h, p.mi), step));
        display.textContent = `${formatDateDots(p.y, p.mo, p.d)} · ${formatTime12FromParts(h, m)}`;
        display.classList.remove('rs-picker__trigger-value--placeholder');
      } else {
        display.textContent = '—';
        display.classList.add('rs-picker__trigger-value--placeholder');
      }
    };

    const loadPanelFromHidden = () => {
      const p = parseLocalDatetime(hidden.value);
      const now = new Date();
      if (p) {
        pendingDate = { y: p.y, m: p.mo, d: p.d };
        panelMins = roundMinsToStep(hmToMins(p.h, p.mi), step);
        viewY = p.y;
        viewM = p.mo;
      } else {
        pendingDate = null;
        const n = todayYmd();
        viewY = n.y;
        viewM = n.m;
        panelMins = roundMinsToStep(hmToMins(now.getHours(), now.getMinutes()), step);
      }
    };

    const renderTitle = () => {
      const dt = new Date(viewY, viewM - 1, 1);
      titleEl.textContent = dt.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    };

    const renderGrid = () => {
      const first = new Date(viewY, viewM - 1, 1);
      const pad = (first.getDay() + 6) % 7;
      gridEl.innerHTML = '';
      const t = todayYmd();
      let prevOfPending = null;
      if (pendingDate) {
        const pd = new Date(pendingDate.y, pendingDate.m - 1, pendingDate.d - 1);
        prevOfPending = { y: pd.getFullYear(), m: pd.getMonth() + 1, d: pd.getDate() };
      }

      for (let i = 0; i < 42; i += 1) {
        const cell = new Date(viewY, viewM - 1, 1 - pad + i);
        const cy = cell.getFullYear();
        const cm = cell.getMonth() + 1;
        const cd = cell.getDate();
        const muted = cm !== viewM;
        const isToday = cy === t.y && cm === t.m && cd === t.d;
        const isSel = pendingDate && isSameYmd(pendingDate, cy, cm, cd);
        const isPrevSel =
          prevOfPending &&
          cy === prevOfPending.y &&
          cm === prevOfPending.m &&
          cd === prevOfPending.d;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'rs-date-panel__day';
        btn.textContent = String(cd);
        if (muted) btn.classList.add('rs-date-panel__day--muted');
        if (isToday) btn.classList.add('rs-date-panel__day--today');
        if (isSel) btn.classList.add('rs-date-panel__day--selected');
        if (isPrevSel && !isSel) btn.classList.add('rs-date-panel__day--adjacent');
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          pendingDate = { y: cy, m: cm, d: cd };
          renderGrid();
        });
        gridEl.appendChild(btn);
      }
    };

    const renderSlots = () => {
      const isPM = isPMFromMins(panelMins);
      syncMeridianUi(amBtn, pmBtn, isPM);
      renderTimeSlots(slotsEl, step, panelMins, isPM, (m) => {
        panelMins = m;
        renderSlots();
      });
    };

    const goMonth = (delta) => {
      const d = new Date(viewY, viewM - 1 + delta, 1);
      viewY = d.getFullYear();
      viewM = d.getMonth() + 1;
      renderTitle();
      renderGrid();
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!panel.hidden) {
        closeAllPickers();
        return;
      }
      loadPanelFromHidden();
      renderTitle();
      renderGrid();
      renderSlots();
      openPicker(panel, trigger);
    });

    document.getElementById(cfg.prevId)?.addEventListener('click', (e) => {
      e.stopPropagation();
      goMonth(-1);
    });
    document.getElementById(cfg.nextId)?.addEventListener('click', (e) => {
      e.stopPropagation();
      goMonth(1);
    });

    amBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      panelMins = adjustMeridian(panelMins, false);
      renderSlots();
    });
    pmBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      panelMins = adjustMeridian(panelMins, true);
      renderSlots();
    });

    document.getElementById(cfg.removeId)?.addEventListener('click', (e) => {
      e.stopPropagation();
      hidden.value = '';
      syncDisplayFromHidden();
      closeAllPickers();
    });
    document.getElementById(cfg.doneId)?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (pendingDate) {
        const { h, m } = minsToHm(panelMins);
        hidden.value = toDatetimeValue(pendingDate.y, pendingDate.m, pendingDate.d, h, m);
      }
      syncDisplayFromHidden();
      closeAllPickers();
    });

    loadPanelFromHidden();
    syncDisplayFromHidden();
  }

  let outsideClickBound = false;

  function bindOutsideCloseOnce() {
    if (outsideClickBound) return;
    outsideClickBound = true;
    document.addEventListener('click', (e) => {
      if (e.target.closest('.rs-picker')) return;
      closeAllPickers();
    });
  }

  window.rsClosePickers = closeAllPickers;

  window.rsInitPickers = function rsInitPickers() {
    mountDateOnly({
      hiddenId: 'demo-date-value',
      triggerId: 'demo-date-trigger',
      panelId: 'demo-date-panel',
      titleId: 'demo-date-month-title',
      gridId: 'demo-date-grid',
      weekdaysId: 'demo-date-weekdays',
      displayId: 'demo-date-display',
      prevId: 'demo-date-prev',
      nextId: 'demo-date-next',
      removeId: 'demo-date-remove',
      doneId: 'demo-date-done',
    });

    mountTimeOnly({
      hiddenId: 'demo-time-value',
      triggerId: 'demo-time-trigger',
      panelId: 'demo-time-panel',
      slotsId: 'demo-time-slots',
      amId: 'demo-time-am',
      pmId: 'demo-time-pm',
      displayId: 'demo-time-display',
      removeId: 'demo-time-remove',
      doneId: 'demo-time-done',
      stepMinutes: 30,
    });

    mountDatetime({
      hiddenId: 'demo-dt-value',
      triggerId: 'demo-dt-trigger',
      panelId: 'demo-dt-panel',
      titleId: 'demo-dt-month-title',
      gridId: 'demo-dt-grid',
      weekdaysId: 'demo-dt-weekdays',
      slotsId: 'demo-dt-slots',
      amId: 'demo-dt-am',
      pmId: 'demo-dt-pm',
      displayId: 'demo-dt-display',
      prevId: 'demo-dt-prev',
      nextId: 'demo-dt-next',
      removeId: 'demo-dt-remove',
      doneId: 'demo-dt-done',
      stepMinutes: 30,
    });

    bindOutsideCloseOnce();
  };
})();
