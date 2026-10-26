# ColdTrace — analiza konstrukcji gry i inwentarz

Stan badania: 26 października 2026. Producent: Saclic Studio. Materiał zawiera spoilery dotyczące konstrukcji zagadek.

## 1. Co rzeczywiście zostało zbadane

Zidentyfikowano oficjalne wydanie iOS oraz oficjalną grę przeglądarkową. Przeanalizowano pobrane skrypty klienta WWW, publiczne pliki scenariuszy i danych aplikacji telefonu, referencje do multimediów oraz dostępne pliki binarne mediów. Narzędzie REA wykonało analizę statyczną czterech wybranych skryptów oraz śledzenie ścieżki odpowiedzi. W przeglądarce sprawdzono wybór sprawy, samouczek, oferty subskrypcji i początek pierwszego śledztwa. Dokładny zasięg obserwacji runtime opisuje dołączony dziennik.

**R:** Przeprowadzono normalną ścieżkę czterech pierwszych pytań Noor, bez zmiany zapisu gry lub konsoli. Otwierano wiadomości, mapy, pocztę i bank; serwer potwierdził cztery rozwiązania. Następnie pojawiła się oferta wymagająca płatnego dostępu. Dalszych etapów nie przedstawiam jako rozegranych. Przejściowe problemy obsługi myszy rozwiązano sterowaniem klawiaturą oraz rzeczywistym przeciągnięciem suwaka telefonu.

**S:** Odczyt Apple dla polskiego sklepu zwrócił wersję 1.3.0, identyfikator `com.saclicstudio.coldcase`, minimum iOS 15.0, rozmiar 192449536 bajtów i 13 deklarowanych języków, w tym polski. Metadane nie są pakietem instalacyjnym.

**To nie jest pełna dekompilacja iOS ani dowód ukończenia wszystkich spraw.** Nie pozyskano IPA, nie zbadano natywnego pliku wykonywalnego, nie odzyskano implementacji serwera. Zawartość WWW nie dowodzi równoważności z wydaniem iOS. Nie uruchamiano płatnej subskrypcji ani nie modyfikowano uprawnień dostępu. Pobrano dane udostępniane publicznie i wskazane w dostarczonym kliencie; chronione treści zwracane dopiero po odblokowaniu pozostają luką.

Oznaczenia dowodów:

- **D** — zaobserwowana zawartość publicznych plików danych; dowód statyczny.
- **K** — zaobserwowany kod dostarczony przeglądarce; dowód statyczny.
- **R** — zachowanie rzeczywiście zaobserwowane podczas obsługi strony.
- **S** — informacja sklepu lub producenta, bez niezależnej weryfikacji w grze.
- **W** — wniosek projektowy autora raportu, a nie odzyskana deklaracja producenta.

## 2. Istota doświadczenia

**W:** Główną siłą konstrukcji jest wiarygodność osobistego archiwum. Gracz przegląda ślady życia jednej osoby, a przewodnik nadaje tym śladom emocjonalny sens. Sama liczba dymków czatu nie wystarcza: ten sam fakt pojawia się w różnych mediach i dopiero ich zestawienie zmienia interpretację wydarzenia.

**D/K:** Wspólny szkielet to wprowadzenie, rozmowa z osobą proszącą o pomoc, przygotowanie kopii telefonu, eksploracja aplikacji, kolejne pytania, serwerowa ocena odpowiedzi i końcowe wskazanie podejrzanych. To zasadniczo śledztwo prowadzone etapami, z możliwością swobodnego poruszania się po telefonie w obrębie dostępnej zawartości. Nie ma dowodu, że samo swobodne przeglądanie tworzy dowolnie rozgałęzioną fabułę.

**D/W:** Wybory we wprowadzeniu Noor są zapisane jako alternatywne wypowiedzi w liniowej liście. W tych rekordach nie ma identyfikatorów osobnych gałęzi. Dają graczowi głos i ustalają ton rozmowy, lecz nie stanowią dowodu kilku różnych przebiegów sprawy. Nie należy utożsamiać dwóch przycisków odpowiedzi z dwoma rozdziałami fabularnymi.

## 3. Inwentarz siedmiu dostępnych spraw

