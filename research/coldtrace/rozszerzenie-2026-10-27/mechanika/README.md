# Rozszerzenie badania mechaniki ColdTrace

Główny wynik: `ColdTrace-mechanika-klienta.md` — autorski opis walidacji, zapisu, ofert, zamykania X, premium, dialogów, zegarów i powiązania z postępem.

Pliki gotowe do włączenia do raportu:

- `endpointy-klienta.csv`: 15 miejsc wywołań, 9 ścieżek API; parametry i pola odpowiedzi konsumowane przez klienta.
- `persystencja-klienta.csv`: 15 semantycznych rekordów zapisu gry i powiązanych modułów.
- `przejscia-stanow.csv`: 32 przejścia opisane z warunkami i skutkami.
- `telemetria-klienta.csv`: 18 miejsc wywołania zdarzeń.
- `pliki-zrodlowe-sha256.csv`: tożsamość 15 przeanalizowanych chunków.
- `mechanics-summary.json`: zwięzłe podsumowanie liczności i korekty X.
- `WERYFIKACJA-mechaniki.json`: zakres wykonanej weryfikacji materiału.

Wyłącznie robocze: `ast-evidence.json`, `extract-mechanics.cjs`, `package-mechanics.py`. Są to skrypty analityczne i indeks małych fragmentów dowodowych; nie trzeba ich dołączać do publikowanego pakietu.

Źródła: `../sources/_next/static/chunks`. Cytaty pozycji używają indeksów UTF16, a nie bajtów ani indeksów Unicode Pythona. Nie wykonano kodu docelowego, nie wywołano API, nie zmieniono zapisów ani uprawnień, nie dokonano zakupu. To statyczny snapshot klienta WWW pozyskany 26.10.2026, nie pełny runtime iOS.

Szczególnie ważne: początkowe oferty mają normalną ścieżkę X prowadzącą do darmowej gry. Po późniejszej ofercie X oddaje ekran telefonu i przeglądanie danych; odczytany handler ostatniego etapu jednocześnie wraca do indeksu pytania granicznego. Samego istnienia oferty nie należy nazywać dowodem obowiązkowej płatności.
