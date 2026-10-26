# Jakość ekranów ColdTrace

Ocena klienta WWW z 26.10.2026. Rozdzielczość pliku graficznego, rozmiar w CSS i fizyczna rozdzielczość urządzenia to różne parametry. Nie przeprowadzono pomiarów na fizycznym iPhonie.

## Ustalenia techniczne

| Element | Ustalenie | Znaczenie |
|---|---|---|
| Rama telefonu na desktopie | 375×812 px CSS; zewnętrzne zaokrąglenie 54 px | Spójny, kontrolowany format symulowanego telefonu. |
| Wariant mobilny | Pełna szerokość i `100dvh`, bez zewnętrznej ramy | Dopasowanie do aktualnej wysokości widoku. Nie dowodzi zachowania natywnego iOS. |
| Panel pytań | 86% wysokości telefonu | Rozbudowana treść mieści się w osobnej warstwie interfejsu. |
| Powiększanie galerii | 1× ↔ 3×, transformacja 200 ms; reset po zmianie zdjęcia | Pozwala oglądać detale dowodów. |
| Błędny PIN | Animacja 0,4 s; reset 420 ms | Czytelna odpowiedź na niepoprawne wejście. |
| Zaliczenie odpowiedzi | Opóźnienie przejścia 700 ms w kodzie | Moment na zauważenie sukcesu; nie jest to zmierzona latencja sieci. |
| Wskaźnik pisania | Kropki z przesunięciem 0/150/300 ms; długość pauz zależna od tekstu | Buduje rytm rozmowy. |
| Zegar telefonu | Odświeżanie co 20 s; czas urządzenia | Nie stanowi automatycznie daty fabularnej. |
| Tablica śledztwa | Alternatywny układ przy progu 600 px | Osobna kompozycja na węższym ekranie. |

Niektóre przyciski mają minimum 44×44 px, lecz nie jest to wynik pełnego audytu wszystkich celów dotykowych.

## Rozdzielczości materiałów

Przykłady z lokalnego manifestu pobrań:

- Tapeta Noor: **1828×3248 px**; tapeta Liv: **4488×5608 px**.
- Tablice śledztwa: m.in. **2340×5228**, **2340×5000**, **2340×4810**, **1450×2862** i **530×1024 px**. Występują różne warianty jakości.
- Tło pytań Noor: **633×1024 px**.
- 43 obrazy mają rozmiar **1290×2796 px**; najczęstsze wymiary to **1024×1024** (251), **736×981** (138) i **600×600** (104).
- 16 obrazów **1×1 px** to pliki zastępcze. Nie potwierdzono, że są pokazywane graczowi jako uszkodzone zdjęcia.
- Film Wren: **720×1280**, 8 s, H.264 + AAC. Efekt glitch: **480×848**, 1,035 s.

Duży plik daje zapas do kadrowania i powiększania, ale sama liczba pikseli nie dowodzi ostrości po kompresji ani jakości na konkretnym urządzeniu. Wymiary screenshotów narzędzia badawczego nie są parametrami ekranu iPhone'a.

## Kierunek wizualny — ocena analityczna

Zewnętrzna oprawa łączy ciemne tło, żółte akcenty, wąskie nagłówki, polaroidowe karty i tablicę śledztwa. Wnętrze telefonu wykorzystuje rozpoznawalne wzorce różnych aplikacji. Kontrast między tymi dwiema warstwami pomaga orientować się w świecie gry.

Tekst aplikacji korzysta ze stosu systemowego; dodatkowe deklarowane fonty to Bebas Neue, Instrument Serif Italic, Caveat i SF Espionage Medium. Dokładne źródła i hashe są w `analiza/typografia.csv`. Ich obecność w CSS nie oznacza, że każdy ekran korzysta ze wszystkich czterech.

Najbardziej użyteczne wzorce dla MGLISKA: spójna skala interfejsu, czytelna hierarchia wiadomości, odróżnianie aplikacji kolorem i strukturą, możliwość oglądania detali dowodu oraz wyraźny moment przyjęcia odpowiedzi. To wnioski projektowe, nie wdrożone zmiany gry.

## Granice oceny

Nie zmierzono FPS, czasu reakcji dotyku, GPU, zużycia pamięci, fizycznego odwzorowania Retina, kontrastu wszystkich ekranów ani obsługi czytników ekranu. Wybrane ekrany oceniono w przeglądarce. Nie wykonano pełnego przejścia płatnych spraw ani analizy binarnej iOS.

Pozorna kompletność aplikacji również wymaga ostrożności: w badanych komponentach Spotify zmienia stan ikony, YouTube pokazuje miniaturę i tekst, a aparat nie zawiera pełnego przechwytywania obrazu. Wysoka spójność wizualna nie jest dowodem pełnej funkcjonalności każdej aplikacji.
