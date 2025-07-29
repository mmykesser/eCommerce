import { Document, Types } from 'mongoose';

export interface IOrder {
  user: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  inPostPaczkomat: string;
}

export interface IOrderDocument extends IOrder, Document {}
