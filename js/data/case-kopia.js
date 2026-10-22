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
  }
});

Object.assign(DATA.chats, {
  ewa: { name: 'Ewa Rybicka', avatar: 'ewa', sub: 'SMS' },
  archiwum: { name: '@archiwum.rybickiego', avatar: 'archiwum', sub: 'Klipo · wiadomość prywatna', readonly: true }
});

Object.assign(DATA.persons, {
  ewa: {
    name: 'Ewa Rybicka', role: '63 lata · żona Adama Rybickiego', cond: 'unlocked:chat:ewa',
    facts: [
      { text: 'Nie chciała wiedzieć, co jest w pudle. „On już wszystko nagrał, wystarczy.”' },
      { text: 'W nocy z 18 na 19.12 dzwoniła z domowego numeru. Nie umiała nic powiedzieć.', cond: 'flag:k_ewaCalled' },
      { text: 'Nie zna hasła do jego konta Nimbus. Telefon męża leży w szufladzie, rozładowany od 2021.', cond: 'flag:k_ewaCloud' }
    ]
  },
  archiwum: {
    name: '@archiwum.rybickiego', role: 'anonimowe konto na Klipo', cond: 'ev:ev_k_klip1',
    facts: [
      { text: 'Założone 18.12.2026. Wrzuca fragmenty po około 40 sekund, bez nazwisk.' },
      { text: 'Nagrania są z telefonu, nie z kaset. Słychać dźwięki powiadomień.', cond: 'flag:k_phoneSource' },
      { text: 'Opis klipu z 03:11: „4% baterii a i tak wrzucam”.', cond: 'ev:ev_k_opis' }
    ]
  }
});

Object.assign(DATA.evidence, {
  ev_k_klip1: {
    title: 'Klip nr 1 · „stodoła, 2009”', cat: 'digital', source: 'klipo.app/@archiwum.rybickiego',
    desc: '0:40. Głos Rybickiego i młodej kobiety. „Wszyscy mówili, że to od pioruna. A ja widziałam, kto stał przy stodole Pawlaków.” Bez nazwisk. W tle, w 0:31, *krótki dźwięk powiadomienia*, jak w telefonie.'
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
    desc: 'Głosówka 0:12: głos Rybickiego z jakiegoś nagrania. „…a jak ktoś to kiedyś usłyszy, to znaczy, że nie dopilnowałem.” Konto zna mój numer albo mój profil.'
  }
});

(() => {
  if (typeof Art === 'undefined') return;
  Art.def('k_okno', { src: 'assets/kopia/k_okno.jpg', title: 'Okno czytelni · 21:58', w: 1200, h: 900, draw: () => '',
    exif: { date: '20.12.2026', time: '21:58', device: 'zrzut z Klipo', file: 'klipo_20261220_2158.jpg', note: 'Oryginał usunięty z konta po 6 minutach' } });
  DATA.chars.ewa.photo = 'assets/people/ewa.jpg';
})();

DATA.web.tt_archiwum = {
  id: 'tt_archiwum', url: 'klipo.app/@archiwum.rybickiego', title: 'archiwum rybickiego (@archiwum.rybickiego) | Klipo', site: 'tt', fav: '♪', favColor: '#111',
  kw: ['archiwum rybickiego', 'archiwum.rybickiego', '@archiwum', 'rybicki klipo', 'stodoła pawlaków', 'stodola pawlakow'],
  snippet: '@archiwum.rybickiego · „nie do druku” · 5 klipów',
  avail: 'flag:k_started', ev: 'ev_k_klip1',
  html: () => {
    const n = G.flag('k_clip5') ? 5 : G.flag('k_clip3') ? 3 : 1;
    const clips = [
      ['18.12 · 22:31', 'stodoła, 2009. „wszyscy mówili że od pioruna”', '61 tys.'],
      ['18.12 · 23:40', 'rada gminy, 2014. kto dostał działkę', '22 tys.'],
      ['19.12 · 06:58', 'stodoła cz. 2. „ja tam stałam”', '88 tys.'],
      ['19.12 · 22:15', 'warsztat, 2016. kto komu nie zapłacił', '40 tys.'],
      ['20.12 · 03:11', '4% baterii a i tak wrzucam', '17 tys.']
    ].slice(0, n).reverse();
    return `<header class="tt-h"><b>klipo</b></header><main class="tt-m">
      <div class="tt-prof"><b>@archiwum.rybickiego</b><p>nie do druku. 2006–2021. on nagrywał wszystko</p></div>
      ${clips.map(([t, d, v]) => `<article class="tt-v"><p><b>${t}</b> · ▶ ${v}</p><p>${d}</p></article>`).join('')}
      <div class="tt-com"><p><b>gosia_z_bielawy</b> to jest chore. ci ludzie żyją</p><p><b>m.kowal</b> w końcu ktoś mówi jak było</p><p><b>sylwia_salon</b> Proszę, nie wpisujcie nazwisk w komentarzach.</p></div></main>`;
  }
};

/* Sezon 3: ten sam zapis, osobne zakończenia. Identyfikatory odcinków są kontraktem zapisu. */
DATA.seasons.push({
  id: 's3', revision: 1, title: 'Kopia zapasowa', kicker: 'SPRAWA 3', released: true,
  description: 'Dwadzieścia lat rozmów „nie do druku”. Ktoś otworzył chmurę zmarłego dziennikarza i wrzuca je po czterdzieści sekund.',
  chapters: ['k0', 'k1'],
  episodes: [
    ['s3.01', 'Pierwszy klip', 'k0', 'ev:ev_k_klip1'],
    ['s3.02', 'Nie z kasety', 'k0', 'ev:ev_k_zrodlo'],
    ['s3.03', 'Domowy numer', 'k0', 'flag:k_ewaCalled'],
    ['s3.04', 'Brama Pawlaków', 'k0', 'ev:ev_k_klip3'],
    ['s3.05', '4% baterii', 'k1', 'ev:ev_k_opis'],
    ['s3.06', 'Okno czytelni', 'k1', 'ev:ev_k_okno'],
    ['s3.07', 'Głos zza konta', 'k1', 'ev:ev_k_dm']
  ].map(([id, title, chapter, done]) => ({ id, title, chapter, done }))
});
