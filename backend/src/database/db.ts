import mongoose from 'mongoose';
import config from '../config/config';

const connectDB = async (): Promise<void> => {
  try {
    const { mongoURI } = config;
    console.log('Connecting to MongoDB with URI:', mongoURI);

    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
