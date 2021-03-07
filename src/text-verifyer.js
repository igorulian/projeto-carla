const cmd = require('./command-verifyer')
const act = require('./action-verifyer')
const trigger = require('./trigger-verifyer')


module.exports = { 
    checkText(text) {
        const command = trigger.verify(text)
        if(!command){console.log('ERRO: command undefined'); return;}

        const action = cmd.verify(command)
        if(!command){console.log('Action undefined'); return;}

        act.verify(action)
    }
}