| Sprawa | Aplikacje / ekrany | Rekordy pytań i finału | Wiadomości | Notatki | E-maile | Połączenia | Kalendarz | Zdjęcia widoczne |
|---|---|---|---|---|---|---|---|---|
| noor | 19 | 21 | 353 | 21 | 28 | 31 | 9 | 59 |
| felix | 22 | 20 | 318 | 11 | 20 | 31 | 35 | 116 |
| rei | 23 | 20 | 511 | 9 | 27 | 29 | 39 | 103 |
| liv | 22 | 20 | 249 | 6 | 17 | 26 | 69 | 78 |
| ghost | 18 | 22 | 388 | 8 | 24 | 31 | 18 | 50 |
| ava | 22 | 19 | 454 | 11 | 10 | 21 | 14 | 113 |
| wren | 17 | 25 | 149 | 6 | 8 | 5 | 18 | 80 |

Liczby dotyczą angielskich plików publicznych z tego pobrania. Wiadomości to dymki z `phoneData.npcMessages`, bez doliczania wszystkich innych komunikatorów, wprowadzenia i odpowiedzi przewodnika. Kontakty liczone są jako rekordy per sprawa, a nie unikalne osoby w całej grze. Fotografie to elementy list `photos.visible`; ta liczba nie jest liczbą wszystkich plików obrazów ani odzyskanych usuniętych zdjęć.

Lista ma łącznie 147 rekordów. Kod traktuje ostatni indeks jako przejście do osobnego ekranu oskarżenia. Odpowiada to 140 etapom formularza odpowiedzi i siedmiu finałom, a nie 147 zwykłym polom tekstowym.

**D:** Rejestr klienta zawiera także Isla, Pia i Sami, lecz wszystkie trzy mają wyłączone flagi wydania i widoczności. Zostały odnotowane jako niewydane konfiguracje; nie przedstawiam ich jako dostępnych spraw. Nie pobierano ich scenariuszy.

### Noor — The Millfield Tapes

**D/W:** Zadania przechodzą od prostego ustalenia odbiorcy wiadomości do powiązań między dokumentacją medyczną, pracą zawodową i próbą ujawnienia dowodów. Dwa etapy wykorzystują różne znaczenia dat: początek współpracy i zakończenie eksportu. W pierwszym z nich badanie runtime ujawniło rozbieżność między wskazówką o wpływie pieniędzy a dokumentem oczekiwanym przez walidator — szczegóły w sekcji 12. Późniejsze etapy zestawiają relacje bliskich, nagranie, zdjęcia, wyniki badań i niedokończoną wysyłkę. Na końcu gracz ma rozróżnić relację osobistą, motyw i odpowiedzialność. Projektowo najważniejsze jest powracanie do wcześniej widzianych danych z nowym pytaniem. Źródło: `noor-public.en.json`, `/questions`, `/phoneData`, `/locks`.

### Felix — The Plunge

**D/W:** Śledztwo bada sprzeczność między oficjalną wersją zdarzenia a danymi sportowymi, fotografią automatyczną, nagraniem i komunikacją osób zaangażowanych. Reddit, Snapchat, Strava i BeReal pełnią różne funkcje dowodowe. Część zagadek dotyczy nie samego zdarzenia, lecz tego, dlaczego materiał nie dotarł do odbiorcy i jak później ukształtowano jego interpretację. Ważny wzorzec projektowy: rozdzielić czyn fizyczny, przekazanie ostrzeżenia, interes instytucji i blokadę transmisji. Źródło: `felix-public.en.json`, `/questions`, oraz osobne dane aplikacji Felix.

### Rei — The Dossier

**D/W:** Śledztwo wykorzystuje środowisko treningowe i zależności służbowe. Obok typowych aplikacji występują KakaoTalk, Choeaedol i MyBox. Etapy łączą dokumentację zdrowotną, eufemizmy, nagrania, archiwum poprzedniczki, kopię bezpieczeństwa, dziennikarza i dokumenty umowne. Kulturowe osadzenie nie sprowadza się do nazw postaci: zmienia rodzaj aplikacji, relacji i dowodów. Źródło: `rei-public.en.json`, `/questions`, rejestr `surfaces`, osobne dane aplikacji Rei.

### Liv

**D/W:** Telefon należy do Daniela Cole’a, a nie do Liv. To celowa zmiana perspektywy: gracz bada urządzenie osoby prowadzącej fałszywe relacje. Zadania wykorzystują powtarzalne formułki, wspólne zdjęcia profili, błędy językowe i ścieżkę wpłat. Poszczególne elementy ujawniają skalę działania, tożsamości i podział ról. Następnie sprawa przechodzi od oszustwa do wydarzeń ostatniej nocy. Źródło: rejestr `/liv/deviceOwner`, `liv-public.en.json`, `/questions`, dane Spark, Tide i Vault.

### Ghost

