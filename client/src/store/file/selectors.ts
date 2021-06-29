import { ApplicationState } from '../types';
import { FileOrder, FileSort, FileView, MyFile, MyUploadFile } from './types';
import { createSelector } from '@reduxjs/toolkit';

const currentDir = (state: ApplicationState): string =>
  state.file.currentDir || '';

const files = (state: ApplicationState): MyFile[] => state.file.files;

const directories = (state: ApplicationState): MyFile[] =>
  state.file.directories;

const filesAndDirs = createSelector(directories, files, (res1, res2) => {
  return [...res1, ...res2];
});

const creatingDir = (state: ApplicationState): boolean =>
  state.file.creatingDir;

const uploadFiles = (state: ApplicationState): MyUploadFile[] =>
  state.file.uploadFiles;

const uploadFile = (
  state: ApplicationState,
  props: { fileId: number }
): MyUploadFile | undefined => {
  return state.file.uploadFiles.find((file) => file.id === props.fileId);
};

const isFilesUploading = (state: ApplicationState): boolean =>
  state.file.uploadFiles.length > 0;

const sortBy = (state: ApplicationState): FileSort => state.file.sortBy;

const orderBy = (state: ApplicationState): FileOrder => state.file.order;

const fileView = (state: ApplicationState): FileView => state.file.fileView;

const isLoading = (state: ApplicationState): boolean => state.file.isLoading;

const searchValue = (state: ApplicationState): string => state.file.searchValue;

const tableView = (state: ApplicationState): boolean =>
  state.file.fileView === FileView.TABLE;

const bigTile = (state: ApplicationState): boolean =>
  state.file.fileView === FileView.BIG_TILE;

const ascOrder = (state: ApplicationState): boolean =>
  state.file.order === FileOrder.ASC;

export const selectors = {
  currentDir,
  files,
  creatingDir,
  isFilesUploading,
  uploadFiles,
  uploadFile,
  directories,
  filesAndDirs,
  sortBy,
  orderBy,
  fileView,
  isLoading,
  searchValue,
  tableView,
  bigTile,
  ascOrder
};
