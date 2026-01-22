const sendEmail = require('../nodemailer.js');

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Send email notification
        try {
            await sendEmail(name, email, message);
            console.log("✅ Email sent successfully");
        } catch (emailErr) {
            console.error("❌ Error sending email:", emailErr);
        }

        // Send success response
        res.json({ message: "Form submitted successfully!" });

    } catch (err) {
        res.status(500).json({ error: "Failed to sendEmail to this contact" });
    }
};