**D/W:** Najważniejsza jest sprzeczność między śmiercią właścicielki a dalszym życiem telefonu. Wykres zdrowotny, aplikacja działająca w tle, uprawnienia, sesje, zdalne usunięcie nagrania, lokalizacja, przelew i metadane zdjęcia składają się na łańcuch dowodów. Część pytań wprowadza też zagrożenie wobec osoby aktualnie prowadzącej analizę. Uwaga: występujące w fikcyjnym pytaniu uproszczenia medyczne nie są wiedzą medyczną potwierdzoną raportem. Źródło: `ghost-public.en.json`, `/questions`, dane Custos, Health, iCloud, FindMy i Revolut.

### Ava

**D/W:** Historia opiera się na zaginionej osobie, nie na automatycznym założeniu zabójstwa. Bilet, brak wejścia do pojazdu, alibi, obce urządzenie na koncie i anonimowy numer zmieniają znaczenie wcześniejszych tropów. Sekret rodzinny pozwala ustalić tożsamość nadawcy; stara fotografia objaśnia nazwę miejsca. Fałszywy trop okazuje się działaniem samej poszukiwanej osoby. Źródło: `ava-public.en.json`, `/questions`; osobna ścieżka klienta ładuje także dane anonimowego numeru.

### Wren

**D/W:** Oficjalne rozstrzygnięcie i oskarżenie społeczności są punktem wyjścia, nie rozwiązaniem. Gracz porównuje datę śmierci z późniejszymi publikacjami, stylem wypowiedzi, lokalizacją i datą zdjęć. Pojawiają się telefon przemieszczający się po śmierci właścicielki, automatyczne zdjęcie, alibi, skasowane multimedia i cecha ubioru widoczna w materiale filmowym. Najważniejszy wzorzec: odróżnić właściciela urządzenia, autora publikacji i aktualnego posiadacza telefonu. Źródło: `wren-public.en.json`, `/questions`, dane Photos, Instagram, FindMy, Polarsteps i YouTube.

## 4. Jak prowadzone są zagadki

**D/K:** Rekord pytania zawiera identyfikator, treść zadania, komentarz przewodnika i miejsce na podpowiedzi. Nie zawiera kompletnej implementacji walidacji odpowiedzi. Klient przesyła do serwera identyfikator sprawy, pytania, wpisaną odpowiedź i język. Odpowiedź serwera może potwierdzić rozwiązanie, dostarczyć korektę albo uruchomić podpowiedź.

**K:** Po pozytywnym wyniku kod przewiduje około 700 ms przed przejściem do dalszego etapu. Formularz blokuje ponowne wysłanie podczas trwającego żądania. Zmiana pytania czyści stan błędu, prób i podpowiedzi. To zachowanie zapisane w kliencie; nie jest pomiarem czasu odpowiedzi serwera.

**W:** W scenariuszach powracają następujące funkcje zagadek:

1. Potwierdzenie tożsamości urządzenia przez szczegół osobisty.
2. Odczyt prostego faktu, który uczy poruszania się po konkretnej aplikacji.
3. Zestawienie dwóch źródeł mówiących o tym samym zdarzeniu.
4. Kod wynikający z relacji, daty lub historii osoby.
5. Pozornie zwyczajny element, który otrzymuje drugie znaczenie.
6. Obalenie wygodnego wyjaśnienia za pomocą niezależnego śladu.
7. Identyfikacja osoby przez stały styl języka, zdjęcie lub metadane.
8. Ustalenie sposobu ukrycia lub niedostarczenia materiału.
9. Zmiana interpretacji osoby wcześniej wyglądającej na podejrzaną.
10. Końcowe rozdzielenie sprawcy, pomocnika i osoby mającej motyw.

Dołączony `mapa-147-etapow.csv` zawiera autorskie polskie opisy funkcji każdego etapu, identyfikatory i dokładne wskaźniki JSON. Jest mapą struktury, nie gwarantowanym solucjonistą: nie zawiera niezweryfikowanej listy odpowiedzi akceptowanych przez backend.

## 5. Telefon jako system aplikacji

**D/K:** Aplikacje są symulacjami wewnątrz jednego klienta, a nie dostępem do rzeczywistych prywatnych kont zewnętrznych. Scenariusze nadają im zawartość i wygląd zależny od sprawy.

