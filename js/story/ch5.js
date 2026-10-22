'use strict';
/* ROZDZIAŁ 5 — Światło */

Engine.chapter('ch5', { num: 5, title: 'Światło', when: 'Sobota, 24 października · noc', mood: 'dark' }, D => {
  const { say, sys, pause, choose, menu, opt, show, waitFor, goal, give, unlock, set, inc, iff, run, task, fx, typing, end, title, ambient, dial, callIn, callEnd, notify, trust } = D;
  const I = (t, o) => say('igor', 'igor', t, o);
  const g = (who, t, o) => say('group', who, t, o);
  const sz = (t, o) => say('szklarz', 'szklarz', t, o);
  const c = (who, t, o) => say('call', who, t, o);
  const igorSays = t => iff('flag:igorBack', [g('igor', t)], [I(t)]);

  return [
    title(),
    ambient('dark'),
    g('kuba', 'jesteśmy pod szlabanem'),
    g('bartek', 'stary tnie klodke'),
    sys('group', 'Kuba dodał: Weronika'),
    run(() => { const m = ['kuba', 'ola', 'bartek', 'weronika']; if (G.flag('igorBack')) m.push('igor'); G.chat('group').members = m; BUS.emit('chats'); }),
    g('weronika', 'Jestem z nimi. Mam termos i dwa koce.'),
    pause(2500),

    /* --- kamera przy hucie --- */
    iff('flag:cam1Dead', [
      igorSays('Przejechałem koło huty. Pod bramą stoi superb Gajdy. Bagażnik otwarty, w środku kanistry.'),
      set('sawJerrycans')
    ], [
      set('panelGajda'),
      igorSays('%name%, zajrzyj przez kamerę przy bramie. Coś mi tu nie gra — w hucie pali się światło.'),
      goal('Zajrzyj przez kamerę przy hucie. Co się tam dzieje?', [
        'Zainstaluj aplikację *BushView* — wyszukaj „bushview” w przeglądarce i pobierz ją ze strony.',
        'Zaloguj się danymi od Szklarza: login *maja.cam*, hasło *Jutrzenka1996*.',
        'BushView → CAM-01 · Brama → „Zrób zdjęcie teraz”.'
      ]),
      waitFor('flag:sawJerrycans', { hints: [{ after: 120, chat: 'szklarz', who: 'szklarz', text: 'bushview . cam-01 . zrob zdjecie . teraz' }] }),
      give('ev_jerrycans'),
      show('group', { prompt: 'Pokaż zdjęcie z kamery', accept: [{ ev: ['ev_jerrycans'] }], wrong: [['ola', 'Co pokazuje kamera przy hucie?']] })
    ]),
    g('bartek', 'kanistry'),
    g('ola', 'On chce spalić hutę. Odprężarkę. To, co jest za murem.'),
    g('weronika', 'Tomek.'),
    g('weronika', 'Jedźcie do Mai. Ja… ja wracam do huty.'),
    choose('group', [
      opt('Nie! Pani Weroniko, proszę zostać z nimi. Zadzwonię po pomoc.', [g('weronika', 'Dobrze. Ale niech {Pan|Pani} dzwoni. Teraz.')], { trust: { weronika: 1 } }),
      opt('Ola, obserwuj drogę pod hutą z daleka. Pani Weroniko, proszę zostać z Kubą.', [g('ola', 'Dobrze. Stanę przy drodze. Nie będę podchodzić do budynku.')], { set: { weronikaToHuta: true } }),
      opt('Najpierw Maja. Huta poczeka.', [g('weronika', '…'), g('weronika', 'Ma {Pan|Pani} rację. Żywi są ważniejsi.')], { trust: { weronika: -1 } })
    ]),

    /* --- telefon po pomoc --- */
    goal('Zadzwoń po pomoc. Teraz.', ['Otwórz *Telefon* → Klawiatura.', 'Numer alarmowy to *112*. Pamiętaj, kto kieruje posterunkiem w Mglisku.']),
    dial({
      numbers: {
        '112': {
          who: 'dispatcher', then: [
            c('dispatcher', 'Numer alarmowy sto dwanaście. Co się stało?'),
            choose('call', [
              opt('Uwięziona osoba w sztolni Ewa na Sowiej Kopie. I ktoś chce podpalić starą hutę w Mglisku.', [], { set: { reportBoth: true } }),
              opt('Moja znajoma jest uwięziona w lesie.', [
                c('dispatcher', 'Gdzie dokładnie?'),
                choose('call', [opt('Sztolnia Ewa, wschodni stok Sowiej Kopy. Za szlabanem na drodze leśnej nr 7.', [])]),
                c('dispatcher', 'Czy jest jeszcze jakieś zagrożenie?'),
                choose('call', [
                  opt('Tak. Ktoś chce podpalić hutę „Jutrzenka” w Mglisku. Tam są ludzkie szczątki.', [], { set: { reportBoth: true } }),
                  opt('Nie, tylko to.', [])
                ])
              ])
            ]),
            c('dispatcher', 'Kto przetrzymuje tę osobę?'),
            choose('call', [
              opt('Komendant posterunku w Mglisku, Robert Gajda.', [
                c('dispatcher', '…'),
                c('dispatcher', 'Rozumiem. Nie przekazuję zgłoszenia na posterunek w Mglisku. Dysponuję patrol z Komendy Powiatowej w Dzierżoniowie, zespół ratownictwa medycznego i straż.')
              ], { set: { named112: true } }),
              opt('Nie wiem.', [c('dispatcher', 'Przekazuję zgłoszenie do najbliższej jednostki policji.')], { set: { dispatchLocal: true } })
            ]),
            iff('flag:reportBoth', [c('dispatcher', 'Straż pożarna jedzie też pod hutę. Proszę nikomu nie zbliżać się do budynku.')]),
            c('dispatcher', 'Jeśli musi {Pan|Pani} kończyć, proszę zostać pod telefonem. Oddzwonimy.'),
            callEnd(),
            set('called112')
          ]
        },
        '748734120': {
          who: 'duty', then: [
            c('duty', 'Posterunek Policji Mglisko, dyżurny sierżant Kowal.'),
            choose('call', [opt('Ktoś jest uwięziony w sztolni Ewa na Sowiej Kopie. Proszę przysłać pomoc.', [])]),
            c('duty', 'Sztolnia Ewa? Zaraz… to muszę zgłosić komendantowi.'),
            c('duty', 'Komendant Gajda jest w terenie, przekażę mu przez radio. Proszę czekać.'),
            choose('call', [
              opt('Nie! Nie do Gajdy!', [c('duty', 'Przepraszam, taka jest procedura.'), c('duty', 'Halo?')]),
              opt('Dobrze.', [])
            ]),
            callEnd(),
            set('calledPosterunek'),
            inc('leaks', 1),
            igorSays('{Zadzwoniłeś|Zadzwoniłaś} na posterunek?? Oni mają radio z Gajdą! Dzwoń na 112, teraz!'),
            dial({
              goal: 'Zadzwoń na 112.',
              numbers: {
                '112': {
                  who: 'dispatcher', then: [
                    c('dispatcher', 'Numer alarmowy sto dwanaście. Co się stało?'),
                    choose('call', [opt('Uwięziona osoba w sztolni Ewa na Sowiej Kopie. Przetrzymuje ją komendant posterunku w Mglisku, Robert Gajda. I chce podpalić hutę.', [], { set: { reportBoth: true, named112: true } })]),
                    c('dispatcher', 'Rozumiem. Dysponuję patrol z Dzierżoniowa, karetkę i straż. Proszę zostać pod telefonem.'),
                    callEnd(),
                    set('called112')
                  ]
                }
              }
            })
          ]
        }
      }
    }),
    pause(1500),

    /* --- pakiet dowodów --- */
    g('ola', '%name%, wyślij wszystko prokuraturze. Teraz. Zanim on zdąży cokolwiek zniszczyć.'),
    g('ola', 'I do Gazety Sudeckiej. Niech redakcja dokończy tekst, który zaczął Rybicki.'),
    goal('Wyślij zebrane materiały do prokuratury i gazety.', ['Wybierz najmocniejsze rzeczy z Notatek: to, co łączy Gajdę z hutą w 1997 i z porwaniem Mai.']),
    task(async () => { const n = await UI.packageSheet(); G.setVar('pkg', n); }),
    notify({ app: 'nimbus', title: 'Poczta', text: 'Wiadomość wysłana: biuro.podawcze@dzierzoniow.po.gov.pl, redakcja@gazetasudecka.pl', sound: 'notif' }),
    pause(2000),

    /* --- las --- */
    g('kuba', 'idziemy drogą. jest rozwidlenie'),
    g('bartek', 'w lewo pod gore, prosto w dol do potoku, w prawo wzdluz lasu'),
    goal('Poprowadź ich do sztolni Ewa.', ['Otwórz *Mapy* z warstwą leśną. Od szlabanu do Ewy prowadzi droga leśna nr 7 — na północny wschód.']),
    menu('group', [
      opt('W prawo, wzdłuż lasu. Droga nr 7, na wschód.', [g('kuba', 'idziemy')], { exit: true }),
      opt('Prosto, w dół do potoku.', [g('bartek', 'potok. tu sie konczy droga. wracamy'), inc('lost', 1)]),
      opt('W lewo, pod górę.', [g('kuba', 'tu jest parking pod anną. to nie tu'), inc('lost', 1)])
    ]),
    pause(4000),
    g('bartek', 'paśnik. jest paśnik'),
    g('kuba', 'widzę kratę'),
    iff('flag:toldGajda', [
      /* --- CISZA --- */
      g('kuba', 'krata jest otwarta'),
      g('bartek', 'klodka lezy na ziemi'),
      typing('group', 'kuba', 7000),
      g('kuba', 'nikogo nie ma'),
      g('weronika', 'Jest koc. Butelki po wodzie.'),
      g('kuba', 'na ścianie coś wydrapane. przy samej ziemi'),
      g('kuba', '„TU BYŁAM. M.”'),
      g('kuba', 'gdzie ona jest. GDZIE ONA JEST'),
      pause(3000),
      fx('glitch', { wait: true }),
      sz('przepraszam'),
      sz('za pozno'),
      run(s => { s.vars.endingId = 'cisza'; })
    ], [
      /* --- ratunek --- */
      callIn('kuba'),
      c('kuba', 'jesteśmy pod kratą. nowa kłódka. bartek tnie'),
      pause(2500),
      c('kuba', 'MAJA!'),
      c('kuba', 'MAJA, TO MY!'),
      pause(3000),
      c('kuba', 'słyszę coś. tam w środku. ktoś stuka'),
      choose('call', [
        opt('Mówcie do niej. Niech wie, że to wy.', [], { trust: { kuba: 1 } }),
        opt('Ostrożnie. Świećcie pod nogi.', [])
      ]),
      c('kuba', 'maja. maja, to ja, kuba. jestem tu'),
      pause(3500),
      c('weronika', 'Jest. Leży na kocu. Żyje. Jest bardzo zimna.'),
      c('kuba', 'ona coś mówi'),
      c('kuba', 'chce z tobą rozmawiać. z tym numerem'),
      pause(2000),
      c('maja', 'Halo…?'),
      c('maja', 'To ty? Ten numer?'),
      choose('call', [opt('Tak. To ja.', []), opt('Cześć, Maja. Jestem %name%.', [])]),
      c('maja', 'Dzwoniłam do ciebie. Wtedy. Nie {odebrałeś|odebrałaś}.'),
      c('maja', 'Myślałam, że to pan Adam.'),
      choose('call', [
        opt('Przepraszam. Nie {odebrałem|odebrałam}.', [c('maja', 'Ale teraz {odebrałeś|odebrałaś}.')]),
        opt('Pan Adam nie żyje. Ale jego numer cię znalazł.', [c('maja', 'To… dziwnie piękne.'), c('maja', 'Albo mam gorączkę.')])
      ]),
      c('maja', 'Tomek… on jest w hucie. Za murem. Widziałam pelerynę.'),
      c('maja', 'To był Gajda. Przyjechał za mną. Spadłam ze schodów, a potem było ciemno.'),
      pause(2000),
      c('kuba', 'światła. ktoś jedzie drogą od szlabanu'),
      fx('heartbeat'),
      iff(s => G.flag('called112') && G.flag('named112') && G.v('lost') < 2, [
        c('bartek', 'niebieskie swiatla. to radiowoz. dzierzoniow'),
        c('kuba', 'POLICJA. PRAWDZIWA'),
        c('weronika', 'Przy szlabanie stoi jeszcze jedno auto. Ciemne. Zatrzymali je.'),
        c('bartek', 'superb. wyciagaja gajde z auta'),
        set('gajdaCaught')
      ], [
        c('bartek', 'to superb. to on'),
        c('kuba', 'gajda idzie tutaj. ma latarkę'),
        c('kuba', '…i sztucer'),
        c('bartek', 'stary wyszedl mu naprzeciw'),
        pause(3000),
        c('kuba', 'stoją naprzeciwko siebie. pan marek coś mówi'),
        c('kuba', '„robert, koniec. dwadzieścia dziewięć lat. wystarczy”'),
        pause(4500),
        c('kuba', 'gajda opuścił broń'),
        c('kuba', 'wsiada do auta. odjeżdża'),
        iff('flag:called112', [c('bartek', 'syreny. jada od mgliska')])
      ]),
      c('maja', 'Nie rozłączaj się. Proszę. Jeszcze chwilę.'),
      pause(4000),
      c('maja', 'Dobrze. Już dobrze.'),
      callEnd(),
      set('majaFound'),
      run(s => {
        const strong = G.v('pkg') >= 5;
        s.vars.endingId = (G.flag('gajdaCaught') && G.flag('reportBoth') && strong && G.v('leaks') < 3) ? 'swit' : 'odlamki';
      })
    ]),
    pause(2000),
    end('epilog')
  ];
});
