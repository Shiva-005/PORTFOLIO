const nodemailer = require('nodemailer');

const sendMail = async ({ name, email, message }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `Portfolio Contact from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Message: ${message}
        `,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendMail };