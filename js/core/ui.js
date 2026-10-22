'use strict';
/* Powłoka telefonu: ekran główny, aplikacje, nawigacja, powiadomienia, nakładki. */

const UI = (() => {
  const { h, $, $$ } = U;
  let screen, home, appsLayer, bannersEl, toastsEl, lockEl = null, statusEl, island, homebar;
  let current = null;
  const apps = {};
  const overlays = [];
  let locked = false;
  let lockWallpaperCleanup = null;

  /* ---------- ikony aplikacji ---------- */
  const GLYPH = {
    messages: '<path d="M27 15c0 6-5 10-11 10-2 0-4-.4-5-1L5 27l2-6c-2-2-3-4-3-6C4 9 9 5 16 5s11 4 11 10z" fill="#fff"/>',
    phone: '<path d="M10.5 6h4l2 5.5-2.6 2a14 14 0 006.6 6.6l2-2.6 5.5 2v4a2.5 2.5 0 01-2.5 2.5A20.5 20.5 0 018 8.5 2.5 2.5 0 0110.5 6z" fill="#fff"/>',
    browser: '<circle cx="16" cy="16" r="10.5" fill="none" stroke="#fff" stroke-width="2.4"/><path d="M20.5 11.5l-3 6-6 3 3-6z" fill="#fff"/><circle cx="16" cy="16" r="1.4" fill="#2a6fb0"/>',
    gallery: ['#ffb444','#ff704b','#ed5f9a','#b87cc4','#7a8fd8','#6cc6dc','#6acb9b','#b7d765'].map((color,i)=>`<ellipse cx="16" cy="9.7" rx="4.6" ry="7.1" fill="${color}" opacity=".82" transform="rotate(${i*45} 16 16)"/>`).join(''),
    nimbus: '<path d="M10 24h13.5a5.5 5.5 0 00.8-10.9A8 8 0 009 14.5 4.8 4.8 0 0010 24z" fill="#fff"/><path d="M16 15v6M13.2 18l2.8-3 2.8 3" stroke="#c4466a" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    maps: '<path d="M6 9l6.5-2.5L19.5 9 26 6.5v16.5L19.5 25.5 12.5 23 6 25.5z" fill="#fff" opacity=".9"/><path d="M12.5 6.5V23M19.5 9v16.5" stroke="#1d7c74" stroke-width="1.5"/><path d="M19.5 7.5c-2.2 0-4 1.8-4 4 0 3 4 6.5 4 6.5s4-3.5 4-6.5c0-2.2-1.8-4-4-4z" fill="#e5484d"/><circle cx="19.5" cy="11.5" r="1.4" fill="#fff"/>',
    case: '<path d="M5 10h8l2 2.5h12V25a1.5 1.5 0 01-1.5 1.5h-19A1.5 1.5 0 015 25z" fill="#fff"/><circle cx="17.5" cy="19" r="3.6" fill="none" stroke="#8a5a12" stroke-width="2"/><path d="M20.2 21.7l3 3" stroke="#8a5a12" stroke-width="2.2" stroke-linecap="round"/>',
    settings: '<circle cx="16" cy="16" r="4.2" fill="none" stroke="#fff" stroke-width="2.4"/><path d="M16 5v4M16 23v4M27 16h-4M9 16H5M23.8 8.2l-2.8 2.8M11 21l-2.8 2.8M23.8 23.8L21 21M11 11L8.2 8.2" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>',
    ciemnia: '<circle cx="16" cy="16" r="10" fill="none" stroke="#fff" stroke-width="2.2"/><path d="M16 6l3 8.5M26 16l-8.5 3M16 26l-3-8.5M6 16l8.5-3M23 9l-6 6.3M9 23l6-6.3M23 23l-6.3-6M9 9l6.3 6" stroke="#fff" stroke-width="1.6"/><circle cx="16" cy="16" r="3" fill="#ff5a4a"/>',
    bushview: '<rect x="9" y="5" width="14" height="22" rx="4" fill="#fff"/><circle cx="16" cy="13" r="3.8" fill="#4d5a2a"/><circle cx="16" cy="13" r="1.5" fill="#c6d38a"/><rect x="12" y="20" width="8" height="2" rx="1" fill="#4d5a2a"/><circle cx="12" cy="8" r=".9" fill="#e5484d"/>',
    weather: '<path d="M8 21h15M6 25h20M10 17h14" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".85"/><circle cx="20" cy="10" r="4" fill="#ffd27a"/>',
    notes: '<path d="M7 13h18M7 18h18M7 23h18" stroke="#b4b4b8" stroke-width="1"/>',
    calendar: '<rect x="6" y="7" width="20" height="19" rx="3" fill="#fff"/><rect x="6" y="7" width="20" height="6" rx="2.5" fill="#e5484d"/><text x="16" y="23.5" font-size="10" font-weight="700" text-anchor="middle" fill="#222" font-family="Inter,Segoe UI,sans-serif">DAY</text>',
    clock: '<circle cx="16" cy="16" r="10.5" fill="#fff"/><path d="M16 9v7l4.5 3" stroke="#111" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="16" cy="16" r="1.4" fill="#e5484d"/>'
  };
  const GRAD = {
    messages: 'linear-gradient(#64e175,#20c543)',
    phone: 'linear-gradient(160deg,#5be38f,#1f9d55)',
    browser: 'linear-gradient(160deg,#5aa8f0,#1e5a9e)',
    gallery: '#fff',
    nimbus: 'linear-gradient(160deg,#f49bb4,#b8355c)',
    maps: 'linear-gradient(160deg,#58d0c0,#17716a)',
    case: 'linear-gradient(160deg,#f2c25c,#a46a10)',
    settings: 'linear-gradient(160deg,#8d96a3,#4a525d)',
    ciemnia: 'linear-gradient(160deg,#a8322b,#3d0c0a)',
    bushview: 'linear-gradient(160deg,#94a550,#3d4a1b)',
    weather: 'linear-gradient(160deg,#6b8ba8,#2c3e52)',
    notes: 'linear-gradient(#ffcc00 0 29%,#fff 29%)',
    calendar: 'linear-gradient(160deg,#ffffff,#e9e9ee)',
    clock: 'linear-gradient(160deg,#2b2b2e,#0b0b0c)'
  };
  const glyph = id => `<svg viewBox="0 0 32 32" width="34" height="34">${(GLYPH[id] || '').replace('>DAY<', `>${G.s ? new Date(G.now()).getDate() : 21}<`)}</svg>`;

  /* ---------- system: iOS albo Android ---------- */
  function detectOS() {
    const pref = G.settings.os || 'auto';
    if (pref === 'ios' || pref === 'android') return pref;
    const ua = navigator.userAgent || '';
    if (/Android/i.test(ua)) return 'android';
    return 'ios';
  }
  let OS = 'ios';
  const LABELS = {
    ios: { gallery: 'Zdjęcia', browser: 'Safari', messages: 'Wiadomości', phone: 'Telefon' },
    android: { gallery: 'Galeria', browser: 'Internet', messages: 'Wiadomości', phone: 'Telefon' }
  };
  const appName = a => (LABELS[OS] && LABELS[OS][a.id]) || a.name;

  function def(id, meta) { apps[id] = Object.assign({ id }, meta); }
  const appUnlocked = id => { const a = apps[id]; return a && (!a.unlock || G.isUnlocked(a.unlock)); };

  /* ---------- budowa ---------- */
  function build() {
    SeasonPacing.init();
    OS = detectOS();
    document.body.classList.add('os-' + OS);
    applyAppearance();
    BUS.on('settings', applyAppearance);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyAppearance);
    const stage = h('div', { id: 'stage' },
      h('aside', { class: 'stage-side' }, h('div', { class: 'stage-kicker' }, 'INTERAKTYWNY THRILLER'), h('b', {}, 'MGLISKO'),
        h('p', {}, 'Nie znasz tych ludzi.', h('br'), 'Jeszcze.'),
        h('small', {}, 'Jedna nieodebrana rozmowa. Całe miasto, które ma coś do ukrycia.'),
        h('div', { class: 'stage-save' }, h('i'), 'Twoje wybory zostają.')),
      h('div', { id: 'device' }, screen = h('div', { id: 'screen' })));
    document.body.appendChild(stage);
    island = h('div', { id: 'island' });
    statusEl = h('div', { id: 'status' });
    home = h('div', { id: 'home' });
    Wallpapers.bind(home, () => UI.openWallpapers());
    appsLayer = h('div', { id: 'apps' });
    bannersEl = h('div', { id: 'banners' });
    toastsEl = h('div', { id: 'toasts' });
    homebar = OS === 'android'
      ? h('div', { id: 'homebar', class: 'nav3' },
        h('button', { 'aria-label': 'Wstecz', onclick: () => { SFX.play.tap(); back(); }, html: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M16 5L7 12l9 7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>' }),
        h('button', { 'aria-label': 'Ekran główny', onclick: () => { SFX.play.tap(); goHome(); }, html: '<svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>' }),
        h('button', { 'aria-label': 'Ostatnie aplikacje', onclick: () => { SFX.play.tap(); recents(); }, html: '<svg viewBox="0 0 24 24" width="20" height="20"><rect x="5.5" y="5.5" width="13" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>' }))
      : h('div', { id: 'homebar', title: 'Ekran główny', onclick: () => goHome() });
    screen.append(home, appsLayer, statusEl, island, bannersEl, toastsEl, homebar);
    renderStatus();
    fit();
    window.addEventListener('resize', fit);
    const keyboardFit = () => {
      const viewport = window.visualViewport;
      const editing = document.activeElement?.matches('input,textarea');
      const inset = viewport && editing ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop) : 0;
      document.body.style.setProperty('--keyboard-inset', inset > 100 ? `${inset}px` : '0px');
      document.body.classList.toggle('keyboard-open', inset > 100);
    };
    window.visualViewport?.addEventListener('resize', keyboardFit);
    document.addEventListener('focusin', keyboardFit);
    document.addEventListener('focusout', () => setTimeout(keyboardFit, 0));
    document.addEventListener('fullscreenchange', fit);
    setInterval(tick, 1000);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') back(); });
    // Przycisk „wstecz” w przeglądarce/Androidzie cofa w telefonie zamiast zamykać grę.
    try {
      history.pushState({ trap: 1 }, '');
      window.addEventListener('popstate', () => { back(); history.pushState({ trap: 1 }, ''); });
    } catch (e) { /* file:// bez historii */ }
    BUS.on('badges', scheduleHome);
    BUS.on('unlock', key => {
      scheduleHome();
      if (key.startsWith('app:')) {
        const a = Object.values(apps).find(x => x.unlock === key);
        if (a && G.s && G.s.pc > 0) { toast(`Zainstalowano: ${appName(a)}`, { kind: 'app', icon: 'check' }); SFX.play.unlock(); }
      }
    });
    BUS.on('msg', onMsg);
    BUS.on('evidence', () => scheduleHome());
    ['goal', 'clock', 'solved', 'conversations', 'wallpaper'].forEach(event => BUS.on(event, scheduleHome));
    BUS.on('wallpaper', () => { if (lockEl) lockEl.style.cssText = Wallpapers.style(Wallpapers.selected()); });
  }

  function fit() {
    const mobile = window.innerWidth <= 520 || (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 900);
    document.body.classList.toggle('mobile', mobile);
    // Na prawdziwym telefonie pokazujemy własny pasek stanu tylko na pełnym ekranie — inaczej widać systemowy.
    const full = !!document.fullscreenElement || window.matchMedia('(display-mode: fullscreen)').matches || window.matchMedia('(display-mode: standalone)').matches || navigator.standalone || window.Capacitor?.isNativePlatform();
    const hardware = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    document.body.classList.toggle('real-status', mobile && hardware && !full);
    const dev = $('#device');
    if (!mobile) {
      const k = Math.min(1, (window.innerHeight - 32) / dev.offsetHeight, (window.innerWidth - 32) / dev.offsetWidth);
      dev.style.transform = `scale(${k})`;
    } else dev.style.transform = '';
  }

  /* ---------- pasek stanu i zegar ---------- */
  function renderStatus() {
    statusEl.innerHTML = '';
    statusEl.append(
      h('span', { class: 'st-t' }, G.s ? U.time(G.now()) : '21:03'),
      h('span', { class: 'st-r' }, U.ico('signal', 17), h('span', { style: 'font-size:12px' }, '5G'), h('span', { class: 'bat' }, h('i', { style: `--lvl:${battery()}%` })))
    );
  }
  function battery() {
    if (!G.s) return 72;
    const base = { prolog: 74, ch1: 61, ch2: 48, ch3: 66, ch4: 82, ch5: 37, epilog: 90 }[G.s.chapter] || 70;
    return Math.max(8, base - Math.floor(((Date.now() - (G.s.clock.at || Date.now())) / 60000) / 3));
  }
  function tick() {
    if (!G.s) return;
    const t = U.time(G.now());
    const st = $('.st-t', statusEl); if (st && st.textContent !== t) renderStatus();
    const wt = $('.w-time', home); if (wt && wt.textContent !== t) { wt.textContent = t; $('.w-date', home).textContent = cap(U.dayLong(G.now())); }
    if (lockEl) { const lt = $('.lk-t', lockEl); if (lt) lt.textContent = t; }
    if (G.s && !document.hidden && !G.s.clock.paused) G.s.playMs = (G.s.playMs || 0) + 1000;
  }
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  function applyAppearance() {
    const pref = G.settings.appearance || 'light';
    document.body.classList.toggle('dark-ui', pref === 'dark' || pref === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  /* ---------- ekran główny ---------- */
  let homeQueued = false;
  function scheduleHome() { if (homeQueued) return; homeQueued = true; requestAnimationFrame(() => { homeQueued = false; renderHome(); }); }
  function renderHome() {
    if (!G.s) return;
    home.style.cssText = Wallpapers.style(Wallpapers.selected());
    home.innerHTML = '';
    const dock = ['phone', 'messages', 'browser', 'gallery'];
    function appIcon(id) {
      const a = apps[id], n = a.badge ? a.badge() : 0;
      return h('button', { class: 'app-ic', 'aria-label': appName(a), onclick: e => openApp(id, {}, e.currentTarget) },
        h('span', { class: 'ic', style: `--g:${GRAD[id]}` }, h('span', { html: glyph(id) }), n ? h('span', { class: 'badge' + (n === 'dot' ? ' dot' : '') }, n === 'dot' ? '' : n) : null), h('span', { class: 'lb' }, appName(a)));
    }
    const weather = DATA.weather();
    home.append(
      h('div', { class: 'home-widgets' },
        h('button', { class: 'home-weather', onclick: () => openApp('weather'), 'aria-label': 'Pogoda w Mglisku' },
          h('b', {}, 'Mglisko'), h('span', { class: 'home-degrees' }, `${weather.temp}°`), h('span', {}, weather.nowLong), h('small', {}, cap(U.dayShort(G.now())))),
        h('button', { class: 'home-note', onclick: () => openApp('notes', { note: 'todo' }), 'aria-label': 'Co teraz? Otwórz notatkę' },
          h('small', {}, 'NOTATKI'), h('b', {}, 'Co teraz?'), h('p', {}, G.s.objective ? U.tpl(G.s.objective.text).replace(/[*_]/g, '') : 'Sprawdź wiadomości.'))),
      h('div', { class: 'home-apps', 'aria-label': 'Aplikacje' }, ['calendar', 'maps', 'weather', 'clock', 'notes', 'nimbus', 'ciemnia', 'bushview', 'settings'].filter(appUnlocked).map(appIcon)),
      h('button', { class: 'home-search', onclick: searchPhone }, U.ico('search', 13), 'Szukaj'),
      h('div', { class: 'dock', 'aria-label': 'Dock' }, dock.filter(appUnlocked).map(appIcon))
    );
  }

  function searchPhone() {
    const input = h('input', { type: 'search', class: 'field', placeholder: 'Aplikacje, osoby, zapisane ślady', 'aria-label': 'Szukaj w telefonie' });
    const results = h('div', { class: 'list plain spotlight-results' });
    const body = h('div', { class: 'spotlight' }, input, results);
    let focusTimer;
    const sh = sheet({ title: 'Szukaj', body, onClose: () => clearTimeout(focusTimer) });
    function render() {
      results.innerHTML = '';
      const q = U.norm(input.value);
      const items = Object.values(apps).filter(a => appUnlocked(a.id)).map(a => ({ label: appName(a), sub: 'Aplikacja', run: () => openApp(a.id) }));
      if (q) {
        Object.entries(DATA.persons).filter(([, p]) => G.test(p.cond)).forEach(([id, p]) => items.push({ label: p.name, sub: p.role, run: () => openApp('notes', { note: 'people' }) }));
        Object.keys(G.s.ev).map(G.ev).filter(Boolean).forEach(e => items.push({ label: e.title, sub: e.source || 'Zapisany ślad', run: () => openApp('notes', { ev: e.id }) }));
      }
      const visible = items.filter(i => !q || U.norm(i.label + ' ' + i.sub).includes(q));
      visible.forEach(i => results.append(h('button', { class: 'row', onclick: () => { sh.close(true); i.run(); } }, h('div', { class: 'rm' }, h('b', {}, i.label), h('span', {}, i.sub)), U.ico('back', 15))));
      if (!visible.length) results.append(h('p', { class: 'empty' }, 'Brak wyników'));
    }
    input.addEventListener('input', render); render();
    focusTimer = setTimeout(() => input.focus(), 150);
  }

  /* ---------- aplikacje ---------- */
  function openApp(id, params, origin) {
    if (!appUnlocked(id)) return;
    SFX.unlockAudio();
    if (current && current.id === id) { if (current.ctrl && current.ctrl.onParams) current.ctrl.onParams(params || {}); return; }
    closeOverlays();
    if (current) closeApp(true);
    const el = h('div', { class: 'app app-' + id });
    if (origin && origin.getBoundingClientRect) {
      const r = origin.getBoundingClientRect(), sr = screen.getBoundingClientRect();
      el.style.setProperty('--ox', `${((r.left + r.width / 2 - sr.left) / sr.width) * 100}%`);
      el.style.setProperty('--oy', `${((r.top + r.height / 2 - sr.top) / sr.height) * 100}%`);
    }
    appsLayer.appendChild(el);
    home.classList.add('behind');
    current = { id, el, ctrl: null };
    G.markSeen('app:' + id);
    try { current.ctrl = apps[id].mount(el, params || {}) || {}; }
    catch (e) { console.error(e); toast('Błąd aplikacji: ' + e.message, { kind: 'error' }); }
    SFX.play.tap();
    BUS.emit('app', id);
  }
  function closeApp(instant) {
    if (!current) return;
    const c = current; current = null;
    if (c.ctrl && c.ctrl.destroy) try { c.ctrl.destroy(); } catch (e) { console.error(e); }
    if (instant) c.el.remove();
    else { c.el.classList.add('closing'); setTimeout(() => c.el.remove(), 240); }
    home.classList.remove('behind');
    G.viewing = null;
    BUS.emit('app', null);
    if (G.s) G.change();
  }
  function goHome() { closeOverlays(); closeApp(); }
  const recentApps = [];
  BUS.on('app', id => { if (!id) return; const i = recentApps.indexOf(id); if (i >= 0) recentApps.splice(i, 1); recentApps.unshift(id); });
  function recents() {
    closeOverlays();
    const wrap = h('div', { class: 'ovl recents' });
    const o = { close() { popOverlay(o); wrap.classList.add('out'); setTimeout(() => wrap.remove(), 250); } };
    const list = recentApps.filter(appUnlocked).slice(0, 6);
    wrap.append(h('div', { class: 'scrim', onclick: () => o.close() }),
      h('div', { class: 'rc-list' }, list.length ? list.map(id => h('button', { class: 'rc-card', onclick: () => { o.close(); openApp(id); } },
        h('span', { class: 'rc-ic', style: `--g:${GRAD[id]}`, html: glyph(id) }), h('b', {}, appName(apps[id])))) : h('div', { class: 'empty' }, 'Brak ostatnich aplikacji')));
    screen.appendChild(wrap);
    pushOverlay(o);
  }
  function back() {
    if (overlays.length) { const o = overlays[overlays.length - 1]; if (!o.sticky) o.close(); return; }
    if (lockEl) return;
    if (current) {
      if (current.ctrl && current.ctrl.back && current.ctrl.back()) return;
      closeApp();
    }
  }
  const currentApp = () => current && current.id;

  /* ---------- stos stron ---------- */
  class Stack {
    constructor(host) { this.host = host; this.pages = []; }
    push(page) {
      const prev = this.top();
      page.el.classList.add('pg');
      if (prev) page.el.classList.add('enter');
      this.host.appendChild(page.el);
      this.pages.push(page);
      if (prev) {
        requestAnimationFrame(() => requestAnimationFrame(() => { page.el.classList.remove('enter'); prev.el.classList.add('under'); }));
        if (prev.onHide) prev.onHide();
      }
      if (page.onShow) page.onShow();
      return page;
    }
    pop() {
      if (this.pages.length <= 1) return false;
      const p = this.pages.pop();
      if (p.destroy) p.destroy();
      p.el.classList.add('leave');
      setTimeout(() => p.el.remove(), 300);
      const t = this.top();
      if (t) { t.el.classList.remove('under'); if (t.onShow) t.onShow(); }
      return true;
    }
    popTo(n) { while (this.pages.length > n) this.pop(); }
    top() { return this.pages[this.pages.length - 1]; }
    destroy() { this.pages.forEach(p => p.destroy && p.destroy()); this.pages = []; }
  }

  function page({ title = '', sub = '', back: bk = true, right = [], big = false, cls = '', onBack = null } = {}) {
    const tt = h('div', { class: 'tt' }, h('h1', {}, title), sub ? h('small', {}, sub) : null);
    const hdr = h('div', { class: 'hdr' + (big ? ' big' : '') },
      bk && !big ? h('button', { class: 'bk', 'aria-label': 'Wstecz', onclick: () => { SFX.play.tap(); onBack ? onBack() : back(); }, html: U.icon(OS === 'android' ? 'arrowL' : 'back', 24) }) : null,
      tt, right.length ? h('div', { class: 'rt' }, right) : null);
    const body = h('div', { class: 'body' });
    const el = h('div', { class: cls }, hdr, body);
    return {
      el, hdr, body,
      setTitle(t) { $('h1', tt).textContent = t; },
      setSub(s) { let sm = $('small', tt); if (!sm) { sm = h('small'); tt.appendChild(sm); } sm.textContent = s; }
    };
  }
  function iconBtn(name, fn, label) { return h('button', { 'aria-label': label || name, title: label || '', onclick: e => { SFX.play.tap(); fn(e); }, html: U.icon(name, 22) }); }

  /* ---------- nakładki ---------- */
  function pushOverlay(o) { overlays.push(o); }
  function popOverlay(o) { const i = overlays.indexOf(o); if (i >= 0) overlays.splice(i, 1); }
  function closeOverlays() { [...overlays].reverse().forEach(o => { if (!o.sticky) o.close(true); }); }

  function sheet({ title = '', body, onClose, cls = '' }) {
    const wrap = h('div', { class: 'ovl' });
    if (locked) wrap.style.zIndex = '72';
    const scrim = h('div', { class: 'scrim', onclick: () => o.close() });
    const sh = h('div', { class: 'sheet ' + cls },
      h('div', { class: 'grab' }),
      title ? h('div', { class: 'sh-h' }, h('h3', {}, title), h('button', { onclick: () => o.close(), html: U.icon('close', 18), 'aria-label': 'Zamknij' })) : null,
      h('div', { class: 'sh-b' }, body));
    wrap.append(scrim, sh);
    screen.appendChild(wrap);
    const o = {
      el: wrap,
      close(instant) {
        popOverlay(o);
        if (onClose) onClose();
        if (instant) { wrap.remove(); return; }
        sh.classList.add('out'); scrim.classList.add('out');
        setTimeout(() => wrap.remove(), 260);
      }
    };
    pushOverlay(o);
    return o;
  }
  function modal({ title, text, buttons = [{ label: 'OK' }] }) {
    return new Promise(res => {
      const wrap = h('div', { class: 'ovl' });
      const o = { close(v) { popOverlay(o); wrap.remove(); res(v === true ? undefined : v); } };
      wrap.append(h('div', { class: 'scrim' }), h('div', { class: 'modal' },
        title ? h('h3', {}, title) : null, text ? h('p', { html: U.rich(text) }) : null,
        h('div', { class: 'mb' }, buttons.map(b => h('button', { class: 'btn' + (b.pri ? ' pri' : ''), onclick: () => o.close(b.value != null ? b.value : b.label) }, b.label)))));
      screen.appendChild(wrap);
      pushOverlay(o);
    });
  }

  /* ---------- powiadomienia ---------- */
  const bq = [];
  let bShowing = false;
  function banner(o) {
    if (locked && lockEl) { addLockNotif(o); playBannerSound(o); return; }
    bq.push(o);
    if (!bShowing) nextBanner();
  }
  function playBannerSound(o) {
    const snd = o.sound || 'msg';
    if (snd && SFX.play[snd]) SFX.play[snd]();
    U.vibrate(40);
  }
  /* Błysk to osobna (fikcyjna) aplikacja: własna ikona zamiast ikony Wiadomości. */
  const BLYSK_SVG = s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 2 5 13.5h6L9.5 22 19 9.5h-6.2z" fill="#ffd84d"/></svg>`;
  function bannerEl(o) {
    const blysk = o.icon === 'blysk' || o.title === 'Błysk';
    const icn = o.who ? avatar(o.who) : blysk ? h('span', { class: 'b-ic b-blysk', style: 'background:#1c1c22', html: BLYSK_SVG(26) }) : h('span', { class: 'b-ic', style: `background:${GRAD[o.app] || '#333'}`, html: glyph(o.app || 'messages').replace('width="34" height="34"', 'width="26" height="26"') });
    const a = apps[o.app || 'messages'];
    return h('div', { class: 'banner' + (o.glitch ? ' glitchy' : '') + (blysk ? ' blysk' : '') },
      blysk ? h('div', { class: 'b-app' }, h('span', { style: 'background:#1c1c22', html: BLYSK_SVG(12) }), 'Błysk', h('i', {}, ' · ' + (o.when || 'teraz')))
        : h('div', { class: 'b-app' }, h('span', { style: `background:${GRAD[o.app || 'messages']}`, html: glyph(o.app || 'messages').replace('width="34" height="34"', 'width="12" height="12"') }), a ? appName(a) : '', h('i', {}, ' · ' + (o.when || 'teraz'))),
      o.who ? h('span', { class: 'b-ic' }, icn) : icn,
      h('div', { class: 'b-m' },
        h('div', { class: 'b-h' }, h('b', {}, o.title || ''), h('span', {}, o.when || 'teraz')),
        h('div', { class: 'b-t' }, o.text || '')));
  }
  function nextBanner() {
    const o = bq.shift();
    if (!o) { bShowing = false; return; }
    bShowing = true;
    const el = bannerEl(o);
    let done = false;
    const close = () => { if (done) return; done = true; el.classList.add('out'); setTimeout(() => { el.remove(); nextBanner(); }, 280); };
    el.addEventListener('click', () => { close(); if (o.onclick) o.onclick(); else if (o.app) openApp(o.app, o.open || {}); });
    let sy = null;
    el.addEventListener('pointerdown', e => { sy = e.clientY; });
    el.addEventListener('pointermove', e => { if (sy != null && sy - e.clientY > 20) { sy = null; close(); } });
    bannersEl.appendChild(el);
    playBannerSound(o);
    if (o.glitch) fx('glitch');
    setTimeout(close, o.ms || 3800);
  }
  function onMsg({ chat, msg }) {
    if (msg.from === 'me' || msg.from === 'sys' || chat === 'call') return;
    if (G.viewing === chat) { SFX.play.tap(); return; }
    const cd = DATA.chats[chat] || {};
    const who = DATA.chars[msg.from] || {};
    const name = (G.s.chats[chat] && G.s.chats[chat].name) || cd.name || who.name;
    const title = cd.group ? `${who.short || who.name} · ${name}` : name;
    banner({
      app: 'messages', open: { chat }, who: cd.group ? msg.from : (G.chat(chat).avatar || cd.avatar || msg.from), title,
      text: preview(msg), sound: cd.group ? 'group' : 'msg', glitch: !!cd.glitch && Math.random() < 0.6
    });
  }
  function preview(msg) {
    if (msg.vanish) return '👁 Wiadomość znikająca';
    if (/^voice:/.test(msg.text || '')) return '🎤 Wiadomość głosowa ' + msg.text.split('|')[0].slice(6);
    if (msg.text) return U.tpl(msg.text).replace(/[*_]/g, '').replace(/\n/g, ' ');
    if (msg.vid) return '🎬 Wideo';
    if (msg.img) return '📷 Zdjęcie';
    if (msg.ev) return '📎 Załącznik';
    if (msg.place) return '📍 Lokalizacja';
    return '';
  }

  /* ---------- toasty ---------- */
  function toast(text, o = {}) {
    const el = h('div', { class: 'toast ' + (o.kind || '') }, o.icon ? U.ico(o.icon, 17) : null, h('span', {}, text));
    if (o.onclick) el.addEventListener('click', o.onclick);
    toastsEl.appendChild(el);
    while (toastsEl.children.length > 3) toastsEl.firstChild.remove();
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, o.ms || 2800);
  }
  /* Kilka dowodów naraz: jeden dymek, który zbiera tytuły, zamiast stosu takich samych. */
  let evToast = null;
  function evidenceToast(id) {
    const e = G.ev(id); if (!e) return;
    if (evToast && evToast.el.isConnected && !evToast.el.classList.contains('out')) {
      evToast.ids.push(id);
      const n = evToast.ids.length;
      evToast.el.querySelector('span:last-child').textContent = `Zapisano w Notatkach: ${e.title} i ${n - 1 === 1 ? 'jeszcze 1' : 'jeszcze ' + (n - 1)}`;
      clearTimeout(evToast.t); evToast.t = setTimeout(evToast.close, 3400);
      return;
    }
    SFX.play.discover(); U.vibrate([30, 30, 50]);
    const ids = [id];
    const el = h('div', { class: 'toast ev' }, U.ico('note', 17), h('span', {}, `Zapisano w Notatkach: ${e.title}`));
    el.addEventListener('click', () => openApp('notes', ids.length > 1 ? {} : { ev: id }));
    toastsEl.appendChild(el);
    while (toastsEl.children.length > 3) toastsEl.firstChild.remove();
    const close = () => { el.classList.add('out'); setTimeout(() => el.remove(), 300); };
    evToast = { el, ids, close, t: setTimeout(close, 3400) };
  }

  /* Wiadomość głosowa: `voice:0:38|Kto|transkrypcja`. Bez pliku audio pokazujemy przebieg i zapis. */
  function textOrVoice(text) {
    const m = /^voice:(\d+:\d\d)\|([^|]*)\|([\s\S]*)$/.exec(String(text || ''));
    if (!m) return h('p', { html: U.rich(text) });
    const bars = Array.from({ length: 28 }, (_, i) => h('i', { style: `height:${4 + ((i * 7 + m[3].length) % 13)}px` }));
    const tr = h('p', { class: 'voice-tr', hidden: true, html: U.rich(m[3]) });
    const btn = h('button', { class: 'voice-play', 'aria-label': 'Pokaż transkrypcję wiadomości głosowej', 'aria-expanded': 'false', onclick: () => { tr.hidden = !tr.hidden; btn.setAttribute('aria-expanded', String(!tr.hidden)); wrap.classList.toggle('open', !tr.hidden); } }, '▶');
    const wrap = h('div', { class: 'voice-msg' },
      h('div', { class: 'voice-row' }, btn, h('span', { class: 'voice-wave', 'aria-hidden': 'true' }, bars), h('small', {}, m[1])),
      m[2] ? h('small', { class: 'voice-from' }, 'Nagranie: ' + m[2]) : null, tr);
    return wrap;
  }

  /* ---------- awatary ---------- */
  function avatar(who, cls = '') {
    if (who === 'szklarz') who = 'unknown';
    const photo = DATA.chars[who]?.photo;
    if (photo && !/^assets\/people\//.test(photo)) return h('span', { class: 'av ' + cls }, h('img', { src: photo, alt: DATA.chars[who].name, style: 'object-fit:cover' }));
    if (photo) {
      const sp = h('span', { class: 'av ' + cls });
      const img = h('img', { src: photo, alt: DATA.chars[who].name, style: 'object-fit:cover' });
      img.onerror = () => { const c = DATA.chars[who]; const keep = c.photo; c.photo = null; sp.replaceWith(UI.avatar(who, cls.trim())); c.photo = keep; };
      sp.appendChild(img); return sp;
    }
    if (who === 'gajda') return h('span', { class: 'av gajda-av ' + cls, role: 'img', 'aria-label': DATA.chars.gajda.name });
    const photos = { kuba: [0, 0], ola: [1, 0], bartek: [2, 0], igor: [0, 1], maja: [1, 1], maja2: [1, 1], weronika: [2, 1] };
    if (photos[who]) {
      const [x, y] = photos[who];
      return h('span', { class: 'av photo-av ' + cls, role: 'img', 'aria-label': (DATA.chars[who] || DATA.chars.maja).name, style: `--photo-x:${x * 50}%;--photo-y:${y * 75}%` });
    }
    return h('span', { class: 'av ' + cls }, h('img', { src: Art.avatar(who), alt: '' }));
  }

  /* ---------- ekran blokady ---------- */
  function lock() {
    if (lockEl) return;
    locked = true;
    lockEl = h('div', { id: 'lock', style: Wallpapers.style(Wallpapers.selected()) },
      h('div', { class: 'lk-ic', html: U.icon('lock', 20) }),
      h('div', { class: 'lk-d' }, cap(U.dayLong(G.now()))),
      h('div', { class: 'lk-t' }, U.time(G.now())),
      h('div', { class: 'lk-n' }),
      h('div', { class: 'lk-u', onclick: unlockScreen }, 'Dotknij, aby odblokować'));
    lockWallpaperCleanup = Wallpapers.bind(lockEl, () => UI.openWallpapers());
    let sy = null;
    lockEl.addEventListener('pointerdown', e => { sy = e.clientY; });
    lockEl.addEventListener('pointerup', e => { if (sy != null && sy - e.clientY > 60 && !overlays.length) unlockScreen(); sy = null; });
    screen.appendChild(lockEl);
    homebar.classList.add('hide');
  }
  function addLockNotif(o) {
    if (!lockEl) return;
    const el = bannerEl(Object.assign({}, o, { when: U.time(G.now()) }));
    el.addEventListener('click', unlockScreen);
    $('.lk-n', lockEl).prepend(el);
  }
  function unlockScreen() {
    if (!lockEl) return;
    SFX.unlockAudio(); SFX.play.unlock();
    const el = lockEl; lockEl = null; locked = false;
    lockWallpaperCleanup?.(); lockWallpaperCleanup = null;
    el.classList.add('gone');
    setTimeout(() => el.remove(), 550);
    homebar.classList.remove('hide');
    G.setFlag('unlockedPhone');
  }

  /* ---------- połączenia ---------- */
  let callEl = null;
  function incomingCall(who) {
    return new Promise(res => {
      closeOverlays();
      const c = DATA.chars[who] || { name: who };
      SFX.ringStart('in');
      const el = h('div', { class: 'call' },
        h('div', { class: 'c-av' }, avatar(who, 'xl')),
        h('h2', {}, c.name),
        h('div', { class: 'c-s' }, c.number ? `komórka · ${c.number}` : 'Połączenie przychodzące'),
        h('div', { style: 'flex:1' }),
        h('div', { class: 'c-btns' },
          h('button', { class: 'c-btn dec', 'aria-label': 'Odrzuć', html: U.icon('hang', 32), onclick: () => done('decline') }),
          h('button', { class: 'c-btn acc', 'aria-label': 'Odbierz', html: U.icon('phone', 30), onclick: () => done('accept') })));
      screen.appendChild(el);
      callEl = el;
      function done(r) {
        SFX.ringStop(); SFX.unlockAudio();
        if (r === 'decline') { SFX.play.hangup(); el.classList.add('out'); setTimeout(() => el.remove(), 450); callEl = null; }
        res(r);
      }
    });
  }
  function outgoingCall(who, number) {
    return new Promise(res => {
      closeOverlays();
      const c = DATA.chars[who] || { name: number };
      const el = h('div', { class: 'call' },
        h('div', { class: 'c-av' }, avatar(who, 'xl')),
        h('h2', {}, c.name || number),
        h('div', { class: 'c-s' }, 'Łączenie…'),
        h('div', { style: 'flex:1' }));
      if (callEl) callEl.remove();
      screen.appendChild(el);
      callEl = el;
      SFX.ringStart('out');
      setTimeout(() => { SFX.ringStop(); callScreen(); res(); }, 2600 * (G.settings.speed === 'instant' ? 0.1 : 1));
    });
  }
  function callScreen() {
    const c = G.s.call; if (!c) return;
    const who = DATA.chars[c.who] || { name: c.number || c.who };
    if (callEl) callEl.remove();
    const cap = h('div', { class: 'c-cap' });
    const opts = h('div', { class: 'c-opts' });
    const timer = h('div', { class: 'c-s' }, '0:00');
    const el = h('div', { class: 'call active' },
      h('div', { class: 'c-av' }, avatar(c.who, 'lg')),
      h('h2', { style: 'font-size:24px;margin-top:16px' }, who.name),
      timer, cap, opts,
      h('div', { class: 'c-row' }, h('span', { html: U.icon('mic', 24) }), h('span', { html: U.icon('keypad', 22) }), h('span', { html: U.icon('wave', 24) })),
      h('div', { class: 'c-btns' }, h('button', { class: 'c-btn dec', disabled: true, 'aria-label': 'Rozłącz', html: U.icon('hang', 32) })));
    screen.appendChild(el);
    callEl = el;
    const line = m => {
      const ch = DATA.chars[m.from] || {};
      return h('div', { class: 'cl' + (m.from === 'me' ? ' me' : '') }, h('b', {}, m.from === 'me' ? 'Ty' : (ch.short || ch.name || '')), h('span', { html: U.rich(m.text || '') }));
    };
    G.chat('call').msgs.forEach(m => cap.appendChild(line(m)));
    let typingEl = null;
    const offs = [
      BUS.on('msg', ({ chat, msg }) => { if (chat !== 'call') return; if (typingEl) { typingEl.remove(); typingEl = null; } cap.appendChild(line(msg)); cap.scrollTop = 1e6; }),
      BUS.on('typing', ({ chat, who: w, on }) => {
        if (chat !== 'call') return;
        if (typingEl) { typingEl.remove(); typingEl = null; }
        if (on) { typingEl = h('div', { class: 'cl typing' }, '…'); cap.appendChild(typingEl); cap.scrollTop = 1e6; }
      }),
      BUS.on('pending', p => renderOpts(p))
    ];
    function renderOpts(p) {
      opts.innerHTML = '';
      if (!p || p.chat !== 'call' || p.type !== 'choose') return;
      p.options.forEach(o => opts.appendChild(h('button', { onclick: () => { SFX.play.tap(); opts.innerHTML = ''; Engine.answer(o.i); } }, U.tpl(o.text))));
      cap.scrollTop = 1e6;
    }
    renderOpts(Engine.pending());
    const iv = setInterval(() => { timer.textContent = U.dur((Date.now() - c.real) / 1000); }, 500);
    el._cleanup = () => { offs.forEach(f => f()); clearInterval(iv); };
  }
  function endCall() {
    return new Promise(res => {
      SFX.play.hangup();
      const el = callEl; callEl = null;
      if (!el) return res();
      if (el._cleanup) el._cleanup();
      const t = $('.c-s', el); if (t) t.textContent = 'Połączenie zakończone';
      setTimeout(() => { el.classList.add('out'); setTimeout(() => { el.remove(); res(); }, 450); }, 900);
    });
  }

  /* ---------- kurtyny ---------- */
  function curtain(cls, kids, { ms = 0, button = null, tap = true } = {}) {
    return new Promise(res => {
      const el = h('div', { class: 'curtain ' + cls }, kids);
      let done = false;
      const fin = () => { if (done) return; done = true; el.classList.add('out'); setTimeout(() => { el.remove(); res(); }, 850); };
      if (button) el.appendChild(h('button', { class: 'btn pri', onclick: e => { e.stopPropagation(); fin(); } }, button));
      if (tap) el.addEventListener('click', () => { if (!button) fin(); });
      screen.appendChild(el);
      if (ms) setTimeout(fin, ms);
    });
  }
  function chapterTitle(ch) {
    SFX.play.chapter();
    if (ch.mood) SFX.ambient(ch.mood);
    return curtain('', [
      h('div', { class: 'cu-k' }, ch.kicker || (ch.num === 0 ? 'Prolog' : ch.num === 99 ? 'Epilog' : `Rozdział ${ch.num}`)),
      h('div', { class: 'cu-t' }, ch.title),
      h('div', { class: 'cu-line' }),
      ch.when ? h('div', { class: 'cu-s' }, ch.when) : null
    ], { ms: 5200 });
  }
  function chapterEnd(ch) {
    SFX.play.sting();
    const evs = Object.keys(G.s.ev).length;
    const total = Object.keys(DATA.evidence).length;
    return curtain('', [
      h('div', { class: 'cu-k' }, (ch.kicker ? ch.kicker + ' · ' : '') + (ch.num === 0 ? 'Koniec prologu' : `Koniec rozdziału ${ch.num}`)),
      h('div', { class: 'cu-t' }, ch.title),
      h('div', { class: 'cu-line' }),
      h('div', { class: 'cu-stats' },
        h('div', {}, h('b', {}, evs), 'zapisanych'),
        h('div', {}, h('b', {}, Math.round(evs / total * 100) + '%'), 'odkryte'),
        h('div', {}, h('b', {}, Math.max(1, Math.round((G.s.playMs || 0) / 60000))), 'minut')),
      h('div', { class: 'cu-p' }, 'Gra zapisana. Możesz wrócić w każdej chwili.')
    ], { button: 'Dalej', tap: false });
  }
  function interlude(text, sub, ms) {
    return curtain('interlude', [h('div', { class: 'cu-t' }, U.tpl(text)), sub ? h('div', { class: 'cu-s' }, U.tpl(sub)) : null], { ms: Math.max(1200, ms) });
  }
  function endingScreen(id) {
    const e = DATA.endings[id];
    SFX.ambient(e.mood || 'dawn');
    SFX.play.chapter();
    return curtain('ending', [
      h('div', { class: 'cu-k' }, 'Zakończenie'),
      h('div', { class: 'cu-t' }, e.title),
      h('div', { class: 'cu-tag' }, e.tag),
      h('div', { class: 'cu-line' }),
      ...e.text.map(p => h('div', { class: 'cu-p', html: U.rich(typeof p === 'function' ? p() : p) })),
      h('div', { class: 'cu-stats' },
        h('div', {}, h('b', {}, Object.keys(G.s.ev).length + '/' + Object.keys(DATA.evidence).length), 'odkryte'),
        h('div', {}, h('b', {}, G.s.endings.filter(x => (DATA.endings[x]?.season || 's1') === (e.season || 's1')).length + '/3'), 'zakończeń'))
    ], { button: 'Dalej', tap: false });
  }
  function credits() {
    SFX.ambient('dawn');
    const season = typeof Seasons !== 'undefined' ? Seasons.current() : null;
    if (season && season.credits) return curtain('ending credits-' + season.id, [
      h('div', { class: 'cu-k' }, season.credits.kicker),
      h('div', { class: 'cu-t' }, season.credits.title),
      h('div', { class: 'cu-line' }),
      ...season.credits.lines.map(t => h('div', { class: 'cu-p', style: 'text-align:center', html: U.rich(t) })),
      h('div', { class: 'cu-p cu-teaser', style: 'text-align:center' }, h('b', {}, season.credits.teaser.title), h('br'), season.credits.teaser.text),
      h('div', { class: 'cu-p', style: 'text-align:center;color:var(--tx3)' }, season.credits.note)
    ], { button: 'Menu główne', tap: false }).then(() => { location.reload(); });
    return curtain('ending', [
      h('div', { class: 'cu-k' }, 'Dziękujemy za grę'),
      h('div', { class: 'cu-t' }, 'MGLISKO'),
      h('div', { class: 'cu-line' }),
      h('div', { class: 'cu-p', style: 'text-align:center' }, 'Scenariusz i postacie są fikcyjne. Grafiki są dostarczane z grą, a efekty dźwiękowe powstają lokalnie. Gra nie czyta danych z prawdziwego telefonu.'),
      h('div', { class: 'cu-p', style: 'text-align:center;color:var(--tx3)' }, 'Wszystkie postacie i miejsca są fikcyjne. Powódź tysiąclecia z lipca 1997 roku wydarzyła się naprawdę.'),
      h('div', { class: 'cu-p', style: 'text-align:center' }, h('b', {}, 'MGLISKO: TEREN'), h('br'), 'Notatki Rybickiego prowadzą w prawdziwe miejsca. Wkrótce.'),
      h('div', { class: 'cu-p', style: 'text-align:center;color:var(--tx3)' }, 'Inne zakończenia odblokujesz w Ustawieniach → Rozdziały.')
    ], { button: 'Menu główne', tap: false }).then(() => { location.reload(); });
  }

  /* ---------- efekty ---------- */
  function fx(name, o = {}) {
    switch (name) {
      case 'glitch':
        // Nieznany nadawca nie może zmieniać systemowego interfejsu gracza.
        U.vibrate([30, 70, 30]);
        return U.sleep(o.wait ? 650 : 0);
      case 'shake':
        screen.classList.remove('shake'); void screen.offsetWidth; screen.classList.add('shake');
        U.vibrate(200);
        setTimeout(() => screen.classList.remove('shake'), 520);
        return U.sleep(0);
      case 'flash': { const f = h('div', { class: 'flash' }); screen.appendChild(f); setTimeout(() => f.remove(), 750); SFX.play.shutter(); return U.sleep(300); }
      case 'blackout': { const f = h('div', { class: 'blackout' }); screen.appendChild(f); setTimeout(() => f.remove(), 2450); return U.sleep(1200); }
      case 'vibrate': SFX.play.vibe(); return U.sleep(0);
      case 'heartbeat': SFX.play.heartbeat(); setTimeout(SFX.play.heartbeat, 900); return U.sleep(0);
      case 'lock': lock(); return U.sleep(0);
      case 'home': goHome(); return U.sleep(0);
      default: return U.sleep(0);
    }
  }

  /* ---------- straszaki ----------
     Rzadkie i jednorazowe (engine pilnuje s.scares). Tryb łagodny (Ustawienia): bez głośnego dźwięku,
     błysku i nagłego zbliżenia. Dźwięk idzie przez wspólny master, więc słucha głośności gry i urządzenia. */
  function scare(kind, o = {}) {
    const soft = !!(G.settings.softScares || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches));
    const fast = G.settings.speed === 'instant';
    const wait = ms => U.sleep(fast ? Math.min(ms, 120) : ms);
    closeOverlays();
    if (kind === 'glitch') {
      screen.classList.add('scare-glitch'); if (soft) screen.classList.add('soft');
      SFX.play.staticHit(soft); if (!soft) U.vibrate([20, 40, 20, 40, 60]);
      return wait(soft ? 700 : 560).then(() => { screen.classList.remove('scare-glitch', 'soft'); });
    }
    if (kind === 'breath') { SFX.play.breath(soft); if (!soft) U.vibrate(40); return wait(2600); }
    if (kind === 'photo' || kind === 'face') {
      const el = h('div', { class: 'scare-ov' + (soft ? ' soft' : '') + (kind === 'face' ? ' zoom' : '') },
        h('img', { src: o.src || Art.url(o.img), alt: '' }),
        o.caption ? h('div', { class: 'scare-cap' }, o.caption) : null);
      screen.appendChild(el);
      if (kind === 'face') { SFX.play.sting(soft); if (!soft) U.vibrate(260); } else SFX.play.staticHit(true);
      return wait(o.ms || (kind === 'face' ? 1300 : 1700)).then(() => { el.classList.add('out'); return wait(500); }).then(() => el.remove());
    }
    if (kind === 'call') {
      // Połączenie, które dzwoni samo i samo się urywa. Odebranie = cisza i oddech, nic więcej.
      return new Promise(res => {
        const el = h('div', { class: 'call scare-call' },
          h('div', { class: 'c-av' }, o.who ? avatar(o.who, 'xl') : h('div', { class: 'av xl', style: 'background:#333' })),
          h('h2', {}, o.name || 'Nieznany numer'),
          h('div', { class: 'c-s' }, o.number || 'Połączenie przychodzące'),
          h('div', { style: 'flex:1' }),
          h('div', { class: 'c-btns' },
            h('button', { class: 'c-btn dec', 'aria-label': 'Odrzuć', html: U.icon('hang', 32), onclick: () => end('decline') }),
            h('button', { class: 'c-btn acc', 'aria-label': 'Odbierz', html: U.icon('phone', 30), onclick: () => pick() })));
        screen.appendChild(el);
        if (soft) SFX.play.vibe(); else SFX.ringStart('in');
        let over = false;
        const timer = setTimeout(() => end('missed'), fast ? 150 : (o.ms || 6500));
        function pick() {
          if (over) return; SFX.ringStop(); clearTimeout(timer);
          el.querySelector('.c-btns').remove();
          el.querySelector('.c-s').textContent = '00:00';
          SFX.play.breath(soft);
          let sec = 0; const t = setInterval(() => { sec++; const n = el.querySelector('.c-s'); if (n) n.textContent = '00:0' + sec; }, 1000);
          wait(o.listen || 3600).then(() => { clearInterval(t); end('accept'); });
        }
        function end(r) {
          if (over) return; over = true; clearTimeout(timer); SFX.ringStop(); SFX.play.hangup();
          el.classList.add('out'); setTimeout(() => el.remove(), 450);
          if (o.log !== false && G.s.calls) { G.s.calls.unshift({ who: o.who || null, number: o.number || '', label: o.name || 'Nieznany numer', dir: r === 'accept' ? 'in' : r === 'decline' ? 'declined' : 'missed', t: G.now(), dur: r === 'accept' ? 4 : 0, seen: false }); BUS.emit('badges'); G.save(); }
          res(r);
        }
      });
    }
    return U.sleep(0);
  }

  /* Przesyłanie w pobliżu: obce urządzenie chce wysłać zdjęcie. Podgląd rozmyty do decyzji. */
  function nearby(o = {}) {
    return new Promise(res => {
      closeOverlays();
      const fast = G.settings.speed === 'instant';
      const el = h('div', { class: 'nearby-ov' },
        h('div', { class: 'nearby-card' },
          h('div', { class: 'nb-k' }, 'Przesyłanie w pobliżu'),
          h('div', { class: 'nb-prev' }, o.img ? h('img', { src: Art.url(o.img), alt: '' }) : null),
          h('div', { class: 'nb-t' }, U.tpl(`„${o.device || 'Telefon'}” chce udostępnić ${o.what || 'zdjęcie'}`)),
          o.note ? h('div', { class: 'nb-s' }, U.tpl(o.note)) : null,
          h('div', { class: 'nb-btns' },
            h('button', { class: 'btn', onclick: () => end('decline') }, 'Odrzuć'),
            h('button', { class: 'btn pri', onclick: () => end('accept') }, 'Akceptuj'))));
      screen.appendChild(el);
      SFX.play.notif ? SFX.play.notif() : null; U.vibrate(30);
      let over = false;
      const timer = setTimeout(() => end('decline'), o.ms || 20000);
      function end(r) {
        if (over) return; over = true; clearTimeout(timer);
        el.classList.add('out'); setTimeout(() => el.remove(), 300);
        if (r === 'accept' && o.img && !fast) setTimeout(() => UI.viewImage(o.img, { from: o.device || 'W pobliżu' }), 320);
        res(r);
      }
    });
  }
  /* Aparat w grze: gracz kadruje scenę (kilka ujęć) albo wybiera z galerii i wysyła zdjęcie do czatu. */
  function camera(options) {
    return new Promise(res => {
      closeOverlays();
      const shots = options.filter(o => !o.gallery), gal = options.filter(o => o.gallery);
      let tab = shots.length ? 'cam' : 'gal', cur = (shots[0] || gal[0]);
      const view = h('div', { class: 'cam-view' }), chips = h('div', { class: 'cam-chips' });
      const el = h('div', { class: 'cam-ov' },
        h('div', { class: 'cam-top' }, h('button', { class: 'cam-x', 'aria-label': 'Zamknij', onclick: () => { el.remove(); res(null); } }, '✕'),
          h('div', { class: 'cam-tabs' }, shots.length ? h('button', { class: 'cam-tab', 'data-t': 'cam', onclick: () => { tab = 'cam'; cur = shots[0]; draw(); } }, 'Aparat') : null,
            gal.length ? h('button', { class: 'cam-tab', 'data-t': 'gal', onclick: () => { tab = 'gal'; cur = gal[0]; draw(); } }, 'Galeria') : null)),
        view, chips,
        h('div', { class: 'cam-bottom' }, h('button', { class: 'cam-shutter', 'aria-label': 'Zrób zdjęcie i wyślij', onclick: () => { SFX.play.tap(); el.classList.add('flash'); setTimeout(() => { el.remove(); res(cur.i); }, fast() ? 0 : 260); } })));
      const fast = () => G.settings.speed === 'instant';
      function draw() {
        view.innerHTML = ''; chips.innerHTML = '';
        if (cur.img) view.appendChild(h('img', { src: Art.url(cur.img), alt: '' }));
        (tab === 'cam' ? shots : gal).forEach(o => chips.appendChild(h('button', { class: 'cam-chip' + (o === cur ? ' on' : ''), onclick: () => { cur = o; draw(); } },
          o.img ? h('img', { src: Art.url(o.img), alt: '' }) : null, h('span', {}, U.tpl(o.text)))));
        el.querySelectorAll('.cam-tab').forEach(b => b.classList.toggle('on', b.dataset.t === tab));
      }
      draw(); screen.appendChild(el);
    });
  }

  return {
    get os() { return OS; }, appName,
    build, def, apps, openApp, closeApp, goHome, back, currentApp, Stack, page, iconBtn, sheet, modal,
    banner, toast, evidenceToast, avatar, textOrVoice, glyph, GRAD, lock, unlockScreen, get locked() { return locked; },
    incomingCall, outgoingCall, callScreen, endCall, chapterTitle, chapterEnd, interlude, endingScreen, credits,
    fx, scare, nearby, camera, renderHome, scheduleHome, preview, pushOverlay, popOverlay, closeOverlays, get screen() { return screen; }, appUnlocked
  };
})();
