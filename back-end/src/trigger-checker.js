const recorder = require('node-record-lpcm16');
// Imports the Google Cloud client library
const textverifyer = require('./speech-recognition')
const speech = require('@google-cloud/speech');
const check = require('./text-verifyer')

let isTrigged = false


module.exports = {
    recognition(){
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
            interimResults: true
        }
          
        const recognizeStream = client.streamingRecognize(request)

        recognizeStream.on('error', console.error)

        recognizeStream.on('data', async data => {

            if(isTrigged) return

            const {confidence, transcript:text} = data.results[0].alternatives[0]

            console.log(`Trigger: ${text}`)

            if(text.includes('Linda') || text.includes('linda')){
              isTrigged = true
              console.log(`\nTRIGGER: ${isTrigged}`)
              await textverifyer.recognition()
              isTrigged = false
              console.log(`\nACABOU TRIGGER: ${isTrigged}`)
            }

          }
        );
          
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
}