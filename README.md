# GeoNotas - PWA de Notas Geolocalizadas 📝

GeoNotas es una Aplicación Web Progresiva (PWA) construida con React y Vite. Permite a los usuarios crear notas de texto enriquecidas con su ubicación GPS y una foto tomada al momento. La aplicación está diseñada para ser instalable, rápida y funcionar de manera fiable incluso sin conexión a internet.

## Características Principales ✨

* **Funcional Offline:** La aplicación puede abrirse, navegarse y usarse para crear nuevas notas sin conexión a internet.
* **Sincronización de Fondo:** Las notas creadas offline se guardan localmente y se sincronizan automáticamente con el servidor cuando se recupera la conexión.
* **Instalable:** Puede ser añadida a la pantalla de inicio de cualquier dispositivo (móvil o escritorio) para una experiencia de app nativa.
* **Acceso a Hardware Nativo:** Utiliza la **cámara** para tomar fotos y el **GPS** para capturar la ubicación, todo a través de APIs web seguras.
* **Notificaciones:** Envía notificaciones al usuario para confirmar acciones importantes como la creación o eliminación de una nota.
* **Diseño Responsivo:** Interfaz limpia y adaptable a cualquier tamaño de pantalla.

## Tecnologías Utilizadas 🛠️

* **Vite:** Herramienta de construcción y servidor de desarrollo ultrarrápido.
* **React:** Biblioteca para construir la interfaz de usuario.
* **Workbox (a través de `vite-plugin-pwa`):** Para la generación del Service Worker y la gestión avanzada de caché.
* **IndexedDB (con la librería `idb`):** Para el almacenamiento de datos persistente en el navegador.
* **API de Sincronización de Fondo (Background Sync):** Para el reintento automático de envío de datos.
* **APIs Web Nativas:** Geolocation, MediaDevices (Cámara), Notifications.

## Instalación

Sigue estos pasos para levantar una copia local del proyecto.

1.  **Clona el repositorio:**
    ```bash
    git clone [URL-DE-TU-REPOSITORIO-AQUÍ]
    cd NOTAS-TEXT 
    ```

2.  **Instala las dependencias:**
    Se recomienda usar `npm` para la gestión de paquetes.
    ```bash
    npm install
    ```

## Uso

### Modo de Desarrollo

Para iniciar el servidor de desarrollo con recarga en caliente (Hot Module Replacement):

```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

### Modo de Producción

Para probar la versión final y optimizada de la aplicación, incluyendo todas las funcionalidades del Service Worker (offline, sincronización, etc.):

1.  **Construye la aplicación:**
    Este comando creará una carpeta `dist` con todos los archivos estáticos optimizados.
    ```bash
    npm run build
    ```

2.  **Previsualiza la construcción:**
    Este comando levanta un servidor local sirviendo los archivos de la carpeta `dist`.
    ```bash
    npm run preview
    ```

## Estructura del Proyecto

```
/NOTAS-TEXT
├── public/               # Archivos estáticos (manifest, iconos, sw-custom.js)
├── src/
│   ├── components/       # Componentes reutilizables (Header, NoteCard, etc.)
│   ├── hooks/            # Hooks personalizados (useCamera, useGeolocation)
│   ├── pages/            # Vistas principales de la app (Home, Splash)
│   ├── services/         # Lógica de IndexedDB (db.js)
│   ├── App.jsx           # Componente raíz y enrutador
│   └── main.jsx          # Punto de entrada de la aplicación
├── index.html            # Plantilla HTML principal
├── vite.config.js        # Configuración de Vite y PWA
└── README.md             # Este archivo
```
## Dependecias instaladas

```
react-router-dom
vite@5
@ant-design/icons
```