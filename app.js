const express = require("express")
const ProductManager = require('./src/ProductManager')
const pm = new ProductManager("./DBs/Products")

pm.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 3
})
pm.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc1234",
    stock: 3
})
pm.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc12345",
    stock: 3
})

const PORT = 8080

const app = express()
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send()
})

app.get("/products", (req, res) => {
    const { limit } = req.query
    if (!limit) {
        res.send(pm.getProducts())
    } else {
        const queryProducts = []
        for (let i = 1; i <= limit; i++) {
            queryProducts.push(pm.getProductById(i))
        }
        res.send(queryProducts)
    }

    res.send()
})

app.get("/products/:pid", (req, res) => {
    const pid = parseInt(req.params.pid)
    res.send(pm.getProductById(pid))
})

app.listen(PORT)