import {Request, Response} from 'express';
import mongoose from "mongoose";
import {StatsModel} from "../db/statistic-scheme";
import {LessonModel} from "../db/lesson-scheme";


interface CustomRequest<T = {}> extends Request {
  body: T
}

interface LessonData {
  success_percent: number;
  accuracy: number;
  user_id: string;
}
export class LessonsController {
  async createLesson(req: CustomRequest<LessonData>, res: Response){
    console.log('req.body', req.body);
    const {success_percent, accuracy, user_id} = req.body;
    if (!success_percent || !accuracy || !user_id) {
      res.sendStatus(404);
      return;
    }
    const stats = await StatsModel.findOne({user_id});
    console.log('stats', stats);
    if (!stats) {
      const createdStats = await StatsModel.create({user_id});
      console.log('createdStats', createdStats);
    }
    const lesson = await LessonModel.create({user_id, accuracy, success_percent});
    console.log('lesson', lesson);
    res.json(lesson);
  }
}