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

    const profileImg = document.getElementById("profile-img");
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close-btn");

    profileImg.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = profileImg.src;
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    const ctx = document.getElementById('problemSolvingGraph').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Problems Solved',
                data: [20, 15, 45, 60, 29, 10, 20, 45, 40, 50, 20, 30], // Replace with actual CP data
                borderColor: '#eb9412',
                backgroundColor: 'rgba(235, 148, 18, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#aaa8a6'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#aaa8a6' }
                },
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#aaa8a6' }
                }
            }
        }
    });

    const cpStats = new CPStats();
    cpStats.updateDashboard();

    // Update stats every 30 minutes
    setInterval(() => cpStats.updateDashboard(), 1800000);
});
