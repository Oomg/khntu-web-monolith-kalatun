// Security guard stack KhNTU-Lab5-Auth
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'Токен відсутній або некоректний',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      sub: number;
      role: string;
    };

    (req as any).user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({
      status: 'error',
      message: 'Токен недійсний або прострочений',
    });
  }
};