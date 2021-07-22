import { StartWheaterVerification } from './src/services/weather.js'
import {triggerChecker} from './src/trigger-checker.js'

async function start(){
  await StartWheaterVerification(false, true) // firstUpdate  - aftertime update
  triggerChecker()
}

start()