import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../interfaces/models/category.interface';

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const CategoryModel = mongoose.model<ICategory>('Category', categorySchema);
