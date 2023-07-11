const { generateUsers } = require('../../../mocks/Faker');
const CustomRouter = require('./CustomRouter');

class Mock extends CustomRouter {
    constructor() { super() }

    init() {
        this.get('/mockingproducts', this.customResponses,
            async (req, res) => {
                try {
                    res.send(
                        await generateUsers(100)
                    )
                } catch (error) {
                    res.sendServerError(error)
                }
            })
    }

    customResponses(req, res, next) {
        res.sendSuccess = payload => res.send({ status: 'Success', payload })
        res.sendServerError = error => res.send({ status: 'Server Error', error })
        res.sendUserError = error => res.send({ status: 'User Error', error })
        next()
    }
}

module.exports = Mock