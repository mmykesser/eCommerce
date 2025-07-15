import { RequestHandler } from 'express';
import { AuthService } from '../../services/auth.service';

const authService = new AuthService();

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { user, tokens } = await authService.register(req.body);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      success: true,
      data: {
        user,
        accessToken: tokens.accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};
