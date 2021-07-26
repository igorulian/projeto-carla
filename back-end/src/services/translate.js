import {v2} from '@google-cloud/translate'
import { say } from '../speak/speak.js'

const {Translate} = v2

const translate = new Translate()

export async function TranslateText(command){
   const sentence = getSentence(command)
   const translatedText = await translateRequest(sentence)
   
   await say(`Em inglês fica: ${translatedText}`)
}

function getSentence(command){
    let text = command.fullCommand
    text = text.replace('como', '')
    text = text.replace('é', '')
    text = text.replace('em', '')
    text = text.replace('inglês', '')
    text = text.replace('fala', '')
    text = text.replace('falar', '')
    text = text.trim()
    return text
}

async function translateRequest(text) {
    const target = 'en'

    let [translations] = await translate.translate(text, target)
    translations = Array.isArray(translations) ? translations : [translations]
    return translations[0]
}
  