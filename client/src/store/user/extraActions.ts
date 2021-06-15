import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'utils/API';

import { AuthData, AuthServerRequest, UserExtraReducerFunction } from './types';
import { stateName } from './constants';
import { actions } from './actions';
import { delay } from '../../utils';

const registration = createAsyncThunk<Promise<unknown>, AuthData>(
  `${stateName}/registration`,
  async ({ email, password }) => {
    try {
      const result = await API.post('auth/registration', {
        email,
        password
      });

      return result.data;
    } catch (e) {
      const { message, errors } = e.response.data;

      let msg = message;
      if (errors && Array.isArray(errors)) {
        msg += `\n${errors.map((error) => error.msg).join('\n')}`;
      }

      alert(msg);
    }
  }
);

const login = createAsyncThunk<AuthServerRequest, AuthData>(
  `${stateName}/login`,
  async ({ email, password }) => {
    const result = await API.post('auth/login', {
      email,
      password
    });

    return result.data;
  }
);

const auth = createAsyncThunk<AuthServerRequest>(
  `${stateName}/auth`,
  async () => {
    await delay(1000);
    const result = await API.get('auth/auth');
    return result.data;
  }
);

export const thunks = {
  registration,
  login,
  auth
};

export const extraActions: UserExtraReducerFunction = (builder): void => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, actions.setUser)
    .addCase(login.rejected, actions.logout)
    .addCase(auth.pending, (state) => {
      state.loading = true;
    })
    .addCase(auth.fulfilled, actions.setUser)
    .addCase(auth.rejected, actions.logout);
};
