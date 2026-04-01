/**
 * SCRIPT FINAL OPTIMIZADO - BODA FERNANDO & VALERIA
 * Incluye correcciones de visibilidad y rendimiento.
 */

// 1. SELECTORES GLOBALES
const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');
const content = document.getElementById('content');
const music = document.getElementById('bg-music');
const audioControl = document.getElementById('audio-control');

// Configuración de volumen inicial
music.volume = 0.5;

// 2. FUNCIÓN DE REVELADO DE IMÁGENES (Scroll)
const initRevealEffect = () => {
    const images = document.querySelectorAll('.masonry-gallery img');
    if (images.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    images.forEach(img => observer.observe(img));
};

// 3. LÓGICA DE INICIO DE EXPERIENCIA (CORREGIDA)
if (startBtn) {
    startBtn.addEventListener('click', () => {
        // Desvanecer el overlay negro
        overlay.style.opacity = '0';
        
        // Intentar reproducir música (necesario por políticas de navegador)
        music.play().catch(e => console.log("Audio esperando interacción del usuario"));

        setTimeout(() => {
            // Ocultar overlay y preparar contenido
            overlay.style.display = 'none';
            
            // EL SEGURO: Forzamos la visibilidad del contenido principal
            content.style.display = 'block';
            
            // Pequeño delay para asegurar que el display:block se procese
            requestAnimationFrame(() => {
                content.classList.add('visible');
                
                // Inicializar animaciones de galería
                initRevealEffect();
                
                // Mostrar controles de audio
                setTimeout(() => {
                    if (audioControl) {
                        audioControl.classList.add('visible');
                        if (!music.paused) audioControl.classList.add('music-playing');
                    }
                }, 400);
            });
        }, 800);
    });
}

// 4. CONTROL DE AUDIO (PLAY/PAUSE)
if (audioControl) {
    audioControl.addEventListener('click', () => {
        if (music.paused) {
            music.play().then(() => {
                audioControl.classList.add('music-playing');
            }).catch(e => console.error("Error al reproducir:", e));
        } else {
            music.pause();
            audioControl.classList.remove('music-playing');
        }
    });
}

// 5. CUENTA REGRESIVA (Optimizada)
const weddingDate = new Date("Apr 02, 2027 18:00:00").getTime();

const updateCountdown = () => {
    const countdownElement = document.getElementById("countdown");
    if (!countdownElement) return;

    const now = new Date().getTime();
    const dist = weddingDate - now;
    
    if (dist < 0) {
        countdownElement.innerHTML = "¡LLEGÓ EL DÍA!";
        return;
    }

    const d = Math.floor(dist / (1000 * 60 * 60 * 24));
    const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));

    countdownElement.innerHTML = `${d}d : ${h}h : ${m}m`;
};

// Ejecución inicial y actualización cada minuto
updateCountdown();
setInterval(updateCountdown, 60000);
