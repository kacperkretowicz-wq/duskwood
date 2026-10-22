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
    Z: (t, o) => say('zenon', 'zenon', t, o),
    Id: (t, o) => say('ida', 'ida', t, o),
    B: t => say('blysk2', 'blysk2', t, { vanish: true }),
    c: (who, t) => say('call', who, t),
    V: (chat, who, dur, text, from = '') => say(chat, who, `voice:${dur}|${from}|${text}`)
  };
};

/* ---------- c0 · Studniówka ---------- */
Engine.chapter('c0', { num: 0, kicker: 'Sprawa 4 · Prolog', title: 'Studniówka', when: 'Poniedziałek, 18 stycznia · 20:10', mood: 'calm' }, D => {
  const { say, pic, pause, choose, opt, waitFor, goal, give, unlock, set, iff, end, title, clock, notify, ambient, typing, scene, scare, vanish } = D;
  const { M, O, S, B, V } = KronikaCast(D);
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
    scene('xFerie', [
      pause(2500),
      say('kuba', 'kuba', 'pierwszy zjazd sezonu. nie pytaj'),
      pic('kuba', 'kuba', 'c_gorka', 'maja nagrała jak się wywalam. jak to wrzuci na klipo to się wyprowadzam'),
      choose('kuba', [
        opt('10/10 za styl lądowania.', [say('kuba', 'kuba', 'dzięki. sędziowie z bałwanem dali mi 6')]),
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
          M('o. masz rację. ten sam żółty pasek u dołu, ta sama jakość'),
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
    pause(2500),
    S('Dobry wieczór. Pod tym klipem w mojej grupie jest już czterdzieści komentarzy.'),
    S('Ludzie pytają, kto będzie „jutro”. Proszę, jeśli {Pan|Pani} coś wie, niech {Pan|Pani} da znać. Nie chcę, żeby zrobiła się z tego afera.'),
    scene('xZuza', [
      unlock('chat:zuza'),
      say('zuza', 'zuza', 'hej. widział{eś|aś} tę studniówkę?'),
      say('zuza', 'zuza', 'babcia mówi że ten sam pan z kablówki kręcił mój chrzest. ma tę kasetę do dziś'),
      say('zuza', 'zuza', 'i powiedziała jeszcze „on wszystkich nagrywał, a jego nikt”'),
      choose('zuza', [
        opt('Ciekawe, ile takich kaset leży po domach.', [say('zuza', 'zuza', 'u nas trzy. komunia, chrzest i wesele cioci. nikt nie ma już magnetowidu')]),
        opt('Pozdrów babcię.', [say('zuza', 'zuza', 'pozdrowiła. i kazała ci się ciepło ubrać. nie wiem skąd wie że nie')])
      ])
    ]),
    give('ev_c_klip1', { silent: true }),
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
  const { M, O, I, W, c, V } = KronikaCast(D);
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
    I('a tak serio. widziałem tę studniówkę. dziś o 21 ma być następny klip'),
    I('obejrzałem pierwszy klatka po klatce. chcesz wiedzieć, co znalazłem?'),
    choose('igor', [opt('Pewnie.', []), opt('Mów.', [])]),
    I('w 0:27 na górze ekranu jest odbicie. jakby świeciła lampka na biurku'),
    I('na samym nagraniu z kasety nie powinno być takiego odbicia. chyba że ktoś filmuje telewizor telefonem'),
    set('c_tvFilmed'),
    pause(3000),
    W('Dzień dobry. Pani Maja mówi, że {Pan|Pani} pyta o kronikę.'),
    W('Lepiej zadzwonię. Pisanie mi dziś nie idzie.'),
    pause(2000),
    callIn('weronika'),
    c('weronika', 'Kronikę „TV Dolina” kręcił jeden człowiek. Pan Zenon Gil.'),
    c('weronika', 'Osiemnaście lat z kamerą na ramieniu. Każdy festyn, każde zebranie, każdy pogrzeb.'),
    c('weronika', 'Jak kablówka upadła w 2014, kasety zabrał do domu. Mówił, że „szkoda wyrzucić ludzi”.'),
    c('weronika', 'To porządny człowiek. Nie wierzę, żeby to robił. Ale kasety są u niego. Wszyscy to wiedzą.'),
    callEnd(),
    set('c_zenonNamed'),
    give('ev_c_tv'),
    pause(5000),
    clock('2027-01-19T21:00'),
    set('c_day2'),
    notify({ app: 'browser', title: 'Klipo', text: '@kronika.mglisko · „boisko, 2008”', sound: 'notif', open: { page: 'tt_kronika' } }),
    scene('xBoisko', [
      pic('igor', 'igor', 'c_boisko', 'nowy. boisko za szkołą, 2008. przypomina ci to coś?'),
      choose('igor', [
        opt('Tak jak na nagraniu ze studniówki: u góry znowu widać odbicie lampki.', [
          I('tak. i jeszcze w rogu, przy samochodzie, widać zielone cyferki. 23:47'),
          I('to zegar magnetowidu. ktoś to filmował dzisiaj w nocy, nie w 2008')
        ], { set: { c_clockSeen: true } }),
        opt('Ten samochód. Kalinowski, wójt.', [
          I('tak, wójt. a ten drugi to Wrzos z Wrzos-Bud. jego szwagier'),
          I('ale patrz w róg ekranu. zielone cyferki, 23:47. ktoś to nagrywał niedawno, w nocy')
        ], { set: { c_clockSeen: true, c_wojtSeen: true } }),
        opt('Zwykła budowa.', [I('ok. zapisuję sobie godzinę z rogu, 23:47. może się przyda')], { set: { c_clockLater: true } })
      ])
    ]),
    give('ev_c_boisko'),
    pause(3000),
    O('Pod klipem z boiskiem ktoś napisał „jutro: O.N.”.'),
    O('O.N. To mogę być ja. Aleksandra Nowicka.'),    V('ola', 'ola', '0:08', '(w tle dzieci krzyczą) Przepraszam, jestem jeszcze w świetlicy. Zobaczyłam to i musiałam wyjść na korytarz.', 'Ola'),

    O('Wiem, co może być na tej kasecie. Festyn, 2011. Nie chcę o tym pisać.'),
    choose('ola', [
      opt('Nie musisz. Jestem tu.', [O('Dziękuję. Muszę to przemyśleć.')], { trust: { ola: 1 } }),
      opt('Może to ktoś inny na O.N.?', [O('W Mglisku jest nas trzy. Ale tylko ja byłam w 2011 na festynie.')])
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
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, notify, ambient, scene, scare, dial, callEnd, unlock, nearby, vanish } = D;
  const { M, O, Z, B, c, V } = KronikaCast(D);
  return [
    clock('2027-01-20T10:15'),
    ambient('calm'),
    title(),
    O('Nie spałam. Dobra, powiem ci. Tylko tobie.'),
    O('Festyn w 2011. Miałam siedemnaście lat. Pobiłam się z dziewczyną z Bielawy. Złamałam jej nos.'),
    O('Była sprawa w sądzie dla nieletnich. Przeprosiłam ją. Mama przez rok spłacała koszty jej leczenia.'),
    O('Teraz pracuję z dziećmi w świetlicy. Jak to wyjdzie, nikt mnie już nie zatrudni.'),
    choose('ola', [
      opt('Sama opowiedz, co się stało, zanim zrobi to ktoś inny. Pomogę ci napisać post.', [
        O('Sama? W grupie Sylwii?'),
        O('Może. Daj mi dzień. Napiszę i ci pokażę.')
      ], { set: { c_olaFirst: true } }),
      opt('Dowiem się, kto to wrzuca, zanim pojawi się twój klip.', [O('Dobrze. Tylko szybko. Proszę.')], { set: { c_hunt: true } })
    ]),
    pause(3000),
    M('mam numer do pana Zenona od pani Weroniki. 607 412 118'),
    M('ja nie dzwonię. jak mi powie „dzień dobry”, to się rozpłaczę'),
    dial({
      goal: 'Zadzwoń do pana Zenona (607 412 118).',
      goalHints: [],
      numbers: {
        '607 412 118': { who: 'zenon', then: [
          c('zenon', 'Gil, słucham.'),
          c('zenon', 'Tak, kasety są u mnie. Tysiąc czterysta z hakiem. Nikomu ich nie dawałem.'),
          c('zenon', 'Ja tego Klipo nawet nie mam. Ktoś mi wczoraj pokazał w sklepie. Wstyd mi było.'),
          c('zenon', 'Przepraszam, pies piszczy. Wnuczka z nim wyszła, a on i tak piszczy. Do widzenia.'),
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
    pause(4000),
    scene('xSnieg', [
      M('wreszcie porządny śnieg. wyszłam z psem sąsiadki, bo poprosiła'),
      pic('maja2', 'maja', 'c_ida_pies', 'kocham to światło po zmroku'),
      M('czekaj. przypomina ci to coś? ta dziewczyna z psem'),
      choose('maja2', [
        opt('To pies pana Zenona. Ten, który piszczał w telefonie.', [
          M('tak. to on. a ona to wnuczka. Ida. przyjechała na ferie, chodzi z nim po nocach'),
          M('pan Zenon mówi o niej „moja dziennikarka”')
        ], { set: { c_idaSeen: true } }),
        opt('Ta kurtka. Ktoś w takiej kurtce stał na peronie przed świętami?', [
          M('nie wiem. nie widziałam, kto był na peronie'),
          pause(3000),
          M('ale ten pies to pies pana Zenona. czyli to jego wnuczka. Ida')
        ], { set: { c_idaSeen: true, c_peronLink: true } }),
        opt('Ktoś wyszedł z psem. Normalny wieczór.', [M('no normalny. tylko u nas nikt normalny nie chodzi o 22 z psem po tej stronie bloku')], { set: { c_idaLater: true } })
      ])
    ]),
    give('ev_c_spacer'),
    scene('xSwietlica', [
      O('Upiekliśmy pierniki. Połowa ma kształt dinozaura, choć foremki były w gwiazdki.'),
      O('Jedna dziewczynka zapytała mnie, czy ja też kiedyś byłam niegrzeczna. Prawie się rozpłakałam przy blasze.'),
      choose('ola', [
        opt('Co jej odpowiedziałaś?', [O('Że tak. I że potem przeprosiłam. Przyjęła to bardzo poważnie i zjadła dinozaura.')], { trust: { ola: 1 } }),
        opt('Dzieci zawsze pytają w najgorszym momencie.', [O('One mają do tego radar.')])
      ])
    ]),
    pause(4000),
    clock('2027-01-20T21:00'),
    set('c_day3'),
    notify({ app: 'browser', title: 'Klipo', text: '@kronika.mglisko · „festyn, 2011. jutro: O.N.”', sound: 'notif', open: { page: 'tt_kronika' } }),
    O('Wrzucili zapowiedź. Sam napis i plac festynowy. Jutro ja.'),
    iff('flag:c_olaFirst', [O('Piszę ten tekst. Na razie mam dwa zdania i pięć razy je skasowałam.')]),
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
  const { M, O, I, B, c, V } = KronikaCast(D);
  return [
    clock('2027-01-20T23:58'),
    ambient('dark'),
    title(),
    O('Nie śpisz? Ja nie mogę.'),
    O('Leżę i liczę, ile osób z rodziców w świetlicy ogląda Klipo. Wyszło mi, że wszyscy.'),
    pause(2000),
    callIn('ola'),
    c('ola', 'Sorry, że dzwonię. Pisać już nie umiem, ręce mi się trzęsą.'),
    c('ola', 'To był sierpień. Festyn na boisku, grał jakiś zespół z Bielawy. Ona powiedziała coś o mojej mamie. Coś obrzydliwego.'),
    c('ola', 'Popchnęłam ją. Upadła twarzą na ławkę. Pamiętam dźwięk. Do dziś pamiętam ten dźwięk.'),
    c('ola', 'Dobra. Już. Dziękuję, że {odebrałeś|odebrałaś}.'),
    callEnd(),
    pause(4000),
    clock('2027-01-21T00:09'),
    unlock('chat:blysk2'),
    notify({ app: 'messages', title: 'Błysk', text: 'nowy kontakt wysyła ci wideo. Zniknie po obejrzeniu.', sound: 'notif', open: { chat: 'blysk2' } }),
    say('blysk2', 'blysk2', '', { vid: 'assets/video/v_festyn.mp4', img: 'v_festyn', vanish: true }),
    B('zapowiedź. pełna wersja jutro o 21'),
    choose('blysk2', [
      opt('Zrób zrzut ekranu', [
        B('znowu zrzut'),
        B('pokaż go komu chcesz. nikt ci nie uwierzy, że to nie ty masz te kasety'),
        vanish('blysk2', 'Wiadomości zniknęły po przeczytaniu.')
      ], { shot: true, set: { c_shotFestyn: true } }),
      opt('Ona miała 17 lat.', [
        B('a ja w listopadzie byłam tylko stażystką. i jakoś nikt się nade mną nie litował'),
        vanish('blysk2')
      ], { set: { c_pleaded: true } })
    ]),
    iff('flag:c_shotFestyn', [
      pause(2000),
      O('Ktoś wrzucił do grupy zrzut z Błysku. Z twoim imieniem w rogu.'),
      O('Ludzie piszą, że to ty dostajesz te klipy pierwszy. Sylwia usunęła, ale ja już widziałam.'),
      O('Wiem, że to nie ty. Ale głupio mi.')
    ]),
    pause(3000),
    scene('xKadrFestyn', [
      I('nie śpię, składam laptopa klientce. obejrzałem tę zapowiedź, zanim zniknęła u kogoś w grupie'),
      pic('igor', 'igor', 'c_festyn', 'zrobiłem kadr. przypomina ci to coś?'),
      choose('igor', [
        opt('Kamera jest wyżej niż ludzie. Ktoś stał na scenie. Operator kablówki.', [
          I('tak. czyli to nie nagrał ktoś z tłumu telefonem. to oficjalna kaseta TV Dolina'),
          I('a pełna wersja jest tylko na oryginale. czyli u pana Zenona w pokoju')
        ], { set: { c_stageLink: true } }),
        opt('Ta dziewczyna z boku. Chyba trzyma telefon.', [
          I('przybliżyłem. to puszka po napoju, nie telefon'),
          pause(3000),
          I('ale zobacz, skąd jest ujęcie. z góry, ze sceny. to kamera kablówki. oryginał jest u pana Zenona')
        ], { set: { c_stageLink: true, c_canDetour: true } }),
        opt('Zwykły festyn. Taki jak co roku.', [I('no. tylko że ten jest jutro w internecie')], { set: { c_stageLater: true } })
      ])
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
    pause(3000),
    typing('blysk2', 'blysk2', 4000),
    pause(2500),
    scene('scFestyn', [scare('s4_festyn', 'face', { img: 'c_festyn', caption: 'TV Dolina · 14.08.2011 · 21:12' })]),
    pause(2000),
    M('dobra. zamknij drzwi na dwa zamki. ja nie śpię'),
    set('c_festynSeen'),
    end('c3')
  ];
});

/* ---------- c3 · Wogóle ---------- */
Engine.chapter('c3', { num: 4, kicker: 'Sprawa 4 · Rozdział 4', title: 'Wogóle', when: 'Czwartek, 21 stycznia · 9:30', mood: 'tense' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, notify, ambient, scene, scare, callIn, callEnd, unlock, vanish } = D;
  const { M, O, W, S, I, Id, B, c } = KronikaCast(D);
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
    pause(3000),
    W('Pan Zenon był rano w czytelni. Przyniósł mi zdjęcie, które wnuczka zrobiła mu telefonem.'),
    W('Chciał pokazać, że kasety stoją na półkach, wszystkie podpisane. Że nic nie zginęło.'),
    pic('weronika', 'weronika', 'c_pokoj_kaset', 'Tak wygląda jego pokój.'),
    give('ev_c_pokoj'),
    scene('xZegar', [
      W('Przypomina to {Panu|Pani} coś?'),
      choose('weronika', [
        opt('Magnetowid pokazuje 23:47. Taki zegar był w rogu klipu z boiskiem.', [
          W('Boże. Czyli te klipy są nagrywane w tym pokoju.'),
          W('Ale pan Zenon kładzie się o dziewiątej. Mówił mi to sto razy, bo „telewizja po dziewiątej to samo zło”.')
        ], { set: { c_roomLink: true } }),
        opt('Lampka na biurku. Jej odbicie było na studniówce.', [
          W('Lampka jak lampka, takich jest pełno.'),
          pause(3000),
          I('wrzuć mi to zdjęcie. tak, zegar magnetowidu pokazuje 23:47. jak w klipie z boiskiem. to ten pokój')
        ], { set: { c_roomLink: true } }),
        opt('Porządek ma. Wszystko podpisane.', [W('Zawsze był pedantem. Kasety ułożone według lat.')], { set: { c_roomLater: true } })
      ])
    ]),
    scene('xCzwartek', [
      pause(2000),
      I('ludzie przynoszą mi dziś magnetowidy. trzy sztuki od rana. chcą sprawdzić, czy na ich kasetach nie ma czegoś złego'),
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
      M('kto pisze „wogóle” razem? moja polonistka by zemdlała'),
      choose('maja2', [
        opt('i.k_00. W listopadzie, na Błysku, przyznała się do wycięcia 40 sekund nagrania z mostu. Napisała „wogóle”. To Ida.', [
          M('Ida. wnuczka pana Zenona'),
          M('ona ma klucz do jego pokoju, wychodzi z psem po nocach i wie, gdzie mieszkasz'),
          M('i miała kiedyś w telefonie numery wszystkich od mostu')
        ], { set: { c_twist: true } }),
        opt('Pan Zenon. Starsi ludzie piszą z błędami.', [
          M('pan Zenon pisze esemesy z przecinkami i „Szanowna Pani”. widziałam'),
          M('to nie on. to ktoś młody. ktoś kto zna Błysk'),
          pause(3000),
          M('Ida. jego wnuczka. pracowała w gazecie nad sprawą tego mostu, Natan mi mówił')
        ], { set: { c_twist: true, c_wrongZenon: true } })
      ])
    ]),
    give('ev_c_wogole'),
    pause(4000),
    scene('scCisza', [scare('s4_cisza', 'call', { name: 'Ida Gil', number: '533 019 274', ms: 6000, listen: 3500 })]),
    pause(2000),
    unlock('chat:ida'),
    Id('przepraszam. nie chciałam dzwonić'),
    Id('jutro o 21 pojawi się klip z olą. już go wgrałam i ustawiłam publikację na 21:00'),
    end('c4')
  ];
});

/* ---------- c4 · 20:58 ---------- */
Engine.chapter('c4', { num: 5, kicker: 'Sprawa 4 · Rozdział 5', title: '20:58', when: 'Piątek, 22 stycznia · 18:20', mood: 'dark' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, title, clock, notify, ambient, scene, scare, dial, callEnd, unlock, run, ending, credits, trust } = D;
  const { M, O, Id, c } = KronikaCast(D);
  return [
    clock('2027-01-22T18:20'),
    ambient('calm'),
    title(),
    scene('xPiatek', [
      M('mama robi pierogi z kapustą, bo „w stresie trzeba jeść”'),
      M('Kuba zjadł dwanaście i mówi że nie jest zestresowany'),
      choose('maja2', [opt('Zostaw mi pięć.', [M('cztery. Kuba już patrzy')]), opt('Nie mam teraz głowy do pierogów.', [M('wiem. ja też nie. ale zjadłam')])])
    ]),
    iff('flag:c_olaFirst', [
      O('Napisałam. Pokażę ci, zanim wrzucę.'),
      O('„W 2011 na festynie zrobiłam komuś krzywdę. Miałam 17 lat. Przeprosiłam i spłaciliśmy koszty leczenia. Jeśli ktoś to zobaczy na Klipo, wolę, żebyście najpierw usłyszeli to ode mnie.”'),
      choose('ola', [
        opt('Wrzuć. To jest uczciwe.', [O('Wrzucam. Ręce mi się trzęsą.')], { set: { c_olaPosted: true } }),
        opt('Poczekaj jeszcze. Może uda się zatrzymać klip.', [O('Dobrze. Ale tylko do 21.')])
      ])
    ], [O('Jest 18:30. Za dwie i pół godziny wszyscy zobaczą, co zrobiłam.')]),
    pause(5000),
    clock('2027-01-22T20:58'),
    ambient('dark'),
    Id('jestem przy telewizorze. dziadek śpi. pies śpi'),
    Id('zadzwoń, jak chcesz. masz dwie minuty'),
    dial({
      goal: 'Zadzwoń do Idy (533 019 274). Zostały dwie minuty.',
      goalHints: [],
      numbers: {
        '533 019 274': { who: 'ida', then: [
          c('ida', 'halo'),
          c('ida', 'w listopadzie wszyscy pisali, że to ja jestem fejkiem. że przeze mnie przez tydzień wszyscy mieli pana Henryka za mordercę'),
          c('ida', 'a całe miasto ma takie swoje 40 sekund. tylko nikt ich nie wyciął'),
          choose('call', [
            opt('Ola miała 17 lat i dawno za to przeprosiła. Nie rób jej tego, co zrobiono tobie.', [
              c('ida', '…'),
              c('ida', 'usuwam. konto też'),
              c('ida', 'powiesz ze mną dziadkowi? sama nie dam rady')
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
      ending('transmisja')
    ], [
      iff(s => s.vars.s4Ending === 'kopia2', [M('konto zniknęło. 21:00 i nic'), M('skąd wiedział{eś|aś}, że zniknie?'), ending('kopia2')], [
        M('konto zniknęło. 21:00 i nic'),
        O('Nie ma klipu. Nie ma konta. Co się stało?'),
        ending('przewiniecie')
      ])
    ]),
    credits()
  ];
});
