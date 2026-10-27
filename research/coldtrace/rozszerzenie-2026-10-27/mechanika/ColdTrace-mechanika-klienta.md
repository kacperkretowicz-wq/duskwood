# ColdTrace: szczegółowa mechanika klienta WWW

Analiza statyczna kopii klienta pozyskanej 26.10.2026. Opracowanie 27.10.2026. Przedmiotem jest klient WWW, a nie binarium iOS. Nie wykonano pobranego kodu gry, nie zmieniano zapisów sesji ani praw dostępu, nie wysyłano eksperymentalnych odpowiedzi i nie kupowano subskrypcji. Kod odczytano i sparsowano AST. Poniższy opis jest autorską rekonstrukcją przepływu danych; nie jest kopią implementacji.

## Jak sprawdzać dowody

`K` oznacza plik `sources/_next/static/chunks/1pfbqbd-z0uj8.js`. Pozostałe pliki wskazano pełną nazwą. Zakresy `UTF16 [start,end)` to indeksy używane przez parser JavaScript: początek włącznie, koniec wyłącznie. Nie są numerami bajtów ani wierszy. Przy znakach spoza BMP indeks Pythonowego łańcucha będzie inny. `pliki-zrodlowe-sha256.csv` utrwala tożsamość 15 przeanalizowanych plików JS; `ast-evidence.json` zawiera indeks wywołań i małych fragmentów dowodowych. Nie dowodzi to kompletności przyszłych chunków pobieranych dynamicznie ani kodu serwera.

## Istotna korekta: ofertę można zamknąć

Samo pojawienie się ekranu z ceną **nie dowodzi obowiązku zapłaty**, a wcześniejszy opis „paywall po czterech pytaniach” był zbyt skrótowy. Klient ma dwa różne miejsca wyświetlania ofert. Przycisk X rzeczywiście kontynuuje bez zakupu w początkowym lejku. W późniejszym lejku zamyka oferty i oddaje telefon do przeglądania, ale pobrana wersja klienta cofa indeks aktywnego pytania do granicy oferty. Te zachowania należy mierzyć osobno.

| Miejsce | Co robi X | Dokładny dowód |
|---|---|---|
| Początkowa oferta `main` | Wywołuje rodzicowi zamknięcie. X pojawia się po 2400 ms. | K `on` [639071,644900), handler [640265,640328). |
| Rodzic początkowej oferty | Zamknięcie `main` zmienia podetap z `main` na `lto`. | K `om`, [655988,656008). |
| Początkowa oferta `lto` | X wywołuje `onClose`, który w tym kontekście zmienia fazę na rozmowę `chat`. Nie sprawdza zakupu. | K `q` [25781,30183), handler [27048,27076); rodzic [656029,656038), całe `om` [653840,656633). |
| Oferta w trakcie pytań `gate` | X zmienia etap na `lto`; nie przyznaje premium. | K `W` [18530,23454), handler [19130,19167); rodzic [629715,629736). |
| Oferta w trakcie pytań `lto` | X zmienia etap na `trial`. | Ten sam handler `q`; rodzic [629768,629791). |
| Oferta `trial` | X oraz widoczny przycisk pominięcia wywołują ten sam handler. W tym rodzicu zamykają ofertę, zamykają panel pytania i wracają na `home`. Jednocześnie zapisują indeks postępu równy indeksowi granicznemu. | K `et` [34918,39481), X [36223,36232), Skip [36548,36557); rodzic [629813,629896). |

Przykład indeksów, wynikający z kodu: dla podstawowego `gateIndex=3` odpowiedź na czwarte pytanie (`index=3`) zapisuje `progress=4` i otwiera ekran gratulacyjny. Dalej można zamknąć kolejne oferty. Ostatnie zamknięcie zapisuje z powrotem `progress=3`; ponowne otwarcie przewodnika wyświetla pytanie o indeksie 3, czyli czwarte, a nie piąte. Klient nie ma zakazu wysłania odpowiedzi z tego ekranu, zatem ponowna poprawna odpowiedź może ponownie uruchomić ten sam lejek. To statyczna semantyka pobranego kodu, a nie wykonany test pełnego obiegu. Różnice między wersjami, wariantami eksperymentu, aktywnym kontem lub aktualnym backendem wymagają obserwacji danej sesji.

