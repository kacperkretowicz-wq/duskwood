'use strict';
/* Sprawa nr 3 „Kopia zapasowa” (docs/SPRAWA-3-PLAN.md): obsada, dowody, strony i sezon.
   Prawda (konto prowadzi Kuba, fragmenty wybiera Lena) jest tylko w planie. Tu nie ma
   niczego, co ujawniałoby ją przed aktem IV. */

Object.assign(DATA.chars, {
  ewa: {
    name: 'Ewa Rybicka', short: 'Ewa', age: 63, trust: true, color: '#b49a7a',
    role: 'Żona Adama Rybickiego', bio: '', status: '', number: '601 337 845'
  },
  archiwum: {
    name: '@archiwum.rybickiego', short: 'archiwum', color: '#444',
    role: 'Konto na Klipo · założone 18.12.2026', status: ''
  },
  cicho: { name: '@cicho.bylo', short: 'cicho.bylo', color: '#5a6470', role: 'Konto na Klipo · same komentarze', status: '' }
});

Object.assign(DATA.chats, {
  ewa: { name: 'Ewa Rybicka', avatar: 'ewa', sub: 'SMS' },
  archiwum: { name: '@archiwum.rybickiego', avatar: 'archiwum', sub: 'Klipo · wiadomość prywatna', readonly: true },
  cicho: { name: '@cicho.bylo', avatar: 'cicho', sub: 'Klipo · wiadomość prywatna', readonly: true }
});
DATA.chats.lena ||= { name: 'Lena Cicha', avatar: 'lena' };
/* Błysk: fikcyjna apka ze znikającymi wiadomościami. Zrzut ekranu widzi nadawca. */
Object.assign(DATA.chars, {
  blysk: { name: 'mgla_24', short: 'mgla_24', color: '#7a8a99', role: 'Błysk · konto bez zdjęcia' },
  blysk2: { name: 'nowy kontakt', short: '???', color: '#555', role: 'Błysk · konto bez zdjęcia' }
});
Object.assign(DATA.chats, {
  blysk: { name: 'mgla_24', avatar: 'blysk', sub: 'Błysk · znika po przeczytaniu', readonly: true, ephemeral: true },
  blysk2: { name: 'nowy kontakt', avatar: 'blysk2', sub: 'Błysk · znika po przeczytaniu', readonly: true, ephemeral: true }
});

Object.assign(DATA.persons, {
  ewa: {
    name: 'Ewa Rybicka', role: '63 lata · żona Adama Rybickiego', cond: 'unlocked:chat:ewa',
    facts: [
      { text: 'Nie chciała wiedzieć, co jest w pudle. „On już wszystko nagrał, wystarczy.”' },
      { text: 'W nocy z 18 na 19.12 dzwoniła z domowego numeru. Nie umiała nic powiedzieć.', cond: 'flag:k_ewaCalled' },
      { text: 'Nie zna hasła do jego konta Nimbus. Telefon męża leży w szufladzie, rozładowany od pogrzebu.', cond: 'flag:k_ewaCloud' }
    ]
  },
  archiwum: {
    name: '@archiwum.rybickiego', role: 'anonimowe konto na Klipo', cond: 'ev:ev_k_klip1',
    facts: [
      { text: 'Założone 18.12.2026. Wrzuca fragmenty po około 40 sekund, bez nazwisk.' },
      { text: 'Nagrania są z telefonu, nie z kaset. Słychać dźwięki powiadomień.', cond: 'flag:k_phoneSource' },
      { text: 'Opis klipu z 03:11: „4% baterii a i tak wrzucam”.', cond: 'ev:ev_k_opis' },
      { text: 'Wrzuca tylko wieczorem i w nocy: nigdy między 8 a 21.', cond: 'ev:ev_k_godziny' },
      { text: 'Prowadzi je Kuba Wrona. Fragmenty wskazuje mu @cicho.bylo.', cond: 'flag:k_twist' }
    ]
  },
  cicho: {
    name: '@cicho.bylo', role: 'konto z komentarzami pod klipami', cond: 'ev:ev_k_cicho',
    facts: [
      { text: 'Wysłało głosówkę bez słów: oddech i równe tykanie, jak kierunkowskaz.' },
      { text: 'Podaje Kubie minuty nagrań do wycięcia.', cond: 'flag:k_twist' },
      { text: 'To Lena Cicha. W 2009 miała siedem lat i była przy stodole Pawlaków.', cond: 'ev:ev_k_lena' }
    ]
  }
});

