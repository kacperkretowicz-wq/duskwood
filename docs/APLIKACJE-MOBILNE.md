# Aplikacje mobilne i system telefonu

## Co jest zaimplementowane

Gra działa w lokalnym WebView aplikacji Capacitor 8.5.3. W repo są wygenerowane projekty Xcode/SPM i Android/Gradle, konfiguracja pakowania i mostek cyklu życia. To nie jest przepisanie aplikacji na SwiftUI/Kotlin: Wiadomości, Telefon, Safari/Internet, Notatki i pozostałe narzędzia są interfejsami fikcyjnego telefonu gry.

- iOS: systemowy stack fontów zaczyna się od `-apple-system`; na iPhonie wybierany jest font systemu. Na Windowsie wygląd nie udaje, że korzysta z prawdziwego SF Pro — używa dostępnego fontu zastępczego. Fontów Apple nie dołączono do paczki.
- Android: osobny systemowy stack fontów oraz kolory. Można także wybrać oprawę iOS w Ustawieniach gry.
- Jasne i ciemne powierzchnie, systemowe akcenty, grupowane listy, nagłówki, przełączniki, pole szukania. Ekran główny ma ikony i dock, a nie panel rozdziałów.
- Telefon ma dolne zakładki; Wiadomości mają zwykłe dymki i potwierdzenie dostarczenia przy ostatniej wysłanej wiadomości. Nieznany rozmówca nie przejmuje oprawy systemu.
- Wyszukiwanie telefonu obejmuje aplikacje, znane osoby i zapisane ślady. Nie szuka w nieodkrytych materiałach. Wyszukiwanie Notatek jest funkcjonalne i nie gubi fokusu podczas filtrowania.
- Widżet Notatek odświeża się po zmianie celu. Daty Notatek i pogoda wynikają z zegara fabularnego. Napis w prologu wskazuje przeglądarkę odpowiednią dla obu opraw.
- Mostek zapisuje postęp przy przejściu aplikacji w tło, obsługuje Android Back i ukrywa fizyczny pasek stanu, gdy symulowany telefon zajmuje ekran. WebView dostaje lokalne zasoby; service worker jest pomijany w aplikacji natywnej.
- Uwzględniono safe area oraz zmniejszenie widocznego obszaru przy klawiaturze przez VisualViewport. Zachowanie klawiatury i pasków systemu wymaga jeszcze testów urządzeń.
- Zastąpiono szablonowe ikony i splash screeny własną ikoną z `icon.svg` oraz prostym ekranem startowym. Ikony wyeksportowano lokalnie do rozmiarów platform, bez generowania nowych obrazów.

## Uruchomienie aplikacji

Wymagany Node 22 lub nowszy. Na tym komputerze użyto dostarczonego runtime Node 24 do CLI Capacitor; globalnego Node 20 nie zmieniano.

```sh
npm ci
npm run mobile:sync
npm run mobile:android
# lub na Macu:
npm run mobile:ios
```

`npm run build` eksportuje zasoby do `dist/`. `mobile:sync` kopiuje je do obu projektów. Katalogi wygenerowanych zasobów są ignorowane w Git; po pobraniu repo trzeba wykonać synchronizację.

Android: JDK 21, Android SDK 36 / Android Studio. Projekt używa minSdk 24, compileSdk/targetSdk 36, pionowej orientacji telefonu i `adjustResize`. `cd android && ./gradlew assembleDebug` (Windows: `gradlew.bat assembleDebug`) buduje APK testowe. Wersja podpisana do sklepu wymaga konfiguracji właściciela aplikacji.

iOS: macOS, Xcode 26+, projekt `ios/App/App.xcodeproj`, scheme `App`. SPM pobiera zależności; trzeba wykonać `npm ci` przed otwieraniem projektu. Pakiet ma identyfikator roboczy `pl.mglisko.game`. Uruchomienie na iPhonie oraz publikacja wymagają ustawienia zespołu i podpisywania w Xcode. Projekt symulatora można kompilować bez podpisywania.

## Weryfikacja i jej granice

Lokalnie: wygenerowano i zsynchronizowano obie platformy; wykryto wtyczki App i StatusBar; uruchomiono testy logiki/migracji, eksportu zasobów, zgodności konfiguracji platform oraz testy przeglądarkowe.

Testy nowej powłoki obejmują 360 i 390 px dla obu systemów, jasny i ciemny wygląd, wszystkie widoczne ikony, odświeżanie celu, filtrowanie Notatek, wyszukiwanie bez spoilerów, brak żądań fontów/zasobów z sieci i offline. Przejście autorskiego prologu sprawdza rejestr połączeń → SMS → artykuł z 2007 → nekrolog → załączniki → grupę → anonimowego nadawcę. Osobny test przechodzi wątek Leny z błędnymi i poprawnymi źródłami.

Windows nie ma tutaj JDK/Android SDK ani Xcode. Lokalna próba Gradle zatrzymała się na braku JAVA_HOME/Java. Nie uznajemy synchronizacji lub emulacji szerokości za kompilację ani za test fizycznego iPhone'a/Androida. Nie przechodzono od początku wszystkich zakończeń.

Workflow `.github/workflows/mobile.yml` uruchamia kompilację Android debug na Ubuntu i iOS Simulator na macOS/Xcode 26.3. Następnie instaluje grę na dostępnym symulatorze iPhone'a, uruchamia ją i zapisuje zrzut startu. Artefakty to testowy APK oraz zrzut symulatora. Samo istnienie workflow nie oznacza sukcesu: obowiązuje wynik konkretnego uruchomienia w Actions. Workflow nie publikuje do sklepów i nie używa certyfikatów.

Pierwsze kompilacje Android debug i iOS Simulator przeszły dla commitu `ec680c3`: [Actions 39773575523](https://github.com/kacperkretowicz-wq/duskwood/actions/runs/39773575523). To dowód kompilacji obu projektów. Kolejny przebieg obejmuje także uruchomienie na symulatorze; jego wynik jest raportowany osobno. Nadal nie jest to test fizycznego urządzenia, podpisana wersja iPhone ani pełny test rozgrywki natywnej.

## Źródła techniczne

[Apple: system fonts](https://developer.apple.com/documentation/technologyoverviews/fonts), [Apple: layout and safe areas](https://developer.apple.com/design/human-interface-guidelines/layout), [Capacitor: instalacja](https://capacitorjs.com/docs/getting-started), [Capacitor: wymagania środowiska](https://capacitorjs.com/docs/getting-started/environment-setup), [wersje Xcode w obrazie macOS 15 dla Actions](https://github.com/actions/runner-images/blob/main/images/macos/macos-15-Readme.md).
