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

const pushToStack: FileReducerFunction<string> = (state, { payload }) => {
  state.dirStack.push(payload);
};

const popFromStack: FileReducerFunction = (state) => {
  if (state.dirStack.length) {
    state.currentDir = state.dirStack.pop() || null;
  }
};

export const actions = {
  setFiles,
  addFile,
  setCurrentDir,
  toggleCreateDirPopupDisplay,
  pushToStack,
  popFromStack
};
