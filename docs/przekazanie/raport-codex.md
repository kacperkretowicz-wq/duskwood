# Raport spójności „Quiet Is Safer / Mglisko” — 25.10.2026

Poprawki są w `/workspace/duskwood`. Są dwa commity zmian gry i osobny commit dokumentacji, z kolejnymi wersjami SW v156–v158. Nie wykonano pushu ani scalenia. Klipy, audio i ekran telefonu po odblokowaniu pozostają bez zmian.

**Ograniczenie Git:** `/workspace/duskwood/.git` jest zamontowane tylko do odczytu; zwykły zapis indeksu kończy się błędem `index.lock: Read-only file system`. Istniejąca lokalna gałąź `codex/spojnosc` wskazuje bazę `82a2c54`, tę samą co `integracja/dopracowanie`. Nie można było przesunąć jej HEAD w głównym `.git`. Commity znajdują się na `codex/spojnosc` w pomocniczym repo `/workspace/zadania/spojnosc.git`, z katalogiem roboczym `/workspace/duskwood`. Do przekazania służą `spojnosc-patche/` i `codex-spojnosc.bundle`; bundle wymaga obecności bazy `82a2c54`. Nie nakładać patchy ponownie na ten sam, już poprawiony katalog roboczy. Zastosować je przez `git am` w czystym checkoutcie bazy, gdy zapis do właściwego `.git` będzie możliwy.

## Zakres i źródła

Baza audytu: wyłącznie `integracja/dopracowanie` (`82a2c5427db7dc0191dbe862cf2c489926dba4c1`). W repo nie ma `src/`; kod gry jest w `js/`. Uwzględniono dokumentację gry, KONTEKST z katalogu zadania, wcześniejsze analizy z `materialy/` i `/workspace/duskwood-audit`, siatki zdjęć i wybrane kadry w pełnym rozmiarze. Biblię PR #8 pobrano z commita `b474d1d6a604602d7ce8f017cc11cb2846d1b5d2`; nie scalono jej do kodu ani nie uznano wszystkich zawartych w niej przypuszczeń za kanon.

Indeks rzeczywistych danych po zmianach: **33 rozdziały, 8477 skompilowanych kroków, 3066 wiadomości wszystkich gałęzi, 25 kroków straszaków**. Uwzględniono wybory, warunki, skoki i warianty zakończeń, a przy poprawkach także dowody, karty postaci, metadane i strony w Internet. To przegląd statyczny danych; nie przeprowadzono nowego pełnego przejścia w przeglądarce ani odsłuchu każdego nagrania.

Załączniki: [indeks wiadomości, wyborów i warunków](spojnosc-transkrypt-danych.md), [kalendarz rozdziałów](spojnosc-kalendarz.md), [inwentarz zegarów i straszaków](spojnosc-inwentarz.json). Kolejność w indeksie jest kolejnością kompilacji wszystkich gałęzi. Nie należy interpretować przejścia z późnego zegara jednej gałęzi do wcześniejszego zegara alternatywnego finału jako cofania czasu w rozgrywce.

`USTALENIA_KOORDYNACJI.md`, `HANDOFF_GROK_BOT.md`, `PLAN_SKROCONY.md`, `koncepcja-gry.md` oraz duża część `/workspace/plan` dotyczą Ember Isles / „Mój Ogródek”, nie Mgliska. Nie przenoszono stamtąd decyzji o Unity, modelach, delegowaniu ani scalaniu.

## Problemy poprawione

P1 oznacza sprzeczność wpływającą na rozumowanie lub zakończenie; P2 — ciągłość, język lub sposób prezentacji.

