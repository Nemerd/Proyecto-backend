const UserManager = require('../../Controllers/UserManager');
const CustomRouter = require('./CustomRouter');
const nm = require('nodemailer')



class Mailing extends CustomRouter {
    constructor() {
        super()
        this.transport = nm.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: process.env.GOOGLE_APP_MAIL,
                pass: process.env.GOOGLE_APP_PASS
            }
        })
    }
    init() {
        this.post('/mail', async (req, res) => {
            const { mail } = req.body

            const usr = await UserManager.getUser(mail)

            const result = await this.transport.sendMail({
                from: `Backend-Tienda <${process.env.GOOGLE_APP_MAIL}>`,
                to: mail,
                subject: 'Test',
                html: `<h1>Este es tu código de recuperación</h1>
                        <p>Por tu seguridad, por favor no lo compartas con nadie.</p>
                        <p>${usr.security_code}</p>`
            })
            res.redirect('/recoveruser')
        })


    }
}

module.exports = Mailing