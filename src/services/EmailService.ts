import * as nodemailer from 'nodemailer'
import config from '../configs/mail'

class EmailService {
    constructor(
        public to?: string,
        public subject?: string,
        public message?: string
    ) { }


    sendMail() {
        let mailOptions = {
            from: "filipenabrantes@gmail.com",
            to: this.to,
            subject: 'Sorteio Amigo Secreto',
            html:
                `
             <style> 
                msg {
                    background-color: red
                }
             </style>
                <h3 class="msg">Seu amigo secreto é: ${this.message} <h3>
                `,
            template: 'index'
        };

        const transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: false,
            auth: {
                user: config.user,
                pass: config.password
            },
            tls: { rejectUnauthorized: false }
        });

        console.log(mailOptions);

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return error
            } else {
                console.log('Email enviado');
                return
            }
        })
    }
}

export default new EmailService