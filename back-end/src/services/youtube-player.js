const Youtube = require('simple-youtube-api')
require('dotenv').config()

// const youtubeApiKey = process.env.YOUTUBE_API_KEY.toString()



module.exports = {
    async getVideoBySearchTerm(searchTerm){
        const youtube = new Youtube('AIzaSyAaaKpZSGV36lUXD4VMmzLleyeFCqiE_lo')
        const res = await youtube.searchVideos('' + searchTerm, 1)
        return res[0]
    },
    async playVideoBySearchTerm(searchTerm){
        const link = await this.getVideoLinkBySearchTerm(searchTerm);
        console.log("Tocando video no youtube (searchTerm), link: " + link)
        // fazer tocar no front
        // enviar provavelmente um socket para mudar de pagina sla
    },
    async playVideoByLink(link){
        // fazer tocar no front
        // enviar provavelmente um socket para mudar de pagina sla
        console.log("Tocando video no youtube (link), link:  " + link)
    },
    async playVideoById(id){
        // fazer tocar no front
        // enviar provavelmente um socket para mudar de pagina sla
        console.log("Tocando video no youtube (ID), link:  " + `https://youtube.com/watch?v=${id}`)
    }
}