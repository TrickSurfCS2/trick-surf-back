import server from '#/server';

export class RedisService {
  private redis = server.redis.redis;

  async add(userId: string, socketId: string) {
    return this.redis.sadd(`user:${userId}`, socketId);
  }

  async remove(userId: string, socketId: string) {
    return this.redis.srem(`user:${userId}`, socketId);
  }

  async ammount(userId: string) {
    return this.redis.scard(`user:${userId}`);
  }

  async getAll(userId: string) {
    return this.redis.smembers(`user:${userId}`);
  }

  // async getAllByIds(userId: string[]) {
  //   const keys = await this.redis.keys('user:*');
  //   const splitKeys = keys.map((val) => {
  //     const key = val.split(':')[1];
  //     if (userId.find((x) => x === +key)) return val;
  //   });
  //   const online = [];
  //   for (let i = 0; i < splitKeys.length; i++) {
  //     if (splitKeys[i]) {
  //       const friendsSocketIds = await this.redis.smembers(splitKeys[i]);
  //       online.push({
  //         socketId: friendsSocketIds,
  //         playerId: splitKeys[i].split(':')[1]
  //       });
  //     }
  //   }
  //   return online;
  // }
}
