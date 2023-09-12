const TicketDAO = require("../DAOs/mongoDB/TicketDAO");

class TicketManager {
    async createTicket(params) {
        const { products, amount, purchaser } = params
        const createCode = () => {
            const now = new Date(Date.now())
            const day = now.getDate()
            const month = now.getMonth()
            const year = now.getFullYear()

            const randomAspect = parseInt(Math.random() * 10000)

            return `${day}-${month}-${year}.${randomAspect}`
        }
        return await TicketDAO.create({
            code: createCode(),
            products: products,
            amount: amount,
            purchaser: purchaser
        })
    }

    async showTicket(id) {
        return TicketDAO.findOne(id).populate('products.product')
    }

    async queryTicket(query) {
        return TicketDAO.findOne(query).populate('products.product')
    }

    async queryAllTicketsFromClient(purchaser) {
        return TicketDAO.find(purchaser)
    }
}

module.exports = TicketManager