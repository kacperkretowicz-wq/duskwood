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

/* Hasło rodzinne: trzy warianty, ten sam krok w różnych miejscach. */
const GlosHaslo = (D, mk) => [
  D.iff('flag:g_hasloP', mk('pachołek')),
  D.iff('flag:g_hasloJ', mk('jodełka')),
  D.iff('flag:g_hasloK', mk('trzy kości'))
];

/* ---------- g1 · Hasło ---------- */
Engine.chapter('g1', { num: 1, kicker: 'Sprawa 5 · Rozdział 1', title: 'Hasło', when: 'Poniedziałek, 15 marca · 7:50', mood: 'calm' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, notify, ambient, scene, callIn, callEnd, unlock, typing, nearby, vanish } = D;
  const { M, K, O, I, W, S, Nt, Gr, c, V } = GlosCast(D);
  return [
    clock('2027-03-15T07:50'),
    ambient('calm'),
    title(),
    M('dzień dobry. piszę, nie dzwonię. tak jak mówiłam'),
    M('spałam 3 godziny. kolokwium o 9. czuję się jak ten szkielet z atlasu'),
    M('zanim cokolwiek. potrzebujemy słowa. takiego, które znamy tylko my. jak ktoś zadzwoni twoim głosem, zapytam o nie'),
    choose('maja2', [
      opt('„Pachołek”. Jak czapka bałwana z ferii.', [M('xD idealne. nikt normalny nie wpadnie na pachołek')], { set: { g_hasloP: true } }),
      opt('„Jodełka”. Jak kostka Bartka.', [M('ok. bartek by się wzruszył. ale mu nie mówimy')], { set: { g_hasloJ: true } }),
      opt('„Trzy kości”. Tyle zapamiętałaś na anatomię.', [M('bardzo śmieszne. ale dobre. nikt tego nie zgadnie, bo to wstyd')], { set: { g_hasloK: true } })
    ]),
    ...GlosHaslo(D, w => [M(`zapisane w głowie. „${w}”. nigdzie już tego nie piszemy, nawet tutaj`)]),
    set('g_haslo'),
    M('idę. trzymaj kciuki'),
    scene('xRanoGrupa', [
      pause(3000),
      Gr('bartek', 'ktos mi wyslal na kwartale ze „%name% robi jakies dziwne glosowki”. co jest'),
      Gr('ola', 'Do mnie też ktoś napisał. Konto bez zdjęcia. Zablokowałam.'),
      Gr('kuba', 'w nocy ktoś wysłał mai głosówkę głosem %name%. to nie był{|a} on{|a}'),
      Gr('igor', 'klonowanie głosu. dziś to apka za 20 zł. wystarczy 30 sekund nagrania'),
      choose('group', [
        opt('To nie ja. Jak dostaniecie coś „ode mnie”, oddzwońcie na mój zwykły numer.', [Gr('ola', 'Jasne. I nie odbieramy nieznanych numerów w nocy.'), Gr('bartek', 'ok. ale jak mi zaspiewasz to wiem ze to nie ty xd')], { set: { g_groupTold: true } }),
        opt('Igor, skąd ktoś mógł mieć 30 sekund mojego głosu?', [Gr('igor', 'głosówki, filmiki, nagrane rozmowy. każdy coś zostawia'), Gr('igor', 'pomyśl, komu ostatnio długo coś mówił{eś|aś} do telefonu')], { set: { g_whereVoice: true } })
      ])
    ]),
    pause(3500),
    clock('2027-03-15T10:42'),
    pic('maja2', 'maja', 'g_maja_korytarz', 'po. nie pytaj. kość udowa to jedyna, której byłam pewna'),
    choose('maja2', [
      opt('Wyglądasz jak ktoś, kto zdał.', [M('wyglądam jak ktoś, kto nie spał. ale miło')], { trust: { maja: 1 } }),
      opt('Idź spać. Serio.', [M('mam jeszcze ćwiczenia. potem śpię do jutra')])
    ]),
    /* Trzy głosówki do Kuby: tylko jedna jest od Mai. */
    scene('xTrzyGlosy', [
      pause(3000),
      K('ej. pomocy'),
      K('dostałem trzy głosówki „od mai” w ciągu minuty. dwie z nowych kont na błysku, jedna z jej numeru'),
      K('tylko że numer też można podrobić. słuchaj'),
      V('kuba', 'kuba', '0:06', 'Kubuś, przyjdź po mnie pod hutę. Szybko. [cisza w tle, idealnie czysto]', 'od mai?'),
      V('kuba', 'kuba', '0:08', 'Kuba, napisz do %name%, że wiem, że to nie on{|a}. Dobra? [w tle dzwonek na przerwę, ktoś woła „Maja, idziesz?”]', 'od mai?'),
      V('kuba', 'kuba', '0:05', 'Hej. Weź zabierz mi ładowarkę z pokoju. Przyjdź pod hutę. [w tle szum, jakby wiatr]', 'od mai?'),
      K('która jest prawdziwa?'),
      choose('kuba', [
        opt('Druga. Słychać dzwonek i ktoś woła ją po imieniu. Ona jest teraz na uczelni.', [K('kurde. faktycznie. jest po kolokwium'), K('i nigdy nie mówi do mnie „kubuś”. nigdy. tylko mama tak mówi')], { set: { g_voiceFast: true } }),
        opt('Trzecia. Ładowarka to coś, o co zawsze cię prosi.', [K('zawsze. ale pod hutę? po ładowarkę?'), K('nie wiem. zapytam ją o hasło. tylko że go nie znam')]),
        opt('Pierwsza. Najczystszy dźwięk, pewnie z jej numeru.', [K('czysty, bo nie ma żadnego tła. jak z apki'), K('ok. sprawdzę inaczej. napiszę do niej coś, co wie tylko ona')])
      ]),
      iff('flag:g_voiceFast', [K('napisałem do niej. odpisała „druga, debilu”. czyli żyjemy')], [
        pause(2500),
        K('napisałem do niej. odpisała, że wysłała tylko jedną. drugą. z korytarza'),
        K('czyli dwie z trzech to klony. w ciągu minuty. ktoś się bawi')
      ]),
      set('g_threeVoices')
    ]),
    scene('xSylwiaPanika', [
      pause(3000),
      S('Grupa „Mglisko — co się dzieje” wariuje. Od rana siedem zgłoszeń.'),
      S('Pan Stach dostał telefon od „syna z Holandii”. Pani Gienia od „pani z gminy”, że ma zapłacić za wywóz śmieci kodem.'),
      S('I jeszcze jedno. Ktoś wkleił głosówkę z %name% w nazwie. Usunęłam, ale ludzie pytają, czy to {pan|pani}.'),
      choose('sylwia', [
        opt('To nie ja. Ktoś podszywa się pode mnie. Mogę napisać sprostowanie.', [S('Proszę. Wkleję je i przypnę. Krótko, bez nazwisk.')], { set: { g_sprostowanie: true } }),
        opt('Niech pani nikogo nie oskarża w grupie. Nawet mnie.', [S('Staram się. Ale ludzie są przestraszeni. Wolą mieć winnego niż nie mieć nikogo.')])
      ]),
      iff('flag:g_sprostowanie', [S('Przypięte. Trzy serduszka i jeden komentarz „a skąd mamy wiedzieć, że to pisze {prawdziwy pan|prawdziwa pani}?”. No właśnie.')])
    ]),
    pause(3500),
    clock('2027-03-15T13:05'),
    unlock('chat:natan'),
    Nt('hej. dawno. mam dziwna sprawe'),
    Nt('w piatek dzwonila do mnie mama. prosila zebym „odpuscil sobie ten most”. ze to stara sprawa i ze sie boi o mnie'),
    Nt('tylko ze mama w piatek o 19 byla na zumbie. telefon miala w szafce. sprawdzilem z jej trenerka'),
    choose('natan', [
      opt('Ktoś sklonował głos twojej mamy. Tak samo jak mój.', [Nt('twoj? kurde'), Nt('czyli to nie jest zwykla szajka na wnuczka. ktos dzwoni do ludzi od mostu')], { set: { g_natanLink: true } }),
      opt('Jaki most? Ten z 2011?', [Nt('ten. w kwietniu rusza proces. pisze o tym od stycznia'), Nt('i nagle mama prosi, zebym przestal. jej glosem')])
    ]),
    Nt('sprawdze, czy ktos jeszcze ze swiadkow dostal takie telefony. dam znac'),
    scene('xIgorEcho', [
      pause(3000),
      I('sprawdziłem jak to działa. ściągnąłem tę apkę. echo. nagrałem się 30 sekund'),
      V('igor', 'igor', '0:04', 'Kocham brokuły i oglądam seriale o ślubach.', 'Echo · Igor'),
      I('to nie ja. to apka moim głosem. słyszysz to „k”? ja tak nie mówię. ale mama by się nabrała'),
      choose('igor', [
        opt('Przerażające. I trochę śmieszne.', [I('bardziej przerażające. usuwam apkę i konto. i wszystkie nagrania')]),
        opt('Czego apka potrzebuje oprócz nagrania?', [I('niczego. nagranie i tekst. żadnego dowodu, że to twój głos'), I('regulamin mówi „nie używaj cudzego głosu”. no to już wszyscy przestrzegają')], { set: { g_echoKnown: true } })
      ])
    ]),
    pause(3000),
    O('Dzieci w świetlicy dziś bawiły się w „głuchy telefon”. Na końcu wyszło „kot ma kalosze”. Zaczynało się od „mama robi pierogi”.'),
    O('Pomyślałam o tobie. Sorry, to chyba nie było śmieszne.'),
    choose('ola', [
      opt('Było. Trochę. Dzięki.', [O('Uff. Przynajmniej dzieci się śmiały.')]),
      opt('Dokładnie tak to działa. Każdy coś przekręca.', [O('Tylko że tu ktoś przekręca specjalnie.')])
    ]),
    pause(4000),
    clock('2027-03-15T18:47'),
    ambient('dark'),
    /* Przystanek: ktoś przesyła ci twoje własne zdjęcie. */
    scene('xPrzystanek', [
      M('jestem w domu. śpię godzinę i wstaję na serial. kuba gotuje makaron. wszystko ok'),
      pause(3500),
      nearby('g_przystanek', { device: 'Telefon', img: 'g_przystanek', note: 'Nieznane urządzenie w pobliżu', flag: 'g_przystOk', declineFlag: 'g_przystNo', ev: 'ev_g_przystanek' }),
      iff('flag:g_przystOk', [
        M('czekaj. to ty? na przystanku przy szkole?'),
        M('ktoś stał po drugiej stronie ulicy i robił ci zdjęcie. kiedy?'),
        choose('maja2', [
          opt('Teraz. Wracam z miasta. Nikogo nie widzę.', [M('idź do sklepu. tam, gdzie są ludzie. i pisz do mnie')], { set: { g_przystNow: true } }),
          opt('Nie wiem. Odrzuć wszystko, co przyjdzie z „Telefonu”.', [M('już. odrzucam wszystko. nawet przesyłanie od kuby')])
        ])
      ], [
        M('kuba mówi, że jego telefon też coś chciał przesłać. od „Telefonu”. odrzucił'),
        M('ty też odrzucaj. nie wiadomo, co tam jest')
      ])
    ]),
    pause(3000),
    W('Dobry wieczór. Pani Marta z archiwum zadzwoniła z podziękowaniem za kasety z kiermaszu.'),
    W('Powiedziała, że jedna jest z festynu w 1996 roku i że mogę przyjść i obejrzeć, jeśli chcę.'),
    choose('weronika', [
      opt('Pójdzie pani?', [W('Nie wiem. Tomek tam może być. Nie wiem, czy chcę go zobaczyć na ekranie.')], { set: { g_weraFestyn: true } }),
      opt('To miłe, że dzwoni osobiście.', [W('Bardzo. Dziś mało kto dzwoni. Wszyscy piszą.')])
    ]),
    pause(4000),
    clock('2027-03-15T23:31'),
    typing('weronika', 'weronika', 5000),
    W('Przepraszam, że tak późno.'),
    W('Ktoś do mnie dzwonił. Odebrałam, bo numer był z Mgliska.'),
    W('To było dziecko.'),
    set('g_day1'),
    end('g2')
  ];
});

