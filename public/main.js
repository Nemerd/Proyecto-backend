const socket = io.connect();
const chatForm = document.getElementById('chat')
const messages = document.getElementById('messages')

socket.on('first-contact', () => { console.log(socket.id); })

chatForm.addEventListener('submit', evt => {
    evt.preventDefault()

    if (evt.target[0].value !== '') {
        // Agregar mensaje al chat
        const msg = document.createElement('p')
        msg.classList += 'message ownMessage'
        msg.innerHTML = evt.target[0].value
        messages.appendChild(msg)
        // Enviar mensaje al server
        socket.emit('msgToServer', evt.target[0].value, socket.id)
        evt.target[0].value = ''
        // Hacer scroll cuando se agrega un mensaje para mostrarlo
        messages.scrollTop = messages.scrollHeight
    }
})

socket.on('msgToSockets', msg => {
    const { id, mesg } = msg

    // Agregar mensaje al chat
    const newMsg = document.createElement('p')
    if (id !== socket.id) {
        newMsg.classList += 'message outerMsg'
    }
    newMsg.innerHTML += mesg
    messages.appendChild(newMsg)
    // Hacer scroll cuando se agrega un mensaje para mostrarlo
    messages.scrollTop = messages.scrollHeight

})