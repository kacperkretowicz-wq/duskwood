'use strict';
/* Kadr: fikcyjna aplikacja ze zdjęciami i relacjami. Pokazuje tylko profile, które gracz już znalazł
   (seen:web:kadr:*), żeby nie zdradzać zagadek wyszukiwania. Posty z dowodami otwierają stronę profilu. */
(() => {
  const { h } = U;
  const found = () => Object.keys(DATA.kadr || {}).filter(k => G.seen('web:kadr:' + k));
  const dnum = d => { const [dd, mm, yy] = (d || '01.01.2000').split('.'); return +(yy + mm + dd); };

  function story(list, start) {
    let i = start, timer = null;
    const bars = h('div', { class: 'kd-sbars' });
    const img = h('img', { class: 'kd-simg', alt: '' });
    const head = h('div', { class: 'kd-shead' });
    const wrap = h('div', { class: 'kd-story', role: 'dialog', 'aria-label': 'Relacja' }, bars, head, img,
      h('button', { class: 'kd-sprev', 'aria-label': 'Poprzednia', onclick: () => go(i - 1) }),
      h('button', { class: 'kd-snext', 'aria-label': 'Następna', onclick: () => go(i + 1) }),
      h('button', { class: 'kd-sx', 'aria-label': 'Zamknij', onclick: close }, '×'));
    let sy = null;
    wrap.addEventListener('pointerdown', e => { sy = e.clientY; });
    wrap.addEventListener('pointerup', e => { if (sy != null && e.clientY - sy > 70) close(); sy = null; });
    const ov = { close: () => close() };
    function close() { UI.popOverlay(ov); clearTimeout(timer); wrap.classList.add('out'); setTimeout(() => wrap.remove(), 220); }
    function go(n) {
      if (n < 0) n = 0;
      if (n >= list.length) return close();
      i = n; clearTimeout(timer);
      const k = list[i], p = DATA.kadr[k], f = p.feed[0];
      G.markSeen('kadr:story:' + k);
      bars.innerHTML = ''; list.forEach((_, j) => bars.append(h('i', { class: j < i ? 'done' : j === i ? 'on' : '' })));
      head.innerHTML = ''; head.append(UI.avatar(p.av, 'sm'), h('b', {}, k), h('span', {}, f.date));
      img.src = Art.url(f.art);
      timer = setTimeout(() => go(i + 1), 5200);
    }
    UI.screen.appendChild(wrap); UI.pushOverlay(ov);
    go(start);
  }

  UI.def('kadr', {
    name: 'Kadr',
    badge: () => found().filter(k => !G.seen('kadr:story:' + k)).length ? 'dot' : 0,
    mount(host) {
      const stack = new UI.Stack(host);
      const pg = UI.page({ title: 'Kadr', big: true, back: false, right: [UI.iconBtn('search', () => UI.openApp('browser', { page: 'kadr_home' }), 'Szukaj na Kadrze')] });
      pg.el.classList.add('kadr-app');
      function render() {
        pg.body.innerHTML = '';
        const list = found();
        if (!list.length) {
          pg.body.append(h('div', { class: 'empty' }, 'Nie obserwujesz jeszcze nikogo z okolicy. Znajdź ludzi w wyszukiwarce.'),
            h('button', { class: 'btn wide', onclick: () => UI.openApp('browser', { page: 'kadr_home' }) }, 'Popularne w Mglisku'));
          return;
        }
        pg.body.append(h('div', { class: 'kd-stories', 'aria-label': 'Relacje' }, list.map((k, i) =>
          h('button', { class: 'kd-sc' + (G.seen('kadr:story:' + k) ? ' seen' : ''), onclick: () => story(list, i) }, UI.avatar(DATA.kadr[k].av), h('small', {}, k)))));
        const posts = list.flatMap(k => DATA.kadr[k].feed.map((f, idx) => ({ k, f, idx }))).sort((a, b) => dnum(b.f.date) - dnum(a.f.date)).slice(0, 30);
        pg.body.append(h('div', { class: 'kd-feed' }, posts.map(({ k, f }) => h('article', { class: 'kd-post' },
          h('button', { class: 'kd-ph', onclick: () => UI.openApp('browser', { page: 'kadr:' + k }) }, UI.avatar(DATA.kadr[k].av, 'sm'), h('b', {}, k), h('span', {}, f.date)),
          h('button', { class: 'kd-pimg', 'aria-label': 'Zdjęcie', onclick: () => UI.viewImage(f.art, { title: k }) }, h('img', { src: Art.url(f.art), alt: '', loading: 'lazy' })),
          h('div', { class: 'kd-act' },
            h('button', { class: 'kd-like', 'aria-label': 'Polub', 'aria-pressed': 'false', html: U.icon('heart', 25), onclick: e => { const b = e.currentTarget, on = b.classList.toggle('on'); b.setAttribute('aria-pressed', String(on)); const n = b.closest('.kd-post').querySelector('.kd-likes b'); if (n) n.textContent = (f.likes + (on ? 1 : 0)) + ' polubień'; } }),
            h('button', { 'aria-label': 'Komentarze', html: U.icon('chat', 24), onclick: () => UI.openApp('browser', { page: 'kadr:' + k }) }),
            h('span', { class: 'kd-ic', 'aria-hidden': 'true', html: U.icon('send', 23) })),
          h('p', { class: 'kd-likes' }, h('b', {}, f.likes + ' polubień')), h('p', {}, h('b', {}, k), ' ', U.tpl(f.text || ''))))));
      }
      render();
      stack.push({ el: pg.el, onShow: render });
      const off = BUS.on('badges', () => {});
      return { back: () => stack.pop(), destroy: () => { off(); stack.destroy(); } };
    }
  });
})();
