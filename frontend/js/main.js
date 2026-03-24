import { loadComponent } from './loader.js';

import initCursor from './modules/cursor.js';
import initScroll from './modules/scroll.js';
import initNavbar from './modules/navbar.js';
import initTyping from './modules/typing.js';
import initReveal from './modules/reveal.js';
import initParallax from './modules/parallax.js';
import initForm from './modules/form.js';
import initStats from './modules/stats.js';
import initResumeModal from './modules/resume_modal.js';
import initResumeDownload from './modules/resumeDownload.js';


if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

async function init() {
    // Load components FIRST

    window.addEventListener("beforeunload", () => {
        localStorage.setItem("scrollPos", window.scrollY);
    });


    await loadComponent("navbar-container", "./components/navbar.html");
    await loadComponent("hero-container", "./components/hero.html");
    await loadComponent("about-container", "./components/about.html");
    await loadComponent("skills-container", "./components/skills.html");
    await loadComponent("competitive-container", "./components/competitive.html");
    await loadComponent("education-container", "./components/education.html");
    await loadComponent("projects-container", "./components/projects.html");
    await loadComponent("contact-container", "./components/contact.html");
    await loadComponent("footer-container", "./components/footer.html");

    // THEN initialize all features
    initApp();

    restoreScroll();
}

function initApp() {
    initCursor();
    initScroll();
    initNavbar();
    initTyping();
    initReveal();
    initParallax();
    initForm();
    initStats();
    initResumeModal();
    initResumeDownload();

    console.log("App Initialized 🚀");
}

function restoreScroll() {
    const scrollPos = localStorage.getItem("scrollPos");

    if (scrollPos) {
        // delay ensures DOM is fully rendered
        setTimeout(() => {
            window.scrollTo(0, parseInt(scrollPos));
        }, 100);
    }
}

init();