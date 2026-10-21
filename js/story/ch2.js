'use strict';
/* ROZDZIAŁ 2 — Huta */

Engine.chapter('ch2', { num: 2, title: 'Huta', when: 'Czwartek, 22 października · wieczór', mood: 'calm' }, D => {
  const { say, pic, me, sys, pause, choose, menu, opt, show, waitFor, openChat, goal, give, unlock, set, iff, run, fx, typing, end, title, interlude, clock, ambient, sync, trust } = D;
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const B = (t, o) => say('bartek', 'bartek', t, o);
  const GJ = (t, o) => say('gajda', 'gajda', t, o);
  const g = (who, t, o) => say('group', who, t, o);
  const sz = (t, o) => say('szklarz', 'szklarz', t, o);

  return [
    clock('2026-10-22T19:40'),
    title(),
    K('{widziałeś|widziałaś} to zdjęcie z nocy?? 2:13'),
    K('ktoś był w hucie. sam. z latarką'),
    goal('Przyjrzyj się zdjęciu z fotopułapki z 22.10, 02:13. Kto to może być?', [
      'Otwórz zdjęcie i przybliż je — dwoma palcami, kółkiem myszy albo dwuklikiem.',
      'Na plecach kurtki jest napis. Przybliż mocno i dotknij go.'
    ]),
    waitFor('ev:ev_jacket', { hints: [{ after: 90, chat: 'kuba', who: 'kuba', text: 'ma jakiś napis na plecach. nie mogę przeczytać, ty masz lepszy ekran xd' }] }),
    K('i co, widać coś?'),
    show('kuba', { prompt: 'Pokaż, co widać na kurtce', accept: [{ ev: ['ev_jacket'] }], wrong: [['kuba', 'chodzi mi o gościa z 2:13. co ma na plecach?']] }),
    typing('kuba', 'kuba', 3000),
    K('„O-SOWA”'),
    K('auto-sowa. to kurtka z warsztatu bartka'),
    K('co on tam robił w nocy?? wczoraj pisał „nie idźcie tam”'),
    choose('kuba', [
      opt('Napiszę do niego. Spokojnie, bez oskarżeń.', [
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
        B('nie mow kubie. on i tak mnie nie trawi'),
        choose('bartek', [
          opt('Powiedz mi, po co. Nie oceniam.', [], { trust: { bartek: 1 } }),
          opt('Kuba już wie. Lepiej sam mu to wytłumacz.', [B('super')]),
          opt('Skłamałeś, że nie gadałeś z Mają od miesięcy.', [B('wiesz o stacji?'), B('no tak. przeczytales jej smsy')], { cond: 'ev:ev_bartek_sms' })
        ]),
        B('w srode 14-ego maja napisala ze chce pogadac o moim starym. spotkalismy sie na stacji'),
        B('pytala czy moj ojciec byl w hucie latem 97. w noc powodzi'),
        B('wkurzylem sie. powiedzialem zeby sie odczepila od mojej rodziny'),
        B('to byla nasza ostatnia rozmowa'),
        typing('bartek', 'bartek', 3500),
        B('od tygodnia nie spie. wczoraj nie wytrzymalem i pojechalem zobaczyc, czego ona tam szukala'),
        B('przy scianie w piwnicy ktos posprzatal. wszystko zastawione paletami. i czuc bylo swieza zaprawe. jak u nas w garazu jak stary murowal'),
        B('spieprzylem jak uslyszalem samochod na dole'),
        give('ev_bartek_conf'),
        B('nie pytaj mnie teraz o starego. nie dzis'),
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
        g('bartek', 'bo nie chce zeby kuba skonczyl w piwnicy z polamanymi nogami'),
        g('bartek', 'maja w srode pytala mnie o mojego starego. czy byl w hucie w 97. wkurzylem sie'),
        g('bartek', 'pojechalem zobaczyc czego szukala. przy scianie w piwnicy ktos posprzatal. i czuc bylo swieza zaprawe'),
        give('ev_bartek_conf'),
        g('kuba', 'i nie mogłeś tego napisać wczoraj??'),
        g('bartek', 'nie. bo to moj ojciec'),
        trust('bartek', -1),
        g('igor', 'Spokojnie. Bartek, dzięki, że mówisz. Świeża zaprawa to ważna rzecz.')
      ]),
      opt('Nie mówmy mu na razie, że wiemy.', [
        K('nie umiem tak'),
        K('sorry'),
        g('kuba', 'bartek. co robiłeś o 2 w nocy w hucie'),
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

    /* --- komendant Gajda --- */
    unlock('chat:gajda'),
    GJ('Dobry wieczór. Mówi aspirant sztabowy Robert Gajda, komendant posterunku w Mglisku.'),
    iff('flag:kubaToldGajda',
      [GJ('Kuba był u mnie dziś rano z mamą. Opowiedział mi o lokalizacji telefonu Mai. Rozumiem, że to {Pan|Pani} ją {znalazł|znalazła}.')],
      [GJ('Pani Ewa Wrona przekazała mi {Pana|Pani} numer. Rozumiem, że pomaga {Pan|Pani} rodzinie i ma dostęp do kopii telefonu Mai.')]),
    GJ('Doceniam to. Ale proszę pamiętać, że to sprawa policyjna.'),
    GJ('Co jeszcze {Pan|Pani} {znalazł|znalazła}?'),
    choose('gajda', [
      opt('Maja tamtej nocy była w hucie, nie na tamie.', [
        GJ('Rozumiem. To bardzo cenne. Sprawdzę hutę jeszcze raz. Osobiście.'),
        GJ('Proszę mi przesyłać wszystko, co {Pan|Pani} znajdzie. Bezpośrednio do mnie, nie do tej grupy. Młodzi ludzie potrafią narobić szkód.')
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

    /* --- negatywy --- */
    g('igor', 'Słuchajcie. Maja dała mi w zeszłym tygodniu negatywy do zeskanowania. Z tej kliszy z huty.'),
    g('igor', 'Klisza była przeterminowana. Większość klatek wyszła słabo.'),
    g('ola', 'A te skany gdzie są?'),
    g('igor', 'Oddałem jej na pendrivie. Ale ona sfotografowała negatywy też telefonem, powinny być w galerii.'),
    g('igor', '%name%, wyślę ci link do Ciemni. To apka do wywoływania — odwraca negatywy.'),
    unlock('app:ciemnia'),
    goal('Wywołaj negatywy Mai w Ciemni. Co jest na kliszy z szafki 17?', [
      'Otwórz *Ciemnię* i wybierz negatyw.',
      'Najpierw odwróć negatyw na pozytyw. Potem mocno rozjaśnij — klisza jest przeterminowana.',
      'Kadr 21: ekspozycja około +1,5 EV, kontrast odrobinę w górę.'
    ]),
    waitFor('ev:ev_frame21', { hints: [{ after: 100, chat: 'group', who: 'igor', text: 'W Ciemni: najpierw przełącz na „Pozytyw”, potem ekspozycja w górę. Mocno.' }] }),
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
    g('igor', 'Nie wiemy, z kiedy jest ta klisza.'),
    g('ola', 'Igor, serio? Dziecko w żółtej pelerynie w hucie. Tomek zniknął w żółtej pelerynie w noc, kiedy świadek widział go na drodze do huty.'),
    g('kuba', 'maja znalazła zdjęcie zaginionego chłopca z nocy, kiedy zaginął. w hucie'),
    g('kuba', 'a potem sama zniknęła W HUCIE'),
    set('yellowKnown'),
    pause(2000),

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
    g('kuba', 'nie. nie wierzę. gajda przynosił mi lego na komunię'),
    g('bartek', 'gajda to glina od 25 lat. nie przesadzajcie'),
    g('igor', '„Igor dziwnie pyta o film” — no super. Pytałem, skąd ma tak stary film, bo wyglądał na starszy ode mnie. Serio, ludzie.'),
    pause(2500),

    /* --- wyprawa --- */
    g('igor', 'Dobra. Jedziemy z Kubą, jak się ściemni na dobre. Bartek?'),
    g('bartek', 'nie'),
    interlude('23:20', 'Kuba i Igor jadą pod hutę.', 3200),
    clock('2026-10-22T23:20'),
    ambient('tense'),
    g('kuba', 'jesteśmy pod bramą'),
    say('group', 'kuba', 'łańcuch. nowy', { img: 'k_gate' }),
    g('igor', 'Kłódka świeża. Nawet nie zardzewiała. Ktoś ją niedawno założył.'),
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
    g('igor', 'Właśnie złapała nas fotopułapka Mai. Pozdrawiamy.'),
    g('kuba', 'gdzie jest ta szafka 17?'),
    goal('Gdzie jest szatnia? Sprawdź plan ewakuacji w galerii Mai.', ['W galerii Mai jest zdjęcie planu ewakuacji hal A i B. Przybliż je.']),
    menu('group', [
      opt('Hala B, pierwsze piętro.', [g('kuba', 'schody… są. idziemy')], { exit: true }),
      opt('Hala A, za piecem.', [g('kuba', 'tu jest tylko piec. i zimno jak w psiarni. nie ma szafek')]),
      opt('W piwnicy, poziom −1.', [g('igor', 'Schody w dół są zalane do kolan. Szatni bym tam nie szukał.')])
    ]),
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
      opt('Hala B, przy magazynie.', [g('igor', 'Tu są tylko regały i gołębie.')]),
      opt('Pod dziedzińcem.', [g('kuba', 'pod dziedzińcem jest beton')])
    ]),
    pause(3000),
    say('group', 'kuba', 'to tu', { img: 'k_wall' }),
    give('ev_patch'),
    g('kuba', 'ktoś to zastawił paletami i plandeką'),
    g('igor', 'Zaprawa jest świeża. Kruszy się pod palcem. Ktoś tu niedawno murował.'),
    g('kuba', 'co jest za tą ścianą???'),
    choose('group', [
      opt('Nie ruszajcie ściany. To może być miejsce przestępstwa.', [g('igor', 'Zgadzam się.'), g('kuba', 'ok. ok.')], { trust: { igor: 1 }, set: { noBreak: true } }),
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
    g('ola', 'Kuba, oddychaj.'),
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
        g('igor', 'Kuba, wracaj. Nie jesteśmy bohaterami.'),
        g('kuba', 'ok ok. idziemy')
      ], { trust: { kuba: 1 } })
    ]),
    pause(2500),
    say('group', 'igor', 'Zrobiłem zdjęcie auta zza trafostacji. Z daleka. Widać tylko końcówkę tablicy.', { img: 'i_car' }),
    give('ev_car_igor'),
    iff('flag:leakCams', [
      pause(3500),
      sync('maja:cam61', { count: 1, text: 'Nowy plik w folderze Fotopułapki: CAM01_IMG_0061.JPG' }),
      set('cam1Dead'),
      g('igor', 'Kamera przy bramie właśnie przestała odpowiadać. Ostatnie zdjęcie to czyjaś ręka.'),
      g('igor', 'Była schowana w bluszczu. Skąd wiedział, gdzie szukać?')
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
    sz('patrz w ciemno'),
    pause(2500),
    end('ch3')
  ];
});
