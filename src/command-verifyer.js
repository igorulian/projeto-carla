const pesquisar = ['pesquisar','pesquisa', 'pesquise', 'procure', 'procura', 'qual', 'quem', 'o que', 'quanto']
const acender = ['acender','acende', 'acenda', 'Cíntia']

const dev = require('./services/log')

const verbs = [pesquisar, acender]


const checkVerb = (command) => { // check what verb is this command about
    for(let y = 0; y < verbs.length; y++){
        const verb = verbs[y]

        for(let x = 0; x < verb.length; x++){
            if(command.includes(verb[x])){
                return {action: verb[0], verbSaid: verb[x]}
            }
        }
    }
    return null
}

const treatCommand = (command) => { // return treated command, with verb and text
    const verb = checkVerb(command)
    if(!verb) return null
    const tcommand = command.replace(verb.verbSaid, '').trim()
    const treatedCommand = {
        action: verb.action,
        verbSaid: verb.verbSaid,
        tcommand,
        fullCommand: command
    }
    dev.log(treatedCommand)
    return treatedCommand
}

module.exports = {
    verify(command) {
        const cmdLower = command.toLowerCase()

        const treatedCommand = treatCommand(cmdLower) 

        if(!treatedCommand){
            dev.log('Nenhuma ação encontrada, tente novamente...')
            return
        }
        return treatedCommand
    }
}