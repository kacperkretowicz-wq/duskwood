'use strict';
/* Ciemnia (edytor zdjęć), BushView (panel fotopułapek), Pogoda, Ustawienia. */

(() => {
  const { h, $ } = U;

  /* ================= CIEMNIA ================= */
  function editable() {
    const fromMaja = DATA.maja.photos.filter(p => G.isUnlocked(p.unlock || 'maja:base') && G.isUnlocked('nimbus:auth')).map(p => p.art);
    const got = (G.s.saved || []).map(s => s.art);
    return [...new Set([...fromMaja, ...got])].filter(a => { const m = Art.get(a); return m && m.edit; });
  }
  UI.def('ciemnia', {
    name: 'Ciemnia', unlock: 'app:ciemnia',
    badge: () => editable().filter(a => !G.isUnlocked('dev:' + a) && !G.seen('ed:' + a)).length ? 'dot' : 0,
    mount(host, params) {
      const stack = new UI.Stack(host);
      stack.push(listPage(stack));
      if (params.art) stack.push(editorPage(params.art));
      return { back: () => stack.pop(), destroy: () => stack.destroy(), onParams: p => { if (p.art) { stack.popTo(1); stack.push(editorPage(p.art)); } } };
    }
  });
  function listPage(stack) {
    const pg = UI.page({ title: 'Ciemnia', big: true, cls: 'cm' });
    const render = () => {
      pg.body.innerHTML = '';
      pg.body.appendChild(h('p', { class: 'pad cm-intro' }, 'Cyfrowa ciemnia: odwracanie negatywów, korekta ekspozycji i kontrastu. Wybierz zdjęcie do obróbki.'));
      const items = editable();
      if (!items.length) { pg.body.appendChild(h('div', { class: 'empty' }, 'Brak zdjęć do obróbki.')); return; }
      const grid = h('div', { class: 'pgrid' });
      items.forEach(a => {
        const m = Art.get(a);
        const done = G.isUnlocked('dev:' + a);
        grid.appendChild(h('button', { class: 'pth' + (m.edit.neg && !done ? ' neg' : '') + (done ? ' done' : ''), onclick: () => stack.push(editorPage(a)) },
          h('img', { src: Art.url(done && m.edit.result ? m.edit.result : a), alt: '' }), done ? h('span', { class: 'pv-ic ok', html: U.icon('check', 14) }) : null));
      });
      pg.body.appendChild(grid);
    };
    render();
    return { el: pg.el, onShow: render };
  }
  function editorPage(art) {
    const m = Art.get(art);
    const e = m.edit;
    G.markSeen('ed:' + art);
    const pg = UI.page({ title: m.title || 'Kadr', sub: e.neg ? 'Negatyw · klisza 400 ASA' : 'Obróbka zdjęcia', cls: 'cm-ed' });
    const done = () => G.isUnlocked('dev:' + art);
    let inv = !e.neg, exp = 1, con = 1;
    const img = h('img', { src: Art.url(art), alt: '' });
    const res = h('img', { class: 'cm-res', src: Art.url(e.result || art), alt: '' });
    const prev = h('div', { class: 'cm-prev' }, img, res);
    const fb = h('div', { class: 'cm-fb' });
    const invBtn = h('button', { class: 'cm-tg', onclick: () => { inv = !inv; SFX.play.tap(); upd(); } });
    const expR = h('input', { type: 'range', min: 0.4, max: 4, step: 0.05, value: 1 });
    const conR = h('input', { type: 'range', min: 0.5, max: 2.4, step: 0.05, value: 1 });
    const expL = h('b', {}), conL = h('b', {});
    expR.addEventListener('input', () => { exp = +expR.value; upd(); });
    conR.addEventListener('input', () => { con = +conR.value; upd(); });
    const ctl = h('div', { class: 'cm-ctl' },
      e.neg ? h('div', { class: 'cm-row' }, h('span', {}, 'Odwrócenie negatywu'), invBtn) : null,
      h('label', { class: 'tn-l' }, h('span', {}, U.ico('sun', 15), 'Ekspozycja'), expL), expR,
      h('label', { class: 'tn-l' }, h('span', {}, U.ico('contrast', 15), 'Kontrast'), conL), conR,
      fb);
    pg.body.append(prev, ctl);
    const inR = (v, r) => v >= r[0] && v <= r[1];
    function upd() {
      invBtn.className = 'cm-tg' + (inv ? ' on' : '');
      invBtn.textContent = inv ? 'Pozytyw' : 'Negatyw';
      expL.textContent = (exp >= 1 ? '+' : '') + (Math.log2(exp)).toFixed(1) + ' EV';
      conL.textContent = Math.round(con * 100) + '%';
      img.style.filter = (!inv ? 'invert(1) sepia(.75) saturate(2.6) hue-rotate(-20deg) ' : '') + `brightness(${exp}) contrast(${con})`;
      if (done()) return;
      const t = e.target;
      let msg = '', ok = false;
      if (e.neg && !inv) msg = 'To negatyw: kolory i jasności są odwrócone. Zacznij od odwrócenia.';
      else if (exp < t.exp[0]) msg = e.darkMsg || 'Kadr jest niedoświetlony. Rozjaśnij go.';
      else if (exp > t.exp[1]) msg = 'Za jasno — szczegóły giną w bieli.';
      else if (con < t.con[0]) msg = 'Obraz jest płaski. Podnieś kontrast.';
      else if (con > t.con[1]) msg = 'Za duży kontrast — cienie zlewają się w czerń.';
      else ok = true;
      fb.className = 'cm-fb' + (ok ? ' ok' : '');
      fb.textContent = ok ? 'Jest! Szczegóły są czytelne.' : msg;
      if (ok) finish();
    }
    let fin = false;
    function finish() {
      if (fin) return; fin = true;
      setTimeout(() => {
        G.unlock('dev:' + art);
        G.s.dev = G.s.dev || [];
        if (!G.s.dev.includes(e.result || art)) G.s.dev.push(e.result || art);
        SFX.play.discover();
        prev.classList.add('done');
        fb.textContent = e.doneMsg || 'Wywołano. Zapisano w Galerii → Wywołane.';
        if (e.ev) [].concat(e.ev).forEach(x => { if (G.addEv(x)) UI.evidenceToast(x); });
        G.change();
      }, 600);
    }
    if (done()) { prev.classList.add('done'); fb.className = 'cm-fb ok'; fb.textContent = 'Ten kadr jest już wywołany.'; }
    res.addEventListener('click', () => UI.viewImage(e.result || art));
    upd();
    return { el: pg.el };
  }

  /* ================= BUSHVIEW ================= */
  UI.def('bushview', {
    name: 'BushView', unlock: 'app:bushview',
    mount(host) {
      const stack = new UI.Stack(host);
      stack.push(G.isUnlocked('bv:auth') ? devPage(stack) : bvLogin(stack));
      return { back: () => stack.pop(), destroy: () => stack.destroy() };
    }
  });
  function bvLogin(stack) {
    const pg = UI.page({ title: '', cls: 'bv' });
    pg.hdr.classList.add('flat');
    const u = h('input', { class: 'field', placeholder: 'Login', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' });
    const p = h('input', { class: 'field', placeholder: 'Hasło', type: 'password' });
    const err = h('div', { class: 'nb-err' });
    const go = () => {
      if (U.squash(u.value) === 'majacam' && U.squash(p.value) === 'jutrzenka1996') {
        G.unlock('bv:auth'); SFX.play.unlock();
        stack.destroy(); stack.host.innerHTML = ''; stack.push(devPage(stack));
      } else { SFX.play.error(); err.textContent = 'Błędny login lub hasło.'; p.classList.remove('bad'); void p.offsetWidth; p.classList.add('bad'); }
    };
    p.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
    pg.body.append(h('div', { class: 'nb-wrap' },
      h('div', { class: 'nb-brand' }, h('span', { html: UI.glyph('bushview').replace('width="34" height="34"', 'width="44" height="44"') }), h('b', {}, 'BushView')),
      h('p', { class: 'nb-sub' }, 'Panel zdalny fotopułapek 4G.'), u, p, err, h('button', { class: 'btn pri wide nb-btn', onclick: go }, 'Zaloguj')));
    return { el: pg.el };
  }
  function devPage(stack) {
    const pg = UI.page({ title: 'Moje kamery', big: true, cls: 'bv' });
    const render = () => {
      pg.body.innerHTML = '';
      const dead = G.flag('cam1Dead');
      const cams = [
        { id: 'c1', name: 'CAM-01 · Brama', on: !dead, info: dead ? 'Utracono połączenie: 23.10.2026, 00:31' : 'Online · bateria 61% · zasięg ▂▄▆_', art: 'c1_0057' },
        { id: 'c2', name: 'CAM-02 · Hala A', on: false, info: 'Utracono połączenie: 15.10.2026, 01:31', art: 'c2_0019' }
      ];
      const list = h('div', { class: 'list', style: 'margin-top:6px' });
      cams.forEach(c => list.appendChild(h('button', { class: 'row', onclick: () => stack.push(camPage(c)) },
        h('img', { class: 'ri thumb', src: Art.url(c.art), alt: '' }),
        h('div', { class: 'rm' }, h('b', {}, c.name), h('span', { class: c.on ? 'ok' : 'bad' }, c.info)),
        h('span', { class: 'dot ' + (c.on ? 'on' : '') }))));
      pg.body.appendChild(list);
    };
    render();
    return { el: pg.el, onShow: render };
  }
  function camPage(c) {
    const pg = UI.page({ title: c.name, cls: 'bv' });
    const big = h('div', { class: 'bv-big' });
    const status = h('div', { class: 'bv-st' });
    const btn = h('button', { class: 'btn pri wide' }, U.ico('cam', 18), 'Zrób zdjęcie teraz');
    const hist = h('div', {});
    pg.body.append(big, h('div', { class: 'pad' }, status, btn), hist);
    const shots = () => (G.s.panelShots || []).filter(s => s.cam === c.id).map(s => s.art).reverse();
    const albumFor = () => DATA.maja.photos.filter(p => p.cam === c.id && G.isUnlocked(p.unlock || 'maja:base')).map(p => p.art).reverse();
    const show = art => { big.innerHTML = ''; big.appendChild(h('img', { src: Art.url(art), alt: '', onclick: () => UI.viewImage(art) })); };
    const renderHist = () => {
      hist.innerHTML = '';
      const all = [...shots(), ...albumFor()];
      if (all.length) { hist.appendChild(h('div', { class: 'sec-t' }, 'Historia zdjęć')); hist.appendChild(UI.photoGrid(all, c.name)); show(all[0]); }
    };
    let busy = false;
    btn.addEventListener('click', () => {
      if (busy) return;
      SFX.unlockAudio();
      if (!c.on || (c.id === 'c1' && G.flag('cam1Dead'))) { SFX.play.error(); status.textContent = 'Urządzenie nie odpowiada. Ostatnie połączenie: ' + (c.id === 'c1' ? '23.10.2026, 00:31' : '15.10.2026, 01:31'); status.className = 'bv-st bad'; return; }
      const wait = Math.max(0, (G.s.vars.bvLast || 0) + 20000 - Date.now());
      if (wait > 0) { status.textContent = `Kamera ładuje lampę IR. Spróbuj za ${Math.ceil(wait / 1000)} s.`; status.className = 'bv-st'; return; }
      busy = true; btn.disabled = true;
      status.className = 'bv-st'; status.textContent = 'Wysyłanie polecenia do kamery…';
      setTimeout(() => { status.textContent = 'Odbieranie zdjęcia (MMS)…'; }, 1600);
      setTimeout(() => {
        const base = DATA.panelShot();
        const t = G.now(); const d = new Date(t);
        const art = `${base}@${d.getFullYear()}-${U.pad(d.getMonth() + 1)}-${U.pad(d.getDate())}T${U.pad(d.getHours())}:${U.pad(d.getMinutes())}:${U.pad(d.getSeconds())}`;
        G.s.panelShots = G.s.panelShots || [];
        G.s.panelShots.push({ art, cam: c.id, t });
        G.s.vars.bvLast = Date.now();
        SFX.play.shutter();
        status.textContent = 'Zdjęcie odebrane · ' + U.time(t);
        busy = false; btn.disabled = false;
        BUS.emit('panelShot', base);
        G.setFlag('shot:' + base);
        renderHist();
        G.change();
      }, 3400);
    });
    renderHist();
    if (!big.firstChild) big.appendChild(h('div', { class: 'empty' }, 'Brak zdjęć'));
    status.textContent = c.on ? c.info : c.info;
    status.className = 'bv-st' + (c.on ? '' : ' bad');
    return { el: pg.el };
  }

  /* ================= POGODA ================= */
  UI.def('weather', {
    name: 'Pogoda',
    mount(host) {
      const w = DATA.weather();
      const pg = UI.page({ title: 'Pogoda', big: true, cls: 'wx' });
      const now = G.now();
      const hrs = [];
      for (let i = 0; i < 8; i++) { const t = now + i * 3600e3; hrs.push(h('div', { class: 'wx-h' }, h('small', {}, i ? U.time(t).slice(0, 2) : 'Teraz'), U.ico(w.hourly[i % w.hourly.length].i, 22), h('b', {}, w.hourly[i % w.hourly.length].t + '°'))); }
      U.put(pg.body,
        h('div', { class: 'wx-top' }, h('small', {}, 'Mglisko'), h('div', { class: 'wx-t' }, w.temp + '°'), h('b', {}, w.nowLong || w.now), h('span', {}, `Odczuwalna ${w.feel}° · wilgotność ${w.hum}%`)),
        w.alert ? h('div', { class: 'wx-alert' }, U.ico('info', 18), h('div', {}, h('b', {}, 'Ostrzeżenie IMGW'), h('span', {}, w.alert))) : null,
        h('div', { class: 'wx-hours' }, hrs),
        h('div', { class: 'list', style: 'margin-top:14px' }, w.days.map(d => h('div', { class: 'row' }, h('div', { class: 'rm' }, h('b', {}, d.d)), U.ico(d.i, 20), h('span', { class: 'rx', style: 'min-width:70px' }, `${d.lo}° / ${d.hi}°`)))),
        h('p', { class: 'pad', style: 'color:var(--tx3);font-size:12px;margin-top:16px' }, 'Wschód słońca 7:07 · zachód 17:04 · księżyc: ' + w.moon));
      host.appendChild(pg.el);
      return {};
    }
  });

  /* ================= KALENDARZ ================= */
  UI.def('calendar', {
    name: 'Kalendarz',
    mount(host) {
      const now = new Date(G.now());
      const y = now.getFullYear(), m = now.getMonth();
      const pg = UI.page({ title: `${U.MONTHS_GEN[m].replace(/a$/, '').replace('października', 'październik')}`, big: true, cls: 'cal' });
      const MONTHS = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
      pg.setTitle(`${MONTHS[m]} ${y}`);
      const EV = { '2026-10-28': ['16:00 Dentysta'], '2026-10-31': ['Urodziny mamy 🎂'], '2026-11-01': ['Wszystkich Świętych'], '2026-11-11': ['Święto Niepodległości'], '2026-10-24': ['Oddać książki do biblioteki'] };
      const grid = h('div', { class: 'cal-g' }, ['pn', 'wt', 'śr', 'cz', 'pt', 'sb', 'nd'].map(d => h('b', {}, d)));
      const first = (new Date(y, m, 1).getDay() + 6) % 7;
      const days = new Date(y, m + 1, 0).getDate();
      for (let i = 0; i < first; i++) grid.appendChild(h('span'));
      const list = h('div', { class: 'list', style: 'margin-top:16px' });
      const showDay = d => {
        list.innerHTML = '';
        const key = `${y}-${U.pad(m + 1)}-${U.pad(d)}`;
        const ev = EV[key] || [];
        list.appendChild(h('div', { class: 'row' }, h('div', { class: 'rm' }, h('b', {}, `${d} ${U.MONTHS_GEN[m]}`), h('span', {}, ev.length ? ev.join(' · ') : 'Brak wydarzeń'))));
      };
      for (let d = 1; d <= days; d++) {
        const key = `${y}-${U.pad(m + 1)}-${U.pad(d)}`;
        grid.appendChild(h('button', { class: (d === now.getDate() ? 'today ' : '') + (EV[key] ? 'has' : ''), onclick: () => showDay(d) }, String(d)));
      }
      pg.body.append(grid, list);
      showDay(now.getDate());
      host.appendChild(pg.el);
      return {};
    }
  });

  /* ================= ZEGAR ================= */
  UI.def('clock', {
    name: 'Zegar',
    mount(host) {
      const pg = UI.page({ title: 'Alarmy', big: true });
      const alarms = [['06:45', 'Pn–Pt', false], ['07:30', 'Sobota', false], ['09:00', 'Jutro', true]];
      const t = h('div', { class: 'clk-now' }, U.time(G.now()));
      const iv = setInterval(() => { t.textContent = U.time(G.now()); }, 1000);
      pg.body.append(t, h('div', { class: 'list plain' }, alarms.map(([tm, d, on]) => h('button', { class: 'row', onclick: e => { const g = e.currentTarget.querySelector('.tgl'); g.classList.toggle('on'); SFX.play.tap(); } },
        h('div', { class: 'rm' }, h('b', { style: 'font-size:34px;font-weight:300' }, tm), h('span', {}, d)), h('span', { class: 'tgl' + (on ? ' on' : '') })))));
      host.appendChild(pg.el);
      return { destroy: () => clearInterval(iv) };
    }
  });

  /* ================= USTAWIENIA ================= */
  UI.def('settings', {
    name: 'Ustawienia',
    mount(host) {
      const stack = new UI.Stack(host);
      const pg = UI.page({ title: 'Ustawienia', big: true });
      const S = G.settings;
      const toggle = (label, key, desc) => h('button', { class: 'row', onclick: e => { S[key] = !S[key]; G.saveSettings(); e.currentTarget.querySelector('.tgl').classList.toggle('on', S[key]); if (key === 'ambient') SFX.ambient(S.ambient ? (G.s.mood || 'calm') : 'off'); } },
        h('div', { class: 'rm' }, h('b', {}, label), desc ? h('span', {}, desc) : null), h('span', { class: 'tgl' + (S[key] ? ' on' : '') }));
      const speeds = [['slow', 'Wolno'], ['normal', 'Normalnie'], ['fast', 'Szybko'], ['instant', 'Natychmiast']];
      const sp = h('div', { class: 'seg', style: 'margin:0' }, speeds.map(([k, l]) => h('button', { class: S.speed === k ? 'on' : '', onclick: e => { S.speed = k; G.saveSettings(); [...sp.children].forEach(b => b.classList.remove('on')); e.currentTarget.classList.add('on'); } }, l)));
      const vol = h('input', { type: 'range', min: 0, max: 1, step: 0.05, value: S.volume, style: 'width:100%' });
      vol.addEventListener('input', () => { S.volume = +vol.value; SFX.setVolume(S.volume); G.saveSettings(); });
      const nameIn = h('input', { class: 'field', value: G.s.player.name, maxlength: 20 });
      nameIn.addEventListener('change', () => { const v = nameIn.value.trim(); if (v) { G.s.player.name = v; G.save(); UI.toast('Zapisano imię.'); } });
      const gen = h('div', { class: 'seg', style: 'margin:0' }, [['m', 'Pisz do mnie: on'], ['f', 'Pisz do mnie: ona']].map(([k, l]) => h('button', { class: G.s.player.gender === k ? 'on' : '', onclick: e => { G.s.player.gender = k; G.save(); [...gen.children].forEach(b => b.classList.remove('on')); e.currentTarget.classList.add('on'); BUS.emit('chats'); } }, l)));
      const cps = G.checkpoints();
      const chList = h('div', { class: 'list' });
      Engine.order.forEach(id => {
        const ch = Engine.chapters[id];
        const ok = cps[id];
        chList.appendChild(h('button', { class: 'row' + (ok ? '' : ' dis'), onclick: async () => {
          if (!ok) return;
          const r = await UI.modal({ title: `Zagrać od: ${ch.title}?`, text: 'Obecny postęp zostanie zastąpiony stanem z początku tego rozdziału. Odblokowane zakończenia zostaną zachowane.', buttons: [{ label: 'Anuluj', value: 0 }, { label: 'Wczytaj', value: 1, pri: true }] });
          if (r === 1) { G.loadCheckpoint(id); location.reload(); }
        } }, h('span', { class: 'ri', html: U.icon(ok ? 'refresh' : 'lock', 17) }), h('div', { class: 'rm' }, h('b', {}, ch.num === 0 ? 'Prolog' : ch.num === 99 ? 'Epilog' : `Rozdział ${ch.num}`), h('span', {}, ch.title))));
      });
      const endings = h('div', { class: 'list plain' }, Object.entries(DATA.endings).map(([id, e]) => h('div', { class: 'row' + (G.s.endings.includes(id) ? '' : ' dis') }, h('div', { class: 'rm' }, h('b', {}, G.s.endings.includes(id) ? e.title : '???'), h('span', {}, G.s.endings.includes(id) ? e.tag : 'Zakończenie nieodkryte')))));
      const osSeg = h('div', { class: 'seg', style: 'margin:0' }, [['auto', 'Automatycznie'], ['ios', 'iOS'], ['android', 'Android']].map(([k, l]) => h('button', {
        class: (S.os || 'auto') === k ? 'on' : '', onclick: async () => {
          if ((S.os || 'auto') === k) return;
          const r = await UI.modal({ title: 'Zmienić wygląd systemu?', text: 'Telefon uruchomi się ponownie. Postęp jest zapisany.', buttons: [{ label: 'Anuluj', value: 0 }, { label: 'Uruchom ponownie', value: 1, pri: true }] });
          if (r === 1) { S.os = k; G.saveSettings(); G.save(true); location.reload(); }
        }
      }, l)));
      const appearance = h('div', { class: 'seg', style: 'margin:0' }, [['light', 'Jasny'], ['dark', 'Ciemny'], ['auto', 'Systemowy']].map(([key, text]) => h('button', {
        class: (S.appearance || 'light') === key ? 'on' : '', 'aria-pressed': String((S.appearance || 'light') === key), onclick: e => {
          S.appearance = key; G.saveSettings();
          [...appearance.children].forEach(b => { b.classList.toggle('on', b === e.currentTarget); b.setAttribute('aria-pressed', String(b === e.currentTarget)); });
        }
      }, text)));
      pg.body.append(
        h('div', { class: 'sec-t' }, 'Wygląd systemu'),
        h('div', { class: 'pad' }, osSeg),
        h('div', { class: 'sec-t' }, 'Wygląd'),
        h('div', { class: 'pad' }, appearance),
        h('div', { class: 'sec-t' }, 'Profil'),
        h('div', { class: 'pad' }, h('label', { class: 'lbl', style: 'margin-top:0' }, 'Imię'), nameIn, h('label', { class: 'lbl' }, 'Forma zwracania się'), gen),
        h('div', { class: 'sec-t' }, 'Tempo wiadomości'),
        h('div', { class: 'pad' }, sp),
        h('div', { class: 'sec-t' }, 'Dźwięk i wibracje'),
        h('div', { class: 'list plain' }, toggle('Efekty dźwiękowe', 'sfx'), toggle('Dźwięk otoczenia', 'ambient', 'Wiatr, szkło, niski szum'), toggle('Wibracje', 'vibrate'), toggle('Podpowiedzi od postaci', 'autoHints', 'Gdy utkniesz, ktoś może coś zasugerować')),
        h('div', { class: 'pad', style: 'margin-top:12px' }, h('label', { class: 'lbl', style: 'margin-top:0' }, 'Głośność'), vol),
        h('div', { class: 'sec-t' }, 'Rozdziały'), chList,
        h('div', { class: 'sec-t' }, 'Zakończenia'), endings,
        h('div', { class: 'sec-t' }, 'Wkrótce'),
        h('div', { class: 'list plain' }, h('div', { class: 'row dis' }, h('span', { class: 'ri', html: U.icon('target', 17) }), h('div', { class: 'rm' }, h('b', {}, 'MGLISKO: TEREN'), h('span', {}, 'Śledztwo w prawdziwym świecie, z GPS')))),
        h('div', { class: 'sec-t' }, 'Gra'),
        h('div', { class: 'list plain' },
          h('button', { class: 'row', onclick: async () => { const r = await UI.modal({ title: 'Nowa gra?', text: 'Cały postęp i punkty kontrolne zostaną usunięte.', buttons: [{ label: 'Anuluj', value: 0 }, { label: 'Usuń i zacznij', value: 1, pri: true }] }); if (r === 1) { G.wipe(); location.reload(); } } }, h('div', { class: 'rm' }, h('b', { class: 'bad' }, 'Zacznij od nowa'))),
          h('div', { class: 'row' }, h('div', { class: 'rm' }, h('b', {}, 'MGLISKO'), h('span', {}, 'Wersja 1.0 · fikcja literacka · zapis automatyczny')))));
      stack.push({ el: pg.el });
      return { back: () => stack.pop(), destroy: () => stack.destroy() };
    }
  });
})();
