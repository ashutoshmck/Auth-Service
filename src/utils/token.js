const jwt = require('jsonwebtoken');

const redisClient = require('../utils/redis');

const generateToken = async (_userName) => {
  let token = await jwt.sign(
    { userName: _userName },
    'secretkeyappearshere',
    { expiresIn: '1h' }
  );

  await redisClient.set(token, '');
  return token;
};
const verifyToken = async (token) => {
  try {
    const decodedToken = await jwt.verify(token, 'secretkeyappearshere');
    const tokenInRedis = await redisClient.get(token);
    if (decodedToken && tokenInRedis != undefined)
      return true;
  } catch (error) {
    return false;
  }

};
module.exports = { generateToken, verifyToken };