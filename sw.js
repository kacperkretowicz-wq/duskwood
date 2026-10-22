// Service worker: gra działa offline po pierwszym uruchomieniu.
const VERSION = 'quiet-is-safer-v17';
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
  './assets/kuba/k_poster.jpg', './assets/kuba/k_skate.jpg', './assets/kuba/k_wall.jpg', './assets/kuba/k_zenit.jpg',
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
  './js/core/pacing.js',
  './js/vendor/capacitor-runtime.js',
  './assets/lena-v2.jpg', './assets/bus-stop-v2.jpg',
  './assets/people.png', './assets/forest.png', './assets/maja-river.png', './assets/gajda.png', './js/data/migrations.js',
  './js/core/util.js', './js/core/state.js', './js/core/audio.js', './js/core/engine.js', './js/core/ui.js',
  './js/art/kit.js', './js/art/avatars.js', './js/art/scenes.js', './js/art/film.js', './js/art/maps.js',
  './js/data/characters.js', './js/data/evidence.js', './js/data/maja.js', './js/data/web.js', './js/data/world.js',
  './js/apps/messages.js', './js/apps/viewer.js', './js/apps/phone.js', './js/apps/browser.js', './js/apps/gallery.js',
  './js/apps/nimbus.js', './js/apps/maps.js', './js/apps/notes.js', './js/apps/tools.js',
  './js/story/_scenes.js', './js/story/prolog.js', './js/story/ch1.js', './js/story/ch2.js', './js/story/ch3.js', './js/story/ch4.js', './js/story/ch5.js', './js/story/epilog.js',
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
