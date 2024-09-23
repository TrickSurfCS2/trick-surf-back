import type { IRedisOptions, RedisGateway } from '#/redis/redis.gateway'
import type { SocketGateway } from '#/socket/socket.gateway'
import type { NextFunction, Request, Response } from 'express'
import type https from 'node:https'
import http from 'node:http'
import os from 'node:os'
import process from 'node:process'
import config from '#/config'
import { allowCrossDomain } from '#/utils/allow-cross-domain'
import { Logger } from '#/utils/logger'
import errorMiddleware from '#/utils/middleware/error.middleware'
import { print } from '#/utils/print-route'
import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import express from 'express'
import { collectDefaultMetrics, register } from 'prom-client'
import { setupRoutes } from './api/rest'
import { createContext, trpcRouter } from './api/trpc'
import prometheusMiddleware from './utils/middleware/prometheus.middleware'

export interface IServerOptions {
  host: string
  port: number
  redis: IRedisOptions
}

const logger = new Logger()

class Server {
  private webServer!: http.Server | https.Server
  private server: express.Application
  private options!: IServerOptions
  private socketGateway!: SocketGateway
  private redisGateway!: RedisGateway

  constructor() {
    this.server = express()
  }

  public async import(options: IServerOptions) {
    this.options = options
    this.webServer = http.createServer(this.server)
    // TODO
    // this.redisGateway = new RedisGateway(this.options.redis);
    // TODO
    // this.socketGateway = new SocketGateway(this.webServer)

    this.initializeMiddlewares()
    this.initializeErrorHandling()
    this.initializePrometheus()

    this.initializeRestControllers()
    // this.initializeTRPC()
    // this.initializeGraphQl()

    this.initializeStaticFileRoutes()
    this.setUpNodeExceptions()
  }

  public async listen() {
    try {
      const { port } = this.options
      await this.webServer.listen(port)

      logger.info('---------------------------------------')
      logger.info(`✨ Server listening port ${config.port}`)
      logger.info(`✨ ${os.hostname()} \n`)
      // logger.info(`GraphQL playground /graphql \n`);
      this.server._router.stack.forEach(print.bind(null, []))
      logger.info('---------------------------------------')
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(error))
    }
  }

  public getWebServer() {
    return this.webServer
  }

  public getServer() {
    return this.server
  }

  private initializeMiddlewares() {
    try {
      this.server.use(express.json())
      this.server.use(express.urlencoded({ extended: true }))
      this.server.use(allowCrossDomain)
      this.server.use(
        cors({
          origin: [`https://${config.host}`, 'http://localhost:5173'],
        }),
      )

      logger.success('Middlewares')
    }
    catch (e) {
      logger.error('Middlewares', e)
    }
  }

  private initializeErrorHandling() {
    try {
      this.server.use(errorMiddleware)

      logger.success('ErrorHandling')
    }
    catch (e) {
      logger.error('ErrorHandling', e)
    }
  }

  private initializePrometheus() {
    try {
      collectDefaultMetrics({ register })

      logger.success('Prometheus')
    }
    catch (e) {
      logger.error('Prometheus', e)
    }
  }

  private initializeRestControllers() {
    try {
      this.server.use(prometheusMiddleware)
      this.server.get('/metrics', async (_: Request, res: Response, next: NextFunction) => {
        try {
          res.setHeader('Content-Type', register.contentType)
          return res.send(await register.metrics())
        }
        catch (err) {
          next(err)
        }
      })
      this.server.get('/health', (_: Request, res: Response) => res.send('200'))
      this.server.get('/logs', (_: Request, res: Response) => res.json(logger.logs))

      setupRoutes(this.server)

      logger.success('Controllers')
    }
    catch (e) {
      logger.error('Controllers', e)
    }
  }

  private initializeTRPC() {
    this.server.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: trpcRouter,
        createContext,
      }),
    )
  }

  private initializeGraphQl() {
    // TODO
  }

  private initializeStaticFileRoutes() {
    try {
      this.server.use(express.static('public'))

      logger.success('StaticFileRoutes')
    }
    catch (e) {
      logger.error('StaticFileRoutes', e)
    }
  }

  private setUpNodeExceptions(): void {
    try {
      //* set up server exceptions
      process.on('uncaughtException', (error: Error) => {
        console.error('Uncaught Exception', error.stack)
        process.exit(1)
      })

      process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason)
        process.exit(1)
      })

      logger.success('NodeExceptions')
    }
    catch (e) {
      logger.error('NodeExceptions', e)
    }
  }

  get socket() {
    return this.socketGateway
  }

  get redis() {
    return this.redisGateway
  }
}

const server = new Server()

export default server
export { logger }
