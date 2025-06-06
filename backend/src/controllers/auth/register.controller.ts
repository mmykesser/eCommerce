import { RequestHandler } from 'express';
import { registerUser } from '../../services/auth.service';

export const register: RequestHandler = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      success: true,
      data: { userId: user._id },
    });
  } catch (err) {
    next(err);
  }
};
