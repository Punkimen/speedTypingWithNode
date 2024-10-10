import {Request, Response} from 'express';
import mongoose from "mongoose";
import {StatsModel} from "../db/statistic-scheme";

export class ProfileController {
  async getStats(req: Request, res: Response){

    console.log('new mongoose.Types.ObjectId(USER_ID)', new mongoose.Types.ObjectId(process.env.USER_ID))
    const stats = await StatsModel.findOne({user_id: '6702c988b0a4a20fdce6a53a'});
    console.log('stats', stats);
    if(!stats){
      res.sendStatus(404);
      return;
    }
    res.json(stats);

  }
}