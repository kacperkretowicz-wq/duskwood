'use strict';
/* Postacie, rozmowy, kontakty, pogoda, zakończenia. */

const DATA = window.DATA = {};
DATA.storyTexts = {
  firstMajaSMS: 'Dzień dobry, panie Adamie. Tu Maja Wrona. Czytałam Pana artykuł o Tomku Lisie z 2007 roku. Mam zdjęcia, które mogą mieć z tym związek. Mogę zadzwonić? Chciałabym z Panem porozmawiać, zanim komuś je pokażę.',
  legacyFirstMajaSMS: 'Dzień dobry, Panie Adamie. Nazywam się Maja Wrona. Czytałam Pana artykuł o Tomku Lisie z 2007 roku. Chyba znalazłam coś, co wtedy przeoczono. Nie wiem, komu tu mogę zaufać. Proszę o kontakt. M.W.'
};

DATA.chars = {
  kuba: { name: 'Kuba Wrona', short: 'Kuba', color: '#f2994a', number: '604 228 961', trust: true, voicemail: '„Siema, tu Kuba. Nie odbieram, bo… no, nie odbieram. Pisz.”' },
  ola: { name: 'Ola Nowicka', short: 'Ola', color: '#4fc1b1', number: '512 640 377', trust: true, voicemail: '„Dzień dobry, tu Aleksandra Nowicka. Proszę zostawić wiadomość, oddzwonię.”' },
  bartek: { name: 'Bartek Sowa', short: 'Bartek', color: '#e07a55', number: '669 301 552', trust: true, voicemail: 'Poczta głosowa abonenta nie została skonfigurowana.' },
  igor: { name: 'Igor Malicki', short: 'Igor', color: '#a395f7', number: '733 905 014', trust: true, voicemail: '„Hej, tu Igor. Jeśli w sprawie naprawy — serwis w rynku, od dziesiątej. Jeśli nie — też raczej nie odbiorę.”' },
  weronika: { name: 'Weronika Lis', short: 'Weronika', color: '#d2b366', number: '608 117 942', trust: true, voicemail: '„Weronika Lis, proszę zostawić wiadomość po sygnale.”' },
  gajda: { name: 'Robert Gajda', short: 'Gajda', color: '#7d9fd0', number: '601 450 219', trust: true, voicemail: '„Dzień dobry, Robert Gajda. Proszę zostawić wiadomość.”' },
  szklarz: { name: 'Nieznany', short: '???', color: '#8ff' },
  maja: { name: 'Maja Wrona', short: 'Maja', color: '#e88aa2', number: '731 402 118', offline: true },
  mama: { name: 'Ewa Wrona', short: 'Mama Mai', number: '607 993 140', voicemail: 'Abonent nie odbiera.' },
  marek: { name: 'Marek Sowa', short: 'Marek' },
  leszek: { name: 'Leszek Malicki', short: 'Wójt' },
  dispatcher: { name: 'Centrum Powiadamiania Ratunkowego', short: 'Operator 112' },
  duty: { name: 'Posterunek Policji Mglisko', short: 'Dyżurny' },
  prosecutor: { name: 'Prokuratura Rejonowa', short: 'Prokuratura' },
  ada: { name: 'Ada Kurek', short: 'Ada', color: '#c86dd7' },
  szymon: { name: 'Szymon Bielak', short: 'Szymon', color: '#5aa0e8' },
  unknown: { name: 'Nieznany numer', short: '?' },
  me: { name: 'Ty', short: 'Ty' }
};

DATA.chats = {
  ekipa: { name: 'Ekipa 🍕', avatar: 'group', group: true, members: ['ada', 'szymon'], skin: 'gadka' },
  maja: { name: '+48 731 402 118', avatar: 'unknown', sub: 'SMS', readonly: true },
  kuba: { name: '+48 604 228 961', avatar: 'unknown' },
  group: { name: 'Szukamy Mai 🕯️', avatar: 'group', group: true, members: ['kuba', 'ola', 'bartek', 'igor'] },
  ola: { name: 'Ola Nowicka', avatar: 'ola' },
  bartek: { name: 'Bartek Sowa', avatar: 'bartek' },
  igor: { name: 'Igor Malicki', avatar: 'igor' },
  weronika: { name: 'Weronika Lis', avatar: 'weronika' },
  gajda: { name: 'Robert Gajda', avatar: 'gajda', sub: 'asp. sztab. · Posterunek Policji Mglisko' },
  szklarz: { name: 'Nieznany', avatar: 'szklarz', sub: 'Numer spoza kontaktów' },
  maja2: { name: 'Maja', avatar: 'maja' }
};

