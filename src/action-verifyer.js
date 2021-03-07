const pesquisar = require('./actions/search')

module.exports = {
    verify(action) {
        const actVerb = action.action
        
        switch (actVerb){
            case 'pesquisar':
                pesquisar.pesquisar(action)
                break
            case 'acender':
                break
            default:

                break
        }
    }
}