import { mkdir } from 'fs/promises';
import path from 'path';
import config from 'config';
import { File } from '../models/File/types';

const userFileDir = config.get<string>('userFileDir');

class FileService {
  async createDir(dir: File): Promise<void> {
    const dirPath = path.resolve(userFileDir, dir.user?.toString(), dir.path);
    return await mkdir(dirPath);
  }
}

export default new FileService();
