import { IRegistrationData } from '../dto/auth.interface';
import { IUser } from '../models/user.interface';

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export type PublicUser = Omit<IUser, 'password' | 'comparePassword' | 'refreshToken' | '__v'>;

export interface IAuthService {
  register(data: IRegistrationData): Promise<{ user: PublicUser; tokens: IAuthTokens }>;
}
