import { ErrorRequestHandler } from 'express';
import { ValidationError, ConflictError, UnauthorizedError } from '../utils/errors.utils';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.setHeader('Content-Type', 'application/json');

  if (err instanceof ConflictError) {
    return res.status(409).json({
      success: false,
      message: err.message,
    });
  }
  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
  console.error('Unhandled error:', err);

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};
