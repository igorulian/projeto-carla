import {say} from '../speak/speak.js'

export async function Timer(command){
    const time = getTime(command)

    if(!time)
        return await say(`Desculpe, não consegui identificar o tempo.`)

    await say(makeTextAwnser(time, 'iniciado'))
    startTimer(time)
}

async function startTimer(time){
    const hour = time.hour * 3600000
    const minutes = time.minutes * 60000
    const seconds = time.seconds * 1000
    const total = hour + minutes + seconds
    
    setTimeout(() => {
        endTimer(time)
    },total)
}

function endTimer(time){
    say(makeTextAwnser(time, 'finalizado'))
}

function makeTextAwnser(time, end){
    const hourText = `${time.hour ? `${time.hour} hora${time.hour > 1 ? 's' : ''}` : ''}`
    const minuteLink = `${(time.hour && !time.seconds && time.minutes) ? 'e' : ''} ${(time.hour && time.seconds && time.minutes) ? ',' : ''}`
    const minuteText = `${time.minutes ? `${time.minutes} minuto${time.minutes > 1 ? 's' : ''}` : ''}`
    
    const secondLink = `${((time.minutes || time.hour) && (time.seconds)) ? 'e' : ''} `
    const secondText = `${time.seconds ? `${time.seconds} segundo${time.seconds > 1 ? 's' : ''}` : ''}`

    return `Cronômetro de ${hourText}${minuteLink}${minuteText}${secondLink}${secondText} ${end}`
}

function getTime(command){
    const hour = getData(command, 'hora')
    const minutes = getData(command, 'minuto')
    const seconds = getData(command, 'segundo')

    return({hour,minutes,seconds})
}


function getData(command, time){
    const {fullCommand} = command 
    let data = 0

    if(!fullCommand.includes(time)){
        if(time === 'hora') return 0

        data = fullCommand.split(time === 'minuto' ? 'hora' : 'minuto')[1]

        if(!data) return 0 

        if(data.includes('e meio') || data.includes('e meia'))
            return 30

        return 0
    }

    data = fullCommand.replace('uma', 'um')
    data = data.split(time)[0]
    data = data.split(' ')
    data = data[data.length-2]
    data = strToNum(data)

    return data
}



function strToNum(str){
    let resut = 0
    const numbersText = []
    const numbers = []

    for(let x = 1; x < 60; x++){
        numbersText.push(x.toString())
    }

    for(let x = 1; x < 60; x++){
        numbers.push(x)
    }

    numbersText.forEach(nstr => {
        if(str === nstr)
            resut = numbers[numbersText.indexOf(nstr)]
    })

    const strs = ['um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez',
    'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezeseis', 'dezesete', 'dezoito', 'dezenove', 'vinte']

    strs.forEach(s => {
        if(str === s)
            resut = numbers[strs.indexOf(s)]
    })

    return resut
}
