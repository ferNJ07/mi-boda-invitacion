document.addEventListener("DOMContentLoaded", () => {
    const btnEntrar = document.getElementById("btn-entrar");
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");
    const videoContainer = document.getElementById("video-fullscreen-container");
    const video = document.getElementById("wedding-video");
    const invitationDetails = document.getElementById("invitation-details");
    
    // Nuevos elementos de audio
    const bgMusic = document.getElementById("bg-music");
    const btnAudioControl = document.getElementById("btn-audio-control");
    const iconPlaying = document.querySelector(".icon-playing");
    const iconMuted = document.querySelector(".icon-muted");

    // Forzar video e instrucciones de carga listos en background
    video.muted = true; 
    video.load();
    bgMusic.load();

    /**
     * Paso 1: Clic en el botón "Abrir Invitación"
     */
    btnEntrar.addEventListener("click", () => {
        splashScreen.classList.add("fade-out");
        mainContent.classList.remove("hidden");

        // Reproducir video (estrictamente silenciado para compatibilidad absoluta en Pixel/iPhone)
        video.muted = true;
        video.play().catch(err => console.log("Video autoplay bloqueado:", err));

        // INICIAR LA MÚSICA EN MP3 TRAS LA INTERACCIÓN DEL USUARIO
        bgMusic.play().then(() => {
            // Mostrar el botón flotante de audio solo cuando la música empiece con éxito
            btnAudioControl.classList.remove("hidden");
        }).catch(error => {
            console.log("El navegador bloqueó el audio inicial:", error);
        });

        setTimeout(() => {
            splashScreen.style.display = "none";
        }, 800);
    });

    /**
     * Paso 2: El video termina automáticamente y revela la invitación
     */
    video.addEventListener("ended", () => {
        videoContainer.classList.add("fade-out");
        invitationDetails.classList.remove("hidden-content");
        invitationDetails.classList.add("fade-in-content");

        setTimeout(() => {
            videoContainer.style.display = "none";
        }, 800);
    });

    /**
     * Paso 3: Lógica del Botón Mute / Unmute Flotante
     */
    btnAudioControl.addEventListener("click", () => {
        if (bgMusic.paused) {
            // Si estaba pausado, lo reproducimos
            bgMusic.play();
            iconPlaying.classList.remove("hidden");
            iconMuted.classList.add("hidden");
            btnAudioControl.classList.remove("muted-active");
        } else {
            // Si estaba reproduciéndose, lo pausamos
            bgMusic.pause();
            iconPlaying.classList.add("hidden");
            iconMuted.classList.remove("hidden");
            btnAudioControl.classList.add("muted-active");
        }
    });
});