| Priorytet | Miejsce | Problem i wynik |
|---|---|---|
| P1 | S1, `maja.js`, trasa 14.10 | „Przejazd samochodem” trwał do 22:58, mimo głosówki 22:52, relacji 22:56 i CAM-01 22:57. Trasa obejmuje teraz przejazd **i dojście pieszo**. Nie wymyślono dokładnej godziny parkowania. |
| P1 | S1, SMS-y Mai z Kubą | Kuba chciał pożyczyć auto, choć nie ma prawa jazdy. Prosi teraz o podwiezienie z Igorem; żart odnosi się do poprzedniej wspólnej jazdy. |
| P1 | S1, `world.js`, `notes.js` | Dwa zapisy podejrzeń Mai wystarczały do ogłoszenia Gajdy porywaczem. Wniosek wymaga trzech różnych ogniw: właściciel auta, dostęp do Ewy, ślad z huty lub relacja Marka. Wynik nazywa go podejrzanym przed ratunkiem. Prawdziwy formularz ma test regresji, także dla dwóch zdjęć tego samego paśnika. |
| P1 | S1, `film.js`, oś 1997 | Fotografie analogowe dostawały wymyślone godziny w EXIF przed ustaleniem ich daty. Metadane pochodnych wskazują fotografię/skan negatywu; godziny 1997 na osi są ukryte i opisane jako nieznane. Zachowano kolejność rekonstrukcji. |
| P1 | S3→S4, anonim Idy | Dokładne „1412” ujawniało prywatny log bez drogi dostępu. Usunięto magiczną precyzję oraz wyjaśnienie przez podglądanie PDF-a. Ida zapowiada kasety, których Rybicki nie widział; Kuba później odnosi się do kaset. |
| P1 | S4, strona Klipo | Czwarty wpis zależał od nieustawianej flagi `c_day4`. Pojawia się teraz od 21.01.2027, 21:00; test sprawdza granicę czasu. Zapowiedź Oli wskazuje piątek, a nie niezgodne „jutro”. |
| P1 | S4, `przewiniecie` | Wybranie zamiaru publikacji Oli bywało traktowane jak publikacja. Zakończenie sprawdza `c_olaPosted`, a nie `c_olaFirst`. Szkic może pozostać szkicem. |
| P1 | S5, finał Marty | Nagrana groźba po wcześniejszym wysłaniu plików dawała `echo`, choć identyczna groźba bez wysłania dawała `haslo`. Przyznanie **lub groźba**, włączone nagrywanie i przekazanie rozmowy działają niezależnie od wcześniejszych plików. Test obejmuje obie wypowiedzi, brak nagrania, nieprzekazanie i kasowanie. |
| P1 | S5, `cisza2` | Skasowanie plików przez gracza i znajomych usuwało fabularnie także materiały już u policji. Opis ogranicza usunięcie do ich kopii. Nie przesądzono skasowania wszystkich cudzych archiwów. |
| P2 | S1, dowody i Ludzie | „Noc po zniknięciu” zastąpiona właściwą nocą 14/15.10; „jedyny klucz” nie wyklucza dostępu koła i nadleśnictwa. CAM-01 22:57 nie jest ostatnim znanym zdjęciem. Podejrzenie przymusu przy SMS-ie nie udaje ustalonej tożsamości autora. |
| P2 | S1, synchronizacja | Tekst rozróżnia połączenie urządzenia 03:05 i zakończenie kopii 03:07. Patrz niżej: samo odblokowanie danych nadal wymaga dokładniejszego związania z zegarem. |
| P2 | S1, Ola i epilog | Ola nie odpowiada już drugi raz „po raz pierwszy” na przeprosiny Mai. Opowiada o późniejszej odpowiedzi Mai i zwykłym planie kolacji. Nagłówek „Tomek nie utonął” zastąpiono odnalezieniem w hucie: kanał był zalany, więc przyczyny śmierci nie wolno przesądzać. Powiadomienia obsługują `wording`. |
| P2 | S1, plastikowy przedmiot | Karta nie twierdzi już, że Maja go nie zauważyła, skoro wspomina o nim w głosówce. Nie rozpoznała go. |
| P2 | S2–S3, dom Wronów | Usunięto sugestie wspólnego bloku/klatki przy opisie Szklarskiej 4. |
| P2 | S2, spotkanie z Zuzą | Przesyłanie w pobliżu poprzedza umówienie na most o 16:20 następnego dnia; sam interfejs wskazuje spotkanie z Zuzą. |
| P2 | S3, telefon Rybickiego | Karta nie utrzymuje, że jest rozładowany nieprzerwanie od pogrzebu, mimo późniejszego ładowania. |
| P2 | S3, lampa czytelni | Awarię czujnika potwierdza konserwator i następuje wymiana. Wyjaśnienie trafia do wspólnej części przebiegu, bez uzależnienia od obejrzenia klipu. Plik klipu bez zmian. |
| P2 | S4→S5, mieszkanie gracza | W styczniu ustalono dłuższy wynajem kawalerki; marcowa bliskość domu Wronów ma teraz ciągłość. Usunięto powtórne „pierwsze” załatwianie kluczy. |
| P2 | S4, wiedza i czas wypowiedzi | Mama Oli nie dowiaduje się ponownie tego samego; Ola dziękuje za wsparcie. „Wpis z rana” nie opisuje publikacji z popołudnia. |
| P2 | S5, nocny telefon Mai | SMS wyjaśnia jej prawdziwe oddzwonienie po fałszywym telefonie; oddech nie oznacza kolejnego niewytłumaczonego klona głosu. |
| P2 | S5, telefon Marty | Marta nie mówi „nie odebrał/a”, gdy gracz właśnie odebrał. Przeprasza za nocny telefon niezależnie od wariantu. |
| P2 | S5, przystanek | Ustanowiono obecność gracza na przystanku. Obejrzany JPG pokazuje fotografowanie z bliska zza pleców, nie z drugiej strony ulicy: poprawione wiadomości i karta dowodu. |
| P2 | S5, rachunek Oskara | 11 telefonów łącznie, jeden za 300, pozostałe po 50: **800 zł**, nie 850. Wcześniejszy handoff błędnie liczył 11 zwykłych plus telefon Idy. |
| P2 | Dokumentacja | Biblia: zaginięcie 14/15.10, Tellio A54, Szklarska 4, Iskra i Sevra zamiast dawnych marek. Plan S4: pięć wdrożonych dni, siedem etapów. Plan S5: 14–20.03.2027. Zaznaczono nierozwiązany aparat, zamiast uznawać belkę za samowyzwalacz. |

