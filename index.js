const ProductManager = require("./ProductManager.js")

const pm = new ProductManager()

console.log("--------------------addProduct--------------------");
console.log(pm.addProduct({
    title: "sdasd",
    description: "asdsa",
    price: 5,
    thumbnail: "asdsa",
    stock: 3
}))

console.log(pm.addProduct({
    title: "fdgdfd",
    description: "sgfnnfgn",
    price: 5,
    thumbnail: "fgnfnf",
    stock: 3
}))
console.log("--------------------getProductById--------------------");
console.log(pm.getProductById(2));
console.log("--------------------getProducts--------------------");
console.log(pm.getProducts());
