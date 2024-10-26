import {NextFunction, Request, Response} from 'express';
import mongoose from "mongoose";
import {StatsModel} from "../db/statistic-scheme";
import {LessonModel} from "../db/lesson-scheme";
import {tokenServices} from "../services/token.services";
import {ApiError} from "../exeptions/api-errors";
import LessonServices from "../services/lesson-services";


interface CustomRequest<T = {}> extends Request {
  body: T
}

interface LessonData {
  success_percent: number;
  accuracy: number;
}

export class LessonsController {
  async createLesson(req: CustomRequest<LessonData>, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization?.split(' ')[1]
    try {
     const lesson = await LessonServices.createLesson(req.body, authToken);
     res.json(lesson);
    } catch (e){
      next(e);
    }

  }
}