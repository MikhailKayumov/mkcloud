import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { actions } from './actions';
import { selectors } from './selectors';
import { FileState } from '../types';

export const fileSlice = createSlice<FileState, SliceCaseReducers<FileState>>({
  name: 'file',
  initialState: {},
  reducers: actions
});

export const fileReducer = fileSlice.reducer;
export const fileActions = fileSlice.actions;
export const fileSelectors = selectors;
