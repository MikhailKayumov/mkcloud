import { ExtraReducerFunction, ReducerFunction } from '../types';

export type File = {
  id: string;
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

export type FileState = {
  files: File[];
  currentDir: string | null;
  createDirPopupDisplay: boolean;
  dirStack: string[];
};

export type FileReducerFunction<P = void> = ReducerFunction<FileState, P>;

export type FileExtraReducerFunction = ExtraReducerFunction<FileState>;
