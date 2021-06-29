import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

interface MongoID {
  _id: ObjectId;
}

export interface UserModelType extends MongoID {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
  avatar: string;
}

export interface FileModelType extends MongoID {
  name: string;
  type: string;
  size: number;
  path: string;
  date: Date;
  user: ObjectId;
  parent: ObjectId;
  children: ObjectId[];
}

export interface RefreshTokenModelType extends MongoID {
  user: ObjectId;
  token: string;
}

export type DBModel<T> = T & Pick<Document, 'save'>;
