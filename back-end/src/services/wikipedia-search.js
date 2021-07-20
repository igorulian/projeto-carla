

import Algorithmia from 'algorithmia'
import dotenv from 'dotenv'
dotenv.config()

async function WikipediaSearch(command){

    let assunto = command.treatCommand
    assunto = assunto.replace('sobre', '')
    assunto = assunto.replace('wikipedia', '')
    
    console.log('Pesquisando sobre' + assunto + '...')

    const input = {
        "articleName": assunto,
        "lang": "pt"
    }

    let awnser = ''
    console.log(process.env.ALGORITHMIA_API_KEY)
    const alorithmiaAuthenticated = Algorithmia(`${process.env.ALGORITHMIA_API_KEY}`)
    const wikipediaAlgorith = alorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2?timeout=300')
    const wikipediaResponse = await wikipediaAlgorith.pipe(input)
    const wikipediaContent = wikipediaResponse.get()

    console.log(wikipediaContent)

    return wikipediaContent

}

export {WikipediaSearch}