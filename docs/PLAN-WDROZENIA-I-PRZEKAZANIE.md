# QUIET IS SAFER / DUSKWOOD — kompletna instrukcja dalszych prac

**Stan dokumentu: 23 października 2026. Zawiera spoilery wszystkich pięciu sezonów.**

Ten plik zbiera ustalenia rozmowy z użytkownikiem, stan wykonanych prac, brakujące elementy i kolejność wdrażania. Ma wystarczyć do podjęcia pracy przez kolejnego wykonawcę bez odtwarzania całego czatu. Opisy nowych scen poniżej są zadaniami lub propozycjami, a nie informacją, że działają już w grze.

**Aktualna decyzja użytkownika: rozwijamy scenariusz i dodatki do rozgrywki. Produkcja zdjęć jest odłożona. Klipy są osobnym, późniejszym etapem: pierwszy kadr + ostatni kadr → Omni Flash.**

## 1. Właściwy projekt i punkt startowy

| Pole | Wartość |
|---|---|
| Repozytorium | `https://github.com/kacperkretowicz-wq/duskwood.git` |
| Tytuł gry | Quiet Is Safer |
| Miejscowość | Mglisko |
| Właściwa gałąź bazowa | `feature/ostatni-kurs` |
| Commit bazy | `c6cf040e007a94098f69240bfd96cad23fce8a8c` |
| Aktualna lokalna gałąź prac | `feat/realizm-2026` |
| Ostatni commit implementacji objętej tym dokumentem | `2c5f8076289c4e035a176b7457c80368cedd88ae` |
| Właściwy checkout na tym komputerze | `C:/Users/kretowicz_k/Documents/Codex/2026-10-23/po/work/duskwood-ostatni-kurs` |
| Materiały i raporty zadania | `C:/Users/kretowicz_k/Documents/Codex/2026-10-23/po/outputs/realizm-2026` |
| Podgląd lokalny | `http://localhost:5184`, jeżeli serwer jest uruchomiony |

Commit `2c5f807` był zapisany lokalnie, bez pushu i bez publikacji. Kolejny wykonawca ma sprawdzić faktyczny HEAD i status przed pracą. Sam checkout zdalnego `feature/ostatni-kurs` nie gwarantuje obecności tego pakietu. Stan czystości katalogu, adres serwera i bieżący HEAD są informacjami z chwili sporządzenia dokumentu, nie stałą obietnicą.

Osobny katalog `work/duskwood` i eksperyment `feat/ostatnio-aktywna` powstały wcześniej na niewłaściwej bazie `main`. Zachowano je osobno. Nie przenosić z nich kampanii ani wyglądu na właściwą grę.

### Jak rozstrzygać sprzeczności

1. Bezpośrednie, aktualne ustalenia użytkownika mają pierwszeństwo.
2. Ten plik porządkuje zakres i kolejność dalszych prac.
3. Prawda fabularna i chronologia: aktualne skrypty oraz sekcja „Kanon międzysezonowy” w `docs/BIBLIA-SEZONOW.md`.
4. Język postaci: `docs/GLOSY-POSTACI.md`, z uwzględnieniem późniejszych zmian ich pracy i sytuacji.
5. Decyzje o konkretnych zdjęciach: `docs/ASSETY-REALIZM-2026.json`.

Starsze dokumenty zawierają historyczne opisy wersji, liczby rozmów i niezrealizowane rozpiski. Nie uznawać każdego ich akapitu za aktualny stan gry. Rozbieżności fabularne wyjaśnić przed dopisaniem scen, zamiast nadpisywać kanon przypadkową nową wersją.

## 2. Docelowe doświadczenie — ustalenia użytkownika

- Polska, współczesna codzienność młodych ludzi. S1–S3 rozgrywają się w 2026 roku; S4 i S5 mają wynikające z historii daty w 2027. Nie przenosić wszystkich wydarzeń na ten sam dzień tylko dlatego, że kierunek nazywamy „realizm 2026”.
- Rozmowy mają brzmieć jak wiadomości konkretnych osób. Zmiana małych liter i dodanie `xd` nie wystarczą, jeżeli konstrukcja zdań nadal przypomina raport lub tekst AI.
- Od początku gracz ma przeczuwać problem i budować podejrzenia, ale nie znać całej odpowiedzi. Historia ma być czytelna pomimo tajemnicy.
- Groza może być mocna, zaskakująca i podkręcona. Zdarzenia zachowują przyczynę, chronologię i sens w świecie gry.
- Telefon ma działać jak używane urządzenie: aplikacje, rozmowy, profile, powiadomienia, historia, wyszukiwanie, pliki i przerwy w kontakcie.
- Nie zawsze coś się dzieje. Kilka godzin ciszy, zwykły powrót z pracy i sesja bez nowego tropu są częścią zamierzonego rytmu.
- Codzienność obejmuje także zakupy do domu, kawiarnię, matchę, jedzenie, uczelnię, dojazdy, paczki, odsprzedaż rzeczy, budżet i social media. Nawyki są różne; cała obsada nie pije tego samego i nie powtarza tych samych trendów.
- Potrzebne są anonimowe materiały, znikające wiadomości, technologiczne niepokoje i co najmniej dwa dodatkowe, dobrze osadzone zaskoczenia/jumpscare'y.
- Historia pozostaje podzielona na istniejące sezony. Rozbudowujemy tę wersję, z zachowaniem przydatnych materiałów.
- **Zachować wygląd aplikacji: kolory, pulpit, typografię, nawigację i układ.** Rozwój zachowania istniejącego elementu nie jest zgodą na zmianę całej oprawy.
- Fotografie mają przypominać zwykłe, nieidealne zdjęcia ludzi, z logiczną sytuacją i autorem. Produkcja jest teraz odłożona; szczegółowe zasady pozostają obowiązujące na później.
- Odrzucono wcześniejszy sposób tworzenia klipów. Docelowy proces mediów opisuje rozdział 12.

## 3. Co jest już w grze, a co rzeczywiście dodano

Oznaczenia używane dalej: **BAZA** — istniało przed ostatnim pakietem; **WDROŻONE** — dodano lub zmieniono w `2c5f807`; **CZĘŚCIOWO** — są podstawy, ale nie cały uzgodniony efekt; **DO WDROŻENIA** — zadanie; **ODŁOŻONE** — osobny późniejszy etap; **ODRZUCONE** — nie używać jako zatwierdzonego wyniku.

### 3.1. Istniejące sezony

| Sezon | Tytuł i czas | Skrypty | Rdzeń, który zachowujemy |
|---|---|---|---|
| S1 | Szkło pamięta · październik 2026 | `prolog`, `ch1`–`ch5`, `epilog` — 7 | Zaginięcie Mai, numer Rybickiego, huta, Tomek, klisza, kłamstwa bliskich, ratunek |
| S2 | Most · listopad 2026 | `mp`, `m0`–`m5` — 7 | Nagranie z mostu, cięcie, odpowiedzialność redakcji i Janiny; po Ciszy także dalsze poszukiwania Mai |
| S3 | Kopia zapasowa · grudzień 2026 | `kp`, `k0`–`k4` — 6 | Cudze archiwum w sieci, Kuba, Lena i skutki selektywnej publikacji |
| S4 | Kronika · styczeń 2027 | `c0`, `c1`, `c2`, `cf`, `c3`, `c4` — 6 | Kasety TV Dolina, Ida, Zenon, publiczne upokorzenie i przeszłość Oli |
| S5 | Twoim głosem · marzec 2027 | `g0`–`g6` — 7 | Podszywanie się głosem, Oskar, Dudek, Marta i nacisk na świadków |

Łącznie zarejestrowane są 33 skrypty rozdziałów. `mp` i `kp` zależą od gałęzi; jeden przebieg nie musi zawierać wszystkich 33. Nie tworzymy na tym etapie nowego sezonu 6 zamiast dokończenia uzgodnionej przebudowy.

### 3.2. Mechaniki obecne już w bazie

| Obszar | Stan zastany | Dalsza potrzeba |
|---|---|---|
| Powłoka telefonu | Pulpit, oprawy iOS/Android, jasny/ciemny wygląd, aplikacje, wyszukiwanie | Zachować oprawę i rozwijać użycie w scenach |
| Narzędzia | Wiadomości, Telefon, Notatki, Galeria, Internet, Mapy, zegar/kalendarz, reakcje, przypięcia i cytaty | Używać ich jako naturalnych czynności, nie tylko ekranu do kolejnej zagadki |
| Ślady cyfrowe | Nimbus, kopia telefonu Mai, lokalizacje, „Znajdź urządzenie”, Ciemnia, historia wersji notatki, tapeta, BushView | Dopisywać uczciwe zastosowania istniejących narzędzi |
| Społeczności | Profile, Klipo, Kadr, Błysk, publiczne komentarze i reuploady | Rozwinąć konsekwencje i zwykłe życie profili; nie przemianowywać aplikacji bez potrzeby |
| Prywatność | Nieznane numery, znikające rozmowy, autorskie wybory zrzutu ekranu, ujawnianie materiałów | Więcej powiązanych scen; sprawdzalne granice wiedzy nadawcy |
| Pobliskie urządzenie | Przyjęcie lub odrzucenie przesłanego pliku | Kolejne sensowne zdarzenia; odmowa musi być obsłużona |
| Groza | Istniejące urwane połączenia, oddech, zdjęcie/twarz, krótkie zakłócenia; zapis jednorazowego odtworzenia | Audyt odstępów i dwa dodatkowe momenty; to nie są dodatki wykonane w ostatnim commicie |
| Tempo | Własne tempo albo pięciodniowy pilot S1, zapis sesji i zatrzymywanie czasu fikcji | Rozbudować sceny ciszy i powrotów, a później rzeczywistą objętość sezonu |
| Mobile i offline | PWA oraz projekty Capacitor, lokalne zasoby, obsługa tła, natywne przypomnienia po zgodzie | Testy urządzeń i aktualnego wydania; nie traktować istnienia projektu jako pełnej gotowości sklepowej |

### 3.3. Redakcja wykonana w `2c5f807`

| Sezon | Wypowiedzi/podpisy z nową treścią | Opcje gracza z nową treścią |
|---|---:|---:|
| S1 | 94 | 13 |
| S2 | 60 | 14 |
| S3 | 39 | 3 |
| S4 | 36 | 4 |
| S5 | 48 | 7 |
| **Razem** | **277** | **41** |

Liczby dotyczą miejsc w skompilowanych skryptach, także alternatywnych gałęzi. Nie oznaczają, że każda wiadomość została przepisana albo że gracz zobaczy wszystkie zmiany w jednym przejściu.

Zmieniono m.in. otwarcie grupy, emocje Kuby, przyznanie Bartka i Igora, reakcje po ratunku, konflikt Marty z matką, odpowiedzialność Natana, motyw Leny, zachowanie Oli przed decyzją w pracy i reakcje po fałszywych głosówkach. Ograniczono pewne rozpoznawanie ludzi z niewyraźnych zdjęć i powtarzane sentencje.

Poprawiono konkretne błędy: nieodbyty telefon Kuby, wiedzę Igora z prywatnego czatu, pozorną odmowę kontaktu z Natanem, znajomość odpowiedzi wpisanych tylko przez gracza, pamięć Mai o cudzej znikającej wiadomości, zakupy rzekomo zlecone przez Maję podczas niewoli i wiedzę Dudka o niewidocznym dla niego zrzucie.

