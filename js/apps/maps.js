'use strict';
/* Mapy: plan Mgliska z warstwami, trasami i trybem wskazywania miejsca. */

(() => {
  const { h, $ } = U;
  const KIND = {
    home: { c: '#f0a53a', i: 'user' }, poi: { c: '#8fb4c4', i: 'pin' }, huta: { c: '#ec6a6a', i: 'pin' },
    adit: { c: '#c9a85a', i: 'target' }, stand: { c: '#94a550', i: 'eye' }, water: { c: '#5aa8f0', i: 'pin' },
    police: { c: '#5f86b5', i: 'pin' }, gate: { c: '#d0d0d0', i: 'minus' }
  };

  UI.def('maps', {
    name: 'Mapy',
    mount(host, params) {
      const MD = DATA.map;
      const W = MD.w, H = MD.h;
      let pick = params.pick || null;
      const active = { base: true };
      if (G.isUnlocked('layer:forest')) active.forest = true;
      if (G.isUnlocked('layer:hunt')) active.hunt = G.flag('huntOn') || !!params.hunt;
      if (params.layer) active[params.layer] = true;
      if (params.pick && params.pick.layer) active[params.pick.layer] = true;
      let showRoute = params.route || null;
      let showCircle = !!params.circle || (G.isUnlocked('map:circle') && G.flag('circleOn'));

      const layersEl = h('div', { class: 'mp-layers' });
      const pinsEl = h('div', { class: 'mp-pins' });
      const inner = h('div', { class: 'mp-inner', style: `width:${W}px;height:${H}px` }, layersEl, pinsEl);
      const stageEl = h('div', { class: 'mp-stage' }, inner);
      const card = h('div', { class: 'mp-card' });
      const top = h('div', { class: 'mp-top' });
      const el = h('div', { class: 'maps' + (pick ? ' picking' : '') }, stageEl, top, card);
      host.appendChild(el);

      function renderTop() {
        top.innerHTML = '';
        if (pick) {
          top.append(h('div', { class: 'mp-pick' }, U.ico('pin', 18), h('span', {}, U.tpl(pick.prompt || 'Wskaż miejsce')),
            h('button', { onclick: () => { UI.openApp('messages', { chat: pick.chat }); } }, 'Anuluj')));
        } else {
          top.append(
            h('button', { class: 'mp-btn', 'aria-label': 'Wstecz', onclick: () => UI.goHome(), html: U.icon('back', 22) }),
            h('div', { class: 'mp-title' }, h('b', {}, 'Mglisko'), h('small', {}, 'gmina Mglisko · Góry Sowie')),
            h('button', { class: 'mp-btn', 'aria-label': 'Warstwy', onclick: layersSheet, html: U.icon('layers', 21) }));
        }
      }
      function renderLayers() {
        layersEl.innerHTML = '';
        const add = (art, cls = '') => layersEl.appendChild(h('img', { src: Art.url(art), class: 'mp-l ' + cls, alt: '', draggable: 'false' }));
        add('map_base');
        if (active.forest) add('map_forest');
        if (active.hunt) add('map_hunt', 'blend');
        if (showRoute && G.isUnlocked('route:' + showRoute)) add('map_route' + showRoute);
        if (showCircle && G.isUnlocked('map:circle')) add('map_circle', 'pulse');
      }
      function placeVisible(p) {
        if (p.layer && !active[p.layer]) return false;
        return G.test(p.cond);
      }
      function renderPins() {
        pinsEl.innerHTML = '';
        Object.entries(MD.places).forEach(([id, p]) => {
          if (!placeVisible(p)) return;
          const k = KIND[p.kind] || KIND.poi;
          const can = !pick || !pick.pool || pick.pool.includes(id) || pick.pool.includes(p.kind);
          pinsEl.appendChild(h('button', {
            class: 'mp-pin k-' + p.kind + (can ? '' : ' dim') + (p.small ? ' small' : ''), style: `left:${p.x}px;top:${p.y}px;--c:${k.c}`,
            onclick: e => { e.stopPropagation(); select(id); }
          }, h('span', { class: 'mp-dot', html: U.icon(k.i, 13) }), h('span', { class: 'mp-lab' }, p.short || p.name)));
        });
      }
      function select(id) {
        const p = MD.places[id];
        SFX.play.tap();
        card.innerHTML = '';
        card.classList.add('on');
        const can = !pick || !pick.pool || pick.pool.includes(id) || pick.pool.includes(p.kind);
        U.put(card, 
          h('div', { class: 'mp-c-h' }, h('span', { class: 'mp-c-i', style: `--c:${(KIND[p.kind] || KIND.poi).c}`, html: U.icon((KIND[p.kind] || KIND.poi).i, 18) }),
            h('div', {}, h('b', {}, p.name), p.addr ? h('small', {}, p.addr) : null),
            h('button', { class: 'mp-c-x', onclick: () => card.classList.remove('on'), html: U.icon('close', 16) })),
          p.desc ? h('p', { html: U.rich(p.desc) }) : null,
          pick ? h('button', { class: 'btn pri wide', disabled: !can, onclick: () => choose(id) }, can ? 'Wskaż to miejsce' : 'To nie ten typ miejsca') : null);
        if (p.ev && !pick) { if (G.addEv(p.ev)) UI.evidenceToast(p.ev); }
      }
      function choose(id) {
        const chat = pick.chat;
        pick = null;
        UI.openApp('messages', { chat });
        setTimeout(() => Engine.answer(id), 50);
      }
      function layersSheet() {
        const row = (key, name, desc, on, toggle, locked) => h('button', { class: 'row' + (locked ? ' dis' : ''), onclick: () => { if (locked) { UI.toast('Ta warstwa nie jest jeszcze dostępna.', { icon: 'lock' }); return; } toggle(); sh.close(); layersSheet(); } },
          h('span', { class: 'ri', html: U.icon(locked ? 'lock' : 'layers', 17) }), h('div', { class: 'rm' }, h('b', {}, name), h('span', {}, desc)),
          h('span', { class: 'tgl' + (on ? ' on' : '') }));
        const body = h('div', { class: 'list' },
          row('forest', 'Mapa leśna', 'Drogi leśne, sztolnie, ambony, szlabany', !!active.forest, () => { active.forest = !active.forest; refresh(); }, !G.isUnlocked('layer:forest')),
          row('hunt', 'Obwody łowieckie', 'Granice obwodów kół łowieckich', !!active.hunt, () => { active.hunt = !active.hunt; G.setFlag('huntOn', active.hunt); refresh(); }, !G.isUnlocked('layer:hunt')),
          row('route', 'Trasa Mai — 14.10', 'Z historii lokalizacji w Nimbusie', !!showRoute, () => { showRoute = showRoute ? null : '1410'; refresh(); }, !G.isUnlocked('route:1410')),
          row('circle', 'Ostatnia pozycja telefonu', 'Znajdź urządzenie · ±800 m', showCircle, () => { showCircle = !showCircle; G.setFlag('circleOn', showCircle); refresh(); }, !G.isUnlocked('map:circle')));
        const sh = UI.sheet({ title: 'Warstwy mapy', body });
      }
      function refresh() { renderLayers(); renderPins(); }

      /* ----- przesuwanie i przybliżanie ----- */
      let s = 0.5, tx = 0, ty = 0;
      const minS = () => Math.max(stageEl.clientWidth / W, stageEl.clientHeight / H) * 0.98;
      function clamp() {
        s = U.clamp(s, minS(), 3.2);
        const vw = stageEl.clientWidth, vh = stageEl.clientHeight;
        tx = U.clamp(tx, vw - W * s, 0); ty = U.clamp(ty, vh - H * s, 0);
        if (W * s < vw) tx = (vw - W * s) / 2;
      }
      function apply(anim) {
        clamp();
        inner.style.transition = anim ? 'transform .35s cubic-bezier(.2,.8,.2,1)' : 'none';
        inner.style.transform = `translate(${tx}px,${ty}px) scale(${s})`;
        inner.style.setProperty('--is', 1 / s);
        el.classList.toggle('far', s < 0.62);
      }
      const devK = () => (stageEl.getBoundingClientRect().width / stageEl.clientWidth) || 1;
      function zoomAt(cx, cy, ns) {
        const r = stageEl.getBoundingClientRect(), dk = devK();
        const lx = (cx - r.left) / dk, ly = (cy - r.top) / dk;
        const px = (lx - tx) / s, py = (ly - ty) / s;
        s = U.clamp(ns, minS(), 3.2);
        tx = lx - s * px; ty = ly - s * py;
      }
      function center(x, y, ns) { s = ns || s; tx = stageEl.clientWidth / 2 - x * s; ty = stageEl.clientHeight / 2 - y * s; }
      const pts = new Map();
      let st = null, pinch = null;
      stageEl.addEventListener('pointerdown', e => {
        stageEl.setPointerCapture(e.pointerId);
        pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pts.size === 1) st = { x: e.clientX, y: e.clientY, tx, ty, moved: false };
        if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s, cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 }; }
      });
      stageEl.addEventListener('pointermove', e => {
        if (!pts.has(e.pointerId)) return;
        pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pts.size === 2 && pinch) { const [a, b] = [...pts.values()]; zoomAt(pinch.cx, pinch.cy, pinch.s * Math.hypot(a.x - b.x, a.y - b.y) / pinch.d); apply(false); if (st) st.moved = true; }
        else if (st) { const dk = devK(); const dx = (e.clientX - st.x) / dk, dy = (e.clientY - st.y) / dk; if (Math.abs(dx) + Math.abs(dy) > 6) st.moved = true; tx = st.tx + dx; ty = st.ty + dy; apply(false); }
      });
      const up = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; if (!pts.size) { if (st && !st.moved) card.classList.remove('on'); st = null; } };
      stageEl.addEventListener('pointerup', up);
      stageEl.addEventListener('pointercancel', up);
      stageEl.addEventListener('wheel', e => { e.preventDefault(); zoomAt(e.clientX, e.clientY, s * (e.deltaY < 0 ? 1.15 : 0.87)); apply(true); }, { passive: false });
      stageEl.addEventListener('dblclick', e => { zoomAt(e.clientX, e.clientY, s * 1.8); apply(true); });

      renderTop(); refresh();
      requestAnimationFrame(() => {
        const f = params.focus && MD.places[params.focus];
        if (f) center(f.x, f.y, 1.3);
        else if (params.circle || showCircle && pick) center(800, 300, 0.95);
        else if (params.route) center(470, 580, 0.85);
        else if (pick && pick.layer === 'forest') center(800, 320, 0.9);
        else center(560, 700, 0.8);
        apply(false);
      });
      const ro = new ResizeObserver(() => apply(false));
      ro.observe(stageEl);
      const off = BUS.on('unlock', refresh);
      return {
        back: () => { if (card.classList.contains('on')) { card.classList.remove('on'); return true; } if (pick) { UI.openApp('messages', { chat: pick.chat }); return true; } return false; },
        onParams(p) {
          if (p.pick) { pick = p.pick; el.classList.add('picking'); renderTop(); }
          if (p.route) showRoute = p.route;
          if (p.circle) showCircle = true;
          if (p.layer) active[p.layer] = true;
          refresh();
        },
        destroy: () => { ro.disconnect(); off(); }
      };
    }
  });
})();
