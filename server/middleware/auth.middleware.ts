import { NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';
import config from 'config';
import { LoginRes } from '../routes/types';

export const checkToken = (
  req: Request<{ userId: string }>,
  res: LoginRes,
  next: NextFunction
): void | LoginRes => {
  if (req.method === 'OPTIONS') next();

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || token === 'null') {
      return res.status(401).json({ message: 'Auth error' });
    }

    const decoded = verify(token, config.get('secretKey')) as { id: string };
    req.params.userId = decoded.id;

    next();
  } catch (e) {
    console.log(e);
  }
};
