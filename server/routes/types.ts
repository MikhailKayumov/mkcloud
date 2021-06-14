import { Request, Response } from 'express';
import { ValidationError } from 'express-validator';
import { User } from '../models/User/types';

export type UserAuthData = {
  email: string;
  password: string;
};

export type MessageRespone = {
  message: string;
  errors?: ValidationError[];
};

export type RegistrationReq = Request<UserAuthData>;

export type RegistrationRes = Response<MessageRespone>;

export type LoginReq = RegistrationReq;

export type LoginRes = Response<
  | { token: string; user: Required<Omit<User, 'password' | 'files'>> }
  | MessageRespone
>;
