'use strict';
/* Notatki: zwykła aplikacja notatek. Przypięta „Co teraz?”, zapisane rzeczy, ludzie, oś czasu, pytania. */

(() => {
  const { h, $ } = U;
  const openDeds = () => Object.keys(DATA.deductions).filter(id => G.isUnlocked('ded:' + id) && !G.s.solved[id]);
  const fmtLong = t => { const d = U.toDate ? U.toDate(t) : new Date(t); return `${d.getDate()} ${U.MONTHS_GEN[d.getMonth()]} ${d.getFullYear()} o ${U.time(d)}`; };
  const short = t => U.sameDay(t, G.now()) ? U.time(t) : U.dateNum(t).slice(0, 5);
  const plain = s => U.tpl(s || '').replace(/[*_]/g, '').replace(/\n/g, ' ');

  // Prywatne notatki gracza — żeby telefon wyglądał na używany.
  const OWN = [
    { id: 'shop', title: 'Zakupy', t: '2026-10-18T19:02', body: 'mleko\nchleb\nbaterie AA\nkawa!!\nkarma dla kota sąsiadki (oddać klucze)' },
    { id: 'wifi', title: 'Wi-Fi u rodziców', t: '2026-09-27T14:40', body: 'sieć: DOM_5G\nhasło: *zielonydom1987*\n(nie zmieniać, tata się gubi)' },
    { id: 'gift', title: 'Prezenty', t: '2026-10-02T22:15', body: '— mama: szal? książka o ogrodach\n— brat: słuchawki (nie te najtańsze)\n— sobie: nowy telefon 😅' }
  ];

  function notesList() {
    const ev = Object.keys(G.s.ev).map(G.ev).filter(Boolean).sort((a, b) => G.s.ev[b.id].t - G.s.ev[a.id].t);
    const ppl = Object.entries(DATA.persons).filter(([, p]) => G.test(p.cond));
    const tl = DATA.timeline.filter(t => G.test(t.cond));
    const deds = Object.keys(DATA.deductions).filter(id => G.isUnlocked('ded:' + id));
    const o = G.s.objective;
    const list = [];
    list.push({ id: 'todo', pin: true, title: 'Co teraz?', t: G.now(), prev: o ? plain(o.text) : 'Nic pilnego. Sprawdzaj wiadomości.' });
    list.push({ id: 'season', pin: true, title: 'Szkło pamięta', t: G.now() - 1000, prev: 'Sezon 1 · etapy historii i podsumowanie sesji' });
    if (PhoneTools.saved().length) list.push({ id: 'quotes', title: 'Zachowane cytaty', t: G.now(), prev: `${PhoneTools.saved().length} wiadomości · nadawcy i daty` });
    const topics = Conversations.available().length;
    if (G.isUnlocked('chat:group')) list.push({ id: 'conversations', pin: true, title: 'Na osobności', t: G.now() - 30000,
      prev: `${topics} ${topics === 1 ? 'temat' : topics >= 2 && topics <= 4 ? 'tematy' : 'tematów'} · prywatne rozmowy i dodatkowe tropy` });
    if (deds.length) list.push({ id: 'questions', pin: true, title: 'Pytania', t: G.now() - 60000, prev: openDeds().length ? `${openDeds().length} bez odpowiedzi · ${DATA.deductions[openDeds()[0]].q}` : 'Wszystko rozstrzygnięte.', dot: openDeds().some(id => !G.seen('ded:' + id)) });
    if (ev.length) list.push({ id: 'saved', title: 'Zapisane', t: G.s.ev[ev[0].id].t, prev: `${ev.length} ${ev.length === 1 ? 'element' : ev.length < 5 ? 'elementy' : 'elementów'} · ${ev[0].title}`, dot: G.freshEvidence() > 0, thumb: (ev.find(e => e.img) || {}).img });
    if (ppl.length) list.push({ id: 'people', title: 'Ludzie', t: G.now() - 120000, prev: ppl.map(([, p]) => p.name.split(' ')[0]).join(', ') });
    if (tl.length) list.push({ id: 'timeline', title: 'Oś czasu', t: G.now() - 180000, prev: `${tl.length} wydarzeń` });
    OWN.forEach(n => list.push({ id: 'own:' + n.id, title: n.title, t: U.parseLocal(n.t), prev: plain(n.body) }));
    return list;
  }

  UI.def('notes', {
    name: 'Notatki', unlock: 'app:notes',
    badge: () => (G.freshEvidence() + openDeds().filter(id => !G.seen('ded:' + id)).length) || 0,
    mount(host, params) {
      const stack = new UI.Stack(host);
      stack.push(rootPage(stack));
      const open = p => {
        if (p.ev && G.has(p.ev)) { stack.popTo(1); stack.push(savedPage(stack)); setTimeout(() => evSheet(p.ev), 120); }
        else if (p.note) { stack.popTo(1); openNote(stack, p.note); }
        if (p.ded && G.isUnlocked('ded:' + p.ded) && !G.s.solved[p.ded]) setTimeout(() => solve(p.ded), 150);
      };
      open(params);
      return { back: () => stack.pop(), onParams: open, destroy: () => stack.destroy() };
    }
  });

  function openNote(stack, id) {
    if (id === 'season') { UI.openSeason(); return; }
    if (id === 'conversations') { UI.openConversations(); return; }
    if (id === 'quotes') { UI.savedQuotes(); return; }
    if (id === 'todo') stack.push(todoPage());
    else if (id === 'saved') stack.push(savedPage(stack));
    else if (id === 'people') stack.push(peoplePage());
    else if (id === 'timeline') stack.push(timelinePage());
    else if (id === 'questions') stack.push(questionsPage());
    else if (id.startsWith('own:')) stack.push(ownPage(OWN.find(n => 'own:' + n.id === id)));
  }

  function rootPage(stack) {
    const pg = UI.page({ title: 'Notatki', big: true, cls: 'notes' });
    const search = h('input', { type: 'search', class: 'nt-search', placeholder: 'Szukaj', 'aria-label': 'Szukaj w notatkach' });
    const content = h('div', {});
    pg.body.append(search, content);
    const render = () => {
      content.innerHTML = '';
      const query = U.norm(search.value);
      const all = notesList().filter(n => !query || U.norm(n.title + ' ' + n.prev).includes(query));
      const sec = (label, items) => {
        if (!items.length) return;
        content.appendChild(h('div', { class: 'nt-sec' }, label));
        const box = h('div', { class: 'nt-list' });
        items.forEach(n => box.appendChild(h('button', { class: 'nt-row' + (n.dot ? ' has-new' : ''), onclick: () => openNote(stack, n.id) },
          h('div', { class: 'nt-m' }, h('b', {}, n.title), h('span', {}, h('i', {}, short(n.t)), n.prev)),
          n.thumb ? h('img', { class: 'nt-th', src: Art.url(n.thumb), alt: '' }) : null)));
        content.appendChild(box);
      };
      sec('Przypięte', all.filter(n => n.pin));
      sec('Notatki', all.filter(n => !n.pin));
      content.appendChild(h('div', { class: 'nt-count' }, all.length ? `${all.length} notatek` : 'Brak wyników'));
    };
    search.addEventListener('input', render);
    render();
    const offs = ['evidence', 'goal', 'solved', 'unlock', 'badges', 'conversations'].map(e => BUS.on(e, render));
    return { el: pg.el, onShow: render, destroy: () => offs.forEach(f => f()) };
  }

  function notePage(title, t) {
    const pg = UI.page({ title: '', cls: 'notes note' });
    pg.body.append(h('div', { class: 'nt-date' }, fmtLong(t)), h('h2', { class: 'nt-title' }, title));
    return pg;
  }

  /* ---------- Co teraz? ---------- */
  function todoPage() {
    const pg = notePage('Co teraz?', G.now());
    const box = h('div', { class: 'nt-body' });
    pg.body.appendChild(box);
    const render = () => {
      box.innerHTML = '';
      const o = G.s.objective;
      const ch = Engine.chapters[G.s.chapter] || {};
      if (!o) { box.appendChild(h('p', {}, 'Nic pilnego. Sprawdzaj wiadomości — ktoś na pewno się odezwie.')); }
      else {
        box.appendChild(h('p', { class: 'nt-goal', html: '☐ ' + U.rich(o.text) }));
        const hints = o.hints || [];
        if (hints.length) {
          box.appendChild(h('p', { class: 'nt-sub' }, 'Pomysły:'));
          hints.forEach((t, i) => {
            const shown = i < (o.level || 0);
            box.appendChild(h('button', { class: 'nt-hint' + (shown ? ' on' : ''), disabled: !shown && i !== (o.level || 0), onclick: () => { if (shown) return; o.level = (o.level || 0) + 1; G.inc('hintsUsed'); G.change(); render(); } },
              h('span', { html: shown ? '— ' + U.rich(t) : '— ' + '▬'.repeat(10 + (t.length % 9)) }),
              !shown && i === (o.level || 0) ? h('small', {}, 'dotknij, aby odsłonić') : null));
          });
        }
      }
      const n = openDeds().length;
      if (n) box.appendChild(h('p', { class: 'nt-sub' }, `Pytania bez odpowiedzi: ${n} (notatka „Pytania”).`));
      box.appendChild(h('p', { class: 'nt-foot' }, `${ch.num === 0 ? 'Prolog' : ch.num === 99 ? 'Epilog' : 'Rozdział ' + ch.num} · ${ch.title || ''} · ${Object.keys(G.s.ev).length} zapisanych`));
    };
    render();
    const off = BUS.on('goal', render);
    return { el: pg.el, destroy: off };
  }

  /* ---------- Zapisane ---------- */
  function savedPage(stack) {
    const pg = notePage('Zapisane', G.now());
    const box = h('div', { class: 'nt-body' });
    pg.body.appendChild(box);
    const render = () => {
      box.innerHTML = '';
      const owned = Object.keys(G.s.ev).map(G.ev).filter(Boolean);
      if (!owned.length) { box.appendChild(h('p', {}, 'Tu trafia wszystko, co zapiszesz: zrzuty, fragmenty wiadomości, zdjęcia.')); return; }
      Object.keys(DATA.evCat).forEach(c => {
        const items = owned.filter(e => e.cat === c).sort((a, b) => G.s.ev[b.id].t - G.s.ev[a.id].t);
        if (!items.length) return;
        box.appendChild(h('p', { class: 'nt-sub' }, DATA.evCat[c].name));
        const imgs = items.filter(e => e.img), txt = items.filter(e => !e.img);
        if (imgs.length) box.appendChild(h('div', { class: 'nt-att' }, imgs.map(e => h('button', { class: 'nt-a' + (G.s.ev[e.id].fresh ? ' fresh' : ''), onclick: () => evSheet(e.id, render) },
          h('img', { src: Art.url(e.img), alt: '', class: e.neg ? 'neg' : '' }), h('span', {}, e.title)))));
        txt.forEach(e => box.appendChild(h('button', { class: 'nt-li' + (G.s.ev[e.id].fresh ? ' fresh' : ''), onclick: () => evSheet(e.id, render) }, h('span', { html: '• <b>' + U.esc(e.title) + '</b>' }))));
      });
    };
    render();
    const off = BUS.on('evidence', render);
    return { el: pg.el, destroy: off, onShow: render };
  }
  function evSheet(id, after) {
    const e = G.ev(id);
    if (!e) return;
    G.s.ev[id].fresh = false; BUS.emit('badges'); G.save();
    const body = h('div', { class: 'ev-detail' },
      e.img ? h('img', { src: Art.url(e.img), alt: '', class: e.neg ? 'neg' : '', onclick: () => UI.viewImage(e.img, { title: e.title, neg: e.neg }) }) : null,
      h('h2', {}, e.title),
      h('div', { class: 'ev-meta' }, e.source ? h('span', { class: 'pill' }, e.source) : null, h('span', { class: 'pill' }, short(G.s.ev[id].t))),
      h('p', { html: U.rich(e.desc || '') }),
      e.open ? h('button', { class: 'btn wide', style: 'margin-top:6px', onclick: () => { sh.close(); UI.openApp(e.open.app, e.open.params || {}); } }, U.ico('eye', 18), e.open.label || 'Otwórz źródło') : null);
    const sh = UI.sheet({ title: '', body, onClose: () => after && after() });
  }
  UI.evSheet = evSheet;

  /* ---------- Ludzie ---------- */
  function peoplePage() {
    const pg = notePage('Ludzie', G.now());
    const box = h('div', { class: 'nt-body' });
    pg.body.appendChild(box);
    Object.entries(DATA.persons).filter(([, p]) => G.test(p.cond)).forEach(([id, p]) => {
      const facts = (p.facts || []).filter(f => G.test(f.cond));
      box.appendChild(h('button', { class: 'pp-card', onclick: () => personSheet(id) },
        UI.avatar(p.av || id),
        h('div', { class: 'rm' }, h('b', {}, p.name), h('span', {}, U.tpl(p.role || '')), h('small', {}, `${facts.length} ${facts.length === 1 ? 'informacja' : facts.length < 5 ? 'informacje' : 'informacji'}`)),
        p.tag && G.test(p.tag.cond) ? h('span', { class: 'pp-tag ' + (p.tag.kind || '') }, p.tag.text) : null));
    });
    return { el: pg.el };
  }
  function personSheet(id) {
    const p = DATA.persons[id];
    const facts = (p.facts || []).filter(f => G.test(f.cond));
    const t = DATA.chars[id] && DATA.chars[id].trust ? G.v('trust_' + id) : null;
    UI.sheet({
      title: '', body: h('div', { class: 'pp-detail' },
        h('div', { class: 'pp-top' }, UI.avatar(p.av || id, 'lg'), h('div', {}, h('h2', {}, p.name), h('span', {}, U.tpl(p.role || '')))),
        t != null ? h('div', { class: 'pp-trust' }, h('span', {}, 'Relacja'), h('div', { class: 'pp-bar' }, h('i', { style: `width:${U.clamp(50 + t * 10, 6, 100)}%` })), h('small', {}, t > 1 ? 'ufa ci' : t < -1 ? 'nie ufa ci' : 'ostrożnie')) : null,
        h('ul', { class: 'pp-facts' }, facts.map(f => h('li', { html: U.rich(f.text) }))),
        Conversations.all().some(([, d]) => d.who === id) ? h('button', { class: 'btn wide', onclick: () => UI.openConversations(id) }, 'Porozmawiaj na osobności') : null)
    });
  }

  /* ---------- Oś czasu ---------- */
  function timelinePage() {
    const pg = notePage('Oś czasu', G.now());
    const items = DATA.timeline.filter(t => G.test(t.cond)).sort((a, b) => U.parseLocal(a.t) - U.parseLocal(b.t));
    const tl = h('div', { class: 'tl' });
    let year = null;
    items.forEach(t => {
      const d = new Date(U.parseLocal(t.t));
      if (d.getFullYear() !== year) { year = d.getFullYear(); tl.appendChild(h('div', { class: 'tl-y' }, String(year))); }
      tl.appendChild(h('div', { class: 'tl-i' + (t.key ? ' key' : '') },
        h('div', { class: 'tl-d' }, `${d.getDate()} ${U.MONTHS_GEN[d.getMonth()].slice(0, 3)}`, t.time !== false ? h('small', {}, U.time(d)) : null),
        h('div', { class: 'tl-b' }, h('b', { html: U.rich(t.title) }), t.text ? h('span', { html: U.rich(t.text) }) : null)));
    });
    pg.body.appendChild(tl);
    return { el: pg.el };
  }

  /* ---------- Pytania ---------- */
  function questionsPage() {
    const pg = notePage('Pytania', G.now());
    const box = h('div', { class: 'nt-body' });
    pg.body.appendChild(box);
    const render = () => {
      box.innerHTML = '';
      Object.keys(DATA.deductions).filter(id => G.isUnlocked('ded:' + id)).forEach(id => {
        G.markSeen('ded:' + id);
        const d = DATA.deductions[id];
        const solved = !!G.s.solved[id];
        box.appendChild(h('button', { class: 'nt-q' + (solved ? ' done' : ''), onclick: () => { if (!solved) solve(id, render); } },
          h('span', { class: 'nt-cb', html: solved ? U.icon('check', 14) : '' }),
          h('div', {}, h('b', {}, d.q), h('span', { html: U.rich(solved ? d.done : d.intro) }))));
      });
    };
    render();
    const off = BUS.on('solved', render);
    return { el: pg.el, destroy: off };
  }
  function solve(id, after) {
    const d = DATA.deductions[id];
    let picked = null, sh;
    const body = h('div', { class: 'ded-solve' });
    const step1 = () => {
      body.innerHTML = '';
      body.append(h('p', { class: 'pad', html: U.rich(d.intro) }));
      const opts = h('div', { class: d.kind === 'person' ? 'ded-ppl' : 'ded-opts' });
      d.options.filter(o => G.test(o.cond)).forEach(o => opts.appendChild(h('button', { class: 'ded-o', onclick: () => { picked = o.id; d.support ? step2() : check(); } },
        o.av ? UI.avatar(o.av, 'lg') : null, h('span', { html: U.rich(o.label) }))));
      body.appendChild(opts);
    };
    const step2 = () => {
      body.innerHTML = '';
      const sel = new Set();
      const owned = Object.keys(G.s.ev).map(G.ev).filter(Boolean);
      const btn = h('button', { class: 'btn pri wide', disabled: true, onclick: () => check([...sel]) }, `Wybierz ${d.support.need}`);
      body.append(h('p', { class: 'pad', html: U.rich(d.support.prompt) }));
      const list = h('div', { class: 'list' });
      owned.forEach(e => list.appendChild(h('button', {
        class: 'row', onclick: ev => {
          if (sel.has(e.id)) sel.delete(e.id); else if (sel.size < d.support.need) sel.add(e.id);
          ev.currentTarget.classList.toggle('sel', sel.has(e.id));
          btn.disabled = sel.size !== d.support.need;
          btn.textContent = sel.size === d.support.need ? 'Gotowe' : `Wybierz ${d.support.need - sel.size}`;
        }
      }, e.img ? h('img', { class: 'ri thumb', src: Art.url(e.img), alt: '' }) : h('span', { class: 'ri', html: U.icon(DATA.evCat[e.cat].icon, 17) }), h('div', { class: 'rm' }, h('b', {}, e.title)), h('span', { class: 'chk', html: U.icon('check', 16) }))));
      body.append(list, h('div', { class: 'pad', style: 'margin-top:14px' }, btn));
    };
    const check = (sup = []) => {
      const okA = picked === d.answer;
      const okS = !d.support || sup.filter(x => d.support.from.includes(x)).length >= d.support.need;
      if (okA && okS) {
        G.solve(id); SFX.play.discover(); sh.close();
        UI.modal({ title: d.q, text: d.done, buttons: [{ label: 'OK', pri: true }] });
        after && after();
      } else {
        SFX.play.error(); G.inc('dedFails');
        body.innerHTML = '';
        body.append(h('div', { class: 'ded-fail' }, h('b', {}, okA ? 'Kierunek dobry, ale to nie wystarczy.' : 'To się nie klei.'),
          h('p', { html: U.rich(okA ? d.support.fail || 'Wybierz rzeczy, które bezpośrednio na to wskazują.' : d.fail || 'Przejrzyj jeszcze raz to, co masz zapisane.') }),
          h('button', { class: 'btn wide', onclick: () => { picked = null; step1(); } }, 'Jeszcze raz')));
      }
    };
    step1();
    sh = UI.sheet({ title: d.q, body });
  }

  /* ---------- wysyłka materiałów (finał) ---------- */
  const KEY = ['ev_frame23', 'ev_frame21', 'ev_frame22', 'ev_toy', 'ev_sync_wall', 'ev_sync_door', 'ev_owner', 'ev_plate', 'ev_loc_1410', 'ev_sms_kluska', 'ev_marek', 'ev_interview', 'ev_kolo', 'ev_igor_conf', 'ev_jerrycans', 'ev_cam1_car', 'ev_findphone', 'ev_gajda_hunt'];
  UI.packageSheet = () => new Promise(res => {
    const sel = new Set();
    let sent = false;
    const open = () => {
      const owned = Object.keys(G.s.ev).map(G.ev).filter(Boolean).sort((a, b) => G.s.ev[b.id].t - G.s.ev[a.id].t);
      const cnt = h('span', {}, '');
      const btn = h('button', { class: 'btn pri wide' }, 'Wyślij');
      const upd = () => { cnt.textContent = `Załączniki: ${sel.size}`; btn.disabled = sel.size < 3; };
      const list = h('div', { class: 'list' }, owned.map(e => h('button', {
        class: 'row' + (sel.has(e.id) ? ' sel' : ''), onclick: ev => { if (sel.has(e.id)) sel.delete(e.id); else sel.add(e.id); ev.currentTarget.classList.toggle('sel', sel.has(e.id)); upd(); }
      }, e.img ? h('img', { class: 'ri thumb', src: Art.url(e.img), alt: '' }) : h('span', { class: 'ri', html: U.icon(DATA.evCat[e.cat].icon, 17) }), h('div', { class: 'rm' }, h('b', {}, e.title), h('span', {}, e.source || '')), h('span', { class: 'chk', html: U.icon('check', 16) }))));
      const body = h('div', { class: 'pkg' },
        h('div', { class: 'pkg-h' },
          h('div', {}, h('small', {}, 'Do:'), ' biuro.podawcze@dzierzoniow.po.gov.pl'),
          h('div', {}, h('small', {}, 'DW:'), ' redakcja@gazetasudecka.pl'),
          h('div', {}, h('small', {}, 'Temat:'), ' Zawiadomienie: uprowadzenie Mai Wrony i śmierć Tomasza Lisa (1997)')),
        h('p', { class: 'pad pkg-t' }, 'Wybierz z Notatek to, co najmocniej łączy sprawcę z hutą w 1997 roku i z uprowadzeniem Mai. Liczy się jakość, nie ilość.'),
        list, h('div', { class: 'pad pkg-f' }, cnt, btn));
      btn.addEventListener('click', () => { sent = true; sh.close(); SFX.play.sent(); res([...sel].filter(id => KEY.includes(id)).length); });
      upd();
      const sh = UI.sheet({ title: 'Nowa wiadomość', body, onClose: () => { if (!sent) setTimeout(open, 350); } });
    };
    open();
  });

  function ownPage(n) {
    const pg = notePage(n.title, U.parseLocal(n.t));
    pg.body.appendChild(h('div', { class: 'nt-body', html: U.rich(n.body) }));
    return { el: pg.el };
  }
})();
