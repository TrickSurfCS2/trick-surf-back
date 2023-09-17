import type { IUser } from '#/models/user';
import jwt from 'jsonwebtoken';

export const AUTH_SECRET = process.env.AUTH_SECRET as string;

export const secrets = {
  JWT_ACCESS_SECRET: `${AUTH_SECRET}access`,
  JWT_REFRESH_SECRET: `${AUTH_SECRET}refresh`,
  JWT_VERIFICATION_SECRET: `${AUTH_SECRET}verification`,
  JWT_PASSWORD_RESET_SECRET: `${AUTH_SECRET}password-reset`
};

export const generateAccessToken = (user: IUser, options?: jwt.SignOptions) =>
  jwt.sign({ userId: user.id }, secrets.JWT_ACCESS_SECRET as string, {
    // expiresIn: '1d',
    ...options
  });

export const generateRefreshToken = (user: IUser, jti: string) =>
  jwt.sign(
    {
      userId: user.id,
      jti
    },
    secrets.JWT_REFRESH_SECRET as string,
    {
      expiresIn: '7d'
    }
  );

export const generateTokens = (user: IUser, jti: string, options?: jwt.SignOptions) => ({
  accessToken: generateAccessToken(user, options),
  refreshToken: generateRefreshToken(user, jti)
});
