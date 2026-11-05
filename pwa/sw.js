/* global clients */
// public/sw.js

self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || 'You have a new message!',
    icon: '/pwa/icon1.png',
    badge: '/pwa/icon1.png',
    data: { url: data.url || '/pwa/' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Notification', options)
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
