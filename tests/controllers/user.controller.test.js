const UserController = require('../../src/controllers/user.js');
const UserService = require('../../src/services/user.js');
const HTTPError = require('../../src/utils/errors/http_errors.js');

describe('User Controller', () => {
  describe('createUser', () => {
    it('should return 201 status code when user is successfully created', async () => {
      const req = {
        body: {
          username: 'test',
          password: 'test'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const next = jest.fn();
      const mockUser = {
        id: 1,
        username: 'test',
        password: 'test',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01'
      };
      UserService.createUser = jest.fn().mockReturnValue(mockUser);
      await UserController.createUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 400 status code if user with same username already exists', async () => {
      const req = {
        body: {
          username: 'test',
          password: 'test'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const next = jest.fn();
      const mockError = new HTTPError('User with this username already exists', 400);
      UserService.createUser = jest.fn().mockRejectedValue(mockError);
      await UserController.createUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith('User with this username already exists');
    });

    it('should return 500 status code if creating user in database fails', async () => {
      const req = {
        body: {
          username: 'test',
          password: 'test'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const next = jest.fn();
      const mockError = new Error('Error creating user');
      UserService.createUser = jest.fn().mockRejectedValue(mockError);
      await UserController.createUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error creating user');
    });
  });
  describe('loginUser', () => {
    it('should return 200 status code when user is successfully logged in', async () => {
      const req = {
        body: {
          username: 'test',
          password: 'test'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const next = jest.fn();
      const mockUser = {
        id: 1,
        username: 'test',
        password: 'test',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01'
      };
      UserService.loginUser = jest.fn().mockReturnValue(mockUser);
      await UserController.loginUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
    it('should return 400 status code if user with given username does not exist', async () => {

      const req = {
        body: {
          username: 'test',
          password: 'test'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const next = jest.fn();
      const mockError = new HTTPError('User with this username does not exist', 400);
      UserService.loginUser = jest.fn().mockRejectedValue(mockError);
      await UserController.loginUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith('User with this username does not exist');
    });
    it('should return 400 status code if password is incorrect', async () => {
      const req = {
        body: {
          username: 'test',
          password: 'test'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const next = jest.fn();
      const mockError = new HTTPError('Password is incorrect', 400);
      UserService.loginUser = jest.fn().mockRejectedValue(mockError);
      await UserController.loginUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith('Password is incorrect');
    });
    it('should return 500 status code if logging in user in database fails', async () => {
      const req = {
        body: {
          username: 'test',
          password: 'test'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const next = jest.fn();
      const mockError = new Error('Error logging in user');
      UserService.loginUser = jest.fn().mockRejectedValue(mockError);
      await UserController.loginUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error logging in user');
    });
  });

  describe('checkValidityOfToken', () => {
    it('should return 200 status code when token is valid', async () => {
      const req = {
        headers: {
          authorization: 'Bearer test'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const next = jest.fn();
      UserService.checkValidityOfToken = jest.fn().mockReturnValue('token');
      await UserController.checkValidityOfToken(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith('token');
    });

    it('should return 401 status code if token is invalid', async () => {
      const req = {
        headers: {
          authorization: 'Bearer test'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const next = jest.fn();
      const mockError = new HTTPError('Token is invalid', 401);
      UserService.checkValidityOfToken = jest.fn().mockRejectedValue(mockError);
      await UserController.checkValidityOfToken(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith('Token is invalid');
    });

    it('should return 500 status code if checking validity of token fails', async () => {
      const req = {
        headers: {
          authorization: 'Bearer test'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const next = jest.fn();
      const mockError = new Error('Error checking validity of token');
      UserService.checkValidityOfToken = jest.fn().mockRejectedValue(mockError);
      await UserController.checkValidityOfToken(req, res, next);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error checking validity of token');
    });
  }
  );
});
