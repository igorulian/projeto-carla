const recorder = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');
const check = require('./text-verifyer')


module.exports = {
    async teste() {
      console.log('Começo')
      await new Promise(resolve => setTimeout(resolve, 10000))
      console.log('Termino')
    },
    async recognition(timeout = 10000){

      return new Promise((resolve, reject) => {
        let timer;

        function responseHandler() {
          resolve();
          clearTimeout(timer);
        }

        // Command Handler

          const client = new speech.SpeechClient();

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
            console.log(`isPaused: ${isPaused}`)

            if(isPaused) return
            const text = data.results[0].alternatives[0].transcript
            console.log(`Command: ${text}`)

            check.checkText(text)
            recognizeStream.pause()

            responseHandler()

          }
          );
            
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
            reject(new Error("timeout waiting for msg"))
        }, timeout)


      })
    
  }
}