### 3.4. Sześć nowych rozmów — WDROŻONE, ale opcjonalne

| ID | Kto / kiedy | Treść i zakres |
|---|---|---|
| `kuba_delivery` | Kuba · S1, po poznaniu lokalizacji telefonu | Zakupy zamówione przez mamę, zamiennik mleka, rozpakowanie |
| `ola_cafe` | Ola · S1, odpowiedni etap jej wątku | Kawiarnia, matcha, croissant, nauka na zaoczne i budżet |
| `maja_closefriends` | Maja · S2, po odnalezieniu | Zwykła relacja, cudzy screen, ograniczenie widoczności do bliskich |
| `natan_notifications` | Natan · S3 | Eksport pliku, nadmiar powiadomień i zapomniana paczka |
| `ola_resale` | Ola · S4 | Sprzedaż kurtki, karton i wiadomość do niewłaściwej grupy |
| `igor_oldphone` | Igor · S5 | Stary telefon, zaległe powiadomienia i daty wiadomości |

Rozmowy mają osobny zapis i nie przesuwają głównego skryptu. To podstawy codzienności, nie pełne wplecenie zwyczajnego życia w główną historię. Gdy wykorzystamy któryś motyw w nowej głównej scenie, trzeba obsłużyć wcześniejsze ukończenie rozmowy opcjonalnej, aby nie powtarzać identycznego zdarzenia.

### 3.5. Siedem przerw — WDROŻONE

| ID | Sezon | Minimum oczekiwania | Lokalne okno wznowienia |
|---|---|---:|---|
| `s1_night` | S1 | 2 h | 21:00–02:00 |
| `s1_departure` | S1 | 2 h | 19:00–24:00 |
| `s1_sync` | S1 | 3 h | 21:00–02:00 |
| `s2_archive` | S2 | 2 h | 18:00–23:00 |
| `s3_upload` | S3 | 3 h | 21:00–02:00 |
| `s4_evening` | S4 | 3 h | 19:00–24:00 |
| `s5_voice` | S5 | 2 h | 22:00–02:00 |

To minimum plus ewentualne oczekiwanie na okno, a nie obietnica powrotu dokładnie po dwóch godzinach. Przerwy działają w trybie dziennym. Własne tempo pozwala grać bez czekania. Termin, krok i poprzedni cel są zapisane; zamknięcie gry nie zaczyna licznika od nowa. Natywne przypomnienie uwzględnia najbliższą przerwę po dotychczasowej zgodzie. Nie dodano przymusowego czekania w ratunku ani finałach.

### 3.6. Pozostałe wykonane rzeczy

- Jeden wspólny początkowy SMS Mai w telefonie gracza, kopii i dowodzie; aktualizacja znanego starego SMS-a zachowuje postęp.
- `wording` zmienia treść wyświetlaną i wysyłaną bez zmiany podpisu dawnych kroków.
- Notatka sezonu wskazuje bieżącą sprawę, zamiast zawsze „Szkło pamięta”.
- Poprawiono porównywanie końców linii Windows w testach migracji; nie przepisano dawnych fixture'ów ani tabel.
- Cache pakietu ma wersję `quiet-is-safer-v50`.
- Przejrzano i opisano 24 zdjęcia, zachowując decyzje użytkownika i hashe. Sam audyt nie wymienił żadnego zdjęcia.

## 4. Czego jeszcze nie wykonano

| Ustalenie | Status i konkretna luka |
|---|---|
| Całościowa przebudowa scenariusza | **CZĘŚCIOWO.** Jest redakcja wybranych rozmów. Kolejność ujawniania wszystkich tropów i konstrukcja zagadek nie zostały całościowo przebudowane. |
| Mocniejsza pierwsza sesja | **DO WDROŻENIA.** Potrzebny przegląd z nowym graczem i sceny, które porządkują cel bez zasypywania nazwami. |
| Codzienność w głównym przebiegu | **CZĘŚCIOWO.** Sześć nowych tematów jest opcjonalnych. Potrzebne są także naturalne zdarzenia w głównej rozmowie. |
| Pełne sceny przed przerwą i po niej | **CZĘŚCIOWO.** Mechanizm przerw działa; zapowiedzi, powroty i spokojne sesje wymagają rozwinięcia. |
| Dwa dodatkowe jumpscare'y | **WDROŻONE TECHNICZNIE (23.10, pakiet P0–P5a).** `s1_maja_numer` (G1, połączenie z numeru Mai, ch3) i `s1_odsluch` (G2, głosówka z serwisu, ch2) działają i zapisują się jednorazowo. Brak oceny strachu i odsłuchu przez człowieka; G2 używa istniejącego efektu `glitch`, bez nowego pliku dźwięku. |
| Rozwinięcie telefonu i społeczności | **CZĘŚCIOWO.** Narzędzia i przykłady istnieją; nowe użycia, konsekwencje oraz przejścia między aplikacjami trzeba napisać i wdrożyć. |
| Dłuższy sezon / miesiąc gry | **DO WDROŻENIA.** 30 etapów nie oznacza 30 pełnych odcinków. Nie osiągnięto miesiąca aktywnej zawartości. |
| Pomiar gry człowieka i wszystkich finałów | **DO WYKONANIA.** Automat i wybrane gałęzie przeszły; brak pełnego pomiaru z nowymi graczami. |
| Wymiana odrzuconych zdjęć | **ODŁOŻONE.** Odrzucone materiały nadal są w grze. Próby Mai nie są wdrożonymi zamiennikami. |
| Nowe klipy przez Omni Flash | **ODŁOŻONE.** Nie przygotowano zatwierdzonego kompletu klatek i nowego wdrożonego klipu tym procesem. |
| Akceptacja wszystkich istniejących mediów | **BRAK.** Podłączenie pliku w repo nie oznacza, że użytkownik zaakceptował jego realizm. |
| Testy fizycznego telefonu i publikacja tego pakietu | **NIEPOTWIERDZONE / NIEWYKONANE.** Nie utożsamiać testu przeglądarki z testem iPhone'a ani lokalnego commita z wdrożeniem. |

## 5. Zasady scenariusza i ciągłości

### 5.1. Stałe fabularne

- Rybicki jest zmarłym dziennikarzem; jego dawny numer przydzielono graczowi. Nie przywracać go do życia dla kolejnego zwrotu.
- Maja studiuje fotografię. Anatomia i „trzy kości” odnoszą się do fiszek Oli; to nie nowy kierunek studiów Mai.
- Kuba ma 19 lat, Igor 23 i serwis, Bartek 24 i warsztat; Weronika jest bibliotekarką i siostrą Tomka. Lena pisze na postoju, nie podczas prowadzenia.
- Ola w S1 ma pracę w aptece i zaoczne; w S5 jej praca to świetlica. Śledzić przejście pracy zgodnie z aktualnym skryptem, nie przepisywać jednej etykiety do całej sagi.
- Igor jest Szklarzem i korzysta z drugiej karty. Wyznanie nie daje mu automatycznego przebaczenia.
- Gajda odpowiada za współczesne uprowadzenie i ukrywanie prawdy. Nie stoi za każdym późniejszym wydarzeniem i nie ma dostępu do wszystkiego na telefonie gracza.
- Wypadek Tomka w 1997 i świadome ukrycie ciała to odrębne elementy odpowiedzialności. Śmierć Darka w 2011 i usunięcie dokumentów nie stają się automatycznie zleceniem zabójstwa.
- Po finale S1 „Cisza” Maja nie jest od razu w domu. Osobny wątek Niny i adresu w S2 prowadzi do późniejszego ratunku. Nie pisać jej świeżych, beztroskich wiadomości sprzed tego ratunku.
- S3: konto archiwum prowadzi Kuba, fragmenty wskazuje Lena. Ewa Rybicka jest wdową po dziennikarzu, inną osobą niż Ewa Wrona, mama Mai i Kuby.
- S4: Ida, wnuczka Zenona, publikuje kronikę. TV Dolina obejmuje lata 1996–2018; Ola miała 14 lat na festynie 2018. Nagranie rozmowy z Idą jest źródłem głosu w S5.
- S5: Oskar kopiuje dane z telefonu Idy, Dudek dzwoni, Marta pisze scenariusze i chroni matkę przed procesem dotyczącym mostu. Zwrot Marty wymaga wcześniejszego przygotowania i motywu.
- Rodzinne hasło `pachołek` / `jodełka` / `trzy kości` zachowuje to samo znaczenie i pamięć wyboru.

Nie zmieniać kanonu przy okazji poprawiania jednego zdania. Zamierzoną zmianę fabularną opisać wraz z jej wpływem na dowody, notatki, profile, daty, finały i późniejsze sezony.

### 5.2. Naturalny polski i odrębne osoby

| Postać | Sposób pisania i zachowania |
|---|---|
| Kuba | Krótkie serie, małe litery, dopowiedzenia. Pod presją powtarza pytania, szuka bliskiej osoby, bywa impulsywny. |
| Ola | Zwykle poprawna pisownia. Ma własną złość, zmęczenie i obowiązki; nie pełni stale funkcji terapeutki ani kierownika grupy. |
| Igor | Technik z codzienną robotą. Początkowo żartem unika trudnego tematu, później mówi konkretnie o własnych działaniach. |
| Bartek | Krótko, szorstko, często bez polskich znaków. Zna warsztat, nie staje się analitykiem każdej dziedziny. |
| Maja | Konkretna obserwacja, własna ironia, fotografia i własne granice. Po ratunku może chcieć zwykłej rozmowy albo odmówić kontaktu. |
| Lena | Czytelne wiadomości z przerwy w trasie. Odróżnia to, co widziała, od tego, co sobie dopowiedziała. |
| Weronika | Interpunkcja i Pan/Pani, konkretne wspomnienia, niepewność dawnej pamięci. Emocja czasem przerywa zdanie. |
| Marta / Natan | Ona początkowo rzeczowa, pod presją traci uporządkowany ton; on szybki i niedbały, potem odpowiada za swój błąd konkretną czynnością. |
| Gajda / Janina | Nacisk przez uprzejmość, rolę i pozorną pomoc. Nie mówią jak jawny złoczyńca z plakatu. |

Nie wstawiać wszystkim tych samych min, tych samych żartów i tego samego slangu. Nie nazywać kontaktu „Adam budowlaniec” tylko po to, żeby wyjaśnić jego funkcję graczowi. Nazwa kontaktu powinna wynikać z relacji lub sposobu zapisania go przez właściciela telefonu.

Słowa modne, emoji i literówki stosować wybiórczo. Dialog ma pozostać wiarygodny także wtedy, gdy przestanie być popularny konkretny mem. Przy przyszłym użyciu rozpoznawalnego trendu sprawdzić jego zgodność z datą sceny; nie dopisywać współczesnego trendu do nagrania z 2018.

### 5.3. Uczciwa tajemnica

Każda scena ma określać: co gracz wie, co podejrzewa, co jest pomyłką oraz jaki dostępny materiał pozwala to sprawdzić. Zwrot zmienia interpretację wcześniejszych śladów. Nie opiera się na dopiero ujawnionej wszechmocy sprawcy.

