//const trigger = require('./src/trigger-checker')
import {triggerChecker} from './src/trigger-checker.js'
//const lembretes = require('./src/services/lembrete-checker')
//const socket = require('./src/socket')
//const dev = require('./src/services/dev')

function start(){
  //lembretes.startCheck()
  // socket.start()
  triggerChecker()
  // dev.getInput()
}

start()