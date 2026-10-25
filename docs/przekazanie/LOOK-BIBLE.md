# Księga wyglądu (look bible) — „Quiet Is Safer / Mglisko”

Wersja robocza z 25.10.2026. Dotyczy zdjęć i krótkich nagrań „z telefonu” w grze (repo `kacperkretowicz-wq/duskwood`, tylko gałąź `feat/realizm-2026`, commit `16888b0`; repo czytane, nic nie zmieniane).
Zastępuje wnioski z wcześniejszych testów klipu „postać w oknie” i **uzupełnia** skill `realistyczne-zdjecia-horror` oraz `/workspace/photo-tests/SKILL-draft.md`.

---

## 0. Streszczenie w sześciu zdaniach

1. **Zwykły człowiek w oknie nie jest straszny.** Straszy jedna rzecz, która **nie może tam być** i którą widz wykrywa sam, bez znajomości fabuły.
2. **Reguła:** najpierw w 100% zwyczajna scena (miejsce, światło, autor, telefon), potem **dokładnie jedna** wykrywalna nienormalność. Dwie nienormalności rozmywają efekt.
3. **Realizm daje telefon, nie efekt:** kto trzyma aparat, jakim modelem, jakie błędy (autofokus, nocny tryb, flesz, kciuk), a nie „filtr horroru”.
4. **Gra nie ma nadprzyrodzoności** (`KONCEPCJA.md` §2, pkt 4), więc każda nienormalność musi mieć w fabule **racjonalne wyjaśnienie** (retusz Igora/Szklarza, odblaskowa peleryna z 1997, kufajka na słupku, błąd trybu panorama, przestawione przez Gajdę drzwi). Wyjaśnienie wychodzi dopiero po zbliżeniu (hotspot) — to też mechanika detektywistyczna.
5. **Dźwięk robi pół roboty:** oddech i kroki nagrywającego, cisza przed i po, jeden dźwięk bez źródła w kadrze. Nigdy muzyczny „stinger” przy nagraniu z telefonu.
6. **Trzy zdjęcia testowe z Codexa** (rozdz. 8) potwierdzają regułę: „drzwi w murze ruiny” działa od razu; „odbicie bez telefonu” i „ten sam człowiek w dwóch oknach” w pierwszej wersji były **za subtelne** (Codex: wykrywalność po 3 s = 2–3/10), a po powiększeniu postaci i uściśleniu promptu (v2) działają wyraźnie.

---

## 1. Przegląd zasobów w repo (`assets/`, `docs/`)

Uwaga metodologiczna: oceniałem po przeglądzie miniatur wszystkich plików (siatki w `/workspace/look-bible/sheets/`), pełnego rozmiaru obejrzałem kilkanaście kluczowych oraz klatki z 3 klipów. To ocena wrażenia, nie dowód.

### 1.1 Co już wygląda najlepiej i dlaczego

| Plik | Dlaczego działa (cechy) | Czego mu brakuje |
|---|---|---|
| `assets/kronika/c_slady.jpg` — klatka schodowa PRL, odpryski tynku, mokre ślady łap prowadzące w górę do ciemnych drzwi | Konkretne miejsce znane każdemu Polakowi (lamperia, kaloryfer, linoleum); jedno źródło światła; **ślad zamiast potwora**; kadr „od dołu, jak wchodzi lokator” (sytuacja autora jest jasna) | Zbyt symetryczny, ślady za równe; brak błędu telefonu |
| `assets/kronika/c_klatka.jpg` — przeszklone drzwi wejściowe, białe filcowe buty przy drzwiach | Zwykła rzecz „nie na miejscu”; światło jarzeniówki z jednym źródłem; szkło z odbiciem klatki | Za czysto, za ładnie „po wywołaniu” |
| `assets/kronika/c_studniowka.jpg` — kadr z lokalnej telewizji: za tańczącą parą w jasnym przejściu **stoi nieruchomy człowiek w garniturze** | **Najlepszy w repo przykład „wykrywalny za drugim razem”:** postać zwrócona do kamery, wszyscy inni zajęci sobą, plan TV z paskiem „TV DOLINA” daje autora i format | Twarz niewidoczna (dobrze), ale brak powodu, dla którego akurat to ujęcie jest w grze |
| `assets/video/v_anonim.mp4` + `assets/trap/*.jpg` — fotopułapka CAM-01 (IR, pasek `BUSHVIEW CAM-01 3°C 37°F 15/10/2026 01:47:13`) | **Urządzenie robi realizm:** czarno-biała podczerwień, stały kadr, pasek OSD, krok człowieka z latarką w skrócie; brak ozdobnej kompozycji | Ludzie wyglądają jak „aktorzy AI” z bliska; klip wychodzi lepiej niż klatki |
| `assets/video/v_pies_noc.jpg` — wysoki kadr z okna: ktoś z psem pod jedną latarnią na śniegu | **Punkt widzenia podglądacza** (ktoś patrzy z góry) — sytuacja straszy sama | Zbyt „filmowa” ciepła plama latarni |
| `assets/maja/s_door.jpg`, `s_blur.jpg` — flesz w twarz, rozmycie ruchu | Wiarygodne **błędy telefonu** (flara, rozmazanie), brak ustawionego kadru | Zbyt abstrakcyjne, nic nie wiadomo o scenie |
| `assets/maja/m_window.jpg` — ulica nocą z latarnią i autem | Spokojne, „nic się nie dzieje”; światło sodowe | Brak jakiegokolwiek detalu do wykrycia |
| `assets/video/v_snap.mp4` (klatki: las i latarka, czerwone kropki) | Przemyślany format: relacja „dla bliskich” nagrana telefonem, jednorazowa; szarpany ruch | Dźwięk nie istnieje (5 s bez dźwięku) — duża strata |

### 1.2 Co wygląda najsłabiej (nie kopiować)

- **`assets/web/sz_window.jpg`** (zdjęcie od Szklarza): komponowane jak plakat — okno na osi, niebieski poblask za sylwetką, **turkusowy napis w obrazie** („każde szkło ma dwie strony”). Napis dopisujemy w interfejsie, nie w pliku.
- **`assets/kronika/c_blok_noc.jpg`**: blok nocą z jednym oświetlonym oknem i **zwykłą sylwetką** w nim. Dokładnie scena, którą użytkownik uznał za „realistyczną, ale mało straszną”. Ma też „kinowy” pomarańczowy poblask i symetrię. Wniosek: sylwetka sama nic nie robi; potrzebna **nienormalność** (rozdz. 3).
- **`assets/video/v_korytarz.mp4`**: korytarz biblioteki jest **lustrzanie symetryczny** (dwie identyczne połówki) — wygląda jak błąd generatora, nie jak świadoma nienormalność. Kopiować tylko, jeśli to ma być ten jeden wykrywalny dziwny element i jeśli reszta jest asymetryczna.
- **`assets/maja/m_mirror.jpg`**: selfie w lustrze z aparatem — logika lustra i ramy nieprzekonująca (patrz `ZDJECIA-SYTUACJE.md`).
- Portrety (`assets/people/*`, `web/g_award.jpg`, `web_wojt.jpg`): dobre jako dokumenty, ale nie przenosić ich „idealnej” skóry do zdjęć grozy.
- Wniosek z `docs/ZDJECIA-SYTUACJE.md` i `PLAN-WDROZENIA §9–10`: zaakceptowane są tylko `kuba.jpg`, `lena-v2.jpg`, `gajda.jpg`; reszta odrzucona jako „wygląda jak AI” — **ustawiona sytuacja i zbyt idealne materiały** to główny powód.

