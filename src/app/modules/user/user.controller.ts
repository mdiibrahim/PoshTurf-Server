import { Request, Response } from 'express';
import { UserServices } from './user.services';
import { UserValidation } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodParseUserData = UserValidation.userValidationSchema.parse(user);
    const result = await UserServices.createUserInDB(zodParseUserData);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User registered successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error!!!',
      err,
    });
  }
};

export const UserController = {
  createUser,
};
