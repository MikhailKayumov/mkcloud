import path from 'path';
import { Request, Response } from 'express';

import File, { FileType } from '../models/File';

import FileService from '../services/FileService';
import { FilterQuery } from 'mongoose';

class FileController {
  async createDir(
    req: Request<{ userId: string }>,
    res: Response<FileType | { message: string }>
  ) {
    try {
      const { name, type, parent } = req.body;
      const { userId: user } = req.params;

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
    req: Request<{ userId: string }>,
    res: Response<FileType[] | { message: string }>
  ) {
    try {
      const { userId: user } = req.params;
      const parent = req.query.parent;

      const files = await File.find({ user, parent } as FilterQuery<FileType>);
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
}

export default new FileController();
