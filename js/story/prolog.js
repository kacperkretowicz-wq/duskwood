'use strict';
/* PROLOG — Nieodebrane */

Engine.chapter('prolog', { num: 0, title: 'Nieodebrane', when: 'Środa, 21 października · 21:03', mood: 'calm' }, D => {
  const { say, pic, sys, pause, choose, opt, show, waitFor, openChat, goal, give, unlock, set, iff, rename, run, fx, typing, end, title, scene } = D;
  const K = (t, o) => say('kuba', 'kuba', t, o);
  const g = (who, t, o) => say('group', who, t, o);
  const sz = (t, o) => say('szklarz', 'szklarz', t, o);

  return [
    run(s => {
      // Stan telefonu gracza sprzed tygodnia: SMS i dwa nieodebrane połączenia od nieznanego numeru.
      s.calls.push(
        { who: 'maja', number: '731402118', dir: 'missed', t: U.parseLocal('2026-10-14T23:47'), dur: 0, seen: false },
        { who: 'maja', number: '731402118', dir: 'missed', t: U.parseLocal('2026-10-13T22:31'), dur: 0, seen: false }
      );
      G.unlock('chat:maja');
      const c = G.chat('maja');
      c.msgs.push({ id: 'm0', from: 'maja', t: U.parseLocal('2026-10-13T21:12'), text: DATA.storyTexts.firstMajaSMS });
      c.last = U.parseLocal('2026-10-13T21:12');
      c.unread = 0;
      G.unlock('app:notes');
    }),
    title(),
    fx('lock'),
    pause(2400),
    K('hej, sory że tak późno', { gap: 0 }),
    K('to numer, na który dzwoniła maja wrona?'),
    waitFor('flag:unlockedPhone', { goal: 'Odblokuj telefon.' }),
    openChat('kuba', { goal: 'Ktoś do ciebie napisał. Sprawdź, kto.', hints: [] }),
    pause(700),
    choose('kuba', [
      opt('A ty kim jesteś? Skąd masz mój numer?', [K('racja, bez sensu zacząłem. jeszcze raz'), K('kuba jestem. jej brat')]),
      opt('Chyba pomyłka.', [K('nie sądzę'), K('kuba wrona. to nie jest żaden spam, serio')]),
      opt('Nie odpisuję nieznajomym.', [K('wiem. sam bym pewnie nie odpisał'), K('daj mi minutę, serio. kuba wrona jestem')], { trust: { kuba: -1 } })
    ]),
    rename('kuba', 'Kuba Wrona', 'kuba'),
    set('knowKuba'),
    K('moja siostra dzwoniła pod ten numer 14 października. 23:47'),
    pause(900),
    K('to ostatnie połączenie w bilingu', { wording: 'potem już do nikogo nie dzwoniła. przynajmniej w tym bilingu nic więcej nie ma' }),
    K('od tygodnia nie wróciła do domu'),
    typing('kuba', 'kuba', 3200),
    K('mama ma nas na jednym abonamencie. wzięła biling od operatora. na końcu jest twój numer'),
    K('więc pytam. skąd znasz maję?', { wording: 'powiedz tylko, czy z nią {gadałeś|gadałaś}' }),
    choose('kuba', [
      opt('Hej. Nie znam Mai. Na pewno ten numer?', [K('to czemu do ciebie dzwoniła?? o północy')]),
      opt('Nikt do mnie nie dzwonił. Na pewno?', [K('sprawdź. proszę. 14.10, 23:47')]),
      opt('%name% jestem. Serio nie wiem, o kim mówisz.', [K('%name%. okej. sory za wjazd, nie spałem prawie')], { trust: { kuba: 1 } })
    ]),
    K('możesz sprawdzić telefon? czy masz od niej cokolwiek? połączenia, smsy'),
    K('jej numer to +48 731 402 118'),
    goal('Sprawdź rejestr połączeń i wiadomości. Szukaj numeru *+48 731 402 118*.', ['Otwórz aplikację *Telefon* → zakładka *Ostatnie*.', 'Zajrzyj też do *Wiadomości* — jest tam rozmowa z numerem +48 731 402 118.']),
    waitFor(s => G.flag('sawCalls') || G.viewing === 'maja', {
      hints: [{ after: 50, chat: 'kuba', who: 'kuba', text: 'sprawdź ostatnie połączenia. i smsy. ona czasem pisała zamiast dzwonić' }]
    }),
    iff('flag:sawCalls', [give('ev_missed')], [give('ev_sms_maja')]),
    waitFor(s => G.has('ev_missed') ? G.viewing === 'maja' : G.flag('sawCalls'), {
      goal: 'Sprawdź jeszcze drugą rzecz: rejestr połączeń albo wiadomości od tego numeru.',
      hints: [{ after: 45, chat: 'kuba', who: 'kuba', text: 'i co? jest coś jeszcze?' }]
    }),
    iff('ev:ev_missed', [give('ev_sms_maja')], [give('ev_missed')]),
    K('i co? masz coś?'),
    show('kuba', {
      prompt: 'Pokaż Kubie, co {znalazłeś|znalazłaś}',
      accept: [{ ev: ['ev_sms_maja'] }],
      wrongFor: { ev_missed: ['kuba', 'czyli dzwoniła dwa razy. 13-ego też… a pisała coś? sms?'] },
      wrong: [['kuba', 'nie rozumiem. pisała coś do ciebie?']]
    }),
    typing('kuba', 'kuba', 2600),
    K('„Panie Adamie”??'),
    K('kto to jest pan adam'),
    K('i tomek lis… skądś znam to nazwisko'),
    K('czekaj. ty masz na imię Adam?'),
    choose('kuba', [
      opt('Nie. Mam na imię %name%.', [], { set: { r_imie: true } }),
      opt('Nie mam pojęcia, kim jest pan Adam.', [], { set: { r_adam: true } }),
      opt('Mój numer mam od zeszłego roku. Może wcześniej należał do kogoś innego?', [K('…to by miało sens'), set('guessedNumber')], { trust: { kuba: 1 } })
    ]),
    scene('xReImie', [iff('flag:r_imie', [K('sorry. %name%. zapamiętam')]), iff('flag:r_adam', [K('no to jest nas dwoje')])]),
    K('możesz poszukać w necie? tego tomka lisa i tego artykułu'),
    K('ja tego teraz nie przeczytam. siedzę w jej pokoju i co chwilę się rozglądam jak debil'),
    goal('Dowiedz się, kim był *Tomek Lis* i o jakim artykule pisała Maja.', [
      'Otwórz *przeglądarkę* (Safari lub Internet) i wpisz „Tomek Lis”.',
      'Maja wspomina artykuł z 2007 roku. Szukaj w archiwum *Gazety Sudeckiej*.',
      'Spróbuj: „zaginiony chłopiec Mglisko”.'
    ]),
    waitFor('ev:ev_article2007', {
      hints: [{ after: 80, chat: 'kuba', who: 'kuba', text: 'wpisz w wyszukiwarkę po prostu „tomek lis”. albo „zaginiony chłopiec mglisko”' }]
    }),
    K('i co? {znalazłeś|znalazłaś} coś?'),
    show('kuba', { prompt: 'Pokaż artykuł', accept: [{ ev: ['ev_article2007'] }], wrong: [['kuba', 'to nie to chyba. coś o tym tomku?']] }),
    typing('kuba', 'kuba', 3800),
    K('o kurde. to ten chłopiec z powodzi'),
    K('mama opowiadała, jak byłem mały. że utopił się w mglicy i nigdy go nie znaleźli'),
    K('żółta peleryna… czekaj, czytam'),
    typing('kuba', 'kuba', 5200),
    K('czemu maja się tym interesowała?? ona robiła zdjęcia w hucie do dyplomu'),
    K('czekaj'),
    K('na dole jest numer do autora'),
    typing('kuba', 'kuba', 2400),
    K('692 117 305'),
    pause(500),
    K('ej. to jest TWÓJ numer', { gap: 200, typing: 600 }),
    fx('heartbeat'),
    set('knowNumber'),
    choose('kuba', [
      opt('Ten numer mam od roku. Wcześniej musiał należeć do niego.', []),
      opt('Co?! To niemożliwe.', [K('sprawdź {sam|sama}. stopka artykułu')]),
      opt('Czyli ona myślała, że pisze do dziennikarza.', [], { trust: { kuba: 1 }, set: { r_dzien: true } })
    ]),
    scene('xReDziennikarz', [iff('flag:r_dzien', [K('no. tylko czemu trafiło do ciebie')])]),
    K('adam rybicki. maja myślała, że pisze do niego'),
    K('możesz sprawdzić, co się z nim stało? czemu ktoś inny ma jego numer?'),
    goal('Sprawdź, co stało się z *Adamem Rybickim*.', ['Wyszukaj „Adam Rybicki” w Szukajce.', 'Na stronie Gazety Sudeckiej jest dział „Wspomnienia”.']),
    waitFor('ev:ev_obit', { hints: [{ after: 60, chat: 'kuba', who: 'kuba', text: 'wpisz po prostu adam rybicki' }] }),
    show('kuba', { prompt: 'Pokaż, co {znalazłeś|znalazłaś}', accept: [{ ev: ['ev_obit'] }], wrong: [['kuba', 'a co z tym rybickim?']] }),
    typing('kuba', 'kuba', 2800),
    K('nie żyje od 2021'),
    K('czyli dzwoniła do… sorry. nie chciałem tak', { wording: 'ona tego nie sprawdziła. ja też bym chyba nie sprawdził' }),
    K('czyli ona przez cały czas myślała że odbierze ten rybicki', { wording: 'miała w telefonie numer człowieka, który już nie żył' }),
    pause(1500),
    K('sory. nie wiem co mam z tym teraz zrobić. nie zostawisz mnie z tym?', { wording: 'nie wiem, do kogo jeszcze napisać. zostaniesz chwilę?' }),
    K('policja mówi, że ona skoczyła z tamy. jej auto stało na tamie. kurtka na barierce'),
    K('ale maja by nie skoczyła. nigdy. ona nie wchodziła do jeziora nawet po kolana. nigdy'),
    pic('kuba', 'kuba', 'k_maja', 'to ona. sierpień, nad mglicą. zawsze zasłania twarz aparatem'),
    pause(1200),
    K('mieszkasz w mglisku?'),
    choose('kuba', [
      opt('Nie. Nigdy tam nie {byłem|byłam}.', [K('dobrze. to nawet lepiej')]),
      opt('Wolę nie mówić, gdzie mieszkam.', [K('rozumiem. i dobrze')]),
      opt('Dlaczego pytasz?', [K('bo tu wszyscy się znają')])
    ]),
    K('wczoraj pół sklepu pytało mamę o maję. nikt jej nie umiał nic powiedzieć'),
    K('pomożesz nam? jest nas kilkoro, znajomi mai. szukamy sami, bo policja już tylko czeka, aż ją wyłowią'),
    choose('kuba', [
      opt('Pomogę. Co mam robić?', [K('dziękuję. serio')], { trust: { kuba: 1 } }),
      opt('Nie wiem, czy {powinienem|powinnam} się mieszać…', [K('rozumiem. wiem że jesteśmy dla ciebie obcy'), K('ale możesz chociaż zobaczyć to co mamy?')]),
      opt('Jeśli to jakiś żart, to bardzo słaby.', [K('chciałbym, żeby to był żart'), K('naprawdę bym chciał')], { trust: { kuba: -1 } })
    ]),
    rename('maja', 'Maja Wrona', 'maja'),
    set('knowMaja'),
    K('dodam cię do grupy. nie przejmuj się bartkiem'),
    pause(1500),
    unlock('chat:group'),
    sys('group', 'Kuba utworzył grupę „Szukamy Mai 🕯️”'),
    sys('group', 'Kuba dodał: Ola, Bartek, Igor, %name%'),
    g('kuba', 'dodałem %name%. to ta osoba, do której maja dzwoniła ostatnia'),
    g('ola', 'Kuba, serio? Nawet nie napisałeś, że kogoś dodajesz.'),
    g('bartek', 'kto to w ogole jest'),
    g('igor', 'hej %name%. igor, serwis przy rynku. trochę nerwowo tu jest, jak widać', { wording: 'hej, igor. pomagam mai ze sprzętem. kuba mówił o tym numerze' }),
    g('ola', 'Igor.', { wording: 'To ty ratowałeś Kubie tego laptopa?' }),
    g('igor', 'dobra już nic nie mówię 🙃', { wording: 'próbowałem. oddał mi go razem z ryżem 🙃' }),
    g('kuba', 'on tak zawsze. laptop mi po zalaniu oddał z ryżem w środku', { wording: 'dobra, już nie będę nic suszył w ryżu. możemy do tego nie wracać' }),
    g('igor', 'bo go suszyłeś w ryżu 💀 mówiłem: wyłącz i przynieś', { wording: 'możemy. ale nadal masz mi oddać zasilacz' }),
    g('ola', 'Dobra chłopaki. Maja.', { wording: 'Dobra, potem. Co z tym numerem?' }),
    openChat('group', { goal: 'Zajrzyj do nowej grupy „Szukamy Mai”.' }),
    g('bartek', 'skąd maja cię znała'),
    choose('group', [
      opt('Nie znała. Myślała, że pisze do dziennikarza, który miał kiedyś mój numer.', [
        g('ola', 'Dziennikarza?'),
        g('kuba', 'adam rybicki. pisał w 2007 o tym chłopcu, co zaginął w powódź. tomek lis'),
        g('igor', 'Lis… jak pani Weronika z biblioteki?'),
        g('kuba', 'chyba tak. jej brat')
      ], { trust: { ola: 1 } }),
      opt('Nie {znałem|znałam} jej. Jestem tu przypadkiem, ale chcę pomóc.', [
        g('bartek', 'przypadkiem'),
        g('kuba', 'maja myślała, że pisze do jakiegoś dziennikarza. on nie żyje, a jego numer {dostał|dostała} potem %name%')
      ]),
      opt('A ty skąd ją znasz, Bartek?', [
        g('bartek', 'bylismy razem. do kwietnia. cos jeszcze?'),
        g('kuba', 'bartek…')
      ], { trust: { bartek: -1 } })
    ]),
    g('ola', 'Dobra. Tylko nie puszczaj dalej screenów, ok? Są tu nasze numery. I rzeczy o Mai, których mama jeszcze nie wie.'),
    choose('group', [
      opt('Jasne.', [], { trust: { ola: 1 } }),
      opt('Czemu nie na policję?', [
        g('ola', 'Bo policja ma już swoją wersję. Komendant Gajda mówi, że to tama. Jak zaczniemy mu mieszać, przestanie z nami rozmawiać.'),
        g('kuba', 'gajda jest ok. to prawie wujek. pomagał mamie, jak tata się wyprowadził'),
        set('kubaGajda')
      ]),
      opt('Zależy, co tu znajdziemy. Nie obiecam w ciemno.', [g('ola', 'Ok. Ale daj nam znać, zanim coś zrobisz.')], { trust: { ola: -1 } })
    ]),
    g('igor', 'dobra. telefon mai: ostatni kontakt z siecią 14.10 o 23:58. potem cisza'),
    g('ola', 'Miała wszystko w Nimbusie. Zdjęcia, smsy, notatki. Całe życie, nawet listy zakupów.'),
    g('kuba', 'próbowałem się zalogować na jej laptopie. hasła nie ma. jak klikam „nie pamiętasz hasła”, to pyta o pytania bezpieczeństwa'),
    g('kuba', 'dwa razy źle odpowiedziałem i się wystraszyłem, że zablokuje konto'),
    g('igor', 'Spokojnie. Technicznie rzecz biorąc, Nimbus blokuje dopiero po dziesięciu próbach. Ale lepiej nie strzelać na ślepo.', { clue: 'ev_igor_phrase' }),
    g('ola', 'Jutro mam na szóstą 🙃 Jeszcze chwilę jestem. %name%, zerkniesz? My już te ekrany znamy na pamięć.'),
    g('kuba', 'zaraz podeślę ci jej maila'),
    /* P1: Kuba porządkuje to, co już wiadomo, i jedną rzecz, która się nie zgadza. */
    scene('xCel', [
      pause(1800),
      K('dobra, piszę tu, bo na grupie ola mnie zje że spamuję'),
      K('muszę to sobie poukładać, bo mi się miesza'),
      K('maja dzwoniła do ciebie, bo myślała że to numer rybickiego. to już wiemy'),
      K('nie wiemy, czemu w ogóle szukała kogoś od sprawy tomka. i gdzie była tamtej nocy'),
      K('policja mówi że koło północy była na tamie. a ona o 23:47 jeszcze dzwoniła do ciebie. telefon ostatni raz złapał sieć 23:58'),
      K('kto dzwoni do dziennikarza z 2007 roku 10 minut przed czymś takim. nie pasuje mi to'),
      choose('kuba', [
        opt('Najpierw sprawdźmy, gdzie był wtedy jej telefon.', [K('nimbus zapisuje lokalizację. tylko trzeba się dostać na konto')], { set: { p1_planLoc: true } }),
        opt('Same godziny jeszcze niczego nie dowodzą. Ale warto je sprawdzić.', [K('wiem. nie chcę sobie nic wmawiać'), K('ale jak w nimbusie będzie lokalizacja, to chociaż będzie wiadomo')]),
        opt('Kuba, połóż się chociaż na godzinę.', [K('nie dam rady. mama siedzi w kuchni i patrzy w telefon'), K('wyślę ci tego maila i może się położę')], { trust: { kuba: 1 } })
      ])
    ]),
    pause(2500),
    fx('glitch', { wait: true }),
    unlock('chat:szklarz'),
    sz('{nie odebrales|nie odebralas} wtedy'),
    sz('. . .', { wording: 'masz jeszcze tę wiadomość od niej?' }),
    sz('teraz juz sie nie rozlaczysz', { wording: 'tym razem odbierz' }),
    pic('szklarz', 'szklarz', 'sz_window', ''),
    pause(2000),
    end('ch1')
  ];
});
