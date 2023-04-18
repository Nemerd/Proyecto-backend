const lista = document.getElementById("lista-de-productos")

/* socket.on('firtst-connection', data => {
    data.forEach(product => {
        const newTr = lista.insertRow()
        for (const attribute in product) {
            const newTd = newTr.insertCell()
            let tdElement;
            if (attribute != "thumbnail") {
                tdElement = document.createTextNode(product[attribute])
            } else {
                tdElement = document.createElement('img')
                tdElement.src = product[attribute]
            }
            newTd.appendChild(tdElement)
        }
    });
}) */

async function reloadProducts(sitename) {
    // Eliminar los productos de la lista
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    const response = await fetch(sitename, { method: "GET" })
        .then(x => x.json())

    // Crear una fila por cada producto
    response.forEach(product => {

        const newTr = lista.insertRow()
        for (const attribute in product) {
            const newTd = newTr.insertCell()

            let tdElement;

            if (attribute != "thumbnail") {
                tdElement = document.createTextNode(product[attribute])
            } else {
                tdElement = document.createElement('img')
                tdElement.src = product[attribute]
            }
            newTd.appendChild(tdElement)
        }

    })
}

socket.on('product-update', (sitename) => reloadProducts(sitename))

console.log("productListUpdater")