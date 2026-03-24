export default function initParallax() {
    const hero = document.getElementById('hero');
    const orbs = document.querySelectorAll('.orb');

    if (!hero) return;

    hero.addEventListener('mousemove', e => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        orbs.forEach((o, i) => {
            const factor = (i + 1) * 15;
            o.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });
}