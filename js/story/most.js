'use strict';
/* SPRAWA 2 „MOST” — prolog „Teczka” i rozdział 1 „Trzy publikacje” (Akt I, sesje 1–3).
   Plan: docs/SPRAWA-2-PLAN.md. Startuje z zapisu po Świcie lub Odłamkach (Seasons.startNext). */

Engine.chapter('m0', { num: 0, kicker: 'Sprawa 2 · Prolog', title: 'Teczka', when: 'Piątek, 20 listopada · 19:30', mood: 'calm' }, D => {
  const { say, pic, pause, choose, opt, waitFor, goal, give, unlock, set, iff, rename, end, title, clock, dial, callEnd, typing, scene, camera, sys } = D;
  const M = (t, o) => say('maja2', 'maja', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);
  const Ma = (t, o) => say('marta', 'marta', t, o);
  const c = (who, t) => say('call', who, t);
  const V = (chat, who, dur, text, from = '') => say(chat, who, `voice:${dur}|${from}|${text}`);

  return [
    clock('2026-11-20T19:24'),
    title(),
    set('m_case'),
    iff('flag:m_lateRescue', [
      M('hej. to ja'),
      M('nie odpisałam ci wcześniej. nie umiałam. lekarka mówi, że to normalne, że nie umiem'),
      M('dziękuję. za rzeczkę. kuba mi pokazał, co {pisales|pisalas} z niną. więcej nie dam rady o tym teraz')
    ], [M('hej. nie śpisz?')]),
    M('siedzę u pani Weroniki. ona spisuje, co jest w pudle pana Adama, ja robię zdjęcia, bo to akurat umiem'),
    M('i trochę dlatego, że w domu mama co pięć minut pyta, czy chcę herbaty'),
    scene('xKot', [
      pic('maja2', 'maja', 'm_kot_wycinki', 'poznaj Panią Ziutę. kotka pani Weroniki. uznała, że wycinki o powodzi to jej łóżko'),
      choose('maja2', [
        opt('Pani Ziuta ma większy porządek w papierach niż gmina.', [M('xD przekażę. kotka i tak ma to gdzieś')]),
        opt('Nie budźcie jej. Pilnuje dowodów.', [M('pilnuje. jak sięgnęłam po wycinek, dostałam łapą. bez pazurów, ale jednak')])
      ]),
      M('dobra, wyciągnęłam spod niej resztę wycinków. trochę pachną kotem')
    ]),
    pic('maja2', 'maja', 'most_teczka', 'ta była na samym dnie. pod wycinkami o powodzi'),
    give('ev_m_teczka'),
    M('„nie publikować bez K.” i nie mamy pojęcia, kto to jest K.'),
    choose('maja2', [
      opt('Rodzina pana Adama wie, że to otwieracie?', [
        M('tak. jego brat podpisał zgodę na spisanie zawartości. tylko na to, nie na publikację. pani Weronika ma to na kartce i trzyma przy pudle jak paragon')
      ]),
      opt('Jak ci się przegląda te rzeczy?', [
        M('dziwnie. jakbym czytała cudzy pamiętnik, ale za pozwoleniem'),
        M('dobra, nie rozkręcajmy tego. pani Weronika już wyciąga resztę')
      ])
    ]),
    scene('f3ewa', [
      M('a żona pana Adama, pani Ewa, nie chciała nawet wiedzieć, co tu jest'),
      M('powiedziała bratu przez telefon: „on już wszystko nagrał, wystarczy”. pani Weronika mówi, że on nagrywał każdą rozmowę telefonem. od zawsze')
    ]),
    pause(1500),
    unlock('chat:weronika'),
    W('Dobry wieczór. Maja mówi, że {Pan|Pani} ma teraz chwilę. Wypiszę, co jest w środku, żeby nikt potem nie mówił, że coś zginęło.'),
    W('Notes A5, wpisy od 14 września do 2 grudnia 2011. Pismo pana Adama, same inicjały.'),
    give('ev_m_notes'),
    W('Kaseta mini-DV z opisem „H.W. 2/2”. Pierwszej części nie ma. Szukałyśmy dwa razy.'),
    give('ev_m_dv'),
    pic('weronika', 'weronika', 'most_s41', 'Kserokopia strony 41 jakiegoś dziennika robót. Bez pieczątki.'),
    give('ev_m_s41'),
    pic('weronika', 'weronika', 'most_postcard', 'I pocztówka. Bez podpisu.'),
    give('ev_m_postcard'),
    pic('weronika', 'weronika', 'most_clip', 'Na koniec wycinek z 2012 roku.'),
    give('ev_m_clip2012'),
    scene('xKotkaWideo', [
      pause(1200),
      M('a pani Ziuta właśnie się obudziła i sprawdza, czy niczego nie ruszyłyśmy'),
      say('maja2', 'maja', '', { vid: 'assets/video/v_kotka.mp4', img: 'v_kotka' }),
      M('ruszyłyśmy. jest obrażona'),
      choose('maja2', [
        opt('Przeproście ją. Najlepiej szynką.', [M('pani Weronika już kroi. kotka ma tu lepiej niż my')]),
        opt('Sprawdza, czy wszystko jest na swoim miejscu. Jak dobry archiwista.', [M('xD pani Weronika mówi, że to jej najlepsza pracownica. i jedyna')])
      ])
    ]),
    scene('xBrygada', [
      pause(1500),
      M('jeszcze to. leżało luzem w notesie, między kartkami z września'),
      pic('maja2', 'maja', 'm_brygada', 'zdjęcie z 2011. most w remoncie. przypomina ci to coś?'),
      choose('maja2', [
        opt('Butelka mleka na desce. Jak „dziękuję za mleko” z pocztówki.', [
          M('o kurczę. faktycznie'),
          M('ktoś nosił im mleko na budowę? wszystkim czy tylko jednemu?'),
          M('zapisuję. ale na razie nikomu o tym nie mówmy')
        ], { set: { m_milkLink: true } }),
        opt('Pod przęsłem nie ma żadnej siatki.', [
          M('serio. same deski, a pod spodem od razu woda'),
          M('pani Weronika mówi, że to da się sprawdzić w papierach. czy siatka w ogóle miała tam być')
        ], { set: { m_netSeen: true } }),
        opt('Ci ludzie są za daleko. Nikogo tu nie poznam.', [
          M('ja też nie. i chyba dobrze. nie chcę zgadywać, kto to, po samej kurtce'),
          M('odkładam do teczki, tak jak leżało')
        ])
      ])
    ]),
    pause(1200),
    W('Jedno mi nie pasuje. W notatkach Mai z października było „Darek Kruk, zginął w 2011, most kolejowy”.'),
    W('A ta dziewczyna od filmików, Zuza, mówiła Mai, że babcia powtarza tylko „wypadek w pracy, 2011”. Czy to są dwie różne wersje?'),
    choose('weronika', [
      opt('To ta sama wersja. Darek pracował przy remoncie mostu, wycinek wymienia wykonawcę.', [
        W('Ma {Pan|Pani} rację. „Wykonawca prac, firma Kurek-Bud.” Czyli zginął w pracy, na moście.'),
        W('Przepraszam. Po tym wszystkim w każdej różnicy szukam kłamstwa.')
      ], { set: { m_sameEvent: true } }),
      opt('Ktoś tu kłamie. Albo babcia, albo notatka.', [
        W('Proszę spojrzeć na wycinek. „Spadł z przęsła remontowanego mostu… Wykonawca prac, firma Kurek-Bud.”'),
        W('Pracował przy remoncie. Czyli chodzi o ten sam wypadek. Tylko każdy mówi o nim trochę inaczej.'),
        W('Ja też tak na początku pomyślałam.')
      ], { set: { m_sameEvent: true } })
    ]),
    scene('xGaleriaBrat', [
      W('Jeszcze jedna sprawa. Brat pana Adama prosi o jedno zdjęcie, żeby wiedział, że wszystko jest w porządku. Ma {Pan|Pani} coś od Mai w galerii?'),
      camera('weronika', [
        opt('Z galerii: zamknięta teczka', [W('Dobrze. Teczka zamknięta, nic nie widać ze środka. Tak będzie najlepiej.')], { img: 'most_teczka', gallery: true, set: { m_sentTeczka: true } }),
        opt('Z galerii: kotka na wycinkach', [W('Odpisał po minucie: „Adam by się śmiał”. Chyba o to mu chodziło.')], { img: 'm_kot_wycinki', gallery: true, set: { m_sentKot: true } }),
        opt('Z galerii: zdjęcie mostu z 2011', [W('Poprosił, żeby nie wysyłać mu więcej zdjęć mostu.'), W('Napisałam mu, że to moja wina. Nie {Pana|Pani}.')], { img: 'm_brygada', gallery: true })
      ])
    ]),
    pause(1500),
    M('ok, pani Weronika kazała mi iść do domu, bo „masz jutro pracę”. skąd ona wie'),
    M('jeszcze jedno. dzwoniła dziś do mnie jakaś Marta z Gazety Sudeckiej, z archiwum. pyta o kasetę H.W.'),
    M('dałam jej twój numer. sorry. nie mam dzisiaj siły na kolejną obcą osobę'),
    choose('maja2', [
      opt('Spoko. Ogarnę.', [M('dzięki. idę spać jak normalny człowiek. o 20:40 🫠')]),
      opt('Następnym razem zapytaj, zanim dasz komuś mój numer.', [M('masz rację. przepraszam. ja tylko… dobra. następnym razem zapytam')], { trust: { maja: -1 } })
    ]),
    scene('xGrupa', [
      pause(2500),
      say('group', 'kuba', 'dobra. maja od miesiąca jest w domu, a my dalej mamy grupę „szukamy mai”'),
      say('group', 'ola', 'Mnie też to gryzło. Tylko jakoś głupio było zmieniać.'),
      say('group', 'bartek', 'zmieniajcie. matka mysli ze dalej kogos szukamy'),
      say('group', 'kuba', 'ty wymyśl. ja wymyślę coś głupiego'),
      choose('group', [
        opt('„Mglisko po godzinach”', [rename('group', 'Mglisko po godzinach'), sys('group', 'Kuba zmienił nazwę grupy na „Mglisko po godzinach”'), say('group', 'bartek', 'brzmi jak audycja w radiu. biore')], { set: { m_groupPo: true } }),
        opt('„Herbata u pani Weroniki”', [rename('group', 'Herbata u pani Weroniki ☕'), sys('group', 'Kuba zmienił nazwę grupy na „Herbata u pani Weroniki ☕”'), say('group', 'ola', 'Pani Weronika będzie zachwycona 😄')], { set: { m_groupHerbata: true } }),
        opt('„Znalezieni”', [rename('group', 'Znalezieni'), sys('group', 'Kuba zmienił nazwę grupy na „Znalezieni”'), say('group', 'kuba', 'trochę ckliwe. ale zostaje'), say('group', 'ola', 'Mnie się podoba.')], { set: { m_groupZnalezieni: true } })
      ]),
      say('group', 'kuba', 'maja jeszcze nie wie. zobaczy rano')
    ]),
    scene('xWieczor', [
      pause(3000),
      V('kuba', 'kuba', '0:14', 'Maja zasnęła na kanapie w kurtce. Mama mówi, żeby jej nie budzić, ale mam jej zdjąć buty. Czemu zawsze ja?', 'Kuba'),
      choose('kuba', [
        opt('Zdejmij. Będzie ci wdzięczna.', [say('kuba', 'kuba', 'zdjąłem. powiedziała przez sen „nie publikować”. serio')]),
        opt('Zrób jej zdjęcie na pamiątkę.', [say('kuba', 'kuba', 'zrobiłem. ale nie wyślę, bo mnie zabije'), say('kuba', 'kuba', 'dam jej na urodziny')])
      ])
    ]),
    pause(4000),
    clock('2026-11-20T21:07'),
    unlock('chat:marta'),
    Ma('Dobry wieczór. Nazywam się Marta Jasińska, pracuję w archiwum Gazety Sudeckiej. Numer dostałam od Mai Wrony.'),
    Ma('Piszę w sprawie kasety mini-DV opisanej „H.W. 2/2” z materiałów śp. Adama Rybickiego.'),
    Ma('W 2019 roku pan Adam zgrał ją w redakcji. Mamy plik HW_2z2.mov, 41 minut 12 sekund. Chciałabym porównać go z oryginałem z pudła.'),
    Ma('Piszę z prywatnego numeru, bo jest piątek i jestem już w domu. Rozumiem, jeśli woli {Pan|Pani} to sprawdzić.'),
    choose('marta', [
      opt('Sprawdzę. Zadzwonię na numer redakcji.', [Ma('Dobrze. Sekretariat jest do 18, ale po godzinach przełączają na dyżur wydania.')], { set: { m_checkFirst: true } }),
      opt('Wierzę. O co chodzi z tą kasetą?', [
        Ma('Dziękuję, ale wolałabym, żeby {Pan|Pani} jednak sprawdził{|a}. Po tym, co w październiku pisały portale o Mglisku, ja bym sprawdziła.'),
        Ma('Numer jest na stronie gazetasudecka.pl, w zakładce Kontakt.')
      ])
    ]),
    dial({
      goal: 'Potwierdź, że Marta pracuje w Gazecie Sudeckiej. Numer redakcji znajdziesz w przeglądarce (gazetasudecka.pl → kontakt).',
      goalHints: [],
      numbers: {
        '74 832 10 40': {
          who: 'gs_sek', then: [
            c('gs_sek', 'Gazeta Sudecka, dyżur wydania, Kowalczyk, słucham.'),
            choose('call', [opt('Dzień dobry. Czy pracuje u państwa Marta Jasińska?', [])]),
            c('gs_sek', 'Marta? Tak, archiwum, pokój dwanaście. Ona już wyszła, ale jutro od ósmej jest.'),
            c('gs_sek', 'A {pan|pani} w jakiej sprawie? Jeśli coś jej przekazać, to zapiszę.'),
            choose('call', [
              opt('Nie trzeba. Chciał{em|am} tylko potwierdzić.', [c('gs_sek', 'Bardzo słusznie. Ludzie teraz piszą do nas, że ktoś się podaje za redakcję. Dobranoc.')]),
              opt('Sprawa kasety pana Rybickiego.', [c('gs_sek', 'Aha, to na pewno Marta. Ona te kasety zna lepiej niż my wszyscy razem wzięci. Dobranoc.')])
            ]),
            callEnd()
          ]
        }
      }
    }),
    set('m_martaVerified'),
    rename('marta', 'Marta Jasińska', 'marta'),
    pause(2000),
    Ma('Widzę, że {Pan|Pani} dzwonił{|a}. Dyżur wydania od razu do mnie napisał. Dziękuję.'),
    Ma('Nasz plik zaczyna się w środku zdania, choć licznik pokazuje 00:00:00. Pan Adam opisał go „2/2”. Pierwsza kaseta musi być gdzie indziej albo zaginęła.'),
    Ma('Jeśli w pudle jest oryginał, mogę go przegrać na naszym magnetowidzie i sprawdzić, czy plik jest pełny. Nic nie publikujemy. To tylko archiwum.'),
    choose('marta', [
      opt('Dobrze. Ale kaseta zostaje u pani Weroniki. Może pani przyjechać do niej z magnetowidem?', [
        Ma('Zgoda. To nawet lepiej, oryginał nie wychodzi z domu.'),
        Ma('Napiszę do pani Lis w poniedziałek.')
      ], { set: { m_tapeStays: true } }),
      opt('Najpierw zapytam rodzinę pana Adama.', [
        Ma('Tak powinno być. Poczekam.'),
        Ma('Jeśli się zgodzą, przyjadę do Mgliska z magnetowidem. Kaseta nie musi nigdzie jechać.')
      ], { set: { m_askFamily: true } })
    ]),
    scene('xNatanZapowiedz', [
      Ma('Przy okazji: nasz Natan z działu wideo pyta, czy może się kiedyś do {Pana|Pani} odezwać. Uprzedzam: jak się spieszy, pisze bez polskich znaków.'),
      choose('marta', [
        opt('Może. Jak będzie miał konkretną sprawę.', [Ma('Przekażę. On zawsze ma konkretną sprawę. Zwykle o drugiej w nocy.')]),
        opt('Wolę na razie tylko z panią.', [Ma('Rozumiem. Ja też wolę mniej ludzi naraz.')])
      ])
    ]),
    Ma('Dobranoc.'),
    scene('xKubaNoc', [
      pause(3000),
      clock('2026-11-20T23:34'),
      say('kuba', 'kuba', '{widziałeś|widziałaś} nową nazwę grupy? maja rano padnie'),
      say('kuba', 'kuba', 'dobra, ja na nockę. od pierwszej jestem w magazynie'),
      choose('kuba', [
        opt('Powodzenia na nocce.', [say('kuba', 'kuba', 'dzięki. termos mam, playlistę mam. przeżyję')]),
        opt('Od kiedy pracujesz na nocki?', [say('kuba', 'kuba', 'od listopada. lepiej płacą. a w dzień i tak nie umiem spać')])
      ]),
      pause(3500),
      M('kto zmienił nazwę grupy 😭'),
      M('obudziłam się, żeby się napić wody, i myślałam, że to jakaś inna grupa'),
      choose('maja2', [
        opt('Ja. Ale Kuba zatwierdził.', [M('wiedziałam, że on maczał w tym palce. zostawiam. podoba mi się')]),
        opt('Cała grupa. Uznaliśmy, że już czas.', [M('no. już czas'), M('dobranoc. drugi raz')])
      ])
    ]),
    pause(1500),
    end('m1')
  ];
});

