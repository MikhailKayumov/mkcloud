import { ObjectId } from 'mongodb';

export type File = {
  name: string;
  type: string;
  size: number;
  path: string;
  date: Date;
  accessLink: string;
  user: ObjectId;
  parent: ObjectId;
  childs: ObjectId[];
};
