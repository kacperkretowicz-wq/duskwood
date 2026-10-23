'use strict';
/* SPRAWA 2 „MOST” — Akt IV „Strona 41” (sesje 19–24) i Akt V „Pełny kadr” (sesje 25–30) z trzema finałami.
   Plan: docs/SPRAWA-2-PLAN.md §5–6. Żaden finał nie nagradza naruszania prywatności jako skrótu do prawdy. */

Engine.chapter('m4', { num: 4, kicker: 'Sprawa 2 · Rozdział 4', title: 'Strona 41', when: 'Poniedziałek, 30 listopada · 8:20', mood: 'calm' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, callIn, callEnd, scene, notify, vanish } = D;
  const IK = t => say('blyskm', 'blyskm', t, { vanish: true });
  const V = (chat, who, dur, text, from = '') => say(chat, who, `voice:${dur}|${from}|${text}`);
  const Ma = (t, o) => say('marta', 'marta', t, o);
  const Nt = (t, o) => say('natan', 'natan', t, o);
  const Z = (t, o) => say('zuza', 'zuza', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);
  const H = t => say('call', 'henryk', t);
  const c = (who, t) => say('call', who, t);

  return [
    clock('2026-11-30T08:20'),
    title(),
    Ma('Dzień dobry. Byłam u naczelnego o 7:45. Powiedziałam wszystko: że to moja mama, że opowiadałam o kasecie przy kolacji, że tablet jest wspólny.'),
    Ma('Zabrał mi dostęp do tego materiału do czasu decyzji. Słusznie.'),
    Ma('Mama nie odbiera ode mnie od soboty. Wczoraj zostawiła mi obiad pod drzwiami. Nie wiem, co to znaczy.'),
    choose('marta', [
      opt('Dobrze, że powiedziałaś. Pewnie było ci trudno.', [Ma('Bałam się wejść do jego gabinetu. Ale nie mogłam dalej tego ukrywać.')], { trust: { marta: 1 } }),
      opt('Dobrze, że naczelny wie. Co dalej z tekstem?', [Ma('Dalej Natan. Ja mogę tylko odpowiadać na pytania o archiwum.')])
    ]),
    scene('xObiad', [
      pause(1500),
      pic('marta', 'marta', 'm_obiad_drzwi', 'Od soboty śpię u koleżanki z redakcji. Mama wczoraj przywiozła to pod jej drzwi. Gołąbki i ogórki.'),
      choose('marta', [
        opt('To chyba znaczy, że dalej jesteś jej córką.', [Ma('Może. Zjadłam dwa. Smakowały jak w podstawówce.')], { trust: { marta: 1 } }),
        opt('Zadzwoń do niej, kiedy będziesz gotowa.', [Ma('Nie dziś. Ale słoik oddam osobiście. Zawsze to jakiś pretekst.')])
      ])
    ]),
    scene('xLicznik', [
      pause(2500),
      Ma('Jeszcze jedno. Nagrałam to w piątek w nocy w archiwum, zanim oddałam klucze. Nikomu tego nie pokazywałam.'),
      say('marta', 'marta', '', { vid: 'assets/video/v_licznik.mp4', img: 'v_licznik' }),
      Ma('Taśma stanęła sama. Bez pilota, bez nikogo. I czerwona dioda mrugnęła raz.'),
      choose('marta', [
        opt('Stare kamery same się wyłączają na końcu taśmy.', [Ma('Wiem. Tylko że to nie był koniec taśmy. Licznik stanął na 03:51, dokładnie tam, gdzie urywa się fragment z publikacji.')]),
        opt('Nie siedź tam sama po nocach.', [Ma('Już nie siedzę. Nie mam nawet klucza.')], { trust: { marta: 1 } })
      ]),
      pause(4000),
      callIn('natan'),
      c('natan', 'cześć, nie chce mi się pisać, ręce mi marzną. siedzę w aucie pod inspekcją'),
      c('natan', 'mam akta. zaraz ci wyślę zdjęcia, tylko daj mi się ogrzać'),
      callEnd()
    ]),
    scene('xSzyba', [
      pause(1500),
      say('natan', 'natan', '', { vid: 'assets/video/v_szyba.mp4', img: 'v_szyba' }),
      Nt('ogrzewanie w tym aucie działa tylko na szybę. stopy mam jak lody')
    ]),
    scene('xInspekcja', [
      pause(2000),
      pic('natan', 'natan', 'm_inspekcja', 'moje biuro na dziś. kawa ze stacji smakuje jak gorąca woda z kartonu'),
      choose('natan', [
        opt('Ogrzej się. Akta nie uciekną.', [Nt('akta nie. ale czytelnię zamykają o 15, a pani w okienku patrzy na mnie jak na ucznia bez legitymacji')]),
        opt('Ile zdjęć zrobiłeś?', [Nt('63. połowa krzywo. ale wszystko da się przeczytać')])
      ])
    ]),
    pause(2500),
    Nt('hej. naczelny wystąpił do inspekcji pracy we wrocławiu o akta wypadku z 2011. jako redakcja, oficjalnie, z powołaniem na dostęp do informacji'),
    Nt('i sorry że tak szybko ale już mamy. pojechałem rano, dali mi czytelnię na godzinę'),
    pic('natan', 'natan', 'most_oip_s41', 'kopia str 41 która firma dała inspekcji 19.09.2011'),
    give('ev_m_oip_s41'),
    Nt('i patrz. tu jest „bez uwag”. zero o siatce. a pismo inne niż na ksero'),
    choose('natan', [
      opt('Zanim cokolwiek napiszemy: kto przystawił „za zgodność”?', [
        Nt('j. kurek. kierowniczka kontraktu. 19.09.2011'),
        Ma('Pięć dni po wypadku. Czyli nie podrobione ksero, tylko przepisany oryginał.')
      ], { set: { m_askedStamp: true } }),
      opt('Ta strona jest przepisana. Pismo inne niż na ksero, a „za zgodność” potwierdziła sama kierowniczka kontraktu.', [
        Nt('tak. j. kurek, 19.09.2011. pięć dni po wypadku'),
        Ma('Pismo różni się od tego na obu kopiach. Samo porównanie nie wystarczy, żeby ustalić, kto pisał. Ale wiemy, kto potwierdził zgodność.')
      ], { set: { m_rewriteSeen: true } })
    ]),
    set('m_rewriteSeen'),
    give('ev_m_rewrite'),
    scene('xSiatka', [iff('flag:m_netSeen', [Ma('Na tym zdjęciu z notesu, z mlekiem na desce, też nie było siatki. Teraz wiemy, że brak siatki zgłoszono przed wypadkiem.')])]),
    Nt('i jeszcze protokół powypadkowy. wykaz załączników'),
    pic('natan', 'natan', 'most_oip_protokol', 'punkt 3'),
    give('ev_m_oip_protokol'),
    Nt('„3. protokół zgłoszenia — brak w aktach”. to jest ten załącznik nr 3. był na liście, ale w aktach go nie ma'),
    Nt('i zobacz kto był w zespole powypadkowym. h. wiśniewski, przedstawiciel pracowników'),
    pause(2000),
    callIn('henryk'),
    H('Wiśniewski. Sylwia mówi, że w gazecie mają te papiery z Wrocławia.'),
    H('Ja podpisałem ten protokół. Bo kazali. Ale napisałem przy trzecim „brak”. Sam. Żeby było.'),
    H('Pan Darek tego dnia był trzeźwy. Ja to powiedziałem inspektorowi. Inspektor zapisał. Potem już nikt nie pytał.'),
    choose('call', [
      opt('Czy powie pan to samo pod nazwiskiem, w redakcji? Nikt nie utnie. Będzie całe.', [
        H('Całe?'),
        H('…'),
        H('To powiem. Ale niech ten młody przyjdzie do mnie. Nie ja do niego. I niech ma kamerę porządną.')
      ], { set: { m_henrykOnRecord: true }, trust: { henryk: 1 } }),
      opt('Nie musi pan już nic mówić. Dokumenty wystarczą.', [
        H('No… dobrze. Jak dokumenty wystarczą.'),
        H('To ja nic nie mówię. Raz już mówiłem.')
      ], { set: { m_henrykQuiet: true } })
    ]),
    callEnd(),
    give('ev_m_henryk_oip'),
    scene('xHenrykSms2', [
      pause(1500),
      iff('flag:m_henrykOnRecord', [say('henryk_sms', 'henryk', 'NIECH MŁODY PRZYJDZIE W ŚRODĘ. PO DZIENNIKU. HERBATA BĘDZIE.')], [say('henryk_sms', 'henryk', 'DOKUMENTY TO DOKUMENTY. DOBRANOC.')])
    ]),
    scene('xIdaBlysk', [iff('flag:m_idaTrust', [
      pause(5000),
      clock('2026-11-30T23:12'),
      notify({ app: 'messages', title: 'Błysk', text: 'i.k_00 wysyła ci wiadomość. Zniknie po przeczytaniu.', sound: 'notif', open: { chat: 'blyskm' } }),
      IK('widziałam, że natan był w inspekcji'),
      IK('jutro mam rozmowę z naczelnym. o tych 40 sekundach. boję się bardziej niż przed maturą'),
      IK('jak mnie wyrzucą, pojadę na ferie do dziadka i będę z nim oglądać jego stare kasety. on ma ich cały pokój'),
      choose('blyskm', [
        opt('Zrób zrzut ekranu', [
          IK('serio? teraz?'),
          IK('ok. to już nic nie piszę'),
          vanish('blyskm', 'Wiadomości zniknęły. i.k_00 cię zablokował(a).')
        ], { shot: true, set: { m_shotIda2: true } }),
        opt('Dobrze, że sama do niego idziesz.', [
          IK('nie czuję się dobrze. ale jest mi trochę lżej'),
          IK('dzięki, że wtedy nie zrobił{eś|aś} zrzutu'),
          vanish('blyskm')
        ], { set: { m_idaKind: true } })
      ])
    ])]),
    pause(2500),
    clock('2026-12-01T19:10'),
    scene('xZuzaGlos', [
      V('zuza', 'zuza', '0:18', 'sorry, że głosówka, idę ze szkoły i marzną mi palce. babcia od rana ogląda tylko teleturnieje. jak ktoś w telewizji powie „most”, od razu przełącza', 'Zuza'),
      choose('zuza', [
        opt('Niech ogląda teleturnieje. Też trzeba odpocząć.', [Z('ona mówi, że przynajmniej tam wiadomo, kto wygrał')]),
        opt('Załóż rękawiczki, zanim odpiszesz.', [Z('nie mam. zgubiłam w autobusie. trzecie w tym roku')])
      ]),
      pause(2000)
    ]),
    Z('hej'),
    Z('widziałam artykuł że jest jakaś przepisana strona'),
    Z('powiedz mi jedno. czy ktoś wujka zabił'),
    choose('zuza', [
      opt('Nie mamy dowodu, że ktoś go zabił. Wiemy, że spadł z przęsła, brak siatki zgłoszono wcześniej, a potem przepisano stronę dziennika.', [
        Z('ok'),
        Z('dziwne że mi ulżyło i jednocześnie nie'),
        Z('babcia całe życie bała się że to było coś gorszego. albo że to jego wina')
      ], { set: { m_toldZuzaTruth: true } }),
      opt('Nie ma dowodu, że ktoś go zabił. Ale chcesz to usłyszeć ode mnie, zanim przeczytasz w gazecie, czy razem z babcią?', [
        Z('razem z babcią'),
        Z('ona sama nie przeczyta. ja jej przeczytam na głos'),
        D.choose('zuza', [opt('Dobrze. Ja poczekam na znak od ciebie.', [Z('dzięki że {zapytałeś|zapytałaś}')])])
      ], { set: { m_toldZuzaTruth: true, m_zuzaWithGran: true } })
    ]),
    scene('xGrupaArt', [
      pause(2000),
      say('group', 'ola', 'Czytaliście? Piszą, że ktoś przepisał stronę z dziennika budowy.'),
      say('group', 'bartek', 'czyli henryk mial racje. stary otworzyl z tej okazji bezalkoholowe'),
      say('group', 'kuba', 'pani weronika płakała w bibliotece. mówi, że ze szczęścia, ale nie wiem'),
      say('group', 'ola', 'Kuba, zanieś jej herbatę.'),
      say('group', 'kuba', 'zaniosłem. dała mi ciastko. chyba jest ok'),
      choose('group', [
        opt('Dobrze, że ktoś przy niej jest w tej bibliotece.', [say('group', 'kuba', 'no. lubię tam siedzieć. cisza i dobre wifi')], { set: { m_kubaLibrary: true } }),
        opt('Tekst jeszcze nie wyszedł. To tylko zapowiedź.', [say('group', 'ola', 'Wiem. Ale i tak lepiej niż tamto nagranie.')])
      ])
    ]),
    pause(2500),
    clock('2026-12-02T21:40'),
    Ma('Naczelny zdecydował. Mogę dalej sprawdzać materiały z archiwum do tego tekstu albo się z niego wycofać. Decyzja ma być moja.'),
    Ma('Jeśli zostanę, ktoś drugi sprawdzi wszystko, co przygotuję. W tekście napiszemy też, że moja mama jest w zarządzie Kurek-Bud.'),
    Ma('Jeśli odejdę od tematu, Natan będzie pracował sam. Zajmie mu to więcej czasu. Dotąd przeglądaliśmy kasetę razem.'),
    Ma('Co by {Pan|Pani} zrobił{|a}?'),
    choose('marta', [
      opt('Zostań. Napiszcie w tekście, kim jest twoja mama, i niech ktoś sprawdza twoje ustalenia. Znasz taśmę najlepiej.', [
        Ma('Dobrze. Wtedy już nie ma odwrotu. W domu też'),
        Ma('Mama dowie się z gazety, że wiem. Wolę, żeby z gazety niż z tabletu')
      ], { set: { m_martaStays: true } }),
      opt('Wycofaj się z tego tekstu. Przez twoje pokrewieństwo z Kurek mogą podważać ustalenia.', [
        Ma('Rozumiem. Boli, ale rozumiem.'),
        Ma('Przekażę Natanowi wszystkie znaczniki czasu. 03:12, 03:21, 03:47. Resztę zrobi sam.')
      ], { set: { m_martaOut: true } })
    ]),
    scene('xSloik', [
      pause(2000),
      V('marta', 'marta', '0:16', 'Oddałam mamie słoik. Otworzyła drzwi, wzięła go i zapytała: „Umyty?”. I tyle. Ale chyba się uśmiechnęła. Chyba.', 'Marta'),
      choose('marta', [
        opt('Jak na pierwszy krok to sporo.', [Ma('Też tak myślę. W niedzielę idę na obiad. Bez tabletu na stole.')]),
        opt('A ty jak się czujesz?', [Ma('Jakbym zdała egzamin, z którego nikt nie wystawia ocen.')], { trust: { marta: 1 } })
      ])
    ]),
    W('Dobry wieczór. Pani Marta była u mnie po kamerę. Długo stała w przedpokoju.'),
    W('Poprosiła, żeby kaseta dalej leżała u mnie. Jak dawniej u pana Adama: dopóki nie będzie wiadomo, komu ją oddać.'),
    give('ev_m_chain'),
    W('Jeszcze jedno, drobiazg. Kuba Wrona pytał mnie dziś w bibliotece, czy pan Adam też trzymał wszystko „w chmurze”, jak Maja. Powiedziałam, że nie wiem. On tylko kiwnął głową.'),
    scene('xWeronikaKuba', [
      choose('weronika', [
        opt('Może chce coś zabezpieczyć po Mai.', [W('Może. Dobry z niego chłopak. Tylko ostatnio jakiś zmęczony. Mówi, że to nocki.')]),
        opt('Dobrze, że pani to zapamiętała.', [W('Zapisuję takie rzeczy w zeszycie. Nauczyłam się od pana Adama.')])
      ])
    ]),
    set('m_act4'),
    end('m5')
  ];
});

