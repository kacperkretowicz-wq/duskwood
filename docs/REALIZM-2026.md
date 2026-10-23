# Realizm i rytm rozmów — praca na właściwej bazie

23.10.2026. Baza: `feature/ostatni-kurs`, `c6cf040`. Zmiany robocze: `feat/realizm-2026`.

Kompletna instrukcja dalszych prac: [PLAN-WDROZENIA-I-PRZEKAZANIE.md](PLAN-WDROZENIA-I-PRZEKAZANIE.md). Poniżej zachowano zapis wykonanych pakietów; dokument przekazania porządkuje również braki, kolejność wdrażania i późniejszy etap zdjęć oraz klipów.

## Obowiązujące decyzje

Zachowujemy pulpit telefonu, aplikacje, kolory, typografię i układ tej wersji. Pięć istniejących sezonów jest punktem wyjścia do redakcji. Nie nakładamy eksperymentalnej kampanii z poprzedniej kopii opartej na `main`.

Ludzie mają różne nawyki: studia, zmiany w pracy, dojazdy, zakupy, paczki, profile, prywatne relacje, brak pieniędzy i nieodpisane wiadomości. Matcha jest detalem jednej rozmowy, a nie cechą całej obsady. Zwyczajne sprawy nie zawsze zawierają trop. Nie każda przerwa kończy się straszakiem. S4 i S5 zachowują wynikające z kanonu daty w 2027 roku.

## Wykonane w pierwszym pakiecie

- Sześć opcjonalnych rozmów w istniejących pięciu sezonach: Kuba odbiera zakupy do domu, Ola siedzi w kawiarni z notatkami, Maja ogranicza widoczność relacji, Natan gubi ważne powiadomienie między zwykłymi, Ola sprzedaje kurtkę i myli czaty, Igor uruchamia stary telefon. Nowe tematy są ograniczone do etapu i sezonu; nie dostarczają nowych dowodów ani nie przesuwają głównego skryptu.
- Pierwszy SMS Mai ma jedną wspólną treść w telefonie gracza, kopii Mai i Notatkach. Nadal zawiera imię dziennikarza, Tomka Lisa i rok artykułu, ale brzmi jak prośba o rozmowę.
- Poprawione wybrane wypowiedzi i odpowiedzi gracza, przede wszystkim w otwarciu i pierwszym sezonie. Usunięto też sugestię, że narrator wie już o śmierci Mai.
- Maja pomaga Oli robić fiszki z anatomii; nie zmienia kierunku studiów. Fraza „trzy kości” i wszystkie związane z nią wybory nadal działają.
- Siedem rzeczywistych przerw, od dwóch do trzech godzin i ewentualnie do najbliższego pasującego okna wieczornego. Działają w istniejącym trybie dziennym, we wszystkich pięciu sezonach. Własne tempo pozostaje bez czekania.
- Przerwa zapamiętuje termin, krok i poprzedni cel; nie resetuje się po zamknięciu aplikacji. Po powrocie wznawia się ta sama scena. Nie dodano czasu oczekiwania do ratunku ani finałów. Powiadomienia natywne korzystają z dotychczasowej zgody gracza; przeglądarka nie otrzymuje nowych uprawnień.
- Skorygowane testy porównań migracji uwzględniają końce linii Windows. Nie przepisano tabel migracji ani starych fixture'ów.

`wording` w istniejącym kroku lub opcji jest aktualną wypowiedzią wyświetlaną i wysyłaną przez grę. Oryginalne `text` pozostaje podpisem zgodności dawnych kroków, używanym przez migracje. Nie zmieniamy indeksów kroków, etykiet wyborów ani skutków decyzji. Nowe sceny wymagające dodatkowych kroków muszą dostać osobną migrację.

## Drugi pakiet: redakcja pięciu sezonów