Object.assign(DATA.evidence, {
  ev_k_klip1: {
    title: 'Klip nr 1 · „stodoła, 2009”', cat: 'digital', source: 'klipo.app/@archiwum.rybickiego',
    desc: '0:40. Głos Rybickiego i młodej kobiety. Rozmowa z 2019 („dziesięć lat minęło”). „Wszyscy mówili, że to od pioruna. A ja widziałam, kto stał przy stodole Pawlaków.” Bez nazwisk. W tle, w 0:31, *krótki dźwięk powiadomienia*, jak w telefonie.'
  },
  ev_k_zrodlo: {
    title: 'Źródło nagrań: telefon, nie kaseta', cat: 'testimony', source: 'Maja · pudło u Weroniki',
    desc: 'W pudle są kasety magnetofonowe i mini-DV. Nic nie zginęło. Klip ma dźwięk powiadomienia i data rozmowy to 2019. Rybicki nagrywał rozmowy telefonem, a telefon robił *kopię zapasową w chmurze*.'
  },
  ev_k_klip3: {
    title: 'Klip nr 3 i brama Pawlaków', cat: 'place', source: 'Sylwia · grupa „Mglisko”',
    desc: 'Rano 19.12 ktoś napisał sprayem na bramie Pawlaków „PODPALACZE”. Syn Pawlaków wypisał się z grupy. Klip nie podaje nazwiska. Wystarczyło, że jest z Mgliska.'
  },
  ev_k_opis: {
    title: 'Opis klipu nr 5', cat: 'digital', source: 'klipo.app/@archiwum.rybickiego',
    desc: 'Wrzucony 20.12 o *03:11*. Opis: „4% baterii a i tak wrzucam”. Konto pisze małymi literami, bez kropek na końcu.'
  },
  ev_k_okno: {
    title: 'Zdjęcie okna biblioteki', cat: 'digital', source: '@archiwum.rybickiego · usunięte po 6 minutach',
    desc: 'Wrzucone 20.12 o *21:58*, usunięte o 22:04. Okno czytelni od ulicy, w środku Weronika przy pudle. Zrobione z chodnika, telefonem, na szybko. Konto wie, gdzie leży pudło.'
  },
  ev_k_dm: {
    title: 'Wiadomość od @archiwum', cat: 'digital', source: 'Klipo · wiadomość prywatna',
    desc: 'Głosówka 0:12: głos Rybickiego z jakiegoś nagrania. „…tego nie cytujemy. To tylko dla mnie, żebym pamiętał.” Potem tekst: „w pudle tego nie znajdziesz”. Konto zna mój profil.'
  },
  ev_k_natan: {
    title: 'Archiwum GS: bez nagrań', cat: 'msg', source: 'Natan Brzeziński · zrzut logów serwera',
    desc: 'Archiwum Gazety Sudeckiej ma teksty i zdjęcia Rybickiego z lat 1994–2019, bez audio. Od 1.12 nikt spoza redakcji nic nie pobierał.'
  },
  ev_k_biurko: {
    title: 'Biurko w czytelni', cat: 'photo', source: 'Kuba · 21.12, 17:05', img: 'k_biurko',
    desc: 'Kuba prosi o pomoc z drukarką w czytelni. Na biurku: beżowa drukarka, herbata, fiszki z pudła, telefon, kabel z taśmą i odręczne notatki.'
  },
  ev_k_cicho: {
    title: 'Głosówka od @cicho.bylo', cat: 'digital', source: 'Klipo · wiadomość prywatna · 22.12, 02:14',
    desc: '0:09 bez słów. Oddech i równe, ciche tykanie, *jak kierunkowskaz*. Potem tekst: „to nie jest jego historia”.'
  },
  ev_k_godziny: {
    title: 'Godziny i opisy klipów', cat: 'digital', source: 'Maja · tabelka z Klipo',
    desc: 'Wrzutki: 22:31, 23:40, 06:58, 22:15, *03:11*, 23:48, 00:20 (ten ostatni usunięty po 6 minutach). Nigdy między 8 a 21. Opisy małymi literami, bez kropek: „4% baterii a i tak wrzucam”, „kabel pożyczony a i tak lepiej niż milczeć”.'
  },
  ev_k_logi: {
    title: 'Historia aktywności konta Nimbus', cat: 'digital', source: 'Nimbus · odpowiedź na wniosek rodziny (N-4471-2026)',
    desc: '*02.12, 17:40* reset hasła przez pytania bezpieczeństwa, sieć: Biblioteka Publiczna Mglisko. 02.12, 17:52 pobranie folderu „Nagrania” (1412 plików). Dalej logowania z internetu mobilnego: 18.12 22:29, 19.12 06:55, *20.12 03:09*, 21.12 23:45.'
  },
  ev_k_zeszyt: {
    title: 'Zeszyt zapisów czytelni · 2.12', cat: 'testimony', source: 'Weronika · przepis z zeszytu',
    desc: '15:10–15:40 Iwona Z. (CV). 16:00–16:20 p. Zenon (prasa). *15:30–18:00 K. Wrona*, dyżur, katalog fiszek z pudła A.R. Tego dnia Weronika pokazała Kubie fiszki z odręcznymi notatkami Rybickiego.'
  },
  ev_k_kuba: {
    title: 'Kuba: „siedziałem obok i patrzyłem”', cat: 'testimony', source: 'Kuba · czat 23.12',
    desc: 'Kuba przyznaje, że zresetował hasło przez pytania bezpieczeństwa („pierwsza redakcja” z nekrologu, „ulica dzieciństwa” z fiszki). Zdjęcie okna czytelni też zrobił on. Nie wybiera fragmentów: wysłał listę plików kontu *@cicho.bylo*, a ono podaje mu nazwy i minuty.'
  },
  ev_k_petla: {
    title: 'Zdjęcie z pętli', cat: 'photo', source: '@cicho.bylo · 23.12, 21:50', img: 'k_petla',
    desc: 'Przednia szyba w nocy, pusta wiata na pętli, zielona strzałka kierunkowskazu na desce, rozkład jazdy za klipsem i kanapka w folii.'
  },
  ev_k_peron: {
    title: 'Zdjęcie z peronu', cat: 'photo', source: 'Przesyłanie w pobliżu · 23.12, 8:46', img: 'k_peron',
    desc: 'Ktoś na stacji w Mglisku zrobił mi zdjęcie od tyłu, zza słupa, i przesłał je z telefonu bez nazwy. Weronika nikogo z telefonem nie widziała.'
  },
  ev_k_lena: {
    title: '@cicho.bylo to Lena Cicha', cat: 'testimony', source: 'Maja i Lena · 23.12',
    desc: 'Nazwa konta, kierunkowskaz w głosówce, kabina busa na zdjęciu i pytanie o nagrania z 2019 prowadzą do Leny. W 2009 miała siedem lat. To jej głos jest w pierwszym klipie.'
  }
});

