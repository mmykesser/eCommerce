import { Schema, model } from 'mongoose';
import { ICategoryDocument } from '../interfaces/entities/category.interface';

const CategorySchema = new Schema<ICategoryDocument>(
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

export const CategoryModel = model<ICategoryDocument>('Category', CategorySchema);
