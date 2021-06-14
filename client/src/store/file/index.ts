import { createSlice } from '@reduxjs/toolkit';
import { actions } from './actions';
import { extraActions, thunks } from './extraActions';
import { selectors } from './selectors';
import { initialState, stateName } from './constants';

export const fileSlice = createSlice({
  name: stateName,
  initialState,
  reducers: actions,
  extraReducers: extraActions
});

export const fileReducer = fileSlice.reducer;
export const fileActions = fileSlice.actions;
export const fileSelectors = selectors;
export const fileThunks = thunks;
