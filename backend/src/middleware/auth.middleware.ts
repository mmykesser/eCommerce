import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors.utils';
import config from '../config/config';
import { IPayload } from '../interfaces/auth/payload.interface';
import { UserModel } from '../models/User';
import { AuthService } from '../services/auth.service';

export const protect: RequestHandler = async (req, _res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const payload = jwt.verify(token, config.jwtSecret) as IPayload;

      const user = await UserModel.findById(payload.id).select('-password');
      if (!user) {
        return next(new UnauthorizedError('The user associated with this token no longer exists.'));
      }

      req.user = AuthService.preparePublicUser(user);
      return next();
    } catch (error) {
      return next(new UnauthorizedError('Not authorized, token failed'));
    }
  }
  return next(new UnauthorizedError('Not authorized, no token'));
};
