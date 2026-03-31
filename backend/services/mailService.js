const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const sanitize = (str) => str.replace(/[<>]/g, "");

const sendMail = async ({ name, email, message }) => {
    if (!name || !email || !message) {
        throw new Error("All fields are required");
    }

    if (!isValidEmail(email)) {
        throw new Error("Invalid email format");
    }

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);

    await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: process.env.TO_EMAIL,
        reply_to: safeEmail,
        subject: `Portfolio Contact from ${safeName}`,

        text: `
        Name: ${safeName}
        Email: ${safeEmail}
        Message:${safeMessage}
        `,

        html: `
            <h3>New Portfolio Message</h3>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
        `,
    });
};

module.exports = { sendMail };