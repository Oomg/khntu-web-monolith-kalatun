import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

import { loggerMiddleware } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';
import orderRoutes from './routes/order.routes';
import authRoutes from './routes/auth.routes';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// E2E ідентифікатор для Postman-тестів
app.use((req, res, next) => {
  res.setHeader('X-E2E-Suite', 'v6-verified');
  next();
});

// Роздача статичних файлів інтерфейсу
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);

app.use(errorHandler);

export default app;