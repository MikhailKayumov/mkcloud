import { AuthServerRequest, UserReducerFunction } from './types';

const setUser: UserReducerFunction<AuthServerRequest> = (
  state,
  { payload }
) => {
  state.currentUser = payload.user;
  state.loading = false;
  state.isAuth = true;
  localStorage.setItem('jwt', payload.token);
};

const logout: UserReducerFunction = (state) => {
  state.currentUser = null;
  state.isAuth = false;
  localStorage.removeItem('jwt');
};

export const actions = {
  setUser,
  logout
};
