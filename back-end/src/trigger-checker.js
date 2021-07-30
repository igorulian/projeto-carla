import recorder from 'node-record-lpcm16'
import {listenCommand} from './command-recognition.js'
import {SpeechClient} from '@google-cloud/speech'
import { setListening } from './hardware/controller.js';

let isTrigged = false


  function triggerChecker(){
      const client = new SpeechClient();

      const encoding = 'LINEAR16'
      const sampleRateHertz = 16000
      const languageCode = 'pt-BR'

      const request = {
          config: {
            encoding: encoding,
            sampleRateHertz: sampleRateHertz,
            languageCode: languageCode,
          },
          interimResults: true
      }
        
      const recognizeStream = client.streamingRecognize(request)

      recognizeStream.on('error', (err) => {
        console.log('RESETANDO...')

        if(!err.toString().includes('load the default credentials'))
          return triggerChecker()
        else
          return console.log('seta as credenciais ai irmão :/ ')
      })

      recognizeStream.on('data', async data => {

        if(isTrigged) return

        const {transcript:text} = data.results[0].alternatives[0]
        const hasTrigger = text.toString().toLowerCase().includes('linda')

        if(hasTrigger){
          console.log(`🔥 Trigger encontrado`)

          isTrigged = true
          setListening(true)
          
          await listenCommand()

          setListening(false)
          isTrigged = false

          console.log('\n⏰ Aguardando Trigger');
        }

      })
        
      recorder
        .record({
          sampleRateHertz: sampleRateHertz,
          threshold: 0,
          verbose: false,
          recordProgram: 'rec', // Try also "arecord" or "sox"
          silence: '10.0',
        })
        .stream()
        .on('error', console.error)
        .pipe(recognizeStream);
        
      console.log('⏰ Aguardando Trigger');
  }

export {triggerChecker}