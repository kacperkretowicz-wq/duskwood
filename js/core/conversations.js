'use strict';
/* Rozmowy opcjonalne mają własny zapis; nie zmieniają pc ani pending głównego skryptu. */
const Conversations = (() => {
  const all = () => Object.entries(DATA.conversations).filter(([, d]) => G.test(d.cond));
  const state = id => G.s.conversations && G.s.conversations[id];
  function available(who) { return all().filter(([id, d]) => (!who || d.who === who) && !state(id)?.done); }
  function open(id) {
    const d = DATA.conversations[id];
    if (!d || !G.test(d.cond)) return null;
    G.s.conversations ||= {};
    if (!state(id)) {
      G.s.conversations[id] = { node: 'start', transcript: [], choices: [], done: false, started: G.now() };
      (d.nodes.start.lines || []).forEach(text => state(id).transcript.push({ from: d.who, text, t: G.now() }));
      if (d.who === 'lena') G.s.flags.metLena = true;
      G.change();
    }
    return state(id);
  }
  function answer(id, node, index) {
    const d = DATA.conversations[id], s = state(id);
    if (!d || !G.test(d.cond) || !s || s.done || s.node !== node) return false;
    const choice = d.nodes[node]?.choices[index];
    if (!choice) return false;
    s.transcript.push({ from: 'me', text: choice.text, t: G.now() });
    choice.replies.forEach(text => s.transcript.push({ from: d.who, text, t: G.now() }));
    s.choices.push({ node, index });
    if (choice.trust) G.s.vars['trust_' + d.who] = G.v('trust_' + d.who) + choice.trust;
    s.node = choice.next;
    if (!s.node) {
      s.done = true;
      (d.reward || []).forEach(ev => G.addEv(ev, true));
      if (d.deduction) G.unlock('ded:' + d.deduction);
      const photo = d.reward?.map(ev => DATA.evidence[ev]).find(e => e.img);
      if (photo && !G.s.saved.some(item => item.art === photo.img)) G.s.saved.push({ art: photo.img, t: G.now() });
    } else (d.nodes[s.node].lines || []).forEach(text => s.transcript.push({ from: d.who, text, t: G.now() }));
    // Trwały zapis przed animacją. Zamknięcie aplikacji nie gubi wybranego węzła.
    G.save(true);
    BUS.emit('conversations', id); BUS.emit('evidence'); BUS.emit('badges'); G.change();
    return true;
  }
  return { all, state, available, open, answer };
})();
