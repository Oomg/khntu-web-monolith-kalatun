import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Base Health Check Endpoint
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

export default app;
