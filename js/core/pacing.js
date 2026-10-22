'use strict';
/* Zegar publikacji jest zegarem kalendarza gracza, nie zegarem wydarzeń.
   Obecne wydanie jest pięciodniowym pilotem. Docelowe 30 dni wymaga większej treści. */
const SeasonPacing = (() => {
  const days = { prolog: 0, ch1: 0, ch2: 1, ch3: 2, ch4: 3, ch5: 3, epilog: 4 };
  let installed = false;
  const state = () => G.s?.pacing;
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
    if (mode === 'free') { delete G.s.pacing.waiting; if (old?.waiting) G.s.objective = null; if (!document.hidden) G.resumeClock(); }
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
    if (state()?.waiting && (state().mode !== 'daily' || release(G.s.chapter) <= Date.now())) Engine.run();
    NativeNotifications.sync();
  }
  function init() {
    if (installed) return; installed = true;
    setInterval(() => { if (state()?.waiting && !document.hidden && release(G.s.chapter) <= Date.now()) Engine.run(); }, 15000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) wake(); });
    BUS.on('pacing', () => { wake(); if (G.s && G.s.pc === 0) Engine.run(); });
    BUS.on('game:ready', wake); BUS.on('game-reset', () => NativeNotifications.sync());
  }
  return { state, release, configure, hold, init, wake, days };
})();

const NativeNotifications = (() => {
  const cap = window.Capacitor, native = !!cap?.isNativePlatform(), id = 7001;
  const plugin = native ? cap.registerPlugin('LocalNotifications') : null;
  let chain = Promise.resolve(), openRequested = false;
  function sync() {
    if (!plugin) return Promise.resolve();
    chain = chain.catch(() => {}).then(async () => {
      const p = SeasonPacing.state(), waiting = p?.waiting;
      await plugin.cancel({ notifications: [{ id }] });
      if (!p?.notify || p.mode !== 'daily' || !waiting || waiting.at <= Date.now()) return;
      // schedule() od 8.3 może samo pytać o zgodę. Tu zawsze sprawdzamy ją wcześniej.
      if ((await plugin.checkPermissions()).display !== 'granted') return;
      if (cap.getPlatform() === 'android') await plugin.createChannel({ id: 'story', name: 'Rozmowy w Mglisku', description: 'Dostępność następnej części historii', importance: 3 });
      await plugin.schedule({ notifications: [{ id, title: 'Mglisko · Wiadomości', body: 'Kolejna część rozmów jest dostępna. Wróć, kiedy masz chwilę.',
        channelId: 'story', schedule: { at: new Date(waiting.at) }, isExactNotification: false, extra: { season: 's1', chapter: waiting.chapter } }] });
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
