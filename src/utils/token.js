const jwt = require('jsonwebtoken');
const generateToken = async (_userName, encryptedPassword) => {
  let token = await jwt.sign(
    { userName: _userName, password: encryptedPassword },
    'secretkeyappearshere',
    { expiresIn: '1h' }
  );
  return token;
};
module.exports = { generateToken };