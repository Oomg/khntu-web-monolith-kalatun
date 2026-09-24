import express, { Express, Request, Response } from 'express';
import cors from 'cors';

// Імпортуємо наші мідлвари та роути
import { loggerMiddleware } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';

const app: Express = express();

// 1. Глобальні мідлвари (виконуються перед запитами)
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware); // Логування кожного запиту

// 2. Базовий health-check (з першої лабораторної)
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// 3. Підключення роутів наших ресурсів
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);

// 4. Глобальний обробник помилок (ОБОВ'ЯЗКОВО В КІНЦІ!)
app.use(errorHandler);

export default app;