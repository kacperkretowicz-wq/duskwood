'use strict';
/* Stan gry: zapis, zegar fabularny, czaty, dowody, flagi. */

const G = (() => {
  const KEY = 'mglisko.save.v1';
  const CP = 'mglisko.cp.v1.';
  const SKEY = 'mglisko.settings.v1';
  const START = '2026-10-21T21:03';

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* brak dostępu */ } },
    keys() { try { return Object.keys(localStorage); } catch (e) { return []; } }
  };

  function fresh(player) {
    return {
      v: 11,
      seasonId: 's1', seasons: {}, seasonArchive: {},
      player: player || { name: 'Ty', gender: 'm' },
      chapter: 'prolog', pc: 0,
      clock: { t: U.parseLocal(START), at: Date.now() },
      vars: {}, flags: {}, unlocked: {}, chats: {}, ev: {}, evx: {}, tl: {}, hot: {}, seen: {},
      solved: {}, used: {}, hints: {}, calls: [], pending: null, objective: null, saved: [],
      tries: {}, scares: {}, endings: [], done: {}, started: Date.now(), playMs: 0
    };
  }

  const defaults = { speed: 'normal', sfx: true, ambient: true, vibrate: true, autoHints: true, softScares: false, volume: 0.8, os: 'auto', appearance: 'light', textSize: 'm' };
  function migrate(saved) {
    if ((saved.v || 1) < 2) {
      const map = STORY_MIGRATIONS[saved.chapter];
      if (map && Number.isInteger(saved.pc) && map[saved.pc] != null) saved.pc = map[saved.pc];
      saved.v = 2;
    }
    if (saved.v < 3) {
      // v3: dopisane sceny. Zapis w trakcie wyboru wraca dokładnie do tego wyboru;
      // zapis między krokami wznawia od początku nowej sceny stojącej tuż przed nim.
      const map = typeof STORY_MIGRATIONS_V3 !== 'undefined' && STORY_MIGRATIONS_V3[saved.chapter];
      if (map && Number.isInteger(saved.pc) && map.exact[saved.pc] != null) {
        saved.pc = (saved.pending ? map.exact : map.resume)[saved.pc];
      }
      saved.v = 11; // tabela V3 jest generowana wprost do bieżących kroków
    }
    if (saved.v < 4) {
      // v4: przegląd jakości. Te same zasady co w v3: wybór wraca do wyboru, krok — do początku nowej sceny.
      const map = typeof STORY_MIGRATIONS_V4 !== 'undefined' && STORY_MIGRATIONS_V4[saved.chapter];
      if (map && Number.isInteger(saved.pc) && map.exact[saved.pc] != null) {
        saved.pc = (saved.pending ? map.exact : map.resume)[saved.pc];
      }
      saved.v = 11; // tabela V4 też mapuje wprost na bieżące kroki
    }
    if (saved.v < 5) {
      // v5: sceny S1 z planu wdrożenia. Wybór wraca do wyboru, krok — do początku nowej sceny.
      const map = typeof STORY_MIGRATIONS_V5 !== 'undefined' && STORY_MIGRATIONS_V5[saved.chapter];
      if (map && Number.isInteger(saved.pc) && map.exact[saved.pc] != null) {
        saved.pc = (saved.pending ? map.exact : map.resume)[saved.pc];
      }
      saved.v = 11; // tabela V5 też mapuje wprost na bieżące kroki
    }
    if (saved.v < 6) {
      // v6: rozdział 3 podzielony przerwą s1_plate (po numerze DDZ 6K19). Zapis przed nią zostaje,
      // zapis za nią przesuwa się o nowy krok — przerwa nie cofa ani nie zeruje postępu.
      const map = typeof STORY_MIGRATIONS_V6 !== 'undefined' && STORY_MIGRATIONS_V6[saved.chapter];
      if (map && Number.isInteger(saved.pc) && map.exact[saved.pc] != null) {
        saved.pc = map.exact[saved.pc];
      }
      saved.v = 11;
    }
    if (saved.v < 7) {
      // v7: scena xAnonim w rozdziale 3 (anonimowy materiał z CAM-01). Krok za nią przesuwa się, wybór wraca do wyboru.
      const map = typeof STORY_MIGRATIONS_V7 !== 'undefined' && STORY_MIGRATIONS_V7[saved.chapter];
      if (map && Number.isInteger(saved.pc) && map.exact[saved.pc] != null) {
        saved.pc = (saved.pending ? map.exact : map.resume)[saved.pc];
      }
      saved.v = 11;
    }
    if (saved.v < 8) {
      // v8: scena xJednaOsoba w c4 (Błysk: ostrzeż jedną osobę). Krok za nią przesuwa się, wybór wraca do wyboru.
      const map = typeof STORY_MIGRATIONS_V8 !== 'undefined' && STORY_MIGRATIONS_V8[saved.chapter];
      if (map && Number.isInteger(saved.pc) && map.exact[saved.pc] != null) {
        saved.pc = (saved.pending ? map.exact : map.resume)[saved.pc];
      }
      saved.v = 11;
    }
    if (saved.v < 9) {
      // v9: reakcje Oli, Weroniki i Zenona na ostrzeżenie w zakończeniach c4. Każda tabela mapuje wprost na bieżące kroki.
      const map = typeof STORY_MIGRATIONS_V9 !== 'undefined' && STORY_MIGRATIONS_V9[saved.chapter];
      if (map && Number.isInteger(saved.pc) && map.exact[saved.pc] != null) {
        saved.pc = (saved.pending ? map.exact : map.resume)[saved.pc];
      }
      saved.v = 11;
    }
    if (saved.v < 10) {
      // v10: brakujące reakcje na wybory w prologu, ch1 i ch4.
      const map = typeof STORY_MIGRATIONS_V10 !== 'undefined' && STORY_MIGRATIONS_V10[saved.chapter];
      if (map && Number.isInteger(saved.pc) && map.exact[saved.pc] != null) {
        saved.pc = (saved.pending ? map.exact : map.resume)[saved.pc];
      }
      saved.v = 11;
    }
    if (saved.v < 11) {
      // v11: S5 pamięta, kogo gracz uprzedził w S4 (Ola, Weronika, Zenon).
      const map = typeof STORY_MIGRATIONS_V11 !== 'undefined' && STORY_MIGRATIONS_V11[saved.chapter];
      if (map && Number.isInteger(saved.pc) && map.exact[saved.pc] != null) {
        saved.pc = (saved.pending ? map.exact : map.resume)[saved.pc];
      }
      saved.v = 11;
    }
    // Jeden zredagowany SMS jest jednocześnie dowodem i częścią kopii Mai.
    // Odświeżamy wyłącznie znany tekst startowy, bez zmiany id, czasu i postępu.
    if (typeof DATA !== 'undefined' && DATA.storyTexts) {
      const first = saved.chats?.maja?.msgs?.find(m => m.id === 'm0' && m.from === 'maja' && m.text === DATA.storyTexts.legacyFirstMajaSMS);
      if (first) first.text = DATA.storyTexts.firstMajaSMS;
    }
    return saved;
  }
  let settings = Object.assign({}, defaults);
  try { Object.assign(settings, JSON.parse(store.get(SKEY) || '{}')); } catch (e) { /* uszkodzone ustawienia */ }

  const api = {
    s: null,
    settings,
    viewing: null,
    saveSettings() { store.set(SKEY, JSON.stringify(settings)); BUS.emit('settings'); },

    newGame(player) { api.s = fresh(player); api.save(true); BUS.emit('game-reset'); },
    hasSave() { return !!store.get(KEY); },
    load() {
      const raw = store.get(KEY);
      if (!raw) return false;
      try { api.s = Object.assign(fresh(), migrate(JSON.parse(raw))); api.s.clock.at = Date.now(); api.s.clock.paused = document.hidden; return true; }
      catch (e) { console.warn('Zapis uszkodzony', e); store.set(KEY + '.corrupt', raw); return false; }
    },
    wipe() { store.del(KEY); store.keys().filter(k => k.startsWith(CP)).forEach(store.del); api.s = null; BUS.emit('game-reset'); },

    _t: null,
    save(now) {
      if (!api.s) return;
      clearTimeout(api._t);
      const doSave = () => {
        const s = api.s; if (!s) return;
        s.clock.t = api.now(); s.clock.at = Date.now();
        const json = JSON.stringify(s);
        if (store.set(KEY, json)) return;
        // Brak miejsca: usuń najstarsze punkty kontrolne (zapis bieżący jest ważniejszy) i spróbuj ponownie.
        for (const k of store.keys().filter(k => k.startsWith(CP)).sort()) { store.del(k); if (store.set(KEY, json)) return; }
        store.del(KEY + '.corrupt');
        if (!store.set(KEY, json)) console.warn('Nie udało się zapisać gry (brak miejsca)');
      };
      if (now) doSave(); else api._t = setTimeout(doSave, 250);
    },
    checkpoint(ch) {
      const c = U.clone(api.s);
      c.clock.t = api.now();
      store.set(CP + ch, JSON.stringify(c));
    },
    checkpoints() {
      const out = {};
      store.keys().filter(k => k.startsWith(CP)).forEach(k => { out[k.slice(CP.length)] = true; });
      return out;
    },
    loadCheckpoint(ch) {
      const raw = store.get(CP + ch); if (!raw) return false;
      let cp; try { cp = migrate(JSON.parse(raw)); } catch (e) { console.warn('Punkt kontrolny uszkodzony', e); store.del(CP + ch); return false; }
      const keepEndings = api.s ? api.s.endings : [];
      const keepArchive = api.s ? U.clone(api.s.seasonArchive || {}) : {};
      const keepPacing = api.s?.pacing ? U.clone(api.s.pacing) : null;
      api.s = Object.assign(fresh(), cp);
      api.s.endings = [...new Set([...(api.s.endings || []), ...keepEndings])];
      api.s.seasonArchive = Object.assign({}, api.s.seasonArchive, keepArchive);
      if (keepPacing) { delete keepPacing.waiting; api.s.pacing = keepPacing; }
      api.s.clock.at = Date.now(); api.s.clock.paused = document.hidden; api.save(true); return true;
    },

    // Zegar fabularny płynie w czasie rzeczywistym od ostatniego ustawienia.
    now() { const c = api.s.clock; return c.t + (c.paused ? 0 : Date.now() - c.at); },
    pauseClock() { if (api.s && !api.s.clock.paused) api.s.clock = { t: api.now(), at: Date.now(), paused: true }; },
    resumeClock() { if (api.s?.clock.paused && !(api.s.pacing?.mode === 'daily' && Math.max(api.s.pacing.waiting?.at || 0, api.s.pacing.rest?.at || 0) > Date.now())) { api.s.clock.at = Date.now(); api.s.clock.paused = false; } },
    setClock(iso) { api.s.clock = { t: typeof iso === 'number' ? iso : U.parseLocal(iso), at: Date.now(), paused: !!document.hidden }; BUS.emit('clock'); },

    chat(id) {
      const c = api.s.chats;
      if (!c[id]) c[id] = { msgs: [], unread: 0 };
      return c[id];
    },
    post(chatId, msg) {
      const c = api.chat(chatId);
      msg.id = msg.id || U.uid();
      msg.t = msg.t || api.now();
      c.msgs.push(msg);
      if (api.viewing !== chatId && msg.from !== 'me' && msg.from !== 'sys') c.unread++;
      c.last = msg.t;
      BUS.emit('msg', { chat: chatId, msg });
      api.change();
      return msg;
    },
    markRead(chatId) {
      const c = api.chat(chatId);
      if (c.unread) { c.unread = 0; BUS.emit('badges'); api.save(); }
    },
    unreadTotal() {
      let n = 0;
      for (const id in api.s.chats) if (api.isUnlocked('chat:' + id)) n += api.s.chats[id].unread || 0;
      return n;
    },

    has(ev) { return !!api.s.ev[ev]; },
    addEv(ev, quiet) {
      if (api.s.ev[ev]) return false;
      api.s.ev[ev] = { t: api.now(), fresh: true };
      const def = DATA.evidence[ev];
      if (def && def.tl) api.s.tl[ev] = true;
      if (def && def.person) api.s.seen['person:' + def.person] = true;
      if (!quiet) BUS.emit('evidence', ev);
      BUS.emit('badges');
      api.change();
      return true;
    },
    ev(id) {
      const base = DATA.evidence[id];
      if (!base) return null;
      return Object.assign({ id }, base, api.s.evx[id] || {});
    },
    freshEvidence() { return Object.values(api.s.ev).filter(e => e.fresh).length; },

    unlock(key) { if (!api.s.unlocked[key]) { api.s.unlocked[key] = true; BUS.emit('unlock', key); BUS.emit('badges'); api.change(); } },
    lock(key) { delete api.s.unlocked[key]; BUS.emit('unlock', key); api.change(); },
    isUnlocked(key) { return !!api.s.unlocked[key]; },

    flag(k) { return !!api.s.flags[k]; },
    setFlag(k, v = true) { api.s.flags[k] = v; api.change(); },
    v(k) { return api.s.vars[k] || 0; },
    setVar(k, val) { api.s.vars[k] = val; api.change(); },
    inc(k, n = 1) { api.s.vars[k] = (api.s.vars[k] || 0) + n; api.change(); },

    seen(key) { return !!api.s.seen[key]; },
    markSeen(key) { if (!api.s.seen[key]) { api.s.seen[key] = true; BUS.emit('badges'); api.change(); } },

    solve(id) {
      if (!api.s.solved[id]) {
        api.s.solved[id] = true;
        const reward = DATA.deductions[id] && DATA.deductions[id].reward;
        if (reward) api.addEv(reward);
        BUS.emit('solved', id); api.change();
      }
    },

    // Warunki dla kroków skryptu: funkcja albo krótki zapis tekstowy.
    test(cond) {
      if (cond == null) return true;
      if (Array.isArray(cond)) return cond.every(api.test);
      if (typeof cond === 'function') return !!cond(api.s, api);
      let neg = false, c = String(cond);
      if (c[0] === '!') { neg = true; c = c.slice(1); }
      const i = c.indexOf(':');
      const kind = c.slice(0, i), key = c.slice(i + 1);
      let r;
      switch (kind) {
        case 'ev': r = api.has(key); break;
        case 'flag': r = api.flag(key); break;
        case 'solved': r = !!api.s.solved[key]; break;
        case 'unlocked': r = api.isUnlocked(key); break;
        case 'seen': r = api.seen(key); break;
        case 'hot': r = !!api.s.hot[key]; break;
        case 'var': { const m = key.match(/^(\w+)\s*(>=|<=|>|<|==)\s*(-?\d+)$/); const a = api.v(m[1]), b = +m[3]; r = { '>=': a >= b, '<=': a <= b, '>': a > b, '<': a < b, '==': a === b }[m[2]]; break; }
        default: r = false;
      }
      return neg ? !r : r;
    },
    change() { BUS.emit('change'); api.save(); }
  };

  window.addEventListener('pagehide', () => { api.pauseClock(); api.save(true); });
  window.addEventListener('pageshow', () => { if (!document.hidden) api.resumeClock(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { api.pauseClock(); api.save(true); } else api.resumeClock(); });
  return api;
})();
