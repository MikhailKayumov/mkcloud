import { ObjectId } from 'mongoose';

type RequirementUserFields = {
  email: string;
  password: string;
};
type NotRequirementUserFields = {
  diskSpace?: number;
  usedSpace?: number;
  avatar?: { type: String };
  files?: ObjectId[];
};

export type User = RequirementUserFields & NotRequirementUserFields;