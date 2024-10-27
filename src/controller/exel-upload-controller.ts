import {Request, Response, NextFunction} from "express";
import exelUploadServices from "../services/exel-upload-services";
import path from "node:path";
class exelUploadController {
  async uploadTextFromExel (req: Request, res: Response, next: NextFunction) {
    try {
     const result = await  exelUploadServices.uploadToDb(path.resolve(__dirname, '../../../bd/texts.xlsx'));
      res.json(result);
    }catch (e) {
      next(e)
    }
  }
}

export default new exelUploadController();