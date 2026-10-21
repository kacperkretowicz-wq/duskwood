'use strict';
/* EPILOG — Listopad */

Engine.chapter('epilog', { num: 99, title: 'Listopad', when: 'Sobota, 14 listopada', mood: 'dawn' }, D => {
  const { say, pause, choose, opt, iff, run, goal, unlock, notify, title, clock, ambient, ending, credits, callIn, callEnd, set, fx } = D;
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
      K('gajda prowadzi poszukiwania osobiście. w telewizji mówi, że nie spocznie'),
      K('mama mu wierzy. ja już nie umiem na niego patrzeć'),
      notify({ app: 'browser', title: 'Mglisko24', text: 'Komendant Gajda: „Nie spoczniemy, dopóki jej nie znajdziemy”', sound: 'notif', open: { page: 'm24_home' } }),
      pause(3000),
      W('Mur w hucie spłonął razem z odprężarką. Strażacy przyjechali za późno.'),
      W('Dalej palę znicze nad rzeką. Teraz dwa.'),
      pause(3000),
      sz('nadal jej szukam'),
      sz('ty tez?'),
      choose('szklarz', [opt('Tak.', []), opt('Przepraszam, Igor.', [sz('to nie ty mu {powiedziales|powiedzialas} pierwszy . to ja . dwa tygodnie wczesniej')])]),
      pause(4000),
      callIn('unknown'),
      say('call', 'unknown', '…'),
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
      K('minęły trzy tygodnie, a ja dalej nie wiem, co ci napisać'),
      K('maja wyszła ze szpitala. ręka w gipsie, odmrożone palce u stóp. robi zdjęcia lewą ręką'),
      K('mówi, że to najlepsze ćwiczenie z kompozycji'),
      choose('kuba', [
        opt('Jak się trzymasz, Kuba?', [K('lepiej. śpię. czasem'), K('mama się trzyma. gorzej z tym, że gajda był u nas na każdej wigilii')], {}),
        opt('Pozdrów ją ode mnie.', [K('sama cię pozdrowi. zaraz zobaczysz')])
      ]),
      notify({ app: 'browser', title: 'Gazeta Sudecka', text: 'Przełom w sprawie sprzed 29 lat: „Tomek nie utonął”', sound: 'notif', open: { page: 'gazeta2026' } }),
      pause(2500),
      iff(E('swit'), [
        W('Pochowaliśmy Tomka w sobotę. Obok mamy.'),
        W('Pierwszy raz od dwudziestu dziewięciu lat zapaliłam znicz na grobie, a nie nad rzeką.'),
        W('Dziękuję. Nie wiem, jak to inaczej powiedzieć.')
      ], [
        W('Oddali mi szczątki Tomka. Pochowaliśmy go obok mamy.'),
        W('Nie dostałam prawdy z ust tego, który zdecydował. On wybrał wodę. Jak wtedy.'),
        W('Ale wiem, gdzie on jest. To dużo. To za mało.')
      ]),
      pause(2500),
      iff('var:trust_bartek>=1', [
        B('stary siedzi w areszcie. odwiedzam go w kazda niedziele'),
        B('pierwszy raz od lat gadamy jak ludzie'),
        B('jakbys kiedys {mial|miala} stluczke, to wiesz gdzie jest warsztat')
      ], [
        B('stary siedzi. ja prowadze warsztat'),
        B('nie pisz do mnie przez jakis czas. to nie przez ciebie. po prostu')
      ]),
      pause(2500),
      iff('flag:igorForgiven', [
        I('Ojciec zeznaje. Codziennie, od rana do wieczora. Mówi, że pierwszy raz od lat czuje się lekko.'),
        I('Ja jeszcze nie. Ale pracuję nad tym.'),
        I('Szklarz przeszedł na emeryturę. Technicznie rzecz biorąc.')
      ], [
        I('Wyjeżdżam do Wrocławia. Tu wszyscy patrzą na mnie jak na syna wójta. Bo jestem.'),
        I('Dziękuję, że {skończyłeś|skończyłaś} to, czego ja nie umiałem.')
      ]),
      pause(2500),
      iff('var:trust_ola>=1', [
        O('Odpisałam jej. Po trzech tygodniach.'),
        O('„Przepraszam za wczoraj” — ja też.')
      ], [
        O('Dziękuję za wszystko. Nawet za to, że {grzebałeś|grzebałaś} w moich wiadomościach.')
      ]),
      pause(4000),
      unlock('chat:maja2'),
      M('Cześć. Tu Maja. Ta prawdziwa.'),
      M('Mam nowy numer, stary telefon jest w prokuraturze jako dowód. Dziwne uczucie.'),
      M('Kuba mówi, że mam ci podziękować. Więc: dziękuję. Za wszystko, czego nie widziałam.'),
      M('I przepraszam, że cię wtedy budziłam o północy. Myślałam, że dzwonię do kogoś innego.'),
      choose('maja2', [
        opt('Cieszę się, że zadzwoniłaś pod zły numer.', [M('Ja też. Chyba najlepsza pomyłka w moim życiu.')]),
        opt('Jak się czujesz?', [M('Jak ktoś, kto przez dziesięć dni liczył krople wody na ścianie. Ale z każdym dniem lepiej.')]),
        opt('Pan Adam byłby z ciebie dumny.', [M('Jego brat powiedział to samo. Prawie się rozpłakałam przy obcym facecie.')])
      ]),
      M('Właśnie. Brat pana Rybickiego przyniósł mi pudło. Jego notatki. Dwadzieścia lat notatek.'),
      M('Tomek był tylko jedną z jego spraw. Tam są inne.'),
      M('I miejsca. Prawdziwe miejsca, opisane tak, że da się je znaleźć. Nie tylko w Mglisku.'),
      M('Kiedyś ci pokażę, jak je szukać.'),
      M('Odbierz, jak zadzwonię. Tym razem.'),
      pause(3500),
      iff(E('swit'), [ending('swit')], [ending('odlamki')])
    ]),
    credits()
  ];
});
