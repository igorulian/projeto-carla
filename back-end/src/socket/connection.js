import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import ms from 'mediaserver'
import { getUsage } from './usage.js'
import util from 'util'
import fs from 'fs'

const getStat = util.promisify(fs.stat)


const port = 4000
const app = express()

let connections = 0

const server = http.createServer(app)
const io = new Server(server,{
    cors: {
      origin: '*',
    }
})

app.get('/audio/:data', async (req, res) => {

    const filePath = './src/audio/audio.mp3'
    const stat = await getStat(filePath)

    res.writeHead(200, {
        'Content-Type': 'audio/mp3',
        'Content-Length': stat.size
    });

    const stream = fs.createReadStream(filePath)
    stream.pipe(res);
});


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

function updateComputerUsage(){
    setTimeout(async () => {
        await sendComputerUsage()
        updateComputerUsage()
    },1000)
}

async function sendComputerUsage(){
    const {cpu, ram} = await getUsage()
    io.emit('usage', {
        cpu,
        ram
    })
}

export async function sendLoading(){
    io.emit('loading', 'a')
}

export async function PlayAudioFront(){
    io.emit('speak', 'a')
}

export async function SetupSocket(){
    console.log('\n🔗 Iniciando conecção socket...')
    updateComputerUsage()
    server.listen(port, () => {
        console.log(`\n🔗 Socket iniciado, Ouvindo na porta ${port} ✅`)
    })

}