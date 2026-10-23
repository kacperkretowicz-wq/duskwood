# Sprawa nr 3: „Kopia zapasowa” — plan z notatek Rybickiego

Status: plan do produkcji (nic z tego nie jest jeszcze w grze poza zapowiedziami z sekcji 3).
Zasady jak w sprawie 2: dzisiejszy świat, Polska, gracze 15–40, czat pisany, nie recytowany (docs/GLOSY-POSTACI.md), żadnych realnych marek (Kwartał = FB, Klipo = TikTok, Nimbus = chmura), zdjęcia w realizmie assets/lena-v2.jpg, twarze tylko z /workspace/duskwood-refs/.

## 1. Punkt wyjścia: druga połowa pudła

Grudzień 2026, tydzień przed świętami. Weronika kończy katalog pudła Rybickiego („na katalog, nie na publikację” — umowa z rodziną z m0). W pudle są kasety i zeszyty, ale nie ma tego, co Rybicki nagrywał telefonem od 2006: rozmów „nie do druku”, z których brał tło, a nigdy nie cytował.

W piątek 18.12 na Klipo pojawia się konto **@archiwum.rybickiego**. Pierwszy klip: 40 sekund głosu Rybickiego i młodej kobiety z Mgliska (nagranie z 2019), która mówi, kto naprawdę podpalił stodołę Pawlaków w 2009. Widziała to jako dziecko. Bez nazwisk, ale w miasteczku na 3 tysiące osób nazwisko nie jest potrzebne. Do niedzieli są trzy klipy, 60 tys. wyświetleń i pierwsza osoba, która wyprowadza się do siostry.

Pytanie dla gracza: **kto otworzył chmurę zmarłego dziennikarza i dlaczego wrzuca cudze tajemnice w okienka po 40 sekund?**

## 2. Prawda sprawy (tabela autorska)

| Fakt | Prawda | Co widzi gracz na początku |
|---|---|---|
| Źródło nagrań | Konto Nimbus Rybickiego, automatyczna kopia z telefonu 2006–2021 | „Wyciek z redakcji” albo „ktoś ukradł pudło” |
| Dostęp | Reset hasła przez pytania bezpieczeństwa; odpowiedzi są w nekrologu, w jego tekstach i w notatkach z pudła | „Haker”, „Igor umie takie rzeczy” |
| Kto | **Kuba (19)** | Kuba pomaga graczowi szukać sprawcy |
| Kiedy | Pierwsze logowanie 2.12 (dzień po tym, jak Weronika pokazała mu w bibliotece fiszki z pudła); rozmowa z nią w m4 | Nikt nie pyta o daty logowań |
| Motyw | Po S1 Kuba nie wytrzymuje „cicho jest bezpieczniej”: miasteczko 29 lat milczało o Tomku, teraz milczy o Gajdzie. Chce, żeby „wszyscy usłyszeli, jacy są” | Szantaż, pieniądze, zemsta na Rybickim |
| Granica | Kuba sam nie słucha wszystkiego. Wrzuca to, co wybiera mu ktoś z komentarzy (konto **@cicho.bylo**), który podsyła mu znaczniki czasu | Jeden sprawca |
| @cicho.bylo | **Lena Cicha (24), kierowczyni busa** (postać z S1, flaga `metLena`): to jej głos z 2019 jest w klipie od stodoły i chce, żeby wyszło „jej słowami”, zanim wyjdzie cudzymi. Kuba nie wie, kim jest | Troll, prowokator |
| Czego nie ma | Nikt nie zginął, nikt nie płaci okupu. Szkoda jest społeczna i realna: wstyd, przeprowadzki, jedno pobicie | — |

Zasada uczciwości: każdy element rozwiązania ma źródło w grze (dokument, metadane, zeznanie, zdjęcie). Gracz **nie włamuje się** do niczego. Logi logowań Nimbusa dostaje legalnie: Weronika jako osoba upoważniona przez rodzinę prosi o „historię aktywności konta zmarłego” (sesja 14).

## 3. Zwrot akcji

Na koniec aktu IV gracz odkrywa, że konto prowadzi Kuba — osoba, która przez całą sprawę 1 była „tym miłym młodszym”, a w sprawie 3 sam przyniósł graczowi pierwszy klip. Drugie dno (akt V): Kuba nie wybiera fragmentów. Wybiera je Lena, która chce ujawnić własną historię i przy okazji pogrąża innych.

Siła zwrotu: gracz sam nauczył Kubę tej metody. W S1 rozdz. 1 Kuba patrzył, jak gracz odzyskuje Nimbus Mai przez „nie pamiętasz hasła” i pytania bezpieczeństwa.

### Zapowiedzi już w grze (nie zmieniać bez aktualizacji planu)

