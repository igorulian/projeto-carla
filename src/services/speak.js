const fs = require('fs')
const dev = require('../services/log')
const textToSpeech = require('@google-cloud/text-to-speech');
const util = require('util');
const spawn = require("child_process").spawn;

const client = new textToSpeech.TextToSpeechClient();

require('dotenv').config()

module.exports = {
    async say(text) {
        // await gerarAudioGoogle(text)
        // await playAudio()
        playAudioPython(text)
        dev.log(text)
    }
}


async function gerarAudioGoogle(text) {
  // The text to synthesize
  dev.log('Gerando audio com google Cloud...')

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'pt-BR', ssmlGender: 'NEUTRAL'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  // console.log(response.audioContent)
  // console.log(__dirname)
  await writeFile('./src/audio/audio.mp3', response.audioContent, 'binary');

  console.log('Audio GOOGLE Gerado!');
}


async function gerarAudioIBM(text){
    dev.log('Gerando audio com IBM Cloud...')
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

    const synthesizeParams = {
      text: '... ' + text + '',
      accept: 'audio/mp3',
      voice: 'pt-BR_IsabelaVoice'
    };
    
    await textToSpeech.synthesize(synthesizeParams)
      .then(response => {
        return textToSpeech.repairWavHeaderStream(response.result);
      })
      .then(buffer => {
        fs.writeFileSync('outputIBM.mp3', buffer);
      })
      .catch(err => {
        console.log('error:', err);
      });

      console.log('Audio IBM Gerado!');
}


async function playAudio(){
  dev.log('Playando audio...')
  // const pythonProcess = spawn('python',["./play-audio.py"]);
  console.log(__dirname + ' -> ' + '/play-audio.py')
  spawn("C:/Users/IgorU/AppData/Local/Programs/Python/Python39/python.exe",[`.${__dirname}/play-audio.py`]);
}


function playAudioPython(text) {
  const path = `${__dirname}\\speak.py`

  let txt = text
  txt = txt.replace(',', '') 
  txt = txt.split(' ')

  const pythonProcess = spawn("C:/Users/IgorU/AppData/Local/Programs/Python/Python39/python.exe",[path, txt]);
  // console.log(pythonProcess)

}
