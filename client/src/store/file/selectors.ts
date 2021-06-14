import { ApplicationState, FileState } from '../types';

const fileState = (state: ApplicationState): FileState => state.file;

export const selectors = {
  fileState
};
