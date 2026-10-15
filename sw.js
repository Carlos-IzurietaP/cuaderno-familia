// Permite instalar la app en el celular. No guarda datos.
// Siempre pide la versión más nueva de la página, para que los cambios se vean enseguida.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method === 'GET' && new URL(r.url).origin === self.location.origin) {
    e.respondWith(fetch(r.url, { cache: 'no-cache' }).catch(() => fetch(r)));
  }
});
