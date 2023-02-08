const Users = require('../../database/models/index').User;
const HTTPError = require('../utils/errors/http_errors');
const passwordUtil = require('../utils/password');
const tokenUtil = require('../utils/token');

const createUser = async (_userName, _password) => {
  const oldUser = await Users.findOne({ where: { userName: _userName } });
  if (oldUser)
    throw new HTTPError('User with this username already exists', 400);
  const encryptedPassword = await passwordUtil.encryptPassword(_password);
  const user = await Users.create({ userName: _userName, password: encryptedPassword });
  const users = await Users.findOne({ where: { id: user.id }, attributes: ['id', 'userName', 'createdAt', 'updatedAt'] });
  return users;
};

const loginUser = async (_userName, _password) => {
  const user = await Users.findOne({ where: { userName: _userName } });
  if (!user)
    throw new HTTPError('User not found', 400);

  const checkIfPasswordIsValid = await passwordUtil.checkEncryptedPassword(user.password, _password);
  if (!checkIfPasswordIsValid)
    throw new HTTPError('Invalid password', 401);
  const newToken = await tokenUtil.generateToken(_userName);
  return user.set('token', newToken);
};

const checkValidityOfToken = async (token) => {
  const isVerified = await tokenUtil.verifyToken(token);
  if (!isVerified)
    throw new HTTPError('Invalid token', 401);
  return true;
};

module.exports = { createUser, loginUser, checkValidityOfToken };