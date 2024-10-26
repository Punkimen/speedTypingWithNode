import jwt from 'jsonwebtoken';
import {TokenModel} from "../db/token-scheme";

export interface IPayloadUser {
  id: unknown;
}

class TokenServices {
  createToken(payload: IPayloadUser) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY || 'access-key', {expiresIn: '30m'});
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY || 'refresh-key', {expiresIn: '30d'});

    return {accessToken, refreshToken}
  }

  async saveToken(userId: unknown, refreshToken: string) {
    const tokenData = await TokenModel.findOne({user_id: userId})
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = TokenModel.create({user_id: userId, refreshToken})
    return token
  }

  async deleteToken(refreshToken: string) {
    const tokenData = await TokenModel.deleteOne({refreshToken});
    return tokenData
  }

  async validateToken(token: string, tokenType: 'refresh' | 'access' = 'access'): Promise<IPayloadUser | null> {
    const keyVerifyToken = tokenType === 'access' ? process.env.ACCESS_TOKEN_KEY : process.env.REFRESH_TOKEN_KEY;
    if (!keyVerifyToken) {
      throw new Error('Нет ключа');
      return null;
    }
    try {
      console.log('token', token, keyVerifyToken)
      const verify  = await jwt.verify(token, keyVerifyToken);
      console.log('verify', verify)
      if (verify) {
        return verify as IPayloadUser
      } else {
        return null
      }
    } catch (e) {
      console.log('validateToken error', e);
      // throw new Error('Нет ключа');
      return null;
    }
  }
}

export const tokenServices = new TokenServices();