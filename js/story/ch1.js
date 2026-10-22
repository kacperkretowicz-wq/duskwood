'use strict';
/* ROZDZIAŁ 1 — Chmura */

Engine.chapter('ch1', { num: 1, title: 'Chmura', when: 'Środa, 21 października · noc', mood: 'calm' }, D => {
  const { say, me, sys, pause, choose, opt, show, waitFor, openChat, goal, give, unlock, set, iff, run, fx, typing, end, title, interlude, clock, ambient, sync, trust, scene } = D;
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const O = (t, o) => say('ola', 'ola', t, o);
  const g = (who, t, o) => say('group', who, t, o);
  const sz = (t, o) => say('szklarz', 'szklarz', t, o);
  const members = list => run(() => { G.chat('group').members = list; BUS.emit('chats'); });

  const olaRevealsGajda = [
    O('Jest coś jeszcze. I to jest ważniejsze niż moja kłótnia.'),
    O('Tamtego wieczoru najpierw rozmawiałyśmy przez telefon. Powiedziałam jej: idź z tym na policję.'),
    O('A ona: „Nie do Gajdy. Nie pytaj dlaczego. Jeszcze nie.”'),
    give('ev_not_gajda'),
    O('Myślałam, że się nakręciła. Gajda kiedyś dał jej mandat pod biblioteką, więc uznałam, że znowu o to chodzi.'),
    O('No i teraz siedzę w kuchni, czytam to jeszcze raz i mi niedobrze.'),
    O('Kuba go uwielbia. Jak mu powiesz, nie uwierzy.')
  ];

  return [
    title(),
    K('to jej mail: maja.wrona@nimbus.pl'),
    K('pytania są dwa. o pierwszego psa i o pierwszy aparat'),
    K('wpisałem bandzior i lustrzanka. oba źle 💀'),
    K('bandzior to ten pies którego mamy TERAZ. nie pytaj jak ja studia zdaję'),
    unlock('app:nimbus'),
    goal('Odzyskaj dostęp do konta Nimbus Mai.', [
      'Otwórz aplikację *Nimbus* → „Nie pamiętasz hasła?” i wpisz *maja.wrona@nimbus.pl*.',
      'Ludzie często sami wrzucają odpowiedzi do sieci. Wyszukaj „Maja Wrona” — ma profil na *Kadrze*.',
      'Na Kadrze Mai jest post o jamniczce i post o starym aparacie od dziadka.'
    ]),
    waitFor('solved:nimbus', {
      hints: [
        { after: 70, chat: 'group', who: 'igor', text: 'sprawdźcie jej Kadr. o pierwszym aparacie opowiada każdemu, pies też pewnie tam jest' },
        { after: 160, chat: 'kuba', who: 'kuba', text: 'maja ma na kadrze chyba każde zjedzone śniadanie. to też gdzieś będzie' }
      ]
    }),
    K('udało się??'),
    choose('kuba', [
      opt('Jestem w środku.', []),
      opt('Kluska i Kometa. Mam dostęp.', [K('KLUSKA. no jasne'), K('jamniczka. umarła, jak miałem 12 lat. maja płakała tydzień')], { trust: { kuba: 1 } })
    ]),
    /* Zapowiedź sprawy 3: Kuba widzi, jak działa reset konta. */
    scene('f3reset', [
      K('ej. czyli jak ktoś zna odpowiedzi, to po prostu wchodzi na czyjeś konto i tyle?'),
      choose('kuba', [
        opt('Tak. Dlatego pytania bezpieczeństwa to słabe zabezpieczenie.', [K('dobra. zmienię swoje. u mnie wszystko jest na kadrze 💀')]),
        opt('Skup się. Szukamy Mai.', [K('sorry. tak tylko')])
      ])
    ]),
    g('kuba', '%name% {wszedł|weszła} na nimbusa!!'),
    g('ola', 'Okej. Tylko nic nie usuwaj, błagam. Nawet głupich zdjęć.'),
    g('igor', 'i daty sprawdzaj. ta kopia urywa się 14.10 o 23:58, razem z telefonem'),
    g('bartek', 'gdzie byla tej nocy. to jest jedyne pytanie'),
    goal('Sprawdź w kopii telefonu, gdzie była Maja w noc zniknięcia.', [
      'W Nimbusie otwórz *Lokalizacja* i wybierz *14 października*.',
      'Porównaj ostatnią pozycję telefonu z miejscem, gdzie znaleziono auto — w artykule na Mglisko24.'
    ]),
    waitFor('ev:ev_loc_1410', { hints: [{ after: 80, chat: 'group', who: 'igor', text: 'Maja miała włączoną historię lokalizacji. Jeśli kopia jest pełna, będzie tam cała środa.' }] }),
    g('kuba', 'i co? gdzie była?'),
    show('group', {
      prompt: 'Pokaż, gdzie była Maja',
      accept: [{ ev: ['ev_loc_1410'] }],
      wrongFor: {
        ev_cam1_maja: ['igor', 'to z bramy. mamy ją na jednym zdjęciu, a potrzebujemy trasy telefonu. zobacz historię lokalizacji'],
        ev_dam_news: ['ola', 'Wiemy, gdzie było auto. Pytamy, gdzie była ona.']
      },
      wrong: [['kuba', 'nie rozumiem, co to ma do rzeczy'], ['ola', 'Pytamy, gdzie była tamtej nocy.']]
    }),
    pause(1200),
    g('ola', 'Huta?'),
    g('bartek', 'nie bylo jej na tamie'),
    g('igor', 'czekajcie. 22:58 huta, 23:58 dalej huta. do zalewu to nawet nie jest po drodze'),
    g('kuba', 'to jak jej auto znalazło się na tamie???'),
    g('igor', 'mógł paść albo stracić zasięg w środku. ale to nie tłumaczy auta. mamy pozycję telefonu, nie mai'),
    g('ola', 'Albo ktoś go wyłączył.'),
    typing('group', 'kuba', 3000),
    g('kuba', 'albo ktoś zawiózł jej auto na tamę'),
    g('bartek', 'albo sama pojechala z wylaczonym telefonem'),
    g('ola', 'Bartek.'),
    g('bartek', 'mowie tylko ze nie wiemy'),
    choose('group', [
      opt('Bartek ma rację, nie wiemy. Ale to pierwszy konkret.', [g('bartek', 'dzieki')], { trust: { bartek: 1 } }),
      opt('Ktoś zostawił auto na tamie, żeby to wyglądało na samobójstwo.', [g('kuba', 'dokładnie. maja bała się wody. nie poszłaby nocą na tamę')], { trust: { kuba: 1 } }),
      opt('Co Maja robiła w hucie o jedenastej w nocy?', [g('ola', 'Robiła tam zdjęcia do dyplomu. Ale w dzień. Przynajmniej tak myślałam.')])
    ]),
    g('kuba', 'jutro rano idę z tym z mamą do gajdy'),
    g('igor', 'ej, jeszcze chwila. zobaczmy resztę kopii'),
    g('igor', 'smsy też. pisałem z nią w poniedziałek o filmie. fotograficznym, nie kinie'),
    g('ola', 'Ja ostatni raz pisałam z nią w poniedziałek. Wszystko było normalnie.'),
    g('bartek', 'ja z nia nie gadalem od miesiecy'),
    pause(1500),
    g('igor', 'czekaj. fotopułapki. ustawiałem je mai w hucie. powinny wysyłać zdjęcia na maila'),
    g('kuba', 'serio?? czemu nic nie mówiłeś'),
    g('igor', 'bo mi dopiero teraz kliknęło. sory. od trzech dni naprawiam telefony na autopilocie'),
    goal('Sprawdź zdjęcia z fotopułapek z nocy 14 października.', [
      'Nimbus → Galeria → album *Fotopułapki*.',
      'Na dole każdego zdjęcia jest pasek z datą i godziną. Szukaj 14.10 wieczorem.'
    ]),
    waitFor('ev:ev_cam1_maja', { hints: [{ after: 90, chat: 'group', who: 'igor', text: 'W albumie Fotopułapki są daty w pasku na dole. Szukaj 14.10, około 23.' }] }),
    g('kuba', 'i co?'),
    show('group', { prompt: 'Pokaż zdjęcie z fotopułapki', accept: [{ ev: ['ev_cam1_maja'] }], wrongFor: { ev_cam2_0019: ['igor', 'To z 13-ego, dzień wcześniej. Ważne, ale najpierw — czy kamera złapała ją 14-ego?'], ev_cam1_car: ['igor', 'To już 15-ego. A 14-ego wieczorem?'] }, wrong: [['kuba', 'pokaż z fotopułapki']] }),
    typing('group', 'kuba', 4200),
    g('kuba', 'to ona'),
    g('kuba', 'to jej kurtka. z czołówką na głowie jak jakiś górnik'),
    g('kuba', 'weszła tam sama'),
    g('ola', 'Kuba…'),
    g('ola', '22:57. Minutę przed tym, jak telefon pokazuje hutę.'),
    g('igor', 'powinny łapać każdy ruch w kadrze. jest coś po niej?'),
    goal('Przejrzyj resztę zdjęć z fotopułapek. Kto jeszcze był w hucie?', ['W albumie Fotopułapki są zdjęcia z obu kamer: CAM-01 przy bramie i CAM-02 w hali.', 'Zwróć uwagę na 13.10 o 02:40 i na 15.10 o 01:20.']),
    show('group', {
      prompt: 'Pokaż, co jeszcze nagrały kamery',
      accept: [
        {
          ev: ['ev_cam1_car'], then: [
            g('bartek', '1:20. noc po tym, jak zniknęła'),
            g('igor', 'Światła prosto w obiektyw. Tablicy nie widać.'),
            g('ola', 'Gajda mówił mamie Kuby, że sprawdzili hutę w piątek. W dzień.'),
            g('kuba', 'jest zdjęcie z piątku. 11:12. dwóch policjantów'),
            g('ola', 'To kto przyjechał w czwartek o pierwszej w nocy?'),
            g('igor', 'A druga kamera? Ta w hali?'),
            show('group', { prompt: 'Pokaż zdjęcie z kamery w hali', accept: [{ ev: ['ev_cam2_0019'] }], wrong: [['igor', 'Szukaj CAM-02. Hala A.']] }),
            g('ola', 'A to kto?'),
            g('igor', '13.10, 02:40. Dzień przed jej zniknięciem ktoś w nocy oglądał tę ścianę.'),
            g('igor', 'I świeci latarką prosto w obiektyw. Albo przypadek, albo wiedział, gdzie jest kamera.')
          ]
        },
        {
          ev: ['ev_cam2_0019'], then: [
            g('ola', 'Kto to jest?'),
            g('igor', '13.10, 02:40. Dzień przed jej zniknięciem ktoś w nocy oglądał ścianę, którą fotografowała Maja.'),
            g('igor', 'I świeci latarką prosto w obiektyw. Albo przypadek, albo wiedział, gdzie jest kamera.'),
            g('kuba', 'czyli ktoś wiedział, czego ona szuka'),
            g('bartek', 'a brama? tam tez byla kamera'),
            show('group', { prompt: 'Pokaż zdjęcie spod bramy', accept: [{ ev: ['ev_cam1_car'] }], wrong: [['bartek', 'cos z bramy. cam-01']] }),
            g('bartek', '1:20. noc po tym, jak zniknęła'),
            g('ola', 'Gajda mówił, że sprawdzili hutę w piątek. W dzień.'),
            g('ola', 'To kto przyjechał w czwartek o pierwszej w nocy?')
          ]
        }
      ],
      wrongFor: { ev_cam1_maja: ['kuba', 'to już widzieliśmy'] },
      wrong: [['igor', 'Coś z fotopułapek. Inne godziny, inne dni.']]
    }),
    g('kuba', 'nikt nam nic nie mówił o żadnym aucie'),
    pause(2000),

    /* --- kłamstwo Oli --- */
    goal('Przejrzyj wiadomości Mai. Czy ktoś z grupy mówi nieprawdę?', [
      'Nimbus → *Wiadomości*. Porównaj daty z tym, co mówili Ola i Bartek.',
      'Wątek „Olka 🖤” z 13 października. Dotknij ważnej wiadomości, żeby zapisać ją w Notatkach.'
    ]),
    waitFor(() => G.has('ev_ola_fight') || G.has('ev_ola_sorry'), {
      hints: [{ after: 100, chat: 'kuba', who: 'kuba', text: 'dziwne. ola mówiła, że pisały w poniedziałek normalnie. a we wtorek maja przyszła do domu zapłakana' }]
    }),
    choose('group', [
      opt('✉ Napiszę do Oli prywatnie', [
        unlock('chat:ola'),
        openChat('ola', { goal: 'Otwórz rozmowę z Olą.' }),
        me('ola', 'Ola, możemy pogadać? Tylko my.'),
        O('Coś się stało?'),
        show('ola', { prompt: 'Pokaż Oli, co {znalazłeś|znalazłaś}', accept: [{ ev: ['ev_ola_fight', 'ev_ola_sorry'] }], wrong: [['ola', 'Nie rozumiem. O co chodzi?']] }),
        typing('ola', 'ola', 6000),
        typing('ola', 'ola', 3000),
        O('Dobra. Już trzeci raz to kasuję.'),
        O('Tak, pokłóciłyśmy się. We wtorek. Dzień przed.'),
        O('Ostatnie, co jej napisałam, to że mam dość jej obsesji.'),
        O('A w środę, o 23:31, ona napisała mi „przepraszam”. Ja już spałam. Rano zobaczyłam i pomyślałam: odpiszę po pracy.'),
        O('Nie odpisałam.'),
        choose('ola', [
          opt('To nie twoja wina, Ola.', [O('Wiem, że chcesz dobrze. Tylko ja ciągle widzę tę nieodpisaną wiadomość.'), O('Ale dziękuję.')], { trust: { ola: 2 } }),
          opt('Dlaczego skłamałaś w grupie?', [O('Bo mi wstyd. I bałam się, że Kuba zobaczy „mam dość” i już nic więcej nie przeczyta.')]),
          opt('Kuba musi o tym wiedzieć.', [O('Wiem. Sama mu powiem. Nie ty.')], { trust: { ola: -1 } })
        ]),
        olaRevealsGajda,
        set('olaPrivate')
      ], { silent: true }),
      opt('Ola, w poniedziałek było normalnie? A wtorek?', [
        show('group', { prompt: 'Pokaż wiadomości Oli i Mai', accept: [{ ev: ['ev_ola_fight', 'ev_ola_sorry'] }], wrong: [['ola', 'Nie wiem, o co ci chodzi.']] }),
        typing('group', 'ola', 4500),
        g('ola', 'Grzebiesz w moich wiadomościach?'),
        g('igor', 'to kopia telefonu mai, ale... dobra, zły moment'),
        g('kuba', 'ola. o co chodzi'),
        g('ola', 'Pokłóciłyśmy się. We wtorek. Ostatnie, co jej napisałam, to że mam dość jej obsesji. Zadowoleni?'),
        g('ola', 'W środę w nocy napisała mi „przepraszam”. A ja spałam.'),
        sys('group', 'Ola opuściła grupę.'),
        members(['kuba', 'bartek', 'igor']),
        trust('ola', -2),
        g('kuba', 'świetnie'),
        g('bartek', 'dajcie jej spokoj. kazdy moglby tak zrobic'),
        pause(5000),
        unlock('chat:ola'),
        O('{Mogłeś|Mogłaś} napisać do mnie. Nie przy wszystkich.'),
        O('Ale skoro już grzebiesz, to dokop się do końca.'),
        olaRevealsGajda,
        O('Wracam do grupy. Dla Mai, nie dla ciebie.'),
        sys('group', 'Ola dołączyła do grupy.'),
        members(['kuba', 'ola', 'bartek', 'igor'])
      ])
    ]),
    pause(2500),
    K('ola pisze, żebym jutro nie szedł z tym do gajdy. wiesz, o co chodzi?'),
    choose('kuba', [
      opt('Poczekaj jeden dzień. Najpierw sprawdźmy wszystko sami.', [K('gajda by nam pomógł… ale ok. jeden dzień')], { set: { kubaWaits: true } }),
      opt('Idź. Policja powinna wiedzieć o hucie.', [K('no właśnie. idę rano z mamą')], { set: { kubaToldGajda: true }, inc: { leaks: 1 } }),
      opt('Maja nie ufała Gajdzie. Nie wiem dlaczego, ale to coś znaczy.', [K('gajda był u nas na wigilii. wiesz?'), K('ale… ok. poczekam')], { set: { kubaWaits: true }, trust: { kuba: 1 } })
    ]),

    /* --- plan na jutro --- */
    g('igor', 'dobra. jutro po zamknięciu serwisu jadę do huty. ktoś jedzie ze mną?'),
    g('kuba', 'ja'),
    g('bartek', 'nie idzcie tam'),
    g('kuba', 'czemu?'),
    g('bartek', 'bo to ruina. bo sie pozabijacie. bo nie'),
    g('bartek', 'ja nie ide. mam robote'),
    g('ola', 'Mam nockę. Piszcie, telefon zostawiam obok. I powerbank, bo Kuba ma zawsze 8%.'),
    g('kuba', 'dobranoc %name%. jak coś przyjdzie, mam dźwięk na maksa'),
    pause(2000),
    interlude('Kilka godzin później', 'Mglisko śpi. Prawie wszyscy.', 3600),
    clock('2026-10-22T02:13'),
    ambient('tense'),
    fx('vibrate'),
    sync('maja:cam57', { count: 1, text: 'Nowy plik w folderze Fotopułapki: CAM01_IMG_0057.JPG' }),
    goal('Nimbus właśnie coś zsynchronizował. Sprawdź nowe zdjęcie.', ['Nimbus → Galeria → Fotopułapki → najnowsze zdjęcie (22.10, 02:13).']),
    waitFor('seen:img:c1_0057'),
    give('ev_cam1_0057'),
    pause(2500),
    fx('glitch'),
    sz('nie tylko ty nie spisz'),
    sz('on tez nie'),
    pause(2500),
    end('ch2')
  ];
});
