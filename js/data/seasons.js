'use strict';
/* Identyfikatory odcinków są kontraktem zapisu. Nie zależą od indeksów kroków DSL. */
DATA.seasons = [{
  id: 's1', revision: 2, title: 'Szkło pamięta', released: true,
  description: 'Jedno nieodebrane połączenie i sprawa, o której Mglisko milczało przez 29 lat.',
  chapters: ['prolog', 'ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'epilog'],
  episodes: [
    ['s1.01', 'Nieodebrane', 'prolog', 'flag:knowKuba'],
    ['s1.02', 'Wiadomość sprzed tygodnia', 'prolog', 'ev:ev_sms_maja'],
    ['s1.03', 'Dziesięć lat ciszy', 'prolog', 'ev:ev_article2007'],
    ['s1.04', 'Czyj to numer?', 'prolog', 'ev:ev_obit'],
    ['s1.05', 'Ludzie Mai', 'prolog', 'unlocked:chat:group'],
    ['s1.06', 'Kopia telefonu', 'ch1', 'solved:nimbus'],
    ['s1.07', 'Telefon i właścicielka', 'ch1', 'ev:ev_loc_1410'],
    ['s1.08', 'Dwie kamery', 'ch1', ['ev:ev_cam1_car', 'ev:ev_cam2_0019']],
    ['s1.09', 'O czym nie mówi Ola', 'ch1', 'ev:ev_not_gajda'],
    ['s1.10', 'Po godzinach', 'ch2', 'ev:ev_bartek_conf'],
    ['s1.11', 'Szafka siedemnaście', 'ch2', 'ev:ev_dk97'],
    ['s1.12', 'Czapka na zdjęciu', 'ch2', 'ev:ev_patch'],
    ['s1.13', 'Świeża zaprawa', 'ch2', 'ev:ev_mount'],
    ['s1.14', 'Samochód pod bramą', 'ch2', 'ev:ev_car_igor'],
    ['s1.15', 'Brat Weroniki', 'ch3', 'ev:ev_tomek'],
    ['s1.16', 'Głos z nagrania', 'ch3', 'ev:ev_interview'],
    ['s1.17', 'Uprzejmy telefon', 'ch3', 'ev:ev_gajda_call'],
    ['s1.18', 'Właściciel auta', 'ch3', 'ev:ev_owner'],
    ['s1.19', 'Zaległa synchronizacja', 'ch3', 'ev:ev_sync_wall'],
    ['s1.20', 'Krąg na mapie', 'ch4', 'ev:ev_findphone'],
    ['s1.21', 'Trzy wejścia', 'ch4', ['ev:ev_sztolnie', 'ev:ev_kolo']],
    ['s1.22', 'Kadr dwudziesty trzeci', 'ch4', 'ev:ev_frame23'],
    ['s1.23', 'Druga karta', 'ch4', 'ev:ev_igor_conf'],
    ['s1.24', 'Decyzja z 1997 roku', 'ch4', 'ev:ev_marek'],
    ['s1.25', 'Dwa wnioski', 'ch4', ['solved:ded_1997', 'solved:ded_who']],
    ['s1.26', 'Światło przy hucie', 'ch5', 'flag:sawJerrycans'],
    ['s1.27', 'Dwa miejsca', 'ch5', 'flag:called112'],
    ['s1.28', 'Zachować oryginały', 'ch5', s => s.vars.pkg != null],
    ['s1.29', 'Za kratą', 'ch5', s => !!s.vars.endingId],
    ['s1.30', 'Listopad', 'epilog', s => !!s.finished]
  ].map(([id, title, chapter, done]) => ({ id, title, chapter, done }))
}];
