import {Request, Response, NextFunction} from 'express';
import {ApiError} from "../exeptions/api-errors";

export const errorsMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('errorsMiddleware', err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: 'Ошибка на стороне сервера' });
};