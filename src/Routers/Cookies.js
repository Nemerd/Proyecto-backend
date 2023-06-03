const { Router } = require('express')
const { UserManager } = require('../libs/UserManager')
const Cookies = Router()

Cookies.post('/setCookie', async (request, response) => {
    const { user, password } = request.body

    const userData = await UserManager.getUser(user)
    if (userData) {
        response.cookie('user', user, { signed: true })
        response.cookie('role', userData.role, { signed: true })
        response.redirect(302, "/hbs")
    }
    // Admin auth hadcoded
    else if (
        user === 'adminCoder@coder.com'
        &&
        password === 'adminCod3r123') {
        response.cookie('user', user, { signed: true })
        response.cookie('role', 'Admin', { signed: true })
        response.redirect(302, "/hbs")
    }
    // ------------------- 
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