import { ExtraReducerFunction, ReducerFunction } from '../types';

export type MyFile = {
  _id: string;
  type: string;
  name: string;
  path: string;
  size: number;
  accessLink: string;
  user: string;
  parent: string;
  date: string;
  childs: string[];
};

export type MyUploadFile = {
  id: number;
  name: string;
  progress: number;
};

export type FileState = {
  files: MyFile[];
  currentDir: string | null;
  createDirPopupDisplay: boolean;
  dirStack: string[];
  uploadFiles: MyUploadFile[];
};

export type FileReducerFunction<P = void> = ReducerFunction<FileState, P>;

export type FileExtraReducerFunction = ExtraReducerFunction<FileState>;
