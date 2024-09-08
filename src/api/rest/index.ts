import type { Application } from 'express'
import MapController from './controllers/map.controller'
import TrickController from './controllers/trick.controller'
import TriggerController from './controllers/trigger.controller'
import UserController from './controllers/user.controller'

const controllers = [
  {
    basePath: '/api/v1',
    controller: new MapController(),
  },
  {
    basePath: '/api/v1',
    controller: new UserController(),
  },
  {
    basePath: '/api/v1',
    controller: new TrickController(),
  },
  {
    basePath: '/api/v1',
    controller: new TriggerController(),
  },
]

export function setupRoutes(server: Application) {
  controllers.forEach(({ basePath, controller: { router } }) => {
    server.use(basePath, router)
  })
}
