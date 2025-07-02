import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../interfaces/models/product.interface';

const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  images: { type: [String], required: true },
});

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
