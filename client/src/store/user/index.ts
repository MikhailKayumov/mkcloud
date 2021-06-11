import { createSlice } from '@reduxjs/toolkit';
import { actions } from './actions';
import { selectors } from './selectors';

const initialState = {
  currentUser: {},
  isAuth: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: actions
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelectors = selectors;
