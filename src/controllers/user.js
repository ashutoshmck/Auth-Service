const UserService = require('../services/user');
const HTTPError = require('../utils/errors/http_errors');
const createUser = async (request, response) => {
  try {
    const user = await UserService.createUser(request.body.username, request.body.password);
    return response.status(201).json(user);
  } catch (error) {
    if (error instanceof HTTPError)
      return response.status(error.code).json(error.message);
    return response.status(500).json(error.message);
  }
};
const loginUser = async (request, response) => {
  try {
    const user = await UserService.loginUser(request.body.username, request.body.password);
    return response.status(200).json(user);
  } catch (error) {
    if (error instanceof HTTPError)
      return response.status(error.code).json(error.message);
    return response.status(500).json(error.message);
  }
};
const checkValidityOfToken = async (request, response) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    await UserService.checkValidityOfToken(token);
    return response.status(200).json('Token Verified');
  } catch (error) {
    if (error instanceof HTTPError)
      return response.status(error.code).json(error.message);
    return response.status(500).json(error.message);
  }
};
module.exports = { createUser, loginUser, checkValidityOfToken };