import { Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
}

export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(email: string): Promise<IUser> | null;
}
