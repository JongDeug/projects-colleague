const nodemailer = require('nodemailer');
require('dotenv').config();

const test = async () => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS 
        }
    });

    let info = await transporter.sendMail({
        from: `"SEMOBAN 👻" <${process.env.GMAIL_USER}>`, // sender address
        to: "pinpointD1998@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "semoban", // plain text body
        html: "<h1>Semoban</h1>", // html body
    });

    console.log("Message sent: %s", info.messageId);
}

test().catch(console.err);