| Rodzina | Rola w śledztwie | Konkretne ślady w danych i kodzie |
|---|---|---|
| Wiadomości i kontakty | Relacje, kolejność zdarzeń, styl osoby | Nadawca, tekst, godzina, awatar, metadane kontaktu |
| Signal i komunikatory | Poufny kanał, inne grupy społeczne, osobne blokady | Osobne wątki i żądania odblokowania wybranych aplikacji |
| Notatki | Wewnętrzny głos właściciela, instrukcje awaryjne | Przypięcie, data, podgląd, treść, stan blokady |
| Poczta | Formalne potwierdzenia i dokumenty | Korespondencja medyczna, rezerwacje, potwierdzenia i załączniki |
| Zdjęcia | Tożsamość, miejsce, relacja, detal ubrania | Albumy, zdjęcia widoczne, osobna chroniona zawartość |
| Dyktafon | Subiektywne świadectwo i napięcie | Odtwarzacz audio, czas trwania, pliki głosowe |
| Kalendarz | Daty i planowany ruch bohatera | Wpisy, przypomnienia i załączniki |
| Przeglądarka | Zamiary, lęki i ukryte zainteresowania | Historia, usunięta historia, symulowane strony |
| Mapy i lokalizacja | Alibi i fizyczna obecność | Lista punktów, opisy i współrzędne ekranu; w wybranych sprawach historia urządzeń |
| Media społecznościowe | Publiczna tożsamość kontra prywatne życie | Posty, rozmowy, obserwowani i obserwujący, siatki zdjęć |
| Bank i portfele | Motyw ekonomiczny i powiązania osób | Historia przelewów, konta, etykiety i sumowanie wartości |
| Zdrowie | Niezależny zegar zdarzeń | Rekordy zdrowotne i wykresy w konkretnych sprawach |
| Ustawienia i chmura | Urządzenie jako dowód techniczny | Sesje, stan telefonu, aplikacje w tle i konta |
| Gry i narzędzia | Wrażenie zwyczajnego telefonu | Mini-gry, kalkulator, zegar i pogoda |

**W:** Drobne aplikacje i zwyczajne wpisy pełnią funkcję tła. Nie każdy ekran powinien zawierać istotny trop. Jednak tło musi pasować do osoby, miejsca i czasu; losowe dane zwiększają objętość, ale osłabiają wiarygodność.

## 6. Rozmowy i tempo

| Sprawa | Kroki wprowadzenia | Punkty wyboru | Suma zadeklarowanych opóźnień | Zakres zadeklarowanej pauzy |
|---|---|---|---|---|
| noor | 29 | 4 | 37.9 s | 0.8–2.4 s |
| felix | 21 | 3 | 30.8 s | 1.0–2.6 s |
| rei | 21 | 3 | 32.0 s | 1.0–2.6 s |
| liv | 16 | 3 | 23.8 s | 0.8–2.4 s |
| ghost | 18 | 3 | 24.8 s | 1.0–2.4 s |
| ava | 11 | 2 | 14.6 s | 0.8–2.2 s |
| wren | 8 | 1 | 10.8 s | 0.8–2.2 s |

**D:** Suma opóźnień nie jest czasem ukończenia rozmowy: nie obejmuje czytania, wyborów i dodatkowych animacji. Noor ma cztery punkty wyboru, a Wren jeden. To istotna różnica długości wprowadzeń mimo wspólnego silnika.

Są to wartości zadeklarowane w danych. Klient dodatkowo modyfikuje pauzy na podstawie długości wypowiedzi. Dokładną regułę i obliczony czas zawiera `ColdTrace-analiza-techniczna.md` oraz `tempo-wprowadzen.csv`.

**D/W:** Zwykłe wiadomości zawierają towarzyskie drobiazgi, urwane zdania i zmiany tonu. Ich funkcją jest ustanowienie normalnego życia, wobec którego niepokojący szczegół staje się widoczny. Przewodnik nie ogranicza się do komunikatu o zaliczeniu: komentarz po rozwiązaniu wyjaśnia, jak odkrycie wpływa na rozumienie osoby i zdarzenia.

**W:** Własna produkcja powinna rozdzielać: fakt, interpretację gracza, emocjonalną reakcję przewodnika i nowy kierunek szukania. Jeśli każda reakcja jedynie powtarza odpowiedź, dialog staje się formularzem. Jeśli kolejne pytanie od razu zdradza cały sens tropu, gracz traci poczucie samodzielnej dedukcji. To ryzyko widoczne w konstrukcji prowadzonej pytaniami, nie potwierdzony pomiar satysfakcji wszystkich graczy.

## 7. Warstwa wizualna

