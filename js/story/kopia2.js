'use strict';
/* SPRAWA 3 „KOPIA ZAPASOWA” — prolog po Ciszy „Hasło” (kp) oraz rozdziały 2 „Opisy” (akt III),
   3 „Kto patrzył” (akt IV, zwrot: Kuba) i 4 „Cudzym głosem” (akt V, Lena, zakończenia).
   Plan: docs/SPRAWA-3-PLAN.md. Każdy wniosek ma źródło widoczne wcześniej (dowód, zdjęcie, log).
   Straszaki w scenach sc*: raz na zapis, najwyżej trzy na rozdział, tryb łagodny w Ustawieniach. */

Engine.chapter('kp', { num: 0, kicker: 'Sprawa 3 · Prolog po Ciszy', title: 'Hasło', when: 'Piątek, 18 grudnia · 16:20', mood: 'calm' }, D => {
  const { say, pause, choose, opt, set, end, title, clock, ambient, unlock, trust } = D;
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const M = (t, o) => say('maja2', 'maja', t, o);

  return [
    clock('2026-12-18T16:20'),
    ambient('calm'),
    title(),
    set('kp_case'),
    K('ej'),
    K('masz chwilę?'),
    K('pani weronika kazała mi zrobić nowe hasła do komputerów w czytelni'),
    K('i tak siedzę i myślę'),
    K('pamiętasz jak w październiku weszł{eś|aś} na nimbusa mai? przez te pytania. imię psa, pierwsza szkoła'),
    K('trzy minuty. siedziałem obok'),
    choose('kuba', [
      opt('Pamiętam. Ustaw w czytelni długie hasła, nie pytania.', [
        K('ustawiłem. szesnaście znaków'),
        K('pani weronika zapisała sobie na karteczce i przykleiła pod klawiaturę 💀')
      ], { set: { kp_passwords: true } }),
      opt('Pamiętam. Czemu o to pytasz?', [
        K('bo to było łatwe. za łatwe'),
        K('ktoś mógł to zrobić tydzień wcześniej. i może by ją szybciej znaleźli'),
        K('nieważne')
      ], { set: { kp_passwords: true, kp_askedWhy: true } })
    ]),
    pause(3000),
    K('dziś jest miesiąc i trzy dni od rzeczki'),
    K('w sklepie dalej mówią że „sama sobie poszła”. pani od pieczywa mówiła to przy mnie. przy mnie'),
    K('i ja stoję z bułkami i nic nie mówię. jak wszyscy'),
    choose('kuba', [
      opt('Ty nie jesteś jak wszyscy. Szukałeś jej, kiedy inni milczeli.', [K('szukałem w grupie'), K('a w sklepie milczałem')], { trust: { kuba: 1 } }),
      opt('Ludzie tak gadają, bo boją się, że to też o nich.', [K('no to niech się boją'), K('sorry. 8% baterii, jestem zły na wszystko')], { set: { kp_kubaAngry: true } })
    ]),
    pause(4000),
    unlock('chat:maja2'),
    M('Kuba do Ciebie pisał? Od rana chodzi jakiś nieswój.'),
    M('Ja mam się dobrze, naprawdę. Tylko nie chodzę do sklepu. Mama chodzi za mnie i wraca zła.'),
    M('Jak coś, to on nie lubi, jak się go pyta „co ci jest”. Lepiej pytać, co robi.'),
    choose('maja2', [
      opt('Robi hasła w czytelni. I liczy dni od Rzeczki.', [M('Liczy. Ja przestałam po tygodniu. On nie umie przestać.')], { set: { kp_toldMaja: true } }),
      opt('Pisał o sklepie. Popilnuję go trochę.', [M('Dzięki. Mnie już nie słucha, jestem siostrą*'), M('*starszą siostrą. to gorzej')])
    ]),
    pause(3000),
    set('kp_done'),
    end('k0')
  ];
});

