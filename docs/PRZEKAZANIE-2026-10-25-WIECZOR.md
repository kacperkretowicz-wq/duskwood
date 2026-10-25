# Przekazanie dla następnego agenta — stan na 25.10.2026, ok. 20:40 (Europe/Warsaw)

Gra: Quiet Is Safer / Mglisko (repo kacperkretowicz-wq/duskwood). Baza: `feat/realizm-2026` (`16888b0`, v154). `main` i stare gałęzie ignoruj. Komunikacja po polsku; właściciel nie chce statusów, tylko konkretne wyniki. Warstwa filmów/klipów jest ODŁOŻONA (nie ruszać). Pracują Codex (gpt-6.1-sol) i asystent; Gemini odrzucony; Cursor tylko do operacji na repo (np. push), nie do pracy twórczej, chyba że właściciel zdecyduje inaczej. Niczego nie scalać do `feat/realizm-2026` bez wyraźnego „scalaj” właściciela. Właściciel oddał asystentowi decyzje fabularne: ma być logicznie, spójnie i przyjemnie dla graczy 14–25 lat (rok 2026).

## Gałąź `integracja/dopracowanie` (do PR-a do `feat/realizm-2026`, NIE scalać)
Zawiera po kolei:
1. Integrację PR #4, #5, #6, #7 (dymki UX i gest blokady, logika fabuły, playtest Hani, głos audio). Jedna migracja zapisu v17, jeden SW; konflikty rozwiązane (patrz niżej).
2. Commit `ab799ea` v158 — audyt spójności Codexa S1–S5 (chronologia, dowody, finały, trzy puste straszaki, dokumentacja). Raport: `docs/przekazanie/raport-codex.md`, krótszy: `docs/AUDYT-SPOJNOSCI-2026-10-25.md`.
3. Ostatni commit „WIP” — niedokończone wdrożenie decyzji 1–6 z `docs/przekazanie/decyzje.md` (przerwane przez właściciela). Testy `node --test tests/*.test.cjs`: **112/112 PASS** (poprawiono jedną asercję w `tests/conversations.test.cjs` pod pole `syncStarted`). Testy przeglądarkowe po tym WIP nie były uruchamiane.

Konflikty rozwiązane w integracji: #6 po #5 (`gen-migration-v17`, `migrations.js`, `state.js`: jeden generator V17, `regen-migrations.cjs`), #7 po #6 (`sw.js`: audio-cache + Range; `serve.js`: typy MIME audio/wideo), test `season-days` (selektor „zapis”).
Wcześniej (executor): przeglądarkowe testy (26 plików) PASS na `82a2c54`; `e2e-player` ok. 16 min.

## Stan decyzji (patrz `docs/przekazanie/decyzje.md`, pkt 1–9)
- 1 Aparat Darka (p_08d/p_21d): w WIP zmieniono podpisy/dowody na „aparat Darka, zdjęcie grupowe”, dialog Marka (jednorazówka). DO SPRAWDZENIA: kto naciska migawkę, spójność z kartami i dialogami; obrazów nie wymieniono — pliki do kiedyś wymiany: `assets/film/p_08d.jpg`, `p_21d.jpg`.
- 2 Cisza po `reportBoth`: w WIP zmieniono `epilog.js`/`ch4.js`/`most2.js` (mur przetrwał, Tomek odnaleziony). DO SPRAWDZENIA: `gazeta2026`, odniesienia w kolejnych sezonach.
- 3 Kaseta 03:51: w WIP przeredagowano `most3.js` (stanowisko zatrzymuje na zapamiętanym punkcie, Henryk mówi dalej w pełnym odsłuchu). Docelowo wariant K-A „Znacznik Marty” (pkt 9a) — niedokończone; ujednolicić mini-DV vs szpulowy magnetofon z `v_licznik.mp4`.
- 4 Dwa auta 23:58–01:20: do spisania w docs (trasa z przedziałami „około”) i sprawdzenia dowodów — NIE ZROBIONE.
- 5 Sync 03:05–03:07: w WIP zrobione (`syncStarted`, „kopia rozpoczęta 03:05”, Nimbus, osie czasu).
- 6 S5 `g_serwis` przez zwykły komunikator: NIE ZROBIONE (sprawdzić).
- 7 Zmiana ujawnienia jednego manipulatora (np. Ida przyznaje się sama): NIE ZROBIONE.
- 8 Komfort grania (tempo, cele, głuche telefony `s3_domowy`, `s3_kuba`, `s4_cisza`, `s1_maja_numer`, glitch `s1_odsluch`): NIE ZROBIONE.
- 9 Z analizy gracza 14–25 (`docs/przekazanie/analiza-asystenta.md`): mur M-A „Plan, woda, ogień” (częściowo w WIP: `epilog.js`), zimne otwarcia rozdziałów (pierwszy cel w ≤8 wiadomości, zwł. g6, g2), cliffhangery na końcu rozdziałów, redukcja pustych odcinków (ch2 ~30–340, ch3:55–113, koniec ch4), cringe (Marta „Pan/Pani”, „xD”, opcje gracza), usunąć 3× „kurwa” (ch3:453, ch3:574, mp:97), ostrzeżenie przed głosem „Tomka” w g2, Zuza wcześniej w S1 — NIE ZROBIONE poza murem.

