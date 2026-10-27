# ColdTrace — szczegółowy rozbiór Isla, Pia i Sami

Opracowanie struktury 15 dodatkowych JSON, 27.10.2026. Pliki pobrano z jawnych ścieżek klienta; nie uruchamiano zmodyfikowanej gry. Wszystkie trzy konfiguracje mają w `analysis/case-registry.json` **`released:false` oraz `pickerVisible:false`**. To materiał niewydany w zbadanym rejestrze, a nie potwierdzenie trzech dostępnych spraw. Wskaźniki poniżej odnoszą się do `deep-inventory/acquired/`.

## 1. Skala i porównanie

| Parametr | Isla | Pia | Sami | Razem |
|---|---:|---:|---:|---:|
| Pliki JSON | 6 | 5 | 4 | 15 |
| Rekordy pytań | 20 | 21 | 23 | 64 |
| Kontakty | 4 | 5 | 13 | 22 |
| Podglądy kontaktów | 4 | 4 | 13 | 21 |
| Główne wątki | 3 | 5 | 8 | 16 |
| Dymki w głównych wątkach | 104 | 69 | 210 | 383 |
| Notatki | 34 | 8 | 9 | 51 |
| Maile | 11 | 0 | 13 | 24 |
| Połączenia | 14 | 2 | 2 | 18 |
| Wydarzenia kalendarza | 79 | 0 | 1 | 80 |
| Historia przeglądarki | 3 | 9 | 8 | 20 |
| Widoczne zdjęcia | 66 | 70 | 63 | 199 |
| Miejsca | 6 | 3 | 9 | 18 |
| Elementy tablicy w danych | 18 | 14 | 0 | 32 |

Źródła: trzy `*-public.en.json#/phoneData`, `#/contacts`, `#/photos/visible`; trzy `*-apps.json#/locations` i opcjonalna `#/board/pieces`. Zero tablicy Sami oznacza brak sekcji w tym pliku, nie brak możliwego ekranu w przyszłym wydaniu. Każdy plik `*-suspects.json` zawiera czterech kandydatów i `requiredCount:1`.

Dodatkowe 383 dymki nie obejmują 110 wiadomości WhatsApp Pia ani wprowadzeń. Nie wolno ich przedstawiać jako liczby całej komunikacji. Dane siedmiu wydanych konfiguracji pozostają w osobnych CSV bez prefiksu; bieżące pliki mają prefiks `unreleased-`.

W szerszym porównaniu Isla ma **więcej notatek niż dowolna z siedmiu wydanych spraw** (34 wobec maksimum 21) oraz **więcej kalendarza** (79 wobec 69 w Liv). Sami ma 210 głównych dymków, a Pia tylko 69; te objętości nie określają trudności ani czasu gry.

## 2. Isla: system opieki i harmonogramy jako źródło dowodów

### Kanały

Telefon opiera się na trzech głównych rozmowach, 34 notatkach, 11 mailach, 14 połączeniach i 79 wydarzeniach. Zapis `contactDetails` ma dziewięć rekordów, mimo czterech kontaktów w głównej liście. To osobne kolekcje, a nie błąd, który wolno naprawić przez automatyczne scalanie. Źródła: `isla-public.en.json#/contacts`, `#/phoneData/contactDetails`, `#/phoneData/npcMessages`.

W notatkach istnieją zarówno `isChecklist:true`, jak i zwykłe wpisy: **19 checklist i 15 pozostałych notatek**. Obecne są dwa przypięte wpisy, lecz sam znacznik nie dowodzi, że są warunkiem przejścia. Źródło: `isla-public.en.json#/phoneData/notes/*/isChecklist` i `*/isPinned`.

Instagram i Spotify poszerzają tło społeczne. Spotify ma 12 rekordów `recentlyPlayed`, dwie playlisty i osiem polubionych utworów. Nie wyprowadzam z tego dowodu rzeczywistego streamingu muzyki. Źródło: `isla-spotify.json#/recentlyPlayed`, `#/playlists`, `#/likedSongs`. Plik `isla-files.json` ma `documents:[]`: w tym snapshotcie nie ma dokumentów Files, mimo obecności samego pliku konfiguracyjnego.

