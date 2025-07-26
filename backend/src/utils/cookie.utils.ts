import { Response } from 'express';

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: THIRTY_DAYS_IN_MS,
  });
};
