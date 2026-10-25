# Przegląd spójności S1–S5, 25.10.2026

Baza: `integracja/dopracowanie`, `82a2c54`. Praca lokalna: `codex/spojnosc`. Kod gry jest w `js/`; katalog `src/` nie istnieje. Bez pushu, scalania i zmian ekranu telefonu po odblokowaniu. Klipy oraz nagrania pozostawiono bez zmian.

Przegląd obejmuje dane 33 rozdziałów, wszystkie rozgałęzienia w skompilowanych listach kroków, dowody, osie czasu, karty postaci i strony powiązane z poprawkami. Indeks statyczny zawiera 8477 kroków, w tym 3066 wiadomości i 25 straszaków. Liczby obejmują alternatywne gałęzie, nie jeden przebieg. Nie wykonano nowego przejścia przeglądarkowego.

## Poprawione

- S1: noc 14/15.10, przejazd i dojście pieszo przed CAM-01, Kuba bez prawa jazdy, dwie odpowiedzi Oli, ostrożne opisy SMS-a i identyfikacji samochodu. Daty kopii negatywów oddzielone od nieznanych godzin zdjęć analogowych. Oś 1997 oznacza nieznane godziny zamiast udawać precyzyjny zapis.
- Wniosek o Gajdzie wymaga trzech różnych ogniw: właściciel auta, dostęp do Ewy, ślad z huty lub relacja Marka. Nadal jest podejrzeniem przed ratunkiem.
- S2: dom Wronów i umówienie spotkania z Zuzą przed przesyłaniem w pobliżu.
- S3: wyjaśnienie awarii czujnika lampy, usunięcie niewytłumaczonej wiedzy Idy o liczbie cudzych plików, aktualny stan telefonu Rybickiego.
- S4: dalszy pobyt gracza do marca, wiedza Oli i jej mamy, termin i widoczność publikacji, szkic Oli oddzielony od opublikowanego wpisu.
- S5: autor nocnego połączenia Mai, wariant odebrania telefonu Marty, perspektywa zdjęcia z przystanku, rachunek Oskara (11 telefonów: 300 + 10 × 50 = 800), konsekwencje nagrania groźby/przyznania Marty i granice usuwania kopii.
- Trzy fotografie (`s1_cam58`, `s4_festyn`, `s5_wera`) pokazują się bez gwałtownego zoomu i uderzenia typu `face`; zachowano ich identyfikatory i miejsce w zapisie.
- Aktualizacja biblii i planów do wdrożonych dat; SW kolejno v156, v157, v158. Zmiany istniejących tekstów kroków korzystają z `wording`, aby zachować sygnatury zapisów.

## Otwarte, wymagają decyzji fabularnej lub produkcji mediów

- **P1:** czterej chłopcy w kadrze z jednorazówki Darka; samo oparcie aparatu o belkę nie wyzwala migawki. Nie dopisano piątej osoby ani nowego aparatu.
- **P1:** `Cisza` nadal opisuje spalenie tunelu niezależnie od `reportBoth`; potrzebna decyzja o konsekwencjach zgłoszenia obu miejsc oraz losie szczątków. Nie zmieniono zakończenia arbitralnie.
- **P1:** zatrzymanie kasety w S2 na 03:51 nie ma rozstrzygnięcia technicznego; opis nie powinien potwierdzać nadprzyrodzonego zdarzenia. Klip odłożony do osobnej pracy wraz z reakcjami postaci.
- **P1:** fotografie procesu wywoływania oraz rekwizytów muszą zostać dopasowane do dowodów; podpis nie naprawia niewidocznego szczegółu.
- **P2:** powtarzalne głuche telefony, globalne glitche i powracająca 23:47 potrzebują świadomej decyzji o źródle i funkcji. Nie oznaczają przejęcia telefonu przez hakera.
- **P2:** należy sprawdzić w inscenizacji trasę obu aut w nocy porwania oraz źródło przesyłki ze zdjęciem serwisu w S5. Nie dodano fałszywie dokładnych godzin ani nieustalonego wspólnika.

## Weryfikacja i przekazanie

`node --test tests/*.test.cjs` uruchomiono. Środowisko Node 20.19.2 blokuje część podprocesów i nasłuch na 127.0.0.1 (`EPERM`). Przed zmianami nie przechodziły te same trzy pliki testowe: `story`, `mobile-build`, `serve`. Testy regresji formularza wniosku, zakończenia S5 i publikacji S4 przechodzą. Testy zgodności istniejącego audio przechodzą. Pełny zielony wynik wymaga ponownego uruchomienia w środowisku repo (Node >=22) bez tych blokad.

Główne `.git` jest tylko do odczytu. Zmiany są w katalogu roboczym; commity wykonano w pomocniczym repozytorium `/workspace/zadania/spojnosc.git`, na jego gałęzi `codex/spojnosc`. HEAD głównego `.git` nie został przesunięty. Patche, bundle, pełny raport, indeks kroków oraz logi testów są w `/workspace/zadania/`. Nie należy nakładać patchy ponownie na już zmieniony katalog roboczy.
