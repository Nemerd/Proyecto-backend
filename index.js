const ProductManager = require("./ProductManager.js")

const pm = new ProductManager("./DBs/Products")

console.log(pm.getProducts());

console.log(pm.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 3
}))
console.log(pm.getProducts());

console.log(pm.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 3
}))

pm.updateProduct(1, { price: 500 })
console.log(pm.getProductById(1))

pm.deleteProduct(1)

console.log(pm.getProductById(1))
console.log(pm.getProductById(2))
console.log(pm.getProductById())