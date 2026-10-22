'use strict';
/* Kolejne dni sezonu (BIBLIA-SEZONOW, sesje 6–8 i 24): głosówki, grupa z Mgliska,
   Klipo (krótkie filmy) i dwie nowe osoby. Wszystko opcjonalne: nie zmienia pc ani pending głównej
   historii. Linia `voice:0:38|Kto|tekst` to wiadomość głosowa z transkrypcją. */

Object.assign(DATA.chars, {
  sylwia: {
    name: 'Sylwia Pietrzak', short: 'Sylwia', age: 35, trust: true, color: '#e6a3c8',
    role: 'Fryzjerka · adminka grupy „Mglisko — co się dzieje”',
    bio: 'Salon na Kościuszki od 2015. Dwoje dzieci, jeden pies, cztery tysiące osób w grupie i wszyscy mają zdanie.',
    status: 'odpisuję między klientkami', number: '698 214 530'
  },
  zuza: {
    name: 'Zuzanna Kruk', short: 'Zuza', age: 16, trust: true, color: '#8fd3a6',
    role: 'I LO w Dzierżoniowie · @zuzakruk_',
    bio: 'mat-fiz bo tak wyszlo. robie filmiki o mglisku. nie, nie jestem detektywem',
    status: 'na lekcji (nie)', number: '535 908 261'
  }
});
Object.assign(DATA.chats, {
  sylwia: { name: 'Sylwia Pietrzak', avatar: 'sylwia', sub: 'Mglisko — co się dzieje' },
  zuza: { name: 'Zuza', avatar: 'zuza', sub: '@zuzakruk_' }
});
Object.assign(DATA.persons, {
  sylwia: {
    name: 'Sylwia Pietrzak', role: '35 lat · adminka lokalnej grupy', cond: 'flag:metSylwia',
    facts: [
      { text: 'Moderuje grupę „Mglisko — co się dzieje”. Usuwa wpisy z adresem Wronów i zdjęciami Oli.' },
      { text: 'Zachowała zrzut skasowanego komentarza pana Henryka o pandzie na Szklarskiej.' }
    ]
  },
  zuza: {
    name: 'Zuzanna Kruk', role: '16 lat · licealistka, Klipo', cond: 'flag:metZuza',
    facts: [
      { text: 'Opublikowała „nowe nagranie Mai”, które okazało się przyciętym zdjęciem z 21.09.' },
      { text: 'Nagrała sprostowanie i nie ujawniła konta, od którego dostała plik.', cond: 'flag:zuzaCorrected' },
      { text: 'Jest bratanicą Darka Kruka. Urodziła się rok przed jego śmiercią i nic o nim nie wie.' }
    ]
  }
});

Object.assign(DATA.evidence, {
  ev_maja_voice: {
    title: 'Głosówki Mai do Oli · 3.10', cat: 'msg', source: 'Ola · wiadomości głosowe',
    desc: 'Trzy nagrania z 3.10. Maja mówi z huty, że w szafce *17* znalazła starą jednorazówkę, przewiniętą do końca i niewywołaną. Prosi, żeby na razie nikomu nie mówić. Nagrania pokazują początek projektu, nie mają związku z nocą 14.10.'
  },
  ev_fb_henryk: {
    title: 'Komentarz o pandzie na Szklarskiej', cat: 'testimony', source: 'Sylwia · zrzut skasowanego komentarza',
    desc: 'Pan Henryk, 74 lata, mieszkaniec Szklarskiej, napisał w grupie, że w środę „koło jedenastej” widział zaparkowaną czerwoną pandę przy przystanku. Nie podał numeru, nie widział kierowcy. Po krytyce skasował wpis. To niezweryfikowana relacja; nie przeczy temu, że rano auto było na tamie.'
  },
  ev_gajda_fb: {
    title: 'Post komendanta w grupie', cat: 'msg', source: 'Sylwia · grupa „Mglisko — co się dzieje”',
    desc: 'Gajda prosi o przesyłanie zdjęć i nagrań z huty *prywatnie do niego*, bez numeru sprawy i bez kontaktu do komendy w Dzierżoniowie. Prośba nie jest przestępstwem; różni się jednak od sprawdzalnej, oficjalnej drogi zgłoszenia.'
  },
  ev_album97: {
    title: 'Podpis pod zdjęciem z dożynek 1997', cat: 'testimony', source: 'Album „Mglisko lat 90” w grupie',
    desc: 'Podpis dodany w 2016: „Robert G., Leszek M., Marek S., Darek K.”. Drugie źródło, że czterech chłopaków znało się w 1997. Nie mówi nic o nocy w hucie.'
  },
  ev_kb_invoice: {
    title: 'Faktura „Kurek-Bud” · 15.09.2011', cat: 'object', source: 'Bartek · sejf w warsztacie',
    desc: 'Serwis furgonetki firmy budowlanej dzień po śmierci Darka Kruka na moście. Dokument potwierdza usługę, nie obecność kogokolwiek przy wypadku. *Nie dotyczy zaginięcia Mai.*'
  },
  ev_tt_reupload: {
    title: '„Nowe nagranie Mai” = zdjęcie z 21.09', cat: 'digital', source: 'Klipo @zuzakruk_ · Kadr',
    desc: 'Film z 18.10 to przycięte i animowane zdjęcie Mai z Olą nad zalewem. Ten sam kadr Maja i Ola opublikowały na Kadrze *21.09.2026*. Dwa „źródła” to jeden plik; film nie jest śladem po 14.10.'
  }
});

