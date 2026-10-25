'use strict';
/* Dowody. cat: kategoria, img: grafika, source: skąd pochodzi. */

DATA.evCat = {
  digital: { name: 'Ślady cyfrowe', icon: 'globe' },
  msg: { name: 'Wiadomości i dokumenty', icon: 'note' },
  photo: { name: 'Zdjęcia', icon: 'image' },
  place: { name: 'Miejsca i ślady', icon: 'pin' },
  object: { name: 'Przedmioty', icon: 'puzzle' },
  testimony: { name: 'Zeznania', icon: 'user' }
};

DATA.evidence = {
  /* ---------- prolog ---------- */
  ev_missed: {
    title: 'Nieodebrane połączenia od Mai', cat: 'digital', source: 'Twój telefon',
    desc: 'Numer +48 731 402 118 dzwonił do ciebie dwa razy: *13.10 o 22:31* i *14.10 o 23:47*. Według bilingu drugie połączenie jest ostatnim przed zniknięciem Mai. Nie zostało odebrane.'
  },
  ev_sms_maja: {
    title: 'SMS od Mai (13.10, 21:12)', cat: 'msg', source: 'Twój telefon',
    desc: '„' + DATA.storyTexts.firstMajaSMS + '”'
  },
  ev_article2007: {
    title: 'Artykuł „Dziesięć lat ciszy” (2007)', cat: 'msg', source: 'Gazeta Sudecka, archiwum', img: 'web_flood97',
    desc: 'Adam Rybicki o zaginięciu 9-letniego *Tomka Lisa* w noc powodzi, 7/8 lipca 1997. Chłopiec miał na sobie *żółtą pelerynę*. Policja szukała w rzece. Świadek, *Halina Mróz*, widziała „żółtą postać” na drodze *do huty* — nikt jej nie słuchał. W stopce artykułu: numer telefonu autora. *Twój numer.*'
  },
  ev_obit: {
    title: 'Nekrolog Adama Rybickiego', cat: 'msg', source: 'Gazeta Sudecka',
    desc: 'Adam Rybicki, dziennikarz Gazety Sudeckiej, zmarł w lutym 2021 roku. Jego numer komórkowy został po latach przydzielony nowemu abonentowi — tobie. Maja nie mogła o tym wiedzieć.'
  },
  ev_backup_cut: {
    title: 'Urwana kopia Nimbusa (14.10, 23:58)', cat: 'digital', source: 'Twój telefon · podgląd',
    desc: 'Przy SMS-ie z 13.10 telefon próbował wczytać podgląd zdjęć. Z Nimbusa wróciła tylko data: *ostatnia kopia urządzenia 14.10.2026, 23:58*. Potem zapis się urywa. Bez hasła nie widać treści kopii ani miejsca.'
  },
  ev_sim_footer: {
    title: 'Numer karty SIM', cat: 'digital', source: 'Twój telefon',
    desc: 'Stopka artykułu z 2007 roku podaje *692 117 305*. Telefon rozpoznał w niej numer karty SIM, która jest w środku.'
  },

  /* ---------- rozdział 1 ---------- */
  ev_kluska: { title: 'Kluska — pierwszy pies Mai', cat: 'photo', source: 'Kadr: @maja.wrona', img: 'k_kluska', desc: 'Jamniczka Kluska (2006–2019). Pierwsza psia miłość Mai — „zanim pojawił się Bandzior”.' },
  ev_kometa: { title: 'Kometa-E — pierwszy aparat Mai', cat: 'object', source: 'Kadr: @maja.wrona', img: 'k_kometa', desc: 'Prezent od dziadka na 12. urodziny. „Mój pierwszy aparat. Waży tonę, kocham go.”' },
  ev_dam_news: {
    title: 'Samochód Mai na tamie', cat: 'msg', source: 'Mglisko24.pl', img: 'web_dam',
    desc: 'Czerwoną iskrę Mai znalazł wędkarz *15.10 o 6:40* na koronie tamy Zalewu Mgliskiego. Na barierce wisiała jej kurtka. Komendant Gajda: „wszystko wskazuje na tragiczny wypadek lub targnięcie się na życie”. Nurkowie nic nie znaleźli.'
  },
  ev_loc_1410: {
    title: 'Lokalizacja Mai: 14.10', cat: 'digital', source: 'Nimbus · historia lokalizacji', img: 'map_snip1410',
    desc: 'Dom → stacja „Mglica” (17:05–17:40) → dom → *22:58 Huta Szkła „Jutrzenka”*. Ostatni zapis telefonu: *23:58, w hucie*, dokładność 12 m. W zachowanej historii nie ma pozycji na tamie, która leży 3 km dalej. Po utracie sygnału nie da się odtworzyć dalszej trasy z tych danych. Lokalizacja telefonu nie jest pewną lokalizacją właścicielki.',
    open: { app: 'nimbus', params: { section: 'loc', day: '2026-10-14' }, label: 'Otwórz historię lokalizacji' }
  },
  ev_ola_fight: { title: 'Kłótnia Mai i Oli (13.10)', cat: 'msg', source: 'Nimbus · SMS', desc: 'Dzień przed zniknięciem Ola nazwała poszukiwania Mai „obsesją”. Maja: „Jego siostra czeka od 29 lat”. Ola twierdziła w grupie, że ostatni raz pisały *12.10* i „wszystko było normalnie”. *To nieprawda.*' },
  ev_ola_sorry: { title: 'SMS do Oli: „Przepraszam za wczoraj”', cat: 'msg', source: 'Nimbus · SMS', desc: '14.10, 23:31 — Maja pisze do Oli z huty: „Przepraszam za wczoraj. Jak wrócę, opowiem ci wszystko. Wszystko.” Szesnaście minut później dzwoni do ciebie.' },
  ev_project: { title: 'Notatka: „Szkło pamięta”', cat: 'msg', source: 'Nimbus · notatki', desc: 'Projekt dyplomowy Mai o opuszczonej hucie: hale A i B, szatnie, *odprężarka* (długi tunel do studzenia szkła), portrety dawnych hutników.' },
  ev_darkroom: { title: 'Dziennik ciemni (5.10)', cat: 'msg', source: 'Nimbus · notatki', desc: 'Maja wywołała kliszę z aparatu znalezionego w *szafce 17*. Klisza z ok. 1997 roku. „Na 21 coś żółtego?? Negatyw robi z żółtego niebieski.” Negatywy sfotografowała telefonem, żeby odwrócić je później.' },
  ev_cam2_0019: { title: 'Fotopułapka 2: mężczyzna z latarką (13.10)', cat: 'photo', source: 'Nimbus · Fotopułapki', img: 'c2_0019', desc: '13.10, 02:40. Ktoś ogląda mur w odprężarce i kieruje latarkę prosto w kamerę. Twarz zginęła w odblasku. Dzień później Maja zniknęła.' },
  ev_cam1_maja: { title: 'Fotopułapka 1: Maja przy bramie (14.10)', cat: 'photo', source: 'Nimbus · Fotopułapki', img: 'c1_0021', desc: '14.10, 22:57. Ostatnie znane zdjęcie Mai: z czołówką, w kurtce, idzie przez dziedziniec huty.' },
  ev_cam1_car: { title: 'Fotopułapka 1: samochód przy bramie (15.10)', cat: 'photo', source: 'Nimbus · Fotopułapki', img: 'c1_0022', desc: '15.10, 01:20 — ciemny samochód z włączonymi światłami podjeżdża pod bramę huty. Kilka godzin później auto Mai „znajduje się” na tamie. Tablicy nie widać.' },
  ev_mom_gajda: { title: 'SMS: „Gajda tu był??”', cat: 'msg', source: 'Nimbus · SMS z mamą', desc: '13.10 mama pisze Mai, że odwiedził ich *komendant Robert Gajda*: pytał o projekt w hucie, mówił, że to niebezpieczne i że to teren prywatny. Maja: „Gajda tu był?? Czego chciał naprawdę?”' },
  ev_bartek_sms: { title: 'SMS do Bartka: „Chodzi o twojego tatę”', cat: 'msg', source: 'Nimbus · SMS', desc: '14.10, 16:38: „Możemy pogadać? To ważne. Chodzi o twojego tatę.” Wieczorem Bartek odpisuje: „zostaw mojego ojca w spokoju”.' },
  ev_not_gajda: { title: 'Ola: „Właśnie nie do Gajdy”', cat: 'testimony', source: 'Rozmowa z Olą', desc: 'Kiedy Ola kazała Mai iść z tym na policję, Maja odpisała: „Właśnie nie na policję”. Przez telefon dodała: „Nie do Gajdy. Nie pytaj dlaczego. Jeszcze nie.” Ola uznała to za paranoję.' },
  ev_cam1_0057: { title: 'Fotopułapka 1: nocny gość (22.10, 02:13)', cat: 'photo', source: 'Nimbus · Fotopułapki', img: 'c1_0057', desc: 'Dzisiejszej nocy ktoś przyszedł do huty. Sam, z latarką. Fotopułapka Mai wciąż działa.' },
  ev_last_note: { title: 'Ostatnie nagranie Mai (14.10, 22:52)', cat: 'testimony', source: 'Nimbus · dyktafon', desc: '„Jestem pod hutą. Jeśli to słuchasz, to… nie wiem, kto to słucha. Wchodzę zobaczyć, co jest za ścianą.”' },
  ev_wojt_mail: { title: 'Odpowiedź wójta (12.10)', cat: 'msg', source: 'Nimbus · poczta', desc: 'Maja pytała gminę o archiwum huty. Odpowiedź przyszła w kilka godzin, podpisana osobiście przez *wójta Leszka Malickiego*: archiwum nie istnieje, teren jest prywatny, „odradzam penetrowanie budynku”.' },
  ev_igor_phrase: { title: 'Igor: „Technicznie rzecz biorąc…”', cat: 'msg', source: 'Nimbus · SMS z Igorem', desc: '1.10 Igor pisze do Mai: „Technicznie rzecz biorąc znam się na wszystkim, co ma baterię ;)”. Jego ulubione powiedzonko.' },
  ev_igor_lie: { title: 'Igor: „Skaner przytkał się przy 23”', cat: 'msg', source: 'Nimbus · SMS z Igorem', desc: '10.10: „Skany gotowe. Skaner przytkał się przy 23, ta klatka jest prześwietlona, nic tam nie ma.” Tylko Igor miał skany negatywów w wysokiej rozdzielczości.' },
  ev_igor_cams: { title: 'Igor skonfigurował fotopułapki', cat: 'msg', source: 'Nimbus · SMS z Igorem', desc: '9.10: „Kamery skonfigurowane. Wysyłają na maila. Hasło do panelu ci wysłałem.” Igor zna dostęp do fotopułapek Mai.' },
  ev_szafka17: { title: 'Szafka nr 17', cat: 'place', source: 'Galeria Mai', img: 'm_lockers', desc: 'Szatnia w hali B huty. W szafce nr 17 Maja znalazła jednorazowy aparat z kliszą sprzed 29 lat. Kłódka była wyłamana.' },
  ev_fence_gap: { title: 'Dziura w płocie przy trafostacji', cat: 'place', source: 'Galeria Mai', img: 'm_fence', desc: 'Za starą stacją transformatorową siatka jest rozcięta i odgięta. Tędy da się wejść na teren huty, omijając bramę.' },
  ev_plan: { title: 'Plan ewakuacji huty', cat: 'place', source: 'Galeria Mai', img: 'm_plan', desc: 'Wyblakły plan z hali A. *Szatnia: hala B, piętro 1. Odprężarka: hala A, poziom −1, wejście za piecem wannowym.*' },
  ev_bricks: { title: 'Nowsze cegły w odprężarce', cat: 'place', source: 'Galeria Mai', img: 'm_lehr', desc: 'Fragment tunelu odprężarki zamurowano jaśniejszą *cegłą dziurawką*, inną niż przedwojenna cegła reszty hali. Zaprawa położona niechlujnie, „na szybko”.' },
  ev_toy: { title: 'Mały plastikowy przedmiot pod murem', cat: 'object', source: 'Galeria Mai (8.10)', img: 'm_lehr', desc: 'Pod zamurowanym fragmentem, w pyle, leży coś małego, owalnego, z plastiku. Maja chyba tego nie zauważyła.' },
  ev_car_window: { title: 'Ciemny samochód pod domem (13.10)', cat: 'photo', source: 'Galeria Mai', img: 'm_window', desc: '13.10, 23:10 — zdjęcie z okna pokoju Mai. Po drugiej stronie ulicy stoi ciemne auto ze zgaszonymi światłami. Ktoś w nim siedzi.' },

  /* ---------- rozdział 2 ---------- */
  ev_jacket: { title: 'Kurtka robocza „AUTO-SOWA”', cat: 'photo', source: 'Fotopułapka 1 · zbliżenie', img: 'c1_0057', desc: 'Nocny gość z 22.10 ma kurtkę roboczą z odblaskami. Na plecach fragment napisu: *…O-SOWA*. Tak jak warsztat ojca Bartka.' },
  ev_dk97: { title: 'Wydrapane „D.K. 97” w szafce 17', cat: 'place', source: 'Zdjęcie Kuby', img: 'k_locker', desc: 'Wewnątrz drzwiczek szafki 17 ktoś wydrapał: *D.K. 97*. Darek Kruk? W 1997 miał 16 lat. Zginął w 2011 roku.' },
  ev_headlamp: { title: 'Czołówka Mai', cat: 'object', source: 'Znalezisko Kuby', img: 'k_headlamp', desc: 'Pod paletami przy murze odprężarki Kuba znalazł czołówkę z naklejką jamnika. To czołówka Mai. Szkiełko pęknięte.' },
  ev_patch: { title: 'Świeżo załatany mur', cat: 'place', source: 'Zdjęcie Kuby', img: 'k_wall', desc: 'W murze odprężarki ktoś niedawno wstawił kilka cegieł na świeżą zaprawę i zastawił miejsce paletami i plandeką. Zaprawa jeszcze jasna.' },
  ev_mount: { title: 'Urwany uchwyt fotopułapki 2', cat: 'object', source: 'Zdjęcie Igora', img: 'k_mount', desc: 'Na filarze w hali A zostały tylko opaski zaciskowe i kawałek plastiku. Fotopułapkę ktoś zerwał.' },
  ev_frame08: { title: 'Kadr 8: chłopcy w hucie (1997)', cat: 'photo', source: 'Klisza z szafki 17', img: 'p_08d', desc: 'Kilku nastolatków przy piwie, w świetle flesza. Lato, burza za oknami. Twarze prześwietlone.' },
  ev_frame21: { title: 'Kadr 21: postać w żółtej pelerynie', cat: 'photo', source: 'Klisza z szafki 17', img: 'p_21d', desc: 'Przy piecu stoi trzech. Czwarty jest bliżej obiektywu, jakby wszedł w kadr po ustawieniu aparatu. W drzwiach za nimi stoi *małe dziecko w żółtej pelerynie z kapturem*. Na szyi ma coś na sznurku.' },
  ev_frame22: { title: 'Kadr 22: dziura w podłodze', cat: 'photo', source: 'Klisza z szafki 17', img: 'p_22d', desc: 'Rozmazany, niemal czarny kadr. Snop latarki, połamane deski, czarna woda w dole, a w niej coś żółtego. Przy dolnej krawędzi rozmazana ręka — ktoś sięga w dół.' },
  ev_questions: { title: 'Notatka Mai: „Pytania”', cat: 'msg', source: 'Nimbus · notatki (PIN)', desc: 'Lista pytań Mai: kim są chłopcy z kadru 21, kto i po co zamurował odprężarkę, dlaczego szukano tylko w rzece, kto prowadził poszukiwania (*komendant Gajda — ojciec Roberta*). Na końcu: „Nie mówić nikomu. *Zwłaszcza R.G.*”' },
  ev_car_igor: { title: 'Zdjęcie auta przy bramie (Igor)', cat: 'photo', source: 'Zdjęcie Igora', img: 'i_car', desc: 'Rozmazane zdjęcie z daleka: ciemne auto przy bramie huty, światła zgaszone. Z tablicy da się odczytać tylko końcówkę: *…19*.' },
  ev_bartek_conf: { title: 'Bartek: „Pytała o mojego ojca”', cat: 'testimony', source: 'Rozmowa z Bartkiem', desc: '14.10 Maja pytała Bartka, czy jego ojciec Marek był latem 1997 w hucie. Bartek się wściekł. W nocy z 21 na 22.10 sam poszedł do huty sprawdzić, czego szukała.' },

  /* ---------- rozdział 3 ---------- */
  ev_tomek: { title: 'Tomek Lis, czerwiec 1997', cat: 'photo', source: 'Weronika Lis', img: 'w_tomek', desc: 'Ostatnie zdjęcie Tomka: żółta peleryna, gumowce, na szyi *tamagotchi* na sznurku. Dostał je na komunię i nie rozstawał się z nim.' },
  ev_interview: { title: 'Wywiad z Weroniką: czterech chłopaków', cat: 'testimony', source: 'Dyktafon Mai (oczyszczone)', desc: 'Tomek chodził tamtego lata za starszymi chłopakami: *Darkiem Krukiem, Robertem Gajdą, Leszkiem Malickim i Markiem Sową*. Poszukiwania prowadził komendant Gajda — ojciec Roberta.' },
  ev_plate_cam: { title: 'Tablica z fotopułapki: DDZ 6K1?', cat: 'photo', source: 'Ciemnia · fotopułapka 1', img: 'c1_0023e', desc: 'Po rozjaśnieniu zdjęcia z 15.10, 02:05, widać tablicę odjeżdżającego auta: *DDZ 6K1…* — ostatni znak zasłania błoto.' },
  ev_plate: { title: 'Tablica rejestracyjna: DDZ 6K19', cat: 'digital', source: 'Zestawienie dwóch zdjęć', desc: 'Fotopułapka (15.10): *DDZ 6K1?* + zdjęcie Igora (23.10): *…19*. Ten sam samochód był pod hutą noc po zniknięciu Mai i wczoraj w nocy.' },
  ev_owner: { title: 'DDZ 6K19 należy do Roberta Gajdy', cat: 'testimony', source: 'Zeszyt napraw Auto-Sowa', img: 'b_ledger', desc: 'W zeszycie warsztatu Sowów: *DDZ 6K19 — Sevra Magna, gr. — R. Gajda*. Prywatne auto komendanta.' },
  ev_gajda_call: { title: 'Rozmowa z komendantem Gajdą', cat: 'testimony', source: 'Połączenie przychodzące', desc: 'Gajda zażądał kopii plików z chmury Mai i wiedział o tobie więcej, niż powinien.' },
  ev_sms_kluska: { title: 'SMS do mamy: „Pozdrów Kluskę”', cat: 'msg', source: 'Telefon Mai · 24.10, 03:05', desc: '„Mamo, nic mi nie jest. Potrzebuję czasu. Nie szukajcie mnie. Pozdrów Kluskę.” Maja zawsze pisała „Mamuś”. A Kluska nie żyje od 2019 roku. *To wołanie o pomoc.*' },
  ev_sync_wall: { title: 'Zdjęcie Mai: otwór w murze (14.10, 23:44)', cat: 'photo', source: 'Nimbus · zaległa synchronizacja', img: 's_wall', desc: 'Maja wybiła kilka cegieł. W świetle czołówki, w głębi tunelu: strzęp żółtego materiału.' },
  ev_sync_door: { title: 'Zdjęcie Mai: postać w drzwiach (14.10, 23:53)', cat: 'photo', source: 'Nimbus · zaległa synchronizacja', img: 's_door', desc: 'Poruszone zdjęcie: w drzwiach hali stoi mężczyzna z latarką. Na ramieniu — jasna naszywka. Pięć minut potem telefon Mai traci sygnał.' },

  /* ---------- rozdział 4 ---------- */
  ev_findphone: { title: 'Ostatnia pozycja telefonu Mai', cat: 'digital', source: 'Nimbus · Znajdź urządzenie', img: 'find_snip', desc: '24.10, 03:07. Telefon Mai był online przez dwie minuty. Pozycja z masztów: las na stoku *Sowiej Kopy*, dokładność ±800 m. W tym kręgu są trzy stare sztolnie.' },
  ev_sztolnie: { title: 'Przewodnik: podziemia Sowiej Kopy', cat: 'msg', source: 'sowiakopa.pl', img: 'web_adits', desc: '*Anna* — trasa turystyczna, czynna codziennie, monitoring. *Waltraud* — zalana od powodzi 1997, wejście zawalone. *Ewa (nr 3)* — zamknięta stalową kratą (nietoperze); klucze ma nadleśnictwo i *koło łowieckie*, które trzyma tam paśnik.' },
  ev_kolo: { title: 'Koło Łowieckie „Sokół”: łowczy R. Gajda', cat: 'msg', source: 'kl-sokol.pl', desc: 'Obwód łowiecki nr 117 obejmuje wschodni stok Sowiej Kopy ze sztolniami Ewa i Waltraud. *Łowczy koła: Robert Gajda.*' },
  ev_gajda_hunt: { title: 'Gajda przy paśniku „pod Ewą”', cat: 'photo', source: 'Kadr: @r.gajda', img: 'kadr_hunt', desc: 'Zdjęcie z profilu Gajdy: „Paśnik pod Ewą gotowy na zimę. Darz bór!”. W tle — stalowa krata wejścia do sztolni.' },
  ev_frame23: { title: 'Kadr 23 — pełna rozdzielczość', cat: 'photo', source: 'Od Szklarza', img: 'p_23d', desc: 'Klatka, która „była prześwietlona”. Flesz wydobywa z ciemności twarz siedemnastolatka z wyciągniętą ręką: „nie rób zdjęć”. To *Robert Gajda*. Za nim, w kanale pieca, coś żółtego.' },
  ev_szklarz_phrase: { title: 'Szklarz: „technicznie rzecz biorac”', cat: 'msg', source: 'Rozmowa ze Szklarzem', desc: 'Szklarz pisze bez polskich znaków i bez wielkich liter. Ale jedno zdanie brzmi znajomo: „technicznie rzecz biorac, ta klatka nigdy nie byla przeswietlona”.' },
  ev_marek: { title: 'Wyznanie Marka Sowy', cat: 'testimony', source: 'Przez Bartka', desc: 'Ojciec Bartka opowiada noc z 1997: Tomek wpadł do zalanego kanału pieca. Wyciągnęli go martwego. *Robert zdecydował*, że nikt się nie dowie. Marek zamurował wejście. Darek oparł aparat o belkę i wszedł w kadr — to ten bliżej obiektywu. Robert ma klucz do kraty sztolni Ewa.' },
  ev_igor_conf: { title: 'Wyznanie Igora', cat: 'testimony', source: 'Rozmowa z Igorem', desc: 'Igor rozpoznał ojca na kadrze 23 i 12.10 zapytał go o to wprost. Ojciec zadzwonił do Gajdy. Dwa dni później Maja zniknęła. Igor jest Szklarzem.' },
  ev_jerrycans: { title: 'BushView: kanistry przy hucie', cat: 'photo', source: 'Panel BushView · CAM-01', img: 'c1_live_gajda', desc: 'Ciemna sevra przy bramie huty, otwarty bagażnik, dwa kanistry. Ktoś chce spalić to, co jest za murem.' }
};
