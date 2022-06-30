import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { Request, Response } from 'express';

export const errorHandler = (err: any, req: Request, res: Response) => {
  console.log(`[ERROR] : ${err.message}`);
  const statusCode = (err.httpStatusCode || INTERNAL_SERVER_ERROR);
  return res.status(statusCode).json({
    status: err.statusCode || '500',
    message: err.message
  });
};