const { Router } = require('express')
const { UserManager } = require('../libs/UserManager')
const Login = Router()

Login.get('/', async (request, response) => {
    response.render('layouts/login')
})

Login.get('/register', async (request, response) => {
    response.render('layouts/register')
})

Login.post('/createUser', async (request, response) => {
    const { user, password } = request.body
    UserManager.createUser({
        user: user,
        password: password
    })
    response.render('layouts/home')
})

module.exports = Login