**R:** Wybór sprawy używa ciemnego tła, dużej wąskiej typografii, żółtego akcentu oraz portretu osadzonego w przechylonej ramce przypominającej zdjęcie natychmiastowe. Samouczek wykorzystuje fotografie i materiały śledcze jako tło oraz proste, duże komunikaty. Interfejs zakupu utrzymuje ten sam kontrast i akcent kolorystyczny.

**K:** Ramka telefonu dla większego ekranu ma bazowo 375 × 812 px, mocno zaokrąglone narożniki i kilka warstw obrysu/cienia. Na mniejszych ekranach kod przechodzi na pełną szerokość i wysokość dynamicznego widoku oraz usuwa zewnętrzną ramkę. Zegar jest wyprowadzany z bieżącego czasu i języka; kod odświeża go co 20 sekund. Nie jest to dowód, że fabularne wpisy mają bieżącą datę.

**S:** Pięć promocyjnych obrazów z App Store pokazuje imitację telefonu, komunikację z Mayą, albumy, ekran główny i nakładkę pytania. Są materiałem sklepowym, nie screenshotami wykonanymi podczas mojej sesji na iPhonie. Zestawienie zapisano jako `materialy-app-store.jpg`.

**W:** Spójność zapewniają dwa poziomy stylistyczne: zewnętrzna oprawa kryminalna oraz wewnętrzne aplikacje przypominające codzienny telefon. Największy efekt daje kontrast zwyczajnego interfejsu ze znaczeniem znalezionych danych. Sam filtr filmowego ziarna nie zastąpi spójnych twarzy, czasu, miejsc i relacji.

## 8. Multimedia — co zebrano i co oznaczają liczby

Pobrano **1678 plików** wskazanych przez kod i dane, łącznie **243,100,440 bajtów** (około 243 MB). Wśród nich są:

- 1603 pliki WebP;
- 68 plików MP3 i 4 WAV, łącznie około 22 minuty 15 sekund audio;
- 2 pliki MP4: 8-sekundowy materiał scenariusza i około sekundowy efekt przejścia;
- jeden dokument PDF zachowany w materiale roboczym.

Pliki mają **1552 różne hashe SHA-256**. To nie jest liczba niezależnych scen. Spośród 1689 sprawdzonych adresów 11 zwróciło 404. Dodatkowo pobrano pięć promocyjnych obrazów Apple oraz cztery fonty, liczone oddzielnie. Z kodu odtworzono również 147 unikalnych fragmentów SVG; ich zakres i ograniczenia opisuje drugi raport.


Dokładne URL-e, SHA-256, rozmiary, rozdzielczości, czasy i źródła referencji są w `inwentarz-zasobow.csv`. Liczba plików obejmuje warianty i pliki współdzielone pod różnymi adresami. Identyczny hash jest mocniejszym dowodem duplikatu niż podobna nazwa. Zawartość audio sprawdzono technicznie; nie odsłuchano i nie przepisano wszystkich nagrań. Nie przypisuję im konkretnych aktorów, modelu TTS ani dostawcy generowania obrazów.

**D:** Szesnaście pobranych obrazów ma rozdzielczość 1 × 1 px. Są to w praktyce pikselowe pliki zastępcze; status HTTP 200 nie oznacza, że odzyskano w tych miejscach pełnowartościowe zdjęcia. Katalog umieszcza je na końcu listy. Aktualny zakres nagrań i transkrypcji opisuje `analiza-audio.csv`.

**D/K:** W danych scenariusza występują jawne ścieżki logiczne oraz hashowane URL-e CDN. Pobrano dokładnie wskazane adresy, bez zgadywania hashy. Publiczny katalog nie jest pełnym katalogiem plików ukrytych: serwerowe odblokowanie może dostarczać dodatkowe treści.

**W:** Dla własnej gry najcenniejszy jest podział funkcji mediów: portret ustanawia tożsamość; zwykłe fotografie budują życie; fotografia dowodowa zmienia interpretację; nagranie dodaje obecność i subiektywność; dokument wiąże kilka śladów; krótki film pozwala zobaczyć ruch lub detal nieczytelny na zdjęciu. Kopia tej struktury wymaga własnych, spójnych materiałów, a nie podmiany samych imion.

## 9. Architektura klienta i serwera

**K:** Strona dostarcza skrypty Next.js/Turbopack i komponenty React. Dane scenariuszy są odrębne od klienta: osobny rejestr określa właściciela telefonu, przewodnika, rok kalendarza, widoczne aplikacje, grafiki i domyślny punkt ograniczenia dostępu. Nie jest to dowód użycia tej samej technologii w aplikacji iOS.