(() => {
  if (typeof Art === 'undefined') return;
  Art.def('k_okno', { src: 'assets/kopia/k_okno.jpg', title: 'Okno czytelni · 21:58', w: 1200, h: 900, draw: () => '',
    exif: { date: '20.12.2026', time: '21:58', device: 'zrzut z Klipo', file: 'klipo_20261220_2158.jpg', note: 'Oryginał usunięty z konta po 6 minutach' } });
  Art.def('k_biurko', { src: 'assets/kopia/k_biurko.jpg', title: 'Biurko w czytelni', w: 1024, h: 768, draw: () => '',
    exif: { date: '21.12.2026', time: '17:04', device: 'Telefon Kuby', file: 'IMG_20261221_1704.jpg' } });
  Art.def('k_petla', { src: 'assets/kopia/k_petla.jpg', title: 'Pętla · 21:49', w: 1024, h: 768, draw: () => '',
    exif: { date: '23.12.2026', time: '21:49', device: 'nieznane (przesłane w Klipo)', file: 'klipo_dm_20261223.jpg' } });
  for (const [id, src, title, w, h] of [
    ['k_mem_krzeslo', 'assets/kopia/k_mem_krzeslo.jpg', 'Krzesło na przystanku', 768, 1024],
    ['k_kadr_kabel', 'assets/kopia/k_kadr_kabel.jpg', 'Kadr z klipu nr 6 · 0:03', 1024, 768],
    ['k_igor_kable', 'assets/kopia/k_igor_kable.jpg', 'Serwis Igora', 1024, 768],
    ['k_peron', 'assets/kopia/k_peron.jpg', 'Peron w Mglisku · 8:46', 768, 1024],
    ['k_zeszyt', 'assets/kopia/k_zeszyt.jpg', 'Zeszyt zapisów', 768, 1024],
    ['k_zeszyt_zoom', 'assets/kopia/k_zeszyt_zoom.jpg', 'Zeszyt zapisów · 2 grudnia', 550, 270],
    ['v_korytarz', 'assets/video/v_korytarz.jpg', 'Czytelnia · 21:40', 360, 640],
    ['v_petla', 'assets/video/v_petla.jpg', 'Pętla', 360, 640],
    ['k_pudlo', 'assets/kopia/k_pudlo.jpg', 'Pudło pana Adama · przeliczone', 1024, 768],
    ['k_ladowarka', 'assets/kopia/k_ladowarka.jpg', 'Parapet Igora · 2:04', 768, 1024],
    ['k_czytelnia_kubek', 'assets/kopia/k_czytelnia_kubek.jpg', 'Czytelnia · 21:41', 1024, 768],
    ['k_lampki', 'assets/kopia/k_lampki.jpg', 'Okno Oli', 768, 1024],
    ['k_wigilia', 'assets/kopia/k_wigilia.jpg', 'Wigilia u Wronów', 1024, 768],
    ['k_fiszki', 'assets/kopia/k_fiszki.jpg', 'Fiszki pana Adama', 1024, 768],
    ['k_poczta', 'assets/kopia/k_poczta.jpg', 'Poczta · przerwa', 1024, 768],
    ['k_uszka', 'assets/kopia/k_uszka.jpg', 'Uszka · 2:40', 1024, 768],
    ['k_rampa', 'assets/kopia/k_rampa.jpg', 'Rampa · 6:12', 768, 1024]
  ]) Art.def(id, { src, title, w, h, draw: () => '' });
  DATA.chars.ewa.photo = 'assets/people/ewa.jpg';
})();

