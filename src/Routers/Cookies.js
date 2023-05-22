const { Router } = require('express')
const Cookies = Router()

function authorization(request, response, next) {
    if (request.body["user"] === 'adminCoder@coder.com' && request.body["password"] === "adminCod3r123") {
        request.role = "administrator"
        next()
    } else {
        request.role = "user"
        next()
    }
}

Cookies.post('/setCookie', authorization, async (request, response) => {
    const { user, password } = request.body
    response.cookie('user', user, { signed: true })
    console.log();
    response.cookie('role', request.role, { signed: true })
    response.redirect("../../hbs")
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