import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    // Configuración de PWA
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      // Configuración del Manifest de la App
      manifest: {
        name: 'GeoNotas - Notas Geolocalizadas',
        short_name: 'GeoNotas',
        description: 'Una aplicación PWA para crear notas con tu ubicación y una foto.',
        theme_color: '#333333',
        background_color: '#242424',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '.',
        icons: [
          {
            src: '/icons/location.jpg',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icons/Foto.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },

      // Configuración del Service Worker (Workbox)
      workbox: {
        // Precacheo de archivos de la app (el "cascarón")
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        
        // Inyecta nuestro código personalizado (para sync y push)
        importScripts: ['src/sw-custom.js'],
        
        // Reglas de caché en tiempo de ejecución para contenido dinámico
        runtimeCaching: [
          // Regla 1: Cachear la navegación y recarga de la página
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
          // Regla 2: Cachear las peticiones a la API
          {
            // Asume que tu API está en '/api/...'
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-data-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
        ],
      },
    }),
  ],
});