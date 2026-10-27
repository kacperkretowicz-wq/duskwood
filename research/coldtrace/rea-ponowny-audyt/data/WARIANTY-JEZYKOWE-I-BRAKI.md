# ColdTrace — komplet wariantów językowych znanych ścieżek danych

Badanie statyczne i odczyt publicznych plików: 27.10.2026. Źródłem wzorców jest pozyskany klient WWW, a nie aplikacja iOS. Pobierano tylko ścieżki wynikające z rejestru dziesięciu konfiguracji, ośmiu wariantów języka i funkcji `casePaths`. Nie wysyłano prób odpowiedzi, PIN-ów ani żądań zakupowych. Przedstawione tu liczniki opisują pliki i referencje, nie przejście gry.

## 1. Nowy zakres

Wcześniejsza analiza obejmowała scenariusze głównie po angielsku oraz osiem wariantów wspólnego UI i flow. Tym razem sprawdzono **272 konkretne ścieżki** budowane z nazw konfiguracji i zadeklarowanych języków `en`, `fr`, `es`, `it`, `id`, `de`, `pt`, `pt_BR`.

| Rodzina ścieżek | Kandydaci | JSON dostępne | HTTP 404 | Sposób wyznaczenia |
|---|---:|---:|---:|---|
| `<case>-public.<lang>.json` | 80 | 80 | 0 | 10 konfiguracji × 8 języków |
| `<case>-threads.<lang>.json` | 80 | 8 | 72 | 10 × 8; dostępne wszystkie osiem dla Noor |
| `chat.<case>.<lang>.json` | 80 | 0 | 80 | Funkcja `casePaths` generuje te nazwy |
| Felix Snapchat, Reddit, BeReal, Tinder | 32 | 32 | 0 | 4 funkcje wymienione w `surfaces` × 8 języków |
| **Razem** | **272** | **120** | **152** | 105 nowych GET i 15 plików zachowanych z wcześniejszego snapshotu |

Źródło nazw: `1peok1ww0ltpj.js` UTF16 około 16034–16527, języków: `1gu28mcudgiv4.js` 3501–3772, konfiguracji: `analysis/case-registry.json`. Wszystkie wystąpienia, statusy, rozmiary, daty i SHA-256 są w `warianty-jezykowe-odwolania.csv`; zestawienie w `warianty-jezykowe-pokrycie.csv`. Stan 404 odnosi się do zapytania w tej konkretnej sesji.

`casePaths` **konstruuje** ścieżkę `chat`, ale w zbadanych wywołaniach `fetch` nie znaleziono bezpośredniego `fetch(... .chat)`. Nie twierdzę, że działająca gra wykonuje wszystkie 80 sondowanych ścieżek. Część kandydatów dotyczy Isla, Pia i Sami, które w rejestrze mają `released:false` i `pickerVisible:false`; nie potwierdzono ich dostępności ani zachowania w UI.

Bezpośredni `fetch` lokalizowanych `threads` znajduje się w `1pfbqbd-z0uj8.js` UTF16 612164. Gdy treść dodatkowego wątku nie istnieje lub jest pusta, komponent wiadomości korzysta z `phoneData.npcMessages` w pobranym `public` — ten wybór jest w zakresie 621499–621640. Dlatego 72 braków plików `threads` nie jest automatycznie 72 błędami. Zachowanie wynika z kodu; nie przetestowano wszystkich języków w grze.

W ramach tych **72 odpowiedzi 404** istnieje 72 odpowiadających plików `public`: w **65** obiekt `npcMessages` ma co najmniej jeden wątek, a w **7** jest pusty. Te siedem to nieangielskie warianty niewydanego Sami, omówione niżej. Wskaźniki i liczby poszczególnych konfiguracji zachowano w `threads-404-fallback.csv`. Liczba niepustych obiektów nie potwierdza, że wszystkie kontakty i wiadomości są widoczne lub poprawne w UI. Pozostałe **80 odpowiedzi 404** dotyczy wzorca `chat`, dla którego nie wykazano bezpośredniego pobierania przez tę ścieżkę klienta; nie wlicza się ich do 72 przypadków fallbacku `threads`.

