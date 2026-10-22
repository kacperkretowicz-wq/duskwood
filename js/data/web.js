'use strict';
/* Internet w grze: strony, profile Kadr, akcje na stronach. */

(() => {
  const esc = U.esc;
  const im = (art, cls = '', title = '') => `<img class="${cls}" src="${Art.url(art)}" data-img="${art}" data-title="${esc(title)}" alt="">`;
  const go = (id, text) => `<a href="#" data-go="${id}">${text}</a>`;
  const q = (query, text) => `<a href="#" data-q="${esc(query)}">${text}</a>`;
  const P = s => U.rich(s).split('<br><br>').map(p => `<p>${p}</p>`).join('');

  const W = DATA.web = {};
  function page(id, o) { W[id] = Object.assign({ id }, o); }

  /* ================= Gazeta Sudecka ================= */
  const gzHead = () => `<header class="gz-h"><div class="gz-top"><span>Dzierżoniów · Wałbrzych · Kłodzko</span><span>Archiwum od 1991</span></div><div class="gz-mast">Gazeta Sudecka</div><nav class="gz-nav"><a href="#" data-go="gazeta_home">Strona główna</a><a href="#" data-go="gazeta_home">Region</a><a href="#" data-go="gazeta_home">Archiwum</a><a href="#" data-go="nekrolog">Wspomnienia</a></nav></header>`;
  page('gazeta_home', {
    url: 'gazetasudecka.pl', title: 'Gazeta Sudecka — wiadomości z regionu', site: 'gazeta', fav: 'G', favColor: '#7b2b21',
    kw: ['gazeta sudecka', 'gazeta', 'redakcja gazety', 'archiwum gazety'],
    snippet: 'Regionalny dziennik Sudetów. Archiwum artykułów od 1991 roku.',
    html: () => `${gzHead()}<main class="gz-m">
      <div class="gz-sec">Najnowsze</div>
      <article class="gz-card"><h3>Mglisko: rodzina zaginionej studentki prosi o pomoc</h3><p>Od tygodnia trwają poszukiwania 22-letniej Mai W. Policja: „nie wykluczamy żadnej wersji”.</p><small>19.10.2026</small></article>
      <div class="gz-sec">Z archiwum</div>
      <article class="gz-card"><h3>${go('gazeta2007', 'Dziesięć lat ciszy. Kto widział Tomka Lisa?')}</h3><p>Reportaż o chłopcu, który zniknął w noc powodzi. Adam Rybicki, 2007.</p><small>07.07.2007</small></article>
      <article class="gz-card"><h3>${go('nekrolog', 'Odszedł Adam Rybicki (1961–2021)')}</h3><p>Wspomnienie o naszym redakcyjnym koledze.</p><small>15.02.2021</small></article>
      <div class="gz-sec">Kontakt</div><p class="gz-small">Redakcja: ul. Świdnicka 12, Dzierżoniów · tel. <a href="#" data-call="748422010">74 842 20 10</a> · redakcja@gazetasudecka.pl</p></main>`
  });
  page('gazeta2007', {
    url: 'gazetasudecka.pl/archiwum/2007/07/dziesiec-lat-ciszy', title: 'Dziesięć lat ciszy. Kto widział Tomka Lisa?', site: 'gazeta', fav: 'G', favColor: '#7b2b21',
    kw: ['tomek lis', 'tomasz lis', 'tomka lisa', 'zaginiony chłopiec', 'zaginiony chlopiec mglisko', 'chłopiec powódź', 'dziesięć lat ciszy', 'rybicki artykuł', 'adam rybicki', 'rybicki', 'żółta peleryna', 'halina mróz', 'zaginięcie 1997', 'mglisko 1997', 'powódź mglisko', 'lis 1997'],
    snippet: '…w noc, gdy Mglica zabrała pół miasta, zniknął dziewięcioletni chłopiec. Oficjalnie — utonął. Ale ciała nigdy nie znaleziono…',
    ev: 'ev_article2007',
    html: () => `${gzHead()}<main class="gz-m gz-art">
      <div class="gz-kick">Reportaż · Archiwum</div>
      <h1>Dziesięć lat ciszy. Kto widział Tomka Lisa?</h1>
      <p class="gz-lead">Dziesięć lat temu, w noc, gdy Mglica zabrała pół miasta, zniknął dziewięcioletni chłopiec. Oficjalnie — utonął. Ale ciała nigdy nie znaleziono, a jedna kobieta do dziś powtarza, że widziała go zupełnie gdzie indziej.</p>
      <figure>${im('web_flood97', '', 'Ulica Wodna, 8 lipca 1997')}<figcaption>Ulica Wodna w Mglisku rano 8 lipca 1997. Fot. archiwum GS</figcaption></figure>
      ${P(`W nocy z 7 na 8 lipca 1997 roku woda w Mglicy podniosła się o cztery metry. Dolne Mglisko — bloki przy rzece, ulice Młyńska i Wodna — ewakuowano w ciągu kilku godzin. W chaosie nikt nie zauważył, kiedy z mieszkania przy Wodnej wyszedł *Tomasz Lis*, uczeń trzeciej klasy. Miał na sobie *żółtą pelerynę przeciwdeszczową z kapturem*.

Poszukiwania prowadził ówczesny komendant posterunku, *Zbigniew Gajda*. Od początku przyjęto, że chłopca porwał nurt. Strażacy i płetwonurkowie przeszukali koryto rzeki aż do Kłodzka. Bez skutku.

*Halina Mróz*, emerytowana szwaczka, mieszkała wtedy przy drodze prowadzącej na wzgórze, do zamkniętej rok wcześniej huty szkła „Jutrzenka”. — Szedł pod górę, nie w stronę rzeki. Mały, żółty, w kapturze. Myślałam, że to któreś dziecko z ewakuacji — mówi. Jej zeznanie trafiło do akt, ale nikt nie potraktował go poważnie. Budynki huty sprawdzono dopiero po dwóch tygodniach, pobieżnie: „bez śladów obecności dziecka”.

Pytam o tamtą noc chłopaków z podwórka. Niektórzy byli wtedy nastolatkami. Dariusz K., sąsiad Lisów, za którym Tomek — jak mówią — chodził krok w krok, odmawia rozmowy. — Nie mam nic do powiedzenia. Proszę stąd iść.

Matka Tomka zmarła w 2004 roku. Jego siostra Weronika co roku 8 lipca pali znicz nad Mglicą. — Nad rzeką, bo nie mam gdzie indziej — mówi.

Jeśli ktoś z Państwa pamięta tamtą noc, proszę o kontakt. Każda informacja może być ważna.`)}
      <div class="gz-foot"><b>Adam Rybicki</b> · Gazeta Sudecka, 7 lipca 2007<br>Kontakt z autorem: tel. <a href="#" data-call="692117305" class="gz-num">692 117 305</a>, a.rybicki@gazetasudecka.pl</div>
      <div class="gz-rel">Zobacz też: ${go('nekrolog', 'Odszedł Adam Rybicki (2021)')} · ${go('m24_powodz', '20 lat po powodzi (Mglisko24)')}</div></main>`
  });
  page('nekrolog', {
    url: 'gazetasudecka.pl/wspomnienia/adam-rybicki', title: 'Odszedł Adam Rybicki (1961–2021)', site: 'gazeta', fav: 'G', favColor: '#7b2b21',
    kw: ['adam rybicki', 'rybicki', 'rybicki dziennikarz', 'rybicki nekrolog', 'rybicki kontakt', 'dziennikarz gazeta sudecka', 'rybicki zmarł', 'pan adam'],
    snippet: 'W wieku 59 lat zmarł nagle Adam Rybicki, reporter Gazety Sudeckiej. Pisał o sprawach, o których inni woleli zapomnieć.',
    ev: 'ev_obit',
    html: () => `${gzHead()}<main class="gz-m gz-art">
      <div class="gz-kick">Wspomnienie</div>
      <h1>Odszedł Adam Rybicki (1961–2021)</h1>
      <figure class="gz-por">${im('web_rybicki', '', 'Adam Rybicki')}<figcaption>Adam Rybicki. Fot. archiwum redakcji</figcaption></figure>
      ${P(`11 lutego 2021 roku, w wieku 59 lat, zmarł nagle nasz redakcyjny kolega, Adam Rybicki. Przez trzydzieści lat jeździł po Sudetach starym oplem i pisał o sprawach, o których inni woleli zapomnieć.

Uparty, czasem nieznośny, zawsze przy telefonie. Mówił, że reporter, który nie odbiera, przestaje być reporterem. Do końca miał ten sam numer komórki, który podawał pod każdym tekstem.

W szufladzie zostawił niedokończony reportaż o powodzi z 1997 roku. „Jeszcze nie wszystko wiem” — mówił, kiedy pytaliśmy, kiedy go odda.

Adamie, odbierz tam, gdzie jesteś.`)}
      <p class="gz-small">Redakcja Gazety Sudeckiej</p></main>`
  });

  page('gazeta2026', {
    url: 'gazetasudecka.pl/region/2026/11/tomek-nie-utonal', title: 'Przełom w sprawie sprzed 29 lat: „Tomek nie utonął”', site: 'gazeta', fav: 'G', favColor: '#7b2b21', avail: 'flag:epilog',
    kw: ['tomek nie utonął', 'przełom w sprawie', 'gajda zatrzymany', 'maja wrona odnaleziona', 'huta szczątki'],
    snippet: 'Dwadzieścia dziewięć lat po powodzi tysiąclecia w zamurowanym tunelu huty „Jutrzenka” odnaleziono szczątki dziewięcioletniego Tomasza Lisa.',
    html: () => `${gzHead()}<main class="gz-m gz-art">
      <div class="gz-kick">Region · Reportaż</div>
      <h1>Przełom w sprawie sprzed 29 lat: „Tomek nie utonął”</h1>
      <p class="gz-lead">Dwadzieścia dziewięć lat po powodzi tysiąclecia w zamurowanym tunelu huty „Jutrzenka” odnaleziono szczątki dziewięcioletniego Tomasza Lisa. Sprawa wyszła na jaw dzięki studentce fotografii — i dzięki numerowi telefonu, który kiedyś należał do naszego redakcyjnego kolegi.</p>
      ${P(G.s && G.s.vars.endingId === 'swit'
        ? `Robert G., komendant posterunku w Mglisku, usłyszał zarzuty pozbawienia wolności 22-letniej Mai W. oraz ukrycia zwłok i utrudniania postępowania w sprawie z 1997 roku. Prokuratura nie wyklucza kolejnych zarzutów. Dwaj mężczyźni, którzy w 1997 roku mieli po 16 i 17 lat, złożyli obszerne wyjaśnienia.

Maja W. przez dziesięć dni była przetrzymywana w zamkniętej kratą sztolni na Sowiej Kopie. Odnalazła ją grupa przyjaciół i rodzina — w porozumieniu z kimś, kogo w Mglisku nikt nie znał.

Adam Rybicki pisał w 2007 roku: „Każda informacja może być ważna”. Miał rację.`
        : `Samochód Roberta G., komendanta posterunku w Mglisku, znaleziono na koronie tamy Zalewu Mgliskiego — w tym samym miejscu, w którym miesiąc wcześniej stało auto Mai W. Mężczyzny nie odnaleziono.

Maja W. przez dziesięć dni była przetrzymywana w zamkniętej kratą sztolni na Sowiej Kopie. Dwaj mężczyźni, którzy w 1997 roku mieli po 16 i 17 lat, złożyli wyjaśnienia w sprawie śmierci Tomasza Lisa.

Adam Rybicki pisał w 2007 roku: „Każda informacja może być ważna”. Miał rację.`)}
      <div class="gz-foot">Redakcja Gazety Sudeckiej, na podstawie materiałów Adama Rybickiego (1961–2021) i Mai Wrony</div></main>`
  });

  /* ================= Mglisko24 ================= */
  const m24Head = () => `<header class="m24-h"><div class="m24-logo">Mglisko<b>24</b>.pl</div><div class="m24-w">☁ 4°C · mgła</div></header><nav class="m24-nav"><a href="#" data-go="m24_home">Wiadomości</a><a href="#" data-go="m24_home">Gmina</a><a href="#" data-go="m24_home">Ogłoszenia</a></nav>`;
  page('m24_home', {
    url: 'mglisko24.pl', title: 'Mglisko24.pl — portal gminy Mglisko', site: 'm24', fav: 'M', favColor: '#c43d2f',
    kw: ['mglisko24', 'mglisko wiadomości', 'mglisko news', 'mglisko portal', 'mglisko'],
    snippet: 'Wiadomości z Mgliska i okolic. Najnowsze: trwają poszukiwania 22-letniej Mai W.',
    html: () => `${m24Head()}<main class="m24-m">
      <a href="#" data-go="m24_maja" class="m24-hero">${`<img src="${Art.url('web_dam')}" alt="">`}<div><span class="m24-tag">PILNE</span><h2>Trwają poszukiwania 22-letniej Mai W. Auto znalezione na tamie</h2></div></a>
      <a href="#" data-go="m24_huta" class="m24-row"><b>Huta „Jutrzenka”: ruina czy szansa? Wójt: „brak inwestora”</b><small>03.03.2025</small></a>
      <a href="#" data-go="m24_powodz" class="m24-row"><b>20 lat po powodzi tysiąclecia. „Woda zabrała nam pół miasta”</b><small>08.07.2017</small></a>
      <a href="#" data-go="m24_kruk" class="m24-row"><b>Tragiczny wypadek na moście kolejowym</b><small>14.03.2011</small></a>
      <div class="m24-ad">Auto-Sowa · mechanika · wulkanizacja · tel. 669 301 552</div></main>`
  });
  page('m24_maja', {
    url: 'mglisko24.pl/wiadomosci/poszukiwania-mai-w', title: 'Trwają poszukiwania 22-letniej Mai W. Auto znalezione na tamie', site: 'm24', fav: 'M', favColor: '#c43d2f',
    kw: ['maja wrona', 'maja w', 'zaginiona maja', 'zaginięcie mai', 'zaginiona studentka', 'zaginiona mglisko', 'tama', 'tama zalew', 'samochód na tamie', 'auto na tamie', 'zalew mgliski', 'poszukiwania mai', 'panda tama'],
    snippet: 'Czerwonego fiata pandę zauważył na koronie tamy wędkarz. Na barierce wisiała damska kurtka…',
    ev: 'ev_dam_news',
    html: () => `${m24Head()}<main class="m24-m m24-art">
      <span class="m24-tag">PILNE</span><h1>Trwają poszukiwania 22-letniej Mai W. Auto znalezione na tamie</h1><small class="m24-d">16.10.2026, 9:12 · red.</small>
      <figure>${im('web_dam', '', 'Tama Zalewu Mgliskiego, 15.10')}<figcaption>Korona tamy Zalewu Mgliskiego, czwartek rano. Fot. czytelnik</figcaption></figure>
      ${P(`W czwartek, 15 października, około *6:40* wędkarz zauważył na koronie tamy Zalewu Mgliskiego czerwonego fiata pandę. Na barierce wisiała damska kurtka. Samochód należy do 22-letniej *Mai W.*, studentki z Mgliska, której nikt nie widział od środy wieczorem.

Na miejscu pracowała policja i strażacy. Przez dwa dni zalew przeszukiwali płetwonurkowie z Wrocławia. Bez rezultatu.

— Nie wykluczamy żadnej wersji, ale wszystko wskazuje na tragiczny wypadek lub targnięcie się na życie — mówi komendant posterunku w Mglisku, *asp. sztab. Robert Gajda*. — Prosimy mieszkańców o nierozpowszechnianie plotek. To ogromna tragedia dla rodziny.

Rodzina nie wierzy w samobójstwo. — Maja miała plany, miała dyplom do zrobienia. Ona by tego nie zrobiła — mówi brat dziewczyny.

Każdy, kto widział Maję w środę 14 października po godzinie 22:00, proszony jest o kontakt z posterunkiem: *74 873 41 20*.`)}
      <div class="m24-com"><b>Komentarze (6)</b>
        <div><i>gość_88</i>znowu ta tama… w 2011 też było coś takiego</div>
        <div><i>Mieszkanka</i>Biedna dziewczyna. I biedna matka, najpierw mąż, teraz to.</div>
        <div><i>kris</i>może po prostu wyjechała z jakimś chłopakiem, młodzi teraz tak mają</div>
        <div><i>Ania_W</i>@kris ogarnij się. Znam ją. Nie wyjechałaby bez słowa.</div>
        <div><i>stary_hutnik</i>widziałem w środę wieczorem jej czerwone auto na Szklarskiej, jechało pod górę, nie do zalewu</div>
        <div><i>moderator</i>Komentarze zostały zamknięte.</div></div></main>`
  });
  page('m24_powodz', {
    url: 'mglisko24.pl/historia/20-lat-po-powodzi', title: '20 lat po powodzi tysiąclecia. „Woda zabrała nam pół miasta”', site: 'm24', fav: 'M', favColor: '#c43d2f',
    kw: ['powódź', 'powodz 1997', 'powódź tysiąclecia', 'powódź mglisko', 'mglica 1997', 'lipiec 1997', 'rocznica powodzi'],
    snippet: '…jedyną ofiarą śmiertelną w gminie był 9-letni Tomasz L., którego ciała nigdy nie odnaleziono.',
    html: () => `${m24Head()}<main class="m24-m m24-art"><h1>20 lat po powodzi tysiąclecia. „Woda zabrała nam pół miasta”</h1><small class="m24-d">08.07.2017</small>
      <figure>${im('web_flood97', '', 'Mglisko, lipiec 1997')}</figure>
      ${P(`Dwadzieścia lat temu Mglica wystąpiła z brzegów i w ciągu jednej nocy zalała dolne Mglisko. Ewakuowano 1400 osób. Zniszczonych zostało 212 domów i most drogowy.

Jedyną ofiarą śmiertelną w gminie był *9-letni Tomasz L.*, którego ciała nigdy nie odnaleziono. Jego siostra co roku zapala znicz nad rzeką.

— Pamiętam, jak stałem na dachu i patrzyłem, jak woda zabiera nam pół miasta — wspomina wójt *Leszek Malicki*, który miał wtedy 16 lat. — To była noc, której nikt z nas nie zapomni.`)}</main>`
  });
  page('m24_kruk', {
    url: 'mglisko24.pl/wiadomosci/2011/wypadek-most-kolejowy', title: 'Tragiczny wypadek na moście kolejowym', site: 'm24', fav: 'M', favColor: '#c43d2f',
    kw: ['darek kruk', 'dariusz kruk', 'kruk', 'dariusz k', 'most kolejowy', 'wypadek most', 'kruk mglisko', 'kruk 2011'],
    snippet: '30-letni Dariusz K. spadł z mostu kolejowego nad Mglicą. Znajomi: „ostatnio powtarzał, że musi coś komuś oddać”.',
    html: () => `${m24Head()}<main class="m24-m m24-art"><h1>Tragiczny wypadek na moście kolejowym</h1><small class="m24-d">14.03.2011</small>
      ${P(`W nocy z niedzieli na poniedziałek z mostu kolejowego nad Mglicą spadł *30-letni Dariusz K.*, mieszkaniec Mgliska. Mężczyzna zginął na miejscu. Według wstępnych ustaleń był pod wpływem alkoholu.

Sąsiedzi mówią, że od lat zmagał się z problemami. — Dobry chłopak, tylko się pogubił. Od tej powodzi jakby go nie było — mówi jedna z mieszkanek bloku przy Wodnej.

Znajomi wspominają, że ostatnio często powtarzał, że *„musi coś komuś oddać”*. Nie wiadomo, co miał na myśli.

Sprawę prowadzi posterunek w Mglisku.`)}</main>`
  });
  page('m24_huta', {
    url: 'mglisko24.pl/gmina/huta-jutrzenka-ruina-czy-szansa', title: 'Huta „Jutrzenka”: ruina czy szansa? Wójt: „brak inwestora”', site: 'm24', fav: 'M', favColor: '#c43d2f',
    kw: ['huta', 'huta jutrzenka', 'jutrzenka', 'huta szkła', 'huta szkla mglisko', 'huta mglisko', 'szklarz', 'legenda szklarza', 'szklarz mglisko'],
    snippet: 'Zamknięta w 1996 roku huta szkła niszczeje. „Teren jest prywatny, budynki grożą zawaleniem” — mówi wójt.',
    html: () => `${m24Head()}<main class="m24-m m24-art"><h1>Huta „Jutrzenka”: ruina czy szansa? Wójt: „brak inwestora”</h1><small class="m24-d">03.03.2025</small>
      <figure>${im('m_huta_ext', '', 'Huta „Jutrzenka”')}</figure>
      ${P(`Huta Szkła „Jutrzenka” działała od 1889 do 1996 roku. W najlepszych latach zatrudniała 600 osób. Dziś hale A i B straszą wybitymi oknami, a komin widać z każdego miejsca w gminie.

— Teren należy do prywatnego właściciela z Wrocławia, który nie odpowiada na nasze pisma. Budynki grożą zawaleniem i apeluję do młodzieży, żeby tam nie wchodziła — mówi wójt *Leszek Malicki*.

Starsi mieszkańcy wciąż opowiadają dzieciom legendę o *Szklarzu* — hutniku, który w XIX wieku zginął w piecu i podobno nocami chodzi po halach, zamykając w szkle odbicia tych, którzy zajrzą w okna.

— Najlepsza bajka, żeby dzieciaki nie łaziły po ruinach — śmieje się pan Józef, hutnik przez 31 lat. — Tylko że i tak łażą. My też łaziliśmy.`)}</main>`
  });

  /* ================= Encyklopedia ================= */
  const wiki = (title, body) => `<header class="wk-h"><b>Wolnopedia</b><span>wolna encyklopedia</span></header><main class="wk-m"><h1>${title}</h1>${body}</main>`;
  page('odprezarka', {
    url: 'wolnopedia.pl/wiki/Odprezarka', title: 'Odprężarka (hutnictwo) — Wolnopedia', site: 'wiki', fav: 'W', favColor: '#555',
    kw: ['odprężarka', 'odprezarka', 'odprężarka huta', 'tunel odprężarka', 'odprężanie szkła', 'lehr'],
    snippet: 'Odprężarka — tunelowy piec, w którym wyroby ze szkła są powoli studzone, by usunąć naprężenia…',
    html: () => wiki('Odprężarka', P(`*Odprężarka* (ang. _lehr_) — długi tunelowy piec w hucie szkła, przez który wyroby przesuwane są na taśmie lub wózkach i stopniowo studzone. Powolne chłodzenie usuwa naprężenia, które mogłyby spowodować pęknięcie szkła.

W starszych hutach odprężarki budowano jako murowane tunele o długości od 20 do 60 metrów, częściowo zagłębione poniżej poziomu hali. Wejścia do nich znajdowały się zwykle za piecem wannowym.

Po zamknięciu zakładów tunele odprężarek bywają zalewane wodą lub zamurowywane ze względów bezpieczeństwa.`))
  });
  page('dziurawka', {
    url: 'wolnopedia.pl/wiki/Cegla_dziurawka', title: 'Cegła dziurawka — Wolnopedia', site: 'wiki', fav: 'W', favColor: '#555',
    kw: ['cegła dziurawka', 'cegla dziurawka', 'dziurawka', 'cegła', 'cegły'],
    snippet: 'Cegła dziurawka — cegła ceramiczna z pionowymi otworami. W Polsce produkowana masowo od lat 60. XX wieku…',
    html: () => wiki('Cegła dziurawka', P(`*Cegła dziurawka* — cegła ceramiczna z otworami, lżejsza od pełnej. W Polsce produkowana masowo od *lat 60. XX wieku*, szeroko stosowana w budownictwie PRL i lat 90.

Łatwo odróżnić ją od starej cegły pełnej: jest jaśniejsza, ma bardziej regularne krawędzie i charakterystyczne otwory widoczne na przełomie.`))
  });
  page('powodz1997', {
    url: 'wolnopedia.pl/wiki/Powodz_tysiaclecia', title: 'Powódź tysiąclecia — Wolnopedia', site: 'wiki', fav: 'W', favColor: '#555',
    kw: ['powódź tysiąclecia', 'powodz tysiaclecia', 'powódź 1997', 'powódź w polsce 1997', 'lipiec 1997 powódź'],
    snippet: 'Powódź tysiąclecia — powódź, która w lipcu 1997 roku dotknęła południową i zachodnią Polskę, Czechy i Niemcy…',
    html: () => wiki('Powódź tysiąclecia', P(`*Powódź tysiąclecia* — powódź, która w lipcu 1997 roku dotknęła południową i zachodnią Polskę, a także Czechy i Niemcy. Spowodowały ją wielodniowe, intensywne opady w Sudetach i Beskidach.

Najtrudniejsza sytuacja panowała w dorzeczu Odry i jej sudeckich dopływów. Wiele miejscowości ewakuowano w ciągu jednej nocy.

_W grze Mglisko rzeka Mglica i samo miasteczko są fikcyjne._`))
  });

  /* ================= Kadr ================= */
  DATA.kadr = {
    'maja.wrona': {
      name: 'Maja Wrona', av: 'maja', bio: '📷 analog · ruiny · światło\nASP Wrocław | Mglisko', posts: 214, followers: '1 204', following: 388,
      feed: [
        { art: 'm_mirror', date: '12.10.2026', likes: 212, text: 'Szkło pamięta. Wkrótce. 🕯️', comments: [['ola.nowicka', '🖤'], ['kuba.wrona', 'spoko foto (jak na ciebie)'], ['leszek.malicki.wojt', 'Piękne zdjęcie, ale proszę uważać — budynek grozi zawaleniem. Wstęp wzbroniony.'], ['r.gajda', 'Teren prywatny 🙂 Pozdrawiam mamę.'], ['weronika.lis', 'Czekam. W.']] },
        { art: 'm_huta_ext', date: '03.10.2026', likes: 156, text: 'Październik w Mglisku: mgła 8 dni na 10. Pozostałe 2 dni: też mgła.', comments: [['igor.malicki', 'technicznie rzecz biorąc to jest jedna długa mgła'], ['bartek_sowa', 'nie wchodz tam sama']] },
        { art: 'k_zenit', date: '28.09.2026', likes: 301, ev: 'ev_zenit', text: 'Zenit-E od dziadka na 12. urodziny. Mój pierwszy aparat. Waży tonę, kocham go. Wraca do gry. #analog #zenit', comments: [['ola.nowicka', 'ten aparat jest starszy od nas razem wziętych'], ['weronika.lis', 'Pamiętam, jak chodziłaś z nim po bibliotece. 🙂']] },
        { art: 'm_bandzior', date: '24.09.2026', likes: 188, text: 'Bandzior, lat 11, zawód: dywan.', comments: [['kuba.wrona', 'mój pies'], ['maja.wrona', '@kuba.wrona NASZ pies']] },
        { art: 'm_ola_lake', date: '21.09.2026', likes: 244, text: 'Z @ola.nowicka nad zalewem. Ona twierdzi, że wyszła jak ziemniak. Kłamie.', comments: [['ola.nowicka', 'usuń to']] },
        { art: 'k_kluska', date: '16.08.2026', likes: 410, ev: 'ev_kluska', text: '#tbt Kluska, moja pierwsza psia miłość 🐾 (2006–2019). Zanim pojawił się Bandzior. Do dziś trzymam jej obrożę w szufladzie.', comments: [['kuba.wrona', 'najlepszy jamnik świata'], ['ola.nowicka', '😭']] }
      ]
    },
    'ola.nowicka': {
      name: 'Ola Nowicka', av: 'ola', bio: 'technik farmacji 💊 | kawa > ludzie | Mglisko', posts: 87, followers: '642', following: 301,
      feed: [
        { art: 'o_candle', date: '16.10.2026', likes: 391, text: 'Maju, wróć. 🕯️ Ktokolwiek coś wie — piszcie do mnie albo do Kuby.', comments: [['kuba.wrona', '🖤'], ['igor.malicki', '🕯️'], ['r.gajda', 'Robimy wszystko, co w naszej mocy.']] },
        { art: 'o_cat', date: '05.10.2026', likes: 120, text: 'Pani Fasolka nie lubi poniedziałków. Ja też nie.', comments: [] },
        { art: 'm_ola_lake', date: '21.09.2026', likes: 156, text: 'z @maja.wrona ❤️ (usuń swoje zdjęcie)', comments: [['maja.wrona', 'nigdy']] }
      ]
    },
    'kuba.wrona': {
      name: 'Kuba', av: 'kuba', bio: 'nie', posts: 12, followers: '388', following: 512,
      feed: [
        { art: 'k_poster', date: '17.10.2026', likes: 1240, text: 'zaginęła moja siostra. jeśli ktoś coś widział w środę 14.10 wieczorem PISZCIE. udostępniajcie', comments: [['ola.nowicka', '🖤'], ['bartek_sowa', 'jestesmy z wami'], ['weronika.lis', 'Udostępniłam w bibliotece i w grupie. Trzymaj się, Kuba.']] },
        { art: 'k_skate', date: '30.08.2026', likes: 71, text: '.', comments: [['maja.wrona', 'wow ale głęboki opis']] }
      ]
    },
    'bartek_sowa': {
      name: 'Bartek Sowa', av: 'bartek', bio: 'Auto-Sowa Mglisko | mechanika, wulkanizacja\ntel. 669 301 552', posts: 31, followers: '512', following: 90,
      feed: [
        { art: 'b_car', date: '02.10.2026', likes: 64, text: 'Rozrząd w passacie B5. Jeszcze pojeździ.', comments: [] },
        { art: 'b_shop', date: '01.06.2026', likes: 48, text: 'Opony zimowe — zapisy od września. Zapraszamy pn–sb.', comments: [['r.gajda', 'Jak zawsze najlepsza obsługa 👍']] }
      ]
    },
    'igor.malicki': {
      name: 'Igor Malicki', av: 'igor', bio: 'Serwis GSM-PC · Rynek 7, Mglisko\nnaprawiam wszystko, co ma baterię ⚡ (technicznie rzecz biorąc)', posts: 45, followers: '702', following: 260,
      feed: [
        { art: 'i_desk', date: '11.10.2026', likes: 52, text: 'Wymiana ekranu w 40 minut. Albo w 4 godziny, jeśli to telefon z Kalifornii.', comments: [['maja.wrona', 'ten skaner w tle to legenda']] },
        { art: 'o_candle', date: '16.10.2026', likes: 210, text: '🕯️', comments: [] }
      ]
    },
    'weronika.lis': {
      name: 'Weronika Lis', av: 'weronika', bio: 'Biblioteka Gminna w Mglisku · wt–sb 10–18\nCzytajcie. Pamiętajcie.', posts: 63, followers: '340', following: 118,
      feed: [
        { art: 'w_candle', date: '08.07.2026', likes: 188, text: '8 lipca. Jak co roku, nad rzeką. Bo nie mam gdzie indziej.', comments: [['maja.wrona', '🕯️'], ['ola.nowicka', '❤️']] },
        { art: 'w_books', date: '15.05.2026', likes: 77, text: 'Tydzień Bibliotek! Zapraszamy na kiermasz książek używanych.', comments: [] }
      ]
    },
    'r.gajda': {
      name: 'Robert Gajda', av: 'gajda', bio: 'Policjant. Myśliwy. Wędkarz.\nMglisko ❤️', posts: 58, followers: '903', following: 140,
      feed: [
        { art: 'g_fish', date: '14.06.2026', likes: 141, text: 'Zawody wędkarskie o Puchar Wójta. 3. miejsce, nie narzekam. Dzięki @leszek.malicki.wojt za organizację!', comments: [['leszek.malicki.wojt', 'Gratulacje, Robert! Za rok wygrasz.']] },
        { art: 'kadr_hunt', date: '02.11.2025', likes: 96, ev: 'ev_gajda_hunt', evCond: 'unlocked:chat:weronika', text: 'Paśnik pod Ewą gotowy na zimę. Darz bór! 🦌', comments: [['bartek_sowa', 'darz bór'], ['leszek.malicki.wojt', '👍']] },
        { art: 'g_award', date: '24.07.2024', likes: 230, text: 'Święto Policji. 25 lat służby. Dziękuję mieszkańcom Mgliska za zaufanie.', comments: [['ewa.wrona', 'Dziękujemy za wszystko, Robercie.']] }
      ]
    },
    'leszek.malicki.wojt': {
      name: 'Leszek Malicki — Wójt', av: 'leszek', bio: 'Wójt Gminy Mglisko.\nRazem budujemy przyszłość.', posts: 120, followers: '1 876', following: 45,
      feed: [
        { art: 'l_ribbon', date: '01.09.2026', likes: 160, text: 'Otwarcie nowego placu zabaw przy ul. Wodnej. Dzieci są naszą przyszłością!', comments: [['weronika.lis', 'Przy Wodnej. Dziękuję, panie wójcie.']] },
        { art: 'g_fish', date: '14.06.2026', likes: 98, text: 'Puchar Wójta w wędkarstwie rozdany! Gratulacje dla wszystkich uczestników.', comments: [] }
      ]
    }
  };
  const kadrHead = () => `<header class="kd-h"><b>Kadr</b><span>${'⌂'}</span></header>`;
  Object.entries(DATA.kadr).forEach(([handle, p]) => {
    page('kadr:' + handle, {
      url: 'kadr.pl/' + handle, title: `${p.name} (@${handle}) · Kadr`, site: 'kadr', fav: 'K', favColor: '#c2185b',
      kw: [p.name, handle, handle.replace(/[._]/g, ' '), p.name + ' kadr', p.name + ' instagram'],
      snippet: p.bio.replace(/\n/g, ' · '),
      html: () => `${kadrHead()}<main class="kd-m"><div class="kd-p">
        ${UI.avatar(p.av, 'kd-av').outerHTML}<div class="kd-n"><b>${esc(p.name)}</b><small>@${handle}</small></div></div>
        <div class="kd-st"><div><b>${p.posts}</b>posty</div><div><b>${p.followers}</b>obserwujący</div><div><b>${p.following}</b>obserwowani</div></div>
        <div class="kd-bio">${U.rich(p.bio)}</div>
        <div class="kd-g">${p.feed.map((f, i) => `<a href="#" data-post="${handle}:${i}"><img src="${Art.url(f.art)}" alt=""></a>`).join('')}</div></main>`
    });
  });
  page('kadr_home', {
    url: 'kadr.pl', title: 'Kadr — zdjęcia i ludzie', site: 'kadr', fav: 'K', favColor: '#c2185b',
    kw: ['kadr', 'kadr.pl', 'instagram'],
    snippet: 'Dziel się kadrami. Znajdź znajomych z okolicy.',
    html: () => `${kadrHead()}<main class="kd-m"><h2 class="kd-t">Popularne w okolicy: Mglisko</h2><div class="kd-list">${Object.entries(DATA.kadr).map(([h, p]) => `<a href="#" data-go="kadr:${h}" class="kd-li">${UI.avatar(p.av).outerHTML}<div><b>${esc(p.name)}</b><small>@${h}</small></div></a>`).join('')}</div></main>`
  });
  DATA.kadrPost = key => {
    const [handle, i] = key.split(':');
    const p = DATA.kadr[handle], f = p.feed[+i];
    const { h } = U;
    const body = h('div', { class: 'kd-post' },
      h('div', { class: 'kd-ph' }, UI.avatar(p.av), h('b', {}, handle)),
      h('img', { class: 'kd-pi', src: Art.url(f.art), alt: '', onclick: () => UI.viewImage(f.art) }),
      h('div', { class: 'kd-pl' }, `♥ ${f.likes} polubień · ${f.date}`),
      h('p', { html: `<b>${handle}</b> ${U.rich(f.text)}` }),
      f.comments.length ? h('div', { class: 'kd-pc' }, f.comments.map(c => h('p', { html: `<b>${esc(c[0])}</b> ${U.rich(c[1])}` }))) : null);
    UI.sheet({ title: 'Post', body });
    if (f.ev && G.test(f.evCond)) { if (G.addEv(f.ev)) UI.evidenceToast(f.ev); }
    G.markSeen('post:' + key);
  };

  /* ================= Instytucje ================= */
  const gov = (name, sub, body) => `<header class="gv-h"><div class="gv-e">✦</div><div><b>${name}</b><small>${sub}</small></div></header><main class="gv-m">${body}</main>`;
  page('gmina', {
    url: 'mglisko.gmina.pl', title: 'Urząd Gminy Mglisko — oficjalna strona', site: 'gov', fav: 'U', favColor: '#1d4f91',
    kw: ['urząd gminy', 'gmina mglisko', 'wójt', 'wójt mglisko', 'leszek malicki', 'malicki', 'urzad gminy mglisko', 'wojt malicki'],
    snippet: 'Wójt Gminy: Leszek Malicki. Sekretariat czynny pn–pt 7:30–15:30.',
    html: () => gov('Urząd Gminy Mglisko', 'powiat dzierżoniowski · województwo dolnośląskie', `
      <div class="gv-card">${im('web_wojt', 'gv-por', 'Leszek Malicki')}<div><b>Leszek Malicki</b><span>Wójt Gminy Mglisko (od 2018)</span><p>„Mglisko to ludzie. Pamiętamy o przeszłości, budujemy przyszłość.”</p></div></div>
      <h3>Aktualności</h3>
      <div class="gv-n"><small>19.10.2026</small> Komunikat w sprawie poszukiwań mieszkanki gminy. Wójt dziękuje strażakom i policji za zaangażowanie.</div>
      <div class="gv-n"><small>01.09.2026</small> Otwarto plac zabaw przy ul. Wodnej.</div>
      <div class="gv-n"><small>12.08.2026</small> Przypominamy: wstęp na teren byłej huty „Jutrzenka” jest zabroniony.</div>
      <h3>Kontakt</h3><p>Rynek 1, 58-2xx Mglisko · sekretariat@mglisko.gmina.pl · tel. 74 873 40 00</p>`)
  });
  page('posterunek', {
    url: 'dzierzoniow.policja.gov.pl/mglisko', title: 'Posterunek Policji w Mglisku', site: 'gov', fav: 'P', favColor: '#1d3d6b',
    kw: ['policja', 'policja mglisko', 'posterunek', 'posterunek mglisko', 'komisariat', 'robert gajda', 'gajda', 'komendant', 'komendant gajda', 'gajda policja', 'dzielnicowy'],
    snippet: 'Komendant: asp. sztab. Robert Gajda. Dyżurny całodobowo: 74 873 41 20. W sytuacji zagrożenia: 112.',
    html: () => gov('Posterunek Policji w Mglisku', 'Komenda Powiatowa Policji w Dzierżoniowie', `
      <div class="gv-card">${im('g_award', 'gv-por', 'asp. sztab. Robert Gajda')}<div><b>asp. sztab. Robert Gajda</b><span>Komendant Posterunku</span><p>W służbie od 1999 roku. Komendant posterunku od 2014.</p></div></div>
      <h3>Kontakt</h3>
      <p>ul. Kościuszki 3, Mglisko<br>Dyżurny (całodobowo): <a href="#" data-call="748734120"><b>74 873 41 20</b></a></p>
      <p class="gv-alert">W sytuacji zagrożenia życia lub zdrowia dzwoń pod numer alarmowy <b>112</b>. Zgłoszenie trafi do Centrum Powiadamiania Ratunkowego, które zadysponuje najbliższe służby.</p>
      <h3>Nadzór</h3><p>Posterunek podlega Komendzie Powiatowej Policji w Dzierżoniowie, ul. Piastowska 12.</p>`)
  });
  page('prokuratura', {
    url: 'dzierzoniow.po.gov.pl', title: 'Prokuratura Rejonowa w Dzierżoniowie', site: 'gov', fav: 'P', favColor: '#5a1d1d',
    kw: ['prokuratura', 'prokuratura dzierżoniów', 'prokuratura rejonowa', 'zgłoszenie przestępstwa', 'zawiadomienie o przestępstwie', 'prokurator'],
    snippet: 'Zawiadomienia o przestępstwie można składać osobiście, pocztą lub elektronicznie: biuro.podawcze@dzierzoniow.po.gov.pl',
    html: () => gov('Prokuratura Rejonowa w Dzierżoniowie', 'Prokuratura Okręgowa w Świdnicy', `
      <h3>Zawiadomienie o przestępstwie</h3>
      <p>Zawiadomienie można złożyć osobiście, pocztą lub elektronicznie na adres biura podawczego: <b>biuro.podawcze@dzierzoniow.po.gov.pl</b>.</p>
      <p>Prokuratura prowadzi lub nadzoruje postępowania przygotowawcze, w tym w sprawach dotyczących funkcjonariuszy Policji.</p>
      <p class="gv-alert">Jeżeli ktoś jest w bezpośrednim niebezpieczeństwie — dzwoń <b>112</b>.</p>`)
  });
  page('biblioteka', {
    url: 'biblioteka.mglisko.pl', title: 'Biblioteka Gminna w Mglisku', site: 'gov', fav: 'B', favColor: '#6b5a1d',
    kw: ['biblioteka', 'biblioteka mglisko', 'biblioteka gminna', 'weronika lis', 'lis biblioteka', 'weronika'],
    snippet: 'Kierownik: Weronika Lis. Czynna wt–sb 10–18. Kronika Mgliska, archiwum zdjęć, czytelnia.',
    html: () => gov('Biblioteka Gminna w Mglisku', 'Rynek 9 · wt–sb 10:00–18:00', `
      <div class="gv-card">${im('w_books', 'gv-por', 'Biblioteka')}<div><b>Weronika Lis</b><span>Kierownik biblioteki</span><p>Prowadzi też kronikę gminy i archiwum zdjęć „Mglisko dawniej i dziś”.</p></div></div>
      <p>Tel. <a href="#" data-call="748734055">74 873 40 55</a> · biblioteka@mglisko.pl</p>
      <p>${go('forum', 'Grupa „Mglisko dawniej i dziś” →')}</p>`)
  });

  /* ================= Forum ================= */
  page('forum', {
    url: 'mglisko-dawniej.pl/forum/powodz-97', title: 'Kto pamięta powódź 97? — Mglisko dawniej i dziś', site: 'forum', fav: 'F', favColor: '#4a6b3a',
    kw: ['mglisko dawniej', 'forum mglisko', 'kto pamięta powódź', 'halina mróz', 'halina mroz', 'mróz', 'wspomnienia powódź', 'pamiętam powódź'],
    snippet: '„Babcia do śmierci powtarzała, że widziała tego małego w żółtym na drodze do huty…”',
    html: () => `<header class="fr-h"><b>Mglisko dawniej i dziś</b><small>grupa miłośników historii gminy · moderuje: W. Lis</small></header><main class="fr-m">
      <h2>Kto pamięta powódź 97?</h2>
      <div class="fr-p"><div class="fr-u"><b>Józef_hutnik</b><small>08.07.2022</small></div><p>25 lat. Stałem na moście i patrzyłem, jak woda niesie lodówki z Wodnej. Kto pamięta, niech napisze.</p></div>
      <div class="fr-p"><div class="fr-u"><b>Mirka</b><small>08.07.2022</small></div><p>My z mamą siedziałyśmy dwie noce w szkole. Pamiętam zapach mokrych koców.</p></div>
      <div class="fr-p"><div class="fr-u"><b>Kasia_M</b><small>09.07.2022</small></div><p>Moja babcia, Halina Mróz, do śmierci powtarzała, że widziała tego małego Lisa w żółtej pelerynie, jak szedł drogą do huty. I że w nocy słyszała z góry, od huty, chłopięce głosy i śmiech. A potem krzyk. Nikt jej nie wierzył. Zmarła w 2015.</p></div>
      <div class="fr-p"><div class="fr-u"><b>Weronika L.</b><small>09.07.2022</small></div><p>Kasiu, dziękuję. Twoja babcia była jedyną osobą, która mi wtedy uwierzyła, że Tomek nie poszedł nad rzekę.</p></div>
      <div class="fr-p"><div class="fr-u"><b>gosc</b><small>10.07.2022</small></div><p>stare babki zawsze cos slyszą. dajcie spokój tej rodzinie</p></div>
      <div class="fr-p mod"><p>Wątek zamknięty przez moderatora.</p></div></main>`
  });

  /* ================= Las, sztolnie, łowiectwo ================= */
  page('sztolnie', {
    url: 'sowiakopa.pl/podziemia', title: 'Podziemia Sowiej Kopy — przewodnik po sztolniach', site: 'guide', fav: 'S', favColor: '#5d4a2a',
    kw: ['sztolnia', 'sztolnie', 'sowia kopa', 'podziemia', 'sztolnia anna', 'sztolnia ewa', 'sztolnia waltraud', 'sztolnia nr 3', 'kopalnia', 'tunele w górach', 'podziemia sowiej kopy', 'sztolnie mglisko', 'góry sowie sztolnie'],
    snippet: 'Trzy poniemieckie sztolnie na stokach Sowiej Kopy: Anna (trasa turystyczna), Waltraud (zalana), Ewa (zamknięta kratą).',
    ev: 'ev_sztolnie',
    html: () => `<header class="gd-h">${`<img src="${Art.url('web_anna')}" alt="">`}<div><small>sowiakopa.pl · szlaki i podziemia</small><h1>Podziemia Sowiej Kopy</h1></div></header><main class="gd-m">
      ${P(`Na stokach Sowiej Kopy (912 m n.p.m.) zachowały się trzy sztolnie z lat 1943–45, drążone przez więźniów obozów pracy w ramach niedokończonego programu budowy podziemnych zakładów.`)}
      <div class="gd-c">${im('web_anna', '', 'Sztolnia Anna')}<div><h3>Sztolnia Anna <span class="gd-t ok">trasa turystyczna</span></h3><p>Zachodni stok, 600 m od parkingu „Pod Anną”. Udostępniona do zwiedzania z przewodnikiem: wt–nd 10–17, wejścia co godzinę. Teren monitorowany, oświetlony, przy wejściu kasa i stróżówka.</p></div></div>
      <div class="gd-c">${im('web_waltraud', '', 'Sztolnia Waltraud')}<div><h3>Sztolnia Waltraud <span class="gd-t bad">niedostępna</span></h3><p>Północny stok. Zalana podczas powodzi w lipcu 1997 roku, strop przy wejściu częściowo zawalony. Woda sięga sklepienia już kilka metrów za portalem. <b>Wejście grozi śmiercią.</b></p></div></div>
      <div class="gd-c">${im('web_ewa', '', 'Sztolnia Ewa (nr 3)')}<div><h3>Sztolnia Ewa (nr 3) <span class="gd-t">zamknięta</span></h3><p>Wschodni stok, przy leśnej drodze za szlabanem. Sucha, ok. 120 m korytarzy. Wejście zamknięte stalową kratą — ważne zimowisko nietoperzy (obszar Natura 2000). Klucze posiada Nadleśnictwo oraz koło łowieckie, które utrzymuje przy wejściu paśnik.</p></div></div>
      <p class="gd-small">Zobacz: ${go('mapa_lesna', 'mapa leśna z drogami i obiektami')}</p></main>`
  });
  page('kolo', {
    url: 'kl-sokol.mglisko.pl', title: 'Koło Łowieckie nr 12 „Sokół” w Mglisku', site: 'kolo', fav: 'Ł', favColor: '#2d5a1d',
    kw: ['koło łowieckie', 'kolo lowieckie', 'koło sokół', 'sokół mglisko', 'myśliwi', 'myśliwy', 'łowiectwo', 'obwód łowiecki', 'paśnik', 'pasnik', 'polowanie', 'łowczy', 'darz bór', 'koło łowieckie mglisko'],
    snippet: 'Koło Łowieckie nr 12 „Sokół”. Obwód nr 117 — Sowia Kopa (wschód). Zarząd, aktualności, kalendarz polowań.',
    ev: 'ev_kolo',
    html: () => `<div class="kl"><header class="kl-h"><b>Koło Łowieckie nr 12 „SOKÓŁ”</b><small>Mglisko · założone 1957 · Darz Bór!</small></header>
      <table class="kl-t"><tr><td class="kl-side"><b>MENU</b><br>» Strona główna<br>» Zarząd<br>» Obwód 117<br>» Galeria<br>» Kontakt<br><br><small>Odwiedzin: 004817</small></td><td>
      <h3>ZARZĄD KOŁA</h3><p>Prezes: kol. Henryk Bąk<br>Łowczy: <b>kol. Robert Gajda</b><br>Skarbnik: kol. Marek Sowa<br>Sekretarz: kol. Jan Wierzba</p>
      <h3>OBWÓD ŁOWIECKI NR 117</h3><p>Wschodni i północny stok Sowiej Kopy. W granicach obwodu: sztolnia nr 3 „Ewa” (paśnik przy wejściu) oraz sztolnia „Waltraud”. Zachodni stok (sztolnia „Anna”) — poza obwodem, teren turystyczny.</p>
      ${im('web_kolo_map', 'kl-map', 'Obwód łowiecki nr 117')}
      <h3>AKTUALNOŚCI</h3>
      <p><small>16.10.2026</small> <b>Uwaga koledzy!</b> W paśniku pod Ewą wymieniona kłódka na kracie. Nowy klucz wyłącznie u łowczego. Prosimy nie podjeżdżać pod sztolnię bez uzgodnienia. — R.G.</p>
      <p><small>02.11.2025</small> Paśnik pod Ewą odnowiony i zaopatrzony na zimę. Dziękujemy kol. łowczemu!</p>
      <p><small>14.09.2025</small> Zebranie sprawozdawcze — świetlica OSP, godz. 18:00.</p>
      <p class="kl-f">Ostatnia aktualizacja: 16.10.2026 · webmaster: kol. J. Wierzba</p></td></tr></table></div>`
  });
  page('mapa_lesna', {
    url: 'mapa.lasy.gov.pl/sowia-kopa', title: 'Mapa leśna — Nadleśnictwo Sowie Góry', site: 'mapa', fav: 'L', favColor: '#2e6b3a',
    kw: ['mapa leśna', 'mapa lesna', 'mapa lasów', 'nadleśnictwo', 'drogi leśne', 'mapa sowia kopa', 'mapa lasu', 'ambona', 'ambony', 'szlaban'],
    snippet: 'Portal mapowy: drogi leśne, szlabany, ambony, obiekty podziemne. Dodaj warstwę do swojej aplikacji map.',
    html: () => `<header class="ml-h"><b>Mapa Leśna</b><small>Nadleśnictwo Sowie Góry · warstwy otwarte</small></header><main class="ml-m">
      ${im('find_snip', 'ml-img', 'Mapa leśna — Sowia Kopa')}
      <p>Warstwy do pobrania w formacie zgodnym z popularnymi aplikacjami map w telefonie:</p>
      <button class="ml-b" data-act="addForest">${G.isUnlocked('layer:forest') ? '✓ Warstwa leśna dodana' : '+ Dodaj warstwę: drogi leśne, ambony, sztolnie'}</button>
      <button class="ml-b" data-act="addHunt">${G.isUnlocked('layer:hunt') ? '✓ Obwody łowieckie dodane' : '+ Dodaj warstwę: obwody łowieckie'}</button>
      <p class="ml-s">Ambony numerowane wg ewidencji kół łowieckich. Szlabany zamykane — klucze w nadleśnictwie.</p></main>`
  });
  page('bushview', {
    url: 'bushview.pl', title: 'BushView — fotopułapki 4G z panelem zdalnym', site: 'bv', fav: 'B', favColor: '#4d5a2a',
    kw: ['bushview', 'bush view', 'fotopułapka', 'fotopulapka', 'kamera leśna', 'bushview panel', 'bushview aplikacja', 'panel bushview', 'fotopułapki'],
    snippet: 'Fotopułapki 4G: zdjęcia prosto na telefon. Zdalne „zrób zdjęcie teraz” w aplikacji BushView.',
    html: () => `<header class="bvw-h"><b>BushView</b><small>Widzisz więcej.</small></header><main class="bvw-m">
      ${im('c1_0014', '', 'BushView Trail 4G')}
      <h2>BushView Trail 4G</h2><p>Kamera leśna z modemem 4G i niewidzialnym oświetlaczem IR 940 nm. Zdjęcia trafiają na e-mail w kilka sekund od wykrycia ruchu.</p>
      <h3>Aplikacja BushView</h3><p>Zaloguj się loginem i hasłem konta, żeby zdalnie podglądać kamery i wykonywać zdjęcia na żądanie.</p>
      <button class="ml-b" data-act="installBV">${G.isUnlocked('app:bushview') ? '✓ Aplikacja zainstalowana' : 'Pobierz aplikację BushView'}</button></main>`
  });

  /* ================= Skróty i akcje ================= */
  DATA.webShortcuts = [
    { name: 'Mglisko24', page: 'm24_home', letter: 'M', color: '#c43d2f' },
    { name: 'Gazeta Sudecka', page: 'gazeta_home', letter: 'G', color: '#7b2b21' },
    { name: 'Kadr', page: 'kadr_home', letter: 'K', color: '#c2185b' },
    { name: 'Gmina', page: 'gmina', letter: 'U', color: '#1d4f91' }
  ];
  DATA.webActs = {
    addForest(a, rerender) { if (!G.isUnlocked('layer:forest')) { G.unlock('layer:forest'); SFX.play.unlock(); UI.toast('Dodano warstwę „Mapa leśna” w aplikacji Mapy.', { kind: 'app', icon: 'layers' }); } rerender(); },
    addHunt(a, rerender) { if (!G.isUnlocked('layer:hunt')) { G.unlock('layer:hunt'); G.setFlag('huntOn'); SFX.play.unlock(); UI.toast('Dodano warstwę „Obwody łowieckie” w aplikacji Mapy.', { kind: 'app', icon: 'layers' }); } rerender(); },
    installBV(a, rerender) { if (!G.isUnlocked('app:bushview')) { G.unlock('app:bushview'); } rerender(); }
  };
})();
