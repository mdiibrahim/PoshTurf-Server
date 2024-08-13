import { Request, Response } from 'express';
import { UserServices } from './user.services';
import { UserValidation } from './user.validation';
import sendResponse from '../../utilis/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utilis/catchAsync';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const zodParseUserData = UserValidation.userValidationSchema.parse(user);
  const result = await UserServices.createUserInDB(zodParseUserData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
};
