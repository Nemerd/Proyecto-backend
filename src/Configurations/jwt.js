const jwt = require('jsonwebtoken');

function createToken(user) {
    const token = jwt.sign({ user }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1d' })
    return token
}

function getAndVerifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    } catch (error) {
        return 'El log no fue hecho con JWT'
    }
}

module.exports = { createToken, getAndVerifyToken }