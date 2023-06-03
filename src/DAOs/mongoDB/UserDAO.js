const { Schema, model } = require('mongoose');

const collection = 'users'

const usersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'User'
    }

})

const UsersDAO = model(collection, usersSchema)

module.exports = { UsersDAO }