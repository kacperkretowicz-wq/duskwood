# ColdTrace — struktura siedmiu spraw i powiązań dowodowych

Rozszerzenie analizy danych z pozyskanego snapshotu WWW, opracowane 27.10.2026. Źródła pobrano 26.10.2026. Raport nie odtwarza pełnych dialogów ani zbioru prawidłowych odpowiedzi. Podane ścieżki odnoszą się do `sources/data`; zapis `plik#/pointer` wskazuje dokładne miejsce w JSON. Interpretację wykonania należy zestawić z osobnym śledzeniem kodu klienta.

## 1. Co rzeczywiście wynika z modelu danych

Każdy z siedmiu plików `*-public.en.json` zawiera tę samą rodzinę sekcji: wprowadzenie, pytania, dane telefonu, kontakty, zdjęcia, przeglądarkę i konfigurację blokad. Dane aplikacji specjalnych są rozdzielone do plików tematycznych; `*-apps.json` zawiera miejsca, Instagram i tablicę śledztwa, a `*-suspects.json` katalog kandydatów finału.

**Wszystkie 147 rekordów pytań mają wyłącznie cztery klucze: `id`, `q`, `guideReply`, `hints`.** Nie zawierają jawnego `answer`, `requiredEvidenceIds`, `requiredVisitedApps`, `dependsOnQuestion` ani gotowej listy warunków zaliczenia. Wszystkie tablice `hints` w tym snapshotcie są puste. Nie oznacza to braku podpowiedzi w produkcie: ich pozyskanie może należeć do kodu i API. Źródło: siedem `*-public.en.json#/questions`.

To ważne rozróżnienie dla rozbioru gry: publiczne dane pozwalają opisać treść zadania i późniejszy komentarz przewodnika, ale nie wystarczają do zrekonstruowania serwerowego walidatora. Z samego polecenia „sprawdź wiadomości” nie wynika, że silnik wymaga otwarcia aplikacji przed przyjęciem odpowiedzi. Należy osobno prześledzić kod żądania i serwerową odpowiedź.

Przyjęty w głównej analizie podział 140 etapów tekstowych i siedmiu finałów wynika z zestawienia list pytań z routerem klienta; sam ostatni rekord nadal ma identyczne cztery klucze. Dlatego `question-surface-candidates.csv` nie udaje odkrytej tabeli wymagań gry: zawiera jedynie oznaczone dopasowania słów w poleceniach.

## 2. Skala poszczególnych spraw

| Sprawa | JSON dotyczące sprawy | Etapy tekstowe + finał | Kontakty | Główne wątki / dymki | Notatki / maile | Kalendarz | Kandydaci finału / wymagana liczba |
|---|---:|---:|---:|---:|---:|---:|---:|
| Noor | 4 | 20 + 1 | 27 | 21 / 353 | 21 / 28 | 9 | 6 / 2 |
| Felix | 9 | 19 + 1 | 24 | 18 / 318 | 11 / 20 | 35 | 4 / 2 |
| Rei | 11 | 19 + 1 | 29 | 22 / 511 | 9 / 27 | 39 | 4 / 2 |
| Liv | 9 | 19 + 1 | 11 | 9 / 249 | 6 / 17 | 69 | 4 / 2 |
| Ghost | 11 | 21 + 1 | 15 | 14 / 388 | 8 / 24 | 18 | 4 / 2 |
| Ava | 10 | 18 + 1 | 21 | 20 / 454 | 11 / 10 | 14 | 4 / 1 |
| Wren | 11 | 24 + 1 | 10 | 8 / 149 | 6 / 8 | 18 | 4 / 1 |

Łącznie to 65 plików dotyczących konkretnych spraw oraz dwa pliki wspólne, `flow.en.json` i `ui.en.json`: razem **67 JSON**. Główne wątki dają **2422 dymki**, ale nie obejmują automatycznie wszystkich wiadomości komunikatorów specjalnych, wprowadzeń ani odpowiedzi interaktywnych. Źródła liczb: `case-structure.csv`; dokładne wskaźniki `/phoneData/npcMessages`, `/contacts`, `/phoneData/notes`, `/phoneData/emails`, `/phoneData/calendar`, `*-suspects.json#/requiredCount`.

