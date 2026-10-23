'use strict';
/* ROZDZIAŁ 2 — Huta */

Engine.chapter('ch2', { num: 2, title: 'Huta', when: 'Czwartek, 22 października · wieczór', mood: 'calm' }, D => {
  const { say, pic, me, sys, pause, choose, menu, opt, show, waitFor, openChat, goal, give, unlock, set, iff, run, fx, typing, end, title, interlude, clock, ambient, sync, trust , scene, label, go, scare } = D;
  const SC = StoryScenes(D);
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const B = (t, o) => say('bartek', 'bartek', t, o);
  const GJ = (t, o) => say('gajda', 'gajda', t, o);
  const g = (who, t, o) => say('group', who, t, o);
  const sz = (t, o) => say('szklarz', 'szklarz', t, o);

  return [
    clock('2026-10-22T19:40'),
    title(),
    /* P2: zwykły wieczór przed sprawą. Kończy się niczym. */
    scene('xSerwis', [
      g('igor', 'sorry, dopiero zamknąłem'),
      g('igor', 'pani przyszła 18:58 z tabletem wnuczka. „tylko na chwileczkę”. wyszła 19:35'),
      g('ola', 'Ja dopiero wstałam po nocce. Kawa, pies i czytam wszystko od góry.'),
      choose('group', [
        opt('Igor, a tablet chociaż działa?', [g('igor', 'działa. wnuczek zmienił język na koreański. tyle było awarii'), g('igor', 'dostałem drożdżówkę zamiast zapłaty. leży na ladzie')]),
        opt('Ola, czytaj spokojnie. Nic nie ucieknie.', [g('ola', 'Dzięki. Chociaż widzę jakieś zdjęcie z drugiej w nocy, więc chyba jednak ucieka.')], { trust: { ola: 1 } })
      ])
    ]),
    K('{widziałeś|widziałaś} to zdjęcie z nocy?? 2:13'),
    K('ktoś był w hucie. sam. z latarką'),
    goal('Przyjrzyj się zdjęciu z fotopułapki z 22.10, 02:13. Kto to może być?', [
      'Otwórz zdjęcie i przybliż je — dwoma palcami, kółkiem myszy albo dwuklikiem.',
      'Na plecach kurtki jest napis. Przybliż mocno i dotknij go.'
    ]),
    waitFor('ev:ev_jacket', { hints: [{ after: 90, chat: 'kuba', who: 'kuba', text: 'na plecach ma napis. u mnie po przybliżeniu są cztery piksele i rozpacz' }] }),
    K('i co, widać coś?'),
    show('kuba', { prompt: 'Pokaż, co widać na kurtce', accept: [{ ev: ['ev_jacket'] }], wrong: [['kuba', 'chodzi mi o gościa z 2:13. co ma na plecach?']] }),
    typing('kuba', 'kuba', 3000),
    K('„O-SOWA”'),
    K('auto-sowa. to kurtka z warsztatu bartka'),
    K('nam pisał „nie idźcie tam” a sam pojechał? no nie', { wording: 'wczoraj mnie opieprzył, że chcę tam jechać. a sam tam był?' }),
    choose('kuba', [
      opt('Napiszę do niego na priv. Najpierw zapytam.', [
        K('ok. ale napisz mi potem'),
        unlock('chat:bartek'),
        openChat('bartek', { goal: 'Napisz do Bartka.' }),
        me('bartek', 'Bartek, byłeś dziś w nocy w hucie?'),
        typing('bartek', 'bartek', 3000),
        B('kto tak powiedzial'),
        show('bartek', { prompt: 'Pokaż Bartkowi zdjęcie', accept: [{ ev: ['ev_jacket', 'ev_cam1_0057'] }], wrong: [['bartek', 'nie wiem o czym mowisz']] }),
        typing('bartek', 'bartek', 5000),
        B('cholera'),
        B('tak. bylem'),
        B('nie mow kubie. on i tak mnie nie trawi', { wording: 'nie wrzucaj na grupe. chce to najpierw wytlumaczyc' }),
        choose('bartek', [
          opt('Dobra. Tylko powiedz, po co tam byłeś.', [], { trust: { bartek: 1 } }),
          opt('Kuba już wie. Lepiej sam mu to wytłumacz.', [B('super')]),
          opt('Skłamałeś, że nie gadałeś z Mają od miesięcy.', [B('wiesz o stacji?'), B('no tak. przeczytales jej smsy')], { cond: 'ev:ev_bartek_sms' })
        ]),
        B('w srode 14-ego maja napisala ze chce pogadac o moim starym. spotkalismy sie na stacji'),
        B('pytala czy moj ojciec byl w hucie latem 97. w noc powodzi'),
        B('wkurzylem sie. powiedzialem zeby sie odczepila od mojej rodziny'),
        B('to byla nasza ostatnia rozmowa', { wording: 'wieczorem jeszcze jej napisalem, zeby zostawila mojego ojca w spokoju. to bylo ostatnie co ode mnie dostala' }),
        typing('bartek', 'bartek', 3500),
        B('od tygodnia nie spie. wczoraj nie wytrzymalem i pojechalem zobaczyc, czego ona tam szukala', { wording: 'przeczytalem wczoraj jeszcze raz co jej odpisalem. wzialem kluczyki i pojechalem. nawet nie wiedzialem czego szukac' }),
        B('przy scianie w piwnicy ktos posprzatal. wszystko zastawione paletami. i czuc bylo swieza zaprawe. jak u nas w garazu jak stary murowal'),
        B('spieprzylem jak uslyszalem samochod na dole'),
        give('ev_bartek_conf'),
        B('nie pytaj mnie teraz o starego. nie dzis', { wording: 'o starego jeszcze go nie zapytalem. siedzi obok w pokoju, a ja nie umiem wejsc' }),
        K('i co?'),
        choose('kuba', [
          opt('Był tam, ale szukał tego samego co my. Maja pytała go o ojca.', [K('o jego ojca? czemu?'), K('…ok. wierzę ci')], { trust: { bartek: 1 } }),
          opt('Bartek coś ukrywa. Uważaj na niego.', [K('wiedziałem')], { trust: { kuba: 1, bartek: -1 } })
        ])
      ], { set: { bartekPrivate: true } }),
      opt('Zapytajmy go w grupie. Wszyscy powinni wiedzieć.', [
        me('group', 'Bartek, kamera przy bramie złapała dziś w nocy kogoś w kurtce Auto-Sowa. To ty?'),
        show('group', { prompt: 'Pokaż zdjęcie', accept: [{ ev: ['ev_jacket', 'ev_cam1_0057'] }], wrong: [['bartek', 'co to ma byc']] }),
        g('bartek', 'szpiegujecie mnie teraz?'),
        g('kuba', 'TO TY?'),
        g('bartek', 'tak. ja. i co'),
        g('ola', 'Bartek, wczoraj pisałeś, żeby tam nie chodzić.'),
        g('bartek', 'bo nie chce zeby kuba skonczyl w piwnicy z polamanymi nogami', { wording: 'bo tam podloga sie sypie. jakbym wiedzial ze to dobry pomysl to bym wam napisal' }),
        g('bartek', 'maja w srode pytala mnie o mojego starego. czy byl w hucie w 97. wkurzylem sie'),
        g('bartek', 'pojechalem zobaczyc czego szukala. przy scianie w piwnicy ktos posprzatal. i czuc bylo swieza zaprawe'),
        give('ev_bartek_conf'),
        g('kuba', 'i nie mogłeś tego napisać wczoraj??'),
        g('bartek', 'nie. bo to moj ojciec'),
        trust('bartek', -1),
        g('igor', 'ej, dajcie mu skończyć. bartek, ta zaprawa. jesteś pewien, że świeża?')
      ]),
      opt('Nie mówmy mu na razie, że wiemy.', [
        K('nie umiem tak'),
        K('sorry'),
        g('kuba', 'bartek. co robiles w hucie o drugiej w nocy'),
        g('bartek', 'skad wiesz'),
        g('kuba', 'fotopułapka. twoja kurtka'),
        g('bartek', 'maja w srode pytala mnie o mojego starego. czy byl w hucie w 97'),
        g('bartek', 'pojechalem zobaczyc czego szukala. przy scianie w piwnicy ktos posprzatal. czuc bylo swieza zaprawe'),
        give('ev_bartek_conf'),
        g('ola', 'Dlaczego nic nie powiedziałeś?'),
        g('bartek', 'bo to moj ojciec')
      ])
    ]),
    pause(3000),

    /* P5 / G2: głosówka z drugiej karty Igora, nagrana w zamkniętym serwisie. Źródło wyjaśnia wyznanie w ch4. */
    scene('scOdsluch', [
      pause(2500),
      say('szklarz', 'szklarz', 'voice:0:09||[cichy szum pomieszczenia, tyka zegar, ktoś stuka paznokciem w szybę… nagły trzask szkła tuż przy mikrofonie]'),
      pause(4200),
      scare('s1_odsluch', 'glitch'),
      say('szklarz', 'szklarz', 'tak brzmi szklo jak peka'),
      pause(2000),
      g('kuba', 'ktoś mi znowu pisze z tego numeru?? czy tylko ja to dostaję'),
      choose('group', [
        opt('Ja {dostałem|dostałam} głosówkę. Szum, zegar i trzask szkła.', [g('igor', 'ktoś się bawi w horror. nie dawajcie mu tej satysfakcji'), g('ola', 'Zegar. Ktoś to nagrał w środku, nie na dworze.')], { wording: 'Mam od niego głosówkę. Szum, tykanie zegara i trzask szkła na końcu.', set: { s1_odsluchTold: true } }),
        opt('Nie odpisujmy mu. Zapisuję to i wracamy do Mai.', [g('kuba', 'ok. ale nie usuwaj tego')])
      ])
    ]),

    /* --- komendant Gajda --- */
    unlock('chat:gajda'),
    GJ('Dobry wieczór. Aspirant sztabowy Robert Gajda, komendant posterunku w Mglisku.'),
    iff('flag:kubaToldGajda',
      [GJ('Kuba był u mnie dziś rano z mamą. Opowiedział mi o lokalizacji telefonu Mai. Rozumiem, że to {Pan|Pani} ją {znalazł|znalazła}.')],
      [GJ('Pani Ewa Wrona przekazała mi {Pana|Pani} numer. Rozumiem, że pomaga {Pan|Pani} rodzinie i ma dostęp do kopii telefonu Mai.')]),
    GJ('Dziękuję za pomoc rodzinie. Proszę jednak uzgadniać dalsze działania z policją.', { wording: 'Dobrze, że rodzina ma kogoś do pomocy. Chciałbym tylko wiedzieć, jakie materiały już Państwo mają.' }),
    GJ('Co jeszcze {Pan|Pani} {znalazł|znalazła}?'),
    choose('gajda', [
      opt('Maja tamtej nocy była w hucie, nie na tamie.', [
        GJ('Rozumiem. To bardzo cenne. Sprawdzę hutę jeszcze raz. Osobiście.', { wording: 'Rozumiem. Zajmę się tym. Proszę mi wysłać ten zapis lokalizacji, żebym miał dokładne godziny.' }),
        GJ('Proszę mi przesyłać wszystko, co {Pan|Pani} znajdzie. Bezpośrednio do mnie, nie do tej grupy. Młodzi ludzie potrafią narobić szkód.', { wording: 'Najlepiej tutaj, bezpośrednio do mnie. Na grupie jedna osoba coś dopowie i potem prostujemy plotki przez trzy dni.' })
      ], { cond: '!flag:kubaToldGajda', inc: { leaks: 1 }, set: { leakHuta: true } }),
      opt('Maja miała w hucie fotopułapki.', [
        GJ('Fotopułapki?'),
        typing('gajda', 'gajda', 3500),
        GJ('Gdzie dokładnie?'),
        choose('gajda', [
          opt('Jedna przy bramie, druga w hali.', [GJ('Dziękuję. Zabezpieczymy je jako dowód.')], { set: { leakCams: true }, inc: { leaks: 1 } }),
          opt('Nie wiem dokładnie.', [GJ('Proszę się dowiedzieć. To ważne.')])
        ])
      ], { inc: { leaks: 1 } }),
      opt('Na razie nic konkretnego.', [GJ('Rozumiem. Jestem pod tym numerem o każdej porze.')]),
      opt('Dlaczego pyta pan mnie, a nie rodzinę?', [GJ('Bo rodzina jest w szoku, a {Pan|Pani} myśli trzeźwo. Tak mi się przynajmniej wydaje.'), GJ('Gdyby coś się pojawiło — proszę pisać.')])
    ]),
    pause(2500),

    scene('s12', SC.s12),

    /* --- negatywy --- */
    g('igor', 'słuchajcie, jeszcze ta klisza. maja dała mi negatywy do skanu w zeszłym tygodniu'),
    g('igor', 'stary film, większość klatek ledwo czytelna'),
    g('ola', 'A te skany gdzie są?'),
    g('igor', 'oddałem na pendrivie. ale wcześniej robiła negatywom zdjęcia telefonem. szukaj w galerii'),
    g('igor', '%name%, podeślę Ciemnię. odwraca negatyw i można wyciągnąć trochę więcej z cieni'),
    unlock('app:ciemnia'),
    goal('Wywołaj negatywy Mai w Ciemni. Co jest na kliszy z szafki 17?', [
      'Otwórz *Ciemnię* i wybierz negatyw.',
      'Najpierw odwróć negatyw na pozytyw. Potem mocno rozjaśnij — klisza jest przeterminowana.',
      'Kadr 21: ekspozycja około +1,5 EV, kontrast odrobinę w górę.'
    ]),
    waitFor('ev:ev_frame21', { hints: [{ after: 100, chat: 'group', who: 'igor', text: 'w Ciemni najpierw „Pozytyw”. potem ekspozycja w górę, nie sam kontrast' }] }),
    g('kuba', 'wywołało się coś?'),
    show('group', { prompt: 'Pokaż wywołany kadr', accept: [{ ev: ['ev_frame21'] }], wrongFor: { ev_frame08: ['ola', 'Chłopcy przy piwie… Są inne klatki?'], ev_frame22: ['igor', 'Prawie nic nie widać. Coś wyraźniejszego?'] }, wrong: [['kuba', 'coś z kliszy']] }),
    typing('group', 'ola', 3500),
    g('ola', 'To jakaś impreza w hucie. Bardzo dawno temu.'),
    g('bartek', 'kim sa ci chlopacy'),
    g('kuba', 'czekaj. przybliżcie. w drzwiach'),
    g('kuba', 'tam stoi dziecko'),
    g('ola', 'W żółtej pelerynie.'),
    g('kuba', 'żółta peleryna. jak w artykule. tomek lis'),
    typing('group', 'igor', 5000),
    g('igor', 'czekajcie. nie mamy jeszcze daty tej kliszy'),
    g('ola', 'Igor, serio? Dziecko w żółtej pelerynie w hucie. Tomek zniknął w żółtej pelerynie w noc, kiedy świadek widział go na drodze do huty.', { wording: 'Wiem, że nie widać twarzy. Ale to by tłumaczyło, dlaczego Maja czytała ten artykuł.' }),
    g('kuba', 'jeśli to tomek, to był w hucie. nie nad rzeką'),
    g('kuba', 'i maja potem też zniknęła W HUCIE'),
    set('yellowKnown'),
    pause(2000),

    scene('s14', SC.s14),

    /* --- zablokowana notatka --- */
    g('ola', 'W notatkach Mai jest jedna zablokowana. „Pytania”. Widzieliście?'),
    goal('Otwórz zablokowaną notatkę Mai „Pytania”.', [
      'Podpowiedź Mai do PIN-u: *szafka + rok*.',
      'Numer szafki jest w „Dzienniku ciemni” i na zdjęciu szatni. Rok — z kliszy i z artykułu.',
      'Szafka 17, rok 1997. Złóż z tego cztery cyfry.'
    ]),
    waitFor('ev:ev_questions', { hints: [{ after: 120, chat: 'kuba', who: 'kuba', text: 'szafka + rok… może chodzi o tę szafkę, w której był aparat?' }] }),
    show('group', { prompt: 'Pokaż notatkę „Pytania”', accept: [{ ev: ['ev_questions'] }], wrong: [['ola', 'Udało się otworzyć „Pytania”?']] }),
    typing('group', 'kuba', 4500),
    g('kuba', '„zwłaszcza r.g.”'),
    g('kuba', 'kto to jest r.g.'),
    g('ola', 'Robert Gajda.'),
    g('kuba', 'albo ktokolwiek. rafał grabowski z apteki. ryszard… nie wiem'),
    g('ola', 'Kuba. Punkt czwarty: „Kto prowadził poszukiwania? Komendant Gajda. Ojciec Roberta.” A na końcu: „Zwłaszcza R.G.”'),
    g('ola', 'Maja powiedziała mi przez telefon: nie do Gajdy. Nie pytaj dlaczego.'),
    g('kuba', 'nie. nie wierzę. gajda przynosił mi lego na komunię', { wording: 'przecież on zna nas od dziecka. mama mu ufa' }),
    g('bartek', 'gajda to glina od 25 lat. nie przesadzajcie'),
    g('igor', '„Igor dziwnie pyta o film”. no dzięki. pytałem bo ten aparat wyglądał na starszy ode mnie'),
    pause(2500),

    scene('s13', SC.s13),

    /* --- wyprawa --- */
    g('igor', 'dobra. z kubą jedziemy dziś o 23. bartek, jedziesz czy nie?'),
    g('bartek', 'nie'),
    interlude('23:20', 'Kuba i Igor jadą pod hutę.', 3200, { rest: 's1_departure' }),
    clock('2026-10-22T23:20'),
    ambient('tense'),
    g('kuba', 'jesteśmy pod bramą'),
    say('group', 'kuba', 'łańcuch. zamknięte', { img: 'k_gate' }),
    g('igor', 'kłódka nowa. reszta łańcucha ruda, ta się błyszczy'),
    g('kuba', 'jak maja tu wchodziła?'),
    goal('Pomóż Kubie i Igorowi dostać się na teren huty.', [
      'W galerii Mai jest zdjęcie ogrodzenia przy trafostacji. Przyjrzyj mu się.',
      'Przybliż zdjęcie „Ogrodzenie przy trafostacji” — prawy róg, siatka.'
    ]),
    show('group', { prompt: 'Pokaż, którędy wejść', accept: [{ ev: ['ev_fence_gap'] }], wrong: [['kuba', 'to nam nie pomoże wejść']] }),
    g('kuba', 'trafostacja… widzę ją. obchodzimy'),
    pause(3500),
    g('kuba', 'jest dziura w siatce. jesteśmy w środku'),
    sync('maja:cam58', { count: 1, text: 'Nowy plik w folderze Fotopułapki: CAM01_IMG_0058.JPG' }),
    scene('scCam58', [scare('s1_cam58', 'face', { img: 'c1_0058', caption: 'CAM-01 · 22.10.2026 · 23:41' })]),
    g('igor', 'no i właśnie mamy zdjęcie z jej fotopułapki. przynajmniej działa 🙃', { wording: 'to my na tym nowym zdjęciu. kamera złapała nas przy wejściu' }),
    /* Plan sprawdzony w s13: nie pytamy drugi raz o szatnię. */
    scene('s13go', [iff('flag:planChecked', [
      g('kuba', 'mam plan na pulpicie. hala B, pierwsze piętro, tak jak ustaliliśmy'),
      g('kuba', 'schody… są. idziemy'),
      go('s13at.szatnia')
    ])]),
    g('kuba', 'gdzie jest ta szafka 17?'),
    goal('Gdzie jest szatnia? Sprawdź plan ewakuacji w galerii Mai.', ['W galerii Mai jest zdjęcie planu ewakuacji hal A i B. Przybliż je.']),
    menu('group', [
      opt('Hala B, pierwsze piętro.', [g('kuba', 'schody… są. idziemy')], { exit: true }),
      opt('Hala A, za piecem.', [g('kuba', 'tu jest tylko piec. i zimno jak w psiarni. nie ma szafek')]),
      opt('W piwnicy, poziom −1.', [g('igor', 'Schody w dół są zalane do kolan. Szatni bym tam nie szukał.')])
    ]),
    scene('s13at', [label('s13at.szatnia')]),
    pause(3000),
    g('kuba', 'są szafki. 17 otwarta, kłódka wyłamana'),
    say('group', 'kuba', 'w środku coś wydrapane', { img: 'k_locker' }),
    give('ev_dk97'),
    g('kuba', 'D.K. 97'),
    g('igor', 'D.K.… Darek Kruk? Ten, co spadł z mostu?'),
    g('ola', 'W artykule był Dariusz K. Sąsiad Lisów. Ten, za którym chodził Tomek.'),
    g('kuba', 'teraz ta ściana. gdzie jest odprężarka?'),
    menu('group', [
      opt('Hala A, poziom −1, za piecem.', [g('kuba', 'za piecem są schody w dół. idziemy')], { exit: true }),
      opt('Hala B, przy magazynie.', [g('igor', 'same regały. gołębie chyba też nie wiedzą gdzie szatnia', { wording: 'są regały i puste przejście. tu nie ma schodów w dół. wracamy do hali a' })]),
      opt('Pod dziedzińcem.', [g('kuba', 'pod dziedzińcem jest beton')])
    ]),
    pause(3000),
    say('group', 'kuba', 'to tu', { img: 'k_wall' }),
    give('ev_patch'),
    g('kuba', 'ktoś to zastawił paletami i plandeką'),
    g('igor', 'Zaprawa jest świeża. Kruszy się pod palcem. Ktoś tu niedawno murował.', { wording: 'na podłodze jest jasny pył, przy cegłach też. wygląda świeżo. a reszta ściany jest ciemna od wilgoci' }),
    g('kuba', 'co jest za tą ścianą???'),
    choose('group', [
      opt('Nie ruszajcie ściany. To może być miejsce przestępstwa.', [g('igor', 'tak. nie ruszamy'), g('kuba', 'ok. ok.')], { trust: { igor: 1 }, set: { noBreak: true } }),
      opt('Zajrzyjcie przez szczelinę.', [g('kuba', 'nic nie widać. czarno. czuć wilgocią')]),
      opt('Rozbijcie ją.', [g('kuba', 'czym? ręką?'), g('igor', 'Kuba, stop. Nie mamy czym. I chyba nie powinniśmy.')], { trust: { kuba: 1, igor: -1 } })
    ]),
    g('kuba', 'czekaj'),
    g('kuba', 'coś leży pod paletą'),
    typing('group', 'kuba', 4000),
    say('group', 'kuba', '', { img: 'k_headlamp' }),
    give('ev_headlamp'),
    g('kuba', 'to czołówka mai'),
    g('kuba', 'ma naklejkę z kluską. sama ją kleiła'),
    g('kuba', 'ona tu była. ona tu była i ktoś'),
    g('ola', 'Kuba. Jestem tu. Napisz, czy stoisz z Igorem.', { wording: 'Kuba, gdzie masz Igora? Daj mu telefon na chwilę.' }),
    say('group', 'igor', 'Na filarze był uchwyt drugiej fotopułapki. Ktoś ją zerwał.', { img: 'k_mount' }),
    give('ev_mount'),
    pause(3000),
    g('igor', 'Cicho.'),
    g('igor', 'Światła na dziedzińcu.'),
    fx('heartbeat'),
    sync('maja:cam60', { count: 1, text: 'Nowy plik w folderze Fotopułapki: CAM01_IMG_0060.JPG' }),
    g('kuba', 'ktoś przyjechał'),
    choose('group', [
      opt('Zgaście latarki. Nie ruszajcie się.', [
        g('kuba', 'zgasiłem'),
        pause(3500),
        g('igor', 'Ktoś wszedł do hali. Latarka.'),
        g('kuba', 'idzie w naszą stronę'),
        typing('group', 'kuba', 6000),
        g('kuba', 'stanął. świeci na palety'),
        pause(5000),
        g('igor', 'Wyszedł. Idzie do auta. Teraz.'),
        g('kuba', 'wychodzimy')
      ], { trust: { igor: 1 } }),
      opt('Uciekajcie przez trafostację. Teraz!', [
        g('kuba', 'biegniemy'),
        g('igor', 'Kuba, cicho!'),
        fx('shake'),
        g('kuba', 'krzyknął „kto tu jest”'),
        g('kuba', 'znam ten głos. skądś go znam'),
        g('igor', 'Jesteśmy przy siatce.')
      ]),
      opt('Zobaczcie, kto to jest. Ostrożnie.', [
        g('kuba', 'widzę latarkę. duży facet. kurtka'),
        g('igor', 'kuba wracaj. nie podchodź do niego'),
        g('kuba', 'ok ok. idziemy')
      ], { trust: { kuba: 1 } })
    ]),
    pause(2500),
    say('group', 'igor', 'mam zdjęcie auta zza trafostacji. tylko końcówka tablicy, bliżej nie podejdę', { img: 'i_car' }),
    give('ev_car_igor'),
    iff('flag:leakCams', [
      pause(3500),
      sync('maja:cam61', { count: 1, text: 'Nowy plik w folderze Fotopułapki: CAM01_IMG_0061.JPG' }),
      set('cam1Dead'),
      g('igor', 'kamera przy bramie nie odpowiada. na ostatnim zdjęciu ręka przy obiektywie'),
      g('igor', 'była w bluszczu. trzeba wiedzieć gdzie patrzeć żeby ją znaleźć')
    ]),
    g('kuba', 'jesteśmy w aucie. jedziemy'),
    clock('2026-10-23T00:50'),
    g('ola', 'Napiszcie, jak będziecie w domu.'),
    pause(4000),
    g('kuba', 'jesteśmy'),
    g('kuba', 'dzięki, %name%. bez ciebie łazilibyśmy tam do rana'),
    pause(3000),
    fx('glitch'),
    sz('ten samochod nie byl tam pierwszy raz'),
    sz('15.10 . 02:05'),
    sz('patrz w ciemno', { wording: 'zdjęcie jest prawie czarne. w ciemni coś z niego wyciągniesz' }),
    pause(2500),
    end('ch3')
  ];
});
