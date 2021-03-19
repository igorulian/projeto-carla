const recorder = require('node-record-lpcm16');
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const check = require('./text-verifyer')


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
            interimResults: false, // If you want interim results, set this to true
          };
          
          const recognizeStream = client
            .streamingRecognize(request)
            .on('error', console.error)
            .on('data', data =>{
              const ttext = data.results[0].alternatives[0].transcript
              process.stdout.write(
                data.results[0] && data.results[0].alternatives[0]
                  ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
                  : '\n\nReached transcription time limit, press Ctrl+C\n'
              )
              
              check.checkText(ttext)
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
          
          console.log('✔️ Reconhecimento de voz iniciado');
    }
}