Przegląd objął rozmowy i ich gałęzie we wszystkich pięciu sezonach. W skompilowanych skryptach zmieniono 277 wypowiedzi lub podpisów oraz 41 opcji gracza. To redakcja wybranych ciągów, nie deklaracja przepisania każdego zdania. Liczby dotyczą miejsc w skrypcie wraz z alternatywnymi gałęziami, nie liczby zmian widocznych w jednym przejściu.

| Sezon | Wypowiedzi i podpisy | Opcje | Główne zmiany |
|---|---:|---:|---|
| S1 · Szkło pamięta | 94 | 13 | Wiarygodne otwarcie grupy, emocje Kuby i Bartka, ostrożniejsze odczyty zdjęć, odpowiedzialność Igora, ratunek i rozmowy po nim |
| S2 · Most | 60 | 14 | Konflikt Marty z matką, konkretna odpowiedzialność Natana, mniej raportów i powtarzanych pytań o zdjęcia |
| S3 · Kopia zapasowa | 39 | 3 | Wyznanie Kuby, powód działania Leny, granice wiedzy z odzyskiwania kont, codzienność Oli w aptece |
| S4 · Kronika | 36 | 4 | Reakcje na publiczne upokorzenie, Ola przed decyzją o pracy, Ida i Kuba bez sentencji, brak pewnej identyfikacji z butów i zegara |
| S5 · Twoim głosem | 48 | 7 | Emocje po usłyszeniu znajomego głosu, źródła nagrań, przyznanie Oskara, motyw Marty, Maja pozostaje studentką fotografii |

Niezależny przegląd wychwycił i skorygował pięć błędów ciągłości: nieodbyty telefon Kuby, wiedzę Igora z prywatnego czatu, pozorną zgodę na kontakt z Natanem, nieudostępnione odpowiedzi do resetu oraz Maję pamiętającą cudzą znikającą wiadomość. Poprawiono również zakupy w okresie gałęzi Cisza — Maja nie zleca ich podczas uprowadzenia. Dudek nie wie już o zrzucie, którego jego kanał nie mógł ujawnić.

Sprawdzono wszystkie 33 skompilowane rozdziały względem bazy: liczba i kolejność kroków, etykiety, 803 opcje i ich skutki pozostają zgodne po pominięciu `wording` i metadanych `rest`. Jedyna inna zmiana w kroku fabuły to wspólne źródło początkowego SMS-a w prologu. Naprawiono też przypiętą notatkę z tytułem sezonu: wskazuje bieżącą sprawę zamiast stale „Szkło pamięta”. W zwykłych rozmowach Kuba rozpakowuje już przywieziony zamiennik mleka, zamiast wybierać produkt z kurierem pod drzwiami; rozmowa Oli o jedzeniu nie zawiera komentarza o „idealnym stoliku”. CSS i zasoby zdjęć pozostały bez zmian. Cache ma wersję v50.

## Zdjęcia: decyzja użytkownika po obejrzeniu 24 plików

Zaakceptowane referencje realizmu:

| Numer na planszy | Osoba | Zachowany plik |
|---|---|---|
| 01 | Kuba | `assets/people/kuba.jpg` |
| 06 | Lena | `assets/lena-v2.jpg` |
| 08 | Gajda | `assets/gajda.jpg` |

Pozostałe 21 zdjęć z przedstawionego zestawu zostało odrzuconych jako wyglądające na AI. Dotyczy to również dodatkowego ujęcia Kuby, nr 20; akceptacja portretu nie zatwierdza całej galerii postaci. Nieocenione zdjęcia nie uzyskują automatycznie akceptacji ani odrzucenia. Numery, ścieżki i sumy SHA-256 są zapisane w `ASSETY-REALIZM-2026.json`.

Trzy zaakceptowane pliki pozostają bez zmian. Odrzucone są obecnie nadal w grze i wymagają wymiany; samo oznaczenie ich w audycie nie jest poprawą grafiki. Nowe ujęcia muszą zachować rozpoznawalność osoby, a jednocześnie poziom zwykłej fotografii z zaakceptowanych przykładów.