Engine.chapter('k2', { num: 2, kicker: 'Sprawa 3 · Rozdział 2', title: 'Opisy', when: 'Poniedziałek, 21 grudnia · 8:10', mood: 'tense' }, D => {
  const { say, pic, pause, choose, opt, waitFor, goal, give, unlock, set, iff, end, title, clock, notify, ambient, typing, scene, scare } = D;
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const M = (t, o) => say('maja2', 'maja', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);
  const B = (t, o) => say('bartek', 'bartek', t, o);
  const O = (t, o) => say('ola', 'ola', t, o);
  const Nt = (t, o) => say('natan', 'natan', t, o);
  const Z = (t, o) => say('zuza', 'zuza', t, o);

  return [
    clock('2026-12-21T08:10'),
    ambient('calm'),
    title(),
    unlock('chat:bartek'),
    B('ten klip o warsztacie to o nas'),
    B('2016, kto komu nie zaplacil. ojciec nie spal cala noc. dzwonia ludzie ktorym naprawial auta 10 lat temu'),
    B('igor umie w takie rzeczy. mowie tylko'),
    choose('bartek', [
      opt('Zapytaj go, zanim napiszesz na grupie. I tak trzeba ustalić, skąd ktoś ma nagrania.', [B('sprawdze'), pause(5000), B('w piatek byl w serwisie do 22. mam od niego zdjecie raportu z kasy'), B('to nic nie znaczy ale ok')], { set: { k_bartekAlibi: true } }),
      opt('Nie oskarżaj nikogo, dopóki nie wiemy. Bo zrobisz to samo, co ten klip.', [B('latwo ci mowic'), pause(3000), B('dobra. nie pisze nic na grupie')], { set: { k_bartekCalm: true } })
    ]),
    pause(2500),
    unlock('chat:ola'),
    O('Bartek pisał do Ciebie? Wczoraj prawie napisał na grupie o Igorze.'),
    O('Tata Bartka mówi, że w 2016 to on nie dostał pieniędzy, nie odwrotnie. Ale klip jest ucięty w takim miejscu, że brzmi, jakby to on oszukał.'),
    O('Znowu ucięty. Jak z Henrykiem.'),
    pause(3000),
    unlock('chat:natan'),
    Nt('hej. wiem o co zapytasz, więc od razu'),
    Nt('archiwum gs ma rybickiego 1994–2019. same teksty i zdjęcia. audio nie mamy, nigdy nie mieliśmy'),
    Nt('sprawdziłem logi serwera od 1.12. nikt nic nie pobierał spoza redakcji. mogę ci wysłać zrzut'),
    give('ev_k_natan'),
    pause(3000),
    clock('2026-12-21T17:05'),
    K('ej znasz się na drukarkach?'),
    K('w czytelni świeci na pomarańczowo i nic nie drukuje. pani weronika poszła do domu a ja mam wydrukować katalog fiszek'),
    pic('kuba', 'kuba', 'k_biurko', 'to ta beżowa'),
    give('ev_k_biurko'),
    choose('kuba', [
      opt('Pomarańczowa lampka to zwykle papier albo zacięcie. Otwórz przednią klapkę.', [pause(4000), K('była kartka w środku. zgnieciona. działa'), K('dzięki. jesteś lepsz{y|a} niż serwis igora 💀')]),
      opt('Wyłącz ją na minutę z prądu. A potem sprawdź papier.', [pause(4000), K('zadziałało. nie wiem co, ale zadziałało')])
    ]),
    pause(3500),
    clock('2026-12-21T23:48'),
    ambient('dark'),
    notify({ app: 'browser', title: 'Klipo', text: '@archiwum.rybickiego dodał nowy klip', sound: 'notif', open: { page: 'tt_archiwum' } }),
    set('k_clip6'),
    pause(5000),
    clock('2026-12-22T00:20'),
    set('k_clip7'),
    pause(2000),
    clock('2026-12-22T00:26'),
    set('k_clip7gone'),
    pause(4000),
    /* Głosówka z konta, które zostawia komentarze z minutami. Oddech i równe tykanie w tle. */
    clock('2026-12-22T02:14'),
    unlock('chat:cicho'),
    scene('scOddech', [
      scare('s3_oddech', 'breath'),
      say('cicho', 'cicho', 'voice:0:09|@cicho.bylo|(nikt nic nie mówi. słychać oddech i coś cicho tyka, równo, jak kierunkowskaz)'),
      give('ev_k_cicho')
    ]),
    pause(3500),
    say('cicho', 'cicho', 'to nie jest jego historia'),
    pause(5000),
    clock('2026-12-22T08:40'),
    ambient('calm'),
    K('to z nauczycielką od chemii to przesada'),
    K('dobrze że zniknęło'),
    choose('kuba', [
      opt('Skąd wiesz, co było w tym klipie? Wisiał sześć minut, po północy.', [K('ktoś mi przesłał. wszyscy to mają'), K('serio wszyscy')], { set: { k_kubaSlip: true } }),
      opt('Ja go nie {widziałem|widziałam}. Co w nim było?', [K('nieważne. jakaś stara sprawa z ocenami'), K('nie chcę tego powtarzać')], { set: { k_kubaSlip: true } })
    ]),
    pause(3000),
    goal('Porównaj opisy klipów na koncie @archiwum.rybickiego: godziny wrzutek i sposób pisania.', ['Otwórz Klipo w przeglądarce. Zapisz, o której pojawiały się klipy i jak są podpisane.']),
    waitFor(s => G.flag('k_clip6') && G.has('ev_k_klip1'), {}),
    M('Siedzę nad tymi opisami od rana. Zrobiłam tabelkę.'),
    M('Od czego zaczynamy?'),
    choose('maja2', [
      opt('Od godzin.', [
        M('22:31, 23:40, 06:58, 22:15, 03:11, 23:48, 00:20.'),
        M('Nigdy między ósmą a dwudziestą pierwszą. Albo ktoś w dzień pracuje, albo w dzień śpi.'),
        M('A opisy: małe litery, bez kropek, „4% baterii”, „kabel pożyczony a i tak lepiej niż milczeć”. Ktoś młody. Albo ktoś, kto chce tak brzmieć.')
      ], { set: { k_hoursFirst: true } }),
      opt('Od sposobu pisania.', [
        M('Małe litery, bez kropek. „4% baterii a i tak wrzucam”, „kabel pożyczony a i tak lepiej niż milczeć”.'),
        M('Ktoś młody. Albo ktoś, kto chce tak brzmieć.'),
        M('A godziny: 22:31, 23:40, 06:58, 22:15, 03:11, 23:48, 00:20. Nigdy w dzień. Albo w dzień pracuje, albo w dzień śpi.')
      ], { set: { k_styleFirst: true } })
    ]),
    give('ev_k_godziny'),
    M('Pół Mgliska pisze małymi literami. Mój brat też, nawet do mamy*'),
    M('*zwłaszcza do mamy'),
    pause(3000),
    unlock('chat:zuza'),
    Z('hej. masz chwile?'),
    Z('zrobilam duet z tym klipem o stodole. „mglisko unsolved part 2”. 200 tys w nocy'),
    Z('ale teraz pisza ze ja jestem z nimi w zmowie. ze to ja wrzucam'),
    Z('i ktos wrzucil w komentarzu moj adres. babcia nie wie'),
    choose('zuza', [
      opt('Usuń duet i zgłoś komentarz z adresem. Pomogę ci napisać zgłoszenie, krok po kroku.', [
        Z('ok. usuwam'),
        pause(4000),
        Z('zgloszone. komentarz zniknal po 10 min. ktos zrobil screena ale juz trudno'),
        Z('dzieki. serio')
      ], { set: { k_zuzaHelped: true }, trust: { zuza: 1 } }),
      opt('Sama to wrzuciłaś, Zuza. Odłóż telefon na wieczór.', [Z('ok'), Z('rozumiem')], { set: { k_zuzaAlone: true } })
    ]),
    pause(3500),
    clock('2026-12-22T15:30'),
    W('Dzień dobry. Przyszła odpowiedź z Nimbusa. Szybciej, niż obiecali, bo dopisałam, że ktoś publikuje nagrania zmarłego.'),
    W('Nie ma w niej treści, tylko historia aktywności konta. Wysyłam {Panu|Pani} całą.'),
    set('k_logs'),
    notify({ app: 'browser', title: 'Weronika Lis', text: 'Nimbus · historia aktywności konta (PDF)', sound: 'notif', open: { page: 'nimbus_log' } }),
    goal('Przeczytaj historię aktywności konta Adama Rybickiego.', ['Dotknij powiadomienia albo wpisz w przeglądarce „historia aktywności nimbus”. Która data jest pierwsza i skąd było logowanie?']),
    waitFor('ev:ev_k_logi', { hints: [{ after: 80, chat: 'weronika', who: 'weronika', text: 'Proszę spojrzeć na pierwszy wiersz. Drugi grudnia.' }] }),
    W('Drugi grudnia. To była środa.'),
    W('„Sieć: Biblioteka Publiczna Mglisko”. To jest nasze wi-fi. Hasło wisi na tablicy przy ladzie.'),
    W('Tego dnia byłam w czytelni do osiemnastej. Mam zeszyt zapisów do komputerów. Jutro rano go przejrzę, dziś nie mam siły.'),
    set('k_ch2Done'),
    end('k3')
  ];
});

