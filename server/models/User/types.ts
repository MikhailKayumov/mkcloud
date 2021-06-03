import { ObjectId } from 'mongoose';

type RequirementUserFields = {
  id: string;
  email: string;
  password: string;
};
type NotRequirementUserFields = {
  diskSpace?: number;
  usedSpace?: number;
  avatar?: string;
  files?: ObjectId[];
};

export type User = RequirementUserFields & NotRequirementUserFields;