Pierwszy nowy portret Mai został odrzucony przez użytkownika jako nadal wyglądający na AI. Druga próba została oceniona jako bliższa oczekiwanemu realizmowi, z zastrzeżeniem powtarzania ujęć i mimiki. Nie jest to akceptacja do publikacji. Ustalono zmianę podejścia: różne sytuacje, autorzy, odległości, gesty i emocje, zamiast kopiowania półuśmiechu i zbliżenia z referencji. Opis kolejnych kadrów zawiera `ZDJECIA-SYTUACJE.md`. Próby pozostają poza zasobami używanymi przez grę.

Trzecia próba, śmiech przy jedzeniu croissanta, również została odrzucona: cała sytuacja wyglądała sztucznie. Czwarta próba, patrzenie w telefon, jest według użytkownika najbliżej oczekiwań, lecz włosy, skóra i materiały nadal wyglądają zbyt idealnie. Nie została zatwierdzona do gry. Na prośbę użytkownika dalszą produkcję zdjęć odłożono, żeby kontynuować redakcję historii. Nie produkować serii na podstawie odrzuconych prób.

Przed podłączeniem każdego ujęcia trzeba ustalić: kto trzyma telefon, dlaczego robi zdjęcie, komu je wysyła, kiedy i gdzie jest wykonane oraz czy pasuje do otaczających wiadomości. Lustro musi istnieć w kadrze, jeśli jest to selfie w lustrze. Kadr wykonany przez drugą osobę potrzebuje drugiej osoby w scenie. Jedzenie, ubranie i przedmioty muszą zgadzać się pomiędzy ujęciami. Nie poprawiamy sztuczności samym ziarnem, rozmyciem ani deklaracją „zdjęcie telefonem”.

## Kolejne pakiety

1. Kolejny przegląd fabularny i rytmu S1–S5 w grze: co gracz podejrzewa po każdym odkryciu, kiedy dostaje za dużo nazw i dat, jak zachowują się mniej korzystne zakończenia. Obecny pakiet poprawia konkretne ciągi rozmów, a nie przebudowuje całych zagadek.
2. W osobnym etapie wymiana odrzuconych fotografii według trzech zaakceptowanych wzorców, z kontrolą twarzy, tekstur i sensu scen. Najpierw pojedynczy kandydat do porównania, potem seria oparta na ustalonym kierunku.
3. Przegląd początkowych tropów: wcześnie zrozumiały problem i kilka uczciwych podejrzeń, bez nadmiaru nazw, dat i równoczesnych zadań. Sprawdzenie rzeczywistego czasu czytania i rozwiązywania S1; szybki automat nie jest pomiarem czasu gracza.
4. Rozwinięcie przerw w dialogach: obiecany powrót po pracy, krótka odpowiedź przed zniknięciem na kilka godzin, nocne „nie śpisz?”, spokojne sesje bez obowiązkowego zwrotu. Nie wymuszać nocnej pobudki ani obecności o dokładnej minucie, nie karać za nieobecność.
5. Rozwinięcie już obecnych motywów telefonu: nieznany nadawca, znikające wiadomości, wersje notatek, zgubiony kontekst powiadomienia, zdjęcie od pobliskiego urządzenia, społecznościowy reupload i prywatny profil. Każda anomalia ma przyczynę w świecie historii.
6. Dwa dodatkowe, osadzone w scenie zaskoczenia. Najpierw ocenić obecne straszaki i ich odstępy. Nie dokładać losowej twarzy czy glitcha do każdej przerwy. Nowe wywołania wymagają identyfikatorów jednorazowego odtworzenia i zgodnego zapisu.
7. Klipy odłożone do osobnego etapu. Przygotować logiczne zdjęcie początkowej i końcowej sceny, następnie użyć uzgodnionego Omni Flash. Odrzuconych montaży nie włączać do gry.

