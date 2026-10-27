# ColdTrace — dziennik sprawdzenia w przeglądarce

Data: 26.10.2026. Środowisko: oficjalny klient WWW `https://coldtrace.co`, przeglądarka w aplikacji Codex. Nie był to iPhone ani emulator iOS. Poniższe punkty są autorskim zapisem obserwacji; nie są pełnym zapisem sieciowym.

| ID | Czynność i obserwacja | Status / dowód |
|---|---|---|
| R01 | Wybór spraw pokazuje siedem odnośników | Potwierdzone w drzewie dostępności i screenshotcie narzędzia |
| R02 | Odrzucono reklamowe cookies | Banner zniknął |
| R03 | Po potwierdzeniu przez użytkownika rozpoczęto samouczek wymagający akceptacji regulaminu | Potwierdzone przejście do następnych ekranów |
| R04 | Przejście ekranów o wiadomościach, fotografiach, aplikacjach, łączeniu tropów i odpowiedziach | Potwierdzone w UI; przejściowy problem myszy rozwiązano klawiaturą |
| R05 | Pierwsza oferta: 6,99 EUR tygodniowo; plan roczny 34,99 EUR po trzydniowym trialu, pokazywany jako 2,92 EUR miesięcznie | `paywall-web.png`; niczego nie kupiono |
| R06 | Zamknięcie oferty uruchamia ofertę 19,99 EUR rocznie i godzinne odliczanie | `oferta-po-zamknieciu.png`; nie testowano trwałości licznika |
| R07 | Zamknięcie drugiej oferty pozwala rozpocząć rozmowę z Mayą | Potwierdzone w UI |
| R08 | W rozmowie wybrano kolejno pytanie o tożsamość, dalsze wydarzenia, deklarację pomocy i dodatkowe podejrzenia | `rozmowa-wstepna.png`; teksty pojawiają się etapami |
| R09 | Po odebraniu danych telefonu uruchomiono przygotowanie kopii i ekran blokady | Potwierdzone w UI |
| R10 | Rzeczywiste przeciągnięcie suwaka odblokowuje telefon | `telefon-noor.png`; sama próba aktywacji Enterem nie powiodła się |
| R11 | Przycisk przewodniczki otwiera panel pierwszego pytania | `pytanie-1.png` |
| R12 | Odczytano końcówkę rozmowy z Eleną i rozróżniono wiadomość wychodzącą od późniejszych przychodzących | `wiadomosci-elena.png` |
| R13 | Odpowiedź Elena przesłana normalnym formularzem została zaakceptowana; widoczne pytanie 2 | `zaliczone-pytanie-1.png` |
| R14 | Mapy pokazują placówkę Clinique Saint-Louis; odpowiedź tą nazwą została zaakceptowana | `mapy-noor.png`; widoczne pytanie 3 |
| R15 | W poczcie otwarto potwierdzenie skierowania z oznaczeniem AR-2024-1018; odpowiedź AR została zaakceptowana | Widoczne pytanie 4 w kolejnej obserwacji |
| R16 | Pytanie 4 odsyła do pierwszego wpływu pieniędzy. Bank pokazuje wpływ Reiss 1 października. Odpowiedź 1001 została odrzucona i pojawiła się korekta kierująca do poczty | `pytanie-4-rozbieznosc.png`; kontekst banku w obserwacji narzędzia |
| R17 | Odczytano fakturę INV-1007 z 7 października. Odpowiedź 1007 została zaakceptowana | `zaliczone-4-pytania.png` pokazuje cztery rozwiązane pytania |
| R18 | Kontynuacja po czterech pytaniach otwiera ofertę: 34,99 EUR rocznie, pokazywane także jako 0,67 EUR tygodniowo, oraz 6,99 EUR tygodniowo | `paywall-po-4-pytaniach.png`; nie uruchomiono zakupu |

Nie ukończono całej sprawy Noor ani pozostałych sześciu. Nie przetestowano wszystkich wariantów odpowiedzi, kodów blokad, zakończeń, reklam, przywracania zakupów, stanu offline lub powiadomień systemowych. Pierwsze cztery wyniki walidacji nie pozwalają odtworzyć kompletnej implementacji serwera.

Osobno otwarto lokalny katalog multimediów po rozpakowaniu archiwum, wówczas z 1642 rekordami. Po rozszerzeniu materiału bieżąca wersja ma 1677 rekordów. Sprawdzono jej składnię, pliki i integralność archiwum. Nie wykonano ponownego testu filtrowania w przeglądarce, ponieważ lokalne sterowanie przeglądarką zostało wyłączone w ustawieniach w trakcie badania. Katalog jest narzędziem pakietu badawczego, nie oryginalną grą.


## Korekta interpretacji oferty, 27.10.2026

Użytkownik zgłosił kontynuację darmowej gry po użyciu X. To relacja użytkownika, nie nowy test wykonany przez agenta. Odczytane handlery klienta potwierdzają, że początkowe oferty można zamknąć i przejść do rozmowy. Późniejsze oferty również można zamknąć i wrócić na ekran główny telefonu; końcowy handler tej sekwencji jednocześnie zapisuje indeks pytania granicznego. Przeglądanie telefonu oraz zaliczanie następnego pytania należy sprawdzać osobno.

R18 potwierdza wyświetlenie oferty, nie jej niezamykalność ani obowiązek zakupu. Nie wykonano wówczas pełnej sekwencji X/LTO/trial. Szczegółowe dowody statyczne zawiera rozszerzenie z 27.10.2026, `mechanika/ColdTrace-mechanika-klienta.md`. Nie wykonano nowego testu w przeglądarce, ponieważ sterowanie nią było wyłączone w ustawieniach Work.
