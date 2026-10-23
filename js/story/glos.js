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
      opt('Kto tam digitalizuje?', [W('Pani Marta Jasińska. Ta z gazety, z jesieni. Teraz pracuje u nas w gminie. Bardzo dokładna. Dzwoni, żeby podziękować za każdą kasetę.')], { set: { g_martaArch: true } })
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
    M('pod nazwą szarym drobnym: „na Błysku od 1:58”'),
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
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, notify, ambient, scene, callIn, callEnd, unlock, typing, nearby, vanish, me } = D;
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
        me('maja2', 'Ktoś mi właśnie przesłał przez przesyłanie w pobliżu zdjęcie. Mnie. Na przystanku.'),
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
      Mr('Dzień dobry. Tu Marta Jasińska. Dawno nie pisałam. Od lutego pracuję w archiwum gminy, przy kasetach pana Zenona.'),
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

/* ---------- g3 · Twój głos ---------- */
Engine.chapter('g3', { num: 3, kicker: 'Sprawa 5 · Rozdział 3', title: 'Twój głos', when: 'Środa, 17 marca · 9:40', mood: 'tense' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, notify, ambient, scene, scare, callIn, callEnd, unlock, typing, vanish } = D;
  const { M, K, O, I, W, S, Nt, Z, Mr, Gr, c, V } = GlosCast(D);
  return [
    clock('2027-03-17T09:40'),
    ambient('calm'),
    title(),
    W('Dzień dobry. Spałam z wyłączonym telefonem. Pierwszy raz od lat.'),
    W('Idę do archiwum na dziesiątą. Wzięłam ciasto, bo z pustymi rękami nie wypada.'),
    choose('weronika', [
      opt('Proszę pisać mi wszystko na bieżąco. Jestem przy telefonie.', [W('Będę pisać. Wolniej niż młodzi, ale będę.')]),
      opt('Jakie ciasto?', [W('Drożdżowe ze śliwkami. Z zamrażarki. Pani Marta nie musi wiedzieć.')])
    ]),
    scene('xRanoMaja', [
      pause(3000),
      M('rano. hasło. wiem, wiem. przyzwyczajam się'),
      ...GlosHaslo(D, w => [choose('maja2', [opt(`${w[0].toUpperCase()}${w.slice(1)}.`, [M('dzięki. dziś mam zajęcia do 15. potem pomagam mamie z oknami')])])]),
      M('kuba mówi, że w nocy ktoś dzwonił na domowy. nikt nie odebrał. mama wyciągnęła kabel'),
      M('jak w latach 90. domowy bez kabla'),
      choose('maja2', [
        opt('Dobrze zrobiła. Nikt ważny nie dzwoni na domowy w nocy.', [M('nikt w ogóle nie dzwoni na domowy. tylko ankiety i babcia')]),
        opt('Ktoś dzwonił na domowy? Czyli ma też wasz stary numer.', [M('jest w książce telefonicznej od zawsze. wrona, mglisko. każdy go ma')])
      ])
    ]),
    pause(3500),
    clock('2027-03-17T10:25'),
    pic('weronika', 'weronika', 'g_pracownia', 'Tu pracuje pani Marta. Wszystko podpisane i poukładane. Lepiej niż u mnie w czytelni.'),
    W('Zaparzyła herbatę. Ciasto bardzo chwaliła.'),
    Mr('Dzień dobry. Pani Weronika jest u mnie. Pokazuję jej fragment nagrania z festynu, a ona pozwoliła przesłać go także {Panu|Pani}.'),
    unlock('chat:marta'),
    say('marta', 'marta', '', { vid: 'assets/video/v_festyn96.mp4', img: 'v_festyn96' }),
    Mr('Fragment z 17 sierpnia 1996 roku, kaseta nr 12. Dźwięk jest słaby, ale słychać. Chłopiec woła: „Wera, chodź, jest zimno!”.'),
    Mr('Pani Weronika mówi, że był wtedy upał. Pewnie się z nią droczył.'),
    give('ev_g_festyn96'),
    W('Płaczę. Ale dobrze. Pierwszy raz od lat widzę go, jak się rusza.'),
    choose('marta', [
      opt('W telefonie mówił „Wera, to ja. Jest mi zimno”. Tych słów nie ma na kasecie. Ktoś zrobił z jego głosu nowe zdania.', [Mr('Ma {Pan|Pani} rację. Na całej kasecie Tomek mówi może osiem słów. Sprawdzałam.'), Mr('Ktoś musiał mieć ten fragment, żeby nauczyć program jego głosu.')], { set: { g_cloneFromTape: true } }),
      opt('Na zdjęciu z pracowni są trzy kubki. A były panie we dwie.', [Mr('Trzeci jest mój. Zawsze piję z dwóch kubków naraz: z jednego herbatę, z drugiego wodę. Taki nawyk.'), Mr('Ale dziękuję, że {Pan|Pani} patrzy tak uważnie.')], { set: { g_threeMugs: true } }),
      opt('Czy ta kaseta była kiedyś pokazywana publicznie?', [Mr('Nie. Pan Zenon nigdy jej nie wydawał. Była w szafie razem z innymi z 1996 roku.')])
    ]),
    Mr('Gdyby {Pan|Pani} czegoś potrzebował{|a}, proszę pisać. Wolę wiedzieć więcej niż mniej.'),
    scene('xIgorOskar', [
      pause(3000),
      I('oskar dziś nie przyszedł. pierwszy raz od lutego'),
      I('nie odbiera. napisał tylko „chory”. bez emotki. on zawsze daje emotki'),
      choose('igor', [
        opt('Ida mówiła, że w lutym oddała ci stary telefon. Oskar go czyścił.', [I('możliwe. przez serwis przechodzi 30 telefonów tygodniowo'), I('sprawdzę w zeszycie. zapisuję każdy')], { cond: 'flag:g_idaPhone', set: { g_igorCheck: true } }),
        opt('Może naprawdę jest chory.', [I('może. marzec, pół technikum kaszle')]),
        opt('Sprawdź, które telefony czyścił w lutym.', [I('mam zeszyt. sprawdzę wieczorem. nie strasz mnie')], { set: { g_igorCheck: true } })
      ])
    ]),
    pause(3000),
    clock('2027-03-17T13:10'),
    Nt('trzeci swiadek. pani jadwiga z kiosku przy moscie. dzwonil do niej „ksiadz z parafii”. ze dla spokoju duszy ma nie zeznawac'),
    Nt('ksiadz byl wtedy na rekolekcjach w gorach. bez zasiegu'),
    Nt('pisze artykul. „glosy przed rozprawa”. chce ich ostrzec wszystkich naraz'),
    choose('natan', [
      opt('Napisz. Ale bez nazwisk świadków. Ktoś może to wykorzystać.', [Nt('jasne. bez nazwisk, bez adresow. tylko mechanizm i haslo rodzinne')], { set: { g_natanArticle: true } }),
      opt('Poczekaj. Jak napiszesz, ten ktoś się schowa.', [Nt('a jak nie napisze, to ktos sie wycofa z zeznan. nie mam czasu czekac'), Nt('ale ok. dwa dni. nie wiecej')], { set: { g_natanWait: true } })
    ]),
    scene('xGrupaSroda', [
      pause(3000),
      Gr('bartek', 'sasiad chce kostke. 30 metrow. biore kube do pomocy'),
      Gr('kuba', 'nikt mnie nie pytał'),
      Gr('bartek', 'pytam teraz. 50 zl za dzien i obiad u mojej mamy. ona robi schabowe jak z reklamy'),
      Gr('kuba', 'ok. sprzedałem się za schabowego'),
      Gr('ola', 'Jestem z was dumna. Przynajmniej ktoś w tym mieście robi coś normalnego.'),
      choose('group', [
        opt('Bartek, Kuba, zróbcie zdjęcie po pierwszym dniu. Muszę zobaczyć, jak Kuba trzyma młotek.', [Gr('kuba', 'trzymam go jak długopis. zobaczysz')]),
        opt('Uważajcie na siebie wieczorem. Nie chodźcie sami po ciemku.', [Gr('bartek', 'nie strasz. ale ok. chodzimy w dwojke')])
      ])
    ]),
    pause(3000),
    O('Dziecko w świetlicy zapytało mnie, czy telefon może mówić głosem zmarłej babci. Bo babcia „dzwoniła” do jego mamy.'),
    O('Nie wiedziałam, co powiedzieć. Powiedziałam, że to był ktoś zły, a nie babcia.'),
    choose('ola', [
      opt('Dobrze powiedziałaś. Prosto i prawdziwie.', [O('Mam nadzieję. Jego mama płakała w szatni. Przytuliłam ją, choć ledwo ją znam.')], { trust: { ola: 1 } }),
      opt('Ktoś dzwoni głosem zmarłych? Do kogo jeszcze?', [O('Nie wiem. Ale ta mama to córka pana od kiosku przy moście. Tak mi się wydaje.')], { set: { g_olaMost: true } })
    ]),
    pause(3500),
    clock('2027-03-17T19:52'),
    ambient('dark'),
    I('zeszyt. 9 lutego. „Ida G., telefon do wyczyszczenia i sprzedaży”. podpis oskara'),
    I('sprzedany 12 lutego. komu, nie wpisał. on zawsze wpisuje'),
    iff('flag:g_igorCheck', [I('dobrze, że kazał{eś|aś} mi sprawdzić. jutro z nim pogadam. twarzą w twarz')]),
    pause(4000),
    clock('2027-03-17T21:34'),
    /* Dzwoni ktoś twoim głosem. Do ciebie. */
    callIn('unknown'),
    c('unknown', 'no. cześć'),
    c('unknown', 'to ja. znaczy ty'),
    c('unknown', 'ładnie mówisz, jak się denerwujesz. szybciej. połykasz końcówki'),
    choose('call', [
      opt('Jakie jest hasło?', [c('unknown', '…'), c('unknown', 'dobre pytanie. zapytaj jutro maję, czy zna moje')], { set: { g_askedHaslo: true } }),
      opt('Czego chcesz?', [c('unknown', 'pogadać. ze sobą. rzadko mam okazję')]),
      opt('Nagrywam tę rozmowę.', [c('unknown', 'ja też. zawsze. dzięki za nowe próbki')], { set: { g_recordedCall: true } })
    ]),
    c('unknown', 'i przestań pytać o kasety. i o most. ty masz dużo nagrań w mieście. ja mam twoje'),
    c('unknown', 'dobranoc. śpij spokojnie. ja za ciebie pogadam'),
    callEnd(),
    scene('scSmiech', [scare('s5_smiech', 'glitch')]),
    give('ev_g_telefon'),
    pause(2500),
    M('kuba mówi, że coś się stało. dlaczego nie piszesz'),
    M('jakie hasło?'),
    choose('maja2', [
      opt('Pachołek. Dzwonił do mnie ktoś moim głosem.', [M('kurde. ok. to ty')], { cond: 'flag:g_hasloP' }),
      opt('Jodełka. Dzwonił do mnie ktoś moim głosem.', [M('kurde. ok. to ty')], { cond: 'flag:g_hasloJ' }),
      opt('Trzy kości. Dzwonił do mnie ktoś moim głosem.', [M('kurde. ok. to ty')], { cond: 'flag:g_hasloK' })
    ]),
    M('co mówił?'),
    choose('maja2', [
      opt('Że mam przestać pytać o kasety i most. I że ma nagrania mojego głosu.', [M('czyli to ktoś, kto wie, czym się zajmujesz od kilku dni'), M('to nie jest jakaś szajka z neta. to ktoś stąd')], { set: { g_local: true } }),
      opt('Nieważne. Ważne, że nie zna hasła.', [M('ważne. ale chcę wiedzieć. jutro mi powiesz. wszystko')])
    ]),
    pause(3000),
    K('siedzę przy mai. mama zamknęła drzwi na dwa zamki. pierwszy raz od lat'),
    K('jutro idę z bartkiem kłaść kostkę. nie wiem czy dam radę. ale pójdę. muszę coś robić rękami'),
    choose('kuba', [
      opt('Idź. Normalne rzeczy pomagają.', [K('wiem. tak mówiła pani psycholog w styczniu')]),
      opt('Zostań z Mają, jeśli trzeba.', [K('mama z nią będzie. maja mówi, że nie potrzebuje niańki. potrzebuje')])
    ]),
    pause(4000),
    clock('2027-03-17T23:58'),
    W('Nie dzwonił dziś. Tomek. To znaczy… ten ktoś.'),
    W('Oglądam ten fragment z archiwum co godzinę. Pani Marta mówi, że mogę przyjść jeszcze raz w piątek.'),
    W('Dobranoc. Niech {Pan|Pani} też śpi.'),
    set('g_day3'),
    end('g4')
  ];
});

