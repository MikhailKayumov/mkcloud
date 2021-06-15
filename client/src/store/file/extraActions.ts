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

const createDir = createAsyncThunk<File, { parent: string; name: string }>(
  `${stateName}/createDir`,
  async ({ parent, name }) => {
    const result = await API.post('file', {
      parent: parent || null,
      name,
      type: 'dir'
    });
    return result.data;
  }
);

export const thunks = {
  getFiles,
  createDir
};

export const extraActions: FileExtraReducerFunction = (builder) => {
  builder
    .addCase(getFiles.fulfilled, actions.setFiles)
    .addCase(createDir.fulfilled, actions.addFile);
};
