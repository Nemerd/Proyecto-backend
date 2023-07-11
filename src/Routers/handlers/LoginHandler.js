const { UserManager } = require('../../Controllers/UserManager')

class LoginHandler {
    async githubcallback(request, response) {
        const tmpUsr = await UserManager.getSpecificUser({ _id: request.session.passport.user })
        if (tmpUsr) {
            response.cookie('user', tmpUsr.email, { signed: true })
            response.cookie('role', tmpUsr.role, { signed: true })
        }
        response.redirect(302, "/hbs")
    }

    async createUser(request, response) {
        const { user, password } = request.body
        await UserManager.createUser({
            user: user,
            password: password
        })
        response.render('layouts/home')
    }

    async login(request, response) {
        response.render('layouts/login')
    }

    async register(request, response) {
        response.render('layouts/register')
    }
}

module.exports = new LoginHandler