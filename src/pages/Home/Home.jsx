import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import NoteCard from '../../components/NoteCard/NoteCard';
import NewNoteModal from '../../components/NewNoteModal/NewNoteModal';
import EnableNotificationsButton from '../../components/EnableNotificationsButton/EnableNotificationsButton';
import { getNotes, saveNote, deleteNote } from '../../services/db';
import './Home.css';
async function showNotification(title, options) {
  if ('serviceWorker' in navigator && Notification.permission === 'granted') {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, options);
    } catch (error) {
      console.error('Error al mostrar la notificación vía Service Worker:', error);
    }
  }
}

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      const localNotes = await getNotes();
      setNotes(localNotes);
      setLoading(false);
    }
    loadNotes();
  }, []);

  const handleSaveNote = async (newNote) => {
    await saveNote(newNote);
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setIsModalOpen(false);

    showNotification('¡Nueva GeoNota Creada!', {
      body: 'Tu nota ha sido guardada con éxito.',
      icon: '/icons/icon-192x192.png',
      tag: 'nota-guardada'
    });
  };

  const handleDeleteNote = async (idToDelete) => {
    await deleteNote(idToDelete);
    setNotes(prevNotes => prevNotes.filter(note => note.id !== idToDelete));
  
    showNotification('Nota eliminada', {
      body: 'La nota ha sido borrada correctamente.',
      icon: '/icons/icon-192x192.png',
      tag: 'nota-eliminada'
    });
  };

  if (loading) return <div>Cargando notas...</div>;

  return (
    <div className="home-container">
      <Header title="Mis GeoNotas" />
      <EnableNotificationsButton />
      <main className="notes-grid">
        {notes.length > 0 ? (
          notes.map(note => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onDelete={handleDeleteNote} 
            />
          ))
        ) : (
          <p>Aún no tienes notas. ¡Crea una!</p>
        )}
      </main>
      
      <button className="add-note-btn" onClick={() => setIsModalOpen(true)}>+</button>
      
      {isModalOpen && (
        <NewNoteModal 
          onSave={handleSaveNote} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default Home;