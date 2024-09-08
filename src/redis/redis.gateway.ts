import { logger } from '#/server'
import IORedis from 'ioredis'

export interface IRedisOptions {
  port: number
  host: string
  username: string
  password: string
  db: number
}

export class RedisGateway {
  private _redis: IORedis

  constructor(options: IRedisOptions) {
    this._redis = new IORedis(options)
    logger.log('💿 Redis connected \n')
  }

  get redis() {
    return this._redis
  }

  async clear() {
    this.redis.flushall()
    logger.log(' >< Redis cleared \n')
  }
}
