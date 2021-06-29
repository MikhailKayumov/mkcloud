import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { ObjectId } from 'mongodb';

import FileService from '../services/FileService';
import UserService from 'services/UserService';

import {
  BodyRequest,
  CreateDirRequest,
  CreateDirResponse,
  DeleteFileRequest,
  DeleteFileResponse,
  DownloadFileRequest,
  GetFilesRequest,
  GetFilesResponse,
  UploadFileRequest,
  UploadFileResponse
} from 'controllers/types';

import UserDto from 'dot/UserDto';
import RequestError from 'errors/RequestError';

class FileController {
  public async getFiles(
    req: GetFilesRequest,
    res: GetFilesResponse,
    next: NextFunction
  ) {
    try {
      const userId = req.body.jwt.userId;
      const { parent, like } = req.query;
      const parentDir = parent ? new ObjectId(parent) : undefined;

      const result = await Promise.all([
        FileService.getDirectories(userId, parentDir, like),
        FileService.getFiles(userId, parentDir, like)
      ]);

      return res.json({
        directories: result[0],
        files: result[1]
      });
    } catch (e) {
      next(e);
    }
  }

  public async createDir(
    req: CreateDirRequest,
    res: CreateDirResponse,
    next: NextFunction
  ) {
    try {
      const { userId } = req.body.jwt;
      const { name, parent } = req.body;
      const parentDir = parent ? new ObjectId(parent) : undefined;
      const dir = await FileService.createDir(name, userId, parentDir);
      return res.json({ dir });
    } catch (e) {
      next(e);
    }
  }

  public async uploadFile(
    req: UploadFileRequest,
    res: UploadFileResponse,
    next: NextFunction
  ) {
    let size = 0;
    const userId = new ObjectId(req.body.jwt.userId);

    try {
      const { parent } = req.body;

      const file = req.files?.file as UploadedFile;
      if (!file) {
        throw new RequestError('File not received', 400);
      }

      size = await UserService.changeUsedSpace(userId, file.size);
      const dbFile = await FileService.uploadFile(userId, parent, file);

      return res.status(201).json({ file: dbFile, size });
    } catch (e) {
      await UserService.changeUsedSpace(userId, -size);
      next(e);
    }
  }

  public async downloadFile(
    req: DownloadFileRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const fileId = new ObjectId(req.query.fileId);
      const downloadPath = await FileService.downloadFile(fileId);
      return res.status(200).download(downloadPath);
    } catch (e) {
      next(e);
    }
  }

  public async deleteFile(
    req: DeleteFileRequest,
    res: DeleteFileResponse,
    next: NextFunction
  ) {
    try {
      const fileId = new ObjectId(req.query.fileId);
      const freeSpace = await FileService.deleteFile(fileId);
      await UserService.changeUsedSpace(req.body.jwt.userId, -freeSpace);
      return res.json({ size: freeSpace });
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(
    req: BodyRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.getById(req.body.jwt.userId);

      const avatar = req.files?.file as UploadedFile;
      user.avatar = await FileService.uploadAvatar(avatar);
      await user.save();

      return res.json(new UserDto(user));
    } catch (e) {
      next(e);
    }
  }

  public async deleteAvatar(
    req: BodyRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.getById(req.body.jwt.userId);
      await FileService.deleteAvatar(user.avatar);
      user.avatar = '';
      await user.save();
      return res.json(new UserDto(user));
    } catch (e) {
      next(e);
    }
  }
}

export default new FileController();