Rei ma najwięcej tekstu w głównych wątkach; Liv największy kalendarz; Wren najwięcej etapów przy najmniejszej liczbie głównych wiadomości. **Wniosek projektowy:** liczba ekranów ani dymków nie opisuje sama trudności sprawy. Konstrukcja Wren opiera się silniej na korelacji kanałów i śladów niż na samej objętości czatów. To interpretacja struktury, nie pomiar czasu ukończenia przez gracza.

## 3. Tożsamości, kanały i jawne połączenia

W danych występują osobne role identyfikatorów: kontakt, podgląd kontaktu, klucz wątku wiadomości, element tablicy, postać tablicy i kandydat oskarżenia. Powstał indeks **552 wystąpień identyfikatorów** oraz **313 powiązań wynikających ze ścisłej równości identyfikatora wewnątrz tej samej sprawy**. To nie są 552 różne osoby ani 313 relacji fabularnych.

Przykładowa ścieżka techniczna: `noor-public.en.json#/contacts/*/npcId` może wskazywać ten sam identyfikator co klucz w `#/phoneData/npcMessages`. Wówczas można powiązać kontakt z wątkiem bez zgadywania po nazwie. Zestawienie przechowuje obie strony i ich wskaźniki, nie tylko nazwę postaci.

Nie scalałem automatycznie aliasów i prawdziwych tożsamości na podstawie podobieństwa imienia. W Liv tablica, profile i lista finału celowo korzystają z różnych person. Ich zgodność fabularna wymaga odczytania materiału dowodowego; sam identyfikator `nadia` nie jest technicznie równy `gemma_cole`. Brak połączenia w `explicit-id-links.csv` nie oznacza, że postacie nie mają związku.

Osobne aplikacje mają własne struktury wątków: `liv-whatsapp.json#/threads`, `liv-spark.json#/messages` i `#/matchNpcIds`, `rei-kakaotalk.json#/locales`, `noor-threads.en.json#/messages` oraz `#/signal`. To powód, dla którego licznika głównych `npcMessages` nie wolno nazywać liczbą wszystkich rozmów całej gry.

## 4. Co odróżnia konstrukcję każdej sprawy

### Noor — przechodzenie od wiadomości do dokumentów i zdarzeń

Baza zawiera szczególnie rozbudowane notatki (21), maile (28), 31 połączeń i 27 kontaktów. Struktura zachęca do sprawdzania kolejności zdarzeń w kilku źródłach, a osobny plik wątków rozdziela Messages i Signal. Blokady obejmują zdjęcia, notatki i załącznik kalendarza, z deklaracjami długości wejścia, lecz bez prawidłowych kodów w `#/locks`. Źródła: `noor-public.en.json#/phoneData`, `#/locks`; `noor-threads.en.json#/messages`, `#/signal`.

Tablica ma 11 elementów i osobną odmianę `wide`. W tej odmianie istnieją jawne zależności dekoracji `revealWith`, odwołujące się do identyfikatorów elementów, takich jak mapa lub transkrypcja. To konkretne połączenia prezentacyjne tablicy; nie należy ich utożsamiać z warunkami odpowiedzi na pytanie. Źródło: `noor-apps.json#/board/wide/stickies`, `#/board/wide/chips`.

### Felix — triangulacja materiałów społecznościowych i aktywności

Poza podstawowym telefonem są osobne struktury Snapchata, Reddita, BeReal, Tindera, Stravy i Spotify. Materiał dowodowy pochodzi z różnych formatów: postów, aktywności, dopasowań i prywatnych treści. Źródła: `felix-snapchat.en.json#/privateImages`, `#/privateVideos`, `#/privateTexts`; `felix-reddit.en.json#/threads`; `felix-bereal.en.json#/posts`; `felix-strava.json#/activities`; `felix-tinder.en.json#/matches`.

