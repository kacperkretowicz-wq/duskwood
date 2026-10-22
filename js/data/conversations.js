'use strict';
/* Rozmowy dodatkowe. Wyłącznie wiedza dostępna w chwili odblokowania tematu. */

DATA.chars.lena = {
  name: 'Lena Cicha', short: 'Lena', age: 24, trust: true, color: '#9eb9c6',
  role: 'Kierowczyni autobusu · Mglisko',
  bio: 'Pierwszy rok na trasie. Wcześniej jeździłam z tatą, teraz tata komentuje z fotela pasażera.',
  status: 'odpisuję na pętli', photo: 'assets/lena-v2.jpg'
};
DATA.persons.lena = {
  name: 'Lena Cicha', role: '24 lata · kierowczyni · świadkini', cond: 'flag:metLena',
  facts: [
    { text: '14 października widziała osobę z torbą przy przystanku Jutrzenka. Nie widziała twarzy.' },
    { text: 'Skojarzyła tę osobę z Mają dopiero po zobaczeniu ogłoszenia. To przypuszczenie, nie rozpoznanie.' },
    { text: 'Zegar rejestratora spóźniał się o 7 minut. Faktyczny przejazd: 22:18.', cond: 'solved:ded_bus' }
  ]
};

Object.assign(DATA.evidence, {
  ev_lena_statement: {
    title: 'Lena: osoba przy przystanku', cat: 'testimony', source: 'Rozmowa z Leną Cichą',
    desc: 'Lena widziała osobę z torbą, idącą od wiaty w górę ul. Szklarskiej. Nie widziała twarzy, samochodu ani momentu wejścia do huty. Skojarzenie z Mają pojawiło się dopiero po zobaczeniu ogłoszenia. Relacja wymaga sprawdzenia; sama nie identyfikuje Mai ani sprawcy.'
  },
  ev_bus_log: {
    title: 'Karta przejazdu · 14.10', cat: 'digital', source: 'Lena · odpis z karty kursu',
    desc: 'Kurs powrotny, odcinek Jutrzenka → Rynek. Wpis rejestratora: *14.10.2026, 22:11*. Lena notowała po minięciu przystanku: „osoba z torbą, w górę Szklarskiej”. Jest to czas urządzenia, nie potwierdzony czas rzeczywisty.'
  },
  ev_bus_clock: {
    title: 'Porównanie zegarów autobusu', cat: 'msg', source: 'Lena · notatka serwisowa z 15.10',
    desc: 'Zgłoszenie usterki po powrocie autobusu. Przy porównaniu w tej samej chwili: synchronizowany zegar dyspozytorni *06:00*, rejestrator *05:53*. W karcie serwisu: „stałe opóźnienie 7 min, bez resetu pomiędzy wieczornym kursem a kontrolą”. Nie należy odejmować tych siedmiu minut drugi raz.'
  },
  ev_bus_place: {
    title: 'Przystanek Jutrzenka · zdjęcie Leny', cat: 'place', source: 'Lena · zdjęcie z 21.10, 16:10', img: 'bus_stop',
    desc: 'Zdjęcie orientacyjne wykonane tydzień po zaginięciu. Pokazuje przystanek przy ul. Szklarskiej i otoczenie. *Nie jest nagraniem z nocy zaginięcia* i nie pokazuje Mai.'
  },
  ev_bus_verified: {
    title: 'Jutrzenka · przejazd o 22:18', cat: 'digital', source: 'Porównanie karty kursu i notatki serwisowej',
    desc: '22:11 na rejestratorze + 7 minut opóźnienia = *22:18*. Potwierdza czas przejazdu autobusu. Lena widziała nierozpoznaną osobę idącą w stronę huty. To trop do sprawdzenia, nie dowód, że była to Maja, że weszła do środka ani kto ją porwał.'
  }
});

