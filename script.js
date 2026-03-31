const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');
const content = document.getElementById('content');
const music = document.getElementById('bg-music');
const audioControl = document.getElementById('audio-control');

// Configuración de volumen inicial
music.volume = 0.5; 

startBtn.addEventListener('click', () => {
    // 1. Iniciar desvanecimiento del overlay
    overlay.style.opacity = '0';
    
    // 2. Intentar reproducir música inmediatamente (importante para iOS)
    music.play().catch(error => console.log("Esperando interacción..."));

    setTimeout(() => {
        overlay.style.display = 'none';
        content.style.display = 'block'; // Asegura que el layout se calcule
        
        // Pequeño delay para que el navegador procese el display:block antes del opacity
        setTimeout(() => {
            content.classList.add('visible');
        }, 50);
    }, 800);
});

// Control de pausa/play con feedback visual
audioControl.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        audioControl.classList.add('music-playing');
    } else {
        music.pause();
        audioControl.classList.remove('music-playing');
    }
});

// Cuenta regresiva optimizada
const weddingDate = new Date("Jun 30, 2025 18:00:00").getTime(); // Ajusta tu fecha aquí

setInterval(() => {
    const now = new Date().getTime();
    const dist = weddingDate - now;
    
    const d = Math.floor(dist / (1000 * 60 * 60 * 24));
    const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("countdown").innerHTML = `${d}d : ${h}h : ${m}m`;
}, 1000);
