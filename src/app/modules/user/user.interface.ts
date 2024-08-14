/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
export type IRole = 'admin' | 'user';
export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: IRole;
  address: string;
}

export interface UserModel extends Model<IUser> {
  isUserExists(email: string): Promise<IUser> | null;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
