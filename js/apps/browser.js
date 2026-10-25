'use strict';
/* Internet: wyszukiwarka po słowach kluczowych i strony miasteczkowego internetu. */

(() => {
  const { h, $ } = U;

  const val = v => (typeof v === 'function' ? v() : v);
  function score(page, q) {
    const nq = U.norm(q);
    if (!nq) return 0;
    const toks = nq.split(' ').filter(t => t.length > 1);
    let sc = 0;
    for (const kw of val(page.kw) || []) {
      const nk = U.norm(kw);
      if (!nk) continue;
      if ((' ' + nq + ' ').includes(' ' + nk + ' ') || nq === nk) { sc += 3 + nk.length / 12; continue; }
      const kt = nk.split(' ');
      const hits = kt.filter(t => toks.some(x => x === t || (x.length >= 4 && t.length >= 4 && (x.startsWith(t.slice(0, Math.max(4, t.length - 2))) || t.startsWith(x.slice(0, Math.max(4, x.length - 2))))))).length;
      if (hits === kt.length) sc += 1.4 * hits;
      else if (hits && kt.length > 1) sc += 0.45 * hits;
    }
    return sc;
  }
  function search(q) {
    return Object.values(DATA.web)
      .filter(p => !p.hidden && G.test(p.avail))
      .map(p => ({ p, sc: score(p, q) }))
      .filter(r => r.sc >= 1.3)
      .sort((a, b) => b.sc - a.sc)
      .slice(0, 8)
      .map(r => r.p);
  }

  UI.def('browser', {
    name: 'Internet',
    mount(host, params) {
      const stack = new UI.Stack(host);
      stack.push(homePage(stack));
      if (params.page) stack.push(webPage(stack, params.page));
      else if (params.q) stack.push(resultsPage(stack, params.q));
      return {
        back: () => stack.pop(),
        onParams(p) { if (p.page) stack.push(webPage(stack, p.page)); else if (p.q) stack.push(resultsPage(stack, p.q)); },
        destroy: () => stack.destroy()
      };
    }
  });

  function searchBar(stack, value = '') {
    const inp = h('input', { class: 'field sb-in', placeholder: 'Szukaj w sieci…', value, autocomplete: 'off', spellcheck: 'false', enterkeyhint: 'search', type: 'search' });
    const go = () => { const v = inp.value.trim(); if (v) { inp.blur(); stack.push(resultsPage(stack, v)); } };
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
    return h('div', { class: 'sb' }, h('span', { class: 'sb-ic', html: U.icon('search', 18) }), inp, h('button', { class: 'sb-go', onclick: go, 'aria-label': 'Szukaj', html: U.icon('send', 16) }));
  }

  function homePage(stack) {
    const pg = UI.page({ title: '', back: true, cls: 'br-home' });
    pg.hdr.classList.add('flat');
    const recent = h('div', {});
    const render = () => {
      recent.innerHTML = '';
      const hist = (G.s.webHist || []).filter(id => DATA.web[id]).slice(0, 6);
      if (hist.length) {
        recent.appendChild(h('div', { class: 'sec-t' }, 'Ostatnio odwiedzane'));
        const list = h('div', { class: 'list' });
        hist.forEach(id => { const p = DATA.web[id]; list.appendChild(h('button', { class: 'row', onclick: () => stack.push(webPage(stack, id)) }, h('span', { class: 'ri', html: U.icon('globe', 17) }), h('div', { class: 'rm' }, h('b', {}, val(p.title)), h('span', {}, p.url)))); });
        recent.appendChild(list);
      }
    };
    pg.body.append(
      h('div', { class: 'br-logo' }, h('span', {}, 'Internet')),
      h('div', { class: 'pad' }, searchBar(stack)),
      h('div', { class: 'br-short' }, DATA.webShortcuts.filter(s => G.test(s.avail)).map(s => h('button', { class: 'br-sc', onclick: () => stack.push(webPage(stack, s.page)) }, h('span', { class: 'br-sci', style: `background:${s.color}` }, s.letter), h('small', {}, s.name)))),
      recent,
      h('p', { class: 'br-tip' }, 'Wskazówka: szukaj nazwisk, miejsc i dat. Wyszukiwarka rozumie odmianę słów.'));
    render();
    return { el: pg.el, onShow: render };
  }

  function resultsPage(stack, q) {
    const pg = UI.page({ title: '' });
    pg.hdr.classList.add('flat');
    $('.tt', pg.hdr).replaceWith(h('div', { class: 'tt' }, searchBar(stack, q)));
    const res = search(q);
    G.s.searches = (G.s.searches || []);
    G.s.searches.unshift(q);
    G.s.searches = G.s.searches.slice(0, 40);
    BUS.emit('search', q); G.change();
    if (!res.length) pg.body.appendChild(h('div', { class: 'empty' }, h('b', { style: 'display:block;color:var(--tx);margin-bottom:6px' }, `Brak wyników dla „${q}”.`), 'Spróbuj innych słów: nazwiska, miejsca, wydarzenia.'));
    else {
      pg.body.appendChild(h('div', { class: 'res-n' }, `${res.length} ${res.length === 1 ? 'wynik' : res.length < 5 ? 'wyniki' : 'wyników'}`));
      res.forEach(p => {
        const title = val(p.title) || '';
        pg.body.appendChild(h('button', { class: 'res', onclick: () => stack.push(webPage(stack, p.id)) },
        h('div', { class: 'res-u' }, h('span', { class: 'fav', style: `background:${p.favColor || '#456'}` }, (p.fav || title[0] || '?').slice(0, 1)), p.url),
        h('div', { class: 'res-t' }, title),
        h('div', { class: 'res-s', html: U.rich(val(p.snippet) || '') })));
      });
    }
    return { el: pg.el };
  }

  function webPage(stack, id) {
    const p = DATA.web[id];
    const pg = UI.page({ title: '' });
    pg.hdr.classList.add('flat');
    $('.tt', pg.hdr).replaceWith(h('div', { class: 'tt' }, h('div', { class: 'addr' }, U.ico('lock', 13), h('span', {}, p ? p.url : 'about:blank'))));
    const content = h('div', { class: 'web ' + (p && p.site ? 'site-' + p.site : '') });
    pg.body.appendChild(content);
    pg.body.classList.add('web-body');
    if (!p || !G.test(p.avail)) { content.innerHTML = '<div class="empty">Nie można wyświetlić strony.<br>Serwer nie odpowiada.</div>'; return { el: pg.el }; }
    const render = () => { content.innerHTML = typeof p.html === 'function' ? p.html() : p.html; };
    render();
    content.addEventListener('click', e => {
      const a = e.target.closest('[data-go],[data-q],[data-img],[data-call],[data-post],[data-ev],[data-act]');
      if (!a) return;
      e.preventDefault();
      SFX.play.tap();
      if (a.dataset.go) stack.push(webPage(stack, a.dataset.go));
      else if (a.dataset.q) stack.push(resultsPage(stack, a.dataset.q));
      else if (a.dataset.img) UI.viewImage(a.dataset.img, { title: a.dataset.title || '' });
      else if (a.dataset.call) UI.phoneCall(a.dataset.call);
      else if (a.dataset.post) DATA.kadrPost(a.dataset.post);
      else if (a.dataset.ev) { if (G.addEv(a.dataset.ev)) UI.evidenceToast(a.dataset.ev); else UI.toast('Już masz to w dowodach.', { icon: 'folder' }); }
      else if (a.dataset.act && DATA.webActs[a.dataset.act]) DATA.webActs[a.dataset.act](a, render);
    });
    content.addEventListener('submit', e => e.preventDefault());
    G.s.webHist = [id, ...(G.s.webHist || []).filter(x => x !== id)].slice(0, 20);
    G.markSeen('web:' + id);
    [].concat(p.ev || []).forEach(ev => { if (G.test(p.evCond)) { if (G.addEv(ev)) UI.evidenceToast(ev); } });
    if (p.onView) p.onView();
    G.change();
    return { el: pg.el };
  }

  UI.openWeb = id => UI.openApp('browser', { page: id });
})();
