import { ObjectId } from 'mongodb';
import { hash, compareSync } from 'bcrypt';

import { RegistrationRequestData } from 'controllers/types';

import UserModel from 'models/UserModel';
import { DBModel, UserModelType } from 'models/types';

import RequestError from 'errors/RequestError';

class UserService {
  public async getById(
    userId: ObjectId | undefined
  ): Promise<DBModel<UserModelType>> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new RequestError(`Пользователь не найден`, 400);
    }
    return user;
  }

  public async registration(
    data: RegistrationRequestData
  ): Promise<UserModelType> {
    const candidate = await UserModel.findOne({ email: data.email });
    if (candidate) {
      RequestError.badRequest(`User with email ${data.email} already exist.`);
    }

    const hashPassword = await hash(data.password, 10);
    return await UserModel.create({
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      password: hashPassword
    });
  }

  public async login(email: string, password: string): Promise<UserModelType> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new RequestError('Неверный email или пароль', 400);
    }

    const isPassValid = compareSync(password, user.password);
    if (!isPassValid) {
      throw new RequestError('Неверный email или пароль', 400);
    }

    return user;
  }

  public async delete(userId: ObjectId | undefined): Promise<void> {
    await UserModel.findByIdAndDelete(userId);
  }

  public async changeUsedSpace(
    userId: ObjectId | undefined,
    size: number
  ): Promise<number> {
    const user = await this.getById(userId);
    if (!user) {
      throw new RequestError('Auth error', 401);
    }

    if (user.usedSpace + size > user.diskSpace) {
      throw new RequestError('There is no space on disk', 401);
    }

    user.usedSpace = Math.max(user.usedSpace + size, 0);
    await user.save();

    return size;
  }
}

export default new UserService();
