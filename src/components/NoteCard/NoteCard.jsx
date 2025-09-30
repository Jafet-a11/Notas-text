import React from 'react';
import './NoteCard.css';
import { DeleteOutlined } from "@ant-design/icons";
// Ahora recibe una nueva prop: onDelete
const NoteCard = ({ note, onDelete }) => { 
  const { text, photo, location } = note;

  // Función que se llama al hacer clic en el botón de eliminar
  const handleDeleteClick = (e) => {
    // Detenemos la propagación para evitar que otros clics se activen
    e.stopPropagation(); 
    // Preguntamos al usuario para confirmar
    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      onDelete(note.id); // Llamamos a la función que nos pasaron desde Home
    }
  };

  return (
    <article className="note-card">
      {/* --- 👇 NUEVO BOTÓN --- */}
      <button onClick={handleDeleteClick} className="delete-btn"><DeleteOutlined /></button>
      
      {photo && <img src={photo} alt="Foto de la nota" className="note-photo" />}
      
      <div className="note-content">
        <p className="note-text">{text}</p>
        
        {location && (
          <small className="note-location">
            📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </small>
        )}
      </div>
    </article>
  );
};

export default NoteCard;