// Publiczne opisy profili. Sekrety fabularne nigdy nie trafiają do tych kart.
Object.assign(DATA.chars.kuba, { age: 19, role: 'Studia · Wrocław / Mglisko', bio: 'informatyka, pierwszy rok. kawa z automatu i ostatni autobus do domu.', status: 'jak coś ważnego to pisz', cadence: { key: 48, think: 1100 } });
Object.assign(DATA.chars.ola, { age: 22, role: 'Technik farmacji · Mglisko', bio: 'Praca, zaoczne, praca. Oddzwonię po zmianie 🫶', status: 'telefon na cichym', cadence: { key: 60, think: 1900 } });
Object.assign(DATA.chars.bartek, { age: 24, role: 'Auto-Sowa · Mglisko', bio: 'auta robie na miejscu. wycen przez telefon nie robie', status: 'w warsztacie', cadence: { key: 79, think: 2600 } });
Object.assign(DATA.chars.igor, { age: 23, role: 'Serwis GSM-PC · Rynek 7', bio: 'wyłącz i włącz. jak nie działa, kawa i dopiero wtedy dzwoń xD', status: 'zaraz wracam', cadence: { key: 44, think: 1500 } });
Object.assign(DATA.chars.maja, { age: 22, role: 'Fotografia · ASP Wrocław', bio: 'ASP Wrocław. Kometa po dziadku, telefon z wiecznie pełną pamięcią 📷', status: 'jeszcze jedno zdjęcie i wracam', cadence: { key: 55, think: 1800 } });
Object.assign(DATA.chars.weronika, { age: 41, role: 'Biblioteka Gminna · Mglisko', bio: 'Książki, góry, ogród. Wiadomości czytam zwykle wieczorem.', status: 'Do zobaczenia w bibliotece', cadence: { key: 90, think: 3000 } });
Object.assign(DATA.chars.gajda, { age: 46, role: 'Posterunek Policji · Mglisko', bio: 'Kontakt służbowy. W nagłych sytuacjach proszę dzwonić pod 112.', cadence: { key: 85, think: 2800 } });

DATA.contacts = [
  { name: 'Kuba Wrona', who: 'kuba', number: '604 228 961', cond: 'flag:knowKuba' },
  { name: 'Maja Wrona', who: 'maja', number: '731 402 118', cond: 'flag:knowMaja' },
  { name: 'Ola Nowicka', who: 'ola', number: '512 640 377', cond: 'unlocked:chat:group' },
  { name: 'Bartek Sowa', who: 'bartek', number: '669 301 552', cond: 'unlocked:chat:group' },
  { name: 'Igor Malicki', who: 'igor', number: '733 905 014', cond: 'unlocked:chat:group' },
  { name: 'Weronika Lis', who: 'weronika', number: '608 117 942', cond: 'unlocked:chat:weronika' },
  { name: 'Robert Gajda', who: 'gajda', number: '601 450 219', cond: 'unlocked:chat:gajda' },
  { name: 'Posterunek Policji Mglisko', who: 'duty', number: '74 873 41 20', cond: 'seen:web:posterunek', auto: '„Posterunek Policji w Mglisku. Wszystkie linie są zajęte. W sytuacji zagrożenia życia dzwoń pod numer 112.”' },
  { name: 'Gazeta Sudecka — redakcja', number: '74 832 10 40', cond: 'seen:web:gazeta_home', auto: '„Redakcja Gazety Sudeckiej. Zapraszamy od poniedziałku do piątku w godzinach 8–18.”' },
  { name: 'Biblioteka Gminna w Mglisku', number: '74 873 40 55', cond: 'seen:web:biblioteka', auto: '„Biblioteka Gminna w Mglisku jest teraz nieczynna. Zapraszamy od wtorku do soboty w godzinach 10–18.”' },
  { name: 'Serwis GSM-PC (Igor)', who: 'igor', number: '733 905 014', cond: 'seen:web:kadr:igor.malicki' }
];

