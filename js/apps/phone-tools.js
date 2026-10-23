'use strict';
(() => {
  const { h } = U;
  let cancelHold = () => {};
  window.addEventListener('blur', () => cancelHold());
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelHold(); });
  const title = chat => G.s.chats[chat]?.name || DATA.chats[chat]?.name || chat;
  const author = m => m.from === 'me' ? 'Ty' : DATA.chars[m.from]?.short || 'Nieznany';
  const preview = m => U.tpl(m.text || (m.img ? Art.get(m.img)?.title : m.ev ? G.ev(m.ev)?.title : 'Załącznik') || 'Wiadomość');

  UI.messageActions = (chat, m) => {
    if (!PhoneTools.find(chat, m.id)) return;
    const body = h('div', { class: 'message-menu' }, h('p', { class: 'quote-origin' }, `${author(m)} · ${U.dateNum(m.t)}, ${U.time(m.t)}`), h('blockquote', {}, preview(m)));
    const picker = h('div', { class: 'reaction-picker', role: 'group', 'aria-label': 'Twoja reakcja' });
    PhoneTools.EMOJI.forEach(emoji => picker.append(h('button', { 'aria-label': 'Reakcja ' + emoji, 'aria-pressed': String(PhoneTools.reaction(chat, m.id) === emoji), onclick: () => { PhoneTools.react(chat, m.id, emoji); sh.close(true); } }, emoji)));
    body.append(picker, h('button', { class: 'btn wide', onclick: () => { PhoneTools.toggleSaved(chat, m.id); sh.close(true); } }, PhoneTools.isSaved(chat, m.id) ? 'Usuń z zachowanych cytatów' : 'Zachowaj cytat'));
    if (m.img) body.append(h('button', { class: 'btn wide', onclick: () => { sh.close(true); UI.viewImage(m.img); } }, 'Otwórz zdjęcie'));
    body.append(h('p', { class: 'message-search-empty' }, 'Reakcję i cytat zapisujesz dla siebie. Oryginalna wiadomość pozostaje bez zmian.'));
    const sh = UI.sheet({ title: 'Wiadomość', body });
  };
  UI.bindMessageActions = (element, chat, m) => {
    let timer, start, held = false;
    const clear = () => clearTimeout(timer);
    element.addEventListener('pointerdown', e => {
      cancelHold(); clear(); if (e.button !== 0 || !e.isPrimary) return;
      cancelHold = clear;
      held = false; start = [e.clientX, e.clientY]; const save = G.s;
      timer = setTimeout(() => { if (!element.isConnected || G.s !== save || document.hidden) return; held = true; U.vibrate(25); UI.messageActions(chat, m); }, 600);
    });
    element.addEventListener('pointermove', e => { if (start && Math.hypot(e.clientX - start[0], e.clientY - start[1]) > 10) clear(); });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(type => element.addEventListener(type, clear));
    element.addEventListener('click', e => { if (held) { e.preventDefault(); e.stopImmediatePropagation(); held = false; } }, true);
    element.addEventListener('contextmenu', e => { e.preventDefault(); clear(); UI.messageActions(chat, m); });
  };
  UI.chatTools = chat => {
    const body = h('div', { class: 'message-menu' },
      h('button', { class: 'btn wide', onclick: () => { PhoneTools.togglePin(chat); sh.close(true); } }, PhoneTools.pinned(chat) ? 'Odepnij rozmowę' : 'Przypnij rozmowę'),
      h('button', { class: 'btn wide', onclick: () => { sh.close(true); UI.searchMessages(chat); } }, 'Szukaj w rozmowie'),
      h('button', { class: 'btn wide', onclick: () => { sh.close(true); UI.savedQuotes(chat); } }, 'Zachowane cytaty'),
      h('p', { class: 'message-search-empty' }, 'Przytrzymaj wiadomość, żeby zachować cytat lub dodać własną reakcję. Możesz też wybrać wiadomość w wynikach wyszukiwania.'));
    const sh = UI.sheet({ title: title(chat), body });
  };
  function result(chat, m, onclick) {
    return h('button', { class: 'message-search-result', onclick }, h('b', {}, `${author(m)} · ${U.dateNum(m.t)}, ${U.time(m.t)}`), h('p', {}, preview(m)), h('small', {}, title(chat)));
  }
  UI.searchMessages = chat => {
    const input = h('input', { class: 'field', type: 'search', placeholder: 'Szukaj w tej rozmowie', 'aria-label': 'Szukaj wiadomości' }), list = h('div', {});
    const body = h('div', { class: 'message-search' }, input, list);
    const render = () => {
      list.replaceChildren(); const query = U.norm(input.value);
      const items = G.chat(chat).msgs.filter(m => m.from !== 'sys' && U.norm(preview(m)).includes(query)).slice().reverse();
      if (!items.length) list.append(h('p', { class: 'message-search-empty' }, 'Nie ma takiej wiadomości w tej rozmowie.'));
      items.forEach(m => list.append(result(chat, m, () => { sh.close(true); UI.messageActions(chat, m); })));
    };
    input.addEventListener('input', render); render();
    const sh = UI.sheet({ title: 'Szukaj w rozmowie', body });
  };
  UI.savedQuotes = chat => {
    const body = h('div', { class: 'message-search' });
    const items = PhoneTools.saved().filter(item => !chat || item.chat === chat);
    if (!items.length) body.append(h('p', { class: 'message-search-empty' }, 'Przytrzymaj wiadomość i wybierz „Zachowaj cytat”. Będzie tutaj razem z nadawcą i datą.'));
    items.forEach(({ chat, msg }) => body.append(result(chat, msg, () => { sh.close(true); UI.messageActions(chat, msg); })));
    const sh = UI.sheet({ title: 'Zachowane cytaty', body });
  };
})();
