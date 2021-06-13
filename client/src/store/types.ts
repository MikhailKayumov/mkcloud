import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { UserState } from './user/types';

export type FileState = unknown;

export type ApplicationState = {
  user: UserState;
  file: FileState;
};

export type ReducerFunction<S, P> = (
  state: S,
  payload: PayloadAction<P>,
) => void;
