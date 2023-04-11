const express = require("express")
const Products = require("./src/Routers/Products")
const Cart = require("./src/Routers/Cart")

const PORT = 8080

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api/products", Products);
app.use("/api/carts", Cart);

app.listen(PORT)