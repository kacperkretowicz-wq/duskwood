'use strict';
/* Sprawa nr 5 „Twoim głosem” (docs/SPRAWA-5-PLAN.md): obsada, dowody, strony i sezon.
   Prawda (scenariusze pisze Marta, dzwoni Dudek) jest tylko w planie i w późnych rozdziałach. */

Object.assign(DATA.chars, {
  oskar: { name: 'Oskar Wilk', short: 'Oskar', age: 17, trust: true, color: '#6fa8dc', role: 'Technikum · praktyki w serwisie Igora', bio: '', status: '', number: '512 330 847', photo: 'assets/people/oskar.jpg' },
  blysk3: { name: 'konto z twoim zdjęciem', short: '???', color: '#555', role: 'Błysk · założone 15.03, 1:58' }
});

Object.assign(DATA.chats, {
  oskar: { name: 'Oskar Wilk', avatar: 'oskar', sub: 'od Igora' },
  blysk3: { name: '%name%', avatar: 'blysk3', sub: 'Błysk · znika po przeczytaniu', readonly: true, ephemeral: true }
});

Object.assign(DATA.persons, {
  oskar: {
    name: 'Oskar Wilk', role: '17 lat · praktykant w serwisie Igora', cond: 'flag:g_oskarNamed',
    facts: [
      { text: 'Czyści stare telefony do sprzedaży. Igor mówi, że „trochę za szybko”.' }
    ]
  }
});

Object.assign(DATA.evidence, {
  ev_g_glosowka: { title: 'Głosówka do Mai · 2:14', cat: 'digital', source: 'Maja · Błysk, 15.03',
    desc: '0:07. Mój głos, moje „no” na początku: „Maja, przyjdź pod hutę. Sama. Nie mów Kubie.” Nie nagrywał{em|am} tego.' },
  ev_g_profil: { title: 'Konto na Błysku z moim zdjęciem', cat: 'digital', source: 'zrzut od Mai',
    desc: 'Nazwa jak moja, zdjęcie z mojego profilu na Kwartale, z lata. Konto założone 15.03 o 1:58, szesnaście minut przed głosówką.' },
  ev_g_czapka: { title: 'Czerwona czapka na bramie huty', cat: 'photo', source: 'Kuba · 15.03, 2:51', img: 'g_huta_czapka',
    desc: 'Dziecięca czapka z daszkiem, mokra, zawieszona na bramie huty. Świeże ślady butów w błocie. Nikogo w środku.' }
});

(() => {
  if (typeof Art === 'undefined') return;
  for (const [id, src, title, w, h] of [
    ['g_ola_umowa', 'assets/glos/g_ola_umowa.jpg', 'Świetlica', 768, 1024],
    ['g_kostka', 'assets/glos/g_kostka.jpg', 'Podwórko Sowów', 768, 1024],
    ['g_huta_czapka', 'assets/glos/g_huta_czapka.jpg', 'Brama huty · 2:51', 768, 1024]
  ]) Art.def(id, { src, title, w, h, draw: () => '' });
})();

/* Sezon 5: ten sam zapis. W produkcji (released: false) — test włącza go ręcznie. */
DATA.seasons.push({
  id: 's5', revision: 1, title: 'Twoim głosem', kicker: 'SPRAWA 5', released: false,
  description: 'Marzec, roztopy. O 2:14 Maja dostaje głosówkę twoim głosem. Ty niczego nie nagrywał{eś|aś}.',
  chapters: ['g0'],
  credits: {
    kicker: 'Koniec sprawy 5', title: 'TWOIM GŁOSEM',
    lines: [
      'Głos można skopiować. Hasła, które znacie tylko wy, nie.',
      'Wszystkie osoby, konta i usługi w tej sprawie są fikcyjne. Echo, Klipo i Błysk nie istnieją.',
      'Dziękujemy, że {oddzwoniłeś|oddzwoniłaś}, zanim {uwierzyłeś|uwierzyłaś}.'
    ],
    teaser: { title: 'MGLISKO', text: 'Rozprawa o most ruszyła. Na sali było cicho.' },
    note: 'Inne zakończenia: Ustawienia → Rozdziały → Sprawa 5.'
  },
  episodes: [
    ['s5.01', '2:14', 'g0', 'ev:ev_g_glosowka'],
    ['s5.02', 'Czapka', 'g0', 'ev:ev_g_czapka']
  ].map(([id, title, chapter, done]) => ({ id, title, chapter, done }))
});
