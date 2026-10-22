// Service worker: gra działa offline po pierwszym uruchomieniu.
const VERSION = 'mglisko-v7';
const FILES = [
  './', './index.html', './manifest.webmanifest', './icon.svg',
  './css/base.css', './css/apps.css', './css/web.css', './css/os.css', './css/messenger.css',
  './css/conversations.css', './js/data/conversations.js', './js/core/conversations.js', './js/apps/conversations.js',
  './css/native-ui.css', './js/core/native.js',
  './css/seasons.css', './js/data/season-conversations.js', './js/data/seasons.js', './js/data/wallpapers.js',
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
  './js/story/prolog.js', './js/story/ch1.js', './js/story/ch2.js', './js/story/ch3.js', './js/story/ch4.js', './js/story/ch5.js', './js/story/epilog.js',
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