## Źródła obserwacji współczesności

Dobór zwyczajów jest decyzją scenariuszową, nie twierdzeniem, że każdy młody człowiek zachowuje się tak samo. Uwzględniono [CBOS: Młodzi i media społecznościowe, 55/2025](https://www.cbos.pl/PL/publikacje/raporty_tekst.php?id=7035) oraz [Pyszne.pl: Raport Trendów 2026](https://newsroom.justeattakeaway.com/pl-PL/258863-pyszne-pl-prezentuje-raport-trendow-2026/), sprawdzone 23.10.2026. Pierwszy opisuje znaczenie różnych platform dla młodszych osób, drugi m.in. napoje i kulinarne trendy widoczne w zamówieniach i social mediach. Nie są źródłami gotowych dialogów ani wzorem dla wszystkich postaci.

## Weryfikacja

Po drugim pakiecie:

- `node --test tests/*.test.cjs`: **47/47 PASS**, również po ostatniej korekcie zwykłych rozmów.
- `tests/rhythm.browser.cjs`: **PASS iOS i Android**. Zapis i wznowienie przerwy, przejście do własnego tempa, termin w późniejszym sezonie, wyświetlenie i wysłanie poprawionej opcji, właściwy tytuł sezonu w Notatkach, zapis rozmowy Oli.
- `tests/case-most.browser.cjs`: **4/4 PASS**. Świt → Pełny kadr / Margines / Cudzy podpis oraz Cisza → Nina, adres, późny ratunek → Margines. Brak zgłoszonych błędów strony i niedoładowanych zdjęć na sprawdzanych ekranach.
- `tests/e2e-player.browser.cjs`, iOS: **PASS**, 31 rozdziałów w jednym zapisie, pięć finałów: `swit`, `pelny_kadr`, `wlasnym_glosem`, `przewiniecie`, `haslo`. Start offline działa; brak zgłoszonych błędów strony i przepełnień układu. Raport: `outputs/realizm-2026/przejscie-s1-s5.json` w katalogu zadania.
- Porównanie skompilowanych skryptów i hashy referencji: **PASS**, dane w `audyt-redakcji.json`. Liczby kroków, etykiety i skutki opcji zgodne z bazą; zdjęcia 01/06/08 identyczne bajtowo.

Pierwszy pakiet przeszedł dodatkowo `native-ui.browser.cjs` (iOS/Android, 390/360 px i offline) oraz `prolog.browser.cjs`. Po drugiej redakcji nie powtarzano ich osobno; prolog znajduje się w pełnym przejściu.

Automaty przyspieszają czas, wspomagają rozwiązania zagadek i nie obejmują wszystkich zakończeń. `case-most` zastępuje część ekranów i połączeń atrapami. Pełne E2E wywołuje rzeczywiste ekrany połączeń i straszaki. Żaden z tych wyników nie zastępuje gry człowieka ani sprawdzenia fizycznego iPhone'a.

## Roboczy czas pierwszego sezonu

W aktualnym przejściu do Świtu opublikowano 648 tekstowych wiadomości i około 5400 słów. Pomiar obejmuje wybrane wypowiedzi i wybrane odpowiedzi gracza; nie obejmuje całego czytania stron, oglądania zdjęć, wszystkich opcji ani dodatkowych rozmów. Szybki automat przeszedł S1 w około 3 minuty, przy przyspieszonym pisaniu i automatycznym spełnianiu części warunków. Nie jest to czas gracza.

Do planowania można obecnie przyjąć **1,5–3 godziny aktywnej gry** przy zwykłym tempie, czytaniu materiałów i samodzielnych zagadkach. To szacunek, wymagający przejścia przez nowe osoby. Rzeczywiste przerwy są doliczane osobno. Obecny pilot rozkłada S1 na pięć dni; pełny format trzydziestodniowy potrzebuje dalszych scen, a nie samego wydłużania oczekiwania.
