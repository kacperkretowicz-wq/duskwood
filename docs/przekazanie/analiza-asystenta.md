# Analiza „Quiet Is Safer / Mglisko” oczami gracza 14–25 lat (2026)

Autor: asystent (rola: dzisiejszy gracz — TikTok, Discord, BeReal, true crime, Duskwood/Simulacra, krótkie sesje, zero cierpliwości dla cringe).
Data: 25.10.2026. Gałąź `codex/spojnosc`, stan katalogu roboczego z chwili lektury. **Żaden plik repo nie został zmieniony.**

## 0. Metoda i ograniczenia

- Przeczytane: `KONTEKST.md`, `raport-codex.md`, `materialy/FABULA-I-SCENY.md`, `docs/` (KONCEPCJA, BIBLIA-SEZONOW, SEZONY-I-AKTUALIZACJE, OSTATNI-KURS, MROK-I-SLADY, OPRAWA-I-DIALOGI, APLIKACJE-MOBILNE), skrypty `js/story/*.js` (S1–S5), `js/core/pacing.js`, `js/data/rhythm.js`, `web.js` (gazeta2026), a dialogi wszystkich 33 rozdziałów — z indeksu `spojnosc-transkrypt-danych.md` (wyciąg wiadomości do `/tmp/tx`). Obejrzałem też klatki `assets/video/v_licznik.mp4` oraz zdjęcia muru `m_lehr`, `s_wall`, `k_wall`.
- **Nie grałem w przeglądarce** (to analiza tekstu, danych i kilku obrazów). Oceny 1–10 są subiektywne, ale każda ma wskazanie miejsca. „Krok” to numer kroku z indeksu rozdziału (`rozdział:krok`, np. `ch3:544`); rozdziały → pliki: prolog/ch1–ch5/epilog = `js/story/<id>.js`; m0–m1 = `most.js`, mp/m2/m3 = `most2.js`, m4/m5 = `most3.js`; kp/k2–k4 = `kopia2.js`, k0/k1 = `kopia.js`; c0–c4/cf = `kronika.js`; g0–g6 = `glos.js`.
- Liczby „wiadomości do pierwszego celu” są liczone mechanicznie z indeksu (wiadomości zanim pojawi się pierwszy cel/dowód/media) — to przybliżenie rytmu, nie pomiar czasu.
- Tryb domyślny to **swobodny** (`pacing.js`: przerwy `rests` działają tylko w trybie `daily`), więc gracz może przejść wszystko jednym ciągiem; retencję trzeba budować treścią, nie czekaniem.

---

## 1. Oceny wątków S1–S5

Skala 1–10. „Nuda” = ryzyko znudzenia (10 = bardzo duże). Retencja = czy chcę grać następnego wieczora.

