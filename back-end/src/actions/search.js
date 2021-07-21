import { say } from '../speak/speak.js'
import { WeatherForecast } from '../services/weather.js'
import { WikipediaSearch } from '../services/wikipedia-search.js'
import { DolarQuote } from '../services/dollar-quote.js'


export async function search(action) {

    const hasWord = (word) => {
        return action.treatCommand.includes(word)
    }

    if(hasWord('previsão')){
        const tempResponse = await WeatherForecast(action)

        if(!tempResponse){
            await say('Não foi possível verificar a previsão do tempo')
            return
        }
        
        await say(`A previsão é de ${tempResponse.text}, temperatura máxima de ${tempResponse.max}, e mínima de ${tempResponse.min}, com ${tempResponse.probability} % de chance de chuva`)
        return
    }

    if(hasWord('preço') && hasWord('dólar')){
        const dolarResponse = await DolarQuote(action)

        if(!dolarResponse){
            await say('Não foi possível verificar o preço do dólar')
            return
        }
        
        await say(`O Dólar atualmente está em ${dolarResponse.real} reais e ${dolarResponse.centavo} centavos`)
        return
    }


    if(hasWord('sobre') || hasWord('wikipedia')){
        await say('Pesquisando')
        const pesquisaResponse = await WikipediaSearch(action)
        
        if(!pesquisaResponse){
            await say('Não foi possivel encontrar nada sobre o assunto.')
            return
        }
        
        await say(pesquisaResponse)
        return
    }
    
}
