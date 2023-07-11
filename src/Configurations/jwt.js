const jwt = require('jsonwebtoken');

function createToken(user) {
    const token = jwt.sign({ user }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1d' })
    return token
}

function getAndVerifyTokenFromHeader(header) {
    const token = header.split(' ')[1]
    return jwt.verify(token, process.env.JWT_PRIVATE_KEY)
}

module.exports = { createToken, getAndVerifyTokenFromHeader }