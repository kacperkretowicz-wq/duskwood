# ColdTrace — szczegółowy rozbiór systemów

Druga warstwa analizy, 26.10.2026. Dotyczy dostarczonego klienta WWW i jego publicznych danych. Obserwacje wykonania obejmują pierwsze cztery pytania Noor; pozostałe ustalenia pochodzą ze statycznej analizy. Nie jest to dekompilacja wydania iOS.

## 1. Faktyczna skala i podział materiału

- **7 wydanych konfiguracji spraw** i trzy dodatkowe konfiguracje z wyłączonym wydaniem.
- **48 różnych identyfikatorów aplikacji** w wydanych konfiguracjach.
- **57 gałęzi głównego routera ekranu**, wliczając ekran blokady, ekran główny, szczegóły notatki/wiadomości i finał. Liczba gałęzi nie jest liczbą odrębnych, kompletnych aplikacji.
- **440 nazwanych deklaracji funkcji** w czterech zbadanych plikach; **287** ma wywołania JSX we własnym ciele. To kandydaci komponentów i pomocnicy, także ikony, a nie 287 ekranów.
- **67 pobranych plików JSON**, **7991 ścieżek schematu**, **1266 wystąpień tablic** i **3031 rekordów z polami daty/godziny**. Są to policzone rekordy w snapshotcie, bez deduplikacji świata fabularnego.
- **147 rekordów pytań** w publicznych scenariuszach. Kod kończy etap wpisywania odpowiedzi po przedostatnim indeksie i uruchamia osobny ekran oskarżenia. Statyczny układ odpowiada więc **140 etapom odpowiedzi tekstowych i siedmiu finałom**, mimo mianownika obejmującego pełną listę pytań.

Źródła: `macierz-spraw-i-aplikacji.csv`, `mapa-stanow-ekranow.csv`, `indeks-funkcji-klienta.csv`, `schematy-danych.csv`. Liczniki są związane z konkretnym pobraniem; nie dowodzą kompletności chronionych materiałów serwera.

## 2. Przepływ od wejścia do finału

```text
Lista spraw
  → samouczek
  → oferta początkowa
      → zamknięcie → kolejna oferta → zamknięcie
  → rozmowa z przewodnikiem
  → animacja przygotowania telefonu
  → ekran blokady → rzeczywisty gest przesunięcia
  → ekran główny
      ↔ aplikacje i ich podwidoki
      ↔ panel aktualnego pytania
          → wysłanie odpowiedzi do serwera
          → błąd / korekta / podpowiedź / zaliczenie
          → następny etap albo ograniczenie dostępu
  → finał wyboru osób
  → werdykt serwera i wyjaśnienia
```

Wykonano ścieżkę do pierwszego ograniczenia postępu. Przebieg od finału do werdyktu jest potwierdzony w kodzie, nie pełnym przejściem gry.

Warto rozdzielać trzy rzeczy: **nawigację po telefonie**, **postęp w pytaniach** i **dostęp do dalszej treści**. Są osobnymi stanami. To, że gracz może otworzyć kilka aplikacji przed rozwiązaniem pytania, nie dowodzi dowolnego porządku rozwiązywania całego scenariusza.

## 3. Trzy poziomy funkcjonalności aplikacji

### Nośniki dowodów

Messages, Notes, Mail, Calendar, Photos, nagrania i wybrane aplikacje specjalne zawierają materiał potrzebny do konkretnych wniosków. Wpisy mają różne reprezentacje: rozmowa, formalny dokument, prywatna instrukcja, obraz, log lub nagranie. Odczytywanie ich jest zasadniczą rozgrywką.

### Działające lokalne mini-narzędzia

Kalkulator wykonuje działania, mini-gry mają lokalny stan i animację, część przełączników zmienia ekran. Nie oznacza to integracji z systemem telefonu ani serwerem danej marki. Przykład z kodu kalkulatora: dzielenie przez zero zwraca 0. Jest to uproszczenie implementacyjne, nie reguła matematyczna.

### Elementy budujące wrażenie telefonu

