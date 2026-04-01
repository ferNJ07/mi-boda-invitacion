const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');
const content = document.getElementById('content');
const music = document.getElementById('bg-music');
const audioControl = document.getElementById('audio-control');

// 1. CONFIGURACIÓN INICIAL
music.volume = 0.5; 

// 2. ANIMACIÓN DE GALERÍA (REVEAL ON SCROLL)
const revealImages = () => {
    const images = document.querySelectorAll('.masonry-gallery img');
    
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

// 3. LÓGICA DE INICIO DE EXPERIENCIA
startBtn.addEventListener('click', () => {
    overlay.style.opacity = '0';
    
    // Intento de reproducción inmediata (necesario para iOS)
    music.play().catch(e => console.log("Audio en espera de interacción"));

    setTimeout(() => {
        overlay.style.display = 'none';
        content.style.display = 'block';

        setTimeout(() => {
            content.classList.add('visible');
            
            // Iniciamos la vigilancia de las imágenes del Dress Code
            revealImages();
            
            setTimeout(() => {
                audioControl.classList.add('visible');
                // Sincronizamos el icono con el estado real del audio
                if (!music.paused) audioControl.classList.add('music-playing');
            }, 300);
            
        }, 50);
    }, 800);
});

// 4. CONTROL DE AUDIO (PLAY/PAUSE)
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

// 5. CUENTA REGRESIVA
const weddingDate = new Date("Apr 02, 2027 18:00:00").getTime();

const updateCountdown = () => {
    const countdownElement = document.getElementById("countdown");
    if (!countdownElement) return; // Evita errores si el ID no existe

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

// Ejecutar contador inmediatamente y luego cada minuto
updateCountdown();
setInterval(updateCountdown, 60000);
