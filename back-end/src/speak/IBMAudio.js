import fs from 'fs'
import util from 'util'
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1.js'
import {IamAuthenticator} from 'ibm-watson/auth/index.js'
import dotenv from 'dotenv'
dotenv.config()

const format = 'mp3'

async function generateIBMAudio(text){
    console.log(new Date())
    console.log('Gerando audio com IBM Cloud...')

    const textToSpeech = new TextToSpeechV1({
      authenticator: new IamAuthenticator({
        apikey: process.env.IBM_API_KEY,
      }),
      serviceUrl: process.env.IBM_SERVICE_URL,
      disableSslVerification: true, 
    });

    const synthesizeParams = {
      text: `${text}`,
      accept: `audio/${format}`,
      voice: 'pt-BR_IsabelaV3Voice'
    };
    
    await textToSpeech.synthesize(synthesizeParams)
      .then(response => {
        response.result.pipe(fs.createWriteStream(`./src/audio/audio.${format}`));
      })
      .catch(err => {
        console.log('error:', err);
      });
    
    console.log('Terminou')
    console.log(new Date())
}


generateIBMAudio('essa é uma frase para testar')

export {generateIBMAudio}