Engine.chapter('k3', { num: 3, kicker: 'Sprawa 3 · Rozdział 3', title: 'Kto patrzył', when: 'Środa, 23 grudnia · 2:40', mood: 'tense' }, D => {
  const { say, pic, pause, choose, opt, waitFor, goal, give, set, iff, end, title, clock, ambient, typing, scene, scare, show } = D;
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const M = (t, o) => say('maja2', 'maja', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);

  return [
    clock('2026-12-23T02:31'),
    ambient('dark'),
    title(),
    typing('kuba', 'kuba', 4000),
    pause(6000),
    /* Kuba dzwoni w nocy i nic nie mówi. Słychać wózek widłowy i jego oddech. */
    scene('scKuba', [
      scare('s3_kuba', 'call', { name: 'Kuba', number: '604 228 961', ms: 7000, listen: 3800, onAccept: 'k_pickedKuba' }),
      set('k_kubaCalled')
    ]),
    pause(4000),
    iff('flag:k_pickedKuba', [K('sorry. nie chciałem dzwonić'), K('to znaczy chciałem. ale nie wiem co powiedzieć')], [K('sorry. kieszeń')]),
    pause(6000),
    clock('2026-12-23T08:05'),
    ambient('calm'),
    W('Zeszyt zapisów, środa 2 grudnia. Przepisuję dokładnie:'),
    W('„15:10–15:40 Iwona Z., drukowanie CV. 16:00–16:20 p. Zenon, prasa. 15:30–18:00 K. Wrona, dyżur, katalog fiszek z pudła A.R.”'),
    W('Kuba ma u nas dyżury jako wolontariusz. Tego dnia pokazałam mu fiszki pana Adama. Pan Adam pisał na nich ołówkiem, drobno: imiona, ulice, pierwsze redakcje.'),
    W('Obiecałam wczoraj sprawdzić zeszyt. Tyle mam zapisane.'),
    give('ev_k_zeszyt'),
    goal('Zestaw historię logowań z zeszytem zapisów i tym, co wiesz o nockach. Komu pokażesz wynik?', ['Logowania: biblioteka 2.12 o 17:40, potem internet mobilny w nocy (03:09, 23:45). Zeszyt: kto był w czytelni o 17:40?']),
    choose('weronika', [
      opt('Na zdjęciu biurka w czytelni jest karteczka: „imię psa? pierwsza redakcja? ulica dzieciństwa?”. To pytania bezpieczeństwa.', [
        W('Widziałam tę karteczkę. Myślałam, że to do krzyżówki.'),
        W('To biurko dyżurnego.')
      ], { set: { k_noteSeen: true } }),
      opt('Logowania w nocy są z internetu mobilnego. Kto z listy pracuje na nocki?', [
        W('Pani Iwona szuka pracy, pan Zenon jest na emeryturze.'),
        W('Kuba pracuje na nocki w magazynie. Sam mi mówił, że o trzeciej rozładowują tira.')
      ], { set: { k_nightsSeen: true } })
    ]),
    W('Proszę, żeby {Pan|Pani} to zrobił{|a} ostrożnie. To dobry chłopak.'),
    pause(3000),
    M('Pani Weronika do mnie dzwoniła. Nic nie powiedziała, tylko zapytała, czy Kuba śpi w domu.'),
    M('Co się dzieje? Pokaż mi, co masz. Wolę od Ciebie niż od niej.'),
    show('maja2', {
      prompt: 'Pokaż Mai, co łączy konto z jedną osobą',
      accept: [{ ev: ['ev_k_logi', 'ev_k_zeszyt'] }],
      wrong: [['maja', 'To mi nic nie mówi. Pokaż mi, skąd i kiedy ktoś wchodził na jego konto.'], ['maja', 'A kto wtedy był w czytelni?']]
    }),
    M('17:40. Biblioteka. Dyżur do osiemnastej.'),
    pause(2500),
    M('nie'),
    pause(3000),
    M('W niedzielę w nocy pożyczał ode mnie kabel. Mówił, że ma 4% i musi coś wrzucić. Myślałam, że zdjęcie z magazynu.'),
    M('Napisz do niego Ty. Ja nie umiem. Ja na niego nakrzyczę i on się zamknie na tydzień.'),
    set('k_majaKnows'),
    pause(2500),
    goal('Porozmawiaj z Kubą.'),
    choose('kuba', [
      opt('Kuba. Logowanie z biblioteki 2 grudnia o 17:40, kiedy miałeś dyżur. I o 3:09, kiedy rozładowywałeś tira.', [], { set: { k_confrontFacts: true } }),
      opt('Wiem, że to ty prowadzisz to konto. Wolę, żebyś mi to powiedział sam.', [], { set: { k_confrontSoft: true }, trust: { kuba: 1 } })
    ]),
    typing('kuba', 'kuba', 7000),
    pause(2000),
    typing('kuba', 'kuba', 4000),
    pause(3000),
    K('to ty mnie nauczył{eś|aś}'),
    K('w październiku. imię psa, pierwsza szkoła. siedziałem obok i patrzyłem'),
    K('pan adam miał „pierwsza redakcja”. jest w nekrologu. „ulica dzieciństwa” była na fiszce. pani weronika mi ją sama pokazała'),
    K('weszło za drugim razem'),
    K('zdjęcie okna też ja. szedłem z dyżuru'),
    K('chciałem żebyście przestali szukać w pudle. pani weronika się przestraszyła. usunąłem po sześciu minutach'),
    pause(2500),
    K('ja nie chciałem nikogo krzywdzić'),
    K('chciałem żeby usłyszeli, co sami mówili'),
    K('o tomku milczeli 29 lat. po gajdzie też zaraz miało być normalnie'),
    K('ciągle tylko że cicho jest bezpieczniej'),
    iff(s => (s.vars.s1Ending || s.vars.endingId) === 'cisza', [K('o mai też było cicho. trzy tygodnie. pani od pieczywa dalej mówi że sama poszła')]),
    choose('kuba', [
      opt('Brama Pawlaków. Adres Zuzy. Nauczycielka. To nie jest prawda o nich, Kuba. To jest krzywda.', [K('wiem'), K('o zuzie nie wiedziałem. serio')], { set: { k_toldHarm: true } }),
      opt('Rozumiem, czemu to zrobiłeś. Ale musisz to zatrzymać.', [K('wiem'), K('próbowałem w niedzielę. nie umiem')], { set: { k_askedStop: true } })
    ]),
    pause(2500),
    K('i jeszcze jedno'),
    K('ja tego nie wybieram'),
    K('nie przesłuchałem nawet połowy. tam jest 1400 plików'),
    K('przed pierwszą wrzutką napisałem pod starym filmem o panu adamie, że mam jego nagrania. z głupoty'),
    K('odezwało się konto @cicho.bylo. pytało o 2019. wysłałem mu listę plików z tamtego roku, same nazwy i długości'),
    K('pan adam podpisywał pliki. „2016_warsztat_S”. potem dostawałem nazwy i minuty. „2019_08_11, 23:14”. i ja to wycinałem i wrzucałem'),
    K('pierwszy klip też mi wskazało. ja nie wiem kto to jest. przysięgam'),
    give('ev_k_kuba'),
    set('k_twist'),
    pause(3000),
    K('nie mów nikomu jeszcze. proszę. daj mi dzień'),
    choose('kuba', [
      opt('Dzień. Ale dziś nie wrzucasz niczego.', [K('nie wrzucę')], { set: { k_kubaDay: true } }),
      opt('Nie obiecam. Najpierw ustalimy, kto to @cicho.bylo.', [K('ok'), K('rozumiem')])
    ]),
    set('k_ch3Done'),
    end('k4')
  ];
});

