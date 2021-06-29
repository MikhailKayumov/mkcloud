import { ApplicationState } from '../types';
import {
  MyFile,
  FileExtraReducerFunction,
  GetFilesResponse,
  GetFilesRequest,
  CreateDirRequest
} from './types';

import { CancelToken } from 'axios';
import API from 'utils/api';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { stateName } from './constants';
import { actions } from './actions';
import { fileActions } from './index';
import { userActions } from '../user';
import { User } from '../user/types';

const getFiles = createAsyncThunk<GetFilesResponse, GetFilesRequest>(
  `${stateName}/getFiles`,
  async ({ parent, like }, { dispatch }) => {
    dispatch(fileActions.toggleLoader(true));

    const result = await API.get('file', {
      params: { parent, like }
    });
    return result.data;
  }
);

const createDir = createAsyncThunk<MyFile, CreateDirRequest>(
  `${stateName}/createDir`,
  async ({ parent, name }) => {
    const result = await API.post('file/createDir', {
      parent,
      name
    });
    return result.data.dir;
  }
);

const uploadFile = createAsyncThunk<
  Promise<MyFile>,
  { file: File; parent: string | null; cancelToken: CancelToken; id: number },
  { state: ApplicationState }
>(
  `${stateName}/uploadFile`,
  ({ id, file, parent, cancelToken }, { dispatch }) => {
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
          const progress = Math.round(
            (progressEvent.loaded * 100) / totalLength
          );
          dispatch(
            fileActions.changeUploadFileProgress({ fileId: id, progress })
          );
        }
      }
    });

    dispatch(
      fileActions.addUploadFile({
        id,
        name: file.name,
        progress: 0
      })
    );

    return result
      .then((data) => {
        dispatch(userActions.changeSize(data.data.size));
        return data.data.file;
      })
      .catch((e) => alert(e))
      .finally(() => dispatch(fileActions.removeUploadFile(id)));
  }
);

const deleteFile = createAsyncThunk<
  { id: string; type: string },
  { id: string; type: string }
>(`${stateName}/deleteFile`, async ({ id, type }, { dispatch }) => {
  const result = await API.delete(`file/delete?fileId=${id}`);
  dispatch(userActions.changeSize(-result.data.size));
  return { id, type };
});

const downloadFile = createAsyncThunk<void, { id: string; name: string }>(
  `${stateName}/downloadFile`,
  async ({ id, name }) => {
    const result = await API.get(`file/download?fileId=${id}`, {
      responseType: 'blob'
    });

    if (result.status === 200) {
      const downloadURL = URL.createObjectURL(result.data);
      const link = document.createElement('a');
      link.style.display = 'none';

      link.href = downloadURL;
      link.download = name;

      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }
);

const uploadAvatar = createAsyncThunk<Promise<User>, File>(
  `${stateName}/avatar`,
  async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const result = await API.post('file/avatar', formData, {
      timeout: 0
    });
    return result.data;
  }
);

const deleteAvatar = createAsyncThunk<Promise<User>>(
  `${stateName}/avatar`,
  async () => {
    const result = await API.delete('file/avatar');
    return result.data;
  }
);

export const thunks = {
  getFiles,
  createDir,
  uploadFile,
  downloadFile,
  deleteFile,
  uploadAvatar,
  deleteAvatar
};

export const extraActions: FileExtraReducerFunction = (builder) => {
  builder
    .addCase(getFiles.fulfilled, actions.setFiles)
    .addCase(createDir.fulfilled, actions.addDir)
    .addCase(uploadFile.fulfilled, actions.addFile)
    .addCase(deleteFile.fulfilled, actions.deleteFile);
};
