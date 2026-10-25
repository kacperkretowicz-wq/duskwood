'use strict';
/* EPILOG — Listopad */

Engine.chapter('epilog', { num: 99, title: 'Listopad', when: 'Sobota, 14 listopada', mood: 'dawn' }, D => {
  const { say, pause, choose, opt, iff, run, goal, unlock, notify, title, clock, ambient, ending, credits, callIn, callEnd, set, fx, scene, scare } = D;
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const O = (t, o) => say('ola', 'ola', t, o);
  const B = (t, o) => say('bartek', 'bartek', t, o);
  const I = (t, o) => say('igor', 'igor', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);
  const M = (t, o) => say('maja2', 'maja', t, o);
  const sz = (t, o) => say('szklarz', 'szklarz', t, o);
  const E = id => s => s.vars.endingId === id;
  const saved = s => s.vars.endingId !== 'cisza';

  return [
    clock('2026-11-14T18:10'),
    set('epilog'),
    title(),
    iff(E('cisza'), [
      /* ---------- CISZA ---------- */
      ambient('dark'),
      K('trzy tygodnie'),
      K('szukamy codziennie. ja, bartek, pani weronika. nawet ola po pracy'),
      K('gajda zniknął. w telewizji pokazują w kółko jego stare wypowiedzi o poszukiwaniach'),
      K('mama słyszy w nich ciągle kogoś, kogo znała. ja już nie mogę tego słuchać'),
      notify({ app: 'browser', title: 'Mglisko24 · archiwum', text: 'Tak Gajda mówił o poszukiwaniach. Dziś sam jest poszukiwany.', sound: 'notif', open: { page: 'm24_home' } }),
      pause(3000),
      W('Pożar zniszczył odprężarkę i mur. Strażacy przyjechali za późno.'),
      W('Dalej palę znicze nad rzeką. Teraz dwa.'),
      pause(3000),
      sz('nadal jej szukam'),
      sz('ty tez?'),
      choose('szklarz', [opt('Tak.', []), opt('Przepraszam, Igor.', [sz('to zaczelo sie ode mnie . 12 pazdziernika pokazalem ojcu skan . wtedy zadzwonil do gajdy')])]),
      pause(4000),
      callIn('unknown'),
      say('call', 'unknown', '…'),
      scene('scCisza', [scare('s1_cisza_breath', 'breath')]),
      pause(4000),
      say('call', 'unknown', '(szum)'),
      pause(4000),
      callEnd(),
      pause(2500),
      ending('cisza')
    ], [
      /* ---------- ŚWIT / ODŁAMKI ---------- */
      ambient('dawn'),
      K('hej'),
      K('minęły trzy tygodnie, a ja dalej nie wiem, co ci napisać', { wording: 'mam twój czat przypięty. od trzech tygodni zaczynam coś pisać i kasuję' }),
      K('maja wyszła ze szpitala. ręka w gipsie, odmrożone palce u stóp. robi zdjęcia lewą ręką'),
      K('powiedziała że prowadzący pewnie zapyta czy lewa ręka to świadomy zabieg 💀'),
      choose('kuba', [
        opt('A ty jak się trzymasz?', [K('trochę lepiej. wczoraj przespałem noc bez sprawdzania telefonu. pierwszy raz'), K('mama się trzyma. gorzej z tym, że gajda był u nas na każdej wigilii')], {}),
        opt('Pozdrów ją ode mnie.', [K('sama cię pozdrowi. zaraz zobaczysz')])
      ]),
      scene('f3lib', [K('pani weronika dała mi dyżury w bibliotece. ogarniam komputery w czytelni. ktoś musi 💀', { img: 'e_czytelnia' })]),
      notify({ app: 'browser', title: 'Gazeta Sudecka', text: 'Przełom w sprawie sprzed 29 lat: „Tomek nie utonął”', sound: 'notif', open: { page: 'gazeta2026' } }),
      pause(2500),
      iff(E('swit'), [
        W('Pochowaliśmy Tomka w sobotę. Obok mamy.', { wording: 'Pochowaliśmy Tomka w zeszłą sobotę. Obok mamy.' }),
        W('Pierwszy raz od dwudziestu dziewięciu lat zapaliłam znicz na grobie, a nie nad rzeką.'),
        W('Dziękuję. Nie wiem, jak to inaczej powiedzieć.')
      ], [
        W('Oddali mi szczątki Tomka. Pochowaliśmy go obok mamy.'),
        W('Nadal nie wiem wszystkiego. O niektórych rzeczach wciąż nie chcą mówić.'),
        W('Ale przynajmniej wiem, gdzie jest. Tyle że nadal mam pytania.', { wording: 'Ale przynajmniej wiem, gdzie jest. Mogę do niego pójść.' })
      ]),
      pause(2500),
      iff('var:trust_bartek>=1', [
        B('stary siedzi w areszcie. odwiedzam go w kazda niedziele'),
        B('pierwszy raz od lat gadamy jak ludzie', { wording: 'pytal kto mi pomaga w warsztacie. powiedzialem ze sam ogarniam. chcialem jeszcze zapytac o kilka rzeczy ale skonczyla sie wizyta' }),
        B('jak ci kiedys auto nie odpali to pisz. tylko nie o trzeciej w nocy')
      ], [
        B('stary siedzi. ja prowadze warsztat'),
        B('nie pisz do mnie przez jakis czas. to nie przez ciebie. po prostu')
      ]),
      scene('epBartek', [iff('var:trust_bartek>=1', [
        choose('bartek', [
          opt('Trzymam za słowo. Dobrze, że go odwiedzasz.', [B('ok. ty tez sie trzymaj')]),
          opt('A ty jak dajesz radę z warsztatem?', [B('klienci wracaja. polowa z ciekawosci. jakos to bedzie')])
        ])
      ], [
        choose('bartek', [
          opt('Jasne. Jak będziesz chciał, jestem.', [B('wiem')]),
          opt('Przepraszam, że tak wyszło.', [B('nie przepraszaj. to nie ty go wsadziles')])
        ])
      ])]),
      pause(2500),
      iff('flag:igorForgiven', [
        I('ojciec zeznaje. wraca po kilku godzinach i nic nie mówi. ale już nie dzwoni do gajdy'),
        I('kuba jeszcze nie odpisuje na moje prywatne. nie poganiam go'),
        I('drugą kartę oddałem policji. technicznie rzecz biorąc w końcu mam jeden numer', { wording: 'oddałem drugi telefon i kartę policji. starego czatu nie kasowałem. kuba może go przeczytać, jak będzie chciał' })
      ], [
        I('jadę do wrocławia. tu każdy pyta o ojca, a ja dalej nie mam odpowiedzi na połowę rzeczy'),
        I('dzięki że nie {odpuściłeś|odpuściłaś}. ja wiem że sam strasznie dużo spieprzyłem')
      ]),
      scene('epIgor', [choose('igor', [
        opt('Napisz, jak dojedziesz.', [I('napiszę. to akurat umiem')], { wording: 'Odzywaj się czasem. Do mnie i do Kuby.' }),
        opt('Dobrze, że w końcu mówisz wprost.', [I('za późno. ale tak')])
      ])]),
      pause(2500),
      iff('var:trust_ola>=1', [
        O('Odpisałam jej. Po trzech tygodniach.'),
        O('Napisałam: „Ja też przepraszam za tamten wieczór”.')
      ], [
        O('Dziękuję za wszystko. Nawet za to, że {grzebałeś|grzebałaś} w moich wiadomościach.')
      ]),
      scene('epOla', [choose('ola', [
        opt('Dobrze, że jej odpisałaś.', [O('Jeszcze nie wiem, czy dobrze. Ale odpisałam.')]),
        opt('Daj znać, jak się będziesz czuła.', [O('Dam. Tym razem naprawdę.')])
      ])]),
      /* P4: późniejsze wyjaśnienie wiadomości z próśb (xProsby w ch3). */
      scene('xProsbaWyjasnienie', [
        O('I jeszcze jedno. To konto m.k.2009 w końcu odpisało. Magda z drugiej klasy, Maja dawała jej korepetycje z biologii.'),
        O('Bała się napisać do kogoś, kogo zna, więc napisała do mnie. Ludzie dziwnie się zachowują, kiedy się boją.')
      ]),
      pause(4000),
      unlock('chat:maja2'),
      M('hej, maja. kuba mówi że mam zacząć od imienia a nie od „to ja” 🙂'),
      M('nowy numer. stary telefon jest dowodem, a ja myślę czy muszą czytać moją listę „ser, ser, płyn do naczyń”'),
      M('kuba próbuje mi opowiedzieć co robiliście. co chwilę zaczyna od innego miejsca. dzięki że z nim {byłeś|byłaś}'),
      M('myślałam że dzwonię do rybickiego. nawet nie sprawdziłam czy dalej ma ten numer', { wording: 'myślałam że dzwonię do Rybickiego. nawet nie sprawdziłam, czy dalej ma ten numer' }),
      choose('maja2', [
        opt('Cieszę się, że zadzwoniłaś pod zły numer.', [M('ja też. pierwszy raz w życiu cieszę się że pomyliłam numer 🫶')]),
        opt('Jak się czujesz?', [M('Jak ktoś, kto przez dziesięć dni liczył krople wody na ścianie. Ale z każdym dniem lepiej.', { wording: 'teraz? marzną mi stopy, mama trzeci raz pyta czy herbaty, a ja chcę posiedzieć sama. ale jem już normalnie' })]),
        opt('Pan Adam byłby z ciebie dumny.', [M('Jego brat powiedział to samo. Prawie się rozpłakałam przy obcym facecie.', { wording: 'to prawda. nawet jak nic nie mówię, on siedzi obok. dzisiaj wysłałam go w końcu na spacer' })], { wording: 'Dobrze mieć Kubę obok. Bardzo na ciebie czekał.' })
      ]),
      M('Właśnie. Brat pana Rybickiego przyniósł mi pudło. Jego notatki. Dwadzieścia lat notatek.', { img: 'e_pudlo', wording: 'właśnie. brat pana Rybickiego przyniósł mi pudło. jego notatki. dwadzieścia lat notatek' }),
      M('Tomek był tylko jedną z jego spraw. Tam są inne.', { wording: 'na razie zajrzałam tylko na wierzch. kasety, zeszyty, jakieś wycinki o moście' }),
      M('I miejsca. Prawdziwe miejsca, opisane tak, że da się je znaleźć. Nie tylko w Mglisku.', { wording: 'pani Weronika mówi, że pomoże to poukładać. u mnie pudło stoi pod biurkiem i przeszkadza bandziorowi' }),
      M('Kiedyś ci pokażę, jak je znaleźć.', { wording: 'jak do tego usiądę, napiszę. dzisiaj tylko chciałam się odezwać' }),
      M('tylko odbierz jak zadzwonię, ok? tym razem', { wording: 'tylko odbierz jak zadzwonię, ok? tym razem. tamtej nocy gajda włączył telefon, żeby wysłać mamie tamtego smsa. zobaczył ostatni numer i zadzwonił. nic nie powiedział. ja nawet nie wiedziałam' }),
      pause(3500),
      iff(E('swit'), [ending('swit')], [ending('odlamki')])
    ]),
    credits()
  ];
});
