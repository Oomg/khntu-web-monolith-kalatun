import { AppError } from '../utils/AppError';

export class UserService {
  private users = [
    { id: 1, email: 'admin@test.com', role: 'admin' },
    { id: 2, email: 'customer@test.com', role: 'user' }
  ];

  getAll() {
    return this.users;
  }

  getById(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new AppError('Користувача не знайдено', 404);
    return user;
  }
}