/* ---------- g4 · Serwis ---------- */
Engine.chapter('g4', { num: 4, kicker: 'Sprawa 5 · Rozdział 4', title: 'Serwis', when: 'Czwartek, 18 marca · 9:15', mood: 'tense' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, notify, ambient, scene, scare, callIn, callEnd, unlock, typing, nearby, rename } = D;
  const { M, K, O, I, W, S, Nt, Os, Gr, c, V } = GlosCast(D);
  return [
    clock('2027-03-18T09:15'),
    ambient('calm'),
    title(),
    I('oskar przyszedł. blady. siedzi na zapleczu i nie patrzy mi w oczy'),
    I('zapytałem o telefon idy. powiedział, że „nic złego nie zrobił”. czyli zrobił'),
    I('dam mu twój numer. niech sam ci powie. mnie się wstydzi bardziej niż policji'),
    choose('igor', [
      opt('Dobrze. Powiedz mu, że nie będę krzyczeć.', [I('powiem. on ma 17 lat. ja w jego wieku też robiłem głupoty. tylko mniejsze')], { set: { g_oskarSoft: true } }),
      opt('Najpierw niech wszystko zapisze. Daty, kwoty, komu.', [I('dobra. daję mu kartkę i długopis. jak w szkole')], { set: { g_oskarList: true } })
    ]),
    pause(3000),
    unlock('chat:oskar'),
    set('g_oskarNamed'),
    Os('dzień dobry. tu oskar. od igora'),
    Os('sorry, że tak. nie wiem, jak zacząć 😬'),
    Os('ja nie kasowałem od razu. zgrywałem pamięć na dysk. tak na wszelki wypadek. żeby jak klient się rozmyśli, to miał zdjęcia'),
    Os('a potem na błysku ktoś napisał, że kupi „paczki z telefonów z mgliska”. 50 zł za telefon. za jeden dał 300'),
    choose('oskar', [
      opt('Za który dał 300?', [Os('za telefon idy. pytał o niego konkretnie. wiedział, że był w serwisie'), Os('to mnie powinno wkurzyć. a ja się ucieszyłem, że 300 😔')], { set: { g_oskar300: true } }),
      opt('Ile telefonów sprzedałeś?', [Os('jedenaście. w lutym i marcu'), Os('najdroższy był telefon idy. 300. pytał o niego konkretnie')], { set: { g_oskar300: true } })
    ]),
    Os('i jeszcze jedno. przed wysłaniem paczki kazał mi wyciąć z nagrań czyste kawałki głosu. po 30 sekund. pokazał jak'),
    Os('mam jeszcze trzy, które wyciąłem z nagrań idy. wszystkie to ty. sorry. serio sorry'),
    /* Trzy próbki twojego głosu: skąd każda pochodzi. */
    scene('xTrzyProbki', [
      V('oskar', 'oskar', '0:30', 'Halo… No, Ida, posłuchaj mnie… [w tle szum telewizora, ktoś chrapie, pies wzdycha]', 'próbka 1'),
      V('oskar', 'oskar', '0:30', 'No, nie rozłączaj się, proszę… [w tle trzask drzwi i kroki na klatce schodowej]', 'próbka 2'),
      V('oskar', 'oskar', '0:30', 'No dobra, ja już kończę, ale… [w tle wiatr i przejeżdżający autobus]', 'próbka 3'),
      Os('która jest z czego? ja tylko ciąłem. nie słuchałem'),
      choose('oskar', [
        opt('Pierwsza. Telewizor, chrapanie i pies. To moja rozmowa z Idą o 20:58 w styczniu. Pan Zenon spał obok.', [Os('kurde. ida nagrywała tę rozmowę. nagranie było w jej folderze „styczeń”'), Os('czyli on ma twój głos z tamtego wieczoru. cały')], { set: { g_sourceIda: true } }),
        opt('Druga. Klatka schodowa. To z nocy, kiedy ktoś przesłał mi zdjęcie z klatki.', [Os('nie. tamtej nocy nikt z tobą nie rozmawiał przez telefon'), Os('w jej folderze były tylko rozmowy z jej telefonu')]),
        opt('Trzecia. Wiatr i autobus. Nagrał{em|am} głosówkę na przystanku.', [Os('głosówki też były. ale ja wycinałem tylko z rozmów. tak kazał')])
      ]),
      iff('flag:g_sourceIda', [], [pause(2000), Os('sprawdziłem nazwy plików. wszystkie trzy są z jednej rozmowy. 22 stycznia, 20:58'), Os('ida w trakcie wyszła z pokoju. słychać drzwi, klatkę, a na końcu ulicę. pewnie nie chciała budzić dziadka')]),
      give('ev_g_probki')
    ]),
    Os('ja nie wiedziałem, że tak można. tzn. wiedziałem. ale myślałem, że on robi memy 😶'),
    choose('oskar', [
      opt('Masz z nim jakąś wiadomość, numer, cokolwiek?', [Os('konto „pd_audio”. usunął je wczoraj. ale mam zrzut z przelewu. nadawca: P. Dudek'), Os('igor mówi, że to ten od mostu')], { set: { g_dudekNamed: true } }),
      opt('Powiesz to wszystko policji?', [Os('mama mnie zawiezie po południu. ona już wie. płakała. ja też'), Os('mam zrzut z przelewu. nazwisko: P. Dudek')], { set: { g_dudekNamed: true, g_oskarPolice: true } })
    ]),
    give('ev_g_dudek'),
    scene('xKubaKostka', [
      pause(3500),
      clock('2027-03-18T12:40'),
      pic('kuba', 'kuba', 'g_kuba_kostka', 'pierwszy dzień. bartek mówi, że młotek trzymam jak długopis. kłamie. jak widelec'),
      K('i ręce mam z betonu. ale fajnie. nie myślę'),
      choose('kuba', [
        opt('Jak widelec, potwierdzam. Ale kostka równa.', [K('bartek poprawia po mnie co trzeci kamień. dyskretnie. myśli, że nie widzę')]),
        opt('Oskar sprzedał nagrania. Kupił je Paweł Dudek.', [K('dudek. ten od mostu? ten, co był pod blokiem zenona w styczniu?'), K('bartek go zna z siłowni. pytam go')], { cond: 'flag:g_dudekNamed', set: { g_kubaDudek: true } })
      ]),
      iff('flag:g_kubaDudek', [
        say('bartek', 'bartek', 'dudek. tak. mowil mi w styczniu ze „robi w glosach”. myslalem ze nagrywa reklamy do radia'),
        say('bartek', 'bartek', 'wynajmuje kawalerke nad pizzeria w dzierzoniowie. widzialem jak wchodzil z laptopem. w nocy swieci sie tam do rana')
      ])
    ]),
    pause(3000),
    clock('2027-03-18T14:05'),
    Nt('dudek. to sie zgadza. w 2011 odebral furgon z warsztatu. w listopadzie zamowil wyciecie 40 sekund u idy'),
    Nt('a teraz kupuje glosy ludzi od mostu. on dzwoni do swiadkow'),
    choose('natan', [
      opt('Zgłośmy to razem na policję. Weź ze sobą Oskara i jego mamę.', [Nt('jade do dzierzoniowa. bede z oskarem i jego mama. dam znac')], { set: { g_police: true } }),
      opt('Tylko po co mu to? Kierownik budowy nie dzwoni do świadków ot tak.', [Nt('dla kurek-bud. firma odpowiada za most. jak swiadkowie sie wycofaja, nie bedzie winnych'), Nt('ale tak, to dziwne. dudek nie jest typem, ktory pisze scenariusze rozmow')], { set: { g_whyDudek: true } })
    ]),
    scene('xSylwiaCzwartek', [
      pause(3000),
      S('W grupie ktoś napisał, że „ktoś z Dzierżoniowa” dzwoni do ludzi od mostu. Nie wiem, skąd to wie.'),
      S('Ludzie przestali pisać o {panu|pani}. Teraz piszą o mafii z Wrocławia. Wolę już to.'),
      choose('sylwia', [
        opt('Niech pani pilnuje, żeby nikt nie podawał nazwisk. Policja już działa.', [S('Pilnuję. Usunęłam już trzy adresy dzisiaj. Jak w styczniu.')]),
        opt('Dziękuję, że pani mnie broniła.', [S('Nie broniłam. Po prostu nie wierzyłam w bzdury. To co innego.')])
      ])
    ]),
    pause(3000),
    O('Pani od kiosku przy moście przyszła po wnuczka do świetlicy. Pytała, czy ja też „słyszę głosy w telefonie”.'),
    O('Powiedziałam jej o haśle. Zapisała je sobie na ręce długopisem. Potem się zorientowała i zmyła 😅'),
    choose('ola', [
      opt('Najlepsza rada dnia: nie zapisuj hasła na ręce.', [O('Też tak powiedziałam. Śmiałyśmy się obie. Pierwszy raz od tygodnia, mówiła.')]),
      opt('Dobrze, że przyszła do ciebie.', [O('Ludzie przychodzą do świetlicy po dzieci i zostają pogadać. Lubię to.')], { trust: { ola: 1 } })
    ]),
    scene('xWeraCzwartek', [
      pause(3000),
      W('Byłam dziś na cmentarzu. Pierwszy raz od listopada. Zaniosłam Tomkowi znicz i powiedziałam mu, że ktoś używa jego głosu.'),
      W('Wiem, że to głupie. Ale ulżyło mi.'),
      choose('weronika', [
        opt('To nie jest głupie. Dobrze, że pani poszła.', [W('Pani Grażyna poszła ze mną. Trzymała mnie pod rękę jak starszą panią. Bo jestem.')], { trust: { weronika: 1 } }),
        opt('Policja zajmuje się już człowiekiem, który dzwonił.', [W('Dobrze. Ale ja chcę wiedzieć, kto mu dał Tomka. Ta kaseta nie leżała na ulicy.')], { set: { g_weraWho: true } })
      ])
    ]),
    pause(3500),
    clock('2027-03-18T18:30'),
    iff('flag:g_police', [Nt('zlozylismy zawiadomienie. oskar opowiedzial wszystko. policjant zapisal i powiedzial „glosy, no tak, teraz wszystko jest mozliwe”'), Nt('maja jutro jechac do dudka')], [Nt('oskar z mama zlozyli zawiadomienie. policja jutro jedzie do dudka')]),
    M('jutro mają go zatrzymać? serio?'),
    M('kuba mówi, że się cieszy. a ja się boję jeszcze bardziej. jak ktoś się boi, że go złapią, to robi głupie rzeczy'),
    choose('maja2', [
      opt('Dziś nie wychodźcie z domu. Ja też zostaję w domu.', [M('mama robi naleśniki. nikt nie wychodzi. nawet pies sąsiadów nie szczeka')]),
      opt('Jutro będzie po wszystkim. Obiecuję, że to się kończy.', [M('nie obiecuj. ostatnio jak ktoś mi obiecał, to dzwonił potem twoim głosem')])
    ]),
    pause(3500),
    clock('2027-03-18T22:17'),
    ambient('dark'),
    nearby('g_serwis', { device: 'Telefon', img: 'g_serwis_noc', note: 'Nieznane urządzenie w pobliżu', flag: 'g_serwisOk', declineFlag: 'g_serwisNo', ev: 'ev_g_serwis' }),
    iff('flag:g_serwisOk', [
      scene('scSerwis', [scare('s5_serwis', 'photo', { img: 'g_serwis_noc', ms: 2200 })]),
      choose('igor', [
        opt('Igor, jesteś w serwisie? Ktoś cię obserwuje z samochodu. Zamknij drzwi.', [I('jestem. kończę płytę główną dla klientki'), I('zgasiłem światło. nikogo nie widzę. tylko samochód z wyłączonymi światłami po drugiej stronie'), I('odjechał. teraz. jak tylko zgasiłem'), I('dzwonię na 112. nie wychodzę')], { set: { g_igorSafe: true } }),
        opt('Igor, wyjdź tylnym wyjściem i idź do domu.', [I('serio? ok. wychodzę. zostawiam światło, niech myśli, że jestem'), I('w domu. drzwi na klucz. dzięki')], { set: { g_igorSafe: true } })
      ])
    ], [
      I('ktoś mi chciał przesłać zdjęcie. „Telefon”. odrzuciłem'),
      I('siedzę jeszcze w serwisie. jakiś samochód stoi naprzeciwko z wyłączonymi światłami. pewnie ktoś czeka na kogoś'),
      I('dobra, zamykam. idę do domu')
    ]),
    pause(4000),
    clock('2027-03-18T23:51'),
    unlock('chat:dudek'),
    say('dudek', 'dudek', 'nie wiem kim jestes ale wiem jak brzmisz'),
    say('dudek', 'dudek', 'jutro twoja mama zadzwoni do ciebie. nie odbieraj'),
    choose('dudek', [
      opt('Nie odpisuj. Zrób zrzut i wyślij Natanowi.', [say('dudek', 'dudek', 'grzecznie')], { silent: true, set: { g_dudekShot: true } }),
      opt('Wiem, kim jesteś, Paweł.', [say('dudek', 'dudek', 'nic nie wiesz'), say('dudek', 'dudek', 'ja tylko dzwonie. ktos inny mowi co')], { set: { g_dudekSlip: true } })
    ]),
    set('g_day4'),
    end('g5')
  ];
});

