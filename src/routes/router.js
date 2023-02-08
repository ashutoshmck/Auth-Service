
const UserController = require('../controllers/user');
const validator = require('../utils/middleware/validation');
const Router = require('express').Router;
const router = Router();


router.route('/user')
  .post(validator.validationMiddleware(validator.userSchema), UserController.createUser);
router.route('/login')
  .post(validator.validationMiddleware(validator.userSchema), UserController.loginUser);
router.route('/token/validate')
  .post(UserController.checkValidityOfToken);
module.exports = { router };
