'use strict';
/* Sprawa nr 4 „Kronika” (docs/SPRAWA-4-PLAN.md): obsada, dowody, strona Klipo i sezon.
   Prawda (konto prowadzi Ida, wnuczka Zenona) jest tylko w planie i w rozdziale c3. */

Object.assign(DATA.chars, {
  zenon: { name: 'Zenon Gil', short: 'pan Zenon', age: 69, trust: true, color: '#7f8f6a', role: 'Emeryt · dawniej operator kablówki „TV Dolina”', bio: '', status: '', number: '607 412 118', photo: 'assets/people/zenon.jpg' },
  ida: { name: 'Ida Gil', short: 'Ida', age: 22, trust: true, color: '#c8b49a', role: 'Była stażystka „Gazety Sudeckiej”', bio: '', status: '', number: '533 019 274', photo: 'assets/people/ida.jpg' },
  kronika: { name: '@kronika.mglisko', short: 'kronika', color: '#333', role: 'Konto na Klipo · założone 18.01.2027', status: '' }
});

Object.assign(DATA.chats, {
  zenon: { name: 'Zenon Gil', avatar: 'zenon', sub: 'SMS' },
  ida: { name: 'Ida Gil', avatar: 'ida' }
});

Object.assign(DATA.persons, {
  zenon: {
    name: 'Zenon Gil', role: '69 lat · emeryt, dawniej operator „TV Dolina”', cond: 'flag:c_zenonNamed',
    facts: [
      { text: 'Przez osiemnaście lat kręcił kronikę kablówki. Po upadku TV Dolina w 2014 zabrał kasety do domu.' },
      { text: 'Mówi, że nikomu nie dawał kaset. „Nie umiem nawet wrzucić zdjęcia na Kwartał.”', cond: 'flag:c_zenonCalled' },
      { text: 'Na ferie przyjechała do niego wnuczka. To ona wychodzi nocą z psem.', cond: 'flag:c_idaSeen' }
    ]
  },
  kronika: {
    name: '@kronika.mglisko', role: 'anonimowe konto na Klipo', cond: 'ev:ev_c_klip1',
    facts: [
      { text: 'Codziennie o 21:00 wrzuca 30-sekundowy fragment kroniki „TV Dolina”. Podpis: „jutro kolejna osoba”.' },
      { text: 'Klipy nie są zgrane z kasety. Ktoś filmuje telewizor telefonem.', cond: 'flag:c_tvFilmed' },
      { text: 'Prowadzi je Ida Gil.', cond: 'flag:c_twist' }
    ]
  }
});

Object.assign(DATA.evidence, {
  ev_c_klip1: { title: 'Klip nr 1 · „studniówka, 1999”', cat: 'digital', source: 'klipo.app/@kronika.mglisko', img: 'c_studniowka',
    desc: '0:30. Polonez w sali gimnastycznej. Kamera przesuwa się obok tańczących par i zatrzymuje na drzwiach. Podpis: „jutro kolejna osoba”.' },
  ev_c_boisko: { title: 'Klip nr 2 · „boisko, 2008”', cat: 'digital', source: 'klipo.app/@kronika.mglisko', img: 'c_boisko',
    desc: 'Ówczesny wójt Kalinowski i pan Wrzos z firmy Wrzos-Bud podają sobie ręce przy budowie boiska. Przetarg wygrała firma szwagra wójta.' },
  ev_c_tv: { title: 'Kronika „TV Dolina”', cat: 'testimony', source: 'Weronika · telefon 19.01',
    desc: 'Lokalna kablówka, 1996–2014. Kronikę kręcił jeden operator: Zenon Gil. Po upadku kablówki kasety zostały u niego.' },
  ev_c_okno: { title: 'Zdjęcie mojego okna', cat: 'photo', source: 'Przesyłanie w pobliżu · 20.01, 23:41', img: 'c_blok_noc',
    desc: 'Ktoś zrobił zdjęcie mojego okna z parkingu przed blokiem i przesłał je z telefonu bez nazwy.' },
  ev_c_spacer: { title: 'Spacer z psem pana Zenona', cat: 'photo', source: 'Maja · 20.01', img: 'c_ida_pies',
    desc: 'W tle zdjęcia od Mai widać dziewczynę w beżowej kurtce, która wyprowadza psa pana Zenona.' },
  ev_c_pokoj: { title: 'Pokój z kasetami', cat: 'photo', source: 'Weronika · od pana Zenona', img: 'c_pokoj_kaset',
    desc: 'Półki z kasetami, telewizor kineskopowy, magnetowid z zegarem pokazującym 23:47. W legowisku śpi pies.' },
  ev_c_wogole: { title: '„wogóle”', cat: 'digital', source: 'Błysk · 21.01',
    desc: 'Nowy kontakt pisze „wogóle” razem. Tak samo napisała i.k_00 w listopadzie, kiedy przyznała się do wycięcia 40 sekund nagrania z mostu.' }
});

