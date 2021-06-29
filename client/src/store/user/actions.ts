import { AuthServerResponse, UserReducerFunction } from './types';
import $jwt from 'utils/jwt';

const login: UserReducerFunction<AuthServerResponse> = (state, { payload }) => {
  state.currentUser = payload.user;
  state.isAuth = true;
  $jwt.set(payload.token);
};

const logout: UserReducerFunction = (state) => {
  state.currentUser = null;
  state.isAuth = false;
  $jwt.remove();
};

const showLoading: UserReducerFunction = (state) => {
  state.loading = true;
};

const hideLoading: UserReducerFunction = (state) => {
  state.loading = false;
};

const changeSize: UserReducerFunction<number> = (state, { payload }) => {
  if (state.currentUser) {
    state.currentUser.usedSpace += payload;
  }
};

export const actions = {
  login,
  logout,
  showLoading,
  hideLoading,
  changeSize
};
