const path = `./src/data/lembretes.json`
const fs = require("fs");
const dev = require('./log')

module.exports = {
    async startCheck() {
        console.log('✔️ Verificador de lembrete iniciado!')
        while (true){
            await sleep(2 * 1000) // 1 min
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

    lembretes.map(lembrete => {
        console.log(lembrete)

        if(lembrete.horario === `${horarioAtual}:${minutoAtual}`)
            console.log("ALARMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")

        return 
    })

}
  