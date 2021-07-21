import wiki from 'wikijs'
import dotenv from 'dotenv'
dotenv.config()
import Algorithmia from 'algorithmia'

async function WikipediaSearch(command){
    return ''
}

function getSubject(command){
    let assunto = command.treatCommand
    assunto = assunto.replace('sobre', '')
    assunto = assunto.replace('wikipedia', '')
    assunto = assunto.trim()
    return assunto
}

function getInfo(command){
    let info = command.treatCommand

    if(info.includes('quem') && info.includes('é')) return 'about'

    return null
}

// async function WikipediaSearchv1(command){
//     console.log('pesquisando algo')

//     const assunto = getSubject(command)

//     const input = {
//         "articleName": assunto,
//         "lang": "pt"
//     }

//     console.log(input)

//     let awnser = ''
//     console.log(process.env.ALGORITHMIA_API_KEY)

//     await Algorithmia.client(process.env.ALGORITHMIA_API_KEY)
//     .algo("web/WikipediaParser/0.1.2?timeout=300") // timeout is optional
//     .pipe(input)
//     .then(function(response) {
//       console.log(response.get().content.split('.')[0]);
//       awnser = response.get().content.split('.')[0]

//       return awnser
//     })
// }


// async function WikipediaSearchv2(command){

//     const assunto = treatSubject(command)
//     const info = getInfo(command)
    
//     wiki({ apiUrl: 'https://es.wikipedia.org/w/api.php' })
//     .page(assunto)
//     .then(page => page.info(info))
//     .then(console.log())

//     return
// }


export {WikipediaSearch}