DATA.web.tt_kronika = {
  id: 'tt_kronika', url: 'klipo.app/@kronika.mglisko', title: 'kronika mglisko (@kronika.mglisko) | Klipo', site: 'tt', fav: '♪', favColor: '#111',
  kw: ['kronika mglisko', 'kronika.mglisko', '@kronika', 'tv dolina', 'studniówka 1999', 'kronika klipo'],
  snippet: '@kronika.mglisko · „każdy ma swoje 30 sekund”',
  avail: 'flag:c_started', ev: 'ev_c_klip1',
  html: () => {
    const clips = [
      ['18.01 · 21:00', 'studniówka, 1999. „jutro kolejna osoba”', '34 tys.'],
      ['19.01 · 21:00', 'boisko, 2008. kto wygrał przetarg', '51 tys.'],
      ['20.01 · 21:00', 'festyn, 2011. jutro: O.N.', '77 tys.'],
      ['21.01 · 21:00', G.flag('c_zenonDefended') ? 'przerwa. „ktoś za bardzo się wtrąca”' : 'adres operatora? sami znajdźcie', '90 tys.']
    ].slice(0, G.flag('c_day4') ? 4 : G.flag('c_day3') ? 3 : G.flag('c_day2') ? 2 : 1).reverse();
    return `<header class="tt-h"><b>klipo</b></header><main class="tt-m">
      <div class="tt-prof"><b>@kronika.mglisko</b><p>tv dolina 1996–2014. każdy ma swoje 30 sekund</p></div>
      ${clips.map(([t, d, v]) => `<article class="tt-v"><p><b>${t}</b> · ▶ ${v}</p><p>${d}</p></article>`).join('')}
      <div class="tt-com"><p><b>gosia_z_bielawy</b> moja ciocia tam tańczy 😭</p><p><b>m.kowal</b> kto ma te kasety to wiadomo. operator</p><p><b>sylwia_salon</b> Proszę bez adresów w komentarzach.</p></div></main>`;
  }
};

(() => {
  if (typeof Art === 'undefined') return;
  for (const [id, src, title, w, h] of [
    ['c_studniowka', 'assets/kronika/c_studniowka.jpg', 'TV Dolina · studniówka 1999', 1024, 768],
    ['c_boisko', 'assets/kronika/c_boisko.jpg', 'TV Dolina · boisko 2008', 1024, 768],
    ['c_pokoj_kaset', 'assets/kronika/c_pokoj_kaset.jpg', 'Pokój pana Zenona', 1024, 768],
    ['c_blok_noc', 'assets/kronika/c_blok_noc.jpg', 'Parking · 23:41', 768, 1024],
    ['c_ida_pies', 'assets/kronika/c_ida_pies.jpg', 'Pierwszy śnieg', 768, 1024],
    ['c_lodowisko', 'assets/kronika/c_lodowisko.jpg', 'Lodowisko', 768, 1024],
    ['c_festyn', 'assets/kronika/c_festyn.jpg', 'TV Dolina · festyn 2011', 1024, 768],
    ['c_ryz', 'assets/kronika/c_ryz.jpg', 'Serwis Igora', 768, 1024],
    ['c_gorka', 'assets/kronika/c_gorka.jpg', 'Górka za blokami', 768, 1024],
    ['c_rysunek', 'assets/kronika/c_rysunek.jpg', 'Świetlica', 768, 1024],
    ['c_klatka', 'assets/kronika/c_klatka.jpg', 'Klatka schodowa · 0:12', 768, 1024],
    ['v_festyn', 'assets/video/v_festyn.jpg', 'festyn, 2011', 360, 270],
    ['v_studniowka', 'assets/video/v_studniowka.jpg', 'studniówka, 1999', 360, 270],
    ['v_telewizor', 'assets/video/v_telewizor.jpg', 'on śpi', 360, 640]
  ]) Art.def(id, { src, title, w, h, draw: () => '' });
})();

