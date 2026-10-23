# Na osobności / Ostatni kurs

## Rozgrywka

Sześć dodatkowych rozmów ma osobne zapisy i nie zajmuje pola odpowiedzi głównej fabuły. Nie zmieniono kroków siedmiu rozdziałów, więc dotychczasowe mapy migracji zapisów pozostają aktualne. Stan rozmów jest dodatkiem do formatu v2, tworzonym przy pierwszym otwarciu. Decyzja i wszystkie jej odpowiedzi zapisują się przed ich wizualnym odsłanianiem; zamknięcie okna lub przeładowanie strony nie gubi wyboru, dowodów ani zaufania.

Wejścia: przycisk „Na osobności” w liście rozmów; przypięta notatka; profil rozmówcy i karta osoby. Przeczytane rozmowy można otwierać ponownie. Zaufanie nalicza się raz, bez możliwości powtarzania dla punktów. Zakończone rozmowy nie stają się obowiązkową blokadą głównej historii.

| Rozmowa | Dostępność | Rola |
|---|---|---|
| Kuba: Zanim znowu zaczniemy szukać | Dołączenie do grupy | Zwykłe wspomnienia o siostrze, troska o rodzinę |
| Ola: Po zamknięciu apteki | Dołączenie do grupy | Próby utrzymania codzienności, charakter Mai |
| Bartek: Światło w warsztacie | SMS o spotkaniu na stacji | Granice po rozstaniu i odpowiedzialność |
| Weronika: Nie tylko żółta peleryna | Odblokowanie rozmowy z Weroniką | Pamięć o Tomku jako osobie |
| Igor: Bez technicznych wymówek | Dowód wyznania Igora | Konsekwencje, prawda i odbudowa zaufania |
| Lena: Ostatni kurs | Grupa + wiadomość o aucie na tamie | Nowa świadkini i sprawdzanie relacji |

## Realizm i postacie

Kuba ma 19 lat, Ola i Maja po 22, Igor 23, Bartek i Lena po 24. Weronika i Gajda zachowują wiek potrzebny dla historii z 1997 roku. Nowa Lena jest młodą kierowczynią w pierwszym roku pracy. Jej głos jest zwyczajny, z wyraźnym rozróżnieniem obserwacji i przypuszczeń. Nie zdradza tożsamości sprawcy ani kolejnych zwrotów głównej historii.

Dokumenty Leny ustalają czas przejazdu: rejestrator 22:11, stałe opóźnienie 7 minut, zatem 22:18. Relacja dotyczy nierozpoznanej osoby idącej w górę Szklarskiej. Nie ustala, że była to Maja ani że weszła do huty. Zdjęcie przedstawia miejsce tydzień po zaginięciu. Nie dodano tego tropu do listy kluczowych dowodów identyfikujących sprawcę w finałowym pakiecie.

Wniosek wymaga poprawnej interpretacji i dwóch właściwych dokumentów. Błędna godzina, zbyt pewne rozpoznanie albo nieodpowiednie źródła pozwalają próbować ponownie. Poprawne rozwiązanie dodaje jeden nowy dowód i wpis do osi czasu. Zdjęcie trafia do galerii. Pięć nowych pozycji dowodowych łącznie obejmuje relację, dwa dokumenty, zdjęcie i wynik porównania.

Naprawiono też błąd osi czasu: funkcja parsująca datę zwraca liczbę milisekund; widok potrzebował obiektu Date. Ujednolicono adres serwisu Igora do Rynku 7, zgodnie z mapą i Kadrem.

## Grafiki

Wybrano drugie wersje portretu Leny i przystanku, po uwadze o zbyt starszej postaci i filmowym wyglądzie. Są to obrazy generowane, stylizowane na zwykłe zdjęcia telefonem. Nie przedstawiamy ich jako autentycznych fotografii. Pliki, parametry eksportu i dokładne prompty: [ASSETY-OSTATNI-KURS.md](ASSETY-OSTATNI-KURS.md). Dotychczasowe wizerunki postaci pozostały spójne między ekranami.

## Weryfikacja

- 8 testów Node: struktura głównej historii i migracji, wszystkie ścieżki nowych rozmów, bramki fabularne, zapis po każdym wyborze, odporność na ponowne wysłanie starej odpowiedzi, wiek postaci, nagrody i zgodność checkpointów v2.
- Istniejące 7 scenariuszy przeglądarkowych: nowa gra, odpowiedź, zapis/wznowienie na komputerze i telefonie, profile, aplikacje, stare zapisy, tempo, anulowanie wiadomości i cache offline.
- Nowe pełne przejście dodatku przy 1440 × 1050, 390 × 844 i 360 × 740: rozmowa Leny, zamknięcie podczas odsłaniania odpowiedzi, przeładowanie i kontynuacja, błędny wniosek, błędne źródła, poprawne rozwiązanie, zdjęcie i jego informacje, galeria, oś czasu, ponowne otwarcie bez nagrody/zaufania, dopasowanie odpowiedzi do ekranu i brak błędów strony/HTTP.
- Oddzielnie sprawdzono zasoby nowego wątku offline po zainstalowaniu service workera v4.

Przeglądarkowe testy wykonano w lokalnym Microsoft Edge przez Playwright. Szerokości mobilne to emulacja widoku, nie test na fizycznym telefonie. Nie przechodzono w całości wszystkich trzech zakończeń głównej historii.

Uruchomienie:

```sh
node --test tests/story.test.cjs tests/conversations.test.cjs
node serve.js
# W drugim terminalu, przy dostępnym Playwright:
node tests/browser.cjs
node tests/conversations.browser.cjs
```

Możliwe nadpisania: PLAYWRIGHT_MODULE (ścieżka pakietu), CHROMIUM_PATH (przeglądarka), TEST_BASE_URL (serwer), TEST_SCREENSHOT_DIR (katalog zrzutów nowego testu).
