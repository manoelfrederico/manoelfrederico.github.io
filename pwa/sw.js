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

// Ação ao clicar na notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // Abre a URL configurada ou foca na janela atual
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow(event.notification.data);
    })
  );
});