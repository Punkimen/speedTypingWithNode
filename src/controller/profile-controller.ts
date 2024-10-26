import {NextFunction, Request, Response} from 'express';
import ProfileServices from "../services/profile-services";

export class ProfileController {
  async getStats(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization?.split(' ')[1]
    try {
      const result = await ProfileServices.getStats(authToken);
      res.json(result);
    }catch (e) {
      next(e);
    }
  }
}