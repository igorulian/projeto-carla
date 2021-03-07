const name = ['Carla','carla','Karla','karla']

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
        console.log(words)

        const trigger = checkTrigger(text)

        if(!trigger){
            console.log('sem trigger')
            return
        }else{
            console.log(`trigger = ${trigger}`)
        }

        const command = text.split(trigger)[1].replace(',','').trim()
        console.log(`Command: ${command}`)
        return command
        // cmd.verify(command)
    }
}