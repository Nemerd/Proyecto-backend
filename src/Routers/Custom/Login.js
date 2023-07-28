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
}

module.exports = Login