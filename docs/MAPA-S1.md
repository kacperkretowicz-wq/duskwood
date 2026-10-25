# Mapa scen S1 i rozpiska pakietu P0–P5 (23.10.2026)

Dokument roboczy do `PLAN-WDROZENIA-I-PRZEKAZANIE.md` (P0). Zawiera spoilery S1.

## 1. Przebieg S1 — sceny, wiedza, wyjścia

| Rozdział | Wejście / czas fikcji | Co gracz wie po scenie | Źródła | Wybór → konsekwencja | Wyjście / przerwa |
|---|---|---|---|---|---|
| prolog | 21.10, 21:03, SMS Mai sprzed tygodnia | Maja zaginęła; dzwoniła pod numer zmarłego Rybickiego; Tomek Lis 1997 | Telefon (Ostatnie), SMS, artykuł 2007, nekrolog | zaufanie Kuby/Oli, `kubaGajda` | grupa → **xCel** (nowe) → Szklarz |
| ch1 Chmura | noc 21/22.10 | Nimbus, lokalizacja 14.10 = huta, fotopułapki, kłamstwa Bartka/Oli | Nimbus, kopia, CAM-01/02 | `kubaWaits`/`kubaToldGajda` (leaks) | przerwa `s1_night` → sync 02:13 |
| ch2 Huta | 22.10, 19:40 | Bartek w hucie, klisza, notatka „Pytania”, wejście do huty | CAM 0057, Ciemnia, plany | prywatnie/grupa z Bartkiem | **xSerwis** (nowe) na starcie; `s1_departure`; straszak `s1_cam58` |
| ch3 Peleryna | 23.10, 17:30 | Weronika, tamagotchi, Gajda, auto spod huty | lumpeks, nagranie, rejestracja | `x_peleryna*` | **xBartek** (nowe); `s1_plate` (nowa przerwa po DDZ 6K19, przed `s18`, migracja v6); `s1_sync`; 03:05 SMS + **scMajaNumer** (nowe) |
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
| `xOla` | P2 (dzień po przyznaniu Oli) | ch2 po `s14` | trust Oli w 1 opcji; dwa warianty wg `olaPrivate` |
| `xBartek` | P2 (dzień po przyznaniu Bartka) | ch3 po `xPeleryna` | trust Bartka w 1 opcji |
| `scMajaNumer` | P5 / G1 | ch3, po SMS-ie o 03:05 | `s.scares.s1_maja_numer` (jednorazowe), flaga `s1_pickedMaja`, wpis w rejestrze połączeń |

Migracja: zapisy v4 → v5 przez `STORY_MIGRATIONS_V5` (fixture `tests/fixtures/story-v4-steps.json`, `tools/regen-migrations.cjs`). Zapis w trakcie wyboru wraca do tego wyboru, zapis między krokami — do początku nowej sceny tuż przed nim.

## 4. Do zrobienia (kolejne pakiety)

Stan 24.10: G2 (`scOdsluch`), P2 (`xAutobus`, `igor_sunday`), P4 (`xWycofana`, edycja, reupload) i podział ch3 (`s1_plate`) są wdrożone. Zostaje:
- Anonimowy materiał wideo (P4) — czeka na etap klipów.
- P1: pomiar z nowym graczem (czas czytania vs zagadek), odsłuch straszaków i słabszych finałów przez ludzi, test na fizycznym telefonie.

## 5. Karta sceny P4 (rozpisana, niewdrożona)

```text
ID / status / priorytet: xWycofana / plan / P4
Sezon, rozdział i miejsce: S1, ch3, po xBartek (piątek 23.10 wieczór)
Warunki wejścia: zawsze; wariant zależny od ev_bartek_conf w grupie/prywatnie
Osoby i wiedza: Bartek (wie o zaprawie), Kuba, Ola; gracz widzi grupę
Przebieg: Bartek pisze na grupie „stary dzis pytal czy ktos byl w hucie” → po chwili wiadomość zostaje
  wycofana („Bartek usunął wiadomość”). Gracz, który miał otwarty czat, ma treść w podglądzie powiadomienia;
  gracz, który był gdzie indziej — tylko znacznik usunięcia. Kuba: „co on napisał?”.
Opcje: powiedzieć treść z podglądu / zapytać Bartka prywatnie / zostawić.
Źródło faktu: podgląd powiadomienia (tylko gdy powiadomienie przyszło przed wycofaniem).
Podejrzenie: ojciec Bartka coś wie; nie dowód winy.
Konsekwencja: ch4 — Bartek pisze, że „stary gadał ze mną całą noc”; wcześniejsze pytanie gracza
  zmienia jedno zdanie jego wstępu.
Zapis: nowa flaga x_wycofanaSeen; wymaga obsługi „usuniętej wiadomości” w silniku (brak dziś) —
  osobny krok techniczny bez zmiany wyglądu dymków poza tekstem systemowym.
Sprawdzenie: test jednostkowy podglądu vs. otwartego czatu; reload w trakcie wycofania.
```

- Wdrożone 23.10: `xWycofana` (P4, wycofana wiadomość), `xAutobus` (P2, ostatni autobus).
- Wdrożone 23.10 (popołudnie): P3 `xNieSpisz`, `xPojechali`, `xRanoNoc`, `xRanoSync`; P4 `xDataPliku`, `xWyswietlono`, `xWyciszona`, `xReupload`, `xProsby` → `xProsbaWyjasnienie`.

## Karta: anonimowy materiał (P4, scena rozpisana, bez produkcji)
- Nadawca: konto bez zdjęcia na Klipo, plik `CAM-01_2026-10-15_0147.mp4`. Źródło: kopia z karty pamięci fotopułapki, którą ktoś wyjął przed policją.
- Dostęp: link wygasa po 24 h. Jeśli gracz go nie otworzy, Igor ma zrzut ekranu z miniaturą i godziną; trop zostaje osiągalny bez „magicznego” odtworzenia pliku.
- Działanie gracza: porównać godzinę z miniatury z CAM01_IMG_0057 (02:13). Wyjaśnienie później: materiał jest prawdziwy, ale z innej nocy (data w pliku).
- Produkcja klipu czeka na rozdział 12 i etap mediów; do tego czasu nie wdrażać.
