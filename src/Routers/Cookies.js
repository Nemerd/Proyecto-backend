const { Router } = require('express')
const UserManager = require('../Controllers/UserManager')
const passport = require('passport')
const Cookies = Router()
const { checkAdmin,
    setCookie,
    deleteCookies,
    checkSignedCookie,
    checkUnsignedCookie
} = require('./handlers/CookieHandler')

Cookies.post('/setCookie', checkAdmin,
    passport.authenticate('sign-in'),
    setCookie)

Cookies.get('/checkCookie', checkUnsignedCookie)

Cookies.get('/checkSignedCookie', checkSignedCookie)

Cookies.delete('/deleteCookies', deleteCookies)

module.exports = Cookies