Konfiguracja blokad wymienia Photos, Notes, Snapchat i Reddit, wszystkie z deklaracją czterech cyfr. BeReal oznacza wybrane dane polem `isProof`; to znacznik autora, a nie dowód, że serwer wymaga obejrzenia konkretnego wpisu. Źródła: `felix-public.en.json#/locks`; `felix-bereal.en.json#/posts/0/isProof`.

### Rei — środowisko instytucji, zapisy zdrowia i chmura

22 główne wątki i 511 dymków uzupełniają bank, Health, KakaoTalk, MYBOX, Choeaedol, YouTube i prosta gra wyścigowa. To najbardziej rozbudowana sprawa pod względem tekstu głównych wątków. Zestawienie finansów, zdrowia i plików poszerza analizę poza relacje osobiste. Źródła: `rei-public.en.json#/phoneData/npcMessages`; `rei-bank.json#/rows`; `rei-health.json`; `rei-mybox.json#/rootFolders`; `rei-choeaedol.json#/activity`.

KakaoTalk ma własne pole `password` oraz treści według języka; `locks.kakaotalk.digits` wynosi 0. Nie wolno więc interpretować całego systemu blokad jako jednego uniwersalnego klucza numerycznego. Obecność wartości dostępowej odnotowano w indeksie bez publikowania jej treści. Źródła: `rei-kakaotalk.json#/password`, `#/locales`; `rei-public.en.json#/locks/kakaotalk`.

### Liv — rozdzielanie person i przepływów finansowych

Liv ma 69 rekordów kalendarza, lecz tylko 9 głównych wątków. Charakterystyczne aplikacje to Spark, WhatsApp, Tide, Vault, Files i Find My. Źródła obejmują relacje profili z rozmówcami, transakcje, dane portfela i lokalizację. Źródła: `liv-spark.json#/profiles`, `#/matchNpcIds`; `liv-whatsapp.json#/threads`; `liv-tide.json#/transactions`; `liv-vault.json#/incoming`, `#/outgoing`, `#/kycName`; `liv-findmy.json#/locationLog`.

**Wniosek projektowy:** zagadka wymaga rozdzielenia tego, kto jest właścicielem telefonu, kto posługuje się personą i kto figuruje w śladzie finansowym. Techniczny indeks identyfikatorów zachowuje te role osobno. Galeria deklaruje dziewięć ukrytych i sześć usuniętych elementów; są to liczby konfiguracji blokady, nie wynik sprawdzenia wszystkich stanów galerii w runtime. Źródło: `liv-public.en.json#/locks/photos`.

### Ghost — rekonstrukcja zdarzeń poprzez telemetrię urządzenia

Obok 14 głównych wątków są Custos, Find My, Health, iCloud, Revolut, News i osobne metadane zdjęć. Custos zawiera uprawnienia, log aktywności i pola operacji po śmierci; Revolut ma osobny `evidenceId`. Źródła: `ghost-custos.json#/permissions`, `#/activityLog`, `#/postMortemUser`, `#/remoteDelete`; `ghost-revolut.json#/evidenceId`; `ghost-icloud.json#/fragment`.

Ta sprawa ma najbardziej jawnie rozpisane progi prezentacji: indeks ujawnienia notatki to 6, dwa poziomy zakłócenia nagrania to 11 i 17. Wartości są indeksami konfiguracji, bez automatycznego przeliczania ich na numer widoczny graczowi. Klucz utrwalenia efektu Custos jest również w ustawieniach. Źródło: `ghost-settings.json#/suicideNoteRevealIndex`, `#/voiceMemoStaticLevel1Index`, `#/voiceMemoStaticLevel2Index`, `#/custosGlitchStorageKey`.

### Ava — poszukiwania i późno uruchamiana rozmowa interaktywna

20 głównych wątków i 454 dymki łączą się z News, Files, Health i osobnym burnerem. Burner jawnie deklaruje `npcId`, próg odblokowania, klucz persystencji i cztery punkty wyboru. Źródło: `ava-burner.json#/npcId`, `#/unlockQuestionIndex`, `#/storageKey`, `#/choicePoints`.

