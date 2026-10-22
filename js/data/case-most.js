'use strict';
/* Sprawa nr 2 „Most” (docs/SPRAWA-2-PLAN.md): obsada, dowody, strony WWW i sezon.
   Prawda z 2011 r. i zwrot (Marta jest córką Janiny Kurek) są tu tylko w danych autorskich,
   nie w tekstach widocznych przed odpowiednią sesją. */

Object.assign(DATA.chars, {
  marta: {
    name: 'Marta Jasińska', short: 'Marta', age: 24, trust: true, color: '#c9a76b',
    role: 'Archiwum i montaż audio · Gazeta Sudecka',
    bio: 'Digitalizuje stare kasety redakcji. Ma w głowie godziny i minuty z każdego nagrania.',
    status: 'w archiwum do 18', number: '694 117 302'
  },
  natan: {
    name: 'Natan Brzeziński', short: 'Natan', age: 25, trust: true, color: '#6fb0e8',
    role: 'Operator obrazu · GS Wideo',
    bio: 'Kręci, montuje, wrzuca. Czasem w tej kolejności.',
    status: 'na planie', number: '511 284 690'
  },
  janina: {
    name: 'Janina Kurek', short: 'J. Kurek', age: 48, color: '#9aa3b5',
    role: 'Współwłaścicielka Kurek-Bud sp. z o.o.'
  },
  henryk: {
    name: 'Henryk Wiśniewski', short: 'Pan Henryk', age: 74, trust: true, color: '#b49a7a',
    role: 'Emeryt, dawniej brygadzista', number: '74 832 55 19',
    voicemail: '„Wiśniewski. Mnie nie ma. Proszę mówić po sygnale. Głośno.”'
  },
  krystyna: { name: 'Krystyna Kruk', short: 'Pani Krystyna', age: 71 },
  gs_sek: { name: 'Gazeta Sudecka · sekretariat', short: 'Sekretariat', number: '74 832 10 40' }
});
Object.assign(DATA.chats, {
  marta: { name: '+48 694 117 302', avatar: 'unknown' },
  natan: { name: 'Natan Brzeziński', avatar: 'natan', sub: 'GS Wideo' }
});

Object.assign(DATA.persons, {
  marta: {
    name: 'Marta Jasińska', role: '24 lata · archiwum Gazety Sudeckiej', cond: 'flag:m_martaVerified',
    facts: [
      { text: 'Zgłosiła się z prywatnego numeru. Sekretariat redakcji potwierdził, że pracuje w archiwum (pokój 12).' },
      { text: 'Rybicki zdigitalizował kasetę „H.W. 2/2” w 2019 r. Plik jest w archiwum redakcji. Części 1/2 nie ma ani tam, ani w pudle.' },
      { text: 'Zna rozkład biura Kurek-Bud: „robiłam tam kiedyś praktyki”.', cond: 'ev:ev_m_praktyki' }
    ]
  },
  henryk: {
    name: 'Henryk Wiśniewski', role: '74 lata · brygadzista przy remoncie mostu w 2011', cond: 'flag:m_metHenryk',
    facts: [
      { text: 'To „pan Henryk” z grupy na Kwartale. Jego wcześniejszych relacji nikt nie traktował poważnie.' },
      { text: 'Twierdzi, że nagranie „jest nie całe”. Na razie to tylko jego słowa.' },
      { text: 'Mówi, że Darek był trzeźwy. Relacja, nie ustalenie: nikt jej jeszcze nie sprawdził.', cond: 'flag:m_henrykSober' }
    ]
  },
  janina: {
    name: 'Janina Kurek', role: '48 lat · współwłaścicielka Kurek-Bud', cond: 'ev:ev_m_kb_statement',
    facts: [
      { text: 'W 2011 r. kierowała kontraktem remontu mostu.' },
      { text: 'Oświadczenie firmy po publikacji: uprzejme, punkt po punkcie, bez odpowiedzi na pytania redakcji.' }
    ]
  }
});

