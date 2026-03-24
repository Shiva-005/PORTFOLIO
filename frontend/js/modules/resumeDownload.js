// modules/resumeDownload.js
export default function initResumeDownload() {
    const btn = document.querySelector('.resume-download');

    if (!btn) return;

    btn.addEventListener('click', () => {
        const originalText = btn.innerHTML;

        btn.innerHTML = `<i class="fas fa-check"></i> Downloaded`;

        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    });
}