import {search} from './actions/search.js'
import { start } from './services/start.js'
import {setLoading} from './hardware/controller.js'

async function executeCommand(command) {
    const action = command.action

    setLoading(true)
    
    switch (action){
        case 'pesquisar' || 'calcular':
            await search(command)
            break
        case 'criar' || 'remover': 
            console.log(`executando ação: ${action}`)
            break
        case 'ligar':
            console.log(`executando ação: ${action}`)
            break
        case 'tocar':
            console.log(`executando ação: ${action}`)
            break
        case 'iniciar':
            await start(command)
            break
        default:
            break
    }

    setLoading(false)
}

export {executeCommand}