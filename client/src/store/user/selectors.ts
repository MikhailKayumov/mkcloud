import { ApplicationState } from '../types';

const isLoading = (state: ApplicationState): boolean => state.user.loading;

const isAuth = (state: ApplicationState): boolean => state.user.isAuth;

export const selectors = {
  isLoading,
  isAuth
};
