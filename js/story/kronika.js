'use strict';
/* Sprawa nr 4 „Kronika” (docs/SPRAWA-4-PLAN.md). Pięć rozdziałów, siedem nocy ferii.
   Prawda (konto prowadzi Ida) wychodzi dopiero w c3. Wcześniej wszystko wskazuje na pana Zenona. */

const KronikaCast = D => {
  const { say } = D;
  return {
    M: (t, o) => say('maja2', 'maja', t, o),
    O: (t, o) => say('ola', 'ola', t, o),
    I: (t, o) => say('igor', 'igor', t, o),
    W: (t, o) => say('weronika', 'weronika', t, o),
    S: (t, o) => say('sylwia', 'sylwia', t, o),
    K: (t, o) => say('kuba', 'kuba', t, o),
    Nt: (t, o) => say('natan', 'natan', t, o),
    Gr: (who, t, o) => say('group', who, t, o),
    Z: (t, o) => say('zenon', 'zenon', t, o),
    Id: (t, o) => say('ida', 'ida', t, o),
    B: (t, o) => say('blysk2', 'blysk2', t, Object.assign({ vanish: true }, o)),
    c: (who, t, o) => say('call', who, t, o),
    V: (chat, who, dur, text, from = '') => say(chat, who, `voice:${dur}|${from}|${text}`)
  };
};

/* ---------- c0 · Studniówka ---------- */
Engine.chapter('c0', { num: 0, kicker: 'Sprawa 4 · Prolog', title: 'Studniówka', when: 'Poniedziałek, 18 stycznia · 20:10', mood: 'calm' }, D => {
  const { say, pic, pause, choose, opt, waitFor, goal, give, unlock, set, iff, end, title, clock, notify, ambient, typing, scene, scare, vanish } = D;
  const { M, O, S, B, V, Gr, K, W } = KronikaCast(D);
  return [
    clock('2027-01-18T20:10'),
    ambient('calm'),
    title(),
    set('c_started'),
    scene('xKopiaStart', [iff(s => s.vars.s3Ending === 'kopia', [
      unlock('chat:blysk2'),
      notify({ app: 'messages', title: 'Błysk', text: 'nowy kontakt wysyła ci wiadomość. Zniknie po przeczytaniu.', sound: 'notif', open: { chat: 'blysk2' } }),
      B('mówił{em|am} że mam więcej'),
      B('2006–2021 to dopiero połowa. dziś o 21'),
      vanish('blysk2', 'Wiadomości zniknęły po przeczytaniu.')
    ])]),
    M('hej. ferie, a lodowisko zamknięte. „awaria agregatu”'),
    pic('maja2', 'maja', 'c_lodowisko', 'za to bałwan pilnuje. ktoś mu dał pachołek zamiast czapki'),
    choose('maja2', [
      opt('Bałwan wygląda, jakby był tu dłużej niż agregat.', [M('xD bo jest. stoi od sylwestra'), M('Kuba mówi że to jego dzieło. nie wierzę mu')]),
      opt('Czyli całe ferie na sankach?', [M('sanki, herbata, seriale. jak w podstawówce'), M('mama już kupiła trzy paczki pierniczków „na wszelki wypadek”')])
    ]),
    // P7: wejście do S4 po „Zasięgach”.
    scene('xPoZasiegach', [iff(s => s.vars.s3Ending === 'zasiegi', [
      M('kuba dalej nic nie znalazł. w dwóch miejscach powiedzieli, że „oddzwonią”'),
      M('kartki już nikt nie przykleja. ale pani ze sklepu dalej mówi do niego „panie informatyku”'),
      choose('maja2', [
        opt('Napiszę do niego. Może razem coś wymyślimy.', [M('napisz. tylko nie pytaj o robotę. sam powie')], { trust: { maja: 1 } }),
        opt('A ty jak się trzymasz?', [M('ja? ja zdjęłam tę kartkę. i tyle o tym'), M('dobra, ferie. o bałwanach miało być')])
      ])
    ])]),
    scene('xFerie', [
      pause(2500),
      say('kuba', 'kuba', 'pierwszy zjazd sezonu. nie pytaj'),
      pic('kuba', 'kuba', 'c_gorka', 'maja nagrała jak się wywalam. jak to wrzuci na klipo to się wyprowadzam'),
      choose('kuba', [
        opt('10/10 za styl lądowania.', [say('kuba', 'kuba', 'dzięki. sędziowie razem z bałwanem dali mi 6')]),
        opt('Żyjesz?', [say('kuba', 'kuba', 'żyję. kurtka mniej. śnieg mam nawet w skarpetkach')])
      ]),
      pause(3000),
      O('Hej! Pierwszy dzień ferii w świetlicy. Dwadzieścioro dzieci, jedna gra planszowa bez kostki.'),
      pic('ola', 'ola', 'c_rysunek', 'Ale dostałam to. Podobno ja w zielonym swetrze 💚'),
      choose('ola', [
        opt('Wyglądasz na szczęśliwą. I wysoką.', [O('Bo dla nich jestem wysoka 😄 Jutro robimy pierniki.')], { trust: { ola: 1 } }),
        opt('A gdzie kostka?', [O('Podobno zjadł ją pies Kacpra. W co nikt nie wierzy, bo Kacper nie ma psa.')])
      ])
    ]),
    scene('xGrupaSanki', [
      pause(2500),
      Gr('ola', 'Kto jutro na sanki za blokami? Biorę termos.'),
      Gr('bartek', 'ja. mam sanki po dziadku. drewniane, ciezkie jak lodowka'),
      Gr('kuba', 'ja po południu. rano śpię'),
      choose('group', [
        opt('Jestem. Kto robi herbatę?', [Gr('ola', 'Ja! Z sokiem malinowym, nie negocjuję.')]),
        opt('Ja popatrzę z okna. Ktoś musi nagrywać upadki.', [Gr('bartek', 'deal. tylko nie wrzucaj na klipo')])
      ])
    ]),
    pause(4000),
    V('maja2', 'maja', '0:09', 'Dobra, idę zrobić herbatę. Jak będziesz coś oglądać, daj znać, to obejrzymy razem.', 'Maja'),
    pause(6000),
    clock('2027-01-18T21:01'),
    notify({ app: 'browser', title: 'Klipo', text: '@kronika.mglisko · „studniówka, 1999” · nowe konto', sound: 'notif', open: { page: 'tt_kronika' } }),
    M('widział{eś|aś} to?? ktoś wrzucił studniówkę z 1999'),
    say('maja2', 'maja', '', { vid: 'assets/video/v_studniowka.mp4', img: 'v_studniowka' }),
    M('nagrałam ekran, bo nie wiem, czy tego nie usuną'),
    goal('Obejrzyj konto @kronika.mglisko na Klipo.', ['W przeglądarce wpisz „kronika mglisko” albo dotknij powiadomienia.']),
    waitFor('ev:ev_c_klip1', { hints: [{ after: 90, chat: 'maja2', who: 'maja', text: 'wpisz w przeglądarce kronika mglisko' }] }),
    M('pod spodem jest napis „jutro kolejna osoba”'),
    M('i zobacz końcówkę. kamera przesuwa się obok tańczących i zatrzymuje na drzwiach. jakby ktoś tam stał'),
    scene('xKadr', [
      pause(2000),
      pic('maja2', 'maja', 'c_studniowka', 'zrobiłam zrzut. przypomina ci to coś?'),
      choose('maja2', [
        opt('Wygląda jak stara kronika z kablówki. Natan miał podobny kadr z mostu.', [
          M('o. masz rację. ten sam żółty pasek u dołu, ta sama jakość', { wording: 'o. masz rację. ta sama jakość z kasety. tylko pasek u dołu inny, żółty' }),
          M('to „TV Dolina”. kablówka. puszczali to w każdą sobotę przed pogodą')
        ], { set: { c_linkTV: true } }),
        opt('To sala gimnastyczna w naszej szkole?', [
          M('tak, poznaję drabinki. tylko kosz był wtedy wyżej'),
          pause(3000),
          M('mama mówi, że to filmowała kablówka. „TV Dolina”. puszczali to w sobotę przed pogodą')
        ], { set: { c_linkGym: true } }),
        opt('Zwykłe nagranie z wesela.', [M('to nie wesele, to polonez. ale ok, zapiszę')], { set: { c_linkLater: true } })
      ])
    ]),
    pause(3000),
    O('Hej. Widzisz, co się dzieje na Klipo?'),
    O('Moja mama jest na tej studniówce. Druga para od lewej. Dzwoniła do mnie cała w nerwach.'),
    O('Nic złego tam nie robi. Tańczy. Ale ktoś w komentarzach już napisał, z kim przyszła. A to nie był tata.'),
    choose('ola', [
      opt('To było 28 lat temu. Nikt rozsądny nie będzie z tego robił afery.', [O('W Mglisku? Będą to omawiać do Wielkanocy.')]),
      opt('Jak się czuje twoja mama?', [O('Śmieje się, ale słyszę, że płakała. Tata siedzi w drugim pokoju i ogląda skoki.')], { trust: { ola: 1 } })
    ]),
    scene('xAlbum', [
      pause(2000),
      Gr('bartek', 'moja ciotka tez jest w tym polonezie. juz dzwoni do wszystkich, ze to nie ona'),
      Gr('ola', 'Moja mama też jest. I to na pewno ona.'),
      pause(1500),
      O('Mama wyciągnęła album i pokazuje mi wszystkich po kolei. „Ta się rozwiodła, ten wyjechał do Niemiec, a ta ma teraz sklep z firankami”.'),
      choose('ola', [
        opt('Posiedź z nią. Album to dobry pomysł.', [O('Siedzę. Dostałam herbatę i kawałek sernika. Chyba jest dobrze.')]),
        opt('Zapytaj ją, kto stał w drzwiach.', [O('Zapytałam. Mówi, że nikt. Że w drzwiach zawsze stał pan z kablówki i nagrywał.')], { set: { c_doorAsk: true } })
      ])
    ]),
    pause(2500),
    S('Dobry wieczór. Pod tym klipem w mojej grupie jest już czterdzieści komentarzy.'),
    S('Ludzie pytają, kto będzie „jutro”. Proszę, jeśli {Pan|Pani} coś wie, niech {Pan|Pani} da znać. Nie chcę, żeby zrobiła się z tego afera.'),
    scene('xSylwiaNoc', [
      choose('sylwia', [
        opt('Proszę na razie nic nie przypinać. Obejrzę to.', [S('Dobrze. Wyłączę komentarze na noc.')]),
        opt('Niech pani napisze, żeby nikt nie podawał nazwisk.', [S('Napisałam. Trzy osoby już się obraziły.')])
      ])
    ]),
    scene('xZuza', [
      unlock('chat:zuza'),
      say('zuza', 'zuza', 'hej. widział{eś|aś} tę studniówkę?'),
      say('zuza', 'zuza', 'babcia mówi że ten sam pan z kablówki kręcił mój chrzest. ma tę kasetę do dziś'),
      say('zuza', 'zuza', 'i powiedziała jeszcze „on wszystkich nagrywał, a jego nikt”'),
      iff('flag:k_zuzaHelped', [say('zuza', 'zuza', 'btw od grudnia nikt już nie stoi pod domem. dzięki, że wtedy zgłosił{eś|aś} ten komentarz. nie zapomniałam')]),
      choose('zuza', [
        opt('Ciekawe, ile takich kaset leży po domach.', [say('zuza', 'zuza', 'u nas trzy. komunia, chrzest i wesele cioci. nikt nie ma już magnetowidu')]),
        opt('Pozdrów babcię.', [say('zuza', 'zuza', 'pozdrowiła. i kazała ci się ciepło ubrać. nie wiem skąd wie że się za lekko ubieram')])
      ]),
      pause(2000),
      pic('zuza', 'zuza', 'c_kasety_babci', 'babcia trzyma je w meblościance jak relikwie. widzisz coś znajomego?'),
      choose('zuza', [
        opt('Na każdej jest ta sama naklejka z anteną. Ktoś opisywał kasety TV Dolina ręcznie.', [say('zuza', 'zuza', 'babcia mówi że pan zenon sam podpisywał każdą kasetę. „ładnym pismem, nie to co dzisiaj”')], { set: { c_labelLink: true } }),
        opt('Ania z wesela to twoja ciocia?', [say('zuza', 'zuza', 'tak. podobno wujek tańczy tam z teściową i się przewraca. tego pan zenon nie wyciął, bo było śmieszne')]),
        opt('Ładnie opisane. Ktoś o nie dba.', [say('zuza', 'zuza', 'babcia. wyciera je z kurzu w każdą sobotę')])
      ])
    ]),
    give('ev_c_klip1', { silent: true }),
    scene('xWeronikaCiasta', [
      W('Widziałam tę studniówkę. Ja też tam jestem, przy stoliku z ciastami. Nikt mnie nie poznał i bardzo dobrze.'),
      choose('weronika', [
        opt('Teraz będę pani szukać w każdym kadrze.', [W('Proszę nie szukać. Miałam wtedy trwałą, której się wstydzę do dziś.')]),
        opt('Kto wtedy piekł te ciasta?', [W('Ja i pani Basia od pana Henryka. Sernik był jej. Mój zakalec też ktoś zjadł.')])
      ])
    ]),
    scene('xKubaCiocia', [
      clock('2027-01-18T22:40'),
      K('mama ogląda studniówkę i gada z ciocią na głośniku. ciocia też tam była. kłócą się, która miała gorszą fryzurę'),
      choose('kuba', [
        opt('Kto wygrywa?', [K('ciocia. trwała na pół głowy')]),
        opt('Dobrze, że się z tego śmieją.', [K('no. lepiej niż w październiku')])
      ]),
      pause(4000)
    ]),
    pause(7000),
    clock('2027-01-18T23:52'),
    ambient('dark'),
    M('nie mogę spać. obejrzałam to jeszcze raz'),
    M('w tych drzwiach na końcu ktoś stoi. naprawdę stoi'),
    typing('maja2', 'maja', 4000),
    pause(3000),
    scene('scDrzwi', [scare('s4_drzwi', 'photo', { img: 'c_studniowka', ms: 2000 })]),
    pause(2000),
    M('sorry. dobranoc'),
    end('c1')
  ];
});

