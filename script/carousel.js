function createImageElement(src) {
    const container = document.createElement('div');
    container.classList.add('carousel-item');
    const img = document.createElement('img');
    img.src = src;
    img.alt = "Carousel Image";
    img.width = 600;
    img.height = 400;
    container.appendChild(img);
    return container;
}

function initCarousel(containerId, images) {
    const container = document.getElementById(containerId);
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carousel-container');

    images.forEach(image => {
        const imageElement = createImageElement(image);
        carouselContainer.appendChild(imageElement);
    });

    container.appendChild(carouselContainer);

    const items = carouselContainer.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    items[currentIndex].classList.add('active');

    setInterval(() => {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'assets/1.png',
        'assets/2.png',
        'assets/3.png',
        'assets/4.png',
        'assets/5.png'
    ];
    initCarousel('formation', images);
});