import { File, FileReducerFunction } from './types';

const setFiles: FileReducerFunction<File[]> = (state, { payload }) => {
  state.files = payload;
};

const setCurrentDir: FileReducerFunction<string | null> = (
  state,
  { payload }
) => {
  state.currentDir = payload;
};

export const actions = {
  setFiles,
  setCurrentDir
};
