# Mapa scen S1 i rozpiska pakietu P0–P5 (23.10.2026)

Dokument roboczy do `PLAN-WDROZENIA-I-PRZEKAZANIE.md` (P0). Zawiera spoilery S1.

## 1. Przebieg S1 — sceny, wiedza, wyjścia

| Rozdział | Wejście / czas fikcji | Co gracz wie po scenie | Źródła | Wybór → konsekwencja | Wyjście / przerwa |
|---|---|---|---|---|---|
| prolog | 21.10, 21:03, SMS Mai sprzed tygodnia | Maja zaginęła; dzwoniła pod numer zmarłego Rybickiego; Tomek Lis 1997 | Telefon (Ostatnie), SMS, artykuł 2007, nekrolog | zaufanie Kuby/Oli, `kubaGajda` | grupa → **xCel** (nowe) → Szklarz |
| ch1 Chmura | noc 21/22.10 | Nimbus, lokalizacja 14.10 = huta, fotopułapki, kłamstwa Bartka/Oli | Nimbus, kopia, CAM-01/02 | `kubaWaits`/`kubaToldGajda` (leaks) | przerwa `s1_night` → sync 02:13 |
| ch2 Huta | 22.10, 19:40 | Bartek w hucie, klisza, notatka „Pytania”, wejście do huty | CAM 0057, Ciemnia, plany | prywatnie/grupa z Bartkiem | **xSerwis** (nowe) na starcie; `s1_departure`; straszak `s1_cam58` |
| ch3 Peleryna | 23.10, 17:30 | Weronika, tamagotchi, Gajda, auto spod huty | lumpeks, nagranie, rejestracja | `x_peleryna*` | **xBartek** (nowe); `s1_sync`; 03:05 SMS + **scMajaNumer** (nowe) |
| ch4 Sztolnia | 24.10, 09:20 | Znajdź urządzenie, sztolnie, Szklarz = Igor | Nimbus, kadr 23, notatka | wyznanie Igora (`igorMid`) | 22:40 szlaban (bez przerwy — ratunek) |
| ch5 Światło | 24.10 noc | ratunek, 112 vs Gajda | kamera, mapy | finały S1 | `s28`, `s29` |
| epilog | 14.11 | skutki, finał Cisza | — | `epBartek/Igor/Ola` | `scCisza` |

## 2. Straszaki S1 — odstępy (stan po pakiecie)

| ID | Miejsce | Przed | Po | Odstęp |
|---|---|---|---|---|
| `s1_cam58` (face) | ch2, wejście do huty 23:41 | wyjazd po przerwie `s1_departure` | szukanie szatni | — |
| **`s1_maja_numer` (call)** — NOWY, G1 | ch3, 24.10 03:05, chwila online telefonu Mai | przerwa `s1_sync`, SMS „Mamo…” | reakcja Kuby, wiadomości Szklarza | ~1 rozdział od `s1_cam58`, rozdział przed `s1_hand` |
| `s1_hand` (face) | ch5, kamera na żywo | szlaban | telefon 112 | — |
| `s1_cisza_breath` (breath) | epilog, tylko finał Cisza | — | — | — |

Glitche `fx('glitch')` przy wiadomościach Szklarza nie są liczone jako jumpscare'y.

## 3. Nowe sceny (identyfikatory, wpływ na zapis)

| ID | Pakiet | Rozdział | Zapis |
|---|---|---|---|
| `xCel` | P1 | prolog, po „zaraz podeślę ci jej maila” | flaga `p1_planLoc` (opcjonalna); migracja v5 |
| `xSerwis` | P2 | ch2 po tytule | brak nowych flag; trust Oli w 1 opcji |
| `xBartek` | P2 (dzień po przyznaniu Bartka) | ch3 po `xPeleryna` | trust Bartka w 1 opcji |
| `scMajaNumer` | P5 / G1 | ch3, po SMS-ie o 03:05 | `s.scares.s1_maja_numer` (jednorazowe), flaga `s1_pickedMaja`, wpis w rejestrze połączeń |

Migracja: zapisy v4 → v5 przez `STORY_MIGRATIONS_V5` (fixture `tests/fixtures/story-v4-steps.json`, `tools/regen-migrations.cjs`). Zapis w trakcie wyboru wraca do tego wyboru, zapis między krokami — do początku nowej sceny tuż przed nim.

## 4. Do zrobienia (kolejne pakiety)

- G2 (odsłuch od Szklarza przed wyprawą, ch2 przed `s1_departure`) — wymaga projektu dźwięku; niewdrożone.
- P2: scena zakupów/ostatniego autobusu poza opcjonalnym `kuba_delivery`; zachowanie Oli i Igora następnego dnia po wyznaniach.
- P4: łańcuch edycji/wycofania wiadomości i reuploadu.
- P1: pomiar z nowym graczem (czas czytania vs zagadek).
