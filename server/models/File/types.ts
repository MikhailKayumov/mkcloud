import { ObjectId } from 'mongodb';

export type File = {
  id: ObjectId;
  name: string;
  type: string;
  accessLink: string;
  size: number;
  path: string;
  date: Date;
  user: ObjectId;
  parent: ObjectId;
  childs: ObjectId[];
};
