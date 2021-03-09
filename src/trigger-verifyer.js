// const name = ['Carla','carla','Karla','karla']
const name = ['Linda','linda']
const dev = require('./services/log')

const checkTrigger = (text) => {
    let trigger = ''
    for(let x = 0; x < name.length; x++){
        if(text.includes(name[x])){
            trigger = name[x]
            return trigger
        }

    }
    return false
}

module.exports = { 
    verify(text){
        const words = text.toLowerCase().split(' ')
        dev.log(words)

        const trigger = checkTrigger(text)

        if(!trigger){
            dev.log('sem trigger')
            return
        }else{
            dev.log(`trigger = ${trigger}`)
        }

        const command = text.split(trigger)[1].replace(',','').trim()
        dev.log(`Command: ${command}`)
        return command
        // cmd.verify(command)
    }
}