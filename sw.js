const staticCacheName = "site-static";
const assets = [
  "/",
  "/index.html",
  "/app.js",
  "/styles.css",
  "/assets/icons/icon-48x48.png",
  "assets/icons/icon-72x72.png",
  "assets/icons/icon-96x96.png",
  "assets/icons/icon-144x144.png",
  "assets/icons/icon-192x192.png",
  "assets/icons/icon-512x512.png",
  "/assets/hidden.png",
  "/assets/kill.png",
  "/assets/role1.png",
  "/assets/role2.png",
  "/assets/role3.png",
  "/assets/role4.png",
  "/assets/role5.png",
  "/assets/role6.png",
  "/assets/role7.png",
  "/assets/role8.png",
  "/assets/role9.png",
  "/assets/role10.png",
  "/assets/role11.png",
  "/assets/role12.png",
  "/assets/small-claw-scratch-pictures-7.png",
  "/assets/audio/card__hide.m4a",
  "/assets/audio/card__show.m4a",
  "/assets/audio/wolf__audio.m4a",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap",
];
// install service worker
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});
// activate service worker
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
// fetch event
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cacheRes) => {
      return cacheRes || fetch(e.request);
    })
  );
});
