'use strict';
/* Mrok pochodzi z ludzkich działań. Notatka nie identyfikuje autora zmiany.
   Dodatki nie przesuwają numerycznych kroków zapisanej głównej fabuły. */
(() => {
  const original = 'Olka,\n\njak wrócę, opowiem ci wszystko. Bez zdjęć na początek.\n\nTu pod ścianą leży taki mały plastikowy brelok. Muszę zrobić zbliżenie, zanim go ruszę.\n\nI oddam ci ten pojemnik. Tak, ten z września. Umyty.';
  const revised = 'Olka,\n\npotrzebuję czasu. Nie szukajcie mnie.\n\nNie chcę wracać do tamtej rozmowy. Usuńcie moje zdjęcia z huty. To moja decyzja.';
  DATA.maja.notes.push({
    id: 'pojemnik', title: 'Do Oli', t: '2026-10-24T03:04', syncStarted: '2026-10-24T03:05',
    unlock: 'maja:sync1', ev: 'ev_note_revised', body: revised, deduction: 'ded_note_versions',
    versions: [
      { label: 'Wcześniejszy zapis', t: '2026-10-14T23:41', body: original, ev: 'ev_note_original' },
      { label: 'Ostatni zapis', t: '2026-10-24T03:04', body: revised, ev: 'ev_note_revised' }
    ]
  });
  Object.assign(DATA.evidence, {
    ev_note_original: {
      title: '„Do Oli” · wcześniejsza wersja', cat: 'digital', source: 'Nimbus · historia wersji · zapis 14.10, 23:41',
      desc: original + '\n\nZapis z urządzenia Mai. Historia została przesłana z zaległą kopią 24.10 po zakończeniu kopii rozpoczętej o 03:05. To wcześniejsza treść tej samej notatki, a nie wiadomość dostarczona Oli.'
    },
    ev_note_revised: {
      title: '„Do Oli” · zmieniona wersja', cat: 'digital', source: 'Nimbus · notatka · zapis 24.10, 03:04',
      desc: revised + '\n\nOdebrano po zakończeniu kopii rozpoczętej o 03:05. Metadane wskazują urządzenie i czas zapisu, bez informacji o osobie wpisującej tekst. Notatka nie została wysłana do Oli.'
    },
    ev_note_changed: {
      title: 'Ktoś zmienił treść „Do Oli”', cat: 'digital', source: 'Porównanie dwóch wersji tej samej notatki',
      desc: 'Wcześniejszy tekst zapowiada powrót i rozmowę. Późniejszy żąda przerwania poszukiwań oraz usunięcia zdjęć. Historia potwierdza zmianę, ale nie tożsamość autora ani dobrowolność słów. Nie wystarcza do przerwania poszukiwań. Obie wersje zachowano; żadna nie zastępuje drugiej.'
    },
    ev_note_shared: {
      title: 'Wersje „Do Oli” przekazane Gajdzie', cat: 'msg', source: 'Twoja rozmowa z Robertem Gajdą',
      desc: 'Na prośbę Gajdy przekazano mu obie wersje notatki z godzinami zapisu. Odbiorca wie, że zachowała się historia zmian. Nie przekazano hasła, innych plików ani planu akcji.'
    }
  });
  DATA.deductions.ded_note_versions = {
    q: 'Czy „Do Oli” pozwala zakończyć poszukiwania?', kind: 'text',
    intro: 'Ta sama notatka, dwa zapisy. Późniejszy wygląda jak pożegnanie. Co rzeczywiście potwierdza historia?',
    options: [
      { id: 'left', label: 'Maja dobrowolnie odeszła. Późniejszy zapis unieważnia wcześniejszy.' },
      { id: 'gajda', label: 'Gajda osobiście wpisał ten tekst. Godzina pliku potwierdza jego tożsamość.' },
      { id: 'changed', label: 'Tekst zmieniono. Nie wiadomo, kto go zapisał ani czy zrobił to dobrowolnie; poszukiwania muszą trwać.' },
      { id: 'sync', label: 'Oba teksty powstały w chwili odbioru kopii, bo wtedy pojawiły się w chmurze.' }
    ],
    answer: 'changed',
    support: { need: 2, from: ['ev_note_original', 'ev_note_revised'], prompt: 'Wskaż obie wersje tej samej notatki.', fail: 'Potrzebna jest treść sprzed zmiany i po zmianie. SMS, zdjęcie i wspomnienie Oli ich nie zastąpią.' },
    fail: 'Czas synchronizacji nie jest czasem pisania. Zapis na telefonie Mai nie dowodzi, że sama i bez przymusu wybrała te słowa.',
    reward: 'ev_note_changed',
    done: 'W notatce o powrocie ktoś zastąpił zwykłe szczegóły żądaniem ciszy. Mamy obie wersje. Wiemy, co się zmieniło; nie wiemy jeszcze, kto trzymał telefon. Poszukiwania trwają.'
  };
  DATA.timeline.push(
    { t: '2026-10-14T23:41', title: 'Notatka „Do Oli” zapowiada powrót.', cond: 'ev:ev_note_original' },
    { t: '2026-10-24T03:04', title: 'Treść „Do Oli” zostaje zastąpiona.', cond: 'solved:ded_note_versions' }
  );

  Object.assign(DATA.conversations, {
    ola_container: {
      who: 'ola', title: 'Pojemnik z września', label: 'Niewysłane',
      cond: ['ev:ev_note_original', '!flag:majaFound'],
      preview: 'Ola czyta tekst, którego nigdy nie dostała.',
      nodes: {
        start: { lines: ['Ten pojemnik naprawdę jest mój.', 'Od września się o niego upominałam. Niby żartem. Potem naprawdę mnie to zaczęło wkurzać.', 'Teraz widzę, że pisała o nim wtedy, w tej hali.'], choices: [
          sideChoice('Mogę ci pokazać wcześniejszy zapis. Jest osobno od zmienionej wersji.', ['Dobrze. Chcę ten wcześniejszy.', 'Nie chcę otwierać jej notatki i za każdym razem widzieć, że mam przestać jej szukać.'], 'door'),
          sideChoice('Nie dostałaś tego tekstu tamtej nocy?', ['Nie. Tylko przeprosiny o 23:31.', 'Gdybym dostała ten, spytałabym, co to za brelok. Tak sobie mówię. Nie wiem, czy naprawdę bym spytała.'], 'door')
        ] },
        door: { lines: ['Wczoraj zostawiłam buty przy drzwiach. Kurtkę na krześle.', 'Jakby miała napisać „zejdź” i jakbym mogła naprawić wszystko tym, że tym razem zejdę od razu.'], choices: [
          sideChoice('Nie musisz siedzieć w kurtce. Jak coś się zmieni, napiszę.', ['Wiem.', 'Schowałam buty. Teraz siedzę i patrzę na pustą wycieraczkę, super zajęcie.'], 'finish'),
          sideChoice('Chcesz pogadać? Mogę na chwilę odłożyć pliki.', ['Tak. Bez następnego pliku przez minutę.', 'Tylko nie pisz mi, że na pewno jutro będziemy się z tego śmiać.'], 'finish')
        ] },
        finish: { choices: [
          sideChoice('Zachowamy jej własne słowa. I szukamy dalej.', ['Dobrze.', 'A pojemnik niech sobie zatrzyma. Powiem jej to, jak wróci.']),
          sideChoice('Możemy chwilę pomilczeć.', ['Dzięki.', 'Jestem tutaj.'])
        ] }
      }
    },
    kuba_room: {
      who: 'kuba', title: 'Ładowarka w pokoju', label: 'Po porównaniu wersji',
      cond: ['solved:ded_note_versions', '!flag:majaFound'],
      preview: 'Kuba nie chce już słyszeć powiadomień z telefonu siostry.',
      nodes: {
        start: { lines: ['mama spytała czy da się wyłączyć ten dźwięk nimbusa', 'najpierw myśli że to maja. potem widzi „kopia zakończona”', 'ten sam dźwięk za każdym razem'], choices: [
          sideChoice('To kopia danych. Nie znak, że Maja właśnie napisała.', ['wiem', 'tylko ta pierwsza sekunda jest szybsza ode mnie'], 'room'),
          sideChoice('Możecie wyciszyć dźwięk. Zachowane pliki zostaną.', ['powiem jej', 'sam go chyba też wyłączę'], 'room')
        ] },
        room: { lines: ['jej długa ładowarka jest teraz u mnie', 'jak odłączam telefon to odkładam kabel przy jej drzwiach', 'nie wchodzę. nie wiem czemu. normalnie bym wszedł i zabrał jeszcze słuchawki'], choices: [
          sideChoice('Nie musisz dzisiaj wchodzić.', ['okej', 'a jak się znajdzie to nie wysyłaj jej tego screena. dobra?'], 'copy', { set: { respectedKubaRoom: true } }),
          sideChoice('Ładowarkę oddasz później. Nie musisz tam teraz wchodzić.', ['normalnie by mnie opieprzyła przez ścianę że dotykam jej kabla', 'wcześniej mnie to wkurzało. teraz sam bym zapukał żeby się pokłócić'], 'copy', { set: { respectedKubaRoom: true } })
        ] },
        copy: { lines: s => s.flags.noteCopyShared
          ? ['mama dzwoniła do gajdy. mówił że ma od ciebie obie wersje', 'on teraz wie że stary tekst też został. nie mamy przycisku cofnij?']
          : ['zostały u nas obie wersje?', 'nawet jak ktoś jeszcze coś dopisze?'], choices: [
          sideChoice('Zachowujemy oba zapisy osobno. Nie wycofamy przekazanych kopii.', ['dobrze', 'nie chcę żeby ta druga wersja została jedyną rzeczą po niej'], null, { set: { noteCopiesKept: true } }),
          sideChoice('Nie wysyłajmy kolejnych plików bez ustalenia komu i po co.', ['dobra. nie rozsyłam więcej', 'nie chcę żeby ktoś nam teraz mówił co ona miała na myśli'], null, { set: { noteCopiesKept: true } })
        ] }
      }
    },
    gajda_versions: {
      who: 'gajda', title: 'Dla dobra rodziny', label: 'Ponowna prośba',
      cond: s => !s.finished && !!s.ev.ev_note_revised && !!s.unlocked['chat:gajda'] && ['ch3', 'ch4'].includes(s.chapter),
      preview: 'Gajda wraca do plików z telefonu Mai. Pyta, co jeszcze zachowano.',
      nodes: {
        start: { lines: ['Wracam do kopii telefonu. Pani Wrona nie śpi po nocach.', 'Każdy przekazuje jej inną interpretację. Potrzebujemy jednego kompletu materiałów.', 'Co doszło po ostatniej synchronizacji?'], choices: [
          sideChoice('Nie będę teraz przesyłać prywatnych notatek.', ['Rozumiem wahanie. Ale proszę pamiętać, że rodzina czeka na odpowiedź, nie na kolejne domysły.', 'Proszę ich nie obciążać.'], 'boundary', { set: { noteCopyRefused: true } }),
          sideChoice('Wyślę obie wersje „Do Oli”, z datami zapisu.', ['Dziękuję. Widzę, że zachowała się również wcześniejsza treść.', 'To robocze zapisy. Ludzie zmieniają zdanie. Proszę nie rozpowszechniać tych różnic.'], 'boundary', {
            detail: 'Przekażesz Gajdzie treść i historię zmian tej notatki. Będzie wiedział, co zachowało się w kopii.',
            set: { noteCopyShared: true }, inc: { leaks: 1 }, reward: ['ev_note_shared']
          })
        ] },
        boundary: { lines: ['Maja jest dorosła. Może nie chcieć rozmawiać z każdym.', 'Dla dobra rodziny proszę powstrzymać kolejne spekulacje.'], choices: [
          sideChoice('Nie mamy potwierdzenia, że jest bezpieczna.', ['Od oceny sytuacji są odpowiednie osoby.', 'Zrobimy, co trzeba.']),
          sideChoice('Zachowuję kopie. Przekażę je z opisem źródeł.', ['Jak {Pan|Pani} uważa.', 'Proszę jednak nie mylić własnych wniosków z ustaleniami.'])
        ] }
      }
    },
    weronika_light: {
      who: 'weronika', title: 'Światło od ulicy', label: 'Po zdjęciu Tomka',
      cond: 'ev:ev_tomek', preview: 'Weronika pamięta, jak długo palono światło w kuchni.',
      nodes: {
        start: { lines: ['Mama zostawiała światło w kuchni. Po powodzi.', 'Od ulicy było widać okno. Mówiła, że jak Tomek wróci, będzie wiedział, że nie śpimy.', 'Potem kupiliśmy nowe żarówki. Potem nowe mieszkanie.'], choices: [
          sideChoice('Długo tak robiła?', ['Nie umiem powiedzieć kiedy przestała.', 'Pamiętam tylko, jak kiedyś sama zgasiłam. I przez całą noc nie mogłam zasnąć.'], 'people'),
          sideChoice('Nie musi pani teraz o tym opowiadać.', ['Chcę. Bo znowu słyszę te same zdania.', '„Proszę dać służbom pracować”. „Może sam wróci”.'], 'people')
        ] },
        people: { lines: ['W bibliotece ktoś zapytał, czy nie powinnam już oddać albumu Tomka do archiwum.', 'To nie był zły człowiek. Chciał odzyskać zwykłą rozmowę przy ladzie.', 'Odłożyłam album. Ten pan zaczął pytać o nowości wydawnicze. Ja nie potrafiłam odpowiedzieć.'], choices: [
          sideChoice('Nie musi pani oddawać albumu.', ['Tak.', 'Dzisiaj zabiorę go do domu. Nie chcę, żeby znów ktoś go oglądał przez ramię.'], 'finish'),
          sideChoice('Chce pani, żebym {przekazał|przekazała} coś Kubie?', ['Że nie musi odpowiadać wszystkim, którzy pytają „co nowego”.', 'Że może zjeść obiad, nawet jeśli nie ma nic nowego.'], 'finish')
        ] },
        finish: { choices: [
          sideChoice('Dziękuję, że opowiedziała mi pani o nim.', ['Był też nieznośny, proszę pamiętać.', 'Zawsze naciskał wszystkie guziki w windzie. Chciałabym jeszcze raz się za to zezłościć.']),
          sideChoice('Zapiszę to dla siebie. Bez rozsyłania albumu.', ['Dziękuję.', 'Album zostawię sobie. Nie chcę, żeby następne zdjęcie Tomka trafiło do gazety.'])
        ] }
      }
    },
    maja_words: {
      who: 'maja', title: 'Moje zdania', label: 'Listopad · historia notatki',
      cond: s => !!s.finished && !!s.flags.majaFound && !!s.solved.ded_note_versions,
      preview: 'Maja chce sama zdecydować, która część notatki należy do niej.',
      nodes: {
        start: { lines: s => [
          'ola pokazała mi obie wersje',
          'ten pojemnik. serio planowałam go oddać. aż mnie to rozśmieszyło, i potem już nie',
          s.flags.noteCopyShared ? 'wiem też że dostał te zapisy. nie musisz mi mówić że to miało pomóc' : 'dzięki że ten pierwszy tekst nie zniknął pod drugim'
        ], choices: [
          sideChoice('{Wysłałem|Wysłałam} je. {Myślałem|Myślałam}, że pomagam. Rozumiem, że możesz być na mnie zła.', ['dobrze', 'nie mam teraz na to miejsca'], 'voice', { cond: 'flag:noteCopyShared' }),
          sideChoice('Co chcesz z nimi zrobić teraz?', ['pierwszą zostawić. drugą też, jako materiał do sprawy', 'ale nie chcę żeby mi się otwierała jako moja najnowsza notatka'], 'voice', { cond: '!flag:noteCopyShared' })
        ] },
        voice: { lines: ['sms do mamy pisałam ja. te słowa o klusce też', 'on kazał mi napisać że nic mi nie jest. telefon miałam przez chwilę', 'notatki nie pamiętam. nie dopiszę wam do niej sceny tylko dlatego że teraz pasuje'], choices: [
          sideChoice('Nie będę ci dopowiadać, co „musiało” się stać.', ['dzięki', 'czasem ktoś mówi „czyli wtedy…” i ja prawie przytakuję żeby mieć spokój'], 'finish'),
          sideChoice('Dopiszę, że nie pamiętasz edycji notatki.', ['tak. i nie podpisujcie tej drugiej „pożegnanie mai”', 'ja się z nikim nie żegnałam'], 'finish')
        ] },
        finish: { choices: [
          sideChoice('Jak chciałabyś ją nazwać?', ['zmieniony tekst. po prostu', 'a moją notatkę nazwę „pojemnik”. ola od razu będzie wiedziała']),
          sideChoice('Okej. Zostawmy to na dziś.', ['dobra', 'teraz mam jej wreszcie oddać ten nieszczęsny pojemnik'])
        ] }
      }
    }
  });
})();
