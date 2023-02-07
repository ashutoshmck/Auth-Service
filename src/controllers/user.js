const UserService = require('../services/user');
const createUser = async (request, response) => {
  try {
    const user = await UserService.createUser(request.body.userName, request.body.password);
    return response.status(201).json({ status: 201, data: user, message: 'Succesfully Created User' });
  } catch (error) {
    return response.status(500).json({ status: 500, message: error.message });
  }
};
module.exports = { createUser };