import { Document, Types } from 'mongoose';

export interface ICategory {
  name: string;
  image: string;
  createdBy: Types.ObjectId;
}

export interface ICategoryDocument extends ICategory, Document {
  _id: Types.ObjectId;
}
