const speak = require('../services/speak')
const dev = require('../services/dev')
const cronometro = require('./modules/cronometro')

module.exports = {
    iniciar(action){
        if(action.tcommand.includes('cronômetro')){
            cronometro.inciar(action)
        }
        
    }
}
