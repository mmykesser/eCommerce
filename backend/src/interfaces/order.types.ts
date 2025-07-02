import { Document, Types } from 'mongoose';

export interface IOrder extends Document {
  user: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  inPostPaczkomat: string;
}
