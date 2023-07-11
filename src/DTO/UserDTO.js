const { UserManager } = require("../Controllers/UserManager")

class UserDTO {
    constructor(params) {
        this.first_name = params.first_name
        this.last_name = params.last_name
        this.email = params.email
        this.age = params.age
        this.password = params.password
        this.cart = params.cart
        this.role = params.role
    }

    static async noSensible() {
        return { first_name, last_name, email, role } = await UserManager.getUser(this.email)
    }
}

module.exports = UserDTO