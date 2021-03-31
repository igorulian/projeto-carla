const pesquisar = require('./actions/search')
const calculo = require('./actions/calculate')
const criar = require('./actions/create')
const tocar = require('./actions/tocar')
const iniciar = require('./actions/iniciar')

module.exports = {
    verify(action) {
        const actVerb = action.action
        
        switch (actVerb){
            case 'pesquisar':
                pesquisar.pesquisar(action)
                break
            case 'calcular':
                calculo.calcular(action)    
                break
            case 'criar':
                criar.criar(action)
                break
            case 'remover':
                criar.criar(action)
                break
            case 'ligar':
                break
            case 'tocar':
                tocar.tocar(action)
                break
            case 'iniciar':
                iniciar.iniciar(action)
                break
            default:

                break
        }
    }
}