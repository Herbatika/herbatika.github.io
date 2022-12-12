var cacheName = 'herbatikapwa';
var filesToCache = [
  '/',
  '/index.html',
  '/index.js',
  '/index.html',
  '/images/bg.png',
  '/images/fire.png',
  '/images/footer.png',
  '/images/loading.gif',
  '/images/logo.png',
  '/images/water.png',
  '/images/wind.png',
  '/result/7aKZzoKTNUiMEOwQDtcpag.png',
  '/result/z7nHr8dZ5US65Ubm6z48MQ.png',
  '/result/YWWLAGPfbEOXu705hoBwxQ.png',
  '/result/hk9xjQHyOECCUqjaBvC2oQ.png',
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});