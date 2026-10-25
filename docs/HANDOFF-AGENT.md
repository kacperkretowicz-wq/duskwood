# Przekazanie dla następnego agenta AI — Quiet Is Safer (Mglisko)

Stan na 25.10.2026, 14:40 (Europe/Warsaw). Ostatnia wdrożona wersja: **v147** (commit `e4f0198`).

## Repozytorium i gałęzie
- Repo: https://github.com/kacperkretowicz-wq/duskwood
- Gałąź robocza: `feat/realizm-2026` (baza: `feature/ostatni-kurs`). **`main` to stara, błędna baza — nie używać.**
- Plan prac: `docs/PLAN-WDROZENIA-I-PRZEKAZANIE.md` — prowadzić dalej, dopisywać postęp.
- Każde wydanie: osobny commit `vNNN: opis`, podbicie wersji cache w `sw.js` (SW vNNN).

## Ustalenia z Kacprem (obowiązujące)
- Komunikacja po polsku. Pracować autonomicznie, bez pytań, decyzje podejmować samodzielnie. Nie przerywać pracy po raporcie — od razu kolejny punkt.
- Raporty tylko krótkie, w ustalonych porach / na prośbę (status co 30–40 min wewnętrznie).
- **Wdrożenie pod link tylko na wyraźną prośbę Kacpra lub gdy wersja jest w pełni przetestowana i dopracowana.** Żadnych wdrożeń pośrednich.
- Wszystko ultra realistyczne, „jak z horroru”. Zdjęcia mają wyglądać jak amatorskie zdjęcia z telefonu (nie AI), a klipy jak amatorskie nagrania.
- Klipy wideo: jeden ciągły ujęcie bez cięć, generowany z klatki początkowej i końcowej; drżąca ręka, ledwo widoczna creepy postać (np. ktoś ucieka, odwraca się, w tle postać).
- Gra ma kilka różnych komunikatorów z grupami i przesuwane ekrany telefonu:
  - SMS – starsi, obcy, urzędy; **Gadka** (Messenger, morski) – znajomi i grupy; **Błysk** (Snap) – znikające wiadomości; **Kadr** (koralowy) – relacje z własnym podglądem; **Klipo** – DM.
  - Ekran główny: 2 strony z kropkami, swipe, gest wstecz od krawędzi.
- Otwarcie (prolog „Nieodebrane”): grupa „Ekipa 🍕” w Gadce (Ada, Szymon), Ada wrzuca nagranie ekranu relacji Mai z Kadru (`assets/video/v_snap.mp4`), reakcje, wybór gracza, „idę spać”, po ~7 s pisze Kuba. Wyjaśnienie klipu w ch3 (scena `xSnapEcho`: blacha bramy, „postać” to kufajka na słupku, relacja 14.10 22:56).
- Gracz może odpowiadać od razu, nawet gdy ktoś pisze. Spokojne tempo (gap 0.7 s, pisanie 2.4 s, pauza 0.8 s przed wyborem).
- Spójność informacji w grze jest priorytetem (chronologia nocy 14/15.10, telefon pana Adama, kaseta z festynu 1996 itd.). Gracz zwraca się formalnie do Sylwii i Marty.
- Codex CLI (konto ChatGPT Kacpra): tylko do trudniejszych zadań lub gdy zdjęcia wychodzą nierealistycznie, maks. 50% limitu, model 6.1 sol, effort light/medium. Obecnie zablokowany do 31.10, 10:39.
- GitHub Kacpra nie ma planu Enterprise — prywatne GitHub Pages niedostępne.

## Wdrożenie (Cloudflare Pages)
- Projekt `mglisko-qis-kk` → https://mglisko-qis-kk.pages.dev (direct upload, konto Kacpra; strona niepubliczna z nazwy, ale bez Cloudflare Access).
- Kroki: build w worktree `/tmp/qbuild` (detached na `origin/feat/realizm-2026`, `node_modules` symlink) → `npm run build` → zip `dist/` (Python `shutil.make_archive`) do `/workspace/duskwood-pwa.zip` → upload w panelu Cloudflare (Workers & Pages → mglisko-qis-kk → Create deployment, production) → weryfikacja `curl https://mglisko-qis-kk.pages.dev/sw.js` (wersja) i losowych plików (HTTP 200).
- Login Cloudflare jest w sejfie („dash.cloudflare.com”).

## Technika
- PWA + Capacitor 8; `npm run build` → `dist/`, `npm run mobile:sync` → iOS/Android.
- Zapisy: migracje generowane narzędziem ze snapshotów kroków (save v16+), test `tests/migration-chain.test.cjs`. **Nie edytować istniejących linii fabuły objętych migracją — tylko dopisywać nowe.**
- Testy przed każdym commitem: unit (~97), browser (~21), e2e iOS + Android do wszystkich zakończeń.
- `tools/transcript.browser.cjs` — przechodzi grę i zapisuje każdą wiadomość; czytać transkrypty pod kątem niespójności i niezręczności.
- Tunele z boxa nie działają (blokada połączeń przychodzących).
- Praca nocna/dzienna w `/workspace/dw-night`, heartbeat `/workspace/logs/duskwood-executor.heartbeat`.

## Co dalej (kolejność)
1. Dokończyć i przetestować niezacommitowane poprawki (engine.js, kopia2.js, kronika.js, most2.js, most3.js — v148).
2. Kolejne przejście spójności S1–S5 na świeżych transkryptach.
3. Tempo rozdziału 3 (~22 min) — skrócić/rozładować.
4. Nowy klip snapa (ciągłe ujęcie, found-footage) — zablokowane: Krea bez kredytów (402).
5. Realizm zdjęć (amatorskie, telefon), polish UI komunikatorów i ekranu głównego, drobiazgi (literówki, wielokropki, godziny, banery).
6. Testy na prawdziwym iPhonie / przez człowieka.

## Co sprawdzać zawsze
- Pełny zestaw testów zielony, gra przechodzi się do każdego zakończenia.
- Brak sprzeczności faktów między sprawami i aplikacjami (daty, godziny, kto co wie).
- Odpowiadanie podczas pisania działa; czat nie znika po filmie jednorazowym; banery nie zasłaniają rozmowy.
- Zdjęcia i klipy nie wyglądają na AI.
- Wersja w `sw.js` podbita i zgodna z commitem.
