import axios from 'axios'
import { say } from '../speak/speak.js'

async function DolarQuote(){
    const data = await getData()

    if(!data)
        return await say('Não foi possível verificar o preço do dólar')

    await say(`O Dólar atualmente está em ${data.real} reais e ${data.centavo} centavos`)
}

async function getData(){
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

export {DolarQuote}