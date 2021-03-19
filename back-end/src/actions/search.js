const axios = require('axios')
var Algorithmia = require("algorithmia");
const dev = require('../services/log')
const speak = require('../services/speak')

require('dotenv').config()

const wiki = require('wikijs').default;


module.exports = {
    async pesquisar(action) {
        dev.log(action)

            if(action.tcommand.includes('previsão do tempo')){
                const tempResponse = await prevTempo(action)
                if(!tempResponse){dev.log('ERRO ao verificar previsão do tempo'); speak.say('Não foi possível verificar a previsão do tempo'); return;}
                
                const txt = `A previsão é de ${tempResponse.txt} temperatura máxima de ${tempResponse.tmax} e mínima de ${tempResponse.tmin} com ${tempResponse.pchuva} % de chance de chuva`

                speak.say(txt)
                return
            }

            if(action.tcommand.includes('preço') && action.tcommand.includes('dólar')){
                const dolarResponse = await precoDoDolar(action)
                if(!dolarResponse){dev.log('ERRO ao verificar preço do dólar'); speak.say('Não foi possível verificar o preço do dólar'); return;}
                
                const txt = `O Dólar atualmente está em ${dolarResponse.real} reais e ${dolarResponse.centavo} centavos`
                
                speak.say(txt)
                return
            }


            // pesquisa geral
            if(action.tcommand.includes('sobre')){
                speak.say('Pesquisando...')                                    // https://rapidapi.com/apigeek/api/google-search3/pricing  -< TESTA DPS ESSA API
                const pesquisaRsponse = await pesquisaGeral(action)
                if(!pesquisaRsponse){dev.log('ERRO ao pesquisar'); speak.say('Não foi possivel encontrar nada sobre o assunto.'); return;}
                
                speak.say(pesquisaRsponse)
                return
            }


        
    }
}

const prevTempo = async(action) => {

    let dia = 0
    if(action.tcommand.includes('hoje')) dia = 0
    if(action.tcommand.includes('amanhã')) dia = 1
    if(action.tcommand.includes('amanhã') && action.tcommand.includes('depois')) dia = 2

    const response = await axios.get(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/4388/days/15?token=${process.env.CLIMATEMPO_TOKEN}`)
    
    const tmax = response.data.data[dia].temperature.max
    const tmin = response.data.data[dia].temperature.min
    const pchuva = response.data.data[dia].rain.probability
    const txt = response.data.data[dia].text_icon.text.pt

    const clima = {
        tmax,
        tmin,
        pchuva,
        txt
    }

    dev.log(clima)
    return clima
    

}

const precoDoDolar = async(action) => {

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

const pesquisaGeral = async(action) => {
    let assunto = action.tcommand
    assunto = assunto.replace('sobre', '')
    
    dev.log('Pesquisando sobre' + assunto + '...')

    var input = {
        "articleName": assunto,
        "lang": "pt"
      };

    const alorithmiaAuthenticated = Algorithmia(`${process.env.ALGORITHMIA_API_KEY}`)
    const wikipediaAlgorith = alorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2?timeout=300')
    const wikipediaResponse = await wikipediaAlgorith.pipe(input)
    const wikipediaContent = wikipediaResponse.get()

    let response = String(wikipediaContent.summary).split('.')[0] +  '. ' + String(wikipediaContent.summary).split('.')[1]
    response = response.replace(/ *\([^)]*\) */g, "")
    
    return response

}

// search()