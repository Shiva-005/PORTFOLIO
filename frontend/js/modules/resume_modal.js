// Resume Modal Module
export default function initResumeModal() {
    const modal = document.getElementById("resumeModal");
    const iframe = document.getElementById("resumeIframe");
    const viewBtn = document.querySelector('.btn-secondary[href$="Shiva_Singh_Tomar_Resume.pdf"]'); // View Resume button
    const closeBtn = modal.querySelector(".resume-modal-close");

    // Open modal
    viewBtn.addEventListener("click", (e) => {
        e.preventDefault(); // prevent default anchor
        modal.style.display = "block";
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside content
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}