const say = require('say')


module.exports = {
    say(text) {
        say.speak(text, speed=2)
        console.log(text)
    }
}

