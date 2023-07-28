const CustomRouter = require('./CustomRouter');
const passport = require('passport')

class Cookies extends CustomRouter {
    constructor() {
        super()
    }

    dependencies() {
        this.ch = require('../handlers/CookieHandler')
    }
    init() {
        this.post('/JWTLogin', this.ch.JWTLogin)

        this.get('/checkCookie', this.ch.checkUnsignedCookie)

        this.get('/checkSignedCookie', this.ch.checkSignedCookie)

        this.post('/current',
            this.ch.checkAdmin,
            passport.authenticate('sign-in'),
            this.ch.setCookie)

        this.delete('/deleteCookies', this.ch.deleteCookies)
    }
}

module.exports = Cookies