const pesquisar = require('./actions/search')
const calculo = require('./actions/calculate')
const criar = require('./actions/create')

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
            case 'ligar':
                break
            default:

                break
        }
    }
}