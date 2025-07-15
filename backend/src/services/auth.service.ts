import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { IRegistrationData } from '../interfaces/dto/auth.interface';
import {
  IAuthService,
  IAuthTokens,
  PublicUser,
} from '../interfaces/services/auth.service.interface';
import { ConflictError } from '../utils/errors.utils';
import config from '../config/config';
import { IUser } from '../interfaces/models/user.interface';

export class AuthService implements IAuthService {
  public async register(
    data: IRegistrationData,
  ): Promise<{ user: PublicUser; tokens: IAuthTokens }> {
    const { email } = data;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }
    const newUser = new UserModel(data);
    const tokens = this._generateTokens({ id: newUser._id });
    newUser.refreshToken = tokens.refreshToken;

    await newUser.save();

    const userResponse = this._preparePublicUser(newUser);
    return { user: userResponse, tokens };
  }
  private _generateTokens(payload: object): IAuthTokens {
    const accessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, config.jwtSecret, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  }

  private _preparePublicUser(user: IUser): PublicUser {
    const { _id, email, name, role } = user;
    return { _id, email, name, role };
  }
}
