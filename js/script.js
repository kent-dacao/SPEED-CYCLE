document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.navbar ul');

    hamburger.addEventListener('click', () => {
        navList.classList.toggle('show');
    });
});
