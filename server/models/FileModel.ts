import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import { FileModelType } from './types';

const FileModel = model<FileModelType>(
  'File',
  new Schema<FileModelType>({
    type: { type: String, required: true },
    name: { type: String, required: true },
    path: { type: String, default: '' },
    size: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    user: { type: ObjectId, ref: 'User' },
    parent: { type: ObjectId, ref: 'File' },
    children: [{ type: ObjectId, ref: 'File' }]
  })
);

export default FileModel;