Teksty z nagraniami (VoiceLib/voices) nie mogą się zmienić bez nowych nagrań.

## Do zrobienia po kolei
1. Przejrzeć diff WIP, dokończyć pkt 1–3 (spójność), pkt 4 i 6; uruchomić testy node + `tests/*.browser.cjs` (serwer lokalny), podbić SW.
2. Wdrożyć pkt 7–9 (priorytet: P0 z analizy — zimne otwarcia i cliffhangery, cringe, 14+).
3. Naprawić CI z #7 (prawdopodobnie brak `ffprobe` w `mobile.yml` — doinstalować `ffmpeg` albo pominąć test); sprawdzić job `ios`.
4. Posprzątać `docs/PLAN-WDROZENIA-I-PRZEKAZANIE.md` (dwa wpisy v155 z konfliktu); SW dziś `v158`.
5. SW nie daje 206 dla `.mp3` (tylko `.mp4`) — sprawdzić odtwarzanie głosówek offline na iOS na fizycznym telefonie; `firstLoadKB` Android ~2450 KB — sprawdzić wczesne ładowanie audio.
6. Brakuje testu wczytania starego zapisu v16 z postępem w prologu i g6 jednocześnie (tabela V17).
7. Otwarte decyzje do zatwierdzenia przez właściciela (kanon): czapka młodego Gajdy, „moment zaskoczenia”, nowe elementy z `FABULA-I-SCENY.md` (modele telefonów, przecięty pasek czołówki, naszywka, „7 plików zamiast 6”, K6 tylko w gałęzi `!cam1Dead`, „Sevra Magna”).
8. Zdjęcia do wymiany (P1/P2): p_08d, p_21d, p_22d, p_23d, m_darkroom, m_bricks, sz_window, c_slady, c_blok_noc (zasady: `docs/przekazanie/LOOK-BIBLE.md`: jedna wykrywalna nienormalność w zwykłej scenie, amatorskie, urządzenie i autor dają realizm).
9. Propozycje na później (z priorytetem w analizie): Klipo jako prawdziwy feed, karty-dowody do udostępnienia, odznaki/tapety, podsumowanie konsekwencji wyborów, fałszywy trop Gajdy. Filmy: gotowe klipy K1–K3 w `/workspace/flow` na boxie asystenta (poza repo); warstwa odłożona.
10. Scalenie do `feat/realizm-2026` dopiero po „scalaj” właściciela, jednym PR-em z gałęzi `integracja/dopracowanie`.

## Uwagi środowiskowe
- Box asystenta nie ma poświadczeń git/gh; push idzie przez agenta Cursor lub po dostarczeniu tokenu. Codex na boxie bywa limitowany (limit do ~20:28 został wyczerpany raz).
- Node na boxie 20.x, repo wymaga ≥22; podprocesy w sandboxie Codexa dają `EPERM` — do testów używać pełnego dostępu.
- Pliki robocze (poza repo): `/workspace/zadania/` (prompty Codexa, raporty, `analiza-asystenta.md`, `decyzje.md`).