Object.assign(DATA.conversations, {
  ola_voice: {
    who: 'ola', title: 'Trzy głosówki', label: 'Szafka 17',
    cond: 'ev:ev_dk97', preview: 'Ola dopiero teraz odsłuchała wiadomości od Mai z 3 października.',
    reward: ['ev_maja_voice'],
    nodes: {
      start: { lines: ['Znalazłam coś w telefonie. Nie wiem, czy to ważne.', 'Głosówki od Mai z trzeciego października. Odpisałam wtedy „super, opowiesz” i poszłam na zmianę.', 'Odsłuchałam dopiero teraz.'], choices: [
        sideChoice('Chcesz mi je przesłać?', ['Tak. Tylko nie odtwarzaj przy Kubie, dobrze?', 'On od tamtej środy nie słyszał jej głosu.'], 'voice', { trust: 1 }),
        sideChoice('Odsłuchałaś je sama?', ['W aucie pod apteką. Dwa razy.', 'Potem musiałam wejść i wydawać ludziom syropy na kaszel. Przesyłam.'], 'voice')
      ] },
      voice: { lines: [
        'voice:0:38|Maja|Ola. Ola, Ola. Nie krzycz, jestem w hucie. W szatni są takie stare metalowe szafki i w siedemnastce leży aparat. Taka żółta jednorazówka, wygląda na lata dziewięćdziesiąte. I słuchaj, film jest skończony. Ktoś ją tu zostawił ze zdjęciami w środku…',
        'voice:0:12|Maja|Dobra, wiem, że jesteś w pracy. Ale ja bym tego nie wytrzymała. Muszę zobaczyć, co tam jest. W poniedziałek wywołuję, trzymaj kciuki.'
      ], choices: [
        sideChoice('Brzmi, jakby była szczęśliwa.', ['Była. Dawno jej takiej nie słyszałam.', 'Cały czas gadała o tym dyplomie. Miała mi pokazać zdjęcia.'], 'after'),
        sideChoice('Wiedziała wtedy, czyj to aparat?', ['Nie. Przecież słychać. Cieszyła się, że znalazła coś starego.', 'Chyba to mnie najbardziej boli.'], 'after')
      ] },
      after: { lines: ['Jest jeszcze trzecia. Krótka.', 'voice:0:06|Maja|A, i nie mów nikomu na razie. Nawet Kubie. Chcę najpierw zobaczyć, co tam jest.'], choices: [
        sideChoice('Dlatego nikt nie wiedział o aparacie?', ['Chyba tak. Ja wiedziałam tylko, że „coś znalazła”, i nie dopytywałam.', 'Teraz żałuję. Wtedy myślałam, że to kolejna stara rzecz z huty.']),
        sideChoice('Zachowam je. Nic nie idzie na grupę.', ['Dziękuję.', 'Kubie powiem sama. Jutro. Dzisiaj nie dam rady.'], null, { trust: 1 })
      ] }
    }
  },
  sylwia_group: {
    who: 'sylwia', title: 'Mglisko — co się dzieje', label: 'Grupa na Kwartale',
    cond: 'ev:ev_loc_1410', preview: 'Adminka lokalnej grupy ma zrzut komentarza, który ktoś skasował.',
    nodes: {
      start: { lines: ['Dzień dobry, Sylwia Pietrzak. Prowadzę grupę „Mglisko — co się dzieje” na Kwartale. Kuba dał mi numer, mam nadzieję, że nie przeszkadzam…', 'Mamy cztery tysiące osób i od tygodnia wszystko jest o Mai. Nie wyrabiam z usuwaniem 😔'], choices: [
        sideChoice('Dzień dobry. Co się dzieje w grupie?', ['Wszystko naraz. Jedni piszą, że uciekła, drudzy, że sekta, trzeci, że „wiadomo kto”.', 'Nagram, bo mam klientkę z farbą na głowie i dwadzieścia minut.'], 'voice'),
        sideChoice('Usuwasz posty o Mai?', ['Tylko te, gdzie ktoś wrzuca zdjęcie Oli z podpisem „ona coś wie”. Albo adres Wronów!!', 'Resztę zostawiam, bo zaraz będzie, że cenzura. Nagram, mam klientkę z farbą.'], 'voice')
      ] },
      voice: { lines: ['voice:0:52||No więc tak… Większość to bzdury, ale jeden komentarz nie daje mi spokoju. Pan Henryk, starszy pan ze Szklarskiej, napisał, że w środę koło jedenastej widział tam zaparkowaną pandę. Czerwoną. Ludzie go od razu zjechali, że przecież auto było na tamie, że on się zawsze myli… No i się obraził i skasował. Ale ja mam screena. Tylko nie chcę, żeby potem było, że puszczam coś dalej bez sprawdzenia, wiesz.'], choices: [
        sideChoice('Możesz mi wysłać tego screena? Nie opublikuję go.', ['Wysyłam. Tylko nie podawaj dalej nazwiska. Już mu pod komentarzem wystarczająco napisali.', 'voice:0:09||I powiedz Kubie, że jak trzeba coś przypiąć na grupie, to niech pisze do mnie. Od razu przypnę.'], 'tiktok', { reward: ['ev_fb_henryk'], set: { metSylwia: true }, trust: 1 }),
        sideChoice('Auto na tamie nie wyklucza, że wcześniej stało na Szklarskiej.', ['No właśnie to samo mu napisałam!! Tylko po fakcie, jak już skasował 🙈', 'Wysyłam screena. Nazwiska proszę nikomu.'], 'tiktok', { reward: ['ev_fb_henryk'], set: { metSylwia: true } })
      ] },
      tiktok: { lines: ['Jeszcze jedno. Od wczoraj do grupy pisze dziewczyna z Klipo, Zuza. Wrzuciła „nowe nagranie Mai” i ma więcej wyświetleń, niż mamy mieszkańców.', 'Ja się na tym nie znam. Mój syn mówi „to fejk, mamo”. Ale on ma dwanaście lat i dla niego wszystko jest fejk.'], choices: [
        sideChoice('Daj mi do niej kontakt. Sprawdzę, skąd ma nagranie.', ['Dam. Ona jest w porządku, tylko szybka. Za szybka.', 'Pozdrawiam serdecznie i trzymam kciuki 🙏']),
        sideChoice('Nie udostępniajcie tego, dopóki ktoś nie sprawdzi źródła.', ['Zablokowałam udostępnianie. Dostanę za to hejt, trudno.', 'Kontakt do Zuzy podsyłam. Pozdrawiam 🙏'])
      ] }
    }
  },
  zuza_tiktok: {
    who: 'zuza', title: 'Nowe nagranie', label: 'Klipo',
    cond: 'flag:metSylwia', preview: 'Szesnastolatka z Klipo ma „nowe nagranie Mai”. 41 tysięcy wyświetleń.',
    nodes: {
      start: { lines: ['hej, sylwia z grupy dala mi twoj numer', 'ok wiem jak to wyglada. randomowa szesnastka z klipo', 'ale ja serio cos mam. ktos mi wyslal na dm'], choices: [
        sideChoice('Cześć. Kto ci to wysłał i kiedy?', ['konto bez zdjecia, w nocy o pierwszej', 'napisal ze to z soboty nad zalewem. 17.10'], 'clip'),
        sideChoice('Wrzuciłaś to już na profil?', ['no… tak', 'ma 41k wyswietlen. mama mnie zabije jak sie dowie ze to ja'], 'clip')
      ] },
      clip: { lines: ['voice:0:47||dobra nagram bo nie ogarne tego pisaniem. wiec to nie jest film tylko zdjecie z takim zoomem, wiesz, jak w edytorze. sa dwie dziewczyny nad woda, jedna ruda i ma ten kremowy sweter co maja ma na wszystkich plakatach. i ja patrze i mysle ok, to ona, zyje, jest gdzies nad zalewem. i wrzucilam. no i teraz w komentach jest wojna'], choices: [
        sideChoice('Druga dziewczyna ma ciemne włosy i zieloną kurtkę?', ['skad wiesz 😳', 'czekaj. ty to juz {widziałeś|widziałaś}?'], 'source'),
        sideChoice('Na zdjęciu jest data albo coś w tle?', ['daty nie ma. woda i trzciny', 'w komentach pisza ze „widac pomost”. ja pomostu nie widze ngl'], 'source')
      ] },
      source: { choices: [
        sideChoice('To zdjęcie Mai i Oli z Kadru. Wrzucone 21 września.', ['…', 'sprawdzam', 'o nie', 'jest u mai i u oli. 21.09. ten sam kadr tylko ktos przycial', 'o boze', 'ja tego nawet nie sprawdzilam', '41 tysiecy ludzi to widzialo', 'jej brat to pewnie tez widzial'], 'fix', { reward: ['ev_tt_reupload'] }),
        sideChoice('Wyślij mi plik, który dostałaś. Porównam z Kadrem.', ['wysylam', '…', 'ok sama znalazlam zanim {odpisałeś|odpisałaś}. jest u oli na profilu. 21.09', 'czyli ktos po prostu wzial jej zdjecie i mi wyslal zebym wyszla na idiotke. no i wyszlam'], 'fix', { reward: ['ev_tt_reupload'] })
      ] },
      fix: { lines: ['co mam teraz zrobic. usunac? jak usune to wszyscy napisza ze „ktos jej kazal” i bedzie gorzej'], choices: [
        sideChoice('Nagraj sprostowanie: skąd jest zdjęcie i że to nie nowy ślad.', ['nagram. bez muzyki i bez tego robotycznego lektora', 'voice:0:14||i nie pokaze konta co mi to wyslalo. zglosze je i tyle. jak pokaze to ludzie go zjedza, a moze to tez jakis dzieciak'], 'uncle', { set: { zuzaCorrected: true }, trust: 1 }),
        sideChoice('Usuń i napisz Kubie, że przepraszasz.', ['usune. do kuby napisze ale on mnie pewnie zablokuje', 'i bedzie mial racje tbh'], 'uncle')
      ] },
      uncle: { lines: ['ej jeszcze jedno. to nie o mai', 'babcia jak zobaczyla ze robie filmik o hucie to sie poplakala. a ona nigdy nie placze', 'mowi ze moj wujek tam chodzil jak byl mlody. darek. umarl jak mialam rok i w domu sie o nim nie gada'], choices: [
        sideChoice('Zapytaj babcię, kiedy będzie gotowa. Nie przez Klipo.', ['wiem. nie zrobie z babci contentu, nie jestem potworem', 'po prostu mam wrazenie ze tu wszyscy cos wiedza i nikt nic nie mowi'], null, { set: { metZuza: true } }),
        sideChoice('Nie łącz tego na siłę z Mają.', ['nie lacze. no dobra troche lacze', 'ok. jedna rzecz na raz. najpierw sprostowanie'], null, { set: { metZuza: true } })
      ] }
    }
  },
  zuza_darek: {
    who: 'zuza', title: 'Czterech chłopaków', label: 'Po wyznaniu Marka',
    cond: ['ev:ev_marek', 'flag:metZuza'], preview: 'Zuza zobaczyła w komentarzach nazwisko Kruk.',
    nodes: {
      start: { lines: ['juz wszedzie jest ze w 97 w hucie bylo czterech chlopakow', 'ktos w komentach napisal nazwisko. kruk', 'to moj wujek prawda?'], choices: [
        sideChoice('Nie wiem, co jest w komentarzach. Wiem, co powiedział Marek Sowa.', ['to powiedz mi. prosze', 'nie wrzuce tego nigdzie. obiecuje'], 'truth'),
        sideChoice('Zanim coś napiszę: jesteś teraz sama?', ['mama w kuchni. babcia u siebie', 'jestem ok. tak jakby. powiedz mi'], 'truth', { trust: 1 })
      ] },
      truth: { choices: [
        sideChoice('Był tam tej nocy. Pomógł ukryć, co się stało. Nie on o tym zdecydował.', ['ok', 'voice:0:31||sorry, nie umiem tego pisac. czyli on wiedzial? czternascie lat i nic? …czekaj. babcia zawsze mowila ze to byl wypadek w pracy. musze z nia pogadac'], 'after'),
        sideChoice('Był jednym z czterech. Więcej nikt jeszcze nie ustalił.', ['czyli nie wiadomo', 'babcia zawsze mowi tylko „wypadek w pracy, 2011”. i nic wiecej. zawsze tymi samymi slowami'], 'after')
      ] },
      after: { choices: [
        sideChoice('Nie wiem, jak zginął. Nie dopisuj tego do tej sprawy.', ['nie dopisze', 'ale jak kiedys bedziesz {wiedział|wiedziała} gdzie szukac, napisz. ja nie chce teorii. chce zeby ktos w koncu powiedzial jak bylo']),
        sideChoice('Porozmawiaj z babcią. Może ona też na to czeka.', ['moze', 'wezme jej te ciastka z biedry co lubi', 'tylko nie wiem jak zaczac'], null, { trust: 1 })
      ] }
    }
  }
});

