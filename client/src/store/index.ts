import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as reduxDispatch } from 'react-redux';

import { ApplicationState } from './types';
import { userReducer } from './user';
import { fileReducer } from './file';

const store = configureStore<ApplicationState>({
  reducer: {
    user: userReducer,
    file: fileReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export const useDispatch = (): AppDispatch => reduxDispatch<AppDispatch>();

export default store;
