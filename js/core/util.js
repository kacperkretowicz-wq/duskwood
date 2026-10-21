'use strict';
/* Narzędzia wspólne: DOM, losowość, tekst, czas, szyna zdarzeń. */

const U = (() => {
  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    if (props) {
      for (const k in props) {
        const v = props[k];
        if (v == null || v === false) continue;
        if (k === 'class') el.className = v;
        else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else if (k === 'html') el.innerHTML = v;
        else if (k === 'text') el.textContent = v;
        else if (k === 'dataset') Object.assign(el.dataset, v);
        else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
        else if (v === true) el.setAttribute(k, '');
        else el.setAttribute(k, v);
      }
    }
    append(el, kids);
    return el;
  }
  function append(el, kids) {
    for (const c of kids) {
      if (c == null || c === false) continue;
      if (Array.isArray(c)) append(el, c);
      else el.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
    }
  }
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // Deterministyczny generator — każde zdjęcie wygląda zawsze tak samo.
  function rng(seed) {
    let a = typeof seed === 'string' ? hash(seed) : seed >>> 0;
    const f = () => {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
    f.range = (lo, hi) => lo + f() * (hi - lo);
    f.int = (lo, hi) => Math.floor(lo + f() * (hi - lo + 1));
    f.pick = arr => arr[Math.floor(f() * arr.length)];
    f.chance = p => f() < p;
    return f;
  }
  function hash(str) {
    let h1 = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h1 = Math.imul(h1 ^ str.charCodeAt(i), 3432918353);
      h1 = h1 << 13 | h1 >>> 19;
    }
    return (h1 ^ h1 >>> 16) >>> 0;
  }

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Porównywanie odpowiedzi gracza: bez wielkości liter, polskich znaków i interpunkcji.
  function norm(s) {
    return String(s || '').toLowerCase()
      .replace(/ł/g, 'l').normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, ' ').trim();
  }
  const squash = s => norm(s).replace(/ /g, '');

  // Szablony tekstu: %name%, {forma męska|forma żeńska}, *pogrubienie*, _kursywa_.
  function tpl(text) {
    const p = (window.G && G.s && G.s.player) || { name: 'Ty', gender: 'm' };
    return String(text)
      .replace(/%name%/g, p.name)
      .replace(/\{([^{}|]*)\|([^{}]*)\}/g, (_, m, f) => p.gender === 'f' ? f : m);
  }
  function rich(text) {
    let s = esc(tpl(text));
    s = s.replace(/\*([^*\n]+)\*/g, '<b>$1</b>').replace(/(^|[\s(])_([^_\n]+)_/g, '$1<i>$2</i>');
    return s.replace(/\n/g, '<br>');
  }

  const MONTHS_GEN = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
  const MONTHS_SHORT = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
  const DAYS = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
  const DAYS_SHORT = ['nd', 'pn', 'wt', 'śr', 'cz', 'pt', 'sb'];
  const pad = n => String(n).padStart(2, '0');
  const toDate = t => t instanceof Date ? t : new Date(t);
  const time = t => { const d = toDate(t); return pad(d.getHours()) + ':' + pad(d.getMinutes()); };
  const dayLong = t => { const d = toDate(t); return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS_GEN[d.getMonth()]}`; };
  const dayShort = t => { const d = toDate(t); return `${DAYS_SHORT[d.getDay()]}, ${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`; };
  const dateNum = t => { const d = toDate(t); return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`; };
  const sameDay = (a, b) => { a = toDate(a); b = toDate(b); return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); };
  const parseLocal = iso => { const [d, tm = '00:00'] = iso.split('T'); const [y, mo, da] = d.split('-').map(Number); const [hh, mi, ss = 0] = tm.split(':').map(Number); return new Date(y, mo - 1, da, hh, mi, ss).getTime(); };
  const dur = sec => `${Math.floor(sec / 60)}:${pad(Math.floor(sec % 60))}`;

  function Bus() {
    const map = {};
    return {
      on(ev, fn) { (map[ev] = map[ev] || new Set()).add(fn); return () => map[ev].delete(fn); },
      emit(ev, data) { if (map[ev]) for (const fn of [...map[ev]]) { try { fn(data); } catch (e) { console.error(e); } } }
    };
  }

  // Ikony interfejsu (linie, 24x24).
  const ICONS = {
    back: '<path d="M15 5l-7 7 7 7"/>',
    arrowL: '<path d="M19.5 12H5M11 5.5L4.5 12l6.5 6.5"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    send: '<path d="M4 12l16-8-6 16-2.5-6.5z"/>',
    clip: '<path d="M16 7l-7.5 7.5a2.1 2.1 0 003 3L19 10a4.2 4.2 0 00-6-6l-7.6 7.6a6.3 6.3 0 009 9L20 15"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 018 0v2.5"/>',
    unlock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 017.6-1.7"/>',
    phone: '<path d="M6.5 3.5h3l1.5 4.5-2 1.5a11 11 0 005.5 5.5l1.5-2 4.5 1.5v3a2 2 0 01-2 2A16.5 16.5 0 014.5 5.5a2 2 0 012-2z"/>',
    hang: '<path d="M3 13.5c5-4.5 13-4.5 18 0l-2 3-3.5-1.2v-2.6a10 10 0 00-5 0v2.6L7 16.5z"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21"/>',
    play: '<path d="M8 5v14l11-7z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M4 17l5-5 4 4 3-3 4 4"/>',
    note: '<path d="M6 3.5h9l3.5 3.5v13.5H6z"/><path d="M14.5 3.5V7h4M9 11h6M9 14.5h6M9 18h4"/>',
    mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7l8 6 8-6"/>',
    chat: '<path d="M4 5.5h16v10H9l-5 4z"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5z"/>',
    cam: '<rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8.5 7l1.5-2.5h4L15.5 7"/>',
    trap: '<rect x="5" y="3.5" width="14" height="17" rx="3"/><circle cx="12" cy="10" r="3"/><path d="M8.5 16.5h7M7 3.5V2M17 3.5V2"/>',
    wave: '<path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 11v2"/>',
    star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.7 1-5.9L3.5 9.7l5.9-.8z"/>',
    layers: '<path d="M12 3.5l8.5 4.5L12 12.5 3.5 8z"/><path d="M3.5 12L12 16.5 20.5 12M3.5 16L12 20.5 20.5 16"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/><path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4"/>',
    bulb: '<path d="M9 17.5h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.3 1 2.1v.5h5V16c0-.8.4-1.6 1-2.1A6 6 0 0012 3z"/>',
    folder: '<path d="M3.5 6.5h6l2 2h9v10h-17z"/>',
    user: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.2-4 4.1-6 7.5-6s6.3 2 7.5 6"/>',
    timeline: '<path d="M6 3v18"/><circle cx="6" cy="7" r="2"/><circle cx="6" cy="16" r="2"/><path d="M10 7h10M10 16h7"/>',
    puzzle: '<path d="M10 3.5h4v3a1.6 1.6 0 103 0v-.5h3.5v4h-1a1.6 1.6 0 100 3h1v5.5H15v-1a1.6 1.6 0 10-3 0v1H3.5V14h1a1.6 1.6 0 100-3h-1V6.5H10z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4L5.3 5.3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    dots: '<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
    ff: '<path d="M4 6l8 6-8 6zM12 6l8 6-8 6z"/>',
    keypad: '<circle cx="6" cy="5" r="1.4"/><circle cx="12" cy="5" r="1.4"/><circle cx="18" cy="5" r="1.4"/><circle cx="6" cy="11" r="1.4"/><circle cx="12" cy="11" r="1.4"/><circle cx="18" cy="11" r="1.4"/><circle cx="6" cy="17" r="1.4"/><circle cx="12" cy="17" r="1.4"/><circle cx="18" cy="17" r="1.4"/><circle cx="12" cy="22" r="1.2"/>',
    contrast: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17a8.5 8.5 0 000-17z" fill="currentColor"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>',
    invert: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 20L20 4" /><path d="M12 4h8v8z" fill="currentColor"/>',
    refresh: '<path d="M19.5 12a7.5 7.5 0 11-2.2-5.3M19.5 4v4.5H15"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    signal: '<path d="M4 18v-2M9 18v-5M14 18V9M19 18V5"/>',
    battery: '<rect x="2.5" y="8" width="17" height="8.5" rx="2"/><path d="M21.5 11v2.5"/>',
    wifi: '<path d="M2.5 9a14 14 0 0119 0M5.5 12.5a9.5 9.5 0 0113 0M8.5 16a5 5 0 017 0"/><circle cx="12" cy="19" r=".8"/>',
    car: '<path d="M4 15.5V12l2-5h12l2 5v3.5"/><path d="M3 15.5h18v3H3z"/><circle cx="7.5" cy="18.5" r="1.5"/><circle cx="16.5" cy="18.5" r="1.5"/>',
    bolt: '<path d="M13 2.5L5 13.5h6l-1 8 8-11h-6z"/>',
    share: '<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>',
    trash: '<path d="M4.5 6.5h15M9 6.5V4h6v2.5M6.5 6.5l1 14h9l1-14"/>',
    fog: '<path d="M3 9h12M6 13h15M3 17h10"/>',
    cloud: '<path d="M7 18.5h10.5a4 4 0 00.5-8 6 6 0 00-11.5 1.5A3.3 3.3 0 007 18.5z"/>',
  };
  function icon(name, size = 22, extra = '') {
    return `<svg class="ico ${extra}" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
  }
  const ico = (name, size, extra) => { const s = document.createElement('span'); s.className = 'icw'; s.innerHTML = icon(name, size, extra); return s; };

  function vibrate(p) { try { if (window.G && G.s && G.s.settings.vibrate && navigator.vibrate) navigator.vibrate(p); } catch (e) { /* brak wsparcia */ } }
  const clone = o => JSON.parse(JSON.stringify(o));
  const uid = () => Math.random().toString(36).slice(2, 10);

  const put = (el, ...kids) => { append(el, kids); return el; };
  return { h, put, $, $$, clamp, lerp, sleep, rng, hash, esc, norm, squash, tpl, rich, time, dayLong, dayShort, dateNum, sameDay, parseLocal, dur, pad, Bus, icon, ico, vibrate, clone, uid, MONTHS_GEN, DAYS };
})();

const BUS = U.Bus();
