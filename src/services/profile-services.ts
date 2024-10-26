import {ApiError} from "../exeptions/api-errors";
import {tokenServices} from "./token.services";
import {StatsModel} from "../db/statistic-scheme";

class ProfileServices {
  async getStats(token?: string) {
    if (!token) {
      throw ApiError.UnauthorizedError()
    }
    const tokenInfo = await tokenServices.validateToken(token);
    if (!tokenInfo?.id) {
      throw ApiError.UnauthorizedError();
    }
    const stats = await StatsModel.findOne({user_id: tokenInfo.id});
    if (!stats) {
      throw ApiError.BadRequest('У вас ещё нет статистики');
    }
    return stats;
  }
}

export default new ProfileServices();