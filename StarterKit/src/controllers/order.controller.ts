import { Request, Response, NextFunction } from 'express';
import { OrderRepository } from '../repositories/order.repository';

const orderRepo = new OrderRepository();

export class OrderController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, items } = req.body;
      const order = await orderRepo.createOrderTx(userId, items);
      res.status(201).json({ status: 'success', data: order });
    } catch (error) {
      next(error);
    }
  }
}