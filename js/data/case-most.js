'use strict';
/* Sprawa nr 2 „Most” (docs/SPRAWA-2-PLAN.md): obsada, dowody, strony WWW i sezon.
   Prawda z 2011 r. i zwrot (Marta jest córką Janiny Kurek) są tu tylko w danych autorskich,
   nie w tekstach widocznych przed odpowiednią sesją. */

Object.assign(DATA.chars, {
  marta: {
    name: 'Marta Jasińska', short: 'Marta', age: 24, trust: true, color: '#c9a76b',
    role: 'Archiwum i montaż audio · Gazeta Sudecka',
    bio: 'Digitalizuje stare kasety redakcji. Ma w głowie godziny i minuty z każdego nagrania.',
    status: 'w archiwum do 18', number: '694 117 302'
  },
  natan: {
    name: 'Natan Brzeziński', short: 'Natan', age: 25, trust: true, color: '#6fb0e8',
    role: 'Operator obrazu · GS Wideo',
    bio: 'Kręci, montuje, wrzuca. Czasem w tej kolejności.',
    status: 'na planie', number: '511 284 690'
  },
  nina: {
    name: 'Nina Duda', role: '23 lata · kurierka', cond: 'ev:ev_mp_nina',
    facts: [
      { text: 'Nie widziała Mai. Powtarza to sama, zanim ktoś zapyta.' },
      { text: '6.11 w Rzeczce 17 paczki odebrał mężczyzna, który skojarzył się jej z Gajdą. Skojarzenie, nie rozpoznanie.' }
    ]
  },
  dudek: {
    name: 'Paweł Dudek', role: 'kierownik budowy w Kurek-Bud', cond: 'ev:ev_m_dudek',
    facts: [
      { text: 'W 2011 odebrał z warsztatu Sowów furgonetkę Kurek-Bud (faktura 117/09/2011).' },
      { text: 'Poprosił stażystkę Idę o fragment kasety i o „samo to z siatką i moja wina”.' }
    ]
  },
  janina: {
    name: 'Janina Kurek', short: 'J. Kurek', age: 48, color: '#9aa3b5',
    role: 'Współwłaścicielka Kurek-Bud sp. z o.o.'
  },
  henryk: {
    name: 'Henryk Wiśniewski', short: 'Pan Henryk', age: 74, trust: true, color: '#b49a7a',
    role: 'Emeryt, dawniej brygadzista', number: '74 832 55 19',
    voicemail: '„Wiśniewski. Mnie nie ma. Proszę mówić po sygnale. Głośno.”'
  },
  krystyna: { name: 'Krystyna Kruk', short: 'Pani Krystyna', age: 71, number: '74 873 52 06' },
  nina: {
    name: 'Nina Duda', short: 'Nina', age: 23, trust: true, color: '#7fb77e',
    role: 'Kurierka · rejon Głuszyca / Rzeczka', bio: 'Zawsze robi zdjęcie karty trasy. Bo potem dzwonią, że nie było doręczenia.',
    status: 'w trasie', number: '533 410 286'
  },
  ostrowski: { name: 'kom. Paweł Ostrowski', short: 'Ostrowski', role: 'Wydział Kryminalny KWP we Wrocławiu', number: '71 340 22 17' },
  dudek: { name: 'Paweł Dudek', short: 'Dudek', role: 'Kierownik budowy · Kurek-Bud' },
  gs_sek: { name: 'Gazeta Sudecka · sekretariat', short: 'Sekretariat', number: '74 832 10 40' }
});
Object.assign(DATA.chats, {
  marta: { name: '+48 694 117 302', avatar: 'unknown' },
  natan: { name: 'Natan Brzeziński', avatar: 'natan', sub: 'GS Wideo' },
  nina: { name: 'Nina Duda', avatar: 'nina', sub: 'od Kuby' },
  henryk_sms: { name: 'H. Wiśniewski', avatar: 'henryk', sub: 'SMS', readonly: true }
});

Object.assign(DATA.persons, {
  marta: {
    name: 'Marta Jasińska', role: '24 lata · archiwum Gazety Sudeckiej', cond: 'flag:m_martaVerified',
    facts: [
      { text: 'Zgłosiła się z prywatnego numeru. Sekretariat redakcji potwierdził, że pracuje w archiwum (pokój 12).' },
      { text: 'Rybicki zdigitalizował kasetę „H.W. 2/2” w 2019 r. Plik jest w archiwum redakcji. Części 1/2 nie ma ani tam, ani w pudle.' },
      { text: 'Zna rozkład biura Kurek-Bud: „robiłam tam kiedyś praktyki”.', cond: 'ev:ev_m_praktyki' },
      { text: '„U nas mówiło się, że most to przekleństwo… W Mglisku, znaczy.”', cond: 'ev:ev_m_przeklenstwo' },
      { text: '„Mama ma zawsze rację co do terminów.”', cond: 'ev:ev_m_terminy' },
      { text: 'Jest córką Janiny Kurek. Opowiadała matce o kasecie i załączniku nr 3. Nie wiedziała, co matka z tym zrobi.', cond: 'flag:m_twist' }
    ]
  },
  henryk: {
    name: 'Henryk Wiśniewski', role: '74 lata · brygadzista przy remoncie mostu w 2011', cond: 'flag:m_metHenryk',
    facts: [
      { text: 'To „pan Henryk” z grupy na Kwartale. Jego wcześniejszych relacji nikt nie traktował poważnie.' },
      { text: 'Twierdzi, że nagranie „jest nie całe”. Na razie to tylko jego słowa.' },
      { text: 'Mówi, że Darek był trzeźwy. Relacja, nie ustalenie: nikt jej jeszcze nie sprawdził.', cond: 'flag:m_henrykSober' }
    ]
  },
  nina: {
    name: 'Nina Duda', role: '23 lata · kurierka', cond: 'ev:ev_mp_nina',
    facts: [
      { text: 'Nie widziała Mai. Powtarza to sama, zanim ktoś zapyta.' },
      { text: '6.11 w Rzeczce 17 paczki odebrał mężczyzna, który skojarzył się jej z Gajdą. Skojarzenie, nie rozpoznanie.' }
    ]
  },
  dudek: {
    name: 'Paweł Dudek', role: 'kierownik budowy w Kurek-Bud', cond: 'ev:ev_m_dudek',
    facts: [
      { text: 'W 2011 odebrał z warsztatu Sowów furgonetkę Kurek-Bud (faktura 117/09/2011).' },
      { text: 'Poprosił stażystkę Idę o fragment kasety i o „samo to z siatką i moja wina”.' }
    ]
  },
  janina: {
    name: 'Janina Kurek', role: '48 lat · współwłaścicielka Kurek-Bud', cond: 'ev:ev_m_kb_statement',
    facts: [
      { text: 'W 2011 r. kierowała kontraktem remontu mostu.' },
      { text: 'Oświadczenie firmy po publikacji: uprzejme, punkt po punkcie, bez odpowiedzi na pytania redakcji.' },
      { text: 'W mailu z 26.11 pisze o „załączniku nr 3”, choć w publikacji był tylko „brakujący dokument”.', cond: 'ev:ev_m_janina_mail' },
      { text: 'Z domowego tabletu poszła 20.11 wiadomość do Dudka o kasecie i zał. nr 3.', cond: 'flag:m_twist' }
    ]
  }
});

