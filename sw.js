// Service worker: gra działa offline po pierwszym uruchomieniu.
const VERSION = 'quiet-is-safer-v60';
const FILES = [
  './', './index.html', './manifest.webmanifest', './icon.svg',
  './css/base.css', './css/apps.css', './css/web.css', './css/os.css', './css/messenger.css',
  './css/conversations.css', './js/data/conversations.js', './js/core/conversations.js', './js/apps/conversations.js',
  './css/native-ui.css', './js/core/native.js',
  './css/seasons.css', './js/data/season-conversations.js', './js/data/seasons.js', './js/data/wallpapers.js',
  './js/data/dark-threads.js', './js/data/season-days.js',
  './js/data/field-threads.js', './js/core/phone-tools.js', './js/apps/phone-tools.js', './css/phone-tools.css',
  './assets/garage-locker-v1.jpg', './assets/strap-door-v1.jpg', './assets/garage-straps-v1.jpg',
  './assets/factory-day-v1.jpg',
  './assets/people/sylwia.jpg', './assets/people/sylwia_life1.jpg', './assets/people/zuza.jpg', './assets/people/zuza_life1.jpg', './assets/people/bartek.jpg', './assets/people/bartek_life1.jpg', './assets/people/bartek_life2.jpg', './assets/people/igor.jpg', './assets/people/igor_life1.jpg', './assets/people/igor_life2.jpg', './assets/people/kuba.jpg', './assets/people/kuba_life1.jpg', './assets/people/kuba_life2.jpg', './assets/people/maja.jpg', './assets/people/maja_life1.jpg', './assets/people/ola.jpg', './assets/people/ola_life1.jpg', './assets/people/ola_life2.jpg', './assets/people/weronika.jpg', './assets/people/weronika_life1.jpg', './assets/people/weronika_life2.jpg',
  './assets/film/p_08.jpg', './assets/film/p_08d.jpg', './assets/film/p_14.jpg', './assets/film/p_14d.jpg',
  './assets/film/p_21.jpg', './assets/film/p_21d.jpg', './assets/film/p_22.jpg', './assets/film/p_22d.jpg',
  './assets/film/p_23.jpg', './assets/film/p_23d.jpg', './assets/film/p_23fog.jpg', './assets/kuba/k_gate.jpg',
  './assets/kuba/k_headlamp.jpg', './assets/kuba/k_kluska.jpg', './assets/kuba/k_locker.jpg', './assets/kuba/k_mount.jpg',
  './assets/kuba/k_poster.jpg', './assets/kuba/k_skate.jpg', './assets/kuba/k_wall.jpg', './assets/kuba/k_kometa.jpg',
  './assets/maja/m_bandzior.jpg', './assets/maja/m_bricks.jpg', './assets/maja/m_cam_install.jpg', './assets/maja/m_darkroom.jpg',
  './assets/maja/m_fence.jpg', './assets/maja/m_hall.jpg', './assets/maja/m_kodak.jpg', './assets/maja/m_lehr.jpg',
  './assets/maja/m_library.jpg', './assets/maja/m_lockers.jpg', './assets/maja/m_mirror.jpg', './assets/maja/m_ola_lake.jpg',
  './assets/maja/m_window.jpg', './assets/maja/s_blur.jpg', './assets/maja/s_door.jpg', './assets/maja/s_wall.jpg',
  './assets/trap/c1_0003.jpg', './assets/trap/c1_0011.jpg', './assets/trap/c1_0014.jpg', './assets/trap/c1_0021.jpg',
  './assets/trap/c1_0022.jpg', './assets/trap/c1_0023.jpg', './assets/trap/c1_0023e.jpg', './assets/trap/c1_0031.jpg',
  './assets/trap/c1_0044.jpg', './assets/trap/c1_0057.jpg', './assets/trap/c1_0058.jpg', './assets/trap/c1_0060.jpg',
  './assets/trap/c1_0061.jpg', './assets/trap/c2_0004.jpg', './assets/trap/c2_0019.jpg', './assets/trap/live_day.jpg',
  './assets/trap/live_gajda.jpg', './assets/trap/live_night.jpg',
  './js/core/seasons.js', './js/core/wallpapers.js', './js/apps/seasons.js', './js/apps/wallpapers.js',
  './js/core/pacing.js', './js/data/rhythm.js', './js/data/today.js',
  './js/vendor/capacitor-runtime.js',
  './assets/lena-v2.jpg', './assets/bus-stop-v2.jpg',
  './assets/people.jpg', './assets/forest.jpg', './assets/maja-river.jpg', './assets/gajda.jpg', './js/data/migrations.js',
  './js/core/util.js', './js/core/state.js', './js/core/audio.js', './js/core/engine.js', './js/core/ui.js',
  './js/art/kit.js', './js/art/avatars.js', './js/art/scenes.js', './js/art/film.js', './js/art/maps.js',
  './js/data/characters.js', './js/data/evidence.js', './js/data/maja.js', './js/data/web.js', './js/data/world.js',
  './js/apps/messages.js', './js/apps/viewer.js', './js/apps/phone.js', './js/apps/browser.js', './js/apps/gallery.js',
  './js/apps/nimbus.js', './js/apps/maps.js', './js/apps/notes.js', './js/apps/tools.js',
  './js/story/_scenes.js', './js/story/prolog.js', './js/story/ch1.js', './js/story/ch2.js', './js/story/ch3.js', './js/story/ch4.js', './js/story/ch5.js', './js/story/epilog.js', './js/story/most.js', './js/story/most2.js', './js/story/most3.js', './assets/most/oip_s41.jpg', './assets/most/oip_protokol.jpg', './assets/people/zuza_most.jpg', './assets/people/nina.jpg', './assets/people/nina_life1.jpg', './assets/most/doreczenie.jpg', './assets/most/karta_trasy.jpg', './assets/most/wejscie_17.jpg', './assets/most/biurko_marty.jpg', './assets/most/faktura_sowa.jpg', './assets/most/mail_kb.jpg', './assets/most/czat_ida.jpg', './assets/most/szuflada_henryka.jpg', './js/data/case-most.js', './js/data/case-kopia.js', './js/story/kopia.js', './js/story/kopia2.js', './js/data/case-kronika.js', './js/story/kronika.js', './assets/kronika/c_festyn.jpg', './assets/kronika/c_ryz.jpg', './assets/kronika/c_gorka.jpg', './assets/kronika/c_rysunek.jpg', './assets/kronika/c_klatka.jpg', './assets/video/v_festyn.mp4', './assets/video/v_festyn.jpg', './assets/people/zenon.jpg', './assets/people/ida.jpg', './assets/kronika/c_studniowka.jpg', './assets/kronika/c_boisko.jpg', './assets/kronika/c_pokoj_kaset.jpg', './assets/kronika/c_blok_noc.jpg', './assets/kronika/c_ida_pies.jpg', './assets/kronika/c_lodowisko.jpg', './assets/video/v_studniowka.mp4', './assets/video/v_studniowka.jpg', './assets/video/v_telewizor.mp4', './assets/video/v_telewizor.jpg', './assets/kopia/k_biurko.jpg', './assets/kopia/k_petla.jpg', './assets/kopia/k_mem_krzeslo.jpg', './assets/kopia/k_kadr_kabel.jpg', './assets/kopia/k_igor_kable.jpg', './assets/kopia/k_peron.jpg', './assets/kopia/k_zeszyt.jpg', './assets/kopia/k_zeszyt_zoom.jpg', './assets/video/v_korytarz.jpg', './assets/video/v_petla.jpg', './assets/video/v_korytarz.mp4', './assets/video/v_petla.mp4', './assets/most/m_kadr_siatka.jpg', './assets/most/m_okno_redakcji.jpg', './assets/most/m_mem_radio.jpg', './assets/video/v_licznik.mp4', './assets/video/v_licznik.jpg', './assets/s1x/s1_mem_kot.jpg', './assets/s1x/s1_lumpeks.jpg', './assets/kopia/k_okno.jpg', './assets/people/ewa.jpg', './js/data/case-glos.js', './js/story/glos.js', './assets/people/oskar.jpg', './assets/glos/g_ola_umowa.jpg', './assets/glos/g_kostka.jpg', './assets/glos/g_huta_czapka.jpg', './assets/glos/g_maja_korytarz.jpg', './assets/glos/g_przystanek.jpg', './assets/glos/g_tomek_album.jpg', './assets/glos/g_pracownia.jpg', './assets/glos/g_kuba_kostka.jpg', './assets/glos/g_serwis_noc.jpg', './assets/glos/g_magnetowid.jpg', './assets/glos/g_pizza.jpg', './assets/video/v_festyn96.mp4', './assets/video/v_festyn96.jpg', './assets/kronika/c_kasety_babci.jpg', './assets/kronika/c_zenon_kamera.jpg', './assets/kronika/c_pierniki.jpg', './assets/kronika/c_slady.jpg', './assets/kronika/c_magnetowidy.jpg', './assets/kronika/c_rysunki.jpg', './assets/video/v_sanki.mp4', './assets/video/v_sanki.jpg', './assets/video/v_pies_noc.mp4', './assets/video/v_pies_noc.jpg', './assets/most/m_lodowka.jpg', './assets/video/v_kotka.mp4', './assets/video/v_kotka.jpg', './assets/video/v_szyba.mp4', './assets/video/v_szyba.jpg', './assets/most/m_kamera_kotka.jpg', './assets/most/m_parapet_babci.jpg', './assets/most/m_tablet_kuchnia.jpg', './assets/most/m_obiad_drzwi.jpg', './assets/kopia/k_fiszki.jpg', './assets/kopia/k_poczta.jpg', './assets/kopia/k_uszka.jpg', './assets/kopia/k_rampa.jpg', './assets/kopia/k_pudlo.jpg', './assets/kopia/k_ladowarka.jpg', './assets/kopia/k_czytelnia_kubek.jpg', './assets/kopia/k_lampki.jpg', './assets/kopia/k_wigilia.jpg', './assets/most/m_kot_wycinki.jpg', './assets/most/m_brygada.jpg', './assets/most/m_inspekcja.jpg', './assets/most/m_znicz_most.jpg', './assets/most/m_salon_herbata.jpg',
  './assets/people/marta.jpg', './assets/people/marta_life1.jpg', './assets/people/natan.jpg', './assets/people/natan_life1.jpg', './assets/people/janina.jpg', './assets/people/janina_life1.jpg', './assets/people/henryk.jpg', './assets/people/henryk_life1.jpg',
  './assets/most/teczka_kruk.jpg', './assets/most/dziennik_s41.jpg', './assets/most/pocztowka.jpg', './assets/most/wycinek_2012.jpg', './assets/most/most_2011.jpg', './assets/most/hw_kadr.jpg',
  './js/main.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  // Sieć najpierw (świeże pliki), pamięć podręczna jako zapas offline.
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone();
    caches.open(VERSION).then(c => c.put(e.request, copy));
    return r;
  }).catch(() => caches.match(e.request)));
});
