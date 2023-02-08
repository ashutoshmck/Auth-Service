// const redis = require('redis');
// class RedisClient {
//   constructor() {
//     this.redisConnection = redis.createClient();
//     console.log('Connection Eastblished ');
//   }
//   getCacheValue(key) {
//     try {
//       this.redisConnection.get(key, (err, res) => {
//         if (err) {
//           console.log('error');
//         }
//         return res;
//       });
//     } catch (e) {
//       console.log('error in get catch');
//     }
//   }
//   setCacheValue(key, value) {
//     try {
//       this.redisConnection.set(key, value);
//     } catch (e) {
//       console.error('erorr in set cache');
//     }
//   }
// }
// module.exports = new RedisClient();
const { createClient } = require('redis');

let client = createClient();

client.on('error', err => console.log('Redis Client Error', err));
const get = async (key) => {
  try {
    await client.connect();
    const value = await client.get(key);

    await client.disconnect();
    return value;
  } catch (error) {
    console.log('error in get catch');
  }
};
const set = async (key, value) => {
  try {
    await client.connect();
    await client.set(key, value);

    await client.disconnect();
  } catch (error) {
    console.log('error in set catch');
  }
};
module.exports = { get, set };
