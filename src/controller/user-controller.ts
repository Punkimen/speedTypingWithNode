import {NextFunction, Request, Response} from 'express';
import {UserData} from "../models/users.modesl";
import {CustomRequest} from "../models/request.models";
import UserServices from "../services/user-services";

export class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    const id = req.query.id as string
    try{
      const result = await UserServices.getUser(id);
      res.json(result);
    }catch (e) {
      next(e)
    }
  }

  async  createUser(req: CustomRequest<UserData>, res: Response, next: NextFunction) {
    try{
      const result = await UserServices.createUser(req.body)
      res.json(result);
    }catch (e) {
      next(e)
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const id = req.body.id as string;
    try {
      const result = await UserServices.deleteUser(id);
      res.json(result)
    }catch (e) {
      next(e)
    }
  }
}