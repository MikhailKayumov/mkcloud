import { UserReducerFunction } from '../types';

const setAuth: UserReducerFunction<boolean> = (state, { payload }) => {
  state.isAuth = payload
};

export const actions = {
  setAuth
};
