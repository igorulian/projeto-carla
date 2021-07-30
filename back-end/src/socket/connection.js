import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import ms from 'mediaserver'


const port = 4000
const app = express()

let connections = 0

const server = http.createServer(app)
const io = new Server(server,{
    cors: {
      origin: '*',
    }
})


app.get('/audio', (req, res) => {
    ms.pipe(req, res, './src/audio/audio.mp3')
})


io.on('connection', socket => {
    console.log('\n🔗 Nova instancia conectada')

    connections++
    socket.on('disconnect', () => connections--)
})

export function hasConnections(){
    if(connections > 0)
        return true
    else 
        return false
}

export async function PlayAudioFront(){
    io.emit('speak', 'a')
}

export async function SetupSocket(){
    console.log('\n🔗 Iniciando conecção socket...')
    server.listen(port, () => {
        console.log(`\n🔗 Socket iniciado, Ouvindo na porta ${port} ✅`)
    })

}