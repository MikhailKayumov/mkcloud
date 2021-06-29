import { ExtraReducerFunction, ReducerFunction } from '../types';

export type User = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  diskSpace: number;
  usedSpace: number;
};

export type UserState = {
  currentUser: User | null;
  isAuth: boolean;
  loading: boolean;
};

export type UserReducerFunction<P = void> = ReducerFunction<UserState, P>;

export type UserExtraReducerFunction = ExtraReducerFunction<UserState>;

export type RegistrationData = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

export type RegistrationError = {
  message: string;
  errors: string[] | null;
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginError = {
  message: string;
};

export type AuthServerResponse = {
  token: string;
  user: User;
};
