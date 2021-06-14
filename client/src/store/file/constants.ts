import { FileState } from './types';

export const stateName = 'file';

export const initialState: FileState = {
  files: [],
  currentDir: null
};
