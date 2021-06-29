import { createAsyncThunk } from '@reduxjs/toolkit';

import $api from 'utils/api';

import {
  AuthServerResponse,
  LoginData,
  LoginError,
  RegistrationData,
  RegistrationError,
  UserExtraReducerFunction
} from './types';

import { stateName } from './constants';
import { actions } from './actions';

const registration = createAsyncThunk<
  AuthServerResponse,
  RegistrationData,
  { rejectValue: RegistrationError }
>(`${stateName}/registration`, async (data, { rejectWithValue }) => {
  try {
    const result = await $api.post('auth/registration', data);
    return result.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const login = createAsyncThunk<
  AuthServerResponse,
  LoginData,
  { rejectValue: LoginError }
>(`${stateName}/login`, async ({ email, password }, { rejectWithValue }) => {
  try {
    const result = await $api.post('auth/login', { email, password });
    return result.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const logout = createAsyncThunk<void>(`${stateName}/logout`, async () => {
  await $api.get('auth/logout');
});

const refresh = createAsyncThunk<
  AuthServerResponse,
  void,
  { rejectValue: void }
>(`${stateName}/refresh`, async (_, { rejectWithValue }) => {
  try {
    const result = await $api.get('auth/refresh');
    return result.data;
  } catch {
    return rejectWithValue();
  }
});

export const thunks = {
  registration,
  login,
  logout,
  refresh
};

export const extraActions: UserExtraReducerFunction = (builder): void => {
  builder
    .addCase(registration.fulfilled, actions.login)
    .addCase(login.fulfilled, actions.login)
    .addCase(refresh.fulfilled, actions.login)
    .addCase(logout.fulfilled, actions.logout);
};
