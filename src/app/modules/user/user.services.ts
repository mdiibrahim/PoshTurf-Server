import { IUser } from './user.interface';
import { User } from './user.model';

const createUserInDB = async (user: IUser) => {
  const existingUser = await User.isUserExists(user.email);
  if (existingUser) {
    throw new Error('User already exists!!!');
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
