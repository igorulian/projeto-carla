import { SetupConfig } from './src/config/config.js'
import { SetupWakeUp } from './src/services/wakeup.js'
import { SetupWheaterVerification } from './src/services/weather.js'
import { triggerChecker } from './src/trigger-checker.js'

async function start(){
  await SetupConfig()
  await SetupWheaterVerification()
  await SetupWakeUp()
  triggerChecker()
}

start()