import express, { Express } from 'express';
import config from './config/config';
import connectDB from './database/db';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/error.middleware';

const app: Express = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use(errorHandler);

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    console.log('MongoDB connected');

    const server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });

    server.on('error', (error) => {
      console.error('Server error:', error);
      process.exit(1);
    });
  } catch (error) {
    console.error('Server failed:', error);
    process.exit(1);
  }
};

startServer().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
