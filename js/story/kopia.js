'use strict';
/* SPRAWA 3 „KOPIA ZAPASOWA” — prolog „Pierwszy klip” (sesje 1–3) i rozdział 1 „Chmura” (sesje 4–6).
   Plan: docs/SPRAWA-3-PLAN.md. Zasada uczciwości: każda zapowiedź prawdy jest widoczna, ale nic jej nie wskazuje wprost.
   Straszaki (scare) są w scenach sc*: raz na zapis, z trybem łagodnym w Ustawieniach. */

Engine.chapter('k0', { num: 0, kicker: 'Sprawa 3 · Prolog', title: 'Pierwszy klip', when: 'Piątek, 18 grudnia · 22:47', mood: 'tense' }, D => {
  const { say, pic, pause, choose, opt, waitFor, goal, give, unlock, set, iff, end, title, clock, notify, ambient, typing, scene, scare } = D;
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const M = (t, o) => say('maja2', 'maja', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);
  const E = (t, o) => say('ewa', 'ewa', t, o);
  const S = (t, o) => say('sylwia', 'sylwia', t, o);
  const V = (chat, who, dur, text, from = '') => say(chat, who, `voice:${dur}|${from}|${text}`);

  return [
    clock('2026-12-18T22:47'),
    ambient('calm'),
    title(),
    set('k_started'),
    K('ej'),
    K('nie śpisz?'),
    K('ktoś mi to wysłał na klipo. konto ma trzy godziny'),
    V('kuba', 'kuba', '0:40', '„…wszyscy mówili, że od pioruna. A ja widziałam, kto stał przy stodole Pawlaków. Miałam siedem lat, ale widziałam.” — „Nikomu tego nie mówiłaś?” — „Panu mówię.”', 'przekazane z Klipo'),
    K('to jest pan adam. ten drugi głos to on'),
    K('nie wiem kim jest ta dziewczyna. w komentarzach już lecą nazwiska', { wording: 'dziewczyny nie poznaję. ludzie zgadują w komentarzach, każdy pisze co innego' }),
    notify({ app: 'browser', title: 'Klipo', text: '@archiwum.rybickiego · „stodoła, 2009” · 61 tys. wyświetleń', sound: 'notif', open: { page: 'tt_archiwum' } }),
    goal('Obejrzyj konto @archiwum.rybickiego na Klipo.', ['W przeglądarce wpisz „archiwum rybickiego” albo dotknij powiadomienia.']),
    waitFor('ev:ev_k_klip1', { hints: [{ after: 90, chat: 'kuba', who: 'kuba', text: 'wpisz w przeglądarce archiwum rybickiego. tylko nie komentuj nic' }] }),
    choose('kuba', [
      opt('Skąd ktoś ma jego nagrania?', [K('no właśnie nie wiem. pudło jest u pani weroniki'), K('pytałem maję. pisze że zaraz sprawdzi')], { set: { k_askedSource: true } }),
      opt('Kto ci to wysłał?', [K('jakieś konto bez zdjęcia. wysłało sam link'), K('pewnie ktoś z grupy. wszyscy wiedzą, że znałem pana adama przez maję')], { set: { k_askedSender: true } })
    ]),
    pause(3000),
    M('jestem u pani Weroniki. przeliczyłyśmy pudło dwa razy'),
    M('nic nie zginęło. wszystkie kasety są, wszystkie zeszyty'),
    scene('xPudlo', [
      pic('maja2', 'maja', 'k_pudlo', 'rozłożyłyśmy wszystko na stole. przypomina ci to coś?', { wording: 'to wszystko z pudła. może ty zauważysz coś, co nam umknęło, bo patrzę na to trzeci raz' }),
      choose('maja2', [
        opt('Ładowarka do telefonu. A telefonu w pudle nie ma.', [
          M('no właśnie. pani Weronika mówi, że telefon został u pani Ewy'),
          M('czyli to, czego szukamy, może w ogóle nie być w pudle')
        ], { set: { k_chargerSeen: true } }),
        opt('Ktoś to już kiedyś przeliczał. Te karteczki z kreskami?', [
          M('to my. dwa razy. kreski są moje'),
          M('ale dzięki, że uznał{eś|aś} mnie za archiwistkę', { wording: 'już mi się myli, co policzyłam, a co tylko przesunęłam' })
        ]),
        opt('Wygląda jak stół u mojej babci przed wigilią. Wszystko w rzędach.', [
          M('xD pani Weronika się śmieje. mówi, że u niej przed wigilią jest dużo większy bałagan')
        ])
      ])
    ]),
    M('i posłuchaj 0:12. on mówi „dziesięć lat minęło”. czyli rozmowa jest z 2019, nie z 2009. wtedy już nie nosił magnetofonu', { wording: 'w 0:12 on mówi „dziesięć lat minęło”. opis „stodoła, 2009” jest o pożarze. rozmowę nagrał w 2019, wtedy już nie używał magnetofonu' }),
    goal('Posłuchaj klipu jeszcze raz. Skąd jest to nagranie?', ['W Notatkach otwórz „Klip nr 1”. Co słychać w 0:31?']),
    choose('maja2', [
      opt('W 0:31 słychać powiadomienie. Może nagrywał telefonem?', [
        M('też to słyszę. sam dźwięk niczego nie przesądza, ale pasuje'),
        M('pani Weronika mówi, że pan Adam od lat nagrywał rozmowy telefonem. „żeby nie zapisywać, tylko słuchać”')
      ], { set: { k_phoneSource: true } }),
      opt('Może ktoś zgrał kasetę i dokleił coś na początku?', [
        M('sprawdziłyśmy. z 2019 nie ma w pudle ani jednej kasety. ostatnia jest z 2012'),
        M('a w 0:31 piszczy powiadomienie. pani Weronika mówi, że od lat nagrywał rozmowy telefonem')
      ], { set: { k_phoneSource: true, k_triedTape: true } })
    ]),
    give('ev_k_zrodlo'),
    scene('xLadowarkaTrop', [iff('flag:k_chargerSeen', [M('i ta ładowarka z pudła. pasuje do telefonu, który leży u pani Ewy')])]),
    M('czyli szukamy nagrań z telefonu. może pani Ewa wie, gdzie je trzymał'),
    pause(2500),
    W('Dobry wieczór. Przepraszam, że tak późno.'),
    W('Dzwoniła do mnie pani Ewa, żona pana Adama. Ktoś jej wysłał ten klip. Płakała. Nie mogłam jej zrozumieć.'),
    W('Powiedziała tylko, że to jest „z telefonu Adama” i że ona „nawet nie wie, jak to się wyłącza”.'),
    // P7: wejście do S3 po słabszych finałach S2.
    scene('xPoMoscie', [
      iff(s => s.vars.s2Ending === 'cudzy_podpis', [
        W('Pani Krystyna dalej nie otwiera. W niedzielę zostawiłam jej opłatek w skrzynce. Nie wiem, czy go wzięła.'),
        W('Proszę mi wybaczyć, że o tym piszę. Po tamtym tekście boję się, że i to rozejdzie się po ludziach.')
      ]),
      iff(s => s.vars.s2Ending === 'margines', [
        W('Teczka KRUK stoi u mnie na półce, obok pudła. Czasem ją otwieram, jakby coś miało w niej przybyć.')
      ])
    ]),
    choose('weronika', [
      opt('Czy mogę do niej napisać? Tylko jeśli się zgodzi.', [W('Zapytam ją rano. Dziś niech już śpi.')], { set: { k_askEwa: true } }),
      opt('Niech pani do niej jutro zadzwoni. Ja poczekam.', [W('Dobrze. Pani Ewa nie lubi obcych numerów.')])
    ]),
    scene('xNoc', [
      pause(3000),
      clock('2026-12-18T23:40'),
      V('maja2', 'maja', '0:16', 'Jestem w domu. Kuba jeszcze nie śpi, siedzi w słuchawkach i udaje, że nie słyszy, jak go wołam na herbatę. Ja już padam. Dobranoc.', 'Maja'),
      choose('maja2', [
        opt('Dobranoc. Nie czytaj już komentarzy.', [M('za późno. ale już przestaję')]),
        opt('Wyśpij się.', [M('postaram się 🫠')])
      ]),
      pause(3000),
      W('Jeszcze jedno. Pani Ewa napisała mi, że nie śpi. Siedzi w kuchni przy szufladzie z telefonem męża, chociaż jest rozładowany.'),
      W('Mówi, że tak jej spokojniej. Ja chyba też dziś nie zasnę.')
    ]),
    pause(4000),
    clock('2026-12-19T00:58'),
    ambient('dark'),
    K('drugi klip. rada gminy, 2014'),
    K('już nie słucham. idę spać'),
    pause(12000),
    clock('2026-12-19T01:12'),
    /* Cisza po Kubie. Telefon z numeru, który w kontaktach jest podpisany jak dom zmarłego. */
    scene('scDom', [
      scare('s3_domowy', 'call', { name: 'A. Rybicki · dom', number: '74 845 21 09', ms: 8000, listen: 4200, onAccept: 'k_pickedDom' }),
      set('k_ewaCalled')
    ]),
    pause(6000),
    clock('2026-12-19T07:40'),
    ambient('calm'),
    unlock('chat:ewa'),
    E('dzien dobry. tu ewa rybicka. pani weronika dala mi numer'),
    iff('flag:k_pickedDom', [E('przepraszam za noc. to ja dzwonilam z domowego. {pan odebral|pani odebrala} a ja nie umialam nic powiedziec')], [E('przepraszam za noc. to ja dzwonilam z domowego. {pan nie odebral|pani nie odebrala}. i dobrze')]),
    E('pani weronika dala mi numer jeszcze wieczorem. w nocy zobaczylam drugi klip i nie wytrzymalam'),
    E('kto to robi'),
    choose('ewa', [
      opt('Jeszcze nie wiem. Ale to nie są kasety z pudła. To nagrania z jego telefonu.', [
        E('on wszystko nagrywal. mowil ze to dla pamieci nie do druku'),
        E('telefon lezy w szufladzie. rozladowany od pogrzebu. hasla nie znam')
      ], { set: { k_ewaCloud: true } }),
      opt('Bardzo mi przykro. Czy ktoś jeszcze ma dostęp do jego rzeczy?', [
        E('brat byl przy pudle. i pani weronika. nikt wiecej'),
        E('telefon lezy u mnie w szufladzie. rozladowany. hasla nie znam')
      ], { set: { k_ewaCloud: true } })
    ]),
    E('niech {pan|pani} to zatrzyma. ludzie tu mieszkaja', { wording: 'znam pania pawlakowa. jak ja mam jej teraz spojrzec w oczy' }),
    pause(3000),
    S('Dzień dobry. Przepraszam, że piszę do {Pana|Pani} w sobotę rano.'),
    S('Nad ranem był trzeci klip. Znowu stodoła. Dziewczyna mówi „ja tam stałam”.'),
    S('Ktoś w nocy napisał sprayem na bramie Pawlaków „PODPALACZE”. Ludzie zrozumieli z klipu, że sami podpalili, dla odszkodowania. W klipie tego nie ma.'),
    S('Ich syn wypisał się z grupy. Usuwam komentarze z nazwiskami co pięć minut.'),
    set('k_clip3'),
    give('ev_k_klip3'),
    choose('sylwia', [
      opt('Proszę zablokować komentarze z nazwiskami i nie udostępniać klipów w grupie.', [S('Zrobię. Ludzie i tak wkleją link. Ale u mnie nie.')], { set: { k_sylwiaLocks: true } }),
      opt('Proszę zapisać zrzuty usuniętych komentarzy, z godziną.', [S('Dobrze. Mam już dwanaście. Jeden ktoś wrzucił o czwartej rano.')], { set: { k_sylwiaLogs: true } })
    ]),
    pause(2500),
    K('{widziałeś|widziałaś} bramę?'),
    K('to jest moja droga do pracy. stał tam pan pawlak i szorował to rozpuszczalnikiem'),
    K('napisałbym do niego. ale co mam napisać', { wording: 'chciałem podejść. nawet dzień dobry mu nie powiedziałem' }),
    choose('kuba', [
      opt('Cokolwiek się stało ze stodołą, nikt nie powinien im mazać po bramie.', [K('no'), K('on to szoruje a ludzie dalej wrzucają link')], { wording: 'Możesz mu chociaż powiedzieć, że nie powinien sam tego zmywać. Nikt nie miał prawa mu tego zrobić.', set: { k_kubaTruthTalk: true } }),
      opt('Trzymaj się z daleka od komentarzy, dobrze?', [K('spoko. i tak mam nockę dzisiaj')])
    ]),
    scene('xGrupaBrama', [
      pause(2000),
      say('group', 'ola', 'Widzieliście bramę Pawlaków? Mama tamtędy jechała rano do pracy.'),
      say('group', 'bartek', 'ktos na kwartale pisze ze to igor bo „umie w komputery”. juz sam nie wiem co myslec'),
      say('group', 'ola', 'Bartek, nie zaczynaj.'),
      say('group', 'kuba', 'nie piszmy tu o tym, ok? mam tego dość'),
      say('group', 'ola', 'Kuba, wszystko dobrze?'),
      say('group', 'kuba', 'tak. po prostu jestem zmęczony'),
      choose('group', [
        opt('Nie oskarżajmy nikogo na ślepo. Jak macie pytanie do Igora, zadajcie je jemu.', [say('group', 'bartek', 'no dobra. zapytam go wprost')], { set: { k_groupNoGuess: true } }),
        opt('Kuba, idź się przespać przed nocką.', [say('group', 'kuba', 'idę. dzięki')])
      ])
    ]),
    pause(2000),
    end('k1')
  ];
});

