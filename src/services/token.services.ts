import jwt from 'jsonwebtoken';
import {TokenModel} from "../db/token-scheme";

interface IPayloadUser {
  id: unknown;
}
class TokenServices {
  createToken(payload: IPayloadUser) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY || 'access-key', {expiresIn: '30m'});
    const refreshToken = jwt.sign(payload,process.env.REFRESH_TOKEN_KEY || 'refresh-key', {expiresIn: '30d'});

    return {accessToken, refreshToken}
  }

  async saveToken (userId: unknown, refreshToken: string) {
    const tokenData = await TokenModel.findOne({user_id: userId})
    if(tokenData){
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = TokenModel.create({user_id: userId, refreshToken})
    return token
  }
}

export const tokenServices = new TokenServices();