| # | Wątek (gdzie) | Hak | Zagadka | Emocje | Zaskoczenie | Nuda | Retencja | Uwaga |
|---|---|---|---|---|---|---|---|---|
| 1 | **Numer po zmarłym + Kuba** (prolog, `prolog:29–165`) | 9 | 7 | 7 | 8 | 3 | 8 | Najlepszy start: relacja z Błysku (`v_snap`) od razu, potem „to numer, na który dzwoniła Maja?”. Zagadki na „show” (rejestr → SMS → stopka 2007 → nekrolog) uczą gry bez tutoriala. |
| 2 | **Nimbus: hasło z pytań + huta zamiast tamy** (ch1) | 7 | 8 | 5 | 6 | 4 | 6 | Satysfakcjonujące („weszliśmy na jej konto”). Spada napięcie przy ewidencji dowodów z fotopułapek (`ch1:77–121` — kilka razy to samo zdjęcie 1:20 w różnych gałęziach). |
| 3 | **Ola ukrywa kłótnię** (ch1 `126–195`, czat prywatny) | 6 | 5 | 8 | 5 | 3 | 6 | Najlepsza scena „niech nikt tego nie widzi”: grupowy vs prywatny wybór ma realne skutki (Ola wychodzi z grupy). |
| 4 | **Szklarz = Igor** (ch1 koniec, ch2 głosówka, ch4 `72–148`) | 9 | 6 | 7 | 5 | 2 | 8 | Anonim z „kropkami ze spacjami” działa jak creepypasta. Zaskoczenie niskie: „technicznie rzecz biorąc” w ch1 i u Szklarza w ch4 to wskazówka, którą rozpozna każdy, kto czytał czaty. Wyznanie Igora jest jednak mocne emocjonalnie. |
| 5 | **Wyprawa do huty Kuby i Igora** (ch2 `362–508`, noc 22.10) | 9 | 7 | 8 | 7 | 3 | 9 | Czas rzeczywisty, plan hali, łańcuch, szafka 17, czołówka, światła na dziedzińcu. To „pokazuję znajomym” z S1. Problem: dojście do niej zajmuje ~190 wiadomości (patrz §1.2). |
| 6 | **Bartek i ojciec Marek** (ch2–ch4) | 5 | 4 | 7 | 4 | 6 | 5 | Cykl „nie dziś / nie wiem / nie było ważne” (`ch3:55–113`) trzy razy z rzędu; wyznanie Marka w ch4 jest przewidywalne, bo od ch2 wiadomo, że 1997 = czterech chłopaków. |
| 7 | **Klisza → kadr 21 → Tomek → Weronika** (ch2 `211–246`, ch3 `127–213`) | 8 | 8 | 10 | 8 | 3 | 9 | Najsilniejsze emocje całej gry: „To jest Tomek”, tamagotchi, „Mama krzyczała o to mleko”. Ciemnia daje poczucie, że gracz sam coś odkrył. |
| 8 | **Gajda jako sprawca + auto Sevra** (ch1 `159`, ch2 `130–166`, ch3 `400–450`) | 6 | 7 | 6 | **3** | 5 | 6 | Sprawca jest znany od ch1 („Nie do Gajdy. Nie pytaj dlaczego”, notatka „Zwłaszcza R.G.”), potem Gajda dosłownie prosi o dowody „prywatnie”. To thriller o ucieczce, nie śledztwo „kto”. Gracz Duskwood oczekuje fałszywego tropu — tu go nie ma. |
| 9 | **SMS „Mamo…” i telefon Mai 03:05** (ch3 `544–669`) | 10 | 7 | 8 | 9 | 2 | 10 | Szczyt S1: „mamuś” vs „mamo”, Kluska †2019, zaległe zdjęcia vs „kiedy doszło”. Zagadki są uczciwe (data w pliku ≠ powiadomienie). |
| 10 | **Ratunek: 112 + posterunek + droga nr 7** (ch5) | 9 | 6 | 9 | 6 | 2 | 8 | Dobra pułapka „zadzwoń na posterunek = Gajda słyszy”. Po finale (ch5 `268–348`) kilka cichych scen (Sylwia, Zuza, Henryk) to miły oddech, ale bez haka. |
| 11 | **Epilog S1** (`epilog:5–163`) | 5 | 2 | 8 | 5 | 6 | 5 | Seria pożegnań (Kuba, Weronika, Bartek, Igor, Ola, Maja) — emocjonalnie dobra, ale 19 wiadomości do pierwszego obiektu; hak S2 (pudło + „Gajda włączył telefon”) pojawia się dopiero na końcu (`epilog:159–163`). |
| 12 | **Cięcie nagrania Henryka** (S2 m1–m2: „ON SIE PRZYZNAL”, lodówka na 0:37) | 7 | 7 | 6 | 6 | 6 | 6 | Najbardziej „2026” temat gry: fragment bez kontekstu, 100 tys. wyświetleń, komentarze. Dobrze zrobiona zagadka porównania wersji. |
| 13 | **K. / Krystyna / Marta i mama** (m3) | 6 | 6 | 8 | 7 | 5 | 6 | Wyznanie Marty „to moja mama” działa; fabularnie jest zalążkiem S5. |
| 14 | **Strona 41 / OIP / Kurek-Bud** (m4 `most3.js`) | 3 | 5 | 4 | 4 | **9** | 3 | Dokumenty, pieczątki, „za zgodność”. Dla 14–19 to formularze urzędowe. Najsłabsze miejsce gry. |
| 15 | **Dylemat publikacji + K. w tygodniku** (m5) | 5 | 4 | 6 | 3 | 6 | 4 | Dobry dylemat etyczny, ale gracz „wybiera akapit”; nie ma ryzyka dla gracza. |
| 16 | **Kaseta/licznik 03:51** (m4 `xLicznik`) | 5 jako straszak / 2 jako wątek | 2 | 2 | 3 | 7 | 2 | Szczegółowo w §2. |
| 17 | **@archiwum.rybickiego / Klipo — wycieki** (k0–k2) | 8 | 7 | 6 | 6 | 4 | 8 | Konto bez twarzy, 1400 plików, doxxing w komentarzach — bardzo bliskie internetowi 2026. |
| 18 | **Kuba ujawnia się jako autor wrzutek** (k3 `kopia2.js`, kroki 99–216) | 8 | 8 | 9 | 8 | 3 | 9 | Gracz sam łączy zeszyt dyżurów, karteczkę z pytaniami (!) i kabel. „Cicho jest bezpieczniej” wraca jako temat. Świetny zwrot: pytania bezpieczeństwa z ch1 wracają przeciw Kubie. |
| 19 | **Lena / @cicho.bylo / peron / alibi** (k2–k4) | 5 | 6 | 4 | 5 | 6 | 5 | Nowa postać bez ciężaru emocjonalnego, zdjęcie z peronu bez konsekwencji. |
| 20 | **TV Dolina + sekret Oli z 2018** (c0–c4, cf) | 8 | 6 | 9 | 6 | 4 | 8 | „Klip pojawi się jutro o 21:00” to prawdziwy zegar-hak. Ola dostaje własny wątek; wyznanie przez telefon w `cf` jest najlepszą sceną S4. |
| 21 | **Ida i Zenon (zgoda, kasety)** (c3–c4) | 6 | 5 | 8 | 6 | 4 | 6 | Ciepłe, ale zakończenie c4 („Katalog zostawiam otwarty”) nie niesie haka. |
| 22 | **Klony głosu: twój głos, „Tomek”, hasło rodzinne** (g0–g3) | 10 | 8 | 9 | 7 | 3 | 9 | Najbardziej na czasie w całej grze (głos AI, oszustwa „na wnuczka”, hasło rodzinne). „Wera, to ja. Jest mi zimno” (g2) to najmocniejsza linia w grze. |
| 23 | **Oskar, serwis, paczki z telefonów** (g4) | 6 | 7 | 5 | 6 | 5 | 6 | Dobra mechanika (trzy próbki z jednej rozmowy 20:58), ale 26 wiadomości do pierwszego celu. |
| 24 | **Marta autorką scenariuszy / finał** (g5–g6) | 7 | 6 | 7 | 5 | 5 | 6 | Czwarty „ktoś z grupy okazuje się nadawcą” (po Igorze, Kubie, Idzie). Gracz zna wzór; zwrot Marta = córka Janiny jest znany od S2, więc zaskoczenie jest mniejsze, niż zakłada dokumentacja. |

