import { configureStore } from '@reduxjs/toolkit';
import { ApplicationState } from './types';

import { userReducer } from './user'
import { fileReducer } from './file'

const store = configureStore<ApplicationState>({
  reducer: {
    user: userReducer,
    file: fileReducer
  }
});

export default store;