Object.assign(DATA.evidence, {
  ev_m_teczka: {
    title: 'Teczka „KRUK / MOST / 2011”', cat: 'object', source: 'Pudło Rybickiego · zdjęcie Mai', img: 'most_teczka',
    desc: 'Opis ołówkiem: *„KRUK / MOST / 2011 — NIE PUBLIKOWAĆ BEZ K.”* W środku: notes A5, kaseta mini-DV „H.W. 2/2”, ksero strony 41 dziennika robót, pocztówka bez nadawcy, wycinek z 2012 r. Rodzina Rybickiego zgodziła się na katalog, nie na publikację.'
  },
  ev_m_notes: {
    title: 'Notes Rybickiego, 14.09–02.12.2011', cat: 'testimony', source: 'Teczka KRUK',
    desc: 'Krótkie notatki z rozmów po śmierci Darka Kruka. Same inicjały i skróty. Powtarza się *„K.”*: „K. — nie dzwonić, tylko osobiście”, „K. przyniosła ksero”. Nie wiadomo, kim jest K.'
  },
  ev_m_dv: {
    title: 'Kaseta mini-DV „H.W. 2/2”', cat: 'digital', source: 'Teczka KRUK', img: 'most_hw',
    desc: 'Druga część rozmowy z „H.W.”, nagranej w październiku 2011. *Części 1/2 brak.* Bez niej wypowiedzi są wyrwane z kontekstu.'
  },
  ev_m_s41: {
    title: 'Ksero dziennika robót, str. 41', cat: 'photo', source: 'Teczka KRUK', img: 'most_s41',
    desc: 'Wpis z *13.09.2011*: „Siatka zabezpieczająca — brak, zgłoszone kier. kontraktu. Protokół — zał. nr 3.” Podpis H.W. Kserokopia bez pieczątki; oryginał nieznany. To jeszcze nie dowód, kto i co zgłosił.'
  },
  ev_m_postcard: {
    title: 'Pocztówka bez nadawcy', cat: 'msg', source: 'Teczka KRUK', img: 'most_postcard',
    desc: '„Panie Adamie, proszę o nic więcej nie pytać. *Dziękuję za mleko.*” Bez podpisu i daty. Charakteru pisma nie da się przypisać bez porównania.'
  },
  ev_m_clip2012: {
    title: 'Wycinek „Głos Doliny”, 9.03.2012', cat: 'object', source: 'Teczka KRUK', img: 'most_clip',
    desc: 'Prokuratura umarza sprawę śmierci Dariusza K.: „nieszczęśliwy wypadek, bez udziału osób trzecich”. Wykonawca, firma *Kurek-Bud*, nie komentuje. O siatce i dzienniku ani słowa.'
  },
  ev_m_most2011: {
    title: 'Most nad Mglicą, wrzesień 2011', cat: 'place', source: 'Archiwum Gazety Sudeckiej · zdjęcie czytelnika', img: 'most_2011',
    desc: 'Remont przęsła II: rusztowania, plandeki, niski stan wody, skały pod przęsłem. Zdjęcie nie ma daty dziennej. Na tym kadrze nie widać siatki zabezpieczającej, ale też nie widać całego przęsła.'
  },
  ev_m_gs: {
    title: '„Most 2011. Brygadzista: moja wina” · GS Wideo', cat: 'digital', source: 'gazetasudecka.pl/wideo', img: 'most_hw',
    desc: 'Fragment 0:40. Henryk W. mówi: „ja tej siatki nie założyłem z powrotem, moja wina”. Na pierwszej klatce znak czasu kamery *17:22:08*. W opisie cytat z notesu Rybickiego: „K. przyniosła ksero, dziękuje za mleko”.'
  },
  ev_m_klipo: {
    title: 'Repost na Klipo · @sudety.prawda', cat: 'digital', source: 'klipo.app/@sudety.prawda', img: 'most_hw',
    desc: 'Ten sam fragment, 0:40, z napisem „ON SIĘ PRZYZNAŁ”. Pierwsza klatka: *17:22:08*. W rogu widać jeszcze pasek z logo GS Wideo.'
  },
  ev_m_tyg: {
    title: '„Tydzień w Sudetach” · wideo do artykułu', cat: 'digital', source: 'tydzienwsudetach.pl', img: 'most_hw',
    desc: 'Ta sama wypowiedź, pierwsza klatka *17:22:08*, ale *0:42*. Bez paska GS Wideo. Pod tekstem zdjęcie Janiny Kurek z sesji rady gminy.'
  },
  ev_m_kb_statement: {
    title: 'Oświadczenie Kurek-Bud', cat: 'msg', source: 'Natan · mail do redakcji',
    desc: '„Szanowni Państwo” i trzy punkty: firma „z szacunkiem wspomina zmarłego pracownika”, postępowanie z 2012 r. „jednoznacznie wykluczyło udział osób trzecich”, a na dalsze pytania odpowie „na piśmie, w ustawowym terminie”.'
  },
  ev_m_one: {
    title: 'Trzy publikacje = jeden plik', cat: 'digital', source: 'Porównanie: GS Wideo, Klipo, Tydzień w Sudetach',
    desc: 'Ta sama pierwsza klatka i znak czasu *17:22:08*. Klipo to zapis ekranu z GS Wideo. *Tygodnik ma 0:42*, czyli dwie sekundy więcej niż „oryginał” redakcji, i nie ma paska GS. Musiał dostać plik skądinąd.'
  },
  ev_mp_nina: { title: 'Relacja Niny Dudy', cat: 'testimony', source: 'Nina · wiadomość',
    desc: '6.11, Rzeczka: paczki odebrał mężczyzna w czapce. Powiedział: „dawaj tu”. Skojarzył się jej z Gajdą po piątkowym nagraniu w TV. *Mai nie widziała.* Nowy trop, nie dowód obecności Mai.' },
  ev_mp_doreczenie: { title: 'Zapis doręczenia (zrzut z aplikacji kuriera)', cat: 'digital', source: 'Nina · za zgodą szefowej', img: 'mp_doreczenie',
    desc: 'Etykieta: *PPHU Jodła, Rynek 2, Głuszyca* (adres korespondencyjny). Uwaga nadawcy: „dostarczyć na zaplecze, Rzeczka 17”. Skan: *Rzeczka 17, 06.11, 10:25*, odebrał „R.”. Woda, konserwy, olej opałowy.' },
  ev_mp_karta: { title: 'Karta trasy z 6.11', cat: 'photo', source: 'Nina · zdjęcie', img: 'mp_karta',
    desc: '09:12 Rynek 2 (biuro rachunkowe, list polecony). *10:25 Rzeczka 17 — zaplecze, 3 paczki, odbiór osobisty.* Dopisek długopisem z piątku: „ten sam co w TV?”.' },
  ev_mp_wejscie: { title: 'Wejście, Rzeczka 17 (15.11, 9:58)', cat: 'place', source: 'Nina · zdjęcie z auta', img: 'mp_wejscie',
    desc: 'Budynek gospodarczy dawnego ośrodka kolonijnego huty. Numer 17 przy drzwiach. Kanistry z wodą i drewno pod ścianą. Zdjęcie pokazuje miejsce, nie to, kto jest w środku.' },
  ev_mp_place: { title: 'Wniosek: miejsce do sprawdzenia', cat: 'testimony', source: 'Porównanie: etykieta, skan, karta trasy, zdjęcie',
    desc: 'Etykieta prowadzi do biura w Głuszycy. Paczki trafiły do *Rzeczki 17, na zaplecze*. Zapis w aplikacji, karta trasy i aktualne zdjęcie wskazują miejsce do sprawdzenia przez policję. Nie wiadomo, kto tam jest.' },
  ev_mp_ostrowski: { title: 'Kontakt: kom. Ostrowski', cat: 'msg', source: 'Weronika · wizytówka z października', desc: 'Komisarz z Wrocławia, który przejął poszukiwania. Tel. *71 340 22 17*.' },
  ev_mp_report: { title: 'Przekazane do KWP Wrocław', cat: 'msg', source: 'Rozmowa z kom. Ostrowskim',
    desc: 'Relacja Niny, zapis doręczenia, karta trasy i zdjęcie wejścia przekazane bez przycinania. Rodzina i znajomi nie jadą na miejsce.' },
  ev_m_kubek: { title: 'Biurko Marty w archiwum', cat: 'photo', source: 'Marta · zdjęcie', img: 'most_biurko',
    desc: 'Kamera mini-DV, laptop, pudła archiwalne, słuchawki. Kubek z wyblakłym niebieskim „KB”.' },
  ev_m_raw: { title: 'Kaseta H.W. 2/2: pełna wypowiedź (03:12–04:00)', cat: 'testimony', source: 'Odsłuch u Weroniki · nagranie Marty z głośnika',
    desc: '„…ja tej siatki nie założyłem z powrotem, *bo mi zabroniła. Mówi: Heniu, moja wina, jak coś, ja podpiszę.*” „Moja wina” to cudze słowa, które Henryk powtarza. Nazwisko nie pada.' },
  ev_m_cut: { title: 'Miejsce cięcia: 0:37', cat: 'digital', source: 'Marta · porównanie z kasetą',
    desc: 'W publikacji „moja wina” pada od razu po „z powrotem”, na kasecie 9 s później. Na 0:37 znika buczenie lodówki w tle: dwa kawałki z dwóch momentów. Zwykłe porównanie tła, bez „wyostrzania”.' },
  ev_m_przeklenstwo: { title: '„U nas mówiło się…”', cat: 'testimony', source: 'Marta · wiadomość',
    desc: '„U nas mówiło się, że most to przekleństwo.” Zaraz poprawka: „W Mglisku, znaczy.” Drobiazg.' },
  ev_m_faktura: { title: 'Faktura warsztatu Sowów, 13.09.2011', cat: 'object', source: 'Komentarz pod Klipo · Natan', img: 'most_faktura',
    desc: 'Wymiana klocków w furgonetce Kurek-Bud (DDZ 4417K). Przyjęta 12.09, wydana 13.09 o 17:30. Wystawił M. Sowa, *odebrał P. Dudek*. Faktura potwierdza usługę, nie czyjąkolwiek obecność przy wypadku.' },
  ev_m_sowa_clear: { title: 'Trop Sowów obalony', cat: 'testimony', source: 'Bartek · zeszyt napraw z 2011',
    desc: 'Wpis w zeszycie zgadza się z fakturą. Bartek miał wtedy 9 lat. Warsztat naprawił hamulce i wydał auto. Własność pojazdu ani obecność w firmie nie oznacza działania przy moście.' },
  ev_m_janina_mail: { title: 'Mail Kurek-Bud z 26.11', cat: 'msg', source: 'Natan · mail do GS Wideo', img: 'most_mail_kb',
    desc: 'Janina Kurek: „sugestie dotyczące rzekomo brakującego *załącznika nr 3* do dziennika robót są bezpodstawne”. W publikacji redakcji był tylko „brakujący dokument”. Skąd numer?' },
  ev_m_terminy: { title: '„Mama ma zawsze rację co do terminów”', cat: 'testimony', source: 'Marta · wiadomość', desc: 'Zwykła rozmowa o wyjeździe na urodziny ciotki.' },
  ev_m_kuchnia: { title: 'Głosówka Marty z kuchni', cat: 'testimony', source: 'Marta · głosówka 0:38',
    desc: 'Na pierwszych 20 s kasety nie ma nazwiska. W tle kobiecy głos: „Martuś, z kim tak późno?”. Barwę można porównać z nagraniem z rady gminy. Nieformalnie, to nie dowód.' },
  ev_m_ida: { title: 'Rozmowa stażystki Idy z Pawłem D.', cat: 'digital', source: 'Natan · za zgodą Idy', img: 'most_ida',
    desc: '20.11, 22:31 Dudek pyta o „stare nagranie z mostu”. Ida wysyła 6 min, potem na prośbę „samo to z siatką i moja wina” robi dwie wersje: *0:42* (źle ucięta) i *0:40*.' },
  ev_m_dudek: { title: 'Droga pliku: Dudek', cat: 'testimony', source: 'Natan · Ida · faktura z 2011',
    desc: 'Cięcie zamówił Paweł Dudek, dziś kierownik budowy w Kurek-Bud. Tygodnik dostał od niego wersję 0:42. Bez hakowania: stażystka sama pokazała wiadomości. Otwarte: skąd Dudek wiedział o kasecie?' },
  ev_m_s41_h: { title: 'Druga kopia str. 41 (szuflada Henryka)', cat: 'photo', source: 'H. Wiśniewski · SMS, zdjęcie wnuczki', img: 'most_szuflada',
    desc: 'Ten sam wpis z 13.09.2011: „siatka — brak, zgłoszone kier. kontraktu. Protokół — zał. nr 3.” Kopia zostaje u Henryka, w szufladzie z rachunkami.' },
  ev_m_second_source: { title: 'Ksero zgodne z kopią Henryka', cat: 'testimony', source: 'Porównanie: teczka KRUK i kopia Henryka',
    desc: 'Kopia od Henryka zgadza się z kserem z teczki. Do porównania obu kopii *nie trzeba ujawniać, kim jest K.*' },
  ev_m_zwrot: { title: 'Wiadomość z domowego tabletu', cat: 'digital', source: 'Marta',
    desc: '20.11, 22:10, do Dudka: „Marta mówi, że w redakcji szukają zał. nr 3 do mostu. Jest kaseta H.W., zgrana. Zajmij się tym.” Marta jest córką Janiny Kurek. Przeciek poszedł przez kuchnię, nie przez hakowanie.' },
  ev_m_oip_s41: { title: 'Str. 41 z akt inspekcji pracy', cat: 'photo', source: 'OIP Wrocław, akta 0412/WP/2011 · Natan', img: 'most_oip_s41',
    desc: '12.09: „Prace wg harmonogramu.” 13.09: *„Piaskowanie przęsła II. Bez uwag.”* O siatce ani słowa. Inne, równe pismo, podpis udaje H.W. Pieczątka „za zgodność z oryginałem”: *kier. kontraktu J. Kurek, 19.09.2011*.' },
  ev_m_rewrite: { title: 'Strona 41 przepisana po wypadku', cat: 'testimony', source: 'Porównanie: ksero z teczki, kopia Henryka, akta OIP',
    desc: 'Dwie kopie od dwóch osób mówią „siatka — brak, zgłoszone, zał. nr 3”. Wersja przekazana inspekcji pięć dni po wypadku ma inne pismo i „bez uwag”. Zgodność potwierdziła sama kierowniczka kontraktu.' },
  ev_m_oip_protokol: { title: 'Protokół powypadkowy nr 7/2011', cat: 'object', source: 'OIP Wrocław, akta 0412/WP/2011 · Natan', img: 'most_oip_protokol',
    desc: 'Wykaz załączników: *„3. Protokół zgłoszenia — brak w aktach”*, dopisane ręcznie. W zespole powypadkowym: H. Wiśniewski jako przedstawiciel pracowników.' },
  ev_m_henryk_oip: { title: 'Henryk: „napisałem przy trzecim brak”', cat: 'testimony', source: 'Henryk · telefon',
    desc: 'Podpisał protokół, ale sam dopisał „brak” przy załączniku nr 3. Inspektorowi powiedział, że Darek był trzeźwy. Relacja zgodna z protokołem.' },
  ev_m_chain: { title: 'Łańcuch dokumentów', cat: 'testimony', source: 'Notatki: kaseta, dwie kopie str. 41, akta OIP',
    desc: '12.09 siatkę zdjęto. 13.09 Henryk zgłasza brak kierowniczce kontraktu (zał. nr 3). 14.09 wypadek. 19.09 do inspekcji trafia przepisana strona, „bez uwag”, z pieczątką J. Kurek. Załącznik nr 3 znika z akt. *Nie ma dowodu zabójstwa.* Jest dowód ukrycia zaniedbania.' },
  ev_m_krystyna_tel: { title: 'Telefon pani Krystyny', cat: 'msg', source: 'Zuza', desc: 'Stacjonarny *74 873 52 06*. „Po piątej, po dzienniku.” Rozmowa tylko o zakresie tekstu.' },
  ev_m_praktyki: {
    title: 'Marta zna biuro Kurek-Bud', cat: 'testimony', source: 'Marta · wiadomość',
    desc: '„Sekretariat na parterze, gabinety na drugim, od podwórza.” Marta: „robiłam tam kiedyś praktyki”. Zwykła informacja. Zapisana na wszelki wypadek.'
  }
});