### 1.1 Trzy najmocniejsze
1. **Klony głosu S5 (g0–g3)** — nowoczesny strach, hasło rodzinne jako mechanika, linia „Wera, to ja. Jest mi zimno”.
2. **Telefon Mai o 03:05 + „Mamo…” (ch3 `544–669`)** — idealna proporcja zagadki, grozy i emocji.
3. **Klisza → Tomek → Weronika (ch2–ch3)** — emocjonalny rdzeń; gdyby gracz miał pamiętać jedną scenę, to ta.
Wyróżnienia: wyprawa do huty (ch2), Kuba jako autor wrzutek (k3), Ola i klip 21:00 (S4).

### 1.2 Trzy najsłabsze
1. **S2 m4–m5 (`most3.js`): Strona 41, OIP, „za zgodność”, dylemat publikacji** — dokumenty bez stawki osobistej, 1 straszak w całym S2.
2. **Bartek–Marek i brak „kto” przy Gajdzie (S1 ch1–ch4)** — sprawca jest znany od początku; cykl odkładania rozmowy przez Bartka nie niesie nowej informacji.
3. **Lena / @cicho.bylo / peron (S3 k2–k4)** — nowa postać bez wątku emocjonalnego; „zdjęcie z peronu” nie ma skutku.

### 1.3 Miejsca spadku napięcia (plik/rozdział/krok)

| Miejsce | Co się dzieje | Skutek | Propozycja |
|---|---|---|---|
| `ch2.js` kroki ~30–340 | Bartek, Gajda, Sylwia, Zuza, Ola, notatka „Pytania”, plan hali — ~190 wiadomości. Straszaki: `s1_odsluch` (`ch2:114`) i dopiero `s1_cam58` (`ch2:374`) — **260 kroków bez straszaka**. | Najdłuższy odcinek bez grozy w S1 przed najlepszą sceną. | Wcześniejszy mikro-hak (CAM-01 0057/0058 jako powiadomienie ok. kroku 190), skrócić Sylwię/Zuzę do jednej wymiany (reszta do „Na osobności”). |
| `ch3.js` kroki ~55–113 | Bartek odkłada rozmowę trzy razy; Ola o lumpeksie (`15–50`), red herring „zwykła peleryna”. | 50+ wiadomości bez nowej informacji. | Scalić trzy rundy Bartka w jedną; peleryna z lumpeksu jako krótka wymiana. |
| `ch3.js` kroki ~523–537 | Ola idzie 28 minut do domu („Mapa kłamie”). | Oddech przed szczytem — dopuszczalny, ale można skrócić do 3 wiadomości. | Zostawić dwie linie. |
| `ch4:245` (koniec) | „ok. to do wieczora” — rozdział kończy się planem, nie hakiem. | Słaby cliffhanger przed ch5 (w pilocie ten sam dzień). | Zakończyć wiadomością Gajdy albo Szklarza (np. „kłódkę wymienił 16.10”). |
| `epilog:5–120` | Sześć pożegnań po kolei; hak S2 dopiero w `159–163`. | Gracz wychodzi po „Przepraszam, Igor”. | Przenieść „pudło” + „Gajda włączył telefon” na początek epilogu albo zakończyć pożegnania krótszym krokiem. |
| `most.js` (m0) kroki 4–41 | Kotka, herbata, radiowóz, ~30 wiadomości zanim pojawi się teczka. | S2 zaczyna się od oddechu zamiast haka. | Teczka „nie publikować bez K.” jako pierwsza wiadomość, kotka potem. |
| `most3.js` m4 (cały) | OIP, pieczątki, kserokopie. | Najniższa retencja gry. | Skrócić; przenieść stawkę osobistą (Marta/mama) na początek, dokumenty jako „dowód w 2 krokach”. |
| `most3.js` m5 `1–24` | Zuza i babcia, 24 wiadomości do pierwszego celu. | Dobre emocjonalnie, nie napędza fabuły. | Najpierw tygodnik („kim jest K.”), potem Zuza. |
| `kopia.js`/`kopia2.js` k1–k2 | Krzesło na przystanku, ładowarka; Bartek, Ola i Natan trzy razy powtarzają „zapytaj Igora, zanim napiszesz”. | Powtórzenie tej samej myśli przez trzy głosy. | Jedna osoba, jeden raz. |
| `kronika.js` c2 / c3 | 25 i 18 wiadomości do pierwszego dowodu. | Rozdziały zaczynają się od życia codziennego. | Zimne otwarcie od klipu/powiadomienia. |
| `glos.js` g2 / g4 / g6 | 38 / 26 / 73 wiadomości do pierwszego celu. | Dłuższe sceny rozmów bez zadania dla gracza. | Wstawić mini-zadanie (porównanie próbek) w pierwszej piątej części rozdziału. |

Rytm S2: 6 rozdziałów, ~600 wiadomości, **1 straszak** (`s2_nightcall` w m3). S3 i S4 mają po 6 straszaków, S5 — 7. Dla gracza, który przeszedł S1, S2 to „inna gra”.

---

## 2. Kaseta S2 (03:51) i mur/tunel (Cisza, reportBoth)

### 2.1 Czy obchodzą dzisiejszego nastolatka?

| Temat | Ocena „obchodzi” 1–10 | Dlaczego |
|---|---|---|
| **Kaseta, licznik 03:51** | **3** jako wątek, **5** jako straszak | Analogowa taśma i licznik to rekwizyt, nie emocja. Obchodzi, jeśli zamieni się w pytanie „kto edytował klip i jak to sprawdzić” — czyli to, co robi gracz z TikTokiem: porównuje oryginał z repostem. Zagadka „dlaczego odtwarzacz stanął” jest dla gracza zbyt techniczna, a tło stoi na jednym zbiegu okoliczności („dokładnie tam, gdzie urywa się fragment”). |
| **Mur/tunel (zamurowane, za nim Tomek)** | **8** (jako temat), **4** jako dziś opisane („pożar zniszczył mur”) | Dziecko za murem przez 29 lat + tamagotchi + urbex to klasyczny true crime. Problemem są dziś nie temat, lecz to, że w Ciszy „mur spłonął” (fizycznie nieprawdopodobne dla ceglanego, wilgotnego tunelu −1) i że obrazy muru są między sobą niespójne (patrz niżej). |

