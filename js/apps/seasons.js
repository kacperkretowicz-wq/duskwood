'use strict';
(() => {
  const { h } = U;
  UI.openSeason = function () {
    if (!G.s) return;
    const body = h('div', { class: 'season-body' });
    const sh = UI.sheet({ title: 'Sezony i sesje', body, cls: 'season-sheet' });
    const render = () => {
      const s = Seasons.current(), eps = Seasons.progress(), complete = eps.filter(e => e.done).length;
      body.innerHTML = '';
      body.append(h('small', { class: 'season-kicker' }, s.kicker || 'SEZON 1'), h('h2', {}, s.title), h('p', {}, s.description),
        h('progress', { max: eps.length, value: complete, 'aria-label': 'Postęp sezonu' }),
        h('p', { class: 'season-meta' }, `${complete} z ${eps.length} etapów historii`),
        h('p', { class: 'season-pacing' }, 'Graj we własnym tempie. Etapy nie oznaczają dni ani obietnicy jednakowej długości. Nieobecność nie zmienia losów postaci.'),
        h('button', { class: 'btn pri wide', onclick: () => { Seasons.saveSession(); render(); UI.toast('Sesja zapisana. Wrócisz do tego samego miejsca.'); } }, 'Zapisz podsumowanie sesji'));
      const pacing = SeasonPacing.state(), time = `${String(pacing?.hour ?? 18).padStart(2, '0')}:${String(pacing?.minute ?? 0).padStart(2, '0')}`;
      const timeInput = h('input', { type: 'time', value: time, class: 'field', 'aria-label': 'Pora kolejnych rozmów' });
      timeInput.addEventListener('change', () => { if (SeasonPacing.configure(pacing?.mode || 'free', timeInput.value)) render(); });
      const rhythm = h('section', { class: 'season-recap' }, h('h3', {}, 'Rytm historii'),
        h('p', {}, 'Zacznij bez czekania. Jeśli chcesz, kolejne rozdziały mogą pojawiać się w wybranej porze. Obecny pilot obejmuje pięć dni kalendarzowych; pełny miesiąc wymaga rozbudowanych odcinków.'),
        h('div', { class: 'seg' }, [['free', 'Własne tempo'], ['daily', 'Rytm dzienny']].map(([mode, label]) => h('button', {
          class: (pacing?.mode || 'free') === mode ? 'on' : '', 'aria-pressed': String((pacing?.mode || 'free') === mode), onclick: () => { SeasonPacing.configure(mode, timeInput.value); render(); }
        }, label))), h('label', { class: 'lbl' }, 'Pora kolejnych rozmów', timeInput),
        h('p', {}, 'Prolog i Chmura są dostępne od razu. Następne rozdziały dochodzą codziennie. Sztolnia i akcja ratunkowa pozostają jedną sesją. Po przerwie możesz nadrobić wszystkie dostępne części.'));
      if (pacing?.waiting) rhythm.append(h('p', { class: 'season-release', role: 'status' }, `Kolejna część: ${new Date(SeasonPacing.release(pacing.waiting.chapter)).toLocaleString('pl-PL', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}.`));
      if (NativeNotifications.native) rhythm.append(h('button', { class: 'btn wide', onclick: async () => {
        if (pacing?.notify) await NativeNotifications.disable();
        else if (!await NativeNotifications.enable()) UI.toast('Brak zgody na powiadomienia. Możesz grać bez nich.');
        render();
      } }, pacing?.notify ? 'Wyłącz powiadomienia' : 'Włącz powiadomienia na telefonie'));
      else rhythm.append(h('p', { class: 'season-pacing' }, 'Powiadomienia poza grą są dostępne w aplikacji iOS/Android. W przeglądarce wróć do gry o wybranej porze.'));
      body.append(rhythm);
      const recap = Seasons.recap();
      if (recap) body.append(h('section', { class: 'season-recap' }, h('h3', {}, 'Przed przerwą'), h('p', {}, new Date(recap.at).toLocaleDateString('pl-PL')), h('p', {}, U.tpl(recap.goal)),
        recap.found.length ? h('ul', {}, recap.found.slice(-4).map(e => h('li', {}, e.title))) : h('p', {}, 'Bez nowych zapisanych materiałów.')));
      const list = h('ol', { class: 'season-episodes' });
      eps.forEach(ep => list.append(h('li', { class: ep.done ? 'complete' : ep.available ? 'current' : 'locked' },
        h('span', { class: 'episode-num' }, String(ep.number).padStart(2, '0')),
        h('div', {}, h('b', {}, ep.available ? ep.title : 'Kolejny etap'), h('small', {}, ep.done ? 'Zapisany w historii' : ep.available ? 'W toku · wróć do wiadomości' : 'Odkryjesz w toku śledztwa')),
        U.ico(ep.done ? 'check' : ep.available ? 'chat' : 'lock', 17))));
      const next = Seasons.nextCase();
      if (next && G.s.finished) body.append(h('section', { class: 'season-recap' }, h('h3', {}, `${next.kicker || 'Kolejna sprawa'}: ${next.title}`), h('p', {}, next.description),
        Seasons.canStartNext()
          ? h('button', { class: 'btn pri wide', onclick: () => { if (Seasons.startNext()) { sh.close(true); UI.renderHome(); Engine.restart(); } } }, 'Otwórz teczkę')
          : h('p', { class: 'season-pacing' }, 'Po zakończeniu „Cisza” ta sprawa zacznie się od prologu „Adres na paczce”. Ten prolog jest jeszcze w przygotowaniu.')));
      body.append(list, h('p', { class: 'season-pacing' }, 'Zakończenie i relacje zapisują się do kontynuacji.'),
        h('button', { class: 'btn wide', onclick: () => { sh.close(true); UI.openApp('notes', { note: 'todo' }); } }, 'Wróć do śledztwa'));
    };
    render();
  };
})();
