const UserManager = require("../../Controllers/UserManager")

const permission = (level) => (request, response, next) => {
    const role = request.signedCookies["role"]
    if (level.includes(role)) {
        next()
    } else {
        response.sendStatus(401)
    }
}

const cartPermission = (request, response, next) => {
    const { cid } = request.params
    const { username } = request.signedCookies['user']
    const user = UserManager.getUser(username)

    if (user.cart == cid) {
        next()
    } else {
        response.sendStatus(401)
    }
}

module.exports = { permission, cartPermission }