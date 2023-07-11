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
        this.post('/setCookie', this.ch.checkAdmin,
            passport.authenticate('sign-in'),
            this.ch.setCookie)

        this.get('/checkCookie', this.ch.checkUnsignedCookie)

        this.get('/checkSignedCookie', this.ch.checkSignedCookie)

        this.delete('/deleteCookies', this.ch.deleteCookies)
    }

    customResponses(req, res, next) {
        res.sendSuccess = payload => res.send({ status: 'Success', payload })
        res.sendServerError = error => res.send({ status: 'Server Error', error })
        res.sendUserError = error => res.send({ status: 'User Error', error })
        next()
    }
}

module.exports = Cookies