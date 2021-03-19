const pesquisar = ['pesquisar','pesquisa', 'pesquise', 'pesquisou','procure', 'procura', 'qual', 'quem', 'o que', 'quando']
const ligar = ['ligar','ligue','acender','acende', 'acenda', 'Cíntia']
const calcular = ['calcular', 'calcula', 'calcule', 'quanto']
const criar = ['criar', 'cria', 'crie', 'adicione', 'adicionar','adiciona','quero', 'queria']
const remover = ['remover', 'remove', 'remova', 'deletar', 'delete', 'deleta']

const dev = require('./services/log')

const verbs = [pesquisar, ligar, calcular, criar, remover]


const checkVerb = (command) => { // verificar qual verbo se trata
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

const treatCommand = (command) => { // trata o comando e retorna em um objeto
    const verb = checkVerb(command)
    if(!verb || !verb.action) return null
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