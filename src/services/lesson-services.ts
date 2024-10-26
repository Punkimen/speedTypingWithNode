import {ApiError} from "../exeptions/api-errors";
import {tokenServices} from "./token.services";
import {StatsModel} from "../db/statistic-scheme";
import {LessonModel} from "../db/lesson-scheme";

interface LessonData {
  success_percent: number;
  accuracy: number;
}

class LessonServices {
  async createLesson(data: LessonData, token?: string) {
    if (!token) {
      throw ApiError.UnauthorizedError();
    }
    const userId = await tokenServices.validateToken(token).then((res)  => res && res.id);
    if (!userId) {
      throw ApiError.UnauthorizedError();
    }

    const {success_percent, accuracy} = data;
    if (!success_percent || !accuracy) {
      throw ApiError.BadRequest('Данные не пришли');
    }

    const stats = await StatsModel.findOne({user_id: userId});
    if (!stats) {
      const createdStats = await StatsModel.create({user_id: userId});
    }

    const lesson = await LessonModel.create({user_id: userId, accuracy, success_percent});
    return lesson;
  }
}

export default new LessonServices;