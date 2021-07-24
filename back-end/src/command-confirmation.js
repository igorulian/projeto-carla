import recorder from 'node-record-lpcm16'
import {SpeechClient} from '@google-cloud/speech'

const timeoutSec = 10

export async function listenConfirmation(timeout = timeoutSec * 1000){

  return new Promise(resolve => {
    let timer;

    async function responseHandler(awnser) {
      pauseStream()
      resolve()
      console.log('passo aqui')
      clearTimeout(timer)
      console.log('passo aqui 2')
      return awnser
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
        interimResults: true,
      };
        
      const recognizeStream = client.streamingRecognize(request)

      recognizeStream.on('error', console.error)

      recognizeStream.on('data', data => {
        const isPaused = recognizeStream.isPaused()

        if(isPaused) responseHandler()

        const text = data.results[0].alternatives[0].transcript

        if(text.toLowerCase().inclues('sim') || text.toLowerCase().inclues('por favor') || text.toLowerCase().inclues('porfavor'))
            return responseHandler(true)

        if(text.toLowerCase().inclues('não'))
            return responseHandler(true)

        console.log(`Command: ${text}`)

        responseHandler(text)

      }
      );

      function pauseStream(){
        recognizeStream.end()// our pause
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
        
      console.log('✔️ Ouvindo confirmação')

    // Command Handler

    timer = setTimeout(() => {
      responseHandler(false)
    }, timeout)

  })

}