DATA.timeline.push({
  t: '2026-10-14T22:18', title: 'Autobus mija przystanek Jutrzenka.',
  text: 'Czas skorygowany o opóźnienie rejestratora. Lena widzi osobę idącą w górę Szklarskiej; tożsamość nieustalona.', cond: 'solved:ded_bus'
});
DATA.deductions.ded_bus = {
  q: 'Co naprawdę potwierdza ostatni kurs?', kind: 'text',
  intro: 'Lena pamięta osobę przy przystanku. Zestaw jej relację z dokumentami autobusu. Co możesz zapisać jako sprawdzone?',
  options: [
    { id: 'early', label: 'Autobus minął przystanek o 22:04. Od wpisu 22:11 trzeba odjąć 7 minut.' },
    { id: 'certain', label: 'O 22:18 Maja na pewno weszła do huty. Lena ją rozpoznała.' },
    { id: 'limited', label: 'Autobus minął przystanek o 22:18. Tożsamość widzianej osoby pozostaje niepotwierdzona.' }
  ],
  answer: 'limited',
  support: { need: 2, from: ['ev_bus_log', 'ev_bus_clock'], prompt: 'Wybierz *dwa dokumenty*, które pozwalają obliczyć czas przejazdu.', fail: 'Potrzebujesz wpisu z przejazdu i niezależnego porównania zegarów. Zdjęcie przystanku nie potwierdza godziny.' },
  fail: 'Spóźniony zegar pokazuje wcześniejszą godzinę. A skojarzenie po zobaczeniu plakatu nie jest rozpoznaniem twarzy.',
  reward: 'ev_bus_verified',
  done: 'Rejestrator spóźniał się o siedem minut: 22:11 oznacza 22:18. Czas przejazdu jest sprawdzony. Tożsamość osoby pozostaje otwarta. Dopiero osobne materiały mogą potwierdzić dalszą trasę Mai.'
};

