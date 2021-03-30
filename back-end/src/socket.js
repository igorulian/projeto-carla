const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    console.log(`Socket conectado ${socket.id}`)

    socket.on('sayed', data => {
        console.log('sayed recebido')

        socket.broadcast.emit('say',request)
    })
}) 

server.listen(3001) // socket
app.listen(3002) // api

console.log("soqueti")