/* ---------- g5 · Przewijanie ---------- */
Engine.chapter('g5', { num: 5, kicker: 'Sprawa 5 · Rozdział 5', title: 'Przewijanie', when: 'Piątek, 19 marca · 7:30', mood: 'calm' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, notify, ambient, scene, scare, callIn, callEnd, unlock, typing, me } = D;
  const { M, K, O, I, W, S, Nt, Z, Id, Os, Mr, Gr, c, V } = GlosCast(D);
  return [
    clock('2027-03-19T07:30'),
    ambient('calm'),
    title(),
    Nt('zatrzymali go. o 6:10, w kawalerce nad pizzeria'),
    Nt('laptop, dwa telefony, mikrofon. i folder „glosy”. 60 osob z mgliska i okolic. ty tez'),
    Nt('policjant mowi, ze w zyciu czegos takiego nie widzial. a widzial duzo'),
    choose('natan', [
      opt('Dzięki, Natan. Bez ciebie by tego nie było.', [Nt('bez oskara i ciebie. ja tylko jezdzilem samochodem'), Nt('i pije trzecia kawe. o 7:30')]),
      opt('Co mówi Dudek?', [Nt('nic. ma adwokata od razu. jakby czekal na to'), Nt('adwokat jest z wroclawia. drogi. skad kierownik budowy ma na takiego')], { set: { g_lawyer: true } })
    ]),
    M('ZŁAPALI GO??'),
    M('kuba skacze po kuchni. mama płacze. ja jem płatki i nie wiem, co czuję'),
    M('hasło. dla zasady'),
    ...GlosHaslo(D, w => [choose('maja2', [opt(`${w[0].toUpperCase()}${w.slice(1)}. I tak, złapali go.`, [M('dobra. to dziś pierwszy raz od tygodnia idę na zajęcia bez strachu')])])]),
    scene('xGrupaUlga', [
      pause(3000),
      Gr('bartek', 'pizza jutro aktualna? bo ja juz kupilem 4 litry coli'),
      Gr('ola', 'Aktualna! Teraz to już nawet musi być.'),
      Gr('igor', 'oskar napisał, że przeprasza wszystkich. i że odda kasę z tych telefonów. 850 zł. zbiera z kieszonkowego'),
      Gr('kuba', 'niech odda pani krysi na ciasto. ona najwięcej się wystraszyła'),
      choose('group', [
        opt('Oskar dostał nauczkę. Dajmy mu szansę.', [Gr('igor', 'dostanie. ale od teraz kasuję sam. przy nim')], { set: { g_oskarChance: true } }),
        opt('Jutro pizza. Dziś jeszcze uważajmy. Jeszcze nie wszystko wiemy.', [Gr('ola', 'Masz rację. Ale pozwól nam się chociaż trochę cieszyć 😊')])
      ])
    ]),
    pause(3000),
    S('W grupie wszyscy dziękują policji. I trochę Natanowi. O {panu|pani} nikt już nie pisze źle.'),
    S('Pani Krysia napisała: „wnuczek dzwonił naprawdę i powiedział hasło”. Dwieście serduszek.'),
    pause(3500),
    clock('2027-03-19T11:20'),
    /* Pierwsza rysa: scenariusze rozmów. */
    Nt('mam cos dziwnego. policjant pokazal mi wydruk z laptopa. scenariusze rozmow'),
    Nt('przepisuje ci jeden. dla pani weroniki:'),
    Nt('„Wera, to ja. Jest mi zimno. (pauza 2 s) Wera? — Głos: Tomek L., kaseta 12, 0:04. Uwaga: mówić wolno, dziecięco, bez «no».”'),
    Nt('i jeszcze plik ma autora w wlasciwosciach. „Pracownia_UG”'),
    give('ev_g_scenariusz'),
    choose('natan', [
      opt('„Pracownia_UG” to komputer z urzędu gminy. Z pracowni archiwum.', [Nt('kurde. masz racje. tak sie nazywaja komputery w gminie. sprawdzalem kiedys przy przetargu'), Nt('czyli scenariusz napisal ktos z gminy. nie dudek')], { set: { g_ugAuthor: true } }),
      opt('Pełne zdania, przecinki, „uwaga: mówić wolno”. Dudek tak nie pisze.', [Nt('dudek pisze jak ja. bez przecinkow i z bledami. to pisal ktos inny'), Nt('ktos bardzo dokladny')], { set: { g_commas: true } }),
      opt('„Kaseta 12, 0:04”. Ktoś znał numer kasety i sekundę.', [Nt('dokladnie. tego nie bylo w sieci. ktos to sprawdzal na oryginale')], { set: { g_kaseta12: true } })
    ]),
    iff('flag:g_dudekSlip', [Nt('i pamietasz, co ci napisal? „ja tylko dzwonie. ktos inny mowi co”. to sie zgadza')]),
    scene('xWeraSluchawki', [
      pause(3000),
      W('Odsłuchałam jeszcze raz wiadomość od „Tomka”. Na słuchawkach, które pożyczyłam od Kuby.'),
      W('Na końcu coś piszczy. Potem trzask. Jakby ktoś przewijał kasetę.'),
      W('Znam ten dźwięk. W czytelni mieliśmy kiedyś taki magnetowid.'),
      choose('weronika', [
        opt('Czyli ktoś odtwarzał oryginalną kasetę, kiedy nagrywał tę wiadomość.', [W('Na żywo. Z magnetowidu. Nie z internetu.'), W('A tej kasety nigdy nie było w internecie.')], { set: { g_liveTape: true } }),
        opt('Zapytajmy pana Zenona. On zna każdy magnetowid.', [W('Dobrze. Przesyłam mu nagranie. Jest w tym lepszy niż ktokolwiek.')])
      ]),
      W('Mam jeszcze to. Zrobiłam w środę w pracowni, jak pani Marta wkładała kasetę.'),
      pic('weronika', 'weronika', 'g_magnetowid', 'Ten sam piskliwy magnetowid. Kaseta dwunasta.'),
      give('ev_g_magnetowid')
    ]),
    pause(3000),
    Z('{Szanowny Panie|Szanowna Pani}, pani Weronika przesłała mi nagranie. Słuchałem pięć razy.'),
    Z('Ten pisk na końcu to magnetowid japoński z lat dziewięćdziesiątych. Przy przewijaniu piszczy jak czajnik. Miałem dwa takie.'),
    Z('Oba oddałem w lutym do archiwum gminy, razem z kasetami. Pani Jasińska bardzo chciała, żeby zgrywać „na oryginalnym sprzęcie”.'),
    choose('zenon', [
      opt('Czy ktoś poza panią Jasińską ma dostęp do tych magnetowidów?', [Z('Z tego, co wiem, nikt. Pracownia jest zamykana na klucz. Pani Jasińska sama mi to pokazywała, z dumą.')], { set: { g_onlyKey: true } }),
      opt('Dziękuję, panie Zenonie. Bardzo pan pomógł.', [Z('Cieszę się. Choć wolałbym, żeby moje magnetowidy służyły do czegoś lepszego.')])
    ]),
    iff(s => s.vars.s4Ending === 'przewiniecie', [
      pause(2000),
      Id('ej. dziadek mi powiedział. o pracowni'),
      Id('jak w lutym oddawaliśmy kasety, pani marta pytała, czy dziadek ma coś z mostu. z 2011'),
      Id('dziadek powiedział, że ma. kasetę z dnia po wypadku. ludzie przy barierce, wywiady'),
      Id('ona bardzo chciała tę kasetę. powiedziała, że „zabezpieczy ją przed procesem”'),
      give('ev_g_most2011')
    ], [
      pause(2000),
      Z('Jeszcze jedno. Pani Jasińska pytała, czy mam kasetę z mostu z 2011 roku. Miałem. Dzień po wypadku, ludzie przy barierce, wywiady.'),
      Z('Bardzo jej zależało. Mówiła, że „zabezpieczy ją przed procesem”. Wtedy wydało mi się to troskliwe.'),
      give('ev_g_most2011')
    ]),
    pause(3000),
    clock('2027-03-19T15:45'),
    Nt('marta jasinska. nazwisko po ojcu. corka janiny kurek z kurek-bud'),
    Nt('wiedzielismy to od listopadu. przeciek o kasecie poszedl wtedy „przez kuchnie”. a potem uznalismy, ze marta jest po naszej stronie'),
    Nt('a dudek to kierownik budowy z kurek-bud. i nagle stac go na drogiego adwokata z wroclawia. to sie sklada'),
    choose('natan', [
      opt('Marta pisze scenariusze, zgrywa głosy z kaset, Dudek tylko dzwoni. A wszystko po to, żeby świadkowie wypadku na moście się wycofali.', [Nt('i zeby pokazac, ze to „zwykla szajka na wnuczka”. przy okazji kase wyludzali, zeby policja szukala zlodziei'), Nt('kurde. tak'), Nt('ale to tylko nasze domysly. potrzebujemy dowodu. czegos z pracowni')], { set: { g_twist: true } }),
      opt('Nie mamy dowodu. Marta jest miła, pomaga. Może ktoś używa jej komputera.', [Nt('moze. ale magnetowidy i kaseta 12 sa u niej. trzeba sprawdzic, kto jeszcze ma klucz do pracowni'), Nt('jak ktos uzywa jej komputera, to ona by wiedziala')], { set: { g_twist: true, g_doubt: true } })
    ]),
    scene('xMartaPisze', [
      pause(3000),
      Mr('Dzień dobry. Słyszałam, że zatrzymali tego pana z Dzierżoniowa. Bardzo się cieszę. Pani Weronika na pewno też odetchnie.'),
      Mr('Mam jedną prośbę. Czy ma {Pan|Pani} jeszcze nagrania tych telefonów? Od pani Weroniki albo swoje?'),
      Mr('Chciałabym je zabezpieczyć w archiwum. Jako dokument. Takie rzeczy szybko giną z telefonów.'),
      choose('marta', [
        opt('Wysłał{em|am} je już policji. Kopie ma też Natan.', [Mr('Ach, tak. To dobrze. Bardzo dobrze.'), Mr('Proszę pozdrowić pana Natana.')], { set: { g_martaBluff: true } }),
        opt('Prześlę wieczorem. Dziękuję, że pani o tym pamięta.', [Mr('Dziękuję. Najlepiej wszystkie. Także te, które {Pan|Pani} sam{|a} nagrał{|a}.'), me('marta', '(5 plików audio)'), Mr('Doszły. Dziękuję. Zabezpieczę je.')], { set: { g_martaAsk: true } }),
        opt('Po co pani nagrania, skoro sprawca jest zatrzymany?', [Mr('To odruch zawodowy. Archiwista zbiera wszystko. Nie wiadomo, co się kiedyś przyda.'), Mr('Ale rozumiem, jeśli {Pan|Pani} woli ich nie przesyłać.')], { set: { g_martaQuestion: true } })
      ])
    ]),
    pause(3500),
    clock('2027-03-19T19:10'),
    ambient('dark'),
    O('Pizza jutro o 18. Mama już kupiła mąkę. Tylko proszę, niech nikt nie przynosi ananasa.'),
    K('maja kazała mi przynieść ananasa. dla zasady'),
    M('to nie dla zasady. to dla smaku'),
    choose('maja2', [
      opt('Ja przyniosę ananasa. W puszce. Dla świętego spokoju.', [M('wiedziałam, że mogę na ciebie liczyć')]),
      opt('Maja, muszę ci coś powiedzieć. To jeszcze nie koniec.', [M('wiedziałam. czułam. mów'), M('ok. czyli dudek dzwonił, a ktoś inny mu pisał. ktoś stąd. ktoś, kto ma kasety'), M('nie mów kubie dziś. niech się cieszy. jutro')], { set: { g_majaKnows: true } })
    ]),
    pause(3500),
    clock('2027-03-19T22:40'),
    W('Pani Marta zadzwoniła. Zaprosiła mnie jutro do pracowni. Mówi, że znalazła „jeszcze jeden fragment z Tomkiem”. Dłuższy.'),
    W('Mam iść o dziewiątej rano. Sama, bo „nie chce robić tłumu przy takich wspomnieniach”.'),
    choose('weronika', [
      opt('Proszę nie iść sama. Niech pani zaczeka do jutra rana, wszystko pani wyjaśnię.', [W('Dobrze. Ale nie rozumiem. Ona była dla mnie taka dobra.'), W('Zaczekam.')], { set: { g_weraWait: true } }),
      opt('Pójdzie pani z kimś? Z panią Grażyną?', [W('Może. Pani Grażyna i tak chodzi do urzędu w sobotę po zaświadczenia.')])
    ]),
    pause(4000),
    clock('2027-03-19T23:47'),
    scene('scPrzewijanie', [scare('s5_przewijanie', 'call', { name: 'Marta Jasińska', number: '694 117 302', ms: 6000, listen: 3500 })]),
    Mr('Przepraszam, że dzwoniłam tak późno. Nie odebrał{|a} {Pan|Pani}.'),
    Mr('Chciałabym jutro porozmawiać. Tylko my. Bez pani Weroniki i bez pana Natana.'),
    Mr('Myślę, że wie {Pan|Pani} już dużo. Może za dużo jak na jeden tydzień.'),
    set('g_day5'),
    end('g6')
  ];
});

