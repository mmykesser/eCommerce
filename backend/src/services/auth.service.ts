import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { IRegistrationData, ILoginData } from '../interfaces/dto/auth.interface';
import {
  IAuthService,
  IAuthTokens,
  PublicUser,
} from '../interfaces/services/auth.service.interface';
import { ConflictError, UnauthorizedError } from '../utils/errors.utils';
import config from '../config/config';
import { IUserDocument } from '../interfaces/models/user.interface';

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

  public async login(data: ILoginData): Promise<{ user: PublicUser; tokens: IAuthTokens }> {
    const { email, password } = data;

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }
    const tokens = this._generateTokens({ id: user._id });
    user.refreshToken = tokens.refreshToken;

    await user.save();

    const userResponse = this._preparePublicUser(user);
    return { user: userResponse, tokens };
  }

  private _generateTokens(payload: object): IAuthTokens {
    const accessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, config.jwtSecret, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  }

  private _preparePublicUser(user: IUserDocument): PublicUser {
    const { email, name, role } = user;
    return { _id: user._id.toString(), email, name, role };
  }
}
