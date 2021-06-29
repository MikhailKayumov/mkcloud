import config from 'config';
import { ObjectId } from 'mongodb';
import { sign, verify } from 'jsonwebtoken';

import TokenModel from 'models/TockenModel';
import { DBModel, RefreshTokenModelType } from 'models/types';
import { JWTData, JWTokens } from 'controllers/types';

import RequestError from 'errors/RequestError';

class TokenService {
  private readonly jwtAccessSecret: string;
  private readonly jwtRefreshSecret: string;
  private readonly jwtAccessTokenLive: number;
  private readonly jwtRefreshTokenLive: number;

  constructor(
    jwtAccessSecret: string,
    jwtRefreshSecret: string,
    jwtAccessTokenLive: number,
    jwtRefreshTokenLive: number
  ) {
    this.jwtAccessSecret = jwtAccessSecret;
    this.jwtRefreshSecret = jwtRefreshSecret;
    this.jwtAccessTokenLive = jwtAccessTokenLive;
    this.jwtRefreshTokenLive = jwtRefreshTokenLive;
  }

  public generateTokens(payload: JWTData): JWTokens {
    const aToken = sign(payload, this.jwtAccessSecret, {
      expiresIn: this.jwtAccessTokenLive
    });
    const rToken = sign(payload, this.jwtRefreshSecret, {
      expiresIn: this.jwtRefreshTokenLive
    });
    return { aToken, rToken };
  }

  public async getRefreshToken(
    id: ObjectId
  ): Promise<DBModel<RefreshTokenModelType>> {
    const token = await TokenModel.findById(id);
    if (!token) {
      throw new RequestError('Пользователь не авторизован', 401);
    }
    return token;
  }

  public async saveRefreshToken(
    user: ObjectId,
    token: string
  ): Promise<string> {
    const newToken = await TokenModel.create({ user, token });
    return newToken._id.toHexString();
  }

  public async removeRefreshToken(token: ObjectId): Promise<void> {
    await TokenModel.findByIdAndDelete(token);
  }

  public validateAccessToken(token: string): JWTData | null {
    return this.validateToken(token, this.jwtAccessSecret);
  }

  public validateRefreshToken(token: string): JWTData | null {
    return this.validateToken(token, this.jwtRefreshSecret);
  }

  private validateToken(token: string, secretKey: string): JWTData | null {
    try {
      return verify(token, secretKey) as JWTData;
    } catch {
      return null;
    }
  }
}

export default new TokenService(
  config.get<string>('jwtAccessSecret'),
  config.get<string>('jwtRefreshSecret'),
  config.get<number>('jwtAccessTokenLive'),
  config.get<number>('jwtRefreshTokenLive')
);
