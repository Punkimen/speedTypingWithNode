import {Request, Response} from 'express';
import {UserModel} from "../db/user-scheme";
import {tokenServices} from "../services/token.services";
interface CustomRequest<T = {}> extends Request {
  body: T
}

interface LoginData {
  email: string;
  password: string;
}
export class AuthController {
  async getActivatedLink(req: Request, res: Response) {}
  async getRefreshToken(req: Request, res: Response) {}
  async registration(req: CustomRequest<LoginData>, res: Response) {
    const {email, password} = req.body;
    if (!email || !password) {
      res.sendStatus(404);
      return;
    }
    const isNameBusy = await UserModel.findOne({email: email});
    if (isNameBusy) {
      console.log('isNameBusy', isNameBusy)
      res.send('Name is busy');
      return;
    }
    const newUser = await UserModel.create({email, password});
    if(!newUser) {
      res.sendStatus(404);
      res.send('Error');
      return;
    }
    console.log('newUser', newUser)
    const tokens = tokenServices.createToken({id: newUser._id});
    await tokenServices.saveToken(newUser._id, tokens.refreshToken);
    console.log('tokens', tokens)
    res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true});
    res.json({...tokens, newUser});
  }
  async login(req: Request, res: Response) {}
  async logout(req: Request, res: Response) {}
}