DATA.web.tt_archiwum = {
  id: 'tt_archiwum', url: 'klipo.app/@archiwum.rybickiego', title: 'archiwum rybickiego (@archiwum.rybickiego) | Klipo', site: 'tt', fav: '♪', favColor: '#111',
  kw: ['archiwum rybickiego', 'archiwum.rybickiego', '@archiwum', 'rybicki klipo', 'stodoła pawlaków', 'stodola pawlakow'],
  snippet: '@archiwum.rybickiego · „nie do druku”',
  avail: 'flag:k_started', ev: 'ev_k_klip1',
  html: () => {
    const n = G.flag('k_clip7') ? 7 : G.flag('k_clip6') ? 6 : G.flag('k_clip5') ? 5 : G.flag('k_clip3') ? 3 : 1;
    const clips = [
      ['18.12 · 22:31', 'stodoła, 2009. „wszyscy mówili że od pioruna”', '61 tys.'],
      ['18.12 · 23:40', 'rada gminy, 2014. kto dostał działkę', '22 tys.'],
      ['19.12 · 06:58', 'stodoła cz. 2. „ja tam stałam”', '88 tys.'],
      ['19.12 · 22:15', 'warsztat, 2016. kto komu nie zapłacił', '40 tys.'],
      ['20.12 · 03:11', '4% baterii a i tak wrzucam', '17 tys.'],
      ['21.12 · 23:48', 'kabel pożyczony a i tak lepiej niż milczeć', '9 tys.'],
      ['22.12 · 00:20', G.flag('k_clip7gone') ? '[klip usunięty]' : 'szkoła, 2018', G.flag('k_clip7gone') ? '—' : '1 tys.']
    ].slice(0, n).reverse();
    return `<header class="tt-h"><b>klipo</b></header><main class="tt-m">
      <div class="tt-prof"><b>@archiwum.rybickiego</b><p>nie do druku. 2006–2021. on nagrywał wszystko</p></div>
      ${clips.map(([t, d, v]) => `<article class="tt-v">${t.startsWith('18.12 · 22:31') ? '<video class="web-vid" src="assets/video/v_stodola.mp4" poster="assets/video/v_stodola.jpg" controls playsinline preload="none"></video>' : ''}<p><b>${t}</b> · ▶ ${v}</p><p>${d}</p></article>`).join('')}
      <div class="tt-com"><p><b>gosia_z_bielawy</b> to jest chore. ci ludzie żyją</p><p><b>m.kowal</b> w końcu ktoś mówi jak było</p><p><b>sylwia_salon</b> Proszę, nie wpisujcie nazwisk w komentarzach.</p></div></main>`;
  }
};

