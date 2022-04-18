import NodeMailer from 'nodemailer';

class Mailer {
    constructor();

    async SendMail() {
        const Mail = NodeMailer.createTransport({
            host: 'localhost',
            port: 25,
        });

        return new Promise((resolve, reject) => {
            Mail.sendMail(
                {
                    from: 'no-reply@furnitura.org',
                    to: To,
                    subject: Title,
                    html: Content,
                },
                (err) => (err ? reject(false) : resolve(true))
            );
        });
    }

    async SendLocalMail (To, Title, Content){
        const testAccount = await NodeMailer.createTestAccount();
        const Mail = NodeMailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        })

        const res = await Mail.sendMail({
            from: 'no-reply@furnitura.org',
            to: To,
            subject: Title,
            html: Content
        })
        console.log('Email Info: ', res);
        console.log('Ethereal Preview Url:', NodeMailer.getTestMessageUrl(info))
        return true;
    }

}


export default new Mailer();