/* ---------- g2 · Wera ---------- */
Engine.chapter('g2', { num: 2, kicker: 'Sprawa 5 · Rozdział 2', title: 'Wera', when: 'Poniedziałek, 15 marca · 23:33', mood: 'tense' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, notify, ambient, scene, scare, callIn, callEnd, unlock, typing, vanish } = D;
  const { M, K, O, I, W, S, Nt, Z, Id, Mr, Gr, Bt, c, V } = GlosCast(D);
  return [
    clock('2027-03-15T23:33'),
    ambient('dark'),
    title(),
    W('Powiedział: „Wera, to ja. Jest mi zimno”.'),
    W('Tak mówił do mnie tylko Tomek. Nikt inny nie mówił „Wera”. Nawet mama.'),
    W('Od grudnia nagrywam wszystkie rozmowy. Po tamtych telefonach. Nagrało się.'),
    V('weronika', 'weronika', '0:11', 'Wera, to ja. Jest mi zimno. Wera? [szum, jakby z daleka; na końcu krótki trzask]', 'Rozmowa · 23:24'),
    choose('weronika', [
      opt('Pani Weroniko, to nie jest Tomek. Ktoś zrobił to z jakiegoś nagrania.', [W('Wiem. Głowa wie. Ale ręce mi się trzęsą tak, że nie mogę utrzymać kubka.')], { set: { g_weraTold: true } }),
      opt('Czy mogę do pani zadzwonić? Teraz?', [W('Tak. Proszę.')], { set: { g_weraCall: true } })
    ]),
    callIn('weronika'),
    c('weronika', 'Dziękuję. Musiałam usłyszeć kogoś prawdziwego.'),
    c('weronika', 'On by miał teraz trzydzieści osiem lat. A w słuchawce był mały. Taki, jakim go pamiętam.'),
    c('weronika', 'Ktoś wiedział, jak do mnie mówił. Skąd ktoś to wie?'),
    choose('call', [
      opt('Z jakiegoś starego nagrania. Może z kroniki kablówki.', [c('weronika', 'Z kroniki… Pan Zenon kręcił festyny od dziewięćdziesiątego szóstego.'), c('weronika', 'Tomek wszędzie pchał się przed kamerę.')], { set: { g_weraKronika: true } }),
      opt('Nie wiem. Ale się dowiem. Obiecuję.', [c('weronika', 'Niech {Pan|Pani} nie obiecuje. Proszę tylko szukać.')])
    ]),
    c('weronika', 'Pójdę spać. Zostawię światło w przedpokoju. Dobranoc.'),
    callEnd(),
    pause(3000),
    clock('2027-03-16T00:12'),
    unlock('chat:blysk3'),
    notify({ app: 'messages', title: 'Błysk', text: '%name% wysyła ci wiadomość. Zniknie po przeczytaniu.', sound: 'notif', open: { chat: 'blysk3' } }),
    Bt('no. słyszysz siebie?'),
    Bt('ładnie mówisz. tylko za dużo'),
    choose('blysk3', [
      opt('Zrób zrzut ekranu', [Bt('rób. twoje zdjęcie, twoje imię. kto ci uwierzy, że to nie ty'), vanish('blysk3', 'Wiadomości zniknęły po przeczytaniu.')], { shot: true, set: { g_shotBlysk: true } }),
      opt('Kim jesteś?', [Bt('tobą'), vanish('blysk3', 'Wiadomości zniknęły po przeczytaniu.')])
    ]),
    pause(4000),
    clock('2027-03-16T08:10'),
    ambient('calm'),
    M('dzień dobry. test'),
    M('jakie hasło?'),
    choose('maja2', [
      opt('Pachołek.', [M('ok. to ty. dzień dobry naprawdę')], { cond: 'flag:g_hasloP' }),
      opt('Jodełka.', [M('ok. to ty. dzień dobry naprawdę')], { cond: 'flag:g_hasloJ' }),
      opt('Trzy kości.', [M('ok. to ty. i nadal mnie to boli')], { cond: 'flag:g_hasloK' }),
      opt('Serio? Przecież piszę, nie dzwonię.', [M('wiem. ale chcę się przyzwyczaić. dzień dobry')])
    ]),
    M('kolokwium zdane. na 3. kość udowa uratowała mi życie'),
    M('a kuba oddał wniosek. 20 minut przed końcem. jak zawsze'),
    scene('xKubaRano', [
      pause(3000),
      K('wniosek złożony. pani w dziekanacie powiedziała „no proszę, pan Wrona na czas”. nie wiem czy to był żart'),
      K('a te ślady pod hutą. 43. bartek mówi, że to rozmiar „pół mgliska”'),
      choose('kuba', [
        opt('Czyli nic nie wiemy. Ale ktoś czekał tam na Maję.', [K('albo chciał, żeby ktoś przyszedł. ktokolwiek. ja przyszedłem')]),
        opt('Brawo za wniosek. Serio.', [K('dzięki. mama upiekła ciasto. jakby mnie przyjęli na studia na księżycu')])
      ])
    ]),
    scene('xBartekMama', [
      pause(3000),
      say('bartek', 'bartek', 'stary'),
      say('bartek', 'bartek', 'mama dostala wczoraj telefon ODE MNIE. ze mialem stluczke i potrzebuje kodu na 3 tysiace'),
      say('bartek', 'bartek', 'siedzialem obok niej na kanapie. jadlem kanapke. pokazala mi telefon i sie trzesla'),
      choose('bartek', [
        opt('Dobrze, że siedziałeś obok. Powiedz jej o haśle rodzinnym.', [say('bartek', 'bartek', 'juz mamy. nie powiem jakie. ale dotyczy kapusty')], { set: { g_bartekHaslo: true } }),
        opt('Skąd ktoś ma twój głos?', [say('bartek', 'bartek', 'z klipo. wrzucam filmiki z budowy. jak klade kostke i gadam'), say('bartek', 'bartek', '40 filmikow. kurde')])
      ])
    ]),
    pause(3500),
    clock('2027-03-16T11:20'),
    W('Dzień dobry. Spałam trzy godziny, ale spałam.'),
    W('Wyjęłam album. Nie wiem po co. Może po to, żeby sprawdzić, czy dobrze pamiętam.'),
    pic('weronika', 'weronika', 'g_tomek_album', 'Festyn, sierpień 1996. Tomek i ja. Ta trwała to niestety też ja.'),
    W('Miał tę czapkę cały tamten rok. Spał w niej.'),
    give('ev_g_album'),
    choose('weronika', [
      opt('Czapka z huty jest nowa. Kolor nie wyblakł, a minęło trzydzieści lat. Ktoś ją kupił, żeby wyglądała jak ta.', [W('Czyli ktoś widział to zdjęcie. Albo nagranie.'), W('Ktoś przygotował się do tego jak do przedstawienia.')], { set: { g_capNew: true } }),
      opt('Z boku stoi kamera z kablem. To kamera kablówki?', [W('Tak. Pan Zenon. Kręcił cały festyn. Tomek chodził za nim jak cień.'), W('Czyli on nagrał też jego głos.')], { set: { g_camLink: true } }),
      opt('To ta sama czapka co na bramie huty?', [W('To nie może być ta sama. Tomek miał ją na sobie… wtedy.'), W('Przepraszam. Muszę chwilę odejść od telefonu.'), pause(4000), W('Już. Wróciłam.')])
    ]),
    iff('flag:g_capNew', [W('Pan Zenon na pewno wie, co jest na tej kasecie. Zapytam go.')]),
    scene('xZenon', [
      pause(3000),
      unlock('chat:zenon'),
      Z('{Szanowny Panie|Szanowna Pani}, dzwoniła do mnie pani Weronika. Pytała o festyn z 1996 roku.'),
      Z('Kręciłem go nową kamerą, pierwszy raz. Pamiętam, bo chłopiec w czerwonej czapce cały dzień chciał nią nagrywać.'),
      iff(s => s.vars.s4Ending === 'przewiniecie', [Z('Kaseta jest w archiwum gminy, razem z innymi. Oddaliśmy je z Idą w lutym.')], [Z('Po styczniu oddałem wszystkie kasety do archiwum gminy. Nie chciałem ich już mieć w domu.')]),
      Z('Tam ich pilnuje pani Jasińska. Bardzo porządna osoba.'),
      choose('zenon', [
        opt('Czy ktoś jeszcze ma kopię tego festynu?', [Z('Nigdy go nie wydawałem. Nie był ciekawy dla nikogo oprócz rodzin. Kopii nie robiłem.')], { set: { g_noCopy96: true } }),
        opt('Dziękuję, panie Zenonie. Jak pan się czuje?', [Z('Dziękuję, dobrze. Pies przybrał na wadze. Weterynarz mnie skrzyczał.')])
      ])
    ]),
    iff(s => s.vars.s4Ending === 'przewiniecie', [
      pause(2000),
      Id('dziadek mówi, że pytasz o festyn 96. to była jego pierwsza kamera. japońska, ważyła z pięć kilo. opowiada o niej jak o dziecku'),
      Id('sorry. z tamtym telefonem w styczniu. wiesz, że go nagrywałam. ten telefon już oddałam do czyszczenia. igorowi'),
      choose('ida', [
        opt('Igorowi? Kiedy?', [Id('w lutym. kupiłam nowy, stary chciałam sprzedać. oskar go czyścił')], { set: { g_idaPhone: true } }),
        opt('Nie przepraszaj. Dobrze, że mówisz.', [Id('mówię, bo się boję. tam były wszystkie moje nagrania')], { set: { g_idaPhone: true } })
      ])
    ]),
    scene('xGrupaWtorek', [
      pause(3000),
      Gr('ola', 'Pani Krysia przyniosła do świetlicy ciasto i powiedziała, że teraz z wnuczkiem mają hasło. Nie zdradziła jakie.'),
      Gr('bartek', 'u nas kapusta. ups'),
      Gr('ola', 'Bartek 😂'),
      Gr('igor', 'zmień od razu. ja mam z mamą słowo z czasów jak miałem 5 lat. nikt go nie zna, bo jest obrzydliwe'),
      choose('group', [
        opt('Dobrze, że to się rozchodzi. Hasło działa lepiej niż blokowanie numerów.', [Gr('ola', 'Zrobię w świetlicy kartkę dla rodziców. Dużymi literami.')], { set: { g_olaKartka: true } }),
        opt('Bartek, zmieniasz hasło. Teraz.', [Gr('bartek', 'zmienione. teraz jest… nie powiem xd')])
      ])
    ]),
    pause(3500),
    clock('2027-03-16T15:40'),
    Nt('mam drugiego. pan henryk wisniewski'),
    Nt('w sobote dzwonila do niego corka. ze ma nie zeznawac w kwietniu, bo „ktos mu zrobi krzywde”. plakala'),
    Nt('corka byla wtedy na dyzurze w szpitalu we wroclawiu. telefon w szafce'),
    choose('natan', [
      opt('Twoja mama, córka pana Henryka. Wszyscy ze sprawy mostu. To nie są przypadkowe telefony.', [Nt('wlasnie. oszustwa na kase to przykrywka. albo przy okazji'), Nt('ktos chce, zeby swiadkowie sie wycofali')], { set: { g_mostMotive: true } }),
      opt('Pan Henryk dobrze się czuje?', [Nt('siedzi w domu i nie odbiera od nikogo oprocz mnie. i to po trzecim sygnale')])
    ]),
    scene('xMarta', [
      pause(3000),
      unlock('chat:marta'),
      Mr('Dzień dobry. Tu Marta Jasińska, archiwum gminy. Pani Weronika dała mi {Pana|Pani} numer.'),
      Mr('Mówiła, że pyta {Pan|Pani} o festyn z 1996 roku. Mamy tę kasetę, jest już zgrana.'),
      Mr('Jeśli to pomoże, mogę jutro pokazać nagranie w pracowni. Wolę na miejscu niż mailem, z szacunku dla rodziny.'),
      choose('marta', [
        opt('Dziękuję. Przyjdę z panią Weroniką.', [Mr('Dobrze. Zrobię herbatę. Od dziesiątej jestem na miejscu.')], { set: { g_martaVisit: true } }),
        opt('Czy ktoś jeszcze oglądał tę kasetę?', [Mr('Nie. Jest w kolejce do opisu. Klucz do pracowni mam tylko ja.'), Mr('Dlatego jestem spokojna.')], { set: { g_martaKey: true } })
      ])
    ]),
    pause(3500),
    clock('2027-03-16T21:15'),
    ambient('dark'),
    O('Kartka dla rodziców wisi. „Ustalcie z dziećmi hasło”. Dzieci od razu wymyśliły swoje. Jedno brzmi „dinozaur w kaloszach”.'),
    M('idę spać wcześnie. kuba ogląda mecz i krzyczy na telewizor. normalny wieczór'),
    M('dobranoc. bez telefonów w nocy, proszę'),
    pause(5000),
    clock('2027-03-16T23:47'),
    W('Znowu dzwonił.'),
    W('Nie odebrałam. Zostawił wiadomość głosową.'),
    V('weronika', 'weronika', '0:06', 'Wera, czemu nie odbierasz? Jest mi zimno. [szum; w tle coś cicho piszczy i trzaska, jakby ktoś przewijał]', 'Poczta głosowa · 23:46'),
    scene('scWera', [scare('s5_wera', 'face', { img: 'g_tomek_album', caption: 'Festyn · sierpień 1996' })]),
    choose('weronika', [
      opt('Proszę wyłączyć telefon do rana. Jutro idziemy razem do archiwum.', [W('Wyłączam. Do jutra.')], { set: { g_weraOff: true } }),
      opt('Proszę mi przesłać tę wiadomość. Każdą. Zbieram je.', [W('Przesłałam. I wyłączam telefon.')], { set: { g_weraVoices: true } })
    ]),
    set('g_day2'),
    end('g3')
  ];
});
