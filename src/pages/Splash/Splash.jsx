import React, { useEffect, useState } from 'react';
import './Splash.css'; // Archivo CSS para la animación

const Splash = () => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Inicia la transición después de 2 segundos
    const timer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`splash-screen ${isFading ? 'fade-out' : ''}`}>
      <h1>GeoNotas</h1>
      <p>Tus notas, tu mundo.</p>
    </div>
  );
};

export default Splash;