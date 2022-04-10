// install service worker
self.addEventListener("install", (e) => {
  console.log("installed");
});
// activate service worker
self.addEventListener("activate", (e) => {
  console.log("activated");
});
