export default function initScroll() {
    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("section");
    const progress = document.getElementById("scroll-progress");

    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            const href = link.getAttribute("href");

            if (!href.startsWith("#")) return;

            e.preventDefault();

            const target = document.querySelector(href);
            target?.scrollIntoView({ behavior: "smooth" });
        });
    });

    window.addEventListener("scroll", () => {
        let current = sections[0]?.id;

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 80) {
                current = section.id;
            }
        });

        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 5) {
            current = sections[sections.length - 1]?.id;
        }

        navLinks.forEach(link => {
            const href = link.getAttribute("href");

            if (href.startsWith("#")) {
                link.classList.toggle(
                    "active",
                    href === `#${current}`
                );
            }
        });

        if (progress) {
            const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            progress.style.width = Math.min(pct, 100) + "%";
        }
    }, { passive: true });
}