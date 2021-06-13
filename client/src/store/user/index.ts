import { SliceCaseReducers, createSlice } from '@reduxjs/toolkit';
import { UserState } from './types';

import { actions } from './actions';
import { selectors } from './selectors';
// import { extraActions } from './extraActions';
import { initialState, stateName } from './constants';

const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
  name: stateName,
  initialState,
  reducers: actions,
  // extraReducers: extraActions,
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelectors = selectors;
