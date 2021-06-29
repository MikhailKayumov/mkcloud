import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import { RefreshTokenModelType } from 'models/types';

const TokenModel = model<RefreshTokenModelType>(
  'RefreshToken',
  new Schema<RefreshTokenModelType>({
    user: { type: ObjectId, ref: 'User', required: true },
    token: { type: String, required: true }
  })
);

export default TokenModel;
