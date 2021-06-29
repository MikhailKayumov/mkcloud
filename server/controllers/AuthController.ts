import config from 'config';
import { NextFunction, Response, Request } from 'express';
import { Result, validationResult } from 'express-validator';
import { ObjectId } from 'mongodb';

import {
  RegistrationRequest,
  RegistrationResponse,
  LoginRequest,
  LoginResponse,
  BodyRequest
} from './types';

import { DBModel, RefreshTokenModelType, UserModelType } from 'models/types';

import FileService from 'services/FileService';
import UserService from 'services/UserService';
import TokenService from 'services/TokenService';

import UserDto from 'dot/UserDto';

import RequestError from 'errors/RequestError';

class AuthController {
  public async registration(
    req: RegistrationRequest,
    res: RegistrationResponse,
    next: NextFunction
  ) {
    let user: UserModelType | null = null;
    try {
      this.validateRegistrationData(req);

      user = await UserService.registration(req.body);
      await FileService.createRootDir(user._id);
      const token = await this.createToken(res, user);

      return res.json({ token, user: new UserDto(user) });
    } catch (e) {
      await UserService.delete(user?._id);
      next(e);
    }
  }

  public async login(
    req: LoginRequest,
    res: LoginResponse,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;

      const user = await UserService.login(email, password);
      const token = await this.createToken(res, user);

      return res.json({ token, user: new UserDto(user) });
    } catch (e) {
      next(e);
    }
  }

  public async logout(req: Request, res: Response) {
    const rTokenId = new ObjectId(req.cookies.refresh_token || undefined);
    await TokenService.removeRefreshToken(rTokenId);
    res.status(204).send();
  }

  public async refresh(
    req: BodyRequest,
    res: LoginResponse,
    next: NextFunction
  ) {
    const rTokenId = new ObjectId(req.cookies.refresh_token || undefined);

    try {
      const rToken = await TokenService.getRefreshToken(rTokenId);
      const userData = TokenService.validateRefreshToken(rToken.token);
      const user = await UserService.getById(userData?.userId);
      const token = await this.createToken(res, user, rToken);

      return res.json({ token, user: new UserDto(user) });
    } catch (e) {
      await TokenService.removeRefreshToken(rTokenId);
      next(e);
    }
  }

  private async createToken(
    res: Response,
    user: UserModelType,
    oldRToken?: DBModel<RefreshTokenModelType>
  ): Promise<string> {
    const { aToken, rToken } = TokenService.generateTokens({
      userId: user._id,
      email: user.email
    });

    let rTokenId: string;
    if (oldRToken) {
      oldRToken.token = rToken;
      await oldRToken.save();
      rTokenId = oldRToken._id.toHexString();
    } else {
      rTokenId = await TokenService.saveRefreshToken(user._id, rToken);
    }

    res.cookie('refresh_token', rTokenId, {
      maxAge: config.get<number>('jwtRefreshTokenLive'),
      httpOnly: true
    });

    return aToken;
  }

  private validateRegistrationData(req: RegistrationRequest): void {
    const validateErrors: Result = validationResult(req);
    if (!validateErrors.isEmpty()) {
      RequestError.badRequest(
        'Ошибка при регистрации',
        validateErrors.array().map((e) => e.msg)
      );
    }
  }
}

export default new AuthController();
