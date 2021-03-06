import {
  MyFile,
  FileReducerFunction,
  MyUploadFile,
  FileSort,
  FileOrder,
  FileState,
  FileView
} from './types';
import { initialState } from './constants';

function sortDirAndFiles(state: FileState): void {
  [state.directories, state.files].forEach((arr) => {
    arr.sort((fileA, fileB) => {
      let result: number;

      switch (state.sortBy) {
        case FileSort.DATE:
          result = new Date(fileA.date) < new Date(fileB.date) ? -1 : 1;
          break;
        case FileSort.TYPE:
          result = fileA.type < fileB.type ? -1 : 1;
          break;
        case FileSort.NAME:
        default:
          result = fileA.name < fileB.name ? -1 : 1;
      }

      return state.order === FileOrder.DESC ? result * -1 : result;
    });
  });

  state.directories = [...state.directories];
  state.files = [...state.files];
}

const setSort: FileReducerFunction<FileSort> = (state, { payload }) => {
  state.sortBy = payload;
  sortDirAndFiles(state);
};

const setOrder: FileReducerFunction = (state) => {
  state.order = state.order * -1;
  sortDirAndFiles(state);
};

const setView: FileReducerFunction<FileView> = (state, { payload }) => {
  state.fileView = payload;
};

const toggleLoader: FileReducerFunction<boolean> = (state, { payload }) => {
  state.isLoading = payload;
};

const setFiles: FileReducerFunction<{
  files: MyFile[];
  directories: MyFile[];
}> = (state, { payload }) => {
  state.isLoading = false;
  state.files = payload.files;
  state.directories = payload.directories;
  sortDirAndFiles(state);
};

const addDir: FileReducerFunction<MyFile> = (state, { payload }) => {
  state.directories.push(payload);
  sortDirAndFiles(state);
};

const addFile: FileReducerFunction<Promise<MyFile> | MyFile | null> = (
  state,
  { payload }
) => {
  if (payload) {
    if (payload instanceof Promise) {
      payload.then((file) => {
        state.files.push(file);
        sortDirAndFiles(state);
      });
    } else {
      state.files.push(payload);
      sortDirAndFiles(state);
    }
  }
};

const deleteFile: FileReducerFunction<{ id: string; type: string }> = (
  state,
  { payload }
) => {
  if (payload.type === 'dir') {
    state.directories = state.directories.filter(({ id }) => id !== payload.id);
  } else {
    state.files = state.files.filter(({ id }) => id !== payload.id);
  }
};

const startCreatingDir: FileReducerFunction = (state) => {
  state.creatingDir = true;
};

const stopCreatingDir: FileReducerFunction = (state) => {
  state.creatingDir = false;
};

const setCurrentDir: FileReducerFunction<string> = (state, { payload }) => {
  state.currentDir = payload;
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

const setSearchValue: FileReducerFunction<string> = (state, { payload }) => {
  state.searchValue = payload;
};

const clearState: FileReducerFunction = () => {
  return initialState;
};

export const actions = {
  setFiles,
  addDir,
  addFile,
  startCreatingDir,
  stopCreatingDir,
  setCurrentDir,
  deleteFile,
  addUploadFile,
  removeUploadFile,
  changeUploadFileProgress,
  setSort,
  setOrder,
  setView,
  toggleLoader,
  setSearchValue,
  clearState
};
