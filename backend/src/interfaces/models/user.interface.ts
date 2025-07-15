import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  refreshToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
