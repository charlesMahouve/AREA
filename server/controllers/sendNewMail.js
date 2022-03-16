
const nodemailer = require("nodemailer")

async function sendNewMail (token, user) {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'hugopro.maltese@gmail.com',
            clientId: '833149036139-3kojd93tjv8renn78ccjeleo80noja8p.apps.googleusercontent.com',
            clientSecret: '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',
            accessToken: token,
        },
    });

    const mailOptions = {
        from: 'SENDER NAME <yours authorised email address@gmail.com>',
        to: user.email,
        subject: 'Hello from gmail using API',
        text: 'Hello from gmail email using API',
        html: '<h1>Hello from gmail email using API</h1>',
    };
    transport.sendMail(mailOptions).then(result => {
        console.log(result)
    })
}

module.exports = { sendNewMail }