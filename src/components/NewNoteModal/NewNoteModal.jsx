import React, { useState, useRef, useEffect } from 'react';
import { useGeolocation } from '../../hooks/useGeolocation';
import './NewNoteModal.css';

const NewNoteModal = ({ onSave, onClose }) => {
  const [text, setText] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { location } = useGeolocation();

  // EFECTO PARA MANEJAR LA CÁMARA
  useEffect(() => {
    const videoElement = videoRef.current;
    
    const startCamera = async () => {
      try {
        console.log('[DEBUG] 1. Intentando iniciar la cámara...');
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoElement) {
          console.log('[DEBUG] 2. Stream obtenido, asignando a video.');
          videoElement.srcObject = stream;
        }
      } catch (error) {
        console.error('[DEBUG] ERROR AL INICIAR CÁMARA:', error);
      }
    };

    const stopCamera = () => {
      if (videoElement && videoElement.srcObject) {
        videoElement.srcObject.getTracks().forEach(track => track.stop());
        videoElement.srcObject = null;
        console.log('[DEBUG] Cámara detenida.');
      }
    };

    // --- Lógica de encendido y apagado ---
    if (isCameraOn) {
      startCamera();
    } else {
      stopCamera();
    }

    // --- Listener de evento ---
    const handleCanPlay = () => {
      console.log('[DEBUG] ✅ 3. Evento "canplay" detectado. Video listo.');
      setIsReady(true);
      videoElement.play();
    };

    if (videoElement) {
      videoElement.addEventListener('canplay', handleCanPlay);
    }
    
    // Función de limpieza
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('canplay', handleCanPlay);
        stopCamera();
      }
    };
  }, [isCameraOn]); // Se ejecuta cada vez que cambiamos el estado de la cámara

  const handleToggleCamera = () => {
    setIsCameraOn(prev => !prev);
    setCapturedImage(null);
    setIsReady(false);
  };

  const handleCapture = () => {
    if (!isReady || !videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setCapturedImage(canvas.toDataURL('image/jpeg'));
    console.log('[DEBUG] Foto capturada.');
  };
  
  const handleSave = () => {
    onSave({ id: Date.now(), text, photo: capturedImage, location });
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Nueva GeoNota</h2>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <div className="hardware-controls">
          <button onClick={handleToggleCamera}>
            {isCameraOn ? '📷 Apagar Cámara' : '📷 Encender Cámara'}
          </button>
        </div>
        {isCameraOn && (
          <div className="camera-view">
            {capturedImage ? <img src={capturedImage} alt="Captura"/> : <video ref={videoRef} autoPlay playsInline muted />}
            {capturedImage ? (
              <button onClick={() => setCapturedImage(null)}>Tomar Otra</button>
            ) : (
              <button onClick={handleCapture} disabled={!isReady}>
                {isReady ? 'Capturar Foto' : 'Cargando...'}
              </button>
            )}
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default NewNoteModal;