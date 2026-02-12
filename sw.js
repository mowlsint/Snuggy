const CACHE_NAME = "snuggy-v3-cache";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",

  "./snuggy_voll.png",
  "./snuggy_avatar_v3.png",

  "./icon-512_v3.png",
  "./icon-192_v3.png",

  "./icon-180_v3.png",
  "./icon-167_v3.png",
  "./icon-152_v3.png",
  "./icon-120_v3.png",

  "./maskable-512_v3.png",
  "./maskable-192_v3.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(()=>cache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).catch(() => cached))
  );
});