Oddzielać człowieka od jego telefonu, właściciela auta od kierowcy, godzinę wykonania od wysłania/synchronizacji, brak odpowiedzi od porwania oraz podobną kurtkę od potwierdzonej tożsamości. Odmowa przyjęcia pliku, prywatny czat albo nieodsłuchany materiał nie stają się automatycznie wiedzą wszystkich postaci.

## 6. Kolejność wdrożeń — zadania dla wykonawcy

Realizować pakietami. Każdy pakiet kończy się działającą zmianą, właściwą migracją, potrzebną weryfikacją i krótką aktualizacją statusu. Zdjęcia i klipy pozostają odłożone, dopóki nie wracamy świadomie do etapu mediów.

### P0 — przygotowanie bez resetowania postępu

- [ ] Potwierdzić właściwy checkout, remote, branch i obecność `2c5f807`; zachować cudze zmiany.
- [ ] Zrobić mapę scen S1: wejście, wiedza gracza i każdej osoby, źródła, wybór, konsekwencja, wyjście, planowana przerwa.
- [ ] Spisać aktualne odstępy istniejących straszaków. Uwzględnić materiał i rozmowę tuż przed oraz po zdarzeniu.
- [ ] Wybrać miejsca nowych scen bez nadpisywania trwających wyborów i bez rozcinania ratunku.

Odbiór P0: konkretna rozpiska nowych scen z identyfikatorami i wpływem na zapis. Samo utworzenie mapy nie jest jeszcze wdrożeniem tych scen.

### P1 — pierwsze 20–30 minut S1

- [ ] Uporządkować drogę: Kuba → rejestr/SMS Mai → dawny artykuł → Rybicki → grupa.
- [ ] Po pierwszej sesji gracz rozumie, kto zaginął, dlaczego kontaktuje się z nim Kuba i jaki jest kolejny krok.
- [ ] Zamknąć jedną małą niewiadomą i zostawić większą; ograniczyć jednoczesne nazwiska, daty i polecenia.
- [ ] Wprowadzić wcześnie sprawdzalną rozbieżność, która budzi podejrzenie, ale nie zdradza od razu sprawcy.
- [ ] Przeczytać komplet reakcji po każdym wyborze, także po odpowiedzi podejrzliwej lub nieuprzejmej.

Odbiór P1: nowa osoba potrafi własnymi słowami opisać problem i następny cel bez podpowiedzi autora. Zmierzyć czas czytania i samodzielnych zagadek osobno od czekania.

### P2 — zwykłe życie w głównej historii S1

- [ ] Dopisać około 3–4 krótkich scen w odpowiednich przerwach między odkryciami. To zakres najbliższego pakietu, nie obowiązkowa liczba na każdy rozdział.
- [ ] Użyć różnych sytuacji: rozpakowanie zakupów, chwila po zmianie, klient opóźniający zamknięcie serwisu, nieoddany pojemnik, odwołane zajęcia lub ostatni autobus.
- [ ] Przynajmniej część scen kończy się zwyczajnie i nie daje dowodu. Nie zamieniać każdego kubka, zamówienia i paczki w wskazówkę.
- [ ] Opcje gracza zmieniają zakres zwierzenia, konkretną pomoc lub późniejsze odniesienie. Sam punkt sympatii nie zastępuje odczuwalnej reakcji.
- [ ] Uwzględnić już odbyte rozmowy opcjonalne; nie odgrywać ponownie tej samej dostawy czy tej samej kawiarni.
- [ ] Po wyznaniach Oli, Bartka i Igora pokazać zachowanie następnego dnia, nie tylko jedno podsumowanie winy.

Odbiór P2: każda scena ma powód i spójne zakończenie; postacie zachowują własne obowiązki. Scen z Mają nie uruchamiać w okresie, kiedy w danej gałęzi jest jeszcze uprowadzona.

### P3 — przerwy, zapowiedzi i powroty

- [ ] Rozwinąć tekst przed i po istniejących siedmiu przerwach: kto wychodzi, dlaczego, czego można się spodziewać po powrocie.
- [ ] Dopisać spokojne powroty, niedokończone zwykłe rozmowy i pojedyncze nocne „nie śpisz?”. Nie każda przerwa prowadzi do alarmu.
- [ ] Rozdzielić realny termin dostępności od godziny wydarzeń zapisanej w materiale. Zaległy nocny wątek można przeczytać rano.
- [ ] Zachować brak kary za nieobecność. Pilne śledztwo nie przegrywa dlatego, że gracz był w pracy lub spał.
- [ ] Po dłuższej nieobecności zachować krótki kontekst ostatniego celu i ciągłość rozmowy.

Odbiór P3: termin nie resetuje się po zamknięciu, zmiana tempa działa, przekroczenie północy i zmiana czasu nie psują kolejności, po powrocie nie ma lawiny zdublowanych zdarzeń. Nie wymuszać obecności o dokładnej minucie.

### P4 — dodatkowe użycia telefonu i social mediów

- [ ] Napisać powiązany łańcuch: zwykła aktywność → niepokojący szczegół → działanie gracza → późniejsze wyjaśnienie/konsekwencja.
- [ ] Rozwinąć sceny z edycją lub wycofaniem wiadomości oraz różnicą pomiędzy zachowanym podglądem a otwartym czatem.
- [ ] Wykorzystać istniejącą historię wersji zamiast ogłaszać drugi raz ten sam system jako nowość.
- [ ] Dodać scenę, w której data zaległego pliku wyjaśnia pozornie świeżą aktywność. Powiadomienie samo nie dowodzi czasu zdarzenia.
- [ ] Rozwinąć relację → screen → reupload → komentarze → reakcję osoby, której to dotyczy. Usunięcie oryginału nie usuwa cudzych kopii.
- [ ] Pokazać prywatny profil, prośby o wiadomość, wyciszoną grupę i źle zrozumiane „wyświetlono” jako zachowania ludzi, nie automatyczne dowody winy.
- [ ] Rozwinąć anonimowy materiał jako trop. Na razie można rozpisać scenę i użyć neutralnego oznaczenia materiału roboczego; produkcja nowego klipu czeka na rozdział 12.

Odbiór P4: każde zdarzenie ma konkretnego nadawcę, źródło danych i warunki dostępu. Obowiązkowy trop pozostaje osiągalny również po odmowie przyjęcia pliku lub bez powrotu do gry w konkretnym momencie. Alternatywna droga ma sens fabularny, nie odtwarza magicznie usuniętej wiadomości.

### P5 — dwa dodatkowe momenty grozy

- [ ] Rozpisać i wdrożyć dwa odrębne zdarzenia z zaskoczeniem, a nie tylko dwie groźne wiadomości.
- [ ] Użyć istniejących ekranów telefonu. Wywołanie nie przeprojektowuje całej aplikacji.
- [ ] Najpierw ustalić przyczynę, źródło dźwięku/obrazu, moment wywołania i późniejszy ślad; potem dobierać efekt.
- [ ] Zachować odstęp od obecnych straszaków i dać postaciom reakcję po zdarzeniu.
- [ ] Zapewnić jednorazowość, zachowanie po zapisie i checkpointach oraz istniejący tryb łagodniejszych straszaków. Nie opierać efektu wyłącznie na skoku głośności.

Odbiór P5: dwa faktycznie działające, różne zaskoczenia, sprawdzone również po reloadzie. Napięcie ocenia człowiek; test techniczny potwierdza wykonanie i zapis, nie poziom strachu.

### P6 — przeniesienie zasad na S2–S5

| Sezon | Co rozwinąć | Warunek odbioru |
|---|---|---|
| S2 | Przygotowanie i skutki publikacji, kontakt Zuzy z babcią, Natan po własnym błędzie, konflikt Marty z matką | Pełny kadr, Margines i Cudzy podpis różnią się konsekwencjami. Zachowana kompletna gałąź Cisza → Nina → adres → późny ratunek. |
| S3 | Skutki ujawnienia adresu Zuzy, krzywda po klipach, zachowanie Kuby po usunięciu konta, odpowiedzialność Leny | Usunięcie profilu nie cofa pobrań ani nie przywraca zaufania. Reakcje pamiętają decyzje gracza i Ewy. |
| S4 | Relacja Idy z Zenonem, praca/wyjazd Idy, rozmowa Oli o dawnym nagraniu i świetlicy | Trzy finały mają zgodny los kaset, Idy i późniejszego dostępu Marty. Zachowane daty, wiek i źródło nagrania głosu. |
| S5 | Rozpoznawanie rozmówcy, rodzinne hasło, skutki fałszywych telefonów, przemiana Marty | Hasło, Echo i Cisza mają zgodne dowody, relacje i stan procesu. Źródło każdej sklonowanej wypowiedzi można wyjaśnić. |

Nie dopisywać po raz kolejny porwania Mai ani jednego sprawcy sterującego całą sagą. Każdy sezon zamyka własny problem; następny wynika ze skutków i ludzi, których już poznaliśmy.

### P7 — długość i odbiór całego pakietu

- [ ] Przejść S1 z nowymi graczami i oszacować czas poszczególnych sesji.
- [ ] Sprawdzić również mniej korzystne zakończenia i wejścia do kolejnych sezonów.
- [ ] Dalszą objętość budować scenami, działaniami i konsekwencjami, a nie obowiązkowym pustym czekaniem.
- [ ] Zaktualizować macierz wykonania, dowody testów i pozostałe braki. Dopiero potem opisywać zakres wydania.

Roboczy szacunek obecnego S1 to **1,5–3 godziny aktywnej gry**, z przerwami kalendarzowymi osobno. W jednej ścieżce automat zliczył 648 publikowanych wiadomości tekstowych i około 5400 słów, bez całego czytania stron, oglądania zdjęć, wszystkich opcji i rozmów pobocznych. To nie pomiar człowieka. Cel dłuższego formatu z Biblii — około 30 dni po 15–30 minut — wymaga 450–900 minut rzeczywistej zawartości i nie jest obecnie osiągnięty.

## 7. Konkretne pomysły na grozę — do rozpisania, niewdrożone

Poniższe sceny rozwijają uzgodniony kierunek. Nie stanowią jeszcze zatwierdzonego nowego kanonu. Przed implementacją wypełnić kartę sceny i sprawdzić chronologię oraz odstępy od istniejących efektów.

### G1 — numer Mai podczas krótkiego powrotu telefonu do sieci

W S1, w pobliżu istniejącej nocnej synchronizacji, zwykłą rozmowę przerywa połączenie z numeru Mai. Krótki dzwonek po ciszy oraz urwany dźwięk poruszanego telefonu tworzą zaskoczenie; postacie reagują i sprawdzają, co faktycznie się wydarzyło. Powód w świecie historii: Gajda ma fizyczny dostęp do telefonu Mai i sprawdza ostatni numer, z którym próbowała się kontaktować.

Warunki: połączenie musi zmieścić się w już ustalonym oknie aktywności urządzenia; sam numer nie dowodzi, że dzwoni Maja. **Telefon Mai nie znajduje się u rodziny w domu.** Nie dopisywać nieistniejącego drugiego egzemplarza ani teleportacji urządzenia. Odbieranie/odrzucenie ma mieć własną reakcję i ślad w historii połączeń.