**Znalezione niespójności (konkret):**
- `assets/video/v_licznik.mp4` pokazuje **szpulowy magnetofon z wielkim oknem i 4-cyfrowym licznikiem bez dwukropka** (odczyt z klatek ok. „0531 → 0546 → 0538”, cyfry zmieniają się niespójnie). Tekst `most3.js:34–44` mówi o „kasecie mini-DV” (`most.js` m0) i liczniku „03:51”. Kto zrobi zrzut ekranu i przybliży — zobaczy co innego. Nie wolno tu dodawać „nowych nagrań”, więc opis w tekście musi być dopasowany do klipu (odtwarzacz taśmowy stacji archiwum, a nie kamera).
- `m_lehr.jpg` (8.10) — czerwona cegła, sklepienie, tamagotchi na podłodze; `s_wall.jpg` (14.10, 23:44) — **szare pustaki/dziurawka** z otworem i żółtą tkaniną; `k_wall.jpg` (22.10) — **czerwona łata na ciemnej cegle**, palety i niebieska plandeka. To trzy różne ściany. Dokumentacja i `ev_bricks` mówią o „jaśniejszej cegle dziurawce”. Zagadki typu „porównaj zdjęcia przed/po” nie zadziałają, dopóki obrazy nie będą spójne.
- `epilog.js:29` (Cisza): „Pożar zniszczył odprężarkę i mur” — ceglany tunel na poziomie −1, do którego schody są „zalane do kolan” (`ch2:395`), a ściana „ciemna od wilgoci” (`ch2:424`), nie spłonie; może się zawalić strop hali nad nim. Uwaga dla zagadki M1 poniżej.

### 2.2 Jak przedstawić je współcześnie (bez nowych nagrań)

**Kaseta → „ścieżka plików i znaczników czasu”.** Zamiast „stanęła taśma” pokazać ekran, który nastolatek zna: ekran dyktafonu/odtwarzacza telefonu Marty z paskiem i falą dźwięku, nazwami plików (`HW_2-2_*.dv`), „Szczegóły → czas trwania”. Marta nagrywa **ekran swojego telefonu**, nie sprzęt (dla gracza „zrzut ekranu z fali” jest zwykłym dowodem, taśma — antykiem). Fala dźwięku w Dyktafonie Nimbus (już istnieje, `ev_m_raw`) pokazuje lodówkę, która „znika” przy cięciu. Wszystko generowane w interfejsie z istniejących danych, nie z nowych nagrań.

**Mur → dowód „przed/po” i telefon.** Wzorzec BeReal/„przed i po”: trzy zdjęcia tego samego miejsca z metadanymi (8.10 Maja, 14.10 23:44, 22.10 Kuba) i hotspoty — wymaga unifikacji obrazów (§2.1). Do tego formaty znane z TikToka: duet Zuzy „mglisko unsolved part 2” (już istnieje w `m*` jako fraza), komentarz pod klipem (źródło dowodu), pętla „kadr 21 → zdjęcie z albumu Weroniki”. Mapy: warstwa „plan hali 1995” już jest; dodać pytanie „który poziom jest poniżej parteru” (poziom −1) jako bazę zagadki.

### 2.3 Kaseta: dwa warianty zagadki

**K-A. „To nie taśma, to znacznik” (rekomendowany, niski koszt).**
Wyjaśnienie w świecie gry: Marta wcześniej **zapamiętała punkt 03:51 w odtwarzaczu archiwum** (funkcja pamięci/znacznika licznika stacji), żeby wracać do miejsca cięcia; urządzenie zatrzymuje się przy zapamiętanym punkcie podczas przewijania; dioda mrugnęła raz = „punkt osiągnięty”. Nikt nie zatrzymał taśmy, taśma nie jest uszkodzona.
- **Kroki gracza (3):** 1) Notatki → Pytania: „Czemu licznik stanął na 03:51?” 2) Zestawić: `m2` (Marta: „Puszczam od początku. Będę pisać znaczniki czasu”, „03:12–03:51 to fragment z publikacji”), `ev_m_raw` (dźwięk po 03:51 gra dalej — taśma działa), klip `v_licznik` (dioda mrugnęła raz). 3) Wybrać: „Taśma jest uszkodzona / Marta zapamiętała punkt / ktoś zatrzymał zdalnie” (poprawne: drugie).
- **Dowody w grze:** `ev_m_raw`, `ev_m_cut`, kwestia Marty w `most2.js:186–190`, klip `v_licznik`.
- **Bonus fabularny:** pokazuje, że Marta mierzy czas co do sekundy i używa tego samego sprzętu, z którego w S5 pochodzi „pisk magnetowidu z pracowni” — wskazówka w przód bez nadprzyrodzoności.
- **Koszt zmiany w kodzie: mały.** `most3.js:34–44` (dopisać wyjaśnienie do kwestii Marty jako `wording`, bez nowych kroków), jeden wiersz w `case-most.js` (`ev_m_licznik`), opcjonalnie nowa rozmowa opcjonalna (`conversations`, bez migracji). Zmiana tekstu klipu wymaga uzgodnienia z urządzeniem na `v_licznik` (magnetofon szpulowy).
- **Ryzyko sprzeczności z kanonem: niskie–średnie.** (1) `most2.js:186–190` — Marta mówi, że **nie chce zgrywać kasety** (nie ma sesji w programie z ustawionym punktem OUT); wyjaśnienie musi wynikać z funkcji odtwarzacza, nie z oprogramowania do przechwytywania. (2) Klip pokazuje inny sprzęt niż „kamera mini-DV” (m0, m2). (3) Nie wolno sugerować, że Marta coś ukrywa (to zmieniłoby S2).

