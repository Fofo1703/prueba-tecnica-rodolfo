

# SUPER QUADS - Sitio Web de Aventura

Este es un sitio web interactivo desarrollado con **React** y **TailwindCSS**. Incluye navegación responsiva, una galería de imágenes animada y un carrusel circular interactivo para destacar los servicios de la empresa.

---

## 📁 Estructura de Componentes

### 1. `Navbar.jsx`
- **Funcionalidad**: Barra de navegación fija en la parte superior, con enlaces a secciones como Tour, Galería de Aventuras y Acerca de.
- **Responsive**: Incluye menú hamburguesa para móviles.
- **Redes sociales**: Botones para WhatsApp, TikTok e Instagram.
- **Acción principal**: Botón de **"RESERVAR"** con ícono de flecha.

---

### 2. `GaleriaAventuras.jsx`
- **Funcionalidad**: Galería de imágenes animada que rota automáticamente cada 3 segundos.
- **Responsive**:
  - En móviles: muestra solo la imagen principal con título y botón.
  - En desktop: muestra la imagen principal más dos imágenes secundarias al lado.
- **Diseño**: Colores oscuros con tipografía impactante tipo `Bebas Neue`.

---

### 3. `CircularImageGallery.jsx`
- **Funcionalidad**: Carrusel circular de tarjetas alrededor de una imagen central (`Llanta.png`). Permite rotar manualmente con el mouse (drag interactivo).
- **Lógica**:
  - El ángulo de rotación se ajusta dinámicamente con el movimiento del mouse.
  - Calcula cuál tarjeta está al frente para mostrar su descripción a la derecha.
- **Responsive**:
  - El radio del círculo y tamaño de las tarjetas se adaptan a pantallas pequeñas, medianas y grandes.
  - En móviles, todo el carrusel aparece centrado gracias a `mx-auto`.

---

## 🖼️ Recursos Utilizados

- Imágenes simuladas desde `https://picsum.photos`.
- Íconos de:
  - `react-icons/fa` para redes sociales.
  - `react-icons/io` para íconos del menú y navegación.

---

# SPara inicar el proyecto se requieren los comandos
    npm install
    npm start

---

## ⚙️ Dependencias necesarias(si ejecuta los comandos anteriores estos no seran requeridos)

Asegúrate de tener las siguientes dependencias instaladas:

```bash
npm install react-icons
npm install tailwindcss