/* Sezon 4: ten sam zapis. Identyfikatory odcinków są kontraktem zapisu. */
DATA.seasons.push({
  id: 's4', revision: 1, title: 'Kronika', kicker: 'SPRAWA 4', released: true,
  description: 'Ferie w Mglisku. Codziennie o 21:00 ktoś wrzuca trzydzieści sekund starej kroniki kablówki. Jutro kolejna osoba.',
  chapters: ['c0', 'c1', 'c2', 'cf', 'c3', 'c4'],
  credits: {
    kicker: 'Koniec sprawy 4', title: 'KRONIKA',
    lines: [
      'Każdy ma swoje trzydzieści sekund. Nie każdy chce je oglądać.',
      'Wszystkie osoby, konta i usługi w tej sprawie są fikcyjne. TV Dolina, Klipo i Błysk nie istnieją.',
      'Dziękujemy, że {pytałeś|pytałaś}, kto trzyma kamerę.'
    ],
    teaser: { title: 'MGLISKO', text: 'Lodowisko otwierają w lutym. Bałwan z pachołkiem jeszcze stoi.' },
    note: 'Inne zakończenia: Ustawienia → Rozdziały → Sprawa 4 · Rozdział 5.'
  },
  episodes: [
    ['s4.01', 'Studniówka', 'c0', 'ev:ev_c_klip1'],
    ['s4.02', 'TV Dolina', 'c1', 'ev:ev_c_tv'],
    ['s4.03', 'Boisko', 'c1', 'ev:ev_c_boisko'],
    ['s4.04', 'O.N.', 'c2', 'flag:c_day3'],
    ['s4.05', 'Okno', 'c2', 'ev:ev_c_okno'],
    ['s4.06', 'Pies', 'c2', 'ev:ev_c_spacer'],
    ['s4.06b', 'Festyn', 'cf', 'flag:c_festynSeen'],
    ['s4.07', 'Pokój z kasetami', 'c3', 'ev:ev_c_pokoj'],
    ['s4.08', 'Wogóle', 'c3', 'ev:ev_c_wogole'],
    ['s4.09', '20:58', 'c4', s => !!G.s.vars.s4Ending]
  ].map(([id, title, chapter, done]) => ({ id, title, chapter, done }))
});

Object.assign(DATA.endings, {
  przewiniecie: {
    season: 's4', title: 'PRZEWINIĘCIE', tag: 'Sprawa 4 · zakończenie 1 z 3', mood: 'dawn',
    text: [
      'O 20:59 konto @kronika.mglisko znika. Klip z Olą się nie pojawia.',
      'Ida mówi dziadkowi o wszystkim w kuchni, przy herbacie. Pan Zenon długo milczy, potem pyta tylko, czy pies był wyprowadzony.',
      'W lutym kasety jadą do archiwum gminy. Na każdej jest nowa naklejka: „do pamięci, nie do Klipo”.',
      () => G.flag('c_olaFirst') ? 'Ola sama opowiada o festynie w grupie. Pod jej wpisem są trzy serduszka i jeden komentarz: „też byłam głupia w liceum”.' : 'Ola nigdy się nie dowiaduje, jak blisko było.'
    ]
  },
  transmisja: {
    season: 's4', title: 'TRANSMISJA', tag: 'Sprawa 4 · zakończenie 2 z 3', mood: 'dark',
    text: [
      'O 21:00 klip pojawia się na Klipo. Festyn, 2011. Ola Nowicka, siedemnaście lat, i dziewczyna z Bielawy z krwią na twarzy.',
      'Ola nie przychodzi w poniedziałek do pracy. Pisze tylko: „wiedział{eś|aś}?”.',
      'Ida wyjeżdża z Mgliska pierwszym busem. Ostatnia wiadomość na Błysku znika, zanim zdążysz ją przeczytać do końca.',
      () => G.flag('c_zenonDefended') ? 'Pan Zenon dalej wyprowadza psa. Sam, o szóstej rano. Ktoś zmazał mu z drzwi napis.' : 'Na drzwiach pana Zenona ktoś pisze sprayem „KAMERZYSTA”. Pan Zenon nie zmywa.'
    ]
  },
  kopia2: {
    season: 's4', title: 'DRUGA KOPIA', tag: 'Sprawa 4 · zakończenie 3 z 3', mood: 'dark',
    text: [
      'Ida usuwa konto. Wcześniej przysyła ci link do folderu: „całość. teraz to twój problem”.',
      'Folder ma 1438 plików. Nie otwierasz go. Przez pierwszy tydzień.',
      'W marcu ktoś z Mgliska pyta w grupie, czy to prawda, że „ktoś ma całą kronikę”. Sylwia kasuje pytanie po minucie.',
      'Nikt nie wie, że to ty.'
    ]
  }
});
