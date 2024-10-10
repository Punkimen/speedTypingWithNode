import {Request, Response} from 'express';
import {UserModel} from "../db/user-scheme";

interface CustomRequest<T = {}> extends Request {
  body: T
}

interface LoginData {
  name: string;
  password: string;
}

export class UserController {
  async getUser(req: Request, res: Response) {
    const {id} = req.query
    if (id) {
      const testUsers = await UserModel.findOne({_id: id});
      res.json(testUsers);
      return;
    }
    const users = await UserModel.find();
    res.json(users);
  }

  async  createUser(req: CustomRequest<LoginData>, res: Response) {
    console.log('req.body', req.body);
    const {name, password} = req.body;
    if (!name || !password) {
      res.sendStatus(404);
      return;
    }
    const isNameBusy = await UserModel.findOne({name});
    if (isNameBusy) {
      console.log('isNameBusy', isNameBusy)
      res.send('Name is busy');
      return;
    }
    const newUser = await UserModel.create({name, password})
    console.log('newUser', newUser);
    res.json(newUser);
  }

  async deleteUser(req: Request, res: Response) {
    const {id} = req.body;
    if (!id) {
      res.sendStatus(404);
      return;
    }
    const deletedUser = await UserModel.deleteOne({_id: id});
    if (!deletedUser) {
      res.sendStatus(404);
      return;
    }
    res.json(deletedUser);
  }
}