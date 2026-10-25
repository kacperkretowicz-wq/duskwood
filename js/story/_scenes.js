'use strict';
/* Sesje 12–19 i 28–29 z BIBLIA-SEZONOW.md, dopisane po wydaniu.
   Każda sekcja trafia do rozdziału jako scene(id, kroki): własna przestrzeń etykiet,
   więc stare zapisy zachowują identyfikatory wyborów. Indeksy przelicza migracja v3. */
const StoryScenes = D => {
  const { say, pic, pause, choose, opt, show, unlock, set, iff, typing, give, goal, openChat, clock, notify } = D;
  const g = (who, t, o) => say('group', who, t, o);
  const S = (t, o) => say('sylwia', 'sylwia', t, o);
  const Z = (t, o) => say('zuza', 'zuza', t, o);
  const B = (t, o) => say('bartek', 'bartek', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);
  const I = (t, o) => say('igor', 'igor', t, o);
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const V = (chat, who, dur, text, from = '') => say(chat, who, `voice:${dur}|${from}|${text}`);
  const E = id => s => s.vars.endingId === id;

  return {
    /* Sesja 12 — Komendant: sprawdzalna prośba kontra „prywatnie do mnie”. */
    s12: [
      pause(2000),
      unlock('chat:sylwia'),
      iff('flag:metSylwia',
        [S('To znowu ja, Sylwia z grupy. Przepraszam, że tak wieczorem…')],
        [S('Dzień dobry, Sylwia Pietrzak, prowadzę grupę „Mglisko — co się dzieje”. Numer mam od Kuby. Przepraszam, że tak wieczorem…'), set('metSylwia')]),
      S('Pan komendant wrzucił do grupy post i prosi, żebym go przypięła.'),
      S('„Osoby posiadające zdjęcia lub nagrania z terenu huty proszę o przesyłanie ich PRYWATNIE do mnie. Nie publikujcie. Pozwólcie działać policji.”'),
      give('ev_gajda_fb'),
      S('Niby rozsądne… ale coś mi nie pasuje. Jak zgłaszałam kradzież roweru syna, to był numer sprawy i mail komendy w Dzierżoniowie. A tu prywatna wiadomość.'),
      choose('sylwia', [
        opt('Przypnij oficjalny kontakt: 112 i Komenda Powiatowa w Dzierżoniowie. Bez prywatnych wiadomości.', [
          S('Tak zrobię. Dopiszę, że materiały przyjmuje komenda, z numerem sprawy.'),
          S('Pan komendant pewnie się obrazi. Trudno, strzygę jego żonę od dziesięciu lat, przeżyję 🙃')
        ], { wording: 'Proszę przypiąć kontakt do komendy w Dzierżoniowie. Niech zdjęcia trafiają tam.', set: { sylwiaOfficial: true } }),
        opt('Nie przypinaj niczego, dopóki ktoś nie poda numeru sprawy.', [
          S('Dobrze. Napiszę mu, że czekam na numer sprawy.'),
          S('Ciekawe, co odpisze.')
        ], { wording: 'Proszę nic nie przypinać, dopóki ktoś nie poda numeru sprawy.', set: { sylwiaOfficial: true } }),
        opt('Dlaczego pytasz mnie, a nie Kubę?', [
          S('Bo Kuba ma dziewiętnaście lat i siostrę na plakatach. Nie będę mu dokładać.'),
          S('Przypnę numer komendy w Dzierżoniowie. Prywatnych wysyłek nie polecam nikomu.')
        ], { wording: 'Dlaczego pyta pani mnie, a nie Kubę?', set: { sylwiaOfficial: true } })
      ]),
      S('Jeszcze jedno. Dziewczyna z Klipo, Zuza, pyta o Twój numer. Dać jej?'),
      choose('sylwia', [
        opt('Daj. Ale niech pisze, nie publikuje.', [S('Przekażę słowo w słowo 🙏')], { wording: 'Proszę dać. Ale niech pisze, nie publikuje.' }),
        opt('Daj, porozmawiam z nią.', [S('Dobrze. Ona jest w porządku. Tylko szybka.')], { wording: 'Proszę dać, porozmawiam z nią.' })
      ]),
      unlock('chat:zuza')
    ],

    /* Sesja 13 — Plan huty: dwa plany, ta sama szatnia. Bez losowych „złych drzwi”. */
    s13: [
      g('bartek', 'czekajcie. stary mial w garazu plan huty z 94. robil tam kiedys instalacje'),
      pic('group', 'bartek', 'm_plan', 'to samo co u mai na zdjeciu? jego jest starszy'),
      g('igor', 'u mai jest plan ewakuacji z 1995, ten z korytarza. u bartka techniczny'),
      choose('group', [
        opt('Na obu szatnia jest w hali B. Plany się zgadzają, więc idziemy według nich.', [
          g('igor', 'ok. czyli nie zgadujemy na miejscu'),
          g('kuba', 'zrzucam sobie oba na pulpit. bateria 61%')
        ], { wording: 'Na obu szatnia jest w B. Zapiszcie je sobie, na miejscu porównacie.', set: { planChecked: true } }),
        opt('Sprawdźmy, czy coś zmieniło się po 1995.', [
          g('bartek', 'stary mowi ze po zamknieciu w 96 nic nie przebudowywali. ale sam tego nie sprawdzalem'),
          g('igor', 'czyli na obu szatnia jest w B. na miejscu sprawdzimy')
        ], { set: { planChecked: true } })
      ])
    ],

    /* Sesja 14 — Klisza: negatyw, pozytyw roboczy, oryginał nietknięty. */
    s14: [
      g('igor', 'i jedna prośba. nie puszczajcie tego przez żadne „ai enhance”'),
      g('igor', 'to dorysuje twarze, których na kliszy nie ma. a potem ktoś to wydrukuje w gazecie'),
      choose('group', [
        opt('Zostawiam negatyw i plik z telefonu Mai bez zmian. Pracuję na kopii.', [g('igor', 'dzięki. serio. to jest różnica między dowodem a fanartem', { wording: 'dzięki. bo ja potem już nie rozpoznam, co tam było naprawdę' })], { wording: 'Ok, zrobię kopię. Tych plików od Mai nie ruszam.', set: { keptOriginal: true } }),
        opt('Rozjaśnienie wystarczy. Nic nie dorysowuję.', [g('igor', 'tak. tylko zachowaj oryginał i zapisz ustawienia')], { set: { keptOriginal: true } })
      ]),
      pause(2500),
      Z('hej, tu zuza. sylwia dala mi numer'),
      Z('slyszalam ze macie cos z kliszy. starej'),
      Z('nie wrzuce. obiecuje. tylko chce zobaczyc'),
      choose('zuza', [
        opt('Nie wyślę. To nie jest moje zdjęcie i nie wiem jeszcze, kto na nim jest.', [Z('ok, sorry. nie pomyslalam'), Z('to daj znac jak bedzie mozna cos powiedziec. do tego czasu nic nie wrzucam')], { set: { zuzaWaited: true } }),
        opt('Skąd wiesz o kliszy?', [Z('ktos w komentach pisal ze maja wywolywala jakis stary film'), Z('czyli prawda. ok. nie pytam dalej'), Z('ale jak bedzie mozna, to powiedz')], { set: { zuzaWaited: true } })
      ]),
      set('metZuza')
    ],

    /* Sesja 15 — Żółta peleryna: zestawienie kadrów, cegieł i przedmiotu. Pytanie o chłopca. */
    s15: [
      g('ola', 'Zanim napiszemy do kogokolwiek. Zbierzmy, co naprawdę mamy.', { wording: 'Czekajcie z pisaniem do ludzi. Bo ja już się w tym gubię.' }),
      g('ola', 'Na kliszy jest dziecko w żółtej pelerynie. Maja znalazła też ten nowszy mur i kamerę. Co jeszcze?'),
      g('kuba', 'i to że w artykule tomek miał żółtą pelerynę'),
      choose('group', [
        opt('To pasuje do Tomka, ale nie wiemy, czy to on. Zapytajmy kogoś, kto go znał.', [g('ola', 'Tak. Napisanie „to Tomek” jego siostrze bez pewności byłoby okrutne.', { wording: 'Dobra. Tylko bez pisania jego siostrze, że już go znaleźliśmy.' })], { wording: 'Może to Tomek. Ktoś, kto go znał, powinien zobaczyć ten kadr.', trust: { ola: 1 }, set: { askedAboutBoy: true } }),
        opt('Peleryna, huta, ta noc. To musi być on.', [g('ola', 'Może. Ale „musi” to jeszcze nie jest dowód.', { wording: 'Też mi pasuje. Ale twarzy przecież nie widać.' }), g('kuba', 'też mi się wydaje że to on'), g('kuba', 'ale co jeśli się mylimy?')], { set: { askedAboutBoy: true } })
      ])
    ],

    /* Sesja 16 — Weronika: Tomek jako człowiek, jej pamięć, zgoda na nagranie. */
    s16: [
      W('Proszę mi wybaczyć, że piszę tak nieskładnie.'),
      W('Pamiętam z tamtego wieczoru mało. Kaptur. Mleko, które miał kupić i nie kupił. Mama krzyczała o to mleko, a potem już nigdy o nic nie krzyczała.'),
      choose('weronika', [
        opt('Maja nagrała z panią rozmowę 11.10. Czy możemy jej odsłuchać?', [W('Tak. Zgodziłam się wtedy, żeby Maja mnie nagrała. {Pan|Pani} też może tego posłuchać.'), W('Tylko proszę nie wrzucać tego do internetu. Mój głos w telefonach obcych ludzi… nie.')], { wording: 'Maja nagrała z panią rozmowę 11.10. Czy możemy jej posłuchać?', set: { weronikaConsent: true }, trust: { weronika: 1 } }),
        opt('Nie musi pani teraz nic więcej pisać.', [W('Dziękuję.'), W('Nagranie z Mają może {Pan|Pani} odsłuchać. Byle nie w internecie.')], { set: { weronikaConsent: true } })
      ]),
      W('Miałam wtedy dwanaście lat. Czasem już nie wiem, co sama pamiętam, a co znam z opowieści mamy.')
    ],

    /* Sesja 17 — Nagranie: nazwiska z zaszumionego fragmentu sprawdzone w drugim źródle. */
    s17: [
      pause(2000),
      S('Przepraszam, że się wtrącam. Ktoś w grupie wkleił cztery nazwiska z jakiegoś „przecieku”. Usunęłam.'),
      S('Ale mamy w grupie album „Mglisko lat 90”. Pod zdjęciem z dożynek 1997 jest podpis: „Robert G., Leszek M., Marek S., Darek K. — nasza młodzież 😄”. Dodała go pani Bożena w 2016.'),
      give('ev_album97'),
      choose('sylwia', [
        opt('To potwierdza, że znali się w 1997. Nie mówi, co robili w hucie.', [S('No właśnie. Dlatego nie przypinam. Ludzie i tak już robią z tego wyrok.')], { wording: 'Czyli znali się wtedy. Ale pod tym zdjęciem nie ma nic o hucie.', set: { namesChecked: true } }),
        opt('Możesz zablokować komentarze pod albumem?', [S('Zablokowałam. Dostałam już trzy wiadomości, że „ukrywam prawdę” 🙄'), S('Zdjęcia nie usuwam, ale nie pozwolę tam ludzi wyzywać.')], { wording: 'Może pani zablokować komentarze pod albumem?', set: { namesChecked: true } })
      ]),
      S('I jeszcze… Darek K. to Darek Kruk. Wujek tej Zuzy.'),
      S('Zuza mówiła mi kiedyś, że babcia nie chce z nią rozmawiać o Darku. Chyba jeszcze nie widziała tego zdjęcia.'), S('Proszę na razie nic jej nie mówić, dobrze?'),
      choose('sylwia', [
        opt('Nie powiem. Niech Zuza sama zdecyduje, komu o tym mówić.', [S('Dziękuję 🙏')]),
        opt('Jeśli sama zapyta, nie będę kłamać.', [S('Rozumiem. Ja też nie. Ale niech chociaż nie dowie się z komentarzy.')])
      ])
    ],

    /* Sesja 18 — Sevra: dwa częściowe zapisy, jedno zgodne auto, nie kierowca. */
    s18: [
      iff('!flag:camsDeleted', [
      g('ola', 'Igor napisał do mnie prywatnie. Na grupę nie chce wracać, ale pyta, czy to na pewno jedno auto.'),
      g('ola', 'Na zdjęciu z fotopułapki widać DDZ 6K1, a na zdjęciu Igora końcówkę 19. Zrobiono je różnymi urządzeniami, w dwie różne noce.'),
      choose('group', [
        opt('Na obu zdjęciach jest ciemna magna, a fragmenty tablicy do siebie pasują. To różne noce. Kierowcy nie widać.', [g('ola', 'Przekażę mu. Dopiszę, że kierowcy nie widać.', { wording: 'Ok, prześlę mu oba. Może zobaczy coś, czego my nie widzimy.' }), g('kuba', 'czyli auto mamy, człowieka nie')], { wording: 'Wygląda na tę samą magnę, tablica pasuje. Ale kto nią jeździł?', set: { plateCareful: true } }),
        opt('Numer się zgadza, więc wiemy, kto tam był.', [g('ola', 'Igor odpisał od razu: „mamy numer. właściciela trzeba sprawdzić, a kierowcy i tak nie widać”.'), g('kuba', 'czyli wiemy prawie wszystko i nic')])
      ])
      ], [
        g('ola', 'Igor pisze do mnie prywatnie. Mamy tylko jego zdjęcie: końcówka 19 i ciemne auto.', { wording: 'Igor pisze do mnie prywatnie.' }),
        g('ola', 'Mówi, że to za mało, żeby cokolwiek przesądzić. Ale wystarczy, żeby Bartek sprawdził zeszyt.', { wording: 'Mówi, że to za mało, żeby cokolwiek przesądzić. Ale wystarczy, żeby Bartek sprawdził w warsztacie.' })
      ])
    ],

    /* Sesja 19 — Warsztat: właściciel, granice wiedzy Bartka, przygotowanie do rozmowy z Markiem. */
    s19: [
      pause(2000),
      B('jeszcze cos. tylko tobie'),
      B('w sejfie starego oprocz zeszytu jest teczka z 2011. faktury za furgonetke kurek-bud. serwis 13.09.2011'),
      B('dzien przed tym jak darek kruk spadl z mostu. stary nigdy o tym nie gadal'),
      give('ev_kb_invoice'),
      choose('bartek', [
        opt('Zrób zdjęcie i odłóż. To inna sprawa, nie mieszajmy jej z Mają.', [B('ok. zrobione. odlozylem tak jak lezalo')], { set: { invoiceAside: true } }),
        opt('Faktura potwierdza serwis, nie to, że ktoś był przy wypadku.', [B('wiem. samo to ze robil auto niczego nie dowodzi'), B('odlozylem')], { wording: 'To był tylko serwis. Nie nakręcajmy się jeszcze.', set: { invoiceAside: true } })
      ]),
      B('i jak mam z nim pogadac. o 97. on siedzi w garazu i nic'),
      choose('bartek', [
        opt('Zapytaj, co pamięta z tamtej nocy. Nie oskarżaj. Daj mu skończyć.', [B('sprobuje. on jak sie go przycisnie to wychodzi'), B('zrobie mu herbate. z cukrem, jak lubi')], { wording: 'Usiądź z nim. Zapytaj o tamtą noc, może w końcu coś powie.', trust: { bartek: 1 }, set: { bartekPrepared: true } }),
        opt('Powiedz mu, co już wiemy: kadr 21 i mur.', [B('dobra. jak bedzie wiedzial ze wiemy to moze przestanie udawac'), B('albo wyjdzie z garazu i bedzie trzaskal drzwiami')], { set: { bartekPrepared: true } })
      ])
    ],

    /* Sesja 28 — Pierwszy dzień potem. Rozgałęzione relacje, bez wszechwiedzącego narratora. */
    s28: [
      clock('2026-10-25T09:40'),
      iff(E('cisza'), [
        K('nie spałem'),
        K('policja z dzierżoniowa jest w sztolni od 5. nie wpuszczają nas nawet pod szlaban'),
        K('mama siedzi w kuchni w kurtce. nie chce jej zdjąć, „bo zaraz jedziemy”'),
        choose('kuba', [
          opt('Czy ktoś z wami jest?', [K('pani weronika przyszła o 7 z termosem. bartek śpi w aucie pod blokiem')]),
          opt('Zostaję pod telefonem. Pisz o wszystkim, nawet o drobiazgach.', [K('ok'), K('drobiazg: bandzior nie chce jeść. siedzi pod jej drzwiami')], { trust: { kuba: 1 } })
        ]),
        S('Dzień dobry. Organizujemy przeszukanie lasu od strony Sowiej Kopy. Policja się zgodziła, w kamizelkach, w grupach po pięć.'),
        S('Zgłosiło się 140 osób. Pan Henryk przyszedł pierwszy, o szóstej, z latarką z czasów Gierka.'),
        Z('ide z mama. bez telefonu w rece, obiecalam sylwii'),
        Z('jakbys cos {wiedział|wiedziała}… nie, wiem ze nie mozesz. ok')
      ], [
        K('jesteśmy w szpitalu w dzierżoniowie'),
        K('nie wpuszczają nas na długo. 10 minut i pielęgniarka wygania'),
        K('maja ma gips, kroplówkę i spytała czy ktoś nakarmił bandziora. więc chyba jest dobrze'),
        iff('flag:gajdaCaught',
          [K('policjant powiedział mamie, że gajda jest zatrzymany. mama nie płakała. umyła tylko trzy razy ten sam kubek')],
          [K('gajdy szukają. mama zamknęła drzwi na dwa zamki, a my nawet nie wiemy po co')]),
        choose('kuba', [
          opt('Maja chce z kimś rozmawiać?', [K('jeszcze nie. powiedziała że napisze sama jak będzie chciała'), K('i żebym nie robił z jej sali transmisji live xd')]),
          opt('A ty coś jadłeś?', [K('drożdżówkę z automatu. liczy się?')], { trust: { kuba: 1 } })
        ]),
        S('Wrzuciłam do grupy tylko jedno zdanie: „Maja jest bezpieczna. Rodzina prosi o spokój.” Komentarze wyłączone.'),
        Z('widzialam. placze w autobusie jak idiotka'),
        Z('nic nie nagrywam. ani slowa. obiecalam')
      ])
    ],

    /* Sesja 29 — Co zostało: korekty błędnych hipotez, konsekwencje, otwarcie sprawy nr 2. */
    s29: [
      clock('2026-11-02T18:20'),
      iff('flag:zuzaCorrected',
        [Z('przypielam sprostowanie na gorze profilu. dalej ktos co tydzien pisze „a jednak uciekla”')],
        [Z('usunelam tamten film. ludzie dalej wrzucaja screeny. nie umiem tego cofnac', { wording: 'usunelam ten moj filmik z „nowym nagraniem mai”. to bylo jej stare zdjecie z kadru. ludzie dalej wrzucaja screeny. nie umiem tego cofnac' })]),
      Z('i jeszcze… bylam u babci. z ciastkami'),
      Z('powiedzialam jej ze wiem o hucie. ze wujek tam byl w 97'),
      V('zuza', 'zuza', '0:34', 'ona dlugo nic nie mowila. a potem powiedziala tylko „Darek przez to nie mógł spać przez całe życie”. i ze o jego smierci to „nie, to inna sprawa, Zuziu”. i ze jest jakis pan, ktory to wszystko pisal, ale umarl. dziennikarz. i ze ona mu kiedys cos dala i obiecala nikomu nie mowic'),
      choose('zuza', [
        opt('Chyba Adam Rybicki. Mam jego dawny numer — dlatego Maja trafiła do mnie.', [Z('…'), Z('czekaj. czyli to jest twoj numer. ten po nim'), Z('ok to jest najdziwniejsza rzecz jaka slyszalam w tym roku'), Z('nie bede nic robic sama. ale nie odpuszcze')], { set: { zuzaKnowsRybicki: true } }),
        opt('Nie musisz teraz nic z tym robić. Babcia też nie.', [Z('wiem'), Z('ale ona pierwszy raz powiedziala o nim wiecej niz dwa zdania. to juz cos')])
      ]),
      pause(2500),
      S('Przypięłam w grupie przeprosiny dla pana Henryka. Miał rację z tą iskrą na Szklarskiej, a ludzie go zjechali.', { wording: 'Przypięłam w grupie przeprosiny dla pana Henryka ze Szklarskiej. Pisał, że w tamtą środę koło jedenastej stała tam czerwona iskra. Ludzie go zjechali, a miał rację.' }),
      S('Przyszedł do salonu z pierniczkami. Nic nie powiedział, tylko je postawił i wyszedł 🥲'),
      S('A, i pyta, czy ktoś kiedyś zapyta go o most. Nie wiem, o jaki most. Mówi, że „wy wiecie”.'),
      choose('sylwia', [
        opt('Przekaż mu, że ktoś zapyta. Nie od razu, ale zapyta.', [S('Przekażę. Ucieszy się, chociaż tego nie pokaże.')], { wording: 'Proszę mu przekazać, że ktoś zapyta. Nie od razu, ale zapyta.', set: { henrykPromise: true } }),
        opt('Nie obiecuj mu niczego w moim imieniu.', [S('Dobrze. Powiem, że przekazałam i tyle.')], { wording: 'Proszę mu niczego nie obiecywać w moim imieniu.' })
      ])
    ]
  };
};
