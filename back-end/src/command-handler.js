import { treatCommand } from './command-treater.js'
import { ExecuteCommand } from './actions/command-executor.js'
import { sendLoading } from './socket/connection.js'

async function handleCommand(text) {
    const command = treatCommand(text)
    if(!command) return

    
    sendLoading(true)

    await ExecuteCommand(command)
    
    sendLoading(false)
}


export {handleCommand}