const speak = require('../../services/speak')
const dev = require('../../services/dev')

module.exports = {
    async inciar(action){
        const res = pegarMinESeg(action)
        if(!res) return
        await speak.say(res.txt)
        iniciarCronometro(res.min, res.seg)
    }
}


function pegarMinESeg(action){
    if(!action.tcommand.includes('de')){
        speak.say('01 Não foi possível identicar o tempo para o cronômetro, tente novamete')
        return
    }
    // preciso trocar os numeros ditos por nmer normal, ex: um -> 1
    const numerostxt = ['um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez']
    const numeros = [1,2,3,4,5,6,7,8,9,0]

    let tempo = '' + action.tcommand

    for(let x = 0; x < numerostxt.length; x++){
        tempo = tempo.replace(numerostxt[x].toString(), numeros[x].toString())
    }

    tempo = tempo.replace('meio', '30 segundos')

    tempo = tempo.split('de')[1]
    let seg = 0;
    let min = 0;

    if(( tempo.includes('segundos') || tempo.includes('segundo') ) && (tempo.includes('minutos') || tempo.includes('minuto'))){
        min = tempo.split(tempo.includes('minuto') ? 'minuto' : 'minutos')[0]
        seg = tempo.split(tempo.includes('minuto') ? 'minuto' : 'minutos')[1].split(tempo.includes('segundo' ? 'segundo' : 'segundos'))[0]
        min = min.split("").filter(n => (Number(n) || n == 0)).join("");
        seg = seg.split("").filter(n => (Number(n) || n == 0)).join("");

    }else if (tempo.includes('segundo') || tempo.includes('segundos')){
        seg = tempo.split(tempo.includes('segundo') ? 'segundo' : 'segundos')[0]
        seg = seg.split("").filter(n => (Number(n) || n == 0)).join("");
        
    }else if (tempo.includes('minutos') || tempo.includes('minuto')){
        min = tempo.split(tempo.includes('minuto') ? 'minuto' : 'minutos')[0]
        min = min.split("").filter(n => (Number(n) || n == 0)).join("");
    }

    if(seg === 0 && min === 0){
        speak.say('Não foi possível identicar o tempo para o cronômetro, tente novamete')
        return
    }
    seg = seg.toString().trim()
    min = min.toString().trim()

    let txt = `Iniciando cronometro de ${min} minuto${min > 1 ? 's' : ''} e ${seg} segundo${seg > 1 ? 's' : ''}`

    seg = parseInt(seg)
    min = parseInt(min)

    if (min > 0 && seg === 0){
        txt = `Iniciando cronometro de ${min} minuto${min > 1 ? 's' : ''}`
    }else if (seg > 0 && min === 0 ){
        txt = `Iniciando cronometro de ${seg} segundo${seg > 1 ? 's' : ''}`
    }

    return {
        min,
        seg,
        txt
    }
}

async function iniciarCronometro(min, seg){
    const ms = (min * 60 * 1000) + (seg * 1000)
    dev.log('Começando a contar...')
    await sleep(ms)
    //só para pegar o txt bonitinho

    let txt = `Cronometro de ${min} minuto${min > 1 ? 's' : ''} e ${seg} segundo${seg > 1 ? 's' : ''} finalizado!`

    if (min > 0 && seg === 0){
        txt = `Cronometro de ${min} minuto${min > 1 ? 's' : ''} finalizado!`
    }else if (seg > 0 && min === 0 ){
        txt = `Cronometro de ${seg} segundo${seg > 1 ? 's' : ''} finalizado!`
    }

    speak.say(txt)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}