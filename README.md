# MGLISKO

Gra detektywistyczna rozgrywana w całości na „telefonie”, w stylu *Duskwood* i *Cold Trace*.
Ktoś pisze do ciebie w nocy: jego siostra zadzwoniła do ciebie tuż przed zniknięciem. Ty jej nie znasz — ale twój numer kiedyś należał do kogoś, komu ufała.

- **Prolog + 5 rozdziałów + epilog**, baza historii pisana na 2–3 godziny, rozbudowywana rozmowami i dodatkowymi śledztwami
- **20 rozmów opcjonalnych**, trop tapety, śledztwo ostatniego kursu, historia zmienionej notatki, podsumowania sesji i zapis konsekwencji do kontynuacji
- Swobodne tempo albo **pięciodniowy pilot kalendarzowy**; natywne powiadomienia po zgodzie gracza. Pełny miesięczny sezon jest celem produkcji, nie aktualną długością tej wersji
- **3 zakończenia** zależne od decyzji (kto się dowie, komu zaufasz, gdzie zadzwonisz)
- Gra udaje zwykły telefon: **iOS na iPhonie, Android na Androidzie** (automatycznie, można zmienić w Ustawieniach)
- Fabuła i dźwięk powstają w kodzie, fotograficzne portrety i oprawa są dostarczane lokalnie w `assets/`; gra nie potrzebuje zewnętrznych API

## Uruchomienie

### Windows — bez instalowania Node.js

Na GitHubie wybierz **Code → Download ZIP**, wypakuj pobrany folder, a następnie otwórz `index.html` w Microsoft Edge albo Google Chrome. Nie otwieraj pliku bezpośrednio z archiwum ZIP. Gra i lokalne grafiki działają bez serwera; instalacja PWA wymaga uruchomienia przez HTTP.

### Serwer lokalny

Najprościej:

```bash
node serve.js
```

Potem otwórz `http://localhost:5173`. Bez Node'a wystarczy dwukrotnie kliknąć `index.html` (zapis działa, tylko tryb offline i instalacja wymagają serwera).

## Na telefonie

### Aplikacje iOS i Android

Repo zawiera projekty `ios/` (Xcode/Swift Package Manager) i `android/` (Gradle), osadzające całą grę lokalnie przez Capacitor. Przygotowanie: **Node.js 22+**, `npm ci`, następnie `npm run mobile:sync`. Otwieranie projektu: `npm run mobile:ios` lub `npm run mobile:android`. iOS wymaga Maca i Xcode 26+, Android — JDK 21 i Android SDK 36. Szczegóły, aktualny zakres weryfikacji i ograniczenia: [APLIKACJE-MOBILNE.md](docs/APLIKACJE-MOBILNE.md).

To telefon wewnątrz gry: aplikacje, wiadomości i internet są częścią fikcji. Gra nie czyta prawdziwych SMS-ów, kontaktów, zdjęć ani położenia urządzenia. Projekty mobilne nie oznaczają publikacji w App Store / Google Play.

### Wersja przeglądarkowa / PWA

1. Uruchom serwer na komputerze (`node serve.js`) albo wrzuć folder na dowolny hosting statyczny (np. GitHub Pages, Netlify).
2. Otwórz adres w przeglądarce telefonu.
3. **Android (Chrome):** menu ⋮ → „Dodaj do ekranu głównego” / „Zainstaluj aplikację”. Gra uruchamia się na pełnym ekranie, bez paska przeglądarki — widzisz tylko ekran „telefonu w telefonie”.
4. **iPhone (Safari):** Udostępnij → „Do ekranu początkowego”.

Po pierwszym uruchomieniu gra działa offline. Postęp zapisuje się automatycznie po każdym kroku; w Ustawieniach → Rozdziały można wrócić do początku dowolnego ukończonego rozdziału, żeby odkryć inne zakończenia.

## Jak się gra

Wszystko dzieje się w aplikacjach telefonu:

| Aplikacja | Do czego służy |
|---|---|
| **Wiadomości** | rozmowy z postaciami; wybierasz odpowiedzi, wpisujesz hasła, załączasz rzeczy z Notatek |
| **Telefon** | rejestr połączeń, kontakty, klawiatura — niektóre numery mają znaczenie |
| **Internet** | wyszukiwarka i miasteczkowe strony: gazeta, portal Mglisko24, Kadr, urzędy, forum |
| **Zdjęcia / Galeria** | zdjęcia otrzymane w rozmowach i wywołane w Ciemni |
| **Nimbus** | kopia zapasowa telefonu zaginionej Mai: galeria, SMS-y, notatki, lokalizacja, poczta, dyktafon |
| **Notatki** | „Co teraz?” z podpowiedziami, zapisane dowody, ludzie, oś czasu, pytania do rozstrzygnięcia |
| **Mapy** | plan Mgliska z warstwą leśną i łowiecką |
| **Ciemnia** | wywoływanie negatywów i rozjaśnianie zdjęć |
| **BushView** | zdalna fotopułapka (pojawia się później) |

Wskazówki: zdjęcia można przybliżać (dwa palce, kółko myszy, dwuklik) i dotykać szczegółów. Ważne wiadomości w kopii telefonu Mai można dotknąć, żeby zapisać je w Notatkach. Gdy utkniesz — notatka „Co teraz?” ma stopniowane podpowiedzi.

Przytrzymanie pustego tła otwiera wybór tapety. Warianty z kopii Mai najpierw trzeba zachować z Nimbus → Tapety. W Ustawienia → Sezony i sesje znajdziesz tempo i porę kolejnych rozdziałów; zapis podsumowania nie przerywa rozmowy. Ratunek nie ma bramki czasowej w środku akcji. Po zakończeniu można wrócić do świata przez przycisk „Po zakończeniu”.

