import { Schema, model } from 'mongoose';
import { UserModelType } from './types';

const UserModel = model<UserModelType>(
  'User',
  new Schema<UserModelType>({
    email: { type: String, required: true, unique: true, trim: true },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    diskSpace: { type: Number, default: 1024 ** 3 * 10 },
    usedSpace: { type: Number, default: 0 },
    avatar: { type: String }
  })
);

export default UserModel;
