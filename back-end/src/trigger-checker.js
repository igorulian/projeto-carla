import recorder from 'node-record-lpcm16'
import {listenCommand} from './speech-recognition.js'
import {SpeechClient} from '@google-cloud/speech'

let isTrigged = false
const trigger = 'linda'


  function triggerChecker(){
      const client = new SpeechClient();

      const encoding = 'LINEAR16';
      const sampleRateHertz = 16000;
      const languageCode = 'pt-BR';

      const request = {
          config: {
            encoding: encoding,
            sampleRateHertz: sampleRateHertz,
            languageCode: languageCode,
          },
          interimResults: true
      }
        
      const recognizeStream = client.streamingRecognize(request)

      recognizeStream.on('error', console.error)

      recognizeStream.on('data', async data => {

        if(isTrigged) return

        const {transcript:text} = data.results[0].alternatives[0]

        if(text.toString().toLowerCase().includes('linda')){
          isTrigged = true
          console.log(`\nTRIGGER:`)
          await listenCommand()
          isTrigged = false
          console.log(`\nACABOU TRIGGER:`)
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
        
      console.log('✔️ Trigger iniciado');
  }

export {triggerChecker}