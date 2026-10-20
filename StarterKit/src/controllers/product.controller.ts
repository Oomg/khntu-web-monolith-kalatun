import { Request, Response, NextFunction } from 'express';
import { ProductRepository } from '../repositories/product.repository';

const productRepo = new ProductRepository();

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // Зчитуємо параметри пагінації з URL (наприклад: ?page=1&limit=5)
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await productRepo.findPaginated(page, limit);
      res.status(200).json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      // Оскільки дані вже перевірені нашим Zod-мідлваром, можемо їх просто повернути (імітація збереження)
      res.status(201).json({ 
        status: 'success', 
        message: 'Товар успішно пройшов валідацію', 
        data: req.body 
      });
    } catch (error) {
      next(error);
    }
  }
}