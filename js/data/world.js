'use strict';
/* Osoby, oś czasu, wnioski, mapa, zdjęcia z panelu BushView. */

const any = (...conds) => () => conds.some(c => G.test(c));

DATA.persons = {
  maja: {
    name: 'Maja Wrona', role: 'zaginiona · 22 lata · studentka fotografii ASP', cond: 'flag:knowMaja', tag: { text: 'zaginiona', kind: 'bad', cond: '!flag:majaFound' },
    facts: [
      { text: 'Zaginęła w nocy z 14 na 15 października. Do ciebie zadzwoniła o 23:47 — to jej ostatnie połączenie.' },
      { text: 'Myślała, że pisze do dziennikarza Adama Rybickiego. Twój numer kiedyś należał do niego.', cond: 'ev:ev_obit' },
      { text: 'Robi dyplom „Szkło pamięta” o opuszczonej hucie „Jutrzenka”.', cond: 'ev:ev_project' },
      { text: 'W szafce 17 w hucie znalazła jednorazowy aparat z kliszą z 1997 roku.', cond: any('ev:ev_darkroom', 'ev:ev_szafka17') },
      { text: '14.10 jej telefon był w *hucie*, nie na tamie. Ostatni sygnał: 23:58.', cond: 'ev:ev_loc_1410' },
      { text: 'Nie ufała komendantowi Gajdzie: „Właśnie nie na policję”, „Zwłaszcza R.G.”', cond: any('ev:ev_not_gajda', 'ev:ev_questions') },
      { text: 'Wybiła otwór w zamurowanej odprężarce i zobaczyła żółty materiał.', cond: 'ev:ev_sync_wall' },
      { text: '24.10 jej telefon na chwilę ożył w lesie. „Pozdrów Kluskę” — Maja daje znak, że jest w niebezpieczeństwie.', cond: 'ev:ev_sms_kluska' }
    ]
  },
  kuba: {
    name: 'Kuba Wrona', role: 'brat Mai · 19 lat', cond: 'flag:knowKuba',
    facts: [
      { text: 'Napisał do ciebie, bo twój numer był ostatnim, pod który dzwoniła Maja (sprawdził biling mamy).' },
      { text: 'Nie wierzy w samobójstwo siostry.' },
      { text: 'Długo uważał komendanta Gajdę za „prawie wujka” — Gajda pomagał rodzinie, gdy ojciec się wyprowadził.', cond: 'flag:kubaGajda' }
    ]
  },
  ola: {
    name: 'Ola Nowicka', role: 'przyjaciółka Mai · technik farmacji', cond: 'unlocked:chat:group',
    facts: [
      { text: 'Przyjaźni się z Mają od podstawówki.' },
      { text: 'Twierdziła, że ostatni raz pisała z Mają 12.10. *Skłamała* — 13.10 się pokłóciły.', cond: 'ev:ev_ola_fight' },
      { text: 'Maja powiedziała jej: „Nie do Gajdy. Nie pytaj dlaczego. Jeszcze nie.”', cond: 'ev:ev_not_gajda' }
    ]
  },
  bartek: {
    name: 'Bartek Sowa', role: 'były chłopak Mai · mechanik w Auto-Sowa', cond: 'unlocked:chat:group',
    facts: [
      { text: 'Rozstał się z Mają w kwietniu. Nadal mu na niej zależy.' },
      { text: '14.10 spotkał się z Mają na stacji. Pytała o jego ojca.', cond: 'ev:ev_bartek_conf' },
      { text: 'Przyznał, że w nocy z 21 na 22.10 poszedł sam do huty. Rozpoznał siebie na zdjęciu.', cond: 'ev:ev_bartek_conf' },
      { text: 'Jego ojciec, Marek Sowa, był jednym z czterech chłopaków w hucie w 1997.', cond: 'ev:ev_interview' },
      { text: 'Rozpoznał tablicę DDZ 6K19 — auto Gajdy, serwisowane w ich warsztacie.', cond: 'ev:ev_owner' }
    ]
  },
  igor: {
    name: 'Igor Malicki', role: 'informatyk · serwis GSM-PC · syn wójta', cond: 'unlocked:chat:group', tag: { text: 'Szklarz', kind: 'acc', cond: 'solved:ded_szklarz' },
    facts: [
      { text: 'Pomógł Mai skonfigurować fotopułapki.', cond: 'ev:ev_igor_cams' },
      { text: 'Skanował negatywy. Twierdził, że kadr 23 „jest prześwietlony”.', cond: 'ev:ev_igor_lie' },
      { text: 'Jego ojciec, wójt Leszek Malicki, był w 1997 jednym z czterech chłopaków.', cond: 'ev:ev_interview' },
      { text: 'Ulubione powiedzonko: „technicznie rzecz biorąc”.', cond: 'ev:ev_igor_phrase' },
      { text: 'To on jest Szklarzem. Rozpoznał ojca na kadrze 23 i powiedział mu o filmie.', cond: 'solved:ded_szklarz' }
    ]
  },
  weronika: {
    name: 'Weronika Lis', role: 'siostra Tomka · kierowniczka biblioteki', cond: any('ev:ev_article2007', 'unlocked:chat:weronika'),
    facts: [
      { text: 'Siostra zaginionego w 1997 Tomka. Co roku pali znicz nad Mglicą.', cond: 'ev:ev_article2007' },
      { text: '11.10 rozmawiała z Mają o Tomku. Maja nagrała rozmowę.', cond: 'seen:mj:au:wywiad' },
      { text: 'Rozpoznała tamagotchi brata na zdjęciu Mai.', cond: 'flag:weronikaToy' }
    ]
  },
  gajda: {
    name: 'Robert Gajda', role: 'asp. sztab. · komendant posterunku w Mglisku', cond: any('ev:ev_dam_news', 'ev:ev_mom_gajda', 'unlocked:chat:gajda'), tag: { text: 'podejrzany', kind: 'bad', cond: 'ev:ev_owner' },
    facts: [
      { text: 'Prowadzi poszukiwania Mai. Mówi o „wypadku lub samobójstwie”.', cond: 'ev:ev_dam_news' },
      { text: '13.10 odwiedził dom Wronów i pytał o projekt Mai w hucie.', cond: 'ev:ev_mom_gajda' },
      { text: 'Syn komendanta Zbigniewa Gajdy, który w 1997 szukał Tomka „w rzece”.', cond: 'ev:ev_questions' },
      { text: 'W 1997 miał 17 lat i był w hucie z Tomkiem i trzema kolegami.', cond: 'ev:ev_interview' },
      { text: 'Jego sevra DDZ 6K19 była pod hutą noc po zniknięciu Mai i ponownie 23.10.', cond: 'ev:ev_owner' },
      { text: 'Łowczy koła „Sokół”. Ma jedyny klucz do kraty sztolni Ewa.', cond: 'ev:ev_kolo' },
      { text: 'Na kadrze 23 z 1997: siedemnastolatek z ręką wyciągniętą w stronę aparatu.', cond: 'ev:ev_frame23' }
    ]
  },
  tomek: {
    name: 'Tomek Lis', role: 'zaginął 7/8 lipca 1997 · 9 lat', av: 'tomek', cond: 'ev:ev_article2007', tag: { text: '1997', kind: 'dead' },
    facts: [
      { text: 'Zniknął w noc powodzi. Miał na sobie żółtą pelerynę z kapturem.' },
      { text: 'Świadek widział go na drodze *do huty*, nie nad rzeką.' },
      { text: 'Nosił na szyi tamagotchi na sznurku.', cond: any('ev:ev_tomek', 'flag:heard:wywiad') },
      { text: 'Na kadrze 21 stoi w drzwiach huty. Przy piecu jest trzech starszych, czwarty wszedł bliżej aparatu.', cond: 'ev:ev_frame21' },
      { text: 'Jego tamagotchi leży pod zamurowanym fragmentem odprężarki.', cond: 'flag:weronikaToy' }
    ]
  },
  rybicki: {
    name: 'Adam Rybicki', role: 'dziennikarz Gazety Sudeckiej · zm. 2021', av: 'rybicki', cond: 'ev:ev_article2007', tag: { text: '†2021', kind: 'dead', cond: 'ev:ev_obit' },
    facts: [
      { text: 'W 2007 napisał reportaż o Tomku Lisie. Podał w nim swój numer telefonu.' },
      { text: 'Ten numer należy dziś do ciebie.', cond: 'flag:knowNumber' },
      { text: 'Zmarł w 2021. Zostawił niedokończony reportaż o powodzi.', cond: 'ev:ev_obit' }
    ]
  },
  darek: {
    name: 'Dariusz Kruk', role: 'sąsiad Lisów · zm. 2011', av: 'unknown', cond: any('ev:ev_dk97', 'ev:ev_questions', 'seen:web:m24_kruk'), tag: { text: '†2011', kind: 'dead' },
    facts: [
      { text: 'W 1997 miał 16 lat. Tomek chodził za nim „jak cień”.' },
      { text: 'Odmówił rozmowy z Rybickim w 2007.', cond: 'ev:ev_article2007' },
      { text: 'Zginął w 2011, spadając z mostu kolejowego. Powtarzał, że „musi coś komuś oddać”.', cond: 'seen:web:m24_kruk' },
      { text: 'Wydrapał „D.K. 97” w szafce 17 — to jego aparat znalazła Maja.', cond: 'ev:ev_dk97' }
    ]
  },
  leszek: {
    name: 'Leszek Malicki', role: 'wójt gminy Mglisko · ojciec Igora', av: 'leszek', cond: any('ev:ev_wojt_mail', 'ev:ev_interview', 'seen:web:gmina'),
    facts: [
      { text: '12.10 osobiście odpisał Mai, że archiwum huty nie istnieje i „odradza penetrowanie obiektu”.', cond: 'ev:ev_wojt_mail' },
      { text: 'W 1997 miał 16 lat. Był w hucie tamtej nocy.', cond: 'ev:ev_interview' },
      { text: 'Igor zapytał go o film 12.10. Ojciec od razu zadzwonił do Gajdy.', cond: 'ev:ev_igor_conf' }
    ]
  },
  marek: {
    name: 'Marek Sowa', role: 'właściciel Auto-Sowa · ojciec Bartka', av: 'marek', cond: any('ev:ev_interview', 'ev:ev_jacket'),
    facts: [
      { text: 'W 1997 miał 17 lat. Był w hucie tamtej nocy.', cond: 'ev:ev_interview' },
      { text: 'Skarbnik koła łowieckiego „Sokół”.', cond: 'ev:ev_kolo' },
      { text: 'Przyznał się: to on zamurował wejście do odprężarki. Decyzję podjął Robert.', cond: 'ev:ev_marek' }
    ]
  }
};

