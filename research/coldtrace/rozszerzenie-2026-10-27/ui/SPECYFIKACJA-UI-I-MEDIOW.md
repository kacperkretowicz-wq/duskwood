# ColdTrace — szczegółowa specyfikacja obrazu, ruchu i interakcji

Analiza statyczna snapshotu WWW z 26.10.2026, opracowanie 27.10.2026. Poniższe parametry pochodzą z dostarczonych plików, bez wykonywania kodu gry. Uzupełniają wcześniejszy raport jakości ekranów o mechanikę komponentów i jawne zakresy dowodowe.

## 1. Pokrycie pomiaru

Parser AST zbadał cztery pliki: `1pfbqbd-z0uj8.js`, `1peok1ww0ltpj.js`, `2cwzhz4gw0ufp.js`, `1gu28mcudgiv4.js`. Zidentyfikował **4844 wywołania JSX**, **749 właściwości inline style**, **38 miejsc wywołań timerów/rAF**, **400 miejsc deklaracji button** i **86 deklaracji img**. To liczby wystąpień w kodzie, w tym iterowane szablony i funkcje pomocnicze. Nie są liczbami widocznych ekranów ani równocześnie działających timerów. Pełne pochodzenie i tożsamość źródeł pozostają w lokalnym `static-visual-inventory.json`; dostarczone CSV zawierają fakty strukturalne bez pełnych ciał funkcji.

Offsety przy plikach JS są indeksami **UTF16** w oryginalnym bundle, a nie offsetami bajtowymi. Rozróżnianie nazw o odmiennej wielkości liter jest konieczne: np. `sJ` to audio, `sj` to rozmowa. Wyszukiwanie globem w Windows może dopasować obie nazwy; do identyfikacji trzeba zachować również offset.

## 2. Geometria i obszary bezpieczne

CSS definiuje proporcję telefonu 375/812 oraz wysokość desktopową ograniczaną do minimum z 812 px i wysokości viewportu pomniejszonej o 2 rem. Na węższym ekranie powłoka przechodzi w pełny widok. Źródło: `2ia7mv2holvil.css`, okolice offsetu 118200.

Safe area jest obliczana z `env(safe-area-inset-*)` i minimalnego wcięcia. Do szerokości 1023 px minima wynoszą **28 px u góry i 20 px na dole**; od 1024 px **4 i 8 px**. Oznacza to, że emulator telefonu sam dodaje odstępy także przy zerowych insetach przeglądarki. Nie jest to odczyt fizycznych wymiarów notcha. Źródło CSS: 118700–119400.

Przewijanie stosuje `overscroll-behavior: contain`, `overflow-y: auto` i deklarację `-webkit-overflow-scrolling: touch`. Celem jest izolowanie przewijania wewnętrznych aplikacji. Nie zmierzono skuteczności ani płynności na fizycznym iPhonie.

## 3. Dokładny kontrakt animacji

| Zdarzenie | Parametr z kodu | Dowód |
|---|---|---|
| Wejście ekranu telefonu | 280 ms, opacity 0→1, przesunięcie Y 10→0 px, scale .985→1; krzywa cubic-bezier(.22,1,.36,1) | CSS `phone-screen-enter`, 118347 |
| Zmiana fazy wprowadzenia | 320 ms, opacity oraz przesunięcie X 18→0 px; ta sama krzywa | CSS `flow-phase-enter`, 118555 |
| Zły PIN | Ruch poziomy -10, +9, -6, +4 px; powrót do zera | JS `sg`, 162306; stan resetowany po 420 ms przy 160921 |
| Galeria | Powiększenie 1×↔3×, transform 200 ms | JS `lQ`, 289817+ |
| Zaliczenie odpowiedzi | Przejście po 700 ms | JS wywołanie timera, 295760 |
| Story | Automatyczne przejście po 5000 ms i pasek postępu linear 5000 ms | JS `ad`, 327476–330600 |
| Przygotowanie telefonu | Etapy po 650, 1350, 2100 ms; glitch startuje po 3000 ms | JS `ox`, 652514+ |
| Zabezpieczenie końca glitch | Wyjście przy zakończeniu filmu, błędzie albo po 8000 ms | JS `ox`, 652514+ |

