import { Document, Types } from 'mongoose';

export interface IProduct {
  title: string;
  price: number;
  description: string;
  category: Types.ObjectId;
  images: string[];
}

export interface IProductDocument extends IProduct, Document {}
