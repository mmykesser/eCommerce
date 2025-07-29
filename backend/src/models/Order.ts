import mongoose, { Schema } from 'mongoose';
import { IOrderDocument } from '../interfaces/models/order.interface';

const OrderSchema = new Schema<IOrderDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    inPostPaczkomat: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const OrderModel = mongoose.model<IOrderDocument>('Order', OrderSchema);
