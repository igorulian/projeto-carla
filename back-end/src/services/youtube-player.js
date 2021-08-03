// // const Youtube = require('simple-youtube-api')
// import Youtube from 'simple-youtube-api'
// import dotenv from 'dotenv'
// dotenv.config()

import { hasConnections, PlayYoutubeVideo, StopYoutubeVideo } from "../socket/connection.js"
import { say } from "../speak/speak.js"

// import stream from 'youtube-audio-stream'
// const decoder = require('lame').Decoder
// import {Lame} from 'node-lame'
// import Speaker from 'speaker'
// const lame = new Lame()


// // const youtubeApiKey = process.env.YOUTUBE_API_KEY.toString()

export async function PlayMusic(command){
    if(!hasConnections())
        return await say('Desculpe, não consegui encontrar nenhuma tela para tocar a musica.')

    const searchTerm = getSearchTerm(command)
    await say(`\n🎵 Tocando ${searchTerm}...`)
    // const id = await getVideoBySearchTerm(searchTerm)
    PlayYoutubeVideo('h6ru0vpISkE')
}

export async function StopMusic(command){
    console.log('Parando musica...')
    StopYoutubeVideo()
}


function getSearchTerm(command){
    let text = command.treatCommand
    text = text.replace('toca', '')
    text = text.replace('tocar', '')
    text = text.replace('toque', '')
    text = text.trim()
    ///.... add more later
    return text
}

// // function stopVideo(){

// // }


// // async function getVideoBySearchTerm(searchTerm){
// //     try{
// //         const youtube = new Youtube('AIzaSyAaaKpZSGV36lUXD4VMmzLleyeFCqiE_lo')
// //         const res = await youtube.searchVideos('' + searchTerm, 1)
// //         return res[0]
// //     }catch(err){
// //         console.log(err)
// //     }
// // }
// // async function playVideoBySearchTerm(searchTerm){
// //     const link = await this.getVideoLinkBySearchTerm(searchTerm);
// //     console.log("Tocando video no youtube (searchTerm), link: " + link)
// //     // fazer tocar no front
// //     // enviar provavelmente um socket para mudar de pagina sla
// // }
// // async function playVideoByLink(link){
// //     // fazer tocar no front
// //     // enviar provavelmente um socket para mudar de pagina sla
// //     console.log("Tocando video no youtube (link), link:  " + link)
// // }
// // async function playVideoById(id){
// //     // fazer tocar no front
// //     // enviar provavelmente um socket para mudar de pagina sla
// //     console.log("Tocando video no youtube (ID), link:  " + `https://youtube.com/watch?v=${id}`)
// // }