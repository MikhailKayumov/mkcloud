import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { User } from './types';

const User = model<User>(
  'User',
  new Schema<User>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    diskSpace: { type: Number, default: 1024 ** 3 * 10 },
    usedSpace: { type: Number, default: 0 },
    avatar: { type: String },
    files: [{ type: ObjectId, ref: 'File' }]
  })
);

export default User;
