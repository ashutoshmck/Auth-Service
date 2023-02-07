
const UserController = require('../controllers/user');
const validator = require('../utils/middleware/validation');
const Router = require('express').Router;
const router = Router();


router.route('/user')
  .post(validator.validationMiddleware(validator.userSchema), UserController.createUser);

module.exports = { router };
