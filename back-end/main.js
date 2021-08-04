import { SetupConfig } from './src/config/config.js'
import { SetupWakeUp } from './src/services/wakeup.js'
import { SetupWheaterVerification } from './src/services/weather.js'
import { getPlaylistID } from './src/services/youtube-player.js'
import { SetupSocket } from './src/socket/connection.js'
import { triggerChecker } from './src/trigger-checker.js'

async function start(){
  await getPlaylistID('zenetoecristiano')
  await SetupConfig()
  await SetupWheaterVerification()
  await SetupWakeUp()
  await SetupSocket()
  triggerChecker()
}

start()