# Sezony, zapis i powiadomienia — wydanie 1.4

## Obecny zakres

Rewizja sezonu `s1`: 3. Angielski tytuł gry to Quiet Is Safer; identyfikatory aplikacji i klucze stanu pozostają zgodne. `s.phoneTools` przechowuje przypięcia, reakcje, cytaty, kalendarz i zegar. Pola inicjalizują się osobno, więc otwarcie Zegara nie kasuje reakcji ani odwrotnie. Załączniki opcjonalnych rozmów są elementami transkrypcji. Wydanie 1.4 nie przesuwa numerycznych kroków głównej fabuły. Szczegóły: [ROZWOJ-1-4.md](ROZWOJ-1-4.md).

Rewizja zawartości sezonu `s1`: 2. Wydanie 1.3 dodaje historię wersji notatki „Do Oli”, pięć rozmów i konsekwencje udostępnienia plików. Numery kroków głównej historii i format zapisu v2 pozostają zgodne. Zaczęte rozmowy zachowują transkrypcję po utracie dostępności; możliwość odpowiedzi zależy od aktualnego etapu. [Ustalenia fabularne i źródła](MROK-I-SLADY.md).

`js/data/seasons.js` zawiera wydany sezon `s1`, rewizję i 30 stabilnych identyfikatorów etapów. To indeks istniejącej historii, a nie 30 nowych odcinków. `js/core/seasons.js` wylicza widoczny postęp z poznanych materiałów i rozdziału, zapisuje podsumowania i archiwizuje konsekwencje finału. Dalsze tytuły są ukryte. „Po zakończeniu” w menu daje dostęp do świata po finale i odpowiednich rozmów.

`s.seasons.s1.sessions` zachowuje datę prawdziwej sesji, bieżący cel, rozdział, krok i listę materiałów. Nie przestawia `pc` ani `pending`. `s.seasonArchive.s1` zapisuje ostatni stan świata i kolekcję zakończeń. Wczytanie punktu kontrolnego nie kasuje archiwum; bieżące śledztwo nadal wraca do stanu z punktu kontrolnego. Nowa gra celowo tworzy nowy przebieg.

## Rytm pilota

Domyślnie swobodny. Opcjonalny tryb dzienny ustawiany w Ustawienia → Sezony i sesje:

| Część | Dostępność pilota |
|---|---|
| Prolog, Chmura | Od razu |
| Huta | Następnego dnia o wybranej porze |
| Peleryna | Dzień 3 |
| Sztolnia i Światło | Razem w dniu 4; brak blokady podczas ratunku |
| Epilog | Dzień 5 |

Aktywowanie w późniejszym rozdziale zachowuje już osiągnięte części. Po nieobecności terminy nie przesuwają się od każdego powrotu; zaległości są dostępne. Można wrócić do swobodnego tempa bez utraty postępu. Zmiana pory nie resetuje daty rozpoczęcia. Daty wyznaczamy przez `Date.setDate` i lokalną godzinę, a nie wielokrotność 86400000.

Bramka jest sprawdzana przed wykonaniem kroku 0 rozdziału. Nie dodaje kroków do skompilowanych rozdziałów, nie zmienia migracji zapisów v1/v2 i nie przecina aktywnego wyboru. Zegar fikcji zatrzymuje się w tle i przy bramce. Zegar publikacji korzysta z zegara urządzenia; to rozgrywka lokalna, bez serwera i bez ochrony przed ręczną zmianą daty. Nie karać użytkownika za taką zmianę.

## Powiadomienia

W aplikacji mobilnej używany jest przypięty `@capacitor/local-notifications@8.3.1`, zarejestrowany przez istniejący mostek Capacitor. Po jawnej prośbie gracza wyświetla się systemowa zgoda. Odmowa nie blokuje gry. W przeglądarce nie obiecujemy działania po zamknięciu karty.

Planowane jest najwyżej jedno powiadomienie o najbliższej oczekującej części, o stałym identyfikatorze 7001. Powstaje dopiero wtedy, kiedy gracz dotarł do bramki. Nie jest fikcyjnym SMS-em od prawdziwej osoby. Wyłączenie, rozpoczęcie nowej gry, zmiana trybu i przejście bramki anulują poprzedni termin. Kliknięcie kieruje do Wiadomości; przy zimnym starcie po wybraniu Kontynuuj. Nie ma powiadomień o stracie serii ani zagrożenia wywołanego nieobecnością.

Android używa `isExactNotification:false`, bez proszenia o specjalny dostęp do alarmów. Uprawnienie do dokładnych alarmów z manifestu biblioteki jest usunięte w manifeście aplikacji. Termin oznacza dostępność treści, a nie gwarancję dostarczenia w tej samej minucie. Źródła API: [dokumentacja Capacitor](https://capacitorjs.com/docs/apis/local-notifications), przypięte definicje w `node_modules/@capacitor/local-notifications/dist/esm/definitions.d.ts`.

Kompilacja i testy adaptera nie zastępują testu zgody, tła, restartu telefonu i dostarczenia na fizycznym iPhonie oraz Androidzie. Tych zachowań nie należy deklarować jako sprawdzonych na urządzeniu tylko na podstawie testu przeglądarkowego.

## Dodawanie aktualizacji

1. Zachować `id` sezonu i odcinków. Nowe treści dostają nowe identyfikatory; nie przypisywać starego identyfikatora innej scenie.
2. Nie zmieniać liczby ani kolejności kroków trwającej historii bez migracji dla każdego obsługiwanego zapisu i punktu kontrolnego. Nowe opcjonalne rozmowy zapisują własne węzły i mogą być dodawane niezależnie.
3. Stan kolejnego sezonu musi być osobny. Kontynuacja czyta `seasonArchive.s1.outcome`, a nie sumę wszystkich zdobytych zakończeń. Nie używać `newGame()` jako przejścia do S2.
4. Rewizja zawartości nie oznacza nowego formatu zapisu. Format podnosić dopiero z rzeczywistą, testowaną migracją. Nie resetować danych „na wszelki wypadek”.
5. Dodać wszystkie skrypty, style i pliki do eksportu mobilnego oraz pamięci offline. Zwiększyć wersję cache. Sprawdzić zapis sprzed aktualizacji, wznowienie rozmowy i pracę bez sieci.
6. Pełna, atomowa instalacja pobieranych sezonów nie jest jeszcze zaimplementowana. Obecnie nowe pliki są dostarczane aktualizacją aplikacji / strony. Manifest sezonu nie jest systemem pobierania DLC, cloud save ani serwerem push.

## Droga do miesiąca

Pełna rozpiska fabuły: `BIBLIA-SEZONOW.md`. Przed zmianą tabeli pilota z 5 na 30 dni trzeba dostarczyć odpowiednią treść, obsłużyć wszystkie wejściowe zakończenia i zmierzyć 450–900 minut aktywnego przejścia. Liczby dni nie zwiększamy po to, żeby ukryć brak scen. Kolejne sloty mogą odblokowywać wcześniej napisane rozmowy i materiały; pilna akcja zawsze ma wspólny slot.
