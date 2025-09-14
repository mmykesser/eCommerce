import Joi from 'joi';
import { validate } from '../../utils/validation.utils';

const createCategorySchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.min': 'Category name should be at least 3 characters',
    'any.required': 'Category name is required',
  }),
  image: Joi.string().uri().required().messages({
    'string.uri': 'Image URL must be a valid URI',
    'any.required': 'Image URL is required',
  }),
});

export const validateCreateCategory = validate(createCategorySchema);

const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).messages({
    'string.min': 'Category name should be at least 3 characters',
  }),
  image: Joi.string().uri().messages({
    'string.uri': 'Image URL must be a valid URI',
  }),
});

export const validateUpdateCategory = validate(updateCategorySchema);
