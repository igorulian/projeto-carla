import recorder from 'node-record-lpcm16'
import {SpeechClient} from '@google-cloud/speech'


async function listenCommand(timeout = 7000){

  return new Promise(resolve => {
    let timer;

    function responseHandler() {
      pauseStream()
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
        const isPaused = recognizeStream.isPaused()

        if(isPaused) responseHandler()

        const text = data.results[0].alternatives[0].transcript
        console.log(`Command: ${text}`)

        //check.checkText(text)
        responseHandler()

      }
      );

      function pauseStream(){
        recognizeStream.pause()
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
        
      console.log('✔️ Reconhecimento de voz iniciado')

    // Command Handler

    timer = setTimeout(() => {
      responseHandler()
    }, timeout)


  })

}

export {listenCommand}