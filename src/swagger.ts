import type { Application } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJson from '../swagger.json'

function swaggerDocs(server: Application) {
  server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson))
  server.get('/swagger.json', (_, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerJson)
  })
}
export default swaggerDocs
