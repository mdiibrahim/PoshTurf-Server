import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUserInDB = async (user: IUser) => {
  const existingUser = await User.isUserExists(user.email);
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists!!!');
  }
  const result = await User.create(user);

  const userWithoutSensitiveFields = {
    ...result.toObject(),
    createdAt: undefined,
    updatedAt: undefined,
    password: undefined,
  };

  return userWithoutSensitiveFields;
};

export const UserServices = {
  createUserInDB,
};
