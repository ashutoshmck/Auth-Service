const Users = require('../../database/models/index').User;
const HTTPError = require('../utils/errors/http_errors');
const passwordUtil = require('../utils/password');
const tokenUtil = require('../utils/token');
const { UniqueConstraintError } = require('sequelize');

const createUser = async (_userName, _password) => {
  try {
    const encryptedPassword = await passwordUtil.encryptPassword(_password);
    const user = await Users.create({ username: _userName, password: encryptedPassword });
    return user.dataValues;
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      console.log('Error');
      throw new HTTPError('Username already exists', 400);
    }
    throw new HTTPError(500, 'Internal server error', 500);
  }

};

const loginUser = async (_userName, _password) => {
  const user = await Users.findOne({ where: { username: _userName } });
  if (!user)
    throw new HTTPError('User not found', 400);

  const checkIfPasswordIsValid = await passwordUtil.checkEncryptedPassword(user.password, _password);
  if (!checkIfPasswordIsValid)
    throw new HTTPError('Invalid password', 401);
  const newToken = await tokenUtil.generateToken(user.id);
  return { user, token: newToken };
};

const checkValidityOfToken = async (token) => {
  const isVerified = await tokenUtil.verifyToken(token);
  if (!isVerified)
    throw new HTTPError('Invalid token', 401);
  return true;
};

module.exports = { createUser, loginUser, checkValidityOfToken };