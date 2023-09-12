const { UsersDAO } = require("../DAOs/Factory");
const bcrypt = require('bcrypt');
const CartManager = require("./CartManager");
const { generateMessage } = require("../../Errors/ErrorMessages");
const CustomError = require("../../Errors/CustomError");
const ErrorCodes = require("../../Errors/ErrorCodes");
const { log } = require("winston");
const saltRounds = 10;

function createRandomString() {
    let randomString = Math.random().toString(36).substring(2, 10)

    return randomString.substring(0, 2)
        + '-' + randomString.substring(2, 4)
        + '-' + randomString.substring(4, 6)
        + '-' + randomString.substring(6)
}

class UserManager {
    static async createUser({ user, password, first_name, last_name }) {
        try {
            const pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            const cart = await CartManager.createCart()
            const userData = {
                first_name: first_name,
                last_name: last_name,
                cart: cart.id,
                role: 'User',
                email: user,
                password: pass
            }
            return await UsersDAO.create(userData)
        } catch (error) {
            console.log(error)
            CustomError.createError({
                name: error.name,
                cause: generateMessage({
                    email: user,
                    password: password,
                    first_name: first_name,
                    last_name: last_name
                }),
                message: 'Error at UserManager',
                code: ErrorCodes.ValueNeeded
            })

        }
    }

    static async createGithubUser(email) {
        try {
            const userData = {
                email: email,
                password: ' '
            }
            return await UsersDAO.create(userData)
        } catch (error) {
            throw new Error(error.errors.email)
        }
    }

    static async getUser(email) {
        try {
            return await UsersDAO.findOne({ email: email })
        } catch (error) {
            console.log(error);
        }
    }

    static async getSpecificUser(query) {
        try {
            return await UsersDAO.findOne(query)
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

    static async updatePass(usr, newPass) {
        try {
            return await UsersDAO.updateOne({ email: usr }, {
                password: bcrypt.hashSync(newPass, bcrypt.genSaltSync(10)),
                security_code: createRandomString()
            })
        } catch (error) {
            log(error)
        }
    }
}

module.exports = UserManager