**K-B. „Zacięcie z 2011” (świadectwo Henryka).**
Wyjaśnienie: w miejscu 03:51 taśma ma fizyczne uszkodzenie/zagięcie z momentu, gdy Rybicki „w połowie zmieniał kasetę i coś mu się zacięło” (Henryk, `m1:62`). Odtwarzacz zatrzymuje się na uszkodzonym odcinku; dioda mrugnęła = błąd. Wydawca (Ida) cięła klip właśnie na tym szwie, bo tam była nieciągłość.
- **Kroki gracza (4):** 1) Przypomnieć rozmowę z Henrykiem. 2) Porównać „zaniki w pierwszych 20 s” (`m2`) z miejscem 03:51. 3) Dopasować „9 sekund później” (`m2`) do czasu naprawy zacięcia. 4) Wybrać: „uszkodzenie taśmy, nie cenzura” i wpisać do Pytań.
- **Dowody w grze:** `m1:62` (Henryk), `ev_m_raw`, `ev_m_cut`, notes A5 z teczki.
- **Koszt: średni** (3–4 kwestie, nowy dowód „Notatka Rybickiego: zacięcie”, nowy węzeł rozmowy opcjonalnej; bez migracji, jeśli bez nowych kroków głównej fabuły).
- **Ryzyko sprzeczności: wysokie.** Kłóci się z `ev_m_cut`: Marta mówi, że na kasecie **lodówkę słychać dalej**, a w publikacji znika przy cięciu — nieciągłość w taśmie miałaby ten szum zmieniać. Zacięcie nie tłumaczy też, czemu „9 sekund później” słychać pełne zdanie. Wymagałoby przepisania `m2`.
**Rekomendacja: K-A.** A jeśli zależy nam na zaangażowaniu 14–19-latków: zdegradować kasetę do jednego zdania wyjaśnienia (opcja 0) i dać energię wątkowi „cięcie klipu” (fala dźwięku, komentarze), który jest już w grze.

### 2.4 Mur/tunel: dwa warianty zagadki

**M-A. „Plan, woda, ogień” (rekomendowany; zero nowych obrazów).**
Cel: gracz sam uzasadnia, **dlaczego w gałęzi `reportBoth` mur przetrwał**, a w gałęzi bez zgłoszenia ucierpiała hala nad nim.
- **Kroki gracza (4):** 1) W notatce „Pytania” (po `ch5` — zgłoszenie obu miejsc) dostaje pytanie: „Co mogło spłonąć, a co nie?”. 2) Planem ewakuacji 1995 (galeria Mai, Mapy): odprężarka jest na poziomie −1 za piecem, **sklepiona cegła**. 3) `ch2:395, 424`: schody w dół „zalane do kolan”, ściana „ciemna od wilgoci”. 4) `ev_jerrycans` (kanistry przy bramie, otwarty bagażnik) + `ch5.js:82` (linia pliku) dyspozytor „straż pożarna jedzie też pod hutę” (flaga `reportBoth`) → wniosek: palne są palety, plandeka i drewniana podłoga **nad** kanałem; sama odprężarka nie spłonie, groźne jest zawalenie stropu i polewanie bez wiedzy o murze.
- **Skutek:** przy `reportBoth` — straż zabezpiecza górę, nie wchodzi w tunel; mur stoi, Tomek znaleziony „przy ratunku Mai w Rzeczce lub wcześniej” zgodnie z decyzją właściciela. Bez zgłoszenia — hala spłonęła, strop zawalił wejście; szczątki wydobyte po rozbiórce (nie „spłonęły”).
- **Koszt: średni.** Zagadka jako rozmowa opcjonalna/pytanie w Notatkach (bez migracji); warianty tekstu w `epilog.js:29` i `gazetaEpilog()` w `web.js:100–117` zależne od istniejącej flagi `reportBoth` (nie ma nowego stanu). **Uwaga:** dodanie nowego kroku w `epilog.js` zmienia indeksy kroków i wymaga migracji (`migrations.js`) — zmieniać tylko `wording` istniejących kroków.
- **Ryzyko sprzeczności: niskie.** Zgodne z `world.js:83, 116` (tamagotchi pod murem, Marek zamurował wejście), `ch5.js:63–82` (linie pliku); trzeba poprawić `docs/BIBLIA-SEZONOW.md` („tunel spłonął”) i `gazeta2026` (tekst „szczątki nadal nieodnalezione, bo tunel spłonął”).

**M-B. „Dwie warstwy muru” (efektowny, ale wymaga obrazów).**
Mur ma warstwę z 1997 r. (Marek) i łatę z 15.10 (Gajda). Gracz porównuje trzy zdjęcia (8.10, 14.10 23:44, 22.10) i wskazuje służbom, **gdzie otworzyć mur**: w miejscu łaty z 2026, bez rozbierania ściany z 1997 jako miejsca zdarzenia.
- **Kroki gracza (3):** 1) Tryb „Porównaj” w przeglądarce zdjęć (suwak przed/po). 2) Wskazać różnicę 14.10 → 22.10 (jaśniejsza łata, palety). 3) Wybrać punkt wejścia w rozmowie z komisarzem Ostrowskim (`mp`, istnieje).
- **Koszt: duży.** Nowy tryb w `viewer.js` (~150–250 linii), 2 nowe dowody, węzeł rozmowy, test w `tests/conversations.browser.cjs`; **plus wymiana lub ujednolicenie zdjęć** (§2.1: trzy różne ściany).
- **Ryzyko: wysokie** (wizualne). Obecne obrazy generowane pokażą różne materiały; w „spot the difference” gracz zauważy sztuczność zamiast zagadki. Nowe obrazy mogą wymagać zgody właściciela.
**Rekomendacja:** M-A teraz; M-B dopiero po unifikacji zdjęć muru.

