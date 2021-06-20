import { ApplicationState } from '../types';
import { MyFile, FileExtraReducerFunction } from './types';

import { CancelToken } from 'axios';
import API from 'utils/API';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { stateName } from './constants';
import { actions } from './actions';
import { fileActions } from './index';

const getFiles = createAsyncThunk<
  { files: MyFile[]; directories: MyFile[] },
  string
>(`${stateName}/getFiles`, async (dirId) => {
  const result = await API.get(`file${dirId ? `?parent=${dirId}` : ''}`);
  return result.data;
});

const createDir = createAsyncThunk<MyFile, { parent: string; name: string }>(
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

const uploadFile = createAsyncThunk<
  Promise<MyFile>,
  { file: File; parent: string | null; cancelToken: CancelToken; id: number },
  { state: ApplicationState }
>(`${stateName}/uploadFile`, ({ id, file, parent, cancelToken }, thunkAPI) => {
  const formData = new FormData();
  formData.append('file', file);
  if (parent) formData.append('parent', parent);

  const result = API.post('file/upload', formData, {
    cancelToken: cancelToken,
    timeout: 0,
    onUploadProgress: (progressEvent) => {
      const totalLength = progressEvent.lengthComputable
        ? progressEvent.total
        : progressEvent.target.getResponseHeader('content-length') ||
          progressEvent.target.getResponseHeader(
            'x-decompressed-content-length'
          );

      if (totalLength) {
        const progress = Math.round((progressEvent.loaded * 100) / totalLength);
        thunkAPI.dispatch(
          fileActions.changeUploadFileProgress({ fileId: id, progress })
        );
      }
    }
  });

  thunkAPI.dispatch(
    fileActions.addUploadFile({
      id,
      name: file.name,
      progress: 0
    })
  );

  return result
    .then((data) => data.data)
    .catch((e) => console.log(e))
    .finally(() => thunkAPI.dispatch(fileActions.removeUploadFile(id)));
});

const downloadFile = createAsyncThunk<void, MyFile>(
  `${stateName}/downloadFile`,
  async (file) => {
    const result = await API.get(`file/download?fileId=${file._id}`, {
      responseType: 'blob'
    });

    if (result.status === 200) {
      const downloadURL = URL.createObjectURL(result.data);
      const link = document.createElement('a');
      link.style.display = 'none';

      link.href = downloadURL;
      console.log(downloadURL);
      link.download = file.name;

      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }
);

const deleteFile = createAsyncThunk<{ id: string; type: string }, MyFile>(
  `${stateName}/deleteFile`,
  async (file) => {
    const { data } = await API.delete(`file/delete?fileId=${file._id}`);
    console.log(data?.message || '');
    return { id: file._id, type: file.type };
  }
);

export const thunks = {
  getFiles,
  createDir,
  uploadFile,
  downloadFile,
  deleteFile
};

export const extraActions: FileExtraReducerFunction = (builder) => {
  builder
    .addCase(getFiles.fulfilled, actions.setFiles)
    .addCase(createDir.fulfilled, actions.addDir)
    .addCase(uploadFile.fulfilled, actions.addFile)
    .addCase(deleteFile.fulfilled, actions.deleteFile);
};
