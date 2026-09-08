import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 [Server]: Server is running at http://localhost:${PORT}`);
  console.log(`🏥 [Health Check]: http://localhost:${PORT}/api/v1/health`);
});