---

## 3. Cringe: 10 linijek „dorosły udaje młodego” + poprawki 2026

Zasady systemowe z lektury: (a) „xD/xd” pojawia się 14 razy (głównie Maja) — to jest nawyk millenialsów; 2026: „xd/xdd” małymi literami albo wcale; (b) Kuba kończy aż 7 wiadomości 💀 (`ch1:27`, `k1:105/139`, `k2:45`, `kp:15`, `epilog:41/53`) — stał się tikiem; (c) „kurde” mówi **6 różnych osób** (Kuba, Maja, Natan, Bartek, Zuza, Oskar) — odbiera głosom odrębność; (d) Marta (24) mówi do gracza „Pan/Pani” 19 razy (m0–m5, g), a Natan (25) i Ida (22) „ty”; (e) opcje gracza w S2–S4 brzmią jak poradnik mediów (cytaty niżej); (f) cukierkowy realizm domowy (kotka, uszka, krzesło na przystanku, frytkownica, pierniczki) jest miły, ale w liczbie ~40 wiadomości zaczyna wyglądać jak „dorosły pisze o zwykłym życiu młodych”.

| # | Plik / rozdział:krok | Dziś | Dlaczego cringe | Propozycja (styl 2026) |
|---|---|---|---|---|
| 1 | `prolog:17` (opcja gracza) | „Ktoś nagrał jej relację i puścił dalej. To nie jest dla nas.” | Moralizuje, tłumaczy „zasady netykiety” w pierwszej minucie. | „to jej relacja „dla bliskich”. ktoś nagrał ją ekranem. nie puszczam dalej.” |
| 2 | `prolog:257` Ola | „Jutro mam na szóstą 🙃 Jeszcze chwilę jestem. %name%, zerkniesz? My już te ekrany znamy na pamięć.” | 🙃 + „jeszcze chwilę jestem” (kalka z Messengera dorosłych); głos Oli ma być rzeczowy, nie „emotikonowy”. | „Jutro mam na szóstą, więc zaraz padnę. %name%, zerkniesz? My już znamy te ekrany na pamięć.” |
| 3 | `c1:6` (opcja) | „Dwa razy w pralce to już jest hobby.” | Żart z internetu 2015 („to już jest hobby”). | „dwa razy w pralce? to już nie wypadek, to lifestyle.” |
| 4 | `m2:8` (opcja) i `m0:31` | „Kotka-archiwistka. Należy jej się etat.” / „Pani Ziuta ma większy porządek w papierach niż gmina.” | Dowcip dorosłego o zwierzęciu; „etat”, „gmina”, „pani Ziuta”. | „ziuta rządzi tym archiwum. daj jej odznakę” / „ziuta: 1, gmina: 0.” |
| 5 | `k1:5` (opcja) | „Najlepsza inwestycja w gminie od lat.” | „Inwestycja w gminie” to język urzędu. | „krzesło mvp. gmina nie ma pojęcia, co ma.” |
| 6 | `m2:23` Marta (24) | „Słyszy {Pan\|Pani}? „Moja wina” to jej słowa, które on przytacza. W publikacji brzmi, jakby mówił o sobie.” | Rówieśnik gracza (24) mówi jak urzędniczka; w grze „Pan/Pani” dostają Weronika, Henryk, Zenon — Marta nie powinna. | „Słyszysz? „Moja wina” to jej słowa, on je tylko cytuje. W publikacji wyszło, jakby mówił o sobie.” (cała postać na „ty”, formy z rodzajem zostają dla starszych) |
| 7 | `m2:82` (opcja) | „Dobrze, że to mówisz. Napisz to w korekcie wprost.” | Język HR/redakcji. | „spoko, że to mówisz. w korekcie napisz wprost, że to twoja wpadka, nie stażystki.” |
| 8 | `c4:17` Ola (post) | „W 2018 na festynie zrobiłam komuś krzywdę. Miałam 14 lat. Przeprosiłam i spłaciliśmy koszty leczenia. Jeśli ktoś to zobaczy na Klipo, wolę, żebyście najpierw usłyszeli to ode mnie…” | Brzmi jak oświadczenie prawnika; 22-latka, która pisze post w panice, nie pisze „spłaciliśmy koszty leczenia”. | „w 2018 na festynie pobiłam się z dziewczyną i złamałam jej nos (`c2:4`). miałam 14 lat. przeprosiłam, pokryliśmy leczenie. wolę, żebyście usłyszeli to ode mnie, a nie z klipu.” |
| 9 | `epilog:150` Maja | „ja też. pierwszy raz w życiu cieszę się że pomyliłam numer 🫶” | Kartka okolicznościowa; Maja ma być „ironiczna, uparta”. | „pierwszy raz w życiu cieszy mnie, że pomyliłam numer. nie mów nikomu.” |
| 10 | `epilog:53` Kuba | „pani weronika dała mi dyżury w bibliotece. ogarniam komputery w czytelni. ktoś musi 💀” | Trzeci „💀” z rzędu i „ogarniam” (język 2012). | „jestem teraz it-guyem biblioteki. awans roku.” |

Dodatkowe, mniej oczywiste: `ch1:230` i `prolog:120` („jak debil” ×2 — młodsi powiedzą „jak idiota” lub „jak psychol”); `m0:34` Maja „xD”; „kurde” rozdaje się wszystkim (np. Kuba `prolog:128`); Szklarz („technicznie rzecz biorąc”, `ch4:33`) — to tik postaci, ale jest zbyt czytelnym tropem.

