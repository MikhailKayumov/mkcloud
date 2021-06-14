import { ObjectId } from 'mongoose';

export type File = {
  id: ObjectId;
  name: string;
  type: string;
  accessLink: string;
  size: number;
  path: string;
  user: ObjectId;
  parent: ObjectId;
  childs: ObjectId[];
};
