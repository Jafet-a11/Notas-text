import { useRef, useState, useCallback, useEffect } from 'react';

export const useCamera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const startCamera = async () => {
    // Reinicia los estados cada vez que se inicia la cámara
    setIsReady(false);
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsReady(false);
  };

  // Este useEffect se encarga de detectar cuándo el video está listo
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !stream) {
      return;
    }

    const handleCanPlay = () => {
      // Forzamos la reproducción para asegurar que el video corra
      videoElement.play(); 
      setIsReady(true);
      console.log("Video listo y reproduciendo.");
    };

    // Añadimos el listener
    videoElement.addEventListener('canplay', handleCanPlay);

    // Función de limpieza para cuando el componente se desmonte
    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
    };
  }, [stream]); // Se ejecuta cada vez que el 'stream' cambia

  const takePicture = useCallback(() => {
    if (!isReady) {
      console.warn("Intento de tomar foto, pero el video no está listo.");
      return null;
    }
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    return canvas.toDataURL('image/jpeg');
  }, [isReady]);

  return { videoRef, canvasRef, startCamera, stopCamera, takePicture, isCameraOn: !!stream, isReady };
};