### 1.3 Sceny z fabuły, które potrzebują zdjęć lub klipów

Źródło: `MAPA-S1.md`, `KONCEPCJA.md`, `PLAN-WDROZENIA §7, 11, 12`, `MROK-I-SLADY.md`.

| Scena | Co dziś jest | Potrzeba |
|---|---|---|
| Koniec prologu — pierwsze zdjęcie od nieznanego numeru (Szklarz) | `sz_window.jpg` (plakatowe) | **Nowe zdjęcie z jedną nienormalnością** (pomysł F1) |
| S1 ch2 wejście do huty 23:41 (`s1_cam58`, straszak twarzy) | klatka z fotopułapki | klip z jedną nienormalnością w kadrze CAM (V5) |
| Prolog: film jednorazowy z huty (`v_snap`) | 8 s bez dźwięku | wersja z dźwiękiem i jednym wykrywalnym dziwnym elementem (V2) |
| ch1: zdjęcia Mai z Nimbusa (huta, 14.10) | `m_hall`, `m_lehr`, `s_wall` | para „przed/po” z różnicą do znalezienia (F3) |
| ch3 Peleryna: Weronika, kadr 21/23 z kliszy 1997 | `p_21d`, `p_23d` (odrzucane jako AI) | kadr 23 z fizyczną niemożliwością flesza (F5) |
| ch3: `xAutobus` (Lena, ostatni autobus) | brak zdjęcia | zdjęcie i klip z odbiciem, które nie pasuje (F6, V4) |
| G1: numer Mai dzwoni 03:05 | tylko ekran połączenia | krótkie wideo z nagrywającego ekranu połączenia + dźwięk (osobny proces audio) |
| G2: odsłuch od Szklarza | audio | dźwięk bez obrazu; ewentualnie klatka-okładka bez twarzy |
| ch4: Znajdź urządzenie / panel BushView na żywo | `live_day/night/gajda` | klip „luka w kadrze” (V5) |
| ch5: kamera na żywo (`s1_hand`) | klatka z dłonią | patrz G1/G2 + reguła „bez dłoni z generatora” |
| Epilog: „TU BYŁAM. M.” | brak | zdjęcie ściany z napisem, gdzie **detalem jest data/odcisk dłoni w niemożliwym miejscu** |
| Połączenia wideo z Gajdą/Szklarzem | użytkownik: „nagrania muszą mieć głos” | wymóg dźwięku w każdym klipie (rozdz. 4) |

---

## 2. Research: co sprawia, że prawdziwe i „found footage” creepy materiały działają

Zasady researchu: tylko techniki. Bez prawdziwych tragedii i bez zdjęć prawdziwych osób. Cytaty to **parafrazy** podsumowań wyszukiwarki i fragmentów stron; gdzie miałem tylko streszczenie, zaznaczam.

### 2.1 Dwanaście technik (+3 własne z opinii użytkownika i testów)

