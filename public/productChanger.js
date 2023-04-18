const productsForm = document.getElementById("changer")

productsForm.addEventListener('submit', async evt => {
    evt.preventDefault()
    // Formateando el item del formulario
    const newItem = {
        "title": evt.target[0].value,
        "code": parseInt(evt.target[1].value),
        "description": evt.target[2].value,
        "price": parseInt(evt.target[3].value),
        "stock": parseInt(evt.target[4].value),
        "thumbnail": evt.target[5].value
    }

    console.log(newItem);

    await fetch("http://localhost:8080/api/products", {
        method: "POST",
        body: JSON.stringify(newItem)
    }).catch(err => console.log(err))
})

console.log("productChanger")