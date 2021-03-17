const speech = require('./src/speech-recognition')
const lembretes = require('./src/services/lembrete-checker')

function start(){
  lembretes.startCheck()
  speech.recognition()
}

start()