import { File, FileExtraReducerFunction } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'utils/API';
import { stateName } from './constants';
import { actions } from './actions';

const getFiles = createAsyncThunk<File[], string>(
  `${stateName}/getFiles`,
  async (dirId) => {
    const result = await API.get(`file${dirId ? `?parent=${dirId}` : ''}`);
    return result.data;
  }
);

export const thunks = {
  getFiles
};

export const extraActions: FileExtraReducerFunction = (builder) => {
  builder.addCase(getFiles.fulfilled, actions.setFiles);
};
