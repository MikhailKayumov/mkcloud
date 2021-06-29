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
  id: string;
  name: string;
  type: string;
  size: number;
  date: Date;
};

export type MyUploadFile = {
  id: number;
  name: string;
  progress: number;
};

export type FileState = {
  files: MyFile[];
  directories: MyFile[];
  currentDir: string;
  uploadFiles: MyUploadFile[];
  sortBy: FileSort;
  order: FileOrder;
  fileView: FileView;
  searchValue: string;
  isLoading: boolean;
  creatingDir: boolean;
};

export type FileReducerFunction<P = void> = ReducerFunction<FileState, P>;

export type FileExtraReducerFunction = ExtraReducerFunction<FileState>;

export type GetFilesRequest = {
  parent: string;
  like: string;
};

export type GetFilesResponse = {
  files: MyFile[];
  directories: MyFile[];
};

export type CreateDirRequest = {
  parent: string;
  name: string;
};
