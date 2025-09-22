import { Schema, model } from 'mongoose';
import { IOrderDocument } from '../interfaces/models/order.interface';

const OrderProductSchema = new Schema(
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
  { _id: false },
);

const ShippingDetailsSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['inpost_paczkomat'],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const OrderSchema = new Schema<IOrderDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [OrderProductSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingDetails: ShippingDetailsSchema,
  },
  { timestamps: true },
);

OrderSchema.index({ user: 1, createdAt: -1 });

export const OrderModel = model<IOrderDocument>('Order', OrderSchema);
