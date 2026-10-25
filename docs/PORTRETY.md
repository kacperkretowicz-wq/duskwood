# Portrety postaci

Aktualizacja oceny, 23.10.2026: użytkownik wskazał `assets/people/kuba.jpg`, `assets/lena-v2.jpg` i `assets/gajda.jpg` jako wzorce realizmu. Pozostałe 21 zdjęć z przedstawionych plansz zostało odrzuconych. Poniższy opis dokumentuje wcześniejszą produkcję, a nie aktualną akceptację jakości. Obowiązują [REALIZM-2026.md](REALIZM-2026.md), rejestr `ASSETY-REALIZM-2026.json` i [ZDJECIA-SYTUACJE.md](ZDJECIA-SYTUACJE.md).

Wszystkie zdjęcia osób w `assets/people` powstały według wzorca `assets/lena-v2.jpg` (prompt w [ASSETY-OSTATNI-KURS.md](ASSETY-OSTATNI-KURS.md)): zwykłe zdjęcie budżetowym telefonem, płaskie światło dzienne lub jarzeniówka, lekka kompresja JPEG, nieidealna ostrość, przypadkowe tło, bez filmowego gradingu, HDR, bokeh i napisów.

Spójność twarzy: dla każdej postaci najpierw powstał jeden kanoniczny portret (`<postać>.jpg`). Każde zdjęcie z życia (`<postać>_lifeN.jpg`) wygenerowano z tym portretem jako obrazem referencyjnym („the same person as in the reference image”). Maja wychodzi z `assets/maja-river.png`, żeby zgadzała się z dotychczasowymi zdjęciami w fabule; wspólne zdjęcie z Olą (`ola_life2.jpg`) ma dwie referencje.

Kontrola: arkusze porównawcze dla każdej postaci (portret + wszystkie zdjęcia z życia obok siebie). Odrzucone wersje: zdjęcie Igora z nieczytelnym szyldem i widelcem zamiast podważki. Na zdjęciu Henryka rozmyto nadruk na reklamówce.

Sprawa 2, prolog po Ciszy: Nina Duda (23, kurierka) ma kanoniczny portret `nina.jpg`; `nina_life1.jpg` powstało z niego jako referencji. Zdjęcia dowodów (wejście Rzeczka 17, karta trasy, biurko Marty, szuflada Henryka) są generowane bez napisów; numer budynku, kartę trasy, „KB” na kubku i kopię strony 41 nałożono potem w PIL, żeby tekst był po polsku i czytelny. Zrzuty ekranu (zapis doręczenia, mail Kurek-Bud, czat Idy) i faktura są w całości renderowane w PIL.
