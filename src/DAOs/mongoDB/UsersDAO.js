const { Schema, model } = require('mongoose');

const collection = 'users'

const usersSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: Number,
    password: {
        type: String,
        required: true
    },
    cart: String,
    role: {
        type: String,
        default: 'User'
    },
    security_code: {
        type: String,
        unique: true
    }

})

usersSchema.pre('save', function (next) {

    function createRandomString() {
        let randomString = Math.random().toString(36).substring(2, 10)

        return randomString.substring(0, 2)
            + '-' + randomString.substring(2, 4)
            + '-' + randomString.substring(4, 6)
            + '-' + randomString.substring(6)
    }
    try {
        if (!this.security_code) {
            this.security_code = createRandomString()
        }
    } catch (error) {
        this.security_code = createRandomString()
    }
    next()
})

const UsersDAO = model(collection, usersSchema)

module.exports = { UsersDAO }