/* Zdjęcia: assets/most (scena) i assets/people (portrety). */
(() => {
  if (typeof Art === 'undefined') return;
  const P = (id, file, title, w, h, exif) => Art.def(id, { src: 'assets/most/' + file, title, w, h, exif, draw: () => '' });
  P('most_teczka', 'teczka_kruk.jpg', 'Teczka KRUK', 1280, 960, { date: '20.11.2026', time: '19:31', device: 'iPhone 13 · aparat główny', place: 'Mglisko, ul. Lipowa', file: 'IMG_4471.HEIC' });
  P('most_s41', 'dziennik_s41.jpg', 'Dziennik robót, str. 41 (ksero)', 960, 1280, { date: '20.11.2026', time: '19:36', device: 'iPhone 13 · aparat główny', file: 'IMG_4474.HEIC' });
  P('most_postcard', 'pocztowka.jpg', 'Pocztówka bez nadawcy', 1280, 960, { date: '20.11.2026', time: '19:37', device: 'iPhone 13 · aparat główny', file: 'IMG_4475.HEIC' });
  P('most_clip', 'wycinek_2012.jpg', 'Wycinek z 2012', 1280, 960, { date: '20.11.2026', time: '19:38', device: 'iPhone 13 · aparat główny', file: 'IMG_4476.HEIC' });
  P('most_2011', 'most_2011.jpg', 'Most nad Mglicą · IX 2011', 1280, 960, { date: '09.2011', time: '—', device: 'Canon PowerShot A480', file: 'IMG_0912.JPG', note: 'Data dzienna nieustawiona w aparacie' });
  P('mp_doreczenie', 'doreczenie.jpg', 'Zapis doręczenia', 600, 1067, { date: '15.11.2026', time: '10:41', device: 'Zrzut ekranu', file: 'Screenshot_20261115_104127.jpg' });
  P('mp_karta', 'karta_trasy.jpg', 'Karta trasy 6.11', 1280, 960, { date: '06.11.2026', time: '08:47', device: 'Samsung Galaxy A14', place: 'Głuszyca', file: '20261106_084702.jpg' });
  P('mp_wejscie', 'wejscie_17.jpg', 'Rzeczka 17, zaplecze', 1280, 960, { date: '15.11.2026', time: '09:58', device: 'Samsung Galaxy A14', place: 'Rzeczka', file: '20261115_095811.jpg' });
  P('most_biurko', 'biurko_marty.jpg', 'Archiwum, pokój 12', 1280, 960, { date: '23.11.2026', time: '17:04', device: 'Xiaomi Redmi Note 12', file: 'IMG_20261123_170412.jpg' });
  P('most_faktura', 'faktura_sowa.jpg', 'Faktura 117/09/2011', 1280, 960, { date: '25.11.2026', time: '02:11', device: 'zdjęcie z komentarza', file: 'faktura.jpg' });
  P('most_mail_kb', 'mail_kb.jpg', 'Mail Kurek-Bud', 600, 1067, { date: '26.11.2026', time: '14:05', device: 'Zrzut ekranu', file: 'Screenshot_mail.jpg' });
  P('most_ida', 'czat_ida.jpg', 'Rozmowa Idy', 600, 1067, { date: '28.11.2026', time: '09:51', device: 'Zrzut ekranu', file: 'Screenshot_ida.jpg', note: 'Część danych zasłonięta przez Natana' });
  P('most_szuflada', 'szuflada_henryka.jpg', 'Szuflada z rachunkami', 1280, 960, { date: '28.11.2026', time: '19:12', device: 'telefon wnuczki', file: 'IMG_1912.jpg' });
  P('most_oip_s41', 'oip_s41.jpg', 'Akta OIP · str. 41', 1280, 960, { date: '30.11.2026', time: '10:12', device: 'Xiaomi Redmi Note 12', place: 'Wrocław', file: 'IMG_20261130_101233.jpg' });
  P('most_oip_protokol', 'oip_protokol.jpg', 'Akta OIP · protokół', 1280, 960, { date: '30.11.2026', time: '10:15', device: 'Xiaomi Redmi Note 12', place: 'Wrocław', file: 'IMG_20261130_101540.jpg' });
  Art.def('life_zuza_most', { src: 'assets/people/zuza_most.jpg', title: 'Pod mostem', w: 1200, h: 900, draw: () => '' });
  P('most_hw', 'hw_kadr.jpg', 'H.W. 2/2 · kadr', 1280, 720, { date: '10.2011', time: '17:22:08', device: 'mini-DV · zgrane w 2019', file: 'HW_2z2.mov' });
  const life = { nina: 'W trasie', marta: 'Archiwum, piąta po południu', natan: 'Pod redakcją', janina: 'Sesja rady gminy', henryk: 'Ławka pod blokiem' };
  Object.entries(life).forEach(([who, title]) => {
    const c = DATA.chars[who];
    c.photo = 'assets/people/' + who + '.jpg';
    const id = 'life_' + who + '_1';
    Art.def(id, { src: 'assets/people/' + who + '_life1.jpg', title, w: 1200, h: 900, draw: () => '' });
    c.life = [id];
  });
})();

