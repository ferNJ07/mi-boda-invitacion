document.addEventListener("DOMContentLoaded", () => {
    // Selección de elementos del DOM
    const btnEntrar = document.getElementById("btn-entrar");
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");
    const videoContainer = document.getElementById("video-fullscreen-container");
    const video = document.getElementById("wedding-video");
    const invitationDetails = document.getElementById("invitation-details");

    /**
     * Paso 1: Clic en el botón "Abrir Invitación"
     */
    btnEntrar.addEventListener("click", () => {
        // Desvanecer la pantalla de bienvenida (Splash)
        splashScreen.classList.add("fade-out");
        
        // Hacer visible el contenedor del video e invitación
        mainContent.classList.remove("hidden");

        // Activamos el sonido justo tras la acción del usuario y reproducimos
        video.muted = false;
        video.play().catch(error => {
            console.log("La reproducción con audio fue bloqueada por el navegador:", error);
            // Intentar reproducir en silencio si falla catastróficamente
            video.muted = true;
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