W zbadanym komponencie Spotify przycisk zmienia stan ikony. Nie ma tam silnika odtwarzania utworu. Ekran YouTube po wyborze pozycji pokazuje miniaturę i informacje, bez elementu odtwarzania filmu. Aparat ma czarny wizjer i migawkę bez handlera zdjęcia. To celowe lub niedokończone uproszczenia widoczne w kodzie; nie przebadano ich na iOS.

**Wniosek projektowy:** duży telefon nie wymaga kilkudziesięciu pełnych odpowiedników prawdziwych usług. Wymaga przekonującej nawigacji i odpowiednio głębokich interakcji tam, gdzie gracz rzeczywiście szuka dowodu. `48-aplikacji-szczegolowo.csv` opisuje cel, stany, kontrolki i ograniczenia każdej z 48 aplikacji.

## 4. Rekord danych i jego reprezentacja

Główne dane sprawy zawierają osobne warstwy:

| Warstwa | Co reprezentuje | Co jest ważne w rekonstrukcji |
|---|---|---|
| `introChat` | Sekwencja wprowadzenia | Rodzaj kroku, pauza, wybór, przekazanie telefonu |
| `questions` | Kolejność celów dedukcji | Identyfikator, polecenie, reakcja przewodnika |
| `phoneData` | Archiwum codziennych aplikacji | Wątki, notatki, e-maile, połączenia, kalendarz, historia |
| `contacts` | Relacje widoczne przez telefon | Identyfikatory, przypisanie do kanału, wygląd kontaktu |
| `photos.visible` | Jawny zbiór fotografii | Logiczna ścieżka, adres pliku, przynależność do albumu |
| `locks` | Deklaracja blokowanych ekranów | Cel blokady i długość kodu; nie zawsze kompletna treść |
| `chrome` | Wygląd i tożsamość telefonu | Tapeta, urządzenie, region i wybrane widgety |
| Osobne pliki aplikacji | Dane specyficzne dla sprawy | Własne formaty komunikatorów, banku, logów i profili |

Nie wszystkie dane pochodzą z JSON. Bank i Health Noor mają w skrypcie wartości awaryjne. Gdy odpowiedni plik nie jest dostępny, komponent może pokazać te wartości. Dlatego archiwum samych JSON-ów nie wystarcza do odtworzenia widocznego telefonu.

## 5. Prawdziwe zależności od postępu

Poniższe indeksy są **liczone od zera** w kodzie. Nie są numerami ekranu wyświetlanymi graczowi.

| Sprawa | Warunek | Skutek zapisany w kliencie |
|---|---|---|
| Ava | Indeks pytania co najmniej 11 | Nieznany numer może być widoczny i przypinany |
| Ava | Progi wyborów 12, 13, 15 i 17 | Cztery kolejne punkty odpowiedzi w specjalnym wątku |
| Ghost | Indeks co najmniej 6 | Dodatkowa notatka przechodzi filtr widoczności |
| Ghost | Indeks co najmniej 11 | Pierwszy poziom zmiany zakłóceń nagrania |
| Ghost | Indeks co najmniej 17 | Kolejny poziom zmiany zakłóceń nagrania |
| Wybrane aplikacje | Udane `/api/unlock` | Lokalny stan otwartego schowka lub rozmów |
| Wszystkie sprawy | Osiągnięcie końcowego indeksu | Przejście do oskarżenia zamiast zwykłego formularza |

Specjalny wątek Avy jest zapisany w `ava-burner.json`. Ma cztery punkty wyboru i łącznie dziesięć opcji. Wybrana opcja dopisuje wypowiedź gracza i ustaloną odpowiedź; wybory zapamiętywane są lokalnie. Ta ścieżka jest znacznie bogatsza od biernego archiwum wiadomości, ale nie znaleziono w niej dowodu generowania odpowiedzi przez model językowy.

Wspólny renderer zawiera również mechanizm usuwania danych i trybu samolotowego dla Pia. Konfiguracja Pia nie jest wydana i nie jest widoczna w pickerze. Nie wolno z samej obecności tego kodu wyciągać wniosku, że wszystkie dostępne sprawy mają aktywne zdalne kasowanie telefonu.

