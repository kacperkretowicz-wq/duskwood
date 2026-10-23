'use strict';
/* Zegar publikacji jest zegarem kalendarza gracza, nie zegarem wydarzeń.
   Obecne wydanie jest pięciodniowym pilotem. Docelowe 30 dni wymaga większej treści. */
const SeasonPacing = (() => {
  const days = { prolog: 0, ch1: 0, ch2: 1, ch3: 2, ch4: 3, ch5: 3, epilog: 4 };
  let installed = false;
  const LATE = 4 * 3600000;
  const state = () => G.s?.pacing;
  // Okno może przechodzić przez północ, np. [22, 26] = 22:00–02:00.
  // setHours/setDate zachowują lokalną strefę również przy zmianie czasu.
  function nextWindow(time, window) {
    const d = new Date(time), [start, end] = window;
    const hour = d.getHours() + d.getMinutes() / 60;
    if (end > 24 ? hour >= start || hour < end - 24 : hour >= start && hour < end) return time;
    if (hour >= end) d.setDate(d.getDate() + 1);
    d.setHours(start, 0, 0, 0);
    return d.getTime();
  }
  function finishRest(restoreGoal = true) {
    const p = state(), r = p?.rest;
    if (!r) return;
    p.restDone ||= {}; p.restDone[r.id] = true;
    // P3: gracz wrócił długo po terminie (np. rano po nocnej przerwie). Scena może to zauważyć, bez kary.
    if (restoreGoal && Date.now() - r.at >= LATE) G.setFlag('rano_' + r.id);
    if (restoreGoal) G.s.objective = r.goal || null;
    delete p.rest;
    if (!document.hidden) G.resumeClock();
    G.save(true); BUS.emit('goal'); BUS.emit('release'); NativeNotifications.sync();
  }
  function holdRest(step) {
    const p = state();
    if (!p) return false;
    // Stary checkpoint, skok debug lub inny sezon nie dziedziczy obcej przerwy.
    if (p.rest && (p.rest.chapter !== G.s.chapter || p.rest.pc !== G.s.pc)) finishRest(false);
    const def = DATA.rests?.[step.rest];
    if (!def || p.mode !== 'daily' || p.restDone?.[step.rest]) {
      if (p.rest) finishRest();
      return false;
    }
    if (!p.rest) {
      p.rest = { id: step.rest, chapter: G.s.chapter, pc: G.s.pc,
        at: nextWindow(Date.now() + def.hours * 3600000, def.window), goal: G.s.objective };
      G.s.objective = { text: def.goal, hints: [], level: 0 };
      G.pauseClock(); G.save(true); BUS.emit('goal'); BUS.emit('release'); NativeNotifications.sync();
    }
    if (p.rest.at > Date.now()) { G.pauseClock(); return true; }
    finishRest(); return false;
  }
  function release(chapter) {
    const p = state(); if (!p || p.mode !== 'daily' || p.granted?.includes(chapter)) return 0;
    if (chapter === 'ch5' && (G.s.done?.ch4 || p.granted?.includes('ch4'))) return 0;
    const day = days[chapter]; if (day == null) return 0;
    const d = new Date(p.anchor); d.setDate(d.getDate() + day); d.setHours(p.hour, p.minute, 0, 0); return d.getTime();
  }
  function configure(mode, time = '18:00') {
    if (!G.s || !['free', 'daily'].includes(mode) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return false;
    const [hour, minute] = time.split(':').map(Number), old = state();
    const order = Seasons.current().chapters, index = order.indexOf(G.s.chapter);
    const anchor = old?.anchor || (() => { const d = new Date(); d.setDate(d.getDate() - (days[G.s.chapter] || 0)); return d.getTime(); })();
    const reached = old?.waiting?.chapter === G.s.chapter && G.s.pc === 0 ? index : index + 1;
    const granted = [...new Set([...(old?.granted || []), ...order.slice(0, Math.max(2, reached))])];
    if (granted.includes('ch4') && !granted.includes('ch5')) granted.push('ch5');
    G.s.pacing = { ...old, mode, anchor, hour, minute, granted };
    if (mode === 'free') { delete G.s.pacing.waiting; if (old?.waiting) G.s.objective = null; finishRest(); if (!document.hidden) G.resumeClock(); }
    G.save(true); BUS.emit('pacing'); return true;
  }
  function hold(chapter) {
    const at = release(chapter), p = state();
    if (at && at > Date.now()) {
      G.pauseClock();
      if (p.waiting?.chapter !== chapter || p.waiting.at !== at) {
        p.waiting = { chapter, at };
        G.s.objective = { text: 'Kolejna rozmowa pojawi się w wybranym rytmie. Termin i tempo możesz zmienić w Ustawieniach → Sezony i sesje.', hints: [], level: 0 };
        G.save(true); BUS.emit('goal'); BUS.emit('release'); NativeNotifications.sync();
      }
      return true;
    }
    if (p?.waiting) { delete p.waiting; G.s.objective = null; if (!document.hidden) G.resumeClock(); G.save(true); NativeNotifications.sync(); BUS.emit('release'); }
    return false;
  }
  function wake() {
    if (document.hidden || !G.s) return;
    const p = state();
    if (p?.waiting && (p.mode !== 'daily' || release(G.s.chapter) <= Date.now()) || p?.rest && (p.mode !== 'daily' || p.rest.at <= Date.now())) Engine.run();
    NativeNotifications.sync();
  }
  function init() {
    if (installed) return; installed = true;
    setInterval(() => {
      const p = state();
      if (!document.hidden && (p?.waiting && release(G.s.chapter) <= Date.now() || p?.rest && p.rest.at <= Date.now())) wake();
    }, 15000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) wake(); });
    BUS.on('pacing', () => { wake(); if (G.s && (G.s.pc === 0 || state()?.restDone)) Engine.run(); });
    BUS.on('game:ready', wake); BUS.on('game-reset', () => NativeNotifications.sync());
  }
  return { state, release, configure, hold, holdRest, nextWindow, init, wake, days };
})();

