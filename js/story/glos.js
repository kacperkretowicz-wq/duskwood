'use strict';
/* Sprawa nr 5 „Twoim głosem” (docs/SPRAWA-5-PLAN.md). Siedem dni marca 2027.
   Głosy mają źródła: kasety, klipy, nagrane rozmowy. Bez zjawisk nadprzyrodzonych. */

const GlosCast = D => {
  const { say } = D;
  return {
    M: (t, o) => say('maja2', 'maja', t, o),
    K: (t, o) => say('kuba', 'kuba', t, o),
    O: (t, o) => say('ola', 'ola', t, o),
    I: (t, o) => say('igor', 'igor', t, o),
    W: (t, o) => say('weronika', 'weronika', t, o),
    S: (t, o) => say('sylwia', 'sylwia', t, o),
    Nt: (t, o) => say('natan', 'natan', t, o),
    Z: (t, o) => say('zenon', 'zenon', t, o),
    Id: (t, o) => say('ida', 'ida', t, o),
    Os: (t, o) => say('oskar', 'oskar', t, o),
    Mr: (t, o) => say('marta', 'marta', t, o),
    Gr: (who, t, o) => say('group', who, t, o),
    Bt: t => say('blysk3', 'blysk3', t, { vanish: true }),
    c: (who, t) => say('call', who, t),
    V: (chat, who, dur, text, from = '') => say(chat, who, `voice:${dur}|${from}|${text}`)
  };
};

