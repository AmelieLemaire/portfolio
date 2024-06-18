document.addEventListener('DOMContentLoaded', function() {
    const carouselSlide = document.querySelector('.logo-carousel-slide');
    const carouselImages = document.querySelectorAll('.logo-carousel-img');

    // Buttons
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    // Counter
    let counter = 0;
    const size = carouselImages[0].clientWidth + 20; // Adding margin to the width

    // Event listeners
    nextBtn.addEventListener('click', () => {
        if (counter >= carouselImages.length - 4) return; // Adjusted to 1 because we have 2 images
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        counter++;
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    });

    prevBtn.addEventListener('click', () => {
        if (counter <= 0) return;
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';
        counter--;
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    });
});