| Operacja klienta | Dane wysyłane / rola | Co pozostaje nieznane |
|---|---|---|
| `/api/answer` | Sprawa, pytanie, odpowiedź, język | Normalizacja, synonimy, reguły i pełny zbiór poprawnych odpowiedzi |
| `/api/hint` | Sprawa, pytanie, poziom, liczba prób, język, kontekst | Algorytm doboru i komplet treści podpowiedzi |
| `/api/unlock` | Sprawa, cel blokady, kod, język | Właściwe sekrety i pełne chronione odpowiedzi |
| `/api/accuse` | Sprawa, lista wskazanych podejrzanych, język | Wszystkie wyniki i reguły końcowej oceny |
| `/api/premium` | Odczyt stanu konta i dostępu | Rzeczywista logika przyznawania uprawnień |
| `/api/checkout` | Plan i kontekst wejścia do oferty | Pełna konfiguracja płatności na serwerze |
| `/api/portal` | Dostęp do obsługi istniejącego rozliczenia | Zachowanie dla płacącego konta |

Nie wykonywano prób odgadywania kodów, masowego zgadywania odpowiedzi ani wywoływania zakupów. Lokalny zapis klienta opisano jako mechanizm trwałości, a nie sposób omijania dostępu.

**K:** Stan postępu i faza wprowadzenia są przechowywane pod kluczami zależnymi od sprawy. Występują odrębne klucze dla ukończenia wstępu, pozycji pytania i stanu oferty. Kod przewiduje także wariant eksperymentu zmieniający położenie bramki. Domyślne `gateIndex=3` we wszystkich siedmiu konfiguracjach nie dowodzi identycznego momentu paywalla w każdej sesji.

**K:** Obecne są elementy logowania oparte o Supabase, analityka PostHog i śledzenie zdarzeń ofertowych. Dostępne napisy opisują także program poleceń i program twórców. Sama obecność napisów nie potwierdza bieżącego działania tych programów. Nie odzyskano sekretów serwera i nie badano kont innych osób.

**REA:** Cztery wskazane pliki zostały poprawnie sparsowane, bez błędów parsera. Narzędzie odwiedziło 219106 węzłów AST i odczytało 950327 bajtów tekstu w wybranym zakresie. Graf pozostaje częściowy; 20 innych plików inwentarza było poza wybraną analizą, a część semantycznych obserwacji osiągnęła limit. Śledzenie `/api/answer` znalazło jeden punkt zaczepienia, 122 węzły i 150 relacji, ale jest relacją statyczną, nie dowodem wykonania tych ścieżek. Pełne artefakty REA zachowano w katalogu roboczym.

Analiza REA dotyczyła wcześniejszego snapshotu katalogu źródeł, zanim dodano pliki danych. Identyfikator źródłowej analizy to `ev_f3a78e8438c7edeef24ac5bec11aea00909f53682019bba0574cf21e2f2e7237`; hash tego snapshotu: `ed910ac4942f8b3eb46bad94cc943c903ef04477ae45b07cba84a81f01c71ff9`. Późniejsze inwentarze opisują szerszy zbiór. Tożsamość poszczególnych skryptów można porównać po hashach w CSV.

## 10. Monetyzacja i obserwowany lejek

**R:** Po wstępie widoczna była oferta tygodniowa 6,99 EUR oraz roczna wyświetlana jako 2,92 EUR miesięcznie, z trzydniowym okresem próbnym i późniejszą opłatą 34,99 EUR rocznie. Po zamknięciu pojawiła się dodatkowa oferta 19,99 EUR rocznie z odliczaniem od godziny. Po jej zamknięciu gra dopuściła rozmowę wprowadzającą. Screenshoty dokumentują tę konkretną sesję; ceny nie są potwierdzoną ofertą polskiego App Store.

**R:** Po czterech poprawnych odpowiedziach pojawiło się podsumowanie postępu i kolejna oferta. W tym miejscu cena roczna była normalizowana do 0,67 EUR tygodniowo. W tej sesji ograniczenie postępu wystąpiło więc po czwartym pytaniu. Nie aktywowano okresu próbnego ani zakupu.

**W:** Mechanizm sprzedażowy działa przed doświadczeniem właściwego telefonu i ponownie może działać w toku postępu. Oferta po zamknięciu zwiększa presję decyzji, a normalizacja ceny rocznej do miesięcy zmienia sposób porównania. Nie ustalono, czy licznik oferty jest trwały między urządzeniami lub sesjami; nie należy przedstawiać go jako rzeczywistej jednorazowej dostępności bez takiego testu.

