const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');
const content = document.getElementById('content');
const music = document.getElementById('bg-music');
const audioControl = document.getElementById('audio-control');

// 1. Iniciar experiencia (Necesario para iOS/Safari)
startBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    content.classList.remove('hidden');
    music.play();
});

// 2. Control de Pausa/Play de música
audioControl.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        audioControl.classList.add('music-playing');
    } else {
        music.pause();
        audioControl.classList.remove('music-playing');
    }
});

// 3. Cuenta regresiva (Ajusta la fecha aquí)
const weddingDate = new Date("Oct 12, 2026 18:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m`;
}, 1000);
