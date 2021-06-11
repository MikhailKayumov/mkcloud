import { ApplicationState } from '../types';

const isAuth = (state: ApplicationState) => state.user.isAuth;

export const selectors = {
  isAuth
};