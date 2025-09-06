import Joi from 'joi';
import { validate } from '../utils/validation.utils';

const createCategorySchema = Joi.object({
  name: Joi.string().min(4).required().messages({
    'string.min': 'Category name should be at least 4 characters',
    'any.required': 'Category name is required',
  }),
  image: Joi.string().uri().required().messages({
    'string.uri': 'Image URL must be a valid URI',
    'any.required': 'Image URL is required',
  }),
});

export const validateCreateCategory = validate(createCategorySchema);
