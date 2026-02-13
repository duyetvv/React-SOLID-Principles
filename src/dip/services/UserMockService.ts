import type { UserService, User } from '../types';

export class UserMockService implements UserService {
  async getUsers(): Promise<User[]> {
    console.log('Fetching users from MOCK service...');
    return Promise.resolve([
      { id: 1, name: 'Mock Alice', email: 'alice@mock.com' },
      { id: 2, name: 'Mock Bob', email: 'bob@mock.com' },
      { id: 3, name: 'Mock Charlie', email: 'charlie@mock.com' },
    ]);
  }
}