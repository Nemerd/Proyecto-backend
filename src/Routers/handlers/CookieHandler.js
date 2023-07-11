class CookieHandler {
    async checkAdmin(request, response, next) {
        // Admin auth hadcoded
        const { user, password } = request.body
        if (
            user === process.env.ADMIN_EMAIL
            &&
            password === process.env.ADMIN_PASSWORD) {
            response.cookie('user', user, { signed: true })
            response.cookie('role', 'Admin', { signed: true })
            response.redirect(302, "/hbs")
        } else {
            next()
        }
    }

    async setCookie(request, response) {
        if (request.user) {
            response.cookie('user', request.user.email, { signed: true })
            response.cookie('role', request.user.role, { signed: true })
            response.redirect(302, "/hbs")
        }
        else {
            response.sendStatus(401)
        }
    }

    async deleteCookies(request, response) {
        response.clearCookie('user')
        response.clearCookie('role')
        response.send()
    }

    async checkSignedCookie(request, response) {
        console.log(request.signedCookies['Nombre de la cookie']);
        response.send(request.signedCookies)
    }

    async checkUnsignedCookie(request, response) {
        response.send(request.cookies)
    }
}

module.exports = new CookieHandler