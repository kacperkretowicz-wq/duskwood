'use strict';
/* Wiadomości: lista rozmów i czat z wyborami, odpowiedziami tekstowymi i dowodami. */

(() => {
  const { h, $ } = U;

  const chatName = id => (G.s.chats[id] && G.s.chats[id].name) || (DATA.chats[id] && DATA.chats[id].name) || id;
  const chatAv = id => (G.s.chats[id] && G.s.chats[id].avatar) || (DATA.chats[id] && DATA.chats[id].avatar) || id;
  const charName = w => (DATA.chars[w] && (DATA.chars[w].short || DATA.chars[w].name)) || w;
  const pendingFor = id => { const p = Engine.pending(); return p && p.chat === id ? p : null; };

  function stamp(t) {
    const now = G.now();
    if (U.sameDay(t, now)) return U.time(t);
    if (now - t < 6 * 864e5) return U.dayShort(t).split(',')[0];
    return U.dateNum(t).slice(0, 5);
  }

  UI.def('messages', {
    name: 'Wiadomości',
    badge: () => {
      const n = G.unreadTotal();
      const p = Engine.pending();
      return n || (p && p.chat && p.chat !== 'call' ? 'dot' : 0);
    },
    mount(host, params) {
      const stack = new UI.Stack(host);
      stack.push(listPage(stack));
      if (params.chat) stack.push(chatPage(stack, params.chat));
      return {
        back: () => stack.pop(),
        onParams(p) {
          if (!p || !p.chat) return;
          const t = stack.top();
          if (t.chat === p.chat) return;
          stack.popTo(1);
          stack.push(chatPage(stack, p.chat));
        },
        destroy: () => { stack.destroy(); G.viewing = null; }
      };
    }
  });

  /* ---------- lista rozmów ---------- */
  function listPage(stack) {
    const pg = UI.page({ title: 'Wiadomości', big: true });
    const list = h('div', { class: 'chatlist' });
    pg.body.appendChild(list);
    function render() {
      const ids = Object.keys(DATA.chats).filter(id => G.isUnlocked('chat:' + id))
        .sort((a, b) => ((G.s.chats[b] && G.s.chats[b].last) || 0) - ((G.s.chats[a] && G.s.chats[a].last) || 0));
      list.innerHTML = '';
      if (!ids.length) { list.appendChild(h('div', { class: 'empty', html: U.icon('chat', 40) + 'Brak wiadomości' })); return; }
      ids.forEach(id => {
        const c = G.chat(id);
        const last = c.msgs[c.msgs.length - 1];
        const typing = Engine.typing(id);
        const p = pendingFor(id);
        let prev = '';
        if (typing) prev = h('span', { class: 'typ' }, DATA.chats[id].group ? `${charName(typing)} pisze…` : 'pisze…');
        else if (last) {
          const who = last.from === 'me' ? 'Ty: ' : (DATA.chats[id].group && last.from !== 'sys' ? charName(last.from) + ': ' : '');
          prev = who + UI.preview(last);
        }
        list.appendChild(h('button', { class: 'crow' + (c.unread ? ' unread' : '') + (DATA.chats[id].glitch ? ' glitchy' : ''), onclick: () => stack.push(chatPage(stack, id)) },
          UI.avatar(chatAv(id)),
          h('div', { class: 'cm' },
            h('div', { class: 'ct' }, h('b', {}, chatName(id)), h('span', {}, last ? stamp(last.t) : '')),
            h('div', { class: 'cp' }, h('span', { class: 'pv' }, prev), p ? h('span', { class: 'turn' }, 'Twoja kolej') : null, c.unread ? h('span', { class: 'cnt' }, c.unread) : null))));
      });
    }
    const offs = ['msg', 'typing', 'pending', 'chats', 'unlock'].map(e => BUS.on(e, render));
    render();
    return { el: pg.el, destroy: () => offs.forEach(f => f()), onShow: () => { G.viewing = null; render(); } };
  }

  /* ---------- czat ---------- */
  function chatPage(stack, id) {
    const cd = DATA.chats[id] || {};
    const el = h('div', { class: 'chat' + (cd.glitch ? ' glitchy' : '') });
    const sub = h('small', {});
    const ffBtn = h('button', { class: 'ff', title: 'Przewiń', 'aria-label': 'Przewiń', onclick: () => { Engine.skip(); }, html: U.icon('ff', 18) });
    const hdr = h('div', { class: 'hdr chat-hdr' },
      h('button', { class: 'bk', 'aria-label': 'Wstecz', onclick: () => { SFX.play.tap(); stack.pop(); }, html: U.icon(UI.os === 'android' ? 'arrowL' : 'back', 24) }),
      UI.avatar(chatAv(id), 'sm'),
      h('div', { class: 'tt' }, h('h1', {}, chatName(id)), sub),
      h('div', { class: 'rt' }, ffBtn));
    const msgs = h('div', { class: 'msgs' });
    const body = h('div', { class: 'body chat-body' }, msgs);
    const comp = h('div', { class: 'composer' });
    el.append(hdr, body, comp);

    let lastRendered = null;
    let typingEl = null;

    function setSub() {
      const t = Engine.typing(id);
      ffBtn.classList.toggle('on', !!t);
      if (t) { sub.textContent = cd.group ? `${charName(t)} pisze…` : 'pisze…'; sub.className = 'typ'; return; }
      sub.className = '';
      if (cd.group) sub.textContent = (G.s.chats[id] && G.s.chats[id].members ? G.s.chats[id].members : cd.members).map(charName).join(', ') + ', Ty';
      else sub.textContent = cd.sub || (DATA.chars[id] && DATA.chars[id].number) || '';
    }

    function sepNeeded(prev, m) {
      if (!prev) return true;
      return !U.sameDay(prev.t, m.t) || m.t - prev.t > 40 * 60000;
    }
    function sepText(t) {
      const now = G.now();
      if (U.sameDay(t, now)) return 'Dziś ' + U.time(t);
      return U.dayShort(t) + ' · ' + U.time(t);
    }

    function bubble(m, prev) {
      if (m.from === 'sys') return h('div', { class: 'sysmsg', html: U.rich(m.text) });
      const mine = m.from === 'me';
      const newRun = !prev || prev.from !== m.from || m.t - prev.t > 5 * 60000 || sepNeeded(prev, m) || prev.from === 'sys';
      const ch = DATA.chars[m.from] || {};
      const b = h('div', { class: 'bub' + (m.img && !m.text ? ' media' : '') });
      if (m.img) {
        const im = h('img', { class: 'mimg', src: Art.url(m.img), alt: '', loading: 'lazy', onclick: () => UI.viewImage(m.img, { from: ch.name }) });
        b.appendChild(im);
      }
      if (m.ev) b.appendChild(evCard(m.ev));
      if (m.place) b.appendChild(placeCard(m.place));
      if (m.text) b.appendChild(h('div', { class: 'tx', html: U.rich(m.text) }));
      b.appendChild(h('span', { class: 'tm' }, U.time(m.t)));
      if (m.clue) {
        b.classList.add('clue');
        b.addEventListener('click', () => { if (G.addEv(m.clue)) UI.evidenceToast(m.clue); else UI.toast('Masz to już w dowodach.', { icon: 'folder' }); });
      }
      const row = h('div', { class: 'msg ' + (mine ? 'me' : 'them') + (newRun ? ' first' : '') });
      if (!mine && cd.group) {
        row.appendChild(newRun ? UI.avatar(m.from, 'sm') : h('span', { class: 'av-sp' }));
        const col = h('div', { class: 'col' });
        if (newRun) col.appendChild(h('div', { class: 'who', style: `color:${ch.color || 'var(--tx2)'}` }, ch.short || ch.name));
        col.appendChild(b);
        row.appendChild(col);
      } else row.appendChild(b);
      return row;
    }
    function evCard(evId) {
      const e = G.ev(evId);
      if (!e) return h('div', {}, '');
      return h('div', { class: 'evc', onclick: ev => { ev.stopPropagation(); if (e.img) UI.viewImage(e.img, { title: e.title }); else UI.openApp('notes', { ev: evId }); } },
        e.img ? h('img', { src: Art.url(e.img), alt: '' }) : h('span', { class: 'evi', html: U.icon(DATA.evCat[e.cat] ? DATA.evCat[e.cat].icon : 'folder', 22) }),
        h('div', {}, h('small', {}, 'Załącznik'), h('b', {}, e.title)));
    }
    function placeCard(pid) {
      const p = DATA.map.places[pid] || { name: pid };
      return h('div', { class: 'plc' }, h('span', { html: U.icon('pin', 20) }), h('div', {}, h('small', {}, 'Lokalizacja'), h('b', {}, p.name)));
    }

    function renderAll() {
      msgs.innerHTML = '';
      lastRendered = null;
      const list = G.chat(id).msgs;
      list.forEach(m => append(m, false));
      showTyping();
      requestAnimationFrame(() => { body.scrollTop = body.scrollHeight; });
    }
    function append(m, animate = true) {
      if (sepNeeded(lastRendered, m)) msgs.appendChild(h('div', { class: 'sep' }, sepText(m.t)));
      const n = bubble(m, lastRendered);
      if (animate) n.classList.add('in');
      if (typingEl) msgs.insertBefore(n, typingEl); else msgs.appendChild(n);
      lastRendered = m;
    }
    function nearBottom() { return body.scrollHeight - body.scrollTop - body.clientHeight < 160; }
    function scrollEnd(force) { if (force || nearBottom()) requestAnimationFrame(() => body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' })); }
    function showTyping() {
      const t = Engine.typing(id);
      if (typingEl) { typingEl.remove(); typingEl = null; }
      if (t) {
        typingEl = h('div', { class: 'msg them typing' + (cd.group ? '' : ' solo') },
          cd.group ? UI.avatar(t, 'sm') : null,
          h('div', { class: 'bub' }, h('i'), h('i'), h('i')));
        msgs.appendChild(typingEl);
        scrollEnd();
      }
      setSub();
    }

    /* ----- pole odpowiedzi ----- */
    function renderComposer() {
      comp.innerHTML = '';
      comp.className = 'composer';
      const p = pendingFor(id);
      if (!p) {
        comp.appendChild(h('div', { class: 'idle' }, h('span', {}, cd.readonly ? 'Nie możesz odpowiedzieć na tę wiadomość' : 'Wiadomość'), h('span', { class: 'send dis', html: U.icon('send', 18) })));
        return;
      }
      if (p.type === 'choose') {
        comp.classList.add('choices');
        p.options.forEach((o, n) => comp.appendChild(h('button', {
          class: 'opt', style: `animation-delay:${n * 60}ms`,
          onclick: () => { SFX.play.tap(); comp.innerHTML = ''; Engine.answer(o.i); }
        }, h('span', { html: U.rich(o.text) }))));
        scrollEnd(true);
      } else if (p.type === 'ask') {
        const inp = h('input', { class: 'field', placeholder: p.placeholder, autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', type: p.mask ? 'password' : 'text', enterkeyhint: 'send' });
        const send = () => { const v = inp.value.trim(); if (!v) { inp.classList.remove('bad'); void inp.offsetWidth; inp.classList.add('bad'); return; } SFX.play.tap(); comp.innerHTML = ''; Engine.answer(v); };
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
        comp.classList.add('asking');
        comp.append(inp, h('button', { class: 'send', 'aria-label': 'Wyślij', onclick: send, html: U.icon('send', 18) }));
        setTimeout(() => { if (!document.body.classList.contains('mobile')) inp.focus(); }, 300);
      } else if (p.type === 'show') {
        comp.classList.add('action');
        comp.appendChild(h('button', { class: 'btn pri wide', onclick: () => pickEvidence(p) }, U.ico('clip', 18), U.tpl(p.prompt)));
      } else if (p.type === 'place') {
        comp.classList.add('action');
        comp.appendChild(h('button', { class: 'btn pri wide', onclick: () => UI.openApp('maps', { pick: { prompt: p.prompt, layer: p.layer, chat: id, pool: p.pool } }) }, U.ico('pin', 18), U.tpl(p.prompt)));
      }
    }

    const offs = [
      BUS.on('msg', ({ chat, msg }) => {
        if (chat !== id) return;
        append(msg);
        G.markRead(id);
        scrollEnd(msg.from === 'me');
      }),
      BUS.on('typing', ({ chat }) => { if (chat === id) showTyping(); }),
      BUS.on('pending', () => renderComposer()),
      BUS.on('chats', () => { $('h1', hdr).textContent = chatName(id); setSub(); })
    ];
    renderAll();
    renderComposer();
    const activate = () => { G.viewing = id; G.markRead(id); G.change(); };
    activate();
    return {
      el, chat: id,
      onShow: activate,
      onHide: () => { if (G.viewing === id) G.viewing = null; },
      destroy: () => { offs.forEach(f => f()); if (G.viewing === id) G.viewing = null; G.change(); }
    };
  }

  /* ---------- wybór dowodu ---------- */
  function pickEvidence(p) {
    const owned = Object.keys(G.s.ev).map(G.ev).filter(Boolean);
    const body = h('div', { class: 'evpick' });
    let sh = null;
    const cats = Object.keys(DATA.evCat);
    const groups = cats.map(c => ({ c, items: owned.filter(e => e.cat === c).sort((a, b) => G.s.ev[b.id].t - G.s.ev[a.id].t) })).filter(g => g.items.length);
    if (!groups.length) body.appendChild(h('div', { class: 'empty' }, 'Nie masz jeszcze żadnych dowodów. Szukaj w telefonie, w sieci i na zdjęciach.'));
    groups.forEach(g => {
      body.appendChild(h('div', { class: 'sec-t' }, DATA.evCat[g.c].name));
      const list = h('div', { class: 'list' });
      g.items.forEach(e => list.appendChild(h('button', { class: 'row', onclick: () => { sh.close(); Engine.answer(e.id); } },
        e.img ? h('img', { class: 'ri thumb', src: Art.url(e.img), alt: '' }) : h('span', { class: 'ri', html: U.icon(DATA.evCat[e.cat].icon, 18) }),
        h('div', { class: 'rm' }, h('b', {}, e.title), h('span', {}, U.tpl(e.short || e.desc || ''))))));
      body.appendChild(list);
    });
    sh = UI.sheet({ title: U.tpl(p.prompt || 'Załącz z Notatek'), body });
  }
})();