**S:** Sklepy opisują reklamy i zakupy w aplikacji. Te deklaracje nie wystarczają do rozpisania współczesnej polityki reklam dla każdej platformy i kraju. Ceny w tekstach lokalizacyjnych mogą być przykładowe lub nieużywane; do porównania oferty trzeba używać rzeczywiście wyświetlonego ekranu.

## 11. Dlaczego ta konstrukcja sprawia wrażenie jakościowej

Poniższe punkty są oceną projektową opartą na danych i dostępnych obserwacjach, a nie deklaracją, że każdy fragment gry spełnia je bez błędów.

1. **Jedna osoba, wiele zgodnych śladów.** Ten sam charakter powinien być rozpoznawalny w korespondencji, zdjęciach, kalendarzu i języku.
2. **Własny świat każdej sprawy.** Aplikacje dobierane są do środowiska: sport, przemysł rozrywkowy, randkowanie, podróże, inwigilacja.
3. **Przewodnik z osobistą stawką.** Odkrycie zmienia to, co bliska osoba myśli o zmarłym lub zaginionym.
4. **Powracające dowody.** Wcześniejszy szczegół nabiera znaczenia dopiero po nowym odkryciu.
5. **Sprzeczne perspektywy.** Deklaracja postaci, fotografia i zapis techniczny nie muszą mówić tego samego.
6. **Zwyczajne tło.** Telefon nie wygląda jak lista samych kluczy do zagadek.
7. **Tropy wymagające czynności.** Gracz sprawdza datę, porównuje wiadomości, sumuje kwoty lub odnajduje zdjęcie.
8. **Odrębne role w przestępstwie.** Wyjaśnienie nie zawsze sprowadza się do jednego podejrzanego.
9. **Czytelny kontrakt interfejsu.** Znane wzorce telefonu pozwalają skupić uwagę na znaczeniu danych.
10. **Dawkowanie głosu i obrazu.** Multimedia mają zmieniać odbiór dowodu, a nie tylko dekorować ekran.

## 12. Ryzyka i słabsze miejsca do sprawdzenia

**Potwierdzona rozbieżność w zadaniu Noor q4 (R/D):** tekst prosi o datę pierwszego wpływu pieniędzy od Reiss. Bank pokazuje wpływ wynagrodzenia 1 października. Odpowiedź `1001` została odrzucona, a korekta skierowała do skrzynki pocztowej. Faktura jest datowana na 7 października i oznaczona INV-1007; odpowiedź `1007` została zaakceptowana, co potwierdziło podsumowanie czterech rozwiązanych pytań. Dodatkowo publiczna notatka o datach wskazuje fakturę. Problem dotyczy spójności polecenia z innymi widocznymi danymi. Nie sprawdzono wszystkich wariantów formatu daty ani osobno kodu odblokowania samej notatki. Dowody: `pytanie-4-rozbieznosc.png`, `zaliczone-4-pytania.png` oraz dziennik runtime.

- **Prowadzenie za rękę:** pytanie potrafi wskazać aplikację i interpretację. Potrzebny test, czy gracz naprawdę dedukuje.
- **Wąskie uznawanie odpowiedzi:** bez zbadania backendu nie wiadomo, czy naturalne parafrazy i polskie odmiany są akceptowane.
- **Niejednakowe wydania:** w iOS changelog wspomina Liv, Polly, Elspeth i Hollie; rejestr tej wersji WWW ma inny zestaw dostępnych spraw.
- **Brak pliku a brak funkcji:** 404 przy części ścieżek może oznaczać zasób zastąpiony CDN-em, fallback lub kod nieużywany. Nie jest automatycznie potwierdzonym błędem widocznym dla gracza.
- **Tłumaczenie:** iOS deklaruje język polski, lecz próba pobrania `ui.pl.json` dla tego wydania WWW zwróciła 404. Nie dowodzi to braku polskiego w iOS.
- **Wiarygodność mediów:** spójność twarzy, miejsca, kadru i czasu wymaga osobnej weryfikacji scen po scenie. Nie potwierdzono dostawcy generowania mediów.
- **Uzależnienie od serwera:** pełna kopia wizualna nie daje odpowiedzi, podpowiedzi, odblokowań i zakończeń.
- **Walidacja dostępności:** nie wykonano pełnego audytu czytnika ekranowego, kontrastu, urządzeń ani wydajności.

## 13. Model projektowy do wykorzystania we własnej produkcji

To propozycja autora raportu, nie odzyskany kod źródłowy producenta.

