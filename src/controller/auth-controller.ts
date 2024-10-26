import {Request, Response} from 'express';
import {UserModel} from "../db/user-scheme";
import {tokenServices} from "../services/token.services";
import bcrypt from 'bcrypt';
import {Error} from "mongoose";

interface CustomRequest<T = {}> extends Request {
  body: T
}

interface LoginData {
  email: string;
  password: string;
}

export class AuthController {
  async getActivatedLink(req: Request, res: Response) {
  }

  async getRefreshToken(req: Request, res: Response) {
  }

  async registration(req: CustomRequest<LoginData>, res: Response) {
    const {email, password} = req.body;
    if (!email || !password) {
      res.sendStatus(404);
      return;
    }
    const isNameBusy = await UserModel.findOne({email: email});
    if (isNameBusy) {
      res.send('Name is busy');
      return;
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const newUser = await UserModel.create({email, password: hashPassword});
    if (!newUser) {
      res.statusCode = 404;
      res.send('Error');
      return;
    }
    const tokens = tokenServices.createToken({id: newUser._id});
    await tokenServices.saveToken(newUser._id, tokens.refreshToken);
    res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true});
    res.json({...tokens, newUser});
  }

  async login(req: CustomRequest<LoginData>, res: Response) {
    const {email, password} = req.body;
    if (!email || !password) {
      res.sendStatus(404);
      return;
    }
    const user = await UserModel.findOne({email});
    if (!user) {
      res.statusCode = 404;
      res.send('Неверный логин или пароль')
      return;
    }
    const userHashPass = user.password || '';
    const isRightPass = await bcrypt.compare(password, userHashPass);

    if (!isRightPass) {
      res.statusCode = 404;
      res.send('Неверный логин или пароль')
      return;
    }

    const tokens = tokenServices.createToken({id: user._id});
    await tokenServices.saveToken(user._id, tokens.refreshToken);
    res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true});
    res.json({...tokens, user});

  }

  async logout(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
      res.status(401).send('Пользователь не авторизован');
      return;
    }
    try{
      await tokenServices.deleteToken(refreshToken);
      res.clearCookie('refreshToken', {
        httpOnly: true,
      });
      
      res.send('Вы вышли из аккаунта');
    }catch (e) {
      console.log('error', e)
      //@ts-ignore
      res.status(500).send(`Ошибка: ${e.message}`)
    }

  }

  async verify(req: Request, res: Response) {
    const authToken = req.headers.authorization?.split(' ')[1]
    if (!authToken) {
      res.status(401).send('Пользователь не авторизован')
      return;
    }
    try {
      const isVerify = await tokenServices.validateToken(authToken);
      console.log('isVerify', isVerify);
      res.send('test verify')
    }catch (e) {
      res.status(401).send('Пользователь не авторизован');
      return;
    }
  }
}