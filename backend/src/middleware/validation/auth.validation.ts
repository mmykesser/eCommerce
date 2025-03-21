import { RequestHandler } from 'express';
import { RegistrationData } from '../../types/auth.types';
import { ValidationError } from '../../utils/errors.utils';

export const validateRegistration: RequestHandler = (req, _res, next) => {
  try {
    const { email, password, name } = req.body as RegistrationData;

    if (!email || !password || !name) {
      return next(new ValidationError('All fields are required'));
    }

    const trimmedEmail = (email ?? '').trim();
    const trimmedPassword = (password ?? '').trim();
    const trimmedName = (name ?? '').trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      return next(new ValidationError('Invalid email address'));
    }

    if (trimmedPassword.length < 6) {
      return next(new ValidationError('Password must be at least 6 characters'));
    }

    if (trimmedName.length < 3) {
      return next(new ValidationError('Name should be at least 3 characters'));
    }

    next();
  } catch (error) {
    next(error);
  }
};
