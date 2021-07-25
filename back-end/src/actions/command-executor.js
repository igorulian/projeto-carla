import { HowAreYouDoing, IamBack, IllLeave, ShouldILeave, WhoAreYou } from "../services/chat.js"
import { DolarQuote } from "../services/dollar-quote.js"
import { Timer } from "../services/timer.js"
import { WeatherForecast } from "../services/weather.js"
import { WhatDay } from "../services/what-day.js"
import { WhatTime } from "../services/what-time.js"
import { WikipediaSearch } from '../services/wikipedia-search.js'
import { iniciar, pesquisar } from "./verbs.js"



export async function ExecuteCommand(command){

    const hasWords = words => hasWordsFunction(words,command)

    if(hasWords(['previsão', 'tempo']))
        return await WeatherForecast(command)


    if(hasWords([['preço', 'cotação'], 'dólar']))
        return await DolarQuote(command)


    if(hasWords(['horas', 'são']))
        return await WhatTime(command)

    
    if(hasWords(['dia', 'hoje']))
        return await WhatDay(command)


    if(hasWords([iniciar,'cronômetro']))
        return await Timer(command)

    //chat

    if(hasWords(['quem', 'é', 'você']))
        return await WhoAreYou(command)

    if(hasWords(['como', 'você', ['está', 'tá']]))
        return await HowAreYouDoing(command)
        
    if(hasWords(['vou', ['sair', 'festa']]))
        return await IllLeave(command)
        
    if(hasWords([['será', 'devo'], 'eu', ['saio', 'sair', 'festa']]))
        return await ShouldILeave(command)

    if(hasWords([['voltei', 'cheguei']]))
        return await IamBack(command)

    if(hasWords([pesquisar]))
        return await WikipediaSearch(command)
}






const hasWordsFunction = (words,command) => {
    const {treatCommand} = command 
    let hasAll = true
    words.forEach(word => {

        if(Array.isArray(word)){
            let hasSomeSub = false

            word.forEach(subword => {
                if(treatCommand.includes(subword))
                    hasSomeSub = true
            })

            if(!hasSomeSub)
                hasAll = false

        } else {
            
        if(!treatCommand.includes(word))
            hasAll = false

        }
    })
    return hasAll
}