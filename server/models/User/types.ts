import { ObjectId } from 'mongodb';

export type User = {
  id: string;
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
  avatar: string;
  files: ObjectId[];
};
