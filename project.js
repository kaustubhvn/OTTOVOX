document.addEventListener('DOMContentLoaded', () => {
    const hoverSound = new Audio('hover-sound.mp3'); // Replace with your sound file
    const techItems = document.querySelectorAll('.tech-item');

    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => hoverSound.play());
    });
});
