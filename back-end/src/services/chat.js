import { say } from "../speak/speak.js"
import { GetWeather } from "./weather.js"


async function HowAreYouDoing(command){
    switch (getRandom(1,1)){
        case 1:
            await say(`Estou bem! e você?`)
            break
    }

}

async function WhoAreYou(command){
    switch (getRandom(1,3)){
        case 1:
            await say(`Eu sou uma assistente, criada para ajudar as pessoas.`)
            break
        case 2:
            await say(`Eu sou um robô.`)
            break
        case 3:
            await say(`Eu sou a LINDA, um robô criado para ajudar.`)
            break
    }
}

async function IllLeave(command){
    const hour = new Date().getHours()
    const {fullCommand} = command
    const hasNight = fullCommand.includes('noite')
    const hasParty = fullCommand.includes('festa')
    const weather = await GetWeather()
    const nightTempAverage = weather.night.max - weather.night.min
    const coldNight = nightTempAverage <= 20
    const hotNight = nightTempAverage >= 25

    if(hour < 17 || hasNight){
        switch (getRandom(1,2)){
            case 1:
                await say(`Ótimo! Aproveite a ${hasParty ? 'festa' : 'noite'}!`)
                break
            case 2:
                await say(`Ok! Aproveite a ${hasParty ? 'festa' : 'noite'}!`)
                break
        }
        if(coldNight)
            await say(`Eu recomendaria o senhor ir agasalhado, pois segundo a previsão do tempo a temperatura deve se manter baixa nesse período da noite`)
        
        if(hotNight)
            await say(`Eu recomendo o senhor ir com algo mais fresco, pois segundo a previsão do tempo a temperatura deve se manter alta nesse período da noite`)
        return
    }

    switch (getRandom(1,2)){
        case 1:
            await say(`Ótimo! Aproveite a tarde!`)
            break
        case 2:
            await say(`Ok!`)
            break
    }
}

async function ShouldILeave(command){
    switch (getRandom(1,2)){
        case 1:
            await say(`Não sei, você está com vontade de sair hoje?`)
            break
        case 2:
            await say(`Só se vive uma vez, vai logo seu bunda mole`)
            break
    }
}

async function IamBack(command){
    const random = getRandom(1,2)
    switch (random){
        case 1:
            await say(`Bem-vindo de volta senhor`)
            break
        case 2:
            await say(`Só se vive uma vez, vai logo seu bunda mole`)
            break
    }
}



function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {HowAreYouDoing,WhoAreYou,IllLeave,ShouldILeave,IamBack}