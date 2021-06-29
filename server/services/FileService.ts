import path from 'path';
import { mkdir, rm } from 'fs/promises';
import { UploadedFile } from 'express-fileupload';

import config from 'config';

import { FileModelType } from 'models/types';
import { ObjectId } from 'mongodb';
import FileModel from 'models/FileModel';
import FileDto from 'dot/FileDto';
import { existsSync } from 'fs';
import RequestError from 'errors/RequestError';

class FileService {
  private readonly userFileDir: string;

  constructor(userFileDir: string) {
    this.userFileDir = userFileDir;
  }

  public async getDirectories(
    user: ObjectId,
    parentDir: ObjectId | undefined,
    like: string
  ): Promise<FileDto[]> {
    const directories = await FileModel.find({
      user,
      name: { $regex: `.*${like}.*` },
      parent: parentDir,
      type: 'dir'
    });

    return directories.map((directory) => new FileDto(directory));
  }

  public async getFiles(
    user: ObjectId,
    parentDir: ObjectId | undefined,
    like: string
  ): Promise<FileDto[]> {
    const files = await FileModel.find({
      user,
      name: { $regex: `.*${like}.*` },
      parent: parentDir,
      $nor: [{ type: 'dir' }]
    });

    return files.map((file) => new FileDto(file));
  }

  public async createRootDir(userId: ObjectId): Promise<FileModelType> {
    const dir = await new FileModel({
      name: userId,
      type: 'dir',
      user: userId
    });
    await mkdir(this.getPath(dir));
    return dir;
  }

  public async createDir(
    name: string,
    userId: ObjectId,
    parent: ObjectId | undefined
  ): Promise<FileDto> {
    const parentDir = await FileModel.findById(parent);

    const dir = await FileModel.create({
      name: name,
      type: 'dir',
      user: userId,
      parent,
      path: path.join(parentDir?.path || '', name)
    });

    parentDir?.children.push(dir._id);
    await parentDir?.save();

    await mkdir(this.getPath(dir));

    return new FileDto(dir);
  }

  public async deleteFile(fileId: ObjectId): Promise<number> {
    const file = await FileModel.findById(fileId);
    if (!file) {
      throw new RequestError('File not found', 400);
    }

    let freeSpace = file.size;
    if (file.children.length) {
      await Promise.all(
        file.children.map(async (childId) => {
          freeSpace += await this.deleteFile(childId);
        })
      );
    }

    await file.remove();
    await rm(this.getPath(file), {
      force: true,
      recursive: true
    });

    return freeSpace;
  }

  public getPath(file: FileModelType): string {
    return path.resolve(this.userFileDir, file.user.toString(), file.path);
  }

  public async uploadFile(
    user: ObjectId,
    parent: string | undefined,
    file: UploadedFile
  ): Promise<FileDto> {
    const parentDir = await FileModel.findOne({ user, _id: parent });

    const filePath: string = path.resolve(
      config.get('userFileDir'),
      user.toHexString(),
      parentDir?.path || '',
      file.name
    );
    if (existsSync(filePath)) {
      throw new RequestError('File already exist', 400);
    }

    await file.mv(filePath);
    const type = file.name.split('.').pop();
    const dbFile = await FileModel.create({
      name: file.name,
      type,
      size: file.size,
      path: path.join(parentDir?.path || '', file.name),
      parent: parentDir?.id,
      user
    });

    parentDir?.children.push(dbFile._id);
    await parentDir?.save();

    return new FileDto(dbFile);
  }

  public async downloadFile(fileId: ObjectId): Promise<string> {
    const file = await FileModel.findById(fileId);
    if (!file) {
      throw new RequestError('File not found', 400);
    }

    const filePath: string = this.getPath(file);
    if (!existsSync(filePath)) {
      throw new RequestError('File not found', 400);
    }

    return filePath;
  }
}

export default new FileService(config.get<string>('userFileDir'));
