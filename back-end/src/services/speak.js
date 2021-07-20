import fs from 'fs'
import util from 'util'
import { spawn } from 'child_process'
import play from 'audio-play'
import decoded from 'audio-decode'
import load from 'audio-loader'
import dotenv from 'dotenv'
dotenv.config()

import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1.js'
import {IamAuthenticator} from 'ibm-watson/auth/index.js'


const IBMApiKey = process.env.IBM_API_KEY
const IBMServiceURL = process.env.IBM_SERVICE_URL

async function say(text) {
    console.log(text)

    const treatedText = treatText(text)
    
    await gerarAudioIBM(treatedText)
    console.log(`LINDA: ${treatedText}`)
    
}


function treatText(text){
  let txt = text
  txt = txt.replace(':30', 'e meia')
  txt = txt.replace(',', '.') 
  txt = txt.split(' ')
  return txt
}

// async function playAudio(buffer){
//   console.log('tocando audio...')

//   load('audioIBM.mp3').then(function (buffer) {
//     console.log(buffer) // => <AudioBuffer>
//     let playback = play(buffer);
//     playback.play();
//   })
// }


async function gerarAudioIBM(text){
    console.log('Gerando audio com IBM Cloud...')

    // https://www.youtube.com/watch?v=rSjLe8k5DX0  https://cloud.ibm.com/apidocs/text-to-speech?code=node#data-collection

    const textToSpeech = new TextToSpeechV1({
      authenticator: new IamAuthenticator({
        apikey: IBMApiKey,
      }),
      serviceUrl: IBMServiceURL,
      disableSslVerification: true, 
    });

    const synthesizeParams = {
      text: `${text}`,
      accept: 'audio/mp3',
      voice: 'pt-BR_IsabelaV3Voice'
    };
    
    await textToSpeech.synthesize(synthesizeParams)
      .then(response => {
        return textToSpeech.repairWavHeaderStream(response.result);
      })
      .then(buffer => {
        // fs.writeFileSync('./src/audio/audioIBM.mp3', buffer);
        const writeFile = util.promisify(fs.writeFile);
        writeFile('./src/audio/audioIBM.mp3', buffer);
      })
      .catch(err => {
        console.log('error:', err);
      });

      console.log('Audio IBM Gerado!');
}


function playAudioPython(text) {
  const path = `./speak.py`

  let txt = text
  txt = txt.replace(':30', 'e meia')
  txt = txt.replace(',', '.') 
  txt = txt.split(' ')

  spawn("python",[path, txt]);
  // console.log(pythonProcess)

}

export {say}