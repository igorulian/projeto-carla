import { spawn } from 'child_process'
import { hasConnections, PlayAudioFront } from '../socket/connection.js'
import { generateIBMAudio } from './IBMAudio.js'

async function say(text) {
  const treatedText = treatText(text)
  
  await generateIBMAudio(treatedText)
  
  console.log('\n\x1b[33m%s\x1b[0m',`L.I.N.D.A: ${text}`)
  await playAudio()
  // await playAudioNode()
}


function treatText(text){
  let txt = text
  txt = txt.replace(':30', 'e meia')
  txt = txt.replace(',', '.') 
  txt = txt.replace('máxima', 'máçima')
  return txt
}


async function playAudio() {
  const child = spawn("python",['./src/speak/play.py', ''])

  await new Promise(resolve => {
      child.on('close', resolve);
  })

  return
}


function playAudioPython(text) {
  const path = `./src/speak/speak.py`

  let txt = text
  txt = txt.replace(':30', 'e meia')
  txt = txt.replace(',', '.') 
  txt = txt.split(' ')

  spawn("python",[path, txt]);

}

export {say}