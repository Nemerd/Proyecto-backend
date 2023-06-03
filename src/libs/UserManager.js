const { UsersDAO } = require("../DAOs/mongoDB/UserDAO");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserManager {
    static async createUser({ user, password }) {
        try {

            const userData = {
                email: user,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            }
            return await UsersDAO.create(userData)

        } catch (error) {
            console.log(error);
        }
    }

    static async getUser({ user }) {
        try {
            return await UsersDAO.findOne({ user: user })
        } catch (error) {
            console.log(error);
        }
    }

    static async checkLogin(incoming) {
        try {
            const userData = await UsersDAO.findOne({ email: incoming.user })
            return bcrypt.compareSync(incoming.password, userData.password)
        } catch (error) {
            console.log(error);
            return false
        }

    }
}

module.exports = { UserManager }