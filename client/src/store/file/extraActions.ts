import { File as FileType, FileExtraReducerFunction } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'utils/API';
import { stateName } from './constants';
import { actions } from './actions';

const getFiles = createAsyncThunk<FileType[], string>(
  `${stateName}/getFiles`,
  async (dirId) => {
    const result = await API.get(`file${dirId ? `?parent=${dirId}` : ''}`);
    return result.data;
  }
);

const createDir = createAsyncThunk<FileType, { parent: string; name: string }>(
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
  FileType,
  { file: File; parent: string | null }
>(`${stateName}/uploadFile`, async ({ file, parent }) => {
  const formData = new FormData();
  formData.append('file', file);
  if (parent) formData.append('parent', parent);

  const result = await API.post('file/upload', formData, {
    onUploadProgress: (progressEvent) => {
      const totalLength = progressEvent.lengthComputable
        ? progressEvent.total
        : progressEvent.target.getResponseHeader('content-length') ||
          progressEvent.target.getResponseHeader(
            'x-decompressed-content-length'
          );
      console.log('total', totalLength);

      if (totalLength) {
        const progress = Math.round((progressEvent.loaded * 100) / totalLength);
        console.log(progress);
      }
    }
  });

  return result.data;
});

const downloadFile = createAsyncThunk<void, FileType>(
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

export const thunks = {
  getFiles,
  createDir,
  uploadFile,
  downloadFile
};

export const extraActions: FileExtraReducerFunction = (builder) => {
  builder
    .addCase(getFiles.fulfilled, actions.setFiles)
    .addCase(createDir.fulfilled, actions.addFile)
    .addCase(uploadFile.fulfilled, actions.addFile);
};
