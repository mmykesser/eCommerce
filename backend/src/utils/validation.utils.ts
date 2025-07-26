import { RequestHandler } from 'express';
import Joi from 'joi';
import { ValidationError } from './errors.utils';

export const validate =
  (schema: Joi.ObjectSchema): RequestHandler =>
  (req, _res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new ValidationError(error.details[0].message);
    }
    next();
  };
