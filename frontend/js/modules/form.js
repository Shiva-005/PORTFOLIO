import { showToast } from "./toast.js";

export default function initForm() {
    const form = document.getElementById("contact-form");

    if (!form) return;

    const API_BASE = window.location.hostname === "localhost" ? "http://localhost:8000" :""

    form.addEventListener("submit", async e => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            return showToast("All fields are required", "error");
        }

        const button = form.querySelector("button");
        button.disabled = true;
        button.innerText = "Sending...";

        try {
            const res = await fetch(`${API_BASE}api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({name,email,message})
            });

            const result = await res.json(); 

            if (res.ok) {
                showToast(result.message || "Message sent!", "success");
                form.reset();
            } else {
                showToast(result.message || "Something went wrong.", "error");
            }

        } catch (err) {
            console.error(err);
            showToast("Network error!", "error");
        }

        button.disabled = false;
        button.innerText = "Send";
    });
}