### CareLog: jawna struktura listy i szczegółów

`isla-carelog.json` zawiera 12 rekordów feedu i dwa wyspecjalizowane obiekty szczegółów. Dziesięć rekordów ma `detailKind:"blank"`; dwa mają konkretne selektory:

- `#/feed/6/detailKind` = `staffStatusIsla`.
- `#/feed/9/detailKind` = `medicationDiscrepancy`.

To nie jest 12 pełnych raportów. Dane jawnie rozróżniają tło listy od dwóch szczegółowych ekranów. Jest to istotny sposób budowania wiarygodnej aplikacji przy ograniczonej liczbie faktycznych widoków dowodowych. Ocena tej funkcji w runtime wymaga jednak sprawdzenia obsługi selektorów w kodzie.

Istnieją dwa bezpośrednie powiązania po identyfikatorze:

- `#/medicationDetail/entryId` odpowiada `#/feed/9/id`.
- `#/staffDetail/entryId` odpowiada `#/feed/6/id`.

Ponadto `#/medicationDetail/authorNpcId` odpowiada kontaktowi `dawn` w `isla-public.en.json#/contacts/1/npcId`. `#/staffDetail/staffNpcId` wskazuje `isla`, ale nie występuje jako kontakt na głównej liście. Nie dodano sztucznego kontaktu tylko po to, aby graf wyglądał na kompletny.

Obiekt szczegółów leku zawiera log referencyjny, etykietę czasu, autora, rolę, miejsce, licznik, poziom zgodności i kroki audytu; dane personelu zawierają identyfikator pracownika, datę wejścia w życie, dostęp systemowy, status i kontrolującego kierownika. To autorskie rekordy gry, nie dowód prawdziwego systemu medycznego. Źródła: `#/medicationDetail`, `#/staffDetail`.

**Wniosek konstrukcyjny:** Isla opiera śledztwo na różnicach między komunikacją, harmonogramem i formalnym zapisem systemu opieki. Jawny model CareLog pozwala określić, gdzie są przygotowane szczegóły; nie ujawnia sam z siebie kolejności ich wymaganego przeczytania.

## 3. Pia: tożsamość telefonu, grupy i znikające dane

### Telefon o celowo innej proporcji kanałów

Pia ma pięć kontaktów, ale cztery podglądy kontaktów. Pięć głównych wątków to 69 dymków; brak maili i wydarzeń kalendarza, tylko dwa połączenia. Lista 70 zdjęć jest większa niż Isla i Sami. Źródła: `pia-public.en.json#/contacts`, `#/phoneData/contactPreviews`, `#/phoneData/npcMessages`, `#/photos/visible`.

Pierwszy rekord pytania wprowadza problem przypisania telefonu do osoby. To pozwala odczytać rozbieżności kontaktów jako część materiału do zbadania, zamiast z góry zakładać jednego oczywistego właściciela. Źródło: `pia-public.en.json#/questions/0`; teza o funkcji konstrukcyjnej jest interpretacją zadania.

### Dwa osobne wątki WhatsApp

`pia-whatsapp.json#/threads` zawiera:

| Wątek | Rekordy wiadomości | Pole `diesInWave1` |
|---|---:|---|
| `pia_wa_lowmoor` (`/threads/0`) | 70 | false |
| `pia_wa_ashdown` (`/threads/1`) | 40 | true |

Wiadomości zawierają identyfikatory, nazwy nadawców, etykiety czasu i znaczniki `isSystem`, `isPhoto`, `isEvidence`. W obu kolekcjach jest łącznie siedem rekordów systemowych i jedna fotografia. Dodatkowe rozmowy nie są po prostu kolejnymi kluczami w głównym `npcMessages`.

**Jawne ustalenie:** autorzy danych rozróżniają wątek objęty pierwszą falą znikania od wątku, który ma przetrwać. **Niepotwierdzony krok:** sam JSON nie mówi, kiedy następuje fala, czy jest to usunięcie, ukrycie czy efekt prezentacyjny ani czy usunięte dane można przywrócić. Do tego potrzeba śledzenia odczytu `diesInWave1` w kliencie. Nie podaję wymyślonego numeru pytania wyzwalającego efekt.

