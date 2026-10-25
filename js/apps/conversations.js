'use strict';
/* Kameralne rozmowy na osobności i materiały dodatkowego śledztwa. */
(() => {
  const { h } = U;
  UI.openConversations = function (who) {
    const body = h('div', { class: 'side-list' });
    body.append(h('p', { class: 'side-intro' }, 'Możesz zapytać o coś więcej niż kolejną wskazówkę. Te rozmowy zapisują się osobno; wrócisz do nich, kiedy zechcesz.'));
    const items = Conversations.all().filter(([, d]) => !who || d.who === who);
    if (!items.length) body.append(h('p', { class: 'side-empty' }, 'Kolejne tematy pojawią się, gdy lepiej poznasz tych ludzi i znajdziesz nowe materiały.'));
    items.forEach(([id, d]) => {
      const s = Conversations.state(id), c = DATA.chars[d.who];
      const row = h('button', { class: 'side-lead', onclick: () => { sheet.close(true); UI.openConversation(id); } },
        UI.avatar(d.who), h('div', {}, h('small', {}, `${c.short} · ${s?.done || !G.test(d.cond) ? 'Zapis rozmowy' : s ? 'Wróć do rozmowy' : d.label}`),
          h('b', {}, d.title), h('span', {}, d.preview)), U.ico('back', 15));
      body.append(row);
    });
    const sheet = UI.sheet({ title: who ? DATA.chars[who].name : 'Na osobności', body, cls: 'side-sheet' });
  };

  UI.openConversation = function (id) {
    const s = Conversations.open(id); if (!s) return;
    const save = G.s, d = DATA.conversations[id], c = DATA.chars[d.who];
    let timer = null, closed = false, busy = false, visible = s.transcript.length;
    const transcript = h('div', { class: 'side-transcript', role: 'log', 'aria-label': 'Zapis rozmowy', 'aria-live': 'polite' });
    const actions = h('div', { class: 'side-actions' });
    const body = h('div', { class: 'side-dialogue' },
      h('div', { class: 'side-person' }, UI.avatar(d.who), h('div', {}, h('b', {}, c.name), h('span', {}, `${c.age} lat · ${c.role}`))),
      transcript, actions);
    const sh = UI.sheet({ title: d.title, body, cls: 'side-sheet', onClose: () => { closed = true; clearTimeout(timer); cleanup(); } });
    const cleanup = BUS.on('change', () => { if (G.s !== save || !G.test(d.cond)) sh.close(true); });
    function render() {
      transcript.innerHTML = '';
      s.transcript.slice(0, visible).forEach(m => transcript.append(h('div', { class: 'side-message' + (m.from === 'me' ? ' mine' : '') },
        h('small', {}, m.from === 'me' ? 'Ty' : c.short), m.img ? h('button', { class: 'side-photo', onclick: () => UI.viewImage(m.img), 'aria-label': 'Otwórz zdjęcie: ' + Art.get(m.img).title }, h('img', { src: Art.url(m.img), alt: Art.get(m.img).title }), h('span', {}, Art.get(m.img).title)) : UI.textOrVoice(m.text, m.from === 'me' ? 'me' : d.who))));
      actions.innerHTML = '';
      if (busy) { actions.append(h('p', { class: 'side-typing', role: 'status' }, /^voice:/.test(s.transcript[visible]?.text || '') ? `${c.short} nagrywa wiadomość głosową…` : `${c.short} pisze…`)); return; }
      if (s.done) {
        actions.append(h('p', { class: 'side-complete' }, 'Rozmowa zapisana. Możesz do niej wrócić.'));
        if (d.deduction) {
          const solved = !!G.s.solved[d.deduction];
          actions.append(h('button', { class: 'btn pri wide', onclick: () => { sh.close(true); UI.openApp('notes', { ded: d.deduction, note: 'questions' }); } }, solved ? 'Zobacz zapisany wniosek' : 'Porównaj materiały w Notatkach'));
        }
        const attachments = [...new Set([...(d.reward || []), ...s.choices.flatMap(({ node, index }) => d.nodes[node].choices[index].reward || [])])];
        if (attachments.length) {
          const ev = h('div', { class: 'side-attachments' });
          attachments.filter(id => G.has(id)).forEach(id => ev.append(h('button', { onclick: () => { const e = G.ev(id); if (e.img) UI.viewImage(e.img, { title: e.title }); else UI.evSheet(id); } }, U.ico('clip', 14), G.ev(id).title)));
          actions.append(ev);
        }
        return;
      }
      if (!G.test(d.cond)) {
        actions.append(h('p', { class: 'side-complete' }, 'Zapis archiwalny. Nie możesz już odpowiedzieć w tej rozmowie.'));
        return;
      }
      actions.append(h('small', { class: 'side-label' }, 'TWOJA ODPOWIEDŹ'));
      d.nodes[s.node].choices.forEach((choice, index) => { if (!G.test(choice.cond)) return; actions.append(h('button', { class: 'side-choice', onclick: () => {
        if (busy || closed) return;
        const before = s.transcript.length;
        if (!Conversations.answer(id, s.node, index)) return;
        SFX.play.tap(); busy = true; visible = before + 1; render(); reveal();
      } }, h('span', {}, U.tpl(choice.text), choice.detail ? h('small', {}, choice.detail) : null), U.ico('send', 15))); });
    }
    function reveal() {
      const duration = G.settings.speed === 'instant' ? 25 : G.settings.speed === 'fast' ? 350 : Math.min(1800, 450 + (s.transcript[visible]?.text?.length || 0) * 12);
      timer = setTimeout(() => {
        if (closed || G.s !== save) return;
        visible++; busy = visible < s.transcript.length; render();
        const scroll = body.closest('.sh-b'); if (scroll) scroll.scrollTop = scroll.scrollHeight;
        if (busy) reveal();
      }, duration);
    }
    render();
  };
})();
