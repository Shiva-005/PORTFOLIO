export default function initNavbar() {
    const navbar = document.getElementById('navbar');
    const backTop = document.getElementById('back-top');
    const ham = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    window.addEventListener('scroll', () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 60);
        backTop?.classList.toggle('show', window.scrollY > 500);
    });

    if (ham && mobileNav) {
        ham.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
        });
    }

    const mobileLinks = document.querySelectorAll('#mobile-nav a');

    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');


            mobileNav.classList.remove('open');

            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                targetSection?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}