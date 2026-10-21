'use strict';
/* Galeria gracza: zdjęcia otrzymane w rozmowach i wywołane w Ciemni. */

(() => {
  const { h } = U;

  UI.def('gallery', {
    name: 'Galeria',
    mount(host) {
      const stack = new UI.Stack(host);
      const pg = UI.page({ title: 'Galeria', big: true });
      function albums() {
        const got = dedupe((G.s.saved || []).slice().reverse().map(s => s.art));
        const dev = dedupe((G.s.dev || []).slice().reverse());
        const shots = dedupe((G.s.panelShots || []).slice().reverse().map(s => s.art));
        return [
          { id: 'got', name: 'Otrzymane', items: got, empty: 'Zdjęcia, które dostaniesz w wiadomościach, trafią tutaj.' },
          { id: 'dev', name: 'Wywołane', items: dev, empty: 'Kadry wywołane w Ciemni.' },
          shots.length ? { id: 'trap', name: 'BushView', items: shots } : null
        ].filter(Boolean);
      }
      function render() {
        pg.body.innerHTML = '';
        albums().forEach(a => {
          pg.body.appendChild(h('div', { class: 'sec-t' }, `${a.name} · ${a.items.length}`));
          if (!a.items.length) { pg.body.appendChild(h('p', { class: 'pad', style: 'color:var(--tx3);font-size:13.5px;margin:0 0 6px' }, a.empty)); return; }
          pg.body.appendChild(grid(a.items, a.name));
        });
      }
      stack.push({ el: pg.el, onShow: render });
      render();
      return { back: () => stack.pop(), destroy: () => stack.destroy() };
    }
  });

  const dedupe = arr => [...new Set(arr)];

  function grid(items, title, opts = {}) {
    const g = h('div', { class: 'pgrid' });
    items.forEach((art, i) => {
      const m = Art.get(art) || {};
      g.appendChild(h('button', { class: 'pth' + (opts.neg && opts.neg(art) ? ' neg' : '') + (opts.isNew && opts.isNew(art) ? ' new' : ''), onclick: () => UI.viewImage(art, { list: items, neg: opts.neg && opts.neg(art) }) },
        h('img', { src: Art.url(art), alt: '', loading: 'lazy' }),
        m.video ? h('span', { class: 'pv-ic', html: U.icon('play', 14) }) : null));
    });
    return g;
  }
  UI.photoGrid = grid;
})();
