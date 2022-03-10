import GoogleTranslate from '@google-cloud/translate'

const {Translate} = GoogleTranslate.v2

const translate = new Translate()

const target = 'en'
const targetPTBR = 'pt-BR'


function treatText(text){
    text = text.replace(/beauty/g, 'LINDA')
    text = text.replace(/LINDA/g, '')
    text = text.replace(/:/g, '')
    text = text.replace(/\n/g, '')
    text = text.trim()
    return text
}

function treatTextToEnglish(text){
    text = text.replace(/beauty/g, 'LINDA')
    text = text.trim()
    return text
}

export async function translateToEnglish(question){
    let [translations] = await translate.translate(question, target)
    translations = Array.isArray(translations) ? translations : [translations]
    return treatTextToEnglish(translations[0])
}

export async function translateToPortuguese(answer){
    answer = treatText(answer)
    let [translations] = await translate.translate(answer, targetPTBR)
    translations = Array.isArray(translations) ? translations : [translations]
    return translations[0]
}