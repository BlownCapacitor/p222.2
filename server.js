const express = require("express");
const app = express();
const server = require("http").Server(app);
app.use(express.json())

var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'blowncapacitor1@gmail.com',
        pass: 'wezikkerjptuvejk',
    },
    secure: true,
});

app.post("/send-mail", (req, res) => {
    const to = req.body.to;
    const name = req.body.name;
    const date = req.body.date;
    const mailData = {
        from: "blowncapacitor1@gmail.com",
        to: to,
        subject: "Project 222",
        html: ` <p>
                    Hello ${name},
                </p>
                <p>
                    This tester email was sent via SMTP and Node Mailer on ${date}
                </p>`
               
    };
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail Sent!", message_id: info.messageId });
    });
})

server.listen(process.env.PORT || 3030);