const speech = require('./src/speech-recognition')
const lembretes = require('./src/services/lembrete-checker')
const socket = require('./src/socket')
const dev = require('./src/services/dev')

function start(){
  lembretes.startCheck()
  // socket.start()
  speech.recognition()
  // dev.getInput()
}

start()