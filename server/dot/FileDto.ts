import { FileModelType } from 'models/types';

export default class FileDto {
  private id: string;
  private name: string;
  private type: string;
  private size: number;
  private date: Date;

  constructor(file: FileModelType) {
    this.id = file._id.toHexString();
    this.name = file.name;
    this.type = file.type;
    this.size = file.size;
    this.date = file.date;
  }
}
