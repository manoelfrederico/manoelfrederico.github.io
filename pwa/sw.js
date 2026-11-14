/* global clients */
// public/sw.js

const CACHE_NAME = 'pwa-shell-v2';
const SHELL_URL = '/pwa/';

// App shell: the Gym screens are used with a bad signal, so keep the latest index.html and every
// hashed asset of the same origin available. Supabase requests are cross-origin and never cached.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.add(SHELL_URL))
      .catch(() => undefined)
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith('/pwa')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(SHELL_URL, copy));
          return response;
        })
        .catch(() => caches.match(SHELL_URL).then((cached) => cached || Response.error())),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached || Response.error());

      return cached || network;
    }),
  );
});

self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || 'You have a new message!',
    icon: '/pwa/icon1.png',
    badge: '/pwa/icon1.png',
    data: { url: data.url || '/pwa/' },
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Notification', options),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil((async () => {
    const requestedUrl = event.notification.data && event.notification.data.url;
    let targetUrl;

    try {
      targetUrl = new URL(requestedUrl || '/pwa/', self.location.origin);
      if (targetUrl.origin !== self.location.origin || !targetUrl.pathname.startsWith('/pwa')) {
        targetUrl = new URL('/pwa/', self.location.origin);
      }
    } catch {
      targetUrl = new URL('/pwa/', self.location.origin);
    }

    const clientList = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    const pwaClient = clientList.find((client) => {
      try {
        const clientUrl = new URL(client.url);
        return clientUrl.origin === self.location.origin && clientUrl.pathname.startsWith('/pwa');
      } catch {
        return false;
      }
    });

    if (pwaClient) {
      const navigatedClient = await pwaClient.navigate(targetUrl.href);
      return (navigatedClient || pwaClient).focus();
    }

    return clients.openWindow(targetUrl.href);
  })());
});
