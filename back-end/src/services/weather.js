import axios from 'axios'
import { say } from '../speak/speak.js'



async function WeatherForecast(action){
    const data = await getData(action)

    if(!data)
        return await say('Não foi possível verificar a previsão do tempo')
    
    const success = `A previsão é de ${data.text}, temperatura máxima de ${data.max}, e mínima de ${data.min}, com ${data.probability} % de chance de chuva`
    
    return await say(success)  
}



async function getData(action){
    let dia = 0
    
    if(action.treatCommand.includes('hoje')) dia = 0
    if(action.treatCommand.includes('amanhã')) dia = 1
    if(action.treatCommand.includes('amanhã') && action.treatCommand.includes('depois')) dia = 2

    const url = `http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/4388/days/15?token=${process.env.CLIMATEMPO_TOKEN}`
   
    const clima = await axios.get(url)
    .then(response => {
        const {max,min} = response.data.data[dia].temperature
        const {probability} = response.data.data[dia].rain
        const text = response.data.data[dia].text_icon.text.pt
    
        const data = {
            max,
            min,
            probability,
            text
        }
    
        return data
    })
    .catch(() => { return null })

    return clima
}

export {WeatherForecast}