// Pogoda zależna od dnia fabuły.
DATA.weather = () => {
  const ch = G.s ? G.s.chapter : 'prolog';
  const W = {
    prolog: { now: 'mgła', nowLong: 'Gęsta mgła', temp: 4, feel: 1, hum: 97, alert: 'Gęsta mgła ograniczająca widzialność do 150 m. Obowiązuje do jutra, do godz. 10:00.', moon: 'przybywający sierp', i: 'fog' },
    ch1: { now: 'mgła', nowLong: 'Gęsta mgła', temp: 3, feel: 0, hum: 98, alert: 'Gęsta mgła ograniczająca widzialność do 150 m.', moon: 'przybywający sierp', i: 'fog' },
    ch2: { now: 'mżawka', nowLong: 'Mżawka', temp: 3, feel: -1, hum: 95, alert: null, moon: 'pierwsza kwadra', i: 'cloud' },
    ch3: { now: 'pochmurno', nowLong: 'Zachmurzenie duże', temp: 6, feel: 3, hum: 88, alert: null, moon: 'pierwsza kwadra', i: 'cloud' },
    ch4: { now: 'pochmurno', nowLong: 'Przelotne przejaśnienia', temp: 8, feel: 5, hum: 81, alert: 'Przymrozek przy gruncie w nocy, do −3°C.', moon: 'przybywający księżyc', i: 'cloud' },
    ch5: { now: 'mgła', nowLong: 'Mgła i przymrozek', temp: 1, feel: -3, hum: 96, alert: 'Przymrozek przy gruncie, do −3°C. Mgła w dolinach.', moon: 'przybywający księżyc', i: 'fog' },
    epilog: { now: 'śnieg', nowLong: 'Pierwszy śnieg', temp: -1, feel: -5, hum: 90, alert: null, moon: 'nów', i: 'cloud' },
    mp: { now: 'pochmurno', nowLong: 'Zachmurzenie całkowite', temp: 2, feel: -2, hum: 91, alert: null, moon: 'przybywający sierp', i: 'cloud' },
    m0: { now: 'mżawka', nowLong: 'Mżawka', temp: 3, feel: 0, hum: 94, alert: null, moon: 'pierwsza kwadra', i: 'cloud' },
    m1: { now: 'pochmurno', nowLong: 'Zachmurzenie duże', temp: 4, feel: 1, hum: 89, alert: null, moon: 'pierwsza kwadra', i: 'cloud' },
    m2: { now: 'deszcz', nowLong: 'Słaby deszcz', temp: 5, feel: 2, hum: 93, alert: 'Wzrost stanu wody na Mglicy, bez przekroczenia stanu ostrzegawczego.', moon: 'przybywający księżyc', i: 'cloud' },
    m3: { now: 'śnieg z deszczem', nowLong: 'Śnieg z deszczem', temp: 1, feel: -3, hum: 95, alert: null, moon: 'pełnia', i: 'cloud' }
  }[ch] || { now: 'pochmurno', nowLong: 'Zachmurzenie duże', temp: 3, feel: 0, hum: 90, alert: null, moon: '—', i: 'cloud' };
  const base = W.temp;
  return Object.assign({
    hourly: [{ t: base, i: W.i }, { t: base, i: W.i }, { t: base - 1, i: 'fog' }, { t: base - 1, i: 'fog' }, { t: base - 2, i: 'fog' }, { t: base - 2, i: 'cloud' }, { t: base - 1, i: 'cloud' }, { t: base, i: 'cloud' }],
    days: [
      { d: 'Dziś', i: W.i, lo: base - 3, hi: base + 3 }, { d: 'Jutro', i: 'cloud', lo: base - 2, hi: base + 5 },
      { d: 'Pojutrze', i: 'fog', lo: base - 4, hi: base + 2 }, { d: 'Za 3 dni', i: 'cloud', lo: base - 1, hi: base + 6 }, { d: 'Za 4 dni', i: 'sun', lo: base - 3, hi: base + 7 }
    ]
  }, W);
};