Pełna chronologia, postacie, scenariusz rozbudowy na 30 dni i konstrukcja dalszych sezonów: [BIBLIA-SEZONOW.md](docs/BIBLIA-SEZONOW.md). Format zapisu, terminy, powiadomienia i ograniczenia aktualizacji: [SEZONY-I-AKTUALIZACJE.md](docs/SEZONY-I-AKTUALIZACJE.md).

## Struktura

```
index.html            wejście
serve.js              serwer statyczny bez zależności
sw.js, manifest       PWA (offline, instalacja, pełny ekran)
css/                  base (system), apps (aplikacje), web (strony), os (iOS/Android, Notatki)
js/core/              util, state (zapis, zegar fabularny), audio (Web Audio), engine (skrypt), ui (powłoka telefonu)
js/apps/              aplikacje telefonu
js/art/               generator „zdjęć” SVG: kit, avatars, scenes, film, maps
js/data/              postacie, dowody, kopia telefonu Mai, internet, świat
js/story/             prolog, ch1–ch5, epilog (DSL fabuły)
docs/KONCEPCJA.md     dokument projektowy: świat, postacie, prawda, rozdziały, mechaniki, rozszerzenie „Teren”
```

## Oprawa i testy

### Na osobności · Ostatni kurs

Po dołączeniu do grupy pojawia się **Na osobności** w Rozmowach i Notatkach. To sześć dodatkowych rozmów, otwieranych wraz z postępem śledztwa. Możesz poznać codzienność Kuby, Oli i Bartka, wspomnienia Weroniki i reakcję Igora po jego wyznaniu. Wybory zmieniają relacje; każdą rozmowę można przerwać i wznowić.

Po odnalezieniu wiadomości o aucie na tamie dostępny jest też **Ostatni kurs**: Lena Cicha (24 lata), relacja świadka, karta przejazdu, porównanie zegarów, zdjęcie przystanku i dodatkowy wniosek w Notatkach. Sama relacja nie potwierdza tożsamości osoby. Trzeba dobrać właściwe dokumenty i odróżnić sprawdzony czas od przypuszczenia.

Główna młoda ekipa ma 19–24 lata. Nowe grafiki mają charakter zwykłych zdjęć telefonem; pochodzenie i prompty opisano w [ASSETY-OSTATNI-KURS.md](docs/ASSETY-OSTATNI-KURS.md). Zasoby działają lokalnie i offline. [Szczegóły dodatku i weryfikacji](docs/OSTATNI-KURS.md).

Komunikator, głosy postaci, tempo rozmów, grafiki i zgodność starych zapisów opisano w [OPRAWA-I-DIALOGI.md](docs/OPRAWA-I-DIALOGI.md). Walidacja fabuły: `node --test tests/story.test.cjs`. Testy przeglądarkowe po uruchomieniu serwera: `node tests/browser.cjs` (wymagają Playwright i Chromium).

Aktualny interfejs telefonu korzysta z systemowych fontów, jasnego/ciemnego wyglądu, ekranu ikon z dockiem, Wiadomości, Telefonu z dolnymi zakładkami i wyszukiwania w Notatkach. `css/native-ui.css` definiuje wygląd iOS i Androida. W Ustawieniach można wybrać system oraz jasny/ciemny/systemowy motyw. Gra nie pobiera fontów ani zasobów podczas gry.

Pełna walidacja dodatku: `node --test tests/story.test.cjs tests/conversations.test.cjs`, następnie przy działającym serwerze `node tests/browser.cjs` i `node tests/conversations.browser.cjs`. Narzędzia testowe pozostają zewnętrzne; sama gra nie wymaga instalacji zależności.

Testy nowej powłoki: `node tests/native-ui.browser.cjs`. Przejście prologu przez połączenia, SMS-y, dwie strony wyszukiwarki i grupę: `node tests/prolog.browser.cjs`. `npm test` obejmuje też eksport zasobów aplikacji. Workflow `Mobile build` próbuje kompilacji Android debug i iOS Simulator przy zmianach PR; wynik kompilacji trzeba odczytać z konkretnego uruchomienia Actions.

### Do Oli · mrok i ślady (1.3)

Nocna kopia w rozdziale 3 przynosi notatkę, której treść zastąpiono żądaniem przerwania poszukiwań. W Nimbus → Notatki Mai → Do Oli → Historia wersji można zachować oba zapisy i porównać źródła w Notatkach. Pięć dodatkowych rozmów rozwija ten wątek przez codzienne przedmioty, presję Gajdy oraz reakcje Kuby i Mai na decyzję gracza o przekazaniu plików. Rozmowy pozostają dostępne do odczytu po zmianie etapu, ale nie pozwalają ujawniać nowych informacji w trakcie ratunku.

W tense/dark tło ma ciche, nieregularne brzmienia metalu zamiast wysokich melodyjnych dzwonków. Odkrycia nie grają zwycięskiej fanfary; dźwięk zatrzymuje się w tle. Głośność i ambient można wyłączyć. [Zakres i chronologia](docs/MROK-I-SLADY.md). Test interakcji, źródeł, wznowienia, konsekwencji i offline: `node tests/dark-threads.browser.cjs`.

## Narzędzia deweloperskie

- `?debug` — szybkie wiadomości i przycisk **DBG** (skoki między rozdziałami)
- `?debug&speed=fast` — przyspieszone tempo zamiast natychmiastowego
- `?art` — galeria wszystkich obrazów gry (`?art=c1_` filtruje po nazwie)

Fikcja literacka. Wszystkie postacie i miejsca są zmyślone; powódź tysiąclecia z lipca 1997 roku wydarzyła się naprawdę.
