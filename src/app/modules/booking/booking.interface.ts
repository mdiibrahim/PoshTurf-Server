import { Types } from 'mongoose';
export type IIsBooking = 'confirmed' | 'canceled';
export interface IBooking {
  facility: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  payableAmount?: number;
  isBooked?: IIsBooking;
}