DATA.web.nimbus_log = {
  id: 'nimbus_log', url: 'nimbus.app/wniosek/N-4471-2026/aktywnosc.pdf', title: 'Historia aktywności konta — Nimbus', site: 'doc', fav: '☁', favColor: '#3a78c2',
  kw: ['historia aktywności nimbus', 'historia aktywnosci', 'nimbus wniosek', 'N-4471-2026', 'logowania rybicki'],
  snippet: 'Odpowiedź na wniosek osoby upoważnionej przez rodzinę. Bez treści konta.',
  avail: 'flag:k_logs', ev: 'ev_k_logi',
  html: () => `<main class="doc"><h1>Historia aktywności konta</h1><p>Konto: a.rybicki · Wniosek N-4471-2026 · osoba upoważniona: Weronika Lis</p>
    <table><tr><th>Data</th><th>Zdarzenie</th><th>Sieć</th></tr>
    <tr><td>02.12.2026 17:40</td><td>Reset hasła (pytania bezpieczeństwa)</td><td>Biblioteka Publiczna Mglisko</td></tr>
    <tr><td>02.12.2026 17:52</td><td>Pobranie folderu „Nagrania” (1412 plików)</td><td>Biblioteka Publiczna Mglisko</td></tr>
    <tr><td>18.12.2026 22:29</td><td>Logowanie</td><td>internet mobilny</td></tr>
    <tr><td>19.12.2026 06:55</td><td>Logowanie</td><td>internet mobilny</td></tr>
    <tr><td>20.12.2026 03:09</td><td>Logowanie</td><td>internet mobilny</td></tr>
    <tr><td>21.12.2026 23:45</td><td>Logowanie</td><td>internet mobilny</td></tr></table>
    <p class="gz-small">Dokument nie zawiera treści konta. Adresy sieci podano w zakresie wymaganym przy wniosku rodziny.</p></main>`
};

/* Sezon 3: ten sam zapis, osobne zakończenia. Identyfikatory odcinków są kontraktem zapisu. */
DATA.seasons.push({
  id: 's3', revision: 1, title: 'Kopia zapasowa', kicker: 'SPRAWA 3', released: true,
  description: 'Dwadzieścia lat rozmów „nie do druku”. Ktoś otworzył chmurę zmarłego dziennikarza i wrzuca je po czterdzieści sekund.',
  chapters: ['kp', 'k0', 'k1', 'k2', 'k3', 'k4'],
  credits: {
    kicker: 'Koniec sprawy 3', title: 'KOPIA ZAPASOWA',
    lines: [
      'Pytania bezpieczeństwa to nie hasło. Odpowiedzi na nie zwykle leżą w życiu człowieka: w nekrologu, na fiszce, w zdjęciu psa.',
      'Wszystkie osoby, konta i usługi w tej sprawie są fikcyjne. Nimbus i Klipo nie istnieją.',
      'Dziękujemy, że {pytałeś|pytałaś}, czyj to głos.'
    ],
    teaser: { title: 'MGLISKO', text: 'W czytelni wiszą nowe hasła. Szesnaście znaków, karteczka pod klawiaturą. Do zobaczenia.' },
    note: 'Inne zakończenia: Ustawienia → Rozdziały → Sprawa 3 · Rozdział 4.'
  },
  episodes: [
    ['s3.00a', 'Hasło', 'kp', 'flag:kp_passwords'],
    ['s3.00b', 'Miesiąc od Rzeczki', 'kp', 'flag:kp_done'],
    ['s3.01', 'Pierwszy klip', 'k0', 'ev:ev_k_klip1'],
    ['s3.02', 'Nie z kasety', 'k0', 'ev:ev_k_zrodlo'],
    ['s3.03', 'Domowy numer', 'k0', 'flag:k_ewaCalled'],
    ['s3.04', 'Brama Pawlaków', 'k0', 'ev:ev_k_klip3'],
    ['s3.05', '4% baterii', 'k1', 'ev:ev_k_opis'],
    ['s3.06', 'Okno czytelni', 'k1', 'ev:ev_k_okno'],
    ['s3.07', 'Głos zza konta', 'k1', 'ev:ev_k_dm'],
    ['s3.08', 'Ucięty warsztat', 'k2', 'ev:ev_k_natan'],
    ['s3.09', 'Drukarka w czytelni', 'k2', 'ev:ev_k_biurko'],
    ['s3.10', 'Oddech o 2:14', 'k2', 'ev:ev_k_cicho'],
    ['s3.11', 'Godziny wrzutek', 'k2', 'ev:ev_k_godziny'],
    ['s3.12', 'Historia aktywności', 'k2', 'ev:ev_k_logi'],
    ['s3.13', 'Zeszyt zapisów', 'k3', 'ev:ev_k_zeszyt'],
    ['s3.14', 'Siostra', 'k3', 'flag:k_majaKnows'],
    ['s3.15', 'Kto patrzył', 'k3', 'flag:k_twist'],
    ['s3.16', 'Pętla', 'k4', 'ev:ev_k_petla'],
    ['s3.17', 'Cicho było', 'k4', 'ev:ev_k_lena'],
    ['s3.18', 'Wigilia', 'k4', s => !!G.s.vars.s3Ending]
  ].map(([id, title, chapter, done]) => ({ id, title, chapter, done }))
});