/* ---------- c1 · Boisko ---------- */
Engine.chapter('c1', { num: 1, kicker: 'Sprawa 4 · Rozdział 1', title: 'Boisko', when: 'Wtorek, 19 stycznia · 16:40', mood: 'calm' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, notify, ambient, scene, scare, callIn, callEnd, unlock } = D;
  const { M, O, I, W, S, Nt, Gr, c, V } = KronikaCast(D);
  return [
    clock('2027-01-19T16:40'),
    ambient('calm'),
    title(),
    I('dzień dobry z serwisu. pani przyniosła telefon, który był w pralce. dwa razy'),
    I('pyta, czy zdjęcia z wnuczką się uratują. uratują się, bo są w Nimbusie. telefon nie'),
    choose('igor', [
      opt('Dwa razy w pralce to już jest hobby.', [I('powiedziała, że za pierwszym razem „tylko na płukanie”')]),
      opt('Dobrze, że chociaż zdjęcia są.', [I('no. ludzie płaczą po straconych zdjęciach, nie po telefonie')])
    ]),
    pause(3000),
    pic('igor', 'igor', 'c_ryz', 'oczywiście przyniosła go w ryżu. ryż nic nie daje. ale ludzie w to wierzą jak w horoskop'),
    choose('igor', [opt('Ja też kiedyś wierzył{em|am}.', [I('wszyscy wierzyli. potem przychodzili do mnie z ryżem w porcie ładowania')]), opt('Daj jej ten ryż na drogę.', [I('dałem. powiedziała, że zrobi z niego kaszę. nie wiem, czy żartowała')])]),
    pause(2500),
    scene('xSankiWideo', [
      Gr('ola', 'Dowód, że Bartek żyje 😄'),
      say('group', 'ola', '', { vid: 'assets/video/v_sanki.mp4', img: 'v_sanki' }),
      Gr('bartek', 'czapka nie przezyla'),
      choose('group', [
        opt('Lądowanie 9/10.', [Gr('bartek', 'za co ten punkt w dol')]),
        opt('Bartek, śmiejesz się czy płaczesz?', [Gr('bartek', 'smieje sie. plecy placza')])
      ]),
      pause(2500)
    ]),
    I('a tak serio. widziałem tę studniówkę. dziś o 21 ma być następny klip'),
    I('obejrzałem pierwszy klatka po klatce. chcesz wiedzieć, co znalazłem?'),
    choose('igor', [opt('Pewnie.', []), opt('Mów.', [])]),
    I('w 0:27 na górze ekranu jest odbicie. jakby świeciła lampka na biurku'),
    I('na samym nagraniu z kasety nie powinno być takiego odbicia. chyba że ktoś filmuje telewizor telefonem'),
    set('c_tvFilmed'),
    I('to ważne, bo ktoś ma kasety i telewizor w jednym pokoju. to bardzo zawęża listę', { wording: "czyli ktoś raczej nagrywa ekran, zamiast wrzucać plik. szukamy miejsca z kasetami i telewizorem. samych ludzi to jeszcze nie wskazuje" }),
    pause(3000),
    W('Dzień dobry. Pani Maja mówi, że {Pan|Pani} pyta o kronikę.'),
    W('Lepiej zadzwonię. Pisanie mi dziś nie idzie.'),
    pause(2000),
    callIn('weronika'),
    c('weronika', 'Kronikę „TV Dolina” kręcił jeden człowiek. Pan Zenon Gil.'),
    c('weronika', 'Osiemnaście lat z kamerą na ramieniu. Każdy festyn, każde zebranie, każdy pogrzeb.', { wording: 'Ponad dwadzieścia lat z kamerą na ramieniu, od dziewięćdziesiątego szóstego. Każdy festyn, każde zebranie, każdy pogrzeb.' }),
    c('weronika', 'Jak kablówka upadła w 2018, kasety zabrał do domu. Mówił, że „szkoda wyrzucić ludzi”.'),
    c('weronika', 'To porządny człowiek. Nie wierzę, żeby to robił. Ale kasety są u niego. Wszyscy to wiedzą.'),
    callEnd(),
    set('c_zenonNamed'),
    scene('xKubaSiniak', [
      M('kuba wrócił z sanek z siniakiem na pół uda. mama każe mu smarować siniak maścią końską'),
      choose('maja2', [
        opt('Maść końska rozwiązuje wszystko.', [M('mówi, że śmierdzi jak stajnia. ale smaruje')]),
        opt('A ty nie jeździłaś?', [M('jeździłam. ja umiem hamować')])
      ])
    ]),
    give('ev_c_tv'),
    scene('xZenonKamera', [
      pause(2000),
      pic('weronika', 'weronika', 'c_zenon_kamera', 'Znalazłam w archiwum czytelni. Festyn, 2005. Pan Zenon zawsze stawał na scenie, bo „stamtąd widać wszystkich”.'),
      W('Coś {Panu|Pani} to mówi?'),
      choose('weronika', [
        opt('Kamera na ramieniu, wysoko, ze sceny. Stąd te ujęcia z góry.', [W('Tak. Mówił, że z dołu widać tylko plecy.')], { set: { c_heightLink: true } }),
        opt('Uśmiecha się do kogoś obok kamery.', [W('Do mnie. Stałam z boku z kanapkami dla zespołu. Dawno temu.')]),
        opt('Zwykłe zdjęcie z festynu.', [W('Zwykłe. Takich miał setki, tylko zawsze bez siebie.')])
      ]),
      W('Dał mi tę odbitkę dziesięć lat temu. Powiedział, że to jedyne zdjęcie, na którym jest on, a nie wszyscy inni.')
    ]),
    pause(5000),
    clock('2027-01-19T21:00', { rest: 's4_evening' }),
    /* P3: Weronika wraca po pracy; zwykła rozmowa przed nowym klipem. */
    scene('xPoPracy', [
      W('Wróciłam. Dwanaście godzin na nogach, a w autobusie ktoś jadł śledzie.'),
      choose('weronika', [
        opt('Odpocznij. Kronika poczeka do jutra.', [W('Nie poczeka. Ale dzięki.')]),
        opt('Jak w pracy?', [W('Jak zawsze we wtorek. Ktoś zgubił klucze, ktoś krzyczał na kasie. Normalnie.')])
      ])
    ]),
    set('c_day2'),
    notify({ app: 'browser', title: 'Klipo', text: '@kronika.mglisko · „boisko, 2008”', sound: 'notif', open: { page: 'tt_kronika' } }),
    scene('xBoisko', [
      pic('igor', 'igor', 'c_boisko', 'nowy. boisko za szkołą, 2008. coś ci się rzuca w oczy?'),
      choose('igor', [
        opt('Tak jak na nagraniu ze studniówki: u góry znowu widać odbicie lampki.', [
          I('tak. i jeszcze w rogu, przy samochodzie, widać zielone cyferki. 23:47'),
          I('to zegar magnetowidu. ktoś to filmował dzisiaj w nocy, nie w 2008', { wording: "wygląda jak zegar magnetowidu. godzina jest z urządzenia przed ekranem, nie z meczu w 2008. nie wiemy jeszcze, czy zegar dobrze chodzi" })
        ], { set: { c_clockSeen: true } }),
        opt('Ten samochód. Kalinowski, wójt.', [
          I('tak, wójt. a ten drugi to Wrzos z Wrzos-Bud. jego szwagier'),
          I('ale patrz w róg ekranu. zielone cyferki, 23:47. ktoś to nagrywał niedawno, w nocy', { wording: "ale patrz w róg. zielone 23:47, chyba zegar magnetowidu stojącego przed ekranem. może być źle ustawiony" })
        ], { set: { c_clockSeen: true, c_wojtSeen: true } }),
        opt('Zwykła budowa.', [I('ok. zapisuję sobie godzinę z rogu, 23:47. może się przyda')], { set: { c_clockLater: true } })
      ])
    ]),
    give('ev_c_boisko'),
    scene('xBoiskoEcho', [
      pause(2000),
      Gr('bartek', 'na tym boisku w tle gra moj stary. w dresie z 2008. matka placze ze smiechu'),
      Gr('kuba', 'a wójt dalej jest wójtem?'),
      Gr('bartek', 'nie. teraz ma myjnie'),
      pause(2000),
      S('Były wójt dzwonił do mnie, żebym usunęła klip z grupy. Ja go nie wrzucałam. Ktoś wkleił link.'),
      S('Powiedziałam, że usuwam tylko wyzwiska. Rozłączył się.'),
      choose('sylwia', [
        opt('Dobrze pani zrobiła.', [S('Trzęsą mi się ręce. Ale chyba tak.')]),
        opt('Może wyłączyć komentarze pod linkiem?', [S('Wyłączyłam. Teraz piszą do mnie prywatnie.')])
      ]),
      pause(2000),
      unlock('chat:natan'),
      Nt('czesc. boisko 2008 to byl u nas temat. przetarg, szwagier wojta. tekst wyszedl, nic sie nie stalo'),
      Nt('czyli ktos wyciaga rzeczy, ktore juz byly w gazecie. i dorzuca takie, ktorych nie bylo'),
      choose('natan', [
        opt('Studniówki nie było w gazecie.', [Nt('no wlasnie. to nie jest dziennikarstwo. to jest ktos, kto chce, zeby bolalo', { wording: "no. przetarg to jedno. a tu juz w komentarzach rozpisuja, kto z kim przyszedl na studniowke" })]),
        opt('Jak się czujesz, że znowu chodzi o jakieś nagranie?', [Nt('jakbym drugi raz jadl ten sam zly obiad', { wording: "od razu sprawdzilem, czy ktos znowu czegos nie wycial. nawet zanim obejrzalem do konca" })])
      ])
    ]),
    pause(3000),
    O('Pod klipem z boiskiem ktoś napisał „jutro: O.N.”.'),
    O('O.N. To mogę być ja. Aleksandra Nowicka.', { wording: "O.N. Jak Ola Nowicka. Wiem, że to tylko inicjały, ale od razu pomyślałam o sobie." }),    V('ola', 'ola', '0:08', '(w tle dzieci krzyczą) Przepraszam, jestem jeszcze w świetlicy. Zobaczyłam to i musiałam wyjść na korytarz.', 'Ola'),

    O('Wiem, co może być na tej kasecie. Festyn, 2018. Nie chcę o tym pisać.'),
    choose('ola', [
      opt('Nie musisz. Jestem tu.', [O('Dziękuję. Muszę to przemyśleć.')], { trust: { ola: 1 } }),
      opt('Może to ktoś inny na O.N.?', [O('W Mglisku jest nas trzy. Ale tylko ja byłam w 2018 na festynie.', { wording: "Może. Znam jeszcze dwie osoby z takimi inicjałami. Ale ten festyn... ja naprawdę mam czego się bać." })])
    ]),
    scene('xOlaMama', [
      pause(4000),
      clock('2027-01-19T22:30'),
      V('ola', 'ola', '0:14', 'Mama przyszła i usiadła na moim łóżku, jak kiedyś przed sprawdzianem. Nic nie mówi. Po prostu siedzi.', 'Ola'),
      choose('ola', [
        opt('Dobrze, że jest obok.', [O('Tak. Chyba zasnę przy niej jak dziecko.')]),
        opt('Powiedziałaś jej o O.N.?', [O('Sama się domyśliła. Ona pamięta ten festyn lepiej niż ja.')])
      ]),
      I('jakby co, mam w serwisie magnetowid. jak ktoś przyniesie kasetę, sprawdzę, czy zegar pokazuje to samo co w klipie')
    ]),
    pause(6000),
    clock('2027-01-19T23:47'),
    ambient('dark'),
    M('czy u ciebie też ktoś dzwonił? u mnie nieznany numer, dwa sygnały i cisza'),
    scene('scNoc', [scare('s4_noc', 'call', { name: 'Nieznany numer', ms: 6000 })]),
    pause(2500),
    M('23:47. dokładnie jak na tym zegarze z klipu'),
    end('c2')
  ];
});