/* ---------- g0 · 2:14 ---------- */
Engine.chapter('g0', { num: 0, kicker: 'Sprawa 5 · Prolog', title: '2:14', when: 'Niedziela, 14 marca · 19:40', mood: 'calm' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, notify, ambient, scene, scare, callIn, callEnd, unlock, typing, sys } = D;
  const { M, K, O, I, W, S, Z, Id, Gr, c, V } = GlosCast(D);
  return [
    clock('2027-03-14T19:40'),
    ambient('calm'),
    title(),
    set('g_started'),
    unlock('chat:maja2', 'chat:kuba', 'chat:bartek', 'chat:ola', 'chat:igor', 'chat:weronika', 'chat:sylwia', 'chat:group'),
    /* Echo zakończenia S4: kto pisze pierwszy. */
    scene('xStartS4', [
      iff(s => s.vars.s4Ending === 'przewiniecie', [
        unlock('chat:ida'),
        Id('hej. dziadek pyta, czy wpadniesz kiedyś na sernik. mówi, że „{ten pan|ta pani} od telefonu” musi spróbować'),
        Id('pies też pyta. tzn. merda jak mówię twoje imię'),
        choose('ida', [
          opt('Wpadnę. Powiedz psu, że przyniosę coś dobrego.', [Id('powiem. on rozumie słowo „dobrego” lepiej niż ja')], { trust: { ida: 1 } }),
          opt('Jak się trzymasz?', [Id('lepiej. pracuję w piekarni na rynku od 5 rano. nikt tam nie ogląda klipo o tej porze')])
        ])
      ]),
      iff(s => s.vars.s4Ending === 'transmisja', [
        unlock('chat:zenon'),
        Z('Dobry wieczór. Napis na drzwiach zamalowałem wczoraj. Farbą, którą dał mi sąsiad.'),
        Z('Ida dzwoni co niedzielę z Bielawy. Krótko. Pies poznaje jej głos w słuchawce.')
      ]),
      iff(s => s.vars.s4Ending === 'kopia2', [
        M('ej. sylwia znowu skasowała pytanie o „całą kronikę”. trzeci raz w tym miesiącu'),
        M('nie wiem czemu, ale jak to czytam, to myślę o tobie. sorry. głupie')
      ])
    ]),
    pause(2500),
    M('roztopy. pół miasta to błoto. kuba wrócił ze spaceru i wygląda jak po biegu przez okopy'),
    M('a jutro ma oddać wniosek o stypendium i od godziny szuka zaświadczenia z dziekanatu'),
    choose('maja2', [
      opt('Niech sprawdzi w mailu. Tam zawsze jest.', [M('było w spamie xD powiedział, że to „wina dziekanatu”')]),
      opt('Pomóc mu?', [M('nie. niech się męczy. to buduje charakter. tak mówi mama')])
    ]),
    scene('xNiedziela', [
      pause(3000),
      say('bartek', 'bartek', 'zobacz co zrobilem z ojcem przez weekend'),
      pic('bartek', 'bartek', 'g_kostka', 'jodelka. ojciec mowil ze nie dam rady. dalem'),
      choose('bartek', [
        opt('Równo jak w katalogu.', [say('bartek', 'bartek', 'poziomica nie klamie. plecy tez nie. bola mnie')], { trust: { bartek: 1 } }),
        opt('Teraz cała ulica będzie chciała.', [say('bartek', 'bartek', 'juz sasiad pytal. powiedzialem ze biore 50 zl za metr i piwo')])
      ]),
      pause(3000),
      O('Mam wiadomość!!'),
      pic('ola', 'ola', 'g_ola_umowa', 'Umowa na stałe. W świetlicy. Na stałe!! 💚'),
      O('Dyrektorka powiedziała, że „po styczniu nikt nie miał wątpliwości”. Prawie się popłakałam przy dzieciach.'),
      choose('ola', [
        opt('Zasłużyłaś. Bardziej niż ktokolwiek.', [O('Dziękuję. Bez was bym tam w styczniu nie wróciła.')], { trust: { ola: 1 } }),
        opt('To trzeba uczcić. Ciasto na zdjęciu jest dla mnie?', [O('Było. Dzieci zjadły w trzy minuty. Upiekę drugie 😄')])
      ])
    ]),
    scene('xGrupaNiedziela', [
      pause(2500),
      Gr('ola', 'W sobotę u mnie? Mama robi pizzę, ja robię sernik.'),
      Gr('bartek', 'jestem. przyniose plecy w worku'),
      Gr('kuba', 'jestem jak oddam ten wniosek. czyli może'),
      Gr('kuba', 'maja mówi, że przyprowadzi mnie za ucho. czyli jestem'),
      choose('group', [
        opt('Jestem. Kupuję napoje.', [Gr('ola', 'Super! Tylko nie te niebieskie, po których się nie śpi.')]),
        opt('A Igor?', [Gr('igor', 'jestem. tylko po 18. w sobotę mam klientkę z telefonem, który „sam się wyłączył w zupie”')])
      ])
    ]),
    scene('xSylwiaOstrzega', [
      pause(3000),
      S('Dobry wieczór. Piszę do kilku osób z grupy, bo nie wiem, co z tym zrobić.'),
      S('Pani Krysia spod siódemki dostała wczoraj telefon od „wnuczka”. Głos jak jego. Prosił o kod do przelewu, bo „miał wypadek”.'),
      S('Na szczęście wnuczek siedział u niej w kuchni. Ale ona mówi, że gdyby był w Anglii, dałaby wszystko.'),
      choose('sylwia', [
        opt('Niech pani przypnie ostrzeżenie: zawsze oddzwaniać na znany numer.', [S('Przypinam. Krótko i dużymi literami, bo inaczej nikt nie przeczyta.')], { set: { g_sylwiaPin: true } }),
        opt('Może ktoś inny ma podobny głos do jej wnuczka?', [S('Pani Krysia mówi, że nie. Że nawet tak samo kaszlał.')])
      ])
    ]),
    pause(3000),
    I('wiesz że oskar, mój praktykant, mówi na mnie „szefie”? czuję się jak w serialu'),
    I('dziś wyczyścił dziewięć telefonów do sprzedaży. ja w jego wieku nie umiałem wyczyścić butów'),
    choose('igor', [
      opt('„Szefie” brzmi dumnie.', [I('brzmi jak „starszy pan”. ale ok')]),
      opt('Pilnujesz, co on z nich zgrywa?', [I('a co ma zgrywać. kasuje i tyle. dobry dzieciak')], { set: { g_askedOskar: true } })
    ]),
    pause(3000),
    W('Dobry wieczór. Kiermasz w czytelni się udał. Zebraliśmy na nowy czajnik i dwa regały.'),
    W('Ktoś oddał pudło starych kaset wideo. Odesłałam je do archiwum gminy. Tam teraz wszystko digitalizują.'),
    choose('weronika', [
      opt('Czajnik to najważniejszy sprzęt w bibliotece.', [W('Zdecydowanie. Bez niego nikt by nie przychodził na spotkania.')]),
      opt('Kto tam digitalizuje?', [W('Pani Marta Jasińska. Bardzo dokładna. Dzwoni, żeby podziękować za każdą kasetę.')], { set: { g_martaArch: true } })
    ]),
    pause(4000),
    clock('2027-03-14T23:12'),
    M('idę spać. jutro rano kolokwium z anatomii. zapamiętałam 3 kości na 206'),
    M('dobranoc 🌙'),
    pause(5000),
    ambient('dark'),
    clock('2027-03-15T02:20'),
    /* Pobudka: Kuba dzwoni w nocy. */
    callIn('kuba'),
    c('kuba', 'śpisz? sorry. obudziłem cię?'),
    c('kuba', 'maja do mnie przyszła do pokoju. cała biała. dostała od ciebie głosówkę'),
    c('kuba', 'o 2:14. że ma przyjść pod hutę. sama. i nie mówić mi'),
    choose('call', [
      opt('Kuba, ja spał{em|am}. Niczego nie wysyłał{em|am}.', [c('kuba', 'wiem jak to brzmi. ale to twój głos. słyszałem')]),
      opt('Pod hutę? Maja nigdzie nie wychodzi. Słyszysz?', [c('kuba', 'nie wychodzi. siedzi u mnie na łóżku. ale to twój głos, rozumiesz?')])
    ]),
    c('kuba', 'wysłała ci to. zobacz sam{|a}'),
    callEnd(),
    pause(1500),
    M('to przyszło na błysku. z konta z twoim imieniem i twoim zdjęciem'),
    V('maja2', 'maja', '0:07', 'No, Maja. Przyjdź pod hutę. Sama. Nie mów Kubie.', '%name%'),
    M('to twoje „no”. tak zaczynasz zdania, jak dzwonisz'),
    give('ev_g_glosowka'),
    choose('maja2', [
      opt('To nie ja. Przysięgam. Ktoś podrobił mój głos.', [M('wiem, że da się to zrobić. widziałam filmiki'), M('ale wiesz, jak to jest usłyszeć znajomy głos w nocy?')], { set: { g_toldFake: true } }),
      opt('Zadzwoń do mnie. Usłyszysz, że to inny głos.', [M('nie. nie chcę teraz słyszeć twojego głosu. sorry'), M('to przez ten głos siedzę na łóżku kuby w kurtce')])
    ]),
    pause(2000),
    M('zrobiłam zrzut profilu, zanim zniknął'),
    M('nazwa jak twoja. zdjęcie z twojego kwartału, z lata, przy jeziorze'),
    M('co tu jest nie tak? bo ja już nie myślę'),
    choose('maja2', [
      opt('Konto ma 16 minut. Założone o 1:58, a głosówka jest z 2:14.', [M('o kurde. faktycznie. „dołączył dziś”'), M('czyli ktoś je założył tylko po to, żeby wysłać mi to jedno nagranie')], { set: { g_profileFast: true } }),
      opt('Moje zdjęcie z lata jest publiczne. Każdy mógł je wziąć.', [M('no tak. pół miasta ma twoje zdjęcie'), M('to nic nie mówi. tylko że to ktoś, kto cię zna z neta')]),
      opt('Nazwa ma kropkę. Ja zawsze piszę bez kropki.', [M('serio? nie znam twojego loginu na pamięć'), M('ok. czyli nie ty. albo ty z kropką. sorry, głupio mi')])
    ]),
    give('ev_g_profil'),
    iff('flag:g_profileFast', [M('dobra. trochę mi lżej. ktoś to zrobił w nocy, specjalnie')]),
    pause(2500),
    /* Kuba sprawdza hutę. */
    K('idę tam'),
    K('pod hutę. zobaczę kto czeka na maję'),
    choose('kuba', [
      opt('Nie idź sam. Dzwoń na 112, jeśli kogoś zobaczysz.', [K('mam latarkę i nogi. i telefon na 112'), K('bartek mi nie odbiera, śpi jak kamień')], { set: { g_kubaWarned: true } }),
      opt('Kuba, to może być pułapka na ciebie, nie na Maję.', [K('może. ale jak nie pójdę, to nie zasnę do rana'), K('idę. piszę co minutę')])
    ]),
    typing('kuba', 'kuba', 4000),
    K('jestem na moście. mgła jak mleko'),
    pause(3000),
    K('błoto po kostki. ktoś tu był przede mną. świeże ślady'),
    pause(3500),
    clock('2027-03-15T02:51'),
    pic('kuba', 'kuba', 'g_huta_czapka', 'na bramie wisi to'),
    K('czerwona czapka. dziecięca. mokra'),
    K('nikogo. brama zamknięta na łańcuch'),
    give('ev_g_czapka'),
    choose('kuba', [
      opt('Nie dotykaj jej. Zrób jeszcze zdjęcie śladów i wracaj.', [K('zrobiłem. buty jak moje, 43 może. wracam')], { set: { g_kubaPrints: true } }),
      opt('Ktoś zgubił czapkę. Wracaj do domu, Kuba.', [K('w marcu, w nocy, na bramie huty. jasne'), K('wracam')])
    ]),
    scene('xWeraNiespi', [
      pause(3000),
      iff('flag:g_kubaPrints', [K('w domu. maja zasnęła u mnie na łóżku. ja śpię na podłodze. jak w dzieciństwie')], [K('w domu. maja zasnęła u mnie. ja na podłodze')])
    ]),
    pause(4000),
    clock('2027-03-15T03:03'),
    scene('scTwojGlos', [scare('s5_ty', 'call', { name: 'Maja', ms: 6000, listen: 3500 })]),
    M('{dzwoniłeś|dzwoniłaś} do mnie?? teraz??'),
    M('telefon zadzwonił z nieznanego. odebrałam, bo myślałam, że to kuba z dołu'),
    M('ktoś się zaśmiał. twoim śmiechem'),
    choose('maja2', [
      opt('Nie {dzwoniłem|dzwoniłam}. Śpij przy Kubie. Rano wszystko sprawdzimy.', [M('wyciszam telefon. jutro tylko tekstem, ok?'), M('i wymyśl coś, po czym poznam, że to ty')], { set: { g_haslNeeded: true } }),
      opt('Nagraj następną rozmowę, jeśli zadzwoni. Potrzebujemy dowodu.', [M('nie będę tego nagrywać. nie chcę tego słyszeć drugi raz'), M('jutro tylko tekstem. i wymyśl coś, po czym poznam, że to ty')], { set: { g_haslNeeded: true } })
    ]),
    set('g_night1'),
    end('g1')
  ];
});
