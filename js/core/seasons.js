'use strict';
const Seasons = (() => {
  const current = () => DATA.seasons.find(s => s.id === (G.s?.seasonId || 's1') && s.released) || DATA.seasons[0];
  function progress() {
    const season = current(), rank = season.chapters.indexOf(G.s.chapter);
    let reached = false;
    // Prolog „Adres na paczce” istnieje tylko w gałęzi po Ciszy.
    const cisza = (G.s.vars.s1Ending || G.s.vars.endingId) === 'cisza';
    return season.episodes.filter(ep => ep.chapter !== 'mp' || cisza).map((ep, i) => {
      const chapterRank = season.chapters.indexOf(ep.chapter);
      const done = !!G.s.finished || rank > chapterRank || !!G.s.done[ep.chapter] || G.test(ep.done);
      // Istniejące zapisy mogą pochodzić z dowolnego rozdziału. Późniejszy znany etap
      // nie odsłania tytułów wcześniejszych, nieprzeżytych zakończeń.
      const available = done || (!reached && rank >= chapterRank);
      if (!done && available) reached = true;
      return { ...ep, number: i + 1, done, available };
    });
  }
  function ensure() {
    G.s.seasonId ||= 's1'; G.s.seasons ||= {};
    const season = current();
    return G.s.seasons[season.id] ||= { revision: season.revision, sessions: [], firstPlayed: G.s.started || Date.now() };
  }
  function saveSession() {
    if (!G.s) return false;
    const s = ensure();
    const snapshot = {
      at: Date.now(), chapter: G.s.chapter, pc: G.s.pc,
      goal: G.s.objective?.text || 'Sprawdź wiadomości i Notatki.',
      evidence: Object.keys(G.s.ev), completed: progress().filter(ep => ep.done).map(ep => ep.id)
    };
    const last = s.sessions.at(-1);
    // Wielokrotne dotknięcie bez nowego postępu aktualizuje jeden zapis.
    if (last && last.chapter === snapshot.chapter && last.pc === snapshot.pc && JSON.stringify(last.evidence) === JSON.stringify(snapshot.evidence) && JSON.stringify(last.completed) === JSON.stringify(snapshot.completed)) s.sessions[s.sessions.length - 1] = snapshot;
    else s.sessions.push(snapshot);
    G.save(true); BUS.emit('season'); return snapshot;
  }
  function recap() {
    const entry = G.s?.seasons?.[current().id], last = entry?.sessions.at(-1);
    if (!last) return null;
    const previous = entry.sessions.at(-2);
    return { ...last, found: last.evidence.filter(id => !previous?.evidence.includes(id)).map(id => G.ev(id)).filter(Boolean) };
  }
  function archive() {
    const id = current().id, endingId = G.s?.vars[id + 'Ending'] || G.s?.vars.endingId;
    if (!G.s?.finished || !endingId) return false;
    G.s.seasonArchive ||= {};
    const old = G.s.seasonArchive[id] || { endings: [] };
    G.s.seasonArchive[id] = { revision: current().revision, finishedAt: Date.now(), endings: [...new Set([...old.endings, endingId])],
      outcome: { ending: endingId, majaFound: G.flag('majaFound'), gajdaCaught: G.flag('gajdaCaught'),
        reportBoth: G.flag('reportBoth'), igorForgiven: G.flag('igorForgiven'), leszekTestify: G.flag('leszekTestify'),
        trust: Object.fromEntries(['kuba', 'ola', 'bartek', 'igor', 'weronika'].map(id => [id, G.v('trust_' + id)])) } };
    G.save(true); return true;
  }
  // Kolejna sprawa w tym samym zapisie: zostają czaty, Notatki, flagi i relacje z S1.
  function nextCase() {
    const i = DATA.seasons.findIndex(x => x.id === current().id), next = DATA.seasons[i + 1];
    return next && next.released ? next : null;
  }
  function canStartNext() {
    if (!G.s?.finished || !nextCase()) return false;
    const ending = G.s.vars.endingId || G.s.seasonArchive?.[current().id]?.outcome?.ending;
    return ending === 'swit' || ending === 'odlamki' || (ending === 'cisza' && nextCase().chapters.includes('mp'));
  }
  function startNext() {
    if (!canStartNext()) return false;
    archive();
    const next = nextCase();
    const first = G.s.vars.endingId === 'cisza' ? 'mp' : next.chapters.find(c => c !== 'mp');
    Object.assign(G.s, { seasonId: next.id, chapter: first, pc: 0, finished: false, pending: null, objective: null, call: null });
    G.s.vars.s1Ending = G.s.vars.endingId;
    G.checkpoint(first); G.save(true); BUS.emit('season');
    return true;
  }
  return { current, progress, saveSession, recap, archive, nextCase, canStartNext, startNext };
})();