DATA.timeline = [
  { t: '1997-07-07T21:30', title: 'Noc powodzi. *Tomek Lis* (9 l.) wychodzi z domu w żółtej pelerynie.', cond: 'ev:ev_article2007', key: true },
  { t: '1997-07-07T22:00', title: 'Halina Mróz widzi „żółtą postać” na drodze do huty.', cond: 'ev:ev_article2007' },
  { t: '1997-07-07T23:30', title: 'Kadr 21: huta. W drzwiach — Tomek.', text: 'Przy piecu trzech, czwarty bliżej obiektywu. Dziecko w żółtej pelerynie stoi w drzwiach.', cond: 'ev:ev_frame21', key: true },
  { t: '1997-07-08T00:10', title: 'Tomek wpada przez podłogę do zalanego kanału pieca.', text: 'Ciało ukryto w odprężarce, wejście zamurowano.', cond: 'solved:ded_1997', key: true },
  { t: '2007-07-07T08:00', title: 'Reportaż Rybickiego „Dziesięć lat ciszy”.', cond: 'ev:ev_article2007', time: false },
  { t: '2011-09-14T06:50', title: 'Dariusz Kruk ginie przy remoncie mostu kolejowego.', cond: 'seen:web:m24_kruk', time: false },
  { t: '2021-02-11T12:00', title: 'Umiera Adam Rybicki. Jego numer trafia później do ciebie.', cond: 'ev:ev_obit', time: false },
  { t: '2026-10-03T16:02', title: 'Maja znajduje aparat w szafce 17.', cond: any('ev:ev_szafka17', 'ev:ev_darkroom') },
  { t: '2026-10-05T23:48', title: 'Maja wywołuje kliszę.', cond: 'ev:ev_darkroom' },
  { t: '2026-10-08T14:05', title: 'Maja odkrywa zamurowany fragment odprężarki.', cond: 'ev:ev_bricks' },
  { t: '2026-10-09T17:58', title: 'Igor konfiguruje fotopułapki Mai.', cond: 'ev:ev_igor_cams' },
  { t: '2026-10-10T19:20', title: 'Igor skanuje negatywy. „Kadr 23 prześwietlony”.', cond: 'ev:ev_igor_lie' },
  { t: '2026-10-11T16:05', title: 'Maja nagrywa rozmowę z Weroniką Lis.', cond: 'seen:mj:au:wywiad' },
  { t: '2026-10-12T18:44', title: 'Wójt Malicki odpisuje Mai: „odradzam penetrowanie obiektu”.', cond: 'ev:ev_wojt_mail' },
  { t: '2026-10-13T02:40', title: 'Fotopułapka 2: mężczyzna z latarką przy murze.', cond: 'ev:ev_cam2_0019', key: true },
  { t: '2026-10-13T15:02', title: 'Komendant Gajda odwiedza dom Wronów.', cond: 'ev:ev_mom_gajda' },
  { t: '2026-10-13T21:12', title: 'Maja pisze SMS do „Pana Adama” — trafia do ciebie.', cond: 'ev:ev_sms_maja' },
  { t: '2026-10-13T21:40', title: 'Kłótnia Mai i Oli.', cond: 'ev:ev_ola_fight' },
  { t: '2026-10-13T23:10', title: 'Ciemne auto pod domem Wronów.', cond: 'ev:ev_car_window' },
  { t: '2026-10-14T17:05', title: 'Maja spotyka się z Bartkiem na stacji.', cond: 'ev:ev_bartek_conf' },
  { t: '2026-10-14T22:57', title: 'Fotopułapka 1: Maja wchodzi na teren huty.', cond: 'ev:ev_cam1_maja', key: true },
  { t: '2026-10-14T23:31', title: 'SMS do Oli: „Przepraszam za wczoraj”.', cond: 'ev:ev_ola_sorry' },
  { t: '2026-10-14T23:44', title: 'Maja wybija otwór w murze odprężarki.', cond: 'ev:ev_sync_wall', key: true },
  { t: '2026-10-14T23:47', title: 'Ostatnie połączenie Mai — do ciebie. Nie odbierasz.', cond: 'ev:ev_missed', key: true },
  { t: '2026-10-14T23:53', title: 'W drzwiach hali staje mężczyzna z latarką.', cond: 'ev:ev_sync_door', key: true },
  { t: '2026-10-14T23:58', title: 'Telefon Mai traci sygnał w hucie.', cond: 'ev:ev_loc_1410' },
  { t: '2026-10-15T01:20', title: 'Ciemne auto przy bramie huty.', cond: 'ev:ev_cam1_car' },
  { t: '2026-10-15T06:40', title: 'Auto Mai „znalezione” na tamie.', cond: 'ev:ev_dam_news' },
  { t: '2026-10-21T21:03', title: 'Kuba pisze do ciebie.', cond: 'flag:knowKuba' },
  { t: '2026-10-22T02:13', title: 'Bartek nocą w hucie.', cond: 'ev:ev_bartek_conf' },
  { t: '2026-10-23T00:12', title: 'DDZ 6K19 znów pod hutą, gdy są tam Kuba i Igor.', cond: 'ev:ev_car_igor' },
  { t: '2026-10-24T03:05', title: 'Telefon Mai włączony w lesie. SMS do mamy.', cond: 'ev:ev_sms_kluska', key: true }
];

