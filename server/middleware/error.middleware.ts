import { NextFunction, Request, Response } from 'express';
import { ErrorRequestHandler } from 'express-serve-static-core';
import { ErrorResponse } from 'controllers/types';
import AppError from 'errors/AppError';

export const errorMiddleware: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction
) => {
  console.error('/* ================ Error =============== */');
  console.error(err);
  console.error('/* ================ Error =============== */');

  let message = 'Unknown server error';
  let status = 500;
  let errors: string[] = [];

  if (err instanceof AppError) {
    status = err.status;
    message = err.message;
    errors = err.errors;
  } else if (err instanceof Error) {
    message = err.message;
  }

  return res.status(status).json({
    message,
    errors
  });
};
