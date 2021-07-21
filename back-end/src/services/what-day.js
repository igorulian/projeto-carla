import { say } from "../speak/speak.js"


export async function WhatDay(command) {
    const data = getData()

    await say(`Hoje é ${data.daytxt}, dia ${data.day} de ${data.month}`)
}

function getData(){
    const days = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo']
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

    const date = new Date()
    const day = date.getDate()
    const monthNumber = date.getMonth()

    const dayofweek = date.getDay()
    const daytxt = days[dayofweek]

    const month = months[monthNumber]

    return {day,month, daytxt}
}