import { ApplicationState } from '../types';
import { File } from './types';

const currentDir = (state: ApplicationState): string =>
  state.file.currentDir || '';

const files = (state: ApplicationState): File[] => state.file.files;

export const selectors = {
  currentDir,
  files
};