Redakcja zachowuje style postaci, pełne zdania Oli i Weroniki oraz krótsze SMS-y młodych. Nie dodawano slangu do każdej wypowiedzi. Najważniejsze zmiany językowe usuwają powtórne przedstawianie tej samej informacji, przesadną pewność i wypowiedzi wymagające wiedzy spoza sceny. Nie zmieniano tekstów mówionych, które wymagałyby nowych plików nagrań.

## Straszenie: poprawki i pozostałe ograniczenia

| Scena | Ocena i działanie |
|---|---|
| S1 `s1_cam58` | Kamera łapie Kubę i Igora, a gra robiła agresywny zoom ze stingerem. Zmienione `face` → `photo`, 2,2 s. To potwierdzenie działającej kamery, nie atak potwora. |
| S4 `s4_festyn` | Archiwalne ujawnienie Oli miało ten sam chwyt co nagłe zagrożenie. Teraz `photo`, 2,4 s, bez zoomu i stingera `face`. |
| S5 `s5_wera` | Zwykłe zdjęcie dziecka nie powinno być „straszną twarzą”. Teraz `photo`, 2,4 s; groza wynika z wykorzystania głosu przeciw siostrze. |
| S1 G1 `s1_maja_numer` | Dobre powiązanie z powrotem telefonu do sieci i sprawcą. Okno dzwonienia 5 s, odsłuch po odebraniu 2,6 s. Pozostaje niespójność: odpowiedź gracza wspomina przesuwanie po stole, a wspólny efekt daje oddech. Potrzebny osobny efekt lub korekta obu stron sceny razem z audio. |
| S1 G2 `s1_odsluch` | Stary zarzut o samym rozwijaniu transkrypcji jest nieaktualny: jest audio i blokada straszaka do odsłuchu (`VoiceLib.allowScare`, `Voices.scareAt`). Pełnoekranowy glitch nadal wizualnie sugeruje awarię całego telefonu; lepiej ograniczyć go do odtwarzacza. Nie jest dowodem hakowania systemu. |
| S1 `s1_hand` | Ma przyczynę i skutek: zasłonięcie kamery, utrata sygnału. Zachowano. Docelowy sposób pokazania należy rozstrzygnąć podczas odłożonej pracy nad mediami. |
| S2–S5, osiem kroków `call` | Głuche telefony wracają zbyt podobnie; część dostaje po chwili przeprosiny. Szczególnie `s3_domowy` (8 s okna + 4,2 s po odebraniu), `s3_kuba` (7 + 3,8) i `s4_cisza` (6 + 3,5) powtarzają rytm. To parametry kodu, nie pomiar rzeczywistego czasu sceny. Nie skracano ich w ciemno bez odsłuchu i testu na urządzeniu. |
| S3 oddech i S5 pisk | Źródła są ludzkie/mechaniczne: Lena i autobus, kasety i magnetowid. Efekt powinien wynikać z odtwarzanego materiału. Nie dodawać niezależnej obecności w pokoju gracza. |