Próg odblokowania wynosi 11, a cztery `minQuestionIndex` to 12, 13, 15 i 17. Są to konkretne zależności progresji opisane w danych. Nie wyprowadzam z nich bez sprawdzenia callbacków liczby zakończeń ani wpływu każdej odpowiedzi na śledztwo. W odróżnieniu od wielu tekstów statycznych tutaj istnieje wyodrębniony model punktów interakcji.

### Wren — korelacja czasu, miejsca i śladów multimedialnych

Wren ma 24 etapy tekstowe, ale tylko 8 głównych wątków i 149 dymków. Istotne osobne źródła to Find My, Polarsteps, Vita, BeReal, Reddit, Instagram, YouTube i metadane usuniętych zdjęć. Źródła: `wren-findmy.json#/wrenHistory`, `#/coleHistory`; `wren-polarsteps.json#/stops`; `wren-vita.json#/deathTime`, `#/postMortemSteps`, `#/postMortemWindow`; `wren-bereal.json#/proofPost`; `wren-photos.json#/deletedVideo`.

Model galerii zawiera kod albumu usuniętych plików jako pole danych, a Polarsteps kod współdzielenia. Samo istnienie takich pól nie dowodzi dostępu backendu ani EXIF w plikach. Źródło: `wren-photos.json#/deletedAlbumPin`; `wren-polarsteps.json#/sharedAccessCode`; dane dostępu pominięto w publikowanym indeksie.

**Wniosek projektowy:** ciężar tej sprawy leży w porównywaniu źródeł z różną wiarygodnością i inną reprezentacją czasu. Timestamp w spreparowanym ekranie aplikacji jest elementem fabuły, nie automatycznie techniczną metadaną urządzenia.

## 5. Znaczniki dowodów i ograniczenia grafu zależności

Indeks zawiera **302 wystąpienia** pól `isEvidence`, `isProof` i `noPin`, w tym wartości fałszywe. Nie jest to 302 unikatowych dowodów. Pola te pojawiają się m.in. w kalendarzu, postach BeReal i wiadomościach News. Odnotowano **47 pól** związanych z progresją, dostępem, ujawnianiem elementów lub persystencją; każda pozycja ma plik i wskaźnik. Wartości haseł i kodów zastąpiono informacją o ich obecności.

W 147 poleceniach **73** mają dopasowanie co najmniej jednej nazwy lub słowa z ostrożnego słownika aplikacji; reszta nie ma takiego dopasowania. Nie oznacza to, że pozostałe pytania nie dotyczą aplikacji. Polecenie może używać nazwy osoby, miejsca, metafory lub odnosić się do wcześniejszego ustalenia. Dlatego automatycznego dopasowania nie włączono do grafu jawnych wymagań.

Nie odkryto w tych czteropolowych rekordach pytań kompletnego grafu „dowód X odblokowuje pytanie Y”. Odtworzono natomiast bez zgadywania: powiązania identyfikatorów kontaktów i wątków, cardinalność oskarżenia, długości wejść blokad, progi Ava/Ghost i referencje prezentacyjne tablicy Noor. Pozostałe zależności muszą być wykazane z kodu lub rozgrywki.

## 6. Pliki wynikowe i odtwarzalność

- `case-structure.csv`: siedem spraw, rozmiary głównych kanałów i źródła.
- `entity-occurrences.csv`: 552 wystąpienia identyfikatorów w sześciu rolach.
- `explicit-id-links.csv`: 313 połączeń po ścisłej równości identyfikatora; bez heurystycznego scalania aliasów.
- `progress-and-access-fields.csv`: 47 pól konfiguracji progresji/dostępu; treści kodów zredagowane.
- `question-surface-candidates.csv`: 147 rekordów z oznaczoną inferencją tekstową; bez cytowania pełnych poleceń i bez odpowiedzi.
- `evidence-data-flags.csv`: 302 wystąpienia znaczników wraz z prawdą/fałszem.
- `case-array-inventory.csv`: 1265 wystąpień tablic w 65 plikach spraw; nie są to unikatowe obiekty świata gry.
- `build_data_audit.py`: własny skrypt analizujący JSON; nie uruchamia kodu gry ani nie łączy się z siecią.

