'use strict';
/* Start gry: ekran tytułowy, konfiguracja telefonu, wznawianie zapisu. */

(() => {
  const { h, $ } = U;
  const params = new URLSearchParams(location.search);
  const DEBUG = params.has('debug');

  function boot() {
    if (params.has('art')) return artGallery();
    UI.build();
    if (DEBUG) G.settings.speed = params.get('speed') || 'instant';
    title();
  }

  function title() {
    const has = G.hasSave() && G.load();
    if (has && G.s.finished && !G.s.seasonArchive?.[Seasons.current().id]) Seasons.archive();
    const scr = UI.screen;
    const el = h('div', { class: 'title-scr' },
      h('div', { class: 'ts-bg', style: `background-image:url(${Art.url('title_bg')})` }),
      h('div', { class: 'ts-fog' }), h('div', { class: 'ts-fog f2' }),
      h('div', { class: 'ts-c' },
        h('div', { class: 'ts-k' }, 'Gra detektywistyczna'),
        h('h1', { class: 'ts-t' }, 'MGLISKO'),
        h('div', { class: 'ts-s' }, 'Ostatnie połączenie było do ciebie.'),
        h('div', { class: 'ts-b' },
          has && !G.s.finished ? h('button', { class: 'btn pri wide', onclick: () => go(() => resume()) }, 'Kontynuuj') : null,
          has && G.s.finished ? h('button', { class: 'btn wide', onclick: () => go(() => { close(); UI.renderHome(); UI.openSeason(); }) }, 'Po zakończeniu') : null,
          h('button', { class: 'btn wide' + (has && !G.s.finished ? ' ghost' : ' pri'), onclick: () => go(() => has ? confirmNew() : setup()) }, 'Nowa gra'),
          has && Object.keys(G.checkpoints()).length > 1 ? h('button', { class: 'btn ghost wide', onclick: () => go(() => chapters()) }, 'Rozdziały') : null),
        h('div', { class: 'ts-n' }, '🎧 Najlepiej ze słuchawkami, po zmroku.'),
        h('div', { class: 'ts-w' }, 'Gra porusza tematy zaginięcia, śmierci dziecka i przemocy. Wszystkie postacie i zdarzenia są fikcyjne.')));
    scr.appendChild(el);
    function go(fn) { SFX.unlockAudio(); SFX.play.tap(); fullscreen(); fn(); }
    function close() { el.classList.add('out'); setTimeout(() => el.remove(), 700); }
    async function confirmNew() {
      const r = await UI.modal({ title: 'Nowa gra?', text: 'Obecny zapis zostanie usunięty. Odkryte zakończenia też.', buttons: [{ label: 'Anuluj', value: 0 }, { label: 'Zacznij od nowa', value: 1, pri: true }] });
      if (r === 1) { G.wipe(); setup(); }
    }
    function chapters() {
      const cps = G.checkpoints();
      const list = h('div', { class: 'list' }, Engine.order.filter(id => cps[id]).map(id => {
        const ch = Engine.chapters[id];
        return h('button', { class: 'row', onclick: () => { G.loadCheckpoint(id); sh.close(); close(); start(); } },
          h('span', { class: 'ri', html: U.icon('refresh', 17) }), h('div', { class: 'rm' }, h('b', {}, ch.num === 0 ? 'Prolog' : ch.num === 99 ? 'Epilog' : `Rozdział ${ch.num}`), h('span', {}, ch.title)));
      }));
      const sh = UI.sheet({ title: 'Wybierz rozdział', body: list });
    }
    function resume() { close(); start(); }
    function setup() {
      let gender = null;
      const name = h('input', { class: 'field', placeholder: 'Twoje imię', maxlength: 20, autocomplete: 'off' });
      const err = h('div', { class: 'nb-err' });
      const gb = h('div', { class: 'su-g' },
        [['m', 'On', 'Znalazłeś coś?'], ['f', 'Ona', 'Znalazłaś coś?']].map(([k, l, ex]) => h('button', { class: 'su-o', onclick: e => { gender = k; [...gb.children].forEach(b => b.classList.remove('on')); e.currentTarget.classList.add('on'); } }, h('b', {}, l), h('small', {}, `„${ex}”`))));
      const ok = () => {
        const n = name.value.trim();
        if (!n) { err.textContent = 'Podaj imię — tak będą się do ciebie zwracać.'; name.classList.remove('bad'); void name.offsetWidth; name.classList.add('bad'); return; }
        if (!gender) { err.textContent = 'Wybierz formę, w jakiej mają do ciebie pisać.'; return; }
        G.newGame({ name: n.charAt(0).toUpperCase() + n.slice(1), gender });
        G.checkpoint('prolog');
        su.classList.add('out');
        setTimeout(() => su.remove(), 700);
        close();
        start();
      };
      name.addEventListener('keydown', e => { if (e.key === 'Enter') name.blur(); });
      const su = h('div', { class: 'setup' },
        h('div', { class: 'su-c' },
          h('div', { class: 'su-ic', html: U.icon('phone', 30) }),
          h('h2', {}, 'Witaj w nowym telefonie'),
          h('p', {}, 'Zanim zaczniesz: jak masz na imię i jak mają się do ciebie zwracać ludzie, którzy do ciebie napiszą?'),
          h('label', { class: 'lbl' }, 'Imię'), name,
          h('label', { class: 'lbl' }, 'Forma'), gb, err,
          h('button', { class: 'btn pri wide', style: 'margin-top:18px', onclick: ok }, 'Gotowe'),
          h('p', { class: 'su-f' }, 'Możesz to zmienić później w Ustawieniach.')));
      scr.appendChild(su);
      setTimeout(() => { if (!document.body.classList.contains('mobile')) name.focus(); }, 400);
    }
  }

  // Na telefonie gra zajmuje cały ekran — widać tylko „telefon w telefonie”.
  function fullscreen() {
    const el = document.documentElement;
    if (!document.body.classList.contains('mobile') || document.fullscreenElement || !el.requestFullscreen) return;
    el.requestFullscreen({ navigationUI: 'hide' }).then(() => {
      if (screen.orientation && screen.orientation.lock) screen.orientation.lock('portrait').catch(() => {});
    }).catch(() => {});
  }

  function start() {
    UI.renderHome();
    SFX.ambient(G.s.mood || 'calm');
    if (G.s.call) UI.callScreen();
    BUS.emit('badges');
    Engine.restart();
    BUS.emit('game:ready');
    if (DEBUG) debugPanel();
  }

  /* ---------- narzędzia deweloperskie (?debug) ---------- */
  function debugPanel() {
    const b = h('button', { class: 'dbg-b', onclick: () => {
      const list = h('div', { class: 'list' },
        Engine.order.map(id => h('button', { class: 'row', onclick: () => { Engine.jump(id); sh.close(); } }, h('div', { class: 'rm' }, h('b', {}, 'Skocz: ' + Engine.chapters[id].title)))),
        h('button', { class: 'row', onclick: () => { Object.keys(DATA.evidence).forEach(e => G.addEv(e, true)); sh.close(); } }, h('div', { class: 'rm' }, h('b', {}, 'Wszystkie dowody'))),
        h('button', { class: 'row', onclick: () => { Engine.skip(); sh.close(); } }, h('div', { class: 'rm' }, h('b', {}, 'Przewiń'))));
      const sh = UI.sheet({ title: `Debug · ${G.s.chapter} · krok ${G.s.pc}`, body: list });
    } }, 'DBG');
    document.body.appendChild(b);
  }
  window.DBG = {
    step: () => { const ch = Engine.chapters[G.s.chapter]; return { ch: G.s.chapter, pc: G.s.pc, step: ch && ch.steps[G.s.pc], pending: G.s.pending }; },
    answer: v => Engine.answer(v)
  };

  function artGallery() {
    document.body.style.overflow = 'auto';
    document.body.style.userSelect = 'text';
    const only = params.get('art');
    const ids = Object.keys(Art.reg).filter(id => !only || id.includes(only));
    const wrap = h('div', { style: 'padding:20px;display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:18px;background:#111;min-height:100vh' });
    ids.forEach(id => {
      const m = Art.reg[id];
      wrap.appendChild(h('figure', { style: 'margin:0;background:#1a1a1a;border-radius:10px;overflow:hidden' },
        h('img', { src: Art.url(id), style: 'width:100%;display:block' + (m.edit && m.edit.neg ? '' : ''), loading: 'lazy' }),
        h('figcaption', { style: 'padding:8px 10px;font:12px monospace;color:#aaa' }, `${id} — ${m.title || ''}`)));
    });
    document.body.innerHTML = '';
    document.body.appendChild(wrap);
  }

  window.addEventListener('DOMContentLoaded', boot);
})();