Engine.chapter('m1', { num: 1, kicker: 'Sprawa 2 · Rozdział 1', title: 'Trzy publikacje', when: 'Poniedziałek, 23 listopada', mood: 'calm' }, D => {
  const { say, pic, pause, choose, menu, opt, waitFor, goal, give, unlock, set, iff, end, title, clock, callIn, callEnd, notify, show, scene } = D;
  const S = (t, o) => say('sylwia', 'sylwia', t, o);
  const Z = (t, o) => say('zuza', 'zuza', t, o);
  const Ma = (t, o) => say('marta', 'marta', t, o);
  const N = (t, o) => say('natan', 'natan', t, o);
  const B = (t, o) => say('bartek', 'bartek', t, o);
  const H = t => say('call', 'henryk', t);
  const V = (chat, who, dur, text, from = '') => say(chat, who, `voice:${dur}|${from}|${text}`);

  return [
    clock('2026-11-23T07:42'),
    title(),
    set('m_clipOut'),
    notify({ app: 'messages', who: 'sylwia', title: 'Sylwia Pietrzak', text: 'Przepraszam, że tak rano. Widział{|a} {Pan|Pani} to nagranie z mostu?', sound: 'notif' }),
    unlock('chat:sylwia'),
    S('Przepraszam, że tak rano. Widział{|a} {Pan|Pani} to nagranie z mostu?'),
    S('Od wczoraj wieczorem mam w grupie dwadzieścia zgłoszeń. Każdy wrzuca to samo: pan Henryk z Wodnej, sprzed lat, mówi „moja wina”.'),
    S('Pod spodem już piszą, że on zabił Darka Kruka. Komentarze kasuję, ale nie nadążam.'),
    S('Gazeta Sudecka to wrzuciła. Gazeta! Myślałam, że jak oni, to sprawdzone.'),
    choose('sylwia', [
      opt('Na razie nie przypinaj niczego. Sprawdzę, skąd jest nagranie.', [S('Dobrze. Zostawiam tylko swój komentarz: „Prosimy nie oskarżać nikogo z imienia i nazwiska”.')], { set: { m_sylwiaWaits: true } }),
      opt('Skasuj wszystkie wpisy z tym nagraniem.', [
        S('Wszystkich nie dam rady, to pół grupy. A jak usunę wpis gazety, to powiedzą, że coś ukrywam.'),
        S('Zostawię link, ale wyłączę komentarze pod nim.')
      ])
    ]),
    S('Jeszcze jedno. Pan Henryk do mnie dzwonił. Na stacjonarny do salonu. Prosił o kontakt z {Panem|Panią}. Dałam numer.'),
    iff('ev:ev_fb_henryk', [S('Pamięta, że to {Pan|Pani} wtedy nie śmiał{|a} się z tej iskry.')]),
    goal('Obejrzyj nagranie z mostu (szukaj w przeglądarce: „most 2011” albo „brygadzista moja wina”).'),
    waitFor('ev:ev_m_gs', { goal: 'Obejrzyj nagranie z mostu (szukaj w przeglądarce: „most 2011” albo „brygadzista moja wina”).' }),
    pause(2500),
    callIn('henryk'),
    set('m_metHenryk'),
    H('Halo. Wiśniewski. Henryk.'),
    iff('ev:ev_fb_henryk', [
      H('{Pan|Pani}. Wtedy z tą iskrą. Jako jedyn{y|a} mnie nie wyśmiał{|a}. To dzwonię.')
    ], [
      H('Sylwia dała numer. Mówi, że {Pan|Pani} pomógł{|a} szukać tej Wronówny. To dzwonię.')
    ]),
    H('Ja tak nie mówiłem.'),
    H('To znaczy mówiłem. Te słowa. Ale nie tak. Tam jest dalej. Oni ucięli.'),
    choose('call', [
      opt('Co było dalej?', [
        H('Nie pamiętam słowo w słowo. Piętnaście lat. Ale ja tej siatki nie założyłem, bo mi nie kazali. Odwrotnie.'),
        H('Więcej przez telefon nie powiem. Moja Basia mówiła, że przez telefon się nie gada.')
      ]),
      opt('Kto pana wtedy nagrywał?', [
        H('Rybicki. Adam. Przyszedł do mnie z kamerą, w październiku. Siedzieliśmy w kuchni.'),
        H('Dwie kasety nagrał. Dwie. Pamiętam, bo w połowie zmieniał kasetę i coś mu się zacięło.')
      ], { set: { m_twoTapes: true } })
    ]),
    H('I jeszcze. Piszą, że Darek był pijany. To nieprawda. Na rusztowaniu? U mnie? Ja bym go zdjął.'),
    set('m_henrykSober'),
    choose('call', [
      opt('Wierzę, że pan tak to pamięta. Sprawdzę, co da się sprawdzić.', [H('No. Tylko tyle chcę. Żeby ktoś sprawdził.')]),
      opt('Ma pan coś na papierze z tamtego czasu?', [H('Mam szuflady. Pełne. Rachunki, kwity. Basia wszystko trzymała. Jak trzeba, poszukam.')], { set: { m_henrykDrawers: true } })
    ]),
    H('Dobra. Bo mi impulsy lecą. Do widzenia.'),
    callEnd(),
    pause(3000),
    unlock('chat:zuza'),
    Z('hej'),
    Z('{widziales|widzialas} to z mostem'),
    V('zuza', 'zuza', '0:31', 'babcia nie ma klipo, ale sąsiadka jej pokazała na telefonie. przy mnie. babcia popatrzyła może pięć sekund i oddała telefon. i poszła do kuchni. i stamtąd tylko powiedziała, że pan Henryk to porządny człowiek i żeby sąsiadka sobie poszła. ona tak do nikogo nie mówi', 'Zuza'),
    Z('i jeszcze jedno konto to wrzucilo na klipo z napisem ON SIE PRZYZNAL. ma juz ponad 100 tys'),
    iff('flag:zuzaCorrected', [
      Z('nie wrzucam nic. serio. raz juz sie nauczylam'),
      Z('napisalam tylko pod tym komentarz, ze to jest wyciete z dluzszego. bo jest, slychac jak sie urywa')
    ], [
      Z('ja nic nie wrzucam. chociaz mnie korci zeby nagrac ze to nieprawda'),
      Z('ale skad ja mam wiedziec co jest prawda')
    ]),
    choose('zuza', [
      opt('Dobrze robisz. Najpierw sprawdzamy, skąd jest plik.', [Z('ok. jak cos to mam ten repost zapisany. z data')], { trust: { zuza: 1 } }),
      opt('Jak babcia się czuje?', [Z('nie wiem. robi pierogi. ona robi pierogi jak jest zle'), Z('jest ich juz chyba ze sto')])
    ]),
    scene('xGrupaMost', [
      pause(2000),
      say('group', 'bartek', 'widzieliscie to z mostem? stary mowi ze henryk to najuczciwszy facet w mglisku. pozyczyl mu kiedys warsztat na caly weekend i nawet nie chcial piwa'),
      say('group', 'ola', 'Proszę, nie wrzucajcie tego nigdzie dalej. Mama dostała to już od dwóch ciotek.'),
      say('group', 'kuba', 'nie wrzucam. ale czytam komentarze i mi niedobrze'),
      choose('group', [
        opt('Nie czytajcie komentarzy. Najpierw sprawdzimy, skąd jest nagranie.', [say('group', 'ola', 'Dobra. Wyciszam.'), say('group', 'bartek', 'ja i tak nie umiem nie czytac')]),
        opt('Kuba, ty po nocce. Odłóż telefon i idź spać.', [say('group', 'kuba', 'spoko. tylko że na nocce telefon to jedyne, co mam')])
      ])
    ]),
    pause(2500),
    unlock('chat:natan'),
    N('czesc, natan, gs wideo. marta mowila ze mozna do ciebie pisac'),
    N('sorry ze tak z buta. to ja wrzucilem ten material z mostem'),
    N('plik byl w folderze rybickiego w archiwum, opis „HW 2/2”. dostalem go od stazystki, ona szykowala zajawki do cyklu o archiwum'),
    N('wiem ze sie zrobil syf. ale technicznie to jest autentyczne nagranie, nikt nic nie dogrywal'),
    pic('natan', 'natan', 'most_hw', 'pierwsza klatka. czas z kamery'),
    scene('xKadrHW', [
      N('patrzę na tę klatkę od wczoraj. przypomina ci to coś?'),
      choose('natan', [
        opt('To jego kuchnia. Rybicki nagrywał go w domu, przy stole.', [
          N('czyli to nie był wywiad dla gazety. tylko rozmowa w kuchni'),
          N('on nawet nie wiedział, że kiedyś ktoś to puści w sieci')
        ], { set: { m_kitchenLink: true } }),
        opt('Ma złożone ręce i patrzy w stół. Nie wygląda, jakby się przyznawał.', [
          N('raczej jakby czekał na następne pytanie'),
          N('kurde. ja widziałem w tym tylko „moja wina”')
        ], { set: { m_handsSeen: true } }),
        opt('Firanka i lampa jak u mojej babci.', [
          N('u mojej też. może dlatego tak się to klika. każdy zna taką kuchnię')
        ])
      ])
    ]),
    N('kurek-bud przyslal oswiadczenie do redakcji. wklejam'),
    N('„Szanowni Państwo, w związku z publikacją z dnia 22.11.2026 uprzejmie informujemy: 1. Firma z szacunkiem wspomina zmarłego pracownika. 2. Postępowanie z 2012 r. jednoznacznie wykluczyło udział osób trzecich. 3. Na dalsze pytania odpowiemy na piśmie, w ustawowym terminie. Z poważaniem, Janina Kurek, Członek Zarządu”'),
    give('ev_m_kb_statement'),
    choose('natan', [
      opt('W opisie cytujesz notes Rybickiego: „K. przyniosła ksero, dziękuje za mleko”. Usuń to.', [
        N('serio? to tylko inicjal. nikt nie wie kto to K'),
        iff('ev:ev_m_postcard', [
          N('…'),
          N('czekaj. marta mowila ze w pudle jest pocztowka „dziekuje za mleko”. bez podpisu'),
          N('czyli w mglisku ktos moze skojarzyc kto komu wozil mleko. kurde. masz racje'),
          N('usuwam. sorry. serio sorry')
        ], [
          N('ok, jak nalegasz to usune. ale nie rozumiem po co')
        ])
      ], { set: { m_quoteRemoved: true } }),
      opt('Henryk mówi, że nagranie jest ucięte. Masz cały plik?', [
        N('mam to co dala stazystka. 40 sekund. caly plik ma marta w archiwum, ja nie mam do niego dostepu'),
        N('sorry, wiem jak to brzmi')
      ]),
      opt('Wiesz, że ludzie piszą pod spodem, że Henryk kogoś zabił?', [
        N('wiem. moderuje od wczoraj. nie spalem'),
        N('to nie mialo tak wyjsc. mialo byc „zobaczcie co jest w archiwum”')
      ])
    ]),
    iff('!flag:m_quoteRemoved', [
      N('i jeszcze jedno, ktos z redakcji kazal mi wywalic z opisu cytat z notesu. zrobilem. nie wiem czemu ale ok'),
      set('m_quoteRemoved'),
      set('m_quoteRemovedLate')
    ]),
    pause(2500),
    Ma('Dzień dobry. Rozmawiał{|a} {Pan|Pani} z Natanem, wiem.'),
    Ma('Plik, który poszedł do sieci, to 40 sekund z HW_2z2.mov, od 17:22:08. W archiwum jest cała kaseta. Natan dostał wycinek od stażystki, która robiła zajawki.'),
    Ma('Kurek-Bud ma biuro na Polnej. Sekretariat na parterze, gabinety na drugim piętrze, od podwórza. Robiłam tam kiedyś praktyki. Jeśli trzeba będzie coś zanieść osobiście, wiem, do kogo.'),
    choose('marta', [
      opt('Zanotuję to.', [Ma('Proszę. Wolę, żeby wszystko było zapisane.')], { silent: false, set: { m_notedPraktyki: true } }),
      opt('Na razie nic nie zanosimy. Najpierw nagranie.', [Ma('Tak. Najpierw nagranie.')])
    ]),
    give('ev_m_praktyki', { silent: true }),
    Ma('Mam do {Pana|Pani} prośbę. Nagranie wisi w trzech miejscach: u nas, na Klipo i w „Tygodniu w Sudetach”. Sprawdźmy, czy to jeden plik, czy trzy różne.'),
    goal('Znajdź trzy publikacje nagrania: Gazeta Sudecka, Klipo (@sudety.prawda), „Tydzień w Sudetach”. Porównaj pierwszą klatkę i długość.'),
    waitFor(s => G.has('ev_m_gs') && G.has('ev_m_klipo') && G.has('ev_m_tyg'), { goal: 'Znajdź trzy publikacje nagrania: Gazeta Sudecka, Klipo (@sudety.prawda), „Tydzień w Sudetach”. Porównaj pierwszą klatkę i długość.' }),
    Ma('Ma {Pan|Pani} wszystkie trzy? Co je łączy?'),
    choose('marta', [
      opt('Na pierwszej klatce wszędzie jest ta sama godzina: 17:22:08. To jedno nagranie.', [
        Ma('Tak. I Klipo to zwykły zapis ekranu. W rogu widać jeszcze nasz pasek GS Wideo.'),
        Ma('W komentarzach piszą, że trzy redakcje to potwierdziły. A wszyscy puszczają ten sam fragment.')
      ], { set: { m_oneSource: true } }),
      opt('Pokaż to ludziom, nie mnie. Trzy pierwsze klatki obok siebie, do grupy Sylwii.', [
        Ma('17:22:08 wszędzie, tak. Zrobię zrzut trzech klatek obok siebie.'),
        Ma('Sylwia to przypnie szybciej niż my napiszemy sprostowanie.')
      ], { set: { m_oneSource: true, m_showSylwia: true } })
    ]),
    give('ev_m_one'),
    pause(1800),
    Ma('Chwila.'),
    Ma('Tygodnik ma 0:42.'),
    Ma('Od nas wyszło 40 sekund. Liczyłam dwa razy, bo to ja ustawiam eksport w archiwum.'),
    Ma('I nie ma naszego paska. Czyli nie ściągnęli tego od nas.'),
    choose('marta', [
      opt('Ktoś im wysłał dłuższą wersję. Skąd ją miał?', [Ma('Nie wiem. Muszę sprawdzić, do czego stażystka miała dostęp poza tymi 40 sekundami.')]),
      opt('Może po prostu dodali dwie sekundy czerni na początku?', [Ma('Sprawdziłam klatka po klatce. Na końcu są dwie sekundy więcej. Słychać wdech, jakby zaczynał następne zdanie.')])
    ]),
    Ma('Ktoś poza redakcją ma dłuższy kawałek tej kasety. I wysłał go do tygodnika jako „materiał nadesłany”.'),
    Ma('Jutro przegram oryginał. Wtedy usłyszymy, co jest po tych dwóch sekundach.'),
    set('m_act1'),
    end('m2')
  ];
});
