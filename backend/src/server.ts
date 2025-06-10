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

    server.on('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    });
  } catch (err) {
    console.error('Server failed:', err);
    process.exit(1);
  }
};

startServer().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
