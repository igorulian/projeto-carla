import { DolarQuote } from "../services/dollar-quote.js"
import { Timer } from "../services/timer.js"
import { WeatherForecast } from "../services/weather.js"
import { WhatDay } from "../services/what-day.js"
import { WhatTime } from "../services/what-time.js"

export async function ExecuteCommand(command){
    const {treatCommand} = command 

    const hasWords = (words) => {
        let has = true
        words.forEach(word => {
            if(!treatCommand.includes(word))
                has = false
        })
        return has
    }

    if(hasWords(['previsão', 'tempo']))
        return await WeatherForecast(command)


    if(hasWords(['preço', 'dólar']))
        return await DolarQuote(command)


    if(hasWords(['horas', 'são']))
        return await WhatTime(command)

    
    if(hasWords(['dia', 'hoje']))
        return await WhatDay(command)


    if(hasWords(['cronômetro']))
        return await Timer(command)
}