/* ---------- c2 · O.N. ---------- */
Engine.chapter('c2', { num: 2, kicker: 'Sprawa 4 · Rozdział 2', title: 'O.N.', when: 'Środa, 20 stycznia · 10:15', mood: 'tense' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, notify, ambient, scene, scare, dial, callEnd, unlock, nearby, vanish, sys } = D;
  const { M, O, Z, B, I, S, Nt, Gr, W, K, c, V } = KronikaCast(D);
  return [
    clock('2027-01-20T10:15'),
    ambient('calm'),
    title(),
    O('Nie spałam. Dobra, powiem ci. Tylko tobie.'),
    O('Festyn w 2018. Miałam czternaście lat. Pobiłam się z dziewczyną z Bielawy. Złamałam jej nos.'),
    O('Była sprawa w sądzie dla nieletnich. Przeprosiłam ją. Mama przez rok spłacała koszty jej leczenia.'),
    O('Teraz pracuję z dziećmi w świetlicy. Jak to wyjdzie, nikt mnie już nie zatrudni.', { wording: "Teraz przychodzę do świetlicy, a rodzice zostawiają mi dzieci. Boję się, że zobaczą tylko ten klip. Już nie mnie." }),
    choose('ola', [
      opt('Sama opowiedz, co się stało, zanim zrobi to ktoś inny. Pomogę ci napisać post.', [
        O('Sama? W grupie Sylwii?'),
        O('Może. Daj mi dzień. Napiszę i ci pokażę.')
      ], { set: { c_olaFirst: true } }),
      opt('Dowiem się, kto to wrzuca, zanim pojawi się twój klip.', [O('Dobrze. Tylko szybko. Proszę.')], { set: { c_hunt: true } })
    ]),
    pause(3000),
    M('mam numer do pana Zenona od pani Weroniki. 607 412 118'),
    M('ja nie dzwonię. jak mi powie „dzień dobry”, to się rozpłaczę', { wording: "spróbujesz zadzwonić? ja teraz nie dam rady spokojnie zapytać, czy ktoś kręcił tam Olę" }),
    dial({
      goal: 'Zadzwoń do pana Zenona (607 412 118).',
      goalHints: [],
      numbers: {
        '607 412 118': { who: 'zenon', then: [
          c('zenon', 'Gil, słucham.'),
          c('zenon', 'Tak, kasety są u mnie. Tysiąc czterysta z hakiem. Nikomu ich nie dawałem.'),
          c('zenon', 'Ja tego Klipo nawet nie mam. Ktoś mi wczoraj pokazał w sklepie. Wstyd mi było.'),
          c('zenon', 'Przepraszam, pies piszczy. Wnuczka zaraz z nim wyjdzie, a on już piszczy. Do widzenia.'),
          callEnd()
        ] }
      }
    }),
    set('c_zenonCalled'),    pause(2500),
    unlock('chat:zenon'),
    Z('{Szanowny Panie|Szanowna Pani}, przepraszam, że się rozłączyłem. Pies nie lubi, jak rozmawiam przez telefon.'),
    Z('Gdyby {Pan|Pani} czegoś potrzebował{|a}, jestem w domu po 9. Z poważaniem, Z. Gil'),

    pause(3000),
    M('i jak?'),
    choose('maja2', [
      opt('Mówi, że nikomu nie dawał kaset. Brzmiał szczerze.', [M('to kto je ma?')]),
      opt('Wspomniał o wnuczce. Ktoś jeszcze ma dostęp do tych kaset.', [M('wnuczka? nie wiedziałam, że ma wnuczkę')], { set: { c_granddaughter: true } })
    ]),
    scene('xRamowka', [
      pause(2500),
      K('maja mówi, że {dzwoniłeś|dzwoniłaś} do pana zenona. ja bym nie umiał'),
      pause(2000),
      Nt('mam w archiwum ramowke tv dolina z sierpnia 2018. festyn mial isc w sobote, 2 minuty'),
      Nt('a w notatce operatora dopisek recznie: „bójka — nie emitować. Z.G.”'),
      choose('natan', [
        opt('Czyli pan Zenon sam to wtedy wyciął.', [Nt('na to wyglada. 15 lat temu ktos juz zdecydowal, ze tego nie trzeba pokazywac', { wording: "na to wyglada. podpis Z.G. i „nie emitowac”. wtedy tego nie puscili, teraz ktos wyciaga kasete" })], { set: { c_zenonCut: true } }),
        opt('Kto jeszcze ma tę ramówkę?', [Nt('my w archiwum. i ten, kto ma kasety')])
      ])
    ]),
    pause(4000),
    scene('xSnieg', [
      M('wreszcie porządny śnieg. wyszłam z psem sąsiadki, bo poprosiła'),
      pic('maja2', 'maja', 'c_ida_pies', 'kocham to światło po zmroku', { wording: 'kocham to światło po śniegu, wszystko takie jasne' }),
      M('czekaj. ta dziewczyna z psem. kogoś ci przypomina?'),
      choose('maja2', [
        opt('To pies pana Zenona. Ten, który piszczał w telefonie.', [
          M('tak. to on. a ona to wnuczka. Ida. przyjechała na ferie, chodzi z nim po nocach', { wording: "chyba ten sam pies. a dziewczynę kojarzę, to Ida, wnuczka pana Zenona. przyjechała na ferie" }),
          M('pan Zenon mówi o niej „moja dziennikarka”')
        ], { wording: "To chyba pies pana Zenona? Mówił o wnuczce, która z nim wychodzi.", set: { c_idaSeen: true } }),
        opt('Ta kurtka. Ktoś w takiej kurtce stał na peronie przed świętami?', [
          M('nie wiem. nie widziałam, kto był na peronie'),
          pause(3000),
          M('ale ten pies to pies pana Zenona. czyli to jego wnuczka. Ida')
        ], { set: { c_idaSeen: true, c_peronLink: true } }),
        opt('Ktoś wyszedł z psem. Normalny wieczór.', [M('no normalny. tylko u nas nikt normalny nie chodzi o 22 z psem po tej stronie bloku', { wording: "no, może po prostu spacer. tylko ten pies mnie zastanawia. nie chcę teraz robić tropu z każdego, kto wychodzi wieczorem" })], { set: { c_idaLater: true } })
      ])
    ]),
    scene('xKrzyzowki', [
      pause(2000),
      W('Pan Zenon przyszedł do czytelni pożyczyć krzyżówki. Zapytał, czy ludzie naprawdę myślą, że to on. Nie umiałam skłamać.'),
      choose('weronika', [
        opt('Co mu pani powiedziała?', [W('Że niektórzy tak. I że ja nie. Wziął trzy krzyżówki, chociaż zawsze bierze jedną.')]),
        opt('Dobrze, że ma panią.', [W('Ja jego też. Dwadzieścia lat temu kręcił mój ślub. Za darmo, bo „młodym się nie liczy”.')])
      ]),
      say('zuza', 'zuza', 'babcia znalazła pana zenona na kasecie z mojego chrztu. widać go przez sekundę w lustrze. jedyny raz')
    ]),
    give('ev_c_spacer'),
    scene('xIgorPies', [
      pause(2000),
      I('ten pies z twojego zdjęcia. był u mnie w serwisie. dziewczyna przyniosła ładowarkę do naprawy, a on leżał pod ladą'),
      choose('igor', [
        opt('Pamiętasz ją?', [I('młoda. mało mówiła. zapłaciła drobnymi i powiedziała „dziadek mówi, że wszystko da się naprawić”')], { set: { c_igorIda: true } }),
        opt('Psy wszędzie wejdą.', [I('ten akurat grzecznie leżał. lepiej niż niejeden klient')])
      ]),
      I('a w ogóle mam praktykanta z technikum. oskar. czyści stare telefony do sprzedaży szybciej niż ja. trochę za szybko, ale nie narzekam')
    ]),
    scene('xSwietlica', [
      O('Upiekliśmy pierniki. Połowa ma kształt dinozaura, choć foremki były w gwiazdki.', { wording: 'Upiekliśmy pierniki. Foremki były w ludziki i gwiazdki, ale połowa dzieci twierdzi, że ich ludzik to dinozaur.' }),
      pic('ola', 'ola', 'c_pierniki', 'Dowód rzeczowy 🦖'),
      O('Jedna dziewczynka zapytała mnie, czy ja też kiedyś byłam niegrzeczna. Prawie się rozpłakałam przy blasze.'),
      choose('ola', [
        opt('Co jej odpowiedziałaś?', [O('Że tak. I że potem przeprosiłam. Potraktowała to bardzo poważnie i zjadła dinozaura.')], { trust: { ola: 1 } }),
        opt('Dzieci zawsze pytają w najgorszym momencie.', [O('One mają do tego radar.')])
      ])
    ]),
    pause(4000),
    clock('2027-01-20T21:00'),
    set('c_day3'),
    notify({ app: 'browser', title: 'Klipo', text: '@kronika.mglisko · „festyn, 2018. jutro: O.N.”', sound: 'notif', open: { page: 'tt_kronika' } }),
    O('Wrzucili zapowiedź. Sam napis i plac festynowy. Jutro ja.', { wording: 'Wrzucili zapowiedź. Plac festynowy i napis „piątek, 21:00”. To ja.' }),
    iff('flag:c_olaFirst', [O('Piszę ten tekst. Na razie mam dwa zdania i pięć razy je skasowałam.')]),
    scene('xGrupaFestyn', [
      pause(2000),
      Gr('bartek', 'ja tez bylem na tym festynie. 16 lat mialem. pamietam ze ktos krwawil i ze'),
      pause(1500),
      sys('group', 'Bartek usunął wiadomość'),
      Gr('bartek', 'sorry. glupi jestem'),
      Gr('ola', 'Spoko, Bartek. I tak wszyscy pamiętają.'),
      choose('group', [
        opt('Ola, nie jesteś z tym sama.', [Gr('ola', 'Wiem. Dzięki.')], { trust: { ola: 1 } }),
        opt('Nie piszmy o tym tutaj.', [Gr('bartek', 'ok. juz nic nie pisze')])
      ]),
      pause(2000),
      S('Ktoś napisał pod zapowiedzią „O.N. = Ola Nowicka”. Usunęłam po minucie. Sześćdziesiąt osób zdążyło polubić.'),
      choose('sylwia', [
        opt('Proszę zablokować tę osobę.', [S('Zablokowałam. To ciocia jednego z dzieci ze świetlicy. Nie wiem, co jej powiem w sklepie.')]),
        opt('Proszę napisać do Oli prywatnie, że pani jest po jej stronie.', [S('Napisałam. Odpisała serduszkiem.')], { set: { c_sylwiaOla: true } })
      ]),
      pause(3000),
      clock('2027-01-20T22:10'),
      V('ola', 'ola', '0:12', 'Ćwiczę przed lustrem, co jutro powiem rodzicom w świetlicy. Wychodzi mi albo płacz, albo przemówienie na akademię.', 'Ola'),
      choose('ola', [
        opt('Powiedz prawdę, krótko. Resztę zrobią dzieci.', [O('Dzieci powiedzą, że jestem fajna i mam zielony sweter. Może wystarczy.')]),
        opt('Nic nie musisz jutro mówić.', [O('Muszę. Inaczej się uduszę.')])
      ])
    ]),
    pause(6000),
    clock('2027-01-20T23:41'),
    ambient('dark'),
    V('maja2', 'maja', '0:06', '(szeptem) Ktoś stoi na parkingu. Przy twoim bloku. Albo mi się wydaje.', 'Maja'),
    pause(3000),
    scene('xOkno', [
      nearby('c_okno', { device: 'Telefon', img: 'c_blok_noc', note: 'Nieznane urządzenie w pobliżu', flag: 'c_oknoOk', declineFlag: 'c_oknoNo', ev: 'ev_c_okno' }),
      iff('flag:c_oknoOk', [
        unlock('chat:blysk2'),
        B('ładnie świeci'),
        B('odsuń firankę. chcę zobaczyć, czy {sam|sama} oglądasz'),
        choose('blysk2', [
          opt('Zrób zrzut ekranu', [
            B('zrzut. serio?'),
            B('dobra. to jutro będzie dłuższy klip'),
            vanish('blysk2', 'Wiadomości zniknęły. Nowy kontakt cię zablokował(a).')
          ], { shot: true, set: { c_shotBlysk: true } }),
          opt('Czego chcesz?', [
            B('żeby ktoś w końcu zobaczył całe miasto. nie tylko mnie'),
            vanish('blysk2')
          ], { set: { c_blyskTalk: true } })
        ])
      ], [say('maja2', 'maja', 'ktoś odszedł z parkingu. szybko. chyba z psem')])
    ]),
    pause(2500),
    scene('scOkno', [scare('s4_okno', 'glitch')]),
    end('cf')
  ];
});

