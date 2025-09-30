// src/sw-custom.js
importScripts('https://storage.googleapis.com/workbox-cdn/libs/idb/v7.0.0/idb.min.js');

const DB_NAME = 'GeoNotasDB';
const STORE_NAME = 'notes';

async function getNotes() {
  const db = await idb.openDB(DB_NAME, 1);
  return await db.getAll(STORE_NAME);
}

async function saveNote(note) {
  const db = await idb.openDB(DB_NAME, 1);
  return await db.put(STORE_NAME, note);
}

// 3. El resto de tu lógica de sincronización y notificaciones (esto no cambia)
const syncContent = async () => {
  const allNotes = await getNotes();
  const pendingNotes = allNotes.filter(note => note.syncPending);
  
  if (pendingNotes.length === 0) {
    console.log('SW Sync: No hay notas pendientes.');
    return;
  }
  
  for (const note of pendingNotes) {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        const updatedNote = { ...note, syncPending: false };
        await saveNote(updatedNote);
      }
    } catch (error) {
      console.error(`SW Sync: Falló la sincronización para la nota ${note.id}:`, error);
    }
  }
};

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-new-notes') {
    event.waitUntil(syncContent());
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-new-notes') {
    console.log('SW: Evento de sync recibido');
    event.waitUntil(syncContent());
  }
});

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

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/")
  );
});