Object.assign(DATA.evidence, {
  ev_m_teczka: {
    title: 'Teczka „KRUK / MOST / 2011”', cat: 'object', source: 'Pudło Rybickiego · zdjęcie Mai', img: 'most_teczka',
    desc: 'Opis ołówkiem: *„KRUK / MOST / 2011 — NIE PUBLIKOWAĆ BEZ K.”* W środku: notes A5, kaseta mini-DV „H.W. 2/2”, ksero strony 41 dziennika robót, pocztówka bez nadawcy, wycinek z 2012 r. Rodzina Rybickiego zgodziła się na katalog, nie na publikację.'
  },
  ev_m_notes: {
    title: 'Notes Rybickiego, 14.09–02.12.2011', cat: 'testimony', source: 'Teczka KRUK',
    desc: 'Krótkie notatki z rozmów po śmierci Darka Kruka. Same inicjały i skróty. Powtarza się *„K.”*: „K. — nie dzwonić, tylko osobiście”, „K. przyniosła ksero”. Nie wiadomo, kim jest K.'
  },
  ev_m_dv: {
    title: 'Kaseta mini-DV „H.W. 2/2”', cat: 'digital', source: 'Teczka KRUK', img: 'most_hw',
    desc: 'Druga część rozmowy z „H.W.”, nagranej w październiku 2011. *Części 1/2 brak.* Bez niej wypowiedzi są wyrwane z kontekstu.'
  },
  ev_m_s41: {
    title: 'Ksero dziennika robót, str. 41', cat: 'photo', source: 'Teczka KRUK', img: 'most_s41',
    desc: 'Wpis z *13.09.2011*: „Siatka zabezpieczająca — brak, zgłoszone kier. kontraktu.” Podpis H.W. Kserokopia bez pieczątki; oryginał nieznany. To jeszcze nie dowód, kto i co zgłosił.'
  },
  ev_m_postcard: {
    title: 'Pocztówka bez nadawcy', cat: 'msg', source: 'Teczka KRUK', img: 'most_postcard',
    desc: '„Panie Adamie, proszę o nic więcej nie pytać. *Dziękuję za mleko.*” Bez podpisu i daty. Charakteru pisma nie da się przypisać bez porównania.'
  },
  ev_m_clip2012: {
    title: 'Wycinek „Głos Doliny”, 9.03.2012', cat: 'object', source: 'Teczka KRUK', img: 'most_clip',
    desc: 'Prokuratura umarza sprawę śmierci Dariusza K.: „nieszczęśliwy wypadek, bez udziału osób trzecich”. Wykonawca, firma *Kurek-Bud*, nie komentuje. O siatce i dzienniku ani słowa.'
  },
  ev_m_most2011: {
    title: 'Most nad Mglicą, wrzesień 2011', cat: 'place', source: 'Archiwum Gazety Sudeckiej · zdjęcie czytelnika', img: 'most_2011',
    desc: 'Remont przęsła II: rusztowania, plandeki, niski stan wody, skały pod przęsłem. Zdjęcie nie ma daty dziennej. Na tym kadrze nie widać siatki zabezpieczającej, ale też nie widać całego przęsła.'
  },
  ev_m_gs: {
    title: '„Most 2011. Brygadzista: moja wina” · GS Wideo', cat: 'digital', source: 'gazetasudecka.pl/wideo', img: 'most_hw',
    desc: 'Fragment 0:40. Henryk W. mówi: „ja tej siatki nie założyłem z powrotem, moja wina”. Na pierwszej klatce znak czasu kamery *17:22:08*. W opisie cytat z notesu Rybickiego: „K. przyniosła ksero, dziękuje za mleko”.'
  },
  ev_m_klipo: {
    title: 'Repost na Klipo · @sudety.prawda', cat: 'digital', source: 'klipo.app/@sudety.prawda', img: 'most_hw',
    desc: 'Ten sam fragment, 0:40, z napisem „ON SIĘ PRZYZNAŁ”. Pierwsza klatka: *17:22:08*. W rogu widać jeszcze pasek z logo GS Wideo.'
  },
  ev_m_tyg: {
    title: '„Tydzień w Sudetach” · wideo do artykułu', cat: 'digital', source: 'tydzienwsudetach.pl', img: 'most_hw',
    desc: 'Ta sama wypowiedź, pierwsza klatka *17:22:08*, ale *0:42*. Bez paska GS Wideo. Pod tekstem zdjęcie Janiny Kurek z sesji rady gminy.'
  },
  ev_m_kb_statement: {
    title: 'Oświadczenie Kurek-Bud', cat: 'msg', source: 'Natan · mail do redakcji',
    desc: '„Szanowni Państwo” i trzy punkty: firma „z szacunkiem wspomina zmarłego pracownika”, postępowanie z 2012 r. „jednoznacznie wykluczyło udział osób trzecich”, a na dalsze pytania odpowie „na piśmie, w ustawowym terminie”.'
  },
  ev_m_one: {
    title: 'Trzy publikacje = jeden plik', cat: 'digital', source: 'Porównanie: GS Wideo, Klipo, Tydzień w Sudetach',
    desc: 'Ta sama pierwsza klatka i znak czasu *17:22:08*. Klipo to zapis ekranu z GS Wideo. *Tygodnik ma 0:42*, czyli dwie sekundy więcej niż „oryginał” redakcji, i nie ma paska GS. Musiał dostać plik skądinąd.'
  },
  ev_m_praktyki: {
    title: 'Marta zna biuro Kurek-Bud', cat: 'testimony', source: 'Marta · wiadomość',
    desc: '„Sekretariat na parterze, gabinety na drugim, od podwórza.” Marta: „robiłam tam kiedyś praktyki”. Zwykła informacja. Zapisana na wszelki wypadek.'
  }
});

