import axios from 'axios'

async function DolarQuote(){
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