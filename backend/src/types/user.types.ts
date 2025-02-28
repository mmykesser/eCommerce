import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  refreshToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
