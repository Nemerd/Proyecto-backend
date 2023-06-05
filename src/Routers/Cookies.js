const { Router } = require('express')
const { UserManager } = require('../libs/UserManager')
const passport = require('passport')
const Cookies = Router()

Cookies.post('/setCookie',
    async (request, response, next) => {
        // Admin auth hadcoded
        const { user, password } = request.body
        if (
            user === 'adminCoder@coder.com'
            &&
            password === 'adminCod3r123') {
            response.cookie('user', user, { signed: true })
            response.cookie('role', 'Admin', { signed: true })
            response.redirect(302, "/hbs")
        } else {
            next()
        }
    },
    passport.authenticate('sign-in'),
    async (request, response) => {
        if (request.user) {
            response.cookie('user', request.user.email, { signed: true })
            response.cookie('role', request.user.role, { signed: true })
            response.redirect(302, "/hbs")
        }
        else {
            response.sendStatus(401)
        }
    })

Cookies.get('/checkCookie', async (request, response) => {
    response.send(request.cookies)
})

Cookies.get('/checkSignedCookie', async (request, response) => {
    console.log(request.signedCookies['Nombre de la cookie']);
    response.send(request.signedCookies)
})

Cookies.delete('/deleteCookies', async (request, response) => {
    response.clearCookie('user')
    response.clearCookie('role')
    response.send()
})

module.exports = Cookies