import server from '#/server'

export class RedisService {
  private redis = server.redis.redis

  async add(userId: string, socketId: string) {
    return this.redis.sadd(`user:${userId}`, socketId)
  }

  async remove(userId: string, socketId: string) {
    return this.redis.srem(`user:${userId}`, socketId)
  }

  async ammount(userId: string) {
    return this.redis.scard(`user:${userId}`)
  }

  async getAll(userId: string) {
    return this.redis.smembers(`user:${userId}`)
  }
}
