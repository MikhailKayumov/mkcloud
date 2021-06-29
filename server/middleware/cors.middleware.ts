import { NextFunction, Request, Response } from 'express';

export function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}
