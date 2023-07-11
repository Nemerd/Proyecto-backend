const CustomRouter = require('./CustomRouter');

class Login extends CustomRouter {
    constructor() {
        super()
    }

    dependencies() {
        this.lh = require('../handlers/LoginHandler')
        this.passport = require('passport')
    }

    init() {
        this.get('/', this.lh.login)

        this.get('/register', this.lh.register)

        this.post('/createUser', this.lh.createUser)

        this.get('/github', this.passport.authenticate('github', { scope: ['user:email'] }))

        this.get('/githubcallback',
            this.passport.authenticate('github', { failureRedirect: '/' }),
            this.lh.githubcallback)
    }

    customResponses(req, res, next) {
        res.sendSuccess = payload => res.send({ status: 'Success', payload })
        res.sendServerError = error => res.send({ status: 'Server Error', error })
        res.sendUserError = error => res.send({ status: 'User Error', error })
        next()
    }
}

module.exports = Login