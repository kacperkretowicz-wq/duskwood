# Kierunek Mgliska

Mglisko jest thrillerem opowiadanym przez telefon. Punktem odniesienia jest napięcie znane z Duskwood: wiadomość od obcej osoby, prywatne rozmowy, grupa, zdjęcia, sprzeczne zeznania. Nazwa, grafiki, postacie i ekran komunikatora pozostają własne.

## Ekrany

Komunikator ma jednolitą oprawę na iOS i Androidzie: grafitowo zielone tło, oszczędne nagłówki, przygaszone zielone odpowiedzi, wyraźne wybory bez punktów i odznak. Lista zawiera wyszukiwanie, filtr nieprzeczytanych, kartę Mai i wejścia do śladów oraz telefonu. Kliknięcie nagłówka czatu otwiera profil; nagłówek grupy pokazuje jej uczestników. Zanim Kuba się przedstawi, widoczny jest sam numer i anonimowy awatar.

Telefon zachowuje dostęp do połączeń, wyszukiwarki, zdjęć, notatek i narzędzi fabularnych. Ekran główny zaczyna się od aktualnego rozdziału i ostatnich rozmów. Na komputerze grze towarzyszy tło huty, na telefonie ekran wypełnia urządzenie. Ograniczenie animacji respektuje ustawienie systemowe.

## Głosy

- Kuba, 19: pierwszy rok informatyki we Wrocławiu. Małe litery, wiadomości seriami, nerwowe dopowiedzenia. „xdd” jest odruchem, przy strachu znika. Nie każda wiadomość opisuje zagadkę.
- Ola, 22: praca w aptece i nauka zaoczna. Zwykle polskie znaki, rzeczowe odpowiedzi. Kontrolowanie grupy maskuje niepokój. Może odpisać „Okej”, a po chwili dodać trudniejszą prawdę.
- Bartek, 24: warsztat, zdania krótkie, często bez polskich znaków. Nie dostaje emotek tylko po to, żeby pasował do innych. O uczuciach pisze przez konkretne czynności.
- Igor, 23: szybki, techniczny, czasem „xD” i „XDDD”. Żarty odwracają uwagę, później ich brak też jest sygnałem. Zwrot „technicznie rzecz biorąc” pozostaje uczciwym tropem.
- Maja, 22: fotografia na ASP. Ciepły, ironiczny styl; zwykłe szczegóły, aparat, nieoddane wiadomości. Sposób zwracania się do mamy ma znaczenie fabularne.
- Weronika, 41 i Gajda, 46: odrębne, starsze głosy. Weronika pisze spokojnie, Gajda służbowo. Nie przerabiamy ich na studentów.

Nie dopisujemy losowych literówek ani „XD” automatycznie do każdego tekstu. Konkretna wiadomość ma pasować do osoby, relacji i tego, co właśnie się wydarzyło. Wprowadzona redakcja obejmuje 76 fragmentów od prologu do epilogu, dodatkową wymianę w grupie i bardziej osobiste wyznanie Igora.

## Rytm

`Engine.talk` uwzględnia długość wiadomości, tempo pisania konkretnej osoby, czas czytania poprzedniej wiadomości, krótsze odstępy w serii i niewielką nieregularność. Przy dłuższych odpowiedziach z pytaniem lub zawahaniem wskaźnik pisania czasem gaśnie i wraca. Najdłuższe dymki mają do 14 sekund pisania w tempie normalnym. Pauzy zapisane w scenariuszu nadal obowiązują. Gracz może zmienić tempo lub przewinąć; nie dodajemy obowiązkowego czekania przez godziny.

## Napięcie i zwroty

Trzy główne odwrócenia znaczenia już są w fabule: numer należał wcześniej do zmarłego dziennikarza; uspokajający SMS z telefonu Mai zawiera błąd o nieżyjącym psie; anonimowy nadawca jest kimś z grupy. Wzmocnione wyznanie Igora łączy jego „spokojnie” na grupie ze straszeniem z drugiej karty. To unikanie własnej odpowiedzialności, nie nadnaturalne moce.

Każdy kolejny zwrot musi mieć wcześniejszy, możliwy do znalezienia ślad i zrozumiały motyw. Codzienne, ciepłe rozmowy dają powód, żeby przejąć się ludźmi. Powroty do gry mają wynikać z ciekawości i relacji; bez kar za odejście, utraty serii czy wymuszonych płatności.

## Grafiki i spójność

`assets/people.png` zawiera sześć wygenerowanych fotograficznych portretów fikcyjnych dorosłych postaci; ten sam wizerunek jest używany w czatach, profilach, kontaktach i Kadrze. `gajda.png` to portret komendanta, `forest.png` to huta, `maja-river.png` to wspomnienie Mai nad rzeką. Są to obrazy wygenerowane do gry, nie fotografie realnych osób. Są dostarczane lokalnie i zapisywane przez service workera.

Pozostałe grafiki dowodowe nadal korzystają z generatora SVG. Ich wymiana wymaga zachowania położenia ukrytych szczegółów, metadanych i wskazówek. Mapa pozostaje schematyczna, bo służy wskazywaniu miejsc.

## Zapis i weryfikacja

Format stanu to wersja 2. `js/data/migrations.js` mapuje indeksy kroków dawnych zapisów i checkpointów w prologu, rozdziale 3 i 4. Wybory, dowody, zaufanie i odkryte zakończenia nie są kasowane.

Walidacja struktury fabuły i map zapisów:

```sh
node --test tests/story.test.cjs
```

Testy przeglądarkowe wymagają działającego `node serve.js`, Playwright i Chromium. Aplikacja nadal nie wymaga pakietów npm. W przygotowanym środowisku chmurowym:

```sh
node tests/browser.cjs
```

W innym środowisku można wskazać `PLAYWRIGHT_MODULE`, `CHROMIUM_PATH` i `TEST_BASE_URL`. Testy obejmują początek gry i wybór odpowiedzi na komputerze oraz telefonie, zapis i wznowienie, wyszukiwanie i profil, otwieranie aplikacji, stare zapisy, tempo normalne, anulowanie wiadomości po restarcie i nowe zasoby offline. Nie stanowią pełnego przejścia wszystkich zakończeń.
