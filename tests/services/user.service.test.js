const UserService = require('../../src/services/user.js');
const db = require('../../database/models/index.js');

describe('User Service', () => {
  describe('createUser', () => {
    it('should create a user when username and password is valid', async () => {
      const mockUser = {
        id: 1,
        username: 'test',
        password: 'password',
        createdAt: '2021-03-01T00:00:00.000Z',
        updatedAt: '2021-03-01T00:00:00.000Z',
      };
      jest.spyOn(db.User, 'create').mockResolvedValue({
        dataValues: mockUser
      });
      const user = await UserService.createUser('test', 'password');
      expect(user.dataValues).toBe(mockUser);
    });
  });
});