## 2. Pytania: 211 rekordów w ośmiu wariantach, nie 1688 nowych zadań

Wszystkie 80 plików `public` zawiera po tyle samo rekordów co angielski odpowiednik danej sprawy. Suma wynosi **1688 rekordów wariantów językowych = 211 rekordów × 8 języków**. We wszystkich 80 plikach kolejność identyfikatorów pytań i zbiory kluczy rekordów zgadzają się z angielskim odpowiednikiem. We wszystkich zbadanych wariantach `hints` jest puste. Dokładne liczby, nazwy i hashe źródeł: `pytania-porownanie-lokalizacji.csv`.

To porównanie dotyczy struktury i łańcuchów danych, nie jakości przekładu. Nie dowodzi dostępności wszystkich języków w aplikacji iOS, która ma osobne wydanie. Klient WWW nie wymienia w tej tablicy `pl`; sposób normalizacji tego klienta przy braku dopasowania wybiera `en`.

**120** to wielkość zbioru dostępnych wariantów sprawdzanych w tym kroku, a nie liczba plików do dodania do poprzednich 96: **15 z tych 120** było już lokalnie, pozostałe **105** pobrano teraz. Po złączeniu poprzednich **96** różnych nazw JSON z **105** nowymi jest **201 różnych plików JSON** w trzech katalogach roboczych. Powtórzone nazwy miały zgodne SHA-256. Pełne teksty scenariuszy pozostają w materiale roboczym; tabele publikacyjne zawierają strukturę, wskaźniki i hashe, bez zbiorczej reprodukcji fabuły.

## 3. Niewydany Sami: konfiguracje języków mają różną zawartość wiadomości

Wszystkie osiem plików `sami-public.<lang>.json` ma po 23 rekordy pytań i 13 kontaktów. Jednak angielski `#/phoneData/npcMessages` zawiera **8 kluczy wątków i 210 dymków**, a `#/phoneData/contactPreviews` ma **13 rekordów**. Dla każdego z siedmiu pozostałych wariantów `npcMessages` jest pustym obiektem, a `contactPreviews` pustą tablicą. Dokładne wskaźniki: `sami-public.en.json#/phoneData/npcMessages`, `#/phoneData/contactPreviews` oraz analogiczne ścieżki plików `fr/es/it/id/de/pt/pt_BR`.

W tej sondzie `sami-threads.<lang>.json` zwrócił 404 dla wszystkich ośmiu wariantów. Przy opisanym wyżej fallbacku różnica jest **statycznym ryzykiem dla ewentualnego uruchomienia niewydanego wariantu**. Nie oznacza to potwierdzonego defektu dostępnej produkcji, rzeczywistego błędu gracza ani niemożności ukończenia tej sprawy. Nie obserwowano działania Sami w UI.

Ponieważ pliki angielskie pochodziły z poprzedniego etapu, 27.10 wykonano ponowny GET dla Sami EN i FR; ich hashe były identyczne z użytymi w porównaniu. Analogiczna kontrola par EN/FR Noor, Liv i Ava również dała zgodność 8/8. Metadane żądań i hashe są w `sprawdzenie-snapshotu.json`. Ta próbka zmniejsza ryzyko pomyłki wynikającej z dat pobrania dla tych par, lecz nie dowodzi atomowego snapshotu całego serwisu.

## 4. Różnice danych kontaktów i alternatywne źródła Noor

