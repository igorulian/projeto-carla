import axios from 'axios'
//import Algorithmia from 'algorithmia'
import {say} from '../services/speak.js'

//require('dotenv').config()

//const wiki = require('wikijs').default;

export async function search(action) {

    if(action.treatCommand.includes('previsão')){
        const tempResponse = await prevTempo(action)
        console.log('tempResponse')
        console.log(tempResponse)
        if(!tempResponse){
            await say('Não foi possível verificar a previsão do tempo')
            return
        }
        
        const txt = `A previsão é de ${tempResponse.txt} temperatura máxima de ${tempResponse.tmax} e mínima de ${tempResponse.tmin} com ${tempResponse.pchuva} % de chance de chuva`

        await say(txt)
        return
    }

    if(action.treatCommand.includes('preço') && action.treatCommand.includes('dólar')){
        const dolarResponse = await precoDoDolar(action)
        if(!dolarResponse){
            await say('Não foi possível verificar o preço do dólar')
            return
        }
        
        const txt = `O Dólar atualmente está em ${dolarResponse.real} reais e ${dolarResponse.centavo} centavos`
        
        await say(txt)
        return
    }


        // pesquisa geral
        // if(action.treatCommand.includes('sobre')){
        //     say('Pesquisando...')                                    // https://rapidapi.com/apigeek/api/google-search3/pricing  -< TESTA DPS ESSA API
        //     const pesquisaRsponse = await pesquisaGeral(action)
        //     if(!pesquisaRsponse){
        //         say('Não foi possivel encontrar nada sobre o assunto.')
        //         return
        //     }
            
        //     say(pesquisaRsponse)
        //     return
        // }


    
}

const prevTempo = async(action) => {

    let dia = 0
    if(action.treatCommand.includes('hoje')) dia = 0
    if(action.treatCommand.includes('amanhã')) dia = 1
    if(action.treatCommand.includes('amanhã') && action.treatCommand.includes('depois')) dia = 2

    const url = `http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/4388/days/15?token=${process.env.CLIMATEMPO_TOKEN}`
   
    const clima = await axios.get(url)
    .then(response => {
        const tmax = response.data.data[dia].temperature.max
        const tmin = response.data.data[dia].temperature.min
        const pchuva = response.data.data[dia].rain.probability
        const txt = response.data.data[dia].text_icon.text.pt
    
        const data = {
            tmax,
            tmin,
            pchuva,
            txt
        }
    
        return data
    })
    .catch(() => { return null })

    return clima
    

}

const precoDoDolar = async () => {

    const response = await axios.get('https://economia.awesomeapi.com.br/all/USD-BRL')
    const dolar = response.data.USD.bid

    const real = dolar.split('.')[0]
    const cent = (dolar.split('.')[1] / 100)
    const cent2 = String(cent).split('.')[0]

    const dolarResponse = {
        real,
        centavo: cent2,
    }

    return dolarResponse

}

// const pesquisaGeral = async(action) => {
//     let assunto = action.treatCommand
//     assunto = assunto.replace('sobre', '')
    
//     dev.log('Pesquisando sobre' + assunto + '...')

//     var input = {
//         "articleName": assunto,
//         "lang": "pt"
//       };

//     const alorithmiaAuthenticated = Algorithmia(`${process.env.ALGORITHMIA_API_KEY}`)
//     const wikipediaAlgorith = alorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2?timeout=300')
//     const wikipediaResponse = await wikipediaAlgorith.pipe(input)
//     const wikipediaContent = wikipediaResponse.get()

//     let response = String(wikipediaContent.summary).split('.')[0] +  '. ' + String(wikipediaContent.summary).split('.')[1]
//     response = response.replace(/ *\([^)]*\) */g, "")
    
//     return response

// }
