document.addEventListener("DOMContentLoaded", () => {
    const btnEntrar = document.getElementById("btn-entrar");
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");
    const video = document.getElementById("wedding-video");

    btnEntrar.addEventListener("click", () => {
        // 1. Agregar clase para desvanecer la pantalla de bienvenida
        splashScreen.classList.add("fade-out");

        // 2. Mostrar el contenido principal quitando la clase 'hidden'
        mainContent.classList.remove("hidden");

        // 3. Reproducir el video
        video.play().catch(error => {
            console.log("La reproducción automática fue prevenida por el navegador:", error);
        });

        // 4. Remover por completo el splash del DOM después de la animación CSS (ej. 800ms)
        setTimeout(() => {
            splashScreen.style.display = "none";
        }, 800);
    });
});
