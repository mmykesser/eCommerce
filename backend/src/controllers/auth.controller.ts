import { RequestHandler } from 'express';
import { AuthService } from '../services/auth.service';
import { setRefreshTokenCookie } from '../utils/cookie.utils';
import { IRegistrationData, ILoginData } from '../interfaces/dto/auth.interface';

export class AuthController {
  private authService = new AuthService();

  public register: RequestHandler = async (req, res, next) => {
    try {
      const userData: IRegistrationData = req.body;
      const { user, tokens } = await this.authService.register(userData);

      setRefreshTokenCookie(res, tokens.refreshToken);

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

  public login: RequestHandler = async (req, res, next) => {
    try {
      const loginData: ILoginData = req.body;
      const { user, tokens } = await this.authService.login(loginData);

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

  public refresh: RequestHandler = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const { user, tokens } = await this.authService.refresh(refreshToken);

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
  public getProfile: RequestHandler = (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        user: req.user,
      },
    });
  };
}
