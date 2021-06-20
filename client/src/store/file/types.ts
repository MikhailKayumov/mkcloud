import { ExtraReducerFunction, ReducerFunction } from '../types';

export enum FileOrder {
  ASC = 1,
  DESC = -1
}

export enum FileSort {
  NAME = 'name',
  DATE = 'date',
  TYPE = 'type'
}

export enum FileView {
  BIG_TILE = 1,
  TILE = 2,
  TABLE = 3
}

export type MyFile = {
  _id: string;
  type: string;
  name: string;
  path: string;
  size: number;
  user: string;
  parent: string;
  date: string;
  children: string[];
};

export type MyUploadFile = {
  id: number;
  name: string;
  progress: number;
};

export type FileState = {
  files: MyFile[];
  directories: MyFile[];
  currentDir: string | null;
  createDirPopupDisplay: boolean;
  dirStack: string[];
  uploadFiles: MyUploadFile[];
  sortBy: FileSort;
  order: FileOrder;
  fileView: FileView;
  isLoading: boolean;
  searchValue: string;
};

export type FileReducerFunction<P = void> = ReducerFunction<FileState, P>;

export type FileExtraReducerFunction = ExtraReducerFunction<FileState>;