**T1. Strukturalne odchylenie w zwykłym miejscu (jedna rzecz, która „nie pasuje”).**
Badanie Diel i Lewis (Cardiff) wykazało „dolinę niesamowitości miejsc”: brakujące, powtórzone, przesunięte lub zniekształcone elementy budowli zwiększają niesamowitość, a im więcej odchyleń, tym mocniej. Co ważne: **obecność ludzi zmniejszała niesamowitość w dużych wnętrzach publicznych, a zwiększała w pokojach prywatnych.** Źródło: [Structural deviations drive an uncanny valley of physical places](https://doi.org/10.1016/j.jenvp.2022.101844) (streszczenie z wyszukiwarki; pełny tekst nie otworzył się). *Rób:* jedno odchylenie typu „brak/powtórzenie/przesunięcie/proporcja” w miejscu, które widz zna. *Nie rób:* trzy odchylenia naraz.

**T2. Opóźnione rozpoznanie (drugie spojrzenie).**
W *Lake Mungo* zdjęcia najpierw pokazano jako zwykłe dowody, a potem wracano do nich zbliżeniem, które ujawnia postać w rogu/odbiciu; foreground odciąga uwagę, a postać jest zamaskowana ciemnością, ziarnem lub dystansem. Film wręcz zmusza widza do skanowania każdego następnego kadru. Źródła: [Quarter to Three](https://www.quartertothree.com/fp/2014/10/17/golden-age-horror-lake-mungo-2008/), [Screening the Past](https://www.screeningthepast.com/issue-43-dossier/denegation-and-the-undead-in-lake-mungo/), [WhatCulture](https://whatculture.com/film/10-genius-suspense-tricks-that-made-horror-movies-great?page=8), [What Sleeps Beneath](https://www.whatsleepsbeneath.com/archive/hauntological-lake-mungo). *Rób:* zwykły pierwszy plan, anomalia dalej/mniej kontrastowo. *Nie rób:* anomalia na środku, w kolorze, z poblaskiem (to *The Omen*, nie *Mungo*).

**T3. Kamera jako wrażliwy świadek (ciało operatora).**
Analizy found footage podkreślają kamerę trzymaną ręką jako uczestnika zdarzeń: wstrząsy, uderzenia, pogoda, odgłosy operatora; kamera stała (monitoring) jest zaś „niemym świadkiem”. Źródło: [Film-Philosophy 2017](https://www.euppublishing.com/doi/10.3366/film.2017.0044), [Project 2025: cztery techniki](https://doi.org/10.3167/proj.2025.190102) (priming, wrażliwa pozycja kamery, off-screen, pustka w kadrze/dźwięku/czasie). *Rób:* słyszalny oddech, kroki, szelest kurtki, kciuk w rogu. *Nie rób:* płynny, „gimbalowy” ruch.

**T4. Dźwięk bez źródła (acousmatic).**
W *Blair Witch* groza bierze się z trzasków gałęzi, oddechu i dalekich odgłosów, których źródła nie widać; wyobraźnia dopowiada obraz gorszy niż jakikolwiek potwór. Źródła: [Offscreen: The Unheard and Unseen](https://offscreen.com/view/the-unheard-and-unseen-the-sound-and-silence-in-horror-cinema) (przeczytane w całości), [Spooked by Sound](https://doi.org/10.1558/equinox.19133) (streszczenie). *Rób:* jeden dźwięk bez źródła w kadrze, **fizycznie uzasadniony** (krok, szkło, rura). *Nie rób:* krzyk, muzyka, stinger.

**T5. Długie, stałe ujęcie i cisza (zaproszenie do skanowania).**
*Paranormal Activity* wybiera stały kadr i długie momenty ciszy zamiast szarpanej kamery; widz sam przeszukuje pokój. Film nakręcono domowo za ok. 15 tys. USD; reżyser chciał „zasugerować niewidzialną obecność i pozwolić widzowi dopowiedzieć”. Źródła: [The Guardian 2009](https://www.theguardian.com/film/2009/nov/21/paranormal-activity-twitter-facebook), [Found-Footage Horror and the Frame's Undoing](https://doi.org/10.1353/cj.2016.0003). *Rób:* telefon oparty o parapet / kierownicę; 6–8 s nic. *Nie rób:* cięcia co sekundę.

**T6. Pustka w kadrze, dźwięku i czasie.**
Wspomniana analiza 24 filmów found footage wskazuje pustkę (kadr, dźwięk, długie ujęcia) jako osobną technikę napięcia. Źródło: [Project 2025](https://doi.org/10.3167/proj.2025.190102). *Rób:* puste miejsce w kadrze, w którym widz **oczekuje** kogoś.

**T7. Urządzenie jako dowód (znaczniki, błędy sprzętu).**
Wskaźnik baterii, timestamp, REC, pęknięty ekran, flary, wstrząsy — to typowe oznaki „kamery w świecie fabuły” ([Film-Philosophy](https://www.euppublishing.com/doi/10.3366/film.2017.0044)). W telefonach realne błędy to: nocny tryb składa kilka ekspozycji, więc ruch daje ducha i rozmycie; autofokus „poluje” w półmroku; źródła światła dają flary i halo; zdjęcia przez szybę łapią odbicia ([Android Central](https://www.androidcentral.com/phones/tech-talk-how-does-your-phone-cameras-night-mode-work), [Pixel Camera Help](https://support.google.com/pixelcamera/answer/18623896?hl=en)). *Rób:* **jeden-dwa uczciwe błędy**, różne dla różnych telefonów. *Nie rób:* jednakowe ziarno na całym kadrze (nasz wcześniejszy wniosek: „wygląda jak filtr”).

**T8. Glitch jako sygnał obecności, ale oszczędnie.**
W *Marble Hornets* obecność Operatora zdradzają zakłócenia obrazu i dźwięku, a groza bierze się z „rozerwania obrazu”, nie z samego potwora; twórcy wręcz uczą widza tych sygnałów. Źródła: [CULTX](https://cultx-revue.com/article/defaillances-anticipations-et-relais-comment-marble-hornets-a-donne-au-slender-man-une-identite-mediatique-sur-youtube), [Bright Lights](https://brightlightsfilm.com/found-footage-2-textures-silence-decay-marble-hornets-haunted-archive/). *Rób:* maksymalnie jeden glitch w klipie i tylko wtedy, gdy czemuś służy (np. fotopułapka gubi klatki). *Nie rób:* losowych „glitch FX” (u nas `fx('glitch')` i tak nie jest liczony jako jumpscare).

**T9. Obecność zaznaczona nieobecnością.**
W jednym z odcinków *Marble Hornets* postać wchodzi do pokoju w cieniu i znika, gdy zapali się światło; groza bierze się z napięcia między „jest” a „nie ma” ([Bright Lights](https://brightlightsfilm.com/found-footage-2-textures-silence-decay-marble-hornets-haunted-archive/)). *Rób:* ten sam kadr dwa razy (przed/po), różnica jednego elementu. *To jest podstawa pary zdjęć F3.*

**T10. Zwykły format przejęty (Local 58).**
Streszczenie: zwykły, spokojny, użytkowy format (komunikat, pogoda, program dla dzieci) zostaje „zepsuty” zakłóceniami i niemożliwymi poleceniami; groza często jest niedopowiedziana. Źródła: [The Outline](https://theoutline.com/post/8115/a-good-place-the-public-access-channel-from-hell), [Cultural Gutter](https://culturalgutter.com/2022/01/13/there-are-other-receivers-the-dark-road-of-local-58/). *Rób (dla nas):* niech MMS od Szklarza, relacja „Kadr”, panel BushView wyglądają **dokładnie jak codzienne formaty** — nienormalność jest w treści, nie w ramce.

**T11. Ciemność i prawdziwy szum pozwalają widzowi „dosłać” kształty.**
*Skinamarink*: ciemność, ziarno i kadry poza środkiem ukrywają zagrożenie, a mózg szuka twarzy w cieniu; ujęcia z wysokości dziecka i nieprawdziwa, „czujna” niepewność utrzymują napięcie; w filmie okna i drzwi po prostu znikają z domu. Źródło: [/Film](https://www.slashfilm.com/1167722/why-does-skinamarink-look-like-that-a-guide-to-the-new-horror-movies-unique-visual-style/) (przeczytane w całości). *Rób:* realny szum rosnący w cieniach (wysokie ISO). *Nie rób:* nakładka ziarna na czysty obraz.

**T12. Liminalna zwyczajność i brak wyjaśnienia (creepypasty, „cursed images”).**
Olga Drenda: backrooms wyrosły z jednego prawdziwego zdjęcia pustej hali, a siła takich obrazów to **anonimowość i brak właściwości**; polskie „backroomsy” to klatki schodowe z zieloną lamperią i gumoleum. Źródło: [Tygodnik Powszechny 2026](https://www.tygodnikpowszechny.pl/backrooms-creepypasty-dlaczego-horror-kryje-sie-w-zwyczajnosci) (przeczytane w całości), uzupełnienie: [Praktyka grozy… Creepypasta](https://doi.org/10.12775/ll.3.2016.005) (streszczenie). Dla Kane Pixels’a: znajome-ale-złe przestrzenie plus VHS/„hypermediacy” ([New Media & Society](https://doi.org/10.1177/14614448241238395), streszczenie). *Rób:* polska klatka schodowa, blok, pętla autobusowa, hala. *Nie rób:* „amerykańskie biuro”, mgła bez źródła.

**T13. Niemożliwa przestrzeń (drzwi, których nie ma; pokój, którego budynek nie ma).**
*House of Leaves* i *Skinamarink*: zwykły dom nagle ma drzwi/korytarz, którego nie powinien mieć lub traci okna i drzwi; to freudowskie *unheimlich* — znane staje się „nie-domowe”. Źródła: [Image & Narrative o House of Leaves](https://www.imageandnarrative.be/inarchive/uncanny/nelebemong.htm) (streszczenie), [/Film](https://www.slashfilm.com/1167722/why-does-skinamarink-look-like-that-a-guide-to-the-new-horror-movies-unique-visual-style/). *Rób:* drzwi z numerem w murze ruiny. *Nie rób:* portal ze światłem.

**T14. Fizyka fotopułapki jako źródło niepokoju (technika własna oparta na wiedzy o sprzęcie).**
Fotopułapki reagują na zmianę ciepła (PIR), a strefa detekcji bywa **szersza niż kadr**, więc coś spoza kadru może uruchomić aparat, zanim wejdzie w obraz; nocą IR i długa ekspozycja dają duchowate, zniekształcone kształty ([NatureSpy](https://naturespy.org/blogs/help-articles/trail-camera-detection-zones-explained), [Winterberry Wildlife](https://winterberrywildlife.ouroneacrefarm.com/2022/08/01/deep-tech-trail-camera-detection-zones/)). *Rób:* klatka „wyzwolona przez nic” i luka między klatkami, w której coś się zmieniło. Świetnie pasuje do BushView/CAM-01.

**T15. Od użytkownika (nowe, najważniejsze): nienormalność, nie tylko niepokój.**
Wniosek z testów klipów: „blada twarz”, „postać w oknie”, „sylwetka” są *niepokojące*, ale normalne. **Nienormalne** to: ta sama osoba w dwóch miejscach, ubranie identyczne z ubraniem nagrywającego, odbicie niezgodne z rzeczywistością, drzwi tam, gdzie była ściana, pokój, którego budynek nie ma, ktoś stojący tam, gdzie nie ma podłogi (rozdz. 3).

### 2.2 Co z researchu wynika dla naszego błędu z klipami

- „Makijażowa twarz” i „sylwetka w oknie” to zawsze wariant T2 bez T1: **brak odchylenia strukturalnego** → zwykły człowiek.
- Klip generowany z klatki początkowej i końcowej traci T3 (ciało operatora) i T5 (cisza): ruch kamery jest zbyt gładki, a „pojawienie” jest przenikaniem. Używać **jednego ujęcia z klatką startową** i opisu ruchu ręki; nienormalność ma być *w świecie*, nie w efekcie generatora.

---

## 3. Co jest nienormalne, a nie tylko niepokojące

### 3.1 Reguła

> **Najpierw w 100% zwyczajna scena, potem jedno wykrywalne „to nie powinno tu być”.**
> Test: pokaż kadr komuś na 3 s bez opisu, potem zapytaj „co tu jest nie tak?”. Jeśli powie „nic” lub „klimat”, to **niepokojące**, nie nienormalne. Jeśli wskaże konkretny element, to **nienormalne**.

Dodatkowe zasady:
1. **Jedna** nienormalność w kadrze. Reszta musi być nudna i poprawna (cienie, odbicia, perspektywa).
2. Nienormalność **bez światła i efektów** (bez poblasku, rozmycia, wyróżnienia kolorem). Ma być tak samo „zwykła” jak reszta obrazu.
3. Widz ma ją znaleźć **w 3–10 s**, nie od razu i nie nigdy.
4. Musi być **związana z fabułą** (Szklarz/szkło/odbicie, żółta peleryna i Tomek, numer 17, fotopułapki, huta, klatka schodowa Wodnej, autobus) i mieć **racjonalne wyjaśnienie** w grze.
5. Telefon i autor są częścią dowodu: kto, kiedy, jakim aparatem, po co.

### 3.2 Katalog typów nienormalności (i fabularne wyjaśnienia „bez nadprzyrodzoności”)

| Typ | Przykład w kadrze | Wyjaśnienie w grze |
|---|---|---|
| **Odbicie niezgodne** | odbicie fotografującego bez telefonu i z opuszczonymi rękami | retusz Szklarza = Igor (ma serwis GSM i skaner negatywów; wyznanie ch4) |
| **Dubel** | ten sam człowiek, ta sama bluza i poza w dwóch oknach | dwie osoby w identycznych bluzach z „Ekipa 🍕”; przy zbliżeniu różnią się zegarkiem/wzrostem |
| **Strój nagrywającego** | człowiek w oknie ma tę samą bluzę co rękaw widoczny przy dolnej krawędzi kadru | Szklarz = Igor kupił taką samą/na zdjęciu Kuby widział, w czym chodzi |
| **Drzwi tam, gdzie była ściana** | drzwi z tabliczką 17 w ceglanym murze ruiny | drzwi przystawione przez Gajdę do załatanego otworu po 01:20 15.10; z innego kąta widać podpórkę |
| **Pokój, którego budynek nie ma** | w oknie roofless-hali widać jasne mieszkanie z lampą | podwójna ekspozycja na kliszy 1997 (Kodak): okno rodziny Lisów z nocy powodzi nałożone na kadr huty |
| **Brak podłogi / stoi tam, gdzie nie można** | postać na szczycie słupa bramy, 3 m nad ziemią | kufajka na słupku (już w repo jako racjonalne wyjaśnienie) |
| **Powtórzenie** | to samo piętro/podest dwa razy na zdjęciu klatki schodowej | błąd zszywania w trybie panorama telefonu Oli |
| **Fizyka światła** | obiekt daleko poza zasięgiem flesza jest jasno rozświetlony | odblaskowe elementy peleryny dziecięcej z 1997 |
| **Odbicie ma więcej niż rzeczywistość** | w odbiciu szyby autobusu stoi dziecko w żółtej pelerynie, w kadrze obok nikogo | odbicie plakatu na przystanku (akcja „30 lat po powodzi”) |
| **Czas / ciągłość** | ten sam kadr przed i po, różni się jedno | luka klatek fotopułapki: ktoś zawiesił kufajkę i odszedł |
| **Skala** | postać o proporcji dorosłego w oknie 1. piętra, które ma 60 cm wysokości | okno piwniczne, człowiek klęczy za nim (patrz „po zbliżeniu”) |

**Czego nie traktować jako nienormalnego:** pojedyncza sylwetka, blada twarz, dłoń na szybie, cień, „szept”, mgła, światło latarki. To jest **niepokój**, dobry jako tło, ale nie jako haczyk.

### 3.3 Do pomyślenia: nienormalność, która działa także w dźwięku
Dźwięk **niezgodny z miejscem**: kroki po żwirze, gdy nagrywający stoi na asfalcie; jednoczesny identyczny oddech w dwóch miejscach; kliknięcie migawki w trybie wideo; dzwonek własnego telefonu dochodzący z okna naprzeciwko. (T4 z fizycznym źródłem.)

---

## 4. Reguły „rób / nie rób” dla zdjęć i klipów (skrót)

**Rób**
- Autor + telefon + powód nagrania zapisane w karcie sceny przed promptem (`PLAN-WDROZENIA §13`).
- Jeden-dwa błędy telefonu, **inne dla każdego autora**: Kuba (Samsung Galaxy A12, brudny obiektyw, flary), Maja (Redmi Note 9, nocny tryb), Ola (iPhone 11, autoekspozycja „pływa”, tryb panorama), Igor/Szklarz (drugi telefon, tani Xiaomi, płaski flesz), Lena (Samsung A21s, ekran z odciskami), Weronika (stary Samsung, kadr z ręki, krzywo), BushView CAM (IR, pasek OSD).
- Ludzie **mali, daleko, w półcieniu** lub tyłem; twarze nieczytelne, ręce poza kadrem (generator myli palce).
- Nienormalność tak samo oświetlona i tak samo zaszumiona jak otoczenie.
- Dźwięk: oddech i kroki nagrywającego, szum wiatru w mikrofonie, cisza **przed** i **po** zdarzeniu, jedno źródło poza kadrem.
- Klip: **jedno ujęcie, 8 s, klatka startowa + opis ruchu ręki**; bez klatki końcowej, jeśli „pojawienie” ma być prawdziwe. Klatka końcowa tylko jako **kontrola logiki** (nie do generowania przejścia).
- Nadruki (pasek OSD, napisy, znaczniki czasu) dodawać osobno (ffmpeg/PIL), nie generować.

**Nie rób**
- Słów w promptach: `cinematic, eerie, haunting, creepy, horror, dramatic lighting, volumetric fog, masterpiece, ultra-detailed, 8K, ghost`.
- Dłoni na szybie, wymuszonych spojrzeń w obiektyw, bladej „makijażowej” twarzy.
- Dymu/mgły z nikąd w momencie „pojawienia się”.
- Dwóch nienormalności w jednym kadrze.
- Symetrii (lustrzane korytarze, oś okna na środku) — wygląda jak plakat.
- Muzycznego stingera przy nagraniu z telefonu.
- Wyjaśniania nienormalności w opisie zdjęcia (opis ma być zwykły: „zdjęcie od nieznanego numeru”).

---

## 5. Pomysły

Format karty: **Kto / telefon / skąd · Zwyczajność · Jedna nienormalność · Wyjaśnienie w grze · Dźwięk · Prompt obrazu (EN) · (klip) Prompt ruchu (EN)**.
Wspólny prefiks realizmu `PRE` (dołączyć na początku każdego promptu obrazu):

> `Unedited snapshot straight out of a cheap budget Android phone (about 2019, default camera app, 1x lens), NOT a professional photo and NOT a render. Boring composition by a non-photographer, one or two honest phone mistakes, uneven sensor noise, JPEG softness, auto-exposure compromises. No HDR look, no teal-orange grade, no cinematic or dramatic lighting, no bokeh, no vignette, no rim light, no fog machine haze, no text, no watermark, no captions, no frame.`

Uwaga praktyczna z testu: Codex **nie respektuje proporcji z promptu** (zwrócił 4:3 poziomo mimo „3:4 portrait”); w grze kadr trzeba przyciąć lub generować narzędziem z jawnym `aspect_ratio` (GenerateImage 9:16/3:4).

### 5.1 Osiem zdjęć

**F1. „Odbicie bez telefonu” — pierwsze zdjęcie od Szklarza (zastępuje `sz_window`).** *(wygenerowane: `gen/f1_odbicie.png`)*
- Kto/telefon/skąd: Szklarz (Igor), drugi telefon (tani Xiaomi), stoi 2 m od okna hali na zewnątrz, nocny tryb, bez flesza.
- Zwyczajność: łukowe okno huty, część szyb wybita, dolne całe — odbijają noc i latarnię z dziedzińca.
- Nienormalność: odbicie fotografującego w szybie stoi prosto, ręce opuszczone, **bez telefonu**, choć zdjęcie wyraźnie zrobiono z tego miejsca.
- Wyjaśnienie: retusz Igora (po zbliżeniu widać różnicę ziarna w tej szybie; ch4 „kazde szklo ma dwie strony”).
- Dźwięk w grze: standardowy dźwięk MMS, cisza, bez glitcha; napis jako zwykła treść wiadomości.
- Uwaga po teście: v1 (poniżej) była niejednoznaczna — odbicie mogło należeć do towarzysza. Używać **v2** z `gen/prompts.py` (klucz `f1_odbicie_v2`: odbicie na osi widzenia, duże, bez telefonu, ręce wzdłuż ciała, brak kształtów przypominających głowy w pęknięciach szkła).
- Prompt obrazu (v1): `PRE` + *Scene: a stranger takes a photo from outside, standing about two metres from a tall arched steel-framed industrial window of a derelict glassworks at night, no flash, phone auto night mode so it is a bit smeared. Most of the many small panes are smashed and show black interior, but a few lower panes are intact, dusty and reflective, showing a dim grey-blue reflection of the outdoors. In one intact lower pane the photographer's own reflection is faintly visible as a dark standing figure, but it is wrong: it stands straight with both arms hanging down at its sides, facing the lens, and holds NO phone and no raised arm. Just a dim, plain, human-sized reflection, no glow, easy to miss until the second look.*
- Prompt ruchu: n/d (zdjęcie).

**F2. „Pokój w ruinie” — kadr z kliszy 1997 (podwójna ekspozycja).**
- Kto/telefon/skąd: Darek Kruk, jednorazowy Kodak (1997), kadr huty z drogi o zmierzchu.
- Zwyczajność: fasada hali z łukowymi oknami, niebo widać przez puste okna na piętrze.
- Nienormalność: w jednym oknie piętra widać **oświetlony pokój mieszkalny** (lampa, firanka, stół), choć sąsiednie okna pokazują niebo na wylot.
- Wyjaśnienie: podwójna ekspozycja (zacięty transport kliszy), a pokój to okno rodziny Lisów w nocy powodzi (wątek Weroniki „światło od ulicy”); w Ciemni gracz odwraca negatyw i znajduje drugą ramkę.
- Dźwięk: stuk migawki jednorazówki i przewijanie kółkiem przy otwarciu zdjęcia.
- Prompt obrazu: *Scan of a 1997 35mm disposable camera print, slightly faded drugstore colour, mild double exposure mistake, grain, a dust speck, a thumb at the corner. Dusk. A ruined red-brick glassworks hall with tall arched windows seen from a gravel road; in the upper row of windows most show plain pale sky straight through because the roof and floors are gone; in exactly one upper window there is a warmly lit ordinary 1990s Polish living room with a table lamp and a net curtain, as if the window belonged to another building. No people. Ordinary tourist-snapshot composition, slightly tilted, thumb blur at one corner.*

**F3. „Drzwi 17” — para zdjęć Mai (przed/po).** *(wygenerowane: `gen/f3_drzwi_w_scianie.png`)*
- Kto/telefon/skąd: Maja, Redmi Note 9, ze flesza, wnętrze hali, 14.10 (kadr 1: goła ściana; kadr 2: tej samej ściany z drzwiami).
- Zwyczajność: gruz, kałuża, cegła, graffiti.
- Nienormalność: nienaruszone mieszkaniowe drzwi z mosiężną tabliczką **17** w ścianie hali, z wycieraczką.
- Wyjaśnienie: Gajda po 01:20 przystawił drzwi do załatanej dziury; zbliżenie z boku pokazuje podpórkę; 17 odsyła do szafki „D.K. 17” (`m_kodak`) i zdjęcia `wejscie_17`.
- Dźwięk: krok na gruzie, kapanie, głuche stuknięcie w drzwi z drugiej strony tylko w dodatkowej wersji klipu.
- Prompt obrazu: patrz `gen/prompts.py` (klucz `f3_drzwi_w_scianie`). Poprawka po teście: drzwi poza osią, widoczna krawędź muru o grubości jednej cegły (drzwi do niczego), bez twarzopodobnego graffiti.

**F4. „Dwa okna, ten sam człowiek” — Kuba przed blokiem.** *(wygenerowane: `gen/f4_dwa_okna.png`)*
- Kto/telefon/skąd: Kuba, Samsung Galaxy A12, z dziedzińca, po deszczu, kadr z biodra.
- Zwyczajność: PRL-owski blok, mokry parking, kilka ciepłych okien.
- Nienormalność: w dwóch oknach tego samego piętra stoi człowiek w tej samej ciemnej bluzie, w tej samej pozie.
- Wyjaśnienie: dwóch różnych ludzi w identycznych bluzach (merch „Ekipa 🍕”); zbliżenie: jeden ma zegarek.
- Dźwięk: bez dźwięku w grze, w czacie Kuba pisze „czemu on stoi tak samo”.
- Prompt obrazu: `gen/prompts.py`, klucz **`f4_dwa_okna_v2`** (v1 za subtelna: postacie małe i nieidentyczne; v2: ta sama twarz, bluza, obie ręce na parapecie, kadr bliżej).

**F5. „Peleryna w blasku flesza” — kadr 23 z 1997.**
- Kto/telefon/skąd: Darek, jednorazówka z fleszem, korytarz hali.
- Zwyczajność: trzech nastolatków w jasnym kręgu flesza, reszta czarna.
- Nienormalność: na końcu korytarza, 15–20 m dalej, **jaskrawo jaśnieje mała żółta peleryna**, mimo że flesz nie sięga tak daleko.
- Wyjaśnienie: odblaskowe taśmy na dziecięcej pelerynie z lat 90. odbijają światło (fizyka); Tomek szedł za nimi.
- Dźwięk: ładowanie flesza (wysoki pisk) przy otwarciu zdjęcia.
- Prompt obrazu: *Flash photo scan from a 1997 disposable camera, red-eye, hard flat flash falloff, grain, orange-magenta cheap print. Three Polish teenage boys in dark sweatshirts squinting in a brick hall corridor in the harsh flash circle, one mid-motion and blurred. Far behind them at the dark end of the corridor, about twenty metres away, a very small bright yellow reflective child's raincoat is lit vivid yellow as if by the same flash, while everything between is black. No text.*

**F6. „Odbicie z dzieckiem” — przystanek końcowy, Lena.**
- Kto/telefon/skąd: koleżanka Leny z pętli, Samsung A21s, nocą, przez szybę zaparkowanego autobusu.
- Zwyczajność: pusta pętla, mokry chodnik, jedna latarnia.
- Nienormalność: w odbiciu szyby na wiacie stoi dziecko w żółtej pelerynie; w realnym kadrze obok wiaty nikogo nie ma.
- Wyjaśnienie: odbicie plakatu „30 lat po powodzi” na wiacie (kadr z innej strony pokazuje plakat).
- Dźwięk: diesel na biegu jałowym, syk drzwi.
- Prompt obrazu: *Phone photo at night at the terminus of a small Polish town bus line, shot slightly diagonally through the big dark side window of a parked city bus, the interior dim and empty. The glass shows a faint reflection of the street behind the photographer: wet pavement, one sodium lamp, a bus shelter with a poster, and next to the shelter a small child-sized figure in a bright yellow raincoat with the hood up standing perfectly still. In the real view at the edge of the frame (beyond the glass) the same spot is empty pavement. Reflection glare, auto-focus on the dirty glass.*

**F7. „Kalosze” — klatka schodowa, Ola.**
- Kto/telefon/skąd: Ola, iPhone 11, 15.10 rano, pod mieszkaniem Mai („czekam z butami przy drzwiach”).
- Zwyczajność: klatka z zieloną lamperią, wycieraczki, czyste linoleum.
- Nienormalność: przed drzwiami Mai stoją **małe, mokre żółte dziecięce kalosze** w kałuży, choć cała klatka jest sucha i nie ma śladów.
- Wyjaśnienie: ktoś je tam postawił po zmroku (Gajda/Szklarz — zastraszanie); zbliżenie: kalosze nowe, nie z 1997.
- Dźwięk: kroki i echo klatki; brak muzyki.
- Prompt obrazu: *Phone photo taken standing on a dim Polish 1970s stairwell landing, green painted wall panel, grey linoleum, one fluorescent tube. In front of one door sits a pair of small child-sized bright yellow rubber boots standing neatly side by side in a puddle of water; the rest of the floor is dry and clean with no wet footprints anywhere. Slight tilt, auto-exposure compromise, nothing else unusual.*

**F8. „Powtórzony podest” — panorama klatki, Ola.**
- Kto/telefon/skąd: Ola, tryb panorama w iPhonie.
- Zwyczajność: klatka schodowa, kaloryfer, okno, gaśnica.
- Nienormalność: ten sam podest z identycznym kaloryferem i oknem powtarza się dwa razy, a człowiek stoi tylko na jednej kopii.
- Wyjaśnienie: błąd zszywania panoramy (ruchoma osoba); gracz porównuje z drugim zdjęciem tego samego miejsca.
- Dźwięk: brak; opis „panorama 12:41”.
- Prompt obrazu: *Phone panorama photo with visible stitching error: a Polish apartment-block stairwell with a radiator under a window, a fire extinguisher and a grey-green wall; the same landing section appears twice in a row, identical radiator, window and extinguisher repeated, with a seam line slightly visible; a man in dark clothes stands on only one of the two copies. Wide aspect, slightly crooked.*

### 5.2 Pięć krótkich klipów (8 s, pion, telefon)

Wspólne zasady klipu: **tylko klatka startowa** (z promptu obrazu) + opis ruchu; Flow Omni 1.1 Flash; dźwięk w prompcie; po wygenerowaniu pasek OSD/znaczniki dokładać osobno; dłoni i twarzy z bliska nie pokazywać.

**V1. „Ta sama bluza” — Kuba filmuje blok.**
- Kto/telefon/skąd: Kuba, Galaxy A12, pionowo, idzie przez dziedziniec, 21.10 ok. 22:40.
- Zwyczajność: rozmawia półgłosem do telefonu „sprawdzam, czy ktoś jest u mamy”, obraz lekko się kołysze.
- Nienormalność: człowiek w oknie 3. piętra ma tę samą szarą bluzę ze sznurkami co rękaw, który wpada w dolny róg kadru przy machnięciu ręką; ta sama poza, trzyma telefon i też filmuje; światło jego telefonu miga w rytm kroków Kuby.
- Wyjaśnienie: Szklarz (Igor) wie, w czym chodzi Kuba (z jego zdjęć w „Ekipie”) i stoi w oknie pustego mieszkania znajomego; bluza z tego samego merchu.
- Dźwięk: kroki po mokrym asfalcie, oddech i szelest rękawa, daleki pies, własny telefon wibruje w kieszeni; **cisza 1 s tuż przed uniesieniem kamery**.
- Prompt obrazu (klatka startowa): `PRE` + *Vertical phone frame from a 19-year-old walking across a wet courtyard at night in front of a prefab five-storey block, phone at chest height, slight tilt; in the lower corner the cuff of his own grey hoodie sleeve with white drawstring cords is visible. Most windows dark, a few warm kitchen windows.*
- Prompt ruchu: *Handheld vertical phone video, uneven walking rhythm, rolling shutter wobble, autofocus hunting once in the dark. The person walks forward for three seconds, then tilts the phone up to the third floor where a man in the same grey hoodie as the sleeve in the lower corner stands in a lit window holding up his own phone toward the camera, a tiny light on its screen. The sleeve swings across the bottom of the frame once and matches. No cut, no zoom, no effects, no glow, no music. Ambient: footsteps on wet asphalt, breath, a distant dog, a vibration of a phone in a pocket.*

**V2. „Drzwi, których nie było” — hala, Kuba z latarką.**
- Kto/telefon/skąd: Kuba, Galaxy A12 z latarką, huta, 22.10 wieczorem (prolog `v_snap` nowa wersja).
- Zwyczajność: idzie wzdłuż ceglanej ściany z graffiti, światło latarki skacze po gruzie.
- Nienormalność: za pierwszym przejściem ściana jest goła; po zawróceniu (4 s później) w tym samym miejscu stoją **drzwi z numerem 17**, z cienką smugą światła pod spodem. Operator tego nie komentuje i idzie dalej.
- Wyjaśnienie: patrz F3 (przystawione przez Gajdę); smuga światła to latarka kogoś za drzwiami (nieobecny w kadrze).
- Dźwięk: kroki na gruzie, kapanie, pogłos hali, oddech; **jedno stuknięcie z drugiej strony drzwi** po zawróceniu.
- Prompt obrazu (start): `PRE` + *Handheld phone torch frame in a derelict red-brick industrial hall at night, a long brick wall with faded graffiti and rubble on the floor lit by a small phone flashlight beam, rest black.*
- Prompt ruchu: *Handheld vertical phone video with torch, shaky walking, the light bounces on rubble. For four seconds the camera moves along the wall; the wall is bare brick with graffiti. The camera turns around and walks back; at the same spot there is now an intact brown apartment door with the number 17 and a thin line of warm light under it. The operator does not stop or react. No glow, no effect, no cut. Ambient: footsteps on rubble, dripping water, hall reverb, breath, one muffled knock at the very end.*

**V3. „Dwa okna, te same ruchy” — Ola z balkonu.**
- Kto/telefon/skąd: Ola, iPhone 11, oparty o barierkę balkonu 4. piętra, 23:05, bez ruchu.
- Zwyczajność: widok na blok naprzeciw, parking, 8 s spokoju z lekkim dryfem ekspozycji.
- Nienormalność: w dwóch oknach tego samego piętra stoją dwaj ludzie w tych samych bluzach; w 5. sekundzie obaj jednocześnie robią ten sam mały ruch głową.
- Wyjaśnienie: patrz F4 (różnią się szczegółami); synchronizacja to inscenizacja Igora (celowe zastraszanie).
- Dźwięk: wiatr w mikrofonie, telewizor sąsiada, brzęknięcie szyby; cisza 1 s w momencie ruchu.
- Prompt obrazu: z F4, powiększona wersja.
- Prompt ruchu: *Static phone video propped on a balcony rail, tiny exposure breathing, slight digital zoom drift, no camera movement. Two men in identical dark grey hoodies stand motionless in two lit windows of the same floor of the opposite prefab block; at five seconds both slowly turn their heads towards the camera in exactly the same way and then stay still. No effects, no glow, no cut. Ambient: wind on microphone, a neighbour's TV, distant dog.*

**V4. „Odbicie z dzieckiem” — Lena na pętli.**
- Kto/telefon/skąd: Lena, Samsung A21s, 8 s przejazd kamerą wzdłuż pustego autobusu na pętli, 22:50.
- Zwyczajność: Lena robi nagranie „dla Oli, że już kończę”, kamera sunie po fotelach.
- Nienormalność: w odbiciu ciemnej szyby na wiacie stoi małe dziecko w żółtej pelerynie, w realnym kadrze nikogo.
- Wyjaśnienie: plakat na wiacie (F6).
- Dźwięk: diesel na biegu jałowym, syk drzwi, klik wycieraczek; **silnik gaśnie na 1 s w momencie, gdy kamera mija odbicie** (rozsądne wyjaśnienie: automat stop/start).
- Prompt obrazu (start): z F6.
- Prompt ruchu: *Handheld vertical phone video along the side window of a parked empty city bus at night, slow sideways walk, small shakes. A bus shelter and a sodium lamp are reflected in the glass; as the camera passes, a small child in a yellow raincoat is visible in the reflection standing next to the shelter, while the real street edge at the right side of the frame is empty. No glow, no cut. Ambient: idling diesel, door hiss, wiper click, the engine briefly cutting out for one second.*

**V5. „Luka w kadrze” — fotopułapka BushView CAM-01.**
- Kto/telefon/skąd: fotopułapka (IR, pasek OSD generowany osobno), brama przy hucie, 15.10 01:47.
- Zwyczajność: puste wejście, wiatr w trawie, 5 s nic.
- Nienormalność: między dwiema klatkami (kamera nagrywa 2 kl./s i gubi klatki) na szczycie słupa bramy, 3 m nad ziemią, pojawia się **ludzka sylwetka bez ruchu**, nikt nie wspinał się w kadrze.
- Wyjaśnienie: kufajka zawieszona na słupku w trakcie luki (PIR opóźnia wyzwolenie); w kolejnym klipie ktoś zdejmuje kufajkę.
- Dźwięk: kliknięcie filtra IR, wiatr, trzask gałęzi poza kadrem; **brak** muzyki.
- Prompt obrazu (start): *Black and white night-vision infrared trail camera frame, wide angle fisheye-ish, an old brick gate with a stone post on the left and a gravel path, grass and bare trees, grainy, no text.* (pasek `BUSHVIEW CAM-01 3°C 37°F 15/10/2026 01:47:13` dokładać w ffmpeg.)
- Prompt ruchu: *Fixed infrared trail camera video, 8 seconds, almost nothing moves except grass in wind. At about the fourth second the video drops two frames and when it resumes a human-shaped figure in a padded dark jacket stands motionless on top of the three-metre brick gate pillar; nobody is seen climbing. The figure does not move for the rest of the clip. No glow, no zoom. Ambient: wind, IR cut-filter click, a branch cracking off-screen.*

---

## 6. Checklista oceny realizmu i nienormalności

Wydrukować; oceniać w tej kolejności, przy powiększeniu 100%.

**A. Czy to zwykłe zdjęcie z telefonu?**
- [ ] Autor i telefon są znani i nie pojawiają się razem w kadrze (poza lustrem/odbiciem, które jest poprawne).
- [ ] Jeden–dwa wiarygodne błędy telefonu (przepał, rozmycie, autofokus, kciuk), różne w różnych częściach kadru.
- [ ] Szum rośnie w cieniach, a nie jest równo rozłożony.
- [ ] Źródło światła widać lub łatwo je wyjaśnić; brak poblasku bez źródła.
- [ ] Kompozycja nudna, nie plakatowa, bez osi i symetrii.
- [ ] Geometria: okna, szprosy, schody, szyby, cienie spójne.
- [ ] Dłonie, twarze, włosy: nie zbliżone, nie „gumowe”; brak sześciu palców.
- [ ] Teksty/numery czytelne **albo** celowo nieczytelne; brak dziwnych logo.
- [ ] Data, pora roku i pogoda zgodne z fabułą (`PLAN §10`).

**B. Czy nienormalność działa?**
- [ ] Jest dokładnie jedna.
- [ ] Wykrywalna w 3–10 s bez fabuły (test z kimś, kto nie zna gry).
- [ ] Oświetlona/zaszumiona tak samo jak reszta; nie wyróżniona kolorem ani poblaskiem.
- [ ] Naruszenie jest konkretne (odbicie, dubel, drzwi, luka), a nie „klimat”.
- [ ] **Wyklucza zwykłe wyjaśnienie** (bliźniak, towarzysz fotografa, ustawka, „pomieszczenie gospodarcze”) dzięki jednemu **unikalnemu znacznikowi tożsamości** (rozdarta kieszeń, naszywka, plama, ten sam rękaw co u nagrywającego) albo fizycznej niemożliwości (grubość muru jedna cegła, flesz poza zasięgiem).
- [ ] Ma racjonalne wyjaśnienie w grze i hotspot, który je ujawnia.
- [ ] Nie powtarza nienormalności z poprzedniego zdjęcia.

**C. Klip**
- [ ] Jedno ujęcie 8 s, ruch wynika z ręki operatora; brak „płynnego” przenikania.
- [ ] Dźwięk: oddech/kroki operatora, tło, cisza przed i po, jedno źródło poza kadrem.
- [ ] Brak dymu/mgły znikąd i brak dłoni z generatora.
- [ ] Rysy i krawędzie nie „pływają” w ostatnich sekundach.
- [ ] Nic nie zmienia się poza zaplanowaną nienormalnością.

**D. Decyzja:** wszystkie punkty A i B → do oceny użytkownika. Brak punktu z B → wraca do projektu pomysłu, nie do „poprawy filtra”.

---

## 7. Dodatkowa reguła z testów: nienormalność musi wykluczać zwykłe wyjaśnienie

Test Codexa pokazał, że sama „identyczność” lub „brak telefonu” nie wystarcza: dwóch podobnych mężczyzn w oknach to „bliźniacy lub ustawka”, odbicie bez telefonu to „towarzysz fotografa”, drzwi w ruinie to „pomieszczenie gospodarcze”. Dlatego do każdej nienormalności dodać **jedno rozstrzygnięcie**:
- **dubel →** unikalny znacznik na ubraniu (np. identyczna naszywka/rozdarcie kieszeni/plama po kawie) widoczny na obu postaciach;
- **odbicie fotografa →** w kadrze przy brzegu widać rękaw/kurtkę fotografa, a odbicie ma ten **sam** unikalny znacznik, tylko **bez telefonu i z odwróconą twarzą (tyłem do szyby)**;
- **drzwi →** widać odsłonięty brzeg muru grubości jednej cegły, za nim pusta hala (drzwi do niczego);
- **peleryna / flesz →** odległość wyraźna z perspektywy (słupy, podłoga), więc „za daleko na flesz” jest policzalne;
- **luka klatek →** ten sam kadr przed i po z widocznym licznikiem czasu OSD.

## 8. Wyniki generacji testowych (Codex CLI, `gpt-6.1-sol`, `image_generation`; Gemini nie użyty)

Pliki: `/workspace/look-bible/gen/`. Oceny Codexa (reasoning high, prompt ze stdin, osobno dla każdego obrazu, równolegle): `gen/reviews/*.md`. Skala Codexa jest niestabilna (±2–3 pkt), traktuję ją jako ranking, nie pomiar.

| Plik | Pomysł | Realizm wg mnie | Nienormalność wykrywalna? | Ocena Codexa (AI / realne / wykr. 3 s / wykr. 10 s / straszy) |
|---|---|---|---|---|
| `f3_drzwi_w_scianie.png` | F3 drzwi 17 w murze hali | **dobry**, wiarygodny flesz i kciuk, gruz bez „ustawienia” | **tak, w 1 s** (najsilniejsza) | 5 / 6 / 7 / 8 / 3 |
| `f1_odbicie.png` (v1) | F1 odbicie bez telefonu | dobry, szyby wiarygodne | częściowo; na prawo od odbicia jest drugi zakapturzony kształt w pęknięciu szkła (**niezamierzona druga anomalia**) | 4 / 7 / 2 / 4 / 4 |
| `f1_odbicie_v2.png` | j.w., po poprawce | bardzo dobry, kompozycja bardziej „kratownica jak plakat” | tak (jasno widać odbicie z opuszczonymi rękami), ale „towarzysz fotografa” nadal możliwy | 4 / 6 / 2 / 5 / 3 |
| `f4_dwa_okna.png` (v1) | F4 dwóch tych samych | bardzo wiarygodne zdjęcie telefonem z podwórka | **za subtelne:** małe, niepodobne postacie | 4 / 7 / 3 / 6 / 4 |
| `f4_dwa_okna_v2.png` | j.w., po poprawce | dobry, postacie czytelne i identyczne | tak (identyczna poza i bluza), ale „bliźniacy” nadal możliwi | 5 / 6 / 3 / 5 / 3 |

**Co się udało:** realizm kadrów z „telefonu” (kciuk, flesz, przepalona latarnia, mokry asfalt) jest przyzwoity przy promptach w stylu `PRE`; nienormalność typu „drzwi w murze” działa natychmiast; poprawki promptu (większe postacie, odbicie na osi) wyraźnie poprawiły czytelność.
**Co się nie udało / ograniczenia:**
- Codex **nie respektuje proporcji** z promptu (większość wyszła 4:3 poziomo, f1 v1 ~1:1) — przycinać lub użyć GenerateImage z `aspect_ratio`.
- **Nadal za mało straszne** (Codex 3–4/10): to grafiki-zagadki, nie straszaki. Same z siebie dają niepokój „co tu jest nie tak”; groza musi dojść z kontekstu (kto wysyła, kiedy, dźwięk, następny kadr) — dlatego zestawy przed/po i klipy.
- Ocena Codexa jest niestabilna: tę samą nienormalność ocenia raz 3/10, raz 7/10.
- Ręce i twarze z bliska: nie testowane celowo (reguła „nie pokazywać”).
- Klipów (V1–V5) **nie generowałem** (poza zakresem; do Flow dopiero po akceptacji zdjęć-klatek startowych).

## 9. Pliki i narzędzia

- Siatki z przeglądu: `/workspace/look-bible/sheets/` (`web.jpg`, `maja.jpg`, `kronika.jpg`, `trap.jpg`, `video.jpg`, `clips.jpg`, `best.jpg`).
- Prompty i skrypt generacji: `/workspace/look-bible/gen/prompts.py`, `gen/run.py`.
- Wygenerowane zdjęcia i oceny: `/workspace/look-bible/gen/` oraz `gen/reviews/`.
