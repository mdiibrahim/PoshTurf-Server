import { Types } from 'mongoose';

export interface IBooking {
  facility: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  payableAmount?: number;
  isBooked?: 'confirmed' | 'canceled';
}
