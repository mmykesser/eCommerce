import { RequestHandler } from 'express';
import { AuthService } from '../../services/auth.service';
import { setRefreshTokenCookie } from '../../utils/cookie.utils';

const authService = new AuthService();

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { user, tokens } = await authService.login(req.body);

    setRefreshTokenCookie(res, tokens.refreshToken);

    res.status(200).json({
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
