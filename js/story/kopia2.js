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
      opt('Może tak gadają, bo boją się przyznać, co się tu stało.', [K('no to niech się boją'), K('sorry. 8% baterii, jestem zły na wszystko')], { set: { kp_kubaAngry: true } })
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
  const { say, pic, pause, choose, opt, waitFor, goal, give, unlock, set, iff, end, title, clock, notify, ambient, typing, scene, scare, vanish, callIn, callEnd } = D;
  const I = (t, o) => say('igor', 'igor', t, o);
  const Bl = (t) => say('blysk', 'blysk', t, { vanish: true });
  const c = (who, t) => say('call', who, t);
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
    scene('xFiszki', [
      pause(2000),
      pic('kuba', 'kuba', 'k_fiszki', 'a to mam przepisać do świąt. fiszki pana adama. pisał ołówkiem, malutkimi literkami. przypomina ci to coś?'),
      choose('kuba', [
        opt('Całe Mglisko na kartkach. Imiona, ulice, daty.', [
          K('no. nawet ulice, na których ktoś mieszkał jako dziecko'),
          K('trochę creepy. ale fajnie się czyta')
        ], { set: { k_fiszkiSeen: true } }),
        opt('Katalog jak w mojej szkolnej bibliotece.', [K('u nas w szkole był komputer. i nie działał')]),
        opt('Ile tego jest?', [K('dwa tysiące z hakiem. jak skończę, będę znał pół mgliska')])
      ])
    ]),
    pause(3500),
    clock('2026-12-21T21:40'),
    ambient('dark'),
    /* Nagranie z pustej czytelni. Lampa na czujnik zapala się sama. Wyjaśnienia nie ma (zaczep na sprawę 4). */
    scene('kLampa', [
      W('Wróciłam do czytelni po szalik. Kuba już poszedł, wszystko pozamykane.'),
      W('Lampa na końcu korytarza zapaliła się sama. Nagrałam, bo nie wierzyłam.'),
      say('weronika', 'weronika', '', { vid: 'assets/video/v_korytarz.mp4', img: 'v_korytarz' }),
      W('To jest czujnik ruchu. Tam nikogo nie ma. Prawda?'),
      choose('weronika', [
        opt('Czujniki łapią czasem ciepło z kaloryfera. Ale niech pani już idzie do domu.', [W('Idę. Zostawiam zapalone światło przy wejściu.')]),
        opt('Proszę zamknąć czytelnię i zadzwonić do mnie z domu.', [
          W('Dobrze.'),
          pause(5000),
          callIn('weronika'),
          c('weronika', 'Jestem w domu. Drzwi zamknięte na dwa zamki.'),
          c('weronika', 'Głupio mi, że się przestraszyłam lampy. Dziękuję, że {Pan|Pani} poczekał{|a}.'),
          callEnd()
        ], { set: { k_veraCall: true }, trust: { weronika: 1 } })
      ])
    ]),
    pause(3000),
    clock('2026-12-21T23:48'),
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
    clock('2026-12-22T01:30'),
    unlock('chat:blysk'),
    notify({ app: 'messages', title: 'Błysk', text: 'mgla_24 wysyła ci wiadomość. Zniknie po przeczytaniu.', sound: 'notif', open: { chat: 'blysk' } }),
    /* Znikające wiadomości: sekret, którego nie da się potem udowodnić. Zrzut ekranu widzi druga strona. */
    scene('kBlysk', [
      Bl('nie pytaj kim jestem'),
      Bl('stodołę pawlaków podpalił stary pawlak. sam. dla odszkodowania'),
      Bl('widziałam go z kanistrem. miałam 7 lat'),
      Bl('tego nie ma w żadnym klipie. i nie będzie, jak ktoś nie dopilnuje'),
      choose('blysk', [
        opt('Zrób zrzut ekranu', [
          Bl('zrobił{eś|aś} zrzut'),
          Bl('myślałam że jesteś inn{y|a}'),
          vanish('blysk', 'Wiadomości zniknęły. mgla_24 cię zablokował(a).')
        ], { shot: true, set: { k_shotBlysk: true } }),
        opt('Dlaczego mówisz to mnie?', [
          Bl('bo ty pytasz zanim wrzucisz'),
          Bl('nikomu tego nie pokazuj. i tak nie masz jak'),
          vanish('blysk')
        ], { set: { k_blyskTrust: true } })
      ])
    ]),
    pause(4000),
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
    scene('kOlaNie', [
      choose('ola', [
        opt('Ktoś mi napisał w nocy, że stodołę podpalił sam stary Pawlak.', [
          O('Kto?'),
          iff('flag:k_shotBlysk', [
            O('Widzę zrzut. Anonimowe konto na Błysku, zero zdjęć.'),
            O('Bartek mówi, że taki zrzut robi się w minutę w apce do memów. I ma rację.')
          ], [
            O('Masz to gdzieś?'),
            O('Czyli nie masz nic. Wiesz, ile osób pisze mi teraz „ktoś mi powiedział”?')
          ]),
          O('Proszę, nie powtarzaj tego dalej. Pawlakowie i tak mają dość.')
        ], { set: { k_toldOla: true } }),
        opt('Nic. Jak tam w pracy?', [O('Kolejka po paczki do Wigilii. Dwie godziny słuchałam o pierogach.'), O('Czyli normalnie. Dobrze, że ktoś pyta o normalne rzeczy.')])
      ])
    ]),
    scene('xPoczta', [
      pause(2000),
      pic('ola', 'ola', 'k_poczta', 'Stoję na poczcie w przerwie. Wysyłam bratu paczkę do Holandii. Przede mną dwanaście osób i każda ma pięć paczek.'),
      choose('ola', [
        opt('Wytrzymaj. To już ostatnie dni przed świętami.', [O('Półtora dnia. Liczę w godzinach.')]),
        opt('Co jest w paczce?', [O('Kiełbasa, pierniki i opłatek. Brat mówi, że w Holandii nie ma prawdziwego chleba.')])
      ])
    ]),
    pause(2500),
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
    /* Zagadka obrazkowa: od odpowiedzi zależy, jak szybko Maja połączy fakty w rozdziale 3. */
    scene('kKabel', [
      pic('maja2', 'maja', 'k_kadr_kabel', 'kadr z ostatniego klipu, 0:03, zanim zaczyna się dźwięk'),
      M('przypomina ci to coś?'),
      choose('maja2', [
        opt('Kabel z taśmą. Taki sam leżał na biurku w czytelni, na zdjęciu od Kuby.', [
          M('czekaj'),
          pause(2500),
          M('o kurczę. ja tak oklejam swoje kable. taśmą malarską, żeby mi ich nie podbierali'),
          M('nic nie mówię. jeszcze nic nie mówię')
        ], { set: { k_cableLink: true } }),
        opt('Igor ma w serwisie mnóstwo kabli z taśmą. Każdy podpisany.', [
          M('zapytam go'),
          pause(4000),
          pic('igor', 'igor', 'k_igor_kable', 'maja pyta o kable. proszę. pół mgliska zostawia u mnie ładowarki'),
          I('u mnie taśma jest kolorowa i z numerem. ta z klipu jest malarska, bez niczego'),
          M('czyli nie od igora. ok, przynajmniej to wiemy')
        ], { set: { k_cableIgor: true } }),
        opt('Zwykły biały kabel. Każdy taki ma.', [M('no może. zapiszę i tyle')], { set: { k_cableLater: true } })
      ])
    ]),
    M('Pół Mgliska pisze małymi literami. Mój brat też, nawet do mamy*'),
    M('*zwłaszcza do mamy'),
    pause(3000),
    unlock('chat:zuza'),
    Z('hej. masz chwile?'),
    Z('zrobilam duet z tym klipem o stodole. „mglisko unsolved part 2”. 200 tys w nocy'),
    Z('ale teraz pisza ze ja jestem z nimi w zmowie. ze to ja wrzucam'),
    Z('i ktos wrzucil w komentarzu moj adres. babcia nie wie'),
    say('zuza', 'zuza', 'voice:0:11||(szeptem) babcia śpi, nie mogę głośno. to jest nasz dom. nasz dom jest w komentarzach'),
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
  const { say, pic, pause, choose, opt, waitFor, goal, give, set, iff, end, title, clock, ambient, typing, scene, scare, show, interlude, nearby, camera, label, go, dial, callEnd, unlock } = D;
  const c = (who, t) => say('call', who, t);
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const M = (t, o) => say('maja2', 'maja', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);

  return [
    clock('2026-12-23T02:31'),
    ambient('dark'),
    title(),
    scene('kNocka', [
      M('nie śpisz? ja też nie'),
      M('mama już lepi uszka. o drugiej w nocy. mówi, że jak nie teraz, to kiedy'),
      M('a Kuba ma ostatnią nockę przed świętami. obiecał, że jutro odśpi i przyjdzie lepić'),
      choose('maja2', [
        opt('Ile tych uszek?', [M('dwieście. liczyłam. w tym roku ja robię te krzywe')]),
        opt('Śpij, Maja. Jutro ważny dzień.', [M('wiem. dobranoc')])
      ])
    ]),
    scene('xUszkaFoto', [
      pause(2000),
      pic('maja2', 'maja', 'k_uszka', 'dowód. 2:40, a stół wygląda jak fabryka'),
      M('te krzywe po prawej to moje. nie oceniaj'),
      choose('maja2', [
        opt('Krzywe są najsmaczniejsze.', [M('wiem. mama mówi to samo, żebym się nie zniechęciła')]),
        opt('Policz je jeszcze raz.', [M('213. dwanaście zjadłam na surowo. nie mów mamie')])
      ])
    ]),
    scene('kKlatka', [
      pause(5000),
      M('ktoś chodzi po klatce. o tej porze'),
      M('a nie. pies pana Zenona. ma zapalenie pęcherza i wychodzi co dwie godziny'),
      M('teraz chodzi z nim wnuczka, przyjechała na święta. pan Zenon by nie dał rady po nocach'),
      pause(4000),
      M('Kuba nie odpisuje od dziesiątej. na nocce zwykle odpisuje chociaż „ok”'),
      say('maja2', 'maja', 'voice:0:07|Maja|(szeptem) Mama już śpi. Na stole zostało dwieście uszek. Dobra, idę spać.')
    ]),
    pause(8000),
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
    W('Dzień dobry. Wolałabym pokazać {Panu|Pani} ten zeszyt na miejscu. Przez telefon nie umiem.'),
    W('Pociąg o 7:12 jest w Mglisku za kwadrans dziewiąta. Odbiorę ze stacji.'),
    scene('xPociag', [
      pause(2000),
      M('jedziesz do Mgliska? weź mi z dworca drożdżówkę z budki. z serem. pani Halinka wie, którą'),
      choose('maja2', [
        opt('Jasne. Z serem.', [M('jesteś skarbem')]),
        opt('A co dostanę w zamian?', [M('uszko. jedno. krzywe')])
      ])
    ]),
    interlude('Pociąg do Mgliska', 'Środa, 23 grudnia · 8:44'),
    clock('2026-12-23T08:46'),
    /* Ktoś na peronie robi zdjęcie gracza od tyłu i proponuje je przez przesyłanie w pobliżu. */
    scene('kPeron', [
      nearby('k_peron', { device: 'Telefon', img: 'k_peron', note: 'Nieznane urządzenie w pobliżu', flag: 'k_peronOk', declineFlag: 'k_peronNo', ev: 'ev_k_peron' }),
      iff('flag:k_peronOk', [
        choose('weronika', [
          opt('Ktoś na peronie przesłał mi zdjęcie. Mnie, od tyłu. Przed chwilą.', [
            W('Stoję przy wyjściu. Na peronie byli dwaj panowie i dziewczyna z psem.'),
            W('Nikogo nie widziałam z telefonem przy oczach. Proszę do mnie podejść, szybko.')
          ], { set: { k_peronTold: true } }),
          opt('Już idę.', [W('Widzę {Pana|Panią}. Proszę iść do wyjścia.')])
        ])
      ], [W('Widzę {Pana|Panią}. Proszę iść do wyjścia, tam jest cieplej.')])
    ]),
    pause(3000),
    clock('2026-12-23T09:10'),
    W('Zeszyt leży na ladzie. Proszę spojrzeć na drugi grudnia.'),
    W('Kuba ma u nas dyżury jako wolontariusz. Tego dnia pokazałam mu fiszki pana Adama. Pan Adam pisał na nich ołówkiem, drobno: imiona, ulice, pierwsze redakcje.'),
    M('jesteś w czytelni? zrób mi zdjęcie tego zeszytu. chcę zobaczyć sama'),
    /* Aparat w grze: gracz kadruje. Ostre zbliżenie od razu, reszta wymaga poprawki. */
    scene('kAparat', [
      label('kAparat.kadr'),
      camera('maja2', [
        opt('Cała strona', [M('nic nie odczytam, za daleko. zrób bliżej'), go('kAparat.kadr')], { img: 'k_zeszyt', set: { k_photoWide: true } }),
        opt('Zbliżenie na 2 grudnia', [M('mam. 2 grudnia, 15:30–18:00, K. Wrona'), M('i 3 grudnia też')], { img: 'k_zeszyt_zoom', set: { k_photoZoom: true } }),
        opt('Z galerii: biurko w czytelni', [M('to biurko już widziałam. zeszyt mi wyślij'), go('kAparat.kadr')], { img: 'k_biurko', gallery: true })
      ])
    ]),
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
    scene('kSzybciej', [
      iff('flag:k_cableLink', [
        M('Nie musisz mi nic pokazywać.'),
        M('Kabel z taśmą to mój. Zeszyt, dyżur do osiemnastej, logowanie o 17:40. Ja to już wiem od wczoraj, tylko nie chciałam wiedzieć.')
      ], [
        M('Co się dzieje? Pokaż mi, co masz. Wolę od Ciebie niż od niej.'),
        show('maja2', {
          prompt: 'Pokaż Mai, co łączy konto z jedną osobą',
          accept: [{ ev: ['ev_k_logi', 'ev_k_zeszyt'] }],
          wrong: [['maja', 'To mi nic nie mówi. Pokaż mi, skąd i kiedy ktoś wchodził na jego konto.'], ['maja', 'A kto wtedy był w czytelni?']]
        }),
        M('17:40. Biblioteka. Dyżur do osiemnastej.')
      ])
    ]),
    pause(2500),
    M('nie'),
    pause(3000),
    M('W niedzielę w nocy pożyczał ode mnie kabel. Mówił, że ma 4% i musi coś wrzucić. Myślałam, że zdjęcie z magazynu.'),
    scene('kPozniej', [iff('flag:k_cableLater', [M('I ten kabel z klipu. Z taśmą. To mój kabel. {Mówiłeś|Mówiłaś}, że zwykły, a ja Ci uwierzyłam.')])]),
    M('Zadzwoń do niego. Ja nie umiem. Ja na niego nakrzyczę i on się zamknie na tydzień.'),
    set('k_majaKnows'),
    pause(2500),
    scene('kTelefon', [
      dial({
        goal: 'Zadzwoń do Kuby (604 228 961).',
        goalHints: [],
        numbers: {
          '604 228 961': { who: 'kuba', then: [
            c('kuba', 'halo'),
            c('kuba', 'wiem po co dzwonisz. maja do mnie pisała'),
            c('kuba', 'nie umiem tego powiedzieć na głos. napiszę ci. daj mi minutę'),
            callEnd()
          ] }
        }
      })
    ]),
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
    iff(s => G.flag('k_peronOk') || G.flag('k_veraCall') || G.flag('k_peronTold'), [K('ale zdjęcie z peronu to nie ja. byłem w magazynie do szóstej'), K('i ta lampa w czytelni, o której mówiła pani weronika, też nie. wyszedłem o siódmej')]),
    K('zdjęcie okna też ja. szedłem z dyżuru'),
    K('chciałem żebyście przestali szukać w pudle. pani weronika się przestraszyła. usunąłem po sześciu minutach'),
    pause(2500),
    K('ja nie chciałem nikogo krzywdzić'),
    K('chciałem żeby usłyszeli, co sami mówili'),
    K('o tomku milczeli 29 lat. po gajdzie też zaraz miało być normalnie'),
    K('ciągle tylko że cicho jest bezpieczniej'),
    iff(s => (s.vars.s1Ending || s.vars.endingId) === 'cisza', [K('o mai też było cicho. trzy tygodnie. pani od pieczywa dalej mówi że sama poszła')]),
    choose('kuba', [
      opt('Kuba, po tych klipach ktoś pomazał Pawlakom bramę i podał adres Zuzy. Jest jeszcze ta nauczycielka. Widzisz, jak ich to krzywdzi?', [K('wiem'), K('o zuzie nie wiedziałem. serio')], { set: { k_toldHarm: true } }),
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
    scene('xKolacja', [
      pause(4000),
      clock('2026-12-23T13:20'),
      say('maja2', 'maja', 'voice:0:14|Maja|(cicho) Kuba wrócił. Siedzi w kuchni i lepi z mamą uszka. Nic nie mówi. Ja też nic nie mówię. Mama się cieszy, że wszyscy są w domu.'),
      choose('maja2', [
        opt('Usiądź z nimi. Nie musisz nic mówić.', [M('siedzę. lepię krzywe. on lepi jeszcze bardziej krzywe')], { trust: { maja: 1 } }),
        opt('Jak się trzymasz?', [M('nie wiem. jakbym miała kamień w brzuchu'), M('ale mama się śmieje. więc się trzymam')])
      ])
    ]),
    set('k_ch3Done'),
    end('k4')
  ];
});