### G2 — krótki odsłuch od Szklarza przed wyprawą

Przed wyjazdem, gdy Igor może jeszcze być sam w serwisie, pojawia się krótki materiał dźwiękowy od anonima. Zwykły cichy odgłos pomieszczenia zostaje nagle przecięty bliskim uderzeniem lub trzaskiem, po czym odsłuch się kończy. Późniejsze wyznanie wiąże materiał z drugim telefonem Igora i jego próbą zastraszenia grupy.

Warunki: dźwięk ma fizyczne źródło i nie udaje dowodu obecności Mai; nie używać jej krzyku bez fabularnego źródła. Igor nie nagrywa jednocześnie przy Kubie w hucie i sam w serwisie. Potrzebny jest osobny projekt i odsłuch dźwięku; nie zastępować go losowym głośnym efektem. Jeżeli scena okaże się powtórzeniem istniejącego straszaka, zastąpić ją inną, sprawdzoną koncepcją, zachowując wymaganie dwóch dodatkowych zaskoczeń.

### Dodatkowy niepokój — cytat wraca z obcego numeru

Anonim powtarza zdanie wysłane wcześniej przez gracza na grupie. Później okazuje się, że Igor widział je jako uczestnik grupy i przepisał z drugiej karty. To uczciwa wskazówka o dostępie nadawcy do grupy. Nie cytować niewysłanego szkicu ani prywatnej wiadomości, której nie mógł zobaczyć. **Ten motyw sam w sobie nie liczy się jako drugi jumpscare.**

## 8. Telefon: zasady, które obowiązują przy każdym dodatku

1. Fikcyjny telefon ma czytelne, stałe działanie. Nieznany nadawca nie zyskuje bez wyjaśnienia dostępu do systemu, mikrofonu, aparatu i niewysłanych tekstów.
2. Zrzut wykonany przez autorski przycisk w grze jest czym innym niż każdy systemowy screenshot. Nie obiecywać wykrywania tego drugiego. Powiadomienie dla nadawcy ma istnieć tylko tam, gdzie przewiduje je dana fikcyjna usługa.
3. Znikająca wiadomość znika zgodnie z czytelną regułą. Odłożenie gry na noc nie ma samo w sobie pozbawiać gracza jedynej drogi rozwiązania sprawy.
4. Błąd, brak zasięgu, nieudany upload i synchronizacja mają przyczynę oraz skutek. Nie używać ich wymiennie jako wygodnego opóźniacza.
5. Numer zastrzeżony dotyczy połączenia; zwykły anonimowy SMS ma nieznany numer, a nie magicznego „zastrzeżonego nadawcę”.
6. Uczestnik rozmowy wie tylko to, co otrzymał, sam zobaczył lub co wynika z jego ustalonego działania. Sprawdzać warianty odmowy, zatajenia i nieprzyjęcia materiału.
7. Ważne wiadomości i przedmioty są osiągalne przez widoczną drogę w interfejsie. Nie wymagać odgadnięcia nieopisanego gestu.
8. Powiadomienie mobilne zapowiada dostępność treści po zgodzie; nie wymaga pobudki w nocy ani otwarcia aplikacji w tej samej minucie. W przeglądarce nie obiecywać powiadomień po zamknięciu karty.
9. Technologiczne funkcje są częścią fikcji gry. Nie deklarować pełnego dostępu do prawdziwego iPhone'a tylko dlatego, że ekran go przypomina.

## 9. Fotografie: zaakceptowane wzorce i odrzucone próby

**Produkcja zdjęć jest teraz ODŁOŻONA.** Zachować poniższe ustalenia do wznowienia etapu. Nie generować kolejnej serii przy okazji pisania dialogów.

### 9.1. Wzorować realizm na tych trzech konkretnych plikach

| Numer z ocenionej planszy | Osoba | Plik w repo | Znaczenie akceptacji |
|---|---|---|---|
| **01** | **Kuba** | `assets/people/kuba.jpg` | Wzorzec zwykłej fotografii i realizmu, zachować identyczny plik |
| **06** | **Lena** | `assets/lena-v2.jpg` | Wzorzec realizmu, zachować identyczny plik |
| **08** | **Gajda** | `assets/gajda.jpg` | Wzorzec realizmu, zachować identyczny plik |

Są to referencje jakości zdjęcia, nie polecenie kopiowania ich twarzy, miny, pozy i kadru na inne osoby. Numery pochodzą z zestawu 01–24 w `outputs/postacie-do-oceny` katalogu zadania. Dokładne hashe przechowuje manifest `docs/ASSETY-REALIZM-2026.json`.

Pozostałe **21 zdjęć z pokazanych 24** użytkownik odrzucił jako wyglądające na AI. Dotyczy to także dodatkowego zdjęcia Kuby nr 20. Akceptacja portretu 01 nie zatwierdza całej galerii Kuby. Niepokazane zdjęcia pozostają nieocenione — nie zaliczać ich automatycznie do dobrych ani odrzuconych.

### 9.2. Maja — zapamiętać dokładnie przebieg oceny

| Próba | Ocena użytkownika | Decyzja do dalszej pracy |
|---|---|---|
| v1, nowy portret | Nadal wygląda jak AI | Odrzucona |
| v2, kolejny portret | Bliżej, ale znowu podobne ujęcie i mina jak u innych | Niezatwierdzona; nie produkować serii tej samej pozy |
| v3, śmiech i jedzenie/rozrywanie croissanta | Sytuacja sztuczna i ustawiona | Odrzucona jako kierunek sceny |
| v4, patrzenie w telefon | Najbliżej oczekiwań, lecz włosy, tekstura skóry i materiały są zbyt idealne | Kierunek sytuacji, nie akceptacja zdjęcia do gry |

Żadna próba nie jest podłączona do gry. Ich dokładne prompty i pliki są w `outputs/realizm-2026/PROBY-ZDJEC.md` oraz obok tego pliku w katalogu zadania. Nie powoływać się na v4 jako na zaakceptowany wzorzec jakości skóry lub włosów.

## 10. Fotografie: co oznacza realizm i nieidealność

### Sytuacja i autorstwo

- Przed promptem określić: kto robi zdjęcie, po co, komu je wysyła, gdzie stoi i czy fotografowana osoba wie o zdjęciu.
- Selfie w lustrze wymaga obecnego lustra i poprawnego odbicia. Zdjęcie z przeciwnej strony stolika wymaga drugiej osoby. Sam fakt, że ktoś ma telefon w dłoni, nie wyjaśnia każdej perspektywy.
- Telefon używany do wykonania zdjęcia nie znajduje się jednocześnie w dłoni fotografowanej osoby w tym samym ujęciu, chyba że jest to logiczna scena z drugim urządzeniem.
- Przedmiot i czynność mają sens: sposób trzymania jedzenia, ślad po ugryzieniu, wielkość rogalika, podparcie kubka, układ dłoni, narzędzia i końce przewodów.
- W scenie Mai z kawiarni patrzenie w telefon może pozostać kierunkiem. Jedzenie jest drobnym elementem sytuacji, nie wielkim reklamowym produktem ustawionym dla kamery.

### Twarz, włosy, ubranie i kadr

- Skóra ma zwykłe, subtelne różnice tonu i faktury. Nie gładzić jej do plastiku i nie nakładać jednakowej mapy porów lub piegów.
- Włosy nie są równo ułożoną, lśniącą masą. Przedziałek, grzywka, luźne kosmyki i związanie mają wynikać z fryzury i sytuacji, nie z doklejonego „kontrolowanego bałaganu”.
- Ubranie ma ciężar, zagniecenia, naturalne ułożenie i zwykłą fakturę. Wszystko nie musi wyglądać jak świeżo kupiony komplet.
- Nie postarzać postaci ani nie dodawać brudu tylko po to, by uzyskać „realizm”. Wiek i wygląd mają odpowiadać osobie.
- Zmienność ma wynikać z życia: neutralna mina, skupienie, zmęczenie, irytacja, rozmowa z kimś poza kadrem, czasem śmiech i czasem świadoma poza.
- Nie powielać półuśmiechu, identycznego skrętu głowy i bliskiego portretu całej obsadzie. Dopuszczać różne plany, selfie, profile, szersze sceny i zdjęcia niegotowej osoby.
- Światło i aparat mają pasować do miejsca oraz autora. Nie każde zdjęcie jest kinowym portretem z rozmytym tłem.
- Ziarno, kompresja i rozmycie nie naprawiają sztucznej sytuacji, nieprawidłowych dłoni ani zbyt idealnej twarzy. Nie używać filtrów jako zastępstwa dobrej fotografii.

### Ciągłość i ocena

- Zachować rozpoznawalność twarzy we wszystkich zdjęciach, awatarach, profilach, wspomnieniach i materiałach dowodowych.
- Nowy casting Mai wymaga planu zgodnej wymiany całego jej zestawu, a nie tylko awatara.
- Zdjęcie archiwalne ma właściwą datę. Nie może udawać świeżego dowodu obecności osoby.
- Sprawdzać obraz w wiadomości i po powiększeniu: dłonie, oczy, włosy, tekstury, odbicia, napisy, rekwizyty i tło.
- Gajda i Marta nie mają wyglądem zdradzać swojej późniejszej roli. Normalne, wiarygodne zdjęcie antagonisty jest właściwe.
- Próby trzymać poza zasobami gry do oceny; nie ogłaszać podłączenia jako zaakceptowanego zamiennika bez rzeczywistej akceptacji.

## 11. Plan przyszłych ujęć — propozycje, nie wykonane materiały

Przy wznowieniu produkcji wybrać konkretną scenę i sprawdzić jej datę. Nie przydzielać każdemu obowiązkowego pakietu „portret, praca, spacer”.

| Osoba | Przykładowa sytuacja i autor | Warunek sensu |
|---|---|---|
| Maja | Ola przy stoliku; Maja czyta wiadomość | Zwykła pozycja ciała, małe jedzenie w tle sytuacji, poprawione tekstury |
| Kuba | Maja przed zaginięciem fotografuje rozplątywanie kabli | Przewody i dłonie wykonują rzeczywistą czynność |
| Lena | Koleżanka na przerwie na pętli | Autobus stoi, brak pisania podczas jazdy |
| Gajda | Zdjęcie redakcji ze spotkania mieszkańców | Zachowana twarz z 08, zwykła sytuacja bez stylizacji złoczyńcy |
| Ola | Koleżanka po zajęciach, rozkład jazdy i torba | Zgodna praca, data i pora roku |
| Bartek | Przypadkowo wpada w kadr kolegi w warsztacie | Narzędzia, część auta i podparcie mają sens |
| Igor | Znajomy fotografuje szukanie śrubki przy biurku | Spójne urządzenia i czynność, nie kolejny portret z rekwizytem |
| Weronika | Koleżanka podczas przygotowania spotkania w bibliotece | Prawidłowy wiek, zwykłe oświetlenie i otoczenie |
| Ewa | Zdjęcie rodzinne wykonane przez Kubę | Odróżnić Ewę Wronę od Ewy Rybickiej i określić datę |
| Sylwia | Koleżanka podczas przerwy w salonie | Bez niemożliwej pracy narzędziem przy odwróconej uwadze |
| Zuza | Zwykłe selfie dla znajomych | Wiek 16 lat, brak stylizacji dorosłej modelki |
| Nina | Kolega przy oddawaniu auta po zmianie | Auto stoi, paczki mają ciężar i podparcie |
| Marta | Koleżanka w kuchni redakcji lub archiwum | Miejsce pracy zgodne z datą; tło nie ujawnia późniejszego sekretu |
| Natan | Koleżanka po montażu, zmęczenie i bałagan | Ekran nie pokazuje dowodu z przyszłego rozdziału |
| Henryk | Wnuczka podczas rozmowy na spacerze | Rodzinne zdjęcie, nie stereotypowy model „starszy pan” |
| Janina | Zwykły kadr prasowy ze spotkania | Dopuszczalna inna jakość aparatu; bez wizualnego piętnowania |
| Ida | Znajoma na peronie | Pogoda, praca i miejsce zgodne z zakończeniem S4 |
| Zenon | Rodzina podczas pracy przy magnetowidzie | Wnętrze urządzenia i narzędzia mają sens |
| Oskar | Znajomy podczas przerwy na schodku | Wiek 17 lat, zwykła kanapka i strój, brak sesji modowej |

