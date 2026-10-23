'use strict';
(() => {
  const { h } = U;
  UI.openWallpapers = function () {
    if (!G.s) return;
    const body = h('div', { class: 'wallpaper-picker' });
    let draft = Wallpapers.selected().id;
    const sh = UI.sheet({ title: 'Tapety', body, cls: 'wallpaper-sheet' });
    const render = () => {
      body.innerHTML = '';
      const list = h('div', { class: 'wallpaper-gallery', role: 'group', 'aria-label': 'Wybierz tapetę' });
      Wallpapers.all().forEach(w => {
        list.append(h('button', { class: 'wallpaper-card' + (draft === w.id ? ' selected' : ''), 'aria-pressed': String(draft === w.id), 'aria-label': w.name,
          onclick: () => { draft = w.id; render(); } },
          h('span', { class: 'wallpaper-preview', style: Wallpapers.style(w) }, h('small', {}, U.dayLong(G.now())), h('strong', {}, U.time(G.now()))),
          h('b', {}, w.name), h('small', {}, w.imported ? 'Z kopii Mai' : 'Moje tapety')));
      });
      body.append(list, h('p', { class: 'wallpaper-caption' }, 'Przytrzymaj tło ekranu blokady lub ekranu głównego, żeby wrócić do tego wyboru.'),
        h('button', { class: 'btn pri wide', onclick: () => { if (Wallpapers.select(draft)) sh.close(); } }, 'Ustaw parę tapet'));
      const w = Wallpapers.all().find(w => w.id === draft);
      if (w?.imported) body.append(
        h('div', { class: 'wallpaper-source' }, h('b', {}, 'Nimbus · ustawienia ekranu'),
          h('p', {}, 'Kopia zakończona 14.10.2026, 23:58. Źródło obu wariantów: IMG_0815_1920. Zegar w podglądzie pokazuje czas twojego telefonu.'),
          h('button', { class: 'btn wide', onclick: () => {
            Wallpapers.inspectOriginal();
            UI.evSheet('ev_wallpaper_original');
          } }, 'Informacje o oryginale'),
          h('button', { class: 'btn wide', onclick: () => { sh.close(true); UI.unlockScreen(); UI.openApp('notes', { note: 'questions', ded: 'ded_wallpaper' }); } }, 'Sprawdź hipotezę w Notatkach')));
      const chosen = list.querySelector('[aria-pressed="true"]');
      if (chosen) list.scrollLeft = chosen.offsetLeft - list.offsetLeft - (list.clientWidth - chosen.clientWidth) / 2;
    };
    render();
  };
  UI.openWallpaperBackup = function () {
    if (!G.isUnlocked('nimbus:auth') || !G.isUnlocked('maja:base')) return;
    const body = h('div', { class: 'pad wallpaper-backup' },
      h('img', { src: 'assets/maja-river.jpg', alt: 'Zachowana fotografia Mai nad wodą' }),
      h('h3', {}, 'Dwa kadrowania. Jeden plik.'),
      h('p', {}, 'W ustawieniach ekranu są zachowane dwa warianty fotografii znad wody. Kopia telefonu zakończyła się 14 października o 23:58.'),
      h('p', {}, 'Możesz zachować te warianty w swoim wyborze tapet i sprawdzić plik źródłowy.'),
      h('button', { class: 'btn pri wide', onclick: () => { if (Wallpapers.importBackup()) { sh.close(true); UI.openWallpapers(); } } }, 'Zachowaj warianty tapety'));
    const sh = UI.sheet({ title: 'Ustawienia ekranu Mai', body });
  };
})();