/* ---------- cf · Festyn (noc z 20 na 21.01) ---------- */
Engine.chapter('cf', { num: 3, kicker: 'Sprawa 4 · Noc', title: 'Festyn', when: 'Środa, 20 stycznia · 23:58', mood: 'dark' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, notify, ambient, scene, scare, callIn, callEnd, unlock, nearby, vanish, typing } = D;
  const { M, O, I, B, W, K, Gr, S, Nt, c, V } = KronikaCast(D);
  return [
    clock('2027-01-20T23:58'),
    ambient('dark'),
    title(),
    O('Nie śpisz? Ja nie mogę.'),
    O('Leżę i liczę, ilu rodziców dzieci ze świetlicy ogląda Klipo. Wyszło mi, że wszyscy.'),
    pause(2000),
    callIn('ola'),
    c('ola', 'Sorry, że dzwonię. Już nie daję rady pisać, ręce mi się trzęsą.'),
    c('ola', 'To był sierpień. Festyn na boisku, grał jakiś zespół z Bielawy. Ona powiedziała coś o mojej mamie. Coś obrzydliwego.'),
    c('ola', 'Popchnęłam ją. Upadła twarzą na ławkę. Pamiętam dźwięk. Do dziś pamiętam ten dźwięk.'),
    c('ola', 'Dobra. Już. Dziękuję, że {odebrałeś|odebrałaś}.'),
    callEnd(),
    scene('xMajaPrysznic', [
      pause(2000),
      V('ola', 'ola', '0:07', 'Przepraszam, że płakałam do słuchawki. Już jestem. Idę umyć twarz zimną wodą.', 'Ola'),
      pause(2000),
      M('ola dzwoniła? do mnie też próbowała, ale byłam pod prysznicem'),
      M('oddzwoniłam. mówi, że pogadała z tobą i jej lżej')
    ]),
    pause(4000),
    clock('2027-01-21T00:09'),
    unlock('chat:blysk2'),
    notify({ app: 'messages', title: 'Błysk', text: 'nowy kontakt wysyła ci wideo. Zniknie po obejrzeniu.', sound: 'notif', open: { chat: 'blysk2' } }),
    say('blysk2', 'blysk2', '', { vid: 'assets/video/v_festyn.mp4', img: 'v_festyn', vanish: true }),
    B('zapowiedź. pełna wersja jutro o 21', { wording: 'zapowiedź. pełna wersja w piątek o 21' }),
    choose('blysk2', [
      opt('Zrób zrzut ekranu', [
        B('znowu zrzut'),
        B('pokaż go komu chcesz. nikt ci nie uwierzy, że to nie ty masz te kasety'),
        vanish('blysk2', 'Wiadomości zniknęły po przeczytaniu.')
      ], { shot: true, set: { c_shotFestyn: true } }),
      opt('Ona miała 14 lat.', [
        B('a ja w listopadzie byłam tylko stażystką. i jakoś nikt się nade mną nie litował'),
        vanish('blysk2')
      ], { set: { c_pleaded: true } })
    ]),
    iff('flag:c_shotFestyn', [
      pause(2000),
      O('Ktoś wrzucił do grupy zrzut z Błysku. Z twoim imieniem w rogu.'),
      O('Ludzie piszą, że to do ciebie najpierw trafiają te klipy. Sylwia usunęła zrzut, ale ja już go widziałam.'),
      O('Wiem, że to nie ty. Ale głupio mi.')
    ]),
    scene('xKubaNoc', [
      pause(2000),
      K('nie śpię. ktoś mi wrzucił tę zapowiedź do prywatnych'),
      K('wiem, jak to działa. jak masz czyjeś nagrania, myślisz, że masz władzę. nie masz', { wording: "cały czas odświeżam, czy już coś wrzucili. po tym, co sam robiłem w grudniu. aż mi wstyd do ciebie pisać" }),
      choose('kuba', [
        opt('Ty to wiesz najlepiej.', [K('no. dlatego mi niedobrze')]),
        opt('Idź spać, Kuba.', [K('nie umiem. zrobię herbatę. mama też nie śpi')])
      ])
    ]),
    scene('xNatanSzablon', [
      pause(2500),
      Nt('nie spie. montuje cos dla siebie, zeby nie myslec. widzialem te zapowiedz'),
      Nt('napisy na dole sa w naszym starym szablonie z gs. tym z jesieni. tylko my go uzywalismy'),
      choose('natan', [
        opt('Kto miał do niego dostęp?', [Nt('pol redakcji. stazysci tez. rano sprawdze, kto mial konto na serwerze')], { set: { c_gsTemplate: true } }),
        opt('Może ktoś go po prostu skopiował.', [Nt('moze. ale to by musial byc ktos, kto wie, gdzie go szukac', { wording: "moze, nie wykluczam. sprawdze dostepy, bo ten plik lezy u nas na serwerze. nie chce znowu zgadywac" })])
      ]),
      pause(2000),
      S('Przepraszam, że piszę w nocy. Ktoś wrzucił do grupy zapowiedź z Błysku. Usunęłam po czterdziestu sekundach.'),
      choose('sylwia', [
        opt('Niech pani idzie spać. Rano też da się usuwać.', [S('Nie zasnę. Ustawiłam budzik co godzinę i sprawdzam.')]),
        opt('Dziękuję, że pani pilnuje.', [S('Ktoś musi. Mąż mówi, że jestem jak nocny stróż. Tylko bez latarki.')])
      ])
    ]),
    pause(3000),
    scene('xKadrFestyn', [
      I('nie śpię, składam laptopa klientce. obejrzałem tę zapowiedź, zanim zniknęła u kogoś w grupie'),
      pic('igor', 'igor', 'c_festyn', 'zrobiłem kadr. co tu widzisz?'),
      choose('igor', [
        opt('Kamera jest wyżej niż ludzie. Ktoś stał na scenie. Operator kablówki.', [
          I('tak. czyli nie nagrał tego nikt z tłumu telefonem. to oficjalna kaseta TV Dolina', { wording: "wysokość i ten sam pasek TV Dolina. pasuje do ujęcia ze sceny, które pokazała weronika" }),
          I('a pełna wersja jest tylko na oryginale. czyli u pana Zenona w pokoju', { wording: "szukałbym pełnej kasety u pana Zenona. nie tylko jego trzeba pytać, jeśli ktoś jeszcze bywa w tym pokoju" })
        ], { set: { c_stageLink: true } }),
        opt('Ta dziewczyna z boku. Chyba trzyma telefon.', [
          I('przybliżyłem. to puszka po napoju, nie telefon'),
          pause(3000),
          I('ale zobacz, skąd jest ujęcie. z góry, ze sceny. to kamera kablówki. oryginał jest u pana Zenona', { wording: "ale kąt pasuje do kamery ze sceny, a pasek jest z TV Dolina. sprawdźmy oryginał u pana Zenona, zamiast zgadywać po puszce" })
        ], { set: { c_stageLink: true, c_canDetour: true } }),
        opt('Zwykły festyn. Taki jak co roku.', [I('no. tylko że nagranie z tego festynu będzie jutro w internecie')], { set: { c_stageLater: true } })
      ]),
      I('dobra. kawa numer cztery. klientka odbiera laptopa o ósmej')
    ]),
    pause(5000),
    clock('2027-01-21T00:12'),
    M('jesteś w domu? światło na twojej klatce mruga od dziesięciu minut'),
    pause(3000),
    scene('xKlatka', [
      nearby('c_klatka', { device: 'Telefon', img: 'c_klatka', note: 'Nieznane urządzenie w pobliżu', flag: 'c_klatkaOk', declineFlag: 'c_klatkaNo' }),
      iff('flag:c_klatkaOk', [
        B('mokre ślady. ktoś tu przed chwilą był'),
        B('spokojnie. to tylko ja i pies'),
        vanish('blysk2', 'Wiadomości zniknęły po przeczytaniu.'),
        M('ktoś stał pod twoimi drzwiami?? zaraz zejdę z Kubą')
      ], [M('ktoś wyszedł z twojej klatki. z psem. poszedł w stronę bloku pana Zenona')])
    ]),
    scene('xSlady', [
      pause(2000),
      M('nagrałam z okna, zanim zeszłam'),
      say('maja2', 'maja', '', { vid: 'assets/video/v_pies_noc.mp4', img: 'v_pies_noc' }),
      M('stanęła i spojrzała w górę. na moje okno albo na twoje'),
      pause(3000),
      pic('maja2', 'maja', 'c_slady', 'zeszliśmy z Kubą. to było na schodach. co o tym myślisz?'),
      choose('maja2', [
        opt('Łapy psa. Ten sam pies, co na zdjęciu ze śniegu.', [M('tak. Kuba mówi, że to kundel po owczarku'), M('pies pana Zenona')], { set: { c_pawLink: true } }),
        opt('Małe buty. To raczej dziewczyna niż dorosły facet.', [M('może 37. Kuba przyłożył swój but. dwa razy większy', { wording: "mały ślad. kuba przyłożył swój but, ale od samego rozmiaru nie poznamy, kto tu był" })], { wording: "Mały ślad buta. Możesz porównać go ze swoim, bez dotykania?", set: { c_smallShoe: true } }),
        opt('Ktoś wrócił z psem do domu. Zwykłe błoto.', [M('o pierwszej w nocy? no może')])
      ]),
      K('stoję na klatce w kapciach. zimno jak w psiarni'),
      K('drzwi do piwnicy były otwarte. zamknąłem kluczem pani z parteru')
    ]),
    pause(3000),
    typing('blysk2', 'blysk2', 4000),
    pause(2500),
    scene('scFestyn', [scare('s4_festyn', 'face', { img: 'c_festyn', caption: 'TV Dolina · 11.08.2018 · 21:12' })]),
    pause(2000),
    M('dobra. zamknij drzwi na dwa zamki. ja nie śpię', { wording: "sprawdź, czy drzwi są zamknięte. nie schodź sam{|a} na klatkę. ja też jeszcze nie zasnę" }),
    scene('xNocDalej', [
      pause(4000),
      clock('2027-01-21T00:41'),
      Gr('bartek', 'kto nie spi'),
      Gr('ola', 'Ja.'),
      Gr('bartek', 'o 21 cala gmina bedzie siedziec przed telefonem jak na skoki', { wording: 'w piatek o 21 cala gmina bedzie siedziec przed telefonem jak na skoki' }),
      Gr('ola', 'A ja o 21 wyłączam telefon i idę do mamy.', { wording: 'A ja w piątek o 21 wyłączam telefon i idę do mamy.' }),
      choose('group', [
        opt('Dobry plan. Ja będę miał{|a} oko na wszystko.', [Gr('ola', 'Dziękuję. Naprawdę.')]),
        opt('Bartek, idź spać.', [Gr('bartek', 'ide. dobranoc wam')])
      ]),
      pause(3000),
      say('zuza', 'zuza', 'nie śpię. babcia chrapie przez ścianę jak traktor'),
      say('zuza', 'zuza', 'ola to ta pani ze świetlicy? moja kuzynka tam chodzi. mówi że to najlepsza pani na świecie'),
      choose('zuza', [
        opt('Niech kuzynka powie to jeszcze raz. Głośno.', [say('zuza', 'zuza', 'powie. ona wszystko mówi głośno')]),
        opt('Idź spać, Zuza.', [say('zuza', 'zuza', 'próbuję. traktor nie pozwala')])
      ]),
      pause(2500),
      W('Nie śpię. Pani Grażyna naprzeciwko też nie, widzę u niej światło w kuchni.'),
      W('Myślę o panu Zenonie. On teraz śpi i niczego nie wie.', { wording: "Myślę o panu Zenonie. Zwykle już o tej porze śpi. Może nawet nie widział, co ludzie dziś pisali." }),
      choose('weronika', [
        opt('Rano do niego zadzwonimy. Razem.', [W('Dobrze. Rano. O tej porze ludzi się nie budzi.')]),
        opt('Może wie więcej, niż pani myśli.', [W('Może. Ale wtedy nie spałby tak spokojnie.', { wording: "Może. Ja też go teraz bronię, a przecież nie wiem, co robił dziś wieczorem. Musimy go zapytać." })])
      ]),
      pause(2500),
      I('laptop złożony. idę spać. ty też idź'),
      O('Mama zasnęła na fotelu. Przykryłam ją kocem. Zwykle jest odwrotnie.'),
      pause(2000),
      M('Kuba poszedł spać. ja siedzę z herbatą przy oknie. parking pusty', { img: 'c_parking_noc' }),
      choose('maja2', [
        opt('Idź spać. Rano pogadamy.', [M('dobra. jeszcze jeden odcinek. żartuję')]),
        opt('Napisz, jak coś zobaczysz.', [M('napiszę. ale chyba nic już nie zobaczę. śnieg zasypał ślady')])
      ]),
      M('dobranoc. tym razem naprawdę')
    ]),
    set('c_festynSeen'),
    end('c3')
  ];
});