Engine.chapter('k4', { num: 4, kicker: 'Sprawa 3 · Rozdział 4', title: 'Cudzym głosem', when: 'Środa, 23 grudnia · 21:50', mood: 'tense' }, D => {
  const { say, pic, pause, choose, opt, waitFor, goal, give, unlock, set, iff, title, clock, ambient, scene, scare, ask, run, ending, credits } = D;
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const M = (t, o) => say('maja2', 'maja', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);
  const L = (t, o) => say('lena', 'lena', t, o);
  const E = (t, o) => say('ewa', 'ewa', t, o);
  const S = (t, o) => say('sylwia', 'sylwia', t, o);
  const C = (t, o) => say('cicho', 'cicho', t, o);

  return [
    clock('2026-12-23T21:50'),
    ambient('dark'),
    title(),
    /* Zdjęcie, które przychodzi samo: przednia szyba, pętla, zielona strzałka. */
    scene('scPetla', [
      scare('s3_petla', 'photo', { img: 'k_petla', ms: 2200 }),
      pic('cicho', 'cicho', 'k_petla', ''),
      give('ev_k_petla')
    ]),
    pause(2000),
    C('napisał mi, że ci powiedział'),
    C('nie szukaj mnie po nim. on nie wie'),
    pause(3000),
    W('Przepraszam, że się wtrącam. Ktoś mnie niedawno pytał o nagrania pana Adama z 2019. Pisałam {Panu|Pani} o tym, pamięta {Pan|Pani}?'),
    goal('Kto jest @cicho.bylo? Zestaw głosówkę, zdjęcie i nazwę konta.', ['Głosówka z 2:14: równe tykanie jak kierunkowskaz. Zdjęcie: przednia szyba, pętla, kanapka w folii.', 'Klip nr 1: dziewczyna miała 7 lat w 2009. Kto pytał Weronikę o nagrania z 2019?']),
    ask('maja2', {
      placeholder: 'Kto to jest?',
      answers: [{ match: ['lena', 'lena cicha', 'cicha', 'kierowczyni', 'lena z busa'] }],
      wrong: [
        ['maja', 'Ktoś, kto siedzi w nocy za kierownicą. Kierunkowskaz, pętla, rozkład na desce.'],
        ['maja', '„cicho było”. Ktoś, kto ma to w nazwisku? I kto pytał panią Weronikę o 2019?']
      ]
    }),
    M('Lena. Ta od busa. To ona pytała panią Weronikę o 2019.'),
    M('W 2009 miała siedem lat. Wiek też pasuje. Ale to dalej tylko moje „pasuje”.'),
    pause(3000),
    unlock('chat:lena'),
    goal('Napisz do Leny.'),
    choose('lena', [
      opt('Leno, czy @cicho.bylo to twoje konto? Nie piszę, żeby cię ujawnić.', [], { set: { k_lenaGentle: true } }),
      opt('To ty podajesz fragmenty osobie, która prowadzi archiwum?', [])
    ]),
    pause(4000),
    L('Uff.'),
    L('Jestem na pętli, mam sześć minut. Potem ostatni kurs.'),
    L('To mój głos w pierwszym klipie. 2019. Miałam siedemnaście lat i pan Adam obiecał, że to nie do druku.'),
    L('W 2009 tata woził drewno dla starego Pawlaka. Byłam z nim tej nocy w szoferce. Widziałam, kto stał przy stodole z kanistrem.'),
    L('Tata powiedział: nic nie widziałaś. I tak było przez dziesięć lat. Cicho było.'),
    give('ev_k_lena'),
    pause(2500),
    L('Jak zobaczyłam, że ktoś ma jego nagrania, wiedziałam, że prędzej czy później wyjdzie moje. Wolałam, żeby wyszło moimi słowami, a nie z komentarzy.'),
    L('Najpierw poprosiłam o listę plików z 2019 i wskazałam swoją rozmowę. Myślałam, że jak sama wskażę, to będę miała wpływ na to, co wyjdzie.'),
    L('A potem prosiłam o inne. Pan Adam podpisywał pliki, po nazwach wiedziałam, o kim są. Warsztat. Rada gminy. Nauczycielka.'),
    L('Bo jak ja muszę, to oni też. Tak sobie mówiłam na pętli.'),
    choose('lena', [
      opt('Twoja historia jest twoja. Opowiedz ją Weronice, do archiwum, z zakazem publikacji. Bez Klipo.', [
        L('Do archiwum.'),
        pause(3000),
        L('Dobrze. Po świętach. Tata może przyjść ze mną, jak będzie chciał. Raczej nie będzie.')
      ], { set: { k_lenaTalks: true }, trust: { lena: 1 } }),
      opt('Nagraj to sama i wrzuć. Swoim głosem, pod nazwiskiem.', [
        L('Pod nazwiskiem.'),
        L('Nie wiem, czy umiem. Ostatnim razem jak mówiłam pod nazwiskiem, miałam siedemnaście lat'),
        L('Zastanowię się.')
      ], { set: { k_lenaPublic: true } })
    ]),
    L('Muszę jechać. Nie piszę w trakcie.'),
    pause(5000),
    clock('2026-12-24T09:15'),
    ambient('calm'),
    E('dzien dobry. pani weronika powiedziala mi wszystko. o kubie tez'),
    E('mowi ze moge poprosic nimbus zeby zamknal jego konto na zawsze. wszystko zniknie. tez to co dobre. jego glos'),
    E('mam w telefonie dwie wiadomosci glosowe od niego. reszta jest tam'),
    choose('ewa', [
      opt('Może pani złożyć wniosek. To zamknie dostęp do konta, choć pobranych kopii nie usunie. Te dwie wiadomości zostaną u pani.', [E('dobrze. podpisze dzisiaj'), E('on by tak chcial. on mowil nie do druku')], { set: { k_ewaOk: true } }),
      opt('Niech pani się nie spieszy. Tam może być coś tylko dla pani.', [E('poczekam do po swietach'), E('nie umiem jeszcze')], { set: { k_ewaWait: true } })
    ]),
    pause(3000),
    S('Dzień dobry. Przepraszam, że w Wigilię.'),
    S('Ktoś napisał w grupie, że „wie, kto prowadzi archiwum”, i że powie o dwunastej. Ludzie czekają. Czy {Pan|Pani} wie, kto to?'),
    choose('sylwia', [
      opt('Wiem. Nie napiszę nazwiska w grupie. Proszę zablokować ten wpis.', [S('Zablokuję. Ludzie będą źli. Wolę złych niż drugą bramę.')], { set: { k_quiet: true } }),
      opt('To Kuba Wrona. Proszę to przypiąć, żeby ludzie przestali podejrzewać innych.', [S('Jest {Pan|Pani} pew{ien|na}?'), pause(2000), S('Przypinam. Mam nadzieję, że to dobra decyzja.')], { set: { k_outedKuba: true } })
    ]),
    pause(3000),
    iff('flag:k_outedKuba', [
      K('widziałem'),
      K('mama widziała. szef z magazynu widział'),
      K('ok')
    ], [
      K('sylwia napisała mi, że wie. i że nie poda nazwiska na grupie'),
      K('dziękuję'),
      choose('kuba', [
        opt('Wyłącz konto sam. I napisz do Pawlaków i do Zuzy. Imiennie, nie do wszystkich.', [K('ok'), pause(5000), K('konto usunięte. napisałem do pana pawlaka. i do zuzy'), K('pan pawlak odpisał „dobrze”. tylko tyle')], { set: { k_kubaOff: true } }),
        opt('To twoja decyzja, co dalej. Ja nie będę jej za ciebie podejmować.', [K('to nie wiem'), K('jeszcze nie wiem')])
      ])
    ]),
    pause(3000),
    run(s => {
      s.vars.s3Ending = G.flag('k_outedKuba') ? 'zasiegi' : (G.flag('k_kubaOff') && G.flag('k_ewaOk') && G.flag('k_lenaTalks')) ? 'wlasnym_glosem' : 'kopia';
    }),
    iff(s => s.vars.s3Ending === 'kopia', [
      clock('2026-12-24T23:58'),
      ambient('dark'),
      /* Ostatni kadr gałęzi „kopia”: nowy profil, zero obserwujących. */
      scene('scKopia', [
        scare('s3_kopia', 'glitch'),
        say('cicho', 'cicho', 'jest nowe konto. w opisie „2006–2021. całość”. zapowiadają klip za trzy dni'),
        say('cicho', 'cicho', 'to nie ja. nie wiem, ile mają')
      ]),
      ending('kopia')
    ], [
      iff(s => s.vars.s3Ending === 'zasiegi', [ending('zasiegi')], [ending('wlasnym_glosem')])
    ]),
    credits()
  ];
});
