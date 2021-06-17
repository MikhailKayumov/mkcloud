import path from 'path';
import { mkdir, rm } from 'fs/promises';

import config from 'config';

import { File } from '../models/File/types';

const userFileDir = config.get<string>('userFileDir');

class FileService {
  async createDir(dir: File): Promise<void> {
    const dirPath = path.resolve(userFileDir, dir.user.toString(), dir.path);
    return await mkdir(dirPath);
  }

  async deleteFile(file: File): Promise<void> {
    return await rm(this.getPath(file), {
      force: true,
      recursive: true
    });
  }

  getPath(file: File): string {
    return path.resolve(
      config.get('userFileDir'),
      file.user.toString(),
      file.path
    );
  }
}

export default new FileService();
