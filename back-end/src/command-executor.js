import {search} from './actions/search.js'

async function executeCommand(command) {
    const action = command.action
    
    switch (action){
        case 'pesquisar':
            console.log(`executando ação: ${action}`)
            await search(command)
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