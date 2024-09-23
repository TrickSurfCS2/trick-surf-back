import type { IServerOptions } from './server'
import path from 'node:path'
import process from 'node:process'
import * as dotenv from 'dotenv'

const __dirname = path.resolve()
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

export default {
  host: process.env.HOST || 'localhost',
  port: +(process.env.PORT || 8080),

  redis: {
    port: +(process.env.REDIS_PORT || 6379),
    host: process.env.REDIS_HOST || '127.0.0.1',
    username: process.env.REDIS_USERNAME || 'default',
    password: process.env.REDIS_PASSWORD || 'redis',
    db: +(process.env.REDIS_DB || 0),
  },
} as IServerOptions