Engine.chapter('m5', { num: 5, kicker: 'Sprawa 2 · Rozdział 5', title: 'Pełny kadr', when: 'Piątek, 4 grudnia · 16:05', mood: 'calm' }, D => {
  const { say, pic, pause, choose, opt, give, set, iff, end, title, clock, dial, callIn, callEnd, notify, ending, credits, run, scene, camera, nearby } = D;
  const V = (chat, who, dur, text, from = '') => say(chat, who, `voice:${dur}|${from}|${text}`);
  const Ma = (t, o) => say('marta', 'marta', t, o);
  const Nt = (t, o) => say('natan', 'natan', t, o);
  const Z = (t, o) => say('zuza', 'zuza', t, o);
  const S = (t, o) => say('sylwia', 'sylwia', t, o);
  const W = (t, o) => say('weronika', 'weronika', t, o);
  const c = (who, t) => say('call', who, t);

  return [
    clock('2026-12-04T16:05'),
    title(),
    Nt('ok. naczelny chce wypuścić tekst w poniedziałek. „strona 41” roboczo'),
    scene('xGaleria', [
      pause(2000),
      Z('hej. babcia pyta czy masz jakieś zdjęcie mostu. mówi że nie była tam od 2011'),
      camera('zuza', [
        opt('Z galerii: klatka z kroniki, 2011', [Z('babcia od razu poznała barierkę'), Z('powiedziała tylko „no tak” i poszła nastawić wodę')], { img: 'm_kadr_siatka', gallery: true, set: { m_granSaw2011: true } }),
        opt('Z galerii: zdjęcie czytelnika z 2011', [Z('mówi że wtedy stała tam jeszcze stara latarnia. teraz jest nowa i za jasna')], { img: 'most_2011', gallery: true }),
        opt('Z galerii: pies naczelnego na radiu', [Z('xD babcia się śmieje. pierwszy raz od tygodnia'), Z('mówi że to nie jest most ale niech będzie')], { img: 'm_mem_radio', gallery: true, set: { m_granLaughed: true } })
      ])
    ]),
    Nt('i jest problem. tygodnik zapowiada na jutro „kim jest tajemnicza K.”. ktoś im dał cytat z notesu, ten co ja wtedy usunąłem'),
    scene('xMleko', [iff('flag:m_milkLink', [Nt('pamiętasz to zdjęcie z mlekiem na desce? jak ktoś zestawi je z tym cytatem, w mglisku w godzinę będą wiedzieć, kim jest K.')])]),
    Nt('naczelny pyta czy nie wyprzedzić ich dziś. z notesem. „k. przyniosła ksero, dziękuje za mleko”. mówi że to najmocniejszy dowód że ksero jest z 2011'),
    choose('natan', [
      opt('Nie. Ten cytat wskazuje panią Krystynę każdemu, kto ją zna. Ksero mamy potwierdzone kopią Henryka i aktami z inspekcji.', [
        Nt('wiem. sorry. chciałem tylko żeby ktoś to powiedział na głos zanim on mnie przekona'),
        Nt('ok. bez notesu')
      ], { set: { m_protectK: true } }),
      opt('Wyprzedźcie ich. Jak tygodnik i tak to da, lepiej, żeby było rzetelnie u was.', [
        Nt('…'),
        Nt('ok. dam znać naczelnemu')
      ], { set: { m_leakK: true } })
    ]),
    iff('flag:m_leakK', [
      pause(3000),
      notify({ app: 'browser', title: 'Gazeta Sudecka', text: 'Strona 41. Jak przepisano dziennik robót z mostu nad Mglicą', sound: 'notif' }),
      set('m_published'),
      pause(2500),
      Z('wy wpisaliście tam mleko'),
      Z('sąsiadka przyszła do babci po godzinie. „to pani, krysiu, prawda?”'),
      Z('babcia zamknęła się w pokoju. powiedziała, że nie będzie już ze mną rozmawiać o wujku. w ogóle'),
      Z('dlaczego'),
      Ma('Przeczytałam. Odchodzę z redakcji. Nie chcę już tam pracować po tym, co opublikowali.'),
      run(s => { s.vars.s2Ending = 'cudzy_podpis'; }),
      ending('cudzy_podpis'),
      credits()
    ]),
    pause(2000),
    Z('hej'),
    Z('babcia mówi że chce pogadać. z tobą. nie z gazetą'),
    Z('tylko przez stacjonarny. chce ustalić, co może być w tekście, a co nie'),
    Z('ona się po prostu boi'),
    Z('numer 74 873 52 06. dzwoń po piątej, po dzienniku'),
    give('ev_m_krystyna_tel', { silent: true }),
    dial({
      goal: 'Zadzwoń do pani Krystyny Kruk na stacjonarny (numer od Zuzy, 74 873 52 06).',
      goalHints: [],
      numbers: {
        '74 873 52 06': {
          who: 'krystyna', then: [
            c('krystyna', 'Kruk, słucham.'),
            choose('call', [opt('Dobry wieczór. Dzwonię od Zuzy. W sprawie strony 41 i tekstu w gazecie.', [])]),
            c('krystyna', 'Wiem. Zuzia mówiła. Proszę mi tylko jasno odpowiedzieć.'),
            c('krystyna', 'Czy w tej gazecie będzie, że to ja?'),
            choose('call', [
              opt('Nie. Ani nazwiska, ani mleka, ani niczego, po czym sąsiadki by panią poznały. Ksero potwierdzamy kopią pana Henryka i aktami z Wrocławia.', [
                c('krystyna', 'To dobrze.'),
                c('krystyna', 'Panu Adamowi też tak mówiłam. On dotrzymał. Piętnaście lat.'),
                c('krystyna', 'To niech piszą. Że Darek był trzeźwy, tak jak mówi pan Henryk. Że nie było siatki. Że potem przepisano stronę dziennika. Tego chcę.'),
                c('krystyna', 'O mnie nic. O Darku — tak.')
              ], { set: { m_krystynaOk: true } }),
              opt('To zależy od redakcji. Ale byłoby mocniej, gdyby pani powiedziała, że to pani dała ksero.', [
                c('krystyna', 'Mocniej.'),
                c('krystyna', 'Ja piętnaście lat mówię „wypadek w pracy”, bo obiecałam sobie, że nikt mnie nie będzie pokazywał palcami.'),
                c('krystyna', 'Nie. Proszę już nie dzwonić. Do widzenia.')
              ], { set: { m_krystynaNo: true } })
            ]),
            callEnd()
          ]
        }
      }
    }),
    pause(2500),
    iff('flag:m_krystynaOk', [Z('babcia wyszła z pokoju i zrobiła naleśniki. to dużo znaczy u nas'), Z('dzięki')], [Z('babcia powiedziała że już nie chce. ok. to jest ok'), Z('tylko szkoda')]),
    scene('xZnicz', [
      pause(3000),
      clock('2026-12-05T16:20'),
      nearby('m_znicz', { device: 'Telefon', img: 'm_znicz_most', note: 'Nieznane urządzenie w pobliżu', flag: 'm_zniczOk', declineFlag: 'm_zniczNo' }),
      iff('flag:m_zniczOk', [
        Z('to ja. widzę cię z drugiej strony mostu')
      ], [
        Z('to byłam ja, z drugiej strony mostu. sorry, że wysłałam przez przesyłanie'),
        pic('zuza', 'zuza', 'm_znicz_most', '')
      ]),
      iff('flag:m_krystynaOk', [
        Z('babcia zapaliła znicz. pierwszy raz od 2011. nie chciała, żeby ktoś podchodził, więc nie machałam')
      ], [
        Z('zapaliłam znicz. babcia nie chciała iść, ale dała mi zapałki. to już coś')
      ]),
      Z('te goździki ktoś przywiązał wcześniej. babcia mówi, że nie ona. przypomina ci to coś?'),
      choose('zuza', [
        opt('Pan Henryk mówił, że sam by Darka zdjął z rusztowania. Może to on.', [
          Z('babcia też tak myśli. mówi, że co roku we wrześniu ktoś tu przywiązuje goździki, a ona myślała, że to firma'),
          Z('pójdzie mu podziękować. kiedyś. może')
        ], { set: { m_henrykFlowers: true } }),
        opt('Może Kurek-Bud? „Z szacunkiem wspomina zmarłego pracownika”.', [
          Z('babcia się zaśmiała. pierwszy raz od dawna'),
          Z('mówi, że firma dałaby wieniec z szarfą, a nie goździki na sznurku')
        ]),
        opt('Nie wiem. Niech to zostanie czyjąś tajemnicą.', [Z('babcia powiedziała to samo. słowo w słowo')])
      ])
    ]),
    S('Dzień dobry. Pan Henryk był u mnie w salonie. Siedział godzinę i pił herbatę.'),
    scene('xSalon', [
      pic('sylwia', 'sylwia', 'm_salon_herbata', 'Zostawił czapkę. Trzeci raz w tym miesiącu. Odniosę mu jutro, i tak mam po drodze.'),
      choose('sylwia', [
        opt('Może zostawia ją specjalnie, żeby mieć po co wrócić.', [S('Może. Pani Basia robiła tak samo z parasolką. Byli siebie warci.')]),
        opt('Jak on się trzyma?', [S('Lepiej niż tydzień temu. Dziś nawet żartował z moimi klientkami.')])
      ])
    ]),
    iff('flag:m_henrykOnRecord', [S('Natan nagrał z nim rozmowę, całą.')], [S('Z Natanem nie chciał rozmawiać. Do mnie przyszedł sam.')]),
    S('Henryk pyta, czy jak gazeta wyjdzie w poniedziałek, to ja w grupie coś przypnę. On mówi „sprostowanie”, jakby to było z urzędu.'),
    S('Ja mogę przypiąć dziś. Albo poczekać na tekst i wtedy dać link. Co {Pan|Pani} myśli?'),
    choose('sylwia', [
      opt('Dziś. Najpierw sprostowanie dla pana Henryka, żeby ludzie przestali go wyzywać, potem tekst.', [
        S('Dobrze. Napiszę od siebie, krótko. „Nagranie z mostu było ucięte. Słowa «moja wina» pan Henryk przytaczał jako cudzą wypowiedź. Przepraszam, że udostępniałam tu ten fragment bez sprawdzenia.”'),
        S('I wyłączę komentarze pod tym jednym. Niech raz będzie spokój.')
      ], { set: { m_correctionFirst: true } }),
      opt('Poczekaj na tekst. Lepiej z linkiem do całości.', [
        S('Rozumiem. Tylko że do poniedziałku jeszcze dwa dni komentarzy.'),
        S('No nic. Poczekam.')
      ], { set: { m_correctionLater: true } })
    ]),
    pause(3000),
    clock('2026-12-07T07:00'),
    notify({ app: 'browser', title: 'Gazeta Sudecka', text: 'Strona 41. Jak przepisano dziennik robót z mostu nad Mglicą', sound: 'notif', open: { page: 'gs_strona41' } }),
    set('m_published'),
    Nt('wyszło. 7:00'),
    V('natan', 'natan', '0:12', 'nie spałem od czwartej. mama zadzwoniła, że kupiła trzy egzemplarze. jeden dla cioci w Kanadzie. ciocia ma internet', 'Natan'),
    scene('xPaczki', [
      Nt('naczelny kupił całej redakcji pączki. pierwszy raz od 2019'),
      choose('natan', [
        opt('Należą wam się.', [Nt('mnie nie bardzo. ale zjadłem dwa')]),
        opt('A korekta pod starym nagraniem?', [Nt('jest. zaraz ci wkleję. pisałem ją dłużej niż cały tekst')])
      ])
    ]),
    Nt('i pod starym nagraniem jest korekta, moje nazwisko. „opublikowaliśmy fragment ucięty z dłuższej wypowiedzi, bez weryfikacji. odpowiedzialność ponosi autor”'),
    scene('xNatanKorekta', [
      Nt('mama pyta, czy to wstyd, że pod moim nazwiskiem jest korekta'),
      choose('natan', [
        opt('Wstydem byłoby jej nie dać.', [Nt('naczelny powiedział to samo. tylko dłużej')]),
        opt('To uczciwe. Ludzie to zapamiętają.', [Nt('oby. a jak nie, to chociaż ja zapamiętam')])
      ])
    ]),
    iff('flag:m_henrykOnRecord', [Nt('henryk w całości, 14 minut. nic nie ciąłem. nawet kaszlu')], [Nt('bez henryka. same dokumenty. naczelny mówi że to i tak dużo, ale część pytań zostaje otwarta')]),
    iff('flag:m_martaStays', [Ma('Na dole jest zdanie o mnie. Że jestem córką. Przeczytałam je pięć razy. Jest prawdziwe.')], [Ma('Przeczytałam w autobusie. Natan dobrze to zrobił. Beze mnie.')]),
    scene('xGrupaWyszlo', [
      pause(1500),
      say('group', 'bartek', 'henryk dostal brawa w sklepie. w kolejce po chleb. serio'),
      say('group', 'ola', 'Mama wycięła artykuł i przykleiła na lodówkę. Obok mojego świadectwa z podstawówki.'),
      pic('group', 'ola', 'm_lodowka', 'Dowód.'),
      say('group', 'kuba', 'maja wrzuciła to na kwartał. 3 lajki. jeden mój'),
      choose('group', [
        opt('Dwa pozostałe to pewnie pani Weronika i pani Ziuta.', [say('group', 'kuba', 'xD kotka ma konto. serio. maja jej założyła')]),
        opt('Dobrze, że tym razem wszyscy poczekali na całość.', [say('group', 'ola', 'Nie wszyscy. Ale więcej osób niż w listopadzie.')])
      ])
    ]),
    W('Kasetę i obie kopie strony 41 przechowuje teraz redakcja. Razem z panią Martą i rodziną pana Adama podpisaliśmy protokół przekazania. Teczka wróciła do pudła, już bez kasety.'),
    scene('xMajaRano', [
      say('maja2', 'maja', 'czytam w autobusie. trzeci raz'),
      say('maja2', 'maja', 'pan Adam by się ucieszył. pani Weronika mówi, że powtarzał: najlepszy tekst to taki, po którym nikt nie musi się wstydzić. ani bohater, ani autor'),
      choose('maja2', [
        opt('A ty? Jak się czujesz po tym wszystkim?', [say('maja2', 'maja', 'lepiej niż w listopadzie. dużo lepiej'), say('maja2', 'maja', 'i pierwszy raz od dawna nie boję się otworzyć komentarzy')], { trust: { maja: 1 } }),
        opt('To też twoja zasługa. Ty znalazłaś teczkę.', [say('maja2', 'maja', 'kotka znalazła. ja ją tylko przesunęłam'), say('maja2', 'maja', 'ale dzięki 🫶')])
      ])
    ]),
    scene('xHenrykTel', [
      W('Pani Ziuta wróciła na swój karton. Pusty, ale jej to nie przeszkadza.'),
      pause(2500),
      callIn('henryk'),
      c('henryk', 'Wiśniewski. Przeczytałem. To znaczy wnuczka sąsiadów mi przeczytała. Dwa razy.'),
      c('henryk', 'Ja tam nikogo nie oskarżam. Ale teraz ludzie wiedzą, że to nie ja kazałem zostawić tę siatkę zdjętą.'),
      choose('call', [
        opt('Dziękuję, że mi pan zaufał.', [c('henryk', 'To ja dziękuję. Że ktoś w końcu sprawdził.')], { trust: { henryk: 1 } }),
        opt('Jak się pan czuje?', [c('henryk', 'Jak po burzy. Mokro, ale lepiej się oddycha.')])
      ]),
      c('henryk', 'Dobra. Impulsy. Do widzenia.'),
      callEnd()
    ]),
    pause(2500),
    scene('f3lena', [
      W('I jeszcze coś, zanim zapomnę. Lena Cicha, ta od busa, pytała mnie, czy w pudle pana Adama są nagrania z 2019 roku.'),
      W('Mówi, że kiedyś z nim długo rozmawiała. Nie powiedziałam jej nic, bo nic nie wiem.')
    ]),
    run(s => {
      const full = G.flag('m_krystynaOk') && G.flag('m_henrykOnRecord') && G.flag('m_correctionFirst');
      s.vars.s2Ending = full ? 'pelny_kadr' : 'margines';
    }),
    iff(s => s.vars.s2Ending === 'pelny_kadr', [
      scene('m5babcia', [iff('flag:m_zuzaWithGran', [Z('przeczytałam jej tekst na głos. całe. ani razu nie przerwała')])]),
      Z('nagrałam coś. babcia obejrzała zanim wrzuciłam. powiedziała „może być”'),
      pic('zuza', 'zuza', 'life_zuza_most', 'pod mostem. bez muzyki'),
      Z('zobacz jak chcesz. tam nie ma nic o babci. jest tylko wujek'),
      ending('pelny_kadr')
    ], [
      ending('margines')
    ]),
    credits()
  ];
});
