'use strict';
/* Tapety właściciela telefonu i jawnie importowane ustawienia kopii Mai. */
DATA.wallpapers = [
  { id: 'forest', name: 'Mgła', src: 'assets/forest.jpg', position: '50% 50%' },
  { id: 'graphite', name: 'Grafit', background: 'linear-gradient(145deg,#45505d,#14191f 70%)' },
  { id: 'maja_river', name: 'Nad wodą', src: 'assets/maja-river.jpg', position: '50% 50%', imported: true },
  { id: 'maja_river_crop', name: 'Nad wodą · zbliżenie', src: 'assets/maja-river.jpg', position: '30% 60%', size: 'auto 135%', imported: true }
];
Object.assign(DATA.evidence, {
  ev_wallpaper_backup: { title: 'Tapeta Mai · kopia z 14.10, 23:58', cat: 'digital', source: 'Nimbus · ustawienia ekranu',
    desc: 'W kopii zakończonej 14.10 o 23:58 zachowały się dwa kadrowania tej samej fotografii znad wody. Godzina dotyczy całej kopii telefonu. Nie jest datą wykonania fotografii ani ustalenia pozycji Mai. Plik źródłowy: IMG_0815_1920.' },
  ev_wallpaper_original: { title: 'Źródło tapety · 15 sierpnia', cat: 'photo', source: 'Nimbus · oryginał IMG_0815_1920', img: 'k_maja',
    desc: 'Data wykonania: 15.08.2026, 19:20. Kadr znad Mglicy użyty później jako tapeta. Oryginał pochodzi ze starszego albumu; nie ma pomiaru GPS. Nie ustala położenia telefonu w noc zaginięcia. Data kopii 14.10 nie zmienia daty zdjęcia.' },
  ev_wallpaper_checked: { title: 'Tapeta nie potwierdza pobytu nad wodą', cat: 'digital', source: 'Porównanie ustawień kopii z oryginałem',
    desc: '14.10, 23:58 to koniec kopii, a 15.08, 19:20 to data fotografii. Dwa kadrowania pochodzą z jednego pliku, więc nie są niezależnymi obserwacjami. Tapeta nie dowodzi wizyty Mai nad wodą w noc zaginięcia. Sama nie dowodzi też, że Mai tam nie było.' }
});
DATA.deductions.ded_wallpaper = {
  q: 'Czy tapeta umieszcza Maję nad wodą w noc zaginięcia?', kind: 'text',
  intro: 'W kopii z 14 października jest kadr znad wody. Oddziel datę kopii od daty zdjęcia. Dwa warianty kadrowania to nadal ten sam plik.',
  options: [
    { id: 'dam', label: 'Tak. Zdjęcie w kopii z 23:58 potwierdza, że Maja była wtedy na tamie.' },
    { id: 'absent', label: 'Nie. Starsze zdjęcie dowodzi, że 14 października Mai na tamie nie było.' },
    { id: 'unproven', label: 'Nie da się tego ustalić z tapety. Zdjęcie jest starsze, a godzina dotyczy kopii.' }
  ], answer: 'unproven',
  support: { need: 2, from: ['ev_wallpaper_backup', 'ev_wallpaper_original'], prompt: 'Wskaż zapis kopii i oryginał fotografii.', fail: 'Potrzebujesz informacji o całej kopii i danych pliku źródłowego. Dwa kadrowania nie są dwoma dowodami.' },
  fail: 'Kopia może przechowywać stare zdjęcia. Starszy kadr nie potwierdza ani nie wyklucza późniejszej wizyty.',
  reward: 'ev_wallpaper_checked',
  done: 'Hipoteza o tamie była kusząca, bo tam znaleziono auto. Tapeta jej nie potwierdza. Nie trzeba szukać ukrytej manipulacji: zwykłe, stare zdjęcie wystarczyło, żeby zasugerować fałszywe połączenie.'
};