### Dokumenty wyglądające jak pliki, lecz zapisane inline

Pia ma trzy rekordy w `pia-files.json#/documents`. Wszystkie deklarują **`kind:"text"`**, nie mają `url`, a tekst stron mieści się w JSON:

- `/documents/0`: grafik obsady, nazwa pliku kończy się `.png`, jedna strona.
- `/documents/1`: polityka opasek i dostępu, nazwa kończy się `.pdf`, trzy strony.
- `/documents/2`: przydział personelu agencji, nazwa kończy się `.png`, jedna strona.

Łącznie jest pięć stron renderowanej treści. Rozszerzenie nazwy w UI nie wystarcza do stwierdzenia istnienia obrazu lub PDF. To ważna różnica względem Sami. Treść dokumentów nie została skopiowana do niniejszego raportu.

**Wniosek konstrukcyjny:** Pia zestawia tożsamość urządzenia, metadane grup i dokumenty organizacji wydarzenia. Mapa danych wykazuje odrębny format dokumentów i model znikania jednego kanału; nie dowodzi pełnej logiki końcowej sprawy.

## 4. Sami: dokumenty zewnętrzne i ślady odpowiedzialności

### Kanały i identyfikatory

Sami ma 13 kontaktów, 13 podglądów i osiem głównych wątków, obejmujących 210 dymków. Są 13 maili, dziewięć notatek, dwa połączenia i jedno wydarzenie kalendarza. Dodatkowe dziewięć miejsc w `sami-apps.json#/locations` to największa lista miejsc z tej trójki.

W kontaktach `guide` i `clara` mogą mieć tę samą wyświetlaną nazwę, ale pozostają różnymi identyfikatorami. Nie zostały automatycznie scalone. Kontakt `roussel` jest jedynym z `isSignal:true`; samo pole opisuje routing/styl aplikacji, nie dowodzi działania prawdziwego protokołu Signal. Źródło: `sami-public.en.json#/contacts`.

`sami-apps.json` zawiera miejsca i Instagram, ale nie sekcję `board`. Dla porównania Isla i Pia mają odpowiednio 18 i 14 elementów tablicy. Ten brak należy zachować jako fakt o snapshotcie, zamiast tworzyć fikcyjną mapę postaci Sami.

### Trzy dokumenty i dwa rzeczywiste PDF

W odróżnieniu od Pia wszystkie trzy rekordy Files Sami mają adresy zasobów:

| JSON pointer | Typ deklarowany | Rola wynikająca z metadanych | Zasób |
|---|---|---|---|
| `sami-files.json#/documents/0` | pdf | formalny certyfikat zgodności i dopuszczenie placu | `sami_certificate_inspection.pdf` |
| `sami-files.json#/documents/1` | image | formularz zgodności i naprawy z przekreślonym podpisem | `sami_refuse_to_sign.webp` |
| `sami-files.json#/documents/2` | pdf | wewnętrzny audyt kosztów i odchyleń | `sami_cost_report.pdf` |

Odwołania do obu PDF są potwierdzone w `deep-inventory/media-manifest.json`: HTTP 200, `application/pdf`, odpowiednio **29436** i **27960 bajtów**. Manifest przypisuje je dokładnie do `/documents/0/url` i `/documents/2/url`. Hashe:

- Inspekcja: `8342f4f01a3ed0d7ba412c3a21520c4382503f1f8c1ea518adec9e16aca1804d`.
- Audyt kosztów: `94e12287b1d407706664614541777300fd87d835cc0753d9e551c267f504ed9e`.

**Zakres tej tezy:** rolę dokumentów opisano na podstawie pól `filename`, `kind`, `previewTitle`, `subtitle` oraz referencji manifestu. Tutaj nie analizowano treści PDF, podpisów cyfrowych ani liczby stron. Nie przypisuję im autentyczności dokumentów zewnętrznych ani prawdziwej zgodności budowlanej.

