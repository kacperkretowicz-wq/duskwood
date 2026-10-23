'use strict';
/* Sprawa nr 5 „Twoim głosem” (docs/SPRAWA-5-PLAN.md): obsada, dowody, strony i sezon.
   Prawda (scenariusze pisze Marta, dzwoni Dudek) jest tylko w planie i w późnych rozdziałach. */

Object.assign(DATA.chars, {
  oskar: { name: 'Oskar Wilk', short: 'Oskar', age: 17, trust: true, color: '#6fa8dc', role: 'Technikum · praktyki w serwisie Igora', bio: '', status: '', number: '512 330 847', photo: 'assets/people/oskar.jpg' },
  blysk3: { name: 'konto z twoim zdjęciem', short: '???', color: '#555', role: 'Błysk · założone 15.03, 1:58' }
});

Object.assign(DATA.chats, {
  oskar: { name: 'Oskar Wilk', avatar: 'oskar', sub: 'od Igora' },
  dudek: { name: '+48 731 008 214', avatar: 'unknown', sub: 'SMS' },
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
    desc: 'Dziecięca czapka z daszkiem, mokra, zawieszona na bramie huty. Świeże ślady butów w błocie. Nikogo w środku.' },
  ev_g_przystanek: { title: 'Moje zdjęcie z przystanku', cat: 'photo', source: 'Przesyłanie w pobliżu · 15.03, 18:47', img: 'g_przystanek',
    desc: 'Ktoś zrobił mi zdjęcie z drugiej strony ulicy, kiedy słuchał{em|am} głosówek na przystanku, i przesłał je z telefonu bez nazwy.' },
  ev_g_album: { title: 'Tomek na festynie, 1996', cat: 'photo', source: 'Weronika · album', img: 'g_tomek_album',
    desc: 'Tomek Lis, 8 lat, w czerwonej czapce z daszkiem. Obok Weronika. Z boku kadru kamera kablówki z kablem. Festyn, sierpień 1996.' },
  ev_g_festyn96: { title: 'Kaseta nr 12 · festyn 1996', cat: 'digital', source: 'Marta Jasińska · archiwum gminy', img: 'v_festyn96',
    desc: 'Cztery sekundy z 17.08.1996. Tomek w czerwonej czapce biegnie do kamery i woła: „Wera, chodź, jest zimno!”. Kaseta nigdy nie była pokazywana publicznie.' },
  ev_g_telefon: { title: 'Telefon moim głosem · 17.03, 21:34', cat: 'testimony', source: 'połączenie od nieznanego numeru',
    desc: 'Ktoś dzwoni do mnie moim głosem. Każe przestać pytać o kasety i most. Nie zna hasła. Mówi, że „ma nagrania” i że zawsze nagrywa.' },
  ev_g_probki: { title: 'Trzy próbki mojego głosu', cat: 'digital', source: 'Oskar · serwis Igora',
    desc: 'Po 30 sekund mojego głosu wyciętych z nagrania rozmowy z Idą (22.01, 20:58). Kupujący kazał je wyciąć, zanim dostał paczkę z jej telefonu.' },
  ev_g_dudek: { title: 'Kupujący: P. Dudek', cat: 'digital', source: 'Oskar · zrzut przelewu',
    desc: 'Konto „pd_audio” na Błysku kupowało paczki z telefonów z Mgliska. Za telefon Idy zapłaciło 300 zł. Przelew podpisany: P. Dudek.' },
  ev_g_serwis: { title: 'Serwis Igora nocą', cat: 'photo', source: 'Przesyłanie w pobliżu · 18.03, 22:17', img: 'g_serwis_noc',
    desc: 'Ktoś fotografuje serwis Igora z samochodu po drugiej stronie ulicy. Igor jest w środku.' }
});

(() => {
  if (typeof Art === 'undefined') return;
  for (const [id, src, title, w, h] of [
    ['g_ola_umowa', 'assets/glos/g_ola_umowa.jpg', 'Świetlica', 768, 1024],
    ['g_kostka', 'assets/glos/g_kostka.jpg', 'Podwórko Sowów', 768, 1024],
    ['g_huta_czapka', 'assets/glos/g_huta_czapka.jpg', 'Brama huty · 2:51', 768, 1024],
    ['g_maja_korytarz', 'assets/glos/g_maja_korytarz.jpg', 'Po kolokwium', 768, 1024],
    ['g_przystanek', 'assets/glos/g_przystanek.jpg', 'Przystanek · 18:47', 768, 1024],
    ['g_tomek_album', 'assets/glos/g_tomek_album.jpg', 'Festyn · 1996', 1024, 768],
    ['g_pracownia', 'assets/glos/g_pracownia.jpg', 'Archiwum gminy · pracownia', 1024, 768],
    ['v_festyn96', 'assets/video/v_festyn96.jpg', 'kaseta nr 12 · 17.08.1996', 360, 270],
    ['g_kuba_kostka', 'assets/glos/g_kuba_kostka.jpg', 'Kostka u sąsiada', 768, 1024],
    ['g_serwis_noc', 'assets/glos/g_serwis_noc.jpg', 'Serwis · 22:17', 768, 1024]
  ]) Art.def(id, { src, title, w, h, draw: () => '' });
})();

/* Sezon 5: ten sam zapis. W produkcji (released: false) — test włącza go ręcznie. */
DATA.seasons.push({
  id: 's5', revision: 1, title: 'Twoim głosem', kicker: 'SPRAWA 5', released: false,
  description: 'Marzec, roztopy. O 2:14 Maja dostaje głosówkę twoim głosem. Ty niczego nie nagrywał{eś|aś}.',
  chapters: ['g0', 'g1', 'g2', 'g3', 'g4'],
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
    ['s5.02', 'Czapka', 'g0', 'ev:ev_g_czapka'],
    ['s5.03', 'Hasło', 'g1', 'flag:g_haslo'],
    ['s5.04', 'Trzy głosy', 'g1', 'flag:g_threeVoices'],
    ['s5.05', 'Wera', 'g2', 'ev:ev_g_album'],
    ['s5.06', 'Poczta głosowa', 'g2', 'flag:g_day2'],
    ['s5.07', 'Kaseta nr 12', 'g3', 'ev:ev_g_festyn96'],
    ['s5.08', 'Twój głos', 'g3', 'ev:ev_g_telefon'],
    ['s5.09', 'Próbki', 'g4', 'ev:ev_g_probki'],
    ['s5.10', 'pd_audio', 'g4', 'ev:ev_g_dudek']
  ].map(([id, title, chapter, done]) => ({ id, title, chapter, done }))
});
