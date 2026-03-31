const { sendMail } = require('../services/mailService');

const handleContactForm = async (req, res) => {
    try {
        await sendMail(req.body);

        res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || "Failed to send message"
        });
    }
};

module.exports = { handleContactForm }; 