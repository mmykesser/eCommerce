import mongoose, { Schema } from 'mongoose';
import { ICategoryDocument } from '../interfaces/entities/category.interface';

const categorySchema = new Schema<ICategoryDocument>(
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

export const CategoryModel = mongoose.model<ICategoryDocument>('Category', categorySchema);
