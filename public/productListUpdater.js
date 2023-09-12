const lista = document.getElementById("lista-de-productos")
const logout = document.getElementById('logout')

const cartID = document.cookie
    .split("; ")
    .find((row) => row.startsWith("cart="))
    ?.split("=")[1];

logout.addEventListener('click', async (evt) => {
    console.log(await fetch(
        'http://localhost:8080/api/cookies/deleteCookies',
        { method: 'DELETE' }
    ))
    // Redirect to login
    window.location.replace('http://localhost:8080/')
})

async function reloadProducts(sitename) {
    // Eliminar los productos de la lista
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    const response = await fetch(sitename, { method: "GET" })
        .then(x => x.json())

    // Crear una fila por cada producto
    response.docs.forEach(product => {

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

        const addCell = newTr.insertCell()
        const addButton = document.createElement('button')
        addButton.textContent = 'Agregar al carrito'
        addButton.addEventListener('click', async () => {
            await fetch(`http://localhost:8080/api/carts/${cartID}/product/${product._id}`, { method: 'POST' })
        })
        addCell.appendChild(addButton)

    })
}

socket.on('product-update', (sitename) => reloadProducts(sitename))

reloadProducts("http://localhost:8080/api/products")