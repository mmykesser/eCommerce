import { Document, Types } from 'mongoose';

export interface IProduct {
  title: string;
  price: number;
  description: string;
  stock: number;
  category: Types.ObjectId;
  images: string[];
}

export interface IProductDocument extends IProduct, Document {
  _id: Types.ObjectId;
}
