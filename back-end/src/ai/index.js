import { setupFiles } from "./prompt/prompt.js"
import { getAIAnswer } from "./gpt3.js"
import { translateToEnglish, translateToPortuguese } from "./translate.js"
import { say } from "../speak/speak.js"

setupFiles()

function isAQuestion(answer){
   return (answer.toString().substr(-1) === '?')
}


export async function IA(question){
    const englishQuestion = await translateToEnglish(question.fullCommand)
    const answer = await getAIAnswer(englishQuestion)
    const translatedAnswer = await translateToPortuguese(answer)
    console.log('Question: ', isAQuestion(translatedAnswer))
    await say(translatedAnswer)
}