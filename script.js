const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');
const content = document.getElementById('content');
const music = document.getElementById('bg-music');
const audioControl = document.getElementById('audio-control');

// Configuración de volumen inicial
music.volume = 0.5; 

startBtn.addEventListener('click', () => {
    // 1. Desvanecer overlay negro
    overlay.style.opacity = '0';
    
    // Intentar reproducir música (crítico para iOS)
    music.play().catch(e => console.log("Audio play blocked"));

    setTimeout(() => {
        overlay.style.display = 'none';
        
        // 2. ACTIVAR AUDIO CONTROL (Separado del content)
        audioControl.style.display = 'flex';
        
        // 3. MOSTRAR CONTENIDO
        content.style.display = 'block';

        // 4. DISPARAR ANIMACIONES
        setTimeout(() => {
            content.classList.add('visible');
            audioControl.style.opacity = '1';
            audioControl.classList.add('music-playing');
            // Dentro del evento click de startBtn
        }, 100);
    }, 800);
});

// Control de pausa/play con feedback visual
audioControl.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        audioControl.classList.add('visible');
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