Po zmianach pozostaje 25 kroków straszaków: 8 `call`, 7 `glitch`, 7 `photo`, 2 `breath`, 1 `face`. Nie dokładano kolejnych. „Za wcześnie” dotyczyło przede wszystkim straszenia przed rozpoznaniem znaczenia zwykłego zdjęcia; nie ma podstaw do podania uniwersalnej minuty pierwszego straszaka bez nowego playtestu.

## Wymagające decyzji właściciela

1. **P1 — aparat Darka i czterej chłopcy.** `p_08d` i `p_21d` pokazują wszystkich starszych chłopców, choć Darek robi zdjęcia jednorazówką. Na `p_21d` dodatkowo widać metalowy drążek w ręce chłopca po lewej, co wzmacnia wrażenie ustawionej generacji. Belka nie wyjaśnia naciśnięcia migawki. Zalecam zachować jednorazówkę i przygotować zdjęcia z trzema starszymi chłopcami; nie dopisywać piątego uczestnika. Zmianę obrazu i powiązanych kwestii mówionych trzeba wykonać razem.
2. **P1 — Cisza a zgłoszenie obu miejsc.** `gazeta2026` i epilog Ciszy opisują spalenie tunelu również po `reportBoth`. Potrzebna decyzja, czy służby ocaliły mur, a jeśli tak, kiedy odnaleziono Tomka. Późniejszy ratunek Mai w Rzeczce nie może sam rozstrzygać losu szczątków. Nie zmieniłem arbitralnie zakończenia i informacji w kolejnych sezonach.
3. **P1 — kaseta S2 zatrzymująca się na 03:51.** `most3.js`, `xLicznik`: rzekomo sama staje dokładnie na końcu opublikowanego fragmentu; brak technicznego rozstrzygnięcia. Może to być awaria, ustawienie odtwarzania albo niewiarygodna relacja Marty, ale gra musi dać podstawę do wybranego wyjaśnienia. Naprawiać razem z odłożonym klipem, bez nowego zjawiska nadprzyrodzonego.
4. **P1 — rekonstrukcja dwóch aut.** Między 23:58 a 01:20 Gajda musi wywieźć Maję jej autem, odstawić je na tamie i wrócić po sevrę. Dokumentacja proponuje trasę, ale nie dowodzi czasu przejścia na fikcyjnej mapie. Ustalić ją przed kolejną rekonstrukcją obrazową; nie dopisywać wspólnika ani nieprecyzyjnych dowodów z dokładną minutą.
5. **P2 — synchronizacja 03:05–03:07.** Tekst rozróżnia początek i koniec, lecz `sync('maja:sync1')` nadal uruchamia dostęp do paczki w sekwencji po zegarze 03:05. Jeśli 03:07 ma być ścisłym czasem dostępności, potrzebny osobny krok zegara z migracją zapisu. Nie przesuwano indeksów tylko dla pozornej kosmetyki.
6. **P2 — pobliskie urządzenie w S5 przy zdjęciu serwisu.** Gracz o 18:30 jest kierowany do domu, a o 22:17 dostaje lokalny transfer `g_serwis`. Zdjęcie mogło powstać wcześniej i zostać dostarczone później, ale droga nadawcy pod dom nie jest ustanowiona. Ustalić sprawcę/sytuację albo użyć zwykłego komunikatora. Nie nazywać tego zdalnym przesyłaniem w pobliżu.
7. **P2 — konstrukcja kolejnych sezonów.** Igor, Kuba, Ida i Marta kolejno okazują się manipulatorami materiałów. Częste formuły „to nie dowód”, „nie wiem”, „masz rację” i kolejne wyjaśnienia po ujawnieniu winnego osłabiają odrębność głosów. Następna większa redakcja powinna zmienić sposób ujawnienia przynajmniej jednego sprawcy, zamiast dopisywać slang i następny anonimowy telefon. To zmiana konstrukcji oraz audio, nie bezpieczna zamiana kilku SMS-ów.

