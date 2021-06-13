import { UserState } from './types';

export const stateName = 'user';

export const initialState: UserState = {
  currentUser: {},
  isAuth: false,
};
