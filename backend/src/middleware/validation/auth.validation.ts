import Joi from 'joi';
import { validate } from '../../utils/validation.utils';

const registrationSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.min': 'Name should be at least 3 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password should be at least 6 characters',
    'any.required': 'Password is required',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

export const validateRegistration = validate(registrationSchema);
export const validateLogin = validate(loginSchema);