**Wniosek konstrukcyjny:** dane przygotowują porównanie formalnego dopuszczenia, odmowy podpisu i śladu kosztowego. Jest to trójkąt źródeł o różnych funkcjach, bez konieczności kopiowania całej treści dokumentów i bez zgadywania serwerowej odpowiedzi.

## 5. Graf i warunki: dokładne granice wnioskowania

Cały dodatkowy materiał ma:

- **121 wystąpień identyfikatorów** w odrębnych rolach.
- **55 połączeń po dokładnym ID**; obejmują kontakty i wątki oraz odwołania szczegółów CareLog do feedu.
- **20 pól konfiguracji** związanych z selektorami szczegółów, flagą fali, cardinalnością oskarżenia i długością blokad. W odróżnieniu od Ava/Ghost nie znaleziono w tych 15 JSON jawnego pola `unlockQuestionIndex` ani `minQuestionIndex`.
- **1227 pól logicznych** wszystkich rodzajów; dominują flagi kierunku i stanu prezentacji wiadomości. Nie jest to liczba dowodów.
- **210 wystąpień `isEvidence`**, w tym **10 true i 200 false**. Brak znacznika nie oznacza braku znaczenia fabularnego obiektu.
- **210 wystąpień tablic** i **1436 znormalizowanych ścieżek schematu**, z indeksami tablic zastąpionymi `[]`.

Wszystkie 64 pytania nadal mają tylko `id`, `q`, `guideReply`, `hints`. Nie zawierają jawnych odpowiedzi ani list odwiedzonych aplikacji wymaganych do zaliczenia. W 23 poleceniach ostrożny słownik znajduje odniesienie do kanału lub typu dowodu; wynik jest oznaczony jako inferencja leksykalna. Brak dopasowania w pozostałych 41 nie znaczy, że zadania nie wymagają analizy danych.

Nie uznaję dwóch list identyfikatorów za kompletną mapę relacji społecznych. Jeśli postać ma alias, tego powiązania trzeba dowieść materiałem, a nie podobieństwem nazwy. Jeśli selector szczegółu nazywa się `blank`, nie znaczy to, że użytkownik zobaczy błąd — może to być celowa treść tła.

## 6. Artefakty i walidacja

Wyniki zachowano osobno od siedmiu wydanych spraw:

| Plik | Zakres |
|---|---|
| `unreleased-case-structure.csv` | dokładne liczniki trzech konfiguracji |
| `unreleased-phone-channels.csv` | główne kolekcje telefonu, galeria, selektory CareLog |
| `unreleased-entity-occurrences.csv` | wystąpienia ID, role, nazwy, wskaźniki |
| `unreleased-explicit-id-links.csv` | 55 jawnych połączeń z obiema stronami |
| `unreleased-progress-and-access-fields.csv` | 20 pól strukturalnych; bez dopisywania przebiegu runtime |
| `unreleased-boolean-flags.csv` | wszystkie 1227 pól logicznych |
| `unreleased-array-inventory.csv` | tablice i ich liczności |
| `unreleased-schema-paths.csv` | wzorce ścieżek, typy i liczności |
| `unreleased-question-surface-candidates.csv` | 64 pytania bez kopiowania treści i odpowiedzi |
| `unreleased-documents.csv` | typy plików, URL lub liczby stron inline |
| `unreleased-pdf-roles.csv` | dwie referencje PDF i metadane z manifestu |
| `unreleased-summary.json` | podsumowanie i szczegółowe metryki |
| `build_unreleased_audit.py` | własny skrypt, bez sieci i bez wykonywania targetu |

Walidacja rozwiązała **1801 odwołań JSON** i sprawdziła wszystkie trzy statusy niewydania oraz 64 rekordy pytań. Zbadanie 15 plików jest zakończone w opisanym zakresie strukturalnym; działanie konfiguracji, kolejność fal i wszystkie warunki serwerowe pozostają odrębnymi pytaniami wymagającymi dowodu z kodu lub sesji gry.
