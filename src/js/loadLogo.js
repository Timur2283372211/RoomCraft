window.addEventListener('load', function() {
    // Затримка для демонстрації (можна прибрати)
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('preloader--hidden');
        
        // Видалити прелоадер після завершення анімації
        preloader.addEventListener('transitionend', function() {
            preloader.remove();
        });
    }, 1500); // 1.5 секунди - час показу прелоадера
});