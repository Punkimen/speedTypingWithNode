import {Request, Response, NextFunction} from "express";
import TextsServices from "../services/texts-services";

class TextsController {
  async getTexts (req: Request, res: Response, next: NextFunction){
    try {
      const texts = await TextsServices.getTexts(req.query.id as string);
      res.json(texts);
    }catch (e) {
      next(e);
    }
  }
}

export default new TextsController();