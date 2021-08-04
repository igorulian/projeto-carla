import recorder from 'node-record-lpcm16'
import {SpeechClient} from '@google-cloud/speech'
import {handleCommand} from './command-handler.js'
import { setListening } from './hardware/controller.js'

const timeoutSec = 20

async function listenCommand(timeout = timeoutSec * 1000){

  return new Promise(resolve => {
    let timer;

    async function responseHandler(text) {
      destroyStream()
      setListening(false)
      await handleCommand(text)
      resolve()
      clearTimeout(timer)
    }

    // Command Handler

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
        interimResults: false,
      };
        
      const recognizeStream = client.streamingRecognize(request)

      recognizeStream.on('error', console.error)

      recognizeStream.on('data', data => {

        const text = data.results[0].alternatives[0].transcript
        console.log(`🎧 Comando: ${text}`)

        responseHandler(text)

      }
      );

      function destroyStream(){
        recognizeStream.destroy()
      }
        
      recorder
        .record({
          sampleRateHertz: sampleRateHertz,
          threshold: 0,
          verbose: false,
          recordProgram: 'rec', 
          silence: '10.0',
        })
        .stream()
        .on('error', console.error)
        .pipe(recognizeStream)
        
      console.log('\n🎧 Ouvindo comando...')

    // Command Handler

    timer = setTimeout(() => {
      responseHandler('')
    }, timeout)


  })

}

export {listenCommand}