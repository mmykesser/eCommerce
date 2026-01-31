import Joi from 'joi';
import { validate } from '../../utils/validation.utils';

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).messages({
    'string.min': 'Name should be at least 3 characters',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Invalid email address',
  }),
  role: Joi.string().valid('admin', 'user').messages({
    'any.only': 'Invalid role value',
  }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update',
  });

export const validateUpdateUser = validate(updateUserSchema);
