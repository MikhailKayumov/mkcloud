import path from 'path';
import { existsSync } from 'fs';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import User from '../models/User';
import File, { FileType } from '../models/File';

import FileService from '../services/FileService';
import config from 'config';
import { UploadedFile } from 'express-fileupload';

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
      const parentDir = await File.findOne({ _id: parent });

      if (parentDir) {
        dir.path = path.join(parentDir.path, dir.name);
        await FileService.createDir(dir);

        parentDir.childs.push(dir.id);
        parentDir.save();
      } else {
        dir.path = name;
        await FileService.createDir(dir);
      }

      await dir.save();

      return res.json({
        id: dir.id,
        type: dir.type,
        name: dir.name,
        size: dir.size,
        path: dir.path,
        accessLink: dir.accessLink || '',
        user: dir.user,
        parent: dir.parent,
        childs: dir.childs,
        date: dir.date
      });
    } catch (e) {
      console.log(e.message);
      return res.status(400).json({ message: e.message });
    }
  }

  async getFiles(
    {
      params: { userId: user },
      query: { parent }
    }: Request<{ userId: ObjectId }>,
    res: Response<FileType[] | { message: string }>
  ) {
    try {
      const parentDir = parent ? new ObjectId(parent.toString()) : undefined;
      const files = await File.find({ user, parent: parentDir });

      return res.status(200).json(
        files.map((file) => ({
          id: file.id,
          type: file.type,
          name: file.name,
          size: file.size,
          path: file.path,
          accessLink: file.accessLink || '',
          user: file.user,
          parent: file.parent,
          childs: file.childs,
          date: file.date
        }))
      );
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
        path: parentDir?.path,
        parent: parentDir?.id,
        user: user.id
      });

      await dbFile.save();
      await user.save();

      return res.status(201).json({
        id: dbFile.id,
        type: dbFile.type,
        name: dbFile.name,
        size: dbFile.size,
        path: dbFile.path,
        accessLink: dbFile.accessLink || '',
        user: dbFile.user,
        parent: dbFile.parent,
        childs: dbFile.childs,
        date: dbFile.date
      });
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

      const filePath: string = path.resolve(
        config.get('userFileDir'),
        userId.toString(),
        file?.path || '',
        file?.name || ''
      );
      if (existsSync(filePath)) return res.status(200).download(filePath);

      return res.status(400).json({ message: 'File not found' });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
}

export default new FileController();