Nie ma podstaw, aby twierdzić, że po zamknięciu oferty cały telefon staje się niedostępny. Przeciwnie: handler kończy na `home`, a przejścia między aplikacjami nie sprawdzają premium. Osobnym zagadnieniem jest liniowe zaliczanie następnych pytań. Należy więc zapisywać: widoczna oferta, możliwość zamknięcia, możliwość przeglądania danych, możliwość submit i faktyczne przejście do następnego pytania. To pięć różnych obserwacji.

## Model stanu i wznowienie gry

Klient ma zewnętrzną maszynę faz: `onboarding → paywall → chat → prep → phone`. Ma także wewnętrzną maszynę ekranów telefonu, np. `lock`, `home`, `messages`, `thread`, `photos`, `accusation`. Stan widocznego ekranu aplikacji jest pamięcią komponentu React; trwały zapis wybranych elementów trafia do `localStorage`.

Funkcja wyboru fazy przy wejściu daje pierwszeństwo postępowi większemu od zera lub zapisanej fazie `phone`. Następnie uznaje zapisane fazy `chat/prep/phone`, przy czym ukończony wstęp przesuwa stare `chat` do `prep`. Dopiero potem uwzględnia globalny zapis początku: `paywall`, wartość oznaczającą wcześniejszy onboarding albo brak wartości. Dowód: K `rH` [606926,607152) oraz `om` [653840,656633).

Klucze przypadku tworzy `caseKeys` w `1peok1ww0ltpj.js` w okolicy UTF16 15809:

- `coldtrace.{case}.progress`: następny indeks pytania po poprawnej odpowiedzi; tekstowa liczba.
- `coldtrace.{case}.gateShown.v1`: lokalna flaga przyznanego przez klienta przejścia przez ofertę.
- `coldtrace.{case}.flow.v1`: faza `chat/prep/phone`.
- `coldtrace.{case}.introDone.v1`: ukończona rozmowa wstępna.

`coldtrace.onboarding.v1` jest wspólne dla witryny. Zmiana sprawy może więc pominąć jej własny onboarding na podstawie globalnej historii. Postęp pytań pozostaje odrębny dla spraw. Język jest zapisywany osobno i nie występuje w nazwie klucza postępu, więc w tej implementacji zmiana języka zachowuje numer zadania. Źródła: K [653840,656633), [661471,663393).

Wznowienie telefonu oblicza najpierw ostatni indeks `S=max(0,questions.length−1)`. Jeżeli zapisany postęp osiągnął `S`, wybiera ekran oskarżenia. Jeżeli przekroczył graniczny indeks, a nie ma uznanego dostępu, wraca do indeksu granicznego i otwiera późniejszą ofertę na ekranie blokady. Pozostałe wznowienia zaczynają od blokady, nie od ostatnio oglądanej aplikacji. Dowód: K `rY` [608692,610449).

W pobranym komponencie nie znaleziono zapisu rozwiązanych pytań do serwera ani pobierania chmurowego stanu postępu. Samo logowanie i obecność klienta Supabase nie stanowią dowodu chmurowego save. To ustalenie dotyczące odczytanej ścieżki gry, nie całej niewidocznej aplikacji.

## Odpowiedzi: walidacja i reakcje interfejsu

Komponent pytania bierze `questions[index]`; nie wybiera zadania na podstawie serwerowego identyfikatora postępu. Identyfikator pytania z danych trafia do żądania walidacji. Po stronie klienta wykonuje się tylko `trim`, odrzucenie pustego pola i ochrona przed wysłaniem podczas bieżącego requestu. Nie ma tutaj lokalnej listy akceptowanych odpowiedzi, fuzzy matchingu, usuwania diakrytyków, aliasów czy porównania case-insensitive. Rozstrzyga odpowiedź serwera `/api/answer`. Dowód: K `l5` [294644,300747), `O` [295481,295894).

Przepływ po kliknięciu Submit:

1. Licznik prób rośnie przed żądaniem; zawiera również próbę, której request później zawiedzie.
2. POST niesie `caseId`, `questionId`, przyciętą odpowiedź i język.
3. `correct=true` ustawia stan sukcesu, usuwa nudge i po 700 ms wywołuje `onSolved(index)`.
4. Przy błędzie pole jest czyszczone. Jeśli serwer zwróci `openHint`, klient otwiera podpowiedź poziomu 1 i przekazuje aktualną liczbę prób.
5. Inny błąd ustawia czerwony stan i prezentuje otrzymane `nudge`, jeśli istnieje.
6. `finally` zwalnia blokadę wysyłania. W samej funkcji nie ma `catch` generującego komunikat dla błędu sieci lub parsowania JSON.

Licznik prób i podpowiedź są stanem komponentu. Zmiana indeksu zeruje pole, próby, błąd i hint. Zamknięcie panelu odmontowuje komponent, więc ponowne otwarcie także tworzy nowy licznik lokalny. Backend może prowadzić swój licznik, ale tego nie ujawnia pobrany kod. Własny przycisk podpowiedzi pojawia się od dwóch prób; serwer może wcześniej zażądać jego otwarcia przez `openHint`.

Rodzic zapisuje `index+1` jako postęp. Jeżeli to ostatnie pytanie tekstowe, przechodzi do `accusation`. W innym przypadku ustawia nowy indeks; wyłącznie dla ukończonego indeksu równego granicy, obecnego flow i braku rozpoznanego premium uruchamia `celebration`. Dowód: K [628685,629012). `question_solved` to telemetryczna nazwa zdarzenia, nie dowód serwerowego utrwalenia save.

## Podpowiedzi

`/api/hint` otrzymuje `caseId`, `questionId`, `level`, `attempts`, `lang` i `guideReply` pobrane z bieżącego rekordu pytania. Klient nie wylicza tu treści hintu. Odpowiedź jest prezentowana według pól `locked`, `text`, `lockedText`, `title`, `canGoDeeper`, etykiet przycisków i numeru `level`. Następny poziom to `response.level+1`; przycisk jest blokowany wartością `canGoDeeper`. Nie znaleziono w tym komponencie własnego limitu poziomów ani lokalnego cennika hintów. Dowód: K `P` [295249,295481), `l1` [292169,294267).

Przekazanie `guideReply` serwerowi nie dowodzi użycia modelu AI. Nie określa też, czy serwer to pole traktuje jako prawdę, tłumaczy, odrzuca lub ignoruje. Do takich twierdzeń potrzebna jest odpowiedź runtime albo implementacja backendu.

## Finał: wybór podejrzanych

Lista podejrzanych i `requiredCount` są pobierane z publicznego pliku sprawy. Wybór ogranicza się do wymaganej liczby; nadmiarowy klik nie dodaje kolejnej osoby. Submit jest dostępny tylko przy dokładnej wymaganej liczbie i braku requestu w toku. `/api/accuse` otrzymuje `caseId`, listę `suspectIds` i `lang`. Klient pokazuje `correct`, `verdict` i tablicę `explanations`; nie wylicza winy lokalnie. Przy pomyłce można wyzerować wybór i ponowić próbę. Dowód: K `ae` [303190,306968).

Przycisk zamknięcia poprawnie rozwiązanej sprawy wywołuje rodzicowi restart: usuwa postęp i flagę przejścia oferty, ustawia indeks 0 i ekran `lock`; dla niewydanej Pii usuwa też stan wipe. W tej ścieżce nie zapisuje trwałej kolekcji „sprawy ukończone” i nie usuwa `introDone`. Odpowiedź finałowa jest stanem komponentu. Dowód: K [627995,628141). To nie dowodzi braku niezależnej statystyki na serwerze.

## Kody i zamknięte dane

Wykryto siedem wywołań `/api/unlock` dla sześciu rodzajów celu: `notes`, `calendarAttachment` w dwóch komponentach, `photos`, `snapchat`, `reddit`, `kakaotalk`. Każde przesyła identyfikator sprawy, cel, wprowadzony kod i język. Prawidłowość sprawdza otrzymane pole `ok`, a nie lokalna stała PIN. Mapa offsetów jest w `endpointy-klienta.csv`.

Różne cele odblokowują różne rodzaje danych:

- Notatki: odpowiedź zawiera `body`; rodzic telefonu przechowuje pojedynczą odblokowaną treść w pamięci.
- Kalendarz Noor: zwracany jest pojedynczy `attachment`; pozostały kalendarz konsumuje `attachments` i strony tekstowe dokumentu.
- Zdjęcia: odpowiedź zawiera tablice `hidden` i `deleted`, utrzymywane przez rodzica telefonu.
- Snapchat, Reddit, KakaoTalk: odczytane ścieżki ustawiają lokalną flagę dostępu po otrzymaniu `ok`. Dane do wyświetlenia są już przekazane komponentowi.

Tych odblokowań nie zapisuje się w rozpoznanej ścieżce jako osobnych kluczy localStorage. Część jest stanem aplikacji, część rodzica telefonu, więc różni się moment utraty przy wyjściu/ponownym wejściu lub przeładowaniu. Nie jest to dowód szyfrowania danych ani kompletnego zabezpieczenia przed dostępem.

Klawiatura kodu `sg` wysyła automatycznie po uzupełnieniu wymaganej liczby cyfr; używa długości z danych albo fallbacku komponentu. Błędny wynik uruchamia 0,4-sekundowe drżenie i po 420 ms czyści kod. Sam `sg` nie ma licznika prób ani lokalnego lockoutu. Nie dowodzi to braku limitów serwerowych. Brakuje także `try/finally` wokół await rodzica: odrzucony Promise może zostawić lokalny stan busy do ponownego montowania. Dowód: K [160650,162487).

## Dostęp premium i zakup

Status konta pobiera GET `/api/premium`. Klient przyjmuje wynik tylko gdy ma boolowskie `signedIn`; normalizuje też `premium`, `email`, `entitlementUnknown`, `userId`. Dostęp premium uznaje dopiero przy `signedIn && premium && !entitlementUnknown`. Parametr wcześniejszego lokalnego stanu funkcji `rU` nie wpływa na ten warunek. Dowód: K [607152,608692).

Po poprawnej odpowiedzi statusowej licznik odpytań rośnie. Dla zalogowanego konta bez premium kod planuje następne zapytanie za 3000 ms, dopóki nie ma co najmniej pięciu uznanych odpowiedzi albo nie upłynęło 120000 ms od zamontowania. Użytkownik niezalogowany i rozpoznane premium kończą odpytywanie. Powrót karty na foreground lub focus może odświeżyć status w tym samym oknie retry. Błąd fetch albo niepoprawny shape nie planuje samodzielnie kolejnego timera w odczytanej funkcji. Status premium jest odpytywany, a nie potwierdzany w kodzie przez receipt StoreKit. To klient WWW.

Po uznaniu premium telefon ustawia swój stan dostępu, zapisuje lokalną flagę i oblicza ekran ze wznowienia. Sama obecność lokalnej flagi w kodzie nie jest potwierdzeniem bezpieczeństwa lub kompletnej polityki autoryzacji backendu.

Wspólny checkout wysyła `/api/checkout`: `plan`, `surface`, `caseSlug`, `phDistinctId`. Obsługuje:

- `already_pending + welcome_url`: przekierowanie do aktywacji istniejącego zakupu.
- `already_active`: przekierowanie do sprawy; błędna nazwa sprawy ma fallback Noor.
- `url`: przekierowanie do checkoutu; opcjonalny event Meta korzysta z identyfikatora zwróconego przez serwer.
- `enabled=false`: wynik `soft`, konsumowany przez rodzica jako przejście dalej. Jest to jawna gałąź klienta zależna od wyniku serwera, nie dowód, że bieżąca produkcja ma wyłączone płatności.
- Pozostałe wyniki: błąd, zdarzenie telemetryczne i ponowna dostępność CTA.

Dowód: K `B` [15265,16570), `L` [16570,16988). Analiza nie wywoływała tych gałęzi zakupowych.

Wspólne `restorePurchase` wywołuje POST `/api/portal`. Zwrócony `url` otwiera portal; 401 albo `needsAuth` kieruje do `/login?next=...`; `enabled=false` jest osobnym wynikiem `disabled`. To odtworzenie ścieżki z `1peok1ww0ltpj.js` [5849,6261), a nie dowód wykonania przywrócenia.

## Oferty, zegary i warianty eksperymentu

Główna oferta ma wariant `web-main-paywall-trial`: zmienia plan roczny z `yearly` na `yearly_trial_full` oraz odpowiednie etykiety. Wybrany plan tygodniowy pozostaje oddzielną ścieżką. Rodzic steruje zamykaniem według opisanej wcześniej maszyny, nie przez deklarację cennika.

