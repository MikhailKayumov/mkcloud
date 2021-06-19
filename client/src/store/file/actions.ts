import { MyFile, FileReducerFunction, MyUploadFile } from './types';

const setFiles: FileReducerFunction<MyFile[]> = (state, { payload }) => {
  state.files = payload;
};

const addFile: FileReducerFunction<Promise<MyFile> | MyFile | null> = (
  state,
  { payload }
) => {
  if (payload) {
    if (payload instanceof Promise) {
      payload.then((file) => state.files.push(file));
    } else {
      state.files.push(payload);
    }
  }
};

const deleteFile: FileReducerFunction<string> = (state, { payload }) => {
  state.files = state.files.filter((file) => file._id !== payload);
};

const toggleCreateDirPopupDisplay: FileReducerFunction<boolean> = (
  state,
  { payload }
) => {
  state.createDirPopupDisplay = payload;
};

const setCurrentDir: FileReducerFunction<string | null> = (
  state,
  { payload }
) => {
  state.currentDir = payload;
};

const pushToStack: FileReducerFunction<string> = (state, { payload }) => {
  state.dirStack.push(payload);
};

const popFromStack: FileReducerFunction = (state) => {
  if (state.dirStack.length) {
    state.currentDir = state.dirStack.pop() || null;
  }
};

const addUploadFile: FileReducerFunction<MyUploadFile> = (
  state,
  { payload }
) => {
  state.uploadFiles.push(payload);
};

const removeUploadFile: FileReducerFunction<number> = (state, { payload }) => {
  state.uploadFiles = state.uploadFiles.filter((file) => file.id !== payload);
};

const changeUploadFileProgress: FileReducerFunction<{
  fileId: number;
  progress: number;
}> = (state, { payload: { fileId, progress } }) => {
  const file = state.uploadFiles.find((file) => file.id === fileId);
  if (file) file.progress = progress;
};

export const actions = {
  setFiles,
  addFile,
  setCurrentDir,
  toggleCreateDirPopupDisplay,
  pushToStack,
  popFromStack,
  deleteFile,
  addUploadFile,
  removeUploadFile,
  changeUploadFileProgress
};
