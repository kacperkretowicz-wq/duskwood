# ColdTrace — pogłębiony rozbiór, 27.10.2026

To rozszerzenie badania referencyjnego na gałęzi `rea`. Zawiera nowe ustalenia i korektę zbyt kategorycznego opisu płatności. Nie zmienia działania Duskwood / MGLISKA.

## Najważniejsze rozszerzenia

| Zakres | Co ustalono | Gdzie czytać |
|---|---|---|
| Oferty i przycisk X | Początkowe oferty można zamknąć i zacząć grę. Późniejsze też oddają telefon; ostatni handler cofa aktywne pytanie do progu oferty. Sam widok ceny nie dowodzi obowiązku zapłaty. | [Mechanika klienta](mechanika/ColdTrace-mechanika-klienta.md) |
| Wszystkie pobrane skrypty | 15/15 sparsowanych: 1 908 500 bajtów, 510 814 węzłów AST, 221 różnych ID modułów bundlera i 631 odwołań między modułami z obecnymi celami w snapshotcie. To pokrycie składni, nie dowód rozstrzygnięcia wszystkich dynamicznych zachowań. | [Inwentarz skryptów](pokrycie/pokrycie-15-skryptow.csv), [moduły](pokrycie/moduly-bundlera.csv) |
| Mechanika | 15 miejsc wywołania dziewięciu API, 15 rekordów persystencji, 32 przejścia i 18 miejsc telemetrii; walidacja, kody, hinty, finał, premium, rozmowy i zegary. | [Mechanika](mechanika/README.md) |
| Dane śledztw | Szczegółowa mapa ID, jawnych powiązań i pól dostępu dla siedmiu wydanych konfiguracji oraz odrębna analiza trzech niewydanych. | [Struktura spraw](dane/STRUKTURA-SPRAW-I-DOWODOW.md) |
| Trzy niewydane konfiguracje | Isla: 20 rekordów pytań, Pia: 21, Sami: 23. Razem 64 dodatkowe; z poprzednimi 147 daje to 211 rekordów w dziesięciu konfiguracjach. Flagi `released:false` i `pickerVisible:false` zachowane w opisie. | [Inwentarz](dane/unreleased-configurations.csv) |
| Struktura niewydanych konfiguracji | Pełny skan 15 JSON: 121 wystąpień ID, 55 jawnych połączeń, 20 pól progresji, 210 tablic i 1801 sprawdzonych wskaźników JSON. | [Osobny szczegółowy raport](dane/NIEWYDANE-KONFIGURACJE-SZCZEGOLY.md) |
| Obraz, dźwięk, interakcje | Specyfikacja animacji, hit areas, stories, mediów, waveformu i dostępności. 400 deklaracji button, 749 właściwości stylów i 38 miejsc timerów w czterech chunkach. | [Specyfikacja UI](ui/SPECYFIKACJA-UI-I-MEDIOW.md) |
| Dodatkowe pliki | Pobrano 349 nowych plików: 345 WebP, 2 MP3, 2 PDF. Do katalogu dołączono 347 mediów; PDF-y opisano, oryginały pozostały lokalnie. | [Katalog](multimedia/katalog.html), [manifest](pokrycie/dodatkowe-multimedia.csv) |
| Języki WWW | Klient deklaruje osiem wariantów języka, bez `pl`: en/fr/es/it/id/de/pt/pt_BR. Osiem UI ma po 593 klucze i zgodne placeholdery; osiem flow ma 133 lub 134 pola. | [Audyt lokalizacji](pokrycie/lokalizacja-pokrycie.csv) |

## Co oznacza „wszystko” w dostępnym materiale

Obecna kolekcja ma **2024 opublikowane pliki multimedialne**: 1677 z pierwszego pakietu i 347 z tego rozszerzenia. Do tego 147 SVG odtworzonych w poprzednim etapie. Łącznie zachowano lokalnie 96 różnych plików JSON: 67 z pierwszego etapu oraz 29 nowych (15 dla niewydanych konfiguracji i 14 dodatkowych wariantów UI/flow). Te liczby odnoszą się do zdobytych snapshotów; nie są deklaracją pełnego archiwum serwera ani wszystkich tłumaczeń scenariuszy.

