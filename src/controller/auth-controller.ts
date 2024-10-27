import {NextFunction, Request, Response} from 'express';
import {UserModel} from "../db/user-scheme";
import {tokenServices} from "../services/token.services";
import bcrypt from 'bcrypt';
import {Error} from "mongoose";
import {UserData} from "../models/users.modesl";
import AuthServices from "../services/auth-services";

interface CustomRequest<T = {}> extends Request {
  body: T
}



export class AuthController {
  async getActivatedLink(req: Request, res: Response) {
  }

  async getRefreshToken(req: Request, res: Response) {
  }

  async registration(req: CustomRequest<UserData>, res: Response, next: NextFunction) {
    try {
      const {newUser, refreshToken, accessToken} = await AuthServices.registration(req.body)
      res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true});
      res.json({accessToken, refreshToken, newUser});
    }catch (e){
      next(e)
    }
  }

  async login(req: CustomRequest<UserData>, res: Response, next: NextFunction) {
    try {
      const {user, refreshToken, accessToken} = await AuthServices.login(req.body);
      res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true});
      res.json({refreshToken, accessToken, user});
    }catch (e) {
      next(e)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies.refreshToken;

    try {
      await AuthServices.logout(refreshToken);
      res.clearCookie('refreshToken', {
        httpOnly: true,
      });
      res.send('Вы вышли из аккаунта');
    }catch (e){
      next(e)
    }
  }

  async verify(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization?.split(' ')[1]
    try {
      await tokenServices.validateToken(authToken);
      res.send('test verify')
    }catch (e) {
      next(e)
    }
  }
}