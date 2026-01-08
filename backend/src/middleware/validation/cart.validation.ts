import Joi from 'joi';
import { validate } from '../../utils/validation.utils';

const addToCartSchema = Joi.object({
  productId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'Invalid product ID',
    'string.length': 'Product ID must be 24 characters long',
    'any.required': 'Product ID is required',
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity must be a number',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required',
  }),
});

export const validateAddToCart = validate(addToCartSchema);
