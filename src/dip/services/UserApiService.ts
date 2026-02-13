import type { UserService, User } from '../types';

export class UserApiService implements UserService {
  async getUsers(): Promise<User[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}