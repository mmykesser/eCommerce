import { Document } from 'mongoose';

export interface ICategory extends Document {
  _id: string;
  name: string;
  image: string;
  createdBy: string;
}