## 6. Tempo rozmów — istotna korekta

Pole `delayMs` nie jest końcowym czasem czekania. Klient bierze większą z wartości zadeklarowanej i czasu zależnego od długości tekstu, a następnie mnoży ją przez 0,8. Składnik długości ma ograniczenie od 1400 do 5200 ms i wynika z około 900 ms plus 22 ms na znak UTF-16. Po wybraniu odpowiedzi dochodzi 400 ms przed wznowieniem sekwencji.

| Sprawa | Suma opóźnień po zastosowaniu tej reguły, z 400 ms na wybór |
|---|---:|
| Noor | 43,787 s |
| Felix | 39,325 s |
| Rei | 43,571 s |
| Liv | 28,390 s |
| Ghost | 29,931 s |
| Ava | 18,246 s |
| Wren | 12,710 s |

To obliczenie z kodu i danych, nie zmierzony czas ludzkiego przejścia. Nie obejmuje czasu czytania i decyzji. W intro renderer wybiera dwa warianty z danego kroku i po wyborze wraca do tej samej kolejnej pozycji skryptu. Zatem punkty wyboru służą głównie uczestnictwu i tonowi rozmowy, a nie stanowią dowodu rozgałęzionego drzewa fabuły.

## 7. Panel pytania, błąd i podpowiedź

Panel zajmuje w kodzie około 86% wysokości telefonu. Rozdziela kontekst od ostatniego zdania polecenia, a pole odpowiedzi ma stany: spoczynek, wysyłanie, błąd i sukces. Klient przycina białe znaki i nie wysyła pustego tekstu. W czasie żądania blokuje kolejne wysłanie.

Niepoprawna odpowiedź może dostarczyć krótką korektę. Po dwóch próbach klient pokazuje przycisk podpowiedzi, a serwer może również otworzyć podpowiedź od razu. Kolejne żądanie zawiera poziom i liczbę prób. Zmiana pytania resetuje lokalny stan formularza. Dzielenie polecenia na kontekst i pytanie jest heurystyką opartą o interpunkcję, więc nie jest ręcznie zdefiniowaną strukturą każdego zdania.

Funkcja udostępniania przygotowuje numer i samą część pytającą. Korzysta z systemowego udostępniania albo schowka. Nie uruchamiano udostępniania podczas badania.

**Statyczne ryzyko obsługi awarii:** w wysyłaniu odpowiedzi występuje `finally` zdejmujące blokadę, ale brak lokalnego `catch` wyświetlającego wyjaśnienie błędu sieci. W klawiaturze PIN `await` nie jest osłonięty taką samą konstrukcją. Odrzucona obietnica może pozostawić jej stan oczekiwania. Są to wnioski z kodu, nie odtworzone awarie podczas tej sesji.

## 8. Blokada nie oznacza jednego rodzaju ochrony

Większość zbadanych komponentów odblokowania wysyła kod do serwera. Sam publiczny plik nie pozwala więc odtworzyć wszystkich chronionych odpowiedzi. Jednak część publicznych danych zawiera też pola o nazwach `password`, `deletedAlbumPin` lub `sharedAccessCode`.

Przykład: Rei ma pole `password` w danych KakaoTalk, a jego komponent i tak wykonuje żądanie walidacji do serwera. Samo znalezienie pola nie dowodzi, że jest ono aktualnym sekretem backendu. Nie testowano go przez obchodzenie przebiegu gry. `blokady-i-walidacja.csv` wskazuje miejsca występowania takich pól bez rozpowszechniania ich wartości.

Klawiatura PIN dodaje cyfry, wysyła po osiągnięciu określonej długości, pokazuje błąd przez zmianę koloru i potrząśnięcie, a po około 420 ms zeruje wpis. To samodzielny komponent interakcji. Chroniona treść może być przechowywana w pamięci komponentu; nie potwierdzono pełnego zachowania po odświeżeniu i ponownym uruchomieniu.

## 9. Zdjęcie, metadane i film

