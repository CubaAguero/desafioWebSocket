const express = require('express')
const { Server: HttpServer, get } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Container = require('./container')
const contenedor1 = new Container("productos.txt")
const ChatContainer = require('./chatContainer')
const chatContainer1 = new ChatContainer('chat.txt')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


io.on('connection', async socket => {
    console.log('Nuevo Cliente Conectado')
    let res = await contenedor1.getAll();
    let resChat = await chatContainer1.getAll()
    socket.emit("productos", res)
    socket.emit("chat", resChat)

    socket.on('save', async productos => {
        
        await contenedor1.save(productos.title, productos.price, productos.thumbnail)
        let res = await contenedor1.getAll()
        io.sockets.emit("productos", res)
    })

    socket.on('newMessage', async msj => {
        
        msj.fyh = new Date().toLocaleString()
        await chatContainer1.saveMassege(msj)
        console.log(msj, 'msj en socjet')
        let chat = await chatContainer1.getAll()
        io.sockets.emit('chat', resChat)
    }) 
})

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor Http con Websockets en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('err', err => console.log(`Error en servidor ${err}`))