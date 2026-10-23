'use strict';
/* Kopia zapasowa telefonu Mai (Nimbus). unlock: klucz, który musi być odblokowany (domyślnie maja:base). */

DATA.maja = {
  security: [
    { q: 'Jak miał na imię twój pierwszy pies?', a: ['kluska'] },
    { q: 'Jaki był twój pierwszy aparat fotograficzny?', a: ['kometa', 'kometa e', 'kometa-e', 'kometae', 'kometa 12', 'aparat kometa'] }
  ],

  albums: [
    { id: 'aparat', name: 'Aparat' },
    { id: 'pulapki', name: 'Fotopułapki', note: 'Reguła poczty: załączniki od *cam@bushview.pl* zapisywane automatycznie. CAM-01 — brama, CAM-02 — hala A.' },
    { id: 'ciemnia', name: 'Negatywy', neg: true, note: 'Negatywy sfotografowane na podświetlarce (6.10). Kolory i jasności są odwrócone — otwórz w Ciemni, żeby zobaczyć pozytyw.' },
    { id: 'zrzuty', name: 'Zrzuty ekranu' }
  ],

  photos: [
    { art: 'm_ola_lake', album: 'aparat' },
    { art: 'm_bandzior', album: 'aparat' },
    { art: 'm_huta_ext', album: 'aparat' },
    { art: 'm_fence', album: 'aparat' },
    { art: 'm_plan', album: 'aparat' },
    { art: 'm_hall', album: 'aparat' },
    { art: 'm_lockers', album: 'aparat' },
    { art: 'm_kodak', album: 'aparat' },
    { art: 'm_darkroom', album: 'aparat' },
    { art: 'm_lehr', album: 'aparat' },
    { art: 'm_bricks', album: 'aparat' },
    { art: 'm_cam_install', album: 'aparat' },
    { art: 'm_library', album: 'aparat' },
    { art: 'm_mirror', album: 'aparat' },
    { art: 'm_window', album: 'aparat' },
    { art: 's_wall', album: 'aparat', unlock: 'maja:sync1' },
    { art: 's_door', album: 'aparat', unlock: 'maja:sync1' },
    { art: 's_blur', album: 'aparat', unlock: 'maja:sync1' },

    { art: 'c1_0003', album: 'pulapki', cam: 'c1', cond: '!flag:camsDeleted' },
    { art: 'c2_0004', album: 'pulapki', cam: 'c2', cond: '!flag:camsDeleted' },
    { art: 'c1_0011', album: 'pulapki', cam: 'c1', cond: '!flag:camsDeleted' },
    { art: 'c1_0014', album: 'pulapki', cam: 'c1', cond: '!flag:camsDeleted' },
    { art: 'c2_0019', album: 'pulapki', cam: 'c2', cond: '!flag:camsDeleted' },
    { art: 'c1_0021', album: 'pulapki', cam: 'c1', cond: '!flag:camsDeleted' },
    { art: 'c1_0022', album: 'pulapki', cam: 'c1', cond: '!flag:camsDeleted' },
    { art: 'c1_0023', album: 'pulapki', cam: 'c1', cond: '!flag:camsDeleted' },
    { art: 'c1_0031', album: 'pulapki', cam: 'c1', cond: '!flag:camsDeleted' },
    { art: 'c1_0044', album: 'pulapki', cam: 'c1', cond: '!flag:camsDeleted' },
    { art: 'c1_0057', album: 'pulapki', cam: 'c1', unlock: 'maja:cam57' },
    { art: 'c1_0058', album: 'pulapki', cam: 'c1', unlock: 'maja:cam58' },
    { art: 'c1_0060', album: 'pulapki', cam: 'c1', unlock: 'maja:cam60' },
    { art: 'c1_0061', album: 'pulapki', cam: 'c1', unlock: 'maja:cam61' },

    { art: 'p_08', album: 'ciemnia' },
    { art: 'p_14', album: 'ciemnia' },
    { art: 'p_21', album: 'ciemnia' },
    { art: 'p_22', album: 'ciemnia' },
    { art: 'p_23fog', album: 'ciemnia' },

    { art: 'z_article', album: 'zrzuty' },
    { art: 'z_kruk', album: 'zrzuty' }
  ],

  threads: [
    {
      id: 'mama', name: 'Mamuś 💛', who: 'mama', number: '607 993 140', msgs: [
        { t: '2026-10-02T12:10', text: 'Córciu, jesteś na obiad?' },
        { t: '2026-10-02T12:14', me: true, text: 'Będę o 14! Co jest?' },
        { t: '2026-10-02T12:15', text: 'Gołąbki.' },
        { t: '2026-10-02T12:15', me: true, text: 'KOCHAM CIĘ' },
        { t: '2026-10-09T19:40', text: 'Gdzie się podziewasz, ciemno już.' },
        { t: '2026-10-09T19:43', me: true, text: 'Kończę zdjęcia, za 20 min jestem 🙏' },
        { t: '2026-10-12T17:02', text: 'Kupić ci coś na jutro? Robię pierogi.' },
        { t: '2026-10-12T17:05', me: true, text: 'Ruskie!!! 🥟' },
        { t: '2026-10-13T15:02', text: 'Był u nas Robert Gajda. Pytał o ciebie i o te twoje zdjęcia w hucie. Mówi, że tam się wszystko sypie, że to teren prywatny i że ktoś może mieć przykrości.', clue: 'ev_mom_gajda' },
        { t: '2026-10-13T15:10', me: true, text: 'Gajda tu był?? Czego chciał naprawdę?', clue: 'ev_mom_gajda' },
        { t: '2026-10-13T15:12', text: 'Martwi się o ciebie. To przecież przyjaciel rodziny, tyle nam pomógł, jak tata się wyprowadził.' },
        { t: '2026-10-13T15:13', text: 'Uważaj na siebie, dobrze?' },
        { t: '2026-10-13T15:20', me: true, text: 'Mamuś, to tylko zdjęcia. Nic mi nie będzie 💛' },
        { t: '2026-10-14T22:30', me: true, text: 'Mamuś, jadę do Oli, wrócę późno. Nie czekaj 💛' },
        { t: '2026-10-14T22:31', text: 'Dobrze, tylko zapnij pasy. Dobranoc córciu.' },
        { t: '2026-10-24T03:05', me: true, text: 'Mamo, nic mi nie jest. Potrzebuję czasu. Nie szukajcie mnie. Pozdrów Kluskę.', clue: 'ev_sms_kluska', unlock: 'maja:sync1', status: 'Dostarczono' }
      ]
    },
    {
      id: 'ola', name: 'Olka 🖤', who: 'ola', number: '512 640 377', msgs: [
        { t: '2026-09-21T19:02', me: true, text: 'dobra, mam jedno na którym obie mamy otwarte oczy. wysyłam' },
        { t: '2026-09-21T19:04', text: 'Ja wyszłam jak ziemniak. Usuń.' },
        { t: '2026-09-21T19:04', me: true, text: 'Nigdy.' },
        { t: '2026-10-03T21:15', me: true, text: 'Olka. Byłam dziś w hucie. Chyba coś znalazłam.' },
        { t: '2026-10-03T21:17', text: 'Znowu ta huta 🙄 Co tym razem, duch Szklarza?' },
        { t: '2026-10-03T21:18', me: true, text: 'stara jednorazówka. cały film skończony, nikt go nie wywołał' },
        { t: '2026-10-03T21:20', text: 'No i?' },
        { t: '2026-10-03T21:21', me: true, text: 'Leżał w zamkniętej szafce od trzydziestu lat, Ola. Ktoś go tam schował.' },
        { t: '2026-10-07T23:40', me: true, text: 'mam już wywołane. możesz jutro zerknąć? nie wiem czy dobrze widzę' },
        { t: '2026-10-07T23:52', text: 'Jutro mi pokażesz, padam. Mam ranną zmianę.' },
        { t: '2026-10-11T20:05', me: true, text: 'Rozmawiałam z panią Weroniką. Tą od Tomka Lisa.' },
        { t: '2026-10-11T20:31', text: 'Maja… serio? Po co jej to rozdrapywać?' },
        { t: '2026-10-13T21:40', text: 'Maja, ja się serio martwię. Od tygodnia mówisz tylko o tym chłopcu i o tej hucie.', clue: 'ev_ola_fight' },
        { t: '2026-10-13T21:42', me: true, text: 'Bo ktoś go tam zostawił, Ola. Jestem prawie pewna.' },
        { t: '2026-10-13T21:44', text: 'Maja, to było 29 lat temu. A ty tam chodzisz sama po nocy. Co chcesz właściwie zrobić?' },
        { t: '2026-10-13T21:45', me: true, text: 'najpierw sprawdzić. jego siostra dalej nie wie, co się stało', clue: 'ev_ola_fight' },
        { t: '2026-10-13T21:47', text: 'To zanieś im te zdjęcia. Nie musisz sama wszystkiego rozgryzać.' },
        { t: '2026-10-13T21:47', me: true, text: 'Właśnie nie na policję.', clue: 'ev_ola_fight' },
        { t: '2026-10-13T21:49', text: 'Słyszysz siebie? Robisz się jak ci ludzie od teorii spiskowych.' },
        { t: '2026-10-13T21:51', text: 'Wiesz co? Rób, co chcesz. Ja mam dość tej obsesji.', clue: 'ev_ola_fight' },
        { t: '2026-10-13T21:58', me: true, text: 'Ok.' },
        { t: '2026-10-14T23:31', me: true, text: 'Przepraszam za wczoraj. Miałaś trochę racji, a trochę nie. Jak wrócę, opowiem ci wszystko. Wszystko. 🕯️', clue: 'ev_ola_sorry', status: 'Dostarczono' }
      ]
    },
    {
      id: 'kuba', name: 'Młody', who: 'kuba', number: '604 228 961', msgs: [
        { t: '2026-10-04T13:20', text: 'pożyczysz auto w sobotę' },
        { t: '2026-10-04T13:21', me: true, text: 'nie' },
        { t: '2026-10-04T13:21', text: '😭😭😭' },
        { t: '2026-10-04T13:23', me: true, text: 'ostatnio było 6 km zasięgu i frytka pod siedzeniem' },
        { t: '2026-10-04T13:23', text: 'to była dobra frytka' },
        { t: '2026-10-12T00:14', me: true, text: 'ej. dzięki że odebrałeś mamie te zakupy. kocham cię czasem' },
        { t: '2026-10-12T00:16', text: 'co ty umierasz xd' },
        { t: '2026-10-12T00:16', me: true, text: 'Głupi jesteś. Idź spać.' },
        { t: '2026-10-12T00:19', text: 'ty idź spać. i ja ciebie też. ale nie mów nikomu' },
        { t: '2026-10-14T21:50', text: 'gdzie moja ładowarka' },
        { t: '2026-10-14T21:51', me: true, text: 'W kuchni, ślepoto.' },
        { t: '2026-10-14T21:53', text: 'nie ma' },
        { t: '2026-10-14T21:55', me: true, text: 'To nie wiem. Biorę swoją, wrócę późno.' }
      ]
    },
    {
      id: 'bartek', name: 'Bartek', who: 'bartek', number: '669 301 552', msgs: [
        { t: '2026-04-18T22:30', text: 'czyli to koniec tak?' },
        { t: '2026-04-18T22:41', me: true, text: 'Bartek, rozmawialiśmy. Tak będzie lepiej dla nas obojga.' },
        { t: '2026-04-18T22:42', text: 'dla ciebie' },
        { t: '2026-10-03T17:00', me: true, text: 'Masz może łom? Taki porządny.' },
        { t: '2026-10-03T17:26', text: 'po co ci łom' },
        { t: '2026-10-03T17:27', me: true, text: 'Do zdjęć 🙃' },
        { t: '2026-10-03T17:40', text: 'nie mam' },
        { t: '2026-10-14T16:38', me: true, text: 'Możemy pogadać? To ważne. Chodzi o twojego tatę.', clue: 'ev_bartek_sms' },
        { t: '2026-10-14T16:44', text: 'co z moim starym' },
        { t: '2026-10-14T16:45', me: true, text: 'Nie przez telefon. Za pół godziny na stacji?' },
        { t: '2026-10-14T16:51', text: 'ok' },
        { t: '2026-10-14T19:52', text: 'zostaw to maja. serio. zostaw mojego ojca w spokoju', clue: 'ev_bartek_sms' },
        { t: '2026-10-14T19:58', me: true, text: 'Nie mogę. Przepraszam.' }
      ]
    },
    {
      id: 'igor', name: 'Igor (serwis)', who: 'igor', number: '733 905 014', msgs: [
        { t: '2026-10-01T11:02', me: true, text: 'Igor, znasz się na fotopułapkach z kartą SIM?' },
        { t: '2026-10-01T11:09', text: 'Technicznie rzecz biorąc znam się na wszystkim, co ma baterię ;)', clue: 'ev_igor_phrase' },
        { t: '2026-10-01T11:10', text: 'A co, chcesz złapać Szklarza na gorącym uczynku? xD' },
        { t: '2026-10-01T11:12', me: true, text: 'zamówiłam dwie. w apce już „przygotowane do wysyłki”, czyli jeszcze tydzień xD' },
        { t: '2026-10-09T17:58', text: 'Kamery skonfigurowane. Wysyłają na maila, ustaw sobie regułę do Nimbusa, żeby wszystko się zapisywało. Login i hasło do panelu ci wysłałem.', clue: 'ev_igor_cams' },
        { t: '2026-10-09T18:00', me: true, text: 'Jesteś złoty.' },
        { t: '2026-10-09T18:01', text: 'Wiem. Piwo.' },
        { t: '2026-10-10T12:40', me: true, text: 'Wpadnę z negatywami koło 15? Mój skaner padł na amen.' },
        { t: '2026-10-10T12:41', text: 'Spoko, wrzucę na ten duży. 2400 dpi, będzie widać każdy pyłek.' },
        { t: '2026-10-10T19:20', text: 'Skany gotowe. Skaner przytkał się przy 23, ta klatka jest prześwietlona, nic tam nie ma. Reszta na pendrivie, odbierz jutro.', clue: 'ev_igor_lie' },
        { t: '2026-10-10T19:24', me: true, text: 'szkoda tej 23. resztę odbiorę jak będę z zajęć wracać, dzięki' },
        { t: '2026-10-12T23:58', text: 'Maja, skąd właściwie masz ten film?' },
        { t: '2026-10-13T00:03', me: true, text: 'Mówiłam. Z huty, z szafki. Czemu?' },
        { t: '2026-10-13T00:09', text: 'Tak pytam. Uważaj tam na siebie, ok?' },
        { t: '2026-10-13T00:10', me: true, text: 'Igor, co jest?' }
      ]
    },
    {
      id: 'weronika', name: 'p. Weronika (biblioteka)', who: 'weronika', number: '608 117 942', msgs: [
        { t: '2026-10-10T09:12', me: true, text: 'Dzień dobry, pani Weroniko. Tu Maja Wrona, córka Ewy. Robię projekt o hucie i… chciałabym porozmawiać o Tomku. Wiem, że to trudne. Zrozumiem, jeśli pani odmówi.' },
        { t: '2026-10-10T10:30', text: 'Dzień dobry, Maju. Pamiętam Cię jako dziewczynkę z aparatem większym od głowy. Przyjdź jutro do biblioteki o 16:00. Porozmawiamy.' },
        { t: '2026-10-11T18:30', me: true, text: 'Dziękuję za rozmowę. I przepraszam, jeśli rozdrapałam ranę.' },
        { t: '2026-10-11T18:52', text: 'Ta rana nigdy się nie zagoiła, Maju. Dziękuję, że ktoś jeszcze pyta. Mało kto pyta.' }
      ]
    },
    {
      id: 'rybicki', name: 'A. Rybicki (Gazeta)', who: 'unknown', number: '692 117 305', msgs: [
        { t: '2026-10-13T21:12', me: true, text: DATA.storyTexts.firstMajaSMS, status: 'Dostarczono' }
      ]
    },
    {
      id: 'paczka', name: 'PaczkoPunkt', who: 'unknown', number: '8080', msgs: [
        { t: '2026-10-08T10:12', text: 'Twoja paczka od BushView Polska czeka w automacie MGL01M (Rynek 3). Kod odbioru: 418220. Masz 48 h.' }
      ]
    },
    {
      id: 'siec', name: 'Sieć Pi', who: 'unknown', number: '2000', msgs: [
        { t: '2026-10-05T08:00', text: 'Sieć Pi: Twój rachunek za 09.2026 wynosi 45,00 zł. Dziękujemy, że jesteś z nami!' }
      ]
    }
  ],

  calls: [
    { t: '2026-10-14T23:47', name: 'A. Rybicki (Gazeta)', dir: 'noans', dur: '' },
    { t: '2026-10-14T20:10', name: 'Mamuś 💛', dir: 'in', dur: '1:12' },
    { t: '2026-10-14T16:41', name: 'Bartek', dir: 'noans', dur: '' },
    { t: '2026-10-13T22:31', name: 'A. Rybicki (Gazeta)', dir: 'noans', dur: '' },
    { t: '2026-10-13T21:05', name: 'Olka 🖤', dir: 'in', dur: '3:20' },
    { t: '2026-10-13T15:31', name: 'Mamuś 💛', dir: 'out', dur: '2:05' },
    { t: '2026-10-11T15:50', name: 'Biblioteka Gminna', dir: 'out', dur: '0:35' },
    { t: '2026-10-10T15:02', name: 'Igor (serwis)', dir: 'out', dur: '0:48' },
    { t: '2026-10-09T17:02', name: 'Igor (serwis)', dir: 'in', dur: '4:10' },
    { t: '2026-10-03T21:30', name: 'Olka 🖤', dir: 'out', dur: '12:44' }
  ],

  notes: [
    {
      id: 'szklo', title: 'Szkło pamięta — założenia', t: '2026-09-20T23:10', ev: 'ev_project',
      body: 'Projekt dyplomowy, pracownia fotografii, prof. Wilk.\n\n*Ślady widać dopiero pod światło.* Odcisk palca, rysa, miejsce po naklejce. Chcę fotografować rzeczy, które ktoś próbował doczyścić, a potem ludzi, którzy tu pracowali. Bez udawania, że budynek przemówi za nich.\n\nHuta „Jutrzenka”, zamknięta w 1996. Nikt tam nie chodzi oprócz dzieciaków i lisów.\n\nPlan:\n1. Hala A i B — dokumentacja, światło przez okna (październik = najlepsze niskie słońce)\n2. Szatnie i biura — przedmioty, które zostały po ludziach\n3. *Odprężarka* — tunel, w którym studzono szkło. Podobno 40 m!\n4. Portrety ludzi, którzy tu pracowali (zapytać mamę, kto żyje)\n5. Analog: Kometa + klisza cz-b. Telefon tylko do notatek.\n\nTytuł roboczy: *SZKŁO PAMIĘTA.*'
    },
    {
      id: 'ciemnia', title: 'Dziennik ciemni', t: '2026-10-05T23:48', ev: 'ev_darkroom',
      body: '5.10, łazienka zamieniona w ciemnię (sorry, Kuba).\n\nKlisza z jednorazówki z *szafki 17*. Kolorowa, 400 ASA, przeterminowana jakieś 28 lat. Domowy zestaw do koloru. Nie wiem, ile z tego przetrwało po tylu latach. Zapisuję czasy i temperaturę, żeby nie zgadywać przy następnym filmie.\n\nWynik: 24 klatki, 3 puste, reszta mocno zawoalowana, ale COŚ JEST.\n— chłopaki, kilku, impreza? flesz\n— burza za oknami, lato\n— *na 21 coś żółtego??* Negatyw robi z żółtego niebieski, muszę zobaczyć pozytyw\n— 22 prawie czarna\n— 23 prześwietlona na podglądzie\n\nSkaner padł. Fotografuję negatywy na podświetlarce telefonem — odwrócę potem w aplikacji. Igor ma porządny skaner, zapytać.'
    },
    {
      id: 'lista', title: 'Lista', t: '2026-10-09T08:30',
      body: '☑ fotopułapki ×2 (Igor pomoże z SIM)\n☑ opaski zaciskowe\n☐ kłódka nowa\n☑ czołówka — NOWE BATERIE\n☐ rękawice robocze\n☐ łom?? (Bartek „nie ma”… jasne)\n☐ karta SD zapas\n☐ ładowarka (KUBA!!!)'
    },
    {
      id: 'wl', title: 'Do rozmowy z p. Weroniką', t: '2026-10-10T22:05',
      body: '— jaki był Tomek? co lubił?\n— w co był ubrany tamtej nocy (żółta peleryna — sprawdzić)\n— z kim się kolegował? starsi chłopcy?\n— kto szukał? co mówiła policja?\n— czy ktoś kiedyś przyszedł i coś powiedział?\n— *NIE NACISKAĆ.*'
    },
    {
      id: 'pytania', title: 'Pytania', t: '2026-10-13T00:20', pin: '1797', hint: 'Notatka chroniona PIN-em.\nPodpowiedź właścicielki: *szafka + rok*', ev: 'ev_questions',
      body: 'Pytania (nie dla nikogo)\n\n1. Chłopcy z kadru 21 — kim są? Mają po 16–17 lat. Jeden ma na kurtce naszywkę, nie widać jaką. Drugiego chyba znam. Te oczy. Skąd?\n\n2. Dlaczego ktoś zamurował kawałek odprężarki? *Cegła dziurawka*, inna niż w reszcie ściany. Widać prostą krawędź poprawki i inną zaprawę. Nie potrafię datować jej ze zdjęcia. Huta zamknięta w 1996. Kto muruje w zamkniętej hucie?\n\n3. Pani Halina Mróz widziała „żółtą postać” na drodze do huty. Dlaczego szukali tylko w rzece?\n\n4. Kto prowadził poszukiwania? → komendant Zbigniew Gajda. *Ojciec Roberta.*\n\n5. Szafka 17 — D.K.? Darek Kruk? Zginął w 2011, most kolejowy. P. Weronika mówi, że Tomek chodził za nim jak cień.\n\n6. Igor dziwnie pyta o film.\n\n*NIE MÓWIĆ NIKOMU, DOPÓKI NIE BĘDĘ PEWNA. ZWŁASZCZA R.G.*'
    },
    {
      id: 'rybicki', title: 'Do p. Rybickiego (szkic)', t: '2026-10-13T21:00',
      body: 'Panie Adamie,\n\nw 2007 pisał Pan, że pani Halina Mróz widziała Tomka na drodze do huty. Miał Pan rację.\n\nMam zdjęcia z tamtej nocy. *Tomek był w hucie. I nie był sam.*\n\nNie wiem, komu tu mogę zaufać. W Mglisku wszyscy się znają, a ci, którzy wtedy szukali, dalej tu rządzą.\n\nProszę, niech Pan oddzwoni.'
    }
  ],

  days: [
    { day: '2026-10-03', items: [{ from: '14:50', to: '16:40', place: 'huta' }, { from: '16:58', place: 'dom' }] },
    { day: '2026-10-08', items: [{ from: '13:40', to: '15:10', place: 'huta' }, { from: '15:24', place: 'dom' }] },
    { day: '2026-10-09', items: [{ from: '16:30', to: '17:05', place: 'serwis' }, { from: '17:15', to: '18:25', place: 'huta' }, { from: '18:40', place: 'dom' }] },
    { day: '2026-10-10', items: [{ from: '15:00', to: '15:40', place: 'serwis' }, { from: '15:52', place: 'dom' }] },
    { day: '2026-10-11', items: [{ from: '15:55', to: '17:20', place: 'biblioteka' }, { from: '17:34', place: 'dom' }] },
    {
      day: '2026-10-14', route: '1410', focus: 'huta', ev: 'ev_loc_1410', items: [
        { from: '00:00', to: '17:00', place: 'dom' },
        { from: '17:00', move: true, text: 'Przejazd samochodem', sub: '1,4 km' },
        { from: '17:05', to: '17:40', place: 'stacja' },
        { from: '17:55', to: '22:41', place: 'dom' },
        { from: '22:41', move: true, text: 'Przejazd samochodem', sub: '2,2 km · ul. Szklarska → droga do huty' },
        { from: '22:58', to: '23:58', place: 'huta', text: 'Ostatni sygnał: *23:58* · dokładność 12 m', last: true }
      ]
    },
    { day: '2026-10-24', unlock: 'maja:sync1', items: [{ from: '03:05', to: '03:07', place: 'las', text: 'Telefon online przez 2 minuty · dokładność ±800 m', last: true }] }
  ],

  mail: [
    { id: 'order', from: 'BushView Polska', addr: 'sklep@bushview.pl', av: 'bushview', t: '2026-10-01T11:40', subject: 'Potwierdzenie zamówienia nr 48213', body: 'Dziękujemy za zamówienie!\n\n2 × *BushView Trail 4G* (kamera leśna z modemem, oświetlacz IR 940 nm)\nRazem: 1 198,00 zł\n\nPo aktywacji kart SIM zdjęcia z kamer będą wysyłane na adres *maja.wrona@nimbus.pl*.\nPanel zdalny: panel.bushview.pl' },
    { id: 'asp', from: 'dr hab. Anna Wilk', addr: 'a.wilk@asp.wroc.pl', t: '2026-10-04T09:15', subject: 'Re: temat dyplomu', body: 'Pani Maju,\n\ntemat „Szkło pamięta” bardzo mi się podoba — ma w sobie i dokument, i metaforę. Proszę jednak pamiętać: opuszczony zakład to nie plener. *Nigdy sama*, i zawsze ktoś powinien wiedzieć, gdzie Pani jest.\n\nSerdecznie,\nA. Wilk' },
    { id: 'foto', from: 'Fotoforum', addr: 'newsletter@fotoforum.pl', t: '2026-10-06T07:00', subject: 'Wracają klisze! Nowa dostawa filmów 35 mm', body: 'Kolor, czarno-białe, slajdy. Sprawdź, zanim znikną.\n\nWypisz się z newslettera.' },
    { id: 'cam1', from: 'BushView Cloud', addr: 'noreply@bushview.pl', av: 'bushview', t: '2026-10-09T17:50', subject: 'Dodano urządzenia: CAM-01 „Brama”, CAM-02 „Hala A”', body: 'Do konta *maja.cam* dodano 2 urządzenia.\n\nCAM-01 „Brama” — online\nCAM-02 „Hala A” — online (słaby zasięg)\n\nKonfiguracja wykonana z komputera: *IGOR-SERWIS-PC*.\nZdjęcia będą wysyłane z adresu cam@bushview.pl.' },
    { id: 'rule', from: 'Nimbus', addr: 'noreply@nimbus.pl', av: 'nimbus', t: '2026-10-09T18:05', subject: 'Utworzono regułę poczty', body: 'Załączniki od *cam@bushview.pl* będą automatycznie zapisywane w folderze *Galeria → Fotopułapki*.' },
    { id: 'wojt', from: 'Urząd Gminy Mglisko', addr: 'sekretariat@mglisko.gmina.pl', av: 'gmina', t: '2026-10-12T18:44', ev: 'ev_wojt_mail', subject: 'Re: Zapytanie o archiwum zakładowe Huty „Jutrzenka”', body: 'Szanowna Pani,\n\nuprzejmie informuję, że archiwum zakładowe Huty Szkła „Jutrzenka” nie zachowało się. Teren huty stanowi własność prywatną, a stan techniczny budynków grozi katastrofą budowlaną. *Stanowczo odradzam penetrowanie obiektu*, w szczególności jego części podziemnych.\n\nZ poważaniem\n*Leszek Malicki*\nWójt Gminy Mglisko\n\n— — —\nW dniu 12.10.2026 o 13:05 Maja Wrona napisała:\n> Dzień dobry, przygotowuję dyplom o Hucie „Jutrzenka”. Czy w gminie zachowały się listy pracowników albo dokumentacja budynków — zwłaszcza tunelu odprężarki w hali A? Interesują mnie też prace prowadzone w budynku po 1990 roku.' },
    { id: 'promo', from: 'Sieć Pi', addr: 'oferty@siecpi.pl', t: '2026-10-11T10:00', subject: 'Więcej GB na jesień 🍂', body: 'Dodatkowe 50 GB za 0 zł przez 3 miesiące. Aktywuj w aplikacji.' }
  ],

  audio: [
    {
      id: 'note0810', title: 'Notatka — odprężarka', t: '2026-10-08T14:12', dur: '0:47',
      lines: [
        { t: '0:00', text: 'Ósmy października, hala A, poziom minus jeden. Odprężarka.' },
        { t: '0:06', text: 'Ten fragment ściany… cegły są inne. Jaśniejsze. Dziurawki. Zaprawa jak na szybko, wylewa się z fug.' },
        { t: '0:18', text: 'Wszystko inne jest przedwojenne. Ktoś to zamurował dużo, dużo później.' },
        { t: '0:27', text: 'Po co zamurowywać tunel w hucie, która i tak stoi pusta?' },
        { t: '0:35', text: 'Pod ścianą coś leży, chyba śmieć. Zrobię jeszcze zdjęcie i spadam, bo zimno jak w psiarni.' }
      ]
    },
    {
      id: 'wywiad', title: 'Rozmowa z p. Weroniką Lis', t: '2026-10-11T16:05', dur: '18:24', noisyBars: [16, 23],
      tune: { band: 1480, noise: 68 }, cleanEv: 'ev_interview',
      lines: [
        { t: '0:00', who: 'Maja', text: 'Mogę nagrywać? Tylko dla siebie, do notatek.' },
        { t: '0:04', who: 'Weronika', text: 'Nagrywaj, dziecko. Opowiadałam to już tyle razy, że przestało boleć. Tak sobie przynajmniej powtarzam.' },
        { t: '0:31', who: 'Maja', text: 'Jaki był Tomek?' },
        { t: '0:35', who: 'Weronika', text: 'Głośny. Ciekawski. Wszędzie go było pełno. Miał dziewięć lat i był przekonany, że jest dorosły.' },
        { t: '1:12', who: 'Weronika', text: 'Tamtego lata mama kupiła mu żółtą pelerynę, bo miał jechać na kolonie. Nie pojechał, bo przyszła woda. Chodził w niej codziennie, nawet jak nie padało.' },
        { t: '2:40', who: 'Weronika', text: 'I to tamagotchi. Dostał na komunię w maju. Nosił na sznurku na szyi, karmił to jajko po dziesięć razy dziennie.' },
        { t: '4:18', who: 'Maja', text: 'Z kim się wtedy kolegował?' },
        { t: '4:22', who: 'Weronika', noisy: true, text: 'Chodził za starszymi chłopakami. Za Darkiem Krukiem z naszego bloku, jak cień. I za jego kolegami: Robertem Gajdą, synem komendanta, Leszkiem Malickim i Markiem Sową. Tamtego lata byli nierozłączni.' },
        { t: '5:50', who: 'Weronika', noisy: true, text: 'Przeganiali go, a on wracał. Darek był dla niego jak starszy brat.' },
        { t: '7:02', who: 'Maja', text: 'Kto prowadził poszukiwania?' },
        { t: '7:05', who: 'Weronika', text: 'Komendant Gajda. Ojciec Roberta. Od pierwszej godziny mówił mamie: rzeka. Że woda go zabrała. Szukali w Mglicy, w zalewie, aż po Kłodzko.' },
        { t: '9:30', who: 'Weronika', text: 'Pani Halina Mróz mówiła, że widziała go wieczorem na drodze do huty. W tej pelerynie. Nikt jej nie słuchał — była już starsza, mówili, że jej się myli.' },
        { t: '10:48', who: 'Weronika', text: 'Huta stała na górze, woda tam nie doszła. Sprawdzili ją po dwóch tygodniach. Pobieżnie. Tak napisał pan Rybicki.' },
        { t: '15:20', who: 'Maja', text: 'Pani Weroniko… a gdyby się okazało, że on wcale nie utonął?' },
        { t: '15:31', who: 'Weronika', text: 'To ja bym wreszcie miała gdzie zapalić znicz.' }
      ]
    },
    {
      id: 'last', title: 'Notatka głosowa', t: '2026-10-14T22:52', dur: '0:31', ev: 'ev_last_note',
      lines: [
        { t: '0:00', text: 'Dobra. Jestem pod hutą. Dwudziesta druga pięćdziesiąt dwie.' },
        { t: '0:07', text: 'Jeśli to słuchasz, to… nie wiem, kto to słucha. Może ja, za tydzień, i będę się z siebie śmiać.' },
        { t: '0:16', text: 'Wchodzę zobaczyć, co jest za ścianą. Łom pożyczyłam od pana Józka z garaży, bo Bartek, wiadomo.' },
        { t: '0:25', text: 'Kuba, jeśli to ty — oddaj mi ładowarkę.' }
      ]
    }
  ],

  web: [
    { t: '2026-10-05T22:10', q: 'wywoływanie przeterminowanej kliszy kolorowej w domu' },
    { t: '2026-10-07T22:40', q: 'zaginiony chłopiec mglisko 1997' },
    { t: '2026-10-07T22:44', page: 'gazeta2007', title: 'Dziesięć lat ciszy. Kto widział Tomka Lisa?' },
    { t: '2026-10-07T23:02', q: 'adam rybicki dziennikarz kontakt' },
    { t: '2026-10-08T16:20', q: 'cegła dziurawka od kiedy produkowana' },
    { t: '2026-10-08T16:22', page: 'dziurawka', title: 'Cegła dziurawka — Wolnopedia' },
    { t: '2026-10-09T20:15', q: 'bushview trail 4g ustawienia mms' },
    { t: '2026-10-12T21:40', q: 'darek kruk mglisko' },
    { t: '2026-10-12T21:41', page: 'm24_kruk', title: 'Tragiczny wypadek na moście kolejowym' },
    { t: '2026-10-13T01:12', q: 'jak sprawdzić czy ktoś czyta moje wiadomości' },
    { t: '2026-10-14T19:40', q: 'odprężarka huta szkła budowa' },
    { t: '2026-10-14T19:42', page: 'odprezarka', title: 'Odprężarka (hutnictwo) — Wolnopedia' }
  ]
};