DATA.endings = {
  swit: {
    title: 'ŚWIT', tag: 'Zakończenie 1 z 3', mood: 'dawn',
    text: [
      'Tej nocy Maję wynoszą ze sztolni. Jest wychłodzona, odwodniona, ma pękniętą kość przedramienia. Żyje.',
      'Radiowóz z Dzierżoniowa zatrzymuje ciemną sevrę przy leśnym szlabanie. Robert Gajda nie stawia oporu. Na tylnym siedzeniu leży kanister z benzyną.',
      'Rano strażacy rozbierają mur w odprężarce. Za nim, pod żółtym strzępem peleryny, czeka dziewięcioletni chłopiec. Czekał dwadzieścia dziewięć lat.',
      () => (G.flag('leszekTestify') ? 'Marek Sowa i Leszek Malicki składają zeznania tego samego dnia.' : 'Marek Sowa składa zeznania tego samego dnia. Leszek Malicki milczy przez tydzień — potem też zaczyna mówić.') + ' Gazeta Sudecka drukuje tekst, który zaczął pisać Adam Rybicki.',
      'Tamtej nocy nie {odebrałeś|odebrałaś}. Ale teraz na ekranie jest wiadomość od Mai.'
    ]
  },
  odlamki: {
    title: 'ODŁAMKI', tag: 'Zakończenie 2 z 3', mood: 'calm',
    text: [
      'Maję wynoszą ze sztolni nad ranem. Żyje — i tylko to się liczy. Przynajmniej tak powtarzają wszyscy.',
      () => G.flag('gajdaCaught')
        ? 'Robert Gajda zostaje zatrzymany przy szlabanie. Zeznanie Mai i odnalezienie jej w sztolni pozostają ważne, nawet jeśli dokumentacja dawnych wydarzeń jest niepełna. On milczy. Część pytań wciąż pozostaje bez odpowiedzi.'
        : 'Robert Gajda nie wraca do domu. Jego sevrę znajdują dwa dni później na tamie — w tym samym miejscu, w którym on sam zostawił kiedyś auto Mai.',
      () => (G.flag('reportBoth') ? 'Mur w odprężarce przetrwał. ' : 'Odprężarka spłonęła, ale ogień nie przebił się przez cegły. ') + (G.flag('gajdaCaught') ? 'Ratunek się udał. Złożenie pełnego obrazu tego, co wydarzyło się w hucie, zajmie dłużej.' : 'Gajdy nie odnaleziono. Samochód nie jest dowodem jego śmierci. Poszukiwania trwają, podobnie jak sprawa Tomka.'),
      'Weronika dostaje szczątki brata i list z prokuratury. Pisze ci jedno zdanie: „Wiem, gdzie on jest. To dużo. To za mało.”'
    ]
  },
  cisza: {
    title: 'CISZA', tag: 'Zakończenie 3 z 3', mood: 'dark',
    text: [
      'Krata sztolni Ewa jest otwarta. W środku: koc, puste butelki po wodzie, gumka do włosów z różowym koralikiem.',
      'Na ścianie, wydrapane czymś ostrym, przy samej ziemi: TU BYŁAM. M.',
      'Robert Gajda znika. Po przekazaniu materiałów spoza Mgliska trwają poszukiwania jego i Mai. Telewizja przypomina jego dawne zapewnienia, że nie spocznie, dopóki jej nie znajdzie.',
      'Twój telefon milczy. Tylko czasem, późną nocą, wyświetla się połączenie z zastrzeżonego numeru — i nikt się nie odzywa.'
    ]
  }
};

/* Portrety i codzienne zdjęcia postaci (assets/people). Gdy plik się nie wczyta, UI.avatar wraca do people.jpg. */
(() => {
  const people = {
    kuba: ['Zasnął nad kodem', 'Pociąg do Mgliska'],
    ola: ['Sesja zaoczna', 'Zapiekanka na dniach miasta'],
    bartek: ['Pod Astrą', 'Świt nad zalewem'],
    igor: ['Serwis w rynku', 'Balkon, wieczór'],
    weronika: ['Działka', 'Spotkanie w bibliotece'],
    maja: ['Stara fabryka', 'Dni miasta z Olą']
  };
  const files = { maja: ['maja_life1', 'ola_life2'] };
  Object.entries(people).forEach(([who, titles]) => {
    const c = DATA.chars[who]; if (!c) return;
    c.photo = 'assets/people/' + who + '.jpg';
    c.life = titles.map((title, i) => {
      const id = 'life_' + who + '_' + (i + 1);
      const f = (files[who] || [])[i] || who + '_life' + (i + 1);
      if (typeof Art !== 'undefined') Art.def(id, { src: 'assets/people/' + f + '.jpg', title, w: 1200, h: 900, draw: k => k.svg || '' });
      return id;
    });
  });
})();

/* Komunikatory: każda rozmowa żyje w jednej aplikacji przez całą grę.
   SMS — numery spoza kontaktów, starsi rozmówcy, urzędowe; Gadka — znajomi i grupy;
   Błysk — znikające wiadomości; Klipo — prywatne wiadomości z kont wideo. */
DATA.chatApps = {
  sms: ['maja', 'maja2', 'kuba', 'weronika', 'gajda', 'szklarz', 'ewa', 'marta', 'henryk_sms', 'dudek', 'zenon'],
  gadka: ['ekipa', 'group', 'ola', 'bartek', 'igor', 'natan', 'nina', 'sylwia', 'zuza', 'oskar', 'ida', 'lena'],
  klipo: ['archiwum', 'cicho']
};
DATA.chatApp = id => {
  const cd = DATA.chats[id] || {};
  if (cd.app) return cd.app === 'sms' ? 'messages' : cd.app;
  if (cd.ephemeral || /^blysk/.test(id)) return 'blysk';
  for (const [app, ids] of Object.entries(DATA.chatApps)) if (ids.includes(id)) return app === 'sms' ? 'messages' : app;
  if (/^\+|^\d/.test(cd.name || '') || cd.sub === 'SMS') return 'messages';
  return 'gadka';
};
DATA.MSG_APPS = ['messages', 'gadka', 'blysk', 'klipo'];
