import { createSlice } from '@reduxjs/toolkit';
import { actions } from './actions';

export const fileSlice = createSlice({
  name: 'file',
  initialState: {},
  reducers: actions
});

export const fileReducer = fileSlice.reducer;
export const fileActions = fileSlice.actions;