DATA.deductions = {
  ded_1997: {
    q: 'Co stało się z Tomkiem w noc powodzi?', kind: 'text',
    intro: 'Zbierz to, co wiesz o nocy z 7 na 8 lipca 1997 roku.',
    options: [
      { id: 'river', label: 'Utonął w Mglicy, porwany przez wodę — tak jak ustaliła policja.' },
      { id: 'huta', label: 'Zginął w hucie. Starsi chłopcy ukryli ciało w odprężarce i zamurowali wejście.' },
      { id: 'ran', label: 'Uciekł z domu w czasie ewakuacji i nigdy nie wrócił.' },
      { id: 'szklarz', label: 'Zabrał go „Szklarz” z miejscowej legendy.' }
    ],
    answer: 'huta',
    support: { need: 3, from: ['ev_frame21', 'ev_frame22', 'ev_toy', 'ev_bricks', 'ev_sync_wall', 'ev_tomek', 'ev_interview', 'ev_patch', 'ev_dk97', 'ev_frame23', 'ev_article2007'], prompt: 'Wybierz *trzy* dowody, które to pokazują.', fail: 'Szukaj dowodów, które wiążą Tomka z hutą i z murem w odprężarce.' },
    done: 'Tomek poszedł za chłopakami do huty (kadr 21). Wpadł przez spróchniałą podłogę do zalanej wody (kadr 22). Ktoś zdecydował, że nikt się nie dowie: fragment odprężarki zamurowano nowszą cegłą. Jego tamagotchi wciąż leży pod murem.'
  },
  ded_szklarz: {
    q: 'Kim jest Szklarz?', kind: 'person',
    intro: 'Ktoś zna fotopułapki Mai, zna jej skany i pisze do ciebie z nieznanego numeru. Kto?',
    options: [
      { id: 'kuba', label: 'Kuba', av: 'kuba' }, { id: 'ola', label: 'Ola', av: 'ola' }, { id: 'bartek', label: 'Bartek', av: 'bartek' },
      { id: 'igor', label: 'Igor', av: 'igor' }, { id: 'weronika', label: 'Weronika', av: 'weronika' }, { id: 'gajda', label: 'Gajda', av: 'gajda' }
    ],
    answer: 'igor',
    support: { need: 2, from: ['ev_igor_phrase', 'ev_szklarz_phrase', 'ev_igor_lie', 'ev_igor_cams', 'ev_frame23'], prompt: 'Wybierz *dwa* dowody, które to potwierdzają.', fail: 'Porównaj, jak pisze Szklarz, z tym, jak pisze ta osoba. I kto mógł mieć to, co Szklarz ci przysłał.' },
    fail: 'Kto miał dostęp do fotopułapek i do skanów negatywów?',
    done: 'Szklarz pisze „technicznie rzecz biorac” — jak Igor. Przysłał ci kadr 23, który „był prześwietlony”, a pełne skany miał tylko Igor. On też konfigurował fotopułapki. *Igor jest Szklarzem.*'
  },
  ded_who: {
    q: 'Kto porwał Maję?', kind: 'person',
    intro: 'Ktoś był w hucie 14.10 o 23:53. Ktoś wrócił tam o 1:20. Ktoś ma klucz do kraty w lesie.',
    options: [
      { id: 'gajda', label: 'Robert Gajda', av: 'gajda' }, { id: 'bartek', label: 'Bartek Sowa', av: 'bartek' }, { id: 'igor', label: 'Igor Malicki', av: 'igor' },
      { id: 'leszek', label: 'Leszek Malicki', av: 'leszek' }, { id: 'marek', label: 'Marek Sowa', av: 'marek' }, { id: 'ola', label: 'Ola Nowicka', av: 'ola' }
    ],
    answer: 'gajda',
    support: { need: 2, from: ['ev_plate', 'ev_owner', 'ev_kolo', 'ev_gajda_hunt', 'ev_sync_door', 'ev_frame23', 'ev_not_gajda', 'ev_questions', 'ev_cam1_car'], prompt: 'Wybierz *dwa* dowody, które wskazują sprawcę.', fail: 'Połącz samochód spod huty z właścicielem albo klucz do kraty z konkretną osobą.' },
    fail: 'Kto miał samochód pod hutą tamtej nocy? Kto ma klucz do kraty?',
    done: 'Sevra DDZ 6K19 komendanta Gajdy była pod hutą noc po zniknięciu Mai. Gajda jest łowczym koła, które trzyma klucz do kraty sztolni Ewa — i wymienił kłódkę 16.10. *Maję porwał Robert Gajda.*'
  }
};

