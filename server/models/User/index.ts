import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';
import { User as UserType } from './types';

const User = model<UserType>(
  'User',
  new Schema<UserType>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    diskSpace: { type: Number, default: 1024 ** 3 * 10 },
    usedSpace: { type: Number, default: 0 },
    avatar: { type: String },
    files: [{ type: ObjectId, ref: 'File' }]
  })
);

export default User;

export { UserType };