Skrypt wykonano na wszystkich 65 plikach spraw. Dwa pliki wspólne pozostają w poprzednim indeksie schematów. To pogłębiony rozbiór danych klienta, a nie deklaracja przejścia wszystkich siedmiu spraw, poznania wszystkich serwerowych odpowiedzi czy kompletnej analizy aplikacji iOS.

## 7. Dodatkowe trzy konfiguracje z wyłączonym wydaniem

W dalszym przebiegu badania pobrano **15 dodatkowych JSON** dla Isla, Pia i Sami ze ścieżek wyprowadzonych z rejestru i loadera klienta. Nie są to trzy kolejne wydane sprawy: rejestr jawnie ma dla każdej `released:false` i `pickerVisible:false`. Dostępność statycznego pliku HTTP nie potwierdza udostępnienia sprawy graczowi ani działania finału. Źródła pozyskania: `deep-inventory/acquisition.json` i `summary.json`; dane: `deep-inventory/acquired/`.

| Konfiguracja | JSON | Rekordy pytań | Kontakty | Główne wątki | Notatki | Maile | Kalendarz | Elementy tablicy |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Isla | 6 | 20 | 4 | 3 | 34 | 11 | 79 | 18 |
| Pia | 5 | 21 | 5 | 5 | 8 | 0 | 0 | 14 |
| Sami | 4 | 23 | 13 | 8 | 9 | 13 | 1 | 0 |

Łącznie to **64 dodatkowe rekordy pytań**, czyli **211 rekordów w dziesięciu konfiguracjach** przy zachowaniu rozróżnienia 147 wydanych i 64 niewydanych. Nie doliczam automatycznie trzech zakończeń do zweryfikowanej listy finałów: ich wykonania nie obserwowano. Rekordy pytań nadal mają wyłącznie `id`, `q`, `guideReply`, `hints`.

**Isla** wyróżnia się 34 notatkami i 79 wydarzeniami kalendarza przy trzech głównych wątkach. Ma osobne CareLog i Files. Punkt wyjścia opiera się na materiałach przychodzących po śmierci właścicielki urządzenia. Wniosek strukturalny: wariant mocno dokumentowy i harmonogramowy, z mniejszą liczbą rozmówców. Źródła: `isla-public.en.json#/questions/0`, `#/phoneData/notes`, `#/phoneData/calendar`; `isla-carelog.json`, `isla-files.json`.

**Pia** ma inny układ telefonu: brak maili i kalendarza w snapshotcie, mało połączeń, pięć głównych wątków oraz osobne WhatsApp i Files. Pierwsze zadanie dotyczy przypisania znalezionego telefonu do właściwej osoby. To jawny przykład, że „telefon ofiary” nie powinien być w analizie bezwarunkowym założeniem. Źródła: `pia-public.en.json#/questions/0`, `#/phoneData`; `pia-whatsapp.json#/threads`.

**Sami** ma 23 rekordy pytań, 13 kontaktów i osobne pliki dokumentów; `sami-apps.json` nie zawiera w tym snapshotcie sekcji `board`, choć mają ją pozostałe zbadane konfiguracje. To potwierdzony brak sekcji w konkretnym pliku, nie dowód, że przyszłe wydanie nigdy nie będzie mieć tablicy. Źródła: `sami-public.en.json#/phoneData`, `sami-files.json`, `sami-apps.json`.

Każda z trzech list kandydatów ma cztery rekordy i `requiredCount:1`. Indeks `unreleased-configurations.csv` podaje szczegółowe liczniki, statusy rejestru, ścieżkę i SHA-256 pliku pytań. Model o produkcyjnym zachowaniu tych wariantów pozostaje niezweryfikowany; sam statyczny materiał można już analizować bez nazywania go premierą gry.
