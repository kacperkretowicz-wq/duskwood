'use strict';
/* Nimbus: chmura z kopią zapasową telefonu Mai. */

(() => {
  const { h, $ } = U;
  const M = () => DATA.maja;
  const vis = it => G.isUnlocked(it.unlock || 'maja:base') && G.test(it.cond);
  const isNew = (key, it) => (it.unlock && it.unlock !== 'maja:base') && !G.seen('mj:' + key);
  const fmtT = iso => { const t = U.parseLocal(iso); return `${U.dateNum(t)}, ${U.time(t)}`; };
  const fmtShort = iso => { const t = U.parseLocal(iso); return `${U.dateNum(t).slice(0, 5)} ${U.time(t)}`; };
  const artDate = art => { const m = Art.get(art) || {}; const e = m.exif || {}; return e.date ? U.parseLocal(e.date.split('.').reverse().join('-') + 'T' + (e.time || '00:00')) : 0; };

  function newCounts() {
    const m = M();
    const c = { photos: 0, sms: 0, calls: 0, notes: 0, loc: 0, mail: 0, audio: 0, web: 0, find: 0 };
    m.photos.forEach(p => { if (vis(p) && isNew('ph:' + p.art, p)) c.photos++; });
    m.threads.forEach(t => t.msgs.forEach((x, i) => { if (vis(t) && vis(x) && isNew(`sms:${t.id}:${i}`, x)) c.sms++; }));
    m.calls.forEach((x, i) => { if (vis(x) && isNew('call:' + i, x)) c.calls++; });
    m.notes.forEach(x => { if (vis(x) && isNew('note:' + x.id, x)) c.notes++; });
    m.days.forEach(x => { if (vis(x) && isNew('loc:' + x.day, x)) c.loc++; });
    m.mail.forEach(x => { if (vis(x) && isNew('mail:' + x.id, x)) c.mail++; });
    m.audio.forEach(x => { if (vis(x) && isNew('au:' + x.id, x)) c.audio++; });
    if (G.isUnlocked('maja:find') && !G.seen('mj:find')) c.find = 1;
    return c;
  }
  const total = () => Object.values(newCounts()).reduce((a, b) => a + b, 0);

  UI.def('nimbus', {
    name: 'Nimbus', unlock: 'app:nimbus',
    badge: () => G.isUnlocked('nimbus:auth') ? total() : (G.isUnlocked('app:nimbus') && !G.seen('app:nimbus') ? 'dot' : 0),
    mount(host, params) {
      const stack = new UI.Stack(host);
      if (!G.isUnlocked('nimbus:auth')) stack.push(loginPage(stack));
      else {
        stack.push(devicePage(stack));
        if (params.section) openSection(stack, params.section, params);
      }
      return {
        back: () => stack.pop(),
        onParams(p) { if (p.section && G.isUnlocked('nimbus:auth')) { stack.popTo(1); openSection(stack, p.section, p); } },
        destroy: () => stack.destroy()
      };
    }
  });

  /* ---------- logowanie i odzyskiwanie hasła ---------- */
  function brand() { return h('div', { class: 'nb-brand' }, h('span', { html: UI.glyph('nimbus').replace('width="34" height="34"', 'width="44" height="44"') }), h('b', {}, 'Nimbus')); }

  function loginPage(stack) {
    const pg = UI.page({ title: '', cls: 'nb-login' });
    pg.hdr.classList.add('flat');
    const email = h('input', { class: 'field', placeholder: 'E-mail', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', value: G.s.vars.nbEmail || '' });
    const pass = h('input', { class: 'field', placeholder: 'Hasło', type: 'password' });
    const err = h('div', { class: 'nb-err' });
    const login = () => {
      err.textContent = '';
      if (!email.value.trim()) { email.classList.remove('bad'); void email.offsetWidth; email.classList.add('bad'); return; }
      if (G.s.vars.nbPass && pass.value === G.s.vars.nbPass && okEmail(email.value)) return success(stack);
      pass.classList.remove('bad'); void pass.offsetWidth; pass.classList.add('bad');
      err.textContent = 'Nieprawidłowy e-mail lub hasło.';
      SFX.play.error();
    };
    pg.body.append(h('div', { class: 'nb-wrap' }, brand(), h('p', { class: 'nb-sub' }, 'Twoje zdjęcia i kopie zapasowe. Zawsze pod ręką.'),
      email, pass, err,
      h('button', { class: 'btn pri wide nb-btn', onclick: login }, 'Zaloguj się'),
      h('button', { class: 'nb-link', onclick: () => stack.push(recoverPage(stack, email.value)) }, 'Nie pamiętasz hasła?')));
    return { el: pg.el };
  }
  const okEmail = v => ['majawronanimbuspl', 'majawrona'].includes(U.squash(v));

  function recoverPage(stack, prefill) {
    const pg = UI.page({ title: 'Odzyskiwanie konta' });
    const body = h('div', { class: 'nb-wrap' });
    pg.body.appendChild(body);
    let step = 0;
    const render = () => {
      body.innerHTML = '';
      if (step === 0) {
        const email = h('input', { class: 'field', placeholder: 'Adres e-mail konta', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', value: prefill || '' });
        const err = h('div', { class: 'nb-err' });
        const go = () => {
          if (okEmail(email.value)) { G.s.vars.nbEmail = 'maja.wrona@nimbus.pl'; step = 1; render(); }
          else { email.classList.remove('bad'); void email.offsetWidth; email.classList.add('bad'); err.textContent = 'Nie znaleziono konta o tym adresie.'; SFX.play.error(); }
        };
        email.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
        body.append(h('p', { class: 'nb-sub' }, 'Podaj adres e-mail przypisany do konta Nimbus.'), email, err, h('button', { class: 'btn pri wide nb-btn', onclick: go }, 'Dalej'));
      } else if (step === 1) {
        const qs = DATA.maja.security;
        const inputs = qs.map(q => h('input', { class: 'field', placeholder: 'Odpowiedź', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' }));
        const err = h('div', { class: 'nb-err' });
        const go = () => {
          let ok = true;
          qs.forEach((q, i) => {
            const good = q.a.some(a => U.squash(a) === U.squash(inputs[i].value));
            inputs[i].classList.toggle('ok', good);
            if (!good) { ok = false; inputs[i].classList.remove('bad'); void inputs[i].offsetWidth; inputs[i].classList.add('bad'); }
          });
          if (ok) { step = 2; render(); }
          else { G.inc('nbFails'); err.textContent = 'Co najmniej jedna odpowiedź jest nieprawidłowa.'; SFX.play.error(); BUS.emit('nbFail'); }
        };
        U.put(body, h('div', { class: 'nb-acc' }, U.ico('user', 18), 'maja.wrona@nimbus.pl'),
          h('p', { class: 'nb-sub' }, 'Odpowiedz na pytania bezpieczeństwa ustawione przez właściciela konta.'),
          ...qs.map((q, i) => [h('label', { class: 'lbl' }, q.q), inputs[i]]), err,
          h('button', { class: 'btn pri wide nb-btn', onclick: go }, 'Sprawdź odpowiedzi'));
      } else if (step === 2) {
        const p1 = h('input', { class: 'field', placeholder: 'Nowe hasło (min. 4 znaki)', type: 'password' });
        const err = h('div', { class: 'nb-err' });
        const go = () => {
          if (p1.value.length < 4) { err.textContent = 'Hasło jest za krótkie.'; SFX.play.error(); return; }
          G.s.vars.nbPass = p1.value;
          success(stack);
        };
        p1.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
        body.append(h('div', { class: 'nb-ok', html: U.icon('check', 30) }), h('p', { class: 'nb-sub' }, 'Tożsamość potwierdzona. Ustaw nowe hasło do konta.'), p1, err, h('button', { class: 'btn pri wide nb-btn', onclick: go }, 'Zapisz i zaloguj'));
      }
    };
    render();
    return { el: pg.el };
  }

  function success(stack) {
    SFX.play.unlock();
    G.unlock('maja:base');
    G.unlock('nimbus:auth');
    G.solve('nimbus');
    stack.destroy();
    stack.host.innerHTML = '';
    stack.pages = [];
    stack.push(devicePage(stack));
    UI.toast('Zalogowano: maja.wrona@nimbus.pl', { kind: 'app', icon: 'cloud' });
  }

  /* ---------- urządzenie ---------- */
  const SECTIONS = [
    { id: 'photos', name: 'Galeria', icon: 'image', count: () => M().photos.filter(vis).length },
    { id: 'sms', name: 'Wiadomości', icon: 'chat', count: () => M().threads.filter(vis).length },
    { id: 'calls', name: 'Połączenia', icon: 'phone', count: () => M().calls.filter(vis).length },
    { id: 'notes', name: 'Notatki', icon: 'note', count: () => M().notes.filter(vis).length },
    { id: 'loc', name: 'Lokalizacja', icon: 'pin', count: () => M().days.filter(vis).length },
    { id: 'mail', name: 'Poczta', icon: 'mail', count: () => M().mail.filter(vis).length },
    { id: 'audio', name: 'Dyktafon', icon: 'mic', count: () => M().audio.filter(vis).length },
    { id: 'web', name: 'Internet', icon: 'globe', count: () => M().web.filter(vis).length },
    { id: 'wallpapers', name: 'Tapety', icon: 'image', count: () => 2, cond: () => G.isUnlocked('maja:base') },
    { id: 'find', name: 'Znajdź urządzenie', icon: 'target', count: () => 0, cond: () => G.isUnlocked('maja:find') }
  ];

  function devicePage(stack) {
    const pg = UI.page({ title: 'Nimbus', big: true, cls: 'nb' });
    let sig = '';
    const render = () => {
      const c = newCounts();
      // Odświeżaj tylko przy faktycznej zmianie — inaczej klik trafia w podmieniany kafelek.
      const nsig = JSON.stringify([c, SECTIONS.map(s => (!s.cond || s.cond()) && s.count()), G.flag('majaOnline'), G.isUnlocked('maja:sync1')]);
      if (nsig === sig) return;
      sig = nsig;
      pg.body.innerHTML = '';
      const bk = G.isUnlocked('maja:sync1') ? '2026-10-24T03:07' : '2026-10-14T23:58';
      pg.body.append(
        h('div', { class: 'nb-dev' },
          h('div', { class: 'nb-dev-ic', html: U.icon('phone', 26) }),
          h('div', {}, h('b', {}, 'Telefon Mai'), h('span', {}, 'Tellio A54 · ' + DATA.chars.maja.number)),
          h('div', { class: 'nb-dev-st' }, h('span', { class: 'dot ' + (G.flag('majaOnline') ? 'on' : '') }), G.flag('majaOnline') ? 'online' : 'offline')),
        h('div', { class: 'nb-bk' }, U.ico('cloud', 16), `Ostatnia kopia: ${fmtT(bk)}`),
        h('div', { class: 'nb-bar' }, h('i', { style: 'width:63%' })),
        h('div', { class: 'nb-bar-l' }, h('span', {}, '40,3 GB z 64 GB'), h('span', {}, 'Kopia automatyczna: Wi-Fi i dane')),
        h('div', { class: 'nb-grid' }, SECTIONS.filter(s => !s.cond || s.cond()).map(s => h('button', { class: 'nb-tile', onclick: () => openSection(stack, s.id) },
          h('span', { class: 'nb-ti', html: U.icon(s.icon, 22) }),
          h('b', {}, s.name), h('small', {}, s.id === 'find' ? 'ostatnia pozycja' : `${s.count()} ${s.id === 'photos' ? 'plików' : 'pozycji'}`),
          c[s.id] ? h('span', { class: 'badge' }, c[s.id]) : null))));
    };
    render();
    const offs = [BUS.on('unlock', render), BUS.on('badges', render)];
    return { el: pg.el, onShow: render, destroy: () => offs.forEach(f => f()) };
  }

  function openSection(stack, id, params = {}) {
    if (id === 'wallpapers') { UI.openWallpaperBackup(); return; }
    const fn = { photos: albumsPage, sms: threadsPage, calls: callsPage, notes: notesPage, loc: daysPage, mail: mailPage, audio: audioPage, web: webPage, find: findPage }[id];
    if (fn) stack.push(fn(stack, params));
  }

  /* ---------- galeria ---------- */
  function albumsPage(stack, params) {
    const pg = UI.page({ title: 'Galeria Mai' });
    const render = () => {
      pg.body.innerHTML = '';
      const list = h('div', { class: 'nb-albums' });
      M().albums.forEach(a => {
        const items = M().photos.filter(p => p.album === a.id && vis(p)).sort((x, y) => artDate(y.art) - artDate(x.art));
        if (!items.length) return;
        const nw = items.filter(p => isNew('ph:' + p.art, p)).length;
        list.appendChild(h('button', { class: 'nb-alb', onclick: () => stack.push(albumPage(stack, a)) },
          h('span', { class: 'cov' + (a.neg ? ' neg' : '') }, h('img', { src: Art.url(items[0].art), alt: '' }), nw ? h('span', { class: 'badge' }, nw) : null),
          h('b', {}, a.name), h('small', {}, `${items.length}`)));
      });
      pg.body.appendChild(list);
    };
    render();
    if (params.album) { const a = M().albums.find(x => x.id === params.album); if (a) setTimeout(() => stack.push(albumPage(stack, a)), 50); }
    return { el: pg.el, onShow: render };
  }
  function albumPage(stack, a) {
    const pg = UI.page({ title: a.name, sub: a.sub || '' });
    const render = () => {
      pg.body.innerHTML = '';
      const items = M().photos.filter(p => p.album === a.id && vis(p)).sort((x, y) => artDate(y.art) - artDate(x.art));
      const arts = items.map(p => p.art);
      if (a.note) pg.body.appendChild(h('p', { class: 'pad nb-note-s', html: U.rich(a.note) }));
      pg.body.appendChild(UI.photoGrid(arts, a.name, { neg: () => !!a.neg, isNew: art => { const p = items.find(x => x.art === art); return p && isNew('ph:' + art, p); } }));
      items.forEach(p => G.markSeen('mj:ph:' + p.art));
    };
    render();
    const off = BUS.on('unlock', render);
    return { el: pg.el, destroy: off };
  }

  /* ---------- wiadomości ---------- */
  function threadsPage(stack) {
    const pg = UI.page({ title: 'Wiadomości Mai' });
    const render = () => {
      pg.body.innerHTML = '';
      const list = h('div', { class: 'list', style: 'margin-top:8px' });
      M().threads.filter(vis).map(t => ({ t, msgs: t.msgs.filter(vis) })).filter(x => x.msgs.length)
        .sort((a, b) => U.parseLocal(b.msgs[b.msgs.length - 1].t) - U.parseLocal(a.msgs[a.msgs.length - 1].t))
        .forEach(({ t, msgs }) => {
          const last = msgs[msgs.length - 1];
          const nw = t.msgs.some((x, i) => vis(x) && isNew(`sms:${t.id}:${i}`, x));
          list.appendChild(h('button', { class: 'row', onclick: () => stack.push(threadPage(stack, t)) },
            UI.avatar(t.who || 'unknown', 'sm'),
            h('div', { class: 'rm' }, h('b', {}, t.name), h('span', {}, (last.me ? 'Ty: ' : '') + U.tpl(last.text).replace(/\n/g, ' '))),
            h('span', { class: 'rx' }, fmtShort(last.t)), nw ? h('span', { class: 'new-dot' }) : null));
        });
      pg.body.appendChild(list);
    };
    render();
    return { el: pg.el, onShow: render };
  }
  function threadPage(stack, t) {
    const pg = UI.page({ title: t.name, sub: t.number || '' });
    const box = h('div', { class: 'msgs sms' });
    pg.body.appendChild(box);
    let prev = null;
    t.msgs.forEach((m, i) => {
      if (!vis(m)) return;
      const tt = U.parseLocal(m.t);
      if (!prev || !U.sameDay(prev, tt) || tt - prev > 3 * 3600e3) box.appendChild(h('div', { class: 'sep' }, `${U.dayShort(tt)} · ${U.time(tt)}`));
      prev = tt;
      const b = h('div', { class: 'bub' + (m.clue ? ' clue' : '') },
        h('div', { class: 'tx', html: U.rich(m.text) }), h('span', { class: 'tm' }, U.time(tt) + (m.status ? ' · ' + m.status : '')));
      if (m.clue) b.addEventListener('click', () => { if (G.addEv(m.clue)) UI.evidenceToast(m.clue); else UI.toast('Masz to już w dowodach.', { icon: 'folder' }); });
      box.appendChild(h('div', { class: 'msg ' + (m.me ? 'me' : 'them') }, b));
      G.markSeen(`mj:sms:${t.id}:${i}`);
    });
    if (t.ev) { [].concat(t.ev).forEach(e => { if (G.addEv(e)) UI.evidenceToast(e); }); }
    pg.body.appendChild(h('p', { class: 'nb-hint' }, 'Dotknij wiadomości, która wydaje ci się ważna, aby zapisać ją w Notatkach.'));
    setTimeout(() => { pg.body.scrollTop = pg.body.scrollHeight; }, 30);
    return { el: pg.el };
  }

  /* ---------- połączenia ---------- */
  function callsPage() {
    const pg = UI.page({ title: 'Połączenia Mai' });
    const list = h('div', { class: 'list', style: 'margin-top:8px' });
    M().calls.forEach((c, i) => {
      if (!vis(c)) return;
      G.markSeen('mj:call:' + i);
      list.appendChild(h('div', { class: 'row' },
        h('span', { class: 'ri' + (c.dir === 'missed' ? ' bad' : ''), html: U.icon('phone', 16) }),
        h('div', { class: 'rm' }, h('b', { class: c.dir === 'missed' ? 'bad' : '' }, c.name),
          h('span', {}, ({ out: 'Wychodzące', in: 'Przychodzące', missed: 'Nieodebrane', noans: 'Wychodzące · bez odpowiedzi' }[c.dir]) + (c.dur ? ' · ' + c.dur : ''))),
        h('span', { class: 'rx' }, fmtShort(c.t))));
    });
    pg.body.appendChild(list);
    M().calls.forEach(c => { if (vis(c) && c.ev) { if (G.addEv(c.ev, true)) UI.evidenceToast(c.ev); } });
    return { el: pg.el };
  }

  /* ---------- notatki ---------- */
  function notesPage(stack) {
    const pg = UI.page({ title: 'Notatki Mai' });
    const render = () => {
      pg.body.innerHTML = '';
      const list = h('div', { class: 'list', style: 'margin-top:8px' });
      M().notes.filter(vis).forEach(n => {
        const locked = n.pin && !G.isUnlocked('note:' + n.id);
        list.appendChild(h('button', { class: 'row', onclick: () => locked ? pinPrompt(n, () => { render(); stack.push(notePage(n)); }) : stack.push(notePage(n)) },
          h('span', { class: 'ri', html: U.icon(locked ? 'lock' : 'note', 17) }),
          h('div', { class: 'rm' }, h('b', {}, n.title), h('span', {}, locked ? 'Notatka zablokowana' : U.tpl(n.body).split('\n')[0])),
          h('span', { class: 'rx' }, fmtShort(n.t)), isNew('note:' + n.id, n) ? h('span', { class: 'new-dot' }) : null));
      });
      pg.body.appendChild(list);
    };
    render();
    return { el: pg.el, onShow: render };
  }
  function notePage(n) {
    G.markSeen('mj:note:' + n.id);
    const pg = UI.page({ title: n.title, sub: fmtT(n.t) });
    pg.body.appendChild(h('div', { class: 'paper', html: U.rich(n.body) }));
    if (n.versions) {
      pg.body.append(h('p', { class: 'nb-hint' }, `Kopia odebrana: ${n.syncStarted ? "po zakończeniu synchronizacji rozpoczętej " + fmtT(n.syncStarted) : fmtT(n.synced)}. Historia zawiera wcześniejsze zapisy z tego urządzenia.`),
        h('div', { class: 'pad' }, h('button', { class: 'btn wide', onclick: () => {
          const body = h('div', { class: 'note-history' }, h('p', { class: 'nb-hint' }, 'Godziny zapisu pochodzą z urządzenia. Synchronizacja nie ustala, kto pisał tekst. Wersje są tylko do odczytu.'));
          n.versions.slice().reverse().forEach(v => body.append(h('article', { class: 'note-version' },
            h('h4', {}, `${v.label} · ${fmtT(v.t)}`), h('div', { class: 'paper', html: U.rich(v.body) }),
            h('button', { class: 'btn wide', onclick: e => {
              if (G.addEv(v.ev)) UI.evidenceToast(v.ev);
              e.currentTarget.textContent = 'Zapisano w Notatkach';
            } }, G.has(v.ev) ? 'Zapisano w Notatkach' : 'Zachowaj tę wersję'))));
          body.append(h('div', { class: 'pad' }, h('button', { class: 'btn pri wide', onclick: () => { sh.close(true); UI.openApp('notes', { note: 'questions', ded: n.deduction }); } }, 'Porównaj wersje w Notatkach')));
          G.unlock('ded:' + n.deduction);
          const sh = UI.sheet({ title: 'Historia wersji', body });
        } }, 'Historia wersji')));
    }
    if (n.ev) [].concat(n.ev).forEach(e => { if (G.addEv(e)) UI.evidenceToast(e); });
    G.change();
    return { el: pg.el };
  }
  function pinPrompt(n, onOk) {
    let code = '';
    const dots = h('div', { class: 'pin-dots' });
    const msg = h('div', { class: 'pin-msg' }, n.hint ? U.tpl(n.hint) : 'Wpisz PIN');
    const upd = () => { dots.innerHTML = ''; for (let i = 0; i < n.pin.length; i++) dots.appendChild(h('i', { class: i < code.length ? 'on' : '' })); };
    const press = d => {
      if (code.length >= n.pin.length) return;
      code += d; SFX.play.key(); upd();
      if (code.length === n.pin.length) setTimeout(() => {
        if (code === n.pin) { SFX.play.unlock(); G.unlock('note:' + n.id); sh.close(); onOk(); }
        else { SFX.play.error(); dots.classList.remove('bad'); void dots.offsetWidth; dots.classList.add('bad'); code = ''; upd(); G.inc('pinFails'); }
      }, 180);
    };
    const pad = h('div', { class: 'kp small' }, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map(d => d === '' ? h('span') : h('button', { class: 'kp-k', onclick: () => d === '⌫' ? (code = code.slice(0, -1), upd()) : press(d) }, h('b', {}, d))));
    const sh = UI.sheet({ title: n.title, body: h('div', { class: 'pin' }, h('div', { class: 'pin-ic', html: U.icon('lock', 28) }), msg, dots, pad) });
    upd();
  }

  /* ---------- lokalizacja ---------- */
  function daysPage(stack, params) {
    const pg = UI.page({ title: 'Historia lokalizacji' });
    const list = h('div', { class: 'list', style: 'margin-top:8px' });
    M().days.filter(vis).slice().reverse().forEach(d => {
      const t = U.parseLocal(d.day + 'T12:00');
      list.appendChild(h('button', { class: 'row', onclick: () => stack.push(dayPage(d)) },
        h('span', { class: 'ri', html: U.icon('pin', 17) }),
        h('div', { class: 'rm' }, h('b', {}, U.dayLong(t)), h('span', {}, d.items.map(i => DATA.map.places[i.place] ? DATA.map.places[i.place].name : i.place).filter((v, i, a) => a.indexOf(v) === i).join(' · '))),
        isNew('loc:' + d.day, d) ? h('span', { class: 'new-dot' }) : h('span', { class: 'chev', html: U.icon('back', 16, 'flip') })));
    });
    pg.body.appendChild(list);
    if (params.day) { const d = M().days.find(x => x.day === params.day); if (d) setTimeout(() => stack.push(dayPage(d)), 50); }
    return { el: pg.el };
  }
  function dayPage(d) {
    G.markSeen('mj:loc:' + d.day);
    const t = U.parseLocal(d.day + 'T12:00');
    const pg = UI.page({ title: U.dayLong(t), sub: 'Oś czasu' });
    const tl = h('div', { class: 'loc-tl' });
    d.items.forEach(i => {
      const p = DATA.map.places[i.place] || { name: i.place };
      tl.appendChild(h('div', { class: 'loc-i' + (i.last ? ' last' : '') + (i.move ? ' move' : '') },
        h('div', { class: 'loc-t' }, i.from, i.to ? h('small', {}, i.to) : null),
        h('div', { class: 'loc-dot' }),
        h('div', { class: 'loc-b' }, h('b', {}, i.move ? i.text : p.name), h('span', { html: U.rich(i.move ? (i.sub || '') : (i.text || p.addr || '')) }))));
    });
    U.put(pg.body, tl, d.route ? h('div', { class: 'pad' }, h('button', { class: 'btn wide', onclick: () => UI.openApp('maps', { route: d.route, focus: d.focus }) }, U.ico('pin', 18), 'Pokaż na mapie')) : null);
    if (d.ev) [].concat(d.ev).forEach(e => { if (G.addEv(e)) UI.evidenceToast(e); });
    if (d.route) G.unlock('route:' + d.route);
    G.change();
    return { el: pg.el };
  }

  /* ---------- poczta ---------- */
  function mailPage(stack) {
    const pg = UI.page({ title: 'Poczta Mai', sub: 'maja.wrona@nimbus.pl' });
    const render = () => {
      pg.body.innerHTML = '';
      const list = h('div', { class: 'list', style: 'margin-top:8px' });
      M().mail.filter(vis).slice().sort((a, b) => U.parseLocal(b.t) - U.parseLocal(a.t)).forEach(m => {
        list.appendChild(h('button', { class: 'row mailrow' + (G.seen('mj:mail:' + m.id) ? '' : ' unread'), onclick: () => stack.push(mailView(m)) },
          h('div', { class: 'rm' }, h('b', {}, m.from), h('span', { class: 'subj' }, m.subject), h('span', {}, U.tpl(m.body).replace(/\n/g, ' ').slice(0, 80))),
          h('span', { class: 'rx' }, fmtShort(m.t))));
      });
      pg.body.appendChild(list);
    };
    render();
    return { el: pg.el, onShow: render };
  }
  function mailView(m) {
    G.markSeen('mj:mail:' + m.id);
    const pg = UI.page({ title: m.subject });
    pg.body.appendChild(h('div', { class: 'mail' },
      h('div', { class: 'mail-h' }, UI.avatar(m.av || 'unknown', 'sm'), h('div', {}, h('b', {}, m.from), h('span', {}, m.addr || '')), h('small', {}, fmtT(m.t))),
      h('div', { class: 'mail-b', html: U.rich(m.body) }),
      m.img ? h('img', { class: 'mail-img', src: Art.url(m.img), onclick: () => UI.viewImage(m.img) }) : null));
    if (m.ev) [].concat(m.ev).forEach(e => { if (G.addEv(e)) UI.evidenceToast(e); });
    G.change();
    return { el: pg.el };
  }

  /* ---------- dyktafon ---------- */
  function audioPage(stack) {
    const pg = UI.page({ title: 'Dyktafon Mai' });
    const render = () => {
      pg.body.innerHTML = '';
      const list = h('div', { class: 'list', style: 'margin-top:8px' });
      M().audio.filter(vis).forEach(a => list.appendChild(h('button', { class: 'row', onclick: () => stack.push(playerPage(stack, a)) },
        h('span', { class: 'ri', html: U.icon('mic', 17) }),
        h('div', { class: 'rm' }, h('b', {}, a.title), h('span', {}, `${fmtShort(a.t)} · ${a.dur}`)),
        isNew('au:' + a.id, a) ? h('span', { class: 'new-dot' }) : h('span', { class: 'chev', html: U.icon('play', 16) }))));
      pg.body.appendChild(list);
    };
    render();
    return { el: pg.el, onShow: render };
  }
  function playerPage(stack, a) {
    G.markSeen('mj:au:' + a.id);
    const pg = UI.page({ title: a.title, sub: fmtT(a.t) });
    const cv = h('canvas', { class: 'wave', width: 340, height: 70 });
    const tr = h('div', { class: 'transcript' });
    const btn = h('button', { class: 'play-btn', 'aria-label': 'Odtwórz', html: U.icon('play', 26) });
    const time = h('span', { class: 'au-time' }, `0:00 / ${a.dur}`);
    const toolBtn = h('div', {});
    pg.body.append(h('div', { class: 'au' }, cv, h('div', { class: 'au-ctl' }, btn, time)), toolBtn, h('div', { class: 'sec-t' }, 'Transkrypcja automatyczna'), tr);
    const rnd = U.rng('wave:' + a.id);
    const bars = Array.from({ length: 68 }, () => 0.15 + rnd() * 0.85);
    let prog = 0, playing = false, timer = null, shown = 0;
    const clean = () => G.isUnlocked('clean:' + a.id);
    function draw() {
      const c = cv.getContext('2d');
      c.clearRect(0, 0, cv.width, cv.height);
      bars.forEach((b, i) => {
        const x = i * 5 + 2, hh = b * 56;
        const noisy = a.noisyBars && i >= a.noisyBars[0] && i <= a.noisyBars[1] && !clean();
        c.fillStyle = i / bars.length <= prog ? (noisy ? '#ec6a6a' : '#e88aa2') : (noisy ? 'rgba(236,106,106,.35)' : 'rgba(255,255,255,.22)');
        c.fillRect(x, 35 - hh / 2, 3, hh);
      });
    }
    function lineEl(l) {
      const noisy = l.noisy && !clean();
      const who = l.who ? h('b', {}, l.who + ': ') : null;
      return h('p', { class: noisy ? 'noisy' : '' }, h('span', { class: 'lt' }, l.t), who, h('span', { html: noisy ? garble(l.text, 0.72, rnd) : U.rich(l.text) }));
    }
    function renderTr(n) {
      tr.innerHTML = '';
      a.lines.slice(0, n).forEach(l => tr.appendChild(lineEl(l)));
      if (n < a.lines.length) tr.appendChild(h('p', { class: 'pending' }, '…'));
    }
    function renderTool() {
      toolBtn.innerHTML = '';
      if (!a.lines.some(l => l.noisy)) return;
      if (clean()) { toolBtn.appendChild(h('div', { class: 'au-clean' }, U.ico('check', 16), 'Nagranie oczyszczone')); return; }
      if (G.isUnlocked('tool:tuner')) toolBtn.appendChild(h('div', { class: 'pad' }, h('button', { class: 'btn pri wide', onclick: () => stack.push(tunerPage(stack, a, () => { renderTr(a.lines.length); renderTool(); draw(); })) }, U.ico('wave', 18), 'Oczyść nagranie')));
      else toolBtn.appendChild(h('div', { class: 'au-warn' }, U.ico('info', 16), 'Fragment nagrania jest zagłuszony szumem.'));
    }
    btn.addEventListener('click', () => {
      SFX.unlockAudio();
      if (playing) { playing = false; clearInterval(timer); btn.innerHTML = U.icon('play', 26); return; }
      if (prog >= 1) { prog = 0; shown = 0; }
      playing = true; btn.innerHTML = U.icon('pause', 26);
      const total = a.lines.length;
      const durSec = a.lines.reduce((s, l) => s + Math.max(2.2, l.text.length / 22), 0);
      const tuner = a.lines.some(l => l.noisy) && !clean() ? SFX.tuner() : null;
      timer = setInterval(() => {
        prog = Math.min(1, prog + 0.1 / durSec);
        const want = Math.min(total, Math.ceil(prog * total + 0.01));
        if (want !== shown) { shown = want; renderTr(shown); tr.lastElementChild && tr.lastElementChild.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
        if (tuner) { const ln = a.lines[Math.max(0, shown - 1)]; tuner.set(ln && ln.noisy ? 0.95 : 0.3, 1200); }
        const secs = Math.round(prog * parseDur(a.dur));
        time.textContent = `${U.dur(secs)} / ${a.dur}`;
        draw();
        if (prog >= 1) { playing = false; clearInterval(timer); btn.innerHTML = U.icon('play', 26); if (tuner) tuner.stop(); if (a.ev) [].concat(a.ev).forEach(e => { if (G.addEv(e)) UI.evidenceToast(e); }); G.setFlag('heard:' + a.id); }
      }, 100);
      pg._stop = () => { clearInterval(timer); if (tuner) tuner.stop(); };
    });
    draw(); renderTr(0); renderTool();
    if (G.flag('heard:' + a.id)) { prog = 1; shown = a.lines.length; renderTr(shown); draw(); time.textContent = `${a.dur} / ${a.dur}`; }
    return { el: pg.el, destroy: () => pg._stop && pg._stop() };
  }
  const parseDur = d => { const [m, s] = d.split(':').map(Number); return m * 60 + s; };
  const NOISE = '░▒▓█#%&@*~^';
  function garble(text, amount, rnd) {
    const r = rnd || Math.random;
    return U.esc(U.tpl(text)).split('').map(ch => (ch !== ' ' && r() < amount) ? `<i>${NOISE[Math.floor(r() * NOISE.length)]}</i>` : ch).join('');
  }

  /* ---------- czyszczenie nagrania ---------- */
  function tunerPage(stack, a, onDone) {
    const pg = UI.page({ title: 'Oczyszczanie nagrania', sub: a.title });
    const cfg = a.tune || { band: 1450, noise: 70 };
    const cv = h('canvas', { class: 'spec', width: 340, height: 150 });
    const band = h('input', { type: 'range', min: 200, max: 4000, step: 10, value: 600 });
    const nr = h('input', { type: 'range', min: 0, max: 100, step: 1, value: 10 });
    const bandL = h('b', {}, '600 Hz'), nrL = h('b', {}, '10%');
    const meter = h('div', { class: 'tn-meter' }, h('i'));
    const preview = h('div', { class: 'tn-prev' });
    const status = h('div', { class: 'tn-st' }, 'Szukaj pasma, w którym słychać głos. Potem zdejmij szum — ale nie za mocno, bo zniekształcisz mowę.');
    pg.body.append(h('div', { class: 'tuner' }, cv, meter,
      h('label', { class: 'tn-l' }, h('span', {}, 'Filtr pasmowy'), bandL), band,
      h('label', { class: 'tn-l' }, h('span', {}, 'Redukcja szumu'), nrL), nr,
      status, h('div', { class: 'sec-t', style: 'padding-left:0' }, 'Podgląd fragmentu'), preview));
    const noisyLines = a.lines.filter(l => l.noisy);
    const audio = SFX.tuner();
    let goodSince = 0, done = false, raf = 0, last = 0;
    const dist = () => {
      const db = Math.abs(+band.value - cfg.band) / 1400;
      const dn = Math.abs(+nr.value - cfg.noise) / 55;
      return U.clamp(Math.sqrt(db * db * 0.65 + dn * dn * 0.35) * 1.4, 0, 1);
    };
    const c = cv.getContext('2d');
    const loop = t => {
      raf = requestAnimationFrame(loop);
      const d = dist();
      bandL.textContent = band.value + ' Hz'; nrL.textContent = nr.value + '%';
      meter.firstChild.style.width = Math.round((1 - d) * 100) + '%';
      meter.classList.toggle('good', d < 0.14);
      audio.set(done ? 0 : d, +band.value);
      // widmo
      c.fillStyle = 'rgba(10,12,16,.35)'; c.fillRect(0, 0, cv.width, cv.height);
      const bx = (+band.value - 200) / 3800 * cv.width;
      for (let x = 0; x < cv.width; x += 3) {
        const voice = Math.exp(-Math.pow((x - (cfg.band - 200) / 3800 * cv.width) / 26, 2)) * (0.55 + 0.45 * Math.sin(t / 140 + x / 9));
        const noise = Math.random() * (0.25 + 0.75 * (1 - +nr.value / 100));
        const inBand = Math.exp(-Math.pow((x - bx) / 60, 2));
        const v = (noise * 0.6 + voice * inBand * (1 - d * 0.6)) * cv.height * 0.85;
        c.fillStyle = `hsla(${340 - inBand * 40},70%,${45 + inBand * 20}%,.9)`;
        c.fillRect(x, cv.height - v, 2, v);
      }
      c.fillStyle = 'rgba(255,207,133,.18)'; c.fillRect(bx - 40, 0, 80, cv.height);
      if (t - last > 140) {
        last = t;
        preview.innerHTML = noisyLines.map(l => `<p>${l.who ? `<b>${U.esc(l.who)}:</b> ` : ''}${done ? U.rich(l.text) : garble(l.text, Math.max(0, d - 0.04) * 1.05)}</p>`).join('');
      }
      if (!done) {
        if (d < 0.14) { if (!goodSince) goodSince = t; if (t - goodSince > 1300) finish(); }
        else goodSince = 0;
      }
    };
    function finish() {
      done = true;
      G.unlock('clean:' + a.id);
      SFX.play.discover();
      status.textContent = 'Głos wyraźny. Fragment odtworzony.';
      status.classList.add('ok');
      band.disabled = true; nr.disabled = true;
      if (a.cleanEv) [].concat(a.cleanEv).forEach(e => { if (G.addEv(e)) UI.evidenceToast(e); });
      onDone && onDone();
      G.change();
    }
    raf = requestAnimationFrame(loop);
    return { el: pg.el, destroy: () => { cancelAnimationFrame(raf); audio.stop(); } };
  }

  /* ---------- historia przeglądarki ---------- */
  function webPage() {
    const pg = UI.page({ title: 'Historia przeglądania' });
    const list = h('div', { class: 'list', style: 'margin-top:8px' });
    M().web.filter(vis).slice().reverse().forEach(w => list.appendChild(h('button', { class: 'row', onclick: () => w.page ? UI.openWeb(w.page) : UI.openApp('browser', { q: w.q }) },
      h('span', { class: 'ri', html: U.icon(w.q ? 'search' : 'globe', 17) }),
      h('div', { class: 'rm' }, h('b', {}, w.q ? `„${w.q}”` : w.title), h('span', {}, w.q ? 'Wyszukiwanie' : (DATA.web[w.page] || {}).url || '')),
      h('span', { class: 'rx' }, fmtShort(w.t)))));
    pg.body.appendChild(list);
    return { el: pg.el };
  }

  /* ---------- znajdź urządzenie ---------- */
  function findPage() {
    G.markSeen('mj:find');
    const pg = UI.page({ title: 'Znajdź urządzenie' });
    pg.body.append(h('div', { class: 'find' },
      h('div', { class: 'find-map' }, h('img', { src: Art.url('find_snip'), alt: '' }), h('span', { class: 'find-ring' })),
      h('div', { class: 'find-c' },
        h('b', {}, 'Telefon Mai'),
        h('span', {}, 'Ostatnio online: 24.10.2026, 03:07'),
        h('span', {}, 'Dokładność: ±800 m · źródło: stacje bazowe'),
        h('span', { class: 'find-off' }, 'Urządzenie jest offline')),
      h('div', { class: 'find-btns' },
        h('button', { class: 'btn', onclick: () => { SFX.play.error(); UI.toast('Nie można połączyć z urządzeniem.', { icon: 'info' }); } }, 'Odtwórz dźwięk'),
        h('button', { class: 'btn pri', onclick: () => UI.openApp('maps', { circle: true }) }, 'Pokaż na mapie'))));
    if (G.addEv('ev_findphone')) UI.evidenceToast('ev_findphone');
    G.unlock('map:circle');
    return { el: pg.el };
  }

  UI.nimbusNew = total;
})();
