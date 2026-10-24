'use strict';
/*
  Silnik fabuły. Rozdziały pisane są w DSL (say, choose, ask, show, waitFor…),
  kompilowane do płaskiej listy kroków z etykietami. Zapis gry = rozdział + numer kroku.
*/

const Engine = (() => {
  const chapters = {};
  const order = [];
  const SPEED = { slow: 1.45, normal: 1, fast: 0.55, instant: 0.03 };
  const ABORT = Symbol('abort');

  let gen = 0, running = false, ff = false;
  let sleepers = new Set();
  let resolver = null;
  let waiter = null;
  const typingMap = {};
  let lastTalk = null;

  // Tempo konkretnej osoby: najpierw czyta, potem pisze; kolejne dymki idą seriami.
  function cadence(chat, who, text, extra) {
    const profile = (DATA.chars[who] && DATA.chars[who].cadence) || {};
    const previous = G.chat(chat).msgs.at(-1);
    const sameBurst = previous && previous.from === who && lastTalk && lastTalk.chat === chat && lastTalk.who === who && Date.now() - lastTalk.at < 18000;
    const reading = previous && previous.from !== who ? Math.min((previous.text || '').length * 24, 3200) : 0;
    const jitter = .85 + Math.random() * .3;
    const gap = extra.gap ?? ((sameBurst ? 450 : (profile.think || 1500) + reading) * jitter);
    const duration = extra.typing ?? (extra.msg && extra.msg.img ? 1900 : U.clamp(650 + (text || '').length * (profile.key || 65) * jitter, 1200, 14000));
    return { gap, duration, hesitate: !sameBurst && duration > 5000 && /[?…]|\.\./.test(text || '') };
  }

  /* ---------- DSL ---------- */
  const D = {
    say: (chat, who, text, o = {}) => ({ t: 'say', chat, who, text, ...o }),
    pic: (chat, who, img, text = '', o = {}) => ({ t: 'say', chat, who, text, img, ...o }),
    me: (chat, text, o = {}) => ({ t: 'say', chat, who: 'me', text, ...o }),
    sys: (chat, text) => ({ t: 'sys', chat, text }),
    pause: (ms, o = {}) => ({ t: 'pause', ms, ...o }),
    choose: (chat, options, o = {}) => ({ t: 'choose', chat, options, ...o }),
    menu: (chat, options, o = {}) => ({ t: 'choose', chat, options, menu: true, ...o }),
    opt: (text, then = [], o = {}) => ({ text, then, ...o }),
    ask: (chat, o) => ({ t: 'ask', chat, ...o }),
    show: (chat, o) => ({ t: 'show', chat, ...o }),
    place: (chat, o) => ({ t: 'place', chat, ...o }),
    waitFor: (cond, o = {}) => ({ t: 'wait', cond, ...o }),
    openChat: (chat, o = {}) => ({ t: 'wait', cond: () => G.viewing === chat, ...o }),
    goal: (text, hints = []) => ({ t: 'goal', text, hints }),
    give: (ev, o = {}) => ({ t: 'give', ev, ...o }),
    evolve: (ev, patch) => ({ t: 'evolve', ev, patch }),
    unlock: (...keys) => ({ t: 'unlock', keys }),
    lock: (...keys) => ({ t: 'lock', keys }),
    set: (k, v = true) => ({ t: 'set', k, v }),
    inc: (k, n = 1) => ({ t: 'inc', k, n }),
    trust: (who, n) => ({ t: 'trust', who, n }),
    iff: (cond, then, els = []) => ({ t: 'if', cond, then, els }),
    label: name => ({ t: 'label', name }),
    go: to => ({ t: 'go', to }),
    notify: o => ({ t: 'notify', ...o }),
    sync: (key, o = {}) => ({ t: 'sync', key, ...o }),
    clock: (iso, o = {}) => ({ t: 'clock', iso, ...o }),
    interlude: (text, sub = '', ms = 3400, o = {}) => ({ t: 'interlude', text, sub, ms, ...o }),
    title: () => ({ t: 'title' }),
    callIn: (who, o = {}) => ({ t: 'callIn', who, ...o }),
    callEnd: (o = {}) => ({ t: 'callEnd', ...o }),
    dial: o => ({ t: 'dial', ...o }),
    end: next => ({ t: 'end', next }),
    ending: id => ({ t: 'ending', id }),
    credits: () => ({ t: 'credits' }),
    fx: (name, o = {}) => ({ t: 'fx', name, ...o }),
    typing: (chat, who, ms = 2500) => ({ t: 'typing', chat, who, ms }),
    run: fn => ({ t: 'run', fn }),
    // Wycofanie wiadomości: nadawca usuwa swoją wiadomość (uid) u wszystkich. flag = czy gracz miał wtedy otwarty ten czat.
    unsend: (chat, uid, o = {}) => ({ t: 'unsend', chat, uid, ...o }),
    // Edycja wiadomości: nowa treść z dopiskiem „edytowano”. flag = czy gracz widział wersję przed edycją (miał otwarty czat).
    edit: (chat, uid, text, o = {}) => ({ t: 'edit', chat, uid, text, ...o }),
    task: fn => ({ t: 'task', fn }),
    toast: (text, o = {}) => ({ t: 'toast', text, ...o }),
    rename: (chat, name, avatar) => ({ t: 'rename', chat, name, avatar }),
    ambient: mood => ({ t: 'ambient', mood }),
    deduce: id => ({ t: 'unlock', keys: ['ded:' + id] }),
    tl: id => ({ t: 'tl', id }),
    scene: (id, steps) => ({ t: 'scene', id, steps }),
    // Straszak: odpala się raz na zapis (s.scares), nigdy przy przewijaniu ani po wczytaniu.
    scare: (id, kind, o = {}) => ({ t: 'scare', id, kind, ...o }),
    nearby: (id, o = {}) => ({ t: 'nearby', id, ...o }),
    vanish: (chat, text) => ({ t: 'vanish', chat, text }),
    camera: (chat, options, o = {}) => ({ t: 'choose', chat, options, camera: true, ...o })
  };

  /* ---------- Kompilacja ---------- */
  function compile(raw, chId) {
    const out = [];
    let n = 0, prefix = '';
    const L = p => `${prefix}${p}${n++}`;
    const hasSteps = a => Array.isArray(a) ? a.flat(Infinity).filter(Boolean).length > 0 : !!a;
    function branches(list, end) {
      return (list || []).map(b => {
        const lab = hasSteps(b.then) ? L('b') : null;
        return { b, lab };
      });
    }
    function emitBranches(bs, end) {
      for (const { b, lab } of bs) if (lab) { out.push({ t: 'label', name: lab }); emit([b.then]); out.push({ t: 'go', to: end }); }
    }
    const strip = (b, lab) => { const c = Object.assign({}, b); delete c.then; c.lab = lab; return c; };

    function emit(list) {
      for (const st of [list].flat(Infinity)) {
        if (!st) continue;
        switch (st.t) {
          case 'choose': {
            const self = L('c'), end = L('ce');
            out.push({ t: 'label', name: self });
            const opts = st.options.filter(Boolean).map(o => ({ o, lab: hasSteps(o.then) ? L('co') : null }));
            out.push(Object.assign({}, st, { options: opts.map(({ o, lab }) => strip(o, lab)), self, end }));
            out.push({ t: 'go', to: end });
            for (const { o, lab } of opts) if (lab) {
              out.push({ t: 'label', name: lab }); emit([o.then]);
              out.push({ t: 'go', to: st.menu && !o.exit ? self : end });
            }
            out.push({ t: 'label', name: end });
            break;
          }
          case 'ask': case 'show': case 'place': {
            const end = L('xe');
            const key = st.t === 'ask' ? 'answers' : 'accept';
            const bs = branches(st[key], end);
            out.push(Object.assign({}, st, { [key]: bs.map(({ b, lab }) => strip(b, lab)), end, self: L('x') }));
            out.push({ t: 'go', to: end });
            emitBranches(bs, end);
            out.push({ t: 'label', name: end });
            break;
          }
          case 'if': {
            const els = L('ie'), end = L('ix');
            out.push({ t: 'ifnot', cond: st.cond, to: els });
            emit([st.then]);
            out.push({ t: 'go', to: end });
            out.push({ t: 'label', name: els });
            emit([st.els]);
            out.push({ t: 'label', name: end });
            break;
          }
          case 'callIn': {
            const end = L('ke');
            const dl = hasSteps(st.declined) ? L('kd') : null;
            out.push(Object.assign({}, st, { declined: undefined, dlab: dl, end }));
            out.push({ t: 'go', to: end });
            if (dl) { out.push({ t: 'label', name: dl }); emit([st.declined]); out.push({ t: 'go', to: end }); }
            out.push({ t: 'label', name: end });
            break;
          }
          case 'dial': {
            const end = L('de');
            const nums = {};
            const bs = [];
            for (const num in st.numbers) {
              const b = st.numbers[num];
              const lab = L('dn');
              nums[num] = { who: b.who, lab };
              bs.push({ lab, then: b.then });
            }
            out.push(Object.assign({}, st, { numbers: nums, end }));
            out.push({ t: 'go', to: end });
            for (const b of bs) { out.push({ t: 'label', name: b.lab }); emit([b.then]); out.push({ t: 'go', to: end }); }
            out.push({ t: 'label', name: end });
            break;
          }
          case 'scene': {
            // Sceny dopisane po wydaniu mają własną przestrzeń etykiet: stare identyfikatory
            // wyborów (zapis `used`, `tries`) nie przesuwają się, zmienia się tylko indeks kroku.
            const pn = n, pp = prefix, start = out.length;
            prefix = st.id + '.'; n = 0;
            emit([st.steps]);
            for (let i = start; i < out.length; i++) out[i] = Object.assign({}, out[i], { scene: out[i].scene || st.id });
            n = pn; prefix = pp;
            break;
          }
          default: out.push(st);
        }
      }
    }
    emit(raw);
    const labels = {};
    out.forEach((s, i) => { if (s.t === 'label') labels[s.name] = i; });
    out.forEach(s => { if (s.t === 'go' && !(s.to in labels)) console.warn(`[${chId}] brak etykiety: ${s.to}`); });
    return { steps: out, labels };
  }

  function chapter(id, meta, build) {
    const raw = build(D);
    chapters[id] = Object.assign({ id }, meta, compile(raw, id));
    if (!order.includes(id)) order.push(id);
  }

  /* ---------- Czas i przewijanie ---------- */
  function factor() { return ff ? 0.03 : (SPEED[G.settings.speed] || 1); }
  function sleep(ms) {
    const my = gen;
    return new Promise((res, rej) => {
      const s = {
        res: () => { sleepers.delete(s); my === gen ? res() : rej(ABORT); },
        timer: 0
      };
      s.timer = setTimeout(s.res, ms * factor());
      sleepers.add(s);
    });
  }
  function skip() {
    ff = true;
    for (const s of [...sleepers]) { clearTimeout(s.timer); s.res(); }
    BUS.emit('ff', true);
  }
  function stopFF() { if (ff) { ff = false; BUS.emit('ff', false); } }
  const guard = my => { if (my !== gen) throw ABORT; };

  /* ---------- Interakcja z graczem ---------- */
  function interact(p) {
    const my = gen;
    stopFF();
    G.s.pending = p;
    BUS.emit('pending', p);
    G.save();
    return new Promise((res, rej) => { resolver = v => (my === gen ? res(v) : rej(ABORT)); });
  }
  function answer(v) {
    if (!resolver) return false;
    const r = resolver; resolver = null;
    G.s.pending = null;
    BUS.emit('pending', null);
    r(v);
    return true;
  }
  const pending = () => G.s && G.s.pending;

  function setTyping(chat, who, on) {
    if (on) typingMap[chat] = who; else delete typingMap[chat];
    BUS.emit('typing', { chat, who, on });
  }

  async function talk(chat, who, text, extra = {}) {
    const my = gen;
    G.unlock('chat:' + chat);
    if (who === 'me') {
      await sleep(extra.gap != null ? extra.gap : 350); guard(my);
      G.post(chat, Object.assign({ from: 'me', text }, extra.msg || {}));
      SFX.play.sent();
      return;
    }
    const timing = cadence(chat, who, text, extra);
    await sleep(timing.gap); guard(my);
    setTyping(chat, who, true);
    try {
      if (timing.hesitate) {
        await sleep(timing.duration * .35); guard(my);
        setTyping(chat, who, false);
        await sleep(1100); guard(my);
        setTyping(chat, who, true);
        await sleep(timing.duration * .65);
      } else await sleep(timing.duration);
    } finally { if (my === gen) setTyping(chat, who, false); }
    guard(my);
    if (extra.cancelIf && extra.cancelIf()) return;
    const msg = G.post(chat, Object.assign({ from: who, text }, extra.msg || {}));
    lastTalk = { chat, who, at: Date.now() };
    if (msg.img) G.s.saved.push({ art: msg.img, t: msg.t, from: who, chat });
  }

  function apply(o) {
    if (!o) return;
    if (o.set) for (const k in o.set) G.setFlag(k, o.set[k]);
    if (o.inc) for (const k in o.inc) G.inc(k, o.inc[k]);
    if (o.trust) for (const k in o.trust) doTrust(k, o.trust[k]);
  }
  function doTrust(who, n) {
    G.inc('trust_' + who, n);
  }

  function clearWaiter() {
    if (!waiter) return;
    waiter.timers.forEach(clearTimeout);
    waiter.off();
    waiter = null;
  }

  /* ---------- Wykonanie kroków ---------- */
  async function exec(st, ch) {
    const my = gen;
    const s = G.s;
    switch (st.t) {
      case 'label': return;
      case 'go': return st.to;
      case 'ifnot': return G.test(st.cond) ? undefined : st.to;
      case 'pause': await sleep(st.ms); guard(my); return;
      case 'title': await UI.chapterTitle(ch); guard(my); return;

      case 'say': {
        const msg = {};
        ['img', 'ev', 'kind', 'place', 'audio', 'link', 'clue', 'vid', 'snap', 'vanish', 'uid'].forEach(k => { if (st[k] != null) msg[k] = st[k]; });
        // wording zmienia wypowiedź bez naruszenia podpisu kroku starych zapisów.
        await talk(st.chat, st.who, st.wording ?? st.text, { msg, gap: st.gap, typing: st.typing });
        return;
      }
      case 'sys': G.unlock('chat:' + st.chat); G.post(st.chat, { from: 'sys', text: st.text }); return;
      case 'typing': {
        setTyping(st.chat, st.who, true);
        try { await sleep(st.ms); } finally { if (my === gen) setTyping(st.chat, st.who, false); }
        guard(my); return;
      }

      case 'choose': {
        const key = `${s.chapter}:${st.self}`;
        const used = s.used[key] || [];
        const vis = st.options.map((o, i) => Object.assign({ i }, o))
          .filter(o => !(st.menu && !o.exit && used.includes(o.i)) && G.test(o.cond));
        if (!vis.length) return st.end;
        const pick = await interact({ type: 'choose', chat: st.chat, camera: !!st.camera, options: vis.map(o => ({ i: o.i, text: o.wording ?? o.text, img: o.img, gallery: !!o.gallery, shot: !!o.shot })) });
        guard(my);
        const o = st.options[pick];
        if (st.menu && !o.exit) s.used[key] = [...used, pick];
        if (o.shot) G.post(st.chat, { from: 'sys', text: U.tpl(o.sys || '{Zrobiłeś|Zrobiłaś} zrzut ekranu. Druga strona dostała powiadomienie.') });
        else if (!o.silent) { const m = { from: 'me', text: o.say != null ? o.say : (o.wording ?? o.text) }; if (o.img) { m.img = o.img; if (st.camera && o.say == null) m.text = ''; } G.post(st.chat, m); SFX.play.sent(); }
        apply(o);
        return o.lab || st.end;
      }

      case 'ask': {
        const key = `${s.chapter}:${st.self}`;
        while (true) {
          const val = await interact({ type: 'ask', chat: st.chat, placeholder: st.placeholder || 'Napisz odpowiedź…', mask: st.mask });
          guard(my);
          if (!st.silent) { G.post(st.chat, { from: 'me', text: st.mask ? '•'.repeat(val.length) : val }); SFX.play.sent(); }
          const n = U.squash(val);
          const hit = st.answers.find(a => a.any || a.match.some(m => st.contains ? n.includes(U.squash(m)) : n === U.squash(m)));
          if (hit) { apply(hit); if (st.store) G.s.vars[st.store] = val; return hit.lab || st.end; }
          s.tries[key] = (s.tries[key] || 0) + 1;
          const w = st.wrong && st.wrong.length ? st.wrong[(s.tries[key] - 1) % st.wrong.length] : null;
          if (w) await talk(st.chat, w[0], w[1]);
          guard(my);
          if (st.reveal && s.tries[key] === st.reveal.after) await talk(st.chat, st.reveal.who, st.reveal.text);
          guard(my);
        }
      }

      case 'show': {
        const key = `${s.chapter}:${st.self}`;
        while (true) {
          const evId = await interact({ type: 'show', chat: st.chat, prompt: st.prompt || 'Załącz z Notatek' });
          guard(my);
          G.post(st.chat, { from: 'me', ev: evId }); SFX.play.sent();
          const hit = st.accept.find(a => a.ev.includes(evId));
          if (hit) { apply(hit); return hit.lab || st.end; }
          s.tries[key] = (s.tries[key] || 0) + 1;
          const special = st.wrongFor && st.wrongFor[evId];
          const w = special || (st.wrong && st.wrong.length ? st.wrong[(s.tries[key] - 1) % st.wrong.length] : null);
          if (w) await talk(st.chat, w[0], w[1]);
          guard(my);
        }
      }

      case 'place': {
        const key = `${s.chapter}:${st.self}`;
        while (true) {
          const pid = await interact({ type: 'place', chat: st.chat, prompt: st.prompt || 'Wskaż miejsce na mapie', layer: st.layer, pool: st.pool });
          guard(my);
          G.post(st.chat, { from: 'me', place: pid }); SFX.play.sent();
          const hit = st.accept.find(a => a.place.includes(pid));
          if (hit) { apply(hit); return hit.lab || st.end; }
          s.tries[key] = (s.tries[key] || 0) + 1;
          if (st.countVar) G.inc(st.countVar, 1);
          const special = st.wrongFor && st.wrongFor[pid];
          const w = special || (st.wrong && st.wrong.length ? st.wrong[(s.tries[key] - 1) % st.wrong.length] : null);
          if (w) for (const line of (Array.isArray(w[0]) ? w : [w])) { await talk(st.chat, line[0], line[1]); guard(my); }
        }
      }

      case 'wait': {
        if (G.test(st.cond)) return;
        stopFF();
        if (st.goal) setGoal(st.goal, st.goalHints || []);
        await new Promise((res, rej) => {
          const w = { timers: [], off: null };
          const check = () => { if (my !== gen) { clearWaiter(); rej(ABORT); return; } if (G.test(st.cond)) { clearWaiter(); res(); } };
          w.off = BUS.on('change', check);
          waiter = w;
          if (G.settings.autoHints) (st.hints || []).forEach((hn, j) => {
            const hk = `${s.chapter}:${s.pc}:h${j}`;
            if (s.hints[hk]) return;
            w.timers.push(setTimeout(() => {
              if (waiter !== w || G.test(st.cond)) return;
              s.hints[hk] = true;
              talk(hn.chat, hn.who, hn.text, { cancelIf: () => G.test(st.cond) }).catch(() => { /* przerwane */ });
            }, hn.after * 1000));
          });
          check();
        });
        guard(my);
        return;
      }

      case 'goal': setGoal(st.text, st.hints); return;
      case 'give': {
        const isNew = G.addEv(st.ev, st.silent);
        if (isNew && !st.silent) UI.evidenceToast(st.ev);
        return;
      }
      case 'evolve': {
        s.evx[st.ev] = Object.assign({}, s.evx[st.ev] || {}, st.patch);
        if (G.has(st.ev)) { s.ev[st.ev].fresh = true; UI.toast(`Zaktualizowano w Notatkach: ${G.ev(st.ev).title}`, { kind: 'ev', icon: 'note' }); }
        BUS.emit('badges'); G.change();
        return;
      }
      case 'tl': s.tl[st.id] = true; G.change(); return;
      case 'unlock': st.keys.forEach(k => G.unlock(k)); return;
      case 'lock': st.keys.forEach(k => G.lock(k)); return;
      case 'set': G.setFlag(st.k, st.v); return;
      case 'inc': G.inc(st.k, st.n); return;
      case 'trust': doTrust(st.who, st.n); return;
      case 'notify': UI.banner(st); return;
      case 'sync': {
        G.unlock(st.key);
        s.vars.nimbusNew = (s.vars.nimbusNew || 0) + (st.count || 1);
        UI.banner({ app: 'nimbus', title: 'Nimbus', text: st.text || `Zsynchronizowano nowe pliki (${st.count || 1}) z urządzenia „Telefon Mai”.`, sound: 'notif', open: st.open });
        BUS.emit('badges'); G.change();
        return;
      }
      case 'clock': G.setClock(st.iso); return;
      case 'interlude': await UI.interlude(st.text, st.sub, st.ms * Math.min(1, factor() * 1.5 + 0.3)); guard(my); return;
      case 'ambient': s.mood = st.mood; SFX.ambient(st.mood); return;
      case 'rename': G.chat(st.chat).name = st.name; if (st.avatar) G.chat(st.chat).avatar = st.avatar; BUS.emit('chats'); G.change(); return;
      case 'toast': UI.toast(st.text, st); return;
      case 'fx': await UI.fx(st.name, st); guard(my); return;
      case 'scare': {
        s.scares = s.scares || {};
        if (s.scares[st.id]) return;
        s.scares[st.id] = G.now ? G.now() : Date.now();
        G.save();
        if (ff) return;
        const r = await UI.scare(st.kind, st); guard(my);
        if (r === 'accept' && st.onAccept) G.setFlag(st.onAccept);
        return;
      }
      case 'nearby': {
        // Przesyłanie w pobliżu: obce urządzenie proponuje zdjęcie. Decyzja raz na zapis.
        s.nearby = s.nearby || {};
        if (!s.nearby[st.id]) {
          s.nearby[st.id] = ff ? 'accept' : await UI.nearby(st); guard(my);
          G.save();
        }
        if (s.nearby[st.id] === 'accept') { if (st.flag) G.setFlag(st.flag); if (st.ev) G.addEv(st.ev, true); }
        else if (st.declineFlag) G.setFlag(st.declineFlag);
        return;
      }
      case 'vanish': {
        // Znikające wiadomości: po przeczytaniu zostaje tylko informacja, że były.
        const c = s.chats[st.chat];
        if (c && c.msgs) { const n = c.msgs.filter(m => m.vanish).length; c.msgs = c.msgs.filter(m => !m.vanish); if (n) G.post(st.chat, { from: 'sys', text: st.text || 'Wiadomości zniknęły po przeczytaniu.' }); }
        G.change(); return;
      }
      case 'unsend': {
        const c = G.chat(st.chat);
        const m = c && c.msgs ? [...c.msgs].reverse().find(x => x.uid === st.uid) : null;
        if (m && !m.deleted) {
          if (st.flag) G.setFlag(st.flag, G.viewing === st.chat);
          m.deleted = true; m.text = ''; delete m.img; delete m.ev;
          G.save(); BUS.emit('msg-edit', { chat: st.chat });
        }
        return;
      }
      case 'edit': {
        const c = G.chat(st.chat);
        const m = c && c.msgs ? [...c.msgs].reverse().find(x => x.uid === st.uid) : null;
        if (m && !m.deleted && !m.edited) {
          if (st.flag) G.setFlag(st.flag, G.viewing === st.chat);
          m.text = st.text; m.edited = true;
          G.save(); BUS.emit('msg-edit', { chat: st.chat });
        }
        return;
      }
      case 'run': { const r = st.fn(s, G); return typeof r === 'string' ? r : undefined; }
      case 'task': { stopFF(); const r = await st.fn(s, G); guard(my); return typeof r === 'string' ? r : undefined; }

      case 'callIn': {
        while (true) {
          const r = await UI.incomingCall(st.who);
          guard(my);
          if (r === 'accept') break;
          if (st.dlab) return st.dlab;
          await sleep(4500); guard(my);
        }
        s.call = { who: st.who, dir: 'in', start: G.now(), real: Date.now() };
        G.chat('call').msgs = [];
        UI.callScreen();
        G.save();
        return;
      }
      case 'dial': {
        if (st.goal) setGoal(st.goal, st.goalHints || []);
        const num = await interact({ type: 'dial', numbers: Object.keys(st.numbers) });
        guard(my);
        const b = st.numbers[num];
        s.call = { who: b.who, dir: 'out', number: num, start: G.now(), real: Date.now() };
        G.chat('call').msgs = [];
        await UI.outgoingCall(b.who, num);
        guard(my);
        return b.lab;
      }
      case 'callEnd': {
        const c = s.call;
        if (c) {
          s.calls.unshift({ who: c.who, dir: c.dir, number: c.number, t: c.start, dur: Math.max(5, Math.round((Date.now() - c.real) / 1000)), lines: G.chat('call').msgs.map(m => ({ from: m.from, text: m.text })) });
        }
        s.call = null;
        await UI.endCall(); guard(my);
        G.change();
        return;
      }

      case 'end': {
        s.done[ch.id] = true;
        await UI.chapterEnd(ch); guard(my);
        s.chapter = st.next; s.pc = 0; s.objective = null;
        G.checkpoint(st.next);
        G.save(true);
        return { abs: true };
      }
      case 'ending': {
        if (!s.endings.includes(st.id)) s.endings.push(st.id);
        s.ending = st.id;
        G.save(true);
        await UI.endingScreen(st.id); guard(my);
        return;
      }
      case 'credits': {
        s.finished = true; G.save(true);
        Seasons.archive();
        await UI.credits(); guard(my);
        return 'STOP';
      }
      default:
        console.warn('Nieznany krok', st);
    }
  }

  function setGoal(text, hints = []) {
    G.s.objective = { text, hints, level: 0 };
    BUS.emit('goal');
    G.change();
  }

  async function run() {
    if (running) return;
    running = true;
    const my = gen;
    try {
      while (G.s && my === gen) {
        const ch = chapters[G.s.chapter];
        if (!ch) break;
        if (G.s.pc === 0 && SeasonPacing.hold(ch.id)) break;
        const st = ch.steps[G.s.pc];
        if (!st) break;
        if (SeasonPacing.holdRest(st)) break;
        let next;
        try { next = await exec(st, ch); }
        catch (e) { if (e === ABORT) return; throw e; }
        if (my !== gen) return;
        if (next === 'STOP') break;
        if (next && next.abs) { /* rozdział zmieniony */ }
        else if (typeof next === 'string') {
          if (!(next in ch.labels)) { console.error('Brak etykiety', next); G.s.pc++; }
          else G.s.pc = ch.labels[next];
        } else G.s.pc++;
        G.save();
      }
    } catch (e) {
      console.error('Błąd silnika', e);
      UI.toast('Błąd skryptu: ' + e.message, { kind: 'error' });
    } finally {
      if (my === gen) running = false;
    }
  }

  function restart() {
    gen++;
    lastTalk = null;
    running = false;
    resolver = null;
    clearWaiter();
    for (const s of [...sleepers]) { clearTimeout(s.timer); s.res(); }
    sleepers.clear();
    Object.keys(typingMap).forEach(k => delete typingMap[k]);
    ff = false;
    if (G.s) G.s.pending = null;
    BUS.emit('pending', null);
    setTimeout(run, 0);
  }

  function jump(chId, label) {
    G.s.chapter = chId;
    G.s.pc = label ? chapters[chId].labels[label] : 0;
    restart();
  }

  return {
    D, chapter, chapters, order, run, restart, jump, answer, pending, skip,
    isFF: () => ff, typing: chat => typingMap[chat], talk
  };
})();