/* ---------- c3 · Wogóle ---------- */
Engine.chapter('c3', { num: 4, kicker: 'Sprawa 4 · Rozdział 4', title: 'Wogóle', when: 'Czwartek, 21 stycznia · 9:30', mood: 'tense' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, notify, ambient, scene, scare, callIn, callEnd, unlock, vanish } = D;
  const { M, O, W, S, I, Id, B, K, Nt, Gr, Z, c } = KronikaCast(D);
  return [
    clock('2027-01-21T09:30'),
    ambient('calm'),
    title(),
    S('Ktoś wrzucił do grupy adres pana Zenona. „Tu mieszka operator”. Usunęłam, ale już poszło dalej.'),
    S('Pod blokiem stało rano trzech chłopaków z telefonami.'),
    choose('sylwia', [
      opt('Niech pani przypnie wiadomość, że nie ma dowodów na jego winę. I że za podawanie adresu wyrzuca pani z grupy.', [
        S('Dobrze. Napiszę to swoimi słowami.'),
        S('Nie lubię zakazywać. Ale mam dość.')
      ], { set: { c_zenonDefended: true } }),
      opt('Na razie nic nie przypinajmy. Zobaczymy, co dalej.', [S('Rozumiem. Tylko że potem może już być za późno.')])
    ]),
    scene('xPaczki', [
      M('kupiłam pączki dla pani weroniki. nie wiem czemu. chyba żeby coś zrobić z rękami'),
      choose('maja2', [
        opt('Dobry powód. Z różą?', [M('z różą i jeden z budyniem. dla mnie')]),
        opt('Weź też dla pana Zenona.', [M('wzięłam. zaniosę mu pod drzwi. bez dzwonienia')], { set: { c_majaZenon: true } })
      ])
    ]),
    scene('xGrupaBlok', [
      pause(2000),
      Gr('bartek', 'widzialem tych trzech pod blokiem zenona. jednego znam z silowni. napisalem mu zeby spadal'),
      Gr('ola', 'Dziękuję, Bartek.'),
      Gr('bartek', 'spadli. jeden jeszcze zrobil zdjecie balkonu. debil'),
      Gr('bartek', 'ten z silowni to pawel dudek. ten od mostu. myslalem ze wyjechal. mowi ze teraz „robi w glosach” i dobrze placa'),
      pause(2000),
      O('Dyrektorka świetlicy poprosiła mnie na rozmowę o dwunastej. Nie napisała, po co.'),
      choose('ola', [
        opt('Napisz mi, jak wyjdziesz.', [O('Napiszę. Idę w zielonym swetrze. Dzieci mówią, że przynosi szczęście.')]),
        opt('Może chce cię wesprzeć.', [O('Obyś miał{|a} rację. Mam ściśnięty żołądek.')])
      ])
    ]),
    pause(3000),
    W('Pan Zenon był rano w czytelni. Przyniósł mi zdjęcie, które wnuczka zrobiła mu telefonem.'),
    W('Chciał pokazać, że kasety stoją na półkach, wszystkie podpisane. Że nic nie zginęło.'),
    pic('weronika', 'weronika', 'c_pokoj_kaset', 'Tak wygląda jego pokój.'),
    give('ev_c_pokoj'),
    scene('xZegar', [
      W('Przypomina to {Panu|Pani} coś?'),
      choose('weronika', [
        opt('Magnetowid pokazuje 23:47. Taki zegar był w rogu klipu z boiskiem.', [
          W('Boże. Czyli te klipy są nagrywane w tym pokoju.', { wording: "Ten sam zegar... I to odbicie lampki. Wygląda, jakby ktoś nagrywał tutaj." }),
          W('Ale pan Zenon kładzie się o dziewiątej. Mówił mi to sto razy, bo „telewizja po dziewiątej to samo zło”.')
        ], { set: { c_roomLink: true } }),
        opt('Lampka na biurku. Jej odbicie było na studniówce.', [
          W('Lampka jak lampka, takich jest pełno.'),
          pause(3000),
          I('wrzuć mi to zdjęcie. tak, zegar magnetowidu pokazuje 23:47. jak w klipie z boiskiem. to ten pokój', { wording: "prześlij mi zdjęcie. zegar 23:47 i lampka się zgadzają z klipem. to już mocniejszy trop niż samo „ma kasety”" })
        ], { set: { c_roomLink: true } }),
        opt('Porządek ma. Wszystko podpisane.', [W('Zawsze był pedantem. Kasety ułożone według lat.')], { set: { c_roomLater: true } })
      ])
    ]),
    scene('xCzwartek', [
      pause(2000),
      I('ludzie przynoszą mi dziś magnetowidy. trzy sztuki od rana. chcą sprawdzić, czy na ich kasetach nie ma czegoś złego'),
      pic('igor', 'igor', 'c_magnetowidy', 'mój dzisiejszy stos. każdy z kartką, co w nim nie działa'),
      I('jedna pani przyniosła kasetę „wesele 1997” i zapytała, czy da się wyciąć szwagra'),
      choose('igor', [opt('Da się?', [I('da się. ale powiedziałem, że szwagier jest w każdej klatce, bo tak było')]), opt('Mglisko w pigułce.', [I('no. każdy ma swoje 30 sekund, jak piszą')])]),
      say('zuza', 'zuza', 'babcia nie wierzy że to pan zenon. mówi że on by nikomu nie zrobił wstydu'),
      say('zuza', 'zuza', 'na moim chrzcie podobno wyłączył kamerę jak wujek się przewrócił. „tego nie trzeba”')
    ]),
    pause(4000),
    callIn('zenon'),
    c('zenon', 'Przepraszam, że dzwonię. Pani Weronika dała mi numer.'),
    c('zenon', 'Ludzie piszą, że to ja. Ja nie umiem nawet wrzucić zdjęcia na Kwartał. Wnuczka mi wszystko zakłada.'),
    c('zenon', 'Ida to dobra dziewczyna. Miała w listopadzie kłopoty w gazecie, przez jakieś nagranie. Od tamtej pory mało mówi.'),
    c('zenon', 'Ja już nie wiem, kogo pytać. Do widzenia.'),
    callEnd(),
    scene('xPoRozmowie', [
      pause(2500),
      W('Pan Zenon zostawił u mnie rano parasol. Wróci po niego, jak będzie miał siłę wyjść z domu.'),
      Z('{Szanowny Panie|Szanowna Pani}, przepraszam za ten telefon. Ida mówi, że niepotrzebnie się żalę. Z poważaniem, Z. Gil'),
      pause(2500),
      O('Byłam. Powiedziała, że widziała zapowiedź i że „poczekajmy do piątku”.'),
      O('Poczekajmy. Jakbym miała jakiś wybór.', { wording: "Mam czekać, a jutro znów wejść do sali i udawać, że nic. Nie wiem, jak to zrobić." }),
      choose('ola', [
        opt('To nie jest „nie”. To jest „poczekajmy”.', [O('Wiem. Trzymam się tego jak poręczy.', { wording: "Tak sobie powtarzam. Ale już mam otwartego maila i sprawdzam co pięć minut." })], { wording: "Jeszcze cię nie skreśliła. Wiem, że kiepskie pocieszenie." }),
        opt('Chcesz, żebym z nią porozmawiał{|a}?', [O('Nie. To moja rozmowa. Ale dziękuję.')], { trust: { ola: 1 } })
      ]),
      iff('flag:c_zenonDefended', [S('Przypięłam. Od rana nikt więcej nie podał adresu.')], [S('Ktoś znowu wkleił adres pana Zenona. Usunęłam. Czwarty raz dzisiaj.')])
    ]),
    pause(5000),
    clock('2027-01-21T22:58'),
    ambient('dark'),
    unlock('chat:blysk2'),
    notify({ app: 'messages', title: 'Błysk', text: 'nowy kontakt wysyła ci wideo. Zniknie po obejrzeniu.', sound: 'notif', open: { chat: 'blysk2' } }),
    say('blysk2', 'blysk2', '', { vid: 'assets/video/v_telewizor.mp4', img: 'v_telewizor', vanish: true }),
    B('on śpi. a ja oglądam'),
    B('wogóle nie rozumiesz o co chodzi. nie chodzi o olę. chodzi o całe mglisko'),
    iff('flag:c_shotBlysk', [B('i nie rób zrzutów. raz już zrobił{eś|aś}')]),
    vanish('blysk2', 'Wiadomości zniknęły po przeczytaniu.'),
    give('ev_c_wogole', { silent: true }),
    pause(3000),
    scene('xKto', [
      M('kto pisze „wogóle” razem? moja polonistka by zemdlała', { wording: "„wogóle”. razem. kojarzysz, kto tak pisze?" }),
      choose('maja2', [
        opt('i.k_00. W listopadzie, na Błysku, przyznała się do wycięcia 40 sekund nagrania z mostu. Napisała „wogóle”. To Ida.', [
          M('Ida. wnuczka pana Zenona'),
          M('ona ma klucz do jego pokoju, wychodzi z psem po nocach i wie, gdzie mieszkasz', { wording: "jest u niego na ferie, wychodzi z tym psem. i była pod blokiem. to zaczyna pasować, nie tylko to jedno słowo" }),
          M('i miała kiedyś w telefonie numery wszystkich od mostu')
        ], { set: { c_twist: true } }),
        opt('Pan Zenon. Starsi ludzie piszą z błędami.', [
          M('pan Zenon pisze esemesy z przecinkami i „Szanowna Pani”. widziałam'),
          M('to nie on. to ktoś młody. ktoś kto zna Błysk', { wording: "sam błąd nikogo nie wskazuje. ale porównajmy go z tamtymi wiadomościami z Błysku" }),
          pause(3000),
          M('Ida. jego wnuczka. pracowała w gazecie nad sprawą tego mostu, Natan mi mówił')
        ], { set: { c_twist: true, c_wrongZenon: true } })
      ])
    ]),
    scene('xPoOdkryciu', [
      M('co robimy? mówimy panu Zenonowi?'),
      choose('maja2', [
        opt('Jeszcze nie. Najpierw muszę porozmawiać z Idą.', [M('dobra. ale nie zasnę, dopóki nie dasz znać')]),
        opt('Rano powiemy pani Weronice. Ona go zna najlepiej.', [M('ok. ona będzie wiedziała, jak mu to powiedzieć')], { set: { c_tellWeronika: true } })
      ]),
      pause(2500),
      K('maja mi mówi, że to ida'),
      K('czyli to ona w wigilię pisała do ciebie, że ma więcej plików niż ja'),
      K('robiła to samo co ja. tylko dłużej', { wording: "ja też sobie mówiłem, że tylko wrzucam pliki. a potem ludzie bali się odebrać telefon" }),
      choose('kuba', [
        opt('Ty przestałeś. Ona też jeszcze może.', [K('mogę jej to napisać. jak ktoś, kto wie, jak to jest')], { set: { c_kubaHelps: true } }),
        opt('Nie mieszaj się w to.', [K('ok. ale wiem, co ona teraz czuje', { wording: "ok. nie napiszę. ale nie chcę jutro udawać, że nigdy nic takiego nie robiłem" })])
      ]),
      pause(2500),
      iff('flag:c_gsTemplate', [Nt('sprawdzilem serwer, jak obiecalem. konto stazystki ma dalej dostep do szablonu napisow. ostatnie logowanie: 18 stycznia, 20:47. dzien pierwszego klipu')]),
      Nt('maja pisze, ze to ida. byla u nas na stazu. po listopadzie zniknela i nikt do niej nie zadzwonil. ja tez nie'),
      choose('natan', [
        opt('Możesz zadzwonić teraz.', [Nt('moge. tylko co jej powiem? „sorry, ze zostawilismy cie z tym sama”?'), Nt('chociaz to akurat byloby prawdziwe')]),
        opt('To nie tylko twoja wina.', [Nt('troche moja. to ja wrzucilem te 40 sekund')])
      ])
    ]),
    give('ev_c_wogole'),
    pause(4000),
    scene('scCisza', [scare('s4_cisza', 'call', { name: 'Ida Gil', number: '533 019 274', ms: 6000, listen: 3500 })]),
    pause(2000),
    unlock('chat:ida'),
    Id('przepraszam. nie chciałam dzwonić'),
    Id('jutro o 21 pojawi się klip z olą. już go wgrałam i ustawiłam publikację na 21:00'),
    /* P6 / S4: Ida i Zenon. Wnuczka robi coś za plecami dziadka, nie z nienawiści. */
    scene('xIdaDziadek', [
      pause(2500),
      Id('dziadek myśli że wieczorami siedzę na rozmowach o pracę. online. od stażu w gazecie to nawet się zgadza'),
      Id('te kasety trzymał w szafie po babci. nie wie ile z nich widziało już pół miasta', { wording: 'te kasety trzymał na półkach w pokoju po babci. nie wie ile z nich widziało już pół miasta' }),
      choose('ida', [
        opt('Powiedz mu sama, zanim zobaczy w internecie.', [Id('wiem. jutro. przy śniadaniu. jak pies nie będzie szczekał')], { set: { c_idaTellZenon: true } }),
        opt('Czemu go nie zapytałaś o zgodę?', [Id('bo by powiedział nie. i miałby rację. dlatego nie zapytałam')])
      ])
    ]),
    end('c4')
  ];
});

