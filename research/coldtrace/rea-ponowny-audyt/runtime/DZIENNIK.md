# Test gry WWW, 27.10.2026

Sesja w przeglądarce, nie aplikacja iOS. Rozpoczęto z zachowanego stanu Noor, bez zakupu i modyfikacji pamięci gry.

1. Po czwartym pytaniu zamknięto ofertę roczną/tygodniową przyciskiem X, a następną ofertę kolejnym X. Telefon ponownie stał się dostępny.
2. Przewodniczka pokazała **Question 4/21**. Powtórnie wysłano wcześniej potwierdzoną odpowiedź przez widoczny formularz. Serwer zaakceptował odpowiedź i pokazał podsumowanie czterech pytań (`noor-ponownie-4.png`). Po Continue investigating ponownie wyświetlono ofertę (`noor-oferta-ponownie.png`). W tej sesji nie osiągnięto pytania 5. Nie oznacza to, że każda wersja lub konto działa identycznie.
3. W Noor uruchomiono Tic-Tac-Toe, wykonano ruch i zaobserwowano ruch przeciwnika. Back pokazał komunikat o zaliczeniu wyjścia jako przegranej (`tictactoe-wyjscie.png`); Yes wrócił do telefonu. Ponowne wejście pokazało pustą nową planszę. Brak widocznego licznika nie rozstrzyga zapisu na serwerze.
4. Z listy wybrano Ghost, ukończono intro i odblokowano telefon. Na ekranie widać obie ikony Tetris i PacMan (`ghost-ekran.png`). Uruchomiono PacMan, sterowano w dół, wynik wzrósł do 90 (`ghost-pacman-po-ruchu.png`). Pojedynczy przebieg nie potwierdza hipotezy błędu ducha.
5. Uruchomiono Tetris i wielokrotnie opuszczano klocki. Pokazał Game Over (`tetris-game-over-a.png`), a Play again usunęło ten ekran i wyświetliło stan nowej gry (`tetris-ponowna-gra.png`). Nie zaobserwowano wnętrza pętli po Game Over; podejrzenie opisane w analizie statycznej pozostaje niepotwierdzone.
6. W Ghost otwarto aplikację Photos: miniatura dokumentu prawa jazdy w albumie została wyrenderowana (`ghost-album.png`) mimo wcześniejszego 404 dla URL wskazanego w danych. To potwierdza poprawne wyświetlenie w tej konkretnej ścieżce, a nie wszystkie zastosowania tego URL. Dalszy zrzut widoku dokumentu nie został zapisany: sterowanie przeglądarką w Work zostało ponownie wyłączone.
