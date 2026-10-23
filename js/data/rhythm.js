'use strict';
/* Przerwy w istniejących scenach. Godziny oznaczają lokalny czas gracza;
   daty dowodów i zegar fabuły pozostają częścią historii. */
DATA.rests = {
  s1_night: { hours: 2, window: [21, 26], goal: 'Kuba odłożył telefon, Ola jest na nocce. Ostatnie ustalenie: Maja była w hucie. Jeśli Nimbus coś ściągnie w nocy, przeczytasz to rano.' },
  s1_departure: { hours: 2, window: [19, 24], goal: 'Igor i Kuba szykują się do wyjazdu pod hutę. Napiszą, zanim ruszą. Plan szatni masz w galerii Mai.' },
  s1_sync: { hours: 3, window: [21, 26], goal: 'Rozmowa ucichła. Numer auta spod huty jest w notatkach. Nocne wiadomości poczekają do rana.' },
  s2_archive: { hours: 2, window: [18, 23], goal: 'Na razie cisza. Materiały z archiwum nie znikną podczas przerwy.' },
  s3_upload: { hours: 3, window: [21, 26], goal: 'Wszyscy odłożyli telefony. Nowych materiałów jeszcze nie ma.' },
  s4_evening: { hours: 3, window: [19, 24], goal: 'Weronika wróciła do pracy. Do rozmowy wrócicie wieczorem.' },
  s5_voice: { hours: 2, window: [22, 26], goal: 'Maja poszła spać. Na grupie zrobiło się cicho.' }
};
