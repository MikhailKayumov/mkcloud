import { ReducerFunction } from '../types';

export type UserState = {
  currentUser: unknown;
  isAuth: boolean;
};

export type UserReducerFunction<T = never> = ReducerFunction<UserState, T>;

export type RegistrationData = {
  email: string;
  password: string;
};
