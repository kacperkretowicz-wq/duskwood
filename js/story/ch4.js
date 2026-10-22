'use strict';
/* ROZDZIAŁ 4 — Sztolnia */

Engine.chapter('ch4', { num: 4, title: 'Sztolnia', when: 'Sobota, 24 października', mood: 'tense' }, D => {
  const { say, pic, me, sys, pause, choose, opt, show, place, waitFor, openChat, goal, give, unlock, set, iff, run, fx, typing, end, title, interlude, clock, ambient, deduce, trust } = D;
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const B = (t, o) => say('bartek', 'bartek', t, o);
  const I = (t, o) => say('igor', 'igor', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);
  const GJ = (t, o) => say('gajda', 'gajda', t, o);
  const g = (who, t, o) => say('group', who, t, o);
  const sz = (t, o) => say('szklarz', 'szklarz', t, o);
  const members = list => run(() => { G.chat('group').members = list; BUS.emit('chats'); });

  return [
    clock('2026-10-24T09:20'),
    title(),
    g('ola', 'Hej. Też nie spaliście?'),
    g('kuba', 'nie spałem. gapiłem się w ten sms'),
    g('bartek', 'nimbus ma funkcje znajdz urzadzenie. jak telefon byl online, to zapisal pozycje'),
    goal('Sprawdź w Nimbusie, gdzie był telefon Mai o 3:05.', ['Nimbus → kafelek *Znajdź urządzenie*.']),
    waitFor('ev:ev_findphone', { hints: [{ after: 60, chat: 'group', who: 'bartek', text: 'w nimbusie jest kafelek znajdz urzadzenie. na dole' }] }),
    show('group', { prompt: 'Pokaż ostatnią pozycję telefonu', accept: [{ ev: ['ev_findphone'] }], wrong: [['kuba', 'gdzie był telefon?']] }),
    g('ola', 'Las na stoku Sowiej Kopy. 800 metrów to kawał lasu.'),
    g('bartek', 'w tym kolku sa trzy stare sztolnie. anna, ewa i waltraud'),
    g('kuba', 'myślisz, że ona jest w sztolni??'),
    g('bartek', 'tam nawet telefon nie dziala. w srodku zero zasiegu'),
    g('bartek', 'mogl zlapac siec przy wejsciu. by tlumaczylo czemu tylko na chwile'),
    goal('Która sztolnia? Dowiedz się o trzech sztolniach i o tym, kto ma do nich klucze.', [
      'Wyszukaj w przeglądarce „sztolnie Sowia Kopa”.',
      'Anna to trasa turystyczna, Waltraud jest zalana. Kto ma klucze do Ewy? Poszukaj strony koła łowieckiego.',
      'W *Mapach* możesz włączyć warstwę leśną i obwody łowieckie — dodasz je na stronie „Mapa leśna”.'
    ]),
    waitFor(['ev:ev_sztolnie', 'ev:ev_kolo'], {
      hints: [
        { after: 100, chat: 'group', who: 'ola', text: 'Szukałam w sieci: jest przewodnik po podziemiach Sowiej Kopy. Wpiszcie „sztolnie”.' },
        { after: 220, chat: 'group', who: 'bartek', text: 'kolo lowieckie ma strone. stara jak swiat. „kolo lowieckie mglisko”' }
      ]
    }),
    g('kuba', 'która??'),
    run(() => G.unlock('layer:forest')),
    place('group', {
      prompt: 'Wskaż sztolnię na mapie', layer: 'forest', pool: ['anna', 'ewa', 'waltraud'],
      accept: [{ place: ['ewa'] }],
      wrongFor: {
        anna: [['bartek', 'anna to trasa turystyczna. kasa, kamery, przewodnik co godzine. nikt tam nikogo nie schowa']],
        waltraud: [['bartek', 'waltraud jest zalana od 97. woda pod sufit. tam nikt by nie przezyl dnia']]
      },
      wrong: [['kuba', 'to nie jest sztolnia']],
      countVar: 'wrongAdit'
    }),
    g('bartek', 'ewa. krata. klucz ma kolo lowieckie'),
    g('bartek', 'czyli gajda. jest lowczym'),
    typing('group', 'bartek', 4500),
    g('bartek', 'i moj stary. jest skarbnikiem kola'),
    g('ola', 'Bartek…'),
    g('bartek', 'wiem'),
    pause(3500),

    /* --- Szklarz i kadr 23 --- */
    fx('glitch', { wait: true }),
    sz('dobrze . ewa'),
    sz('zanim tam pojedziecie, musisz zobaczyc 23'),
    pic('szklarz', 'szklarz', 'p_23d', ''),
    sz('technicznie rzecz biorac, ta klatka nigdy nie byla przeswietlona', { clue: 'ev_szklarz_phrase' }),
    sz('przypatrz sie czapce'),
    iff('flag:cam1Dead', [
      sz('kamera przy bramie juz nie zyje'),
      sz('ktos jej szukal . wiesz, kto mu powiedzial')
    ], [
      sz('login: maja.cam'),
      sz('haslo: Jutrzenka1996'),
      sz('pobierz bushview . bedziesz miec oczy przy hucie'),
      set('bvCreds')
    ]),
    goal('Obejrzyj kadr 23, który przysłał Szklarz.', ['Otwórz zdjęcie w rozmowie ze Szklarzem i przybliż je.']),
    waitFor('ev:ev_frame23'),
    show('group', { prompt: 'Pokaż kadr 23', accept: [{ ev: ['ev_frame23'] }], wrong: [['kuba', 'co masz?']] }),
    typing('group', 'kuba', 4500),
    g('kuba', 'ten chłopak ma czapkę policyjną'),
    g('ola', 'Czapka pasuje do Roberta. Jego ojciec był komendantem.'),
    g('ola', 'A w kanale pieca, za nim… to żółte.'),
    g('bartek', 'skad to masz'),
    choose('group', [
      opt('Od kogoś, kto podpisuje się „Szklarz”. Pisze do mnie od pierwszej nocy.', [g('kuba', 'szklarz?? jak w tej bajce o hucie?')]),
      opt('Ktoś mi to przysłał z zastrzeżonego numeru.', [g('kuba', 'kto??')])
    ]),
    g('ola', 'Czekajcie. Kto miał skany? Igor mówił, że kadr 23 był „prześwietlony”.'),
    deduce('ded_szklarz'),
    goal('Kim jest Szklarz? Rozstrzygnij to w notatce „Pytania”.', [
      'Otwórz *Notatki* → „Pytania”.',
      'Szklarz użył zwrotu, który już gdzieś {widziałeś|widziałaś}. Dotknij jego wiadomości, żeby zapisać ją w Notatkach.',
      'Kto twierdził, że kadr 23 „był prześwietlony”? Kto skonfigurował fotopułapki Mai? Zajrzyj do SMS-ów Mai z Igorem.'
    ]),
    waitFor('solved:ded_szklarz', { hints: [{ after: 150, chat: 'group', who: 'ola', text: 'Szklarz pisze „technicznie rzecz biorąc”. Ktoś tu tak mówi na okrągło.' }] }),

    /* --- rozmowa z Igorem --- */
    unlock('chat:igor'),
    openChat('igor', { goal: 'Napisz do Igora.' }),
    choose('igor', [
      opt('Wiem, że to ty jesteś Szklarzem.', []),
      opt('Technicznie rzecz biorąc, Igor… to ty.', [], { trust: { igor: 1 } }),
      opt('Dlaczego nas okłamywałeś?', [], { trust: { igor: -1 } })
    ]),
    typing('igor', 'igor', 8000),
    typing('igor', 'igor', 4000),
    I('tak. to ja'),
    I('patrzę na ten ekran od dziesięciu minut i serio nie wiem co napisać'),
    I('10 października skanowałem mai negatywy. na 23 był mój ojciec. młody, ale to on. mam te same zdjęcia w albumie u babci'),
    I('i gajda. w policyjnej czapce swojego starego'),
    I('powiedziałem mai że klatka prześwietlona. chciałem najpierw pogadać z ojcem. sam'),
    I('12-go go zapytałem. po prostu pokazałem skan. wyszedł do kuchni i zadzwonił do gajdy'),
    I('dwa dni później mai już nie było'),
    typing('igor', 'igor', 5000),
    I('ciągle sobie odtwarzam jak wchodzę do tej kuchni. mogłem nic nie mówić'),
    I('bałem się powiedzieć wam wprost. pisałem z drugiej karty jako szklarz. wiem. brzmi jeszcze gorzej kiedy to piszę'),
    I('najgorsze że pisałem na grupie „spokojnie”. a minutę później straszyłem cię z tego drugiego numeru'),
    I('bo jak baliście się szklarza, nikt nie pytał o mnie'),
    pause(3500),
    I('nie był to żaden plan. po prostu z każdą wiadomością trudniej było przestać kłamać'),
    give('ev_igor_conf'),
    choose('igor', [
      opt('Dobra. Pomóż nam ją znaleźć. Bez kolejnych kłamstw.', [I('tak. tylko powiedz co robić')], { trust: { igor: 2 }, set: { igorForgiven: true } }),
      opt('Wiedziałeś, że twój ojciec dzwonił do Gajdy. I dalej nas straszyłeś?', [I('wiem'), I('nie umiem ci tego wytłumaczyć tak żeby brzmiało lepiej')], { trust: { igor: -2 } }),
      opt('Przekonaj ojca, żeby zeznawał.', [I('spróbuję. boi się gajdy bardziej niż więzienia'), I('pójdę do niego jeszcze raz')], { trust: { igor: 1 }, set: { leszekTestify: true, igorForgiven: true } })
    ]),
    iff('!flag:leszekTestify', [
      I('pogadam z ojcem. pokażę mu ten sms. niech mi sam powie że mamy nic nie robić'),
      iff('var:trust_igor>=1', [set('leszekTestify')])
    ]),
    I('możesz mnie dodać z powrotem? jak nie, piszę tylko do ciebie'),
    choose('igor', [
      opt('Wracasz do grupy.', [
        sys('group', 'Igor dołączył do grupy.'),
        members(['kuba', 'ola', 'bartek', 'igor']),
        g('igor', 'jestem. sory za wszystko. %name% wie już o mnie. jak będzie po wszystkim, wam też opowiem'),
        g('kuba', 'co nam powie?'),
        g('igor', 'że zawaliłem. bardzo. kuba, najpierw ją stamtąd wyciągnijmy')
      ], { set: { igorBack: true } }),
      opt('Na razie zostań poza grupą.', [I('okej. zostaję tutaj, telefon mam przy sobie')])
    ]),
    pause(3500),

    /* --- Marek Sowa --- */
    B('stary gadal ze mna cala noc'),
    B('pisze, bo nie umiem tego powiedziec na glos'),
    B('7 lipca 97. byli w hucie we czterech. robert, leszek, darek i on. pili. darek robil zdjecia'),
    B('tomek lazil za darkiem jak zawsze. przegonili go. wrocil'),
    B('kolo polnocy wszedl na deski nad kanalem pieca. zarwaly sie. kanal byl zalany po deszczu'),
    B('wyciagneli go. nie oddychal. stary mowi ze probowali. darek probowal najdluzej'),
    typing('bartek', 'bartek', 6000),
    B('robert powiedzial ze nikt sie nie dowie. ze jego ojciec straci prace a oni pojda siedziec'),
    B('zaniesli go do odprezarki. stary zamurowal wejscie. umial, bo latem pomagal dziadkowi na budowach'),
    B('29 lat. a ja mialem kazac mai zostawic go w spokoju'),
    give('ev_marek'),
    B('i jeszcze jedno. robert ma klucz do kraty w ewie. kolo trzyma tam sol dla zwierzyny. 16 pazdziernika wymienil klodke'),
    B('stary chce jechac z nami. mowi ze 29 lat czekal, az ktos go zlapie'),
    choose('bartek', [
      opt('Dzięki, że mi to napisałeś. Niech ojciec opowie to też policji.', [B('nie dziekuj. jedzmy po nia')], { trust: { bartek: 2 } }),
      opt('Twój ojciec pójdzie siedzieć.', [B('wiem. on tez wie')]),
      opt('Niech jedzie. Zna teren i zna Gajdę.', [B('tak')], { trust: { bartek: 1 } })
    ]),
    set('marekTestify'),
    pause(2000),

    /* --- wnioski --- */
    deduce('ded_1997'),
    deduce('ded_who'),
    goal('Zanim pojedziecie: zapisz w Notatkach, co się stało w 1997 roku i kto porwał Maję.', [
      'Otwórz *Notatki* → „Pytania”. Czekają tam dwa pytania.',
      'Do 1997: kadry z kliszy, tamagotchi pod murem, nowsze cegły, zdjęcie Mai z 23:44.',
      'Do porwania: tablica auta i jej właściciel, koło łowieckie i klucz do kraty.'
    ]),
    waitFor(['solved:ded_1997', 'solved:ded_who'], { hints: [{ after: 160, chat: 'group', who: 'ola', text: 'Spiszmy wszystko porządnie, zanim pojedziecie. Jak coś pójdzie źle, ktoś musi to mieć czarno na białym.' }] }),
    pause(2500),

    /* --- ostatnia wiadomość od Gajdy --- */
    iff(s => G.v('leaks') >= 1 || G.flag('gajdaAlert'), [
      GJ('Wiem, że coś planujecie. Pani Wrona się martwi.'),
      GJ('Gdzie dziś jedziecie?'),
      choose('gajda', [
        opt('Do sztolni Ewa. Wiemy, że ona tam jest.', [GJ('…'), GJ('Dziękuję za szczerość.')], { set: { toldGajda: true } }),
        opt('Do Wrocławia. Do prokuratury.', [GJ('Rozumiem. Szerokiej drogi.')], { set: { liedProsecutor: true } }),
        opt('(nie odpowiadaj)', [], { silent: true })
      ])
    ], [
      GJ('Dzień dobry. Pani Wrona mówi, że w nocy przyszła wiadomość od Mai. To dobra wiadomość.'),
      GJ('Najpewniej zamkniemy poszukiwania. Proszę przekazać to grupie.'),
      choose('gajda', [
        opt('To nie ona to pisała.', [GJ('Skąd ta pewność?'), GJ('Proszę nie robić niczego głupiego.')], { set: { gajdaAlert: true } }),
        opt('Tak, to dobra wiadomość.', [GJ('Cieszę się. Wszyscy możemy odetchnąć.')]),
        opt('(nie odpowiadaj)', [], { silent: true })
      ])
    ]),
    pause(2000),

    /* --- plan --- */
    g('kuba', 'jedziemy dziś wieczorem'),
    g('bartek', 'ja, stary i kuba. nozyce do klodek mam. latarki tez'),
    g('ola', 'Ja zostaję z panią Ewą. Ktoś musi być przy mamie Kuby.'),
    unlock('chat:weronika'),
    W('Kuba do mnie dzwonił. Jadę z wami.'),
    W('Nie, nie dam się przekonać. Czekałam dwadzieścia dziewięć lat.'),
    iff('flag:igorBack', [
      g('igor', 'zostaję przy kompie. mapy i łączność mam, kamerę sprawdzę. jak trzeba dzwońcie')
    ], [
      I('zostaję przy kompie. pisz albo dzwoń jak czegoś potrzebujesz')
    ]),
    g('kuba', '%name%, będziesz z nami na telefonie? bez ciebie się pogubimy'),
    choose('group', [
      opt('Będę. Cały czas.', [], { trust: { kuba: 1 } }),
      opt('Jasne. Piszcie co chwilę.', [])
    ]),
    g('kuba', 'ok. to do wieczora'),
    pause(2000),
    interlude('22:40', 'Szlaban na drodze leśnej nr 7.', 3600),
    clock('2026-10-24T22:40'),
    end('ch5')
  ];
});
