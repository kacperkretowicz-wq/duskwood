'use strict';
/* Przeglądarka zdjęć: przybliżanie, przesuwanie, ukryte punkty (hotspoty), metadane. */

(() => {
  const { h, $ } = U;

  function hotKey(art, i) { return art + ':' + i; }

  UI.viewImage = function (art, opts = {}) {
    const list = opts.list || [art];
    let idx = Math.max(0, list.indexOf(art));
    let meta, W, H;
    const title = h('h1', {});
    const sub = h('small', {});
    const img = h('img', { alt: '', draggable: 'false' });
    const rings = h('div', { class: 'vw-rings' });
    const inner = h('div', { class: 'vw-inner' }, img, rings);
    const stageEl = h('div', { class: 'vw-stage' }, inner);
    const hint = h('div', { class: 'vw-hint' }, 'Przybliż palcami lub kółkiem · dotknij szczegółu');
    const foot = h('div', { class: 'vw-foot' });
    const el = h('div', { class: 'viewer' },
      h('div', { class: 'vw-top' },
        h('button', { class: 'bk', 'aria-label': 'Zamknij', onclick: () => o.close(), html: U.icon('close', 22) }),
        h('div', { class: 'tt' }, title, sub),
        h('div', { class: 'rt' }, h('button', { 'aria-label': 'Informacje', onclick: () => info(), html: U.icon('info', 22) }))),
      stageEl, hint, foot);
    UI.screen.appendChild(el);
    const o = { close() { UI.popOverlay(o); el.classList.add('out'); setTimeout(() => el.remove(), 250); } };
    UI.pushOverlay(o);

    let s = 1, tx = 0, ty = 0;
    const apply = (anim) => {
      inner.style.transition = anim ? 'transform .28s cubic-bezier(.2,.8,.2,1)' : 'none';
      inner.style.transform = `translate(${tx}px,${ty}px) scale(${s})`;
      rings.style.setProperty('--s', s);
    };
    // Telefon na komputerze jest przeskalowany transformacją — liczymy w pikselach układu, nie ekranu.
    const devK = () => (stageEl.getBoundingClientRect().width / stageEl.clientWidth) || 1;
    function fitInner() {
      const k = Math.min(stageEl.clientWidth / W, stageEl.clientHeight / H);
      inner.style.width = W * k + 'px';
      inner.style.height = H * k + 'px';
    }
    function clampT() {
      const bw = inner.offsetWidth, bh = inner.offsetHeight;
      const mx = Math.max(0, (bw * s - stageEl.clientWidth) / 2 + 40);
      const my = Math.max(0, (bh * s - stageEl.clientHeight) / 2 + 40);
      tx = U.clamp(tx, -mx, mx); ty = U.clamp(ty, -my, my);
      if (s <= 1.001) { tx = 0; ty = 0; }
    }
    function zoomAt(cx, cy, ns) {
      ns = U.clamp(ns, 1, 6);
      const sr = stageEl.getBoundingClientRect(), dk = devK();
      const px = ((cx - sr.left) / dk - stageEl.clientWidth / 2 - tx) / s;
      const py = ((cy - sr.top) / dk - stageEl.clientHeight / 2 - ty) / s;
      tx += (s - ns) * px; ty += (s - ns) * py; s = ns;
      clampT();
    }

    function load() {
      art = list[idx];
      meta = Art.get(art) || {};
      W = meta.w || 1200; H = meta.h || 900;
      img.src = Art.url(art);
      img.className = opts.neg ? 'neg' : '';
      title.textContent = U.tpl(opts.title || meta.title || 'Zdjęcie');
      img.alt = meta.title || 'Zdjęcie';
      hint.textContent = (meta.hotspots || []).some(p => G.test(p.cond)) ? 'Przybliż palcami lub kółkiem · dotknij szczegółu' : 'Przybliż palcami lub kółkiem';
      const ex = meta.exif || {};
      sub.textContent = [ex.date && `${ex.date}${ex.time ? ', ' + ex.time : ''}`, opts.from].filter(Boolean).join(' · ');
      s = 1; tx = 0; ty = 0; apply(false);
      fitInner();
      drawRings();
      G.markSeen('img:' + art);
      if (meta.onView && !G.has(meta.onView) && G.test(meta.onViewCond)) { if (G.addEv(meta.onView)) UI.evidenceToast(meta.onView); }
      foot.innerHTML = '';
      if (list.length > 1) foot.append(
        h('button', { class: 'vw-nav', disabled: idx === 0, onclick: () => { idx--; load(); }, html: U.icon('back', 20) }),
        h('span', { class: 'vw-count' }, `${idx + 1} / ${list.length}`),
        h('button', { class: 'vw-nav r', disabled: idx === list.length - 1, onclick: () => { idx++; load(); }, html: U.icon('back', 20) }));
      if (meta.edit && UI.appUnlocked('ciemnia')) foot.appendChild(h('button', { class: 'btn ghost vw-edit', onclick: () => { o.close(); UI.openApp('ciemnia', { art }); } }, U.ico('contrast', 17), 'Otwórz w Ciemni'));
    }
    function drawRings() {
      rings.innerHTML = '';
      (meta.hotspots || []).forEach((hs, i) => {
        if (!G.s.hot[hotKey(art, i)]) return;
        rings.appendChild(h('span', { class: 'ring', style: `left:${hs.x / W * 100}%;top:${hs.y / H * 100}%;width:${hs.r * 2 / W * 100}%` }));
      });
    }
    function tapAt(cx, cy) {
      const r = img.getBoundingClientRect();
      if (cx < r.left || cx > r.right || cy < r.top || cy > r.bottom) return;
      const ix = (cx - r.left) / r.width * W, iy = (cy - r.top) / r.height * H;
      const hs = meta.hotspots || [];
      // przy powiększeniu promień trafienia nie rośnie — trzeba się przyjrzeć
      for (let i = 0; i < hs.length; i++) {
        const p = hs[i];
        if (!G.test(p.cond)) continue;
        const rr = p.r * (s >= (p.zoom || 1) ? 1 : 0.6);
        if (Math.hypot(ix - p.x, iy - p.y) <= rr) {
          if (p.zoom && s < p.zoom) { UI.toast('Coś tam jest… przybliż bardziej.', { icon: 'search' }); return; }
          const k = hotKey(art, i);
          const first = !G.s.hot[k];
          G.s.hot[k] = true;
          drawRings();
          pulse(p);
          if (p.ev) { const isNew = G.addEv(p.ev); if (isNew) UI.evidenceToast(p.ev); else UI.toast(p.label || G.ev(p.ev).title, { icon: 'search' }); }
          else UI.toast(U.tpl(p.label || 'Ciekawe…'), { icon: 'search', ms: 3400 });
          if (first) G.change();
          return;
        }
      }
    }
    function pulse(p) {
      const sp = h('span', { class: 'ring pulse', style: `left:${p.x / W * 100}%;top:${p.y / H * 100}%;width:${p.r * 2 / W * 100}%` });
      rings.appendChild(sp);
      setTimeout(() => sp.remove(), 900);
    }

    /* ----- gesty ----- */
    const pts = new Map();
    let start = null, pinch = null, lastTap = 0, moved = false;
    stageEl.addEventListener('pointerdown', e => {
      stageEl.setPointerCapture(e.pointerId);
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      hint.classList.add('gone');
      if (pts.size === 1) { start = { x: e.clientX, y: e.clientY, tx, ty, t: Date.now() }; moved = false; }
      if (pts.size === 2) {
        const [a, b] = [...pts.values()];
        pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s, cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
        moved = true;
      }
    });
    stageEl.addEventListener('pointermove', e => {
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 2 && pinch) {
        const [a, b] = [...pts.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        zoomAt(pinch.cx, pinch.cy, pinch.s * d / pinch.d);
        apply(false);
      } else if (pts.size === 1 && start) {
        const dx = e.clientX - start.x, dy = e.clientY - start.y;
        if (Math.abs(dx) + Math.abs(dy) > 8) moved = true;
        if (s > 1) { const dk = devK(); tx = start.tx + dx / dk; ty = start.ty + dy / dk; clampT(); apply(false); }
      }
    });
    const up = e => {
      if (!pts.has(e.pointerId)) return;
      pts.delete(e.pointerId);
      if (pts.size < 2) pinch = null;
      if (pts.size === 0 && start) {
        const dx = e.clientX - start.x;
        if (!moved && Date.now() - start.t < 400) {
          const now = Date.now();
          if (now - lastTap < 300) { zoomAt(e.clientX, e.clientY, s > 1.5 ? 1 : 2.6); apply(true); lastTap = 0; }
          else { lastTap = now; const cx = e.clientX, cy = e.clientY; setTimeout(() => { if (lastTap === now) tapAt(cx, cy); }, 260); }
        } else if (s <= 1.01 && Math.abs(dx) > 70 && list.length > 1) {
          if (dx < 0 && idx < list.length - 1) { idx++; load(); } else if (dx > 0 && idx > 0) { idx--; load(); }
        }
        start = null;
      }
    };
    stageEl.addEventListener('pointerup', up);
    stageEl.addEventListener('pointercancel', up);
    stageEl.addEventListener('wheel', e => { e.preventDefault(); zoomAt(e.clientX, e.clientY, s * (e.deltaY < 0 ? 1.18 : 0.85)); apply(true); hint.classList.add('gone'); }, { passive: false });
    const ro = new ResizeObserver(() => fitInner());
    ro.observe(stageEl);

    function info() {
      const ex = meta.exif || {};
      const rows = [
        ['Data', ex.date], ['Godzina', ex.time], ['Urządzenie', ex.device], ['Lokalizacja', ex.place],
        ['Rozdzielczość', ex.res || `${W * 3} × ${H * 3}`], ['Plik', ex.file], ['Uwagi', ex.note]
      ].filter(r => r[1]);
      const body = h('div', { class: 'list plain exif' }, rows.map(r => h('div', { class: 'row' }, h('div', { class: 'rm' }, h('span', {}, r[0]), h('b', { html: U.rich(r[1]) })))));
      UI.sheet({ title: 'Szczegóły zdjęcia', body: [body, meta.desc ? h('p', { class: 'pad', style: 'color:var(--tx2);font-size:14px;line-height:1.5', html: U.rich(meta.desc) }) : null] });
      if (ex.clue && !G.has(ex.clue)) { if (G.addEv(ex.clue)) UI.evidenceToast(ex.clue); }
    }

    load();
    setTimeout(() => hint.classList.add('gone'), 3200);
    const origClose = o.close;
    o.close = () => { ro.disconnect(); origClose(); };
    return o;
  };
})();
