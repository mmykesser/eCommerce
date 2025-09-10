import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError, ForbiddenError } from '../utils/errors.utils';
import config from '../config/config';
import { IPayload } from '../interfaces/auth/payload.interface';
import { UserModel } from '../models/User';
import { AuthService } from '../services/auth.service';

export const protect: RequestHandler = async (req, _res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(new UnauthorizedError('Not authorized, no token'));
    }
    const payload = jwt.verify(token, config.jwtSecret) as IPayload;
    const user = await UserModel.findById(payload.id).select('-password');
    if (!user) {
      return next(new UnauthorizedError('The user associated with this token no longer exists.'));
    }
    req.user = AuthService.preparePublicUser(user);
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError('Token has expired'));
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return next(new UnauthorizedError('Invalid token'));
    }
    return next(new UnauthorizedError('Not authorized, token failed'));
  }
};

export const authorize =
  (...roles: string[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ForbiddenError('Not authorized as an admin'));
    }
    next();
  };
