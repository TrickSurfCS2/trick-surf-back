import Server from './server'
import config from './config'

import validateEnv from './utils/validate-env'

async function startServer() {
  validateEnv()

  Server.import(config)
  Server.listen()
}

startServer()
