import axios from 'axios'
import { say } from '../speak/speak.js'
import fs from 'fs'
import util from 'util'
import { config } from '../config/config.js'

async function WeatherForecast(action){
    const data = await getDataFromCache(action)

    if(!data)
        return await say('Não foi possível verificar a previsão do tempo')
    
    const success = `A previsão é de ${data.text}, com temperatura máxima de ${data.max}, e mínima de ${data.min}, com ${data.probability} % de chance de chuva`
    
    return await say(success)  
}

export async function StartWheaterVerification(firstupdate=true, updateAfterTime=true){
    if(firstupdate)
        await updateWheater()

    if(updateAfterTime)
        startUpdateAfterTime()
}

function startUpdateAfterTime(){
    setTimeout(async () => {
        await updateWheater()
        startUpdateAfterTime()
    },60 * config.weather.verificationDelay * 1000)
}

async function updateWheater(){
    console.log('\n🌦️  Atualizando previsão do tempo...')

    const newData = await getDataFromAPI()

    if(!newData) 
        return console.log('🌦️  Ocorreu um erro ao atualizar a previsão do tempo #01❌')

    await saveInCache( newData )

    console.log('🌦️  Previsão do tempo atualizada ✅\n')
}

async function saveInCache(data){
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('./src/data/weather-cache.json', JSON.stringify(data), err => {
        if(err)
            console.log('🌦️ Ocorreu um erro ao atualizar a previsão do tempo #02❌')
    })
}


async function getDataFromCache(action){
    const {fullCommand} = action
    let day = 0

    if(fullCommand.includes('amanhã')) 
        day = 1

    if(fullCommand.includes('amanhã') && fullCommand.includes('depois')) 
        day = 2


    const readFile = util.promisify(fs.readFile);
    const data = await readFile('./src/data/weather-cache.json', (err,data) => {
        return data
    })
    
    return JSON.parse(data)[day]
}

async function getDataFromAPI(){
    let dia = 0

    const url = `http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/4388/days/15?token=${process.env.CLIMATEMPO_TOKEN}`
    const data = []

    await axios.get(url)
    .then(response => {
        for(let x = 0; x < 3; x++){

            const {max,min} = response.data.data[x].temperature
            const {probability} = response.data.data[x].rain
            const text = response.data.data[x].text_icon.text.pt
        
            const dayData = {
                max,
                min,
                probability,
                text
            }

            data.push(dayData)
        }

    })
    .catch(() => { return null })

    return data
}

export {WeatherForecast}