Nieprzyznane przez backend ukryte zdjęcia lub notatki mogą być zwracane dopiero po prawidłowym odblokowaniu. Pełne reguły `/api/answer`, `/api/unlock`, `/api/hint` i `/api/accuse` nie są zawarte w publicznych rekordach pytań. Nie zastępuję ich zgadywaniem: raport odtwarza dokładne żądania i interpretację odpowiedzi, a nie niepozyskany kod serwera.

## Korekta obserwacji płatności

26.10 potwierdzono cztery poprawne odpowiedzi Noor i pojawienie się kolejnej oferty. Nie wykonano wtedy całej sekwencji jej zamknięcia. Wcześniejsze stwierdzenie, że samo jej pojawienie dowodziło obowiązku zapłaty, było nieuprawnione.

27.10 użytkownik zgłosił, że X pozwoliło mu grać dalej bez zakupu. Statyczny przepływ klienta potwierdza darmowe przejście przez początkowe oferty i możliwość powrotu do telefonu z późniejszych ofert. Dalszy postęp numeru pytania jest osobną kwestią: handler późniejszego zamknięcia zapisuje z powrotem indeks graniczny. Nie wykonano nowego testu w sesji użytkownika. Sterowanie lokalną przeglądarką było wyłączone w Work; nie obchodzono tego ustawienia.

Właściwy następny test runtime: przy późniejszej ofercie przejść normalnymi przyciskami X/pomiń, zanotować numer pytania, obejrzeć telefon, ponownie otworzyć przewodnika i sprawdzić numer następnego pytania po prawidłowej odpowiedzi. Bez zmiany zapisu, wymuszania premium lub zastępowania odpowiedzi serwera.

## Nowe szczegóły, które zmieniają interpretację dowodów

- Część godzin rozmów jest deterministycznie dopisywana przez klienta, gdy brakuje dat. Nie wolno automatycznie budować z nich kanonicznej osi czasu.
- Waveform nagrań jest dekoracyjnym układem 28 słupków, choć odtwarzane audio i seek są rzeczywiste. Wysokości słupków nie opisują sygnału.
- Info zdjęcia pochodzi z fabularnego JSON. Sam panel nie dowodzi odczytu EXIF.
- Niektóre dokumenty są komponentami tekstowymi/JSX; nazwa zakończona `.pdf` albo `.png` w danych nie wystarcza do stwierdzenia formatu pliku.
- Dwa nowe PDF-y Sami są rzeczywistymi dwustronicowymi dokumentami A4, bez szyfrowania, z producentem WeasyPrint 62.3. Pierwsze strony obejrzano po renderze. Pierwszy używa formalnego układu certyfikatu i tabeli inspekcji, drugi układu audytu kosztów z tabelą i wyróżnionymi sumami. To elementy fikcji gry, nie dokumenty urzędowe ani dowód stosu technologicznego całej aplikacji.
- Dwa dodatkowe nagrania mają długości 32,131 s i 4,780 s, MP3 mono 44,1 kHz. Parametry odczytano z plików, nie z fabularnych etykiet czasu.
- Publiczny klient WWW normalizuje nieobsługiwany język do angielskiego. Brak `pl` w tym snapshotcie nie rozstrzyga lokalizacji aplikacji iOS.

## Weryfikacja i pozostały zakres

Sprawdzono hashe źródeł i mediów, parsowanie 15 JS, wskaźniki JSON, zakresy UTF16 oraz istnienie plików katalogu. Dodatkowe REA zbadało 11 wcześniej pominiętych skryptów; jeden duży moduł frameworka przekroczył limit pamięci narzędzia. Niezależny parser AST odczytał wszystkie 15 plików, w tym ten moduł. To uzupełnia inwentarz składniowy; pełny graf semantyczny REA nadal ma ograniczenia i jest tak opisany w [metadanych](pokrycie/REA-rozszerzenie-zakres.json).

Nie ma pomiarów fizycznego iPhone'a, binarium IPA ani kodu backendu. Nie oznaczono statycznych ustaleń jako ukończonych testów płatnej lub darmowej rozgrywki. Oryginalne scenariusze, fonty, pełne PDF-y, kod klienta i duże grafy REA pozostają materiałem roboczym; publikowane są autorskie opracowania i strukturalne inwentarze. Materiały ColdTrace pochodzą z publicznych odwołań Saclic Studio; nie zostały włączone do zasobów produkcyjnych MGLISKA.
