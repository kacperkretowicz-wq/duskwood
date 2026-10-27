# ColdTrace — minigry, dostępność z ekranu telefonu i zachowanie

Uzupełnienie audytu statycznego klienta WWW z 26.10.2026. Główny analizowany plik: `sources/_next/static/chunks/1pfbqbd-z0uj8.js`, SHA-256 `f2b135e33cf64853f0b6e77516adeba23800bcda6eef8e24bf77f365505d57de`. Wartości pozycji w tym raporcie to offsety **UTF-16** oryginalnego pliku, nie pozycje bajtów. Nie wykonano pobranego JavaScriptu podczas analizy składniowej.

W tabelach `minigry-zasiegi.csv`, `home-tiles.csv` i `minigry-mechanika.csv` dane pochodzą z rejestru, deklaracji układów, routera i konkretnych funkcji. Kolumna `render_mode` rozróżnia zwykłe renderowanie kafelków od stron zastąpionych osobnym układem collage w Isla i pierwszych dwóch stron Ava. Deklaracji funkcji i ikon nie należy utożsamiać z potwierdzonym przejściem wszystkich gier na żywo.

## Korekta: `surfaces` nie jest pełnym spisem ikon

W poprzednim etapie sam rejestr `surfaces` posłużył do mapowania dostępności; nie zawiera on jednak wszystkich kafelków. Każda sprawa ma też osobną konfigurację stron i doku `ea` (od `42019`). `tN` (`125003–132085`) dla zwykłych stron renderuje kafelki z `ea[case].pages`, a `tf` (`121937`) przekazuje ich `app` do handlera otwierającego. `surfaces` jest osobno używane np. do przycisku tablicy, lecz nie filtruje każdej pozycji normalnej siatki.

| Sprawa | Ikony obecne w zwykłej siatce, lecz nie w `surfaces` | Pozycje UTF-16 |
|---|---|---|
| Ghost | Tetris, Pac-Man | `51766`, `51838` |
| Wren | Tic-Tac-Toe, Tetris | `54081`, `54152` |

Każdy z tych identyfikatorów ma odpowiadającą gałąź głównego routera `rY`: Tetris `627112`, Pac-Man `627164`, Tic-Tac-Toe `625145`. Układy Ghost i Wren przechodzą w tym miejscu przez zwykłą mapę kafelków, a nie wyjątek collage Isla/Ava. To mocny dowód **statycznej ścieżki** ikona → otwarcie → komponent; nie zastępuje testu kliknięcia na ekranie w konkretnej wersji gry.

Parser zebrał **185 literalnych rekordów kafelków i doku** z dziesięciu układów, bez nierozpoznanych wpisów w samych deklaracjach. W siedmiu wydanych konfiguracjach znalazł dokładnie **cztery wystąpienia na zwykłych stronach**, których `app` nie widnieje w `surfaces`: cztery z tabeli. Liczba 185 nie obejmuje automatycznie wszystkich elementów renderowanych przez dedykowane komponenty collage i widgety. `home-tiles.csv` zachowuje pozycję i źródło każdej deklaracji.

Rejestr siedmiu wydanych spraw zawiera **48 różnych identyfikatorów `surfaces`**. Unia tych identyfikatorów i literalnych identyfikatorów kafelków/doku tych samych spraw wynosi **49**; dodatkowym względem rejestru ID jest `pacman`. Jest to policzona unia dwóch zbadanych źródeł statycznych, a nie stwierdzenie, że wszystkie 49 aplikacji zostało uruchomionych lub że osobne widgety nie mają dalszych ścieżek.

W wcześniejszym `klasyfikacja-zasobow.csv` plik `media/8bd434ac1f15b4fb-app_pacman.webp` otrzymał heurystyczną etykietę „gallery or social image”. Deklaracja kafelka Ghost pod offsetem `51838` wskazuje go jako **ikonę aplikacji Pac-Man**, co poprawia tę pojedynczą klasyfikację. Tożsamość pliku pozostaje bez zmian; błąd dotyczył roli, a nie pobranego obrazu.

## Mapa ośmiu komponentów minigier

Kolumna „ikony” to statycznie zadeklarowane pozycje zwykłych stron, nie wyniki pełnego testu dostępności w urządzeniu. Wszystkie pozycje w tabeli to sprawy z `released:true` i `pickerVisible:true` w pobranym rejestrze.

| Minigra | Sprawy z ikoną | Mechanika w kodzie |
|---|---|---|
| Snake | Noor, Rei | Plansza 15×22; ruch co 170 ms; 100 pkt za pokarm; D-pad i klawiatura. |
| Tic-Tac-Toe | Noor, Felix, Wren | Plansza 3×3; bot najpierw szuka zwycięstwa, potem blokuje, następnie preferuje środek/narożniki. |
| Tetris | Ghost, Ava, Wren | Plansza 10×18; spadanie co 450 ms; 100 pkt za wiersz; obrót i szybki zrzut. |
| Pac-Man | Ghost | Siatka na canvasie, krok co 180 ms; 10 pkt za punkt; jeden duch i przyciski kierunku. |
| Flappy Bird | Felix, Ava | Canvas 390×520; klik/pointer, rury, licznik i kolizje. |
| Car Racing | Rei | Canvas 390×520, trzy pasy; klik zmienia pas cyklicznie. |
| Brick Breaker | Liv | Canvas 390×640; kierunek wskaźnikiem i salwa 12 piłek. |
| Space Shooter | Liv | Canvas 390×640; 18 przeciwników i automatyczne strzały co 0,45 s. |