| Gdzie | Co | Funkcja |
|---|---|---|
| js/story/prolog.js:185 | Kuba: „próbowałem się zalogować na jej laptopie… pyta o pytania bezpieczeństwa” | Kuba zna mechanizm resetu |
| js/story/ch1.js (odzyskanie Nimbusa Mai) | Kuba zgaduje odpowiedzi („wpisałem bandzior i aparat. oba źle 💀”), gracz trafia | Kuba widzi, że odpowiedzi leżą w życiu ofiary |
| js/data/web.js, strona „nekrolog” | „Do końca miał ten sam numer komórki”, „starym kombi po Sudetach”, „W szufladzie zostawił niedokończony reportaż” | Publiczne odpowiedzi na pytania bezpieczeństwa |
| js/story/most3.js, m4 | Weronika: „Kuba Wrona pytał mnie dziś w bibliotece, czy pan Adam też trzymał wszystko »w chmurze«, jak Maja…” | Data i motyw ciekawości (2.12) |
| js/story/epilog.js, Cisza | Kuba: „ja już nie mogę tego słuchać” | Motyw: zmęczenie milczeniem |
| js/story/prolog.js | „bo tu wszyscy się znają” | Temat: tajemnica w małym mieście |
| js/data/case-most.js, s2.credits.teaser | „Hasło znał tylko pan Adam. I ktoś, kto patrzył, jak odzyskujesz cudze konto.” | Uczciwa, otwarta zapowiedź |
| docs/GLOSY-POSTACI.md | Tiki Kuby: procent baterii, „pożyczony kabel”, „💀” | Opisy klipów @archiwum mają te same tiki (patrz akt III) |

### Zapowiedzi do dodania w sprawie 3 (przed ujawnieniem)

1. Sesja 3: Kuba pisze „mam 4% weź” w tej samej minucie, w której konto wrzuca klip z opisem „4% baterii a i tak wrzucam”.
2. Sesja 7: zdjęcie biurka Kuby (prosi o pomoc z drukarką): na kartce lista „imię psa? / pierwsza redakcja? / ulica dzieciństwa?”. Kadr ostry, gracz musi sam zauważyć.
3. Sesja 11: Kuba zna szczegół z klipu, który został usunięty po 6 minutach.
4. Sesja 14: historia aktywności konta — logowania z sieci biblioteki w Mglisku i z mobilnego internetu w godzinach, kiedy Kuba jest „na nocce w magazynie”.
5. Fałszywe tropy muszą mieć własne uczciwe wyjaśnienie: Igor (był w Szklarzu, ale ma alibi: dyżur w serwisie, logi kasy), Natan (ma dostęp do archiwum GS, ale nagrań tam nie ma), Zuza (robi duet z klipem, bo „zasięgi”, potem żałuje), Maja (ma pudło, ale chmura nie była w pudle).

## 4. Obsada i głosy

| Postać | Wiek | Rola | Głos (skrót, pełne w GLOSY) |
|---|---|---|---|
| Kuba Wrona | 19 | sprawca, pomocnik gracza | małe litery, „ej”, „💀”, procent baterii, krótkie serie |
| Maja | 22 | właścicielka pudła | pełne zdania, ironia, poprawia literówki gwiazdką |
| Weronika | 40+ | bibliotekarka, upoważniona przez rodzinę | „Pan/Pani”, pełne zdania, przecinki |
| Lena Cicha | 24 | kierowczyni busa, @cicho.bylo | rzeczowo, krótko, bez emotek; głosówki z trasy |
| Igor | 22 | fałszywy trop (technik) | „ . ” zamiast kropek, rzeczowo |
| Zuza | 17 | twórczyni, fałszywy trop | Klipo-slang, „serio”, „xd” |
| Natan | 30+ | archiwum GS | rzeczowo, link + jedno zdanie |
| Sylwia | 50+ | admin grupy Kwartał „Mglisko” | uprzejmie, pełne zdania |
| Ewa Rybicka | 60 | wdowa po Adamie, nowa postać | SMS-y krótkie, bez polskich znaków; nie chce „żeby ktoś go znowu słuchał” |

Twarze: Kuba, Maja, Weronika, Igor, Zuza, Natan, Sylwia mają refy w /workspace/duskwood-refs/; Lena ma kanoniczny wygląd z assets/lena-v2.jpg (skopiować jako refs/lena.jpg). Ewa wymaga nowego refu (portret w stylu lena-v2.jpg) przed pierwszym zdjęciem.

## 5. Przebieg (30 sesji, 18.12–24.12.2026)

- **Akt I „Pierwszy klip” (s1–6).** Kuba przysyła link: „to pan adam?”. Maja sprawdza pudło: nic nie zginęło. Ewa Rybicka dzwoni do Weroniki we łzach. Pierwsza ofiara: syn rodziny wskazanej w klipie znika z grupy, ktoś maluje sprayem bramę. Cel gracza: ustalić, skąd pochodzą nagrania (metadane klipu: dźwięk z telefonu, nie z kasety).
- **Akt II „Chmura” (s7–12).** Gracz dochodzi do Nimbusa. Fałszywe tropy: Igor (Szklarz), Natan. Klip nr 4 uderza w rodzinę Sowów (Ola, Bartek) — napięcie w grupie, Bartek oskarża Igora. Pierwsze zapowiedzi Kuby (s3, s7, s11).
- **Akt III „Opisy” (s13–18).** Analiza opisów klipów: godziny wrzutek, tiki językowe, procent baterii. Weronika uzyskuje od dostawcy historię aktywności konta (s14). Zuza robi duet i dostaje hejt — gracz decyduje, czy jej pomóc (flaga `k_zuzaHelped`).
- **Akt IV „Kto patrzył” (s19–24).** Logi + biblioteka + nocki Kuby. Konfrontacja na czacie: Kuba nie zaprzecza, pisze „to ty mnie nauczył{eś|aś}”. Zwrot.
- **Akt V „Cudzym głosem” (s25–30).** Kuba mówi, że fragmenty wskazuje @cicho.bylo. Gracz ustala, że to Lena (nazwisko Cicha + „cicho było”, głosówka z busa: ten sam dźwięk kierunkowskazu co w klipie od stodoły, rozkład jazdy). Lena: „wolałam, żeby wyszło moimi słowami”. Decyzje końcowe.