Galeria przechodzi od albumów przez siatkę do podglądu. W podglądzie kliknięcie zmienia skalę z 1× na 3×, a przejście do sąsiedniego zdjęcia resetuje powiększenie. Wybrane pliki otrzymują przycisk informacji.

**Istotne:** w zbadanej ścieżce daty i lokalizacja w panelu Info pochodzą z dodatkowego JSON-u dopasowanego do sufiksu nazwy zasobu. Nie wykazano odczytywania EXIF. Dlatego analiza pliku obrazu w systemowym programie może nie ujawnić danych, które gra pokazuje jako metadane dowodowe.

Film Wren wybierany jest przez dopasowanie grafiki plakatu i źródła w dodatkowych danych. Pobierany MP4 ma 8 sekund, 720 × 1280 px, obraz H.264 i ścieżkę AAC. Obejrzano zestaw czterech klatek: przy ognisku mężczyzna wchodzi w kadr i zbliża się do kamery; widoczna jest czapka. To materiał związany z zagadką identyfikacyjną. Samo zobaczenie klatek nie potwierdza wszystkich szczegółów akcji ani pełnej zgodności dźwięku.

Drugi MP4 ma około 1,035 s, 480 × 848 px i pełni rolę efektu glitch. Nie należy liczyć go jako drugiej pełnej sceny fabularnej. Wiele obiektów nazywanych w danych „video” jest kartami z miniaturą i czasem, nie osobnym plikiem filmowym.

## 10. Dźwięk i transkrypcje

Zidentyfikowano 72 pliki audio: 68 MP3 i cztery WAV. Ich łączny czas to około 22 minuty 15 sekund. Dla 69 adresów znaleziono powiązany tekst w polu transkrypcji. Trzy pozostałe nie mają takiego powiązania w zbadanych JSON-ach; nie oznacza to brakującej fabuły, ponieważ katalog obejmuje też dźwięki interfejsu.

Nagłówki transkrypcji nie zawsze zgadzają się z techniczną długością pliku. Przykładowo jeden opis zawiera 0:50 przy pliku trwającym 23,88 s, inny 0:55 przy 22,476 s. Są to różnice między tekstem a kontenerem audio. Bez sprawdzenia faktycznie wyświetlanego playera i pełnego odsłuchu nie nazywam ich automatycznie widocznymi błędami interfejsu. Dokładne referencje zawiera `analiza-audio.csv`.

Nie ustalono aktorów głosowych, narzędzia TTS ani sposobu wytworzenia nagrań. Nazwa pliku, brzmienie lub estetyka nie wystarczają do takiej identyfikacji.

## 11. Grafika, fonty i wektory

Przegląd próbki zasobów pokazuje kilka różnych ról: okładka sprawy, fotografia codzienna, dokument/ekran dowodowy, tapeta i plansza. Nie należy utożsamiać okładki z kanonicznym portretem osoby: niektóre okładki przedstawiają scenę lub plakat z tytułem.

CSS deklaruje cztery zewnętrzne kroje: BebasNeue, InstrumentSerif w kursywie, Caveat i SFEspionage. Treść wewnętrznych aplikacji korzysta także ze stosu fontów systemowych. `typografia.csv` zapisuje adresy, rozmiary i hashe plików. Dostępność pliku nie jest licencją do ponownego wykorzystania.

Ze skryptu bez jego uruchamiania odtworzono **147 unikalnych fragmentów SVG** pochodzących ze **173 wystąpień**. Wykryto 284 kandydatów; 111 zawierało zależności dynamiczne i nie zostało automatycznie odtworzonych. Zachowano literalne atrybuty i figury, pominięto zachowanie zdarzeń oraz klasy CSS. Kolor zależny od `currentColor` i otaczającego CSS może zatem różnić się od oryginalnego ekranu. To odzyskane fragmenty wektorowe, nie kompletna biblioteka wizualna gry.

## 12. Czego nie można odczytać z 3031 dat

