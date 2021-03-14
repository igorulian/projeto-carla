
const dev = require('../services/log')
const speak = require('../services/speak')

module.exports = {
    calcular(action){
        const operadores = ['+', '-', 'x', '/']
        const operadoresStr = ['mais', 'menos', 'vezes', 'dividido']
        let x = null
        let y = null
        let resultado = null
        let opdr = null

        var calculo = action.tcommand
        calculo = calculo.replace('é', '').trim()

        operadoresStr.map( (opStr) => {
            if(calculo.includes(opStr)){
                calculo = calculo.replace(opStr, operadores[opStr.indexOf()])
            }
        })
        // calculo = 
       

        operadores.map( (operador) => {
            if(calculo.includes(operador)){
                x = calculo.split(operador)[0]
                y = calculo.split(operador)[1]
                switch (operador){
                    case '+':
                        resultado = x + y
                    break
                    case '-':
                        resultado = x - y
                    break
                    case 'x':
                        resultado = x * y
                    break
                    case '/':
                        resultado = x / y
                    break
                }
                dev.log(`x = ${x} y = ${y} opeador = ${operador}`)
                opdr = operador
            }
        })

        dev.log(`Resultado: ${resultado}`)
        if(!x || !y || !opdr){
            dev.log('ERRO ao realizar calculo')
            speak.say('Não consegui identificar o calculo desejado')
            return
        }
        let txt = `${x} ${opdr} ${y} é igual a ${resultado.toFixed(2)}`
        txt = txt.replace('/', 'dividido por')
        txt = txt.replace('*', 'vezes')
        txt = txt.replace('+', 'mais')
        txt = txt.replace('-', 'menos')
        speak.say(txt)
        return
    }
}