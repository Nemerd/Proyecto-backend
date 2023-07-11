const { Router } = require('express')
const passport = require('passport')
const { githubcallback,
    createUser,
    login,
    register } = require('./handlers/LoginHandler')
const Login = Router()

Login.get('/', login)

Login.get('/register', register)

Login.post('/createUser', createUser)

Login.get('/github', passport.authenticate('github', { scope: ['user:email'] }))

Login.get('/githubcallback',
    passport.authenticate('github', { failureRedirect: '/' }),
    githubcallback)

module.exports = Login