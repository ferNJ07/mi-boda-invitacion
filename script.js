const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');
const content = document.getElementById('content');
const music = document.getElementById('bg-music');
const audioControl = document.getElementById('audio-control');

// Configuración de volumen inicial
music.volume = 0.5; 

startBtn.addEventListener('click', () => {
    // 1. Desvanecer overlay
    overlay.style.opacity = '0';
    music.play().catch(e => console.log("Audio play prevented"));

    setTimeout(() => {
        overlay.style.display = 'none';
        
        // 2. Mostrar contenedor principal
        content.style.display = 'block';
        
        // 3. Mostrar ICONO DE MÚSICA por separado para evitar errores de renderizado
        audioControl.style.display = 'flex'; 

        setTimeout(() => {
            content.classList.add('visible');
            audioControl.style.opacity = '1'; // Aparece suavemente
            audioControl.classList.add('music-playing'); // Inicia animación
        }, 100);
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