## 6. Zakończenia (season 's3')

| id | Warunki | Treść |
|---|---|---|
| `wlasnym_glosem` | Kuba sam wyłącza konto + Ewa zgadza się na zamknięcie chmury (`k_ewaOk`) + Lena opowiada swoją historię Weronice, nie Klipo (`k_lenaTalks`) | Konto znika, Kuba przeprasza dwie osoby imiennie. Lena nagrywa rozmowę z Weroniką do archiwum, z zakazem publikacji. Najlepsze, ale gorzkie |
| `zasiegi` | Gracz ujawnia Kubę publicznie w grupie Kwartał (`k_outedKuba`) | Kuba traci pracę, miasteczko ma nowego „winnego”, Lena milknie na zawsze. Milczenie wygrywa inaczej |
| `kopia` | Brak zgody Ewy lub brak rozmowy z Leną | Konto zamknięte, ale ktoś zdążył pobrać całość. Ostatni kadr: nowy profil, 0 obserwujących, pierwszy klip za 3 dni |

## 7. Łączenie z zapisami S1 i S2

- `vars.s1Ending === 'cisza'`: Kuba pamięta, że nikt nic nie powiedział o Mai; jego motyw jest ostrzejszy, prolog „Hasło” zamiast „Pierwszy klip” (analogicznie do mp w sprawie 2).
- `vars.s2Ending === 'pelny_kadr'`: Sylwia ufa graczowi od początku (pomija s5). `margines`/`cudzy_podpis`: Sylwia podejrzewa gracza o „kolejny wyciek”.
- `flag:m_protectK`: Krystyna Kruk pozwala użyć swojego nagrania jako przykładu „jak to się robi z zgodą”.
- Rozdziały: ['kp','k0'…'k5'], `kicker: 'Sprawa 3 · Rozdział N'`, pogoda dla k0–k5, generator migracji pomija nowe rozdziały.

## 8. Kontrola przed produkcją

1. Każdy klip @archiwum ma tekst w dialogu i dowód z metadanymi (data wrzutki, długość, opis).
2. Test z pełnym przejściem dla trzech zakończeń + ścieżki Cisza (jak tests/case-most.browser.cjs).
3. Codex czyta dialogi pod kątem „pisane, nie wystukane” przed każdym pushem aktu.
4. Bez instrukcji włamania: w grze pokazujemy, że pytania bezpieczeństwa są słabe, ale nie podajemy kroków na prawdziwe usługi. Zamiast tego Weronika na końcu poprawia ustawienia kont biblioteki (jedna scena, bez wykładu).
5. Bez realnych marek, także na zdjęciach (logo na telefonie, busie, kubku).

## 9. Stan produkcji (22.10.2026)

W grze: `kp` „Hasło” (tylko po Ciszy z S1), `k0` „Pierwszy klip”, `k1` „Chmura”, `k2` „Opisy”, `k3` „Kto patrzył”, `k4` „Cudzym głosem” z trzema zakończeniami (`wlasnym_glosem`, `zasiegi`, `kopia`). Pięć aktów planu zmieściło się w pięciu rozdziałach (k4 łączy akt V i finał). Pliki: js/story/kopia.js, js/story/kopia2.js, js/data/case-kopia.js.

Doprecyzowania względem planu (po redakcji Codex):
- 2.12.2026 to środa. Kuba pobrał cały folder „Nagrania” (1412 plików) w czytelni o 17:52; później logował się z internetu mobilnego.
- Droga Leny do nagrań: Kuba napisał pod starym filmem, że ma nagrania; @cicho.bylo poprosiło o listę plików z 2019, potem wskazywało pliki po nazwach („2016_warsztat_S”).
- Zdjęcie okna czytelni zrobił Kuba (przyznaje się w k3).
- Pawlakowie są właścicielami stodoły; tłum zrozumiał klip jako „sami podpalili dla odszkodowania”. Lena widziała człowieka z kanistrem, będąc z ojcem w szoferce.

Straszaki S3: k0 `scDom` (telefon z domu Rybickich), k1 `scOkno` (zdjęcie okna), k1 `scGlos` (zakłócenie + głosówka), k2 `scOddech` (oddech i kierunkowskaz), k3 `scKuba` (nocny telefon od Kuby), k4 `scPetla` (zdjęcie z kabiny busa), k4 `scKopia` (tylko zakończenie „kopia”).
