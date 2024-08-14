import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utilis/catchAsync';

const validateRequest = (zodSchema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await zodSchema.parseAsync(req.body, req.cookies);
    next();
  });
};
export default validateRequest;