// Każdy węzeł jest zapisywany od razu. „trust” nalicza się raz, przy wyborze.
const sideChoice = (text, replies, next = null, extra = {}) => ({ text, replies, next, ...extra });
DATA.conversations = {
  kuba_quiet: {
    who: 'kuba', title: 'Zanim znowu zaczniemy szukać', label: 'Ktoś bliski',
    cond: 'unlocked:chat:group', preview: 'Kuba od kilku godzin siedzi w pokoju siostry.',
    nodes: {
      start: { lines: ['zrobiłem dwie herbaty', 'odruchowo. jej kubek dalej stoi przy czajniku', 'głupie, nie?'], choices: [
        sideChoice('Nie. Chcesz mi o niej opowiedzieć?', ['ona zostawia łyżeczkę w kubku. zawsze', 'jak przenosiła herbatę do pokoju, było ją słychać przez cały korytarz', 'teraz ciągle nasłuchuję'], 'memory', { trust: 1 }),
        sideChoice('Nie musisz teraz wszystkiego ogarniać.', ['dzięki', 'wszyscy mówią „trzymaj się”. a ja nawet nie wiem czego'], 'memory', { trust: 1 }),
        sideChoice('Potrzebujemy kolejnych tropów.', ['wiem. tylko na chwilę odłożyłem telefon', 'zaraz wracam do szukania'], 'memory')
      ] },
      memory: { choices: [
        sideChoice('Zjedz coś i usiądź z mamą. Ja zostaję przy telefonie.', ['wczoraj zjadłem pół bułki', 'dobra. pójdę do kuchni', 'jak coś znajdziesz, pisz. dźwięk mam włączony'], null, { trust: 1 }),
        sideChoice('Co robiliście, kiedy nie było żadnej sprawy?', ['kłóciliśmy się o ładowarkę xdd', 'maja naklejała na swoją taśmę. ja ją odklejałem', 'oddałbym jej teraz wszystkie'])
      ] }
    }
  },
  ola_shift: {
    who: 'ola', title: 'Po zamknięciu apteki', label: 'Ktoś bliski',
    cond: 'unlocked:chat:group', preview: 'Ola próbuje utrzymać codzienność w ryzach.',
    nodes: {
      start: { lines: ['Właśnie zamknęłam. Przez całą zmianę sprawdzałam telefon pod ladą.', 'Klientka pytała o coś na sen. Przez chwilę nie pamiętałam, gdzie to stoi.'], choices: [
        sideChoice('Nie musisz udawać, że normalnie funkcjonujesz.', ['W domu też udaję.', 'Moja mama pyta, czy jadłam. Mówię, że tak, i ona wie, że kłamię. Obie mamy wtedy na chwilę spokój.'], 'voice', { trust: 1 }),
        sideChoice('Jak Maja pomagała ci po ciężkim dniu?', ['Wysyłała mi zdjęcia psów spotkanych w autobusie.', 'Nigdy swoich problemów na początek. Zawsze najpierw jakiś pies.'], 'voice', { trust: 1 })
      ] },
      voice: { choices: [
        sideChoice('Możemy też przez chwilę porozmawiać o czymś zwykłym.', ['Okej. Zabiłam jej bazylię.', 'Zostawiła mi na parapecie i mówiła „tylko nie przelej”. Więc podlewałam za mało.', 'Jak wróci, będzie nieznośna. Chcę, żeby była nieznośna.'], null, { trust: 1 }),
        sideChoice('Dzięki, że mi o niej mówisz.', ['Nie chcę, żeby była dla ciebie tylko zdjęciem na ogłoszeniu.', 'Jest strasznie uparta. Zostawia otwarte szafki. I zawsze pamięta o cudzych urodzinach.'])
      ] }
    }
  },
  bartek_garage: {
    who: 'bartek', title: 'Światło w warsztacie', label: 'Ktoś bliski',
    cond: 'ev:ev_bartek_sms', preview: 'Bartek został po godzinach przy rozebranym silniku.',
    nodes: {
      start: { lines: ['siedze w warsztacie', 'trzeci raz czyszcze ten sam element. klient sie ucieszy'], choices: [
        sideChoice('Łatwiej robić coś rękami?', ['jak trzymasz klucz to przynajmniej wiesz co dalej', 'z ludzmi tak nie jest'], 'boundary', { trust: 1 }),
        sideChoice('Myślisz o waszym ostatnim spotkaniu?', ['caly czas', 'i nie. nie umiem znalezc w kazdym jej slowie ukrytej wiadomosci'], 'boundary')
      ] },
      boundary: { choices: [
        sideChoice('Nie każda rozmowa musi być przesłuchaniem.', ['no', 'maja tez tak mowila. jak pytalem gdzie byla i z kim', 'dopiero teraz widze jak to brzmialo', 'nie byla mi winna meldunkow'], null, { trust: 1 }),
        sideChoice('To, że się rozstaliście, nie przekreśla dobrych rzeczy.', ['przynosila mi do roboty kanapki', 'za kazdym razem z ogorkiem ktorego nie lubie', 'nigdy jej nie powiedzialem'])
      ] }
    }
  },
  weronika_memory: {
    who: 'weronika', title: 'Nie tylko żółta peleryna', label: 'Pamięć',
    cond: 'unlocked:chat:weronika', preview: 'Weronika chciałaby, żeby ktoś pamiętał też zwykłego Tomka.',
    nodes: {
      start: { lines: ['W artykułach zawsze jest ta peleryna.', 'Jakby całe jego życie mieściło się w tym, co miał na sobie ostatniego dnia.'], choices: [
        sideChoice('Jaki był na co dzień?', ['Nie znosił skórki na mleku. Wybierał ją łyżką i układał na moim talerzu.', 'Kiedyś próbował nauczyć ślimaka wracać na zawołanie.', 'Przepraszam. To chyba nie pomaga w szukaniu.'], 'remember', { trust: 1 }),
        sideChoice('Może pani opowiedzieć tyle, ile pani chce.', ['Dziękuję. Nie zawsze chcę mówić o tamtej nocy.', 'Czasem chcę po prostu powiedzieć, że miał śmieszny śmiech.'], 'remember', { trust: 1 })
      ] },
      remember: { choices: [
        sideChoice('Pomaga mi pamiętać, że szukamy człowieka.', ['Maja też tak powiedziała.', 'W bibliotece pytała najpierw, jak mówiłam na brata. Dopiero później o daty.'], null, { trust: 1 }),
        sideChoice('Dziękuję. Zapamiętam go też w ten sposób.', ['To dużo.', 'Jutro otworzę bibliotekę jak zawsze. Dobrze mieć drzwi, które można rano otworzyć.'])
      ] }
    }
  },
  igor_after: {
    who: 'igor', title: 'Bez technicznych wymówek', label: 'Po wyznaniu',
    cond: 'ev:ev_igor_conf', preview: 'Igor napisał i usunął tę wiadomość kilka razy.',
    nodes: {
      start: { lines: ['napisałem „przepraszam” i brzmi jakbym ci zalał laptop', 'nie wiem jak napisać to lepiej'], choices: [
        sideChoice('Nie potrzebuję lepszego zdania. Potrzebuję prawdy.', ['okej', 'bałem się ojca bardziej niż tego co robię wam', 'to nie jest usprawiedliwienie. wiem'], 'repair', { trust: 1 }),
        sideChoice('To, co zrobiłeś, miało konsekwencje dla żywej osoby.', ['wiem', 'najgorsze że wtedy też wiedziałem. tylko odsuwałem to od siebie'], 'repair')
      ] },
      repair: { choices: [
        sideChoice('Zachowaj materiały. Nie poprawiaj niczego po cichu.', ['nic nie kasuję. oryginały zostają osobno', 'i powiem kubie sam. nie musisz za mnie'], null, { trust: 1 }),
        sideChoice('Możesz pomóc. Zaufanie zajmie więcej czasu.', ['uczciwe', 'pierwszy raz dzisiaj nie mam do tego żadnego „technicznie”'])
      ] }
    }
  },
  lena_bus: {
    who: 'lena', title: 'Ostatni kurs', label: 'Nowy trop',
    cond: ['unlocked:chat:group', 'ev:ev_dam_news'],
    preview: 'Odpowiedź na ogłoszenie. Kierowczyni kojarzy osobę przy Jutrzence.',
    reward: ['ev_lena_statement', 'ev_bus_log', 'ev_bus_clock', 'ev_bus_place'], deduction: 'ded_bus',
    nodes: {
      start: { lines: ['Cześć. Tu Lena, jeżdżę wieczornym przez Szklarską. Zostawiłam kontakt pod ogłoszeniem o Mai.', 'Nie wiem, czy to wam pomoże. W tamtą środę ktoś stał przy Jutrzence.'], choices: [
        sideChoice('Opowiedz od początku, bez zgadywania, kto to był.', ['Osoba z dużą torbą. Stała z boku wiaty, a potem poszła pod górę.', 'Nie czekała na autobus. Nawet nie spojrzała, kiedy przejeżdżałam.', 'Twarzy nie widziałam. Za daleko.'], 'time', { trust: 1 }),
        sideChoice('Dlaczego zgłaszasz się dopiero teraz?', ['Bo nie wiedziałam, czy coś widziałam.', 'Dopiero na ogłoszeniu zobaczyłam torbę Mai i skojarzyłam. To mógł być ktoś inny.', 'Nie chcę dopowiedzieć wam czegoś, czego nie pamiętam.'], 'time', { trust: -1 })
      ] },
      time: { choices: [
        sideChoice('Co pozwala sprawdzić godzinę?', ['Zrobiłam odpis z karty kursu. Rejestrator pokazuje 22:11.', 'Tylko on się spóźniał. Rano zgłosiłam to do serwisu, mam porównanie z zegarem dyspozytorni.', 'Wyślę oba wpisy. I zdjęcie przystanku z 21 października, żeby było wiadomo, gdzie to było.'], 'certainty'),
        sideChoice('Czy widziałaś twarz, samochód albo wejście do huty?', ['Nie. Tylko osobę i kierunek. Nie widziałam żadnego auta.', 'Mam za to kartę przejazdu i zgłoszenie o spóźnionym zegarze. To będzie konkretniejsze niż moja pamięć.'], 'certainty')
      ] },
      certainty: { choices: [
        sideChoice('Zapiszę to jako trop. Bez potwierdzonej tożsamości.', ['Dzięki. Właśnie o to mi chodziło.', 'Zegar dyspozytorni miał 06:00, rejestrator 05:53. Serwis zapisał: stałe siedem minut, bez resetu od wieczora.', 'A zdjęcie jest z 21 października, 16:10. Nie z tamtej nocy.', 'Jeśli będziesz czegoś potrzebować, napisz. Odpowiem na pętli.'], null, { trust: 1 }),
        sideChoice('To na pewno Maja. Powiem grupie, że mamy potwierdzenie.', ['Nie. Proszę, nie pisz tak.', 'Nie widziałam twarzy. Wyraźnie to mówię.', 'Wysyłam dokumenty, ale zapisz też to zastrzeżenie. Zdjęcie zrobiłam 21 października o 16:10.'], null, { trust: -1 })
      ] }
    }
  }
};

Art.def('bus_stop', {
  title: 'Przystanek Jutrzenka', w: 1448, h: 1086, src: 'assets/bus-stop-v2.jpg',
  exif: { date: '21.10.2026', time: '16:10', device: 'Telefon Leny', res: '1448 × 1086', file: 'IMG_20261021_1610.jpg', note: 'Zdjęcie orientacyjne, wykonane po zaginięciu.' }
});
