import {treatCommand} from './command-treater.js'
import {executeCommand} from './command-executor.js'

async function handleCommand(text) {
    const command = treatCommand(text)

    console.log(command)

    if(!command) return
    
    await executeCommand(command)
}


export {handleCommand}