Engine.chapter('k1', { num: 1, kicker: 'Sprawa 3 · Rozdział 1', title: 'Chmura', when: 'Sobota, 19 grudnia · 21:30', mood: 'tense' }, D => {
  const { say, pic, pause, choose, opt, waitFor, goal, give, unlock, set, iff, end, title, clock, notify, ambient, typing, scene, scare, run, callIn, callEnd, sys } = D;
  const c = (who, t, o) => say('call', who, t, o);
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const M = (t, o) => say('maja2', 'maja', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);
  const I = (t, o) => say('igor', 'igor', t, o);
  const g = (who, t, o) => say('group', who, t, o);
  const A = (t, o) => say('archiwum', 'archiwum', t, o);
  const S = (t, o) => say('sylwia', 'sylwia', t, o);
  const V = (chat, who, dur, text, from = '') => say(chat, who, `voice:${dur}|${from}|${text}`);

  return [
    clock('2026-12-19T21:30'),
    title(),
    scene('kMem', [
      pic('maja2', 'maja', 'k_mem_krzeslo', 'ktoś postawił krzesło na przystanku przy szkole. bo autobus o 7:10 przyjeżdża „mniej więcej”'),
      M('gmina już napisała na kwartale, że „krzesło nie jest elementem infrastruktury” 😭'),
      choose('maja2', [
        opt('Najlepsza inwestycja w gminie od lat.', [M('zgłaszam do budżetu obywatelskiego. „krzesło 2”')]),
        opt('Kto je tam postawił?', [M('podobno pan Zenon. czeka tam co rano na gazetę, a ławkę ktoś ukradł w 2019')])
      ])
    ]),
    pause(2500),
    I('hej. maja mi przesłała klip'),
    I('po samym klipie nie powiem, czym to nagrano. klipo i tak kompresuje dźwięk'),
    I('ale powiadomienie w tle to dźwięk z systemu telefonu. nie z dyktafonu'),
    I('i zanim ktoś zapyta: nie. ja tego nie robię'),
    I('wiem, jak to brzmi po szklarzu'),
    choose('igor', [
      opt('Nie {pytałem|pytałam}. Ale dzięki, że mówisz wprost.', [I('bartek zapytał. na grupie. dwa razy')], { trust: { igor: 1 } }),
      opt('Gdzie byłeś wczoraj wieczorem?', [I('w serwisie do 22. mam kasę fiskalną i dwóch klientów. możesz sprawdzić'), I('rozumiem, że pytasz')], { set: { k_askedIgorAlibi: true } })
    ]),
    I('jeśli nagrywał telefonem, mógł mieć kopię w nimbusie. telefony robią to same, w nocy, na ładowarce. jak ktoś tego nie wyłączył', { wording: 'sprawdziłbym nimbusa. jeśli miał włączone kopie nagrań, mogły tam pójść automatycznie, kiedy podłączał telefon na noc' }),
    I('wtedy ktoś, kto wszedł na konto, mógł to stamtąd pobrać. trzeba sprawdzić, co tam w ogóle było'),
    scene('xLadowarka', [
      pause(1500),
      pic('igor', 'igor', 'k_ladowarka', 'tak to wygląda. mój stary telefon, dziś o drugiej w nocy. sam z siebie. przypomina ci to coś?', { wording: 'mój stary telefon dziś o drugiej. zostawiłem na ładowarce i ruszyła kopia. u pana adama mogło być podobnie' }),
      choose('igor', [
        opt('Pani Ewa mówiła, że telefon pana Adama leży rozładowany w szufladzie.', [
          I('rozładowany nic nie wyśle. ale kopia mogła pójść dużo wcześniej, jeszcze za jego życia'),
          I('liczy się konto. nie sam telefon')
        ], { set: { k_drawerLink: true } }),
        opt('U mnie w nocy też coś się świeci. Myślał{em|am}, że to powiadomienia.', [
          I('pewnie to samo. kopia idzie zwykle między pierwszą a piątą, jak telefon leży na ładowarce'),
          I('czyli godzina wrzucenia klipu jeszcze nic nie mówi. o tej porze telefony żyją same', { wording: 'tylko to jest godzina robienia kopii. publikację klipu ktoś musiał uruchomić osobno' })
        ], { set: { k_nightSync: true } }),
        opt('Wygląda jak ufo nad blokiem.', [
          I('xD to tylko chmurka kopii zapasowej. ludzie mi przynoszą telefony, bo „coś się świeci w nocy”')
        ])
      ])
    ]),
    pause(3000),
    W('Pani Ewa zgodziła się, żebym w jej imieniu zapytała Nimbus o konto męża. Jest formularz dla rodzin osób zmarłych.'),
    W('Potrzebny akt zgonu i moje upoważnienie. Odpowiedź do 14 dni roboczych.'),
    W('Czternaście dni. A on wrzuca co kilka godzin.', { wording: 'Nie wiem, ile jeszcze nagrań zdąży przez ten czas wrzucić.' }),
    choose('weronika', [
      opt('Proszę wysłać od razu. I poprosić o historię logowań, nie o treść.', [W('Dobrze. „Historia aktywności konta”. Tak to się nazywa w formularzu.')], { set: { k_requestLog: true } }),
      opt('Proszę też poprosić o zablokowanie konta. Nawet jeśli stracimy ślad.', [W('Wpiszę oba. Niech zdecydują, co szybciej.')], { set: { k_requestLog: true, k_requestLock: true } })
    ]),
    scene('xEwaTel', [
      pause(3000),
      callIn('ewa'),
      c('ewa', 'Przepraszam. Nie umiem tak szybko pisać, to dzwonię.'),
      c('ewa', 'Pani Weronika mówiła o tej chmurze. Ja nic o tym nie wiem. Ale ten jego telefon w szufladzie…'),
      c('ewa', 'Po Wszystkich Świętych raz go podłączyłam. Chciałam zobaczyć jego zdjęcia. Hasła nie znałam, więc odłożyłam.'),
      c('ewa', 'A w nocy ekran się zaświecił. Sam. Myślałam, że mi się przywidziało.'),
      choose('call', [
        opt('Czy ktoś jeszcze wtedy był u pani w domu?', [c('ewa', 'Brat Adama na chwilę. I chłopak od Wronów przyniósł zakupy, bo Maja prosiła. Nikt więcej.', { wording: 'Brat Adama na chwilę. I chłopak od Wronów przyniósł zakupy. Nikt więcej.' })], { set: { k_ewaVisitors: true } }),
        opt('To mogło być zwykłe powiadomienie.', [c('ewa', 'Może. On zawsze mówił, że telefon ma swoje życie.')])
      ]),
      c('ewa', 'Dobranoc. Albo dzień dobry. Już nie wiem, która godzina.'),
      callEnd()
    ]),
    pause(4000),
    clock('2026-12-20T03:11', { rest: 's3_upload' }),
    scene('xRanoKlip', [iff('flag:rano_s3_upload', [sys('kuba', 'Powiadomienia z nocy. Klip dodano o 03:11.')])]),
    ambient('dark'),
    notify({ app: 'browser', title: 'Klipo', text: '@archiwum.rybickiego dodał nowy klip', sound: 'notif', open: { page: 'tt_archiwum' } }),
    set('k_clip5'),
    pause(1500),
    /* Kuba „pisze…” o 03:11 i nic nie wysyła. Nie straszak — zapowiedź. */
    typing('kuba', 'kuba', 6000),
    pause(2500),
    typing('kuba', 'kuba', 2500),
    pause(5000),
    scene('xRampa', [
      clock('2026-12-20T06:12'),
      pic('kuba', 'kuba', 'k_rampa', 'koniec nocki. tak wygląda moje „dzień dobry”'),
      choose('kuba', [
        opt('Ładny wschód. Idź spać.', [K('idę. nie budzić do dziewiątej 💀')]),
        opt('Rozładowaliście tego tira?', [K('dwa. trzeci jutro. plecy bolą jak u dziadka')])
      ]),
      pause(3000)
    ]),
    clock('2026-12-20T09:20'),
    ambient('calm'),
    scene('xPrzepraszamy', [
      S('Dzień dobry. Ktoś w nocy zostawił pod bramą Pawlaków znicz i kartkę „przepraszamy”. Bez podpisu.'),
      S('Pan Pawlak postawił znicz na słupku. Nie wyrzucił.'),
      choose('sylwia', [
        opt('Może ktoś z tych, którzy pisali komentarze.', [S('Też tak myślę. Wolę takie „przepraszam” niż żadne.')]),
        opt('Niech pani tego nie wrzuca do grupy.', [S('Nie wrzucam. Niech to zostanie między nimi.')], { set: { k_sylwiaQuietNote: true } })
      ]),
      pause(2500)
    ]),
    goal('Sprawdź nowy klip na koncie @archiwum.rybickiego.', ['Otwórz Klipo w przeglądarce. Zwróć uwagę na opis i godzinę.']),
    waitFor(s => G.has('ev_k_klip1') && G.flag('k_clip5'), {}),
    give('ev_k_opis'),
    K('dopiero wstałem. co mnie ominęło?'),
    choose('kuba', [
      opt('W nocy pokazywało, że piszesz. Chciałeś coś wysłać?', [K('zacząłem pytać o klip. potem mnie zawołali do palet'), K('o 3 to my rozładowujemy tira')], { set: { k_askedTyping: true } }),
      opt('Spoko. Wyśpij się.', [K('postaram się 💀')])
    ]),
    pause(3000),
    M('{widziałeś|widziałaś} opis? „4% baterii a i tak wrzucam”'),
    M('serio, „a i tak wrzucam”. jakby wrzucał zdjęcie kolacji', { wording: 'ludzie mu pod tym piszą, żeby założył zbiórkę na powerbank. nikt już nie słucha, co jest w nagraniu' }),
    scene('xKubaSpi', [
      pause(2000),
      V('maja2', 'maja', '0:13', 'Kuba znowu śpi. Wstał na pół godziny, zjadł zimne naleśniki i wrócił do łóżka. Mama pyta, czy on nie jest chory. Mówię, że to nocki.', 'Maja'),
      choose('maja2', [
        opt('Nocki potrafią rozwalić człowieka.', [M('no. tylko że on w dzień też siedzi z telefonem. widzę światło pod drzwiami')]),
        opt('A ty jak się trzymasz?', [M('jakoś. mam dzisiaj w pracy inwentaryzację, więc przynajmniej nie myślę')])
      ])
    ]),
    pause(5000),
    scene('xKubek', [
      clock('2026-12-20T21:41'),
      W('Jestem jeszcze w czytelni. Segreguję zgłoszenia na kiermasz książek, bo w domu i tak nie zasnę.'),
      pic('weronika', 'weronika', 'k_czytelnia_kubek', 'Mój wieczór. Herbata wystygła już dwa razy.'),
      choose('weronika', [
        opt('Niech pani nie siedzi za długo. Jest ciemno i pusto.', [W('Jeszcze kwadrans. Lubię tę ciszę.')], { trust: { weronika: 1 } }),
        opt('Kubek z odpryskiem to klasyka bibliotek.', [W('Ma dwadzieścia lat. Pan Adam przywiózł mi go z jakiegoś festynu. Nie wyrzucę.')])
      ]),
      pause(2500),
      W('W szafce stoi jeszcze jeden kubek. Z festynu w 1996 roku. Ostatniego, na którym był Tomek.'),
      W('Miał czerwoną czapkę z daszkiem i cały dzień biegał za kamerą z kablówki. Krzyczał do mnie: „Wera, chodź, jest zimno!”. A był sierpień.'),
      W('Nie wiem, czemu pamiętam akurat to.'),
      pause(6000)
    ]),
    clock('2026-12-20T21:58'),
    ambient('dark'),
    /* Zdjęcie, którego sekundę temu nie było: konto wrzuca okno czytelni, w środku Weronika. */
    scene('scOkno', [
      notify({ app: 'browser', title: 'Klipo', text: '@archiwum.rybickiego dodał zdjęcie', sound: 'notif' }),
      pause(1200),
      scare('s3_okno', 'photo', { img: 'k_okno', ms: 2200 }),
      give('ev_k_okno')
    ]),
    W('Czy {Pan|Pani} to widzi?'),
    W('To okno czytelni. Siedzę dokładnie tak jak na zdjęciu. Nawet kubek stoi w tym samym miejscu.', { wording: 'To czytelnia. To ja przy biurku. Kubka jeszcze nie odstawiłam, on nadal tu stoi.' }),
    W('Zgasiłam światło. Nie widzę nikogo na ulicy.', { wording: 'Zgasiłam światło. Przez szybę nic teraz nie widzę. Nie chcę podchodzić bliżej.' }),
    choose('weronika', [
      opt('Proszę zamknąć drzwi na klucz i zadzwonić na 112. Zostaję z panią na czacie.', [W('Dzwonię.'), pause(6000), W('Przyjadą. Mówią, żebym nie wychodziła.')], { set: { k_police: true }, trust: { weronika: 1 } }),
      opt('Proszę wyjść tylnym wyjściem i iść do sąsiadów. Pudło zostawić.', [W('Pudła nie zostawię. Zabieram je.'), W('Idę do pani Grażyny obok.')], { set: { k_boxMoved: true } })
    ]),
    pause(3000),
    W('Zdjęcie zniknęło. Wisiało sześć minut.'),
    scene('xGrupaOkno', [
      pause(2000),
      say('group', 'ola', 'Ktoś wrzucił zdjęcie okna czytelni. Z panią Weroniką w środku. Ona jest bezpieczna?'),
      say('group', 'bartek', 'jak sie dowiem kto to robi to'),
      say('group', 'ola', 'Bartek. Nie.'),
      typing('group', 'kuba', 3000),
      pause(1500),
      choose('group', [
        opt('Jest bezpieczna. Nie róbcie nic na własną rękę.', [say('group', 'bartek', 'ok ok. tylko mowie')]),
        opt('Napiszcie do niej jutro. Dzisiaj dajcie jej spokój.', [say('group', 'ola', 'Dobrze. Jutro przyjdę do niej z ciastem.', { wording: 'Ok. Napiszę rano, czy chce, żebym przyszła.' })])
      ])
    ]),
    pause(4000),
    clock('2026-12-20T22:31'),
    unlock('chat:archiwum'),
    /* Głos zmarłego w wiadomości prywatnej. Konto zna mój profil. */
    scene('scGlos', [
      scare('s3_glos', 'glitch'),
      say('archiwum', 'archiwum', 'voice:0:12|głos z nagrania|„…tego nie cytujemy. To tylko dla mnie, żebym pamiętał.”'),
      give('ev_k_dm')
    ]),
    pause(4000),
    A('w pudle tego nie znajdziesz'),
    pause(3000),
    K('pani weronika ok? widziałem to z oknem'),
    K('ktoś wrzucił screena na grupę mglisko zanim zniknęło'),
    choose('kuba', [
      opt('Podeślesz tego screena z grupy?', [K('jasne. poszukam posta'), pause(4000), K('nie ma. sylwia usunęła. sorry')], { set: { k_noticedWindow: true } }),
      opt('Odpisała mi. Jest cała.', [K('dobrze. dobrze')])
    ]),
    pause(2500),
    iff('flag:k_requestLog', [W('Formularz do Nimbusa wysłany. Numer zgłoszenia N-4471-2026. Czekamy.')]),
    pause(1500),
    set('k_ch1Done'),
    end('k2')
  ];
});
