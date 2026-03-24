const asyncHandler = require('../utils/asyncHandler');
const { sendMail } = require('../services/mailService');

exports.contactForm = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    // ✅ Validation
    if (!name || !email || !message) {
        res.status(400);
        throw new Error('All fields are required');
    }

    await sendMail({ name, email, message });

    res.status(200).json({
        success: true,
        message: 'Message sent successfully',
    });
});