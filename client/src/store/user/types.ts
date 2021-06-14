import { ExtraReducerFunction, ReducerFunction } from '../types';

export type User = {
  id: string;
  email: string;
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

export type AuthData = {
  email: string;
  password: string;
};

export type AuthServerRequest = {
  token: string;
  user: User;
};