`web-gate-position` wybiera kontrolną granicę z konfiguracji albo testową `max(base,min(base+2,lastPlayable−2))`. Raz zapisany wariant i indeks są przechowywane w `coldtrace.{case}.gate.v1`. Zachowuje stary indeks przy tym samym wariancie lub gdy postęp przekroczył podstawową granicę. Dlatego „oferta zawsze dokładnie po czwartym pytaniu” nie jest uniwersalnym twierdzeniem. Dowód: K [608692,609643).

Wspólny moduł eksperymentów czeka na feature flags albo po 2500 ms wybiera kontrolę. Rejestr zawiera też `web-landing-direct-case` i `web-lto-ladder`. Sama obecność nazwy `web-lto-ladder` w rejestrze nie dowodzi użycia jej przez pobrany komponent oferty. Sesyjne nadpisania flag istnieją w kodzie, ale analiza ich nie ustawia i nie używa do zmiany dostępu. Źródło: `1peok1ww0ltpj.js` [6411,7600) oraz indeks literalnych kluczy w AST.

Oferta LTO wylicza lokalny termin jako `Date.now()+3600000` i zapisuje go w `coldtrace.lto.deadline.v1`. Ten klucz jest globalny, bez identyfikatora sprawy. Pozostały czas to zaokrąglona w górę różnica w sekundach, z minimum 0, odświeżana co sekundę. Jeśli przy montowaniu termin już minął, komponent wywołuje `onClose`. W odczytanej ścieżce nie ma takiego automatycznego zamknięcia tylko z powodu późniejszego dojścia licznika do zera podczas tego samego montowania: początkowy stan `u` nie jest przeliczany co sekundę. To opis kodu UI, nie serwerowej ważności ceny. Dowód: K `V` [23551,23786), `q` [25781,30183).

## Czat i czas fabularny

Wstęp to sekwencyjny skrypt z `introChat`. Zwykłe elementy pokazują bąbel przewodnika; element `choices` pokazuje maksymalnie dwie propozycje. Oba wybory zapisują tylko wybrany tekst użytkownika i przechodzą do kolejnego indeksu tej samej sekwencji. W tej funkcji nie ma rozgałęzienia skryptu zależnego od wybranej odpowiedzi. Element `cta` wystawia przycisk kontynuacji. Dopiero rodzic po CTA zapisuje `introDone` i przechodzi do `prep`. Dowód: K `od` [647898,652514).

Tempo bąbla to 0,8 razy maksimum deklarowanego `delayMs` i ograniczonej funkcji długości tekstu: wewnętrzny limit długości mieści się od 1400 do 5200 ms, bazowo 900+22 ms na znak. Po wyborze gracza kontynuacja ma 400 ms opóźnienia. Znaczniki godziny używają aktualnej lokalnej godziny urządzenia. Dźwięk nowej wiadomości jest tworzony jako Audio i niepowodzenie autoplay jest ignorowane. Stan bieżącej rozmowy nie jest zapisywany na każdym bąblu, więc ponowne wejście przed CTA może rozpocząć ją od nowa.

Historyczne rozmowy NPC są przede wszystkim renderowaniem danych: klient wybiera `threads.messages[npcId]` albo `threads.signal[npcId]`, jeżeli tablica jest niepusta; w przeciwnym razie używa `public.phoneData.npcMessages[npcId]`. Nie znaleziono w tej ścieżce czatu z żywym NPC ani requestu generującego każdą odpowiedź. Dowód: K `rY`, gałąź `thread`, oraz `sj` [156541,160650).

Wyjątkiem mechaniki dialogowej jest burner Avy. Kontakt jest ujawniany przy `questionIndex>=11`. Komponent pobiera `ava-burner.json`, wybiera pierwsze nieobsłużone `choicePoint` spełniające `minQuestionIndex`, zapisuje indeks wybranej opcji w `ava_burner_choices_v1` i dopina do historii outgoing, incomingReply oraz extraIncomingReplies. Stan ten jest lokalny; nie ma w tej funkcji POST do NPC ani wpływu wyboru na walidację pytania. Dane opcji mogą prowadzić do różnych treści, ale samo renderowanie nie dowodzi zmiany głównej historii.

