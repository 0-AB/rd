const nodemailer = require('nodemailer');

async function sendMail ( { from,to, subject, text , html } ) { 
     let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS
        }
     });

     let info = await transporter.sendMail({
            from : `inShare < ${from} >` ,
            to: to ,
            subject: subject,
            text: text,
            html: html
     });
}


module.exports = sendMail;