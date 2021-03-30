const speak = require('../../services/speak')
const fs = require("fs");
const dev = require('../../services/dev')

const path = `./src/data/lembretes.json`

module.exports = {
    executar(action){
        const act = action.action
        if(act === 'criar')
            adicionarLembrete(action)
        else 
            removerLembrete(action)

    },
}


function removerLembrete(action) {
    try{
        const horaASerRemovida = pegarHora(action)
        
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

    }catch(err) {
        speak.say('Ocorreu um erro ao remover o lembrete, tente novamente...');
        dev.log(err); 
        return;
    }
    
}

function adicionarLembrete(action){
    try{
        let lembrete = {
            horario: '',
            titulo: '',
            dia: '',
            diario: false
        }

        lembrete.horario = pegarHora(action)
        lembrete.titulo = pegarTitulo(action)
        lembrete.diario = pegarDiario(action)
        lembrete.dia = pegarDia(action)

        dev.log(lembrete)

        if(!lembrete){
            speak.say('Desculpe, não consegui entender os parâmentros do lembrete')
            return
        }

        criarLembrete(lembrete)
        speak.say(`Lembrete para às ${lembrete.horario} salvo com sucesso!`)
    }catch(err) {
        speak.say('Ocorreu um erro ao criar o lembrete, tente novamente...');
        dev.log(err);
        return;
    }
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
    let palavraFinal = ['das', 'às', 'para', 'as', 'para às']

    let temTitulo = false

    let titulonome = ['titulo', 'nome']

    titulonome.map(titulonome => {
        if(titulo.includes(titulonome)){
            titulo = titulo.split(titulonome)[1]
            titulo = titulo.trim()
            temTitulo = true
            return
        }
    })

    palavraFinal.map(bagulho => {
        if(titulo.split(' ').includes(bagulho)){
            titulo = titulo.split(bagulho)[0]
        }
    })

    titulo = titulo.trim()

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

function pegarDia(action){
    let dia = action.tcommand
    const diaAtual = new Date().getDate()
    let mesAtual = new Date().getMonth()
    mesAtual = parseInt(mesAtual) + 1

    if(dia.includes('amanhã')){              // isso provavelmente vai dar ruim se o dia for tipo.. dia 30 ou 29, mas deixa para lá ja ta bom
        dia = (parseInt(diaAtual) + 1) + '/' + mesAtual
    }else{
        dia = diaAtual + '/' + mesAtual
    }

    return dia
}

function pegarHora(action){

    let horario = ''
    let conectores = ['das', 'às', 'as', 'para', 'para às']

    conectores.map(conector => {
        if(action.tcommand.split(' ').includes(conector)){
            horario = action.tcommand.split(conector)[1]
            return
        }
    })

    horario = horario.replace('horas', ':00')
    horario = horario.replace('meio-dia', '12')
    horario = horario.replace('e meia', ':30')

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