import { ApplicationState } from '../types';

const isAuth = (state: ApplicationState): boolean => state.user.isAuth;

export const selectors = {
  isAuth,
};
