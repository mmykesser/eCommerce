import { CookieOptions, Response } from 'express';

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

export const BASE_COOKIE_OPTIONS: CookieOptions = {
  //XSS protection: cookie is inaccessible to client-side JavaScript
  httpOnly: true,
  //Transmitted only HTTPS in production
  secure: process.env.NODE_ENV === 'production',
  //CSRF protection: cookie will only be sent with requests from the same site
  sameSite: 'strict',
};

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie('refreshToken', token, {
    ...BASE_COOKIE_OPTIONS,
    maxAge: THIRTY_DAYS_IN_MS,
  });
};

export const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie('refreshToken', BASE_COOKIE_OPTIONS);
};
