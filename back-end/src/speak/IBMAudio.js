import fs from 'fs'
import util from 'util'
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1.js'
import {IamAuthenticator} from 'ibm-watson/auth/index.js'
import dotenv from 'dotenv'
import play from 'audio-play'
import createBuffer from 'audio-buffer-from'

dotenv.config()

const format = 'mp3'

// const IBMapikey = process.env.IBM_API_KEY
// const IBMserviceUrl = process.env.IBM_SERVICE_URL

// const IBMapikey = process.env.IBM_API_KEY_2
// const IBMserviceUrl = process.env.IBM_SERVICE_URL_2

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_API_KEY,
  }),
  serviceUrl: process.env.IBM_SERVICE_URL,
  disableSslVerification: true, 
});

async function generateIBMAudio(text){
    console.log('\n🔈 Gerando audio IBM...')
    const startingDate = new Date()
    const startingTime = startingDate.getHours()*3600 + startingDate.getMinutes()*60 + startingDate.getSeconds()


    const synthesizeParams = {
      text: `${text}`,
      accept: `audio/${format}`,
      voice: 'pt-BR_IsabelaV3Voice'
    };
    
    await textToSpeech.synthesize(synthesizeParams)
      .then(async response => {
        const buffer = response.result

        await buffer.pipe(fs.createWriteStream(`./src/audio/audio.${format}`))

        await new Promise(function(resolve, reject) {
          buffer.on('end', () => {resolve()})
          buffer.on('error', reject)
        })
      })
      .catch(err => {
        console.log('error:', err);
      })

    const finishingDate = new Date()
    const finishingTime = finishingDate.getHours()*3600 + finishingDate.getMinutes()*60 + finishingDate.getSeconds()

    const totalTime = finishingTime - startingTime
    console.log(`🔊 Audio gerado em: ${totalTime} s`)
}

export {generateIBMAudio}
