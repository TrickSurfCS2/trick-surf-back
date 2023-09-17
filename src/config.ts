import type { IServerOptions } from './server';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env')
});

export default {
  ssl: (process.env.SSL || 'false') === 'true',
  host: process.env.HOST || 'localhost',
  port: +(process.env.PORT || 8080),

  redis: {
    port: +(process.env.REDIS_PORT || 6379),
    host: process.env.REDIS_HOST || '127.0.0.1',
    username: process.env.REDIS_USERNAME || 'default',
    password: process.env.REDIS_PASSWORD || 'redis',
    db: +(process.env.REDIS_DB || 0)
  }
} as IServerOptions;
