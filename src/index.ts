import config from './config'
import Server from './server'

import validateEnv from './utils/validate-env'

async function startServer() {
  validateEnv()

  Server.init(config)
  Server.listen()
}

startServer()
