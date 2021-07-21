import { treatCommand } from './command-treater.js'
import { ExecuteCommand } from './actions/command-executor.js'

async function handleCommand(text) {
    const command = treatCommand(text)

    if(!command) return
    
    await ExecuteCommand(command)
}


export {handleCommand}