Engine.chapter('k4', { num: 4, kicker: 'Sprawa 3 · Rozdział 4', title: 'Cudzym głosem', when: 'Środa, 23 grudnia · 21:50', mood: 'tense' }, D => {
  const { say, pic, pause, choose, opt, waitFor, goal, give, unlock, set, iff, title, clock, ambient, scene, scare, ask, run, ending, credits, vanish, notify, trust, typing } = D;
  const O = (t, o) => say('ola', 'ola', t, o);
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
    scene('kWigilia', [
      O('Hej. Jak się trzymasz po dzisiejszym dniu?'),
      O('Ja właśnie wróciłam z pracy. Na jutro mam do zrobienia jeszcze sałatkę i choinkę, a lampki znowu nie działają. Co roku to samo.'),
      choose('ola', [
        opt('Przedłużacz. Zawsze winny jest przedłużacz.', [O('Sprawdziłam. Był przedłużacz.'), O('Jesteś lepsz{y|a} niż serwis Igora 😄')]),
        opt('Nie najlepiej. Ale dzięki, że pytasz.', [O('Nie musisz mówić. Jutro będzie spokojniej. Mam nadzieję.')])
      ])
    ]),
    scene('kLampki', [
      pause(4000),
      O('Lampki działają. Ale mrugają same, nawet na stałym trybie.'),
      O('Tata mówi, że to napięcie. Nikt w tym domu nie umie powiedzieć „nie wiem”.'),
      pic('ola', 'ola', 'k_lampki', 'Ale ładnie wyszło. Z okna widać pętlę. Przypomina ci to coś?'),
      choose('ola', [
        opt('Bus na pętli. Ktoś tam stoi co noc o tej samej porze.', [
          O('Ostatni kurs. Zawsze stoi sześć minut. Kierowczyni czasem je kanapkę i patrzy w telefon.'),
          O('Czemu pytasz?')
        ], { set: { k_lampkiBus: true } }),
        opt('Kartkę świąteczną. Śnieg, latarnia, choinka.', [O('Prawda? Wyślę to cioci zamiast kartki. Zaoszczędzę na znaczku.')]),
        opt('Twoje lampki mrugają w rytm kierunkowskazu tego busa.', [O('Przestań 😄 Teraz nie będę mogła przestać na to patrzeć.')], { set: { k_lampkiBus: true } })
      ]),
      pause(5000),
      typing('cicho', 'cicho', 5000),
      pause(3000),
      typing('cicho', 'cicho', 3500)
    ]),
    pause(9000),
    /* Zdjęcie, które przychodzi samo: przednia szyba, pętla, zielona strzałka. */
    scene('scPetla', [
      scare('s3_petla', 'photo', { img: 'k_petla', ms: 2200 }),
      pic('cicho', 'cicho', 'k_petla', ''),
      give('ev_k_petla')
    ]),
    pause(2000),
    C('napisał mi, że ci powiedział'),
    C('nie wypytuj go o mnie. on nie wie, kim jestem'),
    pause(3000),
    scene('xPetlaTrop', [iff('flag:k_lampkiBus', [M('Ola wysłała mi zdjęcie z okna. Bus na pętli, sześć minut postoju. Jak na tym zdjęciu przez przednią szybę.')])]),
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
    M('W 2009 miała siedem lat. Wiek też pasuje. Ale nadal tylko zgaduję.'),
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
    say('lena', 'lena', '', { vid: 'assets/video/v_petla.mp4', img: 'v_petla' }),
    L('Tak tu jest co noc. Ten dźwięk kierunkowskazu słyszę we śnie.'),
    scene('kLenaBlysk', [
      iff('flag:k_shotBlysk', [
        L('I tak, na Błysku to też byłam ja. Zrobił{eś|aś} wtedy zrzut. Dlatego przestałam pisać.'),
        trust('lena', -1)
      ], [
        iff('flag:k_blyskTrust', [L('Na Błysku to też byłam ja. Dzięki, że nie zrobił{eś|aś} zrzutu.')])
      ])
    ]),
    L('To mój głos w pierwszym klipie. 2019. Miałam siedemnaście lat i pan Adam obiecał, że to nie do druku.'),
    L('W 2009 tata woził drewno dla starego Pawlaka. Byłam z nim tej nocy w szoferce. Widziałam, kto stał przy stodole z kanistrem.'),
    L('Tata powiedział: nic nie widziałaś. I tak było przez dziesięć lat. Cicho było.'),
    give('ev_k_lena'),
    pause(2500),
    L('Jak zobaczyłam, że ktoś ma jego nagrania, wiedziałam, że prędzej czy później wrzuci też moje. Wolałam, żeby ludzie usłyszeli, co powiedziałam, zamiast poznawać tę historię z komentarzy.'),
    L('Najpierw poprosiłam o listę plików z 2019 i wskazałam swoją rozmowę. Myślałam, że jak sama wskażę, to będę miała wpływ na to, co wyjdzie.'),
    L('A potem prosiłam o inne. Pan Adam podpisywał pliki, po nazwach wiedziałam, o kim są. Warsztat. Rada gminy. Nauczycielka.'),
    L('Bo jak ja muszę, to oni też. Tak sobie mówiłam na pętli.'),
    choose('lena', [
      opt('Możesz opowiedzieć o tym Weronice i zastrzec, żeby nagranie zostało tylko w archiwum. Bez wrzucania na Klipo.', [
        L('Do archiwum.'),
        pause(3000),
        L('Dobrze. Po świętach. Tata może przyjść ze mną, jak będzie chciał. Raczej nie będzie.')
      ], { set: { k_lenaTalks: true }, trust: { lena: 1 } }),
      opt('Nagraj to sama i wrzuć. Swoim głosem, pod nazwiskiem.', [
        L('Pod nazwiskiem.'),
        L('Nie wiem, czy umiem. Ostatnio opowiadałam o tym pod własnym nazwiskiem, kiedy miałam siedemnaście lat'),
        L('Zastanowię się.')
      ], { set: { k_lenaPublic: true } })
    ]),
    L('Muszę jechać. Nie piszę w trakcie.'),
    scene('xLenaKurs', [
      pause(6000),
      clock('2026-12-23T23:44'),
      say('lena', 'lena', 'voice:0:21|Lena|Skończyłam. Ostatni pasażer wysiadł pod kościołem i powiedział „wesołych świąt”, chociaż to dopiero jutro. Dawno nikt mi tego nie powiedział. Dobranoc.')
    ]),
    pause(5000),
    clock('2026-12-24T09:15'),
    ambient('calm'),
    scene('xWigilia', [
      pic('maja2', 'maja', 'k_wigilia', 'mama lepi od szóstej. ja jestem od zaginania brzegów, bo „masz cierpliwość”. nie mam'),
      choose('maja2', [
        opt('Ile jest tych pierogów?', [M('policzyłam. 64. mama mówi, że za mało')]),
        opt('Zostaw mi jednego.', [M('z kapustą czy ruskiego? dobra, z kapustą. ruskie są moje')])
      ]),
      M('Kuba od rana nie wychodzi z pokoju. mama myśli, że pakuje prezenty'),
      pause(3000)
    ]),
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
      opt('Wiem. Nie napiszę nazwiska w grupie. Proszę zablokować ten wpis.', [S('Zablokuję. Ludzie będą źli. Wolę to, niż żeby komuś znowu pomazali bramę.')], { set: { k_quiet: true } }),
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
        opt('Sam usuń konto. I napisz osobno do Pawlaków i do Zuzy.', [K('ok'), pause(5000), K('konto usunięte. napisałem do pana pawlaka. i do zuzy'), K('pan pawlak odpisał „dobrze”. tylko tyle')], { set: { k_kubaOff: true } }),
        opt('To twoja decyzja, co dalej. Ja nie będę jej za ciebie podejmować.', [K('to nie wiem'), K('jeszcze nie wiem')])
      ])
    ]),
    scene('xGrupaSwieta', [
      pause(2500),
      clock('2026-12-24T18:05'),
      say('group', 'ola', 'Wesołych Świąt wszystkim 🎄 Lampki dalej mrugają, ale już mi to nie przeszkadza.'),
      say('group', 'bartek', 'wesolych. stary pierwszy raz od tygodnia sie smieje. wujek opowiada te same kawaly co rok temu'),
      iff('!flag:k_outedKuba', [
        say('group', 'kuba', 'wesołych'),
        say('group', 'ola', 'Kuba, dobrze, że jesteś.')
      ], [
        say('group', 'ola', 'Kuba, jakbyś chciał pogadać, to jestem. Nawet dzisiaj.')
      ]),
      choose('group', [
        opt('Wesołych. Zjedzcie za mnie pieroga z kapustą.', [say('group', 'bartek', 'zjem dwa. jeden za ciebie, jeden za siebie')]),
        opt('Wesołych. Wyłączcie dziś telefony.', [say('group', 'ola', 'Wyłączam po opłatku. Obiecuję.')])
      ])
    ]),
    pause(3000),
    /* Zaczep na sprawę 4: ktoś trzeci obserwował od początku. */
    scene('kZaczep', [
      clock('2026-12-24T19:40'),
      unlock('chat:blysk2'),
      notify({ app: 'messages', title: 'Błysk', text: 'nowy kontakt wysyła ci wiadomość. Zniknie po przeczytaniu.', sound: 'notif', open: { chat: 'blysk2' } }),
      say('blysk2', 'blysk2', 'wesołych świąt', { vanish: true }),
      say('blysk2', 'blysk2', 'na peronie {stałeś|stałaś} przy starej wiacie. ładna kurtka', { vanish: true }),
      say('blysk2', 'blysk2', 'kuba skopiował 1412 plików. ja mam więcej', { vanish: true }),
      vanish('blysk2', 'Wiadomości zniknęły po przeczytaniu.')
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
