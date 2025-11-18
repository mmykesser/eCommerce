import Joi from 'joi';
import { validate } from '../../utils/validation.utils';

const orderProductSchema = Joi.object({
  product: Joi.string().hex().length(24).required().messages({
    'string.hex': 'Product ID must be a valid hexadecimal string',
    'string.length': 'Product ID must be exactly 24 characters long',
    'any.required': 'Product ID is required',
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity must be a number',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required',
  }),
});

const shippingDetailsSchema = Joi.object({
  type: Joi.string().valid('inpost_paczkomat').required(),
  address: Joi.string().required(),
});

const createOrderSchema = Joi.object({
  products: Joi.array().items(orderProductSchema).min(1).required().messages({
    'array.min': 'Order must contain at least one product',
    'any.required': 'Products array is required',
  }),

  shippingDetails: shippingDetailsSchema.required(),
});

export const validateCreateOrder = validate(createOrderSchema);
