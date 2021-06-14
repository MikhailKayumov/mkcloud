import { UserState } from './types';

export const stateName = 'user';

export const initialState: UserState = {
  currentUser: null,
  isAuth: false
};
