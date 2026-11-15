// sw.js - Service Worker：離線快取（線上優先更新，離線自動讀取快取）
const CACHE_NAME = 'tokyo-fuji-pwa-v26';
const STATIC_ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
const CDN_HOSTS = ['cdn.tailwindcss.com', 'unpkg.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

const cacheable = (res) => res && (res.ok || res.type === 'opaque');

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        const network = fetch(event.request)
          .then((res) => { if (cacheable(res)) cache.put(event.request, res.clone()); return res; })
          .catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // 同源資源（index.html 等）採 Network-First：有網路時優先抓最新版，離線時自動讀取快取
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(event.request).then((c) => c || (event.request.mode === 'navigate' ? caches.match('./index.html') : undefined)))
  );
});
