import { Document, Types } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  image: string;
  createdBy: Types.ObjectId;
}
