import { ParsedQs } from 'qs';
import { Request as ERequest, Response } from 'express';
import { ObjectId } from 'mongodb';
import UserDto from 'dot/UserDto';
import FileDto from 'dot/FileDto';

export type ErrorResponse = {
  message: string;
  errors: string[];
};

type MyObject<T = unknown> = Record<string | symbol | number, T>;

export type JWTokens = {
  aToken: string;
  rToken: string;
};
export type JWTData = {
  userId: ObjectId;
  email: string;
};
type WithJWT<Body = MyObject> = Body & {
  jwt: JWTData;
};

export type LoginRequestData = {
  email: string;
  password: string;
};
export type LoginResponseData = {
  token: string;
  user: UserDto;
};

export type RegistrationRequestData = LoginRequestData & {
  firstname: string;
  lastname: string;
};
export type RegistrationResponseData = LoginResponseData;

export type GetFilesParams = {
  parent: string;
  like: string;
};
export type GetFilesResponseData = {
  directories: FileDto[];
  files: FileDto[];
};

export type CreateDirRequestsData = {
  name: string;
  parent: string;
};
export type CreateDirResponseData = { dir: FileDto };

export type UploadFileRequestData = { parent: string };
export type UploadFileResponseData = { file: FileDto; size: number };

export type DeleteFileParams = {
  fileId: string;
};
export type DeleteFileResponseData = { size: number };

export type DownloadFileParams = {
  fileId: string;
};

// Requests
export type BodyRequest<
  ReqB = MyObject,
  ResB = MyObject,
  P = MyObject
> = ERequest<P, ResB, WithJWT<ReqB>>;
export type QueryRequest<
  ReqQ = ParsedQs,
  ResB = MyObject,
  P = MyObject
> = ERequest<P, ResB, WithJWT, ReqQ>;

export type LoginRequest = BodyRequest<LoginRequestData>;
export type RegistrationRequest = BodyRequest<RegistrationRequestData>;
export type GetFilesRequest = QueryRequest<GetFilesParams>;
export type CreateDirRequest = BodyRequest<CreateDirRequestsData>;
export type UploadFileRequest = BodyRequest<UploadFileRequestData>;
export type DeleteFileRequest = QueryRequest<DeleteFileParams>;
export type DownloadFileRequest = QueryRequest<DownloadFileParams>;

// Responses
export type LoginResponse = Response<LoginResponseData>;
export type RegistrationResponse = Response<RegistrationResponseData>;
export type GetFilesResponse = Response<GetFilesResponseData>;
export type CreateDirResponse = Response<CreateDirResponseData>;
export type UploadFileResponse = Response<UploadFileResponseData>;
export type DeleteFileResponse = Response<DeleteFileResponseData>;
