const pesquisar = require('./actions/search')
const calculo = require('./actions/calculate')

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
            case 'acender':
                break
            default:

                break
        }
    }
}