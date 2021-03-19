const speak = require('../services/speak')
const dev = require('../services/log')
const lembrete = require('./modules/lembretes')


module.exports = {
    criar(action){
        if(action.tcommand.includes('lembrete') || action.tcommand.includes('alarme')){
            dev.log(action.action)
            lembrete.executar(action)
        }
        
    }
}
