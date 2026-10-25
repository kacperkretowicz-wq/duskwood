'use strict';
/* SPRAWA 2 „MOST” — prolog po Ciszy „Adres na paczce” (BIBLIA-SEZONOW.md, Łączenie z S1)
   oraz rozdziały 2 „Siatka” (Akt II) i 3 „K.” (Akt III, do zwrotu z sesji 18).
   Plan: docs/SPRAWA-2-PLAN.md. Każdy wniosek ma źródło widoczne przed wyborem. */

Engine.chapter('mp', { num: 0, kicker: 'Sprawa 2 · Prolog po Ciszy', title: 'Adres na paczce', when: 'Niedziela, 15 listopada · 10:40', mood: 'tense' }, D => {
  const { say, pic, pause, choose, opt, waitFor, goal, give, unlock, set, iff, end, title, clock, dial, callEnd, notify, ambient } = D;
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const N = (t, o) => say('nina', 'nina', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);
  const c = (who, t, o) => say('call', who, t, o);

  return [
    clock('2026-11-15T10:38'),
    ambient('dark'),
    title(),
    set('m_case'),
    K('ej'),
    K('napisała do mnie jakaś dziewczyna. nina. jeździ kurierem po głuszycy i rzeczce'),
    K('mówi że jak w piątek pokazali w tv że gajda jest poszukiwany to jej się coś przypomniało'),
    K('nie wiem czy to coś jest. trzy tygodnie i każdy coś widział', { wording: 'nie wiem czy to coś da. ponad miesiąc i ciągle ktoś coś widział' }),
    K('dałem jej twój numer. ty umiesz pytać tak żeby nie wymyślali', { wording: 'dałem jej twój numer. możesz z nią pogadać? ja już nie wiem o co pytać' }),
    choose('kuba', [
      opt('Dobrze zrobiłeś. Co dokładnie ci napisała?', [K('że odebrał od niej paczkę facet podobny do niego. tylko tyle. i że maji nie widziała. sama to napisała zanim zapytałem')]),
      opt('A jak to kolejna osoba, która chce się pokazać?', [K('no to sprawdzisz i powiesz. ja już nie umiem odróżnić'), K('serio nie umiem')])
    ]),
    pause(3000),
    unlock('chat:nina'),
    N('cześć, tu nina, kuba dał mi numer'),
    N('od razu mówię żeby nie było: ja maji nie widziałam. nie chcę żeby ktoś potem mówił że ją widziałam', { wording: 'tylko od razu, ja maji nie widziałam. kuba wie, ale wolę ci też napisać' }),
    N('ale 6 listopada wiozłam paczki do rzeczki i odbierał facet w czapce. nie gadał. tylko „dawaj tu”'),
    N('i w piątek w wiadomościach puścili to jego stare nagranie i on tak samo mówi „dawaj tu”. aż mi się zimno zrobiło'),
    choose('nina', [
      opt('Dziękuję, że piszesz. Pamiętasz, jak wyglądał, poza czapką?', [
        N('ciemna kurtka, zarost kilka dni. wysoki. twarzy dobrze nie widziałam bo stał bokiem i było szaro'),
        N('więc nie powiem na 100% że to on. powiem że mi się skojarzył')
      ], { set: { mp_ninaCareful: true } }),
      opt('Na pewno to był Gajda?', [
        N('no nie na pewno. dlatego piszę do ciebie a nie na grupę'),
        N('skojarzył mi się. głos i to jak stał. tyle')
      ])
    ]),
    give('ev_mp_nina'),
    N('mam w apce zapis tego doręczenia. szefowa pozwoliła mi wysłać, ale zasłoniłam numer telefonu klienta'),
    pic('nina', 'nina', 'mp_doreczenie', 'to jest z apki kurierskiej'),
    give('ev_mp_doreczenie'),
    N('i zdjęcie karty trasy z tego dnia. ja zawsze robię zdjęcie bo potem dzwonią że nie było doręczenia'),
    pic('nina', 'nina', 'mp_karta', 'zakreśliłam w piątek długopisem, sorry'),
    give('ev_mp_karta'),
    goal('Porównaj adres na etykiecie z miejscem, gdzie Nina naprawdę doręczyła paczki (Notatki: zapis doręczenia i karta trasy).'),
    D.label('mp_adres'),
    choose('nina', [
      opt('Etykieta mówi Rynek 2 w Głuszycy. Tam trzeba sprawdzić.', [
        N('nie, czekaj. rynek 2 to biuro rachunkowe. tam o 9:12 zostawiłam list polecony, zupełnie inny'),
        N('na etykiecie jest adres korespondencyjny firmy. jak na fakturze. ale w uwagach jest „dostarczyć na zaplecze, rzeczka 17” i tam pojechałam', { wording: 'adres z etykiety to biuro firmy. w uwagach mam „dostarczyć na zaplecze, rzeczka 17”, tam zawiozłam paczki' }),
        N('popatrz jeszcze raz na kartę, o 10:25'),
        D.go('mp_adres')
      ]),
      opt('Etykieta to adres do korespondencji. Paczki pojechały do Rzeczki 17, na zaplecze.', [
        N('tak. skan jest z rzeczki 17, 10:25. i na karcie też mam rzeczka 17, zaplecze'),
        N('na etykiecie stoi rynek. kto by szukał po etykiecie, pojechałby do biura rachunkowego')
      ], { set: { mp_addrRight: true } })
    ]),
    pause(1500),
    W('Dzień dobry. Kuba przesłał mi rozmowę z panią Niną. Proszę mi wybaczyć, że się wtrącam.'),
    W('Rzeczka 17 to dawny ośrodek kolonijny huty. Budynek gospodarczy od strony lasu. Zimą nikt tam nie mieszka.', { img: 'mp_osrodek' }),
    W('Ale „woda, konserwy, olej opałowy” na zimę do pustego zaplecza? To ktoś tam jest. Albo ma być.'),
    N('byłam tam dziś rano swoim autem, mieszkam dwie wsie dalej. nie wysiadałam. zrobiłam zdjęcie przez szybę, bo numer jest przy drzwiach'),
    pic('nina', 'nina', 'mp_wejscie', 'dziś 9:58. kanistry stoją. tamtego dnia ich nie było'),
    give('ev_mp_wejscie'),
    choose('nina', [
      opt('Czyli wiemy tyle: to miejsce trzeba sprawdzić. Nie wiemy, kto jest w środku.', [
        N('ok, tyle mogę powiedzieć, więcej nie wiem'),
        W('Zgadzam się. Nie wiemy, czy Maja tam jest, ale policja powinna to sprawdzić.')
      ], { wording: 'Przekażę adres. Tylko bez dopisywania, kto tam jest, bo tego nie wiemy.', set: { mp_placeOnly: true } }),
      opt('To tam ją trzyma.', [
        N('nie wiem tego. serio. ja widziałam faceta i trzy paczki'),
        W('Rozumiem, co {Pan|Pani} czuje. Ale wiemy tylko, dokąd trafiły paczki. Nie wiemy, czy Maja tam jest. Proszę to tak przekazać.')
      ], { set: { mp_placeOnly: true } })
    ]),
    give('ev_mp_place'),
    pause(1500),
    K('dobra'),
    K('bartek ma auto. jedziemy tam'),
    K('teraz'),
    choose('kuba', [
      opt('Nie. Jeśli on tam jest, a wy podjedziecie, znowu ją przeniesie. Przekazuję to policji spoza Mgliska.', [
        K('…'),
        K('ok. ale zadzwoń teraz. nie za godzinę'),
        K('teraz')
      ], { wording: 'Kuba, nie jedźcie. Jeśli on was zobaczy, może ją znowu wywieźć. Dzwonię do policji spoza Mgliska.', set: { mp_stoppedFamily: true }, trust: { kuba: 1 } }),
      opt('Jedźcie, tylko nie wchodźcie.', [
        K('jedziemy'),
        pause(2500),
        K('bartek zawrócił pod przejazdem. mówi że jak gajda zobaczy jego auto to koniec'),
        K('ma rację. kurwa. ma rację'),
        K('zadzwoń do kogoś. proszę')
      ], { set: { mp_familyNearly: true } })
    ]),
    W('W październiku dostałam wizytówkę od komisarza z Wrocławia, który przejął poszukiwania. Komisarz Ostrowski, 71 340 22 17.'),
    give('ev_mp_ostrowski', { silent: true }),
    dial({
      goal: 'Zadzwoń do komisarza Ostrowskiego (Komenda Wojewódzka we Wrocławiu). Numer jest w wiadomości od Weroniki.',
      goalHints: [],
      numbers: {
        '71 340 22 17': {
          who: 'ostrowski', then: [
            c('ostrowski', 'Ostrowski.'),
            choose('call', [opt('Dzień dobry. Dzwonię w sprawie poszukiwań Mai Wrony. Mam relację kurierki i adres do sprawdzenia.', [])]),
            c('ostrowski', 'Słucham. Po kolei. Kto, co widział i kiedy.'),
            choose('call', [
              opt('Kurierka, Nina Duda. 6 listopada w Rzeczce 17 odebrał od niej paczki mężczyzna, który skojarzył się jej z Gajdą. Mai nie widziała. Mam zapis doręczenia, kartę trasy i dzisiejsze zdjęcie wejścia.', [], { set: { mp_reportClean: true } }),
              opt('Gajda trzyma Maję w Rzeczce 17. Kurierka go widziała.', [])
            ]),
            iff('!flag:mp_reportClean', [
              c('ostrowski', 'Widziała Gajdę czy kogoś podobnego? I widziała dziewczynę?'),
              choose('call', [opt('Kogoś podobnego. Dziewczyny nie widziała. Mam zapis doręczenia i kartę trasy.', [], { set: { mp_reportClean: true } })])
            ]),
            c('ostrowski', 'Dobrze. Adres z etykiety jest inny niż miejsce odbioru?'),
            choose('call', [opt('Tak. Na etykiecie Rynek 2 w Głuszycy, biuro rachunkowe. Doręczenie było w Rzeczce 17, na zapleczu.', [])]),
            c('ostrowski', 'Proszę mi to wszystko przesłać tak, jak {pan|pani} dostał{|a}. Bez przycinania, bez komentarzy na zdjęciach.'),
            c('ostrowski', 'I jeszcze jedno. Nikt z rodziny ani znajomych nie jedzie w tamtą stronę. Nikt. Jasne?'),
            choose('call', [opt('Jasne. Już im to powiedział{em|am}.', [])]),
            c('ostrowski', 'Pani Duda niech będzie pod telefonem. Odezwę się.'),
            callEnd()
          ]
        }
      }
    }),
    set('mp_reported'),
    give('ev_mp_report'),
    N('zadzwonił do mnie jakiś ostrowski. pytał o wszystko jeszcze raz. czy na pewno 10:25 i czy facet podpisał się „R.”'),
    N('powiedziałam że tak. i że nie widziałam maji. trzy razy to powtórzyłam'),
    pause(6000),
    clock('2026-11-15T16:52'),
    K('dzwonił ktoś do ciebie?'),
    K('mama siedzi przy telefonie i nie odbiera od nikogo bo czeka', { wording: 'mama trzyma telefon w ręce. jak dzwoni ktoś z rodziny, odrzuca, żeby nie przegapić tego z policji' }),
    pause(8000),
    clock('2026-11-15T19:31'),
    K('ZNALEŹLI JĄ'),
    K('żyje'),
    K('żyje żyje żyje'),
    pause(2500),
    K('dzwonili do mamy. w rzeczce, w tym zapleczu, w zamkniętym pokoju z tyłu. był tam piecyk i woda'),
    K('gajdę zatrzymali na miejscu. nie uciekał. siedział w kuchni z kamerą'),
    K('podobno chciał żeby nagrała coś że sama uciekła. nie nagrała'),
    K('jedziemy z mamą do szpitala w wałbrzychu. ona jest bardzo chuda. ale mówi'),
    choose('kuba', [
      opt('Jedźcie. Nic więcej teraz nie trzeba.', [K('dzięki'), K('nina płakała w telefonie jak jej powiedziałem')]),
      opt('Powiedz jej, że czekam. Bez pośpiechu.', [K('powiem. ona może nie odpisać szybko. lekarka mówi żeby jej nie zasypywać wiadomościami'), K('ok?')])
    ]),
    set('majaFound'),
    set('m_lateRescue'),
    notify({ app: 'browser', title: 'Mglisko24', text: 'Zaginiona 22-latka odnaleziona w Rzeczce. Zatrzymano byłego komendanta posterunku.', sound: 'notif' }),
    pause(3000),
    W('Dziękuję. Nie umiem tego lepiej napisać.'),
    W('Pani Nina mówi, że po dzisiejszym poranku nie chce już jeździć przez Rzeczkę. Rozumiem ją.'),
    pause(4000),
    clock('2026-11-20T19:20'),
    unlock('chat:maja2'),
    end('m0')
  ];
});

