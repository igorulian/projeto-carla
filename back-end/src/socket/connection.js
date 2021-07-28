import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import cors from 'cors'

const port = 4000
const app = express()

const server = http.createServer(app)
const io = new Server(server,{
    cors: {
      origin: '*',
    }
})


io.on('connection', socket => {
    console.log('🔗 Nova instancia conectada');
})


export function SendSpeak(){
    io.emit('speak', 'a')
}

export async function SetupSocket(){
    console.log('🔗 Iniciando conecção socket...')
    server.listen(port, () => {
        console.log(`🔗 Socket iniciado, Ouvindo na porta ${port} ✅`);
    })

}