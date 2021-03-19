const recorder = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');
require('dotenv').config()



module.exports = {
    async getAnswer(){
        let txt = ''
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
        
        const recognizeStream = await client
          .streamingRecognize(request)
          .on('error', console.error)
          .on('data', data =>{
            const ttext = data.results[0].alternatives[0].transcript
            console.log('aaaaaaaaaaaaaaaaaa')
            process.stdout.write(
              data.results[0] && data.results[0].alternatives[0]
                ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
                : '\n\nReached transcription time limit, press Ctrl+C\n'
            )
          }
          );
        
        
        await recorder
          .record({
            sampleRateHertz: sampleRateHertz,
            threshold: 0,
            verbose: false,
            recordProgram: 'rec', // Try also "arecord" or "sox"
            silence: '10.0',
          })
          .stream()
          .on('error', console.error)
          .pipe(recognizeStream)

        
        // sleep(4000)
        console.log('potato')


    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  