W głównym CSS są osiem definicji keyframes: wejście telefonu, wejście fazy, przesunięcie ziarna, rise, flicker, spin, pulse i bounce. Zły PIN wstawia osobny lokalny blok stylu. Nazwa efektu nie dowodzi jego uruchomienia w każdej sprawie. CSV timerów obejmuje także minigry i liczniki, więc nie należy przypisywać wszystkich opóźnień narracji.

## 4. Ekran blokady i dotyk

Odblokowanie to suwak o wymiarach **280×62 px**, obsługujący `pointerdown`, `pointermove`, `pointerup`, `pointercancel` oraz utratę przechwycenia wskaźnika. Element ustawia `touchAction: none`, wyłącza zaznaczanie i przechwytuje pointer. Przy przerwaniu gestu wraca do pozycji początkowej; przejście ma 200 ms ease-out, z wyłączeniem transformacji podczas przeciągania. Źródło: `es`, deklaracja suwaka 40721, handlery 40975–41234, styl 41685.

Suwak ma `role=button` i etykietę ARIA, lecz w tej deklaracji nie ma `tabIndex` ani handlera klawiatury. Jest to **statyczny kandydat problemu dostępności klawiaturowej**, wymagający potwierdzenia w rzeczywistym DOM.

Wirtualny przycisk Home jest prawdziwym `button`, ale jego zadeklarowane wymiary to **134×5 px**. Sama deklaracja nie zawiera paddingu rozszerzającego obszar. Źródło: powłoka `r`, 9743. Ma etykietę Home i handler kliknięcia. Mała wysokość daje konkretny powód do testu dotykowego; nie dowodzi, że na wszystkich platformach nie da się wrócić do ekranu głównego.

## 5. Zdjęcia i czytanie dowodów

Galeria zajmuje absolutną warstwę `z-50` i wyświetla zdjęcie przez `object-contain`, co sprzyja zachowaniu całej fotografii. Przyciskami Previous/Next zmienia indeks, resetuje zoom do 1× i zamyka panel informacji. Dotknięcie zdjęcia przełącza skalę; nie ma w tym komponencie pełnej obsługi pinch-to-zoom. Źródło: `lQ`, 289817.

Panel Info dla wybranego zdjęcia pobiera datę, lokalizację i dodanie do albumu z przekazanego obiektu `inspect`, dobranego do końcówki nazwy assetu. To **autorska metadana fabularna w JSON**, nie potwierdzony odczyt EXIF z pliku.

Wrapper obrazu `lG` ma specjalny przypadek identyfikatora Ghost: zamiast zwykłego `img` wstawia złożony komponent `lV`. Zatem samo zgromadzenie obrazów nie odtwarza wszystkich dokumentów wizualnych; część materiałów jest rysowana strukturą JSX/SVG. Źródło: `lG`, 282558+.

W czterech zbadanych plikach wszystkie **86 bezpośrednich deklaracji img** mają atrybut alt, lecz często pusty. Trzy miejsca przekazują loading, trzy decoding, jedno width/height; żadna z tych bezpośrednich deklaracji nie przekazuje srcSet ani sizes. Te liczby nie obejmują automatycznie finalnych elementów wygenerowanych przez importowane komponenty obrazów. Nie są dowodem braku optymalizacji w całym serwisie. Tabela `media-elementy-ui.csv` zachowuje źródło każdego miejsca.

## 6. Audio: rzeczywisty dźwięk i dekoracyjny waveform

Odtwarzacz `sJ` tworzy element audio z `preload=metadata`, nasłuchuje `timeupdate`, `loadedmetadata` i `ended`, uruchamia play/pause i ma suwak zakresu z krokiem **0,1 s**, zapisujący `currentTime`. Czas pozostały pochodzi z czasu/długości rzeczywistego pliku. Źródło: `sJ`, 200022–202364.

