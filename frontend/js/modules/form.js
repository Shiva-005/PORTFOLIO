import { showToast } from "./toast.js";

export default function initForm() {
    const form = document.getElementById("contact-form");

    if (!form) return;

    form.addEventListener("submit", async e => {
        e.preventDefault();

        const data = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };

        try {
            const res = await fetch("http://localhost:8000/api/contact", { // ✅ FIXED
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json(); // 🔥 useful

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
    });
}