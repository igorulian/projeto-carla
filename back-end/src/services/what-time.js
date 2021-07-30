import { say } from "../speak/speak.js"


export async function WhatTime(command) {
    const data = getData()

    await say(`Agora são ${data.hour} hora${data.hour > 1 ? 's' : ''} e ${ data.minute > 0 ? `${data.minute} minuto${data.minute > 1 ? 's' : ''}` : ``}`)
}

function getData(){
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()

    return {hour,minute}
}