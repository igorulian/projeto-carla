require('dotenv').config()

module.exports = {
    log(txt){
        if(process.env.DEV_MODE === 'true'){
            console.log(txt)
        }
    }
}