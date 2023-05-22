const { Router, response } = require('express')
const Login = Router()

Login.get('/', async (request, response) => {
    response.render('layouts/login')
})

module.exports = Login