const answer = require('../services/answer')
const speak = require('../services/speak')
const fs = require("fs");
const dev = require('../services/log')

const path = `./src/data/lembretes.json`

module.exports = {
    criar(action){
        if(action.tcommand.includes('lembrete')){
            console.log(action.action)
            if(action.action === 'remover'){
                try{    removerLembrete(action)     }catch(err) {speak.say('Ocorreu um erro ao remover o lembrete, tente novamente...'); dev.log(err); return;}
            }else{
                try{    adicionarLembrete(action)   }catch(err) {speak.say('Ocorreu um erro ao criar o lembrete, tente novamente...');  dev.log(err); return;}
            }
        }
        
    }
}

function removerLembrete(action) {

    const horaASerRemovida = extrairHora(action)
    
    const jsonData = fs.readFileSync(path, 'utf-8')
    const lembretes = JSON.parse(jsonData);

    let lembreteEncontrado = false
    let novosLembretes = []

    lembretes.map(lembrete => {
        console.log(lembrete)

        if(lembrete.horario !== horaASerRemovida)
            novosLembretes.push(lembrete)
        else
            lembreteEncontrado = true

        return 
    })

    fs.writeFileSync(path, JSON.stringify(novosLembretes, null, 4))

    return lembreteEncontrado ? 
    speak.say(`Lembrete das ${horaASerRemovida} removido com sucesso!`) 
    : speak.say('Não foi possível localizar o lembrete, tente novamente...')
    
}

function adicionarLembrete(action){
    let lembrete = {
        horario: '',
        titulo: '',
        diario: false
    }

    lembrete.horario = extrairHora(action)
    lembrete.titulo = pegarTitulo(action)
    lembrete.diario = pegarDiario(action)

    dev.log(lembrete)

    if(!lembrete){
        speak.say('Desculpe, não consegui entender os parâmentros do lembrete')
        return
    }

    criarLembrete(lembrete)
    speak.say(`Lembrete para às ${lembrete.horario} salvo com sucesso!`)
}

async function criarLembrete(lembrete){
    dev.log('Criando lembrete...')

    const jsonData = fs.readFileSync(path, 'utf-8')
    const lembretes = JSON.parse(jsonData);
    
    lembretes.push(lembrete)

    dev.log(lembretes)

    fs.writeFileSync(path, JSON.stringify(lembretes, null, 4))
}

function pegarTitulo(action){
    let titulo = action.tcommand
    titulo = titulo.replace('título', 'titulo')
    let bagulhos = ['das', 'às', 'as', 'para as', 'para às']

    let temTitulo = false

    if(titulo.includes('titulo')){
        titulo = titulo.split('titulo')[1]
        titulo = titulo.trim()
        temTitulo = true
    }

    if(titulo.includes('nome')){
        titulo = titulo.split('nome')[1]
        titulo = titulo.trim()
        temTitulo = true
    }

    bagulhos.map(bagulho => {
        if(titulo.includes(bagulho)){
            titulo = titulo.split(bagulho)[0]
            temTitulo = true
        }
    })

    return temTitulo ? titulo : ''

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

function extrairHora(action){

    let horario = ''
    let bagulhos = ['das', 'às', 'as', 'para as', 'para às']

    bagulhos.map(bagulho => {
        if(action.tcommand.includes(bagulho)){
            horario = action.tcommand.split(bagulho)[1]
            return
        }
    })

    horario = horario.replace('horas', ':00')

    let h1 = horario.split(':')[0].trim()
    let h2 = horario.split(':')[1].trim()


    h1 = h1.split("").filter(n => (Number(n) || n == 0)).join("");
    h1 = h1.trim().split(' ')[0]

    h2 = h2.split("").filter(n => (Number(n) || n == 0)).join("");
    h2 = h2.trim().split(' ')[0]


    horario = h1 + ':' + h2

    if(action.tcommand.includes('tarde') || action.tcommand.includes('noite')){
        h1 =  parseInt(h1) + 12

        horario = h1 + ':' + h2
    }

    horario = horario.trim()
    
    return horario
}