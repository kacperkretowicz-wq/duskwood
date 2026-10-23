'use strict';
/* Rozmowy opcjonalne mają własny zapis; nie zmieniają pc ani pending głównego skryptu. */
const Conversations = (() => {
  const all = () => Object.entries(DATA.conversations).filter(([id, d]) => G.test(d.cond) || state(id));
  const state = id => G.s.conversations && G.s.conversations[id];
  const lines = value => (typeof value === 'function' ? value(G.s) : value) || [];
  function enter(d, s, node) {
    lines(node.lines).forEach(text => s.transcript.push({ from: d.who, text, t: G.now() }));
    (node.attachments || []).forEach(img => {
      s.transcript.push({ from: d.who, img, t: G.now() });
      if (!G.s.saved.some(item => item.art === img)) G.s.saved.push({ art: img, t: G.now() });
    });
  }
  function available(who) { return all().filter(([id, d]) => G.test(d.cond) && (!who || d.who === who) && !state(id)?.done); }
  function open(id) {
    const d = DATA.conversations[id];
    if (!d || (!G.test(d.cond) && !state(id))) return null;
    G.s.conversations ||= {};
    if (!state(id)) {
      G.s.conversations[id] = { node: 'start', transcript: [], choices: [], done: false, started: G.now() };
      enter(d, state(id), d.nodes.start);
      if (d.who === 'lena') G.s.flags.metLena = true;
      G.change();
    }
    return state(id);
  }
  function answer(id, node, index) {
    const d = DATA.conversations[id], s = state(id);
    if (!d || !G.test(d.cond) || !s || s.done || s.node !== node) return false;
    const choice = d.nodes[node]?.choices[index];
    if (!choice || !G.test(choice.cond)) return false;
    s.transcript.push({ from: 'me', text: choice.text, t: G.now() });
    choice.replies.forEach(text => s.transcript.push({ from: d.who, text, t: G.now() }));
    s.choices.push({ node, index });
    if (choice.trust) G.s.vars['trust_' + d.who] = G.v('trust_' + d.who) + choice.trust;
    // Skutki wyboru i zapis rozmowy stanowią jedną transakcję. Odtworzenie
    // animacji po ponownym uruchomieniu nie nalicza ich drugi raz.
    Object.assign(G.s.flags, choice.set || {});
    Object.entries(choice.inc || {}).forEach(([key, n]) => { G.s.vars[key] = G.v(key) + n; });
    (choice.reward || []).forEach(ev => G.addEv(ev, true));
    s.node = choice.next;
    if (!s.node) {
      s.done = true;
      (d.reward || []).forEach(ev => G.addEv(ev, true));
      if (d.deduction) G.unlock('ded:' + d.deduction);
      const photo = d.reward?.map(ev => DATA.evidence[ev]).find(e => e.img);
      if (photo && !G.s.saved.some(item => item.art === photo.img)) G.s.saved.push({ art: photo.img, t: G.now() });
    } else enter(d, s, d.nodes[s.node]);
    // Trwały zapis przed animacją. Zamknięcie aplikacji nie gubi wybranego węzła.
    G.save(true);
    BUS.emit('conversations', id); BUS.emit('evidence'); BUS.emit('badges'); G.change();
    return true;
  }
  return { all, state, available, open, answer };
})();
