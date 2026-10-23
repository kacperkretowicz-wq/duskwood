'use strict';
/* Zwykłe sprawy pomiędzy tropami. Bez nowych dowodów i wiedzy z przyszłych sezonów. */
Object.assign(DATA.conversations, {
  kuba_delivery: {
    who: 'kuba', title: 'Zamiennik', label: 'Między wiadomościami',
    cond: s => (s.seasonId || 's1') === 's1' && ['ch1', 'ch2', 'ch3'].includes(s.chapter) && !!s.ev.ev_loc_1410,
    preview: 'Kuba odbiera zakupy, które mama zamówiła do domu.',
    nodes: {
      start: { lines: ['czekaj, ktoś dzwoni domofonem', 'zakupy. mama zamówiła, bo drugi raz wróciła ze sklepu bez niczego', 'przywieźli mleko bez laktozy zamiast zwykłego. mama miała włączone zamienniki, nawet nie wiedziała'], choices: [
        sideChoice('W lodówce już nic nie było?', ['są trzy otwarte', 'każde inne. dobra, to nowe na razie zostaje zamknięte', 'mama mówi żeby najpierw dopić tamte'], 'after'),
        sideChoice('Cała reszta się zgadza?', ['tak. tylko banany trochę dostały po drodze', 'mama mówi że zrobi z nich ciasto. ogarnięte'], 'after')
      ] },
      after: { lines: ['wszystko stoi w torbach na podłodze', 'na paragonie chleb, jogurty, papier. normalne rzeczy', 'aż mnie wkurza że trzeba je rozpakować'], choices: [
        sideChoice('Schowaj chociaż to, co do lodówki. Nie uciekam.', ['dobra. dwie minuty', 'jogurty schowane. i zjadłem jednego, żeby nie było'], null, { trust: 1 }),
        sideChoice('Może mama pomoże?', ['jest przy stole. siedzi z telefonem', 'ja ogarnę. ona zamówiła, ja rozpakuję'])
      ] }
    }
  },
  ola_cafe: {
    who: 'ola', title: 'Dziesięć minut poza domem', label: 'Po zmianie',
    cond: s => (s.seasonId || 's1') === 's1' && ['ch2', 'ch3'].includes(s.chapter) && !!s.ev.ev_ola_fight,
    preview: 'Ola próbuje przeczytać notatki na zajęcia. Telefon leży obok kubka.',
    nodes: {
      start: { lines: ['Usiadłam w tej nowej kawiarni przy dworcu. Miałam przez godzinę pouczyć się na zaoczne.', 'Wzięłam matchę. Teraz mam zielony napój i otwartego PDF-a na pierwszej stronie.'], choices: [
        sideChoice('Dobra chociaż ta matcha?', ['Jeszcze nie wiem. Na razie za gorąca.', 'Maja zawsze brała na owsianym. Ja zapomniałam powiedzieć i już mi było głupio poprawiać.'], 'food'),
        sideChoice('Nie musisz teraz odpisywać. Posiedź chwilę.', ['Wiem. Tylko sama sprawdzam, czy coś przyszło.', 'Wyłączyłam dźwięki grupy z roku. Po minucie włączyłam, bo pomyliłam ją z naszą.'], 'food')
      ] },
      food: { lines: ['Kupiłam też croissanta. Połowa została w papierowej torebce, druga na swetrze.', 'Miałam tylko usiąść na chwilę. Zostawiłam tu 32 zł i nadal jestem głodna.'], choices: [
        sideChoice('Zjedz potem coś normalnego.', ['Mam obiad w domu, muszę go tylko odgrzać.', 'Dobra, zamykam czat na chwilę. Jak coś ważnego, zadzwoń.'], null, { trust: 1 }),
        sideChoice('Co masz na tych zajęciach?', ['Anatomię i fizjologię. I prowadzącą, która słyszy, kiedy zgadujesz.', 'Spróbuję przeczytać choć dwie strony. Potem wrócę.'])
      ] }
    }
  },
  maja_closefriends: {
    who: 'maja', title: 'Tylko dla bliskich', label: 'Listopad',
    cond: s => s.seasonId === 's2' && !!s.flags.majaFound,
    preview: 'Maja wrzuciła zwykłą relację. Ktoś zrobił z niej wiadomość dla całego miasta.',
    nodes: {
      start: { lines: ['wrzuciłam dziś na kadr zdjęcie kota na parapecie', 'ktoś zrobił screena i dał na grupę „maja wróciła do normalnego życia”', 'to był kot. nie komunikat prasowy'], choices: [
        sideChoice('Masz jeszcze siłę im coś odpisywać?', ['nie. poprosiłam sylwię, żeby zdjęła post', 'a relację dałam tylko dla bliskich. trzynaście osób. kota też bym dodała gdyby miał konto'], 'profile'),
        sideChoice('Nawet kota muszą analizować?', ['ktoś spytał czy parapet to „wskazówka co do lokalizacji”', 'mój pokój. lokalizacja: mój pokój'], 'profile')
      ] },
      profile: { lines: ['nie chcę usuwać konta. mam tam swoje zdjęcia sprzed tego wszystkiego', 'ale mam 47 nieodczytanych próśb o wiadomość i boję się otworzyć'], choices: [
        sideChoice('Zostaw na dziś. Wyślij mi kota, jeśli chcesz.', ['wyślę jak zejdzie z ładowarki. siedzi na kablu', 'przynajmniej ktoś ma normalny problem'], null, { trust: 1 }),
        sideChoice('Napiszę do ciebie tutaj, bez oznaczania na relacjach.', ['dzięki. serio', 'i nie wrzucaj że ze mną rozmawiasz. ludzie zaraz napiszą też do ciebie'])
      ] }
    }
  },
  natan_notifications: {
    who: 'natan', title: 'Czternaście powiadomień', label: 'Po pracy',
    cond: s => s.seasonId === 's3' && !!s.unlocked['chat:natan'],
    preview: 'Natan próbuje wysłać plik. Reszta telefonu ma inne plany.',
    nodes: {
      start: { lines: ['sorry, jeśli nie odpisuję to eksportuję. telefon leży ekranem do dołu', 'odwróciłem i mam 14 powiadomień', 'jedno ważne. reszta że paczka czeka, pizza taniej i że „tęsknimy” w aplikacji której nie pamiętam'], choices: [
        sideChoice('Przynajmniej ktoś tęskni.', ['apka do hulajnóg. jest grudzień', 'najtrwalszy związek w moim życiu'], 'late'),
        sideChoice('To ważne mi nie zginie wśród pizzy?', ['wasz czat mam przypięty', 'redakcyjny też. niestety'], 'late')
      ] },
      late: { lines: ['miałem odebrać paczkę w drodze do domu. oczywiście przypomniałem sobie już w domu', 'buty nadal mam na nogach. tyle dobrego'], choices: [
        sideChoice('Idź po nią. Plik wyślesz później.', ['no. jak wrócę, będzie po eksporcie', 'i może po drodze kupię coś co nie jest energetykiem'], null, { trust: 1 }),
        sideChoice('Co zamówiłeś?', ['kabel. taki sam jak mam, tylko dłuższy', 'miał rozwiązać wszystkie problemy. zobaczymy'])
      ] }
    }
  },
  ola_resale: {
    who: 'ola', title: 'Nie ta grupa', label: 'Styczeń',
    cond: s => s.seasonId === 's4' && !!s.unlocked['chat:ola'],
    preview: 'Ola ma wysłać paczkę. Na razie wysłała wiadomość do złego czatu.',
    nodes: {
      start: { lines: ['„Dzień dobry, długość od pachy 48 cm”.', 'To nie do ciebie. Mam trzy czaty otwarte naraz.', 'Sprzedaję kurtkę. Dziewczyna pyta, czy wyślę dziś, a ja jeszcze nawet nie mam pudełka.'], choices: [
        sideChoice('Masz torbę po czymś, co ostatnio zamawiałaś?', ['Mam karton po butach. Z pięcioma starymi etykietami.', 'Usunę je, zanim wyślę komuś pół historii naszej rodziny.'], 'wrong'),
        sideChoice('48 cm? Obcisła ta kurtka.', ['Nie, od pachy do dołu. Już poprawiłam opis.', 'Kupująca pomyślała to samo. Dobra, to dziś nie jest mój dzień.'], 'wrong')
      ] },
      wrong: { lines: ['A do grupy z zajęć wysłałam rano „Kuba, nie idź sam”.', 'Jedna osoba odpisała „a myślałam że kolos odwołany”.'], choices: [
        sideChoice('Udało się chociaż wyjaśnić?', ['Tak. „Nie ta grupa” robi u mnie za podpis.', 'Idę zakleić karton. Będę pod telefonem.']),
        sideChoice('Mam do ciebie zadzwonić, jeśli będzie coś pilnego?', ['Tak, proszę. Wiadomości już mi się dzisiaj mieszają.', 'Dzięki.'], null, { trust: 1 })
      ] }
    }
  },
  igor_oldphone: {
    who: 'igor', title: 'Stary telefon', label: 'Marzec',
    cond: s => s.seasonId === 's5' && !!s.unlocked['chat:igor'],
    preview: 'Igor uruchomił telefon zostawiony w szufladzie. Nie każdy dźwięk oznacza nową wiadomość.',
    nodes: {
      start: { lines: ['włączyłem swój stary telefon. ten z pękniętym rogiem', 'pół godziny nadrabiał powiadomienia. zadzwonił nawet ten dźwięk z grupy ze szkoły', 'odruchowo sprawdziłem. wiadomość z 2022'], choices: [
        sideChoice('I co napisali po czterech latach?', ['żebym oddał bluzę', 'sprawdziłem szafę. mam. nie pochwalę się tym'], 'date'),
        sideChoice('Telefon potrafi pokazać starą wiadomość jak nową?', ['jak stara apka dogania synchronizację to potrafi narobić hałasu', 'dlatego zajrzałem do samej rozmowy. tam była data. samo powiadomienie by mnie nabrało'], 'date')
      ] },
      date: { lines: ['zdjęcia też jeszcze na nim są. niektórych nie zgrałem nigdzie', 'głównie żarcie i rachunki. człowiek się spodziewa wspomnień a tu kebab z wtorku'], choices: [
        sideChoice('Rachunki to też wspomnienia. Zwykle bolesne.', ['zwłaszcza ten za szybę. zbiłem tydzień po zakupie telefonu', 'dobra, robię kopię. potem wracam do roboty']),
        sideChoice('Zgraj, zanim znowu trafi do szuflady.', ['właśnie po to go wyjąłem. tylko utknąłem na tej bluzie', 'dobra. wracam za chwilę'], null, { trust: 1 })
      ] }
    }
  }
});
