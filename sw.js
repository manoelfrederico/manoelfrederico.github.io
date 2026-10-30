// public/sw.js

// Escuta eventos de push enviados pelos servidores da Apple/Google
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();

  const options = {
    body: data.body || 'Você tem uma nova mensagem!',
    icon: '/icon-192x192.png', // Ajuste para o caminho do ícone do seu PWA
    badge: '/icon-192x192.png',
    data: data.url || '/'
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Notificação', options)
  );
});

// Ação ao clicar na notificação: foca o PWA ou abre /pwa/
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      const pwaClient = clientList.find((client) => {
        try {
          const path = new URL(client.url).pathname;
          return path === '/pwa' || path.startsWith('/pwa/');
        } catch {
          return false;
        }
      });
      if (pwaClient) return pwaClient.focus();
      return clients.openWindow('/pwa/');
    })
  );
});