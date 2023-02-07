const Users = require('../../database/models/index').User;
const passwordUtil = require('../utils/password');
const tokenUtil = require('../utils/token');
const createUser = async (_userName, _password) => {
  const encryptedPassword = await passwordUtil.encryptPassword(_password);
  const token = await tokenUtil.generateToken(_userName, _password);
  const user = await Users.create({ userName: _userName, password: encryptedPassword, token: token });
  const users = await Users.findOne({ where: { id: user.id }, attributes: ['id', 'userName', 'createdAt', 'updatedAt', 'token'] });
  return users;
};
module.exports = { createUser };