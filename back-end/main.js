const trigger = require('./src/trigger-checker')
const lembretes = require('./src/services/lembrete-checker')
const socket = require('./src/socket')
const dev = require('./src/services/dev')

function start(){
  lembretes.startCheck()
  // socket.start()
  trigger.recognition()
  // dev.getInput()
}

start()