- **Liv:** w siedmiu wariantach nieangielskich brakuje sześciu pól w `#/phoneData/contactDetails` w porównaniu z EN: trzech pól `benCarter`, jednego `mum` i dwóch `ryanDoyle`. To różnica plików; nie sprawdzono, czy UI uzupełnia je z innych danych.
- **Ava:** w siedmiu wariantach nieangielskich obiekt `#/phoneData/contactDetails/kieran` ma mniej czterech pól i dodatkowe pole `subtitle` względem EN. To nie jest samodzielny dowód na różnicę wyglądu danego ekranu.
- **Noor FR:** `#/phoneData/npcMessages` zawiera pięć dodatkowych kluczy Signal po cztery rekordy względem EN. Równocześnie `noor-threads.fr.json#/signal` zawiera pełniejsze listy po 22 rekordy dla tych samych pięciu identyfikatorów. Kod preferuje niepusty odpowiedni wątek z `threads`; samej różnicy pliku `public` nie należy nazywać liczbą dodatkowych dymków, które na pewno widzi gracz. W `threads.fr` jest sześć kluczy Signal, po 22 rekordy każdy.

Indeks 4765 różnic ścieżek skalarnych znajduje się w `lokalizacja-struktura-rozna.csv`; 560 wierszy porównań sekcji napisano do `lokalizacja-sekcje-stringi.csv`. Ścieżki tablic uwzględniają indeksy, więc przesunięcie elementów może spowodować wiele wierszy. Wynik nie jest liczbą błędów tłumaczenia. Porównanie stringów obejmuje także imiona, daty, ID i adresy URL; równość lub różnica wartości sama nie ocenia poprawności językowej.

## 5. Media i weryfikacja

120 wariantów JSON zawiera **10 728 wystąpień odwołań do 1115 różnych URL** dla obrazów, audio, video, PDF lub SVG z rozpoznanych domen. Wszystkie 1115 URL występowały już we wcześniejszych manifestach: **1114** ze wcześniejszym poprawnym pobraniem i **1** z ówczesnym statusem 404. Nie znaleziono nowych dokładnych URL mediów w tej warstwie. Sprawdzono wszystkie 10 728 wskaźników JSON wraz ze zgodnością URL; wynik `PASS` jest w `validation.json`, a źródła w `lokalizacje-referencje-mediow.csv`.

Jedyny wcześniej brakujący adres w tej grupie to `ghost_id_card.webp`, wskazany osiem razy. Komponent `lG` w `1pfbqbd-z0uj8.js` UTF16 282558–282820 sprawdza ciąg `ghost_id_card` i przy jego obecności wstawia komponent `lV` zamiast zwykłego obrazu. W miejscach używających tego wrappera sam status 404 nie dowodzi więc brakującego widoku; nie weryfikowano wszystkich zastosowań tego adresu w runtime.

## 6. Kontrola źródeł i zakresu

| Kontrola | Wynik | Dowód |
|---|---|---|
| Próbka dostępnych nazw: 120 JSON, 152 HTTP 404; brak 429 i błędów transportu | PASS | `locales-summary.json`, `warianty-jezykowe-odwolania.csv` |
| Zbiory: 96 wcześniejszych + 105 nowych = 201 różnych nazw; hashe powtórzonych nazw zgodne | PASS | `validation.json` |
| 80 list pytań: liczność, kolejność ID i zbiory kluczy względem EN | PASS | `porownanie-pytan-summary.json`, `pytania-porownanie-lokalizacji.csv` |
| 72 pary 404 `threads` / dostępny `public`; 65 niepustych i 7 pustych obiektów fallbacku | PASS, dla danych statycznych | `threads-404-fallback.csv` |
| Ponowne GET czterech par EN/FR; osiem hashy zgodnych z wcześniejszymi plikami | PASS | `sprawdzenie-snapshotu.json` |
| 10 728 wskaźników mediów i zgodność URL | PASS | `validation.json` |
| Działanie języków, fallbacku i nowych konfiguracji w grze | Nie wykonano | Potrzebna osobna obserwacja runtime |

Pozyskanych 105 nowych plików umożliwia dalszą analizę treści i lokalizacji, ale nie ujawnia kodu backendu, poprawnych odpowiedzi serwera ani pełnego zachowania iOS. Nazwy ścieżek i fakty z kodu są statyczne; HTTP 200/404 to wyniki odczytu publicznych adresów; wnioski o widoczności są wyraźnie oznaczone jako wymagające testu w grze.
