import { say } from "../speak/speak.js"



async function HowAreYouDoing(command){
    const random = getRandom(1,1)
    console.log('aqui')
    switch (random){
        case 1:
            await say(`Estou bem! e você?`)
            break
    }

}

async function WhoAreYou(command){
    const random = getRandom(1,3)
    console.log('aqui2')
    switch (random){
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



function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {HowAreYouDoing,WhoAreYou}