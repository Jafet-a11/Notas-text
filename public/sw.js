// sw.js

// Se ejecuta cuando se instala el Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker instalado");
  self.skipWaiting(); // Activa inmediatamente
});

// Se ejecuta cuando se activa
self.addEventListener("activate", (event) => {
  console.log("Service Worker activado");
  return self.clients.claim(); // Reclama el control de las páginas abiertas
});

// Escucha notificaciones push (en caso futuro de integrar push real)
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const title = data.title || "Nueva notificación";
  const options = {
    body: data.body || "Tienes una nueva nota.",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Opcional: manejar clics en la notificación
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // redirige a la home de la app
  );
});