```text
Sprawa
 ├─ właściciel telefonu i przewodnik
 ├─ zamknięta prawdziwa chronologia wydarzeń
 ├─ osoby, wiedza każdej osoby i jej relacje
 ├─ aplikacje oraz materiał codzienny
 ├─ dowody: treść, czas, autor, miejsce, wiarygodność
 ├─ pytania: cel dedukcji, wymagane źródła, dopuszczalne odpowiedzi
 ├─ blokady: reguła kodu, uczciwa wskazówka, odblokowana zawartość
 ├─ reakcje przewodnika i kolejne pytania
 └─ finał: odpowiedzialność, motyw, mechanizm, kontrdowody
```

**W:** Pracę nad podobnym poziomem jakości warto zacząć od jednej kompletnej sprawy. Najpierw ustalić chronologię i dowody, następnie dialogi oraz fałszywe tropy, dopiero potem produkować zdjęcia i nagrania. Każdy istotny wniosek powinien mieć wskazane źródło, a każda blokada uczciwie dostępny sposób rozwiązania. Krytyczna informacja nie powinna zależeć od przypadkowego zauważenia jednego nieopisanego piksela.

Minimalny warunek gotowości: nowa osoba przechodzi sprawę na czystym zapisie bez konsoli i podawania jej rozwiązań, rozumie końcowy łańcuch dowodów i nie musi odgadywać sformułowania oczekiwanego przez walidator. Osobno trzeba sprawdzić przerwanie aplikacji, powrót do zapisu, brak sieci podczas odpowiedzi, podwójne wysłanie, odblokowanie pliku i powrót z oferty.

## 14. Czego brakuje do pełnego rozebrania wydania iOS

| Brak | Dlaczego ma znaczenie | Potrzebny materiał |
|---|---|---|
| Pakiet IPA / dostępne pliki aplikacji | Silnik, biblioteki, natywne UI, zasoby i wersja binarna | Pakiet pochodzący z własnej instalacji i dostępny do analizy |
| Pełny zapis rozgrywki iOS | Rzeczywiste gesty, czas, animacje, powiadomienia i różnice platformowe | Sesja na urządzeniu, najlepiej z nagraniem i dziennikiem wersji |
| Ukończenie wszystkich spraw | Faktycznie osiągalne zakończenia i zależności | Legalnie dostępny pełny zakres gry |
| Reguły serwera | Akceptowane warianty odpowiedzi, kody, wskazówki, ocena finału | Obserwacje normalnych interakcji lub kod udostępniony przez producenta |
| Chronione multimedia | Niektóre kluczowe dowody wracają dopiero po odblokowaniu | Normalne rozwiązanie odpowiednich zagadek w dostępnej grze |
| Audyt pełnej polskiej wersji | Odmiana nazw, synonimy, spójność wiadomości i dokumentów | Dostęp do polskiego wydania na iOS |

## 15. Źródła i odtwarzalność

- Oficjalna strona: https://coldtrace.co/
- Wybór spraw: https://coldtrace.co/cases
- Wydanie iOS: https://apps.apple.com/pl/app/id6762513021
- Dane Apple: https://itunes.apple.com/lookup?id=6762513021&country=pl
- Wydanie Android: https://play.google.com/store/apps/details?id=com.saclicstudio.coldcase
- Polityka prywatności: https://saclicstudio.com/privacy/coldtrace
- Regulamin WWW: https://coldtrace.co/terms
- Rejestr spraw i ścieżek: `_next/static/chunks/1peok1ww0ltpj.js`.
- Główny klient: `_next/static/chunks/1pfbqbd-z0uj8.js`.
- Dane: `https://coldtrace.co/data/<sprawa>-public.en.json` i towarzyszące pliki wskazane w rejestrze klienta.

`dowody-zrodel.csv` zapisuje adresy i tożsamość pobranych materiałów. `inwentarz-spraw.csv` zawiera policzone rekordy. `inwentarz-zasobow.csv` obejmuje także nieudane pobrania. `mapa-147-etapow.csv` mapuje funkcję każdego zadania na rekord scenariusza. Publiczne źródła mogą zostać zaktualizowane; do porównania wersji należy używać hashy, nie samych nazw plików.

Pliki robocze źródeł, publicznych danych i oryginalnych wyników REA pozostały w `work/coldtrace`. Pakiet wynikowy rozdziela autorską analizę i inwentarze od archiwum dostępnych mediów. Nie stanowi kodu źródłowego gry ani działającej kopii jej serwera.