Co **działa** i trzeba zostawić: Zuza o frytkownicy i „nie wspieraj jej proszę 😭” (`m3:5–14`), „xd babcia się śmieje” (nie w nadmiarze), „mglisko unsolved part 2”, Kuba „nimbusa odświeżam”, Bartek bez polskich znaków.

---

## 4. Treść 14+

Ogólnie gra mieści się w 14+ (przemoc tylko sugerowana, bez epatowania). Miejsca do kontroli:

| Motyw | Gdzie | Ocena dla 14-latka | Zalecenie |
|---|---|---|---|
| Przekleństwa „kurwa” | `ch3:453`, `ch3:574`, `mp:97` (Kuba) | Za mocne dla oznaczenia „bez wulgaryzmów”, w 3 miejscach. | Zamienić na „cholera” / „no nie” / „ja pierdykam”. „Spieprzyłem/-ł” (Bartek `ch2:63`, Igor `epilog:108`) i „debil” zostawić. |
| Samobójstwo jako wersja policji | `prolog:168`, `ch1`, `ch3:258` („skoczyła z tamy”) | Motyw obecny jako **fałszywa wersja**, bez metody i bez romantyzowania. | Zostawić; dodać notkę o treści i numer pomocowy (116 111) w menu „O grze” zamiast w fabule. |
| Śmierć dziecka (Tomek, 9 lat) i ukrycie ciała | kadr 21–23, `ch4:166–173` (relacja Bartka), epilog („szczątki”) | Mocny, ale bez opisów; emocjonalnie najcięższy wątek gry. | Dobrze, że nie ma obrazu zwłok; zostawić. |
| Głos zmarłego dziecka dzwoniący do siostry | g2 (`g2:3–6`, `240`) „Wera, to ja. Jest mi zimno” | Najbardziej niepokojąca linia; dla 14–15 lat może być zbyt silna (manipulowanie żałobą). | Dodać ostrzeżenie przed g2 i możliwość wyciszenia/napisów; nie dodawać odtwarzania audio bez ustawienia. |
| Porwanie, hipotermia, gips, „wymusić nagranie” | ch5, `mp:154–157` | Sugerowane, bez opisu przemocy. | OK. |
| Broń: „sztucer”, kanistry, podpalenie | `ch5:243–249` | Napięcie, ale bez strzału; policjant jako sprawca. | OK; nie dodawać strzału. |
| Przemoc nieletnich: pobicie i złamany nos, „dźwięk” | S4 `c2:4`, `cf` | Realistyczne, wrażliwe; bez krwi na ekranie. | OK, zostawić. |
| Stalking/doxxing | `k4:238` („ładna kurtka”), `c3:3` (adres Zenona), `k2:104` | Zwraca uwagę na prywatność; „anon obserwuje gracza” jest obsługiwane jako fikcja. | OK; dopilnować, by gra nie prosiła o prawdziwe dane. |
| Klonowanie głosu gracza | g0–g3 | Może wywołać lęk „ktoś naprawdę zna mój głos”. | Ustawienie „łagodniejsze straszaki” (bez smiechu/voice) dla młodszych. |
| Alkohol (1997, „pili”) | `ch4:166` | Nastolatkowie piją piwo; nieeksponowane. | OK. |
| Numer alarmowy | `phone.js:112–118` | Prawdziwy `112` zablokowany komunikatem „To tylko gra”. | **Zostawić** — dobre zabezpieczenie dla 14+. |

---

## 5. Pięć największych ulepszeń atrakcyjności

| # | Ulepszenie | Co dokładnie (plik/krok) | Priorytet | Koszt |
|---|---|---|---|---|
| 1 | **Zimne otwarcie + skrócenie wstępów** | Rozdziały zaczynające się od życia codziennego (`m0` kroki 4–41, `k1`, `k3` uszka ~20 wiadomości, `c0`, `c2`, `g0`, `g2`, `g3`, `g6`) przesunąć o jedną „dziwną” rzecz na początek (powiadomienie, klip, zdjęcie). Cel: pierwszy cel/dowód w ≤8 wiadomościach (dziś `g6`: 73, `g2`: 38, `c2`: 25). | **P0** | **Mały–średni** (mały, jeśli skracamy teksty `wording`; średni, jeśli usuwamy kroki — wtedy migracja + `tests/story.test.cjs`) |
| 2 | **Cliffhanger-protokół: ostatnia wiadomość = nowa informacja** | Dokładnie: `ch4` koniec (zastąpić „ok. to do wieczora”), `c4` koniec („Katalog zostawiam otwarty”), `g6` (zamiast melancholii „nie wiem, czy to dobrze” — jedna zapowiedź), `epilog` (hak S2 na początek), każdy rozdział kończy się jednym zdaniem „co dalej” przypiętym w Notatkach „Co teraz?”. Powiadomienie lokalne (id 7001) pokazuje tylko „Kolejna część gotowa” — nie udaje wiadomości od człowieka (`SEZONY-I-AKTUALIZACJE.md`). | **P0** | **Mały** |
| 3 | **Klipo jako aplikacja-feed (nie tylko skórka czatu)** | Dziś Klipo to skórka w `messages.js:46` i `v_*.mp4` w czatach. Dodać `js/apps/klipo.js`: przewijany feed z istniejących klipów (`v_most40`, `v_most42`, `v_festyn`, `v_festyn96`, `v_anonim`, `v_sanki`), komentarze jako źródło dowodów („ON SIE PRZYZNAL — 100 tys.”), pętla „znajdź w komentarzu”. | **P1** | **Duży** (aplikacja + dane, bez migracji, jeśli stan z `G.seen`) |
| 4 | **Nagrody za rozwiązanie: karta-dowód do udostępnienia + odznaki + tapety** | Po każdym „show”/Pytaniu: karta 9:16 „Odblokowano: Kadr 21” (bez spoilera treści) z przyciskiem Udostępnij (Capacitor Share); za S1–S5 odblokowywane tapety (`wallpapers.js`) i okładki Klipo. Odznaki nie mogą być „seriami” (zasada „bez kar za nieobecność”). | **P1** | **Średni** |
| 5 | **Widoczne konsekwencje wyborów** | Dziś usunięto powiadomienia „X to zapamięta” (`OPRAWA-I-DIALOGI.md`). Zastąpić **podsumowaniem na końcu rozdziału** („Ola ci ufa +1, Bartek wyszedł z grupy, Gajda nie wie o notatce”) i jednym wyborem z wysoką stawką na sezon (S1 ch5 „Weronika wraca do huty”, S2 „wyprzedź tygodnik”, S5 Marta/groźba). | **P1** | **Średni** (dane `trust`/`vars` już są; UI + 6 podsumowań) |