/* Internet sprawy nr 2. Strony są dostępne dopiero od sesji, w której pojawia się nagranie. */
(() => {
  if (!DATA.web) return;
  const img = id => `<img src="${Art.url(id)}" alt="" data-img="${id}">`;
  const gsHead = () => `<header class="gz-h"><div class="gz-top"><span>Dzierżoniów · Wałbrzych · Kłodzko</span><span>Archiwum od 1991</span></div><div class="gz-mast">Gazeta Sudecka</div></header>`;
  DATA.web.gs_kontakt = {
    id: 'gs_kontakt', url: 'gazetasudecka.pl/kontakt', title: 'Kontakt z redakcją — Gazeta Sudecka', site: 'gazeta', fav: 'G', favColor: '#7b2b21',
    kw: ['gazeta sudecka kontakt', 'kontakt gazeta sudecka', 'redakcja gazety sudeckiej', 'gazeta sudecka telefon', 'sekretariat redakcji', 'redakcja kontakt', 'gazeta sudecka archiwum'],
    snippet: 'Sekretariat redakcji: 74 832 10 40 (pn–pt 8–18). Archiwum: pokój 12.',
    avail: 'flag:m_case',
    html: () => `${gsHead()}<main class="gz-m gz-art"><h1>Kontakt</h1>
      <p><b>Sekretariat redakcji</b><br>tel. <b>74 832 10 40</b> (pn–pt 8:00–18:00)<br>ul. Kolejowa 3, 58-200 Dzierżoniów</p>
      <p><b>Archiwum i dokumentacja</b><br>pokój 12 · połączenie przez sekretariat</p>
      <p><b>GS Wideo</b><br>wideo@gazetasudecka.pl</p>
      <p class="gz-small">Nie prosimy czytelników o przesyłanie materiałów przez prywatne komunikatory. Pracownika redakcji zawsze możesz potwierdzić w sekretariacie.</p></main>`
  };
  DATA.web.gs_most = {
    id: 'gs_most', url: 'gazetasudecka.pl/wideo/most-2011-brygadzista', title: 'Most 2011. Brygadzista: „moja wina” — GS Wideo', site: 'gazeta', fav: 'G', favColor: '#7b2b21',
    kw: ['most 2011', 'brygadzista moja wina', 'gs wideo', 'gazeta sudecka wideo', 'most kolejowy nagranie', 'henryk w', 'nagranie most', 'kruk most nagranie', 'moja wina'],
    snippet: 'Fragment nieznanej dotąd rozmowy z brygadzistą remontu mostu nad Mglicą (2011). 0:40.',
    avail: 'flag:m_clipOut', ev: 'ev_m_gs',
    html: () => `${gsHead()}<main class="gz-m gz-art"><div class="gz-kick">GS Wideo · Region</div>
      <h1>Most 2011. Brygadzista: „moja wina”</h1>
      <figure>${img('most_hw')}<figcaption>▶ 0:40 · kadr z kasety mini-DV, X 2011</figcaption></figure>
      <p>Fragment nieznanej dotąd rozmowy, którą śp. Adam Rybicki nagrał w październiku 2011 r. z brygadzistą remontu mostu kolejowego nad Mglicą. Miesiąc wcześniej przy remoncie zginął 30-letni Dariusz K.</p>
      <p><i>${G.flag('m_quoteRemoved') ? '[Opis zaktualizowany 23.11.2026, 21:14]' : 'Z notesu Rybickiego: „K. przyniosła ksero, dziękuje za mleko”.'}</i></p>
      <p class="gz-small">Oprac. N. Brzeziński · 22.11.2026, 20:05 · 18 komentarzy</p></main>`
  };
  DATA.web.tt_most = {
    id: 'tt_most', url: 'klipo.app/@sudety.prawda', title: 'sudety prawda (@sudety.prawda) | Klipo', site: 'tt', fav: '♪', favColor: '#111',
    kw: ['sudety prawda', 'sudety.prawda', 'on się przyznał', 'klipo most', 'most klipo', 'brygadzista klipo'],
    snippet: '@sudety.prawda · „ON SIĘ PRZYZNAŁ” · 112 tys. wyświetleń',
    avail: 'flag:m_clipOut', ev: 'ev_m_klipo',
    html: () => `<header class="tt-h"><b>klipo</b></header><main class="tt-m">
      <article class="tt-v"><div class="tt-frame">${img('most_hw')}<span>▶ 112 tys.</span></div>
      <p><b>ON SIĘ PRZYZNAŁ</b> 😡 13 lat ciszy i nagle „moja wina”. #mglisko #most #sudety</p>
      <div class="tt-com"><p><b>gosia_z_bielawy</b> a mówili wypadek</p><p><b>m.kowal</b> stary wisniewski z wodnej? on zawsze sie myli</p><p><b>zuzakruk_</b> skad macie to nagranie? to jest wyciete z dluzszego</p></div></article></main>`
  };
  DATA.web.tyg_most = {
    id: 'tyg_most', url: 'tydzienwsudetach.pl/region/most-nad-mglica', title: 'Kto zdjął siatkę? Pytania po 15 latach — Tydzień w Sudetach', site: 'gazeta', fav: 'T', favColor: '#2c5b3f',
    kw: ['tydzień w sudetach', 'tydzien w sudetach', 'kto zdjął siatkę', 'tygodnik most', 'kurek-bud', 'kurek bud', 'janina kurek'],
    snippet: '„Ja tej siatki nie założyłem”. Nagranie z 2011 r. wraca do Mgliska. Firma: postępowanie zakończone.',
    avail: 'flag:m_clipOut', ev: 'ev_m_tyg',
    html: () => `<header class="gz-h"><div class="gz-top"><span>Tygodnik regionalny</span><span>od 2004</span></div><div class="gz-mast" style="color:#2c5b3f">Tydzień w Sudetach</div></header><main class="gz-m gz-art">
      <h1>Kto zdjął siatkę? Pytania po 15 latach</h1>
      <figure>${img('most_hw')}<figcaption>▶ 0:42 · nagranie z 2011 r., materiał nadesłany</figcaption></figure>
      <p>Brygadzista Henryk W. na nagraniu z 2011 roku mówi, że nie założył z powrotem siatki zabezpieczającej. Wykonawca remontu przypomina, że prokuratura umorzyła postępowanie w 2012 roku.</p>
      <figure>${img('life_janina_1')}<figcaption>Janina Kurek, współwłaścicielka Kurek-Bud, podczas sesji rady gminy. Fot. TwS</figcaption></figure>
      <p class="gz-small">23.11.2026 · red.</p></main>`
  };
})();

