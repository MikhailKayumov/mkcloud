import { UserModelType } from 'models/types';

export default class UserDto {
  public id: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public diskSpace: number;
  public usedSpace: number;
  public avatar: string;

  constructor(user: UserModelType) {
    this.id = user._id.toHexString();
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.diskSpace = user.diskSpace;
    this.usedSpace = user.usedSpace;
    this.avatar = user.avatar;
  }
}
