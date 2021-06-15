import { File, FileReducerFunction } from './types';

const setFiles: FileReducerFunction<File[]> = (state, { payload }) => {
  state.files = payload;
};

const addFile: FileReducerFunction<File> = (state, { payload }) => {
  state.files.push(payload);
  state.createDirPopupDisplay = false;
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

export const actions = {
  setFiles,
  addFile,
  setCurrentDir,
  toggleCreateDirPopupDisplay
};
