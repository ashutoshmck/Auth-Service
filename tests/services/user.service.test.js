// eslint-disable-next-line no-unused-vars
const { UniqueConstraintError } = require('sequelize');
const UserService = require('../../src/services/user.js');
const db = require('../../database/models/index.js').User;
const passwordUtil = require('../../src/utils/password.js');
// eslint-disable-next-line no-unused-vars
const HTTPError = require('../../src/utils/errors/http_errors');
const tokenUtil = require('../../src/utils/token.js');


describe('User Service', () => {
  describe('createUser', () => {
    it('should create a user when username and password is valid', async () => {
      const mockUser = {
        id: 1,
        username: 'test',
        password: 'encryptedpassword',
        createdAt: '2021-03-01T00:00:00.000Z',
        updatedAt: '2021-03-01T00:00:00.000Z',
      };
      jest.spyOn(passwordUtil, 'encryptPassword').mockResolvedValue('encryptedpassword');
      jest.spyOn(db, 'create').mockResolvedValue({
        mockUser
      });
      jest.spyOn(db, 'findOne').mockResolvedValue({
        id: 1,
        username: 'test',
        createdAt: '2021-03-01T00:00:00.000Z',
        updatedAt: '2021-03-01T00:00:00.000Z',
      });
      const user = await UserService.createUser('test', 'password');
      console.log(user);
      expect(user).toEqual({
        id: 1,
        username: 'test',
        createdAt: '2021-03-01T00:00:00.000Z',
        updatedAt: '2021-03-01T00:00:00.000Z',
      });
    });

    it('should throw an error if username is already taken', (async () => {
      jest.spyOn(db, 'create').mockRejectedValueOnce(new UniqueConstraintError());
      await expect(UserService.createUser('test', 'password')).rejects.toEqual(expect.objectContaining({ message: 'Username already exists' }));
    }
    ));

    it('should throw an error if creating user in database fails', (async () => {
      jest.spyOn(db, 'create').mockRejectedValue(new Error());
      await expect(UserService.createUser('test', 'password')).rejects.toEqual(expect.objectContaining({ message: 'Internal server error' }));
    }));

  });
  describe('loginUser', () => {
    const mockUser = {
      id: 1,
      username: 'test',
      password: 'password',
      createdAt: '2021-03-01T00:00:00.000Z',
      updatedAt: '2021-03-01T00:00:00.000Z',
    };

    it('should return user if username and password is valid', async () => {
      jest.spyOn(db, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(passwordUtil, 'checkEncryptedPassword').mockResolvedValue(true);
      jest.spyOn(tokenUtil, 'generateToken').mockResolvedValue('token');
      const decodedToken = await UserService.loginUser('test', 'password');
      expect(decodedToken).toEqual('token');
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(db, 'findOne').mockResolvedValue(null);
      await expect(UserService.loginUser('test', 'password')).rejects.toEqual(expect.objectContaining({ message: 'User not found' }));
    });
  });
  describe('checkValidityOfToken', () => {
    it('should return decoded token if token is valid', async () => {
      jest.spyOn(tokenUtil, 'verifyToken').mockResolvedValue({ id: 1 });
      const decodedToken = await UserService.checkValidityOfToken('token');
      expect(decodedToken).toEqual({ id: 1 });
    });
    it('should throw an error if token is invalid', async () => {
      jest.spyOn(tokenUtil, 'verifyToken').mockResolvedValue(null);
      await expect(UserService.checkValidityOfToken('token')).rejects.toEqual(expect.objectContaining({ message: 'Invalid token' }));
    });
  });
});
