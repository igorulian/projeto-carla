import fs from 'fs'
import util from 'util'

export let config = {}

export async function SetupConfig(){
    console.log('\n🔧 Atualizando as configurações ...')
    const readFile = util.promisify(fs.readFile);

    const fileData = await readFile('./src/config/config.json', (err,data) => {
        if(err)
            console.log('🔧 Ocorreu um erro ao atualizar as configurações ❌')

        return data
    })

    config = JSON.parse(fileData)
    console.log('🔧 Configurações atualizadas com sucesso ✅\n')
}