import { RequestHandler } from 'express';
import Joi from 'joi';
import { ValidationError } from './errors.utils';

/**
 * Creates an Express middleware to validate request body against a Joi schema


 * @param schema The Joi schema to validate the request body against
 * @returns an Express RequestHandler middleware
 * @throws {ValidationError} if the request body fails validation
 */

export const validate =
  (schema: Joi.ObjectSchema): RequestHandler =>
  (req, _res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new ValidationError(error.details[0].message);
    }
    next();
  };