/* ---------- mapa ---------- */
DATA.map = {
  w: 1000, h: 1300,
  places: {
    dom: { name: 'Dom Wronów', short: 'Wronowie', addr: 'ul. Szklarska 4', x: 602, y: 668, kind: 'home', desc: 'Tu mieszka Maja z mamą i Kubą. Ulica Szklarska prowadzi pod górę, prosto do huty.' },
    huta: { name: 'Huta Szkła „Jutrzenka”', short: 'Huta „Jutrzenka”', addr: 'koniec ul. Szklarskiej · ruina', x: 560, y: 430, kind: 'huta', desc: 'Zamknięta w 1996. Hale A i B, komin, szatnie, odprężarka. Brama zamknięta na łańcuch; od wschodu stara trafostacja.' },
    tama: { name: 'Tama Zalewu Mgliskiego', short: 'Tama', addr: 'droga wojewódzka, 3 km od rynku', x: 300, y: 690, kind: 'water', desc: 'Tu 15.10 o 6:40 znaleziono auto Mai i jej kurtkę na barierce.' },
    zalew: { name: 'Zalew Mgliski', x: 170, y: 610, kind: 'water', small: true, desc: 'Sztuczny zbiornik na Mglicy.' },
    stacja: { name: 'Stacja paliw „Mglica”', short: 'Stacja „Mglica”', addr: 'ul. Wrocławska 40', x: 742, y: 905, kind: 'poi', desc: '14.10 Maja spotkała się tu z Bartkiem.' },
    rynek: { name: 'Rynek', x: 520, y: 772, kind: 'poi', small: true },
    serwis: { name: 'Serwis GSM-PC', short: 'Serwis Igora', addr: 'Rynek 7', x: 492, y: 748, kind: 'poi', small: true, desc: 'Serwis telefonów i komputerów Igora Malickiego.' },
    urzad: { name: 'Urząd Gminy', addr: 'Rynek 1', x: 548, y: 742, kind: 'poi', small: true },
    biblioteka: { name: 'Biblioteka Gminna', addr: 'Rynek 9', x: 472, y: 800, kind: 'poi', small: true, desc: 'Pracuje tu Weronika Lis.' },
    apteka: { name: 'Apteka „Pod Sową”', addr: 'ul. Kościuszki 1', x: 552, y: 800, kind: 'poi', small: true, desc: 'Pracuje tu Ola.' },
    posterunek: { name: 'Posterunek Policji', addr: 'ul. Kościuszki 3', x: 590, y: 834, kind: 'police', small: true },
    autosowa: { name: 'Auto-Sowa', addr: 'ul. Wrocławska 22', x: 690, y: 868, kind: 'poi', small: true, desc: 'Warsztat Marka i Bartka Sowów.' },
    kosciol: { name: 'Kościół św. Barbary', x: 446, y: 722, kind: 'poi', small: true },
    wodna: { name: 'Bloki przy Wodnej', addr: 'ul. Wodna', x: 404, y: 846, kind: 'poi', small: true, desc: 'Tu w 1997 mieszkali Lisowie i Darek Kruk. Woda zalała parter.' },
    most: { name: 'Most kolejowy', x: 372, y: 952, kind: 'poi', small: true, desc: 'W 2011 zginął tu Dariusz Kruk.' },
    las: { name: 'Las na stoku Sowiej Kopy', x: 800, y: 290, kind: 'poi', cond: () => false },
    kopa: { name: 'Sowia Kopa', addr: '912 m n.p.m.', x: 836, y: 250, kind: 'poi', layer: 'forest' },
    anna: { name: 'Sztolnia Anna', addr: 'zachodni stok · trasa turystyczna', x: 712, y: 296, kind: 'adit', layer: 'forest', desc: 'Udostępniona do zwiedzania. Stróżówka, monitoring, kasa przy wejściu.' },
    ewa: { name: 'Sztolnia Ewa (nr 3)', addr: 'wschodni stok · za szlabanem', x: 880, y: 356, kind: 'adit', layer: 'forest', desc: 'Zamknięta stalową kratą. Przy wejściu paśnik koła łowieckiego.' },
    waltraud: { name: 'Sztolnia Waltraud', addr: 'północny stok', x: 800, y: 176, kind: 'adit', layer: 'forest', desc: 'Zalana od 1997, wejście częściowo zawalone.' },
    parking: { name: 'Parking „Pod Anną”', x: 650, y: 336, kind: 'poi', layer: 'forest', small: true },
    szlaban: { name: 'Szlaban leśny', addr: 'droga leśna nr 7', x: 768, y: 482, kind: 'gate', layer: 'forest', small: true, desc: 'Zamknięty na kłódkę. Za nim droga szutrowa na wschodni stok.' },
    a12: { name: 'Ambona A-12', x: 728, y: 214, kind: 'stand', layer: 'forest', small: true },
    a17: { name: 'Ambona A-17', x: 934, y: 404, kind: 'stand', layer: 'forest', small: true },
    a21: { name: 'Ambona A-21', x: 846, y: 140, kind: 'stand', layer: 'forest', small: true }
  }
};

/* ---------- panel BushView ---------- */
DATA.panelShot = () => {
  if (G.flag('panelGajda') && !G.flag('sawJerrycans')) { G.setFlag('sawJerrycans'); return 'c1_live_gajda'; }
  const hr = new Date(G.now()).getHours();
  return hr >= 7 && hr < 17 ? 'c1_live_day' : 'c1_live_night';
};