const NativeNotifications = (() => {
  const cap = window.Capacitor, native = !!cap?.isNativePlatform(), id = 7001;
  const plugin = native ? cap.registerPlugin('LocalNotifications') : null;
  let chain = Promise.resolve(), openRequested = false;
  function sync() {
    if (!plugin) return Promise.resolve();
    chain = chain.catch(() => {}).then(async () => {
      const p = SeasonPacing.state(), waiting = p?.rest || p?.waiting;
      await plugin.cancel({ notifications: [{ id }] });
      if (!p?.notify || p.mode !== 'daily' || !waiting || waiting.at <= Date.now()) return;
      // schedule() od 8.3 może samo pytać o zgodę. Tu zawsze sprawdzamy ją wcześniej.
      if ((await plugin.checkPermissions()).display !== 'granted') return;
      if (cap.getPlatform() === 'android') await plugin.createChannel({ id: 'story', name: 'Rozmowy w Mglisku', description: 'Dostępność następnej części historii', importance: 3 });
      await plugin.schedule({ notifications: [{ id, title: 'Quiet Is Safer · Wiadomości', body: 'Kolejna część rozmów jest dostępna. Wróć, kiedy masz chwilę.',
        channelId: 'story', schedule: { at: new Date(waiting.at) }, isExactNotification: false, extra: { season: G.s.seasonId || 's1', chapter: waiting.chapter } }] });
    }).catch(e => { console.warn('Powiadomienia:', e.message); });
    return chain;
  }
  async function enable() {
    if (!plugin || !G.s) return false;
    try {
      const result = await plugin.requestPermissions();
      if (result.display !== 'granted') return false;
      G.s.pacing ||= { mode: 'free' }; G.s.pacing.notify = true; G.save(true); await sync(); return true;
    } catch (e) { console.warn('Zgoda na powiadomienia:', e.message); return false; }
  }
  function disable() { if (G.s?.pacing) { G.s.pacing.notify = false; G.save(true); } return sync(); }
  function navigate() {
    if (!G.s || document.querySelector('.title-scr:not(.out)')) { openRequested = true; return; }
    openRequested = false; SeasonPacing.wake(); UI.openApp('messages');
  }
  if (plugin) plugin.addListener('localNotificationActionPerformed', event => {
    if (event.notification.id === id) navigate();
  }).catch(e => console.warn('Obsługa powiadomień:', e.message));
  BUS.on('game:ready', () => { if (openRequested) navigate(); });
  return { native, sync, enable, disable };
})();