/* ---------- g6 · Rozprawa ---------- */
Engine.chapter('g6', { num: 6, kicker: 'Sprawa 5 · Rozdział 6', title: 'Rozprawa', when: 'Sobota, 20 marca · 8:20', mood: 'tense' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, notify, ambient, scene, scare, callIn, callEnd, unlock, run, ending, credits, camera } = D;
  const { M, K, O, I, W, S, Nt, Z, Mr, Gr, c, V } = GlosCast(D);
  return [
    clock('2027-03-20T08:20'),
    ambient('calm'),
    title(),
    iff('flag:g_weraWait', [
      W('Dzień dobry. Nie poszłam. Siedzę w kuchni w płaszczu, jakbym miała zaraz wyjść.'),
      W('Proszę mi powiedzieć, o co chodzi. Wytrzymam.')
    ], [
      W('Dzień dobry. Pani Grażyna idzie ze mną do urzędu na dziewiątą. Ja do archiwum, ona po zaświadczenie.'),
      W('Czy coś jest nie tak? Pisał{|a} {Pan|Pani} wczoraj tak dziwnie.')
    ]),
    choose('weronika', [
      opt('To pani Marta pisała scenariusze telefonów. Głos Tomka pochodzi z jej pracowni. Proszę dziś tam nie iść.', [W('…'), W('Częstowała mnie herbatą. Patrzyła, jak płaczę nad Tomkiem.'), W('Nie pójdę. Zostaję w domu. Proszę mnie informować.')], { set: { g_weraTold2: true } }),
      opt('Jeszcze nie mogę powiedzieć. Proszę zostać w domu do południa.', [W('Dobrze. Zaufam {Panu|Pani}. Ale w południe chcę wiedzieć wszystko.')])
    ]),
    pause(3000),
    M('hasło'),
    ...GlosHaslo(D, w => [choose('maja2', [opt(`${w[0].toUpperCase()}${w.slice(1)}.`, [M('ok. natan napisał nam rano o marcie. kuba siedzi obok i milczy. to u niego najgorszy znak')])])]),
    K('marta. ta z archiwum. która w listopadzie dała ci plik z mostu'),
    K('jak mogę pomóc. serio. powiedz co mam robić'),
    choose('kuba', [
      opt('Bądź z Mają i z mamą. I idźcie wieczorem na pizzę. Normalnie.', [K('ok. normalnie. umiem to. chyba')]),
      opt('Pilnuj, żeby nikt z grupy nie pisał do Marty. Ani słowa.', [K('napiszę im. bez szczegółów. „nie piszcie do nikogo z gminy”. zrozumieją')], { set: { g_kubaGroup: true } })
    ]),
    pause(3000),
    clock('2027-03-20T09:40'),
    Nt('rozmawialem z prokuratorka od mostu. pani prokurator jest zainteresowana, ale mowi jasno: domysly to za malo'),
    Nt('potrzebuje czegos, co wiaze marte z telefonami. nagrania, w ktorym ona sama to mowi. albo dowodu z pracowni'),
    Nt('marta chce z toba gadac. to moze byc jedyna szansa'),
    choose('natan', [
      opt('Zadzwonię do niej. Nagram rozmowę. Ty bądź w pobliżu z prokuraturą.', [Nt('bede pod urzedem. z policjantem, ktory zatrzymal dudka. zgodzil sie przyjechac'), Nt('nagrywaj wszystko. i nie daj sie sprowokowac')], { set: { g_plan: true } }),
      opt('Boję się, że ona mnie przechytrzy. Pisze lepiej ode mnie.', [Nt('ona pisze scenariusze. ty umiesz pytac. to wieksza sila'), Nt('bede pod urzedem z policjantem. nagrywaj wszystko')], { set: { g_plan: true } })
    ]),
    scene('xIgorNagrywanie', [
      pause(2500),
      I('słyszałem od kuby. tylko tyle: w ustawieniach połączeń masz „nagrywaj automatycznie”. włącz. i sprawdź, czy masz miejsce w pamięci'),
      I('jak chcesz, przyjadę i posiedzę obok. oskar też chce pomóc. powiedziałem mu, że dziś pomaga, siedząc cicho'),
      choose('igor', [
        opt('Włączone. Dzięki, Igor.', [I('powodzenia. i pamiętaj: jak ona zacznie mówić twoim głosem, to się rozłącz')], { set: { g_recOn: true } }),
        opt('Przyjedź. Wolę nie być sam{|a}.', [I('jadę. biorę ładowarkę i powerbank. i herbatę od mamy')], { set: { g_recOn: true, g_igorHere: true } })
      ])
    ]),
    pause(2500),
    Nt('wyslij mi jeszcze jedno zdjecie, ktore pokazemy prokuratorce na start. jedno, najmocniejsze'),
    camera('natan', [
      opt('Z galerii: magnetowid i kaseta nr 12', [Nt('to jest dobre. ten sam sprzet, ta sama kaseta, jej pracownia'), Nt('pokaze to razem z nagraniem od pani weroniki')], { img: 'g_magnetowid', gallery: true, set: { g_strong: true } }),
      opt('Z galerii: pracownia z trzema kubkami', [Nt('ladne. ale kubki niczego nie udowodnia'), Nt('dobra. mam jeszcze wydruk scenariusza')], { img: 'g_pracownia', gallery: true }),
      opt('Z galerii: Tomek na festynie', [Nt('to jest wzruszajace. ale to zdjecie rodzinne, nie dowod'), Nt('ok. dolacze wydruk scenariusza')], { img: 'g_tomek_album', gallery: true })
    ]),
    scene('xSobotaRano', [
      pause(3000),
      O('Piekę sernik na wieczór. Mama mówi, że za dużo cukru. Ja mówię, że po takim tygodniu nie ma czegoś takiego jak za dużo cukru.'),
      Gr('bartek', 'ja kupuje cole i lod. kuba niesie ananasa. i swoje plecy, bo moje odpadly'),
      Gr('igor', 'ja przyniosę głośnik. bez głosów. tylko muzyka'),
      choose('group', [
        opt('Będę. Może trochę później.', [Gr('ola', 'Czekamy z pierwszym kawałkiem. Albo z drugim. Zależy od Bartka.')]),
        opt('Igor, sama muzyka, bez gadania. Proszę.', [Gr('igor', 'obiecuję. same kawałki instrumentalne. nawet bez refrenów')])
      ]),
      pause(2500),
      say('oskar', 'oskar', 'dzień dobry. igor mówi, że dziś ważny dzień. nie wiem jaki, ale trzymam kciuki 🤞'),
      say('oskar', 'oskar', 'i jeszcze raz sorry. oddałem pani krysi 200 zł. powiedziała, że jestem „głupi, ale dobry”. chyba lepiej niż odwrotnie'),
      choose('oskar', [
        opt('Lepiej niż odwrotnie. Trzymaj się, Oskar.', [say('oskar', 'oskar', 'dzięki. idę do serwisu. igor kazał mi dziś tylko zamiatać 🧹')], { set: { g_oskarForgiven: true } }),
        opt('Dobrze, że oddajesz. A resztę też oddasz?', [say('oskar', 'oskar', 'zbieram. do wakacji oddam wszystko. mama pilnuje')])
      ]),
      pause(2500),
      Z('{Szanowny Panie|Szanowna Pani}, pani Weronika dzwoniła. Nie powiedziała wiele, ale zrozumiałem.'),
      Z('Gdyby trzeba było zeznać, że magnetowidy i kasety są moje i że oddałem je do archiwum, zrobię to. Jestem stary, ale pamięć mam dobrą.')
    ]),
    pause(3000),
    clock('2027-03-20T11:58'),
    ambient('dark'),
    Mr('Dzień dobry. Czy możemy porozmawiać teraz? Zadzwonię.'),
    callIn('marta'),
    c('marta', 'Dzień dobry. Dziękuję, że {Pan|Pani} odebrał{|a}.'),
    c('marta', 'Wiem, że pan Natan był wczoraj na policji. I wiem, że pani Weronika nie przyszła dziś do pracowni.'),
    c('marta', 'Chcę tylko powiedzieć jedno: moja mama ma czterdzieści dziewięć lat. Od listopada całe Mglisko wie, co zrobiła. A proces może jej zabrać resztę. Most to był wypadek.'),
    c('marta', 'Jesienią pomogłam to wszystko ujawnić. Myślałam, że postępuję uczciwie. Potem patrzyłam, jak ona gaśnie.'),
    choose('call', [
      opt('Dlatego pisała pani scenariusze? Głos Tomka, mama Natana, córka pana Henryka?', [
        c('marta', '…'),
        c('marta', 'Nikomu nie stała się krzywda. To były tylko słowa. Ładnie napisane, prawda?'),
        c('marta', 'Pan Dudek miał tylko czytać. On nawet nie umiał wymówić „rekolekcje”.'),
        c('marta', 'Wszystko jest na kasetach. Wszyscy kiedyś coś powiedzieli do kamery pana Zenona. Wystarczyło słuchać.')
      ], { set: { g_confess: true } }),
      opt('Czego pani ode mnie chce?', [
        c('marta', 'Żeby {Pan|Pani} przestał{|a}. Proces i tak się odbędzie. Niech się odbędzie bez krzyku.'),
        c('marta', 'Mam {Pana|Pani} głos. Mam głos Mai. Ale nie chcę go używać.')
      ], { set: { g_threat: true } })
    ]),
    choose('call', [
      opt('Ta rozmowa jest nagrywana. Za chwilę będzie ją miała prokuratura.', [c('marta', 'Rozumiem.'), c('marta', 'Archiwista wie, że nagranie to dokument. Ja zawsze to wiedziałam.'), c('marta', 'Do widzenia.')], { set: { g_recordMarta: true } }),
      opt('Dobrze. Przestanę. Niech pani zostawi w spokoju Weronikę i Maję.', [c('marta', 'Dziękuję. Wiedziałam, że {Pan|Pani} jest rozsądn{y|a}.'), c('marta', 'A nagrania od pani Weroniki? Proszę mi je jednak przesłać. Dla porządku.')], { set: { g_letGo: true } }),
      opt('Skasuję wszystko, co mam. Pani skasuje kasety i głosy. Wszyscy zapomną.', [c('marta', 'Kasety to pamięć. Ale dobrze. Głosy skasuję. Kasety zostaną w szafie.'), c('marta', 'Zgoda.')], { set: { g_wipeAll: true } })
    ]),
    callEnd(),
    run(s => {
      s.vars.s5Ending = G.flag('g_wipeAll') ? 'cisza2' : (G.flag('g_recordMarta') && G.flag('g_recOn') && !G.flag('g_martaAsk')) ? 'haslo' : 'echo';
    }),
    pause(2500),
    W('Czekam w kuchni. Woda w czajniku gotowała się już trzy razy. Czy to już?'),
    iff(s => s.vars.s5Ending === 'haslo', [W('Pan Natan zadzwonił. Powiedział: „mamy ją”. Usiadłam na podłodze. Tomek by się śmiał.')], [W('Rozumiem. Czyli dalej nie wiemy, czy ktoś za to odpowie.')]),
    pause(2500),
    iff(s => s.vars.s5Ending === 'haslo', [
      Nt('mam nagranie. prokuratorka slucha go w samochodzie drugi raz'),
      iff('flag:g_confess', [Nt('„wszystko jest na kasetach. wystarczylo sluchac”. powiedziala to sama. pani prokurator tylko kiwnela glowa')], [Nt('nie przyznala sie wprost. ale jest grozba i „mam glos mai”. to wystarczy na przeszukanie pracowni')]),
      iff('flag:g_strong', [Nt('i zdjecie magnetowidu. policjant mowi, ze zabezpiecza sprzet od razu')]),
      Nt('ida, zenon, weronika, henryk. wszyscy zeznaja. dzieki tobie'),
      pause(3000),
      clock('2027-03-20T18:40'),
      pic('ola', 'ola', 'g_pizza', 'Pizza! Ananas zniknął pierwszy. Nikt się nie przyznaje.'),
      Gr('bartek', 'ja zjadlem ananasa. oficjalnie. dla mai'),
      Gr('kuba', 'za %name%. za normalną sobotę'),
      V('maja2', 'maja', '0:05', 'To ja. Wiesz, po czym poznasz. Dzięki. Za wszystko.', 'Maja'),
      ...GlosHaslo(D, w => [M(`p.s. „${w}”. zawsze`)]),
      ending('haslo')
    ], [
      iff(s => s.vars.s5Ending === 'echo', [
        scene('scEcho', [scare('s5_echo', 'glitch')]),
        Nt('nie mam nic, co by przekonalo prokuratorke. rozmowa z marta jest „zbyt ogolna”'),
        Nt('a godzine temu pani jadwiga z kiosku wycofala zeznania. powiedziala, ze „dzwonil maz i prosil, zeby dala spokoj”'),
        Nt('jej maz nie zyje od pieciu lat'),
        iff('flag:g_martaAsk', [Nt('i jeszcze jedno. w piatek wyslal{es|as} marcie nasze nagrania. wiedziala, co mamy, zanim zadzwonila')]),
        pause(3000),
        clock('2027-03-20T22:10'),
        W('Znowu dzwonił. Nie odebrałam. Wyłączyłam telefon i wyjęłam baterię. Mam stary telefon, z baterią.'),
        M('ktoś wrzucił twoją głosówkę do grupy sylwii. mówisz w niej, że „przepraszasz za wszystko”'),
        M('wiem, że to nie ty. hasło znam tylko ja. ale reszta miasta go nie zna'),
        S('Usunęłam tę głosówkę. Ktoś ją wkleił znowu. I znowu. W końcu zamknęłam komentarze.'),
        S('Przepraszam. Wiem, że to nie {pan|pani}. Ale ja nie mam już siły tłumaczyć ludziom, co jest prawdziwe.'),
        K('siedzę z mają na balkonie. pizza była, ale nikt nie miał ochoty się śmiać'),
        ending('echo')
      ], [
        Nt('rozumiem. naprawde rozumiem. ale prokuratorka bedzie miala tylko to, co mam ja'),
        Nt('skasowal{es|as} wszystko?'),
        choose('natan', [
          opt('Tak. Głosówki, nagrania, zrzuty. Proszę Idę, Igora i Zenona o to samo.', [Nt('ok. wtedy ja tez. nie bede trzymal glosow ludzi w telefonie'), Nt('i tak nie mamy dowodu. tylko domysly')]),
          opt('Prawie. Została mi jedna zwykła głosówka od Mai.', [Nt('ta zostaw. to nie dowod. to pamiatka')])
        ]),
        pause(3000),
        clock('2027-03-20T19:20'),
        pic('ola', 'ola', 'g_pizza', 'Jest pizza. Trochę ciszej, niż miało być. Ale jest.'),
        M('już nikt nie dzwoni. ani tomek, ani ty, ani nikt'),
        M('nie wiem, czy to dobrze'),
        ending('cisza2')
      ])
    ]),
    credits()
  ];
});
