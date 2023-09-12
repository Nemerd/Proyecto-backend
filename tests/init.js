const Assert = require('assert')
const chai = require('chai');
const supertest = require('supertest')
const UserManager = require('../src/Controllers/UserManager')
const CartManager = require('../src/Controllers/CartManager');
const DBConnection = require('../src/DAOs/mongoDB/DBConnection')
const { UsersDAO } = require('../src/DAOs/mongoDB/UsersDAO');
const { CartDAO } = require('../src/DAOs/mongoDB/CartDAO');
require('dotenv').config({ path: '.env.development' })

const assert = Assert.strict
const expect = chai.expect
const requester = supertest('http://localhost:8080')
DBConnection.connectMongo()


/* describe('Tests del UserManager', function () {
    this.mockUsr = {
        user: 'JohnDoe',
        first_name: 'first_name',
        last_name: 'last_name',
        password: 'password'
    }
    before(async function () {
    })
    it('Crear usuario con contraseña', async () => {
        const usrTest = await UserManager.createUser(this.mockUsr)
        assert.strictEqual(usrTest.email, this.mockUsr.user)
    }).timeout(10000)

    it('crear usuario con github', async () => {
        const usrTest = await UserManager.createGithubUser('GithubTest')
    })

    it('Borrar usuario', async () => {
        const passUsr = await UsersDAO.deleteOne({ email: 'JohnDoe' })
        const gitHubUsr = await UsersDAO.deleteOne({ email: 'GithubTest' })
        assert.strictEqual(passUsr.deletedCount, 1)
        assert.strictEqual(gitHubUsr.deletedCount, 1)
    })

    after(function () {  })
})

describe('Tests de CartManager', function () {
    this.mockCart = {}
    // DBConnection.connectMongo()

    before(async function () {
    })
    it('Create cart', async () => {
        this.mockCart = await CartManager.createCart()
        expect(this.mockCart.products).to.deep.equal([])

    })
    it('Delete cart', async () => {
        const result = await CartDAO.deleteOne({ _id: this.mockCart._id })
        expect(result.deletedCount).to.equal(1)
    })
    // it('', () => { })
    after(() => {
        DBConnection.disconnect()
    })
}) */

describe('Test del endpoint Products', function () {
    this.mockProduct = { id: "64adc6303d1e8cc2686a63e6" }
    this.mail = "adminCoder@coder.com"
    this.pass = "adminCod3r123"
    this.cookie = {}



    it('Post', async () => {
        const res = await requester.post('/api/products').set('Cookie', ['role=s%3AAdmin.WDR3pYKilZ1cQ4GfN8nzo1N7cN104pgJNVmwT1ZHsts; Path=/',]).send()
        expect(res.statusCode).to.equal(200)
    })


    it('Consulta los productos', async () => {
        const res = await requester.get('/api/products').send()
        expect(res.statusCode).to.equal(200)
    })
    it('Consulta producto específico', async () => {
        const res = await requester.get('/api/products/' + this.mockProduct).send()
        expect(res.statusCode).to.equal(200)
    })


    /* it('Agrega producto', async () => {
        const res = await requester.post('/api/products/').send({ cookie: 'connect.sid=s%3AFP-wXtIQUl5ooEiSMYmP8I4AV37UsaT7.rXYAD74NI2NZFIGOYdqyNg8je5iGEv%2B%2FlMEMmBjgTJo; user=s%3AadminCoder%40coder.com.cn%2Fb5%2F1IvaFt5mYYJvwbb4vG%2BRgXVsfL5iQvgTFdDk8; role=s%3AAdmin.WDR3pYKilZ1cQ4GfN8nzo1N7cN104pgJNVmwT1ZHsts' })
        expect(res.statusCode).to.equal(200)

    }) */
    /*
    it()
    */
})

describe('Test del endpoint Login', function () {

    it('Login', async () => {
        const res = await requester.post('/api/cookies/current').send({
            user: this.mail,
            password: this.pass
        })
        expect(res.statusCode).to.equal(200)
    })
})