Natomiast **28 słupków waveformu jest generowanych deterministycznie z łańcucha seed przez mnożenie i hashowanie**, bez odczytu próbek audio. Kolor słupków zależy od postępu odtwarzania. Nie należy interpretować ich wysokości jako amplitudy nagrania lub dowodu na obecność sygnału. `staticLevel<2` dodaje wizualny filtr linii z opacity .55 albo .22; sam filtr nie pogarsza ani nie oczyszcza sygnału audio.

W przygotowaniu telefonu film glitch jest autoplay, muted i playsInline, a dźwięk uruchamia **osobny zapętlony plik WAV**. Przerwanie i sprzątanie efektu pauzuje audio. Odrzucona obietnica play jest przechwytywana, więc blokada autoplay dźwięku nie musi zatrzymać całego flow. Źródło: `ox`, 652514–653466.

## 7. Stories i minigry: różne rodzaje ruchu

Stories korzystają z dwóch następujących po sobie rAF do uruchomienia paska postępu. Każda karta ma 5 s, a przewinięcie następuje dalej w bieżącym stosie, do następnej osoby albo zamyka widok. Dwie połowy ekranu są przyciskami Previous/Next; swipe w dół o ponad **70 px** zamyka widok. W tym komponencie nie ma pauzowania przy przytrzymaniu palca. Źródło: `ad`, 327476.

Istnieje pięć miejsc elementu canvas. Nie dowodzi to dostępności pięciu minigier w każdej wydanej sprawie. Dla przykładu Flappy Bird `rv` ustawia bufor 390×520 i zwiększa prędkość/spadającą pozycję stałymi wartościami na każdą klatkę rAF; Space Shooter `rT` ma bufor 390×640, liczy deltę czasu i ogranicza ją do 0,04 s. Dlatego oba komponenty mają **odmienną zależność symulacji od częstotliwości klatek**. Nie przeprowadzono pomiarów FPS ani testu różnych odświeżań. Źródła: `rv`, 558821; `rT`, 603206.

## 8. Funkcjonalność a stylizacja

W badanym Spotify `nY` przycisk odtwarzania zmienia stan i ikonę; komponent nie zawiera odtwarzacza audio. YouTube `rA` po wyborze filmu pokazuje miniaturę, czas i metadane, bez elementu video. Aparat `nV` rysuje czarny wizjer i przycisk migawki, któremu nie przypisano handlera. Źródła: 430673, 574414 i 428890.

Odwrotnie, film w galerii jest rzeczywistym video z controls/playsInline (290775), a player nagrań ma rzeczywisty audio/seek. Ocenę kompletności należy więc wykonywać **dla każdego komponentu i operacji**, zamiast traktować każdą ikonę aplikacji jako pełną implementację.

## 9. Dostępność i jakość: co potwierdzono

142 miejsca JSX mają aria-label, 12 role i jedno tabIndex. Część przycisków jest semantycznymi elementami button, co daje podstawową obsługę klawiatury przez przeglądarkę; nie wynika z tego prawidłowy focus po przejściu do modala. Zawartość tekstowa/children nie była podstawą automatycznej klasyfikacji dostępnej nazwy, więc nie podaję liczby rzekomo nieopisanych przycisków.

W głównym CSS nie znaleziono ciągu `prefers-reduced-motion`. To wynik przeszukania jednego pliku, nie dowód o wszystkich runtime preferencjach. W statycznym zakresie warto sprawdzić kontrast tekstów o opacity 25–50%, focus modali, Home, suwak blokady i dynamiczne ogłaszanie zaliczenia pytania. Kolory literalne i ich pochodzenie zebrano w CSV; **nie są to obliczone kolory po kompozycji i nie wyliczono z nich pozornego wyniku WCAG**.

Nie ustalono FPS, frame pacing, realnej ostrości Retina, energii, pamięci GPU, opóźnienia dotyku, odczytu VoiceOver ani działania powiększenia systemowego na iOS. Specyfikacja ta jest dokładnym rozbiorem dostępnego klienta, a nie certyfikacją urządzenia.
