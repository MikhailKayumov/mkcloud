import { ApplicationState } from '../types';
import { MyFile, MyUploadFile } from './types';

const currentDir = (state: ApplicationState): string =>
  state.file.currentDir || '';

const files = (state: ApplicationState): MyFile[] => state.file.files;

const popupShow = (state: ApplicationState): boolean =>
  state.file.createDirPopupDisplay;

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

export const selectors = {
  currentDir,
  files,
  popupShow,
  isFilesUploading,
  uploadFiles,
  uploadFile
};
