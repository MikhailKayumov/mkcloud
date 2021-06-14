import { UserReducerFunction } from './types';

const logout: UserReducerFunction = (state) => {
  state.currentUser = null;
  state.isAuth = false;
  localStorage.removeItem('jwt');
};

export const actions = {
  logout
};
