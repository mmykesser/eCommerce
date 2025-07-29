import mongoose, { Schema } from 'mongoose';
import { IProductDocument } from '../interfaces/models/product.interface';

const ProductSchema = new Schema<IProductDocument>({
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

export const ProductModel = mongoose.model<IProductDocument>('Product', ProductSchema);
