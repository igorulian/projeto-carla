const path = `./src/data/lembretes.json`
const fs = require("fs");
const dev = require('./dev');
const speak = require("./speak");

module.exports = {
    async startCheck() {
        console.log('✔️ Verificador de lembrete iniciado')
        while (true){
            await sleep(60 * 1000) // 1 min
            checkLembrete()
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function checkLembrete(){
    dev.log('  ⏰ Verificando lembretes....')
    const jsonData = fs.readFileSync(path, 'utf-8')
    const lembretes = JSON.parse(jsonData);

    const horarioAtual = new Date().getHours();
    const minutoAtual = new Date().getMinutes();
    const diaAtual = new Date().getDate()
    const mesAtual = parseInt(new Date().getMonth()) + 1 // começa 0 = janeiro

    lembretes.map(lembrete => {
        const horaLembrete = parseInt(lembrete.horario.split(':')[0])
        const minutoLembrete = parseInt(lembrete.horario.split(':')[1])
        const diaLembrete = parseInt(lembrete.dia.split('/')[0])
        const mesLembrete = parseInt(lembrete.dia.split('/')[1])

        const soneca = 1

        if(
            (horaLembrete === horarioAtual && (minutoLembrete === minutoAtual || minutoLembrete === minutoAtual + soneca))
            && (diaLembrete === diaAtual && mesLembrete === mesAtual)
            ){
            console.log("ALARMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
            // console.log(`HLebrete: ${horaLembrete} | HAtual: ${horarioAtual}`)
            // console.log(`MLebrete: ${minutoLembrete} | MAtual: ${minutoAtual}`)
            // console.log(`MLebrete: ${diaLembrete} | MAtual: ${diaAtual}`)
            // console.log(`MLebrete: ${mesLembrete} | MAtual: ${mesAtual}`)
            // play musica
            speak.say(`Lembrete das ${lembrete.horario}: ${lembrete.titulo}`)
            removerLembrete(lembrete)
        }

        return 
    })

}

function removerLembrete(lembrete) {

    const horario = lembrete.horario
    const dia = lembrete.dia
    const diario = lembrete.diario

    if(diario) return
    
    const jsonData = fs.readFileSync(path, 'utf-8')
    const lembretes = JSON.parse(jsonData);

    let lembreteEncontrado = false
    let novosLembretes = []

    lembretes.map(lembrete => {
        console.log(lembrete)

        if(lembrete.horario !== horario && lembrete.dia !== dia)
            novosLembretes.push(lembrete)
        else
            lembreteEncontrado = true

        return 
    })

    fs.writeFileSync(path, JSON.stringify(novosLembretes, null, 4))
}
  