document.addEventListener('DOMContentLoaded', function() {
    const carouselImages = document.querySelectorAll('.logo-carousel-img');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let counter = 0;

    // Affiche la première image
    carouselImages[counter].classList.add('active');

    // Event listener pour le bouton suivant
    nextBtn.addEventListener('click', () => {
        carouselImages[counter].classList.remove('active'); // Masque l'image actuelle
        counter = (counter + 1) % carouselImages.length; // Incrémente le compteur
        carouselImages[counter].classList.add('active'); // Affiche la nouvelle image
    });

    // Event listener pour le bouton précédent
    prevBtn.addEventListener('click', () => {
        carouselImages[counter].classList.remove('active'); // Masque l'image actuelle
        counter = (counter - 1 + carouselImages.length) % carouselImages.length; // Décrémente le compteur
        carouselImages[counter].classList.add('active'); // Affiche la nouvelle image
    });
});