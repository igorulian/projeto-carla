require('dotenv').config()

const check = require('../command-handler')

module.exports = {
    log(txt){
        if(process.env.DEV_MODE === 'true'){
            console.log(txt)
        }
    },
    getInput(){
        var readline = require('readline');
        var resp = "";


        var leitor = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        leitor.question("Envie o input manual ai:\n", function(answer) {
            var resp = answer;
            console.log("Input: " + resp);
            check.checkText(resp.toString())
            leitor.close();
        });

        console.log('uhul: ' + resp)
    }
}