**Ważne dla rekonstrukcji osi czasu:** część widocznych godzin jest syntetyczna. Funkcja `tH` szuka ostatniego parsowalnego timestampu. Gdy go brak, może użyć pomocniczej daty z preview, a dalej fallbacku 27.10.2024 z godziną zależną od hasha `npcId`. Wypełnia pozostałe daty wstecz deterministycznymi odstępami zależnymi od indeksu i tego, czy zmienił się nadawca; występują odstępy minutowe, wielogodzinne i ponad dobę. Oryginalny timestamp rekordu ma pierwszeństwo w prezentacji danego rekordu. Wniosku o fabularnej chronologii nie wolno opierać bezkrytycznie na godzinie widocznej w bąblu. Dowód: K `t$` [135433,135844), `tW` [135844,136547), `tH` [136547,137786).

Zegar paska telefonu i blokady korzysta z aktualnego czasu urządzenia i odświeża się co 20000 ms; osobna aplikacja zegara co 1000 ms. Kalendarz ma własny rok i datę z konfiguracji sprawy. Te trzy warstwy nie tworzą jednego zsynchronizowanego zegara fabularnego. Dowód: K `r` [6533,9990), `es` [39481,41959), `nC` [413509,416982), `lA` [241920,256385).

## Zależności od postępu i niewydane mechaniki

Poza ofertami postęp zmienia prezentację wybranych dowodów: Ghost odsłania część notatek od indeksu 6, a poziom zakłóceń nagrań zmienia się od indeksów 11 i 17. Ava ujawnia burner od indeksu 11. Dla niewydanej Isli rozmowa z Tash jest zamknięta przed indeksem 18. To warunki zero-based w kodzie, nie etykiety pytań liczone od 1. Dowód: gałęzie `rY` [608692,629905).

Dla niewydanej Pii istnieje model wipe z fazami `notStarted`, `wave1Triggered`, `wave2Triggered`, `frozenOffline`, flagą trybu samolotowego i listami usuniętych wątków/zdjęć. Widoczny efekt przejścia przy granicy ustawia `wave2Triggered`; włączenie trybu samolotowego po rozpoczęciu ustawia `frozenOffline`. W zbadanym zakresie nie znaleziono producenta, który faktycznie zapełniałby listy usuwanych rekordów. Sama nazwa mechaniki i baner o kasowaniu nie dowodzą działającej falowej destrukcji danych. Nie opisujemy tego jako wydanej funkcji siedmiu dostępnych spraw. Dowód: K [606554,606926), odpowiednie efekty i props w `rY`.

## Co jest dokładnie odzyskane, a czego ten materiał nie dowodzi

Odzyskano klientowe kontrakty dziewięciu ścieżek API w 15 statycznych wywołaniach, reguły wysyłania formularzy, pola odpowiedzi konsumowane przez UI, trwałe i nietrwałe stany, lokalne zegary, retry premium, zamykanie ofert i powiązania z indeksem pytania. Załączone CSV pozwalają mapować każdy kontrakt do źródła.

Nie odzyskano implementacji `/api/answer`, `/api/hint`, `/api/accuse`, `/api/unlock`, webhooków płatności, reguł przypisywania premium ani natywnego klienta iOS. Nazwy requestów i shape odpowiedzi nie odtwarzają poprawnych odpowiedzi dla wszystkich pytań, pełnej treści hintów, werdyktów ani zamkniętych materiałów. Brak tych danych w kliencie nie jest błędem analizy, który da się usunąć wymyślaniem wartości. Do domknięcia potrzebna jest zwykła rozgrywka danej sesji z obserwacją legalnie zwróconych odpowiedzi albo materiał operatora gry.

Do dalszej walidacji runtime nadają się konkretne obserwacje: osobny pełny obieg X początkowej oferty i X późniejszej oferty; numer pytania przed i po każdym X; zachowanie obu wariantów granicy bez ich wymuszania; odpowiedź dla jednej świadomie poprawnej i jednej błędnej odpowiedzi; powrót z podpowiedzi; poprawny kod znaleziony podczas rozgrywki; prawidłowy i błędny komplet podejrzanych; przeładowanie i zmiana języka. Każdy wynik należy przypisać do sprawy, wersji pliku, stanu konta i chwili obserwacji.
