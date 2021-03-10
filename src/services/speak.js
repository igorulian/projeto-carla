const fs = require('fs')
const dev = require('../services/log')

require('dotenv').config()

const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

// https://www.youtube.com/watch?v=rSjLe8k5DX0  https://cloud.ibm.com/apidocs/text-to-speech?code=node#data-collection

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
  apikey: "3383ucHfHBmBe1nhrOfSpIVOxUHRWBz-jfChAxdbW3sO",
  }),
  serviceUrl: "https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/12575fac-d9f8-46c8-a251-f939cbfa69fa",
  disableSslVerification: true, 
});

module.exports = {
    async say(text) {

      dev.log('Gerando audio...')

      const synthesizeParams = {
        text: '... ' + text + '',
        accept: 'audio/mp3',
        voice: 'pt-BR_IsabelaVoice'
      };
      
      await textToSpeech.synthesize(synthesizeParams)
        .then(response => {
          // only necessary for wav formats,
          // otherwise `response.result` can be directly piped to a file
          return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then(buffer => {
          fs.writeFileSync('./src/audio/audio.mp3', buffer);
        })
        .catch(err => {
          console.log('error:', err);
        });

        dev.log('Audio gerado!')

        // Fazer tocar o audio
        
        dev.log('Audio tocado')
      
    
    }
}
