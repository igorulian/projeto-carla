import axios from "axios"
import { DisplayYoutubeVideo, hasConnections } from "../socket/connection.js"
import { say } from "../speak/speak.js"
import dotenv from 'dotenv'
import { response } from "express"
dotenv.config()


export async function PlayMusic(command){
    if(!hasConnections())
        return await say('Desculpe, não consegui encontrar nenhuma tela para tocar a música.')

    const searchTerm = getSearchTerm(command)
    await say(`\n🎵 Tocando ${searchTerm}...`)
    const id = await getPlaylistID(searchTerm)
    DisplayYoutubeVideo({play:true, id})
}

export async function StopMusic(command){
    console.log('Parando musica...')
    DisplayYoutubeVideo({play:false})
}


function getSearchTerm(command){
    let text = command.treatCommand
    text = text.replace('toca', '')
    text = text.replace('tocar', '')
    text = text.replace('toque', '')
    text = text.replace('colocar', '')
    text = text.replace('coloque', '')
    text = text.replace('coloca', '')
    text = text.trim()
    ///.... add more later
    return text
}

export async function getPlaylistID(searchTerm){
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_DATA_API_KEY}&part=snippet&q=${searchTerm}&type=playlist&maxResults=1`)
    const playlist = response.data.items[0]
    const id = playlist.id.playlistId
    return id
}