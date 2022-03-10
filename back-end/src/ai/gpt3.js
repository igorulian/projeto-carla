import OpenAI  from 'openai-api'
import dotenv from 'dotenv'
dotenv.config()
import { getPrompt, savePrompt, updatePrompt } from './prompt/prompt.js'


const OPENAI_API_KEY = process.env.OPENAI_SECRET_KEY

const openai = new OpenAI(OPENAI_API_KEY)

export async function getAIAnswer(question){    
    let prompt = getPrompt()

    prompt += `Human: ${question}`
    
    // console.log(prompt)

    const gptResponse = await openai.complete({
        engine: 'davinci',
        prompt: prompt,
        maxTokens: 100,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['Human']
    });

    const textAnswer = gptResponse.data.choices[0].text

    prompt += textAnswer
    updatePrompt(prompt)
    savePrompt()
    return textAnswer
}