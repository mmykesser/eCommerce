import { Response } from 'express';

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Sets the refresh token in an http-only cookie
 * This utils function securely attaches the refresh token to the response, making it inaccessible to the client
 * @param res The Express response object
 * @param token The refresh token string to be set in the cookie
 */

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie('refreshToken', token, {
    // Cookie is not accessible by JavaScript on the client side, protects against XSS attacks
    httpOnly: true,
    // Cookie will be sent only over HTTPS in production
    secure: process.env.NODE_ENV === 'production',
    // Protection against CSRF attacks. Cookie will only be sent with request from the same site
    sameSite: 'strict',
    // Cookie will expire after 30 days
    maxAge: THIRTY_DAYS_IN_MS,
  });
};