Dodatkowo (P2): ustawić pierwszą 14–17-letnią postać w S1 (młodsi gracze nie mają w S1 rówieśnika; Zuza wchodzi do rozmów dopiero od ch2) jako punkt identyfikacji dla młodszych graczy.

---

## 6. Wnioski (10 najważniejszych)

1. **Najsilniejsze wątki to klony głosu S5, telefon Mai 03:05 (ch3) i klisza→Tomek→Weronika** — w nich zagadka, strach i emocje są w równowadze.
2. **Kuba jako autor wrzutek (k3) i sekret Oli z 2018 (S4) to najlepsze „zwroty z ludźmi”**; dobrze wykorzystują wcześniejsze zagadki (pytania bezpieczeństwa).
3. **Najsłabszy jest S2 m4–m5 (Strona 41, OIP, dylemat publikacji)** — 1 straszak na ~600 wiadomości, dokumenty bez stawki osobistej.
4. **Sprawca Gajda jest znany od ch1** (`ch1:159`, notatka „Zwłaszcza R.G.”); brakuje fałszywego tropu, którego Duskwood-owy gracz oczekuje.
5. **Największy spadek napięcia w S1: `ch2` kroki ~30–340** (260 kroków bez straszaka przed wyprawą) oraz `ch3` kroki 55–113 (Bartek trzy razy „nie dziś”).
6. **Kaseta 03:51 to słaby wątek (3/10) i ma błąd w warstwie obrazu:** `v_licznik.mp4` pokazuje szpulowy magnetofon z licznikiem ok. „05:3x”, nie mini-DV i nie 03:51. Rekomendacja: wariant K-A (znacznik Marty) albo degradacja do jednego zdania; kłopot kanoniczny — brak sesji zgrywania (Marta nie chce zgrywać), „lodówka” w `ev_m_cut`.
7. **Mur/tunel obchodzi gracza (8/10) jako temat, ale trzy obrazy muru to trzy różne ściany** (`m_lehr` czerwona cegła, `s_wall` szare pustaki, `k_wall` czerwona łata); w Ciszy „pożar zniszczył mur” jest fizycznie nieprawdopodobny dla ceglanego tunelu −1. Rekomendacja: M-A (plan, woda, ogień), bez nowych obrazów.
8. **Cringe to głównie ton wsteczny, nie slang:** „xD/xd” 14×, 💀 tylko u Kuby (7×), „kurde” u 6 osób, Marta (24) mówi „Pan/Pani” 19 razy, opcje gracza brzmią jak poradnik mediów (`prolog:17`, `m2:82`, `c2:8`).
9. **14+:** największe ryzyko to 3× „kurwa” (`ch3:453/574`, `mp:97`) i głos „Tomka” w g2 (żałoba); samobójstwo jest tylko fałszywą wersją policji; blokada prawdziwego numeru 112 (`phone.js:112–118`) to zaleta.
10. **Retencję da się podnieść niskim kosztem:** zimne otwarcia rozdziałów (P0, mały–średni), cliffhangery (P0, mały), a następnie Klipo-feed (P1, duży), karty-dowody (P1, średni) i widoczne konsekwencje wyborów (P1, średni).

---

## Aneks: dane pomocnicze

- Straszaki wg `spojnosc-inwentarz.json`: 25 (8 `call`, 7 `glitch`, 7 `photo`, 2 `breath`, 1 `face`); S1: 5, S2: 1, S3: 6, S4: 6, S5: 7.
- Wiadomości do pierwszego celu/dowodu/media (przybliżenie): prolog 2, ch1 4, ch2 8, ch3 2, ch4 3, ch5 7, epilog 19, mp 16, m0 11, m1 12, m2 3, m3 1, m4 6, m5 24, k0 6, k1 1, k2 14, k3 6, k4 8, c0 4, c1 5, c2 25, cf 10, c3 18, c4 1, g0 14, g1 19, g2 38, g3 13, g4 26, g5 1, g6 73.
- Skutki czasu: rozdziały mają 60–260 wiadomości (ch3 jest najdłuższy, 257); przy tempie dokumentacji (15–30 min/sesję) S1 to ~2 h.
- Nie sprawdzano: jakości wykonania animacji i audio, rzeczywistego czasu sesji, testów przeglądarkowych.


**Uwaga o cytatach:** `rozdział:krok` to id kroku z indeksu `spojnosc-transkrypt-danych.md`; zapisy typu `plik.js:NN` to linie pliku. Liczby `Pan/Pani`, `xD`, `💀` i „kurwa” policzono z indeksu. Odczyt licznika z `v_licznik.mp4` pochodzi z klatek 360×636 (niska rozdzielczość). Codex wciąż wdrażał decyzje 1–8, więc po jego zmianach numery kroków mogą się przesunąć.
