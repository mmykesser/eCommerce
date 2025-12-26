import { Schema, model } from 'mongoose';
import { IProductDocument } from '../interfaces/entities/product.interface';

const ProductSchema = new Schema<IProductDocument>(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: [0, 'Price cannot be negative'] },
    description: { type: String, required: true },
    stock: { type: Number, required: true, min: [0, 'Stock cannot be negative'] },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    images: { type: [String], required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProductModel = model<IProductDocument>('Product', ProductSchema);