Stała zmiana o 2,4 px na klatkę rur Flappy Bird i o 5 px na klatkę w Car Racing oznacza w kodzie zależność od liczby klatek; Space Shooter oblicza deltę czasu i ogranicza ją do 0,04 s. Zjawisko i jego wpływ na urządzenia o różnym odświeżaniu wymagają pomiarów, nie wynikają same z zadanego `requestAnimationFrame`. Źródła odpowiednio: `rv 558821–561408`, `r_ 597449–599629`, `rT 603206–606554`.

## Tic-Tac-Toe: pomiar runtime i wniosek statyczny

W testowanej sesji WWW w sprawie Noor otwarto Tic-Tac-Toe, wykonano ruch i zaobserwowano odpowiedź komputera. Powrót w trakcie meczu pokazał dialog informujący, że wyjście zostanie policzone jako przegrana; po wybraniu potwierdzenia gra wróciła do telefonu. Ponowne uruchomienie pokazało nową pustą planszę. Zrzut sesji: `../runtime/tictactoe-wyjscie.png`. Ten pomiar nie pokazuje żadnego licznika przegranych, ale nie jest dowodem, że zewnętrzny system go nie zapisuje.

Osobno, w odczytanej funkcji `nR 421593–426282` przycisk potwierdzenia dialogu wywołuje `onBack`, a w `rY` dla tej gry `onBack` prowadzi do ustawienia ekranu `home`. W tej ścieżce nie znaleziono bezpośredniego zapisu przegranej ani żądania sieciowego. To dotyczy zbadanej implementacji klienta i nie stanowi twierdzenia o każdym możliwym zewnętrznym systemie telemetrycznym.

## Trzy kandydaty błędów do potwierdzenia na żywo

1. **Tetris: Game Over i zamknięcie wartości stanu.** `rg 551801–554920` tworzy interwał w efekcie bez zależności i przekazuje mu funkcję `u`, której warunek końca czyta `c` z pierwszego renderu. Zmiana `c` przez setter przy pojawieniu się Game Over nie aktualizuje przechwyconej przez ten interwał wartości. To statyczny powód, dla którego pętla może wykonywać ruch po pokazaniu końca gry; nie zarejestrowano jeszcze zachowania na ekranie. Interwał jest czyszczony przy odmontowaniu komponentu.
2. **Brick Breaker: restart bez odbudowy planszy.** `rz 599629–603206` w handlerze `j` resetuje wynik, poziom i fazę, ale nie generuje ponownie tablicy `m.current` ani nie czyści wszystkich referencji stanu gry. Generator planszy jest wewnątrz efektu uruchamianego po montowaniu. Po restarcie może więc pozostać poprzedni układ klocków, mimo widocznego poziomu 1. Wymagany test: doprowadzić do Game Over, wybrać retry i porównać klocki oraz kolejny przebieg.
3. **Pac-Man: pogoń ducha w tej samej kolumnie.** `rN 555289–558821` najpierw wyznacza ruch ducha po osi X; po osi Y próbuje ruszyć tylko wtedy, gdy kandydat po X jest ścianą. Jeśli gracz i duch są w tej samej kolumnie, kandydat po X jest bieżącym polem ducha, więc na wolnym polu ten wariant zachowuje obecną pozycję Y. Potrzebny test ułożenia pionowego; jest to wniosek z warunków, a nie nagranie zaobserwowanej usterki.

W kodzie Pac-Mana oba rodzaje znaków punktów `.` i `o` są dodawane do tego samego zbioru i usuwane z identycznym przyrostem 10 pkt. W odczytanej funkcji nie znaleziono rozróżnienia działania większego punktu ani warunku końca po opróżnieniu tego zbioru. To ograniczenie dotyczy tylko konkretnej funkcji `rN` w tym snapshotcie.

## Kalkulator i odtwarzacz Music

Kalkulator `nU 426646–428890` ma działające lokalne operacje `+`, `−`, `×`, `÷`, zmianę znaku, procent i kropkę. Wprowadzanie cyfr jest obcinane do 12 znaków. Kod przypisuje wynik dzielenia przez zero jako `0`. Wciśnięcie kolejnego operatora zastępuje zapamiętany operand wartością z wyświetlacza bez wcześniejszego obliczenia poprzedniej operacji; przykładowa sekwencja `2 + 3 + 4 =` według odczytanej ścieżki daje 7, a nie 9. To statycznie prześledzony przepływ, bez testu na żywo. Funkcja formatowania `n$ 426373–426518` skraca część wyników przez precyzję 10 cyfr.

Komponent Music `nJ 435952–438781`, wskazany w konfiguracji niewydanej Isla, ma ikonę odtwarzania i przycisk zmiany jej stanu. Pasek jest statycznie ustawiony na 34%, etykiety czasu są stałe, a w funkcji nie ma elementu audio ani uruchomienia odtwarzania. To dodatkowy przykład różnicy między estetyką aplikacji a rzeczywistą operacją; nie jest to ocena całego systemu audio gry.

## Co z wynikami i czego nie dowodzi analiza

W ośmiu dokładnie wskazanych funkcjach minigier nie ma bezpośredniego `localStorage` ani `fetch`. Ich widoczne wyniki są stanem komponentów, a podpisy rodzica zawierają `onBack` i `ui`. Router zastępuje komponent minigry ekranem `home`, więc ponowne wejście wytwarza nową instancję. Nie wyklucza to niezależnego zapisu lub telemetrii w innych częściach klienta albo serwera; nie badano pełnego backendu.

Nie zweryfikowano w runtime Ghost Pac-Mana, Tetrisa, Brick Breakera, różnych częstotliwości odświeżania, klawiatury na urządzeniu ani całej powierzchni aplikacji iOS. Zbiór ten jest pogłębieniem rozbioru udostępnionego klienta WWW, nie dowodem kompletnego zachowania platform mobilnych.
