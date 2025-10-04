const ContactForm = require('../models/contactform.js');
const fs = require('fs').promises; // Use promises for async/await
const path = require('path');

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Prepare the text entry to save to contact.txt
        const entry = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n---\n`;

        // Define the file path safely
        const filePath = path.join(__dirname, "../contact.txt");

        // Append the entry to contact.txt
        try {
            await fs.appendFile(filePath, entry);
            console.log("✅ Contact saved to contact.txt");
        } catch (fileErr) {
            console.error("❌ Error writing to file:", fileErr);
            // Optionally, you can return here if file saving is critical
        }

        // Save to MongoDB
        const savedContact = await ContactForm.create({ name, email, message });
        console.log("✅ Contact saved to MongoDB:", savedContact);

        // Send success response
        res.json({ message: "Form submitted and saved successfully!" });

    } catch (err) {
        console.error("❌ Error saving contact:", err);
        res.status(500).json({ error: "Failed to save contact" });
    }
};
