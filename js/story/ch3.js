'use strict';
/* ROZDZIAŁ 3 — Peleryna */

Engine.chapter('ch3', { num: 3, title: 'Peleryna', when: 'Piątek, 23 października', mood: 'calm' }, D => {
  const { say, pic, me, sys, pause, choose, opt, show, ask, waitFor, openChat, goal, give, evolve, unlock, set, inc, iff, run, fx, typing, end, title, interlude, clock, ambient, sync, notify, callIn, callEnd, trust , scene, scare, unsend } = D;
  const SC = StoryScenes(D);
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const B = (t, o) => say('bartek', 'bartek', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);
  const GJ = (t, o) => say('gajda', 'gajda', t, o);
  const C = (t, o) => say('call', 'gajda', t, o);
  const g = (who, t, o) => say('group', who, t, o);
  const sz = (t, o) => say('szklarz', 'szklarz', t, o);
  const members = list => run(() => { G.chat('group').members = list; BUS.emit('chats'); });

  return [
    clock('2026-10-23T17:30'),
    title(),
    scene('xPiatek', [
      K('zanim zaczniemy. mój kot od rana siedzi w praniu i nie da go wyjąć'),
      pic('kuba', 'kuba', 's1_mem_kot', 'mama mówi że to moja wina bo go rozpieściłem'),
      choose('kuba', [
        opt('Zostaw go. Wygrał.', [K('no wygrał. ręczniki są teraz jego')]),
        opt('Kot ma rację. Ręczniki są ciepłe.', [K('xD babcia mówi dokładnie to samo')])
      ]),
      pause(2500),
      say('group', 'ola', 'voice:0:12|Ola|Sorry za głosówkę, jestem w autobusie. Jadę po pracy do lumpeksu na Kolejowej, szukam kurtki na zimę. Odezwę się, jak dojadę.'),
      pause(5000),
      pic('group', 'ola', 's1_lumpeks', 'Wisiało między kurtkami. Przypomina wam to coś?', { wording: 'Zobaczyłam ten żółty kaptur i aż się zatrzymałam.' }),
      choose('group', [
        opt('Peleryna jak z kliszy. Żółta, z kapturem.', [
          g('ola', 'Też od razu o tym pomyślałam. Zapytałam sprzedawczynię. Przyszło w tym tygodniu w worku z Niemiec.'),
          g('ola', 'Czyli to nie ta. Ale przez chwilę serce mi stanęło.', { wording: 'Nie mamy powodu łączyć jej z Tomkiem. Po prostu od wczoraj wszędzie widzę ten kolor.' }),
          g('kuba', 'na kliszy dziecko ma taką samą. tylko bez paska')
        ], { set: { x_pelerynaLink: true } }),
        opt('Kurtka z fotopułapki?', [
          g('kuba', 'nie no, tamta była ciemna i z napisem'),
          g('ola', 'To zwykła dziecięca peleryna. Ale teraz jak patrzę, to przypomina mi kliszę.')
        ], { set: { x_pelerynaDetour: true } }),
        opt('Zwykła peleryna. Szukaj tej kurtki.', [g('ola', 'Znalazłam. 25 zł i jeszcze ciepła.', { wording: 'Znalazłam. 25 zł. Z kieszeni wyjęłam cudzy bilet autobusowy, więc bonus.' })], { set: { x_pelerynaLater: true } })
      ])
    ]),
    scene('s15', SC.s15),
    scene('xPeleryna', [iff('flag:x_pelerynaLater', [g('ola', 'Czekajcie. Ta peleryna z lumpeksu. Dopiero teraz mi się skojarzyła.')])]),
    /* P2: Bartek dzień po przyznaniu się. Nie ma nowego tropu, jest tylko odkładana rozmowa. */
    scene('xBartek', [
      pause(2000),
      g('bartek', 'bylem rano u starego w garazu'),
      g('bartek', 'nie pytalem. pomoglem mu wymienic olej w passacie i tyle'),
      g('bartek', 'dzis mam trzy auta na podnosniku. moze jutro'),
      choose('group', [
        opt('Nie musisz dziś. Tylko nie odkładaj tego za długo.', [g('bartek', 'wiem')], { trust: { bartek: 1 } }),
        opt('Bartek, to może być ważne dla Mai.', [g('bartek', 'myslisz ze nie wiem'), g('ola', 'Dajcie mu ten dzień. Sama bym nie umiała zapytać ojca o coś takiego.')])
      ])
    ]),
    /* P4: wycofana wiadomość. Treść zna tylko ten, kto miał wtedy otwartą grupę. */
    scene('xWycofana', [
      pause(3000),
      g('bartek', 'stary dzis rano pytal czy ktos z was byl w hucie. skad on to wie', { uid: 'x_bw1' }),
      pause(3500),
      unsend('group', 'x_bw1', { flag: 'x_wycofanaSeen' }),
      pause(1200),
      g('kuba', 'bartek co usunąłeś'),
      g('bartek', 'nic. nie do was bylo'),
      iff('flag:x_wycofanaSeen', [
        choose('group', [
          opt('{Zdążyłem|Zdążyłam} przeczytać. Twój ojciec pytał, czy ktoś z nas był w hucie.', [
            g('bartek', 'no. pytal. nie wiem skad wie'),
            g('ola', 'Może ktoś widział twoje auto pod bramą. To jeszcze nic nie znaczy.'),
            g('bartek', 'pogadam z nim. nie dzis')
          ], { set: { x_wycofanaTold: true } }),
          opt('Nie naciskajmy go.', [g('bartek', 'dzieki')], { trust: { bartek: 1 } })
        ])
      ], [
        choose('group', [
          opt('Bartek, jak to było ważne, napisz jeszcze raz.', [g('bartek', 'nie bylo wazne'), g('ola', 'Jasne. Na pewno.')]),
          opt('Nie naciskajmy go.', [g('bartek', 'dzieki')], { trust: { bartek: 1 } })
        ])
      ])
    ]),
    /* P4: „wyświetlono” to zachowanie, nie dowód. */
    scene('xWyswietlono', [
      g('ola', 'Bartek, wyświetliłeś i cisza. Super.'),
      g('bartek', 'leze pod autem. telefon jest na masce. jak go podnosze to sie samo otwiera'),
      choose('group', [
        opt('„Wyświetlono” znaczy tylko, że otworzył czat. Nie że olewa.', [g('ola', 'Wiem. Po prostu mam za mało snu na cierpliwość.')]),
        opt('Daj mu skończyć to auto, Ola.', [g('ola', 'Dobra. Przepraszam, Bartek.'), g('bartek', 'spoko')])
      ])
    ]),
    g('kuba', 'nie spałem całą noc'),
    g('kuba', 'ciągle widzę tę czołówkę'),
    g('ola', 'Kuba, zjedz coś. Serio.', { wording: 'Kuba, masz jeszcze te bułki w kuchni? Zrób coś z nimi, zanim mama je wyrzuci.' }),
    g('kuba', 'musimy pogadać z kimś, kto pamięta tamtą noc w 97'),
    g('ola', 'Pani Weronika. Siostra Tomka. Maja nagrała z nią rozmowę 11.10 — jest w dyktafonie.'),
    g('bartek', 'ona prowadzi biblioteke. zawsze byla mila'),
    g('kuba', '%name%, napiszesz do niej? ja ją znam od dziecka i nie wiem jak zapytać o to zdjęcie'),
    unlock('chat:weronika'),
    goal('Napisz do Weroniki Lis.', ['Rozmowa z Weroniką Lis jest już w *Wiadomościach*.']),
    openChat('weronika'),
    choose('weronika', [
      opt('Dzień dobry, pani Weroniko. Pomagam szukać Mai Wrony. Czy możemy porozmawiać?', [], { trust: { weronika: 1 } }),
      opt('Dzień dobry. Piszę w sprawie Mai Wrony. I w sprawie Tomka.', []),
      opt('Dzień dobry. Mam zdjęcie z nocy, w której zaginął pani brat.', [], { trust: { weronika: -1 } })
    ]),
    typing('weronika', 'weronika', 5000),
    W('Dzień dobry.'),
    W('Kim {Pan|Pani} jest? Skąd ma {Pan|Pani} mój numer?'),
    choose('weronika', [
      opt('Mam na imię %name%. Pani numer był w telefonie Mai.', []),
      opt('Kuba Wrona poprosił, żebym {napisał|napisała}.', [])
    ]),
    W('Maja była u mnie dwa tygodnie temu. Pytała o Tomka. Od dawna nikt się tym nie interesował.'),
    W('A potem zniknęła. Od tygodnia nie śpię i myślę: czy to przeze mnie? Czy coś jej powiedziałam…', { wording: 'Od tygodnia odtwarzam sobie tę rozmowę. Na końcu pytała, czy może jeszcze przyjść. Powiedziałam, że zawsze.' }),
    choose('weronika', [
      opt('To nie przez panią.', [W('Dziękuję. Chciałabym w to wierzyć.', { wording: 'Dziękuję. Tylko bardzo bym chciała, żeby już mogła przyjść.' })], { wording: 'Jeśli uda nam się coś ustalić, dam pani znać.', trust: { weronika: 1 } }),
      opt('Co jej pani powiedziała?', [W('Opowiedziałam to, co pamiętam. Miałam wtedy dwanaście lat. Dziś nie zawsze wiem, co sama widziałam, a co mi opowiedziano.')])
    ]),
    W('Czego {Pan|Pani} ode mnie potrzebuje?'),
    choose('weronika', [opt('Chcę pani coś pokazać. To może być trudne.', [])]),
    show('weronika', { prompt: 'Pokaż kadr z kliszy', accept: [{ ev: ['ev_frame21'] }], wrong: [['weronika', 'Nie rozumiem, co {Pan|Pani} mi pokazuje.']] }),
    typing('weronika', 'weronika', 8000),
    W('…'),
    W('Przepraszam. Muszę usiąść.'),
    typing('weronika', 'weronika', 6000),
    W('To jest Tomek.'),
    W('Ta peleryna. Mama kupiła ją w Dzierżoniowie na kolonie, na które nie pojechał.'),
    W('Widzi {Pan|Pani} ten różowy punkcik na jego szyi? To tamagotchi. Nie rozstawał się z nim.', { wording: 'I to różowe przy szyi. Nosił tamagotchi na sznurku. Zaraz znajdę swoje zdjęcie, tam widać je lepiej.' }),
    pic('weronika', 'weronika', 'w_tomek', 'To ostatnie zdjęcie, jakie mam. Czternasty czerwca 1997.'),
    give('ev_tomek'),
    W('Gdzie zrobiono to zdjęcie z kliszy?'),
    choose('weronika', [
      opt('W hucie. Maja znalazła stary aparat w szafce.', []),
      opt('W hucie „Jutrzenka”. W noc powodzi.', [])
    ]),
    W('W hucie.'),
    W('Pani Halina miała rację.'),
    W('Dwadzieścia dziewięć lat palę znicze nad rzeką.', { wording: 'A ja co roku chodziłam nad rzekę. Nikt mi nigdy nie powiedział, że sprawdzali ten budynek.' }),
    scene('s16', SC.s16),
    goal('Weronika mówi o tamagotchi Tomka. Czy {widziałeś|widziałaś} coś takiego w hucie?', [
      'Przejrzyj jeszcze raz zdjęcia Mai z odprężarki (8.10).',
      'Przybliż lewy dolny róg zdjęcia „Odprężarka — zamurowany fragment”. W pyle coś leży.'
    ]),
    waitFor('ev:ev_toy', { hints: [{ after: 100, chat: 'kuba', who: 'kuba', text: 'w dyktafonie maja mówi „pod ścianą coś leży, zrobię zdjęcie”. może to?' }] }),
    show('weronika', { prompt: 'Pokaż, co leży pod murem', accept: [{ ev: ['ev_toy'] }], wrong: [['weronika', 'Nie… to nie to.']] }),
    typing('weronika', 'weronika', 7000),
    W('To jego.'),
    W('Różowe, z pękniętym brzegiem. Upuścił je na komunii i płakał cały wieczór.'),
    W('Leży pod tą ścianą, tak?'),
    evolve('ev_toy', { title: 'Tamagotchi Tomka pod murem', desc: 'Pod zamurowanym fragmentem odprężarki leży różowe tamagotchi z pękniętą obudową. Weronika Lis rozpoznała zabawkę brata. *Tomek był przy tym murze.*' }),
    set('weronikaToy'),
    choose('weronika', [
      opt('Tak. Bardzo mi przykro, pani Weroniko.', [W('Dziękuję, że {Pan|Pani} mi to mówi. Lepiej wiedzieć.')], { trust: { weronika: 1 } }),
      opt('Myślę, że on wciąż tam jest. Za tym murem.', [W('…'), W('Tak. Ja też tak myślę.')])
    ]),
    W('Maja nagrywała naszą rozmowę. Powiedziałam jej wtedy imiona. Imiona chłopców, za którymi Tomek chodził tamtego lata.'),
    W('Teraz mi się wszystko plącze. Nie chcę nikogo oskarżać na podstawie pamięci dwunastolatki.', { wording: 'Maja zapisywała nazwiska. Proszę sprawdzić, co jej wtedy powiedziałam. Teraz boję się coś pomylić.' }),
    W('Jeśli to nagranie jest w jej telefonie…'),
    g('kuba', 'i co? pani weronika odpisała?'),
    g('kuba', '%name%??'),
    pause(2000),
    g('igor', 'słuchałem dyktafonu. szumi, ale w Nimbusie jest filtr. spróbuj złapać pasmo głosu'),
    unlock('tool:tuner'),
    goal('Oczyść zagłuszony fragment rozmowy Mai z Weroniką.', [
      'Nimbus → Dyktafon → „Rozmowa z p. Weroniką Lis” → *Oczyść nagranie*.',
      'Przesuń filtr tam, gdzie słupki głosu są najwyższe — około 1500 Hz. Potem zdejmij szum do mniej więcej 70%.'
    ]),
    waitFor('ev:ev_interview', { hints: [{ after: 120, chat: 'group', who: 'igor', text: 'spróbuj okolic 1500 Hz. szum w dół, ale jak zgłoski zaczynają znikać to cofnij suwak' }] }),
    g('kuba', 'słychać coś?'),
    show('group', { prompt: 'Pokaż oczyszczone nagranie', accept: [{ ev: ['ev_interview'] }], wrong: [['kuba', 'chodzi mi o nagranie z panią weroniką']] }),
    typing('group', 'kuba', 5000),
    g('kuba', 'gajda'),
    g('kuba', 'GAJDA był z tymi chłopakami?'),
    g('ola', 'Robert Gajda. Leszek Malicki. Marek Sowa. Darek Kruk.'),
    g('ola', 'Czterech chłopaków z kadru 21.', { wording: 'Mogą być na tym zdjęciu. Nie umiem ich rozpoznać po twarzach.' }),
    typing('group', 'bartek', 6000),
    g('bartek', 'moj stary mial wtedy 17 lat. co z tego'),
    typing('group', 'igor', 7000),
    pause(1500),
    typing('group', 'igor', 3500),
    g('igor', 'mój ojciec też'),
    g('igor', 'muszę wyjść na chwilę'),
    sys('group', 'Igor opuścił grupę.'),
    members(['kuba', 'ola', 'bartek']),
    g('bartek', 'to jakas paranoja. czterech chlopakow pilo piwo w hucie, a wy robicie z nich mordercow'),
    g('ola', 'Nikt nie mówi o mordercach, Bartek.'),
    g('bartek', 'jeszcze nie'),
    sys('group', 'Bartek opuścił grupę.'),
    members(['kuba', 'ola']),
    g('kuba', 'super. zostaliśmy we trójkę', { wording: 'wyszli. obaj. co ja mam teraz zrobić z tą grupą' }),
    choose('group', [
      opt('Dajmy im chwilę. To ich ojcowie.', [g('ola', 'Masz rację.')], { trust: { ola: 1 } }),
      opt('Uciekają, bo coś wiedzą.', [g('kuba', 'albo bo się boją. jak ja')]),
      opt('Kuba, jak się trzymasz?', [g('kuba', 'gajda był na pogrzebie dziadka. przynosił mi lego. trzymał mamę za rękę, jak tata się wyprowadził')], { trust: { kuba: 1 } })
    ]),
    g('kuba', 'a teraz on mówi, że maja skoczyła z tamy', { wording: 'a gajda dalej mówi mamie, że maja skoczyła z tamy' }),
    pause(4000),

    scene('s17', SC.s17),

    /* --- telefon od Gajdy --- */
    callIn('gajda'),
    C('Dobry wieczór. Robert Gajda. Nie przeszkadzam?'),
    choose('call', [opt('Słucham.', []), opt('Trochę przeszkadza.', [C('Będę krótko.')])]),
    C('Rozmawiałem z panią Wroną. Mówi, że ma {Pan|Pani} dostęp do konta Mai w chmurze.'),
    C('Potrzebuję tych plików. To materiał dowodowy. Proszę mi przesłać hasło do konta.', { wording: 'Potrzebuję dostępu do tej kopii. Będzie szybciej, jeśli poda mi {Pan|Pani} hasło. Rodzinie oszczędzimy kolejnych pytań.' }),
    choose('call', [
      opt('Dobrze, prześlę.', [C('Dziękuję. Mądra decyzja.', { wording: 'Dziękuję. Proszę niczego nie zmieniać, zajmę się tym.' })], { set: { leakFiles: true }, inc: { leaks: 2 } }),
      opt('Nie mogę. Rodzina mnie o to nie prosiła.', [C('Rozumiem.'), C('Ale proszę pamiętać, że utrudnianie postępowania to przestępstwo.')]),
      opt('Dlaczego nie poprosi pan o to prokuratury?', [C('…'), C('Prokuratura ma ważniejsze sprawy niż dziewczyna, która…'), C('Przepraszam. Proszę się zastanowić.')], { set: { gajdaSlip: true } }),
      opt('Co pan robił pod hutą wczoraj o północy?', [C('…'), C('Nie wiem, o czym {Pan|Pani} mówi.')], { cond: 'ev:ev_car_igor', set: { gajdaAlert: true }, inc: { leaks: 1 } })
    ]),
    C('Jeszcze jedno.'),
    C('Nie jest {Pan|Pani} stąd. Proszę nie namawiać tych dzieciaków do kolejnej wyprawy. Ich matki będą dzwoniły do mnie, nie do {Pana|Pani}.', { wording: 'Pani Wrona nie śpi, Kuba chce znowu jechać do huty. Gdyby rozmawiali o wyjeździe, proszę mi dać znać. Wolałbym nie tłumaczyć kolejnej matce, że nie dopilnowaliśmy jej dziecka.' }),
    callEnd(),
    give('ev_gajda_call'),
    iff('flag:leakFiles', [
      pause(4000),
      notify({ app: 'nimbus', title: 'Nimbus', text: 'Nowe logowanie do konta maja.wrona@nimbus.pl · Windows · Mglisko', sound: 'notif' }),
      pause(3000),
      notify({ app: 'nimbus', title: 'Nimbus', text: 'Usunięto 12 plików z folderu Fotopułapki.', sound: 'notif' }),
      set('camsDeleted'),
      g('kuba', 'czekaj. coś się dzieje z nimbusem mai?'),
      g('ola', 'Ktoś się zalogował i skasował zdjęcia z fotopułapek.'),
      g('ola', '%name%… komu {dałeś|dałaś} hasło?'),
      choose('group', [
        opt('Gajdzie. Prosił o materiał dowodowy.', [g('kuba', 'gajdzie…'), g('ola', 'Miał je zabezpieczyć. Dlaczego je kasuje?')], { trust: { ola: -1 } }),
        opt('Nikomu.', [g('ola', 'Jasne.')], { trust: { ola: -2 } })
      ])
    ], [
      K('gajda do ciebie dzwonił? mama mówi, że wypytywał o ciebie'),
      choose('kuba', [
        opt('Tak. Chciał hasła do chmury Mai. Nie {dałem|dałam}.', [K('czemu mu nie {dałeś|dałaś}?'), K('…nieważne. wiem czemu')]),
        opt('Tak. Był… dziwny.', [K('dziwny jak?'), K('dobra. nie mów. nie chcę wiedzieć')])
      ])
    ]),
    pause(3000),

    /* --- tablica rejestracyjna --- */
    g('kuba', 'ten samochód z wczoraj. igor zrobił zdjęcie, ale widać tylko końcówkę tablicy'),
    iff('flag:camsDeleted', [
      g('ola', 'Zdjęcia z fotopułapek zniknęły. Zostało nam tylko zdjęcie Igora: „…19”.')
    ], [
      goal('Ustal numer samochodu spod huty.', [
        'Fotopułapka sfotografowała odjeżdżające auto 15.10 o 02:05. Zdjęcie jest prawie czarne — rozjaśnij je w *Ciemni*.',
        'Połącz dwa fragmenty tablicy: z fotopułapki i ze zdjęcia Igora.'
      ]),
      waitFor('ev:ev_plate_cam', { hints: [{ after: 120, chat: 'group', who: 'kuba', text: 'w fotopułapkach jest zdjęcie z 15.10, 02:05. prawie czarne. da się je jakoś rozjaśnić?' }] }),
      g('kuba', 'masz cały numer?'),
      ask('group', {
        placeholder: 'Numer tablicy',
        answers: [{ match: ['DDZ6K19', 'DDZ 6K19', 'ddz-6k19'] }],
        wrong: [['kuba', 'nie pasuje do obu zdjęć…'], ['ola', 'Fotopułapka: DDZ 6K1… Igor: …19. Złóż to w całość.']]
      }),
      give('ev_plate'),
      g('kuba', 'DDZ 6K19. czyje to?')
    ]),
    /* Podział rozdziału 3 (v6): przerwa po złożeniu tablicy DDZ 6K19, przed ustalaniem właściciela. */
    scene('xPrzerwaTablica', [interlude('Wieczór', 'Numer auta jest w notatkach. Właściciela jeszcze nikt nie zna.', 3000, { rest: 's1_plate' })]),
    scene('s18', SC.s18),
    g('ola', 'Bartek może sprawdzić w warsztacie. Mają zeszyt napraw, pół gminy do nich jeździ.', { wording: 'Pół gminy jeździ do Sowów. Mają zeszyt napraw z numerami.' }),
    g('kuba', 'bartek wyszedł z grupy i nie odbiera'),
    unlock('chat:bartek'),
    goal('Poproś Bartka o pomoc w ustaleniu właściciela auta.', ['Napisz do Bartka na *Gadce*.']),
    openChat('bartek'),
    choose('bartek', [
      opt('Bartek, potrzebuję twojej pomocy. Chodzi o samochód spod huty.', [], { trust: { bartek: 1 } }),
      opt('Ktoś jeździ pod hutę ciemnym autem. Ty znasz wszystkie auta w gminie.', [])
    ]),
    iff('var:trust_bartek>=0', [B('jaki numer')], [
      B('teraz to jestem potrzebny'),
      B('mowilem wam zebyscie tam nie lazili'),
      choose('bartek', [
        opt('Wiem. Ale Maja może jeszcze żyć.', [B('…'), B('jaki numer')], { trust: { bartek: 1 } }),
        opt('Twój ojciec był w tej hucie. Może czas się dowiedzieć, co tam robił.', [B('spadaj'), pause(5000), B('jaki numer')])
      ])
    ]),
    show('bartek', {
      prompt: 'Pokaż numer albo zdjęcie auta',
      accept: [
        { ev: ['ev_plate'], then: [B('ddz 6k19. sprawdze w zeszycie')] },
        { ev: ['ev_car_igor', 'ev_plate_cam'], then: [B('tylko koncowka? ciemna magna, tak?'), B('sprawdze w zeszycie')] }
      ],
      wrong: [['bartek', 'potrzebuje numeru albo zdjecia auta']]
    }),
    typing('bartek', 'bartek', 8000),
    pic('bartek', 'bartek', 'b_ledger', 'magna gajdy'),
    give('ev_owner'),
    B('byl u nas 16.10. mycie podwozia i dywanikow. cale w blocie'),
    B('stary go obslugiwal. mowil potem ze gajda byl dziwny. dal 200 zl napiwku za mycie'),
    B('on nigdy nie daje napiwkow', { wording: 'mi kazal kiedys doliczyc do faktury plyn za 8 zl, bo brakowalo w bagazniku. a tu zostawil dwie stowy' }),
    typing('bartek', 'bartek', 4000),
    B('sorry ze wyszedlem. musialem pogadac ze starym'),
    B('nie chce gadac. zamknal sie w garazu i siedzi'),
    B('wracam do grupy'),
    sys('group', 'Bartek dołączył do grupy.'),
    members(['kuba', 'ola', 'bartek']),
    g('bartek', 'auto pod huta to magna gajdy. DDZ 6K19. mam to w zeszycie'),
    typing('group', 'kuba', 5000),
    g('kuba', 'może sprawdzał hutę. jest policjantem'),
    g('ola', 'O pierwszej w nocy, dzień po jej zniknięciu? Zanim ktokolwiek wiedział, że zaginęła?'),
    typing('group', 'kuba', 6000),
    g('kuba', 'nie wiem. kurwa, naprawdę już nie wiem'),
    pause(3000),

    /* P4: relacja → screen → reupload → komentarze → reakcja bliskich. Usunięcie oryginału nie usuwa kopii. */
    scene('xReupload', [
      g('ola', 'Ktoś zrobił screena ostatniej relacji Mai z Kadru i wrzucił na „Mglisko bez cenzury”. Z podpisem „pewnie uciekła z chłopakiem”.'),
      g('ola', 'Pod spodem sześćdziesiąt komentarzy.'),
      g('kuba', 'mama to widziała. siedzi w kuchni i czyta wszystkie po kolei'),
      choose('group', [
        opt('Zgłośmy post. Ale screen już krąży, samo usunięcie go nie zatrzyma.', [
          g('ola', 'Zgłosiłam. Admin odpisał, że „to było publiczne”.'),
          g('kuba', 'mama sama do niego napisała. usunął po godzinie'),
          g('kuba', 'ktoś zdążył wrzucić na grupę osiedla')
        ], { set: { x_reuploadReported: true } }),
        opt('Kuba, nie szukaj teraz autora. Posiedź z mamą.', [
          g('kuba', 'dobra. siedzę'),
          g('kuba', 'zrobiła screeny komentarzy. mówi że „żeby pamiętać kto”')
        ], { trust: { kuba: 1 } })
      ])
    ]),
    /* Wyjaśnienie otwarcia: jednorazowy film z prologu to prawdziwa relacja Mai. */
    scene('xSnapEcho', [
      iff('flag:sawSnap', [
        g('kuba', 'ten film z czołówką, co krążył po błysku jako „ostatnia relacja”. to naprawdę jej relacja z kadru. 14.10, 22:56, tylko dla bliskich. ktoś nagrał ją ekranem i puścił dalej'),
        g('ola', 'Igor pisze mi na priv: to ścieżka wzdłuż ściany walcowni, 30 metrów od bramy. Odwróciła się, bo trzasnęła blacha na bramie, wiatr. Minutę później CAM-01 zrobiła jej zdjęcie, 22:57.'),
        g('ola', 'A ta „postać” na końcu ścieżki to stara kufajka z kapturem na słupku od siatki. Wisi tam od lat, widział ją, jak wieszał kamery. W dzień wygląda śmiesznie.')
      ])
    ]),
    /* P4: prośby o wiadomość i prywatny profil. Zachowanie ludzi, nie automatyczny dowód. */
    scene('xProsby', [
      pause(3000),
      g('ola', 'Weszłam przy okazji w prośby o wiadomość na Kadrze. Nigdy tam nie zaglądam.'),
      g('ola', 'Leży wiadomość z 15.10 od konta bez zdjęcia: „wiesz gdzie jest maja?”. Profil prywatny, zero postów.'),
      choose('group', [
        opt('Nie odpisuj jeszcze. Zrób screena z datą i nazwą konta.', [
          g('ola', 'Zrobione. „m.k.2009”. Nic mi to nie mówi.'),
          g('kuba', 'prywatne konto bez postów to pół mojej klasy. ktoś też mógł jej szukać')
        ], { set: { x_prosbaSaved: true } }),
        opt('Odpisz i zapytaj, kim jest.', [
          g('ola', 'Napisałam. Jedna szara kreska.'),
          g('kuba', 'może nie zagląda. ja do próśb też nie zaglądam od roku')
        ])
      ])
    ]),
    scene('s19', SC.s19),
    /* P2: ostatni autobus. Zwykły powrót Oli, bez tropu. */
    scene('xAutobus', [
      pause(3000),
      g('ola', 'Uciekł mi ostatni autobus. Kierowca widział, że biegnę, i i tak ruszył.'),
      g('ola', 'Idę pieszo. Mapa mówi 28 minut. Mapa kłamie.'),
      choose('group', [
        opt('Mam do ciebie zadzwonić, żebyś nie szła sama?', [g('ola', 'Nie trzeba. Mam słuchawki i podcast o grzybach. Napiszę, jak dojdę.')], { trust: { ola: 1 } }),
        opt('Kuba, nie podjedziesz po nią?', [g('kuba', 'mama ma auto, a ja nie mam prawka jeszcze. sorry'), g('ola', 'Spokojnie. Do tego czasu będę w połowie drogi. Idę.')])
      ]),
      pause(6000),
      g('ola', 'Jestem w domu. Nogi mi odpadają.')
    ]),

    /* --- noc: telefon Mai ożywa --- */
    interlude('Noc', 'Nikt w Mglisku nie śpi spokojnie.', 3400, { rest: 's1_sync' }),
    clock('2026-10-24T03:05'),
    ambient('dark'),
    set('majaOnline'),
    notify({ app: 'nimbus', title: 'Nimbus', text: 'Urządzenie „Telefon Mai” jest online.', sound: 'notif' }),
    pause(1800),
    sync('maja:sync1', { count: 6, text: 'Zsynchronizowano zaległe pliki (6) z urządzenia „Telefon Mai”. W tym notatkę z historią wersji.' }),
    fx('vibrate'),
    K('MAMA DOSTAŁA SMS OD MAI'),
    K('TERAZ'),
    K('„Mamo, nic mi nie jest. Potrzebuję czasu. Nie szukajcie mnie. Pozdrów Kluskę.”'),
    K('ona żyje'),
    K('ej'),
    K('ona żyje???'),
    pause(1500),
    /* P5 / G1: krótki powrót telefonu do sieci. Gajda ma telefon Mai i sprawdza ostatni numer, pod który dzwoniła. */
    scene('scMajaNumer', [
      scare('s1_maja_numer', 'call', { who: 'maja', name: 'Maja Wrona', number: '+48 731 402 118', ms: 5000, listen: 2600, onAccept: 's1_pickedMaja' }),
      iff('flag:s1_pickedMaja', [
        K('czekaj. dzwoniła do ciebie?? teraz?'),
        K('co było słychać'),
        choose('kuba', [
          opt('Nic. Jakby ktoś przesuwał telefon po stole.', [K('to nie ona. ona by coś powiedziała. cokolwiek')]),
          opt('Ktoś oddychał i się rozłączył.', [K('nie mów tego mamie. błagam')])
        ])
      ], [
        K('masz coś od jej numeru? mama widzi że był online'),
        choose('kuba', [
          opt('Nieodebrane połączenie. Kilka sekund.', [K('kurwa'), K('ktoś ma jej telefon. ona by napisała, nie dzwoniła o trzeciej')]),
          opt('Nie {zdążyłem|zdążyłam} odebrać. Dzwonił kilka sekund.', [K('ona nigdy nie dzwoni o tej porze. nigdy')])
        ])
      ])
    ]),
    unlock('maja:find'),
    set('majaOnline', false),
    notify({ app: 'nimbus', title: 'Nimbus', text: 'Urządzenie „Telefon Mai” jest offline.', sound: 'notif' }),
    choose('kuba', [
      opt('Kuba, poczekaj. Kluska nie żyje od 2019.', [K('wiem'), K('wiem. właśnie dlatego mi ręce latają')], { trust: { kuba: 1 } }),
      opt('Żyje! To najważniejsze.', [K('tak tylko'), K('czekaj')]),
      opt('To nie brzmi jak ona.', [K('nie brzmi')])
    ]),
    scene('xRanoSync', [iff('flag:rano_s1_sync', [K('i nie przepraszaj, że czytasz dopiero rano. ja bym też spał, gdyby nie mama')])]),
    K('kluska nie żyje od 7 lat'),
    K('i maja nigdy nie pisze „mamo”. zawsze „mamuś”. zawsze'),
    K('to nie ona to pisała. albo ktoś jej kazał'),
    K('może dała nam znać specjalnie. ja muszę tak myśleć, rozumiesz?', { wording: 'może napisała o klusce specjalnie. tak żebyśmy wiedzieli. nie wiem. czytam to w kółko' }),
    goal('Telefon Mai był przez chwilę online. Sprawdź, co się zsynchronizowało.', [
      'Nimbus → Galeria → Aparat. Są nowe zdjęcia z 14.10, z nocy zniknięcia.',
      'Nimbus → Wiadomości → „Mamuś 💛”. Dotknij nowego SMS-a, żeby zapisać go w Notatkach.'
    ]),
    waitFor('ev:ev_sync_wall', { hints: [{ after: 90, chat: 'kuba', who: 'kuba', text: 'nimbus coś ściągnął? sprawdź galerię mai' }] }),
    g('kuba', 'nimbus coś ściągnął?'),
    show('group', { prompt: 'Pokaż zdjęcie Mai z 23:44', accept: [{ ev: ['ev_sync_wall'] }], wrong: [['kuba', 'coś nowego z jej telefonu?']] }),
    g('ola', 'Wybiła dziurę w murze.'),
    g('bartek', 'tam w srodku. to zolte'),
    g('ola', 'Peleryna.'),
    g('kuba', 'tomek'),
    pause(2000),
    /* P4: data pliku a czas powiadomienia. Synchronizacja nie dowodzi, kiedy zrobiono zdjęcie. */
    scene('xDataPliku', [
      g('ola', 'Igor mi pisze, zanim ktoś się nakręci: to przyszło o 3:05, ale zdjęcie jest z 14.10. Nimbus dosyła zaległe pliki, jak telefon złapie zasięg.'),
      g('kuba', 'czyli to nie jest z dzisiaj'),
      choose('group', [
        opt('Data w pliku: 14.10, 23:44. Dziś telefon tylko złapał sieć.', [g('ola', 'Igor: „dokładnie. powiadomienie mówi, kiedy doszło, a nie kiedy ktoś nacisnął spust”.')]),
        opt('Ale SMS do mamy jest z dzisiaj.', [g('ola', 'Igor mówi: SMS tak, zdjęcia nie. Dwie różne rzeczy.'), g('ola', 'Czyli ktoś miał dziś jej telefon w ręku. To akurat jest pewne.')])
      ])
    ]),
    /* P4: anonimowy materiał z kopii karty CAM-01. Prawdziwy, ale z innej nocy (data w pliku). Igor wrzuca go od razu do grupy, więc trop nie zależy od otwarcia wygasającego linku. */
    scene('xAnonim', [
      g('ola', 'Igor przysłał mi to na priv. Ktoś wrzucił na Klipo z pustego konta, plik MATERIAŁ_ROBOCZY_01. Link wygasa za 24 h, więc ściągnął.'),
      g('ola', '', { vid: 'assets/video/v_anonim.mp4', img: 'v_anonim' }),
      g('bartek', 'to brama huty. ta sama kamera co u mai'),
      choose('group', [
        opt('Na dole: 15.10, 01:47. Zdjęcie z kurtką jest z 22.10, 02:13. To inna noc.', [set('x_anonimData'), g('kuba', 'no właśnie. ktoś chce, żebyśmy to wzięli za tamtą noc'), g('ola', 'Albo chce pokazać, że ktoś tam chodził już tydzień wcześniej. Jedno i drugie coś znaczy.')]),
        opt('To ten sam człowiek co na zdjęciu z kurtką.', [g('ola', 'Nie wiem. Spójrz na datę na dole: 15.10. Kurtka była 22.10.'), g('kuba', 'czyli tydzień wcześniej ktoś już tam łaził')])
      ]),
      g('kuba', 'skąd ktoś to ma? kartę z fotopułapki zabrała policja'),
      g('ola', 'Igor uważa, że ktoś ją skopiował, zanim zabrali. I chce, żebyśmy wiedzieli, że ma kopię.')
    ]),
    g('kuba', 'jest coś jeszcze?'),
    show('group', { prompt: 'Pokaż zdjęcie z 23:53', accept: [{ ev: ['ev_sync_door', 'ev_sms_kluska'] }], wrong: [['kuba', 'jeszcze coś z tej nocy?']] }),
    iff('ev:ev_sync_door', [
      g('kuba', 'ktoś stoi w drzwiach'),
      g('bartek', '23:53. piec minut przed tym jak jej telefon zamilkl'),
      g('ola', 'Ma coś jasnego na ramieniu. Naszywkę?')
    ]),
    g('ola', 'Jeśli ktoś ją trzyma, mógł dać jej telefon tylko na ten SMS. Albo sam go napisać. Musimy ją znaleźć.'),
    g('bartek', 'albo kazal jej odblokowac. telefon na odcisk palca'),
    g('kuba', 'jeśli to ona pisała, to była przy nim. o 3:05. musiała gdzieś być'),
    g('ola', 'Igor mówił, że Nimbus zapisuje lokalizację. Mamy ją?'),
    pause(2500),
    fx('glitch'),
    sz('teraz wiesz, ze zyje', { wording: 'ten sms niczego nie kończy' }),
    sz('on tez juz wie, ze wy wiecie', { wording: 'nie dajcie sobie wmówić, że sama zniknęła' }),
    pause(2500),
    end('ch4')
  ];
});