/* ---------- c4 · 20:58 ---------- */
Engine.chapter('c4', { num: 5, kicker: 'Sprawa 4 · Rozdział 5', title: '20:58', when: 'Piątek, 22 stycznia · 18:20', mood: 'dark' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, title, clock, notify, ambient, scene, scare, dial, callEnd, unlock, run, ending, credits, trust, camera } = D;
  const { M, O, Id, c, Z, W, K, I, Nt, Gr, V, B } = KronikaCast(D);
  return [
    clock('2027-01-22T18:20'),
    ambient('calm'),
    title(),
    scene('xPiatek', [
      M('mama robi pierogi z kapustą, bo „w stresie trzeba jeść”', { img: 'c_pierogi' }),
      M('Kuba zjadł dwanaście i mówi że nie jest zestresowany'),
      choose('maja2', [opt('Zostaw mi pięć.', [M('cztery. Kuba już patrzy')]), opt('Nie mam teraz głowy do pierogów.', [M('wiem. ja też nie. ale zjadłam')])])
    ]),
    iff('flag:c_olaFirst', [
      O('Napisałam. Pokażę ci, zanim wrzucę.'),
      O('„W 2018 na festynie zrobiłam komuś krzywdę. Miałam 14 lat. Przeprosiłam i spłaciliśmy koszty leczenia. Jeśli ktoś to zobaczy na Klipo, wolę, żebyście najpierw usłyszeli to ode mnie.”'),
      choose('ola', [
        opt('Wrzuć. To jest uczciwe.', [O('Wrzucam. Ręce mi się trzęsą.')], { set: { c_olaPosted: true } }),
        opt('Poczekaj jeszcze. Może uda się zatrzymać klip.', [O('Dobrze. Ale tylko do 21.')])
      ])
    ], [O('Jest 18:30. Za dwie i pół godziny wszyscy zobaczą, co zrobiłam.')]),
    scene('xCzekanie', [
      pause(3000),
      Z('{Szanowny Panie|Szanowna Pani}, Ida nie przyszła na obiad. Zostawiłem jej talerz w piekarniku. Gdyby {Pan|Pani} ją widział{|a}, proszę powiedzieć, że pies tęskni.'),
      Z('Pies leży pod drzwiami jej pokoju. Nie chce jeść.'),
      pause(2500),
      W('Siedzę w czytelni i nie umiem nic robić. Zrobiłam sobie trzecią herbatę.'),
      W('Pani z biblioteki powiatowej pyta, czy „jakby co” przyjmiemy kasety TV Dolina. Powiedziałam, że tak.'),
      pause(2500),
      M('pokaż mi coś, co mnie uspokoi. cokolwiek z galerii'),
      camera('maja2', [
        opt('Z galerii: Kuba na górce', [M('xD to mi pomogło bardziej niż melisa'), M('wysyłam mu. niech cierpi')], { img: 'c_gorka', gallery: true }),
        opt('Z galerii: rysunek ze świetlicy Oli', [M('ok teraz płaczę'), M('ona nie może stracić tej pracy')], { img: 'c_rysunek', gallery: true, set: { c_sawDrawing: true } }),
        opt('Z galerii: Ida z psem', [M('to mnie nie uspokaja'), M('ale dobrze, że ją pamiętamy taką. z psem, nie z kamerą', { wording: "to ten sam spacer, przy którym jeszcze myślałam, że może sobie coś wkręcam" })], { img: 'c_ida_pies', gallery: true })
      ])
    ]),
    scene('xPrzed21', [
      clock('2027-01-22T19:35'),
      O('Poszłam do świetlicy po swoje rzeczy. Na wszelki wypadek.'),
      pic('ola', 'ola', 'c_rysunki', 'Nie umiem tego zdjąć z tablicy.'),
      choose('ola', [
        opt('Nie zdejmuj. Wrócisz tam w poniedziałek.', [O('Obyś miał{|a} rację.')], { wording: "Zostaw na razie. Mam nadzieję, że w poniedziałek znowu tam wejdziesz." }),
        opt('Zrób im zdjęcie. Niezależnie od tego, co będzie.', [O('Zrobiłam. To jest tylko dla mnie.')])
      ]),
      pause(2500),
      iff('flag:c_kubaHelps', [
        K('napisałem do idy. że wiem, jak to jest, i że można przestać'),
        K('przeczytała. nie odpisała'),
        choose('kuba', [
          opt('Przeczytała. To już dużo.', [K('może. ja też kiedyś tylko czytałem')]),
          opt('Dzięki, że spróbowałeś.', [K('nie dziękuj. jakoś jestem jej to winny', { wording: "nie wiem, czy to coś dało. ale nie chciałem tylko patrzeć na „wyświetlono”" })])
        ])
      ], [K('nie wiem, czy do niej napisać. chyba nie mam prawa nikogo pouczać')]),
      pause(2500),
      Nt('naczelny obiecal: jak klip wyjdzie, gs nie robi z tego newsa. zadnego linku'),
      Nt('pierwszy raz od listopada mam wrazenie, ze cos robimy dobrze, zanim jest za pozno', { wording: "mam to od niego na mailu. przynajmniej nasza gazeta nie bedzie jej tego podrzucac w wynikach wyszukiwania" }),
      pause(2500),
      clock('2027-01-22T20:15'),
      I('mam otwarte konto kroniki w drugiej karcie. jak je usunie, mogę zapisać to, co mi się wczytało. zapisać?'),
      choose('igor', [
        opt('Nie. Niech zniknie naprawdę.', [I('ok. zamykam kartę')], { set: { c_igorClosed: true } }),
        opt('Zapisz, ale nikomu nie dawaj.', [I('zapisane. folder bez nazwy, na pendrivie w szufladzie. nikt o nim nie wie', { wording: "zapisane na pendrivie. chowam do szuflady, nie wrzucam do chmury. nikomu nie wysyłam" })])
      ]),
      pause(2500),
      clock('2027-01-22T20:31'),
      Gr('bartek', 'pol godziny. wylaczam neta i ide z ojcem odsniezac'),
      Gr('ola', 'Jestem u mamy. Pieczemy szarlotkę, żeby mieć co robić z rękami.'),
      Gr('kuba', 'jestem'),
      choose('group', [
        opt('Jestem z wami. Do 21 i po 21.', [Gr('ola', '❤️')]),
        opt('Bartek, zostaw sobie chociaż SMS-y.', [Gr('bartek', 'ok. ale tylko dla was')])
      ])
    ]),
    // SPRAWA-4 §8: dylemat społeczny — Błysk pozwala ostrzec tylko jedną osobę. Bez kary: zmienia jedno zdanie po 21.
    scene('xJednaOsoba', [
      clock('2027-01-22T20:40'),
      B('dwadzieścia minut. możesz uprzedzić jedną osobę. tylko jedną'),
      B('reszta dowie się razem z miastem'),
      choose('blysk2', [
        opt('Ola. To jej klip.', [O('Wiem. Ale dobrze, że napisałeś{|aś}. Siedzę przy mamie.')], { set: { c_warnedOla: true } }),
        opt('Pan Zenon. Ida jest jego wnuczką.', [Z('Dziękuję. Nie będę spał. Posiedzę pod jej drzwiami z psem.')], { set: { c_warnedZenon: true } }),
        opt('Weronika. Ona zna archiwum.', [W('Dobrze. Mam otwarty katalog kaset. Jak coś wyjdzie, będę wiedziała, z której jest taśmy.')], { set: { c_warnedWera: true } }),
        opt('Nikogo. Nie gram w twoją grę.', [B('to też jest wybór')])
      ])
    ]),
    pause(5000),
    clock('2027-01-22T20:58'),
    ambient('dark'),
    Id('jestem przy telewizorze. dziadek śpi. pies śpi'),
    V('ida', 'ida', '0:09', 'Dziadek chrapie. Telewizor szumi. A pies patrzy na mnie, jakby wiedział.', 'Ida'),
    Id('zadzwoń, jak chcesz. masz dwie minuty'),
    dial({
      goal: 'Zadzwoń do Idy (533 019 274). Zostały dwie minuty.',
      goalHints: [],
      numbers: {
        '533 019 274': { who: 'ida', then: [
          c('ida', 'halo'),
          c('ida', 'nagrywam. nawyk z redakcji. spokojnie, nikomu tego nie dam'),
          c('ida', 'w listopadzie wszyscy pisali, że to ja jestem fejkiem. że przeze mnie przez tydzień wszyscy mieli pana Henryka za mordercę'),
          c('ida', 'a całe miasto ma takie swoje 40 sekund. tylko nikt ich nie wyciął', { wording: "o mnie dalej piszą „ta od wyciętego nagrania”. a pod własnymi filmami serduszka, wspominki. jakby nikt nigdy nic nie zrobił" }),
          choose('call', [
            opt('Ola miała 14 lat i dawno za to przeprosiła. Nie rób jej tego, co zrobiono tobie.', [
              c('ida', '…'),
              c('ida', 'usuwam. konto też'),
              c('ida', 'powiesz ze mną dziadkowi? sama nie dam rady', { wording: "będziesz na telefonie, jak mu powiem? on dalej myśli, że ktoś obcy mu to robi" })
            ], { set: { c_idaStops: true } }),
            opt('Daj mi kopię archiwum. Zajmę się tym sam{|a}.', [
              c('ida', 'serio? ty też?'),
              c('ida', 'dobra. wyślę ci link. konto usuwam. teraz to twój problem')
            ], { set: { c_tookCopy: true } }),
            opt('Rób, co chcesz. Ja już nie mam siły.', [c('ida', 'ok'), c('ida', 'to patrz o 21')], { set: { c_gaveUp: true } })
          ]),
          callEnd()
        ] }
      }
    }),
    run(s => {
      s.vars.s4Ending = G.flag('c_tookCopy') ? 'kopia2' : (G.flag('c_idaStops') && G.flag('c_twist')) ? 'przewiniecie' : 'transmisja';
    }),
    clock('2027-01-22T21:00'),
    iff(s => s.vars.s4Ending === 'transmisja', [
      scene('scTransmisja', [scare('s4_transmisja', 'glitch')]),
      O('Wyszło.'),
      O('Mama trzyma mnie za rękę. Telefon leży ekranem w dół.'),
      iff('flag:c_olaPosted', [O('Pod moim wpisem z rana ludzie piszą „wiemy, dzięki, że napisałaś pierwsza”. Pod klipem jest ciszej, niż myślałam.')]),
      iff('flag:c_warnedOla', [O('Dzięki, że napisałeś{|aś} wcześniej. Zdążyłam powiedzieć mamie sama, zanim zobaczyła to u sąsiadki.')]),
      iff('flag:c_warnedWera', [W('Zapisałam, z której taśmy jest ten fragment. Jak ktoś zapyta, będzie wiadomo, że to stare nagranie, nie nowe.')]),
      iff('flag:c_warnedZenon', [Z('Ida siedzi w kuchni. Nie wyszła. Pies od niej nie odchodzi.')]),
      ending('transmisja')
    ], [
      iff(s => s.vars.s4Ending === 'kopia2', [M('konto zniknęło. 21:00 i nic'), M('skąd wiedział{eś|aś}, że zniknie?'), iff('flag:c_warnedOla', [O('Napisałeś{|aś} mi wcześniej, że coś się szykuje. Teraz piszesz, że nic. To co masz?')]), ending('kopia2')], [
        M('konto zniknęło. 21:00 i nic'),
        O('Nie ma klipu. Nie ma konta. Co się stało?'),
        Z('Ida przyszła do kuchni. Zjadła obiad z piekarnika. Siedzimy. Pies też.', { img: 'c_kuchnia' }),
        iff('flag:c_warnedZenon', [Z('Dobrze, że {Pan|Pani} mi napisał{|a}. Byłem pod drzwiami, kiedy wyszła.')]),
        iff('flag:c_idaTellZenon', [Z('Powiedziała mi wszystko sama, przy śniadaniu. Wolałem od niej niż z internetu.', { wording: 'Powiedziała mi wszystko sama, przy stole. Wolałem od niej niż z internetu.' })]),
        iff('flag:c_warnedOla', [O('Przesiedziałam cały wieczór z telefonem w ręce. Nic. Dzięki, że nie musiałam czekać sama.')]),
        iff('flag:c_warnedWera', [W('Katalog zostawiam otwarty jeszcze na tydzień. Na wszelki wypadek.')]),
        ending('przewiniecie')
      ])
    ]),
    credits()
  ];
});