/* Portrety nowych osób (te same zasady co assets/people). */
(() => {
  const life = { sylwia: 'W salonie', zuza: 'Wieczorne nagrywanie' };
  Object.entries(life).forEach(([who, title]) => {
    const c = DATA.chars[who];
    c.photo = 'assets/people/' + who + '.jpg';
    const id = 'life_' + who + '_1';
    if (typeof Art !== 'undefined') Art.def(id, { src: 'assets/people/' + who + '_life1.jpg', title, w: 1200, h: 900, draw: () => '' });
    c.life = [id];
  });
})();

/* Internet: lokalna grupa (Kwartał) i Klipo. Teorie są amatorskie; strona nie dodaje dowodów sama z siebie. */
(() => {
  if (!DATA.web) return;
  const esc = U.esc;
  const fbHead = () => `<header class="fb-h"><b>kwartał</b><span>Grupy sąsiedzkie</span></header>`;
  const c = (who, age, text, meta = '') => `<div class="fb-c"><b>${esc(who)}</b>${age ? `<small> · ${age}</small>` : ''}<p>${U.rich(text)}</p>${meta ? `<small class="fb-meta">${meta}</small>` : ''}</div>`;
  DATA.web.fb_mglisko = {
    id: 'fb_mglisko', url: 'kwartal.pl/grupy/mglisko-co-sie-dzieje', title: 'Mglisko — co się dzieje 🌫️ | Grupa', site: 'fb', fav: 'k', favColor: '#2f6fd6',
    kw: ['mglisko kwartał', 'grupa mglisko', 'mglisko co się dzieje', 'kwartał', 'kwartal', 'facebook', 'fb mglisko', 'grupa sąsiedzka', 'sylwia pietrzak', 'teorie maja', 'plotki mglisko'],
    snippet: 'Grupa publiczna · 4,1 tys. członków. Ogłoszenia, zgubione psy, utrudnienia na drogach. Bez hejtu!!',
    avail: 'ev:ev_loc_1410',
    html: () => `${fbHead()}<main class="fb-m">
      <div class="fb-g"><h2>Mglisko — co się dzieje 🌫️</h2><small>Grupa publiczna · 4,1 tys. członków</small></div>
      <article class="fb-p"><div class="fb-a"><b>Sylwia Pietrzak</b> <span class="fb-adm">Administratorka</span><small>17 października · 🌐</small></div>
      <p>‼️ PRZYPOMINAM ‼️ Nie wrzucamy adresów, zdjęć znajomych Mai ani „wiem, kto to zrobił”. Wszystkie informacje → policja albo Kuba (brat). Takie posty będę usuwać, bez dyskusji. Dziękuję 🙏</p><small class="fb-meta">👍😢 312 · 148 komentarzy</small>
      ${c('Grażyna Kowal', '', 'Pani Sylwio, a dlaczego policja nic nie mówi?? Za moich czasów to przynajmniej w radiu podawali.', '2 godz.')}
      ${c('kacperek_2009', '', 'uciekla do niemiec z chlopakiem 100% moja kuzynka mowi ze tak bylo', '2 godz.')}
      ${c('Sylwia Pietrzak', '', '@kacperek_2009 jak Twoja kuzynka wie, to niech zadzwoni na 112. Jak nie wie, to niech nie pisze.', '1 godz. · Administratorka')}
      ${c('Mirek Zając', '', 'Huta od lat stoi otwarta, tam się ćpuny zjeżdżają. Mówiłem w gminie w 2019. Zero reakcji.', '1 godz.')}
      ${c('Ewelina R.', '', 'Ja tylko powiem, że to auto na tamie stało za ładnie. Jak w filmie. Nikt tak nie zostawia auta.', '58 min')}
      ${c('Beata Nowak-Lis', '', 'Bez przesady z tymi teoriami, ta dziewczyna ma rodzinę która to czyta.', '41 min')}
      <div class="fb-c fb-del"><i>Komentarz usunięty przez autora.</i></div>
      ${c('Tomasz Wilk', '', 'Sekta z lasu za sztolniami. Pisałem już. Nikt nie słucha 🤷‍♂️', '33 min')}
      ${c('Iwona', '', 'Modlimy się 🙏🕯️ Maju wracaj', '20 min')}
      </article>
      <article class="fb-p"><div class="fb-a"><b>Kuba Wrona</b><small>16 października</small></div><p>zaginęła moja siostra Maja, 22 l. ostatnio w środę 14.10 wieczorem. jeśli ktoś coś widział proszę o kontakt. każda informacja</p><small class="fb-meta">👍😢 1,1 tys. · 864 udostępnienia</small></article></main>`
  };
  const ttVideo = () => G.flag('zuzaCorrected')
    ? { cap: 'SPROSTOWANIE. to zdjecie jest z 21.09, nie z soboty. nie jest nowym sladem. przepraszam kube i rodzine. nie wysylajcie mi wiecej „dowodow” tylko dzwoncie na 112', views: '58,2 tys.', com: [['ola.nowicka', 'Dziękuję, że to poprawiłaś.'], ['user8812734', 'czyli jednak fejk xd'], ['zuzakruk_', '@user8812734 tak. moj blad. dlatego to nagralam']] }
    : { cap: 'NOWE NAGRANIE MAI?? podobno sobota nad zalewem 😳 #mglisko #zaginiona #unsolved', views: '41,3 tys.', com: [['natalka.ww', 'to na 100% ona widac ten sweter'], ['user8812734', 'to jest zalew przy tamie ten pomost'], ['p.ciszewski', 'skad masz to nagranie?? zglos na policje'], ['majkelxd', 'oglada ktos z mgliska? co tam sie dzieje']] };
  DATA.web.tt_zuza = {
    id: 'tt_zuza', url: 'klipo.app/@zuzakruk_', title: 'zuza (@zuzakruk_) | Klipo', site: 'tt', fav: '♪', favColor: '#111',
    kw: ['klipo', 'tiktok', 'zuza klipo', 'zuzakruk', 'zuzakruk_', 'nowe nagranie mai', 'klipo mglisko', 'zuzanna kruk'],
    snippet: '@zuzakruk_ · 12,4 tys. obserwujących · mglisko unsolved 🌫️',
    avail: 'flag:metSylwia',
    html: () => { const v = ttVideo(); return `<header class="tt-h"><b>klipo</b></header><main class="tt-m">
      <div class="tt-prof">${UI.avatar('zuza').outerHTML}<div><b>@zuzakruk_</b><small>12,4 tys. obserwujących · 380 tys. polubień</small><p>mglisko unsolved 🌫️ | 16 | nie jestem detektywem</p></div></div>
      <article class="tt-v"><div class="tt-frame"><img src="${Art.url('m_ola_lake')}" alt="" data-img="m_ola_lake"><span>▶ ${v.views}</span></div>
      <p>${U.rich(v.cap)}</p><div class="tt-com">${v.com.map(([u, t]) => `<p><b>${esc(u)}</b> ${U.rich(t)}</p>`).join('')}</div></article></main>`; }
  };
})();
