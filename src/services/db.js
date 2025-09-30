import { openDB } from 'idb';

const DB_NAME = 'GeoNotasDB';
const STORE_NAME = 'notes';

async function initDB() {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
  return db;
}

export async function getNotes() {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
}

export async function saveNote(note) {
  const db = await initDB();
  return await db.put(STORE_NAME, note);
}

// --- 👇 NUEVA FUNCIÓN ---
export async function deleteNote(id) {
  const db = await initDB();
  return await db.delete(STORE_NAME, id);
}