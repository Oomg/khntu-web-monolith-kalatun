import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export class UserController {
  static getAll(req: Request, res: Response) {
    const items = userService.getAll();
    res.status(200).json({ status: 'success', data: items });
  }

  static getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const item = userService.getById(id);
      res.status(200).json({ status: 'success', data: item });
    } catch (error) {
      next(error); // Передаємо помилку в errorHandler
    }
  }
}