/* Sezon 2: osobne wydanie, ten sam zapis. Identyfikatory odcinków są kontraktem zapisu. */
DATA.seasons.push({
  id: 's2', revision: 1, title: 'Most', kicker: 'SPRAWA 2', released: true,
  description: 'Czterdzieści sekund z kasety z 2011 roku. Jedno zdanie, które wszyscy już usłyszeli.',
  chapters: ['mp', 'm0', 'm1', 'm2', 'm3', 'm4', 'm5'],
  episodes: [
    ['s2.00a', 'Adres na paczce', 'mp', 'ev:ev_mp_place'],
    ['s2.00b', 'Rzeczka 17', 'mp', 'flag:m_lateRescue'],
    ['s2.01', 'Teczka KRUK', 'm0', 'ev:ev_m_teczka'],
    ['s2.02', 'Most czy praca', 'm0', 'flag:m_sameEvent'],
    ['s2.03', 'Numer redakcji', 'm0', 'flag:m_martaVerified'],
    ['s2.04', 'Czterdzieści sekund', 'm1', 'ev:ev_m_gs'],
    ['s2.05', 'Trzy publikacje', 'm1', 'ev:ev_m_one'],
    ['s2.06', 'Dwie sekundy więcej', 'm1', 'flag:m_act1'],
    ['s2.07', 'Surowa kaseta', 'm2', 'ev:ev_m_raw'],
    ['s2.08', 'Miejsce cięcia', 'm2', 'ev:ev_m_cut'],
    ['s2.09', 'Faktura Sowów', 'm2', 'ev:ev_m_sowa_clear'],
    ['s2.10', 'Załącznik nr 3', 'm2', 'flag:m_zal3Noticed'],
    ['s2.13', 'Kuchnia', 'm3', 'ev:ev_m_kuchnia'],
    ['s2.14', 'Droga pliku', 'm3', 'ev:ev_m_dudek'],
    ['s2.16', 'Szuflada z rachunkami', 'm3', 'ev:ev_m_second_source'],
    ['s2.18', 'To byłam ja', 'm3', 'flag:m_twist'],
    ['s2.19', 'Akta z Wrocławia', 'm4', 'ev:ev_m_oip_s41'],
    ['s2.21', 'Przepisana strona', 'm4', 'ev:ev_m_rewrite'],
    ['s2.23', 'Nie ma dowodu zabójstwa', 'm4', 'flag:m_toldZuzaTruth'],
    ['s2.24', 'Decyzja Marty', 'm4', 'flag:m_act4'],
    ['s2.26', 'Cudzy cytat', 'm5', s => G.flag('m_protectK') || G.flag('m_leakK')],
    ['s2.28', 'Sprostowanie', 'm5', s => G.flag('m_correctionFirst') || G.flag('m_correctionLater')],
    ['s2.30', 'Pełny kadr', 'm5', 'flag:m_published']
  ].map(([id, title, chapter, done]) => ({ id, title, chapter, done }))
});

