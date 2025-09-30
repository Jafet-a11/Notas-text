import React, { useState } from 'react';

const EnableNotificationsButton = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const requestPermission = async () => {
    try {
      const userPermission = await Notification.requestPermission();
      setPermission(userPermission);
      if (userPermission === 'granted') {
        console.log('¡Permiso de notificaciones concedido!');
        new Notification('¡Gracias!', { body: 'Las notificaciones han sido activadas.' });
      }
    } catch (error) {
      console.error('Error al solicitar permiso:', error);
    }
  };

if (permission === 'granted') {
  return null; 
}

  return (
    <button onClick={requestPermission} style={{ margin: '1rem', padding: '0.5rem' }}>
      Activar Notificaciones 🔔
    </button>
  );
};
export default EnableNotificationsButton;