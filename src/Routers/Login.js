const { Router } = require('express')
const { UserManager } = require('../libs/UserManager')
const passport = require('passport')
const Login = Router()

Login.get('/', async (request, response) => {
    response.render('layouts/login')
})

Login.get('/register', async (request, response) => {
    response.render('layouts/register')
})

Login.post('/createUser', async (request, response) => {
    const { user, password } = request.body
    await UserManager.createUser({
        user: user,
        password: password
    })
    response.render('layouts/home')
})

Login.get('/github', passport.authenticate('github', { scope: ['user:email'] }))

Login.get('/githubcallback',
    passport.authenticate('github', { failureRedirect: '/' }),
    async (request, response) => {
        const tmpUsr = await UserManager.getSpecificUser({ _id: request.session.passport.user })
        if (tmpUsr) {
            response.cookie('user', tmpUsr.email, { signed: true })
            response.cookie('role', tmpUsr.role, { signed: true })
        }
        response.redirect(302, "/hbs")
    })

module.exports = Login