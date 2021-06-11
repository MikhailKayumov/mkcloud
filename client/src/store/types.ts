import { PayloadAction } from '@reduxjs/toolkit/src/createAction';

export type UserState = {
  currentUser: object;
  isAuth: boolean;
}

export type FileState = {};

export type ApplicationState = {
  user: UserState;
  file: FileState;
};

export type ReducerFunction<S, P> = (
  state: S,
  payload: PayloadAction<P>
) => void;

export type UserReducerFunction<T = any> = ReducerFunction<UserState, T>;