Engine.chapter('m2', { num: 2, kicker: 'Sprawa 2 · Rozdział 2', title: 'Siatka', when: 'Wtorek, 24 listopada · 18:05', mood: 'calm' }, D => {
  const { say, me, pic, pause, choose, opt, waitFor, goal, give, unlock, set, iff, end, title, clock, notify, typing, scene, vanish } = D;
  const Ma = (t, o) => say('marta', 'marta', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);
  const Nt = (t, o) => say('natan', 'natan', t, o);
  const B = (t, o) => say('bartek', 'bartek', t, o);
  const S = (t, o) => say('sylwia', 'sylwia', t, o);
  const V = (chat, who, dur, text, from = '', o) => say(chat, who, `voice:${dur}|${from}|${text}`, o && o.wording ? { ...o, wording: `voice:${dur}|${from}|${o.wording}` } : o);
  const IK = t => say('blyskm', 'blyskm', t, { vanish: true });

  return [
    clock('2026-11-24T18:05'),
    title(),
    W('Dobry wieczór. Pani Marta przyjechała z kamerą. Siedzimy w kuchni, kaseta nie wychodzi z mieszkania, tak jak było ustalone.'),
    Ma('Dzień dobry. Przywiozłam kamerę z archiwum. Ten sam model, którego pan Adam używał do zgrywania w 2019. Taśma jest w dobrym stanie, tylko przez pierwsze 20 sekund nagranie się urywa.', { wording: 'Już jestem u pani Weroniki. Mam kamerę z archiwum, taki sam model jak przy zgrywaniu w 2019. Kaseta ruszyła. Przez pierwsze 20 sekund są zaniki, dalej odtwarza się dobrze.' }),
    pic('marta', 'marta', 'most_biurko', 'Tak wyglądało moje biurko do wczoraj. Kamera już jest tutaj.'),
    give('ev_m_kubek', { silent: true }),
    scene('xKotka', [
      pic('weronika', 'weronika', 'm_kamera_kotka', 'Pani Ziuta sprawdza sprzęt. Pani Marta mówi, że kot w archiwum to marzenie. U nich nie wolno nawet kwiatka.'),
      choose('weronika', [
        opt('Niech uważa na kabel. Bez kasety zostaniemy z niczym.', [W('Przesunęłam kabel. Kotka się obraziła i poszła na parapet.')]),
        opt('Kotka-archiwistka. Należy jej się etat.', [W('Pani Marta się śmieje. Pierwszy raz dzisiaj.')], { trust: { weronika: 1 } })
      ])
    ]),
    Ma('Puszczam od początku. Będę pisać znaczniki czasu.'),
    pause(2500),
    Ma('03:12–03:51. To jest fragment z publikacji. Słowo w słowo do „nie założyłem z powrotem”.'),
    Ma('A potem on mówi dalej. Nagrałam telefonem dźwięk z głośnika kamery, bo nie chcę jeszcze zgrywać kasety. Jakość jest słaba.'),
    V('marta', 'marta', '0:24', '(głos Henryka, przez głośnik kamery) …ja tej siatki nie założyłem z powrotem, bo mi zabroniła. Mówi: Heniu, moja wina, jak coś, ja podpiszę. No i… (szum) …i ja nie założyłem. Panie Adamie, ja to mam na sumieniu tak czy siak.', 'Marta (odsłuch kasety)'),
    give('ev_m_raw'),
    Ma('„Moja wina” to nie są jego słowa o sobie. On powtarza, co ktoś mu powiedział.', { wording: 'Słyszy {Pan|Pani}? „Moja wina” to jej słowa, które on przytacza. W publikacji brzmi, jakby mówił o sobie.' }),
    Ma('I jeszcze coś ważnego. W opublikowanym fragmencie „moja wina” pada od razu po „z powrotem”. Na kasecie te słowa padają 9 sekund później.'),
    choose('marta', [
      opt('Czyli ktoś wyciął środek zdania i skleił.', [
        Ma('Tak to wygląda. I słychać to, jak się wie, czego szukać. Na 0:37 w publikacji zmienia się szum pokoju. Najpierw jest lodówka, potem jej nie ma.'),
        Ma('Na kasecie lodówkę słychać dalej. W publikacji znika dokładnie przy cięciu.')
      ], { set: { m_cutSeen: true } }),
      opt('Do takiego cięcia trzeba mieć całą taśmę. Kto miał cyfrową kopię?', [
        Ma('Dobre pytanie. Kaseta leżała w pudle, ale zgrywaliśmy ją w redakcji.'),
        Ma('Sprawdzę, komu poszedł plik. Na 0:37 zresztą słychać cięcie: lodówka w tle nagle znika.')
      ], { set: { m_cutSeen: true, m_askedAccess: true } })
    ]),
    give('ev_m_cut'),
    pic('marta', 'marta', 'most_2011', 'Z archiwum. Zdjęcie czytelnika z września 2011, bez daty dziennej. Siatki tu nie widać, ale nie widać też całego przęsła.'),
    give('ev_m_most2011'),
    scene('xSiatka', [
      pause(2000),
      pic('natan', 'natan', 'm_kadr_siatka', 'grzebałem w kronice naszej kablówki. klatka z września 2011. przypomina ci to coś?'),
      choose('natan', [
        opt('Siatka, o której mówi pan Henryk. Zdjęta i niezałożona z powrotem.', [
          Nt('no. w opisie kroniki jest „remont mostu, wrzesień”. nikt nie zwrócił uwagi na barierkę'),
        Nt('daję marcie do akt. teraz mamy to nie tylko z taśmy', { wording: 'wysyłam marcie z opisem kroniki. nie widać całego mostu, ale warto zachować' })
        ], { set: { m_meshFast: true } }),
        opt('Wygląda jak płot przy którejś budowie Kurek-Bud.', [
          Nt('sprawdziłem ich budowy na mapie. mają zielone panele, nie siatkę'),
          pause(3000),
          Nt('a w opisie kroniki stoi „remont mostu, wrzesień”. czyli to most. dobra, i tak się przydało')
        ], { set: { m_meshDetour: true } }),
        opt('Zwykła barierka. Nic nie widzę.', [Nt('ok. odkładam na bok, może się przyda')], { set: { m_meshLater: true } })
      ])
    ]),
    W('Pan Henryk mówi „mi zabroniła”. Kto mu zabronił?'),
    Ma('Na tej części taśmy nie pada nazwisko. Może jest na pierwszej, której nie mamy.'),
    scene('m2kto', [
  choose('marta', [
      opt('Kobieta, która mogła zabronić brygadziście. Kto kierował kontraktem w 2011?', [
        typing('marta', 'marta', 4000),
        Ma('Sprawdzę w przetargu. Jutro.'),
        Ma('Dziś już nie dam rady, przepraszam.')
      ], { set: { m_askedKierownik: true } }),
      opt('Nie zgadujmy. Poszukajmy pierwszej kasety.', [
        Ma('Tak. Pani Weronika mówi, że w pudle są jeszcze dwie bez opisu.')
      ])
    ])
    ]),
    pause(2000),
    Ma('Pani Weronika zrobiła herbatę, więc piszę na spokojnie. U nas mówiło się, że most to przekleństwo. Że co remont, to coś.', { wording: 'Pani Weronika robi herbatę. Przypomniało mi się, że u nas przy każdej awarii mostu słyszałam: „znowu ten przeklęty most”.' }),
    Ma('W Mglisku, znaczy. Tak mówią w Mglisku.'),
    give('ev_m_przeklenstwo', { silent: true }),
    pause(2500),
    clock('2026-11-25T09:14'),
    Nt('hej. sorry że od rana'),
    Nt('po wczorajszym od marty siedzimy z naczelnym. bedzie korekta, ale najpierw chce wszystko na papierze'),
    /* P6 / S2: Natan po własnym błędzie. Bierze winę bez zrzucania jej na innych. */
    scene('xNatanBlad', [
      Nt('i zeby bylo jasne. ten material o moscie puszczalem ja. nie sprawdzilem skad jest plik, wzialem z dysku i poszlo'),
      choose('natan', [
        opt('Dobrze, że to mówisz. Napisz to w korekcie wprost.', [Nt('naczelny nie bedzie zachwycony. ale tak. napisze ze to moj blad, nie stazystki')], { set: { m_natanOwns: true } }),
        opt('Kto jeszcze to widział przed publikacją?', [Nt('nikt. ja mialem sprawdzic. sorry, nie ma tu kogo obwiniac')])
      ])
    ]),
    Nt('i jest problem z drugiej strony. w komentarzach pod klipo ktoś wrzucił fakture z 2011. warsztat sowów serwisował furgonetkę kurek-bud dzień przed wypadkiem'),
    pic('natan', 'natan', 'most_faktura', 'to krąży od nocy'),
    give('ev_m_faktura'),
    Nt('i ludzie piszą że „sowa był na moście” i że hamulce i w ogóle. ja nie wiem nawet co z tym zrobic', { wording: 'teraz z tego robią że sowa był na moście i majstrował przy hamulcach. każdy podaje dalej fakturę z tym samym podpisem' }),
    S('Dzień dobry. U mnie w grupie to samo. Ktoś napisał, że to „Sowa młody”. Bartek. Usuwam, a oni wrzucają od nowa.'),
    choose('natan', [
      opt('Faktura potwierdza wymianę klocków w furgonetce. Nie potwierdza, że ktoś z warsztatu był na moście.', [
        Nt('no tak. ale ludzie czytają co chcą'),
        Nt('dobra. zapytam bartka o fakture, nie o wypadek', { wording: 'dobra. ty go znasz. zapytaj bartka o fakture, nie o wypadek' })
      ], { wording: 'To faktura za klocki, nie dowód, że Sowa był na moście. Sprawdźmy najpierw tę usługę.', set: { m_invoiceRead: true } }),
      opt('Zapytam Bartka. Może coś wie.', [
        Nt('ok. tylko tak żeby nie brzmialo jak przesłuchanie, bo on i tak ma już dość')
      ])
    ]),
    unlock('chat:bartek'),
    goal('Zapytaj Bartka o fakturę z warsztatu (czat z Bartkiem).'),
    choose('bartek', [
      opt('Bartek, krąży faktura waszego warsztatu z 13.09.2011. Wiesz coś o niej?', [], { set: { m_askedBartekFair: true } }),
      opt('Byłeś przy tej furgonetce Kurek-Bud w 2011?', [])
    ]),
    iff('flag:m_askedBartekFair', [B('widzialem. ktos mi wyslal o 2 w nocy')], [B('stary'), B('w 2011 mialem 9 lat'), B('ale dobra, widzialem ta fakture')]),
    B('wystawil ojciec. jego podpis. klocki przod, normalna robota'),
    B('sprawdzilem w zeszycie z 2011. jest wpis. furgon przyjety 12.09, wydany 13.09 o 17.30'),
    B('odebral jakis dudek. podpisal sie'),
    B('ojciec przy moscie nie byl. warsztat nie robi mostow. robi hamulce'),
    pic('bartek', 'bartek', 'most_faktura', 'tu jest „odebral: p. dudek”'),
    choose('bartek', [
      opt('Dzięki. To pokazuje usługę i kto odebrał auto. Nie pokazuje, że ktoś z warsztatu był przy wypadku.', [
        B('no'),
        B('napisz to temu z gazety. ja do sylwii nie pisze, ona i tak wszystko kasuje')
      ], { wording: 'Dzięki. Mamy datę naprawy i odbiorcę, nic o pobycie na moście. Przekażę Natanowi.', set: { m_bartekCleared: true }, trust: { bartek: 1 } }),
      opt('Dzięki. Natan może napisać, że warsztat wyjaśnił. Chcesz, żeby padło twoje imię?', [
        B('nie. niech napisze „warsztat”'),
        B('ja tu dalej mam klientow. i tak polowa juz wie')
      ], { set: { m_bartekCleared: true, m_bartekAnon: true }, trust: { bartek: 1 } })
    ]),
    give('ev_m_sowa_clear'),
    Nt('ok, dostałem od bartka zdjęcie zeszytu. naczelny mówi że w korekcie dopiszemy jedno zdanie że faktura nie ma związku'),
    Nt('i „p. dudek”. to nazwisko gdzies juz widzialem. sprawdze'),
    scene('m2anon', [iff('flag:m_bartekAnon', [Nt('w korekcie bedzie „warsztat”, bez imienia. bartek prosil')])]),
    S('Napisałam w grupie: „Faktura dotyczy wymiany klocków. Proszę nie wskazywać osób, które nic z tym nie mają wspólnego”. Przypięłam.'),
    scene('m2zrzut', [iff('flag:m_showSylwia', [S('Przypięłam też zrzut od pani Marty, trzy pierwsze klatki obok siebie. Pierwszy raz ktoś pod spodem napisał „aha”.')])]),
    S('Pan Henryk zadzwonił do mnie na salon i podziękował. Nie wiem nawet za co. Chyba za to, że ktoś coś przypiął.'),
    scene('xSalonPlotki', [
      pause(2500),
      V('sylwia', 'sylwia', '0:19', 'Przepraszam, że głosówka, mam farbę na rękach. Klientki gadają tylko o moście. Jedna pani powiedziała, że jej szwagier „wszystko widział”. W 2011 był w Anglii. Tak to u nas wygląda.', 'Sylwia'),
      choose('sylwia', [
        opt('Dobrze, że pani to wyłapuje.', [S('Trzydzieści lat w zawodzie. Fryzjerka wie wszystko pierwsza. Bzdury też.', { wording: 'Tego akurat strzygłam przed wyjazdem. Chwalił się pracą w Anglii, dlatego pamiętam.' })]),
        opt('Niech pani nie wchodzi w dyskusje.', [S('Nie wchodzę. Tylko głośniej suszę.')])
      ])
    ]),
    pause(3000),
    clock('2026-11-26T20:40'),
    Nt('wrzuciliśmy wczoraj na stronę tekst „pytania o most”. bez nagrania. ze jest „brakujący dokument” do którego dotarła redakcja'),
    Nt('naczelny nie chciał pisać jaki, bo nie mamy oryginału'),
    Nt('i dzis kurek-bud odpisał na pytania. przekleję cały mail bo nie chce nic skracać, juz raz skrociłem', { wording: 'dziś kurek-bud odpisał. wysyłam cały mail z godziną, nie sam cytat' }),
    pic('natan', 'natan', 'most_mail_kb', 'mail z 26.11, 14:02'),
    give('ev_m_janina_mail'),
    Nt('brzmi jak każdy mail od firmy. nie?'),
    choose('natan', [
      opt('W tekście było tylko „brakujący dokument”. Skąd ona wie, że chodzi o załącznik nr 3?', [
        Nt('…'),
        Nt('czekaj'),
        Nt('nie. tego nigdzie nie bylo. ani u nas, ani w tygodniku. sprawdziłem teraz trzy razy'),
        Nt('„załącznik nr 3” jest tylko na tym ksero z teczki. a ksero widziało kilka osób'),
        Ma('Ja to widziałam. U pani Weroniki. I pan Natan na zdjęciu ode mnie. I osoby z tej rozmowy.'),
        Ma('Albo pani Kurek pamięta to z 2011, z własnych akt. To też jest możliwe.')
      ], { set: { m_zal3Noticed: true } }),
      opt('Tak. Uprzejmie i o niczym.', [
        Nt('no. jak zwykle'),
        Ma('Przeczytałam ten mail dwa razy. Ona pisze „załącznik nr 3”. A w tekście było „brakujący dokument”.'),
        Ma('Nie wiem, co to znaczy. Ale zapisuję.')
      ], { set: { m_zal3Noticed: true } })
    ]),
    pause(2000),
    Ma('Jutro mam wolne, do mamy jadę na urodziny ciotki. Mama ma zawsze rację co do terminów, więc wyjeżdżam o siódmej, nie o ósmej.', { wording: 'Jutro mam wolne, jedziemy z mamą na urodziny ciotki. Mama już zapowiedziała, że wyjeżdżamy o siódmej. Przy ósmej na pewno byśmy się spóźniły, ona wie lepiej.' }),
    Ma('Wieczorem mogę posłuchać pierwszych 20 sekund, tych z zanikami. Może tam jest coś przed „mi zabroniła”.', { wording: 'Dziś późnym wieczorem posłucham jeszcze pierwszych 20 sekund, tych z zanikami. Może tam jest coś przed „mi zabroniła”.' }),
    give('ev_m_terminy', { silent: true }),
    scene('xIda', [
      pause(6000),
      clock('2026-11-26T23:41'),
      unlock('chat:blyskm'),
      notify({ app: 'messages', title: 'Błysk', text: 'i.k_00 wysyła ci wiadomość. Zniknie po przeczytaniu.', sound: 'notif', open: { chat: 'blyskm' } }),
      IK('nie pytaj skąd mam twój numer'),
      IK('te 40 sekund z mostu wycięłam ja'),
      IK('ktoś mnie poprosił. wogóle nie wiedziałam po co'),
      IK('nie mów nikomu w redakcji. jeszcze nie. proszę'),
      choose('blyskm', [
        opt('Zrób zrzut ekranu', [
          IK('zrobił{eś|aś} zrzut'),
          IK('super. czyli jednak jesteś jak oni'),
          vanish('blyskm', 'Wiadomości zniknęły. i.k_00 cię zablokował(a).')
        ], { shot: true, set: { m_shotIda: true } }),
        opt('Kto cię poprosił?', [
          IK('znajomy. przez telefon nie powiem'),
          IK('sama to komuś powiem. daj mi kilka dni'),
          vanish('blyskm')
        ], { set: { m_idaTrust: true } })
      ]),
      pause(3000),
      choose('natan', [
        opt('Natan, ktoś mi napisał na Błysku, że to stażystka wycięła te 40 sekund.', [
          Nt('ida? daj spokój. ona od tygodnia robi tylko napisy do relacji z rady miasta'),
          Nt('masz to gdzieś? zrzut, cokolwiek?'),
          scene('xZrzutIda', [iff('flag:m_shotIda', [me('natan', 'Mam. Wysyłam, tyle zdążył{em|am} złapać, zanim zniknęło.')], [me('natan', 'Nie mam. Zniknęło, zanim zdążył{em|am} zrobić.')])]),
          iff('flag:m_shotIda', [Nt('zrzut jest rozmazany i bez nazwy konta. sorry, to mi nic nie mówi')], [Nt('no właśnie. to zniknęło i tyle. nie będę jej oskarżał przez anonima')])
        ], { set: { m_toldNatan: true } }),
        opt('Nikomu nic nie piszę. Niech Ida sama powie.', [], { set: { m_keptIda: true } })
      ])
    ]),
    set('m_act2'),
    end('m3')
  ];
});

