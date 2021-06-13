import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'utils/API';

import { RegistrationData } from './types';
import { stateName } from './constants';
// import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders';
// import { UserState } from './types';

const registration = createAsyncThunk<Promise<unknown>, RegistrationData>(
  `${stateName}/registration`,
  async ({ email, password }) => {
    try {
      const result = await API.post('auth/registration', {
        email,
        password,
      });

      return result.data;
    } catch (e) {
      const { message, errors } = e.response.data;

      let msg = message;
      if (errors && Array.isArray(errors)) {
        msg += `\n${errors.map(error => error.msg).join('\n')}`;
      }

      alert(msg);
    }
  },
);

export const userThunks = {
  registration,
};

// export const extraActions = (
//   builder: ActionReducerMapBuilder<UserState>,
// ): void => {
//   builder
//     .addCase(registration.fulfilled, (state, { payload }) => {
//       console.log(payload);
//       console.log(state);
//     })
//     .addCase(registration.rejected, (state, { payload }) => {
//       console.log(payload);
//       console.log(state);
//     });
// };
