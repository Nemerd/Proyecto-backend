const productsForm = document.getElementById("changer")

productsForm.addEventListener('submit', evt => {
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

    socket.emit("upload", newItem)

})

console.log("productChanger")