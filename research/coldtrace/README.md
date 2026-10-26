# ColdTrace — badanie referencyjne dla Duskwood / MGLISKO

Snapshot badania: **26 października 2026**. Materiał dodano na gałęzi `rea`, opartej na `main` (`5ef89f620888487731454532b7f19ae8637d8d65`). Nie zmienia działania MGLISKA.

## Od czego zacząć

- [Analiza gry](analiza/ColdTrace-analiza.md): mechaniki, fabuła, oprawa i monetyzacja.
- [Analiza techniczna](analiza/ColdTrace-analiza-techniczna.md): aplikacje, stany ekranów, dane i ograniczenia.
- [Jakość ekranów](JAKOSC-EKRANOW.md): rozdzielczości, skala interfejsu, typografia i animacje.
- [Dziennik rozgrywki](analiza/dziennik-runtime.md): wykonane kroki i blokady.
- [147 etapów](analiza/mapa-147-etapow.csv), [48 aplikacji](analiza/48-aplikacji-szczegolowo.csv), [57 gałęzi ekranów](analiza/mapa-stanow-ekranow.csv).
- [Inwentarz zasobów](analiza/inwentarz-zasobow.csv): pochodzenie, hashe, parametry i nieudane pobrania.
- [Katalog multimediów](multimedia/katalog.html): otwórz lokalnie po sklonowaniu repozytorium. Katalog nie uruchamia samej gry.
- [Katalog SVG](analiza/wektory.html): 147 statycznie odtworzonych fragmentów; kolory zależne od CSS mogą odbiegać od oryginału.

## Zakres i kompletność

Zbadano klienta WWW ColdTrace i publiczne dane. Siedem wydanych konfiguracji spraw, 67 plików JSON w materiale roboczym, 140 etapów odpowiedzi tekstowej i siedem finałów. W UI potwierdzono pierwsze cztery pytania Noor, następnie napotkano paywall. Nie aktywowano subskrypcji.

Katalog zawiera **1677 plików multimedialnych**: 1603 WebP, 68 MP3, 4 WAV i 2 MP4. Wśród obrazów jest 16 plików zastępczych 1×1. Manifest uwzględnia także 11 nieudanych pobrań. PDF był analizowany osobno i nie jest w katalogu multimediów.

Publikowany pakiet obejmuje opracowania, inwentarze, zrzuty ekranu i wybrany materiał dowodowy. Nie zawiera zbiorczego eksportu pełnych dialogów, surowego kodu klienta, fontów ani pełnego PDF. Źródłowe pliki i eksporty REA pozostały w lokalnym katalogu roboczym badania. Nie pozyskano IPA ani backendu; nie jest to pełna kopia gry.

## Pochodzenie i wykorzystanie

Źródło gry: [coldtrace.co](https://coldtrace.co/), Saclic Studio. Materiały ColdTrace służą analizie referencyjnej; samo umieszczenie ich w tym katalogu nie nadaje licencji na użycie w MGLISKU. Nie są podłączone do zasobów produkcyjnych gry. Raporty rozróżniają obserwacje UI, ustalenia statyczne i wnioski.

Pliki rozpakowano z dwóch zweryfikowanych archiwów wynikowych, bez przechowywania ich dodatkowych kopii ZIP w Git. [SHA256SUMS.txt](SHA256SUMS.txt) obejmuje pliki tego katalogu; [PUBLISH-VERIFICATION.json](PUBLISH-VERIFICATION.json) opisuje kontrolę publikacji.