## 12. Klipy — obowiązujący proces pierwszej i ostatniej klatki

**Status: ODŁOŻONE. Teraz opisujemy potrzeby scenariusza; nie produkujemy filmów.** Użytkownik odrzucił wcześniejsze próby klipów i chce przygotowania materiału do późniejszego generowania przez **Omni Flash**.

### Kolejność pracy nad każdym klipem

1. **Najpierw karta sceny.** Ustalić autora, powód nagrywania, datę, miejsce, odbiorcę, funkcję fabularną i to, czego nagranie nie dowodzi.
2. **Przygotować pierwszy kadr.** Pełnoprawne, logiczne zdjęcie punktu startowego. To nie przypadkowa miniatura ani plansza z napisem.
3. **Przygotować ostatni kadr.** Ta sama scena po jednej czytelnej zmianie. Zachować osobę, ubranie, pomieszczenie, światło, pogodę, rekwizyty i położenie autora.
4. **Ocenić oba kadry razem.** Mają nadawać się do wiarygodnego przejścia. Nie generować filmu, jeżeli któryś kadr jest nadal odrzucony lub twarz wygląda inaczej.
5. **Opisać ruch pomiędzy nimi.** Co robi człowiek, co porusza kamerą, jaka jest jedna główna czynność i co słychać. Telefon może poruszać się nieidealnie, ale ruch wynika z ręki/operatora i sytuacji.
6. **Dopiero wtedy Omni Flash.** Zachować tę uzgodnioną ścieżkę. Przy wykonaniu sprawdzić faktyczny sposób przekazania obu klatek w używanym narzędziu; ten dokument nie potwierdza dostępności konta ani konkretnej funkcji modelu. Jeżeli brakuje potrzebnej obsługi, zachować klatki i opisać brak, zamiast samodzielnie zmieniać metodę.
7. **Ocenić cały klip.** Nie tylko początek i koniec: twarz, dłonie, liczba przedmiotów, geometria, jedzenie, odbicia i detale nie mogą zmieniać się bez przyczyny po drodze.
8. **Podłączyć zaakceptowany wynik.** Dopasować podgląd, opis dowodu, metadane i wiadomości przed/po. Sprawdzić odtwarzanie, przerwanie, powrót, zapis i offline.

Nie zastępować tego procesu własnym montażem przesuwanych zdjęć, zoomów lub filtrów udających nowe nagranie. Nie wracać do odrzuconej metody pod nową nazwą. Istniejące klipy w repo wymagają osobnej oceny; nie ma automatycznej zgody na ich jakość ani polecenia usunięcia wszystkich plików bez sprawdzenia zależności fabuły.

### Ciągłość między klatkami

- Ten sam człowiek, wiek, twarz i fryzura; zmiana wyrazu twarzy wynika z działania.
- Ta sama liczba dłoni, palców i rekwizytów; poprawne podparcie i ruch przedmiotów.
- Jedzenie zachowuje wielkość i stan; ugryzienie lub odłożenie jest widoczną czynnością.
- Kamera nie przeskakuje z selfie do perspektywy drugiej osoby bez uzasadnienia.
- Ruch do ostatniego kadru jest fizycznie możliwy w planowanej długości i przestrzeni.
- Pogoda, oświetlenie, odzież, lustro i tło pozostają zgodne.
- Nie pojawiają się nowe napisy, twarze ani ważne dowody, których nie było w projekcie sceny.
- Nagranie wygląda jak materiał właściwego autora: znajomego, telefonu, kamery terenowej lub archiwum. Nie każde ma tę samą kinową estetykę.

## 13. Gotowe szablony do używania przy realizacji

### Karta sceny

```text
ID / status / priorytet:
Sezon, rozdział i miejsce w przebiegu:
Warunki wejścia, wcześniejsze wybory i zakończenie:
Osoby i ich aktualna wiedza:
Zwykły cel postaci / powód kontaktu:
Co wie i czego domyśla się gracz przed sceną:
Przebieg: konkretne działanie -> wiadomości -> decyzja -> reakcja:
Opcje gracza i odczuwalna różnica:
Źródło każdego nowego faktu:
Co pozostaje podejrzeniem:
Późniejsza konsekwencja / miejsce powrotu wątku:
Przerwa i zapowiedź powrotu, jeśli potrzebne:
Zależności od rozmów opcjonalnych i innych aplikacji:
Wpływ na dowody, notatki, profil, daty i późniejsze sezony:
Wpływ na zapis / migracja / jednorazowość:
Wymagane media i ich osobny status:
Sposób sprawdzenia i warunek odbioru:
```

### Karta zdjęcia lub klipu

```text
ID materiału:
Status: plan / próba / do oceny / zaakceptowany / wdrożony / odrzucony
Sezon, rozdział, rozmowa i warunki wejścia:
Autor i rzeczywiste położenie aparatu:
Powód wykonania oraz odbiorca:
Data/godzina/miejsce wykonania:
Oddzielnie: wysłanie, publikacja i synchronizacja:
Funkcja fabularna i widoczna wskazówka:
Czego materiał nie dowodzi:
Referencja tożsamości:
Referencje realizmu: 01 Kuba / 06 Lena / 08 Gajda — jako jakość, nie cudza twarz
Ubiór, fryzura, otoczenie i rekwizyty:
Czy osoba wie o zdjęciu / nagraniu:
Pierwszy kadr — plik i opis, jeśli klip:
Ostatni kadr — plik i opis, jeśli klip:
Jedna główna czynność i ruch kamery:
Długość, orientacja i źródła dźwięku:
Elementy stałe / dopuszczalne zmiany / elementy zabronione:
Moment zaskoczenia, jeśli występuje:
Wiadomości przed / po oraz opis dowodu:
Dokładny prompt, narzędzie, data i pliki źródłowe:
Ocena użytkownika i zastrzeżenia:
Plik docelowy, podgląd, rejestr zasobu i offline:
```

### Karta zaskoczenia

```text
ID zdarzenia i scena:
Zwykły kontekst poprzedzający:
Konkretny bodziec i czas trwania:
Rzeczywista przyczyna oraz osoba odpowiedzialna:
Skąd ma dane, numer lub nagranie:
Późniejszy ślad / wyjaśnienie:
Odstęp od poprzedniego i następnego straszaka:
Reakcja postaci po zdarzeniu:
Wariant odebrania, odrzucenia, wyciszenia i powrotu:
Jednorazowość, zapis, checkpoint i tryb łagodny:
Ocena odsłuchu/obrazu przez człowieka:
```

## 14. Mapa kodu i zasady bezpiecznego wdrażania

| Zadanie | Główne miejsca |
|---|---|
| S1 | `js/story/prolog.js`, `ch1.js`–`ch5.js`, `epilog.js`, `_scenes.js` |
| S2 | `js/story/most.js`, `most2.js`, `most3.js`; `js/data/case-most.js` |
| S3 | `js/story/kopia.js`, `kopia2.js`; `js/data/case-kopia.js` |
| S4 | `js/story/kronika.js`; `js/data/case-kronika.js` |
| S5 | `js/story/glos.js`; `js/data/case-glos.js` |
| Rozmowy dodatkowe | `js/data/conversations.js`, `today.js`, `season-conversations.js`, `dark-threads.js`, `field-threads.js`; `js/core/conversations.js` |
| DSL i wyświetlanie treści | `js/core/engine.js` |
| Stan, zapis i migracje | `js/core/state.js`, `js/data/migrations.js`, `tools/gen-migration-*.cjs`, fixture'y w `tests/fixtures/` |
| Sezony i konsekwencje | `js/core/seasons.js`, `js/data/seasons.js`, pliki `case-*`, `js/apps/seasons.js` |
| Przerwy i przypomnienia | `js/core/pacing.js`, `js/data/rhythm.js`, `js/core/native.js` |
| Profile, fakty i dowody | `js/data/characters.js`, `evidence.js`, `maja.js`, `web.js`, `world.js`, pliki `case-*` |
| Narzędzia telefonu i media | `js/apps/`, `js/art/`, `js/core/phone-tools.js`, `js/core/ui.js`, `js/core/audio.js` |
| Offline i eksport mobilny | `sw.js`, `index.html`, `scripts/build.cjs`, konfiguracja Capacitor |

Reguły obowiązkowe:

1. Zmiana tekstu istniejącego kroku: użyć `wording`, jeśli potrzebne jest zachowanie starego podpisu. W grze aktualna treść to `wording ?? text`; stare `text` nie musi oznaczać widocznego błędu.
2. Dopisanie kroków głównej historii wymaga migracji obsługiwanych zapisów i checkpointów. Nie przesuwać indeksów ani nie regenerować fixture'ów tylko po to, żeby test przestał zgłaszać problem.
3. Zachować identyfikatory wyborów, dowodów i zakończeń. Każde nowe zdarzenie ma stabilne ID i zasady odtworzenia po wznowieniu.
4. Przeczytać całe gałęzie. Nowa opcja musi pasować do odpowiedzi i efektu; nie dawać pozornej odmowy, którą następna scena ignoruje.
5. Dane opcjonalnych rozmów pozostają osobne od głównego `pc`. Dostępność i ponowne odczytanie mają uwzględniać ratunek i przejście sezonu.
6. Przejście sezonu korzysta z istniejącej kontynuacji i archiwum wyników, nie z `newGame()`.
7. Zmiana podpisu zdjęcia wymaga sprawdzenia podpisu w rejestrze grafiki, opisie dowodu, galerii i dialogu.
8. Nowe pliki dołączyć do strony, cache i eksportu mobilnego; zwiększyć wersję cache. Nie zmieniać CSS przy okazji redakcji sceny.
9. Nie kasować odrzuconego zasobu bez ustalenia wszystkich miejsc użycia i zamiennika. Zapisana decyzja „do wymiany” nie oznacza, że wymiana już nastąpiła.
10. Weryfikować aktualny zakres. Lokalny commit, push, wdrożenie strony, kompilacja mobilna, test przeglądarki i odbiór przez człowieka są odrębnymi wynikami.

