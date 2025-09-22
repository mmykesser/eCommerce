import { Document, Types } from 'mongoose';

export interface IOrderProduct {
  product: Types.ObjectId;
  quantity: number;
}

export interface IShippingDetails {
  type: 'inpost_paczkomat';
  address: string;
}

export interface IOrder {
  user: Types.ObjectId;
  products: IOrderProduct[];
  totalPrice: number;
  shippingDetails: IShippingDetails;
}

export interface IOrderDocument extends IOrder, Document {}
