const say = require('say')


module.exports = {
    say(text) {
        say.speak(text, speed=10)
        console.log(text)
    }
}

