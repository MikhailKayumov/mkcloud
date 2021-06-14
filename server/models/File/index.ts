import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import { File as FileType } from './types';

const File = model<FileType>(
  'File',
  new Schema<FileType>({
    name: { type: String, required: true },
    type: { type: String, required: true },
    accessLink: { type: String },
    size: { type: Number, default: 0 },
    path: { type: String, default: '' },
    user: { type: ObjectId, ref: 'User' },
    parent: { type: ObjectId, ref: 'File' },
    childs: [{ type: ObjectId, ref: 'File' }]
  })
);

export default File;

export { FileType };
