import mongoose, { Schema } from 'mongoose';
import { IProductDocument } from '../interfaces/entities/product.interface';

const ProductSchema = new Schema<IProductDocument>(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: [0, 'Price cannot be negative'] },
    description: { type: String, required: true },
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

export const ProductModel = mongoose.model<IProductDocument>('Product', ProductSchema);
