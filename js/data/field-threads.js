'use strict';
/* Przedmiot może wskazać warsztat. Nie wskazuje automatycznie człowieka. */
(() => {
  // Bez hotspotów: dokumentacyjne zdjęcie tej samej huty z ekranu startowego.
  Art.def('m_huta_ext', { title: 'Huta „Jutrzenka”', w: 1448, h: 1086, src: 'assets/factory-day-v1.jpg',
    exif: { date: '03.10.2026', time: '15:20', device: 'Telefon Mai', place: 'Mglisko, ul. Szklarska', res: '1448 × 1086', file: 'IMG_20261003_1520.jpg' } });
  const photos = [
    ['garage_locker', 'Po zamknięciu warsztatu', 'garage-locker-v1.jpg', '22.10.2026', '16:42', 'Telefon Bartka', null],
    ['strap_door', 'Pas przy bocznym wejściu', 'strap-door-v1.jpg', '22.10.2026', '23:35', 'Telefon Kuby', 'ev_strap_field'],
    ['garage_straps', 'Szuflada z pasami', 'garage-straps-v1.jpg', '23.10.2026', '17:18', 'Telefon Bartka', 'ev_strap_stock']
  ];
  photos.forEach(([id, title, file, date, time, device, onView]) => Art.def(id, {
    title, w: 1448, h: 1086, src: 'assets/' + file, onView,
    exif: { date, time, device, res: '1448 × 1086', file, note: 'Oryginalny kadr w otrzymanym załączniku. Brak pomiaru GPS.' }
  }));
  Object.assign(DATA.evidence, {
    ev_strap_field: { title: 'Pas przy bocznym wejściu huty', cat: 'photo', source: 'Zdjęcie Kuby · 22.10, 23:35', img: 'strap_door',
      desc: 'Żółty pas transportowy z zapadką leży przy stopniu bocznego wejścia. Ma jasną, zabrudzoną metkę; oznaczeń nie da się odczytać. Kuba sfotografował go podczas wyprawy z Igorem. Zdjęcie nie ustala daty pozostawienia przedmiotu ani tego, kto go używał.' },
    ev_strap_stock: { title: 'Auto-Sowa · kilka podobnych pasów', cat: 'photo', source: 'Bartek · zdjęcie szuflady z 23.10, 17:18', img: 'garage_straps',
      desc: 'W warsztacie są trzy żółte pasy z zapadkami i czerwony pas holowniczy. Taki typ sprzętu służy do mocowania ładunków. Zdjęcie pokazuje podobieństwo, nie unikalną identyfikację pasa spod huty. Metka jest nieczytelna.' },
    ev_strap_loan: { title: 'Zeszyt Auto-Sowa · wydanie 12.10', cat: 'msg', source: 'Dokładny odpis Bartka z zeszytu warsztatu',
      desc: '„12.10.26 / koło łow. / 2 pasy z zapadką, żółte / wydał M.S. / odebrał R. Gajda / zwrot: —”. Bartek podaje, że to pismo ojca. Wpis nie ma numerów seryjnych. Potwierdza odnotowane wydanie dwóch pasów; nie łączy konkretnego egzemplarza ze zdjęciem Kuby. Puste pole zwrotu nie dowodzi, że sprzętu nigdy nie oddano.' },
    ev_strap_checked: { title: 'Pas nie identyfikuje Bartka', cat: 'digital', source: 'Porównanie zdjęć i odpisu z zeszytu',
      desc: 'Przy wejściu leżał pas podobny do sprzętu warsztatowego. Warsztat miał kilka sztuk i wydawał takie pasy innym osobom, w tym Gajdzie 12.10. Brak czytelnego numeru uniemożliwia przypisanie egzemplarza. To wskazówka, o którą warto dopytać, bez dowodu użycia przy porwaniu i bez alibi dla Bartka.' }
  });
  DATA.deductions.ded_strap = {
    q: 'Czy pas spod huty wskazuje Bartka?', kind: 'text',
    intro: 'Najpierw kurtka warsztatu, teraz pas przy bocznym wejściu. Bartek przyznał się do wizyty w innej nocy. Czy ten nowy przedmiot wiąże go z porwaniem?',
    options: [
      { id: 'bartek', label: 'Tak. Podobny pas jest w jego warsztacie, więc tylko on mógł go tam zostawić.' },
      { id: 'gajda', label: 'To na pewno pas Gajdy, użyty do porwania Mai. Wpis dowodzi obu rzeczy.' },
      { id: 'open', label: 'Nie ustala użytkownika. Podobne pasy miało kilka osób; wpis jest tropem do sprawdzenia, bez identyfikacji egzemplarza.' },
      { id: 'alibi', label: 'Wpis całkowicie oczyszcza Bartka i daje mu alibi na 14 października.' }
    ], answer: 'open',
    support: { need: 3, from: ['ev_strap_field', 'ev_strap_stock', 'ev_strap_loan'], prompt: 'Wybierz zdjęcie z huty, zdjęcie sprzętu i zapis wydania.', fail: 'Połącz znalezisko, porównanie z warsztatu oraz odpis. Sama kurtka nie ustala, kto miał pas.' },
    fail: 'Podobieństwo sprzętu nie identyfikuje egzemplarza. A wydanie pasów nie mówi, do czego ich użyto ani gdzie był Bartek.',
    reward: 'ev_strap_checked',
    done: 'Trop z warsztatu rozchodzi się dalej: sprzęt był wydawany także poza Auto-Sowa. Wpis wymienia Gajdę, lecz pasa ze zdjęcia nie da się przypisać. Zachowujemy odpis i pytania; nie dopisujemy sceny porwania.'
  };
  Object.assign(DATA.conversations, {
    kuba_strap: {
      who: 'kuba', title: 'Jeszcze jedno zdjęcie', label: 'Z wyprawy do huty',
      cond: ['ev:ev_bartek_conf', 'ev:ev_car_igor', '!flag:marekTestify', s => ['ch3', 'ch4'].includes(s.chapter)],
      preview: 'Kuba wraca do zdjęcia, które zrobił przy bocznych drzwiach.',
      nodes: {
        start: { lines: ['przewijałem zdjęcia z huty. zobacz to spod bocznych drzwi', 'igor mówił żeby tam niczego nie ruszać. więc nie ruszałem', 'nie wrzuciłem go na grupę bo po tej kurtce już wszyscy jechali po bartku'], attachments: ['strap_door'], choices: [
          sideChoice('Co ci się skojarzyło z Bartkiem?', ['takie pasy wiszą na lawecie u nich', 'ale ja nie wiem czy ten jest ich. serio. obejrzyj go'], 'finish'),
          sideChoice('Dobrze, że go zostawiliście. Zapytam Bartka o ten typ pasa.', ['tylko nie zaczynaj od „znaleźliśmy twoje rzeczy”', 'wczoraj już za dużo rzeczy wiedziałem na pewno'], 'finish')
        ] },
        finish: { choices: [
          sideChoice('Sprawdzę z nim zdjęcie. Bez wrzucania oskarżeń na grupę.', ['okej. daj znać co powie'], null, { set: { askedStrap: true } }),
          sideChoice('Nie da się odczytać metki. Potrzebujemy czegoś poza kolorem.', ['no właśnie', 'a ja już zobaczyłem całą lawetę na tym zdjęciu'], null, { set: { askedStrap: true } })
        ] }
      }
    },
    bartek_strap: {
      who: 'bartek', title: 'Zeszyt wydanych rzeczy', label: 'Zdjęcie Kuby',
      cond: ['flag:askedStrap', 'ev:ev_strap_field', '!flag:marekTestify', s => ['ch3', 'ch4'].includes(s.chapter)],
      preview: 'Bartek rozpoznaje typ sprzętu. Potem zagląda do zeszytu ojca.',
      reward: ['ev_strap_loan'], deduction: 'ded_strap',
      nodes: {
        start: { lines: ['pas do ladunku. na lawecie mam takie dwa', 'z tego zdjecia nie poznam czy moj', 'mam zdjecie z 23go. zaraz wysle'], attachments: ['garage_straps'], choices: [
          sideChoice('Macie ich więcej. Kto poza tobą ich używa?', ['stary. dostawy. pozyczamy czasem', 'juz chcialem napisac ze nikt nie bierze naszych rzeczy. no, nieprawda'], 'ledger'),
          sideChoice('Nie widzę numeru. Macie zapisane wydania?', ['stary ma zeszyt', 'zaraz. klucze do szafki sa w biurze'], 'ledger')
        ] },
        ledger: { lines: ['przepisalem caly wpis. bez nazwiska klienta z sasiedniej strony', '12.10.26 / kolo low. / 2 pasy z zapadka, zolte / wydal M.S. / odebral R. Gajda / zwrot: —', 'stary mowil ze do desek przy pasniku. gajda je bral. nie wiem czy te ze zdjecia'], choices: [
          sideChoice('Marek mówił ci to teraz czy pamiętasz z tamtego dnia?', ['teraz', 'nie bylem przy odbiorze. nie bede robil z siebie swiadka'], 'father'),
          sideChoice('Puste pole zwrotu może znaczyć też, że ktoś nie uzupełnił zeszytu.', ['moze. on czasem skresla dopiero na koniec tygodnia', 'zapytam go wprost zamiast wymyslac'], 'father')
        ] },
        father: { lines: ['to jego pismo. to MS tez', 'czyli jak mu gajda mowil o mai to stary juz wiedzial ze pozyczal mu sprzet', 'a mnie tlumaczyl ze mamy nie gadac o klientach'], choices: [
          sideChoice('Zachowaj ten wpis. O resztę trzeba go zapytać.', ['zachowam', 'tym razem nie oddam mu zeszytu z gotowa wymowka']),
          sideChoice('Wpis jest konkretny. Nie wiemy jeszcze, co łączy go ze znaleziskiem.', ['dobra. pokaze to co jest', 'niech stary sam odpowie za to co dopiero powie'])
        ] }
      }
    },
    bartek_locker: {
      who: 'bartek', title: 'Nie zamykam za ojca', label: 'Po sprawdzeniu pasa',
      cond: ['solved:ded_strap', '!flag:marekTestify', s => ['ch3', 'ch4'].includes(s.chapter)], preview: 'Na starym zdjęciu warsztat wygląda spokojnie. Bartek widzi go teraz inaczej.',
      nodes: {
        start: { lines: ['zdjecie z 22go. wyslalem znajomemu ze zamknalem wczesniej', 'teraz tu siedze i czekam az stary wroci'], attachments: ['garage_locker'], choices: [
          sideChoice('I co mu powiesz?', ['zapytam czemu kazal mi siedziec cicho o zwyklych pasach', 'wiem jak brzmi. klotnia o szuflade zamiast o maje'], 'finish'),
          sideChoice('Zapytaj go o wydanie. Ja zachowam wpis.', ['ale i tak zgaduje', 'wkurza mnie ze dalej chce za niego odpowiedziec'], 'finish')
        ] },
        finish: { choices: [
          sideChoice('Jeśli odpowie, zapisz dokładnie. Nawet jeśli nie będzie to przełom.', ['dobra', 'i nie bede juz usuwal zdan bo zle wyglada moj stary']),
          sideChoice('Jestem przy telefonie. Daj znać po rozmowie.', ['okej. zaraz powinien byc', 'w koncu ma wlasne klucze'])
        ] }
      }
    }
  });
})();
