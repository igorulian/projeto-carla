const youtube = require('../services/youtube-player')
const dev = require('../services/dev')
const speak = require('../services/speak')

module.exports = {
    async tocar(action){
        try{
            let searchTerm = action.tcommand
            searchTerm = searchTerm.replace('música', 'musica')
            searchTerm = searchTerm.replace('musica', '')
            searchTerm = searchTerm.replace('do', '')
            searchTerm = searchTerm.replace('da', '')

            dev.log(`Search Term:  ${searchTerm}`)

            const video = await youtube.getVideoBySearchTerm(searchTerm)
            dev.log(video)

            const title = video.title
            speak.say(`Tocando: ${title}`)
            
            const id = video.id

            await youtube.playVideoById(id)

            
        }catch{
            speak.say('Ocorreu um erro ao tocar o video, favor consultar o log')
            return
        }

    }
}