## Zdjęcia: ocena obecnych plików

To ocena zgodności kadru z rolą i wrażenia sztuczności, nie detektor pochodzenia obrazu. Siatki służą do przeglądu; wybrane istotne kadry sprawdzono osobno. Nie wymieniano plików obrazowych ani klipów.

| Priorytet | Plik / grupa | Wniosek |
|---|---|---|
| P1 | `assets/film/p_08d.jpg`, `p_21d.jpg` | Problem autorstwa opisany wyżej. Symetrycznie ustawieni chłopcy i wyraźne twarze wyglądają jak inscenizacja. Nie dodawać samowyzwalacza samym podpisem. |
| P1 | `assets/film/p_22d.jpg`, `p_23d.jpg` | Kluczowe ślady w kanale muszą być widoczne i przestrzennie zgodne z opisem. Miniatura nie daje podstaw do odczytania wszystkich szczegółów, które dialog traktuje jako pewne. Przy wymianie sprawdzić żółty materiał, kanał, rękę Gajdy i miejsce aparatu razem. |
| P1 | `assets/maja/m_darkroom.jpg` | Scena czerwonej ciemni z kuwetami i szczypcami wygląda jak wywoływanie odbitek, a służy jako ślad procesu wywołania filmu z jednorazówki. Zweryfikować procedurę i rodzaj materiału przed nowym zdjęciem. Nie zatwierdzać wyłącznie za „klimat analogowy”. |
| P1 | `assets/maja/m_bricks.jpg` | Trzymana w ręce cegła nie pokazuje dobrze relacji nowszej spoiny do starego muru. Jeśli dowodem ma być wiek/układ zamurowania, potrzebny kadr muru w miejscu, z dopasowanym hotspotem. |
| P2 | `assets/web/sz_window.jpg` | Nadal plakat: centralna sylwetka, cyjanowy napis i poblask. Do wymiany na zwykły amatorski kadr z jedną dostrzegalną nienormalnością i sprawdzalnym śladem Igora. |
| P2 | `assets/maja/m_window.jpg` | Auto pod latarnią jest wiarygodnym śladem obserwacji, ale obraz nie wystarcza do pewnego rozpoznania osoby w środku. Nie wyostrzać go fabularnie samym tekstem. |
| P2 | `assets/maja/m_mirror.jpg` | Aparat przy twarzy wymaga zgodnej sytuacji autora i urządzenia; sprawdzić opis i geometrię odbicia. Nie traktować go jako dowolnego selfie wykonanego telefonem. |
| P2 | `assets/kronika/c_slady.jpg`, `c_blok_noc.jpg` | Klatka ma dobre zwykłe otoczenie, lecz ślady są równe i symetryczne. Sylwetka w pojedynczym oknie daje nastrój, nie samodzielną wykrywalną anomalię. |
| P2 | `assets/kopia/k_peron.jpg`, `assets/glos/g_przystanek.jpg` | Fotografie gracza muszą pasować do wybranej tożsamości. Sylwetka od tyłu zmniejsza problem, ale nie gwarantuje zgodności obu wariantów płci. Przystanek: poprawiono tekst perspektywy; nie zmieniono zdjęcia. |
| P2 | `assets/glos/g_tomek_album.jpg` | Czytelny album, czapka i kamera dają źródło przyszłego głosu; fotografia wygląda bardzo starannie i portretowo. Nie robić z niej nagłego ataku twarzą — poprawione. |
| P2 | `assets/glos/g_serwis_noc.jpg` | Widok zza mokrej szyby ma logicznego fotografa i jeden cel: ktoś obserwuje Igora. Główny problem leży w dostarczeniu, nie w potrzebie dodania potwora. |

Zestaw akceptowanych portretów z `REALIZM-2026.md` nie zatwierdza automatycznie całych galerii tych postaci. Testowe `f1`, `f3`, `f4` z `/workspace/look-bible/gen` nie zostały dodane do gry. Szczególnie drzwi „17” wymagają nowego uzasadnienia przestrzennego i nie zastępują kanonicznej szafki ani zamurowania. Nie wdrożono propozycji przeciętego paska czołówki, nowej naszywki, dodatkowych plików synchronizacji ani nowych modeli telefonów.

