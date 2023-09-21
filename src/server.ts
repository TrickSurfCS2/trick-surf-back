import type { Request, Response } from 'express';
import type { IRedisOptions, RedisGateway } from '#/redis/redis.gateway';
import type { SocketGateway } from '#/socket/socket.gateway';
import cors from 'cors';
import express from 'express';
import { createYoga } from 'graphql-yoga';
import http from 'http';
import https from 'https';
import os from 'os';
import { readFileSync } from 'fs';
import { join } from 'path';
import { setupRoutes } from '#/api/rest/routes';
import errorMiddleware from '#/api/rest/middleware/error.middleware';
import { schema } from '#/api/graphql/schema';
import { context } from '#/api/graphql/context';
import { allowCrossDomain } from '#/utils/allow-cross-domain';
import { print } from '#/utils/print-route';
import config from '#/config';
import { Logger } from '#/utils/logger';

export interface IServerOptions {
  host: string;
  port: number;
  redis: IRedisOptions;
  ssl?: boolean;
}

class Server {
  private webServer!: http.Server | https.Server;
  private server: express.Application;
  private options!: IServerOptions;
  private socketGateway!: SocketGateway;
  private redisGateway!: RedisGateway;

  constructor() {
    this.server = express();
  }

  public async import(options: IServerOptions) {
    this.options = options;
    this.webServer = this.createServer(this.server);
    // TODO this.redisGateway = new RedisGateway(this.options.redis);
    // TODO this.socketGateway = new SocketGateway(this.webServer);

    this.initializeMiddlewares();
    this.initializeErrorHandling();
    this.initializeControllers();
    this.initializeGraphQl();
    this.initializeStaticFileRoutes();
    this.setUpNodeExceptions();
  }

  public async listen() {
    try {
      const { port, ssl } = this.options;
      await this.webServer.listen(port);

      logger.info('---------------------------------------');
      logger.info(`✨ Server listening port ${config.port} on ${ssl ? 'HTTPS' : 'HTTP'}`);
      logger.info(`✨ ${os.hostname()}`);
      logger.info(`GraphQL playground /graphql \n`);
      this.server._router.stack.forEach(print.bind(null, []));
      logger.info('---------------------------------------');
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  public getWebServer() {
    return this.webServer;
  }

  public getServer() {
    return this.server;
  }

  private initializeMiddlewares() {
    try {
      this.server.use(express.json());
      this.server.use(express.urlencoded({ extended: true }));
      this.server.use(allowCrossDomain);
      this.server.use(cors());

      logger.success('Middlewares');
    } catch (e) {
      logger.error('Middlewares', e);
    }
  }

  private initializeErrorHandling() {
    try {
      this.server.use(errorMiddleware);

      logger.success('ErrorHandling');
    } catch (e) {
      logger.error('ErrorHandling', e);
    }
  }

  private initializeControllers() {
    try {
      this.server.get('/health', (_: Request, res: Response) => res.send('200'));
      setupRoutes(this.server);

      logger.success('Controllers');
    } catch (e) {
      logger.error('Controllers', e);
    }
  }

  private initializeGraphQl() {
    // try {
    //   const yoga = createYoga({
    //     context,
    //     schema
    //   });
    //   this.server.use('/graphql', yoga);
    //   logger.success('GraphQl');
    // } catch (e) {
    //   logger.error('GraphQl', e);
    // }
  }

  private initializeStaticFileRoutes() {
    try {
      this.server.use(express.static('public'));

      logger.success('StaticFileRoutes');
    } catch (e) {
      logger.error('StaticFileRoutes', e);
    }
  }

  private setUpNodeExceptions(): void {
    try {
      //* set up server exceptions
      process.on('uncaughtException', (error: Error) => {
        console.error('uncaughtException', error.stack);
        process.exit(1);
      });

      process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        process.exit(1);
      });

      logger.success('NodeExceptions');
    } catch (e) {
      logger.error('NodeExceptions', e);
    }
  }

  private createServer(server: express.Application) {
    try {
      const httpsOptions = {
        key: readFileSync(join(__dirname, '../ssl/', 'privkey.pem')),
        cert: readFileSync(join(__dirname, '../ssl/', 'fullchain.pem'))
      };

      this.options.ssl = true;
      logger.success('Create HTTPS server');
      return https.createServer(httpsOptions, server);
    } catch (e) {
      this.options.ssl = false;
      logger.error('Create HTTPS server', e);
      return http.createServer(server);
    }
  }

  get socket() {
    return this.socketGateway;
  }

  get redis() {
    return this.redisGateway;
  }
}

const logger = new Logger();
const server = new Server();

export default server;
export { logger };
