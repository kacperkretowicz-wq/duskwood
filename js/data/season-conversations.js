'use strict';
/* Relacje rozwijają się w granicach wiedzy danej postaci. Żadna rozmowa nie wymaga
   odbycia przerwy w prawdziwym świecie i żadna nie zmienia kroku głównej fabuły. */
Object.assign(DATA.conversations, {
  kuba_wallpaper: {
    who: 'kuba', title: 'Znajomy brzeg', label: 'Kopia Mai',
    cond: ['unlocked:chat:group', 'flag:wallpapersImported'],
    preview: 'Kadr znad wody wygląda znajomo. Data kopii coś sugeruje.',
    nodes: {
      start: { lines: ['ta tapeta. na sekundę mi serce stanęło', 'w kopii z tej nocy. i woda', 'pomyślałem że może jednak tama'], choices: [
        sideChoice('Najpierw sprawdźmy datę oryginalnego zdjęcia.', ['tak. bo ja już sobie dopowiedziałem całą drogę', 'a przecież to mogło tam być od dawna'], 'memory'),
        sideChoice('Rozpoznajesz miejsce czy tylko wodę?', ['tylko brzeg. nie widzę zapory', 'nie chcę powiedzieć „tak”, żeby cokolwiek było pewne'], 'memory')
      ] },
      memory: { lines: ['robiłem jej kiedyś zdjęcia nad mglicą', 'chciała nowe profilowe. „niżej. nie aż tak nisko. kuba oddaj” xd'], choices: [
        sideChoice('Czy na pewno pamiętasz ten konkretny kadr?', ['nie. podobny dzień pamiętam', 'datę sprawdź w pliku. ja już nie pamiętam nawet który to był tydzień'], 'source'),
        sideChoice('To mogło być stare zdjęcie. Sprawdzę plik.', ['wiem', 'wolałbym żeby to było tak proste. zdjęcie, godzina, już wiemy'], 'source')
      ] },
      source: { choices: [
        sideChoice('Zapiszę osobno datę kopii i datę zrobienia zdjęcia.', ['i napisz mi co z tego naprawdę wynika', 'nawet jeśli „nic nowego”. to też wolę wiedzieć'], 'boundary'),
        sideChoice('Nie wysyłajmy tego jako potwierdzenia pobytu na tamie.', ['nie wyślę', 'mama patrzy na każdą taką rzecz jak na wiadomość od niej'], 'boundary')
      ] },
      boundary: { choices: [
        sideChoice('Poczekaj z wnioskami. Dam znać, co jest w oryginale.', ['dobra', 'nie wysyłam tego mamie zanim sprawdzisz. już miałem otwartą jej rozmowę']),
        sideChoice('Porównam daty i dam znać.', ['okej. nie będę teraz odświeżał co dziesięć sekund', 'spróbuję przynajmniej'])
      ] }
    }
  },
  ola_privacy: {
    who: 'ola', title: 'Nie wszystko do grupy', label: 'Granice',
    cond: 'ev:ev_not_gajda', preview: 'Ola wraca do tego, jak pokazano jej prywatne wiadomości.',
    nodes: {
      start: { lines: ['Mogę o coś poprosić? Nie o usuwanie dowodów.', 'Jeśli coś z moich rozmów nie dotyczy jej zniknięcia, nie wrzucaj tego na grupę.'], choices: [
        sideChoice('Jasne. Zachowujemy to, co potrzebne do sprawy.', ['Dziękuję.', 'To dziwne, że najpierw skłamałam, a teraz proszę o zaufanie. Wiem.'], 'fight'),
        sideChoice('Chodzi o tę kłótnię?', ['Tak. Wszyscy przeczytają te trzy wiadomości i stwierdzą, że już wiedzą, jakie byłyśmy.', 'A były też lata, kiedy przychodziła do mnie tylko posiedzieć.'], 'fight')
      ] },
      fight: { lines: ['Kiedy powiedziałam „obsesja”, chciałam, żeby wróciła do normalnego życia.', 'Miałam wolny wieczór, pierwszy od dawna. A ona znowu chciała jechać do huty. Byłam wkurzona.'], choices: [
        sideChoice('To nie znaczy, że odpowiadasz za jej zniknięcie.', ['Wiem to, jak czytam twoje zdanie.', 'Potem odkładam telefon i znowu wraca tamten wieczór.'], 'ordinary'),
        sideChoice('Byłaś zła, że wybrała hutę zamiast spotkania?', ['Tak. Głupio mi to teraz napisać.', 'Wiedziałam, że przesadzam, już jak wysłałam „mam dość”. Potem tylko czekałam, aż ona napisze pierwsza.'], 'ordinary')
      ] },
      ordinary: { choices: [
        sideChoice('O czym chciałabyś z nią porozmawiać, gdy wróci?', ['O bazyliach. O niczym.', 'Żeby mi powiedziała, że mam zły garnek do makaronu. Mogę nawet wysłuchać wykładu.'], 'finish'),
        sideChoice('Chcesz na chwilę odłożyć telefon?', ['Umyję ten kubek. Noszę go po mieszkaniu od dwóch godzin.', 'Dźwięku nie wyłączam.'], 'finish')
      ] },
      finish: { choices: [
        sideChoice('O resztę prywatnych rzeczy zapytam cię, zanim coś wyślę.', ['Dobrze. To mi wystarczy.', 'Gdy będzie trzeba potwierdzić coś ważnego, zapytaj mnie wprost.']),
        sideChoice('Dobra. Wróćmy do plików.', ['Tak. I dzięki, że {dałeś|dałaś} mi to dopowiedzieć.'])
      ] }
    }
  },
  bartek_work: {
    who: 'bartek', title: 'Klucze do warsztatu', label: 'Po wyznaniu',
    cond: 'ev:ev_bartek_conf', preview: 'Bartek mówi o pracy z ojcem i o tym, dlaczego się bronił.',
    nodes: {
      start: { lines: ['mamy w warsztacie jeden komplet do sejfu z papierami', 'stary go zawsze bierze do domu. ja mam wszystkie inne klucze', 'teraz mnie to wkurza bardziej niz zwykle'], choices: [
        sideChoice('Bo dalej traktuje cię jak pomocnika?', ['pracuje tam od szkoly', 'klient pyta o szefa nawet jak od miesiaca naprawiam mu auto ja'], 'father'),
        sideChoice('Szukasz czegoś konkretnego czy chcesz mieć dostęp?', ['teraz? chce przestac pytac o pozwolenie na kazda rzecz', 'nie powiem ze te papiery cos dowodza. nie wiem co tam jest'], 'father')
      ] },
      father: { lines: ['jak maja zapytala o 97 to uslyszalem ze moj ojciec jest zlym czlowiekiem', 'ona tego nawet nie powiedziala. to ja sobie dopisalem'], choices: [
        sideChoice('Nie spodziewałeś się, że spyta o niego?', ['nie. nagle mowi moj ojciec, powodz, 97. a ja znam go glownie stad, z roboty', 'ten sam gosc nauczyl mnie zmieniac kolo i cofac przyczepa'], 'repair'),
        sideChoice('To dlatego kazałeś jej się odczepić?', ['tak. stanalem po jego stronie zanim w ogole zapytalem', 'to bylo moje. to co jej powiedzialem. nie starego'], 'repair')
      ] },
      repair: { choices: [
        sideChoice('Co możesz teraz zrobić konkretnie?', ['odpowiadac na pytania bez krzyku', 'i przyznac jak czegos nie wiem. idzie mi srednio'], 'finish'),
        sideChoice('Chcesz go jeszcze o coś zapytać?', ['nie obiecuje ze bedzie madrze', 'ale zapytam. bez zapowiadania mu co powinien odpowiedziec'], 'finish')
      ] },
      finish: { choices: [
        sideChoice('Daj mu opowiedzieć własnymi słowami.', ['dobra. zapisze dokladnie co powie', 'bez mojego tlumaczenia go po drodze']),
        sideChoice('Zapisz też to, co nie pasuje do tego, co wiemy.', ['dobra. jak czegos nie rozumiem to tez zapisze', 'dobra. to rozumiem'])
      ] }
    }
  },
  weronika_record: {
    who: 'weronika', title: 'Puste miejsce w zeszycie', label: 'Pamięć',
    cond: 'ev:ev_interview', preview: 'Weronika rozdziela własną pamięć od tego, co usłyszała później.',
    nodes: {
      start: { lines: ['W nagraniu Mai brzmię, jakbym pamiętała każdą minutę.', 'Nie pamiętam. Przez te lata niektóre rzeczy tyle razy opowiadałam, że stały się równie wyraźne jak to, co widziałam.'], choices: [
        sideChoice('Co widziała pani sama?', ['Jak wychodził z domu. Kaptur nie chciał mu wejść na głowę.', 'Drogi do huty nie widziałam. To ważne, żeby tego nie pomylić.'], 'notebook'),
        sideChoice('Możemy zaznaczyć, co pochodzi od innych.', ['Tak. O chłopcach mówiłam Mai, bo znałam ich z osiedla.', 'O żółtej postaci na drodze wiem z opowieści pani Mróz i z artykułu.'], 'notebook')
      ] },
      notebook: { lines: ['Miałam dwanaście lat. Prowadziłam zeszyt, w którym zapisywałam, kto dzwonił i co mówił.', 'Po powodzi przez tydzień była w nim prawie sama lista imion.'], choices: [
        sideChoice('Ma pani jeszcze ten zeszyt?', ['Mam, w domu.', 'Przejrzałam go wielokrotnie. Są telefony do sąsiadów, nazwiska szukających. Nie ma tam nowego tropu.'], 'maja'),
        sideChoice('To, co pani pamięta, już nam pomaga.', ['Maja powiedziała podobnie.', 'Poprosiła, żebym nie uzupełniała luk tylko dlatego, że nagrywa.'], 'maja')
      ] },
      maja: { choices: [
        sideChoice('Jak się zachowywała podczas rozmowy?', ['Najpierw wyłączyła dyktafon i zapytała, czy na pewno chcę.', 'Denerwowała się. Nie próbowała udawać zawodowej dziennikarki.'], 'finish'),
        sideChoice('Co pani najbardziej zapamiętała z tamtego spotkania?', ['Że ktoś usiadł i nie patrzył na zegarek.', 'I że kiedy mówiłam „nie wiem”, nie wyglądała na rozczarowaną.'], 'finish')
      ] },
      finish: { choices: [
        sideChoice('Zapiszę, co pani widziała, a co powiedziała pani Mróz.', ['Dziękuję. To uczciwsze wobec Tomka. I wobec pani Mróz.']),
        sideChoice('Przerwijmy na dziś, jeśli pani potrzebuje.', ['Jeszcze zamknę bibliotekę. Potem zrobię kolację.', 'Prawie dwudziesta, a ja znowu nie zrobiłam zakupów.'])
      ] }
    }
  },
  igor_files: {
    who: 'igor', title: 'Oryginał i kopia', label: 'Warsztat śledztwa',
    cond: 'ev:ev_igor_conf', preview: 'Igor ma przestać poprawiać rzeczy bez pytania.',
    nodes: {
      start: { lines: ['zrobiłem katalog na materiały', 'najpierw nazwałem go FINAL. potem FINAL2. sam siebie nie mogę słuchać', 'usunąłem te nazwy. pliki zostały'], choices: [
        sideChoice('Zapisz też, jak pliki były ułożone wcześniej i co przeniosłeś.', ['okej. osobny spis zmian', 'wiem jak to brzmi akurat ode mnie'], 'original'),
        sideChoice('Ustalmy zasadę: żadnych cichych poprawek.', ['tak', 'nie chcę żebyście musieli wierzyć mi na słowo kolejny raz'], 'original')
      ] },
      original: { lines: ['oryginały osobno. rozjaśnienia osobno', 'nazwa każdego pliku z którego zrobiłem wersję roboczą', 'i zapiszę że brakującą klatkę ukryłem ja. nie „błąd skanera”'], choices: [
        sideChoice('Napisz to własnymi słowami, z datą.', ['dobra. bez technicznego alibi', 'kto dostał skan i kiedy też zapiszę'], 'father'),
        sideChoice('Pokaż to też grupie, kiedy skończysz.', ['pokażę', 'kuba ma prawo zobaczyć cały opis. nie tylko fragment który mnie najmniej pogrąża'], 'father')
      ] },
      father: { choices: [
        sideChoice('Udaje ci się teraz pogadać z ojcem?', ['pytam. on milczy. ja zaczynam gadać za niego', '„może nie wiedziałeś”, „może to nie tak”. on nawet nie musi się tłumaczyć'], 'finish'),
        sideChoice('Kuba może jeszcze długo ci nie ufać.', ['wiem. w serwisie robię test, działa, oddaję. tu nie mam co kliknąć', 'kuba nawet nie odczytał mojej ostatniej. zostawię go na razie'], 'finish')
      ] },
      finish: { choices: [
        sideChoice('Zrób spis. Potem oddaj materiały bez stawiania warunków.', ['tak zrobię. nie musisz mnie za to lubić']),
        sideChoice('Zacznij od spisu. Podeślij, kiedy będzie gotowy.', ['okej. spis', 'tym razem bez drugiej wersji dla siebie'])
      ] }
    }
  },
  lena_route: {
    who: 'lena', title: 'Pętla, sześć minut', label: 'Po sprawdzeniu kursu',
    cond: 'solved:ded_bus', preview: 'Lena chce wiedzieć, jak zapisano jej relację.',
    nodes: {
      start: { lines: ['Mam sześć minut na pętli.', 'Mogę sprawdzić, czy przy moim nazwisku nie ma „rozpoznała Maję”? Brzmi głupio, ale cały czas o tym myślę.'], choices: [
        sideChoice('Jest: osoba nierozpoznana, czas przejazdu 22:18.', ['Dzięki. Właśnie tak.', 'Kolega mówi „po co się zgłaszałaś, skoro nie wiesz”. Ale nie chcę przez to udawać pewności.'], 'job'),
        sideChoice('Dopiszę wyraźnie: nie rozpoznałaś osoby.', ['Uff, dzięki.', 'Już się ludzie w autobusie pytają. Nie wiem nawet, kto im powiedział, że do was pisałam.'], 'job')
      ] },
      job: { choices: [
        sideChoice('Co pomaga ci pamiętać trasę?', ['Punkty. Lustro przy zakręcie. Nierówność przed wiatą.', 'Ludzie gorzej. Z wieczornego kursu pamiętam czasem tylko czy ktoś zdążył usiąść.'], 'home'),
        sideChoice('To twój pierwszy rok na tej trasie?', ['Tak. Zdałam, zaczęłam jeździć i tata przez miesiąc pytał codziennie o każdy zakręt.', 'Teraz tylko „kanapki masz?”. Mam 24 lata, tato 🙃'], 'home')
      ] },
      home: { lines: ['Jutro znowu będę mijać Jutrzenkę.', 'Już wiem, że spojrzę na tę wiatę. Nie wiem, czy to pomoże w czymkolwiek.'], choices: [
        sideChoice('Jak coś sobie przypomnisz, napisz osobno. Bez zgadywania.', ['Nie będę. Jeśli przypomnę sobie coś konkretnego, zapiszę oddzielnie od tego co już powiedziałam.'], 'finish'),
        sideChoice('Mamy godzinę i twoją relację. Tyle na razie {zapisałem|zapisałam}.', ['Dobra. Jak ktoś zapyta o godzinę przejazdu, mam dokumenty. Nie musi wierzyć mi na słowo.'], 'finish')
      ] },
      finish: { choices: [
        sideChoice('Dzięki. Spokojnej trasy.', ['Dzięki. Przerwa się skończyła.', 'Odpiszę dopiero na następnej pętli.']),
        sideChoice('Jedź spokojnie. Poczekamy na odpowiedź.', ['Dzięki. Na grupie rodzinnej już pytają, czemu nie odpisuję.', 'Jadę. Telefon do schowka.'])
      ] }
    }
  },
  maja_aftercare: {
    who: 'maja', title: 'Nie muszę dzisiaj opowiadać', label: 'Listopad',
    cond: s => !!s.finished && !!s.flags.majaFound,
    preview: 'Maja pisze już sama. Nie każda rozmowa musi dotyczyć sztolni.',
    nodes: {
      start: { lines: ['hej. mam dziś dzień na zwykłe rzeczy', 'nie na wywiad o tym co się stało', 'kuba mówi że można ci to po prostu napisać'], choices: [
        sideChoice('Można. O czym chcesz pogadać?', ['gips łapie okruszki. odkurzanie prawej ręki, nowy punkt dnia 💀', 'a wszyscy mi mówią że jestem dzielna. ja chcę tylko otworzyć jogurt bez nożyczek'], 'photo'),
        sideChoice('Nie musisz dzisiaj niczego opowiadać.', ['dzięki', 'ludzie pytają czy już wszystko okej. ile razy można odpisywać że jeszcze nie'], 'photo')
      ] },
      photo: { lines: ['zrobiłam zdjęcie zlewu. palce lewej ręki w ogóle mnie nie słuchają', 'prowadzący zapytał czy wrócę do projektu. powiedziałam że nie wiem'], choices: [
        sideChoice('Możesz robić zdjęcia bez kończenia tamtego projektu.', ['no. nawet mi się to zdjęcie zlewu podoba', 'kran wyszedł krzywo. nazwę to decyzją artystyczną i lecimy dalej'], 'room'),
        sideChoice('„Nie wiem” też jest odpowiedzią.', ['chyba pierwszy raz jej nie poprawiłam od razu na „oczywiście”'], 'room')
      ] },
      room: { lines: ['mama zostawia otwarte drzwi do mojego pokoju', 'ja czasem je zamykam. wtedy puka po minucie'], choices: [
        sideChoice('Chcesz z nią ustalić, kiedy ma zaglądać?', ['spróbuję. ona też się boi', 'tylko chciałabym móc być sama bez uspokajania całego domu'], 'future'),
        sideChoice('Powiedziałaś jej, że chcesz chwilę pobyć sama?', ['tak. przeprosiłam ją za to trzy razy. bez sensu, wiem'], 'future')
      ] },
      future: { choices: [
        sideChoice('Notatki Rybickiego mogą poczekać.', ['tak. stoi pod biurkiem, przykryłam je bluzą', 'kiedyś je otworzę. chcę żeby to była moja decyzja'], 'finish'),
        sideChoice('Jaki jest plan na jutro?', ['kupić zeszyt. zwykły, bez wielkiego tytułu na okładce', 'i wyjść po niego sama jeśli będę chciała'], 'finish')
      ] },
      finish: { choices: [
        sideChoice('Napisz też wtedy, kiedy nie będzie żadnej zagadki.', ['dobra. ostrzegam że zdjęć zlewu będzie więcej']),
        sideChoice('Dzięki za zwykłą rozmowę.', ['też dzięki. to jutro zdjęcie zlewu z innego kąta'])
      ] }
    }
  },
  kuba_november: {
    who: 'kuba', title: 'Nie sprawdzam co minutę', label: 'Listopad',
    cond: s => !!s.finished && !!s.flags.majaFound,
    preview: 'Kuba próbuje wrócić na zajęcia i oddać siostrze przestrzeń.',
    nodes: {
      start: { lines: ['poszedłem na laborki', 'prowadzący nie zapytał gdzie byłem. po prostu dał mi zadanie', 'i się prawie popłakałem nad tym głupim zadaniem'], choices: [
        sideChoice('Dobrze było mieć zwykłe zadanie?', ['tak. przez czterdzieści minut chodziło tylko o to że mi nie działa kod', 'potem zadzwoniłem do mai. oczywiście'], 'space'),
        sideChoice('Nie musisz od razu nadrabiać wszystkiego.', ['wiem. dziekanat też tak powiedział', 'ale mail „przypominam o projekcie” dalej mnie składa. dzięki uczelnio 💀'], 'space')
      ] },
      space: { lines: ['maja wyłączyła udostępnianie lokalizacji', 'pierwsza myśl: jak mogła', 'druga: kurde kuba. jak mogłeś w ogóle tak pomyśleć'], choices: [
        sideChoice('Nie proś jej, żeby znowu włączyła lokalizację.', ['próbuję jej o to nie prosić', 'umówiliśmy się że napisze kiedy chce. nie co godzinę'], 'repair'),
        sideChoice('Powiedziałeś jej o tym?', ['tak. powiedziała „jestem twoją siostrą a nie paczką do śledzenia”', 'strasznie się za nią stęskniłem. nawet jak jest wredna'], 'repair')
      ] },
      repair: { choices: [
        sideChoice('A co robisz dla siebie?', ['mam oddać koledze pada. trzymam od czerwca', 'zaprosił mnie na granie. chyba pójdę'], 'finish'),
        sideChoice('I jak sprawa ładowarki? Nadal jej podbierasz?', ['tak. kupiliśmy jeden dłuższy kabel do ładowarki', 'teraz mogę legalnie podpiąć telefon. postęp cywilizacyjny'], 'finish')
      ] },
      finish: { choices: [
        sideChoice('Idź pograć. Telefon może chwilę poleżeć.', ['okej. dzięki że nie robisz z tego zadania domowego']),
        sideChoice('Daj znać czasem, jak ci idzie.', ['dam. może następnym razem bez sprawy kryminalnej na początek'])
      ] }
    }
  },
  kuba_missing: {
    who: 'kuba', title: 'Zostajemy przy sprawdzalnym', label: 'Listopad',
    cond: s => !!s.finished && s.vars.endingId === 'cisza',
    preview: 'Poszukiwania Mai trwają. Kuba potrzebuje pomocy, która nie jest kolejną plotką.',
    nodes: {
      start: { lines: ['ktoś wysłał mamie zdjęcie dziewczyny z dworca', 'znowu „na sto procent maja”', 'zdjęcie sprzed dwóch lat. nawet nie ten kraj'], choices: [
        sideChoice('Zachowaj wiadomość i zapisz, skąd jest zdjęcie. Nie rozsyłaj go jako dowodu, że to Maja.', ['tak zrobiliśmy', 'nie chcę za każdym razem mówić mamie, że to jednak nie maja'], 'support'),
        sideChoice('Jak mama się po tym trzyma?', ['mówi że dobrze. robi obiad na trzy osoby', 'ja też mówię że dobrze. bez sensu rozmowa'], 'support')
      ] },
      support: { lines: ['jestem w kontakcie z ludźmi od poszukiwań spoza mgliska', 'przekazaliśmy im materiały. nie chcę już czekać aż gajda powie co sprawdził'], choices: [
        sideChoice('Potrzebujesz pomocy z uporządkowaniem tego, co już mamy?', ['tak. daty i skąd co pochodzi', 'nie nowej teorii na siłę'], 'day'),
        sideChoice('Dobrze, że ktoś spoza miejscowości dostał kopie.', ['teraz chociaż wiem że nie są tylko w jednym telefonie'], 'day')
      ] },
      day: { choices: [
        sideChoice('Nie wiem, kiedy ją znajdziemy. Nie będę udawać, że wiem.', ['dzięki. tego „na pewno się znajdzie jutro” już nie wytrzymuję'], 'finish'),
        sideChoice('Nie będę rozsyłać tego zdjęcia. Jestem tu, jeśli chcesz pogadać.', ['okej. jutro mogę się odezwać tak po prostu? bez tego że coś znalazłem'], 'finish')
      ] },
      finish: { choices: [
        sideChoice('Napisz także wtedy, kiedy chcesz po prostu pogadać.', ['dobra. dziś tylko tyle. mama woła']),
        sideChoice('Jutro możemy wrócić do materiałów.', ['możemy. bez obietnic że to będzie ten jeden przełom', 'do jutra'])
      ] }
    }
  }
});
