import { listenConfirmation } from "../command-confirmation.js"
import { config } from "../config/config.js"
import { say } from "../speak/speak.js"
import { GetWeather } from "./weather.js"
import { getDay } from "./what-day.js"

export async function SetupWakeUp(){
    console.log('\n⏰ Iniciando despertado...')
    const {time,enable} = config.wakeup

    if(!enable) return

    const [hour,minute] = time.split(':')

    CheckWakeUp(hour,minute)
    console.log('⏰ Despertado Iniciado ✅\n')
}

function CheckWakeUp(WakeupHour,WakeupMinute){
    setTimeout(async () => {
        const hourNow = new Date().getHours()
        const minuteNow = new Date().getMinutes()

        if(parseInt(WakeupHour) === hourNow && parseInt(WakeupMinute) === minuteNow)
            await WAKEUP(WakeupHour,WakeupMinute)
        
        CheckWakeUp(WakeupHour,WakeupMinute)
        
    },60000)
}



async function WAKEUP(hour,minute){
    const { daytxt } = getDay()
    let { text,max,min } = await GetWeather()
    text = text.replace('Sol', 'ensolarado')
    text = text.replace('Chuva', 'Chuvoso')

    const mintext = `${minute ? `${minute === 30 ? 'meia' : ''} ${minute !== 30 ? `${minute}` : ''} `: ''}`

    await say(`Bom dia senhor, hoje é ${daytxt}, são ${hour} e ${mintext}, o dia está ${text}, com temperatura máxima de ${max} e mínima de ${min}.
                O Senhor possui ${2} compromissos para hoje, deseja que eu liste todos?`)

    if(await listenConfirmation()){
        await say(`Ok! Hoje o senhor possui:
            Teste às 15:30  
            Teste2 às 20:30`)
    }            
}

