const cmd = require('./command-verifyer')
const act = require('./action-verifyer')

const dev = require('./services/log')

module.exports = {
    checkText(text) {
        const command = checkTrigger(text)
        if(!command){dev.log('Sem trigger'); return;}

        const action = cmd.verify(command)
        if(!action){dev.log('Action undefined'); return;}

        act.verify(action)
    }
}



function checkTrigger(text) {
    const name = ['Linda','linda']

    const words = text.toLowerCase().split(' ')
    dev.log(words)

    let trigger = ''                     
    for(let x = 0; x < name.length; x++){
        if(text.includes(name[x])){
            trigger = name[x]
        }
    }

    if(trigger == '') return false

    const command = text.split(trigger)[1].replace(',','.').trim()
    dev.log(`Command: ${command}`)
    return command

}