const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../../cred.json').algorithmiaApiKey
const axios = require('axios')

const speak = require('../services/speak')

const wiki = require('wikijs').default;


module.exports = {
    async pesquisar(action) {
        console.log(action)
        // const treatedSearch = treatSearch(action)
        // const searchResult = await search(treatedSearch)
        if(action.verbSaid === 'qual'){

            if(action.tcommand.includes('previsão do tempo')){
                const prevTempResult = await prevTempo(action)
                return
            }

            if(action.tcommand.includes('preço') && action.tcommand.includes('dólar')){
                const dolarResult = await precoDoDolar(action)
                const real = dolarResult.split('.')[0]
                const cent = (dolarResult.split('.')[1] / 100)
                const cent2 = String(cent).split('.')[0]
                speak.say(`O Dólar atualmente está em ${real} reais e ${cent2} centavos`)
            }
        }
    }
}

const prevTempo = async(action) => {
    // if(action.tcommand.includes('amanhã')){
    //     // prev amanhã
    //     console.log('prev amanhã')
    // }
    if(action.tcommand.includes('hoje')){
        // const response = await axios.get('https://api.hgbrasil.com/weather?woeid=425817key=ad6a0f10')
        //http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/3477/days/15?token=your-app-token
        const response = await axios.get('http://apiadvisor.climatempo.com.br/api/v1/climate/rain/locale/3477?token= e87eb9153756cf01fea2a4bb31afa92a')
        // const data = {
        //     temp: response.data.results.temp,
        //     description: response.data.results.description,
        // }
        console.log(response.data)
    }

}

const precoDoDolar = async(action) => {

    const response = await axios.get('https://economia.awesomeapi.com.br/all/USD-BRL')
    const dolar = response.data.USD.bid
    return dolar

}



// search()