/* Zdjęcia: assets/most (scena) i assets/people (portrety). */
(() => {
  if (typeof Art === 'undefined') return;
  const P = (id, file, title, w, h, exif) => Art.def(id, { src: 'assets/most/' + file, title, w, h, exif, draw: () => '' });
  P('most_teczka', 'teczka_kruk.jpg', 'Teczka KRUK', 1280, 960, { date: '20.11.2026', time: '19:31', device: 'iPhone 13 · aparat główny', place: 'Mglisko, ul. Lipowa', file: 'IMG_4471.HEIC' });
  P('most_s41', 'dziennik_s41.jpg', 'Dziennik robót, str. 41 (ksero)', 960, 1280, { date: '20.11.2026', time: '19:36', device: 'iPhone 13 · aparat główny', file: 'IMG_4474.HEIC' });
  P('most_postcard', 'pocztowka.jpg', 'Pocztówka bez nadawcy', 1280, 960, { date: '20.11.2026', time: '19:37', device: 'iPhone 13 · aparat główny', file: 'IMG_4475.HEIC' });
  P('most_clip', 'wycinek_2012.jpg', 'Wycinek z 2012', 1280, 960, { date: '20.11.2026', time: '19:38', device: 'iPhone 13 · aparat główny', file: 'IMG_4476.HEIC' });
  P('most_2011', 'most_2011.jpg', 'Most nad Mglicą · IX 2011', 1280, 960, { date: '09.2011', time: '—', device: 'Canon PowerShot A480', file: 'IMG_0912.JPG', note: 'Data dzienna nieustawiona w aparacie' });
  P('most_hw', 'hw_kadr.jpg', 'H.W. 2/2 · kadr', 1280, 720, { date: '10.2011', time: '17:22:08', device: 'mini-DV · zgrane w 2019', file: 'HW_2z2.mov' });
  const life = { marta: 'Archiwum, piąta po południu', natan: 'Pod redakcją', janina: 'Sesja rady gminy', henryk: 'Ławka pod blokiem' };
  Object.entries(life).forEach(([who, title]) => {
    const c = DATA.chars[who];
    c.photo = 'assets/people/' + who + '.jpg';
    const id = 'life_' + who + '_1';
    Art.def(id, { src: 'assets/people/' + who + '_life1.jpg', title, w: 1200, h: 900, draw: () => '' });
    c.life = [id];
  });
})();

