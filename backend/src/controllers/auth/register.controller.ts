import { Request, Response } from 'express';
import { registerUser } from '../../services/auth.service';
import { ConflictError } from '../../utils/errors.utils';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await registerUser(email, password, name);
    res.status(201).json({
      success: true,
      data: { userId: user._id },
    });
  } catch (error) {
    if (error instanceof ConflictError) {
      res.status(409).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
};
