import { RequestHandler } from 'express';
import { registerUser } from '../../services/auth.service';
import { ConflictError, ValidationError } from '../../utils/errors.utils';

export const register: RequestHandler = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      success: true,
      data: { userId: user._id },
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ success: false, message: error.message });
    } else if (error instanceof ConflictError) {
      res.status(409).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
};
