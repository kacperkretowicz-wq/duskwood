'use strict';
/* Telefon: ostatnie, kontakty, klawiatura. Część numerów obsługuje skrypt fabuły. */

(() => {
  const { h, $ } = U;
  const digits = s => String(s || '').replace(/\D/g, '').replace(/^0048|^48(?=\d{9}$)/, '');
  const fmtNum = n => { const d = digits(n); return d.length === 9 ? `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` : d; };

  function whoByNumber(num) {
    const d = digits(num);
    for (const id in DATA.chars) if (DATA.chars[id].number && digits(DATA.chars[id].number) === d) return id;
    const c = DATA.contacts.find(x => digits(x.number) === d);
    return c ? c.who || null : null;
  }
  function nameFor(entry) {
    if (entry.who && DATA.chars[entry.who]) {
      if (entry.who === 'maja' && !G.flag('knowMaja')) return '+48 ' + fmtNum(DATA.chars.maja.number);
      return DATA.chars[entry.who].name;
    }
    const c = entry.number && DATA.contacts.find(x => digits(x.number) === digits(entry.number));
    if (c) return c.name;
    if (!entry.number) return entry.label || 'Nieznany numer';
    return '+48 ' + fmtNum(entry.number);
  }

  UI.def('phone', {
    name: 'Telefon',
    badge: () => G.s.calls.filter(c => c.dir === 'missed' && !c.seen).length,
    mount(host, params) {
      const stack = new UI.Stack(host);
      let tab = params.tab || 'recent';
      const pg = UI.page({ title: 'Telefon', big: true });
      const seg = h('nav', { class: 'phone-tabs', 'aria-label': 'Telefon — zakładki' });
      const content = h('div', { class: 'ph-content' });
      pg.body.append(content);
      pg.el.append(seg);
      function render() {
        seg.innerHTML = '';
        pg.setTitle({ recent: 'Ostatnie', contacts: 'Kontakty', keypad: 'Klawiatura' }[tab]);
        [['recent', 'Ostatnie', 'clock'], ['contacts', 'Kontakty', 'user'], ['keypad', 'Klawiatura', 'keypad']].forEach(([k, l, icon]) => seg.appendChild(h('button', { class: tab === k ? 'on' : '', 'aria-current': tab === k ? 'page' : null, onclick: () => { tab = k; render(); } }, U.ico(icon, 23), h('span', {}, l))));
        content.innerHTML = '';
        if (tab === 'recent') recent(); else if (tab === 'contacts') contacts(); else keypad();
      }
      function recent() {
        G.s.calls.forEach(c => { c.seen = true; });
        BUS.emit('badges');
        if (!G.flag('sawCalls')) setTimeout(() => G.setFlag('sawCalls'), 0);
        if (!G.s.calls.length) { content.appendChild(h('div', { class: 'empty' }, 'Brak połączeń')); return; }
        const list = h('div', { class: 'list', style: 'margin-top:14px' });
        G.s.calls.forEach(c => {
          const icon = c.dir === 'out' ? 'phone' : c.dir === 'missed' ? 'phone' : 'phone';
          list.appendChild(h('button', { class: 'row', onclick: () => detail(c) },
            h('span', { class: 'ri' + (c.dir === 'missed' ? ' bad' : ''), html: U.icon(icon, 17) }),
            h('div', { class: 'rm' }, h('b', { class: c.dir === 'missed' ? 'bad' : '' }, nameFor(c)),
              h('span', {}, { out: 'Wychodzące', in: 'Przychodzące', missed: 'Nieodebrane', declined: 'Odrzucone' }[c.dir] + (c.dur ? ` · ${U.dur(c.dur)}` : ''))),
            h('span', { class: 'rx' }, U.sameDay(c.t, G.now()) ? U.time(c.t) : U.dateNum(c.t).slice(0, 5) + ', ' + U.time(c.t))));
        });
        content.appendChild(list);
      }
      function stampDay(t) { return U.dateNum(t).slice(0, 5).replace(/^0/, ''); }
      // Zanim gracz pozna Maję, telefon sam zestawia nieodebrane z SMS-em. Bez nazwiska i bez „zaginiona”.
      function majaTrace(entry) {
        if (!entry || entry.who !== 'maja' || G.flag('knowMaja')) return '';
        const calls = G.s.calls.filter(c => c.who === 'maja' && c.dir === 'missed').sort((a, b) => a.t - b.t);
        if (!calls.length) return '';
        const sms = ((G.s.chats.maja || {}).msgs || []).find(m => m.from === 'maja' && m.text);
        const times = calls.map(c => `${stampDay(c.t)} · ${U.time(c.t)}`).join(' i ');
        const smsBit = sms ? ` W Wiadomościach jest od tego numeru SMS z ${stampDay(sms.t)}, ${U.time(sms.t)}.` : '';
        return `Ten numer dzwonił ${calls.length === 1 ? 'raz' : calls.length + ' razy'}: ${times}.${smsBit}`;
      }
      function detail(c) {
        const face = c.who === 'maja' && !G.flag('knowMaja') ? 'unknown' : (c.who || 'unknown');
        const trace = majaTrace(c);
        const body = h('div', {},
          h('div', { style: 'display:flex;flex-direction:column;align-items:center;gap:10px;padding:6px 0 18px' },
            UI.avatar(face, 'lg'), h('b', { style: 'font-size:20px' }, nameFor(c)),
            h('span', { style: 'color:var(--tx3);font-size:13px' }, `${U.dateNum(c.t)}, ${U.time(c.t)}${c.dur ? ' · ' + U.dur(c.dur) : ''}`)),
          trace ? h('p', { style: 'color:var(--tx2);font-size:14px;line-height:1.45;margin:0 4px 8px' }, trace) : null,
          c.lines && c.lines.length ? h('div', { class: 'transcript' }, h('div', { class: 'sec-t' }, 'Zapis rozmowy'), c.lines.map(l => h('p', { html: `<b>${l.from === 'me' ? 'Ty' : U.esc((DATA.chars[l.from] || {}).short || l.from)}:</b> ${U.rich(l.text || '')}` }))) : null,
          h('div', { class: 'pad', style: 'margin-top:14px' }, h('button', { class: 'btn pri wide', onclick: () => { sh.close(); call(c.number || (DATA.chars[c.who] || {}).number); } }, U.ico('phone', 18), 'Zadzwoń')));
        const sh = UI.sheet({ title: 'Połączenie', body });
      }
      function contacts() {
        const list = h('div', { class: 'list', style: 'margin-top:14px' });
        const cs = DATA.contacts.filter(c => G.test(c.cond));
        cs.forEach(c => list.appendChild(h('button', { class: 'row', onclick: () => call(c.number) },
          UI.avatar(c.who || 'unknown', 'sm'),
          h('div', { class: 'rm' }, h('b', {}, c.name), h('span', {}, fmtNum(c.number))),
          h('span', { class: 'chev', html: U.icon('phone', 18) }))));
        content.appendChild(cs.length ? list : h('div', { class: 'empty' }, 'Brak kontaktów'));
      }
      function keypad() {
        let num = '';
        const disp = h('div', { class: 'kp-num' }, '');
        const nameEl = h('div', { class: 'kp-name' }, '');
        const upd = () => { disp.textContent = fmtNum(num) || num; const w = num.length >= 3 ? whoByNumber(num) : null; nameEl.textContent = w ? nameFor({ who: w, number: num }) : (DATA.contacts.find(x => digits(x.number) === digits(num)) || {}).name || ''; };
        const keys = [['1', ''], ['2', 'ABC'], ['3', 'DEF'], ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'], ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'], ['*', ''], ['0', '+'], ['#', '']];
        const grid = h('div', { class: 'kp' }, keys.map(([d, l]) => h('button', { class: 'kp-k', onclick: () => { if (num.length < 15) { num += d; SFX.play.key(); upd(); } } }, h('b', {}, d), h('small', {}, l))));
        const del = h('button', { class: 'kp-del', onclick: () => { num = num.slice(0, -1); upd(); }, html: U.icon('back', 22) });
        content.append(h('div', { class: 'kp-wrap' }, disp, nameEl, grid,
          h('div', { class: 'kp-act' }, h('span'), h('button', { class: 'kp-call', 'aria-label': 'Zadzwoń', onclick: () => { if (num) call(num); }, html: U.icon('phone', 28) }), del)));
      }
      stack.push({ el: pg.el });
      render();
      return { back: () => stack.pop(), destroy: () => stack.destroy(), onParams: p => { if (p.tab) { tab = p.tab; render(); } } };
    }
  });

  /* ---------- wykonywanie połączeń ---------- */
  function call(number) {
    const d = digits(number);
    if (!d) return;
    const p = Engine.pending();
    if (p && p.type === 'dial' && p.numbers.some(n => digits(n) === d)) {
      Engine.answer(p.numbers.find(n => digits(n) === d));
      return;
    }
    if (d === '112' || d === '997' || d === '999' || d === '998') {
      UI.modal({ title: 'To tylko gra', text: 'W prawdziwym niebezpieczeństwie dzwoń na *112* ze swojego telefonu. W grze ten numer zadziała, gdy historia będzie tego potrzebować.' });
      return;
    }
    const who = whoByNumber(d);
    const ch = who && DATA.chars[who];
    const lines = who === 'maja' || (ch && ch.offline)
      ? ['Abonent jest czasowo niedostępny. Prosimy zadzwonić później.']
      : ch ? [U.tpl(ch.voicemail || `${ch.name} nie odbiera.`)]
        : (DATA.contacts.find(x => digits(x.number) === d) || {}).auto ? [(DATA.contacts.find(x => digits(x.number) === d)).auto]
          : ['Wybrany numer nie istnieje. Sprawdź numer i spróbuj ponownie.'];
    fakeCall(who, d, lines);
  }

  function fakeCall(who, number, lines) {
    UI.closeOverlays();
    const name = who ? nameFor({ who, number }) : '+48 ' + fmtNum(number);
    const st = h('div', { class: 'c-s' }, 'Łączenie…');
    const cap = h('div', { class: 'c-cap' });
    const el = h('div', { class: 'call active' },
      h('div', { class: 'c-av' }, UI.avatar(who || 'unknown', 'lg')),
      h('h2', { style: 'font-size:24px;margin-top:16px' }, name), st, cap,
      h('div', { class: 'c-btns' }, h('button', { class: 'c-btn dec', 'aria-label': 'Rozłącz', onclick: () => end(), html: U.icon('hang', 32) })));
    UI.screen.appendChild(el);
    const started = Date.now();
    let ended = false;
    SFX.ringStart('out');
    const t1 = setTimeout(() => {
      SFX.ringStop();
      st.textContent = '0:00';
      lines.forEach((l, i) => setTimeout(() => { if (!ended) { cap.appendChild(h('div', { class: 'cl' }, l)); SFX.play.beep(); } }, 300 + i * 1800));
      setTimeout(() => end(), 1800 * lines.length + 2200);
    }, 2400);
    function end() {
      if (ended) return; ended = true;
      clearTimeout(t1); SFX.ringStop(); SFX.play.hangup();
      G.s.calls.unshift({ who, number, dir: 'out', t: G.now(), dur: Math.round((Date.now() - started) / 1000), seen: true });
      G.change();
      el.classList.add('out'); setTimeout(() => el.remove(), 450);
    }
  }

  UI.phoneCall = call;
  UI.fmtNum = fmtNum;
})();
