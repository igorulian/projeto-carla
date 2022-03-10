import fs from 'fs'
import path from 'path'

export let prompt = ''

const filePath = path.join(path.resolve(), '/src/ai/prompt/prompt.txt')


export async function setupFiles(){
    console.log("\n 🔧 Setting up IA Files..")
    const content = await fs.promises.readFile(filePath, 'utf8')
    prompt = content.toString()
}

export function getPrompt(){
    return prompt
}

export function updatePrompt(newPrompt){
    prompt = newPrompt
}

export async function savePrompt(){
    await fs.promises.writeFile(filePath, prompt)
}