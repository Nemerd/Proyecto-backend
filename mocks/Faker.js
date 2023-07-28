const { faker } = require('@faker-js/faker')
const UserDTO = require('../src/DTO/UserDTO')
const CartManager = require('../src/Controllers/CartManager')

async function generateUsers(amount = 1) {
    let generation = []

    for (let i = 1; i <= parseInt(amount); i++) {
        generation.push(new UserDTO({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            age: faker.date.birthdate(),
            password: faker.internet.password(),
            cart: await CartManager.createCart().then(x => x.id),
            role: 'User'
        }))
    }

    return generation
}

module.exports = { generateUsers }