import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';
import API from 'utils/API';

import { AuthData, AuthServerRequest } from './types';
import { stateName } from './constants';
import { actions } from './actions';
import { UserState } from './types';
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
    try {
      const result = await API.post('auth/login', {
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

const auth = createAsyncThunk<AuthServerRequest>(
  `${stateName}/auth`,
  async () => {
    await delay(1000);

    const result = await API.get('auth/auth', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });

    return result.data;
  }
);

export const userThunks = {
  registration,
  login,
  auth
};

export const extraActions = (
  builder: ActionReducerMapBuilder<UserState>
): void => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, actions.setUser)
    .addCase(auth.pending, (state) => {
      state.loading = true;
    })
    .addCase(auth.fulfilled, actions.setUser)
    .addCase(auth.rejected, (state) => {
      state.currentUser = null;
      state.isAuth = false;
      state.loading = false;
      localStorage.removeItem('jwt');
    });
};