Object.assign(DATA.endings, {
  wlasnym_glosem: {
    season: 's3', title: 'WŁASNYM GŁOSEM', tag: 'Sprawa 3 · zakończenie 1 z 3', mood: 'dawn',
    text: [
      'Konto @archiwum.rybickiego znika w Wigilię przed południem. Kuba pisze do dwóch osób imiennie: do pana Pawlaka i do Zuzy. Pan Pawlak odpisuje „dobrze”. Zuza odpisuje po tygodniu.',
      'Pani Ewa podpisuje wniosek. Konto Nimbus zostaje zamknięte. W jej telefonie zostają dwie wiadomości głosowe, do których nie potrzeba hasła.',
      'Po świętach Lena przychodzi do czytelni. Rozmowa trwa godzinę i dwanaście minut. Weronika nagrywa ją do archiwum, z dopiskiem na kopercie: „nie do druku, do pamięci”.',
      'Brama Pawlaków jest pomalowana na nowo. Spod farby wciąż widać jedną literę.'
    ]
  },
  zasiegi: {
    season: 's3', title: 'ZASIĘGI', tag: 'Sprawa 3 · zakończenie 2 z 3', mood: 'dark',
    text: [
      'Wpis Sylwii ma czterysta komentarzy przed obiadem. Mglisko ma nowego winnego i jest z tego prawie zadowolone.',
      'Kuba traci pracę w magazynie. Na drzwiach Wronów ktoś przykleja kartkę „HAKER”. Maja ją zdejmuje i nie mówi nikomu.',
      'Lena przestaje odpisywać. Konto @cicho.bylo znika bez słowa. Rozmowa o stodole nigdy nie trafia do archiwum.',
      () => G.flag('k_ewaOk') ? 'Konto Nimbus zostaje zamknięte. Nie ma już czego słuchać.' : 'Konto Nimbus wciąż istnieje. Pani Ewa nie umie zdecydować.',
      'Cicho jest bezpieczniej. Tym razem ktoś zadbał, żeby było głośno.'
    ]
  },
  kopia: {
    season: 's3', title: 'KOPIA', tag: 'Sprawa 3 · zakończenie 3 z 3', mood: 'dark',
    text: [
      () => G.flag('k_kubaOff') ? 'Kuba usuwa konto. Przeprasza pana Pawlaka i Zuzę.' : 'Konto @archiwum.rybickiego milknie, ale nikt go nie usuwa.',
      () => G.flag('k_ewaOk') ? 'Pani Ewa zamyka konto Nimbus. Dostęp jest zamknięty. Pobranych kopii to nie cofa.' : 'Pani Ewa nie zamyka konta Nimbus. Chce jeszcze raz usłyszeć jego głos.',
      () => G.flag('k_lenaTalks') ? 'Lena opowiada swoją historię Weronice.' : 'Lena nie przychodzi do czytelni. Mówi, że po świętach. Po świętach mówi, że kiedyś.',
      'W Wigilię o 23:58 na Klipo pojawia się nowy profil. Zero obserwujących. W opisie: „2006–2021. całość”. Pierwszy klip za trzy dni.'
    ]
  }
});
