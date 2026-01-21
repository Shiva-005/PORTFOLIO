document.addEventListener("DOMContentLoaded", () => {
    // Making hyperLinks
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

    // ---------- FIXED SCROLL HIGHLIGHT ----------
    window.addEventListener("scroll", () => {
        let currentSection = sections[0].getAttribute("id"); // default to first

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // offset to account for nav
            if (scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        // Special fix for the last section
        const scrollBottom = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        if (scrollBottom >= pageHeight - 5) { // near bottom
            currentSection = sections[sections.length - 1].getAttribute("id");
        }

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });

    const form = document.getElementById("contact-form");
    const responseMsg = document.getElementById("responseMsg");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent page reload

        const data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        try {
            const response = await fetch("http://localhost:8000/contact/contactme", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            responseMsg.innerText = result.message;
            responseMsg.style.color = "#eb9412";

            // Clear form fields
            form.reset();

        } catch (err) {
            console.error(err);
            responseMsg.innerText = "Error sending message.";
            responseMsg.style.color = "red";
        }
    });


    const cpStats = new CPStats();
    cpStats.updateDashboard();

    // Update stats every 30 minutes
    setInterval(() => cpStats.updateDashboard(), 1800000);
});
