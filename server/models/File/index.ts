import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import { File as FileType } from './types';

const File = model<FileType>(
  'File',
  new Schema<FileType>({
    type: { type: String, required: true },
    name: { type: String, required: true },
    path: { type: String, default: '' },
    size: { type: Number, default: 0 },
    date: { type: Date, default: Date.now() },
    accessLink: { type: String },
    user: { type: ObjectId, ref: 'User' },
    parent: { type: ObjectId, ref: 'File' },
    childs: [{ type: ObjectId, ref: 'File' }]
  })
);

export default File;

export { FileType };
