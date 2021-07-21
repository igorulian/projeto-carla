import { say } from "../speak/speak.js"



async function HowAreYouDoing(command){
    const random = getRandom(1,1)
    switch (random){
        case 1:
            await say(`Estou bem! e você?`)
    }

}

async function WhoAreYou(command){
    const random = getRandom(1,2)
    switch (random){
        case 1:
            await say(`Eu sou uma assistente, criada para ajudar as pessoas.`)
        case 2:
            await say(`Eu sou um robô.`)
        case 3:
            await say(`Eu sou a LINDA, um robô criado para ajudar.`)
    }
}



function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {HowAreYouDoing,WhoAreYou}