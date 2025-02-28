import { Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  _id: ObjectId;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  refreshToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
