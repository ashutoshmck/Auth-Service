var bcrypt = require('bcryptjs');

const encryptPassword = async (password) => {
  const _encryptedPassword = await bcrypt.hash(password, 10);
  return _encryptedPassword;
};
const checkEncryptedPassword = async (encryptedPassword, password) => {
  let b = await bcrypt.compare(password, encryptedPassword);
  return b;
};
module.exports = { encryptPassword, checkEncryptedPassword };