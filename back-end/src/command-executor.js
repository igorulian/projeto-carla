//const pesquisar = require('./actions/search')
//const calculo = require('./actions/calculate')
//const criar = require('./actions/create')
//const tocar = require('./actions/tocar')
//const iniciar = require('./actions/iniciar')


async function executeCommand(command) {
    const action = command.action
    
    switch (action){
        case 'pesquisar':
            console.log(`executando ação: ${action}`)
            //pesquisar.pesquisar(command)
            break
        case 'calcular':
            console.log(`executando ação: ${action}`)
            //calculo.calcular(command)    
            break
        case 'criar' || 'remover': 
            console.log(`executando ação: ${action}`)
            //criar.criar(command)
            break
        case 'ligar':
            console.log(`executando ação: ${action}`)
            break
        case 'tocar':
            console.log(`executando ação: ${action}`)
            //tocar.tocar(command)
            break
        case 'iniciar':
            console.log(`executando ação: ${action}`)
            //iniciar.iniciar(command)
            break
        default:
            break
    }
}

export {executeCommand}