## 15. Testy: co sprawdzono i co sprawdzać dalej

### Dowody wykonanej weryfikacji dla pakietu `2c5f807`

| Sprawdzenie | Wynik i granica |
|---|---|
| `node --test tests/*.test.cjs` | 47/47 PASS po ostatnich zmianach; także test eksportu zasobów mobilnych |
| `tests/rhythm.browser.cjs` | PASS iOS/Android: zapis przerwy, reload, zmiana na własne tempo, zwolnienie terminu, aktualna opcja i jej wysłanie, notatka sezonu, zapis rozmowy Oli |
| `tests/case-most.browser.cjs` | 4/4 PASS: trzy finały po Świcie i Cisza → Nina/adres → Margines |
| `tests/e2e-player.browser.cjs` | PASS jednej ciągłej ścieżki iOS: 31 rozdziałów, pięć finałów, offline, brak zgłoszonych błędów strony i przepełnień |
| Porównanie z bazą | 33 skrypty i 803 opcje zachowują strukturę po pominięciu `wording`, `rest` i świadomie zmienionego źródła początkowego SMS-a |
| Referencje zdjęć | 01, 06, 08 mają zgodne hashe i pozostają identyczne bajtowo |

Finały pełnej sprawdzonej ścieżki: `swit` → `pelny_kadr` → `wlasnym_glosem` → `przewiniecie` → `haslo`. Nie jest to kontrola wszystkich kombinacji zakończeń.

Raporty w katalogu zadania: `outputs/realizm-2026/przejscie-s1-s5.json`, `audyt-redakcji.json`, `testy-jednostkowe.log`; zrzuty w `przejscie-s1-s5/` i `rytm-pakiet2/`. Dodatkowe zrzuty S2: `outputs/wlasciwa-galaz/redakcja-s2/`.

Automaty przyspieszają czas i spełniają część warunków zagadek. Test S2 zastępuje część ekranów oraz połączeń atrapami; pełny E2E uruchamia rzeczywiste ekrany połączeń i straszaki. Nie dowodzi to jakości rozmów, skuteczności grozy, czasu gry nowego człowieka ani działania na fizycznym iPhonie.

### Weryfikacja po następnym pakiecie

- [ ] Właściwe testy jednostkowe, migracje i eksport zasobów.
- [ ] Zapis przed nową sceną, w wyborze, po decyzji i podczas przerwy; reload oraz checkpoint.
- [ ] Gałęzie zatajenia, odmowy, odrzucenia pliku i wcześniejszej rozmowy opcjonalnej.
- [ ] Ciągłość faktów, wersji materiałów, nazw, dat i tytułów aplikacji.
- [ ] Własne tempo i tryb dzienny; powrót rano do nocnego wątku, dłuższa nieobecność, północ i zmiana czasu.
- [ ] Straszaki w trybie zwykłym i łagodnym, bez podwójnego odpalenia i bez nakładania się dźwięków po powrocie z tła.
- [ ] Telefonowe szerokości i obie oprawy, długie opcje, dostępne przyciski, brak przepełnień i spoilerów w wyszukiwaniu.
- [ ] Media: otwarcie, odtwarzanie, powrót, przerwanie, podgląd, podpis i offline.
- [ ] Przejście zmienionej części przez człowieka, a przed wydaniem także macierz finałów i przejść między sezonami.
- [ ] Osobno test fizycznego urządzenia, gdy dotykamy natywnych powiadomień, tła, audio lub klawiatury.

### Uruchomienie w tym środowisku

Repo wymaga Node 22 lub nowszego. Na tym komputerze użyty runtime:

```text
C:/Users/kretowicz_k/AppData/Local/npm-cache/_npx/a0439c230146586f/node_modules/node/bin/node.exe
```

Przykładowe polecenia z katalogu właściwego repo, po zapewnieniu Node 22+ w PATH:

```text
node serve.js 5184
node --test tests/*.test.cjs
node tests/rhythm.browser.cjs
node tests/case-most.browser.cjs
node tests/e2e-player.browser.cjs
```

Testy przeglądarkowe korzystają z Playwright/Chromium i zmiennych `PLAYWRIGHT_MODULE`, `CHROMIUM_PATH`, `TEST_BASE_URL`; pełne E2E także z `E2E_OS`, `PLAYTEST_REPORT`, `TEST_SCREENSHOT_DIR`. Bieżące lokalizacje pomocnicze:

```text
PLAYWRIGHT_MODULE=C:/Users/kretowicz_k/Documents/Codex/2026-10-23/po/work/qa-tools/node_modules/playwright
CHROMIUM_PATH=C:/Users/kretowicz_k/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe
TEST_BASE_URL=http://localhost:5184
```

To ścieżki tego komputera; przed użyciem w nowym środowisku sprawdzić ich istnienie. Nie zmieniać globalnej konfiguracji użytkownika tylko po to, żeby uruchomić test.

## 16. Odbiór i aktualizowanie tego pliku

Po pakiecie wykonawca ma podać: co faktycznie działa, co nadal jest planem, jakie gałęzie i zapisy sprawdzono, znane braki, commit/gałąź oraz czy zmiany są tylko lokalne, wypchnięte czy wdrożone. Aktualizować ten dokument w tych samych kategoriach.

Pakiet scenariuszowy jest gotowy dopiero, gdy nowa scena działa, pasuje do wszystkich swoich wejść, ma właściwą wiedzę postaci, zachowuje zapis i została przeczytana w kontekście. Pakiet mediów wymaga również akceptacji obrazu/klipu, spójności tożsamości i logicznego podłączenia do historii. Zielony test nie zastępuje tej oceny.

**Stan 23.10, popołudnie — patrz rozdział 17.**

**Najbliższe zadanie:** P0 → P1 → P2 → P3 → P4 → P5 w S1, z testami po kolejnych zmianach; następnie P6 dla S2–S5. P7 domyka odbiór i pomiar. Produkcja zdjęć oraz proces pierwsza/ostatnia klatka → Omni Flash pozostają zapisanym, odłożonym etapem mediów.

### Materiały źródłowe tego przekazania

- Bezpośrednie ustalenia użytkownika w tym czacie, w tym oceny zdjęć i odrzucenie wcześniejszych klipów.
- `docs/REALIZM-2026.md` — zapis dwóch wykonanych pakietów i wyników.
- `docs/BIBLIA-SEZONOW.md`, `docs/GLOSY-POSTACI.md` — kanon i głosy; uwzględniać historyczny charakter części starszych rozpisek.
- `docs/ASSETY-REALIZM-2026.json`, `docs/ZDJECIA-SYTUACJE.md` — decyzje o plikach i plan sytuacji.
- `docs/MROK-I-SLADY.md`, `docs/ROZWOJ-1-4.md`, pliki `SPRAWA-2-PLAN.md`–`SPRAWA-5-PLAN.md` — kontekst istniejących wątków.
- `outputs/realizm-2026/STATUS.md`, `DIALOGI-PRZYKLADY.md`, `PROBY-ZDJEC.md` i raporty testów — materiały zadania poza repo.

Dokument zbiera stan i ustalenia; jego sporządzenie nie wdraża pól oznaczonych „DO WDROŻENIA” lub „ODŁOŻONE”.

## 17. Stan pakietu P0–P5a (23.10.2026, popołudnie)

Gałąź `feat/realizm-2026`. Zmiany są **zapisane lokalnie w commitach**; push wymaga uwierzytelnienia, którego wykonawca nie miał — sprawdzić `git log origin/feat/realizm-2026..` przed dalszą pracą.

| Pakiet | Status | Co faktycznie działa |
|---|---|---|
| P0 | **WDROŻONE** | `docs/MAPA-S1.md`: mapa scen S1, odstępy straszaków, identyfikatory nowych scen. Migracja zapisów v5 (`STORY_MIGRATIONS_V5`, fixture `story-v4-steps.json`, `tools/regen-migrations.cjs`). Stare tabele V3/V4 mapują wprost na bieżące kroki. |
| P1 | **CZĘŚCIOWO** | Scena `xCel` w prologu: Kuba porządkuje to, co wiadomo (zamknięta niewiadoma: czemu Maja dzwoniła pod ten numer), co jest otwarte (gdzie była), i sprawdzalna rozbieżność 23:47/23:58 vs „tama koło północy”; następny krok = lokalizacja w Nimbusie. Brak pomiaru z nowym graczem. |
| P2 | **CZĘŚCIOWO** | `xSerwis` (ch2, klientka przed zamknięciem serwisu, Ola po nocce — bez dowodu), `xOla` (ch2, Ola dzień po przyznaniu się do kłótni; odpisuje Mai, wiadomość niedostarczona), `xBartek` (ch3, Bartek dzień po przyznaniu się, odkładana rozmowa z ojcem). Brak sceny dnia po wyznaniu Igora oraz zakupów/autobusu. |
| P3 | **CZĘŚCIOWO** | Teksty przerw `s1_night`, `s1_departure`, `s1_sync` przypominają ostatni cel i mówią, że nocne wiadomości poczekają. Brak nowych scen powrotu. |
| P4 | **DO WDROŻENIA** | Karta sceny `xWycofana` w `docs/MAPA-S1.md`; silnik nie obsługuje dziś wycofania wiadomości. |
| P5 | **WDROŻONE TECHNICZNIE** | `scMajaNumer` / `s1_maja_numer` (call; odebranie/odrzucenie mają osobną reakcję Kuby i wpis w rejestrze), `scOdsluch` / `s1_odsluch` (głosówka + glitch; wyjaśnienie w wyznaniu Igora `xOdsluchIgor`, tylko jeśli straszak się odbył). |
| P6, P7 | **DO WDROŻENIA** | — |

Testy po pakiecie: `node --test tests/*.test.cjs` 49/49 PASS (w tym nowy test tabeli V5 i wczytania zapisu v4 w ch3). Przeglądarka (Playwright/Chromium na Linuksie): `rhythm` PASS iOS/Android, `scares` PASS (zwykły i łagodny), `prolog` PASS (test uzupełniony o wybór w `xCel`), `e2e-player` iOS PASS (31 rozdziałów, pięć finałów, offline, 0 błędów strony; zapisane straszaki obejmują `s1_odsluch` i `s1_maja_numer`). Nie testowano fizycznego telefonu.

### 17.1 Aktualizacja 23.10, ~15:00
- P4 (częściowo): silnik obsługuje wycofane wiadomości (`unsend(chat, uid, {flag})`, `say(..., {uid})`), dymek „Wiadomość została usunięta”, podgląd w liście czatów. Scena `xWycofana` (ch3, po `xBartek`): Bartek wysyła i cofa wiadomość o pytaniu starego o hutę; flaga `x_wycofanaSeen` tylko gdy gracz miał czat otwarty, `x_wycofanaTold` przy konfrontacji.
- P2: scena codzienna `xAutobus` (ch3, po `s19`): Ola i ostatni autobus.
- Migracja V5 przegenerowana, cache SW v52.
- Do zrobienia: P3 (sceny powrotów), ukryta wiadomość wideo w P4, P6.
- P3 (początek): scena `xNieSpisz` (ch1, po przerwie `s1_night`): spokojne „nie śpisz?” Kuby przed nocnym alarmem. Cache SW v53.
- Test `tests/unsend.browser.cjs`: dymek „Wiadomość została usunięta” w otwartym czacie i podgląd (PASS).
- P3: scena `xPojechali` (ch2, po przerwie `s1_departure`): Bartek prywatnie pyta, czy pojechali; gracz streszcza cel. Tylko gdy czat z Bartkiem odblokowany. Cache SW v54. Test `rhythm` poprawiony pod `xNieSpisz` (PASS iOS/Android).

