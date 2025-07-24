import { Types } from 'mongoose';
import { IRegistrationData, ILoginData } from '../dto/auth.interface';

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export type PublicUser = {
  _id: Types.ObjectId;
  email: string;
  name: string;
  role: 'admin' | 'user';
};

export interface IAuthService {
  register(data: IRegistrationData): Promise<{ user: PublicUser; tokens: IAuthTokens }>;
  login(data: ILoginData): Promise<{ user: PublicUser; tokens: IAuthTokens }>;
}