/* Internet sprawy nr 2. Strony są dostępne dopiero od sesji, w której pojawia się nagranie. */
(() => {
  if (!DATA.web) return;
  const img = id => `<img src="${Art.url(id)}" alt="" data-img="${id}">`;
  const gsHead = () => `<header class="gz-h"><div class="gz-top"><span>Dzierżoniów · Wałbrzych · Kłodzko</span><span>Archiwum od 1991</span></div><div class="gz-mast">Gazeta Sudecka</div></header>`;
  DATA.web.gs_kontakt = {
    id: 'gs_kontakt', url: 'gazetasudecka.pl/kontakt', title: 'Kontakt z redakcją — Gazeta Sudecka', site: 'gazeta', fav: 'G', favColor: '#7b2b21',
    kw: ['gazeta sudecka kontakt', 'kontakt gazeta sudecka', 'redakcja gazety sudeckiej', 'gazeta sudecka telefon', 'sekretariat redakcji', 'redakcja kontakt', 'gazeta sudecka archiwum'],
    snippet: 'Sekretariat redakcji: 74 832 10 40 (pn–pt 8–18). Archiwum: pokój 12.',
    avail: 'flag:m_case',
    html: () => `${gsHead()}<main class="gz-m gz-art"><h1>Kontakt</h1>
      <p><b>Sekretariat redakcji</b><br>tel. <b>74 832 10 40</b> (pn–pt 8:00–18:00)<br>ul. Kolejowa 3, 58-200 Dzierżoniów</p>
      <p><b>Archiwum i dokumentacja</b><br>pokój 12 · połączenie przez sekretariat</p>
      <p><b>GS Wideo</b><br>wideo@gazetasudecka.pl</p>
      <p class="gz-small">Nie prosimy czytelników o przesyłanie materiałów przez prywatne komunikatory. Pracownika redakcji zawsze możesz potwierdzić w sekretariacie.</p></main>`
  };
  DATA.web.gs_most = {
    id: 'gs_most', url: 'gazetasudecka.pl/wideo/most-2011-brygadzista', title: 'Most 2011. Brygadzista: „moja wina” — GS Wideo', site: 'gazeta', fav: 'G', favColor: '#7b2b21',
    kw: ['most 2011', 'brygadzista moja wina', 'gs wideo', 'gazeta sudecka wideo', 'most kolejowy nagranie', 'henryk w', 'nagranie most', 'kruk most nagranie', 'moja wina'],
    snippet: 'Fragment nieznanej dotąd rozmowy z brygadzistą remontu mostu nad Mglicą (2011). 0:40.',
    avail: 'flag:m_clipOut', ev: 'ev_m_gs',
    html: () => `${gsHead()}<main class="gz-m gz-art"><div class="gz-kick">GS Wideo · Region</div>
      <h1>Most 2011. Brygadzista: „moja wina”</h1>
      <figure>${img('most_hw')}<figcaption>▶ 0:40 · kadr z kasety mini-DV, X 2011</figcaption></figure>
      <p>Fragment nieznanej dotąd rozmowy, którą śp. Adam Rybicki nagrał w październiku 2011 r. z brygadzistą remontu mostu kolejowego nad Mglicą. Miesiąc wcześniej przy remoncie zginął 30-letni Dariusz K.</p>
      <p><i>${G.flag('m_quoteRemoved') ? '[Opis zaktualizowany 23.11.2026, 21:14]' : 'Z notesu Rybickiego: „K. przyniosła ksero, dziękuje za mleko”.'}</i></p>
      <p class="gz-small">Oprac. N. Brzeziński · 22.11.2026, 20:05 · 18 komentarzy</p></main>`
  };
  DATA.web.tt_most = {
    id: 'tt_most', url: 'klipo.app/@sudety.prawda', title: 'sudety prawda (@sudety.prawda) | Klipo', site: 'tt', fav: '♪', favColor: '#111',
    kw: ['sudety prawda', 'sudety.prawda', 'on się przyznał', 'klipo most', 'most klipo', 'brygadzista klipo'],
    snippet: '@sudety.prawda · „ON SIĘ PRZYZNAŁ” · 112 tys. wyświetleń',
    avail: 'flag:m_clipOut', ev: 'ev_m_klipo',
    html: () => `<header class="tt-h"><b>klipo</b></header><main class="tt-m">
      <article class="tt-v"><div class="tt-frame">${img('most_hw')}<span>▶ 112 tys.</span></div>
      <p><b>ON SIĘ PRZYZNAŁ</b> 😡 13 lat ciszy i nagle „moja wina”. #mglisko #most #sudety</p>
      <div class="tt-com"><p><b>gosia_z_bielawy</b> a mówili wypadek</p><p><b>m.kowal</b> stary wisniewski z wodnej? on zawsze sie myli</p><p><b>zuzakruk_</b> skad macie to nagranie? to jest wyciete z dluzszego</p></div></article></main>`
  };
  DATA.web.tyg_most = {
    id: 'tyg_most', url: 'tydzienwsudetach.pl/region/most-nad-mglica', title: 'Kto zdjął siatkę? Pytania po 15 latach — Tydzień w Sudetach', site: 'gazeta', fav: 'T', favColor: '#2c5b3f',
    kw: ['tydzień w sudetach', 'tydzien w sudetach', 'kto zdjął siatkę', 'tygodnik most', 'kurek-bud', 'kurek bud', 'janina kurek'],
    snippet: '„Ja tej siatki nie założyłem”. Nagranie z 2011 r. wraca do Mgliska. Firma: postępowanie zakończone.',
    avail: 'flag:m_clipOut', ev: 'ev_m_tyg',
    html: () => `<header class="gz-h"><div class="gz-top"><span>Tygodnik regionalny</span><span>od 2004</span></div><div class="gz-mast" style="color:#2c5b3f">Tydzień w Sudetach</div></header><main class="gz-m gz-art">
      <h1>Kto zdjął siatkę? Pytania po 15 latach</h1>
      <figure>${img('most_hw')}<figcaption>▶ 0:42 · nagranie z 2011 r., materiał nadesłany</figcaption></figure>
      <p>Brygadzista Henryk W. na nagraniu z 2011 roku mówi, że nie założył z powrotem siatki zabezpieczającej. Wykonawca remontu przypomina, że prokuratura umorzyła postępowanie w 2012 roku.</p>
      <figure>${img('life_janina_1')}<figcaption>Janina Kurek, współwłaścicielka Kurek-Bud, podczas sesji rady gminy. Fot. TwS</figcaption></figure>
      <p class="gz-small">23.11.2026 · red.</p></main>`
  };
})();

/* Sezon 2: osobne wydanie, ten sam zapis. Identyfikatory odcinków są kontraktem zapisu. */
DATA.seasons.push({
  id: 's2', revision: 1, title: 'Most', kicker: 'SPRAWA 2', released: true,
  description: 'Czterdzieści sekund z kasety z 2011 roku. Jedno zdanie, które wszyscy już usłyszeli.',
  chapters: ['m0', 'm1'],
  episodes: [
    ['s2.01', 'Teczka KRUK', 'm0', 'ev:ev_m_teczka'],
    ['s2.02', 'Most czy praca', 'm0', 'flag:m_sameEvent'],
    ['s2.03', 'Numer redakcji', 'm0', 'flag:m_martaVerified'],
    ['s2.04', 'Czterdzieści sekund', 'm1', 'ev:ev_m_gs'],
    ['s2.05', 'Trzy publikacje', 'm1', 'ev:ev_m_one'],
    ['s2.06', 'Dwie sekundy więcej', 'm1', 'flag:m_act1']
  ].map(([id, title, chapter, done]) => ({ id, title, chapter, done }))
});
