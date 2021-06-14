import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { UserState } from './user/types';
import { FileState } from './file/types';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';

export type ApplicationState = {
  user: UserState;
  file: FileState;
};

export type ReducerFunction<S, P = void> = (
  state: S,
  payload: PayloadAction<P>
) => void;

export type ExtraReducerFunction<S> = (
  builder: ActionReducerMapBuilder<S>
) => void;
