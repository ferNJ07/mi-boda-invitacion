document.addEventListener("DOMContentLoaded", () => {
    const btnEntrar = document.getElementById("btn-entrar");
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");
    const videoContainer = document.getElementById("video-fullscreen-container");
    const video = document.getElementById("wedding-video");
    const invitationDetails = document.getElementById("invitation-details");
    
    const bgMusic = document.getElementById("bg-music");
    const btnAudioControl = document.getElementById("btn-audio-control");
    const iconPlaying = document.querySelector(".icon-playing");
    const iconMuted = document.querySelector(".icon-muted");

    video.muted = true; 
    video.load();
    bgMusic.load();

    /**
     * Paso 1: Clic en "Abrir Invitación"
     */
    btnEntrar.addEventListener("click", () => {
        splashScreen.classList.add("fade-out");
        mainContent.classList.remove("hidden");

        video.muted = true;
        video.play().catch(err => console.log("Video autoplay bloqueado:", err));

        bgMusic.play().then(() => {
            btnAudioControl.classList.remove("hidden");
        }).catch(error => {
            console.log("El navegador bloqueó el audio inicial:", error);
        });

        setTimeout(() => {
            splashScreen.style.display = "none";
        }, 800);
    });

    /**
     * Paso 2: El video termina y revela el contenido del pergamino
     */
    video.addEventListener("ended", () => {
        videoContainer.classList.add("fade-out");
        invitationDetails.classList.remove("hidden-content");
        invitationDetails.classList.add("fade-in-content");

        // Inicializar servicios dinámicos del pergamino
        initWeddingCountdown();
        initScrollReveal();

        setTimeout(() => {
            videoContainer.style.display = "none";
        }, 800);
    });

    /**
     * Paso 3: Controlador Flotante Mute / Unmute
     */
    btnAudioControl.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
            iconPlaying.classList.remove("hidden");
            iconMuted.classList.add("hidden");
            btnAudioControl.classList.remove("muted-active");
        } else {
            bgMusic.pause();
            iconPlaying.classList.add("hidden");
            iconMuted.classList.remove("hidden");
            btnAudioControl.classList.add("muted-active");
        }
    });

    /**
     * MOTOR LÓGICO DE LA CUENTA REGRESIVA (TARGET: 21 DE MARZO DE 2027)
     */
    function initWeddingCountdown() {
        const targetDate = new Date("March 21, 2027 17:00:00").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(countdownInterval);
                document.getElementById("days").innerText = "00";
                document.getElementById("hours").innerText = "00";
                document.getElementById("minutes").innerText = "00";
                document.getElementById("seconds").innerText = "00";
                return;
            }

            const d = Math.floor(difference / (1000 * 60 * 60 * 24));
            const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = d < 10 ? "0" + d : d;
            document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
            document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
            document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
        };

        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }

    /**
     * MOTOR DE INTERSECCIÓN NATIVA (SCROLL REVEAL OPTIMIZADO)
     */
    function initScrollReveal() {
        // Seleccionamos las secciones clave que queremos animar al hacer scroll
        const sections = document.querySelectorAll('.invitation-section');
        
        // Configuramos el umbral de disparo (el bloque se activa cuando asoma un 15% en pantalla)
        const observerOptions = {
            root: null, // Usa el viewport del dispositivo móvil por defecto
            rootMargin: "0px 0px -80px 0px", // Margen inferior para anticipar el disparo de forma elegante
            threshold: 0.15 
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Si la sección entra en el rango visual
                if (entry.isIntersecting) {
                    // Inyectamos las clases CSS de revelado y cascada
                    entry.target.classList.add('revealed');
                    
                    // Una vez revelada, dejamos de observarla para liberar memoria RAM en el dispositivo
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Activamos la infraestructura aplicando la clase base y enganchando el observer a cada bloque
        sections.forEach(section => {
            // La primera sección (Inicio) no se oculta para no interferir con la intro cinematográfica
            if (section.getAttribute('id-seccion') !== 'inicio') {
                section.classList.add('reveal-on-scroll');
                sectionObserver.observe(section);
            }
        });
    }
});