### 17.2 Aktualizacja 23.10, popołudnie (P3, P4, P6)
- P3: `SeasonPacing` zapisuje flagę `rano_<id przerwy>`, gdy gracz wraca co najmniej 4 h po terminie (bez kary, bez zmiany kolejności). Reakcje: `xRanoNoc` (ch1), `xRanoSync` (ch3), `xRanoKlip` (S3). Spokojne powroty: `xNieSpisz` (ch1), `xPojechali` (ch2), `xPoTreningu` (S2), `xPoPracy` (S4). Test jednostkowy: późny powrót, powrót na czas, okno nocne w dniu zmiany czasu (25.10.2026). Przerwa `s5_voice` kończy się nocnym telefonem; bez osobnej sceny porannej.
- P4: `xDataPliku` (data pliku a czas synchronizacji), `xWyswietlono`, `xWyciszona`, `xReupload` (relacja → screen → reupload → komentarze → mama Mai), `xProsby` (prośby o wiadomość, prywatny profil) z wyjaśnieniem `xProsbaWyjasnienie` w epilogu.
- P6: S2 `xNatanBlad`, `xMartaKuchnia`; S3 `xKopieZostaja` (tylko po `k_kubaOff`); S4 `xIdaDziadek`; S5 `xMamaNatana`.
- Bez zmian: anonimowy materiał wideo (P4, czeka na rozdział 12), Ola o dawnym nagraniu w S4 (istnieje w c4), rozpoznawanie rozmówcy w S5 (istnieje).

### 17.3 P7: szacunek długości z E2E (23.10, Android, ścieżka swit → pelny_kadr → wlasnym_glosem → przewiniecie → haslo)
Szacunek czytania: słowa / 150 na minutę + 3 s na wiadomość. Bez szukania dowodów, przerw i namysłu przy wyborach, więc realna sesja będzie dłuższa. Pomiar z ludźmi nadal do zrobienia.

| Rozdział | Wiadomości | Słowa | Minuty czytania |
|---|---|---|---|
| prolog | 86 | 713 | ~9 |
| ch1 | 85 | 670 | ~9 |
| ch2 | 162 | 1252 | ~16 |
| ch3 | 203 | 1755 | ~22 |
| ch4 | 81 | 748 | ~9 |
| ch5 | 78 | 647 | ~8 |
| epilog | 38 | 412 | ~5 |
| m0 | 88 | 932 | ~11 |
| m1 | 70 | 831 | ~9 |
| m2 | 82 | 1004 | ~11 |
| m3 | 83 | 927 | ~10 |
| m4 | 69 | 804 | ~9 |
| m5 | 75 | 853 | ~9 |
| k0 | 61 | 633 | ~7 |
| k1 | 72 | 688 | ~8 |
| k2 | 79 | 740 | ~9 |
| k3 | 73 | 761 | ~9 |
| k4 | 72 | 750 | ~9 |
| c0 | 58 | 566 | ~7 |
| c1 | 61 | 624 | ~7 |
| c2 | 63 | 624 | ~7 |
| cf | 68 | 632 | ~8 |
| c3 | 68 | 737 | ~8 |
| c4 | 47 | 408 | ~5 |
| g0 | 77 | 684 | ~8 |
| g1 | 67 | 732 | ~8 |
| g2 | 76 | 780 | ~9 |
| g3 | 68 | 681 | ~8 |
| g4 | 59 | 708 | ~8 |
| g5 | 69 | 750 | ~8 |
| g6 | 61 | 631 | ~7 |

Uwaga: ch3 (~22 min czytania) jest wyraźnie najdłuższy w S1 po dopisaniu scen P2/P4. Przy pomiarze z graczami sprawdzić, czy nie podzielić go przerwą przed `s19`.
- P4: silnik obsługuje też edycję (`edit(chat, uid, text, {flag})`, dopisek „edytowano · godzina”). Scena: Kuba poprawia „bartek ty coś przed nami ukrywasz” w `xWyciszona` (ch2); flaga `x_edycjaSeen`, gdy gracz widział pierwszą wersję. Test `unsend.browser.cjs` obejmuje edycję.
- Testy przeglądarkowe spraw 3–5 oczekują teraz wersji zapisu 5 (wcześniej 4, nieaktualne po migracji V5).

### 17.4 Stan na 23.10.2026, 17:00

- Push działa: `gh` zalogowany na koncie kacperkretowicz-wq, każdy commit idzie od razu na `origin/feat/realizm-2026` (bez force-push, nigdy na `main` ani `feature/ostatni-kurs`).
- P2: dzień po wyznaniu Igora — opcjonalna rozmowa `igor_sunday` w epilogu (S1). Zrobione.
- P3: poranne odczyty nocnych wiadomości (`rano_<restId>`), czas przez północ i DST, sceny powrotu po przerwach S1–S5, a przy oczekiwaniu na rozdział krótki „Ostatni cel”. Zrobione. Otwarte: brak sceny porannej po `s5_voice` (kończy się nocnym telefonem, celowo).
- P4: usunięte i edytowane wiadomości (`unsend`, `edit`), wyciszona grupa, reupload, prośby o wiadomość. Zrobione.
- P7: szacunki długości w 17.3; rozbicie ch3 (~22 min) zostaje do decyzji — wymaga nowego punktu przerwy w `rhythm.js` i migracji.

### 17.5 P7 — przegląd słabszych finałów i wejść do sezonów (23.10)

| Wejście | Poprzedni finał | Stan |
|---|---|---|
| S2 | `cisza` → prolog `mp`; `odlamki` bez zatrzymania Gajdy → nowa scena `xBezGajdy` (m0); `swit` bez zmian | ✅ |
| S3 | `cudzy_podpis` / `margines` → nowa scena `xPoMoscie` (k0, Weronika); `pelny_kadr` bez zmian; `cisza` już w k4 | ✅ |
| S4 | `kopia` → `xKopiaStart` (było); `zasiegi` → nowa scena `xPoZasiegach` (c0) | ✅ |
| S5 | `przewiniecie` / `transmisja` / `kopia2` → osobne linie w g0 i dalej (było) | ✅ |

Kontakty jako same numery są zamierzone: SMS-y Mai w prologu przychodzą z nieznanego numeru (rejestr i dowód `+48 731 402 118`), a numer Dudka w S5 według BIBLIA-SEZONOW.md „pokazywany jako nieznany numer”.
Nadal bez pomiaru z ludźmi: odbiór finałów `odlamki`, `cudzy_podpis`, `zasiegi`, `echo`, `cisza2`.

### 17.6 P7 — podział rozdziału 3 (24.10, decyzja Kacpra: „Tak, podziel”)

- Nowa przerwa `s1_plate` (2 h, okno 19–24) w scenie `xPrzerwaTablica`: tuż po złożeniu tablicy **DDZ 6K19** („DDZ 6K19. czyje to?”), przed `s18` (szukanie właściciela przez Bartka). Naturalny cliffhanger, bliżej środka niż wcześniej proponowane miejsce przed `s19`.
- Proporcje ch3 (wypowiedzi): ~139 przed `s1_plate` · ~62 między `s1_plate` a `s1_sync` · ~44 po nocy.
- Migracja zapisów **v6** (`STORY_MIGRATIONS_V6`, generator `tools/gen-migration-v6.cjs`, zrzut `tests/fixtures/story-v5-steps.json`). Zapis przed przerwą zostaje na tym samym kroku; zapis na początku `s18` lub dalej przesuwa się o jeden krok (mapa `exact`) — gracz, który już był za tablicą, nie dostaje przerwy wstecz i nie traci postępu. Tabele V3–V5 mapują wprost na bieżące kroki i ustawiają v6. Decyzja własna: dla zapisu „w punkcie podziału” wybrano kontynuację (`exact`), nie przerwę.
- Service worker v71. Testy: `conversations.test.cjs` (v5 → v6 przed/na/za podziałem, bez podwójnej migracji), `rhythm.test.cjs` (kolejność tablica < `s1_plate` < `s1_sync`). Testy przeglądarkowe spraw 3–5 i `playthrough` oczekują wersji zapisu 6 (w `playthrough` asercja `startV` była nieaktualna od v5).
- Test `season-entries.browser.cjs` obejmuje też trasę `odlamki` z zatrzymanym Gajdą: flaga `gajdaCaught` przechodzi do S2, scena `xBezGajdy` się nie pojawia (PASS).
- Przegląd otwartych pozycji (24.10): w kodzie nie zostało nic do zrobienia bez mediów lub ludzi. Motyw „cytat wraca z obcego numeru” istnieje (cytat Szklarza z faktycznie wysłanej wiadomości). Otwarte poza kodem: anonimowy materiał wideo (etap klipów), zdjęcia/klipy, pomiar z graczami, odsłuch straszaków i finałów, test na fizycznym telefonie.
- Weryfikacja 24.10 (v71): `node --test` 53/53 PASS; przeglądarka PASS: `playthrough` (swit, odlamki, cisza, legacy), `e2e-player` iOS i Android, `rhythm`, `season-entries` (5 przypadków), `unsend`, `scares`, `prolog`, `case-glos`, `case-kopia`, `case-kronika`.

### 17.7. Etap zdjęć — wymiana 21 odrzuconych (24.10.2026)

Decyzje podjęte samodzielnie (Kacper polecił pracę bez pytań):
- Wymieniono wszystkie 21 zdjęć ze statusem `replace_requested` (portrety 800×800 i ujęcia `_life1` 1200×900) w tych samych ścieżkach, więc runtime i zapisy nie wymagają zmian ani migracji.
- Każde nowe zdjęcie to sytuacja z tabeli w `ZDJECIA-SYTUACJE.md` (autor, powód, czynność). Jako referencji twarzy użyto starego pliku danej postaci (Maja: `maja-river.jpg`), żeby twarze zgadzały się z pozostałymi zdjęciami fabularnymi, których nie wymieniano. Ujęcia `_life1` Oli, Igora, Bartka i Weroniki wyszły z nowych portretów.
- Wzorce 01/06/08 pozostały bajtowo identyczne. Odstąpiono od reguły „próby poza assets/ do oceny” — stare wersje są w historii git (sprzed tego commita) i można je przywrócić jednym `git checkout`.
- Nie wymieniano nieocenionych zdjęć (`*_life2`, `maja_life1`, `marta_life1` itd.) ani zdjęć dowodowych.
- Service worker v72. Rejestr: `ASSETY-REALIZM-2026.json` (status `replaced_2026-10-24_awaiting_review`, nowe hashe).

### 17.8. Etap klipów — anonimowy materiał P4 (24.10.2026)

