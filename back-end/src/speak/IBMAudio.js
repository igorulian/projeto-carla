import fs from 'fs'
import util from 'util'
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1.js'
import {IamAuthenticator} from 'ibm-watson/auth/index.js'
import dotenv from 'dotenv'
dotenv.config()

async function generateIBMAudio(text){
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
      accept: 'audio/wav',
      voice: 'pt-BR_IsabelaV3Voice'
    };
    
    await textToSpeech.synthesize(synthesizeParams)
      .then(response => {
        return textToSpeech.repairWavHeaderStream(response.result);
      })
      .then(async buffer => {
        const writeFile = util.promisify(fs.writeFile);

        await writeFile('./src/audio/audio.wav', buffer);
      })
      .catch(err => {
        console.log('error:', err);
      });
}

export {generateIBMAudio}
