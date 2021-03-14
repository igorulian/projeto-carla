const answer = require('../services/answer')
const speak = require('../services/speak')
const fs = require("fs");
const dev = require('../services/log')

module.exports = {
    criar(action){
        if(action.tcommand.includes('lembrete')){
            const lembrete = identificarLembrete(action)
            if(!lembrete.horario || !lembrete.titulo || !lembrete.diario){
                speak.say('Desculpe, não consegui entender os parâmentros do lembrete')
                return
            }
            criarLembrete(lembrete)
            speak.say(`Lembrete para às ${lembrete.horario} salvo com sucesso!`)
        }
    }
}



async function criarLembreteTeste(action) {
    speak.say('Ok! Qual será o nome do lembrete?')
    const title = await answer.getAnswer()
    speak.say('Ok! Qual o horário para o lembrete?')
    const hour = await answer.getAnswer()
    speak.say('Ok! Qual o dia para o lembrete?')
    const day = await answer.getAnswer()

    const lembrete = {
        title,
        hour,
        day
    }
    console.log(lembrete)
}

async function criarLembrete(lembrete){
    dev.log('Criando lembrete...')
    const path = `${__dirname}\\lembretes.json`

    const jsonData = fs.readFileSync(path, 'utf-8')
    const lembretes = JSON.parse(jsonData);

    console.log(lembretes)
    
    lembretes.push(lembrete)

    console.log('LEMBRETES:')
    console.log(lembretes)

    fs.writeFileSync(path, JSON.stringify(lembretes, null, 4))
}


 // se tiver diário e
function identificarLembrete(action){
    let lembrete = {
        horario: '',
        titulo: '',
        diario: false
    }
    console.log(action.tcommand)

    //horario
    lembrete.horario = pegarHorario(action)
    //titulo
    lembrete.titulo = pegarTitulo(action)
    //diario
    lembrete.diario = pegarDiario(action)

    console.log(lembrete)
    return lembrete
}

function pegarHorario(action){
    let horario = action.tcommand   
    horario = horario.replace(' horas', ':00')
    horario = horario.replace('às', 'as')
    horario = horario.split('as')[1]
    console.log(horario.split(' '))
    horario = horario.split(' ')[1]

    return horario
}

function pegarTitulo(action){
    let titulo = action.tcommand
    titulo = titulo.replace('título', 'titulo')

    if(titulo.includes('titulo')){
        titulo = titulo.split('titulo')[1]
        titulo = titulo.trim()
        return titulo
    }


    if(titulo.includes('nome')){
        titulo = titulo.split('nome')[1]
        titulo = titulo.trim()
        return titulo
    }

    return ''

}

function pegarDiario(action){
    if(action.tcommand.includes('diário') ||
        action.tcommand.includes('diario') ||
        action.tcommand.includes('diáriamente') ||
        action.tcommand.includes('diariamente')){
        
        return true
    }else{
        return false
    }
}