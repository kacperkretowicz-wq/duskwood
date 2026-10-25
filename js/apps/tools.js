'use strict';
/* Ciemnia (edytor zdjęć), BushView (panel fotopułapek), Pogoda, Ustawienia. */

(() => {
  const { h, $ } = U;

  // Prywatne narzędzia telefonu są częścią zapisu, niezależną od kroku fabuły.
  const dayKey = t => { const d = new Date(t); return `${d.getFullYear()}-${U.pad(d.getMonth() + 1)}-${U.pad(d.getDate())}`; };
  const phoneState = () => {
    const p = G.s.phoneTools || (G.s.phoneTools = {});
    if (!p.alarms) p.alarms = [];
    if (!p.timer) p.timer = { duration: 300000, remaining: 300000, running: false, finished: false, label: '' };
    if (!p.stopwatch) p.stopwatch = { elapsed: 0, running: false, laps: [] };
    return p;
  };
  const timerLeft = t => Math.max(0, t.running ? t.deadline - Date.now() : t.remaining);
  const stopwatchTime = s => s.elapsed + (s.running ? Math.max(0, Date.now() - s.startedAt) : 0);
  const clockDuration = (ms, centiseconds = false) => {
    const sec = Math.max(0, centiseconds ? Math.floor(ms / 1000) : Math.ceil(ms / 1000));
    const hours = Math.floor(sec / 3600), minutes = Math.floor(sec / 60) % 60;
    const time = `${hours ? hours + ':' : ''}${U.pad(minutes)}:${U.pad(sec % 60)}`;
    return time + (centiseconds ? ',' + U.pad(Math.floor(ms / 10) % 100) : '');
  };
  function phoneTick() {
    // Nie uruchamiamy dźwięków na ekranie tytułowym ani w zamkniętej aplikacji.
    if (!G.s || document.hidden || document.querySelector('.title-scr')) return;
    const p = G.s.phoneTools;
    if (!p) return;
    let changed = false;
    if (p.timer?.running && timerLeft(p.timer) <= 0) {
      Object.assign(p.timer, { running: false, remaining: 0, finished: true, deadline: null });
      changed = true;
      UI.banner({ app: 'clock', title: 'Minutnik zakończony', text: p.timer.label || 'Czas minął.', sound: 'beep', open: { tab: 'timer' }, ms: 6000 });
    }
    const key = dayKey(G.now()), minute = U.time(G.now());
    (p.alarms || []).forEach(a => {
      if (!a.on || a.time !== minute || a.lastDay === key) return;
      a.lastDay = key;
      if (!a.repeat) a.on = false;
      changed = true;
      UI.banner({ app: 'clock', title: a.title || 'Alarm', text: `${a.time} · czas telefonu`, sound: 'beep', open: { tab: 'alarms' }, ms: 6000 });
    });
    if (changed) { G.save(true); BUS.emit('phone-tools'); }
  }
  setInterval(phoneTick, 500);
  document.addEventListener('visibilitychange', phoneTick);
  BUS.on('game:ready', phoneTick);

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
        h('div', { class: 'wx-top' }, h('small', {}, DATA.weatherPlace()), h('div', { class: 'wx-t' }, w.temp + '°'), h('b', {}, w.nowLong || w.now), h('span', {}, `Odczuwalna ${w.feel}° · wilgotność ${w.hum}%`)),
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
      const saved = G.s, p = phoneState();
      if (!p.calendar) {
        p.calendar = [
          { id: 'dentist', date: '2026-10-28', time: '16:00', title: 'Dentysta', note: 'Wziąć poprzednie zdjęcie zęba.' },
          { id: 'birthday', date: '2026-10-31', time: '', title: 'Urodziny mamy 🎂', note: 'Zadzwonić rano. Prezent jest już w szafie.' },
          { id: 'november1', date: '2026-11-01', time: '', title: 'Wszystkich Świętych', note: '' },
          { id: 'november11', date: '2026-11-11', time: '', title: 'Święto Niepodległości', note: '' },
          { id: 'library', date: '2026-10-24', time: '', title: 'Oddać książki do biblioteki', note: 'Sprawdzić termin w mailu.' }
        ]; G.save(true);
      }
      const MONTHS = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
      let selected = dayKey(G.now()), month = new Date(G.now()); month.setDate(1);
      const heading = h('h2'), grid = h('div', { class: 'cal-g', 'aria-label': 'Dni miesiąca' });
      const agenda = h('section', { class: 'cal-agenda', 'aria-label': 'Wybrany dzień' });
      const pg = UI.page({ title: 'Kalendarz', big: true, cls: 'pg cal calendar-app', right: [h('button', { 'aria-label': 'Dodaj wydarzenie', onclick: () => editEvent() }, U.ico('plus', 23))] });
      const move = offset => { month = new Date(month.getFullYear(), month.getMonth() + offset, 1); render(); };
      pg.body.append(h('div', { class: 'cal-month-nav' },
        h('button', { 'aria-label': 'Poprzedni miesiąc', onclick: () => move(-1) }, U.ico('back', 21)), heading,
        h('button', { 'aria-label': 'Następny miesiąc', onclick: () => move(1) }, U.ico('back', 21, 'cal-next'))), grid,
        h('div', { class: 'cal-toolbar' }, h('button', { onclick: () => { selected = dayKey(G.now()); month = new Date(G.now()); month.setDate(1); render(); } }, 'Dzisiaj'), h('span', {}, 'Twój kalendarz')), agenda);
      function render() {
        const y = month.getFullYear(), m = month.getMonth(), today = dayKey(G.now());
        if (!selected.startsWith(`${y}-${U.pad(m + 1)}-`)) selected = dayKey(month);
        heading.textContent = `${MONTHS[m]} ${y}`;
        grid.replaceChildren(...['pn', 'wt', 'śr', 'cz', 'pt', 'sb', 'nd'].map(d => h('b', {}, d)));
        for (let i = 0; i < (new Date(y, m, 1).getDay() + 6) % 7; i++) grid.appendChild(h('span'));
        for (let d = 1; d <= new Date(y, m + 1, 0).getDate(); d++) {
          const key = dayKey(new Date(y, m, d));
          grid.appendChild(h('button', { class: (key === today ? 'today ' : '') + (key === selected ? 'selected ' : '') + (p.calendar.some(e => e.date === key) ? 'has' : ''),
            'aria-label': `${d} ${U.MONTHS_GEN[m]} ${y}`, 'aria-pressed': String(key === selected), onclick: () => { selected = key; render(); } }, String(d)));
        }
        const date = new Date(U.parseLocal(selected)), events = p.calendar.filter(e => e.date === selected).sort((a, b) => (a.time || '').localeCompare(b.time || ''));
        agenda.replaceChildren(h('h3', {}, `${date.getDate()} ${U.MONTHS_GEN[date.getMonth()]}`));
        if (!events.length) agenda.appendChild(h('p', { class: 'phone-help' }, 'Nie masz nic zaplanowanego.'));
        const list = h('div', { class: 'list plain cal-events' });
        events.forEach(e => list.appendChild(h('button', { class: 'row', onclick: () => showEvent(e) }, h('span', { class: 'cal-event-time' }, e.time || 'Cały dzień'),
          h('div', { class: 'rm' }, h('b', {}, e.title), e.location ? h('span', {}, e.location) : null, e.evidence && G.has(e.evidence) ? h('span', {}, 'Zapisany materiał w załączniku') : null), U.ico('back', 16, 'cal-next'))));
        agenda.append(list, h('button', { class: 'cal-add', onclick: () => editEvent() }, U.ico('plus', 18), 'Dodaj wydarzenie'));
      }
      function editEvent(existing) {
        const title = h('input', { class: 'field', id: 'calendar-title', value: existing?.title || '', maxlength: 80, required: true, autocomplete: 'off', placeholder: 'np. Oddzwonić do Oli' });
        const date = h('input', { class: 'field', id: 'calendar-date', type: 'date', value: existing?.date || selected, required: true });
        const time = h('input', { class: 'field', id: 'calendar-time', type: 'time', value: existing?.time || '' });
        const location = h('input', { class: 'field', id: 'calendar-location', value: existing?.location || '', maxlength: 120, placeholder: 'Opcjonalnie' });
        const note = h('textarea', { class: 'field', id: 'calendar-note', rows: 4, maxlength: 2000, placeholder: 'Co chcesz zapamiętać?' }, existing?.note || '');
        const evidence = h('select', { class: 'field', id: 'calendar-evidence' }, h('option', { value: '' }, 'Bez załącznika'),
          Object.keys(G.s.ev).map(id => { const e = G.ev(id); return e ? h('option', { value: id }, e.title) : null; }));
        evidence.value = existing?.evidence && G.has(existing.evidence) ? existing.evidence : '';
        const err = h('p', { class: 'phone-form-error', role: 'alert' });
        const form = h('form', { class: 'phone-form', onsubmit: e => {
          e.preventDefault(); if (G.s !== saved) return;
          if (!title.value.trim() || !date.value || !Number.isFinite(U.parseLocal(date.value))) { err.textContent = 'Wpisz nazwę i wybierz datę.'; return; }
          const event = { id: existing?.id || U.uid(), title: title.value.trim(), date: date.value, time: time.value, location: location.value.trim(), note: note.value.trim(), evidence: G.has(evidence.value) ? evidence.value : '' };
          const index = p.calendar.findIndex(e => e.id === event.id);
          if (index < 0) p.calendar.push(event); else p.calendar[index] = event;
          selected = event.date; month = new Date(U.parseLocal(selected)); month.setDate(1);
          G.save(true); sh.close(); render(); UI.toast('Wydarzenie zapisane.');
        } }, h('label', { for: 'calendar-title' }, 'Nazwa'), title, h('label', { for: 'calendar-date' }, 'Data'), date,
          h('label', { for: 'calendar-time' }, 'Godzina · zostaw pustą dla całego dnia'), time, h('label', { for: 'calendar-location' }, 'Miejsce'), location,
          h('label', { for: 'calendar-note' }, 'Notatka'), note, h('label', { for: 'calendar-evidence' }, 'Załącznik z Notatek'), evidence,
          h('p', { class: 'phone-help' }, 'Zapis tylko w twoim telefonie w grze. Bez powiadomienia systemowego.'), err,
          h('button', { class: 'btn pri wide', type: 'submit' }, 'Zapisz wydarzenie'));
        const sh = UI.sheet({ title: existing ? 'Edytuj wydarzenie' : 'Nowe wydarzenie', body: form });
      }
      function showEvent(event) {
        const date = new Date(U.parseLocal(event.date));
        const body = h('div', { class: 'phone-event-detail' }, h('h2', {}, event.title), h('p', { class: 'phone-help' }, `${U.dayLong(date)} ${date.getFullYear()} · ${event.time || 'cały dzień'}`),
          event.location ? h('p', {}, event.location) : null, event.note ? h('p', { class: 'cal-event-note' }, event.note) : null,
          event.evidence && G.has(event.evidence) ? h('button', { class: 'btn wide', onclick: () => { sh.close(); UI.openApp('notes', { ev: event.evidence }); } }, U.ico('note', 19), G.ev(event.evidence).title) : null,
          h('button', { class: 'btn pri wide', onclick: () => { sh.close(true); editEvent(event); } }, 'Edytuj wydarzenie'),
          h('button', { class: 'btn wide phone-delete', onclick: async () => {
            const yes = await UI.modal({ title: 'Usunąć wydarzenie?', text: 'Zniknie z twojego kalendarza.', buttons: [{ label: 'Anuluj', value: false }, { label: 'Usuń', value: 1, pri: true }] });
            if (yes !== 1 || G.s !== saved) return;
            p.calendar = p.calendar.filter(e => e.id !== event.id); G.save(true); sh.close(); render();
          } }, 'Usuń wydarzenie'));
        const sh = UI.sheet({ title: 'Wydarzenie', body });
      }
      render();
      host.appendChild(pg.el);
      const off = BUS.on('clock', () => { if (G.s === saved) render(); });
      return { destroy: off };
    }
  });

  /* ================= ZEGAR ================= */
  UI.def('clock', {
    name: 'Zegar',
    mount(host, params) {
      const saved = G.s, p = phoneState();
      const tabs = [['alarms', 'Alarmy', 'clock'], ['stopwatch', 'Stoper', 'refresh'], ['timer', 'Minutnik', 'clock']];
      let tab = tabs.some(([id]) => id === params.tab) ? params.tab : 'timer', display, lapList;
      const pg = UI.page({ title: 'Minutnik', big: true, cls: 'pg clock-app' });
      const nav = h('div', { class: 'clock-tabs', role: 'tablist', 'aria-label': 'Narzędzia zegara' });
      tabs.forEach(([id, title, icon]) => nav.appendChild(h('button', { role: 'tab', 'aria-selected': String(tab === id), onclick: () => { tab = id; render(); } }, U.ico(icon, 22), title)));
      pg.el.appendChild(nav);
      const save = () => { if (G.s === saved) G.save(true); };
      function update() {
        if (G.s !== saved || !display?.isConnected) return;
        if (tab === 'timer') display.textContent = clockDuration(timerLeft(p.timer));
        if (tab === 'stopwatch') display.textContent = clockDuration(stopwatchTime(p.stopwatch), true);
        if (tab === 'alarms') display.textContent = U.time(G.now());
      }
      function render() {
        if (G.s !== saved) return;
        pg.setTitle(tabs.find(([id]) => tab === id)[1]);
        [...nav.children].forEach((b, i) => b.setAttribute('aria-selected', String(tabs[i][0] === tab)));
        pg.body.replaceChildren();
        if (tab === 'timer') renderTimer();
        if (tab === 'stopwatch') renderStopwatch();
        if (tab === 'alarms') renderAlarms();
        update();
      }
      function renderTimer() {
        const t = p.timer;
        display = h('div', { class: 'clock-display', role: 'timer', 'aria-label': 'Pozostały czas' });
        const status = h('p', { class: 'clock-state', role: 'status' }, t.finished ? 'Czas minął' : t.running ? 'Odliczanie' : t.remaining !== t.duration ? 'Wstrzymano' : 'Gotowy');
        const label = h('input', { class: 'field', id: 'timer-label', value: t.label, maxlength: 60, placeholder: 'np. Herbata' });
        label.addEventListener('change', () => { t.label = label.value.trim(); save(); });
        const duration = h('div', { class: 'timer-duration' });
        const values = [Math.floor(t.duration / 3600000), Math.floor(t.duration / 60000) % 60, Math.floor(t.duration / 1000) % 60];
        const inputs = ['Godziny', 'Minuty', 'Sekundy'].map((name, i) => {
          const input = h('input', { type: 'number', min: 0, max: i ? 59 : 23, value: values[i], inputmode: 'numeric', 'aria-label': name, disabled: t.running || t.remaining !== t.duration && !t.finished });
          duration.appendChild(h('label', {}, input, h('span', {}, name)));
          input.addEventListener('change', () => {
            const numbers = inputs.map((el, n) => U.clamp(Math.floor(Number(el.value) || 0), 0, n ? 59 : 23));
            inputs.forEach((el, n) => { el.value = numbers[n]; });
            t.duration = numbers[0] * 3600000 + numbers[1] * 60000 + numbers[2] * 1000;
            t.remaining = t.duration; t.finished = false; save(); status.textContent = t.duration ? 'Gotowy' : 'Ustaw czas'; const pri = controls.querySelector('.btn.pri'); if (pri) pri.textContent = 'Start'; update();
          });
          return input;
        });
        const controls = h('div', { class: 'clock-controls' }, h('button', { class: 'btn', onclick: () => { Object.assign(t, { running: false, remaining: t.duration, deadline: null, finished: false }); save(); render(); } }, 'Anuluj'),
          h('button', { class: 'btn pri', onclick: () => {
            if (t.running) { t.remaining = timerLeft(t); t.running = false; t.deadline = null; }
            else {
              if (!t.remaining) t.remaining = t.duration;
              if (!t.remaining) { status.textContent = 'Ustaw czas dłuższy niż 0 sekund.'; return; }
              t.deadline = Date.now() + t.remaining; t.running = true; t.finished = false;
            }
            save(); render();
          } }, t.running ? 'Wstrzymaj' : t.remaining !== t.duration && !t.finished ? 'Wznów' : 'Start'));
        const presets = h('div', { class: 'timer-presets', 'aria-label': 'Szybki wybór czasu' }, [1, 3, 5, 10].map(minutes => h('button', { disabled: t.running, onclick: () => { Object.assign(t, { duration: minutes * 60000, remaining: minutes * 60000, finished: false, running: false, deadline: null }); save(); render(); } }, minutes + ' min')));
        pg.body.append(display, status, duration, presets, h('div', { class: 'clock-label' }, h('label', { for: 'timer-label' }, 'Etykieta'), label), controls,
          h('p', { class: 'phone-help clock-help' }, 'Minutnik odlicza rzeczywisty czas. Powiadomienie zobaczysz w grze; jeśli ją zamkniesz, pojawi się po powrocie.'));
      }
      function renderStopwatch() {
        const s = p.stopwatch;
        display = h('div', { class: 'clock-display stopwatch-display', role: 'timer', 'aria-label': 'Czas stopera' });
        const lap = h('button', { class: 'btn', onclick: () => {
          if (!s.running) { s.elapsed = 0; s.laps = []; save(); render(); return; }
          if (s.laps.length >= 100) { UI.toast('Możesz zapisać 100 okrążeń.'); return; }
          s.laps.push(stopwatchTime(s)); save(); renderLaps();
        } }, s.running ? 'Okrążenie' : 'Wyzeruj');
        const start = h('button', { class: 'btn pri', onclick: () => {
          if (s.running) { s.elapsed = stopwatchTime(s); s.running = false; }
          else { s.startedAt = Date.now(); s.running = true; }
          save(); render();
        } }, s.running ? 'Stop' : 'Start');
        lapList = h('div', { class: 'list plain stopwatch-laps', 'aria-label': 'Okrążenia' });
        pg.body.append(display, h('p', { class: 'clock-state' }, s.running ? 'Pomiar trwa' : s.elapsed ? 'Wstrzymano' : 'Gotowy'), h('div', { class: 'clock-controls' }, lap, start), lapList,
          h('p', { class: 'phone-help clock-help' }, 'Stoper mierzy rzeczywisty czas. Możesz wyjść do innej aplikacji w telefonie.'));
        renderLaps();
      }
      function renderLaps() {
        lapList.replaceChildren(...p.stopwatch.laps.map((value, i, all) => h('div', { class: 'row' }, h('span', {}, 'Okrążenie ' + (i + 1)), h('b', {}, clockDuration(value - (all[i - 1] || 0), true)))).reverse());
      }
      function renderAlarms() {
        display = h('div', { class: 'clk-now', 'aria-label': 'Czas telefonu' });
        const list = h('div', { class: 'list plain alarm-list' });
        p.alarms.slice().sort((a, b) => a.time.localeCompare(b.time)).forEach(a => list.appendChild(h('div', { class: 'row' },
          h('button', { class: 'alarm-edit', 'aria-label': 'Edytuj alarm ' + a.time, onclick: () => editAlarm(a) }, h('b', {}, a.time), h('span', {}, a.title || 'Alarm'), h('small', {}, a.repeat ? 'Codziennie' : 'Jeden raz')),
          h('button', { class: 'tgl' + (a.on ? ' on' : ''), role: 'switch', 'aria-checked': String(a.on), 'aria-label': 'Alarm ' + a.time, onclick: () => { a.on = !a.on; if (a.on) a.lastDay = null; save(); render(); } }))));
        U.put(pg.body, display, h('p', { class: 'clock-state' }, 'Czas w telefonie gry'), list,
          p.alarms.length ? null : h('p', { class: 'phone-help clock-help' }, 'Nie masz ustawionych alarmów.'),
          h('button', { class: 'btn clock-add', onclick: () => editAlarm() }, U.ico('plus', 19), 'Dodaj alarm'),
          h('p', { class: 'phone-help clock-help' }, 'Alarmy działają przy otwartej grze, według jej zegara. Po przeskoku w historii pominięte godziny nie zadzwonią.'));
      }
      function editAlarm(existing) {
        const time = h('input', { class: 'field', id: 'alarm-time', type: 'time', value: existing?.time || '07:00', required: true });
        const title = h('input', { class: 'field', id: 'alarm-title', value: existing?.title || '', maxlength: 60, placeholder: 'Alarm' });
        const repeat = h('input', { id: 'alarm-repeat', type: 'checkbox', checked: !!existing?.repeat });
        const form = h('form', { class: 'phone-form', onsubmit: e => {
          e.preventDefault(); if (G.s !== saved || !/^\d{2}:\d{2}$/.test(time.value)) return;
          const alarm = { id: existing?.id || U.uid(), time: time.value, title: title.value.trim(), repeat: repeat.checked, on: true, lastDay: null };
          const i = p.alarms.findIndex(a => a.id === alarm.id);
          if (i >= 0) p.alarms[i] = alarm; else p.alarms.push(alarm);
          save(); sh.close(); render();
        } }, h('label', { for: 'alarm-time' }, 'Godzina'), time, h('label', { for: 'alarm-title' }, 'Etykieta'), title,
        h('label', { class: 'phone-check', for: 'alarm-repeat' }, repeat, 'Powtarzaj codziennie'), h('button', { class: 'btn pri wide', type: 'submit' }, 'Zapisz alarm'),
        existing ? h('button', { class: 'btn wide phone-delete', type: 'button', onclick: () => { if (G.s !== saved) return; p.alarms = p.alarms.filter(a => a.id !== existing.id); save(); sh.close(); render(); } }, 'Usuń alarm') : null);
        const sh = UI.sheet({ title: existing ? 'Edytuj alarm' : 'Nowy alarm', body: form });
      }
      const off = BUS.on('phone-tools', render);
      const iv = setInterval(update, 60);
      render();
      host.appendChild(pg.el);
      return { onParams: p => { if (tabs.some(([id]) => id === p.tab)) { tab = p.tab; render(); } }, destroy: () => { clearInterval(iv); off(); } };
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
          if (r === 1) { if (G.loadCheckpoint(id)) location.reload(); else UI.toast('Nie udało się wczytać tego rozdziału — zapis był uszkodzony.', { kind: 'error' }); }
        } }, h('span', { class: 'ri', html: U.icon(ok ? 'refresh' : 'lock', 17) }), h('div', { class: 'rm' }, h('b', {}, ch.kicker || (ch.num === 0 ? 'Prolog' : ch.num === 99 ? 'Epilog' : `Rozdział ${ch.num}`)), h('span', {}, ch.title))));
      });
      const endings = h('div', { class: 'list plain' }, Object.entries(DATA.endings).map(([id, e]) => h('div', { class: 'row' + (G.s.endings.includes(id) ? '' : ' dis') }, h('div', { class: 'rm' }, h('b', {}, G.s.endings.includes(id) ? e.title : '???'), h('span', {}, G.s.endings.includes(id) ? e.tag : 'Zakończenie nieodkryte')))));
      const osSeg = h('div', { class: 'seg', style: 'margin:0' }, [['auto', 'Automatycznie'], ['ios', 'iOS'], ['android', 'Android']].map(([k, l]) => h('button', {
        class: (S.os || 'auto') === k ? 'on' : '', onclick: async () => {
          if ((S.os || 'auto') === k) return;
          const r = await UI.modal({ title: 'Zmienić wygląd systemu?', text: 'Telefon uruchomi się ponownie. Postęp jest zapisany.', buttons: [{ label: 'Anuluj', value: 0 }, { label: 'Uruchom ponownie', value: 1, pri: true }] });
          if (r === 1) { S.os = k; G.saveSettings(); G.save(true); location.reload(); }
        }
      }, l)));
      const textSize = h('div', { class: 'seg', style: 'margin:0' }, [['m', 'Zwykły'], ['l', 'Duży'], ['xl', 'Bardzo duży']].map(([key, text]) => h('button', {
        class: (S.textSize || 'm') === key ? 'on' : '', 'aria-pressed': String((S.textSize || 'm') === key), onclick: e => {
          S.textSize = key; G.saveSettings();
          [...textSize.children].forEach(b => { b.classList.toggle('on', b === e.currentTarget); b.setAttribute('aria-pressed', String(b === e.currentTarget)); });
        }
      }, text)));
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
        h('div', { class: 'sec-t' }, 'Rozmiar tekstu'),
        h('div', { class: 'pad' }, textSize),
        h('div', { class: 'sec-t' }, 'Personalizacja'),
        h('div', { class: 'list plain' },
          h('button', { class: 'row', onclick: () => UI.openWallpapers() }, h('div', { class: 'rm' }, h('b', {}, 'Tapeta'), h('span', {}, Wallpapers.selected().name)), U.ico('back', 16, 'cal-next')),
          h('button', { class: 'row', onclick: () => UI.openSeason() }, h('div', { class: 'rm' }, h('b', {}, 'Sezony i sesje'), h('span', {}, Seasons.current().title + ' · twój postęp')), U.ico('back', 16, 'cal-next'))),
        h('div', { class: 'sec-t' }, 'Profil'),
        h('div', { class: 'pad' }, h('label', { class: 'lbl', style: 'margin-top:0' }, 'Imię'), nameIn, h('label', { class: 'lbl' }, 'Forma zwracania się'), gen),
        h('div', { class: 'sec-t' }, 'Tempo wiadomości'),
        h('div', { class: 'pad' }, sp),
        h('div', { class: 'sec-t' }, 'Dźwięk i wibracje'),
        h('div', { class: 'list plain' }, toggle('Efekty dźwiękowe', 'sfx'), toggle('Dźwięk otoczenia', 'ambient', 'Wiatr, szkło, niski szum'), toggle('Wibracje', 'vibrate'), toggle('Łagodniejsze straszenie', 'softScares', 'Bez głośnych dźwięków, błysków i nagłych zbliżeń'), toggle('Podpowiedzi od postaci', 'autoHints', 'Gdy utkniesz, ktoś może coś zasugerować')),
        h('div', { class: 'pad', style: 'margin-top:12px' }, h('label', { class: 'lbl', style: 'margin-top:0' }, 'Głośność'), vol),
        h('div', { class: 'sec-t' }, 'Rozdziały'), chList,
        h('div', { class: 'sec-t' }, 'Zakończenia'), endings,
        h('div', { class: 'sec-t' }, 'Gra'),
        h('div', { class: 'list plain' },
          h('button', { class: 'row', onclick: async () => { const r = await UI.modal({ title: 'Nowa gra?', text: 'Cały postęp i punkty kontrolne zostaną usunięte.', buttons: [{ label: 'Anuluj', value: 0 }, { label: 'Usuń i zacznij', value: 1, pri: true }] }); if (r === 1) { G.wipe(); location.reload(); } } }, h('div', { class: 'rm' }, h('b', { class: 'bad' }, 'Zacznij od nowa'))),
          h('div', { class: 'row' }, h('div', { class: 'rm' }, h('b', {}, 'Quiet Is Safer'), h('span', {}, 'Wersja 1.4 · fikcja literacka · zapis automatyczny')))));
      stack.push({ el: pg.el });
      return { back: () => stack.pop(), destroy: () => stack.destroy() };
    }
  });
})();
