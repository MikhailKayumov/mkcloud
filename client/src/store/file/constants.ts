import { FileOrder, FileSort, FileState, FileView } from './types';

export const stateName = 'file';

export const initialState: FileState = {
  files: [],
  directories: [],
  currentDir: '',
  uploadFiles: [],
  sortBy: FileSort.NAME,
  order: FileOrder.ASC,
  fileView: FileView.TABLE,
  isLoading: true,
  searchValue: '',
  creatingDir: false
};
