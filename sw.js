// Permite instalar la app y abrirla sin internet.
// Siempre intenta traer la versión más nueva; si no hay señal, usa la última que guardó.
// Los datos de la familia NO se guardan aquí (los guarda la propia app en el celular de cada uno).
const CACHE = 'cuaderno-app-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (e) => {
  const r = e.request;
  const url = new URL(r.url);
  if (r.method !== 'GET' || url.origin !== self.location.origin) return;
  // Se guarda sin la clave (?k=...), así la clave nunca queda en este almacenamiento.
  const llave = url.origin + url.pathname;
  e.respondWith(
    fetch(r.url, { cache: 'no-cache' })
      .then((res) => {
        if (res.ok) { const copia = res.clone(); caches.open(CACHE).then((c) => c.put(llave, copia)); }
        return res;
      })
      .catch(() => caches.match(llave).then((m) => m || caches.match(url.origin + url.pathname.replace(/[^/]*$/, ''))))
  );
});
