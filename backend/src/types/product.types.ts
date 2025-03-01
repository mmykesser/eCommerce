import { Document, Types } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  price: number;
  description: string;
  category: Types.ObjectId;
  images: string[];
}
