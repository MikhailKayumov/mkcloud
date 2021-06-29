import { NextFunction, Response } from 'express';
import { BodyRequest } from 'controllers/types';
import RequestError from 'errors/RequestError';
import TokenService from 'services/TokenService';

export const authMiddleware = (
  req: BodyRequest,
  res: Response,
  next: NextFunction
): void | Response<{ message: string }> => {
  if (req.method === 'OPTIONS') return next();

  const token = req.headers.authorization?.split(' ')[1];

  if (!token || token === 'null') {
    return next(RequestError.unauthorizedError());
  }

  const decoded = TokenService.validateAccessToken(token);
  if (!decoded) {
    return next(RequestError.unauthorizedError());
  }

  req.body.jwt = decoded;
  next();
};