Warstwa filmów jest odłożona zgodnie z poleceniem. Nie wykonano montażu, podmiany, konwersji ani regeneracji MP4. Dawne twierdzenia o 15 niemych klipach i braku nagrań nie mogą być automatycznie przeniesione na integrację po #7; obecny kod ma warstwę głosu i testy jej zgodności. Ocena jakości aktorskiej i montażowej wymaga osobnego odsłuchu.

## Co z wcześniejszych analiz nie wymagało kolejnego wdrożenia

- Ada jest już Wolską; nie zmieniano ponownie nazwiska.
- Ola ma 14 lat w 2018, S4 i S5 są w 2027, finał S5 przypada w sobotę 20.03. Nie cofano kalendarza do dawnych planów.
- Tellio A54 w S1 i Aster 13 po ratunku nie muszą być sprzeczne: epilog ustanawia nowy telefon i numer, a stare urządzenie pozostaje dowodem.
- `K.` to Krystyna; nie przyjęto sugestii, że to nadal niezidentyfikowana osoba.
- Ewa Wrona, Ewa Rybicka i sztolnia Ewa to celowo różne byty; nie przemianowywano ich dla uproszczenia.
- 38 lat Tomka w marcu 2027 mieści się w wieku wynikającym z 8 lat w sierpniu 1996 i 9 lat w lipcu 1997. Brak dokładnych urodzin nie upoważnia do „poprawki” na 40.
- Wiele pierwotnych poprawek dialogów i audio było już w integracji. Zweryfikowano je zamiast dublować stare PR-y. Nie zmieniano odblokowanego ekranu głównego.

## Testy i przekazanie

Wymagane `node --test tests/*.test.cjs` uruchomiono przed i po zmianach. Końcowo: **18/21 plików testowych przechodzi; 3 kończą się błędami środowiska**. Przed zmianami te same trzy pliki były czerwone (17/20, bez nowego `canon.test.cjs`). To liczba plików raportowana przez ten runner, nie liczba wszystkich wewnętrznych asercji.

- `tests/canon.test.cjs`: **3/3 PASS** — rzeczywisty formularz wniosku, rzeczywista funkcja wyboru finału S5, rzeczywista strona i zakończenie S4.
- `tests/voices.test.cjs`: **5/5 PASS** — istniejące teksty mówione zachowują zgodność z nagraniami. Test wersji SW akceptuje numer wydania, zamiast wymuszać stare v155.
- `tests/story.test.cjs`: **9/12 PASS**; trzy generatory migracji uruchamiane przez `execFileSync` dostają `spawnSync /usr/bin/node EPERM`. Generatory v3/v4/v5 uruchomione osobno przez powłokę działają; ich wyniki porównano z `migrations.js`: **wszystkie zgodne**. Nie zastępuje to pełnego wykonania testów z podprocesem.
- `tests/mobile-build.test.cjs`: **2/3 PASS**; uruchomienie budowania w podprocesie blokowane przez `EPERM`.
- `tests/serve.test.cjs`: blokada `listen EPERM` dla `127.0.0.1`; brak możliwości pełnego playtestu przez lokalny serwer.
- `git diff --check`: **PASS**. Nie dodawano migracji indeksów ani nowych kroków historii. Node na boxie to **20.19.2**, wymaganie repo to **>=22**; pełny zestaw trzeba powtórzyć w obsługiwanym środowisku z możliwością uruchomienia podprocesów i serwera.

Logi: [pełny runner](spojnosc-testy-node.log), [fabularne](spojnosc-testy-story.log), [audio](spojnosc-testy-voices.log), [mobile](spojnosc-testy-mobile.log). Wyniki generatorów: `spojnosc-migracja-v3.txt`, `v4.txt`, `v5.txt`. Krótszy handoff pozostaje też w repo: `docs/AUDYT-SPOJNOSCI-2026-10-25.md`.

Commity pomocnicze: `ffbfba2` — S1, v156; `12401e9` — S2–S5, konsekwencje i straszaki, v157; `4ee9314` — dokumentacja i SW v158 (pełne hashe w `spojnosc-commity.txt`). Żaden nie został scalony do `feat/realizm-2026` ani wypchnięty.

Eksport zweryfikowany: `git bundle verify` PASS; sprawdzenie odwracalności zbiorczego patcha (`git apply --reverse --check`) PASS. Pomocnicze repo jest czyste. Główny HEAD nadal `82a2c54`.
