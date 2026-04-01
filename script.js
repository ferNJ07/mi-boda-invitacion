/**
 * LÓGICA DE LA INVITACIÓN - Fernando & Valeria
 */

const music = document.getElementById('bg-music');
const audioControl = document.getElementById('audio-control');

// 1. ANIMACIÓN DE IMÁGENES AL HACER SCROLL
const initRevealEffect = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.masonry-gallery img').forEach(img => observer.observe(img));
};

// 2. INICIO DE LA EXPERIENCIA
document.getElementById('start-btn').addEventListener('click', () => {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('content');

    overlay.style.opacity = '0';
    music.play().catch(() => console.log("Interacción requerida para audio"));

    setTimeout(() => {
        overlay.style.display = 'none';
        content.style.display = 'block';
        
        setTimeout(() => {
            content.classList.add('visible');
            initRevealEffect(); // Activa efectos de galería
            audioControl.classList.add('visible');
            if (!music.paused) audioControl.classList.add('music-playing');
        }, 100);
    }, 800);
});

// 3. CONTROL REPRODUCTOR
audioControl.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        audioControl.classList.add('music-playing');
    } else {
        music.pause();
        audioControl.classList.remove('music-playing');
    }
});

// 4. CUENTA REGRESIVA (Actualización cada minuto)
const weddingDate = new Date("Apr 02, 2027 18:00:00").getTime();

function updateCountdown() {
    const el = document.getElementById("countdown");
    if (!el) return;

    const diff = weddingDate - new Date().getTime();
    if (diff <= 0) { el.innerHTML = "¡LLEGÓ EL DÍA!"; return; }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);

    el.innerHTML = `${d}d : ${h}h : ${m}m`;
}

updateCountdown();
setInterval(updateCountdown, 60000);
