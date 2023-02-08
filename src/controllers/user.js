const UserService = require('../services/user');
const HTTPError = require('../utils/errors/http_errors');
const createUser = async (request, response) => {
  try {
    const user = await UserService.createUser(request.body.userName, request.body.password);
    return response.status(201).json({ status: 201, data: user, message: 'Succesfully Created User' });
  } catch (error) {
    if (error instanceof HTTPError)
      return response.status(error.code).json({ staus: error.code, message: error.message });
    return response.status(500).json({ status: 500, message: error.message });
  }
};
const loginUser = async (request, response) => {
  try {
    const user = await UserService.loginUser(request.body.userName, request.body.password);
    return response.status(201).json({ status: 201, data: user, message: 'Succesfully Logged in' });
  } catch (error) {
    if (error instanceof HTTPError)
      return response.status(error.code).json({ staus: error.code, message: error.message });
    return response.status(500).json({ status: 500, message: error.message });
  }
};
const checkValidityOfToken = async (request, response) => {
  try {
    await UserService.checkValidityOfToken(request.body.token);
    return response.status(200).json({ status: 200, message: 'Token Verified' });
  } catch (error) {
    if (error instanceof HTTPError)
      return response.status(error.code).json({ staus: error.code, message: error.message });
    return response.status(500).json({ status: 500, message: error.message });
  }
};
module.exports = { createUser, loginUser, checkValidityOfToken };