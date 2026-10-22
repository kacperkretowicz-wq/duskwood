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
    K('nie wiem kim jest ta dziewczyna. w komentarzach już lecą nazwiska'),
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
    M('i posłuchaj 0:12. on mówi „dziesięć lat minęło”. czyli rozmowa jest z 2019, nie z 2009. wtedy już nie nosił magnetofonu'),
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
    M('czyli szukamy nagrań z telefonu. może pani Ewa wie, gdzie je trzymał'),
    pause(2500),
    W('Dobry wieczór. Przepraszam, że tak późno.'),
    W('Dzwoniła do mnie pani Ewa, żona pana Adama. Ktoś jej wysłał ten klip. Płakała. Nie mogłam jej zrozumieć.'),
    W('Powiedziała tylko, że to jest „z telefonu Adama” i że ona „nawet nie wie, jak to się wyłącza”.'),
    choose('weronika', [
      opt('Czy mogę do niej napisać? Tylko jeśli się zgodzi.', [W('Zapytam ją rano. Dziś niech już śpi.')], { set: { k_askEwa: true } }),
      opt('Niech pani do niej jutro zadzwoni. Ja poczekam.', [W('Dobrze. Pani Ewa nie lubi obcych numerów.')])
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
    E('niech {pan|pani} to zatrzyma. ludzie tu mieszkaja'),
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
    K('napisałbym do niego. ale co mam napisać'),
    choose('kuba', [
      opt('Prawda o stodole to jedno. Spray na bramie to drugie.', [K('no'), K('on to szoruje a ludzie dalej wrzucają link')], { set: { k_kubaTruthTalk: true } }),
      opt('Trzymaj się z daleka od komentarzy, dobrze?', [K('spoko. i tak mam nockę dzisiaj')])
    ]),
    pause(2000),
    end('k1')
  ];
});

Engine.chapter('k1', { num: 1, kicker: 'Sprawa 3 · Rozdział 1', title: 'Chmura', when: 'Sobota, 19 grudnia · 21:30', mood: 'tense' }, D => {
  const { say, pic, pause, choose, opt, waitFor, goal, give, unlock, set, iff, end, title, clock, notify, ambient, typing, scene, scare, run } = D;
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const M = (t, o) => say('maja2', 'maja', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);
  const I = (t, o) => say('igor', 'igor', t, o);
  const g = (who, t, o) => say('group', who, t, o);
  const A = (t, o) => say('archiwum', 'archiwum', t, o);

  return [
    clock('2026-12-19T21:30'),
    title(),
    I('hej. maja mi przesłała klip'),
    I('po samym klipie nie powiem, czym to nagrano. klipo i tak kompresuje dźwięk'),
    I('ale powiadomienie w tle to dźwięk z systemu telefonu. nie z dyktafonu'),
    I('i zanim ktoś zapyta: nie. ja tego nie robię'),
    I('wiem, jak to brzmi po szklarzu'),
    choose('igor', [
      opt('Nie {pytałem|pytałam}. Ale dzięki, że mówisz wprost.', [I('bartek zapytał. na grupie. dwa razy')], { trust: { igor: 1 } }),
      opt('Gdzie byłeś wczoraj wieczorem?', [I('w serwisie do 22. mam kasę fiskalną i dwóch klientów. możesz sprawdzić'), I('rozumiem, że pytasz')], { set: { k_askedIgorAlibi: true } })
    ]),
    I('jeśli nagrywał telefonem, mógł mieć kopię w nimbusie. telefony robią to same, w nocy, na ładowarce. jak ktoś tego nie wyłączył'),
    I('wtedy ktoś, kto wszedł na konto, mógł to stamtąd pobrać. trzeba sprawdzić, co tam w ogóle było'),
    pause(3000),
    W('Pani Ewa zgodziła się, żebym w jej imieniu zapytała Nimbus o konto męża. Jest formularz dla rodzin osób zmarłych.'),
    W('Potrzebny akt zgonu i moje upoważnienie. Odpowiedź do 14 dni roboczych.'),
    W('Czternaście dni. A on wrzuca co kilka godzin.'),
    choose('weronika', [
      opt('Proszę wysłać od razu. I poprosić o historię logowań, nie o treść.', [W('Dobrze. „Historia aktywności konta”. Tak to się nazywa w formularzu.')], { set: { k_requestLog: true } }),
      opt('Proszę też poprosić o zablokowanie konta. Nawet jeśli stracimy ślad.', [W('Wpiszę oba. Niech zdecydują, co szybciej.')], { set: { k_requestLog: true, k_requestLock: true } })
    ]),
    pause(4000),
    clock('2026-12-20T03:11'),
    ambient('dark'),
    notify({ app: 'browser', title: 'Klipo', text: '@archiwum.rybickiego dodał nowy klip', sound: 'notif', open: { page: 'tt_archiwum' } }),
    set('k_clip5'),
    pause(1500),
    /* Kuba „pisze…” o 03:11 i nic nie wysyła. Nie straszak — zapowiedź. */
    typing('kuba', 'kuba', 6000),
    pause(2500),
    typing('kuba', 'kuba', 2500),
    pause(5000),
    clock('2026-12-20T09:20'),
    ambient('calm'),
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
    M('serio, „a i tak wrzucam”. jakby wrzucał zdjęcie kolacji'),
    pause(5000),
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
    W('To okno czytelni. Siedzę dokładnie tak jak na zdjęciu. Nawet kubek stoi w tym samym miejscu.'),
    W('Zgasiłam światło. Nie widzę nikogo na ulicy.'),
    choose('weronika', [
      opt('Proszę zamknąć drzwi na klucz i zadzwonić na 112. Zostaję z panią na czacie.', [W('Dzwonię.'), pause(6000), W('Przyjadą. Mówią, żebym nie wychodziła.')], { set: { k_police: true }, trust: { weronika: 1 } }),
      opt('Proszę wyjść tylnym wyjściem i iść do sąsiadów. Pudło zostawić.', [W('Pudła nie zostawię. Zabieram je.'), W('Idę do pani Grażyny obok.')], { set: { k_boxMoved: true } })
    ]),
    pause(3000),
    W('Zdjęcie zniknęło. Wisiało sześć minut.'),
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