Engine.chapter('m3', { num: 3, kicker: 'Sprawa 2 · Rozdział 3', title: 'K.', when: 'Piątek, 27 listopada · 23:18', mood: 'tense' }, D => {
  const { say, me, pic, pause, choose, opt, waitFor, goal, give, unlock, set, iff, end, title, clock, callIn, callEnd, notify, scene, scare, vanish } = D;
  const Ma = (t, o) => say('marta', 'marta', t, o);
  const Nt = (t, o) => say('natan', 'natan', t, o);
  const Z = (t, o) => say('zuza', 'zuza', t, o);
  const H = (t, o) => say('call', 'henryk', t, o);
  const V = (chat, who, dur, text, from = '', o) => say(chat, who, `voice:${dur}|${from}|${text}`, o && o.wording ? { ...o, wording: `voice:${dur}|${from}|${o.wording}` } : o);

  return [
    clock('2026-11-27T23:18'),
    title(),
    V('marta', 'marta', '0:38', 'Przepraszam, że głosówka, nie chce mi się pisać. Przesłuchałam te zaniki. Tam jest tylko pan Adam: „Panie Henryku, nagrywam, dobrze?” i szum. Nic przed „zabroniła”. Czyli nazwiska na tej części nie ma i nie będzie. (w tle kobiecy głos: „Martuś, z kim tak późno?”) Z nikim, mamo, z pracy. (ciszej) Dobra, to tyle, dobranoc.', 'Marta', { wording: 'Przepraszam, że głosówka, nie chce mi się pisać. Wczoraj w nocy przesłuchałam te zaniki, dopiero teraz mam chwilę. Tam jest tylko pan Adam: „Panie Henryku, nagrywam, dobrze?” i szum. Nic przed „zabroniła”. Czyli nazwiska na tej części nie ma i nie będzie. (w tle kobiecy głos: „Martuś, z kim tak późno?”) Z nikim, mamo, z pracy. (ciszej) Dobra, to tyle, dobranoc.' }),
    give('ev_m_kuchnia', { silent: true }),
    scene('xPiatekNoc', [
      pause(3000),
      Z('dobra muszę się komuś pochwalić. kupiłam babci frytkownicę beztłuszczową na black friday'),
      Z('babcia powiedziała że frytki to się robi na smalcu i schowała ją do szafy'),
      choose('zuza', [
        opt('Za tydzień będzie w niej robić wszystko.', [Z('już dzisiaj zrobiła w niej grzanki. mówi że „tylko sprawdza”')]),
        opt('Babcia ma rację.', [Z('nie wspieraj jej proszę 😭')])
      ]),
      pause(2500),
      pic('natan', 'natan', 'm_mem_radio', 'pies naczelnego. tak wygląda nasz dział dźwięku po 22'),
      pause(6000),
      clock('2026-11-27T23:44'),
      unlock('chat:blyskm2'),
      notify({ app: 'messages', title: 'Błysk', text: 'Nowy kontakt wysyła ci zdjęcie. Zniknie po obejrzeniu.', sound: 'notif', open: { chat: 'blyskm2' } }),
      say('blyskm2', 'blyskm2', 'długo dziś siedzą w gazecie', { img: 'm_okno_redakcji', vanish: true }),
      pause(4500),
      vanish('blyskm2', 'Zdjęcie zniknęło po obejrzeniu.'),
      pause(2000),
      choose('natan', [
        opt('Natan, jesteś jeszcze w redakcji?', [
          Nt('tak, eksportuję relację z rady. czemu?'),
          Nt('ktoś ci przysłał zdjęcie okna? pierwsze piętro z lampką to ja'),
          Nt('dobra. zamykam i idę. przez park nie pójdę')
        ], { set: { m_warnedNatan: true } }),
        opt('Nic nie piszę. Może to tylko głupi żart.', [])
      ])
    ]),
    scene('scNoc', [
      pause(9000),
      clock('2026-11-27T23:52'),
      scare('s2_nightcall', 'call', { name: 'Nieznany numer', ms: 7000 })
    ]),
    scene('f3noc', [
      pause(4000),
      say('kuba', 'kuba', 'nie śpisz? ja na nocce w magazynie. 4% baterii, kabel pożyczony od kierownika'),
      say('kuba', 'kuba', 'dobra nic. tak tylko piszę. dobranoc')
    ]),
    pause(3000),
    clock('2026-11-28T10:02'),
    scene('scNocRano', [
      Nt('dzwonił do ciebie ktoś w nocy? do mnie o 23:50, nieznany numer. odebrałem i cisza'),
      iff('flag:m_warnedNatan', [Nt('dobrze, że napisał{eś|aś} wieczorem. jak zadzwonił, byłem już w domu, nie sam w redakcji')]),
      Nt('ida zadzwoniła o siódmej, roztrzęsiona. na razie powiedziała mi tylko jedno, resztę chce w cztery oczy'),
      Nt('ida mówi że dudek przeglądał jej telefon na siłowni. miała tam numery do wszystkich od mostu. twój też, bo ci go przekazywałem')
    ]),
    Nt('ok, mam. przepraszam że tak długo, ale nie chciałem tego robić za plecami'),
    Nt('rozmawiałem z idą. to nasza stażystka. ta co robiła eksport 40 sekund', { wording: 'rozmawiałem z nią w cztery oczy. to ona zrobiła tamten eksport 40 sekund' }),
    scene('xIdaPo', [
      iff('flag:m_toldNatan', [Nt('i sorry za tamto. miał{eś|aś} rację z tym błyskiem, a ja cię zbyłem')]),
      iff('flag:m_shotIda', [Nt('powiedziała że ktoś jej zrobił zrzut i się przestraszyła. dlatego tak długo nie chciała gadać')]),
      iff('flag:m_idaTrust', [Nt('powiedziała że napisała do ciebie pierwsza i że jej nie wydał{eś|aś}. dlatego przyszła do mnie')])
    ]),
    Nt('sama mi pokazała wiadomości. płakała przy tym'),
    Nt('20.11 napisał do niej znajomy z siłowni. paweł dudek. „masz dostęp do archiwum? jest tam takie stare nagranie z mostu, pokażesz kawałek?”'),
    Nt('wysłała mu całe 6 minut z okolicy 03:00. on odesłał „a da się samo to z siatką i moja wina?”'),
    Nt('i ona to zrobiła. dwa kawałki, sklejone. myślała że to „dla jaj”. potem ja to wziąłem z jej folderu i opublikowałem bez sprawdzenia. za to ja odpowiadam', { wording: 'skleiła mu dwa kawałki, myślała że to „dla jaj”. a ja potem wziąłem ten plik z jej folderu. nie zapytałem nawet, skąd się wziął. po prostu wrzuciłem' }),
    pic('natan', 'natan', 'most_ida', 'zrzut, ida się zgodziła żeby ci pokazać. nazwisko dudka zostawiłem, resztę zasłoniłem'),
    give('ev_m_ida'),
    choose('natan', [
      opt('Dudek. Ten sam, który odebrał furgonetkę z warsztatu w 2011.', [
        Nt('no właśnie. dlatego mi się kojarzył'),
        Nt('dziś jest kierownikiem budowy w kurek-bud. jest na ich stronie w zakładce zespół'),
        Nt('i tygodnik ma 0:42 bo dudek wysłał im swoją wersję. dłuższą o dwie sekundy. bo ida najpierw źle ucięła i poprawiała')
      ], { set: { m_dudekLinked: true } }),
      opt('Ida to zrobiła sama?', [
        Nt('ucięła sama. ale na prośbę. i nie wiedziała po co'),
        Nt('a ten dudek to kierownik budowy w kurek-bud. ten sam co odebrał furgon w 2011, z faktury'),
        Nt('dlatego tygodnik ma 0:42. dudek wysłał im wersję, którą ida poprawiała')
      ], { set: { m_dudekLinked: true } })
    ]),
    give('ev_m_dudek'),
    Nt('jedno nie gra. skad dudek w ogóle wiedział, że w archiwum jest kaseta h.w.? to nie było nigdzie opisane'),
    pause(2500),
    clock('2026-11-28T17:30'),
    Z('hej'),
    Z('{czytales|czytalas} to w gazecie że jest jakiś „brakujący dokument”'),
    Z('babcia to przeczytała w gazecie u sąsiadki i od dwóch dni nie wychodzi z pokoju'),
    Z('dzisiaj powiedziała do mnie „ja nic nie dałam, ja tylko pokazałam panu adamowi”'),
    Z('i potem już nic. tylko to swoje „wypadek w pracy, 2011”'),
    choose('zuza', [
      opt('Myślisz, że babcia to K.?', [
        Z('nie wiem. ale chyba tak. mleko. ona mówi że pan adam woził jej mleko jak wujek zginął'),
        Z('nie chcę jej zmuszać. nie zrobię z babci filmiku. serio nie')
      ]),
      opt('Nie musisz nic robić. Jak się czujesz?', [
        Z('dziwnie. jak w październiku tylko odwrotnie. wtedy chciałam żeby wszyscy wiedzieli, teraz chcę żeby nikt nie wiedział'),
        Z('chyba babcia to K. mleko. pan adam woził jej mleko po pogrzebie')
      ], { trust: { zuza: 1 } })
    ]),
    scene('xParapet', [
      pause(1500),
      pic('zuza', 'zuza', 'm_parapet_babci', 'to stoi u babci na parapecie od zawsze. przypomina ci to coś?'),
      choose('zuza', [
        opt('Pocztówki z górami. Jak ta bez podpisu z pudła pana Adama.', [
          Z('kurde. to chyba ta sama seria. babcia ma ich z dziesięć'),
          Z('nie ruszam. zrobiłam tylko zdjęcie')
        ], { set: { m_postcardTwin: true } }),
        opt('Pusta butelka po mleku.', [
          Z('babcia trzyma ją w oknie od lat. mówi, że na kwiaty, ale nigdy nie widziałam w niej kwiatów')
        ], { set: { m_bottleSeen: true } }),
        opt('Pelargonie jak u każdej babci w Polsce.', [Z('xD babcia mówi, że pelargonia to jedyna roślina, która ją rozumie')])
      ])
    ]),
    Z('mogę ją zapytać czy chce z kimś pogadać. ale ona może powiedzieć nie'),
    choose('zuza', [
      opt('Zapytaj, jeśli chcesz. Jak odmówi, zostawmy to.', [Z('ok. zapytam przy obiedzie. ona przy obiedzie jest najspokojniejsza')], { set: { m_askGrandma: true } }),
      opt('Nie pytaj na razie. Spróbuję potwierdzić ksero inaczej.', [Z('dzięki. serio')], { set: { m_spareGrandma: true } })
    ]),
    iff('flag:m_askGrandma', [
      pause(5000),
      Z('zapytałam'),
      Z('powiedziała „nie”. potem powiedziała „przepraszam, zuziu, nie”'),
      Z('i że pan henryk też ma. że on dał jej jedno, a jedno zostawił sobie'),
      set('m_grandmaNo')
    ]),
    pause(2000),
    callIn('henryk'),
    H('Wiśniewski. Dzwonię, bo Sylwia mówi, że {pan|pani} szuka tej kartki.'),
    H('Mam. W szufladzie. Z rachunkami. Od prądu.'),
    H('Piętnaście lat przekładam. Żona, świeć Panie nad jej duszą, chciała wyrzucić. Nie dałem.'),
    choose('call', [
      opt('Może mi pan zrobić zdjęcie? I nie dawać jej nikomu, dopóki nie będzie wiadomo, co dalej.', [
        H('Zdjęcie wnuczka zrobi. Ja nie umiem tak, żeby było prosto.'),
        H('A kartka zostaje u mnie. Raz mi już wszystko zabrali i ucięli.')
      ], { set: { m_henrykCopyKept: true } }),
      opt('Czy to pani Kurek zabroniła panu założyć siatkę?', [
        H('Pani kierownik. Ja nazwiska przez telefon nie będę mówił.'),
        H('Na kartce jest nazwisko. Niech tam będzie. Przez telefon nie powiem.'),
        H('Wnuczka zrobi zdjęcie tej kartki.')
      ], { set: { m_henrykCopyKept: true } })
    ]),
    callEnd(),
    pause(3000),
    unlock('chat:henryk_sms'),
    pic('henryk_sms', 'henryk', 'most_szuflada', 'ZDJECIE. OD WNUCZKI. H.W.'),
    give('ev_m_s41_h'),
    scene('xHenrykSms', [
      pause(2000),
      say('henryk_sms', 'henryk', 'WNUCZKA MÓWI ŻE NIE TRZEBA PISAĆ DUŻYMI LITERAMI. ALE TAK LEPIEJ WIDZĘ.'),
      say('henryk_sms', 'henryk', 'DOBRANOC.')
    ]),
    pause(2000),
    Ma('Dzień dobry. Natan przesłał mi zdjęcie od pana Henryka.', { wording: 'Dobry wieczór. Natan przesłał mi zdjęcie od pana Henryka.' }),
    Ma('To ta sama strona 41, ten sam wpis z 13.09, ta sama „zał. nr 3”. Druga kopia, od innej osoby. Zgadza się z kserem z teczki.'),
    Ma('Czyli możemy sprawdzić ksero bez ujawniania, że dostaliśmy je od pani Krystyny. Tak będzie lepiej dla wszystkich.', { wording: 'Możemy powołać się na kopię pana Henryka. Nie trzeba wciągać pani Krystyny do tekstu, żeby sprawdzić tę stronę.' }),
    give('ev_m_second_source'),
    pause(2500),
    Ma('Natan zapytał mnie dziś, skąd Dudek wiedział o kasecie w archiwum.'),
    Ma('Sprawdzam, kto w ogóle pytał o „H.W.” i „załącznik nr 3”. Mam dostęp do historii zamówień archiwum. To moja praca, nie hakowanie.', { wording: 'Przeglądam zamówienia archiwum. Ktoś mógł wcześniej prosić o „H.W.” albo „załącznik nr 3”. Jeśli pytał mailem, będzie ślad.' }),
    scene('xTablet', [
      pause(2000),
      pic('marta', 'marta', 'm_tablet_kuchnia', 'Mój gabinet na dziś. Mama ogląda serial w drugim pokoju. Mandarynki są jej, okulary też.'),
      choose('marta', [
        opt('Nie siedź za długo. Jutro też jest dzień.', [Ma('Wiem. Jeszcze tylko sprawdzę zamówienia z listopada.')], { wording: 'Niech pani nie siedzi za długo. Jutro też jest dzień.' }),
        opt('Twoja mama ma tablet starszy niż mój telefon.', [Ma('Ma osiem lat. Mama mówi, że „jeszcze działa”. Robi na nim wszystko: przepisy, krzyżówki, maile.')], { wording: 'Pani mama ma tablet starszy niż mój telefon.' })
      ]),
      Ma('Idę do siebie. Mama zaraz przyjdzie zmywać.')
    ]),
    pause(5000),
    clock('2026-11-28T22:47'),
    Ma('W archiwum nikt.'),
    Ma('ale'),
    Ma('mamy w domu wspólny tablet. stary. mama go używa do maili'),
    Ma('20.11 o 22:10 jest wiadomość do dudka. „Marta mówi, że w redakcji szukają zał. nr 3 do mostu. Jest kaseta H.W., zgrana. Zajmij się tym.”'),
    Ma('to byłam ja. znaczy nie ja. ja jej powiedziałam', { wording: 'ona miała to ode mnie' }),
    Ma('przy kolacji. opowiadałam o pracy. o kasecie. o tym ksero. normalnie. jak się mamie opowiada', { wording: 'przy kolacji powiedziałam jej o kasecie i ksero. nawet nie pamiętam, od czego zaczęłam. zapytała jak w pracy' }),
    pause(2000),
    Ma('moja mama to Janina Kurek'),
    Ma('mam nazwisko po tacie. nie mówiłam, bo to nie miało znaczenia. tak myślałam', { wording: 'nazwisko mam po tacie. nie powiedziałam wam. powinnam była, wiem' }),
    scene('m3kier', [iff('flag:m_askedKierownik', [Ma('pytał{|a} {Pan|Pani} wtedy, kto kierował kontraktem. ja już wiedziałam. przepraszam')])]),
    give('ev_m_zwrot'),
    set('m_twist'),
    choose('marta', [
      opt('Marta, nie wiedziałaś, co ona z tym zrobi. Ale teraz musisz to powiedzieć w redakcji.', [
        Ma('wiem'),
        Ma('w poniedziałek rano. do naczelnego. zanim zdążę to sobie wytłumaczyć')
      ], { wording: 'Nie wiedziałaś, że wyśle to Dudkowi. Ale w redakcji musisz im powiedzieć.', set: { m_martaTells: true }, trust: { marta: 1 } }),
      opt('Dlaczego nie powiedziałaś wcześniej?', [
        Ma('bo myślałam, że to moja prywatna sprawa i nie ma związku ze śledztwem'),
        Ma('pomyliłam się. jutro mówię naczelnemu', { wording: 'nie będę już czekać. powiem naczelnemu' })
      ], { set: { m_martaTells: true } })
    ]),
    Ma('ona jest w kuchni. słyszę jak zmywa'),
    Ma('nie wiem, jak mam teraz tam wejść'),
    /* P6 / S2: konflikt Marty z matką. Bez wielkiej konfrontacji, w kuchni. */
    scene('xMartaKuchnia', [
      choose('marta', [
        opt('Nie musisz dziś nic mówić. Możesz po prostu wejść i pomóc wycierać.', [
          Ma('weszłam. wycieram. ona nuci coś z radia'),
          Ma('a ja nie umiem spojrzeć jej w oczy')
        ], { wording: 'Nie musi pani dziś nic mówić. Może pani po prostu wejść i pomóc wycierać.', trust: { marta: 1 } }),
        opt('Zapytaj ją wprost, komu dała to ksero.', [
          Ma('zapytałam'),
          Ma('powiedziała „to nie twoja sprawa, córcia” i dalej zmywała'),
          Ma('pierwszy raz w życiu tak do mnie powiedziała')
        ], { wording: 'Niech pani zapyta ją wprost, komu dała to ksero.', set: { m_martaAsked: true } })
      ])
    ]),
    set('m_act3'),
    end('m4')
  ];
});
