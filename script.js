document.addEventListener("DOMContentLoaded", () => {
    // Selección de elementos del DOM
    const btnEntrar = document.getElementById("btn-entrar");
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");
    const videoContainer = document.getElementById("video-fullscreen-container");
    const video = document.getElementById("wedding-video");
    const invitationDetails = document.getElementById("invitation-details");

    // Forzar que el video esté listo en segundo plano para evitar pantallas negras
    video.load();

    /**
     * Paso 1: Clic en el botón "Abrir Invitación"
     */
    btnEntrar.addEventListener("click", () => {
        // Desvanecer la pantalla de bienvenida (Splash)
        splashScreen.classList.add("fade-out");
        
        // Hacer visible el contenedor del video e invitación
        mainContent.classList.remove("hidden");

        // SECUENCIA CRÍTICA PARA PIXEL / CHROMIUM PURE:
        // 1. Iniciamos la reproducción manteniendo el 'muted' nativo del HTML
        video.play().then(() => {
            // 2. Una vez que el dispositivo confirma que el video corre, activamos el audio de forma segura
            video.muted = false;
        }).catch(error => {
            console.log("Error en reproducción inicial, reintentando con desmutado directo:", error);
            // Callback de respaldo si el dispositivo viene de un estado de ahorro de batería estricto
            video.muted = false;
            video.play();
        });

        // Remover el Splash del flujo tras terminar su transición CSS
        setTimeout(() => {
            splashScreen.style.display = "none";
        }, 800);
    });

    /**
     * Paso 2: El video termina su reproducción automáticamente
     */
    video.addEventListener("ended", () => {
        // Desvanecer el contenedor del video a pantalla completa
        videoContainer.classList.add("fade-out");

        // Revelar suavemente la información de la invitación (efecto fade-in)
        invitationDetails.classList.remove("hidden-content");
        invitationDetails.classList.add("fade-in-content");

        // Remover el contenedor de video del flujo para liberar rendimiento móvil
        setTimeout(() => {
            videoContainer.style.display = "none";
        }, 800);
    });
});
