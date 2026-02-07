document.addEventListener("DOMContentLoaded", () => {
    // ---------- Smooth Scroll ----------
    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("section");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetEl = document.querySelector(targetId);

            if (targetEl) {
                targetEl.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // ---------- Scroll Highlight ----------
    window.addEventListener("scroll", () => {
        let currentSection = sections[0]?.id;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        // Fix for last section
        const scrollBottom = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        if (scrollBottom >= pageHeight - 5) {
            currentSection = sections[sections.length - 1]?.id;
        }

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });

    // ---------- Contact Form ----------
    const form = document.getElementById("contact-form");
    const responseMsg = document.getElementById("responseMsg");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const data = {
                name: document.getElementById("name")?.value,
                email: document.getElementById("email")?.value,
                message: document.getElementById("message")?.value
            };

            try {
                const response = await fetch("/contact/contactme", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                responseMsg.innerText = result.message || "Message sent!";
                responseMsg.style.color = "#eb9412";

                form.reset();
            } catch (err) {
                console.error(err);
                responseMsg.innerText = "Error sending message.";
                responseMsg.style.color = "red";
            }
        });
    }

    // ---------- CP Stats ----------
    if (typeof CPStats !== "undefined") {
        const cpStats = new CPStats();
        cpStats.updateDashboard();

        // Refresh every 30 minutes
        setInterval(() => cpStats.updateDashboard(), 1800000);
    }
});
