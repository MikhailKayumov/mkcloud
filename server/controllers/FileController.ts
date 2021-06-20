import path from 'path';
import { existsSync } from 'fs';

import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { ObjectId } from 'mongodb';

import User from '../models/User';
import File, { FileType } from '../models/File';

import FileService from '../services/FileService';
import config from 'config';

class FileController {
  async createDir(
    {
      body: { name, type, parent },
      params: { userId: user }
    }: Request<{ userId: ObjectId }>,
    res: Response<FileType | { message: string }>
  ) {
    try {
      const dir = new File({ name, type, user, parent });

      const parentDir = await File.findById(parent);
      if (parentDir) {
        dir.path = path.join(parentDir.path, dir.name);
        await FileService.createDir(dir);

        parentDir.childs.push(dir._id);
        parentDir.save();
      } else {
        dir.path = name;
        await FileService.createDir(dir);
      }

      await dir.save();

      return res.json(dir);
    } catch (e) {
      console.log(e.message);
      return res.status(400).json({ message: e.message });
    }
  }

  async getFiles(
    {
      params: { userId: user },
      query: { parent, searchName = '' }
    }: Request<{ userId: ObjectId }>,
    res: Response<
      { directories: FileType[]; files: FileType[] } | { message: string }
    >
  ) {
    try {
      const parentDir = parent ? new ObjectId(parent.toString()) : undefined;

      const directories = await File.find({
        user,
        name: { $regex: `.*${searchName}.*` },
        parent: parentDir,
        type: 'dir'
      });
      const files = await File.find({
        user,
        name: { $regex: `.*${searchName}.*` },
        parent: parentDir,
        $nor: [{ type: 'dir' }]
      });

      return res.status(200).json({ directories, files });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: e.message });
    }
  }

  async uploadFile(
    {
      files,
      params: { userId },
      body: { parent }
    }: Request<{ userId: ObjectId }>,
    res: Response
  ) {
    try {
      const file = files?.file as UploadedFile;
      if (!file) {
        return res.status(400).json({ message: 'File was not received' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: 'Auth error' });
      }

      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({ message: 'There is no space on disk' });
      }

      user.usedSpace = user.usedSpace + file.size;

      const parentDir = await File.findOne({ user: user.id, _id: parent });
      const filePath: string = path.resolve(
        config.get('userFileDir'),
        user.id,
        parentDir?.path || '',
        file.name
      );

      if (existsSync(filePath)) {
        return res.status(400).json({ message: 'File already exist' });
      }

      await file.mv(filePath);

      const type = file.name.split('.').pop();

      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: path.join(parentDir?.path || '', file.name),
        parent: parentDir?.id,
        user: user.id
      });

      parentDir?.childs.push(dbFile._id);
      await parentDir?.save();

      await dbFile.save();
      await user.save();

      return res.status(201).json(dbFile);
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: e.message });
    }
  }

  async downloadFile(
    { params: { userId }, query: { fileId } }: Request<{ userId: ObjectId }>,
    res: Response
  ) {
    try {
      const file = await File.findOne({ _id: fileId, user: userId });
      if (!file) return res.status(400).json({ message: 'File not found' });

      const filePath: string = FileService.getPath(file);
      if (existsSync(filePath)) return res.status(200).download(filePath);

      return res.status(400).json({ message: 'File not found' });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message });
    }
  }

  async deleteFile(
    { query: { fileId }, params: { userId } }: Request<{ userId: ObjectId }>,
    res: Response<string | { message: string }>
  ) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const file = await File.findById(fileId);
      if (!file) {
        return res.status(400).json({ message: 'File not found' });
      }

      if (file.childs.length) {
        await Promise.all(
          file.childs.map(async (childId) => {
            const child = await File.findById(childId);
            user.usedSpace -= child?.size || 0;
            return child?.remove();
          })
        );
      }

      user.usedSpace = Math.max(user.usedSpace - (file?.size || 0), 0);

      await FileService.deleteFile(file);
      await file.remove();
      await user.save();

      return res.json({
        message: `${file.type === 'dir' ? 'Directory' : 'File'} was deleted`
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message });
    }
  }
}

export default new FileController();
