import { say } from "../speak/speak.js";


export async function start(command){
    if(command.treatCommand.includes('teste')){
        await test(command)
    }
}

async function test(command){
    if(command.treatCommand.includes('áudio') || command.treatCommand.includes('audio'))
        await testAudio()
}

async function testAudio(){
    await say('Esse é um teste longo de audio')
}