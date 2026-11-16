import { CookieOptions, Response } from 'express';

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

const isProduction = process.env.NODE_ENV === 'production';

export const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  // Frontend and API will be on different domains, so in production the
  // cookie must be allowed to travel cross-site (requires secure: true)
  sameSite: isProduction ? 'none' : 'strict',
};

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie('refreshToken', token, {
    ...refreshCookieOptions,
    maxAge: THIRTY_DAYS_IN_MS,
  });
};

export const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie('refreshToken', refreshCookieOptions);
};
