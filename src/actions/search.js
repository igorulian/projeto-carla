const axios = require('axios')

const dev = require('../services/log')

const speak = require('../services/speak')

require('dotenv').config()

const wiki = require('wikijs').default;


module.exports = {
    async pesquisar(action) {
        dev.log(action)
        if(action.verbSaid === 'qual'){

            if(action.tcommand.includes('previsão do tempo')){
                const tempResponse = await prevTempo(action)
                const txt = `A previsão é de ${tempResponse.txt} temperatura máxima de ${tempResponse.tmax} e mínima de ${tempResponse.tmin} com ${tempResponse.pchuva} % de chance de chuva`

                speak.say(txt)
                return
            }

            if(action.tcommand.includes('preço') && action.tcommand.includes('dólar')){
                const dolarResponse = await precoDoDolar(action)

                const txt = `O Dólar atualmente está em ${dolarResponse.real} reais e ${dolarResponse.centavo} centavos`
                speak.say(txt)
                return
            }
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



// search()