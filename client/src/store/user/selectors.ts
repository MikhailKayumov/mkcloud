import { ApplicationState } from '../types';
import { User } from './types';

const user = (state: ApplicationState): User | null => state.user.currentUser;

const isLoading = (state: ApplicationState): boolean => state.user.loading;

const isAuth = (state: ApplicationState): boolean => state.user.isAuth;

const usedSpace = (state: ApplicationState): number | undefined =>
  state.user.currentUser?.usedSpace;

export const selectors = {
  user,
  isLoading,
  isAuth,
  usedSpace
};
