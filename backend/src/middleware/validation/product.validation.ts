import Joi from 'joi';
import { validate } from '../../utils/validation.utils';

const createProductSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    'string.min': 'Title should be at least 3 characters',
    'any.required': 'Title is required',
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be a positive number',
    'any.required': 'Price is required',
  }),
  description: Joi.string().min(10).required().messages({
    'string.min': 'Description should be at least 10 characters',
    'any.required': 'Description is required',
  }),
  category: Joi.string().hex().length(24).required().messages({
    'string.hex': 'Category ID must be a valid hexadecimal string',
    'string.length': 'Category ID must be 24 characters long',
    'any.required': 'Category is required',
  }),
  images: Joi.array().items(Joi.string().uri()).min(1).required().messages({
    'array.min': 'At least one image is required',
    'any.required': 'Image is required',
  }),
});

export const validateCreateProduct = validate(createProductSchema);
