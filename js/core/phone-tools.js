'use strict';
/* Własne znaczniki gracza. Reakcja nie dopisuje wypowiedzi postaci ani dowodu. */
const PhoneTools = (() => {
  const EMOJI = ['❤️', '👍', '💀', '😮', '😢', '😂'];
  const state = () => {
    const s = G.s.phoneTools ||= {};
    s.pinned ||= []; s.saved ||= []; s.reactions ||= {};
    return s;
  };
  function find(chat, id) {
    if (!G.isUnlocked('chat:' + chat)) return null;
    return G.s.chats[chat]?.msgs.find(m => m.id === id && m.from !== 'sys') || null;
  }
  function key(chat, id) { return chat + ':' + id; }
  function toggleSaved(chat, id) {
    if (!find(chat, id)) return false;
    const s = state(), k = key(chat, id), i = s.saved.indexOf(k);
    if (i < 0) s.saved.push(k); else s.saved.splice(i, 1);
    G.save(true); BUS.emit('phone-tools'); return true;
  }
  function react(chat, id, emoji) {
    if (!find(chat, id) || !EMOJI.includes(emoji)) return false;
    const s = state(), k = key(chat, id);
    if (s.reactions[k] === emoji) delete s.reactions[k]; else s.reactions[k] = emoji;
    G.save(true); BUS.emit('phone-tools'); return true;
  }
  function togglePin(chat) {
    if (!G.isUnlocked('chat:' + chat)) return false;
    const s = state(), i = s.pinned.indexOf(chat);
    if (i < 0) s.pinned.push(chat); else s.pinned.splice(i, 1);
    G.save(true); BUS.emit('phone-tools'); return true;
  }
  function saved() {
    const wanted = new Set(state().saved), out = [];
    Object.keys(G.s.chats).forEach(chat => {
      if (!G.isUnlocked('chat:' + chat)) return;
      G.s.chats[chat].msgs.forEach(m => { if (wanted.has(key(chat, m.id))) out.push({ chat, msg: m }); });
    });
    return out.sort((a, b) => b.msg.t - a.msg.t);
  }
  return { EMOJI, find, toggleSaved, react, togglePin, saved,
    isSaved: (chat, id) => !!G.s.phoneTools?.saved?.includes(key(chat, id)),
    reaction: (chat, id) => G.s.phoneTools?.reactions?.[key(chat, id)] || '',
    pinned: chat => !!G.s.phoneTools?.pinned?.includes(chat) };
})();