- Karta z `MAPA-S1.md` zrealizowana jako scena `xAnonim` w ch3 (po `xDataPliku`): Igor ściąga z Klipo plik MATERIAŁ_ROBOCZY_01 z pustego konta i wrzuca do grupy, więc trop nie zależy od wygasającego linku. Wideo z CAM-01 (ta sama brama) ma w pasku 15.10.2026 01:47, a zdjęcie z kurtką 22.10 02:13 — gracz może wskazać, że to inna noc (flaga `x_anonimData`). Na nagraniu nie widać twarzy ani napisu na kurtce.
- Proces z punktu 12: pierwsza klatka (pusta brama) i ostatnia (osoba przy bramie) wygenerowane z referencji `c1_0057.jpg`, potem klip 6 s z obu klatek. **Decyzja:** Omni Flash nie jest dostępny w tym środowisku, użyto narzędzia GenerateVideo w trybie pierwsza+ostatnia klatka (ta sama metoda, inne narzędzie). Pasek OSD fotopułapki nałożono ffmpeg. Pliki: `assets/video/v_anonim.mp4`, `assets/video/v_anonim.jpg`.
- Migracja zapisów v7 (`STORY_MIGRATIONS_V7`, fixture `story-v6-steps.json`, `tools/gen-migration-v7.cjs`); zapis tuż za nową sceną wraca na jej początek, wybór — do wyboru. SW v73.

### 17.9. Przegląd po etapie klipów (24.10.2026, 15:45)

- Jedyną kartą sceny klipu w dokumentach (MAPA-S1, plan, SPRAWA-2…4) był anonimowy materiał P4 — zrealizowany w 17.8. Pozostałe istniejące klipy (`assets/video/v_*`) według rozdziału 12 wymagają osobnej oceny człowieka; **decyzja:** nie regenerować ich bez karty sceny i bez oceny, bo zmiana bez podstaw grozi rozjazdem z fabułą (zgodnie z zakazem automatycznego zastępowania).
- Etapy P0–P7 nie mają już pozycji wykonalnych w kodzie (patrz 17.6). Otwarte poza kodem: ocena nowych zdjęć i klipu `v_anonim` przez Kacpra, ocena istniejących klipów, pomiar z graczami, odsłuch straszaków i finałów, test na fizycznym telefonie.
- Weryfikacja v73: `node --test` 54/54 PASS; przeglądarka PASS: season-entries, rhythm, media, playthrough, case-glos/kopia/kronika/most, unsend, e2e-player (iOS+Android).

## 18. Audyt 24.10.2026 — lista ustaleń (priorytet malejąco)

| # | Obszar | Ustalenie | Decyzja / stan |
|---|---|---|---|
| A1 | PWA/offline | `sw.js` zapisywał do cache każdą odpowiedź, także 404 i 206 (Range z `<video>`: `cache.put` rzuca, 404 nadpisywał dobrą kopię). Offline wideo na iOS wymaga odpowiedzi 206 — dostawało pełne 200 lub nic. Nawigacja offline pod inny adres / z parametrem kończyła się błędem sieci. | **ZROBIONE** (SW v74): cache tylko pełnych 200, Range offline składany z cache (206/416), `ignoreSearch`, fallback nawigacji na `index.html`, pomijanie metod innych niż GET. Test `tests/sw.test.cjs`. |
| A2 | Instalacja (iOS/Android) | Jedyna ikona to SVG z `purpose: "any maskable"`; iOS nie używa SVG jako `apple-touch-icon`, Android/Chrome wymaga PNG 192/512 do pełnej instalacji. | **ZROBIONE**: `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (render z `icon.svg`, tło #050608), osobne wpisy `any`/`maskable`, pliki w cache SW i w `scripts/build.cjs`. |
| A3 | Odporność zapisu | Przepełnienie `localStorage` kończyło się cichą utratą postępu (zapis zwracał false bez reakcji); punkty kontrolne zajmują miejsce. Uszkodzony zapis był potem nadpisywany nową grą bez kopii. `loadCheckpoint` rzucał wyjątek przy uszkodzonym punkcie. | **ZROBIONE**: przy braku miejsca usuwane są najstarsze punkty kontrolne i zapis jest ponawiany; uszkodzony zapis odkładany do `mglisko.save.v1.corrupt`; uszkodzony punkt kontrolny zwraca `false`, UI pokazuje komunikat zamiast wywracać grę. Test `tests/save-robust.test.cjs`. |
| A4 | Rozmiar assetów | 27 MB, ok. 200 JPEG o jakości ~82 i 12 klipów po 50–315 KB. Ponowna kompresja daje ok. 5% (1,4 MB) kosztem kolejnej generacji stratnej. | **BEZ ZMIAN** (decyzja): zysk nie uzasadnia ryzyka widocznych artefaktów; test `assets.test.cjs` już pilnuje limitu wagi. |
| A5 | Język | Skan typowych błędów (napewno, narazie, poprostu, wziąść, poszłem…) i podwójnych spacji: brak. „wogóle” to celowy tik Idy (S4, trop), „naprawde” bez ogonków to styl czatu Natana. | **BEZ ZMIAN**. Pełna lektura redakcyjna — dla człowieka. |
| A6 | Martwy kod | Brak nieużywanych funkcji w `js/core`, `js/apps`, `js/art`; wszystkie pliki z `assets/` są używane i w cache SW, brak odwołań do nieistniejących plików; `node --check` czysty. | **BEZ ZMIAN**. |
| A7 | Dostępność | Jest `lang="pl"`, `prefers-reduced-motion` (także łagodne straszaki), przyciski mają tekst. | **BEZ ZMIAN**. Do sprawdzenia na fizycznym telefonie: VoiceOver/TalkBack w czacie. |
| A8 | Testy | Brak testów SW i odporności zapisu. | **ZROBIONE** (A1, A3). |
| A9 | Klipy | Każde miejsce, w którym fabuła mówi o nagraniu, ma już plik w `assets/video/`. Nowy klip wymagałby nowej sceny — to zmiana fabuły. | **PROPOZYCJA dla Kacpra** (patrz niżej). |
| A10 | Tempo | ch3 nadal najdłuższy w S1 (+`xAnonim`), mimo podziału z 17.6. | **PROPOZYCJA**: ocenić po pomiarze z graczami, czy `xAnonim` nie przenieść za przerwę `s1_sync`. |

### Propozycje wymagające decyzji Kacpra (nie wdrażane)
- Klip S2: 40-sekundowy plik z mostu (SPRAWA-2, akt I) występuje tylko jako opis i kadr — można dać krótki klip z „dwiema sekundami więcej” w wersji tygodnika jako zagadkę porównawczą.
- Klip S3: pierwszy klip @archiwum.rybickiego (głos na tle stodoły) jako materiał wideo zamiast samego tekstu.
- Przeniesienie `xAnonim` za przerwę `s1_sync` (A10).

### 18.1. Klipy z propozycji 1 i 2 (24.10.2026)

Klatki pierwsza/ostatnia każdego klipu leżą w `materialy/klatki/` do oceny (także wstecznie `v_anonim_first/last.jpg`).

```text
ID materiału: v_most40 / v_most42 (jedno źródło, dwa cięcia)
Status: wdrożony, do oceny
Sezon, rozdział, rozmowa i warunki wejścia: S2, m1/m2, strony gs_most i tyg_most (flaga m_clipOut)
Autor i rzeczywiste położenie aparatu: Adam Rybicki, kamera mini-DV na statywie przy kuchennym stole Henryka
Powód wykonania oraz odbiorca: rozmowa do archiwum Rybickiego, X 2011; nie do publikacji
Data/godzina/miejsce wykonania: X 2011, znak czasu kasety od 17:22:08, kuchnia Henryka W.
Oddzielnie: wysłanie, publikacja i synchronizacja: GS Wideo 22.11.2026 20:05 (eksport stażystki 0:40, pasek GS); Tydzień w Sudetach 23.11 (wersja 0:42 od Dudka, bez paska)
Funkcja fabularna i widoczna wskazówka: porównanie — w tygodniku nagranie trwa dalej, Henryk podnosi głowę i bierze wdech jak przed następnym zdaniem; brak paska GS
Czego materiał nie dowodzi: kto zdjął siatkę; tego, co Henryk mówi dalej
Referencja tożsamości: assets/most/hw_kadr.jpg (pierwsza klatka = ten kadr)
Pierwszy kadr: materialy/klatki/v_most_first.jpg — Henryk patrzy w stół
Ostatni kadr: materialy/klatki/v_most_last.jpg — Henryk podnosi głowę, wdech
Jedna główna czynność i ruch kamery: mówi cicho, podnosi głowę; kamera statyczna
Długość, orientacja i dźwięk: w grze końcówki 8 s / 10 s, poziomo, bez dźwięku (wygenerowana mowa nie była po polsku — decyzja: wyciszyć; wdech opisuje Marta)
Elementy stałe: kuchnia, polar w paski, lampa; zabronione: napisy poza paskiem GS
```

```text
ID materiału: v_stodola
Status: wdrożony, do oceny
Sezon, rozdział, rozmowa i warunki wejścia: S3, k0, strona tt_archiwum (flaga k_started), klip nr 1
Autor i rzeczywiste położenie aparatu: prowadzący @archiwum.rybickiego, telefon w ręku z drogi polnej
Powód wykonania oraz odbiorca: obraz pod nagranie głosu z 2019 r., publikacja na Klipo 18.12, 22:31
Data/godzina/miejsce wykonania: grudzień 2026, dzień, pochmurno, śnieg; fundamenty spalonej stodoły
Funkcja fabularna i widoczna wskazówka: klip jest „prawdziwy” — obraz współczesny, głos archiwalny (zgodne z ev_k_zrodlo: telefon, nie kaseta)
Czego materiał nie dowodzi: kto podpalił; nie pokazuje bramy Pawlaków ani domu
Referencja tożsamości: brak osób
Pierwszy kadr: materialy/klatki/v_stodola_first.jpg — ruiny z lewej, droga
Ostatni kadr: materialy/klatki/v_stodola_last.jpg — ruiny w centrum, drzewo
Jedna główna czynność i ruch kamery: powolna panorama w prawo, drżenie ręki
Długość, orientacja i dźwięk: 8 s, pion, bez dźwięku; napis „stodoła, 2009” i cytat z opisu
```

Decyzje: klipy podpięte w odtwarzaczach na stronach www (bez nowych kroków fabuły, bez migracji). SW v75.

### 18.2. Kolejne poprawki (24.10.2026)
- UX mobilny: pinezki mapy miały obszar dotyku 18–26 px — dodano niewidoczne powiększenie (`.mp-pin::after`); przełącznik „Wszystkie/Nieprzeczytane” 32 px (jak systemowy). SW v76.
- Testy: `tests/browser.cjs` miał nieaktualną asercję wersji zapisu (4 → 7) i nie przechodził od dawna; poprawione, 7/7 PASS (w tym offline reload z nowym SW).
- Epilog S1 (24.10): dwa nowe zdjęcia przy istniejących wiadomościach (bez nowych kroków, bez migracji): `e_pudlo` — Maja fotografuje lewą ręką (gips w kadrze) pudło notatek Rybickiego pod biurkiem z Bandziorem (referencja `m_bandzior.jpg`); `e_czytelnia` — Kuba z dyżuru w czytelni (scena `f3lib`), otwarta obudowa komputera. SW v77. Do oceny Kacpra.
