const nodemailer = require('nodemailer');

async function sendMail({ from, to, subject, text, html }) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure:false,
            auth: {
                user: process.env.Mail_User,
                pass: process.env.Mail_Pass
            }
        });
        let info = await transporter.sendMail({
            from: `inShare <${from}>`, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html // html body
        });

    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // rethrow the error to handle it in the calling code if needed
    }
}

module.exports = sendMail;
