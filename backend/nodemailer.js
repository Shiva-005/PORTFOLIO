const nodemailer = require('nodemailer');

// Create a transporter using your email service credentials

const transporter = nodemailer.createTransport(
    {
        secure: true,
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }
);

function sendEmail(name, email, message) {
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Send to yourself
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return reject(error);
            }
            console.log('Email sent:', info.response);
            resolve(info);
        });
    });
}

module.exports = sendEmail;