# Juego de los Corazones ❤️

Una aplicación web interactiva y romántica diseñada para hacer una propuesta especial de San Valentín. Construida con tecnologías modernas para asegurar animaciones fluidas y una experiencia de usuario encantadora.

## ✨ Características

*   **Minijuego Interactivo**: Atrapa corazones para "demostrar tu amor" antes de la pregunta.
*   **Botón "No" Escapadizo**: Un botón que huye del cursor con física divertida y frases dinámicas.
*   **Celebración Espectacular**: Confeti de corazones, GIF temático y mensaje de éxito.
*   **Contador de Relación**: Muestra el tiempo exacto que han estado juntos.
*   **Diseño Responsivo**: Funciona perfectamente en móviles y escritorio.

## 🛠️ Tecnologías

*   **[React](https://react.dev/)** (via Vite): Para la estructura y lógica de componentes.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Para estilizado rápido y responsivo.
*   **[Framer Motion](https://www.framer.com/motion/)**: Para animaciones suaves y gestos.
*   **[Canvas Confetti](https://www.kirilv.com/canvas-confetti/)**: Para los efectos de celebración.

## 🚀 Instalación y Desarrollo Local

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/AlfredoDompablo/HeartApp.git
    cd HeartApp
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

## 📦 Construcción para Producción

Para generar los archivos estáticos optimizados:

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist`.

## ☁️ Guía de Despliegue en Vercel

La forma más rápida de publicar esta aplicación es usando **Vercel**.

### Requisitos previos
*   Tener una cuenta en [Vercel](https://vercel.com).
*   Tener Node.js instalado.

### Pasos

1.  **Instalar Vercel CLI (opcional pero recomendado):**
    ```bash
    npm install -g vercel
    ```

2.  **Iniciar sesión:**
    ```bash
    vercel login
    ```

3.  **Desplegar:**
    Estando en la carpeta del proyecto, ejecuta:
    ```bash
    vercel
    ```
    
    Responde a las preguntas de configuración (puedes aceptar los valores predeterminados con `Enter`).

4.  **Despliegue a Producción (si hiciste cambios):**
    ```bash
    vercel --prod
    ```

¡Listo! Vercel te dará una URL (ej: `https://heart-app.vercel.app`) para compartir.

## 📝 Créditos

Desarrollado con ❤️ por **AlfredoDompablo**.