Rekordy zawierają daty bez roku, samą godzinę, etykietę dnia albo opis czasu względnego. Dane nie tworzą jednej automatycznie poprawnej osi czasu. Dopisanie każdemu wpisowi bieżącego roku fałszowałoby śledztwo. `indeks-znacznikow-czasu.csv` zachowuje literalne etykiety i wskaźnik do rekordu; nie udaje gotowej chronologii kryminalistycznej.

Przy rekonstrukcji własnego systemu trzeba rozdzielić: czas wydarzenia, czas zapisania pliku, czas publikacji, czas odbioru i czas bieżącego telefonu. Wren i Ghost opierają część dedukcji właśnie na tych rozbieżnościach. Przypisanie wszystkich pięciu znaczeń do jednego pola daty zniszczyłoby te zagadki.

## 13. Finał i trwałość postępu

Ekran oskarżenia ogranicza liczbę zaznaczonych osób do `requiredCount`. Noor, Felix, Rei, Liv i Ghost wymagają dwóch wskazań; Ava i Wren jednego. Po wysłaniu lista identyfikatorów trafia do serwera. Klient wyświetla wynik, werdykt i wyjaśnienie dla poszczególnych osób. Błędny finał pozwala spróbować ponownie, a poprawny uruchamia callback zamknięcia/resetu sprawy.

Postęp ma klucze zależne od sprawy. Wybory w anonimowej rozmowie Avy mają własny zapis. Znaleziono również lokalny zapis wariantu miejsca oferty. Te mechanizmy odpowiadają za trwałość po stronie klienta; nie dowodzą synchronizacji między urządzeniami. Stan zakupu jest odpytywany osobno, a cały backend rozliczeniowy nie został odzyskany.

## 14. Dokument PDF jako złożony dowód

Zbadany PDF Felix ma cztery strony, format 612 × 792 punktów i nie jest zaszyfrowany. Zawiera kolejno streszczenie, powtarzalny wzorzec w tabeli, połączenie instytucji i osób oraz osobistą instrukcję autora. To dobry przykład dokumentu, który najpierw scala fakty, a dopiero na końcu nadaje im emocjonalny ciężar. Treść odsyła także do innych aplikacji i zawiera fabularne informacje potrzebne do dostępu; nie jest samą dekoracją.

Warstwa techniczna ma producenta PDF wskazanego jako ReportLab. Nie dowodzi to użycia Pythona jako silnika gry. Data utworzenia dokumentu w metadanych dotyczy produkcji pliku w 2026 r., podczas gdy treść operuje datą fabularną z 2024 r. Są to różne znaczenia czasu. Zawartość odczytano, wszystkie cztery strony wyrenderowano, a pierwszą obejrzano wizualnie. Nie potwierdzono normalnego dotarcia do tego dokumentu w płatnym przebiegu Felix. Oryginał zachowano w materiale roboczym; do inwentarza trafia metadana i opis roli, bez kopiowania pełnego tekstu dokumentu.

## 15. Granice dalszego badania

Do pełnego rozbioru iOS nadal potrzebne są pakiet aplikacji z własnej instalacji i obserwacja urządzenia. Do pełnego przebiegu scenariuszy potrzebny jest normalny dostęp do dalszej gry. W tym badaniu nie aktywowano abonamentu, nie zmieniano lokalnego stanu w celu ominięcia oferty i nie odgadywano kodów seryjnie.

Zachowano materiał pozwalający kontynuować bez rozpoczynania od nowa: hashe źródeł, pliki danych, kod klienta, katalog mediów, cztery rekordy Evidence z REA i indeks funkcji. Wśród materiałów wynikowych są autorskie opisy i inwentarze; pełne oryginalne dialogi oraz odpowiedzi serwerowe nie zostały przedstawione jako gotowa kopia gry.

Źródła główne: [oficjalna gra WWW](https://coldtrace.co/cases), [App Store](https://apps.apple.com/pl/app/id6762513021). Dokładne odniesienia do funkcji, zakresów UTF-16 i pól JSON znajdują się w towarzyszących CSV. Zakresy odnoszą się do bajtowo zidentyfikowanego snapshotu i nie zachowują ważności po zmianie skryptu przez producenta.
