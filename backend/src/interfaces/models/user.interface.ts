import { Document, Types } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  refreshToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}
