var bcrypt = require('bcryptjs');

const encryptPassword = async (password) => {
  const _encryptedPassword = await bcrypt.hash(password, 10);
  return _encryptedPassword;
};
module.exports = { encryptPassword };