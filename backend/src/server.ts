import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config/config';
import connectDB from './database/db';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';
import orderRoutes from './routes/order.routes';
import userRoutes from './routes/user.routes';
import cartRoutes from './routes/cart.routes';
import inpostRoutes from './routes/inpost.routes';
import { errorHandler } from './middleware/error.middleware';

const app: Express = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/inpost', inpostRoutes);

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
