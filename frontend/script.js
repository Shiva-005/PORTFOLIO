document.addEventListener("DOMContentLoaded", () => {
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

    window.addEventListener("scroll", () => {
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });
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
