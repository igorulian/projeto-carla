import { SetupConfig } from './src/config/config.js'
import { SetupWheaterVerification } from './src/services/weather.js'
import { triggerChecker } from './src/trigger-checker.js'

async function start(){
  await SetupConfig()
  await SetupWheaterVerification()
  triggerChecker()
}

start()