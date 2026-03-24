export default function initTyping() {
    const el = document.getElementById('hero-typed');
    if (!el) return;

    const phrases = [
        'Full Stack Developer',
        'Problem Solver',
        'DSA Enthusiast',
    ];

    let i = 0, j = 0, del = false;

    function type() {
        const text = phrases[i];
        el.textContent = del ? text.slice(0, j--) : text.slice(0, j++);

        if (!del && j > text.length) {
            del = true;
            return setTimeout(type, 1500);
        }

        if (del && j < 0) {
            del = false;
            i = (i + 1) % phrases.length;
        }

        setTimeout(type, del ? 40 : 70);
    }

    type();
}