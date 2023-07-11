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
    }

})

const UsersDAO = model(collection, usersSchema)

module.exports = { UsersDAO }