# ColdTrace — ponowny audyt REA, 27.10.2026

To uzupełnienie wcześniejszego badania na gałęzi `rea`. Aktualny stan obejmuje **201 unikatowych JSON** w lokalnym zbiorze: wcześniejsze 96 oraz 105 nowo pobranych wersji językowych.

## Nowe ustalenia

- **[Dane i języki](data/WARIANTY-JEZYKOWE-I-BRAKI.md):** wszystkie 10 znanych konfiguracji ma publiczne dane pytań w ośmiu wersjach językowych. 1688 rekordów to osiem wersji 211 rekordów, nie 1688 nowych zagadek. Trzy konfiguracje pozostają niewydane. W siedmiu nieangielskich wariantach niewydanego Sami dane wątków i podglądów są puste; to statyczne ryzyko, nie potwierdzony błąd gry produkcyjnej.
- **[Minigry i ikony](apps/MINIGRY-I-IKONY.md):** 48 ID z rejestru `surfaces`, 49 w unii tego rejestru i zbadanych układów ekranu. Rejestr pomija cztery kafelki w Ghost i Wren. Własny test potwierdził w Ghost ikony oraz uruchomienie Pac-Mana i Tetrisa. W raporcie są również trzy kandydaty błędów do dalszego testowania.
- **[Obserwacja na żywo](runtime/DZIENNIK.md):** po zamknięciu późniejszej oferty w zachowanej sesji Noor dostępny jest telefon, ale po otwarciu przewodniczki wróciło pytanie 4. Jego ponowne rozwiązanie ponownie wyświetliło ofertę. To wynik tej sesji; początkową ofertę dało się zamknąć i rozpocząć darmową grę.
- **[Analiza REA](rea-zakres.json):** ponowiono analizę brakującego modułu na większym limicie pamięci oraz fragmentach z mapą do oryginalnych offsetów. REA przeanalizowało 15 z 16 fragmentów, a z dalszego podziału ostatniego fragmentu 7 z 8 instrukcji. Jedna funkcja nadal przekroczyła limit pamięci. Fragmenty nie zachowują pełnego kontekstu między sobą; wcześniejszy Babel AST sparsował cały oryginalny plik. Nie należy nazywać tych wyników kompletnym grafem semantycznym.

W 120 dostępnych wariantach sprawdzono 10 728 wskaźników do 1115 znanych adresów mediów: nie znaleziono nowego URL. Jeden wcześniejszy 404 `ghost_id_card.webp` ma w części interfejsu alternatywne renderowanie; miniaturę dokumentu potwierdzono w sesji Ghost.

Sprawdzono hashe i wskaźniki. Dane z backendu odpowiedzi i binarium iOS pozostają poza zebranym materiałem; test WWW nie potwierdza działania na fizycznym iPhonie. Dokładne daty, statusy i źródła są w raportach i CSV. Surowe scenariusze oraz pełne grafy REA zachowano lokalnie jako materiał roboczy.
