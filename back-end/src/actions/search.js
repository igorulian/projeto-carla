import {say} from '../speak/speak.js'
import { WeatherForecast } from '../services/weather.js'
import { WikipediaSearch } from '../services/wikipedia-search.js'
import { DolarQuote } from '../services/dollar-quote.js'

export async function search(action) {

    if(action.treatCommand.includes('previsão')){
        const tempResponse = await WeatherForecast(action)

        if(!tempResponse){
            await say('Não foi possível verificar a previsão do tempo')
            return
        }
        
        const txt = `A previsão é de ${tempResponse.text} temperatura máxima de ${tempResponse.max} e mínima de ${tempResponse.min} com ${tempResponse.probability} % de chance de chuva`

        await say(txt)
        return
    }

    if(action.treatCommand.includes('preço') && action.treatCommand.includes('dólar')){
        const dolarResponse = await DolarQuote(action)
        if(!dolarResponse){
            await say('Não foi possível verificar o preço do dólar')
            return
        }
        
        const txt = `O Dólar atualmente está em ${dolarResponse.real} reais e ${dolarResponse.centavo} centavos`
        
        await say(txt)
        return
    }


    if(action.treatCommand.includes('sobre') || action.treatCommand.includes('wikipedia')){
        await say('Pesquisando...')
        const pesquisaRsponse = await WikipediaSearch(action)
        
        if(!pesquisaRsponse){
            await say('Não foi possivel encontrar nada sobre o assunto.')
            return
        }
        
        await say(pesquisaRsponse)
        return
    }


    
}