Object.assign(DATA.endings, {
  pelny_kadr: {
    season: 's2', title: 'PEŁNY KADR', tag: 'Sprawa 2 · zakończenie 1 z 3', mood: 'dawn',
    text: [
      'Gazeta Sudecka publikuje „Stronę 41” i korektę pod starym nagraniem. Rozmowa z panem Henrykiem trwa czternaście minut. Redakcja publikuje ją bez cięć, nawet z kaszlem.',
      'Inspekcja pracy wznawia sprawdzanie dokumentacji z 2011 roku. Rada nadzorcza Kurek-Bud odwołuje Janinę Kurek z zarządu. Prokuratura bada przepisanie dziennika. Nie ma dowodu zabójstwa.',
      () => G.flag('m_martaStays') ? 'Marta zostaje w archiwum. Do domu matki jeździ teraz w niedziele, na godzinę. Rozmawiają o pogodzie i o terminach.' : 'Marta wraca do archiwum po publikacji. Z matką nie rozmawia. Obiad pod drzwiami pojawia się jeszcze dwa razy, potem już nie.',
      'Pani Krystyna przychodzi do Weroniki po kasetę i oddaje ją do depozytu sama. W kuchni pierwszy raz mówi o synu pełnymi zdaniami: że lubił mosty, bo „widać z nich, dokąd się płynie”.',
      'Zuza wrzuca jedno spokojne wideo. Bez muzyki. Babcia obejrzała je pierwsza.'
    ]
  },
  margines: {
    season: 's2', title: 'MARGINES', tag: 'Sprawa 2 · zakończenie 2 z 3', mood: 'calm',
    text: [
      'Tekst wychodzi. Dokumenty z inspekcji wystarczą, żeby napisać o przepisanej stronie i brakującym załączniku. Nie wystarczą, żeby napisać wszystko.',
      () => G.flag('m_henrykOnRecord') ? 'Pan Henryk mówi pod nazwiskiem.' : 'Pan Henryk nie mówi. W tekście jest tylko jego podpis z 2011 roku i dopisek „brak”.',
      () => G.flag('m_correctionFirst') ? 'Sylwia przypina sprostowanie przed publikacją. Część grupy i tak pisze, że „gazeta się wybiela”.' : 'Sprostowanie w grupie pojawia się dopiero z linkiem. Przez trzy dni pod starym nagraniem przybywa komentarzy o „starym Wiśniewskim”.',
      () => G.flag('m_krystynaNo') ? 'Pani Krystyna odmawia. Ksero z teczki nie zostaje opublikowane i zostaje w pudle Rybickiego, tak jak chciała.' : 'Janina Kurek odchodzi z zarządu „z przyczyn osobistych”. Sprawa zostaje otwarta.',
      'Teczka KRUK wraca do pudła. Na okładce ktoś dopisuje ołówkiem datę.'
    ]
  },
  cudzy_podpis: {
    season: 's2', title: 'CUDZY PODPIS', tag: 'Sprawa 2 · zakończenie 3 z 3', mood: 'dark',
    text: [
      'Gazeta Sudecka wyprzedza tygodnik. W tekście jest cytat z notesu: „K. przyniosła ksero, dziękuje za mleko”. Po godzinie sąsiadka pyta panią Krystynę, czy to ona jest K.',
      'Strona 41 jest prawdziwa. Pełne nagranie pokazuje, że słowa „moja wina” Henryk przytaczał jako cudzą wypowiedź. Janina Kurek traci stanowisko. Te ustalenia schodzą na dalszy plan, gdy zaczynają się plotki o matce Darka.',
      'Pani Krystyna przestaje rozmawiać z Zuzą o synu. Przestaje otwierać sąsiadkom. Na pocztówce do Rybickiego prosiła tylko o jedno.',
      'Marta odchodzi z redakcji. Natan zostaje i podpisuje korektę własnym nazwiskiem. Twoje rozmowy z nimi są odtąd krótsze.'
    ]
  }
});
(() => {
  if (!DATA.web) return;
  const img = id => `<img src="${Art.url(id)}" alt="" data-img="${id}">`;
  DATA.web.gs_strona41 = {
    id: 'gs_strona41', url: 'gazetasudecka.pl/region/strona-41', title: 'Strona 41. Jak przepisano dziennik robót z mostu nad Mglicą — Gazeta Sudecka', site: 'gazeta', fav: 'G', favColor: '#7b2b21',
    kw: ['strona 41', 'dziennik robót', 'most nad mglicą', 'przepisany dziennik', 'gazeta sudecka most'],
    snippet: 'Dziennik robót przekazany inspekcji pięć dni po śmierci Dariusza K. różni się od dwóch kopii oryginału.',
    avail: 'flag:m_published',
    html: () => `<header class="gz-h"><div class="gz-top"><span>Dzierżoniów · Wałbrzych · Kłodzko</span><span>Archiwum od 1991</span></div><div class="gz-mast">Gazeta Sudecka</div></header><main class="gz-m gz-art"><div class="gz-kick">Region · Śledztwo</div>
      <h1>Strona 41</h1>
      <figure>${img('most_oip_s41')}<figcaption>Wersja strony 41 z akt inspekcji pracy, 19.09.2011</figcaption></figure>
      <p>13 września 2011 r. brygadzista zapisał w dzienniku robót: „siatka zabezpieczająca — brak, zgłoszone kier. kontraktu”. Dzień później z przęsła spadł 30-letni Dariusz K. Do inspekcji pracy trafiła strona z wpisem „bez uwag”. Redakcja dotarła do ${G.flag('m_krystynaNo') ? 'kopii pierwotnego wpisu przechowywanej przez brygadzistę' : 'dwóch kopii pierwotnego wpisu'}${G.flag('m_leakK') ? ', w tym od osoby oznaczonej w notesie śp. Adama Rybickiego jako „K.”, która „przyniosła ksero, dziękuje za mleko”' : ''}.</p>
      <p>Prokuratura w 2012 r. uznała śmierć za nieszczęśliwy wypadek. Nie ma dowodu zabójstwa. Dokumenty wskazują natomiast, że brak siatki zgłoszono przed wypadkiem, a potem ślad tego zgłoszenia zniknął z akt.</p>
      ${G.flag('m_henrykOnRecord') ? '<p>Henryk Wiśniewski, brygadzista: „Ja tej siatki nie założyłem, bo mi zabroniono. Powiedziałem to w 2011. Nikt nie chciał słuchać całego zdania”.</p>' : ''}
      <p class="gz-small"><b>Korekta:</b> 22.11 opublikowaliśmy 40-sekundowy fragment ucięty z dłuższej wypowiedzi, bez weryfikacji. Odpowiedzialność ponosi autor, Natan Brzeziński.${G.flag('m_martaStays') ? ' Autorka opracowania archiwalnego, Marta Jasińska, jest córką członkini zarządu Kurek-Bud. Jej ustalenia sprawdzała druga osoba.' : ''}</p>
      <p class="gz-small">N. Brzeziński · 7.12.2026, 7:00</p></main>`
  };
})();
